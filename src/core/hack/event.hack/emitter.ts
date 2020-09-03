import {
  MouseEventActive,
  FocusEventActive,
  InputEventActive,
  KeyboardEventActive
} from "../../constants/events";

type HandleEvent = Event | MouseEvent | FocusEvent | InputEvent | KeyboardEvent;

type OutputArray = [any, string, ...string[]]

const limitOutput = (str: string | undefined): string => {
  if (!str) return "undefined";
  return str.toString().slice(0, 15);
};

const mouseEventEmitter = (event: MouseEvent): OutputArray => {
  const target = event.target as HTMLElement;
  return [
    MouseEventActive[event.type] || event.type,
    event.type,
    `<${target.tagName}>`,
    `ID::${target.id || "null"}`,
    `TEXT::${limitOutput(target.innerText)}`,
    `PAGE::${event.pageX},${event.pageY}`
  ];
};

const focusEventEmitter = (event: FocusEvent): OutputArray => {
  const target = event.target as HTMLInputElement;
  return [
    FocusEventActive[event.type] || event.type,
    event.type,
    `<${target.tagName}>`,
    `ID::${target.id || "null"}`,
    `VAL::${target.value || "null"}`
  ];
};

const inputEventEmitter = (event: InputEvent): OutputArray => {
  const target = event.target as HTMLInputElement;
  return [
    InputEventActive[event.type] || event.type,
    event.type,
    `<${target.tagName}>`,
    `ID::${target.id || "null"}`,
    `VAL::${limitOutput(target.value)}`,
    `INPUT::${event.data}`
  ];
};

const keyboardEventEmitter = (event: KeyboardEvent): OutputArray => {
  const target = event.target as HTMLInputElement;
  return [
    KeyboardEventActive[event.type] || event.type,
    event.type,
    `<${target.tagName}>`,
    `ID::${target.id || "null"}`,
    `VAL::${limitOutput(target.value)}`,
    `CODE::${event.code}`
  ];
};

const defaultEventEmitter = (event: Event): OutputArray => [
  event.type,
  `<${(event.target as HTMLElement)?.tagName}>`,
  `ID::${(event.target as HTMLElement)?.id || "null"}`
];

export const getEventMessage = (
  event: HandleEvent
): OutputArray => {
  if (event instanceof MouseEvent) return mouseEventEmitter(event);
  if (event instanceof FocusEvent) return focusEventEmitter(event);
  if (event instanceof InputEvent) return inputEventEmitter(event);
  if (event instanceof KeyboardEvent) return keyboardEventEmitter(event);
  return defaultEventEmitter(event);
};
