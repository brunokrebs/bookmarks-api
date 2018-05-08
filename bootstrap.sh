#!/bin/bash

# move into project root
cd ~/bookmarks-api

# pull updates
git pull

# install subproject dependencies
cd $SUBPROJECT
npm i

# run subproject
npm start
