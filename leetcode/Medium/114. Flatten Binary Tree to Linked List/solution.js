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
 * @return {void} Do not return anything, modify root in-place instead.
 */
var flatten = function (root) {
  let prev = null;
  const helper = (node) => {
    if (!node) return;
    helper(node.right);
    helper(node.left);
    node.right = prev;
    node.left = null;
    prev = node;
  };
  helper(root);
};

var flatten = function (root) {
  const preOrder = [];
  const helper = (node) => {
    if (!node) return;
    preOrder.push(node);
    helper(node.left);
    helper(node.right);
  };

  helper(root);

  for (let i = 0; i < preOrder.length - 1; i++) {
    preOrder[i].left = null;
    preOrder[i].right = preOrder[i + 1];
  }
};
