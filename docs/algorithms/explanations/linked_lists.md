# Linked Lists

Linked Lists are linear data structures where elements are not stored in contiguous memory.

## 1. Fast & Slow Pointers (Tortoise & Hare)
- **Concept**: Use two pointers moving at different speeds.
- **Use Cases**:
    - **Cycle Detection**: If they meet, there is a cycle.
    - **Middle of List**: When fast reaches end, slow is at middle.

## 2. Dummy Node
- **Concept**: Use a dummy head node to simplify edge cases (e.g., inserting at head).
- **Use Cases**: Merging lists, removing nodes.

## 3. Reversing a List
- **Iterative**: Keep track of `prev`, `curr`, and `next`.
- **Recursive**: Reverse the rest of the list, then fix the head.

---

### Example: Merge Two Sorted Lists
- Use a dummy node.
- Compare heads of both lists.
- Append smaller node to result.
- Move pointer.
