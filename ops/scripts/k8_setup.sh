#! /bin/bash

# Setup k8 cluster
cd tf && \
terraform init && \
terraform plan -target=module.provider.scaleway_k8s_pool_beta.pool -out=infra.tfplan && \
terraform apply infra.tfplan

export CLUSTER_ID=$(terraform output cluster_id | grep -oE "([^\/]+$)")

echo "Created Kapsule cluster: ${CLUSTER_ID}"

export IPS=""
# Wait until cluster has ips
until [ "${IPS}" != "" ]
do
    terraform refresh
    export IPS=$(terraform output ips | grep -oE "\b([0-9]{1,3}\.){3}[0-9]{1,3}\b")
    echo "Waiting for cluster IPs: ${IPS}"
    sleep 5
done

# Setup DNS for cluster
terraform plan -target=module.dns.aws_route53_record.cms -target=module.dns.aws_route53_record.client -out=infra.tfplan && \
terraform apply infra.tfplan

# Login to this cluster
cd ..
# Download k8 config file
CLUSTER_ID=${CLUSTER_ID} ./scripts/k8_auth.sh
# Give K8 cluster access to AWS ECR
./scripts/docker_login.sh

# Setup SSL
# Following steps here: https://www.digitalocean.com/community/tutorials/how-to-set-up-an-nginx-ingress-with-cert-manager-on-digitalocean-kubernetes
kubectl create namespace cert-manager
kubectl apply --validate=false -f https://github.com/jetstack/cert-manager/releases/download/v0.16.1/cert-manager.yaml
kubectl apply -f kubernetes/letsencrypt.yaml
# Show our certificartion info
kubectl describe certificate

# Apply containers to the cluster
kubectl apply -f ./kubernetes