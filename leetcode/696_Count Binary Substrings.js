/**
 * @param {string} s
 * @return {number}
 */
var countBinarySubstrings = function (s) {
  let cur = 1;
  let prev = 0;
  let res = 0;
  for (let i = 1; i < s.length; i++) {
    if (s[i] === s[i - 1]) cur++;
    else {
      res += Math.min(cur, prev);
      prev = cur;
      cur = 1;
    }
  }

  return res + Math.min(prev, cur);
};
