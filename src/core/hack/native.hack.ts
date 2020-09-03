import { global } from "../constants/global";
import logger, { MessageType } from "../logger";
import { originBinding, originOff } from "./event.hack";

const popstateCallback = (): void => {
  logger.put(
    MessageType.NATIVE,
    "HISTORY路由跳转",
    "popstate",
    global.location.href
  );
};

export const nativeHack = (): void => {
  originBinding(global, "load", (): void => {
    logger.put(
      MessageType.NATIVE,
      "页面载入",
      "loaded"
    );
  });

  originBinding(global, "popstate", popstateCallback);
};

export const nativeRestore = ():void => {
  originOff(global, "popstate", popstateCallback);
};
