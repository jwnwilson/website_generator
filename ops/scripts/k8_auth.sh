#! /bin/bash

KUBE_CONFIG_PATH=~/.kube/config

# If file exists remove it
if [ -f "${KUBE_CONFIG_PATH}" ]; then
    rm ${KUBE_CONFIG_PATH}
else
    mkdir ~/.kube
fi

echo "Getting auth details for cluster: ${CLUSTER_ID}"
curl -H "X-Auth-Token: ${TF_VAR_scaleway_secret_key}" "https://api.scaleway.com/k8s/v1/regions/fr-par/clusters/${CLUSTER_ID}/kubeconfig?dl=1" >> ${KUBE_CONFIG_PATH}

CONFIG=`cat ${KUBE_CONFIG_PATH}`
echo "Logged into K8: ${CONFIG}"