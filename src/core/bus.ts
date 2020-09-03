import { GlobalData } from "./data";

export type EmitterItem = {
  event: string;
  once: boolean;
  listener: (...args: any[]) => void;
};

export type NativeListenerArg = {
  data: GlobalData;
  logger: string[];
};

export type EventListenerArg = NativeListenerArg & {
  event: EventTarget;
};

export type ConsoleListenerArg = NativeListenerArg & {
  type: string;
  content: string;
};

export interface CaptureEventBus {
  on(
    event: "HISTORY_CHANGE",
    listener: (context: NativeListenerArg) => void
  ): this;
  on(
    event: "ROUTE_CHANGE",
    listener: (context: NativeListenerArg) => void
  ): this;
  on(
    event: "LOAD_PAGE",
    listener: (context: NativeListenerArg) => void
  ): this;
  on(
    event: "EVENT_DISPATCH",
    listener: (context: EventListenerArg) => void
  ): this;
  on(
    event: "CONSOLE_DISPATCH",
    listener: (context: ConsoleListenerArg) => void
  ): this;
  emit(event: "HISTORY_CHANGE", context: NativeListenerArg): boolean;
  emit(event: "ROUTE_CHANGE", context: NativeListenerArg): boolean;
  emit(event: "LOAD_PAGE", context: NativeListenerArg): boolean;
  emit(event: "EVENT_DISPATCH", context: EventListenerArg): boolean;
  emit(event: "CONSOLE_DISPATCH", context: ConsoleListenerArg): boolean;
}

export class EventBus {
  public _events: { [event: string]: Set<EmitterItem> } = {};

  public on(event: string, listener: (...args: any[]) => void): this {
    const emitter = this._events[event]
      || (this._events[event] = new Set<EmitterItem>());

    emitter.add({
      event,
      listener,
      once: false
    });

    return this;
  }

  public once(event: string, listener: (...args: any[]) => void): void {
    const emitter = this._events[event]
      || (this._events[event] = new Set<EmitterItem>());

    emitter.add({
      event,
      listener,
      once: true
    });
  }

  public off(event: string, listener: (...args: any[]) => void): boolean {
    let isRemoved = false;
    const emitter = this._events[event];
    if (emitter) {
      emitter.forEach((handle) => {
        if (handle.listener === listener) {
          emitter.delete(handle);
          isRemoved = true;
        }
      });
    }

    return isRemoved;
  }

  public emit(event: string, ...args: any[]): boolean {
    try {
      this._events[event]?.forEach((handle) => {
        handle.listener(...args);
        if (handle.once) {
          this._events[event].delete(handle);
        }
      });

      return true;
    } catch (e) {
      return false;
    }
  }
}

export const eventBus: CaptureEventBus = new EventBus();
