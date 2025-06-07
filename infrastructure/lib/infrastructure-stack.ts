import * as cdk from 'aws-cdk-lib';
import * as s3 from 'aws-cdk-lib/aws-s3';
import * as cloudfront from 'aws-cdk-lib/aws-cloudfront';
import * as origins from 'aws-cdk-lib/aws-cloudfront-origins';
import * as s3deploy from 'aws-cdk-lib/aws-s3-deployment';
import * as iam from 'aws-cdk-lib/aws-iam';
import * as acm from 'aws-cdk-lib/aws-certificatemanager';
import * as route53 from 'aws-cdk-lib/aws-route53';
import * as targets from 'aws-cdk-lib/aws-route53-targets';
import * as cloudwatch from 'aws-cdk-lib/aws-cloudwatch';
import { Construct } from 'constructs';

interface InfrastructureStackProps extends cdk.StackProps {
  environment: string;
  domainName?: string;
}

export class InfrastructureStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props: InfrastructureStackProps) {
    super(scope, id, props);

    const { environment, domainName } = props;

    // S3 bucket for static website (private, accessed via CloudFront)
    const websiteBucket = new s3.Bucket(this, 'OndergrondWebsiteBucket', {
      bucketName: `ondergrond-website-${environment}-${cdk.Aws.ACCOUNT_ID}`,
      blockPublicAccess: s3.BlockPublicAccess.BLOCK_ALL,
      removalPolicy: cdk.RemovalPolicy.DESTROY,
    });

    // Origin Access Control for secure CloudFront -> S3 access
    const originAccessControl = new cloudfront.S3OriginAccessControl(
      this,
      'OndergrondOAC',
      {
        description: `OAC for Ondergrond website - ${environment}`,
      }
    );

    // Look up existing hosted zone
    let hostedZone: route53.IHostedZone | undefined;
    let certificate: acm.ICertificate | undefined;

    if (domainName) {
      hostedZone = route53.HostedZone.fromLookup(this, 'HostedZone', {
        domainName: 'ondergrond.link',
      });

      // SSL Certificate (must be in us-east-1 for CloudFront)
      certificate = new acm.Certificate(this, 'Certificate', {
        domainName: domainName,
        validation: acm.CertificateValidation.fromDns(hostedZone),
      });
    }

    // CloudFront distribution with optional custom domain
    const distributionProps: cloudfront.DistributionProps = {
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
          responsePagePath: '/index.html',
        },
        {
          httpStatus: 403,
          responseHttpStatus: 200,
          responsePagePath: '/index.html',
        },
      ],
      comment: `Ondergrond ${environment} distribution`,

      // Conditionally add custom domain configuration
      ...(domainName &&
        certificate && {
          domainNames: [domainName],
          certificate: certificate,
        }),
    };

    const distribution = new cloudfront.Distribution(
      this,
      'OndergrondDistribution',
      distributionProps
    );

    // Create DNS record if custom domain is used
    if (domainName && hostedZone) {
      new route53.ARecord(this, 'DomainRecord', {
        zone: hostedZone,
        recordName: domainName,
        target: route53.RecordTarget.fromAlias(
          new targets.CloudFrontTarget(distribution)
        ),
      });
    }

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

    // Basic CloudWatch Alarms (only for production)
    if (environment === 'prod') {
      // Alarm for high error rate (4xx/5xx errors)

      new cloudwatch.Alarm(this, 'HighErrorRate', {
        metric: new cloudwatch.Metric({
          namespace: 'AWS/CloudFront',
          metricName: 'ErrorRate',
          dimensionsMap: {
            DistributionId: distribution.distributionId,
          },
          statistic: 'Average',
        }),
        threshold: 5, // Alert if error rate > 5%
        evaluationPeriods: 2,
        alarmDescription: `High error rate on ${domainName}`,
        treatMissingData: cloudwatch.TreatMissingData.NOT_BREACHING,
      });

      // Alarm for unusual traffic (optional)
      new cloudwatch.Alarm(this, 'UnusualTraffic', {
        metric: new cloudwatch.Metric({
          namespace: 'AWS/CloudFront',
          metricName: 'Requests',
          dimensionsMap: {
            DistributionId: distribution.distributionId,
          },
          statistic: 'Sum',
          period: cdk.Duration.hours(1),
        }),
        threshold: 1000, // Alert if > 1000 requests/hour
        evaluationPeriods: 1,
        alarmDescription: `Unusual traffic spike on ${domainName}`,
        treatMissingData: cloudwatch.TreatMissingData.NOT_BREACHING,
      });
    }

    // Deploy built React app to S3
    new s3deploy.BucketDeployment(this, 'OndergrondDeployment', {
      sources: [s3deploy.Source.asset('../dist')],
      destinationBucket: websiteBucket,
      distribution: distribution,
      distributionPaths: ['/*'],
    });

    // Output the URLs
    new cdk.CfnOutput(this, 'WebsiteURL', {
      value: domainName
        ? `https://${domainName}`
        : `https://${distribution.domainName}`,
      description: `Ondergrond ${environment} website URL`,
    });

    new cdk.CfnOutput(this, 'CloudFrontURL', {
      value: `https://${distribution.domainName}`,
      description: `CloudFront distribution URL for ${environment}`,
    });

    new cdk.CfnOutput(this, 'BucketName', {
      value: websiteBucket.bucketName,
      description: `S3 bucket name for ${environment}`,
    });
  }
}
