#! /usr/bin/env bash

source $(dirname $0)/bash-helpers.sh
parse_options ${@}

VERSION=1.0.0
INTERACTIVE=1

WORKDIR=$(dirname $0)/..
CURRENT_REVISION=$(git rev-parse --short HEAD)
LOGFILE=$([[ -n DEBUG ]] && echo .build.log || echo /dev/null)

inform 'Checking dependencies'
check_dependencies docker || exit 1

inform 'Attempting to build'
debug 'Building docker file'
docker build -t victor-gpt/frontend:latest --target production $WORKDIR >> $LOGFILE 2>&1 || {
  error 'Unable to build docker image'
  exit 1
}

inform 'Setting build version'
echo $CURRENT_REVISION > $WORKDIR/.version

inform '👌 Done!'
