#! /usr/bin/env bash

mongod --fork --port 27017 --smallfiles --logpath /var/log/mongodb.log --dbpath /data/db/

mongoimport --db historic --collection movies --file /data/script/historic.json --jsonArray

mongod --shutdown
