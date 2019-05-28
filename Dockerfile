FROM node:10-alpine as node

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm ci

COPY . .

CMD node ./bin/www