# Arrays & Strings Algorithms

Arrays and Strings are the most fundamental data structures. Mastering them involves understanding how to manipulate indices efficiently.

## 1. Two Pointers

### Concept
Use two pointers to iterate through the array, typically from different ends or at different speeds.

### Patterns
- **Opposite Ends**: One pointer at start, one at end. Move towards center. (e.g., Valid Palindrome, Two Sum Sorted).
- **Fast & Slow**: One pointer moves 1 step, other moves 2 steps. (e.g., Cycle Detection).

### Example: Valid Palindrome
Check if a string is a palindrome, ignoring non-alphanumeric characters.

```typescript
function isPalindrome(s: string): boolean {
    let left = 0, right = s.length - 1;
    while (left < right) {
        // ... skip non-alphanumeric ...
        if (s[left].toLowerCase() !== s[right].toLowerCase()) return false;
        left++; right--;
    }
    return true;
}
```

---

## 2. Sliding Window

### Concept
Maintain a window (subarray) that satisfies a certain condition. Expand the window by moving the right pointer, and shrink it by moving the left pointer.

### Patterns
- **Fixed Size**: Window size `k` is fixed.
- **Dynamic Size**: Window grows/shrinks based on constraints (e.g., "Longest substring with at most 2 distinct chars").

### Example: Maximum Sum Subarray of Size K
```typescript
function maxSum(arr: number[], k: number): number {
    let max = 0, current = 0;
    for (let i = 0; i < arr.length; i++) {
        current += arr[i];
        if (i >= k - 1) {
            max = Math.max(max, current);
            current -= arr[i - (k - 1)];
        }
    }
    return max;
}
```
