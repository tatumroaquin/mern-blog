#!/bin/bash

# Install dependencies in server and client

cd "/home/ubuntu/mern-blog" || return
PNPM="/home/ubuntu/.local/share/pnpm/pnpm"
$PNPM run deps
