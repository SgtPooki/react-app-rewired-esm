import overrides from "../config-overrides.js";

import { createRequire } from "node:module";
export const require = createRequire(import.meta.url);

const paths = require("../scripts/utils/paths.cjs");

const pathsConfigPath = `${paths.scriptVersion}/config/paths`;
const pathsConfig = require(pathsConfigPath);

// extend paths with overrides
const extendedPaths = Object.assign(
  {},
  paths,
  overrides.paths(pathsConfig, process.env.NODE_ENV)
);

// override paths in memory
require.cache[require.resolve(pathsConfigPath)].exports = extendedPaths;

export default require(pathsConfigPath);
