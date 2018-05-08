#!/bin/bash

# move into project root
cd ~/bookmarks-api

# pull updates
git pull

# run bootstrap.sh script
chmod u+x ./bootstrap.sh
./bootstrap.sh
