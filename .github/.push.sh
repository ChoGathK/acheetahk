#!/bin/bash

# 捕捉执行异常
echo "-----本次推送内容的标题是: ${1}-----"

function error_exit {
  echo "$1" 1>&2
  exit 1
}

echo "-----开始规范检测，并自动修复-----"

yarn lint || error_exit "lint"

echo "-----开始自动构建-----"

yarn build 

echo "-----开始同步代码至远程-----"

git add . || error_exit "git add"

git commit -m "${1}" || error_exit "git commit"

git push || error_exit "git push"

echo "-----已同步代码至远程-----"

echo "-----开始推送单元测试报告-----"

yarn push:codecov

echo "-----Finish-----"