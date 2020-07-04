KUBE_CONFIG_PATH = ~/Downloads/kubeconfig-jwnwilson_cluster.yaml

kube-auth:
	# Download the kubeconfig from the scaleway site until we setup automated download
	export KUBECONFIG=$(KUBE_CONFIG_PATH)

install:
	brew install terraform helm scw

setup: kube-auth
	cd tf && \
	terraform init && \
	terraform plan && \
	terraform apply
	
	# Test connection
	kubectl get nodes
	kubectl get pods -A

ssl: kube-auth
	kubectl create namespace cert-manager
	kubectl apply --validate=false -f https://github.com/jetstack/cert-manager/releases/download/v0.14.3/cert-manager.yaml
	kubectl apply -f kubernetes/letsencrypt.yaml

auth: kube-auth
	$(eval TOKEN=$(shell kubectl -n kube-system describe secret default| awk '$$1=="token:"{print $$2}'))
	kubectl config set-credentials kubernetes-admin --token="${TOKEN}"

proxy: kube-auth
	kubectl proxy &
	open http://localhost:8001/api/v1/namespaces/kubernetes-dashboard/services/https:kubernetes-dashboard:/proxy/