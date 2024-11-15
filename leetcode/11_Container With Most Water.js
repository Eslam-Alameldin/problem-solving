/**
 * @param {number[]} height
 * @return {number}
 */
var maxArea = function (height) {
  let max = 0;
  let l = 0,
    r = height.length - 1;
  while (l < r) {
    let res = (r - l) * Math.min(height[l], height[r]);
    max = Math.max(max, res);
    if (height[l] <= height[r]) {
      l++;
    } else {
      r--;
    }
  }

  return max;
};
