import paths from "../scripts/utils/paths.cjs";
import overrides from "../config-overrides.js";

import { createRequire } from "node:module";
export const require = createRequire(import.meta.url);

const devServerConfigPath = `${paths.scriptVersion}/config/webpackDevServer.config.js`;
const devServerConfig = require(devServerConfigPath);

// override config in memory
require.cache[require.resolve(devServerConfigPath)].exports =
  overrides.devServer(devServerConfig, process.env.NODE_ENV);

export default require(devServerConfigPath);
