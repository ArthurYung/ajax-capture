import logger, { MessageType } from "../logger";

let consoleHacked = false;

export const consoleHack = (): void => {
  if (!consoleHacked) {
    consoleHacked = true;

    console.originDebug = console.debug;
    console.originLog = console.log;
    console.originInfo = console.info;
    console.originWarn = console.warn;
    console.originError = console.error;

    console.debug = (
      message?: any,
      ...optionalParams: any[]
    ): void => {
      logger.put(MessageType.CONSOLE, "debug", message, ...optionalParams);
      console.originDebug(message, ...optionalParams);
    };

    console.log = (
      message?: any,
      ...optionalParams: any[]
    ): void => {
      logger.put(MessageType.CONSOLE, "log", message, ...optionalParams);
      console.originLog(message, ...optionalParams);
    };

    console.info = (
      message?: any,
      ...optionalParams: any[]
    ): void => {
      logger.put(MessageType.CONSOLE, "info", message, ...optionalParams);
      console.originInfo(message, ...optionalParams);
    };

    console.warn = (
      message?: any,
      ...optionalParams: any[]
    ): void => {
      logger.put(MessageType.CONSOLE, "warn", message, ...optionalParams);
      console.originWarn(message, ...optionalParams);
    };

    console.error = (
      message?: any,
      ...optionalParams: any[]
    ): void => {
      logger.put(MessageType.CONSOLE, "error", message, ...optionalParams);
      console.originError(message, ...optionalParams);
    };
  }
};

export const consoleRestore = (): void => {
  if (consoleHacked) {
    consoleHacked = false;

    console.debug = console.originDebug;
    console.info = console.originInfo;
    console.log = console.originLog;
    console.warn = console.originWarn;
    console.error = console.originError;

    delete console.originDebug;
    delete console.originInfo;
    delete console.originLog;
    delete console.originWarn;
    delete console.originError;
  }
};
