#!/bin/bash

DOTENV_KEY="$(aws ssm get-parameter --with-decryption --name '/mern-blog/secrets/DOTENV_KEY' --query "Parameter.Value")"
export DOTENV_KEY

pm2 restart mern-blog
