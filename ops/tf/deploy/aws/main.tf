variable "site_name" {}

variable "access_key" {}

variable "secret_key" {}

variable "region" {}


# Configure the AWS Provider
provider "aws" {
  access_key = var.access_key
  secret_key = var.secret_key
  region     = var.region
}

resource "aws_s3_bucket" "site_bucket" {
  bucket = "${var.site_name}"
  acl = "public-read"
  website {
    index_document = "index.html"
    error_document = "error.html"
  }
}