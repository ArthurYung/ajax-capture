import { consoleHack } from "./core/hack/console";
import { eventHack } from "./core/hack/event";
import logger from "./core/logger";

export default (): void => {
  consoleHack();
  eventHack();
  window.__logger = logger;
  console.log("31");
};
