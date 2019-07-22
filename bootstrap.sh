#!/usr/bin/env bash

set -e

cd "$(dirname "${BASH_SOURCE}")";

git pull origin master

SYNC_DIR="${1:-~}"

rsync --exclude ".git/" --exclude "bootstrap.sh" -avh --no-perms . "${SYNC_DIR}";
