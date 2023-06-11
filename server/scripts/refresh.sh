#!/usr/bin/env sh

curl \
	-G \
	-b 'jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0ODExZTBkMDBlMGIzNzVmYmRjNDYxMCIsInJvbGVzIjpbInVzZXIiXSwiaWF0IjoxNjg2MjA0MzkxLCJleHAiOjE2ODYyOTA3OTF9.eQVGpj7Y8NBrHfTf4fUYEAF9yEXBVUG0H3_4ZWLYwE8; Max-Age=86400; Path=/; Expires=Fri, 09 Jun 2023 06:06:31 GMT; HttpOnly' \
	'http://localhost:8000/token/refresh'
