#! /bin/bash

export AWS_ACCESS_KEY_ID="${AWS_ACCESS_KEY_ID}"
export AWS_SECRET_ACCESS_KEY="${AWS_SECRET_ACCESS_KEY}"

DOCKER_CMD=`aws ecr get-login --region ${AWS_REGION} --registry-ids ${AWS_ACCOUNT} | sed "s/-e none//"`
TOKEN=`echo ${DOCKER_CMD} | cut -d ' ' -f6`
eval echo ${DOCKER_CMD}

kubectl delete secret --ignore-not-found regcred
kubectl create secret docker-registry regcred \
--docker-server=https://${DOCKER_REPO} \
--docker-username=AWS \
--docker-password="${TOKEN}" \
--docker-email="jwnwilson@gmail.com"