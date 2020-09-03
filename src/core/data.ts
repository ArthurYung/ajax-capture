const globalData = {};

export type GlobalData = {
  [x: string]: any
}

export const getStore = (): any => globalData;

export const updateStore = (
  target: string | GlobalData,
  val?: string
): void => {
  if (typeof target === "string" && val) {
    globalData[target] = val;
    return;
  }

  if (Object.prototype.toString.call(target).slice(8, -1) === "Object") {
    Object.keys(globalData).forEach((key:string) => {
      globalData[key] = undefined;
    });

    Object.keys(target).forEach((key: string) => {
      globalData[key] = target[key];
    });
  }
};
