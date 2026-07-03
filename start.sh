#!/bin/sh
set -e

# Build with visible progress (the old `-q` quiet build hid all output, which
# made a slow build look like a frozen terminal). Tag the image explicitly
# instead of piping the id via command substitution, so a failed build stops
# here instead of silently handing `docker run` an empty image reference.
docker build -t theinnerdev .
docker run --rm -itp 8080:8080 -p 3001:3001 -v ./content:/usr/src/app/content theinnerdev
