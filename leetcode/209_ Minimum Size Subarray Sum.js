/**
 * @param {number} target
 * @param {number[]} nums
 * @return {number}
 */
var minSubArrayLen = function (target, nums) {
  let l = 0;
  let total = 0;
  let res = Infinity;
  for (let r = 0; r < nums.length; r++) {
    total += nums[r];
    while (total >= target) {
      res = Math.min(res, r - l + 1);
      total -= nums[l];
      l++;
    }
  }

  return res === Infinity ? 0 : res;
};
