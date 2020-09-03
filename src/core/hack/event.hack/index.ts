import { getEventMessage } from "./emitter";
import logger, { MessageType } from "../../logger";

let eventHacked = false;

export const eventHack = (): void => {
  if (eventHacked) return;
  eventHacked = true;

  function hackEventListener(event: Event): void {
    clearTimeout(this.__loggerQueueTimeout);
    this.__loggerQueueTimeout = setTimeout(() => {
      this.__latestActiveType = undefined;
    }, 300);

    if (this.__latestActiveType !== event.type) {
      logger.put(
        MessageType.EVENT,
        ...getEventMessage(event)
      );

      this.__latestActiveType = event.type;
    }
  }

  // eslint-disable-next-line max-len
  EventTarget.prototype.originAddEventListener = EventTarget.prototype.addEventListener;
  // eslint-disable-next-line max-len
  EventTarget.prototype.originRemoveEventListener = EventTarget.prototype.removeEventListener;

  EventTarget.prototype.addEventListener = function addEventHack(
    type,
    listener,
    options
  ): void {
    if (!this.__eventListenerCount) {
      this.__eventListenerCount = {};
    }

    console.log(this.__eventListenerCount);
    if (!this.__eventListenerCount[type]) {
      this.__eventListenerCount[type] = 1;
      console.log("binding hcak");
      this.originAddEventListener(type, hackEventListener);
    } else {
      this.__eventListenerCount[type] += 1;
    }

    this.originAddEventListener.call(this, type, listener, options);
  };

  EventTarget.prototype.removeEventListener = function removeEventHack(
    type,
    callback,
    options
  ): void {
    if (!this.__eventListenerCount) {
      this.__eventListenerCount = {};
    }

    if (this.__eventListenerCount[type]) {
      this.__eventListenerCount[type]--;
    }

    if (this.__eventListenerCount[type] === 0) {
      this.originRemoveEventListener(type, hackEventListener);
    }

    this.originRemoveEventListener.call(this, type, callback, options);
  };
};

export const eventRestore = (): void => {
  // eslint-disable-next-line max-len
  EventTarget.prototype.addEventListener = EventTarget.prototype.originAddEventListener;
  // eslint-disable-next-line max-len
  EventTarget.prototype.removeEventListener = EventTarget.prototype.originRemoveEventListener;
  EventTarget.prototype.originRemoveEventListener = undefined;
  EventTarget.prototype.originAddEventListener = undefined;
};

export const originBinding = (
  target: EventTarget,
  type: string,
  listener: (this: Window, ev: Event) => any,
  options?: boolean
): void => {
  (target.originAddEventListener || target.addEventListener)(
    type,
    listener,
    options
  );
};

export const originOff = (
  target: EventTarget,
  type: string,
  listener: (this: Window, ev: Event) => any,
  options?: boolean
): void => {
  (target.originRemoveEventListener || target.removeEventListener)(
    type,
    listener,
    options
  );
};
