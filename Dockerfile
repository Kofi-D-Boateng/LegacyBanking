FROM node:16.6-alpine

EXPOSE 3000

WORKDIR /local/legacy-bank

COPY package*.json ./
COPY tsconfig.json ./

RUN npm install

COPY . .

# RUN npm build

CMD ["npm", "start"]