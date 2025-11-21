/**
 * Two Pointers & Sliding Window Algorithms
 * Each problem includes non-optimized and optimized solution approaches
 */

// ============================================================================
// Problem 1: Container With Most Water
// ============================================================================

// Approach 1: Brute Force - O(n²) time, O(1) space
export function maxAreaBrute(height: number[]): number {
  let maxArea = 0;

  for (let i = 0; i < height.length; i++) {
    for (let j = i + 1; j < height.length; j++) {
      const area = Math.min(height[i], height[j]) * (j - i);
      maxArea = Math.max(maxArea, area);
    }
  }

  return maxArea;
}

// Approach 2: Two Pointers - O(n) time, O(1) space
export function maxArea(height: number[]): number {
  let left = 0;
  let right = height.length - 1;
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

// ============================================================================
// Problem 2: 3Sum
// ============================================================================

// Approach: Sort + Two Pointers - O(n²) time, O(1) space (ignoring output)
export function threeSum(nums: number[]): number[][] {
  nums.sort((a, b) => a - b);
  const result: number[][] = [];

  for (let i = 0; i < nums.length - 2; i++) {
    // Skip duplicates for first number
    if (i > 0 && nums[i] === nums[i - 1]) continue;

    let left = i + 1;
    let right = nums.length - 1;
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

// ============================================================================
// Problem 3: Trapping Rain Water
// ============================================================================

// Approach 1: Precompute Left/Right Max - O(n) time, O(n) space
export function trapPrecompute(height: number[]): number {
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

// Approach 2: Two Pointers (Optimized Space) - O(n) time, O(1) space
export function trap(height: number[]): number {
  if (height.length === 0) return 0;

  let left = 0;
  let right = height.length - 1;
  let leftMax = 0;
  let rightMax = 0;
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

// ============================================================================
// Problem 4: Minimum Window Substring
// ============================================================================

// Approach: Sliding Window with Hash Maps - O(S + T) time, O(S + T) space
// where S, T are string lengths
export function minWindow(s: string, t: string): string {
  if (s.length === 0 || t.length === 0) return '';

  const tCount = new Map<string, number>();
  for (const char of t) {
    tCount.set(char, (tCount.get(char) || 0) + 1);
  }

  let required = tCount.size;
  let formed = 0; // Unique chars in window with desired frequency

  const windowCounts = new Map<string, number>();
  let left = 0;
  let right = 0;
  let minLen = Infinity;
  let minLeft = 0;

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

      if (
        tCount.has(leftChar) &&
        windowCounts.get(leftChar)! < tCount.get(leftChar)!
      ) {
        formed--;
      }
      left++;
    }

    right++;
  }

  return minLen === Infinity ? '' : s.substring(minLeft, minLeft + minLen);
}

// ============================================================================
// Problem 5: Longest Repeating Character Replacement
// ============================================================================

// Approach: Sliding Window - O(n) time, O(1) space (at most 26 characters)
export function characterReplacement(s: string, k: number): number {
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
