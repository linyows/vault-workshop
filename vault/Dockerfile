FROM alpine:3.7
MAINTAINER linyows <linyows@gmail.com>

ENV CONSUL_VERSION 1.2.0
ENV CONSUL_SHA256 85d84ea3f6c68d52549a29b00fd0035f72c2eabff672ae46ca643cb407ef94b4

ENV CONSUL_TEMPLATE_VERSION 0.19.5
ENV CONSUL_TEMPLATE_SHA256 e6b376701708b901b0548490e296739aedd1c19423c386eb0b01cfad152162af

ENV VAULT_VERSION 0.10.3
ENV VAULT_SHA256 ffec1c201f819f47581f54c08653a8d17ec0a6699854ebd7f6625babb9e290ed
ENV VAULT_ADDR https://127.0.0.1:8200
ENV VAULT_SKIP_VERIFY true
ENV COMMON_NAME *.service.consul

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

RUN curl -sSL https://releases.hashicorp.com/consul-template/${CONSUL_TEMPLATE_VERSION}/consul-template_${CONSUL_TEMPLATE_VERSION}_linux_amd64.zip \
    -o /tmp/consul-template.zip && \
    echo "${CONSUL_TEMPLATE_SHA256}  /tmp/consul-template.zip" > /tmp/consul-template.sha256 && \
    sha256sum -c /tmp/consul-template.sha256 && \
    cd /bin && \
    unzip /tmp/consul-template.zip && \
    chmod +x /bin/consul-template && \
    rm /tmp/consul-template.zip /tmp/consul-template.sha256

RUN curl -sSL https://releases.hashicorp.com/vault/${VAULT_VERSION}/vault_${VAULT_VERSION}_linux_amd64.zip \
    -o /tmp/vault.zip && \
    echo "${VAULT_SHA256}  /tmp/vault.zip" > /tmp/vault.sha256 && \
    sha256sum -c /tmp/vault.sha256 && \
    cd /bin && \
    unzip /tmp/vault.zip && \
    chmod +x /bin/vault && \
    rm /tmp/vault.zip /tmp/vault.sha256

COPY consul.d /etc/consul.d
COPY consul-template.d /etc/consul-template.d
COPY consul-template.conf /etc/consul-template.conf
COPY supervisor.d /etc/supervisor.d
COPY supervisord.conf /etc/supervisord.conf
COPY vault.d /etc/vault.d
COPY vault.conf /etc/vault.conf

RUN cd /etc/vault.d && \
    openssl req -x509 -days 1 -newkey rsa:2048 -nodes \
    -out tls.crt -keyout tls.key -subj "/C=/ST=/L=/O=/OU=/CN=$COMMON_NAME"

EXPOSE 8125 8200 8301 8301/udp
CMD ["supervisord", "--nodaemon", "--configuration", "/etc/supervisord.conf"]
