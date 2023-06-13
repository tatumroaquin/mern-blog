#!/usr/bin/env sh

newpost() {
	curl \
		-H 'Content-Type: application/json' \
		-H "Authorization: Bearer $1" \
		-d "{ \"title\":\"$2\", \"description\":\"$3\", \"markdown\":\"$4\", \"tags\":[ \"hacking\", \"programming\" ]}" \
		'http://localhost:8000/post/new'
}

newpost "$1" "Tatums Title" "Tatums Description" "Tatums Markdown"
newpost "$1" "Johns Title" "Johns Description" "Johns Markdown"
newpost "$1" "Maxwells Title" "Maxwells Description" "Maxwells Markdown"
newpost "$1" "Lucy Title" "Lucy Description" "Lucy Markdown"
