#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from 'aws-cdk-lib';
import { InfrastructureStack } from '../lib/infrastructure-stack';

const app = new cdk.App();

// Development environment with custom domain
new InfrastructureStack(app, 'Ondergrond-Infrastructure-Dev', {
  environment: 'dev',
  domainName: 'dev.ondergrond.link',
  env: {
    account: process.env.CDK_DEFAULT_ACCOUNT,
    region: process.env.CDK_DEFAULT_REGION,
  },
});

// Staging environment with custom domain
new InfrastructureStack(app, 'Ondergrond-Infrastructure-Staging', {
  environment: 'staging',
  domainName: 'staging.ondergrond.link',
  env: {
    account: process.env.CDK_DEFAULT_ACCOUNT,
    region: process.env.CDK_DEFAULT_REGION,
  },
});
