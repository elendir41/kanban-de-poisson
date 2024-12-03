FROM node:lts-alpine as builder
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm install
COPY . .
RUN npm run build

FROM nginx:1.21.5-alpine
COPY --chown=nginx:nginx nginx.conf /etc/nginx/conf.d/default.conf
COPY --chown=nginx:nginx --from=builder /app/build /var/www/html/