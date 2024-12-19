FROM node:22

WORKDIR /app

COPY package.json yarn.lock ./

RUN yarn install --production

COPY . .

RUN yarn build:backend

EXPOSE 3000

CMD ["yarn", "start:backend"]