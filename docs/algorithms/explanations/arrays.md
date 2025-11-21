# Arrays & Strings Algorithms

Arrays and Strings are the most fundamental data structures in technical interviews. Mastering them involves understanding how to manipulate indices efficiently and recognizing common patterns.

---

## Problem 1: Valid Palindrome

**Problem**: Given a string `s`, determine if it is a palindrome, considering only alphanumeric characters and ignoring cases.

**Example**:
- Input: `"A man, a plan, a canal: Panama"`
- Output: `true`

### Interview Strategy

1. **Clarify**: Ask about case sensitivity, special characters, empty strings
2. **Start Simple**: Mention you could clean the string first, then compare
3. **Optimize**: Suggest two pointers to avoid extra space
4. **Discuss Trade-offs**: Time vs Space

### Solution 1: Simple (Clean & Compare)

**Approach**: Remove non-alphanumeric characters, convert to lowercase, compare with reverse.

```typescript
function isPalindromeSimple(s: string): boolean {
    const cleaned = s.toLowerCase().replace(/[^a-z0-9]/g, '');
    return cleaned === cleaned.split('').reverse().join('');
}
```

- **Time Complexity**: O(n) - iterate through string multiple times
- **Space Complexity**: O(n) - create new cleaned string and reversed copy
- **When to use**: Quick implementation, small strings

### Solution 2: Optimized (Two Pointers)

**Approach**: Use two pointers from both ends, skip non-alphanumeric characters in place.

```typescript
function isPalindrome(s: string): boolean {
    let left = 0, right = s.length - 1;
    
    while (left < right) {
        // Skip non-alphanumeric from left
        while (left < right && !/[a-zA-Z0-9]/.test(s[left])) left++;
        // Skip non-alphanumeric from right
        while (left < right && !/[a-zA-Z0-9]/.test(s[right])) right--;
        
        if (s[left].toLowerCase() !== s[right].toLowerCase()) {
            return false;
        }
        left++;
        right--;
    }
    return true;
}
```

- **Time Complexity**: O(n) - single pass through string
- **Space Complexity**: O(1) - only using two pointers
- **Optimization**: Eliminates extra string allocations

### How to Articulate in Interview

**Opening**: "I'll use the two pointers technique. Starting from both ends and moving toward the center, I'll skip non-alphanumeric characters and compare remaining characters case-insensitively."

**Walking through example** (`"A man, a plan, a canal: Panama"`):
1. "Left at 'A', right at 'a' - match (ignoring case)"
2. "Skip spaces and commas as we go"
3. "Continue until pointers meet"

**Explaining optimization**: "This is more efficient than cleaning the string first because we avoid creating intermediate strings, reducing space from O(n) to O(1)."

---

## Problem 2: Two Sum II (Sorted Array)

**Problem**: Given a **1-indexed** sorted array, find two numbers that add up to a target. Return their indices.

**Example**:
- Input: `numbers = [2,7,11,15], target = 9`
- Output: `[1,2]`

### Interview Strategy

1. **Leverage the "sorted" constraint**: This is your hint to use two pointers
2. **Start with brute force**: Acknowledge nested loops O(n²) exist but aren't optimal
3. **Optimize**: Use two pointers from ends

### Solution 1: Simple (Hash Map)

**Approach**: Same as Two Sum I - use hash map to find complement.

```typescript
function twoSumHash(numbers: number[], target: number): number[] {
    const map = new Map<number, number>();
    for (let i = 0; i < numbers.length; i++) {
        const complement = target - numbers[i];
        if (map.has(complement)) {
            return [map.get(complement)! + 1, i + 1]; // 1-indexed
        }
        map.set(numbers[i], i);
    }
    return [];
}
```

- **Time Complexity**: O(n)
- **Space Complexity**: O(n) - hash map storage
- **When to use**: If array wasn't sorted (this ignores the constraint!)

### Solution 2: Optimized (Two Pointers)

```typescript
function twoSumSorted(numbers: number[], target: number): number[] {
    let left = 0, right = numbers.length - 1;
    
    while (left < right) {
        const sum = numbers[left] + numbers[right];
        if (sum === target) {
            return [left + 1, right + 1]; // 1-indexed
        } else if (sum < target) {
            left++; // Need larger sum
        } else {
            right--; // Need smaller sum
        }
    }
    return [];
}
```

- **Time Complexity**: O(n) - single pass
- **Space Complexity**: O(1) - two pointers only
- **Optimization**: Exploits sorted property to eliminate hash map

### How to Articulate in Interview

**Opening**: "Since the array is sorted, I can use two pointers starting from both ends. If the sum is too small, I'll move the left pointer right to increase the sum. If too large, I'll move the right pointer left."

**Key insight**: "The sorted property guarantees that moving left increases the sum and moving right decreases it, so we'll never miss the answer."

---

## Problem 3: Longest Substring Without Repeating Characters

**Problem**: Find the length of the longest substring without repeating characters.

**Example**:
- Input: `"abcabcbb"`
- Output: `3` (substring is `"abc"`)

### Interview Strategy

1. **Start with brute force**: Check all substrings O(n³)
2. **Optimize to sliding window**: Maintain a valid window
3. **Clarify**: Empty string returns 0

### Solution 1: Brute Force

**Approach**: Check every substring for uniqueness.

```typescript
function lengthOfLongestSubstringBrute(s: string): number {
    let maxLen = 0;
    
    for (let i = 0; i < s.length; i++) {
        const seen = new Set<string>();
        for (let j = i; j < s.length; j++) {
            if (seen.has(s[j])) break;
            seen.add(s[j]);
            maxLen = Math.max(maxLen, j - i + 1);
        }
    }
    return maxLen;
}
```

