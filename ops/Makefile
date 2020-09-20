KUBE_CONFIG_PATH=~/.kube/config
CLUSTER_ID=45593a44-5e71-48b5-bbe4-8e9809f3dbc0

kube-auth:
	rm ${KUBE_CONFIG_PATH}
	curl -H "X-Auth-Token: ${TF_VAR_scaleway_secret_key}" "https://api.scaleway.com/k8s/v1/regions/fr-par/clusters/${CLUSTER_ID}/kubeconfig?dl=1" >> ${KUBE_CONFIG_PATH}
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
	# Following steps here: https://www.digitalocean.com/community/tutorials/how-to-set-up-an-nginx-ingress-with-cert-manager-on-digitalocean-kubernetes
	kubectl create namespace cert-manager
	kubectl apply --validate=false -f https://github.com/jetstack/cert-manager/releases/download/v0.16.1/cert-manager.yaml
	kubectl apply -f kubernetes/letsencrypt.yaml
	# Show our certificartion info
	kubectl describe certificate

auth: kube-auth
	$(eval TOKEN=$(shell kubectl -n kube-system describe secret default| awk '$$1=="token:"{print $$2}'))
	kubectl config set-credentials kubernetes-admin --token="${TOKEN}"

infra: setup ssl

proxy: kube-auth
	kubectl proxy --kubeconfig ${KUBE_CONFIG_PATH} &
	open http://localhost:8001/api/v1/namespaces/kubernetes-dashboard/services/https:kubernetes-dashboard:/proxy/