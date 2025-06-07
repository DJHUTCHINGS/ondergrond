import * as cdk from 'aws-cdk-lib';
import * as s3 from 'aws-cdk-lib/aws-s3';
import * as cloudfront from 'aws-cdk-lib/aws-cloudfront';
import * as origins from 'aws-cdk-lib/aws-cloudfront-origins';
import * as s3deploy from 'aws-cdk-lib/aws-s3-deployment';
import * as iam from 'aws-cdk-lib/aws-iam';
import { Construct } from 'constructs';

interface InfrastructureStackProps extends cdk.StackProps {
  environment: string;
}

export class InfrastructureStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props: InfrastructureStackProps) {
    super(scope, id, props);

    const { environment } = props;

    // S3 bucket for static website (private, accessed via CloudFront)
    const websiteBucket = new s3.Bucket(this, 'OndergrondWebsiteBucket', {
      bucketName: `ondergrond-website-${environment}-${cdk.Aws.ACCOUNT_ID}`,
      blockPublicAccess: s3.BlockPublicAccess.BLOCK_ALL, // Keep bucket private
      removalPolicy: cdk.RemovalPolicy.DESTROY, // For dev/testing
    });

    // Origin Access Control for secure CloudFront -> S3 access
    const originAccessControl = new cloudfront.S3OriginAccessControl(this, 'OndergrondOAC', {
      description: `OAC for Ondergrond website - ${environment}`,
    });

    // CloudFront distribution with OAC
    const distribution = new cloudfront.Distribution(this, 'OndergrondDistribution', {
      defaultBehavior: {
        origin: origins.S3BucketOrigin.withOriginAccessControl(websiteBucket, {
          originAccessControl,
        }),
        viewerProtocolPolicy: cloudfront.ViewerProtocolPolicy.REDIRECT_TO_HTTPS,
        cachePolicy: cloudfront.CachePolicy.CACHING_OPTIMIZED,
      },
      defaultRootObject: 'index.html',
      errorResponses: [
        {
          httpStatus: 404,
          responseHttpStatus: 200,
          responsePagePath: '/index.html', // SPA routing support
        },
        {
          httpStatus: 403,
          responseHttpStatus: 200,
          responsePagePath: '/index.html', // Handle S3 403s as SPA routes
        },
      ],
      comment: `Ondergrond ${environment} distribution`,
    });

    // Grant CloudFront access to S3 bucket
    websiteBucket.addToResourcePolicy(
      new iam.PolicyStatement({
        actions: ['s3:GetObject'],
        resources: [websiteBucket.arnForObjects('*')],
        principals: [new iam.ServicePrincipal('cloudfront.amazonaws.com')],
        conditions: {
          StringEquals: {
            'AWS:SourceArn': `arn:aws:cloudfront::${cdk.Aws.ACCOUNT_ID}:distribution/${distribution.distributionId}`,
          },
        },
      })
    );

    // Deploy built React app to S3
    new s3deploy.BucketDeployment(this, 'OndergrondDeployment', {
      sources: [s3deploy.Source.asset('../dist')],
      destinationBucket: websiteBucket,
      distribution: distribution,
      distributionPaths: ['/*'], // Invalidate all CloudFront cache
    });

    // Output the CloudFront URL
    new cdk.CfnOutput(this, 'WebsiteURL', {
      value: `https://${distribution.domainName}`,
      description: `Ondergrond ${environment} website URL`,
    });

    new cdk.CfnOutput(this, 'BucketName', {
      value: websiteBucket.bucketName,
      description: `S3 bucket name for ${environment}`,
    });
  }
}