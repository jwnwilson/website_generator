setup:
	cd tf && \
	terraform init && \
	terraform plan && \
	terraform apply
	# Download the kubeconfig from the scaleway site until we setup automated download
	export KUBECONFIG=~/Downloads/kubeconfig-jwnwilson_cluster.yaml
	kubectl get nodes
	kubectl get pods -A

auth:
	$(eval TOKEN=$(shell kubectl -n kube-system describe secret default| awk '$$1=="token:"{print $$2}'))
	kubectl config set-credentials kubernetes-admin --token="${TOKEN}"

proxy:
	kubectl proxy &
	open http://localhost:8001/api/v1/namespaces/kubernetes-dashboard/services/https:kubernetes-dashboard:/proxy/