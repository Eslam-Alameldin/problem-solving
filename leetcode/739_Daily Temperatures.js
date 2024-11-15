/**
 * @param {number[]} temperatures
 * @return {number[]}
 */
var dailyTemperatures = function (temperatures) {
  const res = new Array(temperatures.length).fill(0);
  const stack = [];

  for (let i = 0; i < temperatures.length; i++) {
    let t = temperatures[i];
    while (stack.length > 0 && t > stack[stack.length - 1][0]) {
      let [t, index] = stack.pop();
      res[index] = i - index;
    }

    stack.push([t, i]);
  }

  return res;
};
