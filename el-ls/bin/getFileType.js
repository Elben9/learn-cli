import fs from 'fs'

export const getFileType = (mode) => {
  const isDirectory = mode & fs.constants.S_IFDIR === fs.constants.S_IFDIR
  const isFile = mode & fs.constants.S_IFREG === fs.constants.S_IFREG
  const isLink = mode & fs.constants.S_IFLNK === fs.constants.S_IFLNK

  if (isDirectory) {
    return 'd'
  } else if (isFile) {
    return '-'
  } else if (isLink) {
    return 'l'
  } 
}
