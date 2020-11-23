variable "site_name" {}

variable "access_key" {}

variable "secret_key" {}

variable "region" {}

variable "domain_name" {}


# Configure the AWS Provider
provider "aws" {
  access_key        = var.access_key
  secret_key        = var.secret_key
  region            = "us-east-1"
}

# Note had to create this manually, need to create cert and cloudfront in region us-east-1 for this to work
resource "aws_acm_certificate" "cert" {
  domain_name       = var.site_name
  validation_method = "DNS"

  lifecycle {
    create_before_destroy = true
  }
}

# s3 Bucket with Website settings
resource "aws_s3_bucket" "site_bucket" {
  bucket = var.site_name
  acl = "public-read"
  website {
    index_document = "index.html"
    error_document = "error.html"
  }
}

resource "aws_s3_bucket_policy" "site_policy" {
  bucket = aws_s3_bucket.site_bucket.id

  policy = <<POLICY
{
    "Version": "2012-10-17",
    "Id": "Policy1594656855742",
    "Statement": [
        {
            "Sid": "Stmt1594656849271",
            "Effect": "Allow",
            "Principal": {
                "AWS": "*"
            },
            "Action": "s3:GetObject",
            "Resource": "arn:aws:s3:::${var.site_name}/*"
        }
    ]
}
POLICY
}

# Route53 Domain Name & Resource Records
resource "aws_route53_zone" "site_zone" {
  name = var.site_name
}

# cloudfront distribution
resource "aws_cloudfront_distribution" "site_distribution" {
  origin {
    domain_name = aws_s3_bucket.site_bucket.bucket_domain_name
    origin_id = "${var.site_name}-origin"
  }
  enabled = true
  aliases = [var.site_name]
  price_class = "PriceClass_100"
  default_root_object = "index.html"
  default_cache_behavior {
    allowed_methods  = ["DELETE", "GET", "HEAD", "OPTIONS", "PATCH",
                      "POST", "PUT"]
    cached_methods   = ["GET", "HEAD"]
    target_origin_id = "${var.site_name}-origin"
    forwarded_values {
      query_string = true
      cookies {
        forward = "all"
      }
    }
    viewer_protocol_policy = "https-only"
    min_ttl                = 0
    default_ttl            = 1000
    max_ttl                = 86400
  }
  restrictions {
    geo_restriction {
      restriction_type = "none"
    }
  }
  viewer_certificate {
    acm_certificate_arn = aws_acm_certificate.cert.arn
    ssl_support_method  = "sni-only"
    minimum_protocol_version = "TLSv1.1_2016" # defaults wrong, set
  }
}