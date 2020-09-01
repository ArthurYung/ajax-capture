export type EmitterItem = {
  event: string;
  once: boolean;
  listener: (...args: any[]) => void;
};
export class EventBus {
  public _events: { [event: string]: Set<EmitterItem> } = {};

  public on(
    event: string,
    listener: (...args: any[]) => void
  ): void {
    const emitter = this._events[event]
      || (this._events[event] = new Set<EmitterItem>());

    emitter.add({
      event,
      listener,
      once: false
    });
  }

  public once(
    event: string,
    listener: (...args: any[]) => void
  ): void {
    const emitter = this._events[event]
      || (this._events[event] = new Set<EmitterItem>());

    emitter.add({
      event,
      listener,
      once: true
    });
  }

  public off(
    event: string,
    listener: (...args: any[]) => void
  ): boolean {
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

  public emit(
    event: string,
    ...args: any[]
  ): void {
    this._events[event]?.forEach((handle) => {
      handle.listener(...args);
      if (handle.once) {
        this._events[event].delete(handle);
      }
    });
  }
}
