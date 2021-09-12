FROM nginx:latest

WORKDIR /usr/share/nginx/html

RUN rm -rf ./*

COPY ./build .

WORKDIR /etc/nginx

COPY ./hackit.conf /etc/nginx/conf.d/hackit.conf
# COPY ./auto.posts.test.conf /etc/nginx/conf.d/

EXPOSE 80

ENTRYPOINT ["nginx", "-g", "daemon off;"]
