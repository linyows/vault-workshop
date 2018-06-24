FROM alpine:latest
MAINTAINER linyows <linyows@gmail.com>

ENV CONSUL_VERSION 1.1.0
ENV CONSUL_SHA256 09c40c8b5be868003810064916d8460bff334ccfb59a5046390224b27e052c45

ENV VAULT_VERSION 0.10.3
ENV VAULT_SHA256 ffec1c201f819f47581f54c08653a8d17ec0a6699854ebd7f6625babb9e290ed
ENV VAULT_ADDR https://127.0.0.1:8200
ENV VAULT_SKIP_VERIFY true

ENV COMMON_NAME *.service.consul
ENV KEY_NAME vault.service.consul

RUN apk --no-cache add openssl curl ca-certificates \
                       autoconf automake libtool linux-headers alpine-sdk git bind-tools supervisor

RUN curl -sSL https://releases.hashicorp.com/consul/${CONSUL_VERSION}/consul_${CONSUL_VERSION}_linux_amd64.zip \
    -o /tmp/consul.zip && \
    echo "${CONSUL_SHA256}  /tmp/consul.zip" > /tmp/consul.sha256 && \
    sha256sum -c /tmp/consul.sha256 && \
    cd /bin && \
    unzip /tmp/consul.zip && \
    chmod +x /bin/consul && \
    rm /tmp/consul.zip /tmp/consul.sha256

RUN curl -sSL https://releases.hashicorp.com/vault/${VAULT_VERSION}/vault_${VAULT_VERSION}_linux_amd64.zip \
    -o /tmp/vault.zip && \
    echo "${VAULT_SHA256}  /tmp/vault.zip" > /tmp/vault.sha256 && \
    sha256sum -c /tmp/vault.sha256 && \
    cd /bin && \
    unzip /tmp/vault.zip && \
    chmod +x /bin/vault && \
    rm /tmp/vault.zip /tmp/vault.sha256

RUN cd /etc/ssl/private && \
    openssl req -x509 -days 36500 -newkey rsa:2048 -nodes \
    -out $KEY_NAME.crt -keyout $KEY_NAME.key -subj "/C=/ST=/L=/O=/OU=/CN=$COMMON_NAME"

COPY consul.d /etc/consul.d
COPY supervisor.d /etc/supervisor.d
COPY supervisord.conf /etc/supervisord.conf
COPY vault.d /etc/vault.d
COPY vault.conf /etc/vault.conf

EXPOSE 8125 8200 8301 8301/udp
CMD ["supervisord", "--nodaemon", "--configuration", "/etc/supervisord.conf"]
