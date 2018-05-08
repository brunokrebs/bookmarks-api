#!/bin/bash

# create symlink to bookmarks-service
SERVICE_FILE=/etc/systemd/system/bookmarks.service
cp /home/ubuntu/bookmarks-api/bin/bookmarks.service $SERVICE_FILE

# move into project root
cd /home/ubuntu/bookmarks-api

# pull new source
git pull

# install subproject dependencies
cd $SUBPROJECT
npm i

# run subproject
npm start
