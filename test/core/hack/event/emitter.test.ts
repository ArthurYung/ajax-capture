import { getEventMessage } from "../../../../src/core/hack/event.hack/emitter";

describe("event message test", () => {
  test("default event", () => {
    expect(getEventMessage(new Event("click")).length).toBe(3);
  });
});
