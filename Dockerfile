FROM node:14-alpine

ENV app_password '12345678'

ENV main_db 'mongodb://mongo-db:27017'

ENV NODE_ENV production

WORKDIR /rent-a-vids

COPY ["package.json", "package-lock.json*", "./"]

RUN npm install

COPY . .

CMD ["npm", "start"]