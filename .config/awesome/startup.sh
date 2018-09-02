#!/usr/bin/env bash

function run {
  if ! pgrep $1 ;
  then
    $@&
  fi
}

run "ckb-next -b"
run "compton"
run "dropbox start"
run "libinput-gestures"
run "redshift-gtk"
