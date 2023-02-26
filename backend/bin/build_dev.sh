#! /usr/bin/env bash


source $(dirname $0)/bash-helpers.sh
parse_options ${@}

VERSION=1.0.0
INTERACTIVE=1

WORKDIR=$(dirname $0)/..
inform 'Checking dependencies'
check_dependencies docker || exit 1

docker build -t victor-gpt/backend-dev:latest --target develop $WORKDIR

inform '👌 Done!'