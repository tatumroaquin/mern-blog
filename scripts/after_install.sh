#!/bin/bash

# Install dependencies in server and client
PNPM_HOME=/home/ubuntu/.local/share/pnpm
export PATH=$PATH:$PNPM_HOME
pnpm run deps
