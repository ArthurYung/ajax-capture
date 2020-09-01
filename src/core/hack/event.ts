import logger, { MessageType } from "../logger";
import {
  MouseEventActive,
  FocusEventActive,
  InputEventActive,
  KeyboardEventActive
} from "../constants/events";

let eventHacked = false;

export const eventHack = (): void => {
  if (eventHacked) return;
  eventHacked = true;

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

    if (!this.__hackEventListeners) {
      this.__hackEventListeners = {};
    }

    if (!this.__eventListenerCount[type]) {
      const hackEventListener = (event: Event): void => {
        clearTimeout(this.__loggerQueueTimeout);
        this.__loggerQueueTimeout = setTimeout(() => {
          this.__latestActiveName = undefined;
          this.__latestEventTarget = undefined;
        }, 300);

        if (!event.target.__eventId) {
          event.target.__eventId = Symbol(event.type);
        }

        // 300ms trigger once
        if (
          this.__latestActiveType === event.type
          && (this.__latestEventTarget === event.target.__eventId)
        ) {
          return;
        }

        this.__latestActiveType = event.type;
        this.__latestEventTarget = event.target.__eventId;

        if (event instanceof MouseEvent) {
          // format mouseEvent message context
          const target = event.target as HTMLElement;

          logger.put(
            MessageType.EVENT,
            MouseEventActive[type] || type,
            type,
            `<${target.tagName}>`,
            `ID::${target.id || "null"}`,
            `TXT::${target.innerText.slice(0, 10) || "null"}`
          );

          return;
        }

        if (event instanceof FocusEvent) {
          // format focusEvent message context
          const target = event.target as HTMLInputElement;

          logger.put(
            MessageType.EVENT,
            FocusEventActive[type] || type,
            type,
            `<${target.tagName}>`,
            `ID::${target.id || "null"}`,
            `VAL::${target.value || "null"}`
          );

          return;
        }

        if (event instanceof InputEvent) {
          // format inputEvent message context
          const target = event.target as HTMLInputElement;

          logger.put(
            MessageType.EVENT,
            InputEventActive[type] || type,
            type,
            `<${target.tagName}>`,
            `ID::${target.id || "null"}`,
            `VAL::${target.value.slice(0, 10) || "null"}`,
            `INPUT::${event.data}`
          );

          return;
        }

        if (event instanceof KeyboardEvent) {
          // format keyboardEvent message context
          const target = event.target as HTMLInputElement;

          logger.put(
            MessageType.EVENT,
            KeyboardEventActive[type] || type,
            type,
            `<${target.tagName}>`,
            `ID::${target.id || "null"}`,
            `VAL::${target.value.slice(0, 15) || "null"}`,
            `CODE::${event.code}`
          );

          return;
        }

        logger.put(
          MessageType.EVENT,
          type,
          `<${(event.target as HTMLElement).tagName}>`,
          `ID::${(event.target as HTMLElement).id || "null"}`
        );
      };

      this.__eventListenerCount[type] = 1;
      this.__hackEventListeners[type] = hackEventListener;
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
    if (this.__eventListenerCount?.[type]) {
      this.__eventListenerCount[type] -= 1;
    }

    if (this.__eventListenerCount[type] === 0 && this.__hackEventListener) {
      this.originAddEventListener(type, this.__hackEventListener[type]);
      this.__hackEventListener[type] = undefined;
    }

    this.originAddEventListener.call(this, type, callback, options);
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
