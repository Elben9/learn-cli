export const getFileSizeAndDate = (stat) => {
  const { birthtimeMs } = stat
  const birthTime = new Date(birthtimeMs)
  const month = birthTime.getMonth() + 1
  const day = birthTime.getDate()
  const hour = birthTime.getHours()
  const minute = birthTime.getMinutes()
  return  month + '月 ' + day + ' ' + hour + ':' + minute 
} 