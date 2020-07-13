FROM node:12.18.1
MAINTAINER Noel Wilson <jwnwilson@gmail.com>

# Install AWS cli for deployment
RUN curl "https://s3.amazonaws.com/aws-cli/awscli-bundle.zip" -o "awscli-bundle.zip" && \
    unzip awscli-bundle.zip && \
    ./awscli-bundle/install -b /bin/aws

# Add project files to DIR
COPY . /app

WORKDIR /app/src/cms

RUN cd ../client && rm -rf node_modules/* && npm i
RUN rm -rf node_modules/* && npm i

CMD NODE_ENV=production npm run start