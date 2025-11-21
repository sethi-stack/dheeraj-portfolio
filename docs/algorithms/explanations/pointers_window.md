# Two Pointers & Sliding Window

## 1. Two Pointers
- **Concept**: Use two indices to traverse the array/string.
- **Use Case**: Sorted arrays, Palindromes, Partitioning.

### Example: Container With Most Water
- Start pointers at both ends.
- Calculate area.
- Move the pointer pointing to the shorter line (to potentially find a taller line).

### Example: Trapping Rain Water
- Pre-compute `maxLeft` and `maxRight` for each index.
- Or use Two Pointers:
    - `if leftMax < rightMax`: calculate water at left, move left.
    - `else`: calculate water at right, move right.

## 2. Sliding Window
- **Concept**: Maintain a window that satisfies a condition.
- **Use Case**: Substrings, Subarrays.

### Example: Minimum Window Substring
- Expand `right` until window has all required chars.
- Shrink `left` to minimize window size while still valid.
