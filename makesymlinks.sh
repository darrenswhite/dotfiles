#!/usr/bin/env bash

set -e

dir=${PWD}
olddot=~/.dotfiles
olddir=${olddot}/`date +%Y%m%d%H%M%S`
files=$(find . \( -path ./.git -o -path ./makesymlinks.sh \) -prune -o -name '*' -type f -print | sed -e 's#./##')

mkdir -p ${olddir}

pushd $dir >/dev/null

for file in ${files}; do
    echo "Creating symlink from ${file} to ~/${file}"

    [[ -e ~/${file} ]] && cp -L ~/${file} ${olddir}
    [[ -e ~/${file} ]] && ln -f -s ${dir}/${file} ~/${file}
done

find ${olddot} -type d -empty -delete

popd >/dev/null
