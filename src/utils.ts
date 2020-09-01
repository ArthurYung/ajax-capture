export const sub2NumStr = (num: number): string => `0${num}`.substr(-2);

export const getDate = (time?: Date): string => {
  const date = time || new Date();
  return `${date.getFullYear()}-${sub2NumStr(date.getMonth() + 1)}-${sub2NumStr(
    date.getDate()
  )} ${sub2NumStr(date.getHours())}:${sub2NumStr(
    date.getMinutes()
  )}:${sub2NumStr(date.getSeconds())}`;
};
