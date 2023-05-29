FROM node

WORKDIR /usr/src/app

COPY package*.json .

RUN npm install

COPY . .

COPY ./dist/static ./dist/static