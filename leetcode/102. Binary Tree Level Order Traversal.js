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
 * @return {number[][]}
 */
var levelOrder = function (root) {
  if (!root) return [];

  const q = [];
  const res = [];

  q.push(root);

  while (q.length) {
    let qLen = q.length;
    let levelVal = [];
    for (let i = 0; i < qLen; i++) {
      let node = q.shift();

      if (node) {
        levelVal.push(node.val);
        if (node.left) q.push(node.left);
        if (node.right) q.push(node.right);
      }
    }

    res.push(levelVal);
  }
  return res;
};
