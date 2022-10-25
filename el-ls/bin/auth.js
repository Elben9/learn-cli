import fs from 'fs'

export const auth = (mode) => {

  let authString = ''
  // user
  const canUserRead = mode & fs.constants.S_IRUSR
  const canUserWrite = mode & fs.constants.S_IWUSR
  const canUserExecute = mode & fs.constants.S_IXUSR

  // group
  const canGroupRead = mode & fs.constants.S_IRGRP
  const canGroupWrite = mode & fs.constants.S_IWGRP
  const canGroupExecute = mode & fs.constants.S_IXGRP

  // other
  const canOtherRead = mode & fs.constants.S_IROTH
  const canOtherWrite = mode & fs.constants.S_IWOTH
  const canOtherExecute = mode & fs.constants.S_IXOTH

  authString += canUserRead ? 'r' : '-'
  authString += canUserWrite ? 'w' : '-'
  authString += canUserExecute ? 'x' : '-'
  authString += canGroupRead ? 'r' : '-'
  authString += canGroupWrite ? 'w' : '-'
  authString += canGroupExecute ? 'x' : '-'
  authString += canOtherRead ? 'r' : '-'
  authString += canOtherWrite ? 'w' : '-'
  authString += canOtherExecute ? 'x' : '-'

  return authString
}
  