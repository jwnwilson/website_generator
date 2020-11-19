variable "project" {}

variable "cms_repo" {}

variable "nginx_repo" {}

variable "access_key" {}

variable "secret_key" {}

variable "region" {}

provider "aws" {
  access_key = var.access_key
  secret_key = var.secret_key
  region     = var.region
}

resource "aws_ecr_repository" "cms" {
  name                 = var.cms_repo
  image_tag_mutability = "MUTABLE"

  image_scanning_configuration {
    scan_on_push = true
  }
}

resource "aws_ecr_repository" "nginx" {
  name                 = var.nginx_repo
  image_tag_mutability = "MUTABLE"

  image_scanning_configuration {
    scan_on_push = true
  }
}