#!/usr/bin/env sh

curl \
  -H "Authorization: Bearer $6" \
	-H 'Content-Type: application/json' \
	-d "{\"firstName\":\"$1\", \"lastName\":\"$2\", \"userName\":\"$3\", \"email\":\"$4\", \"password\":\"$5\"}" \
	'http://localhost:8000/signup'
