#! /usr/bin/env node

const pkg = require('../package.json')
const checkNode = require('../lib/checkNodeVersion')

const MIN_NODE_VERSION ='8.9.0'

console.log(123, checkNode(MIN_NODE_VERSION))
try {
  if (!checkNode(MIN_NODE_VERSION)) {
    throw new Error('please upgrade your node version to ' + MIN_NODE_VERSION)
  } 
} catch (e) {
    console.log(e.message)
}