const { scriptVersion } = require("./paths.cjs");

const dependRequireResolve = (id) =>
  require.resolve(id, { paths: [scriptVersion] });
const dependRequire = (id) => require(dependRequireResolve(id));

module.exports = {
  dependRequireResolve,
  dependRequire,
};
