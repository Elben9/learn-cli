export const parseArgs = () => {
  const args = process.argv.slice(2)
  const isAll = args.includes('-a')
  const isList = args.includes('-l')
  return {
    isAll,
    isList,
    args
  }
}
