const semver = require('semver')

module.exports = function checkNodeVersion (minNodeVersion) {
  console.log(minNodeVersion)
  console.log(semver.valid('v1.0.0'))
  console.log(semver.valid('1.0.0'))
  const nodeVersion = semver.valid(semver.coerce(process.version))
  return semver.satisfies(nodeVersion, '>=' + minNodeVersion)
}
