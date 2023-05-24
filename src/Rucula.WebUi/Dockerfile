FROM node:18-alpine as angular
WORKDIR /app
RUN npm install -g @angular/cli
COPY package.json package-lock.json ./
RUN npm ci
COPY . .

FROM httpd:alpine as httpd
WORKDIR htdocs 
RUN rm index.html
COPY --from=angular /app/dist/rucula.web-ui .
EXPOSE 4040/tcp
RUN chmod -R 775 ./
WORKDIR /usr/local/apache2/conf/
RUN echo "listen 4040" >> httpd.conf
COPY rucula.conf .
RUN echo "Include /usr/local/apache2/conf/rucula.conf" >> httpd.conf




