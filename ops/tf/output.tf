output "cluster_id" {
    value = module.provider.cluster_id
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