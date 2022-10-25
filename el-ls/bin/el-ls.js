#!/usr/bin/env node
import { parseArgs } from './parseArgs.js'
import { auth } from './auth.js'
import { getFileType } from './getFileType.js'
import { getFileUser } from './getFileUser.js'
import { getFileSizeAndDate } from './getFileSizeAndDate.js'
import fs from 'fs'

const { isAll, isList, args } = parseArgs()

// 获取当前执行目录 
const dir = process.cwd()

let files = fs.readdirSync(dir)
let output = ''

if (!isAll) {
  files = files.filter(file => !file.startsWith('.')) 
}
if (!isList) {
  // 遍历当前文件夹下的所有文件，隐藏.开头的文件
  output = files.reduce((pre, cur) => pre + '\t' +  cur )
} else { 
  files.forEach(file => {
    const stat = fs.statSync(file)
    console.log('标识类型的二进制数', file, stat.mode)
    // isDir > 0 表示为true
    // const isDir = stat.mode & fs.constants.S_IFDIR
    // const isFile = stat.mode & fs.constants.S_IFIFO
    // console.log('是否是文件夹', stat.isDirectory(), isDir > 0, isFile)
    const isDirectory = stat.isDirectory()
    let size = 1
    if (isDirectory) {
      size = fs.readdirSync(file).length
    }
    const authString = auth(stat.mode)
    const fileType = getFileType(stat.mode)
    const fileUser = getFileUser(stat)
    const fileSizeAndDate = getFileSizeAndDate(stat)
    output += fileType + authString + ' ' + size + '  ' + fileUser + ' ' + fileSizeAndDate + ' ' + file + '\n'
  })
  // output = files.reduce((pre, cur) => {
  //   return pre + '\t' + cur
  // })
} 
console.log(output)

// Unix(LinuxMacOs) 文件权限体系
// bin: rwx r-x r-x
// package.json: rw- r-- r--
// r: read 访问 w: write 写入 x: execute 执行
// u: user 当前用户 g: group 当前用户所在分组 o: other 其他
// chmod +r package.json 给package。json增加读权限

// node.js如何获取文件权限
// fs.statSync(file).mode
// 使用32位2二进制数存储文件类型和权限
// 0000 0000 0000 0000

// 每一位代表
// 2^32 | 2^30 | 2^ 28......
// 0000 (文件类型) 000 (特殊权限) 000 (用户权限对应rwe) 000 (组权限rwe) 000 (其他权限rwe)
// stat.mode转化为2二进制后可以得处权限

// package.json 1000 000 110 100 100    33188
// bin 0100 000 111 101 101    16877
