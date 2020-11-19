variable "access_key" {}

variable "secret_key" {}

variable "region" {}

variable "domain" {}

variable "project" {}

variable "ips" {
  type = list
}

variable "wildcard_dns" {
  type = string
}

# Configure the AWS Provider
provider "aws" {
  access_key = var.access_key
  secret_key = var.secret_key
  region     = var.region
}

data "aws_route53_zone" "selected_domain" {
  name = "${var.domain}."
}

resource "aws_route53_record" "cms" {
  zone_id = data.aws_route53_zone.selected_domain.zone_id
  name    = format("%s_cms", var.project)
  type    = "A"
  ttl     = "300"
  records = var.ips
}

resource "aws_route53_record" "client" {
  zone_id = data.aws_route53_zone.selected_domain.zone_id
  name    = format("%s_preview", var.project)
  type    = "A"
  ttl     = "300"
  records = var.ips
}

