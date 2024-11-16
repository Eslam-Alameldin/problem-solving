/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} head
 * @return {ListNode}
 */
var deleteDuplicates = function (head) {
  let dummy = new ListNode();
  dummy.next = head;
  let prev = dummy;
  let cur = head;
  while (cur) {
    let next = cur.next;
    while (next && next.val === cur.val) {
      next = next.next;
    }
    if (cur.next === next) {
      prev = cur;
    } else {
      prev.next = next;
    }
    cur = next;
  }
  return dummy.next;
};
