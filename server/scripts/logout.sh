#!/usr/bin/env sh

jwt_cookie="$1"

curl \
	-v \
	-b "$jwt_cookie" \
	'http://localhost:8000/logout'
