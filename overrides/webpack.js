import semver from "semver";

import overrides from "../config-overrides.js";
import paths from "../scripts/utils/paths.cjs";

import { createRequire } from "node:module";
export const require = createRequire(import.meta.url);

const scriptPkg = require(`${paths.scriptVersion}/package.json`);

// CRA 2.1.2 switched to using a webpack config factory
// https://github.com/facebook/create-react-app/pull/5722
// https://github.com/facebook/create-react-app/releases/tag/v2.1.2
const isWebpackFactory = semver.gte(scriptPkg && scriptPkg.version, "2.1.2");
const webpackFactoryEnvSuffix =
  process.env.NODE_ENV === "production" ? ".prod" : ".dev";

const webpackConfigPath = `${paths.scriptVersion}/config/webpack.config${
  isWebpackFactory ? "" : webpackFactoryEnvSuffix
}`;
const webpackConfig = require(webpackConfigPath);

// override config in memory
require.cache[require.resolve(webpackConfigPath)].exports = isWebpackFactory
  ? (env) => overrides.webpack(webpackConfig(env), env)
  : overrides.webpack(webpackConfig, process.env.NODE_ENV);

export default require(webpackConfigPath);
