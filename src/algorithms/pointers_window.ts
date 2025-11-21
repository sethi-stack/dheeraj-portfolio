/**
 * Two Pointers & Sliding Window Algorithms
 */

// --- Container With Most Water ---

export function maxArea(height: number[]): number {
  let left = 0;
  let right = height.length - 1;
  let max = 0;

  while (left < right) {
    const h = Math.min(height[left], height[right]);
    const w = right - left;
    max = Math.max(max, h * w);

    if (height[left] < height[right]) {
      left++;
    } else {
      right--;
    }
  }
  return max;
}

// --- 3Sum ---

export function threeSum(nums: number[]): number[][] {
  nums.sort((a, b) => a - b);
  const result: number[][] = [];

  for (let i = 0; i < nums.length - 2; i++) {
    if (i > 0 && nums[i] === nums[i - 1]) continue; // Skip duplicates

    let left = i + 1;
    let right = nums.length - 1;

    while (left < right) {
      const sum = nums[i] + nums[left] + nums[right];
      if (sum === 0) {
        result.push([nums[i], nums[left], nums[right]]);
        while (left < right && nums[left] === nums[left + 1]) left++; // Skip duplicates
        while (left < right && nums[right] === nums[right - 1]) right--; // Skip duplicates
        left++;
        right--;
      } else if (sum < 0) {
        left++;
      } else {
        right--;
      }
    }
  }
  return result;
}

// --- Trapping Rain Water ---

export function trap(height: number[]): number {
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

// --- Minimum Window Substring ---

export function minWindow(s: string, t: string): string {
  if (t.length > s.length) return '';

  const map = new Map<string, number>();
  for (const char of t) {
    map.set(char, (map.get(char) || 0) + 1);
  }

  let left = 0;
  let right = 0;
  let required = map.size;
  let formed = 0;
  const windowCounts = new Map<string, number>();
  let ans: [number, number, number] = [-1, 0, 0]; // length, left, right

  while (right < s.length) {
    const char = s[right];
    windowCounts.set(char, (windowCounts.get(char) || 0) + 1);

    if (map.has(char) && windowCounts.get(char) === map.get(char)) {
      formed++;
    }

    while (left <= right && formed === required) {
      const char = s[left];

      // Update answer
      if (ans[0] === -1 || right - left + 1 < ans[0]) {
        ans = [right - left + 1, left, right];
      }

      windowCounts.set(char, windowCounts.get(char)! - 1);
      if (map.has(char) && windowCounts.get(char)! < map.get(char)!) {
        formed--;
      }
      left++;
    }
    right++;
  }

  return ans[0] === -1 ? '' : s.substring(ans[1], ans[2] + 1);
}
