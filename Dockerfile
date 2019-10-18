FROM  ubuntu:16.04


RUN apt-key adv --keyserver hkp://keyserver.ubuntu.com:80 --recv EA312927
RUN echo "deb http://repo.mongodb.org/apt/ubuntu $(cat /etc/lsb-release | grep DISTRIB_CODENAME | cut -d= -f2)/mongodb-org/3.2 multiverse" | tee /etc/apt/sources.list.d/mongodb-org-3.2.list

RUN apt-get update && apt-get install -y --allow-unauthenticated mongodb-org

RUN mkdir -p /data/db
RUN mkdir -p /data/script

COPY data/* /data/script/
RUN chmod +x /data/script/script.sh && sync && ./data/script/script.sh

VOLUME /data/db /data/script

EXPOSE 27017

CMD ["--port 27017", "--smallfiles", "--dbpath /data/db/", "--logpath /var/log/mongodb.log"]

ENTRYPOINT /usr/bin/mongod
