# Running mongo local instance

## install docker
install docker read the instruction on
[Install Docker from official site](https://docs.docker.com/engine/installation/)

## running docker

Build docker image from command line
the name of the image is "local_mongo".
Can changed for any

```bash
docker build -t local_mongo . 
```
Then run this command to spin up  mongo on port 27017

```bash
docker run --name=mongodb_instance -p 27017:27017  -i -d local_mongo
```

After this point could connect to mongo on 127.0.0.1:mongo

Stop the mongo instance
```bash
docker stop mongodb_instance 
```


Start again the mongo instance
```bash
docker start mongodb_instance 
```

to remove the docker container should use
```bash
docker rm $(docker ps -aq)
```
to remove any docker image should use
(be sure to do that)
```bash
docker rmi --force $(docker images -q)
```