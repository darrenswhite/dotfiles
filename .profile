# ~/.profile: executed by the command interpreter for login shells.
# This file is not read by bash(1), if ~/.bash_profile or ~/.bash_login
# exists.
# see /usr/share/doc/bash/examples/startup-files for examples.
# the files are located in the bash-doc package.

# the default umask is set in /etc/profile; for setting the umask
# for ssh logins, install and configure the libpam-umask package.
#umask 022

# if running bash
if [ -n "$BASH_VERSION" ]; then
    # include .bashrc if it exists
    if [ -f "$HOME/.bashrc" ]; then
	. "$HOME/.bashrc"
    fi
fi

# set PATH so it includes user's private bin directories
PATH="$HOME/bin:$HOME/.local/bin:$PATH"

_byobu_sourced=1 . /usr/bin/byobu-launch 2>/dev/null || true

# Ubuntu make installation of Go Lang
PATH=$HOME/.local/share/umake/go/go-lang/bin:$PATH
export GOROOT=$HOME/.local/share/umake/go/go-lang

# prevent screen tearing with Nvidia GPU
nvidia-settings --assign CurrentMetaMode="nvidia-auto-select +0+0 { ForceFullCompositionPipeline = On }" 2>/dev/null || true

# Ubuntu make installation of Ubuntu Make binary symlink
PATH=$HOME/.local/share/umake/bin:$PATH

# Add Dart SDK to path
PATH=/usr/lib/dart/bin:$PATH

# Add pub cache to path
PATH=$HOME/.pub-cache/bin:$PATH

# Add Flutter to path
PATH=$HOME/workspace/flutter/bin:$PATH

# Add npm to path
PATH=$HOME/.npm-global/bin:$PATH

# Add jenv to path
PATH="$HOME/.jenv/bin:$PATH"

if [ -x "$(command -v jenv)" ]; then
    eval "$(jenv init -)"
    export JAVA_HOME="$HOME/.jenv/versions/`jenv version-name`"
fi

export BASH_SILENCE_DEPRECATION_WARNING=1
