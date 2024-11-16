/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} head
 * @param {number} left
 * @param {number} right
 * @return {ListNode}
 */
var reverseBetween = function (head, left, right) {
  if (!head) return null;
  let dummy = new ListNode();
  dummy.next = head;
  let leftPrev = dummy;
  let cur = head;
  for (let i = 0; i < left - 1; i++) {
    leftPrev = cur;
    cur = cur.next;
  }

  let prev;

  for (let i = 0; i < right - left + 1; i++) {
    let tempNext = cur.next;
    cur.next = prev;
    prev = cur;
    cur = tempNext;
  }

  leftPrev.next.next = cur;
  leftPrev.next = prev;
  return dummy.next;
};
