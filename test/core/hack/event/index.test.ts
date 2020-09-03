import {
  eventHack,
  eventRestore
} from "../../../../src/core/hack/event.hack/index";
import logger from "../../../../src/core/logger";

beforeAll(() => {
  eventHack();
});

afterAll(() => {
  eventRestore();
});

describe("event hack", () => {
  test("click event hack", (done) => {
    const dom = document.createElement("div");
    dom.addEventListener("click", () => {
      setTimeout(() => {
        expect(logger._message.length).toBe(1);
        done();
      }, 300);
    });

    expect(dom.__eventListenerCount).toHaveProperty("click", 1);
    dom.click();
  });

  test("event removeListener hack", () => {
    const dom = document.createElement("div");
    const callback = () => {};
    dom.addEventListener("click", callback);
    dom.addEventListener("focus", callback);
    expect(dom.__eventListenerCount).toHaveProperty("click", 1);
    expect(dom.__eventListenerCount).toHaveProperty("focus", 1);

    dom.removeEventListener("click", callback);
    expect(dom.__eventListenerCount).toHaveProperty("click", 0);
    dom.removeEventListener("focus", callback);
    expect(dom.__eventListenerCount).toHaveProperty("focus", 0);
  });
});
