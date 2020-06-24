module "provider" {
  source = "./provider/scaleway"

  organization_id = var.scaleway_organization_id
  access_key      = var.scaleway_access_key
  secret_key      = var.scaleway_secret_key
  zone            = var.scaleway_zone
}

module "dns" {
  source = "./dns/aws"
  access_key = var.aws_access_key
  secret_key = var.aws_secret_key
  region     = var.aws_region
  domain     = var.domain
  wildcard_dns = module.provider.wildcard_dns
  hostnames  = ["jwnwilson"]
}

module "container_repo" {
  source = "./container_repo/aws"

  cms_repo     = var.cms_repo
  client_repo  = var.client_repo
  access_key   = var.aws_access_key
  secret_key   = var.aws_secret_key
  region       = var.aws_region
}