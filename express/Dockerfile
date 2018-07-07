FROM linyows/consul:1.2-node

RUN apk --no-cache add sqlite-dev git
RUN git clone --depth 1 https://github.com/linyows/sequelize-vault-app app

COPY consul-template.conf /etc/consul-template.conf
COPY supervisor.d/express.ini /etc/supervisor.d/express.ini
COPY supervisord.conf /etc/supervisord.conf

#COPY ca.crt /usr/share/ca-certificates/extra/Vault_Root_CA.crt
RUN chmod +x /etc/consul-template.d/update_ca_certs && /etc/consul-template.d/update_ca_certs

WORKDIR /app
RUN npm install

EXPOSE 3000
