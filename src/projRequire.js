var projectDir = __dirname;

module.exports = global.projRequire = function(module) {
  return require(`${projectDir}/${module}`);
}