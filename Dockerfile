FROM node:16.6-alpine

WORKDIR /local/legacy-bank

COPY package*.json ./
COPY tsconfig.json ./

RUN npm install

COPY . .

# RUN npm build

CMD ["npm", "start"]