import { createRequire } from "node:module";
export const require = createRequire(import.meta.url);

const { paths } = require("./index.cjs");
// load environment variables from .env files
// before overrides scripts are read
require(paths.scriptVersion + "/config/env");

let override = await import(paths.configOverrides + ".js");
override = override.default || override;

const webpack =
  typeof override === "function"
    ? override
    : override.webpack || ((config, env) => config);

if (override.devserver) {
  console.log(
    "Warning: `devserver` has been deprecated. Please use `devServer` instead as " +
      "`devserver` will not be used in the next major release."
  );
}

const devServer =
  override.devServer ||
  override.devserver ||
  ((configFunction) => (proxy, allowedHost) =>
    configFunction(proxy, allowedHost));

const jest = override.jest || ((config) => config);

const pathsOverride = override.paths || ((paths, env) => paths);

// normalized overrides functions
export default {
  webpack,
  devServer,
  jest,
  paths: pathsOverride,
};
