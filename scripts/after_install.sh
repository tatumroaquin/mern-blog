#!/bin/bash

# Install dependencies in server and client

sudo -i -u ubuntu bash << EOF
pnpm run deps
EOF
