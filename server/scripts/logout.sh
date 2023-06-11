#!/usr/bin/env sh

logout() {
	curl \
		-v \
		-G \
		-b "jwt=$1" \
		'http://localhost:8000/auth/logout'
}

logout $1
