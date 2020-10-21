export const randomInteger = (minValue, maxValue) => {
  return minValue + Math.floor(Math.random() * (maxValue - minValue + 1));
};
