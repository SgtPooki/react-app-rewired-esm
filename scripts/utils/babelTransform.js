import { createRequire } from "node:module";
export const require = createRequire(import.meta.url);

const { dependRequire, dependRequireResolve } = require("./dependRequire.cjs");

const babelJestMd = dependRequire("babel-jest");
const babelJest = babelJestMd.__esModule ? babelJestMd.default : babelJestMd;

const hasJsxRuntime = (() => {
  if (process.env.DISABLE_NEW_JSX_TRANSFORM === "true") {
    return false;
  }

  try {
    require.resolve("react/jsx-runtime");
    return true;
  } catch {
    return false;
  }
})();

export default babelJest.createTransformer({
  presets: [
    [
      dependRequireResolve("babel-preset-react-app"),
      {
        runtime: hasJsxRuntime ? "automatic" : "classic",
      },
    ],
  ],
  plugins: [],
  babelrc: true,
});
