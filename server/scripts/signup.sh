#!/usr/bin/env sh

signup() {
	curl \
		-H "Authorization: Bearer $1" \
		-H 'Content-Type: application/json' \
		-d "{\"firstName\":\"$2\", \"lastName\":\"$3\", \"userName\":\"$4\", \"email\":\"$5\", \"password\":\"$6\"}" \
		'http://localhost:8000/auth/signup'
}

signup "$1" "Tatum" "Roaquin" "tatum.roaquin" "tatum.roaquin@gmail.com" "Passw0rd12345"
signup "$1" "John" "Smith" "john.smith" "john.smith@gmail.com" "Passw0rd12345"
signup "$1" "Maxwell" "Goodman" "max.goodman" "max.goodman@gmail.com" "Passw0rd12345"
signup "$1" "Lucy" "Goodman" "lucy.goodman" "lucy.goodman@gmail.com" "Passw0rd12345"
