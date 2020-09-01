import { Logger, MessageType } from "../../src/core/logger";
import globalConfig from "../../src/core/config";

const logger = new Logger();

afterEach(() => {
  logger.clear();
});

describe("logger test", () => {
  test("put logger", () => {
    logger.put(MessageType.EVENT, "click", "test");
    expect(logger._message.length).toBe(1);
  });

  test("put max logger", () => {
    globalConfig.max = 3;

    logger.put(MessageType.EVENT, "click", "test1");
    logger.put(MessageType.EVENT, "click", "test2");
    logger.put(MessageType.EVENT, "click", "test3");
    logger.put(MessageType.EVENT, "click", "test4");
    logger.put(MessageType.EVENT, "click", "test5");

    expect(logger._message.length).toBe(3);
  });

  test("loop logger", () => {
    globalConfig.max = 3;

    logger.put(MessageType.EVENT, "click", "test1");
    logger.put(MessageType.EVENT, "click", "test2");
    const capture = logger.capture();

    logger.put(MessageType.EVENT, "click", "test3");
    expect(logger._message[0]).toBe(capture[0]);

    logger.put(MessageType.EVENT, "click", "test4");
    expect(logger._message[0]).toBe(capture[1]);
  });

  test("clear logger", () => {
    logger.put(MessageType.EVENT, "click", "test1");
    expect(logger._message.length).toBe(1);
    logger.clear();
    expect(logger._message.length).toBe(0);
  });

  test("capture logger", () => {
    logger.put(MessageType.EVENT, "click", "test1");
    const currMessage = logger._message;
    const capture = logger.capture();
    expect(capture[0]).toBe(currMessage[0]);
  });
});
