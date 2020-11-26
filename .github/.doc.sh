#!/bin/bash

function error_exit {
  echo "$1" 1>&2
  exit 1
}

echo "-----开始同步代码至远程-----"

git add . || error_exit "git add"

git commit -m "doc: update" || error_exit "git commit"

git push || error_exit "git push"

echo "-----已同步代码至远程-----"