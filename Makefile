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
up: docker-stop
	docker-compose -f docker-compose.yml up -d

down:
	docker-compose -f docker-compose.yml down

# Local Development
setup:
	cd src/server && pip install -r requirements/local.txt
	cd src/client && npm i

services: docker-stop
	docker-compose -f docker-compose.yml up -d db

# docker utilities
docker-stop:
ifneq ($(DOCKER_CONTAINERS),)
	-docker kill $(DOCKER_CONTAINERS)
endif