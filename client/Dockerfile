FROM node:18-alpine

WORKDIR /app

COPY package*.json ./

ENV NODE_TLS_REJECT_UNAUTHORIZED=0

RUN npm install

COPY . .

RUN npm run build

ENV NODE_ENV production

EXPOSE 3000

CMD ["npm", "run", "start"]
