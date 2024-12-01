/**
 * problem link: https://leetcode.com/problems/simplify-path/
 */

/**
 * @param {string} path
 * @return {string}
 */
var simplifyPath = function (path) {
  const stack = [];
  const pathArr = path.split("/");

  for (let i = 0; i < pathArr.length; i++) {
    const current = pathArr[i];
    if (current === "" || current === ".") continue;
    if (current === "..") {
      stack.pop();
    } else {
      stack.push(current);
    }
  }

  return "/" + stack.join("/");
};
