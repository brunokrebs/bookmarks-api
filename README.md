## Bookmarks API

Reference for further reading:

- AWS Config
- AWS EC2
- AWS AMI
- AWS CodePipeline
- AWS RDS
- AWS SQS
- AWS CloudWatch
- AWS Batch
- AWS System Manager
- AWS Systems Manager Parameter Store

### AWS AMI

This Git repository contains the code of an AWS image named `bk-cw-bookmarks-image`. This image contains the code for all pieces that run on AWS EC2 instances. Sub-projects are encapsulated into their own directory. At the time of writing, there are four sub-projects:

- `enqueuer`: fetches bookmarks from the `webapp` and inserts them on a SQS queue.
- `webapp`: provides endpoints so consumers can CRUD bookmarks.
- `worker`: reads bookmarks from the SQS queue and check if they are valid.
- `cli`: provides 

To run this image, one has to set some environment variables. The most important variable is `SUBPROJECT`, which defines which sub-project must be ran. As this sub-project will most likely depend on other environment variables, one might have to set them too.

### AWS Code Pipeline

I have created an AWS Code Pipeline that points to [this GitHub repository](https://github.com/brunokrebs/bookmarks-api) to automate the build process.

- The source: [this GitHub repository](https://github.com/brunokrebs/bookmarks-api).
- The branch: `master`
- Build provider: AWS CodeBuild
- Project name: `bk-cw-bookmarks-api`
- Environment image: Specify a Docker image
- Custom image type: Other
- Custom image ID: `jakubknejzlik/docker-git-node-app`
- Build command: `git pull && npm install`
