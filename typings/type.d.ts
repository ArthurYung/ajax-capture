declare interface Window {
  __JAC_CONFIG: {
    log: boolean,
    max: number
  }
  __logger: any;
}

declare interface Console {
  originLog: typeof console.log
  originInfo: typeof console.info
  originWarn: typeof console.warn
  originDebug: typeof console.debug
  originError: typeof console.error
}

declare interface EventTarget {
  originAddEventListener: typeof EventTarget.prototype.addEventListener
  originRemoveEventListener: typeof EventTarget.prototype.removeEventListener
  __eventListenerCount: {[x: string]: number}
  __eventId?: symbol
}
