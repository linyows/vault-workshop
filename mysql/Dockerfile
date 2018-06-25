FROM alpine:3.7
MAINTAINER linyows <linyows@gmail.com>

COPY entry.sh /entry.sh
RUN apk --no-cache add  mysql mysql-client && chmod +x /entry.sh
#COPY my.cnf /etc/mysql/my.cnf

EXPOSE 3306
ENTRYPOINT "/entry.sh"
