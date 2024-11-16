/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} head
 * @param {number} x
 * @return {ListNode}
 */
var partition = function (head, x) {
  let left = new ListNode();
  let right = new ListNode();

  let ltail = left;
  let rtail = right;

  while (head) {
    if (head.val < x) {
      ltail.next = head;
      ltail = ltail.next;
    } else {
      rtail.next = head;
      rtail = rtail.next;
    }

    head = head.next;
  }

  ltail.next = right.next;
  rtail.next = null;
  return left.next;
};
