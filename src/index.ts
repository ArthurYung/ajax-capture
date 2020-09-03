import { consoleHack } from "./core/hack/console.hack";
import { eventHack } from "./core/hack/event.hack";
import { nativeHack } from "./core/hack/native.hack";
import logger from "./core/logger";

export default (): void => {
  consoleHack();
  eventHack();
  nativeHack();
  window.__logger = logger;
  console.log("31");
};
