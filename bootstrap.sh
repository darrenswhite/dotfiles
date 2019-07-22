#!/usr/bin/env bash

set -e

cd "$(dirname "${BASH_SOURCE}")";

git pull origin master

rsync --exclude ".git/" --exclude "bootstrap.sh" -avh --no-perms . ~;
