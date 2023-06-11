#!/usr/bin/env sh

login() {
	curl \
		-H 'Content-Type: application/json' \
		-d "{\"email\":\"$1\", \"password\":\"Passw0rd12345\"}" \
		'http://localhost:8000/auth/signin'
}

login "$1"
