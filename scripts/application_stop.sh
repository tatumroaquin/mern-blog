#!/bin/bash

# Add PNPM to the current PATH
export PNPM_HOME="/home/ubuntu/.local/share/pnpm"
case ":$PATH:" in
*":$PNPM_HOME:"*) ;;
*) export PATH="$PNPM_HOME:$PATH" ;;
esac

# Stop and delete mern-blog process
pm2 delete all
