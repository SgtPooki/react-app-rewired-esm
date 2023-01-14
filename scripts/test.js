process.env.NODE_ENV = process.env.NODE_ENV || "test";

import paths from "./utils/paths.cjs";

// override paths in memory
await import("../overrides/paths.js");

// override createJestConfig in memory
await import("../overrides/jest.js");

import { createRequire } from "node:module";
export const require = createRequire(import.meta.url);

// run original script
require(`${paths.scriptVersion}/scripts/test`);
