.EXPORT_ALL_VARIABLES:

# Default cluster
CLUSTER_ID=45593a44-5e71-48b5-bbe4-8e9809f3dbc0

# Login to our k8 cluster and store creds in ~/.kube/config
kube-auth:
	bash ./scripts/k8_auth.sh

# Install our terraform deps on mac
install:
	brew install terraform helm scw

# Deploy new images after upload
refresh-deployment: auth
	kubectl rollout restart deployment cms client

# Authenticate cluster for dashboard
auth: kube-auth
	$(eval TOKEN=$(shell kubectl -n kube-system describe secret default| awk '$$1=="token:"{print $$2}'))
	kubectl config set-credentials kubernetes-admin --token="${TOKEN}"

setup:
# Get cluster and apply kubectl
	bash ./scripts/k8_setup.sh

# Test connection
	kubectl get nodes
	kubectl get pods -A

# Setup S3 bucket and CDN
#	bash ./scripts/site_setup.sh

destroy:
	cd tf && terraform destroy

dashboard: auth
	-pkill -f "kubectl"
	kubectl proxy --kubeconfig ${KUBE_CONFIG_PATH} &
	open http://localhost:8001/api/v1/namespaces/kubernetes-dashboard/services/https:kubernetes-dashboard:/proxy/