import { override } from "customize-cra";

export default override((config) => {
  console.log("overrideoverride");
  config.plugins = config.plugins.filter(
    (plugin) => plugin.key !== "ESLintWebpackPlugin"
  );
  return config;
});
