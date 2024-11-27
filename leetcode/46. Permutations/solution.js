/**
 * @param {number[]} nums
 * @return {number[][]}
 */
var permute = function (nums) {
  const res = [];
  const backtrack = (path) => {
    if (path.length === nums.length) {
      res.push([...path]);
      return;
    }
    for (let num of nums) {
      if (path.includes(num)) continue;
      path.push(num);
      backtrack(path);
      path.pop();
    }
  };
  backtrack([]);
  return res;
};
