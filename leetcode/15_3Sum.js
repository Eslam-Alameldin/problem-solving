/**
 * @param {number[]} nums
 * @return {number[][]}
 */
var threeSum = function (nums) {
  const res = [];
  nums.sort((a, b) => a - b);

  for (let i = 0; i < nums.length; i++) {
    if (i > 0 && nums[i] === nums[i - 1]) continue;

    let l = i + 1;
    let r = nums.length - 1;
    while (l < r) {
      if (nums[i] + nums[l] + nums[r] > 0) {
        r--;
      } else if (nums[i] + nums[l] + nums[r] < 0) {
        l++;
      } else {
        res.push([nums[i], nums[l], nums[r]]);
        l++;
        while (l < r && nums[l] === nums[l - 1]) {
          l++;
        }
      }
    }
  }

  return res;
};
