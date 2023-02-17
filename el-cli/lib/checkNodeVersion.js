import semver from 'semver'

export const checkNodeVersion = minNodeVersion => {
  // console.log(minNodeVersion)
  // console.log(semver.valid('v1.0.0'))
  // console.log(semver.valid('1.0.0'))
  // console.log(semver.satisfies('6.0.0', '5.0.0 - 7.0.0'))
  // console.log(semver.gt('6.0.0', '10.0.0')) // false
  // console.log(semver.lt('6.0.0', '10.0.0')) // true
  const nodeVersion = semver.valid(semver.coerce(process.version))
  return semver.satisfies(nodeVersion, '>=' + minNodeVersion)
}
