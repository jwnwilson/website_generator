output "cms_domain" {
    value = format("%s-cms", var.project)
}

output "preview_domain" {
    value = format("%s-preview", var.project)
}