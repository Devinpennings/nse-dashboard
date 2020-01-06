FROM node:lts-alpine

RUN npm install -g http-server

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

ARG API_URL
ENV API_URL $API_URL

RUN npm run build

EXPOSE 80
CMD [ "http-server", "-p 80", "dist" ]
