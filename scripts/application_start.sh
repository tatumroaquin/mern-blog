#!/bin/bash

# Restart mern-blog app in pm2

sudo -i -u ubuntu bash << EOF
DOTENV_KEY="$(aws ssm get-parameter --with-decryption --name '/mern-blog/secrets/DOTENV_KEY' --query 'Parameter.Value')"
export DOTENV_KEY
pm2 restart mern-blog
EOF
