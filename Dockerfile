FROM node:latest

EXPOSE 3000

WORKDIR /local/legacy-bank

COPY package*.json ./
COPY tsconfig.json ./

RUN npm install

COPY . .

# RUN npm build

CMD ["npm", "start"]