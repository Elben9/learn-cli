#!/usr/bin/env node

const parse = require('./parse')
const fs = require('fs')

const { isAll, isList, args } = parse()

console.log(isAll, isList, args)

// 获取当前执行目录 
const dir = process.cwd()

let files = fs.readdirSync(dir)
let output

if (!isAll) {
  files = files.filter(file => file.indexOf('.') !== 0)
}
if (!isList) {
  // 便利当前文件夹下的所有文件，隐藏.开头的文件
  output = files.reduce((pre, cur) => pre + '\t' + cur )
} else {
  output = files.reduce((pre, cur) => pre + cur )
}
console.log(output)
