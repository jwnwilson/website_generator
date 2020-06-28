output "wildcard_dns" {
  value = "${scaleway_k8s_cluster_beta.cluster.wildcard_dns}"
}

output "ips" {
  value = [for node in scaleway_k8s_pool_beta.pool.nodes:  node.public_ip]
}