- **Time Complexity**: O(n²) - nested loops
- **Space Complexity**: O(min(n, m)) where m is charset size
- **When to use**: Small strings, time-constrained interviews

### Solution 2: Sliding Window with Hash Map

```typescript
function lengthOfLongestSubstring(s: string): number {
    let maxLen = 0, left = 0;
    const charMap = new Map<string, number>();
    
    for (let right = 0; right < s.length; right++) {
        const char = s[right];
        // If char seen and within current window
        if (charMap.has(char) && charMap.get(char)! >= left) {
            left = charMap.get(char)! + 1; // Shrink window
        }
        charMap.set(char, right);
        maxLen = Math.max(maxLen, right - left + 1);
    }
    return maxLen;
}
```

- **Time Complexity**: O(n) - single pass
- **Space Complexity**: O(min(n, m)) - hash map of unique chars
- **Optimization**: Sliding window avoids rechecking substrings

### How to Articulate in Interview

**Opening**: "I'll use a sliding window with a hash map. The map stores the most recent index of each character. When I encounter a duplicate within my current window, I'll move the left pointer past the duplicate."

**Walking through** (`"abcabcbb"`):
1. "Window grows: a, ab, abc (length 3)"
2. "See 'a' again at index 3, move left to index 1"
3. "Continue expanding and contracting window"

**Key insight**: "By storing indices in the map, I can jump the left pointer directly to the right position instead of incrementing it one by one."

---

## Problem 4: Median of Two Sorted Arrays

**Problem**: Find the median of two sorted arrays. The overall run time complexity should be O(log(m+n)).

**Example**:
- Input: `nums1 = [1,3], nums2 = [2]`
- Output: `2.0`

### Interview Strategy

1. **Acknowledge complexity requirement**: O(log) suggests binary search
2. **Start simple**: Mention merge approach O(m+n)
3. **Optimize**: Binary search on smaller array

### Solution 1: Merge Arrays

**Approach**: Merge both arrays, find median at middle position(s).

```typescript
function findMedianSimple(nums1: number[], nums2: number[]): number {
    const merged = [...nums1, ...nums2].sort((a, b) => a - b);
    const n = merged.length;
    if (n % 2 === 0) {
        return (merged[n/2 - 1] + merged[n/2]) / 2;
    }
    return merged[Math.floor(n/2)];
}
```

- **Time Complexity**: O((m+n)log(m+n)) - sorting
- **Space Complexity**: O(m+n) - merged array
- **When to use**: Simple solution, doesn't meet O(log) requirement

### Solution 2: Binary Search on Partition

```typescript
function findMedianSortedArrays(nums1: number[], nums2: number[]): number {
    // Ensure nums1 is smaller
    if (nums1.length > nums2.length) {
        return findMedianSortedArrays(nums2, nums1);
    }
    
    const x = nums1.length, y = nums2.length;
    let low = 0, high = x;
    
    while (low <= high) {
        const partitionX = Math.floor((low + high) / 2);
        const partitionY = Math.floor((x + y + 1) / 2) - partitionX;
        
        const maxLeftX = partitionX === 0 ? -Infinity : nums1[partitionX - 1];
        const minRightX = partitionX === x ? Infinity : nums1[partitionX];
        
        const maxLeftY = partitionY === 0 ? -Infinity : nums2[partitionY - 1];
        const minRightY = partitionY === y ? Infinity : nums2[partitionY];
        
        if (maxLeftX <= minRightY && maxLeftY <= minRightX) {
            // Found correct partition
            if ((x + y) % 2 === 0) {
                return (Math.max(maxLeftX, maxLeftY) + Math.min(minRightX, minRightY)) / 2;
            }
            return Math.max(maxLeftX, maxLeftY);
        } else if (maxLeftX > minRightY) {
            high = partitionX - 1; // Too far right
        } else {
            low = partitionX + 1; // Too far left
        }
    }
    return 0;
}
```

- **Time Complexity**: O(log(min(m,n))) - binary search on smaller array
- **Space Complexity**: O(1) - constant space
- **Optimization**: Achieves required O(log) complexity

### How to Articulate in Interview

**Opening**: "I'll binary search for the correct partition point in the smaller array. The median is found when the left partition of combined arrays is properly separated from the right."

**Key concept**: "We're looking for a partition where:
- All elements in left partition ≤ all elements in right partition
- Left partition has (m+n+1)/2 elements"

**Explaining optimization**: "By binary searching on the smaller array, we reduce time from O(m+n) to O(log(min(m,n))). Each partition in array1 determines the partition in array2."

---

## Key Patterns Summary

| Pattern | When to Use | Time | Space |
|---------|-------------|------|-------|
| **Two Pointers - Opposite Ends** | Sorted array, palindrome | O(n) | O(1) |
| **Sliding Window** | Substring/subarray with constraint | O(n) | O(k) |
| **Hash Map** | Need fast lookups, track seen elements | O(n) | O(n) |
| **Binary Search** | Sorted data, need O(log n) | O(log n) | O(1) |

## Interview Tips

1. **Always start with brute force**: Shows you can solve the problem
2. **Identify the constraint**: Sorted? Fixed size? Unique elements?
3. **Choose the right pattern**: Let the constraint guide you
4. **Discuss trade-offs**: "This uses more space but runs faster"
5. **Code clearly**: Use descriptive variable names (`left/right` not `i/j`)
