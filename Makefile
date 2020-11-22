.EXPORT_ALL_VARIABLES:

-include local.env

ifndef VERSION
	# Get the active git branch
	VERSION=$(shell cat VERSION)
endif

SHELL := /bin/bash
AWS_ACCOUNT = 675468650888
DOCKER_REPO = $(AWS_ACCOUNT).dkr.ecr.eu-west-1.amazonaws.com
DOCKER_CONTAINERS = $(shell docker ps -q)
AWS_REGION = eu-west-1
AWS_ACCESS_KEY_ID=$(TF_VAR_aws_access_key)
AWS_SECRET_ACCESS_KEY=$(TF_VAR_aws_secret_key)
CDN_ID = "EDQHVNYKREFIB"

# Run docker-setup to install deps
up: stop setup
	docker-compose -f docker-compose.yml up -d

dev: stop setup
	docker-compose -f docker-compose.yml -f docker-compose-dev.yml up -d

dev-admin: stop setup-local
	docker-compose run -d --service-ports db
	cd src/cms && npm run develop &
	cd src/cms && npm run develop:admin &

down:
	docker-compose -f docker-compose.yml down

setup:
	docker-compose -f docker-compose.yml run cms npm i
	docker-compose -f docker-compose.yml run client npm i

cms: services
	cd src/cms && NODE_ENV=development npm run develop

client:
	cd src/client && NODE_ENV=development npm run develop

# Local Development
setup-local:
	cd src/client && npm i
	cd src/cms && npm i

# Local dev supporting services
services: stop down
	docker-compose -f docker-compose.yml up -d db

# docker utilities
stop:
	-pkill -f "npm run"
	-pkill -f "strapi"
ifneq ($(DOCKER_CONTAINERS),)
	-docker kill $(DOCKER_CONTAINERS)
endif

# Deployment

build:
	rm -rf src/client/.cache
	rm -rf src/cms/.cache
	cd src/cms && npm run build
	docker build -t $(DOCKER_REPO)/website_cms .
	cd ops/nginx && docker build -t $(DOCKER_REPO)/website_nginx .

# Login to AWS and set a 12 hour access token for the cluster have access to the AWS ECR repo
login:
	cd ops && make kube-auth

push: login build
	# Using defined aws env vars
	docker push $(DOCKER_REPO)/website_cms
	docker push $(DOCKER_REPO)/website_nginx

# increase version
# push images to ecr
# NOTE: Requires aws creds in ~/.aws/config
deploy: push
	# refresh kubernetes deployments
	cd ops && make refresh-deployment
	# invalidate cdn
	make refresh-cdn

# This is handled in the strapi webhooks automatically
refresh-preview:
	curl -X POST https://preview.jwnwilson-kube.co.uk/__refresh

refresh-cdn:
	aws cloudfront create-invalidation --distribution-id $(CDN_ID) --paths "/*"