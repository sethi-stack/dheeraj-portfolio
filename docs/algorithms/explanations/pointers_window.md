# Two Pointers & Sliding Window

These techniques optimize array/string problems by using multiple pointers to reduce time complexity from O(n²) to O(n).

---

## Problem 1: Container With Most Water

**Problem**: Given heights array, find two lines that form container with maximum water.

**Example**:
- Input: `[1,8,6,2,5,4,8,3,7]`
- Output: `49` (between heights 8 and 7 at indices 1 and 8)

### Interview Strategy

1. **Brute force first**: Check all pairs O(n²)
2. **Optimize with two pointers**: Start from ends, move inward
3. **Greedy choice**: Move pointer at shorter height

### Solution 1: Brute Force

```typescript
function maxAreaBrute(height: number[]): number {
    let maxArea = 0;
    
    for (let i = 0; i < height.length; i++) {
        for (let j = i + 1; j < height.length; j++) {
            const area = Math.min(height[i], height[j]) * (j - i);
            maxArea = Math.max(maxArea, area);
        }
    }
    
    return maxArea;
}
```

- **Time Complexity**: O(n²)
- **Space Complexity**: O(1)
- **Issue**: Too slow for large inputs

### Solution 2: Two Pointers

```typescript
function maxArea(height: number[]): number {
    let left = 0, right = height.length - 1;
    let maxArea = 0;
    
    while (left < right) {
        const width = right - left;
        const area = Math.min(height[left], height[right]) * width;
        maxArea = Math.max(maxArea, area);
        
        // Move pointer at shorter height
        if (height[left] < height[right]) {
            left++;
        } else {
            right--;
        }
    }
    
    return maxArea;
}
```

- **Time Complexity**: O(n)
- **Space Complexity**: O(1)
- **Optimization**: Two pointers eliminate nested loop

### How to Articulate

**Opening**: "I'll use two pointers starting from both ends. Area is determined by the shorter height and width. I'll always move the pointer at the shorter height inward, hoping to find a taller line."

**Why move shorter pointer**: "Moving the taller pointer can only decrease area (width shrinks, height stays limited by shorter). Moving shorter pointer gives a chance to increase height."

---

## Problem 2: 3Sum

**Problem**: Find all unique triplets that sum to zero.

**Example**:
- Input: `[-1,0,1,2,-1,-4]`
- Output: `[[-1,-1,2],[-1,0,1]]`

### Interview Strategy

1. **Reduce to Two Sum**: Fix one number, find two-sum for remainder
2. **Sort first**: Enables two pointers and duplicate skipping
3. **Handle duplicates**: Critical for "unique triplets"

### Solution: Sort + Two Pointers

```typescript
function threeSum(nums: number[]): number[][] {
    nums.sort((a, b) => a - b);
    const result: number[][] = [];
    
    for (let i = 0; i < nums.length - 2; i++) {
        // Skip duplicates for first number
        if (i > 0 && nums[i] === nums[i - 1]) continue;
        
        let left = i + 1, right = nums.length - 1;
        const target = -nums[i];
        
        while (left < right) {
            const sum = nums[left] + nums[right];
            
            if (sum === target) {
                result.push([nums[i], nums[left], nums[right]]);
                
                // Skip duplicates for second number
                while (left < right && nums[left] === nums[left + 1]) left++;
                // Skip duplicates for third number
                while (left < right && nums[right] === nums[right - 1]) right--;
                
                left++;
                right--;
            } else if (sum < target) {
                left++;
            } else {
                right--;
            }
        }
    }
    
    return result;
}
```

- **Time Complexity**: O(n²) - O(n) for each of n elements
- **Space Complexity**: O(1) (ignoring output)
- **Optimization**: Two pointers avoids O(n³) brute force

### How to Articulate

**Opening**: "I'll sort the array, then for each number, treat it as the first in the triplet and use two pointers to find pairs that sum to its negative. This reduces 3Sum to multiple Two Sum problems."

**Handling duplicates**: "After sorting, I skip duplicate values for all three positions to ensure unique triplets. This is why sorting is crucial."

---

## Problem 3: Trapping Rain Water

**Problem**: Given elevation map, compute how much water it can trap after raining.

**Example**:
- Input: `[0,1,0,2,1,0,1,3,2,1,2,1]`
- Output: `6`

### Interview Strategy

1. **Stack approach**: Track pending bars
2. **Two pointers**: More intuitive once understood
3. **Key insight**: Water at position depends on max heights to its left and right

### Solution 1: Precompute Left/Right Max

```typescript
function trapPrecompute(height: number[]): number {
    if (height.length === 0) return 0;
    
    const n = height.length;
    const leftMax = new Array(n);
    const rightMax = new Array(n);
    
    leftMax[0] = height[0];
    for (let i = 1; i < n; i++) {
        leftMax[i] = Math.max(leftMax[i - 1], height[i]);
    }
    
    rightMax[n - 1] = height[n - 1];
    for (let i = n - 2; i >= 0; i--) {
        rightMax[i] = Math.max(rightMax[i + 1], height[i]);
    }
    
    let water = 0;
    for (let i = 0; i < n; i++) {
        water += Math.min(leftMax[i], rightMax[i]) - height[i];
    }
    
    return water;
}
```

- **Time Complexity**: O(n)
- **Space Complexity**: O(n) - two arrays
- **When to use**: Easier to understand

### Solution 2: Two Pointers (Optimized Space)

