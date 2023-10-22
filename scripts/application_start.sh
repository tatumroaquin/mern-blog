#!/bin/bash

# Restart mern-blog app in pm2

cd "/home/ubuntu/mern-blog" || return

DOTENV_KEY="$(aws ssm get-parameter --with-decryption --name '/mern-blog/secrets/DOTENV_KEY' --query 'Parameter.Value')"
export DOTENV_KEY

PM2="/home/ubuntu/.local/share/pnpm/pm2"
$PM2 restart mern-blog
