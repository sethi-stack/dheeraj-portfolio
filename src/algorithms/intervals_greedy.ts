/**
 * Intervals & Greedy Algorithms
 * Optimized solutions using greedy approaches and interval manipulation
 */

// ============================================================================
// Problem 1: Merge Intervals
// ============================================================================

// Approach: Sort + Merge - O(n log n) time, O(n) space

export function merge(intervals: number[][]): number[][] {
  if (intervals.length <= 1) return intervals;

  // Sort by start time
  intervals.sort((a, b) => a[0] - b[0]);

  const result: number[][] = [intervals[0]];

  for (let i = 1; i < intervals.length; i++) {
    const current = intervals[i];
    const lastMerged = result[result.length - 1];

    if (current[0] <= lastMerged[1]) {
      // Overlap: Merge
      lastMerged[1] = Math.max(lastMerged[1], current[1]);
    } else {
      // No overlap: Add to result
      result.push(current);
    }
  }

  return result;
}

// ============================================================================
// Problem 2: Meeting Rooms II (Min Meeting Rooms)
// ============================================================================

// Approach: Two-pointer - O(n log n) time, O(n) space

export function minMeetingRooms(intervals: number[][]): number {
  if (intervals.length === 0) return 0;

  const starts = intervals.map((i) => i[0]).sort((a, b) => a - b);
  const ends = intervals.map((i) => i[1]).sort((a, b) => a - b);

  let rooms = 0;
  let endIdx = 0;

  for (let i = 0; i < starts.length; i++) {
    if (starts[i] < ends[endIdx]) {
      rooms++;
    } else {
      endIdx++;
    }
  }

  return rooms;
}

// ============================================================================
// Problem 3: Best Time to Buy and Sell Stock
// ============================================================================

// Approach: Single Pass Greedy - O(n) time, O(1) space

export function maxProfit(prices: number[]): number {
  let minPrice = Infinity;
  let maxProfit = 0;

  for (const price of prices) {
    if (price < minPrice) {
      minPrice = price;
    } else if (price - minPrice > maxProfit) {
      maxProfit = price - minPrice;
    }
  }
  return maxProfit;
}

// ============================================================================
// Problem 4: Maximum Subarray
// ============================================================================

// Approach: Kadane's Algorithm (Dynamic Programming/Greedy) - O(n) time, O(1) space

export function maxSubArray(nums: number[]): number {
  let currentSum = nums[0];
  let maxSum = nums[0];

  for (let i = 1; i < nums.length; i++) {
    currentSum = Math.max(nums[i], currentSum + nums[i]);
    maxSum = Math.max(maxSum, currentSum);
  }
  return maxSum;
}