```typescript
function trap(height: number[]): number {
    if (height.length === 0) return 0;
    
    let left = 0, right = height.length - 1;
    let leftMax = 0, rightMax = 0;
    let water = 0;
    
    while (left < right) {
        if (height[left] < height[right]) {
            if (height[left] >= leftMax) {
                leftMax = height[left];
            } else {
                water += leftMax - height[left];
            }
            left++;
        } else {
            if (height[right] >= rightMax) {
                rightMax = height[right];
            } else {
                water += rightMax - height[right];
            }
            right--;
        }
    }
    
    return water;
}
```

- **Time Complexity**: O(n)
- **Space Complexity**: O(1)
- **Optimization**: Computes max on-the-fly instead of precomputing

### How to Articulate

**Opening**: "Water at each position is limited by the minimum of maximum heights to its left and right, minus the current height. I'll use two pointers and track max heights from both ends."

**Two pointer logic**: "When left bar is shorter, we know leftMax limits water there (even if we don't know final rightMax, it's at least as tall as current right). We add water if current bar is below leftMax."

---

## Problem 4: Minimum Window Substring

**Problem**: Find minimum window in string `s` that contains all characters of string `t`.

**Example**:
- Input: `s = "ADOBECODEBANC"`, `t = "ABC"`
- Output: `"BANC"`

### Interview Strategy

1. **Sliding window**: Expand to include all chars, contract to minimize
2. **Track requirements**: Hash map for char counts
3. **Validation**: Check if current window is valid

### Solution: Sliding Window with Hash Maps

```typescript
function minWindow(s: string, t: string): string {
    if (s.length === 0 || t.length === 0) return "";
    
    const tCount = new Map<string, number>();
    for (const char of t) {
        tCount.set(char, (tCount.get(char) || 0) + 1);
    }
    
    let required = tCount.size;
    let formed = 0; // Unique chars in window with desired frequency
    
    const windowCounts = new Map<string, number>();
    let left = 0, right = 0;
    let minLen = Infinity, minLeft = 0;
    
    while (right < s.length) {
        const char = s[right];
        windowCounts.set(char, (windowCounts.get(char) || 0) + 1);
        
        if (tCount.has(char) && windowCounts.get(char) === tCount.get(char)) {
            formed++;
        }
        
        // Contract window while valid
        while (left <= right && formed === required) {
            // Update result
            if (right - left + 1 < minLen) {
                minLen = right - left + 1;
                minLeft = left;
            }
            
            const leftChar = s[left];
            windowCounts.set(leftChar, windowCounts.get(leftChar)! - 1);
            
            if (tCount.has(leftChar) && windowCounts.get(leftChar)! < tCount.get(leftChar)!) {
                formed--;
            }
            left++;
        }
        
        right++;
    }
    
    return minLen === Infinity ? "" : s.substring(minLeft, minLeft + minLen);
}
```

- **Time Complexity**: O(S + T) where S, T are string lengths
- **Space Complexity**: O(S + T) - hash maps
- **Optimization**: Single pass with expanding/contracting window

### How to Articulate

**Opening**: "I'll use a sliding window with two pointers. The right pointer expands the window to include all required characters. Once valid, the left pointer contracts to find the minimum window."

**Tracking validity**: "I use hash maps to count characters. The window is valid when it contains all characters from `t` with at least the required frequencies."

---

## Problem 5: Longest Repeating Character Replacement

**Problem**: Replace at most `k` characters to get longest substring of repeating characters.

**Example**:
- Input: `s = "AABABBA"`, `k = 1`
- Output: `4` (replace one B to get "AAAA")

### Interview Strategy

1. **Sliding window**: Expand while valid, contract when invalid
2. **Valid condition**: `windowSize - maxFreq <= k`
3. **Track max frequency**: Of any character in current window

### Solution: Sliding Window

```typescript
function characterReplacement(s: string, k: number): number {
    const count = new Map<string, number>();
    let maxCount = 0;
    let maxLen = 0;
    let left = 0;
    
    for (let right = 0; right < s.length; right++) {
        count.set(s[right], (count.get(s[right]) || 0) + 1);
        maxCount = Math.max(maxCount, count.get(s[right])!);
        
        // If window is invalid, shrink from left
        while (right - left + 1 - maxCount > k) {
            count.set(s[left], count.get(s[left])! - 1);
            left++;
        }
        
        maxLen = Math.max(maxLen, right - left + 1);
    }
    
    return maxLen;
}
```

- **Time Complexity**: O(n)
- **Space Complexity**: O(1) - at most 26 characters
- **Key insight**: Window is valid if minority characters ≤ k

### How to Articulate

**Opening**: "I'll use a sliding window and track character frequencies. The window is valid if the number of characters that need changing (window size minus most frequent character count) is at most k."

**Window validity**: "If `windowSize - maxFreq > k`, we need to replace more than k characters to make all same, so we shrink the window from left."

---

## Key Patterns Summary

| Pattern | When to Use | Pointers | Time |
|---------|-------------|----------|------|
| **Two Pointers - Opposite Ends** | Sorted array, optimization | Move based on comparison | O(n) |
| **Two Pointers - Same Direction** | Slow/fast, remove duplicates | Both move forward | O(n) |
| **Sliding Window - Fixed** | Subarray of size k | Right expands, left = right - k | O(n) |
| **Sliding Window - Dynamic** | Min/max substring with constraint | Expand right, contract left | O(n) |

## Interview Tips

1. **Consider sorting**: Often enables two pointers
2. **Identify window validity**: What makes a window satisfy constraints?
3. **When to expand/contract**: Expand while possible, contract when required
4. **Track state efficiently**: Use hash maps for frequencies
5. **Edge cases**: Empty strings, k=0, all same characters
6. **Draw it out**: Visualize pointer movements on paper
