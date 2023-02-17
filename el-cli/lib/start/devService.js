import detectPort from 'detect-port'
import inquirer from 'inquirer'
import { Service } from '../service/service.js'

const params = process.argv.slice(2)
const DEFAULT_PORT = 8080
// --port 8080
const paramsObj = {}
params.forEach(i => {
  const paramsArr = i.split(' ')
  paramsObj[paramsArr[0].replace('--', '')] = paramsArr[1]
})
console.log(paramsObj)

const defaultPort = parseInt(paramsObj.port || DEFAULT_PORT, 10)

// detect port 内部通过net 创建tcp连接判断端口号是否被占用
const newPort = await detectPort(defaultPort)
if (newPort === defaultPort) {
  console.log('端口号可使用')
} else {
  // 命令行交互
  console.log(123)
  const questions = {
    type: 'list',
    name: 'answer',
    message: '旧的端口号已被占用，是否使用新的端口号',
    choices: ['true', 'false'],
    default: 0
  }
  const { answer } = await inquirer.prompt(questions)
  console.log(answer)
  if (answer === 'false') {
    console.log('exit')
    process.exit(1)
  } else {
    // 保存一个变量，让下次重启时，不需要再次进行选择
  }
} 
const args = {
  port: newPort + 1
}

process.env.NODE_ENV = 'development'
const service = new Service(args)
service.start()

//
//process.send('hello main process')
//
//process.on('message', data => {
//  console.log('message from parent process：', data)
//})
