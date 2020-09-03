import { nativeHack, nativeRestore } from "../../../src/core/hack/native.hack";
import logger from "../../../src/core/logger";

beforeAll(() => {
  nativeHack();
});

afterAll(() => {
  nativeRestore();
});

describe("native test", () => {
  test("hash change", () => {
    expect(logger._message.length).toBe(0);
    window.location.hash = "#/9332";
    expect(logger._message.length).toBe(1);
  });
});
