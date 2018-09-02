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

# fix nvidia gpu tearing
nvidia-settings --assign CurrentMetaMode="nvidia-auto-select +0+0 { ForceFullCompositionPipeline = On }"
