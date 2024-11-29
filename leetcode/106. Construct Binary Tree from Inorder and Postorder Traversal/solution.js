/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {number[]} inorder
 * @param {number[]} postorder
 * @return {TreeNode}
 */

// O(n^2) solution
var buildTree = function (inorder, postorder) {
  if (!inorder.length) return null;

  const root = new TreeNode(postorder.pop());
  const index = inorder.indexOf(root.val);

  root.right = buildTree(inorder.slice(index + 1), postorder);
  root.left = buildTree(inorder.slice(0, index), postorder);

  return root;
};

// O(n) solution
var buildTree = function (inorder, postorder) {
  const map = new Map();
  inorder.forEach((val, index) => map.set(val, index));

  const build = (start, end) => {
    if (start > end) return null;

    const val = postorder.pop();
    const root = new TreeNode(val);
    const index = map.get(val);

    root.right = build(index + 1, end);
    root.left = build(start, index - 1);

    return root;
  };

  return build(0, inorder.length - 1);
};
