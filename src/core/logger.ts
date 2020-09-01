import { getDate } from "../utils";
import globalConfig from "./config";
import { ua, platform } from "./constants/global";

export enum MessageType {
  EVENT = 1,
  HTTP = 2,
  CONSOLE = 3,
  ERROR = 10,
}

enum MessageColor {
  EVENT = "green",
  HTTP = "yellow",
  CONSOLE = "",
  ERROR = "red"
}

export class Logger {
  public _message: string[] = []

  public put(
    type: MessageType,
    action: string,
    message: string,
    ...subText: string[]
  ):void {
    const date = getDate();
    const originType = MessageType[type];
    const logColor = MessageColor[originType];
    const subStr = subText.join(" ");
    // eslint-disable-next-line max-len
    const context = `[${date}][${platform}][${ua}][${originType}][${action}] ${message} ${subStr}`;
    this.transferMessage(`<span style="color: ${logColor}">${context}</span>`);
    this.outputConsole(context, logColor, type);
  }

  // eslint-disable-next-line class-methods-use-this
  public outputConsole(
    context: string,
    color: string,
    type: MessageType
  ): void {
    if (!globalConfig.log || type === MessageType.CONSOLE) return;
    (console.originLog || console.log)(`%c${context}`, `color:${color}`);
  }

  public capture(): string[] {
    return [...this._message];
  }

  public clear(): void {
    this._message = [];
  }

  private transferMessage(str: string): void {
    this._message.push(str);
    if (this._message.length > globalConfig.max) {
      this._message.shift();
    }
  }
}

let logger: Logger;
if (!logger) {
  logger = new Logger();
}

export default logger;
