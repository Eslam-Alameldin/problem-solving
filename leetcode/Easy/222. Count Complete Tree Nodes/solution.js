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
var countNodes = function (root) {
  if (!root) return 0;

  const left = leftHeight(root);
  const right = rightHeight(root);

  if (left === right) {
    return Math.pow(2, left) - 1;
  }

  return 1 + countNodes(root.left) + countNodes(root.right);
};

function leftHeight(node) {
  if (!node) return 0;
  return 1 + leftHeight(node.left);
}

function rightHeight(node) {
  if (!node) return 0;
  return 1 + rightHeight(node.right);
}
