## Bookmarks API

This Git repository contains the code of an AWS image named `bk-cw-bookmarks-image`. This image contains the code for all pieces that run on AWS EC2 instances. Sub-projects are encapsulated into their own directory. At the time of writing, there were four sub-projects:

- `enqueuer`: fetches bookmarks from the `webapp` and inserts them on a SQS queue.
- `webapp`: provides endpoints so consumers can CRUD bookmarks.
- `worker`: reads bookmarks from the SQS queue and check if they are valid.
- `cli`: provides 

To run this image, one has to set some environment variables. The most important variable is `sub-project`, which defines which sub-project must be ran. As this sub-project will most likely depend on other environment variables, one might have to set them too.
