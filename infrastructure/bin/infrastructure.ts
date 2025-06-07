#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from 'aws-cdk-lib';
import { InfrastructureStack } from '../lib/infrastructure-stack';

const app = new cdk.App();

// Development environment
new InfrastructureStack(app, 'Ondergrond-Infrastructure-Dev', {
  environment: 'dev',
  env: {
    account: process.env.CDK_DEFAULT_ACCOUNT,
    region: process.env.CDK_DEFAULT_REGION,
  },
});

// Staging environment
new InfrastructureStack(app, 'Ondergrond-Infrastructure-Staging', {
  environment: 'staging',
  env: {
    account: process.env.CDK_DEFAULT_ACCOUNT,
    region: process.env.CDK_DEFAULT_REGION,
  },
});