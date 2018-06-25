FROM node:10.5-alpine
MAINTAINER linyows <linyows@gmail.com>

RUN apk --no-cache add sqlite-dev curl-dev

ADD app /app
WORKDIR /app
RUN npm install

EXPOSE 3000
CMD [ "npm", "start" ]
