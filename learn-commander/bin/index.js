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

function collect (value, previous) {
  console.log(111, value, previous);
  return previous.concat([value])
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
  .option('-s --separator <char>', 'separator char', ',')
  // -l 后面的所有参数都会放到letters里，如果想分割需要用--
  .option('-l --letter <letters...>', 'specify letters')
  .action((args, options) => {
    console.log('今天在看的', args, options)
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
  .option('-c --collect <value>', 'collect', collect, [])
  .action((options, cmd) => {
    console.log(cmd.optsWithGlobals())
  })

program
  // isDefault 为true时，不需要输入命令(login)
  // .command('login <username> [password]', { hidden: false, isDefault: true }) 
  .command('login')
  // .argument('<username>', 'username to login')
  // .argument('[password]', 'password for user', 'no password')
  // .argument('<dir...>', 'test')
  // .arguments('<username> [password]')
  .addArgument(new commander.Argument('username', 'username to login').argRequired().choices(['kangkang', 'kangkang2']))
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
