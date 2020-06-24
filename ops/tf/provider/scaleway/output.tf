output "wildcard_dns" {
  value = "${scaleway_k8s_cluster_beta.cluster.wildcard_dns}"
}