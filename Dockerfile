FROM node:12-alpine AS development

RUN apk add --no-cache --update --quiet dumb-init=~1 util-linux=~2

WORKDIR /code

COPY package.json /code
COPY yarn.lock /code
RUN yarn install --frozen-lockfile && yarn cache clean

COPY . /code
RUN yarn run parcel build src/index.html --out-dir=out

EXPOSE 1234

ENTRYPOINT ["/usr/bin/dumb-init", "--"]
CMD ["yarn", "run", "parcel", "src/index.html"]

FROM nginx:alpine AS static

COPY --from=development /code/out /usr/share/nginx/html/

CMD ["nginx", "-g", "daemon off;"]
