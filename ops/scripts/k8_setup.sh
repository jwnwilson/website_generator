#! /bin/bash

# Setup k8 cluster
cd tf && \
terraform init && \
terraform plan -target=module.provider.scaleway_k8s_pool_beta.pool -out=infra.tfplan && \
terraform apply infra.tfplan

export CLUSTER_ID=$(terraform output cluster_id | grep -oE "([^\/]+$)")

echo "Created Kapsule cluster: ${CLUSTER_ID}"

export IPS='[]'
# Wait until cluster has ips
until [[ "${IPS}" != *'""'* && "${IPS}" != '[]'  ]]
do
    terraform refresh
    export IPS=`terraform output ips`
    echo "Waiting for cluster IPs: ${IPS}"
    sleep 5s
done

# Setup DNS for cluster
terraform plan -target=module.dns.aws_route53_record.root -target=module.dns.aws_route53_record.cms -target=module.dns.aws_route53_record.client -target=module.dns.aws_route53_record.wildcard -out=infra.tfplan && \
terraform apply infra.tfplan

export PREVIEW_SUBDOMAIN=$(terraform output preview_domain)
export CMS_SUBDOMAIN=$(terraform output cms_domain)

# Login to this cluster
cd ..
# Download k8 config file
CLUSTER_ID=${CLUSTER_ID} ./scripts/k8_auth.sh
# Give K8 cluster access to AWS ECR
AWS_REGION="eu-west-1" AWS_ACCOUNT="675468650888" ./scripts/docker_login.sh

# Apply containers to the cluster
kubectl apply -f ./kubernetes/client.yaml
kubectl apply -f ./kubernetes/cms.yaml
kubectl apply -f ./kubernetes/dashboard.yaml
kubectl apply -f ./kubernetes/db.yaml
kubectl apply -f ./kubernetes/limit-cpu.yaml
kubectl apply -f ./kubernetes/nginx.yaml
# Crude substitution for subdomain
cat ./kubernetes/ingress.yaml | sed "s/{{CMS}}/${CMS_SUBDOMAIN}/g" | sed "s/{{PREVIEW}}/${PREVIEW_SUBDOMAIN}/g" | kubectl apply -f -

# Setup SSL
# Following steps here: https://www.digitalocean.com/community/tutorials/how-to-set-up-an-nginx-ingress-with-cert-manager-on-digitalocean-kubernetes
kubectl create namespace cert-manager
kubectl apply --validate=false -f https://github.com/jetstack/cert-manager/releases/download/v0.16.1/cert-manager.yaml
kubectl apply -f ./kubernetes/letsencrypt.yaml
# Show our certificartion info
kubectl describe certificate