# Linked Lists

Linked Lists are linear data structures where elements are not stored in contiguous memory. Each node points to the next, making insertion/deletion O(1) but access O(n).

---

## Problem 1: Reverse Linked List

**Problem**: Reverse a singly linked list.

**Example**:
- Input: `1 → 2 → 3 → 4 → 5`
- Output: `5 → 4 → 3 → 2 → 1`

### Interview Strategy

1. **Clarify**: Ask about empty list, single node
2. **Discuss approaches**: Iterative vs Recursive
3. **Choose based on interviewer preference**: Iterative is usually safer (no stack overflow)

### Solution 1: Iterative

**Approach**: Track `prev`, `curr`, and `next` pointers. Reverse links one by one.

```typescript
function reverseList(head: ListNode | null): ListNode | null {
    let prev: ListNode | null = null;
    let curr = head;
    
    while (curr !== null) {
        const next = curr.next; // Save next
        curr.next = prev;       // Reverse link
        prev = curr;            // Move prev forward
        curr = next;            // Move curr forward
    }
    return prev; // New head
}
```

- **Time Complexity**: O(n) - visit each node once
- **Space Complexity**: O(1) - three pointers
- **When to use**: Default choice, no recursion overhead

### Solution 2: Recursive

**Approach**: Reverse the rest of the list first, then fix current node.

```typescript
function reverseListRecursive(head: ListNode | null): ListNode | null {
    if (head === null || head.next === null) {
        return head; // Base case
    }
    
    const newHead = reverseListRecursive(head.next);
    head.next.next = head; // Reverse link
    head.next = null;       // Break old link
    return newHead;
}
```

- **Time Complexity**: O(n) - visit each node
- **Space Complexity**: O(n) - recursion stack
- **When to use**: Interviewer asks for recursive, showing different approaches

### How to Articulate in Interview

**Opening**: "I'll use an iterative approach with three pointers: `prev` for the reversed portion, `curr` for current node, and `next` to not lose the rest of the list."

**Walking through** (`1 → 2 → 3`):
1. "Start: prev=null, curr=1"
2. "Reverse 1's link to null: null ← 1  2 → 3"
3. "Move forward: prev=1, curr=2"
4. "Continue until curr is null"

**Alternative**: "I can also solve this recursively by reversing the sublist from node 2 onward, then making node 2 point back to node 1. However, this uses O(n) space for the call stack."

---

## Problem 2: Detect Cycle in Linked List

**Problem**: Determine if a linked list has a cycle.

**Example**:
- Input: `3 → 2 → 0 → -4 → (back to 2)`
- Output: `true`

### Interview Strategy

1. **Start simple**: Hash set to track seen nodes
2. **Optimize**: Floyd's cycle detection (fast & slow pointers)
3. **Follow-up**: Can you find the cycle start? (Part II question)

### Solution 1: Hash Set

**Approach**: Track all visited nodes. If we see a node twice, there's a cycle.

```typescript
function hasCycleHash(head: ListNode | null): boolean {
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
```

- **Time Complexity**: O(n)
- **Space Complexity**: O(n) - hash set
- **When to use**: Simple to implement, acceptable for small lists

### Solution 2: Floyd's Cycle Detection (Tortoise & Hare)

**Approach**: Use two pointers moving at different speeds. If they meet, there's a cycle.

```typescript
function hasCycle(head: ListNode | null): boolean {
    let slow = head, fast = head;
    
    while (fast !== null && fast.next !== null) {
        slow = slow!.next;        // Move 1 step
        fast = fast.next.next;    // Move 2 steps
        
        if (slow === fast) {
            return true; // Pointers met - cycle exists
        }
    }
    return false; // Fast reached end - no cycle
}
```

- **Time Complexity**: O(n) - worst case visit all nodes
- **Space Complexity**: O(1) - two pointers only
- **Optimization**: No extra memory needed

### How to Articulate in Interview

**Opening**: "I'll use Floyd's cycle detection algorithm with two pointers: slow moves one step at a time, fast moves two steps. If there's a cycle, they'll eventually meet."

**Intuition**: "Think of two runners on a circular track. The faster runner will lap the slower one. If there's no cycle (track ends), the fast runner reaches the end first."

**Edge cases**: "If the list is empty or has one node with no cycle, fast will hit null before they can meet."

---

## Problem 3: Merge Two Sorted Lists

**Problem**: Merge two sorted linked lists into one sorted list.

**Example**:
- Input: `l1 = 1 → 2 → 4`, `l2 = 1 → 3 → 4`
- Output: `1 → 1 → 2 → 3 → 4 → 4`

### Interview Strategy

1. **Use dummy node**: Simplifies edge cases (empty lists, different starting values)
2. **Compare heads**: Always append the smaller one
3. **Don't forget remainder**: One list may be longer

