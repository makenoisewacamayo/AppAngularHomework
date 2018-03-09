# Requirements

* node version 8.x, strongly suggest 8.10
* npm 5.x

Can use node version manager (nvm for short) to get local envionment

[Setup nvm](https://github.com/creationix/nvm/blob/master/README.md)



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

# To run the accedo-server

* Run first the docker instance
* Go to
```bash
cd accedo-server && npm start
```
[Detail Instruction here](accedo-server/Readme.md)


# To run the accedo-ui

* be sure than accedo-server is up an running

* Go to

```bash
cd accedo-ui && npm start
```

[Detail Instruction here](accedo-ui/README.md)


