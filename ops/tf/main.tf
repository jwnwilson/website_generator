module "provider" {
  source = "./provider/scaleway"

  project         = var.project
  organization_id = var.scaleway_organization_id
  access_key      = var.scaleway_access_key
  secret_key      = var.scaleway_secret_key
  zone            = var.scaleway_zone
  node_count      = var.node_count
}

module "dns" {
  source          = "./dns/aws"
  access_key      = var.aws_access_key
  secret_key      = var.aws_secret_key
  region          = var.aws_region
  domain          = var.domain
  project         = var.project
  wildcard_dns    = module.provider.wildcard_dns
  ips             = module.provider.ips
}

module "container_repo" {
  source = "./container_repo/aws"

  project         = var.project
  cms_repo        = var.cms_repo
  nginx_repo      = var.nginx_repo
  access_key      = var.aws_access_key
  secret_key      = var.aws_secret_key
  region          = var.aws_region
}

module "static_site" {
  source = "./static_site/aws"

  site_name       = var.site_name
  site_subdomain  = var.site_subdomain
  access_key      = var.aws_access_key
  secret_key      = var.aws_secret_key
  region          = var.aws_region
}