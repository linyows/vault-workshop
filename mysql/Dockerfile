FROM linyows/consul:1.2-agent

COPY mysql /mysql
RUN apk --no-cache add mysql mysql-client && \
    chmod +x /mysql

COPY supervisor.d /etc/supervisor.d
EXPOSE 3306
