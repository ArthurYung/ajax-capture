import { EventBus } from "../../src/core/bus";

const eventBus = new EventBus();
describe("event bus test", () => {
  test("on listener and emit", (done) => {
    const eventName = "event_on";
    eventBus.on(eventName, (arg: string):void => {
      expect(arg).toBe("is emit");
      done();
    });

    eventBus.emit(eventName, "is emit");
  });

  test("on listener and off", () => {
    const eventName = "event_off";
    const listener = () => {};
    eventBus.on(eventName, listener);
    expect(eventBus._events[eventName].size).toBe(1);
    eventBus.off(eventName, listener);
    expect(eventBus._events[eventName].size).toBe(0);
  });

  test("once listener", () => {
    const eventName = "event_once";
    eventBus.once(eventName, () => {});
    expect(eventBus._events[eventName].size).toBe(1);
    eventBus.emit(eventName);
    expect(eventBus._events[eventName].size).toBe(0);
  });
});
