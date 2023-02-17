import chokidar from 'chokidar'
import path from 'path'
import { fileURLToPath } from 'url'
import cp from 'child_process'

const __filename = fileURLToPath(import.meta.url)
let child

export function startServer (arg, opts, cmd) {
  // 1. 通过子进程启动webpack-dev-server服务
  // 1.1 子进程启动可以避免主进程受到影响
  // 1.2 子进程启动可以方便重启,解决配置修改后无法重启的问题
  runServer()

  // 2. 监听配置修改 chokidar
  runWatcher()
  console.log('start server ...')
}

function runServer () {
  // 启动webpack服务

  // 启动子进程的方式
  const file = path.resolve(__filename, '../devService.js')
  // 可通行的方式 fork
  child = cp.fork(file, ['--port 8080'])

  child.on('exit', code => {
    // 子进程退出 则 主进程也退出
    console.log('子进程exit', code)
    if (code) {
      process.exit(1)
    }
  })

  // child.on('data', data => {
  //   console.log('fork', data.toString());
  // })
  // child.on('message', data => {
  //   // 接收子进程消息
  //   console.log('message from child process：', data)
  // })
  // child.send('hello child process')


  // 方式1
  // 可以传参数给file，如--force
  // cp.execFile('node', [file, '--force'], {}, (err, stdout) => {
  //   if (!err) {
  //     console.log('exec callback', stdout)
  //   } else {
  //     console.error(err)
  //   }
  //   // console.log('exec callback', err, stdout)
  // })

  // 方式2
  // cp.exec(`node ${file} --force`, (err, stdout) => {
  //   if (!err) {
  //     console.log('exec callback', stdout)
  //   } else {
  //     console.error(err)
  //   }
  // })

  // 方式3
  // const buffer = cp.execSync(`node ${file} --force`)
  // console.log(buffer.toString())

  // 最底层
  // const child = cp.spawn('node', [file, '--force'])
  // child.stdout.on('data', data => {
  //   console.log('stdout');
  //   console.log(data)
  // })
  // child.stderr.on('data', data => {
  //   console.log('stderr')
  //   console.log(data.toString())
  // })
  // child.stdout.on('close', code => {
  //   console.log(code)
  // })
}

function runWatcher () {
  // 配置监听服务
  const configPath = path.resolve(__filename, '../config.json')
  const watcher = chokidar.watch(configPath)
    .on('change', onChange)
    .on('error', err => {
      console.error('file watch error', err)
      process.exit(1)
    })
  // chokidar.watch(path.resolve(process.cwd())).on('all', (event, path) => {
  //   console.log(event, path)
  // })
}

function onChange () {
  console.log('config change')
  // 文件变化后重启进程
  // 杀掉子进程
  child.kill()
  runServer()
  // throw new Error(1)
}
