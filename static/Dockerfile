FROM alpine:latest

WORKDIR /app

RUN apk add --update nodejs npm

COPY ./package.json ./
RUN npm install

COPY . ./

RUN npm run build