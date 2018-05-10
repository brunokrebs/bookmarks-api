#!/bin/bash

# create symlink to bookmarks-service
systemctl enable /home/ubuntu/bookmarks-api/bin/bookmarks.service

# move into project root
cd /home/ubuntu/bookmarks-api

# pull new source
git pull

# install subproject dependencies
source /etc/environment
cd $SUBPROJECT
npm i

# run subproject
npm start
