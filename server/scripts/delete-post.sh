#!/usr/bin/env sh

deletepost() {
	curl \
    -s \
    -D - \
    -X DELETE \
		-H "Authorization: Bearer $1" \
    -b "jwt=$2" \
		"https://localhost:3000/post/delete/$3"
}

deletepost "$1" "$2" "lucy-title-2"
