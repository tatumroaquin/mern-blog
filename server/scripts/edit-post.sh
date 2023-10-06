#!/usr/bin/env sh

editpost() {
	curl \
    -X PUT \
		-H 'Content-Type: application/json' \
		-H "Authorization: Bearer $1" \
    -b "jwt=$2" \
		-d "{ \"title\":\"$3\", \"description\":\"$4\", \"markdown\":\"$5\", \"tags\":[ \"coding\", \"deception\" ]}" \
		"https://localhost:3000/post/edit/$6"
}

editpost "$1" "$2" "Update Title" "Update Description" "Update Markdown" "testing-mermaidjs"
