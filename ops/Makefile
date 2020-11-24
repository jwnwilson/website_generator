.EXPORT_ALL_VARIABLES:

# Default cluster
# CLUSTER_ID:=45593a44-5e71-48b5-bbe4-8e9809f3dbc0
KUBE_CONFIG_PATH:=~/.kube/config
AWS_ACCOUNT:=675468650888
DOCKER_REPO:=$(AWS_ACCOUNT).dkr.ecr.eu-west-1.amazonaws.com
DOCKER_CONTAINERS:=$(shell docker ps -q)
AWS_REGION:=eu-west-1

# Login to our k8 cluster and store creds in ~/.kube/config
# Get AWS ECR token and create secret on cluster to download images
kube-auth:
	bash ./scripts/k8_auth.sh
	bash ./scripts/docker_login.sh

# Install our terraform deps on mac
install:
	brew install terraform helm scw

# Deploy new images after upload
refresh-deployment: auth
	kubectl rollout restart deployment cms client

# Authenticate cluster for dashboard
dash-auth: kube-auth
	$(eval TOKEN=$(shell kubectl -n kube-system describe secret default| awk '$$1=="token:"{print $$2}'))
	kubectl config set-credentials kubernetes-admin --token="${TOKEN}"

setup:
# Get cluster and apply kubectl
	bash ./scripts/k8_setup.sh

# Test connection
	kubectl get nodes
	kubectl get pods -A

# Setup S3 bucket and CDN
	bash ./scripts/site_setup.sh

destroy:
	cd tf && terraform destroy

dashboard: dash-auth
	-pkill -f "kubectl"
	kubectl proxy --kubeconfig ${KUBE_CONFIG_PATH} &
	google-chrome http://localhost:8001/api/v1/namespaces/kubernetes-dashboard/services/https:kubernetes-dashboard:/proxy/