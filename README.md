# Deployment

To deployment and run this project:

Install dependancies:

- docker
- kubectrl
- awscli
- terraform
- make command

Authenticate aws:

`aws configure` / set ~/.aws/credentials

Set env vars in .bashrc / bash_profile

```
export TF_VAR_aws_access_key=
export TF_VAR_aws_secret_key=
export TF_VAR_scaleway_access_key=
export TF_VAR_scaleway_secret_key=
export TF_VAR_scaleway_organization_id=

```

Authenticate docker:

NOTE: Might need to manually remove -e option on ubuntu from return value in aws command

`eval $(aws ecr get-login --region eu-west-1 | sed "s/-e none//")`

Setup infra:

`cd ops && make infra`

Deploy code:

`make deploy`

## ToDo

- Setup multi-site deployment:
  - Do through ops, have list of products and for each create:
  - new db
  - new cms
  - new preview
  - new subdomains for each
  - Add Site model with S3 bucket name
  - Setup cdn for new website
- Setup CI / CD
- Add card tests
- Add testing to CMS
- Move to typescript (Auto supported by gatsby)

- Fix jwnwilson-kube.co.uk redirect (Not worth the cost currently pointing at single node in cluster)
  - Need to setup reserved ip address for A record in DNS
  - https://www.scaleway.com/en/docs/using-a-load-balancer-to-expose-your-kubernetes-kapsule-ingress-controller-service/#-Using-a-Reserved-IP-as-the-IP-Address-of-Your-Load-Balancer

- Scale out client
- Create node package for new projects to import
- Setup sentry on client