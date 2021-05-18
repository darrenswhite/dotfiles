#!/usr/bin/env bash

set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
SYNC_DIR="${1:-${HOME}}"

cd "${SCRIPT_DIR}";

git pull origin main

rsync --exclude ".git/" --exclude "bootstrap.sh" -avh --no-perms . "${SYNC_DIR}";
