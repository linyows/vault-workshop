FROM linyows/consul:1.2-node

RUN apk --no-cache add sqlite-dev git
RUN git clone --depth 1 https://github.com/linyows/sequelize-vault-app app

COPY consul-template.conf /etc/consul-template.conf
COPY supervisor.d/express.ini /etc/supervisor.d/express.ini

WORKDIR /app
RUN npm install

EXPOSE 3000
