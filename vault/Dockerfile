FROM linyows/consul:1.2-agent

ENV VAULT_VERSION 0.11.0
ENV VAULT_SHA256 1681579a5a158a76e37de2854307d649b75ceddd663e71580df25baae036c267
ENV VAULT_ADDR https://127.0.0.1:8200
ENV VAULT_SKIP_VERIFY true
ENV COMMON_NAME vault.service.consul

RUN curl -sSL https://releases.hashicorp.com/vault/${VAULT_VERSION}/vault_${VAULT_VERSION}_linux_amd64.zip \
    -o /tmp/vault.zip && \
    echo "${VAULT_SHA256}  /tmp/vault.zip" > /tmp/vault.sha256 && \
    sha256sum -c /tmp/vault.sha256 && \
    cd /bin && \
    unzip /tmp/vault.zip && \
    chmod +x /bin/vault && \
    rm /tmp/vault.zip /tmp/vault.sha256

COPY consul-template.d/reload_vault /etc/consul-template.d/reload_vault
COPY consul-template.conf /etc/consul-template.conf
COPY supervisor.d/vault.ini /etc/supervisor.d/vault.ini
COPY vault.d /etc/vault.d
COPY vault.conf /etc/vault.conf

RUN chmod +x /etc/consul-template.d/*
RUN openssl req -x509 -days 30 -newkey rsa:2048 -nodes \
    -out /etc/vault.d/tls.crt -keyout /etc/vault.d/tls.key -subj "/C=/ST=/L=/O=/OU=/CN=$COMMON_NAME"

EXPOSE 8125 8200 8301 8301/udp
