#!/usr/bin/env bash

function run {
  if ! pgrep ^$1$; then
    $@&
  fi
}

#run "compton"
run "dropbox" "start"
run "libinput-gestures"
run "redshift-gtk"
run "solaar"
