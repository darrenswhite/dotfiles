#!/usr/bin/env bash

function run {
  if ! pgrep ^$1$; then
    $@&
  fi
}

run "compton"
run "dropbox" "start"
run "keepass2" "-minimize"
run "libinput-gestures"
run "redshift-gtk"
run "solaar"
