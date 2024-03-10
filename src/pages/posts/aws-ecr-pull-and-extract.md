---
title: 'How to pull the AWS ECR docker image and extract all things in the docker image?'
date: '2021-04-21'
slug: 'aws-ecr-pull-and-extract'
description: 'Useful tips for AWS to pull docker image and, access all content in it.'
author:
  name: 'Pooya Golchian'
  bio: 'Frontend Developer'
  img: '/img/avatar/pooya-golchian.png'
---

## Intro

Maybe you faced the problem that you have been needed the old docker file in the ECR repository.
I solved this problem with the docker command to pull and extract the docker image and access all I need.

## Pulling Docker image file

You can use the below command to pull the docker image that you push in the ECR repository:

```bash
docker pull YOUR_DOCKER_IMAGE_URL
```

## Run your desire command in docker image

You can run and execute a command in your docker image:

```bash
docker run --rm -it --entrypoint=/bin/bash YOUR_DOCKER_IMAGE_URL
```

For example:

```bash
docker run --rm -it --entrypoint=/bin/bash YOUR_DOCKER_IMAGE_URL ls -la
```

## Extract Docker image and searching in the files

```bash
 docker image save YOUR_DOCKER_IMAGE_URL > img.tar
```

After that, you extract the docker image and find your target files:

```bash
 tar -xvf img.tar
```
