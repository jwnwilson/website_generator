install:
	brew install terraform helm

setup:
	cd tf && \
	terraform init && \
	terraform plan && \
	terraform apply
	# Download the kubeconfig from the scaleway site until we setup automated download
	export KUBECONFIG=~/Downloads/kubeconfig-jwnwilson_cluster.yaml
	kubectl get nodes
	kubectl get pods -A

ssl:
	kubectl create namespace cert-manager
	kubectl apply --validate=false -f https://github.com/jetstack/cert-manager/releases/download/v0.14.3/cert-manager.yaml
	kubectl apply -f kubernetes/letsencrypt.yaml

auth:
	$(eval TOKEN=$(shell kubectl -n kube-system describe secret default| awk '$$1=="token:"{print $$2}'))
	kubectl config set-credentials kubernetes-admin --token="${TOKEN}"

proxy:
	kubectl proxy &
	open http://localhost:8001/api/v1/namespaces/kubernetes-dashboard/services/https:kubernetes-dashboard:/proxy/