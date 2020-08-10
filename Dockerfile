FROM node:12-alpine

# couchbase sdk requirements
RUN apk update && apk add python make g++ && rm -rf /var/cache/apk/*

RUN npm i -g nodemon

ADD package.json /tmp/package.json
ADD package-lock.json /tmp/package-lock.json
RUN cd /tmp && npm install --production=true

# remove unused deps
RUN rm -rf tmp/node_modules/@angular
RUN rm -rf tmp/node_modules/typescript
RUN rm -rf tmp/node_modules/@angular-devkit
RUN rm -rf tmp/node_modules/prettier
RUN rm -rf tmp/node_modules/cypress
RUN rm -rf tmp/node_modules/@schematics
RUN rm -rf tmp/node_modules/@nrwl
RUN rm -rf tmp/node_modules/@babel
RUN rm -rf tmp/node_modules/core-js
RUN rm -rf tmp/node_modules/node-notifier
RUN rm -rf tmp/node_modules/jsdom
RUN rm -rf tmp/node_modules/moment
RUN rm -rf tmp/node_modules/lodash
RUN rm -rf tmp/node_modules/less
RUN rm -rf tmp/node_modules/eslint
RUN rm -rf tmp/node_modules/sass
RUN rm -rf tmp/node_modules/@jest
RUN rm -rf tmp/node_modules/zone.js
RUN rm -rf tmp/node_modules/tslint
RUN rm -rf tmp/node_modules/csso
RUN rm -rf tmp/node_modules/date-fns
RUN rm -rf tmp/node_modules/caniuse-lite
RUN rm -rf tmp/node_modules/es-abstract
RUN rm -rf tmp/node_modules/ramda
RUN rm -rf tmp/node_modules/rollup
RUN rm -rf tmp/node_modules/terser
RUN rm -rf tmp/node_modules/webpack
RUN rm -rf tmp/node_modules/resolve-url-loader
RUN rm -rf tmp/node_modules/postcss-modules-local-by-default
RUN rm -rf tmp/node_modules/postcss
RUN rm -rf tmp/node_modules/expect
RUN rm -rf tmp/node_modules/css-tree
RUN rm -rf tmp/node_modules/codelyzer
RUN rm -rf tmp/node_modules/@types
RUN rm -rf tmp/node_modules/webpack-dev-server
RUN rm -rf tmp/node_modules/regenerate-unicode-properties
RUN rm -rf tmp/node_modules/node-forge
RUN rm -rf tmp/node_modules/source-map-loader
RUN rm -rf tmp/node_modules/regexpp
RUN rm -rf tmp/node_modules/espree
RUN rm -rf tmp/node_modules/stylus
RUN rm -rf tmp/node_modules/sockjs-client
RUN rm -rf tmp/node_modules/getos
RUN rm -rf tmp/node_modules/ajv
RUN rm -rf tmp/node_modules/acorn
RUN rm -rf tmp/node_modules/@webassemblyjs

RUN mkdir -p /app/api && cp -a /tmp/node_modules /app/api/

WORKDIR /app/api
COPY dist/apps/geek-platform-api/ /app/api
COPY dist/apps/geek-platform/ /app/geek-platform

EXPOSE 4001

CMD [ "nodemon", "main.js" ]