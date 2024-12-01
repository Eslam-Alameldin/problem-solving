/**
 * @param {number} n
 * @return {string[]}
 */
var generateParenthesis = function (n) {
  const result = [];

  const dfs = (left, right, currentString) => {
    if (left > n || right > n || left < right) {
      return;
    }
    if (left == n && right == n) {
      result.push(currentString);
      return;
    }

    dfs(left, right + 1, currentString + ")");
    dfs(left + 1, right, currentString + "(");
  };

  dfs(0, 0, "");

  return result;
};
