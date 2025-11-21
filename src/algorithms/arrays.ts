/**
 * Array & String Algorithms
 * Each problem includes multiple solution approaches from simple to optimized
 */

// ============================================================================
// Problem 1: Valid Palindrome
// ============================================================================

// Approach 1: Simple (Clean & Compare) - O(n) time, O(n) space
export function isPalindromeSimple(s: string): boolean {
  const cleaned = s.toLowerCase().replace(/[^a-z0-9]/g, '');
  return cleaned === cleaned.split('').reverse().join('');
}

// Approach 2: Optimized (Two Pointers) - O(n) time, O(1) space
export function isPalindrome(s: string): boolean {
  let left = 0;
  let right = s.length - 1;

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

// ============================================================================
// Problem 2: Two Sum II (Sorted Array)
// ============================================================================

// Approach 1: Hash Map - O(n) time, O(n) space
export function twoSumHash(numbers: number[], target: number): number[] {
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

// Approach 2: Two Pointers - O(n) time, O(1) space
export function twoSumSorted(numbers: number[], target: number): number[] {
  let left = 0;
  let right = numbers.length - 1;

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

// ============================================================================
// Problem 3: Longest Substring Without Repeating Characters
// ============================================================================

// Approach 1: Brute Force - O(n²) time, O(min(n, m)) space
export function lengthOfLongestSubstringBrute(s: string): number {
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

// Approach 2: Sliding Window with Hash Map - O(n) time, O(min(n, m)) space
export function lengthOfLongestSubstring(s: string): number {
  let maxLen = 0;
  let left = 0;
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

// ============================================================================
// Problem 4: Median of Two Sorted Arrays
// ============================================================================

// Approach 1: Merge Arrays - O((m+n)log(m+n)) time, O(m+n) space
export function findMedianSimple(nums1: number[], nums2: number[]): number {
  const merged = [...nums1, ...nums2].sort((a, b) => a - b);
  const n = merged.length;
  if (n % 2 === 0) {
    return (merged[n / 2 - 1] + merged[n / 2]) / 2;
  }
  return merged[Math.floor(n / 2)];
}

// Approach 2: Binary Search on Partition - O(log(min(m,n))) time, O(1) space
export function findMedianSortedArrays(
  nums1: number[],
  nums2: number[]
): number {
  // Ensure nums1 is smaller
  if (nums1.length > nums2.length) {
    return findMedianSortedArrays(nums2, nums1);
  }

  const x = nums1.length;
  const y = nums2.length;
  let low = 0;
  let high = x;

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
        return (
          (Math.max(maxLeftX, maxLeftY) + Math.min(minRightX, minRightY)) / 2
        );
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
