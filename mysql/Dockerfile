FROM linyows/consul:1.2-agent

RUN apk --no-cache add mysql mysql-client
COPY mysql /mysql
COPY supervisor.d /etc/supervisor.d
RUN chmod +x /mysql

EXPOSE 3306
