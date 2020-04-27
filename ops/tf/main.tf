module "provider" {
  source = "./provider/scaleway"

  organization    = "${var.scaleway_organization}"
  token           = "${var.scaleway_token}"
  region          = "${var.scaleway_region}"
  type            = "${var.scaleway_type}"
  image           = "${var.scaleway_image}"
  hosts           = "${var.node_count}"
  hostname_format = "${var.hostname_format}"
  # Needed for persistent volumes
  apt_packages    = ["ceph-common", "nfs-common"]
}

module "swap" {
  source = "./service/swap"

  count       = "${var.node_count}"
  connections = "${module.provider.public_ips}"
}

module "dns" {
  source = "./dns/cloudflare"

  node_count = "${var.node_count}"
  email      = "${var.email}"
  api_token  = "${var.cloudflare_api_token}"
  domain     = "${var.domain}"
  public_ips = "${module.provider.public_ips}"
  hostnames  = "${module.provider.hostnames}"
}

# module "dns" {
#   source = "./dns/aws"

#   count      = "${var.node_count}"
#   access_key = "${var.aws_access_key}"
#   secret_key = "${var.aws_secret_key}"
#   region     = "${var.aws_region}"
#   domain     = "${var.domain}"
#   public_ips = "${module.provider.public_ips}"
#   hostnames  = "${module.provider.hostnames}"
# }

module "wireguard" {
  source = "./security/wireguard"

  count        = "${var.node_count}"
  connections  = "${module.provider.public_ips}"
  private_ips  = "${module.provider.private_ips}"
  hostnames    = "${module.provider.hostnames}"
  overlay_cidr = "${module.kubernetes.overlay_cidr}"
}

module "firewall" {
  source = "./security/ufw"

  count                = "${var.node_count}"
  connections          = "${module.provider.public_ips}"
  private_interface    = "${module.provider.private_network_interface}"
  vpn_interface        = "${module.wireguard.vpn_interface}"
  vpn_port             = "${module.wireguard.vpn_port}"
  kubernetes_interface = "${module.kubernetes.overlay_interface}"
}

module "etcd" {
  source = "./service/etcd"

  count       = "${var.etcd_node_count}"
  connections = "${module.provider.public_ips}"
  hostnames   = "${module.provider.hostnames}"
  vpn_unit    = "${module.wireguard.vpn_unit}"
  vpn_ips     = "${module.wireguard.vpn_ips}"
}

module "kubernetes" {
  source = "./service/kubernetes"

  count          = "${var.node_count}"
  connections    = "${module.provider.public_ips}"
  cluster_name   = "${var.domain}"
  vpn_interface  = "${module.wireguard.vpn_interface}"
  vpn_ips        = "${module.wireguard.vpn_ips}"
  etcd_endpoints = "${module.etcd.endpoints}"
}
