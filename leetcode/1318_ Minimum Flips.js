/**
 * @param {number} a
 * @param {number} b
 * @param {number} c
 * @return {number}
 */
var minFlips = function (a, b, c) {
  let res = 0;
  while (a > 0 || b > 0 || c > 0) {
    const bitA = a & 1;
    const bitB = b & 1;
    const bitC = c & 1;
    if (bitC === 0) {
      res += bitA + bitB;
    } else {
      res += bitA + bitB === 0 ? 1 : 0;
    }
    a >>= 1;
    b >>= 1;
    c >>= 1;
  }
  return res;
};