### Solution 1: Iterative with Dummy Node

```typescript
function mergeTwoLists(l1: ListNode | null, l2: ListNode | null): ListNode | null {
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
```

- **Time Complexity**: O(m + n) - visit all nodes in both lists
- **Space Complexity**: O(1) - only creating pointers, reusing nodes
- **When to use**: Default approach, clean and efficient

### Solution 2: Recursive

```typescript
function mergeTwoListsRecursive(l1: ListNode | null, l2: ListNode | null): ListNode | null {
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
```

- **Time Complexity**: O(m + n)
- **Space Complexity**: O(m + n) - recursion stack
- **When to use**: Elegant solution, but uses more memory

### How to Articulate in Interview

**Opening**: "I'll use a dummy node to avoid edge case handling. I'll compare the heads of both lists, append the smaller one to my result, and move that pointer forward. The dummy node simplifies returning the head."

**Walking through** (`1→2→4` and `1→3→4`):
1. "Compare 1 and 1: pick first, result: 1→"
2. "Compare 2 and 1: pick second, result: 1→1→"
3. "Compare 2 and 3: pick first, result: 1→1→2→"
4. "Continue until one list is exhausted, append remainder"

**Key technique**: "The dummy node eliminates special handling for the first node."

---

## Problem 4: Linked List Cycle II (Find Cycle Start)

**Problem**: Given a linked list with a cycle, return the node where the cycle begins.

**Example**:
- Input: `3 → 2 → 0 → -4 → (back to 2)`
- Output: Node with value `2`

### Interview Strategy

1. **Build on Part I**: First detect if there's a cycle
2. **Mathematical insight**: Where they meet determines cycle start
3. **Two phases**: Detect cycle, then find start

### Solution: Floyd's Algorithm Extended

```typescript
function detectCycle(head: ListNode | null): ListNode | null {
    let slow = head, fast = head;
    
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
```

- **Time Complexity**: O(n)
- **Space Complexity**: O(1)
- **Mathematical proof**: Distance from head to cycle start equals distance from meeting point to cycle start

### How to Articulate in Interview

**Opening**: "After detecting the cycle using fast/slow pointers, I'll use a mathematical property: when they meet, if I reset one pointer to head and move both at the same speed, they'll meet at the cycle start."

**Mathematical intuition**: 
- "Let's say head to cycle start is distance `x`"
- "Cycle start to meeting point is `y`"  
- "When slow travels `x+y`, fast travels `x+y+cycle_length+y`"
- "Solving shows: moving `x` more from meeting point reaches start"

---

## Problem 5: Add Two Numbers

**Problem**: Given two linked lists representing numbers (digits in reverse order), return their sum as a linked list.

**Example**:
- Input: `(2 → 4 → 3) + (5 → 6 → 4)` represents `342 + 465`
- Output: `7 → 0 → 8` represents `807`

### Interview Strategy

1. **Clarify**: Digits stored in reverse? Leading zeros?
2. **Handle carry**: Like manual addition, propagate carry
3. **Edge cases**: Different lengths, final carry

### Solution: Iterative with Dummy Node

```typescript
function addTwoNumbers(l1: ListNode | null, l2: ListNode | null): ListNode | null {
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
```

- **Time Complexity**: O(max(m, n)) - iterate through longer list
- **Space Complexity**: O(max(m, n)) - result list
- **When to use**: Default solution handling all edge cases

### How to Articulate in Interview

**Opening**: "I'll traverse both lists simultaneously, adding corresponding digits plus any carry from the previous position. I'll continue while either list has nodes or there's a carry to propagate."

**Walking through** (`2→4→3` + `5→6→4`):
1. "2 + 5 = 7, carry=0: result: 7→"
2. "4 + 6 = 10, carry=1: result: 7→0→"
3. "3 + 4 + 1 = 8, carry=0: result: 7→0→8→"

**Edge case**: "If one list is longer, I treat missing digits as 0. If there's a final carry, I add a new node."

---

## Key Patterns Summary

| Pattern | When to Use | Time | Space |
|---------|-------------|------|-------|
| **Dummy Node** | Simplify edge cases (merge, reverse) | - | O(1) |
| **Fast & Slow Pointers** | Cycle detection, find middle | O(n) | O(1) |
| **Recursion** | Elegant for divide-and-conquer | O(n) | O(n) stack |
| **Carry Propagation** | Adding numbers digit by digit | O(n) | O(1) |

## Interview Tips

1. **Always ask about null**: Empty lists are common edge cases
2. **Use dummy nodes**: They simplify head manipulation
3. **Draw it out**: Visualize pointer movements on paper
4. **Test with examples**: Single node, two nodes, cycle cases
5. **Space vs Time**: Recursive solutions are elegant but use stack space
