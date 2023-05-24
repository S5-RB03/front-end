# build stage
FROM node:16-alpine as build-stage
WORKDIR /app
COPY ./sevyh/package*.json ./
RUN npm install
COPY ./sevyh . 
RUN npm run build

# production stage
FROM nginx:1.19.0-alpine as production-stage
COPY --from=build-stage /app/dist /usr/share/nginx/html
EXPOSE 8080
CMD ["nginx", "-g", "daemon off;"]
