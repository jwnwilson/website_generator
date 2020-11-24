# Website generator

This is a strapi and gatsby site builder, this is intended to be a front end builder for my projects. I can then deploy micro-services and other backends to the kubernetes cluster as needed for widgets I create.

### Features

- Code splitting and dynamic code loading
- React / gatsby SSR and re-hydration of pre-rendered widgets
- Custom CMS with automated site deployment
- Automated infra setup and tear down of kubernetes cluster and containers

## Infra Setup

To setup and run this project:

Install dependancies:

- docker
- kubectrl
- awscli
- terraform
- make command

Authenticate aws:

`aws configure` / set ~/.aws/credentials

Set env vars in .bashrc / bash_profile / ci pipeline

```
export TF_VAR_aws_access_key=
export TF_VAR_aws_secret_key=
export TF_VAR_scaleway_access_key=
export TF_VAR_scaleway_secret_key=
export TF_VAR_scaleway_organization_id=

```

Authenticate docker:

`make login`

Setup infra:

`cd ops && make setup`

Teardown infra:

`cd ops && make destroy`

## Deployment

To build a cms image and push to AWS ECR run:

`make deploy`

This will also trigger a kubernetes cluster refresh and CDN invalidation.

To make changes / see a final website:

- Go to the CMS url
- Add pages and modify data
- See results on the preview url
- Publish pages via the CMS publish button
- Wait for deployment in the CMS to kick off
- Then visit the site url

## ToDo

- Setup CI / CD
- Add card tests
- Add testing to CMS
- Move to typescript (Auto supported by gatsby)
- Setup sentry on client and cms

```
Note: should use a load balancer in front of the cluster but not worth the cost currently pointing at single node in cluster
  - Need to setup reserved ip address for A record in DNS
  - https://www.scaleway.com/en/docs/using-a-load-balancer-to-expose-your-kubernetes-kapsule-ingress-controller-service/#-Using-a-Reserved-IP-as-the-IP-Address-of-Your-Load-Balancer
```
