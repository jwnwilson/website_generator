# Kapsule cluster setup

Will setup a kubernetes cluster on scaleway and then point our route53 domain jwnwilson.co.uk at it.

All these scripts expect api tokens to exist in the following Env vars:

export TF_VAR_scaleway_access_key=""
export TF_VAR_scaleway_secret_key=""
export TF_VAR_scaleway_organization_id=""
export TF_VAR_aws_access_key=""
export TF_VAR_aws_secret_key=""

To run:

`make infra`

We should now be able to use the make command in /ops:

`make proxy`

This will open a browser to the kubernetes dashboard to start deploying our images to.
