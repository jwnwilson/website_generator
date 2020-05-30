.EXPORT_ALL_VARIABLES:

-include local.env

ifndef VERSION
	# Get the active git branch
	VERSION=$(shell cat VERSION)
endif

SHELL := /bin/bash
DOCKER_REPO = 675468650888.dkr.ecr.eu-west-1.amazonaws.com
DOCKER_CONTAINERS = $(shell docker ps -q)

# Run docker-setup to install deps
up: docker-stop docker-setup
	docker-compose -f docker-compose.yml up -d

dev: docker-stop docker-setup
	docker-compose -f docker-compose.yml -f docker-compose-dev.yml up -d

down:
	docker-compose -f docker-compose.yml down

docker-setup:
	docker-compose -f docker-compose.yml run cms npm i
	docker-compose -f docker-compose.yml run builder npm i

# Local Development
setup:
	cd src/client && npm i
	cd src/cms && npm i

# Local dev supporting services
services: docker-stop down
	docker-compose -f docker-compose.yml up -d db

# docker utilities
docker-stop:
ifneq ($(DOCKER_CONTAINERS),)
	-docker kill $(DOCKER_CONTAINERS)
endif