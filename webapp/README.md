# Bookmarks System

[![Build Status](https://travis-ci.org/auth0-eng-camp/scalability-lab05.svg?branch=begin_solution)](https://travis-ci.org/auth0-eng-camp/scalability-lab05)

Use env variables to avoid putting them on Git:

```bash
export PG_USER=bk_bookmarks
export PG_PASSWORD=bk_bookmarks
export PG_URL=bk-bookmarks.cdojwkdc2vul.us-east-2.rds.amazonaws.com
export PG_PORT=5432
export PG_DATABASE=bookmarks
```

Then, just issue `npm start`.

To set up the Postgres database, you can run (it uses the same env variables set above):

```
./node_modules/.bin/node-pg-migrate up
```