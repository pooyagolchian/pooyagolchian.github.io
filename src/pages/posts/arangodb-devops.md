---
layout: ../../layouts/MarkdownPostLayout.astro
title: 'Arangodb install last version and configuration and backup and restore from Amazon AWS'
pubDate: '2020-07-22'
slug: 'images'
description: 'I use Shell script for all steps to automate Arangodb backup and update from a to z!'
cover: '/images/arango-devops.webp'
coverAlt: 'database image'
tags: ['database', 'DevOps']
---

### Intro

I use Shell script for all steps to automate Arangodb backup and update from a to z!

### Install last verison of Arangodb on Ubuntu 18.04

For installation, you should visit the Arango website to check the last version of this database.
Now the last version is `3.6.5-1`.
For installing this version and configuration web interface run the below sh file on your server,
in this example, I'm testing this script on the AWS EC2 server.

#### WARNING!

You should stop arangodb3 and turn your application into maintenance mode!

```bash
#!/bin/bash
sudo systemctl stop arangodb3.service
sudo cp /etc/arangodb3/ ~/arango-config-backup
curl -OL https://download.arangodb.com/arangodb36/DEBIAN/Release.key
sudo apt-key add - < Release.key
echo 'deb https://download.arangodb.com/arangodb36/DEBIAN/ /' | sudo tee /etc/apt/sources.list.d/arangodb.list
sudo apt-get install apt-transport-https
sudo apt-get update
sudo apt-get install arangodb3=3.6.5-1
sudo sed -i "s+endpoint = tcp://127.0.0.1:8529+endpoint = tcp://0.0.0.0:8529+g" /etc/arangodb3/arangod.conf
sudo sed -i "s+endpoint = tcp://127.0.0.1:8529+endpoint = tcp://0.0.0.0:8529+g" /etc/arangodb3/arangosh.conf
sudo sed -i "s+endpoint = tcp://127.0.0.1:8529+endpoint = tcp://0.0.0.0:8529+g" /etc/arangodb3/foxx-manager.conf
sudo sed -i "s/#queues = true/queues = true/g" /etc/arangodb3/arangod.conf
sudo systemctl enable arangodb3.service
sudo systemctl start arangodb3.service
sudo systemctl status arangodb3.service
sudo sysctl -w "vm.max_map_count=1024000"
```

### Arangodb backup and upload to s3

```bash
#!/bin/sh
NOWDATE=`date +%Y-%m-%d`
LASTDATE=$(date +%Y-%m-%d --date='1 week ago')
DIRNAME="Your directory name"
BUCKETNAME="Your bucketname in S3"
DATABASENAME="Your database name"
if [ -d "/home/ubuntu/backup/$DIRNAME" ]
then
    echo "Directory /home/ubuntu/backup/$DIRNAME exists."
else
    echo "Error: Directory /home/ubuntu/backup/$DIRNAME does not exists."
    `mkdir -p /home/ubuntu/backup/$DIRNAME`
    echo "FOLDER $DIRNAME CREATED!"
fi
arangodump --server.endpoint tcp://127.0.0.1:8529 --server.username root --server.password 'as&m0ssJM1299' --server.database $DATABASENAME --output-directory "/home/ubuntu/backup/$DIRNAME/" --compress-output --overwrite true
tar -czvf /home/ubuntu/backup/$NOWDATE-$DATABASENAME-backup.tar.gz -C /home/ubuntu/backup/$DIRNAME .
aws s3 cp /home/ubuntu/backup/$NOWDATE-$DATABASENAME-backup.tar.gz  s3://$BUCKETNAME/dbbackup/
aws s3 rm s3://$BUCKETNAME/dbbackup/$LASTDATE-$DATABASENAME-backup.tar.gz
rm -rf /home/ubuntu/backup/$NOWDATE-$DATABASENAME-backup.tar.gz
rm -rf  /home/ubuntu/backup/$DIRNAME/*
```

### Arangodb restore and download from s3

```bash
#!/bin/sh
DIRNAME="Your directory name"
BUCKETNAME="Your bucket name in S3"
DATABASENAME="Your database name"
echo "Please enter file date (ONLY DATE LIKE 2020-07-16):"
read FILE_NAME
if [ -d "/home/ubuntu/backup/$DIRNAME" ]
then
    echo "Directory /home/ubuntu/backup/$DIRNAME exists."
else
    echo "Error: Directory /home/ubuntu/backup/$DIRNAME does not exists."
    exit "Please backup database with shell script"
fi
aws s3 cp  s3://$BUCKETNAME/dbbackup/$FILE_NAME-$DATABASENAME-backup.tar.gz  /home/ubuntu/backup/
tar -xzvf /home/ubuntu/backup/$FILE_NAME-$DATABASENAME-backup.tar.gz -C /home/ubuntu/backup/$DIRNAME
arangorestore --server.endpoint tcp://127.0.0.1:8529 --server.username root --server.password 'as&m0ssJM1299' --server.database $DATABASENAME --input-directory "/home/ubuntu/backup/$DIRNAME" --create-database
rm -rf /home/ubuntu/backup/$FILE_NAME-$DATABASENAME-backup.tar.gz
rm -rf  /home/ubuntu/backup/$DIRNAME/*
```

### Add systemd service for life!

It's a really good feature to automated tasks with system service to manage all services separately.

1- First you go to `/etc/systemd/system` and add `backup.servive` and `backup.timer`
2- Backup service file for the run backup script
3- Timer for the run backup script and specific time.

```bash
[Unit]
Description=Schedule to run backup service
[Timer]
OnCalendar=
OnCalendar=*-*-* 02:30:00
Unit=backup.service
[Install]
WantedBy=multi-user.target
```

```bash
[Unit]
Description=Run sportbook  Arango DB backup script [Service]
[Service]
ExecStart=/bin/bash /home/ubuntu/backup/backup.sh
```

After creating these two files in the system you must restart the service like below:

```
sudo systemctl daemon-reload
sudo systemctl start backup.time
sudo systemctl status backup.time

```

Now you have an automatic backup system with a timer on your server.
