process.env.NODE_ENV = "production";

import paths from "./utils/paths.cjs";

// override paths in memory
await import("../overrides/paths.js");

// override config in memory
await import("../overrides/webpack.js");

import { createRequire } from "node:module";
export const require = createRequire(import.meta.url);

// run original script
require(`${paths.scriptVersion}/scripts/build`);
