/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {TreeNode} root
 * @return {number}
 */
var getMinimumDifference = function (root) {
  let prev = -Infinity;
  let minDiff = Infinity;

  function inorder(node) {
    if (!node) return;
    inorder(node.left);
    minDiff = Math.min(minDiff, node.val - prev);
    prev = node.val;
    inorder(node.right);
  }

  inorder(root);
  return minDiff;
};

// bfs
var getMinimumDifference = function (root) {
  let minDiff = Infinity;
  const q = [];
  q.push(root);
  const arr = [];
  while (q.length) {
    let node = q.shift();
    arr.push(node.val);
    if (node.left) q.push(node.left);
    if (node.right) q.push(node.right);
  }
  arr.sort((a, b) => a - b);
  for (let i = 1; i < arr.length; i++) {
    minDiff = Math.min(minDiff, arr[i] - arr[i - 1]);
  }
  return minDiff;
};
