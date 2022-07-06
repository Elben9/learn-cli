#! /usr/bin/env node

console.log('el-build')
// https://www.npmjs.com/package/commander

// const { program } = require('commander')

// program.option('--first').option('-s, --separator <char>')

// program.parse()

// const options = program.opts()

// console.log(options)

const { Command, Option } = require ('commander')
const commander = require('commander')
const pkg = require('../package.json')

const program = new Command()

function parseInteger (value) {
  const iniValue = parseInt(value, 10)
  if (isNaN(iniValue)) {
    throw new commander.InvalidArgumentError('not a int number')
  }
  return value
}

program
  .name('el-build')
  .description('build javascript project')
  .version(pkg.version, '-v --version', 'output your version')

program.option('-d --debug', 'debug')
 
// el-build split a/b/c/d --first -s /    =>  ['a'] 
program
  .command('split')
  .description('split string')
  .argument('<string>', 'string to split')
  .option('--first', 'display just the first substring')
  // []表示参数可传可不传
  .option('-a --add [char]', 'add something')
  .option('- --separator <char>', 'separator char', ',')
  .action((args, options) => {
    console.log(program.optsWithGlobals())
    console.log(program.getOptionValue('debug'))
    const limit = options.first ? 1 :undefined
    console.log(args.split(options.separator, limit))
  })

  program
  .command('test')
  .addOption(new Option('-s, --select', 'select something').hideHelp())
  .addOption(new Option('-t, --time <delay>', 'time seconds').default(60, 'one minute'))
  // el-build test -c small 
  .addOption(new Option('-c, --choice <c>', 'choice').choices(['small', 'medium', 'large']))
  // PORT=80 el-build test
  .addOption(new Option('-p, --port <number>', 'port number').env('PORT'))
  // preset 默认值   .argParser((parseFloat))调用方法转成number
  .addOption(new Option('--donate [amount]', 'donate in dollar').preset('20').argParser((parseFloat)))
  // 冲突 和-port不能共存
  .addOption(new Option('--disable-server', 'disable-server').conflicts('port'))
  .action((options, cmd) => {
    // console.log('kangkang',options, cmd)
    console.log(cmd.optsWithGlobals())
  })

program
  .command('custom')
  .option('-f --float <number>', 'float argument', parseFloat)
  .option('-i --integer <number>', 'integer argument', parseInteger)
  .action((options, cmd) => {
    console.log(cmd.optsWithGlobals())
  })

program
  .command('login')
  // .argument('<username>', 'username to login')
  // .argument('[password]', 'password for user', 'no password')
  // .argument('<dir...>', 'test')
  // .arguments('<username> [password]')
  .addArgument(new commander.Argument('username', 'username to login').argRequired())
  .addArgument(new commander.Argument('password', 'username to login').argOptional().default('123456', 'default password'))
  .action((username, password, options) => {
    console.log(username, password)
    console.log(this.args)
  })

// opts: 获取当前实例的options，比如全局program获取全局的options，subcommand获取局部options
// optsWithGlobals：获取全部options,全局获取全局options subcommand获取全局+局部options

const options = program.opts()

console.log(options)

program.parse()
