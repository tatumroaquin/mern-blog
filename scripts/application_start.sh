#!/bin/bash

# Add PNPM to the current PATH
export PNPM_HOME="/home/ubuntu/.local/share/pnpm"
case ":$PATH:" in
*":$PNPM_HOME:"*) ;;
*) export PATH="$PNPM_HOME:$PATH" ;;
esac

DOTENV_KEY="$(aws ssm get-parameter --with-decryption --name '/mern-blog/secrets/DOTENV_KEY' --query 'Parameter.Value')"
export DOTENV_KEY

cd "/home/ubuntu/mern-blog" || return

# Restart mern-blog app in pm2
pm2 restart mern-blog
