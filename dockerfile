FROM node:12.18.1
MAINTAINER Noel Wilson <jwnwilson@gmail.com>

# Add project files to DIR
COPY . /app

WORKDIR /app/src/cms

RUN cd ../client && rm -rf node_modules/* && npm i
RUN rm -rf node_modules/* && npm i

CMD NODE_ENV=production npm run start