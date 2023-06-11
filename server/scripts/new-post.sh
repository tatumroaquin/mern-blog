#!/usr/bin/env sh

newpost() {
	curl \
		-H 'Content-Type: application/json' \
		-H "Authorization: Bearer $1" \
		-d "{ \"userId\":\"$2\", \"title\":\"$3\", \"description\":\"$4\", \"markdown\":\"$5\", \"tags\":[ \"hacking\", \"programming\" ]}" \
		'http://localhost:8000/post/new'
}

newpost "$1" "Tatums Title" "Tatums Description" "Tatums Markdown"
newpost "$1" "Johns Title" "Johns Description" "Johns Markdown"
newpost "$1" "Maxwells Title" "Maxwells Description" "Maxwells Markdown"
newpost "$1" "Lucy Title" "Lucy Description" "Lucy Markdown"
