#!/usr/bin/env sh

editpost() {
	curl \
    -X PUT \
		-H 'Content-Type: application/json' \
		-H "Authorization: Bearer $1" \
		-d "{ \"title\":\"$2\", \"description\":\"$3\", \"markdown\":\"$4\", \"tags\":[ \"coding\", \"deception\" ]}" \
		"http://localhost:8000/post/edit/$5"
}

editpost "$1" "Update Title" "Update Description" "Update Markdown" "tatums-post"
editpost "$1" "Update Title" "Update Description" "Update Markdown" "johns-post"
editpost "$1" "Update Title" "Update Description" "Update Markdown" "maxwells-post"
