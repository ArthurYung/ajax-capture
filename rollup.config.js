import merge from "rollup-merge-config";
import commonConfig from "./rollup/common.config";
import devConfig from "./rollup/dev.config";

export default (args) => {
  if (args.extends === "dev") {
    return merge(commonConfig, devConfig);
  }

  return merge(commonConfig, devConfig);
};
