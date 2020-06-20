#!/bin/sh
set -e

kubeadm init --config /tmp/master-configuration.yml \
  --ignore-preflight-errors=Swap,NumCPU

kubeadm token create ${token}

[ -d $HOME/.kube ] || mkdir -p $HOME/.kube
ln -s /etc/kubernetes/admin.conf $HOME/.kube/config

until nc -z localhost 6443; do
  echo "Waiting for API server to respond"
  sleep 5
done

kubectl apply -f "https://raw.githubusercontent.com/coreos/flannel/master/Documentation/kube-flannel.yml"
kubectl apply -f "https://github.com/kubernetes-sigs/metrics-server/releases/download/v0.3.6/components.yaml"

# See: https://kubernetes.io/docs/admin/authorization/rbac/
kubectl create clusterrolebinding permissive-binding \
  --clusterrole=cluster-admin \
  --user=admin \
  --user=kubelet \
  --group=system:serviceaccounts


# edit /etc/kubernetes/manifests/kube-controller-manager.yaml
# at command ,add
# --allocate-node-cidrs=true
# --cluster-cidr=10.244.0.0/16
sed -i 's/- kube-controller-manager/- kube-controller-manager\n    - --allocate-node-cidrs=true\n    - --cluster-cidr=10.244.0.0\/16/' /etc/kubernetes/manifests/kube-controller-manager.yaml
# then,reload kubelet
systemctl restart kubelet
