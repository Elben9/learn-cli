const semver = require('semver');

module.exports = function checkNode(minNodeVersion) {
  console.log('process version', process.version);
  // 获取node版本号
  const nodeVersion = semver.valid(semver.coerce(process.version));
  return semver.satisfies(nodeVersion, '>=' + minNodeVersion)
}
