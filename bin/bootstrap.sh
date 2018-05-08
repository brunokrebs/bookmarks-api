#!/bin/bash

# create symlink to bookmarks-service
SERVICE_FILE=/etc/systemd/system/bookmarks.service
if [ ! -f $SERVICE_FILE ]; then
    ln -s ~/bookmarks-api/bin/bookmarks.service $SERVICE_FILE
fi

# move into project root
cd ~/bookmarks-api

# pull new source
git pull

# install subproject dependencies
cd $SUBPROJECT
npm i

# run subproject
npm start
