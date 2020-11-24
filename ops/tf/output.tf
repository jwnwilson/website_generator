output "cluster_id" {
    value = module.provider.cluster_id
}

output "wildcard_dns" {
    value = module.provider.wildcard_dns
}

output "ips" {
    value = module.provider.ips
}

output "cms_domain" {
    value = module.dns.cms_domain
}

output "preview_domain" {
    value = module.dns.preview_domain
}

output "site_name" {
    value = var.site_name
}