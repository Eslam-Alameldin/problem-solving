/**
 * problem link: https://leetcode.com/problems/evaluate-reverse-polish-notation/
 */

/**
 * @param {string[]} tokens
 * @return {number}
 */
var evalRPN = function (tokens) {
  const stack = [];

  for (let i = 0; i < tokens.length; i++) {
    const current = tokens[i];
    if (
      current === "+" ||
      current === "-" ||
      current === "*" ||
      current === "/"
    ) {
      const num2 = stack.pop();
      const num1 = stack.pop();

      if (current === "+") {
        stack.push(num1 + num2);
      } else if (current === "-") {
        stack.push(num1 - num2);
      } else if (current === "*") {
        stack.push(num1 * num2);
      } else {
        stack.push(parseInt(num1 / num2));
      }
    } else {
      stack.push(parseInt(current));
    }
  }

  return stack[0];
};
