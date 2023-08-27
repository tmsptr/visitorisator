FROM node:18-alpine3.17 as build

WORKDIR /app

# Copy to working directory
COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

FROM nginx:alpine

COPY --from=build /app/build /usr/share/nginx/html

EXPOSE 80

