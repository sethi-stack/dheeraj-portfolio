import { ListNode, mergeTwoLists, hasCycle, reverseList, addTwoNumbers } from '../src/algorithms/linked_lists';

// Helper to create list from array
function createList(arr: number[]): ListNode | null {
  if (arr.length === 0) return null;
  const head = new ListNode(arr[0]);
  let current = head;
  for (let i = 1; i < arr.length; i++) {
    current.next = new ListNode(arr[i]);
    current = current.next;
  }
  return head;
}

// Helper to convert list to array
function listToArray(head: ListNode | null): number[] {
  const arr: number[] = [];
  let current = head;
  while (current) {
    arr.push(current.val);
    current = current.next;
  }
  return arr;
}

describe('Linked List Algorithms', () => {
  describe('mergeTwoLists', () => {
    test('should merge sorted lists', () => {
      const l1 = createList([1, 2, 4]);
      const l2 = createList([1, 3, 4]);
      const merged = mergeTwoLists(l1, l2);
      expect(listToArray(merged)).toEqual([1, 1, 2, 3, 4, 4]);
    });
  });

  describe('hasCycle', () => {
    test('should detect cycle', () => {
      const head = new ListNode(3);
      const node2 = new ListNode(2);
      const node0 = new ListNode(0);
      const node4 = new ListNode(-4);
      head.next = node2;
      node2.next = node0;
      node0.next = node4;
      node4.next = node2; // Cycle
      expect(hasCycle(head)).toBe(true);
    });

    test('should return false for no cycle', () => {
      const head = createList([1, 2]);
      expect(hasCycle(head)).toBe(false);
    });
  });

  describe('reverseList', () => {
    test('should reverse list', () => {
      const head = createList([1, 2, 3, 4, 5]);
      const reversed = reverseList(head);
      expect(listToArray(reversed)).toEqual([5, 4, 3, 2, 1]);
    });
  });

  describe('addTwoNumbers', () => {
    test('should add numbers', () => {
      const l1 = createList([2, 4, 3]); // 342
      const l2 = createList([5, 6, 4]); // 465
      const sum = addTwoNumbers(l1, l2);
      expect(listToArray(sum)).toEqual([7, 0, 8]); // 807
    });
  });
});
