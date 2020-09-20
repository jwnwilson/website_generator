variable "organization_id" {}

variable "access_key" {}

variable "secret_key" {}

variable "zone" {
  type = string
}

variable "node_count" {}

provider "scaleway" {
  organization_id = var.organization_id
  access_key      = var.access_key
  secret_key      = var.secret_key
  zone            = var.zone
  version         = ">= 1.14"
}

resource "scaleway_k8s_cluster_beta" "cluster" {
  name = "jwnwilson_cluster"
  version = "1.18.0"
  cni = "cilium"
  enable_dashboard = true
  ingress = "nginx"
}

resource "scaleway_k8s_pool_beta" "pool" {
  cluster_id = scaleway_k8s_cluster_beta.cluster.id
  name = "jwnwilson_pool"
  node_type = "DEV1-M"
  size = var.node_count
  min_size = 1
  max_size = var.node_count
  autoscaling = true
  autohealing = true
  container_runtime = "docker"
}
