#!/bin/bash

# Add PNPM to the current PATH
export PNPM_HOME="/home/ubuntu/.local/share/pnpm"
case ":$PATH:" in
*":$PNPM_HOME:"*) ;;
*) export PATH="$PNPM_HOME:$PATH" ;;
esac

# Navigate to the project directory
cd "/home/ubuntu/mern-blog" || return

# Install dependencies in server and client
pnpm deps
pnpm -F @mern-blog/server rebuild

# Build and transpile server code
pnpm build:server
