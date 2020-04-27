/* general */
variable "node_count" {
  default = 3
}

/* etcd_node_count must be <= node_count; odd numbers provide quorum */
variable "etcd_node_count" {
  default = 3
}

variable "domain" {
  default = "jwnwilson.co.uk"
}

variable "hostname_format" {
  default = "kube%d"
}

/* scaleway */
variable "scaleway_ssh" {
  default = "~/.ssh/id_rsa.pub"
}
variable "scaleway_organization" {
  default = ""
}

variable "scaleway_token" {
  default = ""
}

variable "scaleway_region" {
  default = "par1"
}

variable "scaleway_type" {
  default = "DEV1-S"
}

variable "scaleway_image" {
  default = "Ubuntu Bionic"
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

variable "email" {
  default = "jwnwilson@hotmail.co.uk"
}

/* cloudflare dns */
variable "cloudflare_api_token" {
  default = ""
}

variable "cloudflare_account" {
  default = ""
}