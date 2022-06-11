FROM node:16.6-alpine as build-stage

WORKDIR /local/legacy-bank

COPY . .

RUN npm install && npm run build

FROM nginx:alpine

COPY nginx.conf /etc/nginx/conf.d/default.conf

WORKDIR /usr/share/nginx/html

RUN rm -rf ./*

COPY --from=build-stage /local/legacy-bank/build .

CMD ["nginx", "-g", "daemon off;"]
