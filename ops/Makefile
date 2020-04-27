setup:
	cd tf && \
	terraform init && \
	terraform plan && \
	terraform apply
	# Backup existing kube config
	cp ~/.kube/config ~/.kube/config.backup
	# Get master node settings
	scp root@MASTER_IP:/etc/kubernetes/admin.conf ~/.kube/config
	kubectl get nodes

auth:
	TOKEN=$(kubectl -n kube-system describe secret default| awk '$1=="token:"{print $2}')
	kubectl config set-credentials kubernetes-admin --token="${TOKEN}"

proxy:
	kubectl proxy &
	open http://localhost:8001/api/v1/namespaces/kubernetes-dashboard/services/https:kubernetes-dashboard:/proxy/.