#! /bin/bash

cd tf
# Setup S3 bucket and CDN
terraform plan -target=module.static_site.aws_route53_record.site -target=module.static_site.aws_cloudfront_distribution.site_distribution -out=infra.tfplan && \
terraform apply infra.tfplan