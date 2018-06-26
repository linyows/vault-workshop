FROM node:10.5-alpine
MAINTAINER linyows <linyows@gmail.com>

ENV CONSUL_VERSION 1.1.0
ENV CONSUL_SHA256 09c40c8b5be868003810064916d8460bff334ccfb59a5046390224b27e052c45

RUN apk --no-cache add openssl curl ca-certificates \
                       autoconf automake libtool linux-headers alpine-sdk git bind-tools supervisor \
                       sqlite-dev curl-dev git

RUN curl -sSL https://releases.hashicorp.com/consul/${CONSUL_VERSION}/consul_${CONSUL_VERSION}_linux_amd64.zip \
    -o /tmp/consul.zip && \
    echo "${CONSUL_SHA256}  /tmp/consul.zip" > /tmp/consul.sha256 && \
    sha256sum -c /tmp/consul.sha256 && \
    cd /bin && \
    unzip /tmp/consul.zip && \
    chmod +x /bin/consul && \
    rm /tmp/consul.zip /tmp/consul.sha256

COPY consul.d /etc/consul.d
COPY supervisor.d /etc/supervisor.d
COPY supervisord.conf /etc/supervisord.conf

RUN git clone --depth 1 https://github.com/linyows/sequelize-vault-app app
WORKDIR /app
RUN npm install

EXPOSE 3000
CMD ["supervisord", "--nodaemon", "--configuration", "/etc/supervisord.conf"]
