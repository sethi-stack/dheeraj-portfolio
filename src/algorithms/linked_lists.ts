/**
 * Linked List Algorithms
 * Each problem includes multiple solution approaches (iterative, recursive, etc.)
 */

export class ListNode {
  val: number;
  next: ListNode | null;
  constructor(val?: number, next?: ListNode | null) {
    this.val = val === undefined ? 0 : val;
    this.next = next === undefined ? null : next;
  }
}

// ============================================================================
// Problem 1: Reverse Linked List
// ============================================================================

// Approach 1: Iterative - O(n) time, O(1) space
export function reverseList(head: ListNode | null): ListNode | null {
  let prev: ListNode | null = null;
  let curr = head;

  while (curr !== null) {
    const next = curr.next; // Save next
    curr.next = prev; // Reverse link
    prev = curr; // Move prev forward
    curr = next; // Move curr forward
  }
  return prev; // New head
}

// Approach 2: Recursive - O(n) time, O(n) space
export function reverseListRecursive(head: ListNode | null): ListNode | null {
  if (head === null || head.next === null) {
    return head; // Base case
  }

  const newHead = reverseListRecursive(head.next);
  head.next.next = head; // Reverse link
  head.next = null; // Break old link
  return newHead;
}

// ============================================================================
// Problem 2: Detect Cycle in Linked List
// ============================================================================

// Approach 1: Hash Set - O(n) time, O(n) space
export function hasCycleHash(head: ListNode | null): boolean {
  const seen = new Set<ListNode>();
  let curr = head;

  while (curr !== null) {
    if (seen.has(curr)) {
      return true; // Found cycle
    }
    seen.add(curr);
    curr = curr.next;
  }
  return false;
}

// Approach 2: Floyd's Cycle Detection (Tortoise & Hare) - O(n) time, O(1) space
export function hasCycle(head: ListNode | null): boolean {
  let slow = head;
  let fast = head;

  while (fast !== null && fast.next !== null) {
    slow = slow!.next; // Move 1 step
    fast = fast.next.next; // Move 2 steps

    if (slow === fast) {
      return true; // Pointers met - cycle exists
    }
  }
  return false; // Fast reached end - no cycle
}

// ============================================================================
// Problem 3: Linked List Cycle II (Find Cycle Start)
// ============================================================================

// Approach: Floyd's Algorithm Extended - O(n) time, O(1) space
export function detectCycle(head: ListNode | null): ListNode | null {
  let slow = head;
  let fast = head;

  // Phase 1: Detect cycle
  while (fast !== null && fast.next !== null) {
    slow = slow!.next;
    fast = fast.next.next;

    if (slow === fast) {
      // Phase 2: Find cycle start
      slow = head; // Reset slow to head
      while (slow !== fast) {
        slow = slow!.next;
        fast = fast!.next;
      }
      return slow; // This is the cycle start
    }
  }
  return null; // No cycle
}

// ============================================================================
// Problem 4: Merge Two Sorted Lists
// ============================================================================

// Approach 1: Iterative with Dummy Node - O(m + n) time, O(1) space
export function mergeTwoLists(
  l1: ListNode | null,
  l2: ListNode | null
): ListNode | null {
  const dummy = new ListNode(0);
  let curr = dummy;

  while (l1 !== null && l2 !== null) {
    if (l1.val <= l2.val) {
      curr.next = l1;
      l1 = l1.next;
    } else {
      curr.next = l2;
      l2 = l2.next;
    }
    curr = curr.next;
  }

  // Append remainder
  curr.next = l1 !== null ? l1 : l2;

  return dummy.next;
}

// Approach 2: Recursive - O(m + n) time, O(m + n) space
export function mergeTwoListsRecursive(
  l1: ListNode | null,
  l2: ListNode | null
): ListNode | null {
  if (l1 === null) return l2;
  if (l2 === null) return l1;

  if (l1.val <= l2.val) {
    l1.next = mergeTwoListsRecursive(l1.next, l2);
    return l1;
  } else {
    l2.next = mergeTwoListsRecursive(l1, l2.next);
    return l2;
  }
}

// ============================================================================
// Problem 5: Add Two Numbers
// ============================================================================

// Approach: Iterative with Dummy Node - O(max(m, n)) time, O(max(m, n)) space
export function addTwoNumbers(
  l1: ListNode | null,
  l2: ListNode | null
): ListNode | null {
  const dummy = new ListNode(0);
  let curr = dummy;
  let carry = 0;

  while (l1 !== null || l2 !== null || carry > 0) {
    const sum = (l1?.val || 0) + (l2?.val || 0) + carry;
    carry = Math.floor(sum / 10);
    curr.next = new ListNode(sum % 10);
    curr = curr.next;

    l1 = l1?.next || null;
    l2 = l2?.next || null;
  }

  return dummy.next;
}
