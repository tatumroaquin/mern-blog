#!/bin/bash

# Restart mern-blog app in pm2

source /home/ubuntu/.bashrc
source /home/ubuntu/.profile

DOTENV_KEY="$(aws ssm get-parameter --with-decryption --name '/mern-blog/secrets/DOTENV_KEY' --query 'Parameter.Value')"
export DOTENV_KEY

pm2 restart mern-blog
