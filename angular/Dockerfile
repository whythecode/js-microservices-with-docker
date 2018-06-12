# Install stage
FROM node:8-alpine as install

RUN mkdir -p /usr/src/app

WORKDIR /usr/src/app

RUN npm install -g npm@6.1.0

COPY package.json package-lock.json ./

RUN npm install

COPY . ./


# Build stage
FROM node:8-alpine as build

RUN mkdir -p /usr/src/app

WORKDIR /usr/src/app

COPY --from=install /usr/src/app /usr/src/app

RUN npm run build:prod


# Deployment stage
FROM nginx:1.13.5-alpine as deploy

# copy generated files
RUN rm -rf /usr/share/nginx/html/*
COPY --from=build /usr/src/app/dist /usr/share/nginx/html/

# we need bash for adding the runtime envs
RUN apk add --no-cache bash

# dumb init (forwards process signals from docker - see https://github.com/Yelp/dumb-init)
COPY prod/dumb-init_1.2.1_amd64 /usr/bin/dumb-init
ENTRYPOINT ["/usr/bin/dumb-init", "--"]

# set ENVs for runtime builder
ENV INDEX_HTML_PATH /usr/share/nginx/html/index.html
ENV OUTPUT_PATH /usr/share/nginx/html/env.json

# runtime builder
COPY scripts/add-runtime-envs.sh /add-runtime-envs.sh

# init script
COPY scripts/init-nginx-with-runtime-envs.sh /init.sh

# nginx conf
COPY prod/nginx.conf /etc/nginx/conf.d/default.conf

CMD ["/init.sh"]
