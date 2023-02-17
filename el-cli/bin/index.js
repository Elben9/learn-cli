#! /usr/bin/env node

import pkg from '../package.json' assert { type: "json" }
import { checkNodeVersion } from '../lib/checkNodeVersion.js'
import { startServer } from '../lib/start/startServer.js'
import { build } from '../lib/build/build.js'
import { program } from 'commander'

const MIN_NODE_VERSION ='8.9.0'

try {
  if (!checkNodeVersion(MIN_NODE_VERSION)) {
    throw new Error('please upgrade your node version to ' + MIN_NODE_VERSION)
  }

  program.version(pkg.version)

  program
    .command('start')
    .description('start el-cli server')
    .allowUnknownOption()
    .action(startServer)

  program
    .command('build')
    .description('build el-cli project')
    .allowUnknownOption()
    .action(build)

  program.parse(process.argv)
} catch (e) {
    console.log(e.message)
}