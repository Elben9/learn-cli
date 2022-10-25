import cp from 'child_process'

export const getFileUser = (stat) => {
  const { uid, gid } = stat
  // 通过id的一个脚手架 来将id转换成用户名
  const username = cp.execSync(`id -un ${uid}`).toString().trim()
  const groupIdsStr = cp.execSync(`id -G ${uid}`).toString().trim()
  const groupIdNameStr = cp.execSync(`id -Gn ${uid}`).toString().trim()
  const groupIds = groupIdsStr.split(' ')
  const groupIdNames = groupIdNameStr.split(' ')
  const index = groupIds.findIndex(id => +id === +gid)
  const groupName = groupIdNames[index]
  return username + '  ' + groupName
}
