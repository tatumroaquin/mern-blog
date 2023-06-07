#!/usr/bin/env sh

curl \
	-H 'Content-Type: application/json' \
	-d "{\"email\":\"$1\", \"password\":\"$2\"}" \
	'http://localhost:8000/signin'
