process.env.NODE_ENV = process.env.NODE_ENV || "development";

import paths from "./utils/paths.cjs";

// override paths in memory
await import("../overrides/paths.js");

// override config in memory
await import("../overrides/webpack.js");
await import("../overrides/devServer.js");

import { createRequire } from "node:module";
export const require = createRequire(import.meta.url);

// run original script
require(`${paths.scriptVersion}/scripts/start`);
