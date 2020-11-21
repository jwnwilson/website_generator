#! /bin/bash

# Setup S3 bucket and CDN
terraform plan -target=module.deploy.aws_cloudfront_distribution.site_distribution -out=infra.tfplan && \
terraform apply infra.tfplan