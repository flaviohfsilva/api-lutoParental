FROM node:18 as nestjs

WORKDIR /home/node/app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

ENV TZ="America/Recife"

RUN npm i -g @nestjs/cli

CMD [ "npm", "run", "start:dev" ]