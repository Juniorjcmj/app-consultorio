FROM node:18.12.1-buster  as angular

WORKDIR /app
COPY package.json /app
 RUN npm install --silent
 COPY . .
 RUN npm run build

FROM nginx:alpine
VOLUME /var/cache/nginx
COPY --from=angular app/dist/app-consultorio /usr/share/nginx/html
COPY ./config/nginx.conf /etc/nginx/conf.d/default.conf


# docker build -t app-gestao .
# docker run -p 8082:80 app-gestao

# ctrl + shift + p docker: Compose up
# depois so escolher o docker-compose.yml
