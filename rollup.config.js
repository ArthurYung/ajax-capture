import merge from "rollup-merge-config";
import baseConfig from "./rollup/base.config";
import devConfig from "./rollup/dev.config";

export default (args) => {
  if (args.extends === "dev") {
    return merge(baseConfig, devConfig);
  }

  return merge(baseConfig, devConfig);
};
