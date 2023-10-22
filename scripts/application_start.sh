#!/bin/bash

# Restart mern-blog app in pm2

PNPM_HOME=/home/ubuntu/.local/share/pnpm
export PATH=$PATH:$PNPM_HOME

DOTENV_KEY="$(aws ssm get-parameter --with-decryption --name '/mern-blog/secrets/DOTENV_KEY' --query 'Parameter.Value')"
export DOTENV_KEY

pm2 restart mern-blog
EOF
