/**
 * problem Link: https://leetcode.com/problems/populating-next-right-pointers-in-each-node/
 */

/**
 * // Definition for a _Node.
 * function _Node(val, left, right, next) {
 *    this.val = val === undefined ? null : val;
 *    this.left = left === undefined ? null : left;
 *    this.right = right === undefined ? null : right;
 *    this.next = next === undefined ? null : next;
 * };
 */

/**
 * @param {_Node} root
 * @return {_Node}
 */

// var connect = function(root) {
//   if (!root) return null; // Edge case: empty tree

//   let queue = [root]; // Initialize the queue with the root

//   while (queue.length > 0) {
//     let levelSize = queue.length; // Number of nodes at the current level

//     // Traverse all nodes at the current level
//     for (let i = 0; i < levelSize; i++) {
//       let currentNode = queue.shift(); // Dequeue the front node

//       // Set the next pointer if it's not the last node in the level
//       if (i < levelSize - 1) {
//         currentNode.next = queue[0];
//       }

//       // Enqueue left and right children if they exist
//       if (currentNode.left) queue.push(currentNode.left);
//       if (currentNode.right) queue.push(currentNode.right);
//     }
//   }

//   return root; // Return the modified tree
// };

var connect = function (root) {
  if (!root) return root;

  let leftmost = root;

  while (leftmost.left) {
    let head = leftmost;

    while (head) {
      head.left.next = head.right;

      if (head.next) {
        head.right.next = head.next.left;
      }

      head = head.next;
    }

    leftmost = leftmost.left;
  }

  return root;
};
