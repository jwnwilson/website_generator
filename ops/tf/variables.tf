/* general */
variable "node_count" {
  default = 2
}

variable "domain" {
  default = "jwnwilson-kube.co.uk"
}

/* scaleway */
/* These creds have been moved to bash_profile env vars to avoid accidental commits */
variable "scaleway_ssh" {
  default = "~/.ssh/id_rsa.pub"
}

variable "scaleway_organization_id" {
  default = ""
}

variable "scaleway_access_key" {
  default = "" // enables to specify only the secret_key
}

variable "scaleway_secret_key" {
  default = ""
}

variable "scaleway_zone" {
  default = "nl-ams-1"
}

variable "scaleway_type" {
  default = "DEV1-S"
}

variable "scaleway_image" {
  default = "Ubuntu 20.04 Focal Fossa"
}

/* aws dns */
variable "aws_access_key" {
  default = ""
}

variable "aws_secret_key" {
  default = ""
}

variable "aws_region" {
  default = "eu-west-1"
}

variable "cms_repo" {
  description = "Name of container image repository"
  default     = "website_cms"
}

variable "client_repo" {
  description = "Name of container image repository"
  default     = "website_client"
}

variable "nginx_repo" {
  description = "Name of container image repository"
  default     = "website_nginx"
}

# Deployment vars

variable "deploy_jwnwilson" {
  description = "deployment url for jwnwilson.co.uk"
  default     = "jwnwilson.co.uk"
}