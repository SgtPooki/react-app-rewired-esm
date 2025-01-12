const path = require("node:path");
const fs = require("node:fs");

// try to detect if user is using a custom scripts version
let custom_scripts = process.env.REACT_SCRIPTS_VERSION || false;
const cs_index = process.argv.indexOf("--scripts-version");

if (cs_index > -1 && cs_index + 1 <= process.argv.length) {
  custom_scripts = process.argv[cs_index + 1];
}

// Allow custom overrides package location
const projectDir = path.resolve(fs.realpathSync(process.cwd()));
const customPath = require(path.resolve(projectDir, "package.json"))[
  "config-overrides-path"
];
let config_overrides = customPath
  ? `${projectDir}/${customPath}`
  : `${projectDir}/config-overrides`;
const co_index = process.argv.indexOf("--config-overrides");

let has_co_argument = false;
if (co_index > -1 && co_index + 1 <= process.argv.length) {
  has_co_argument = true;
  config_overrides = path.resolve(process.argv[co_index + 1]);
}

const scriptVersion = custom_scripts || "react-scripts";
const modulePath = path.join(
  require.resolve(`${scriptVersion}/package.json`),
  ".."
);

const paths = require(modulePath + "/config/paths");

module.exports = Object.assign(
  {
    scriptVersion: modulePath,
    configOverrides: config_overrides,
    customScriptsIndex: custom_scripts ? cs_index : -1,
    configOverridesIndex: has_co_argument ? co_index : -1,
  },
  paths
);
