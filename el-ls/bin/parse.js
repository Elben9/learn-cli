module.exports = function parse () {
  let isAll = false
  let isList = false
  const args = process.argv.slice(2)
  args.forEach(item => {
    if ('-a' === item) {
      isAll = true
    }
    if ('-l' === item) {
      isList = true
    }
  })
  return {
    isAll,
    isList,
    args
  }
}