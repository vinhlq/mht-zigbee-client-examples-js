#!/bin/sh

export env $(cat .env | grep -v '^#' | xargs)

# echo "Port is: ${PORT}"
node $@
