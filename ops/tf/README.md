# Kapsule cluster setup

Will setup a kubernetes cluster on scaleway and then point our route53 domain jwnwilson.co.uk at it.

To run:

- cd tf
- terraform plan
- terraform apply

Once we have a cluster download the kubeconfig (which is still manual) and then run:

export KUBECONFIG=~/Downloads/kubeconfig-jwnwilson_cluster.yaml

We should now be able to use the make command in /ops:

make proxy

This will open a browser to the kubernetes dashboard to start deploying our images to.
