FROM nginx:1.13.5-alpine

# we need bash for adding the runtime envs
RUN apk add --no-cache bash

RUN rm -rf /usr/share/nginx/html/*

COPY . /usr/share/nginx/html

COPY scripts /add-runtime-envs.sh

COPY scripts /init.sh

CMD ["/init.sh"]
