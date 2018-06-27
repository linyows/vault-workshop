FROM linyows/consul:1.2-node

RUN apk --no-cache add sqlite-dev git
RUN git clone --depth 1 https://github.com/linyows/sequelize-vault-app app

COPY consul.d /etc/consul.d
COPY consul-template.d /etc/consul-template.d
COPY consul-template.conf /etc/consul-template.conf
COPY supervisor.d /etc/supervisor.d
COPY supervisord.conf /etc/supervisord.conf

WORKDIR /app
RUN npm install

EXPOSE 3000
