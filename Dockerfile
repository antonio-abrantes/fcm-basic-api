FROM node:20-alpine AS build

WORKDIR /home/development/docker-app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 3000

CMD ["npm", "start"]