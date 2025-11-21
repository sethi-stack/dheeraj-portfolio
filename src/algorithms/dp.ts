/**
 * Dynamic Programming Algorithms
 * Each problem includes multiple solution approaches from naive to optimized
 */

// ============================================================================
// Problem 1: Climbing Stairs
// ============================================================================

// Approach 1: Recursive (Naive) - O(2^n) time, O(n) space
export function climbStairsRecursive(n: number): number {
  if (n <= 2) return n;
  return climbStairsRecursive(n - 1) + climbStairsRecursive(n - 2);
}

// Approach 2: Memoization (Top-Down DP) - O(n) time, O(n) space
export function climbStairsMemo(
  n: number,
  memo: Record<number, number> = {}
): number {
  if (n <= 2) return n;
  if (memo[n]) return memo[n];

  memo[n] = climbStairsMemo(n - 1, memo) + climbStairsMemo(n - 2, memo);
  return memo[n];
}

// Approach 3: Tabulation (Bottom-Up DP) - O(n) time, O(n) space
export function climbStairsTabulation(n: number): number {
  if (n <= 2) return n;

  const dp: number[] = new Array(n + 1);
  dp[1] = 1;
  dp[2] = 2;

  for (let i = 3; i <= n; i++) {
    dp[i] = dp[i - 1] + dp[i - 2];
  }
  return dp[n];
}

// Approach 4: Space-Optimized DP - O(n) time, O(1) space
export function climbStairs(n: number): number {
  if (n <= 2) return n;

  let prev2 = 1;
  let prev1 = 2;

  for (let i = 3; i <= n; i++) {
    const curr = prev1 + prev2;
    prev2 = prev1;
    prev1 = curr;
  }
  return prev1;
}

// ============================================================================
// Problem 2: Longest Increasing Subsequence (LIS)
// ============================================================================

// Approach 1: DP - O(n²) time, O(n) space
export function lengthOfLISQuadratic(nums: number[]): number {
  if (nums.length === 0) return 0;

  const dp: number[] = new Array(nums.length).fill(1);
  let maxLen = 1;

  for (let i = 1; i < nums.length; i++) {
    for (let j = 0; j < i; j++) {
      if (nums[i] > nums[j]) {
        dp[i] = Math.max(dp[i], dp[j] + 1);
      }
    }
    maxLen = Math.max(maxLen, dp[i]);
  }
  return maxLen;
}

// Approach 2: Binary Search + Patience Sorting - O(n log n) time, O(n) space
export function lengthOfLIS(nums: number[]): number {
  const tails: number[] = [];

  for (const num of nums) {
    let left = 0;
    let right = tails.length;

    // Binary search for insertion position
    while (left < right) {
      const mid = Math.floor((left + right) / 2);
      if (tails[mid] < num) {
        left = mid + 1;
      } else {
        right = mid;
      }
    }

    if (left === tails.length) {
      tails.push(num); // Extend sequence
    } else {
      tails[left] = num; // Replace to keep smallest possible tail
    }
  }
  return tails.length;
}

// ============================================================================
// Problem 3: Coin Change
// ============================================================================

// Approach 1: Recursive with Memoization - O(amount × coins) time, O(amount) space
export function coinChangeRecursive(
  coins: number[],
  amount: number,
  memo: Map<number, number> = new Map()
): number {
  if (amount === 0) return 0;
  if (amount < 0) return -1;
  if (memo.has(amount)) return memo.get(amount)!;

  let minCoins = Infinity;
  for (const coin of coins) {
    const result = coinChangeRecursive(coins, amount - coin, memo);
    if (result >= 0) {
      minCoins = Math.min(minCoins, result + 1);
    }
  }

  const answer = minCoins === Infinity ? -1 : minCoins;
  memo.set(amount, answer);
  return answer;
}

// Approach 2: Bottom-Up DP - O(amount × coins) time, O(amount) space
export function coinChange(coins: number[], amount: number): number {
  const dp: number[] = new Array(amount + 1).fill(Infinity);
  dp[0] = 0;

  for (let i = 1; i <= amount; i++) {
    for (const coin of coins) {
      if (i - coin >= 0) {
        dp[i] = Math.min(dp[i], dp[i - coin] + 1);
      }
    }
  }

  return dp[amount] === Infinity ? -1 : dp[amount];
}

// ============================================================================
// Problem 4: Unique Paths
// ============================================================================

// Approach 1: 2D DP - O(m × n) time, O(m × n) space
export function uniquePaths2D(m: number, n: number): number {
  const dp: number[][] = Array.from({ length: m }, () => new Array(n).fill(0));

  // Base case: first row and column have 1 path each
  for (let i = 0; i < m; i++) dp[i][0] = 1;
  for (let j = 0; j < n; j++) dp[0][j] = 1;

  for (let i = 1; i < m; i++) {
    for (let j = 1; j < n; j++) {
      dp[i][j] = dp[i - 1][j] + dp[i][j - 1];
    }
  }
  return dp[m - 1][n - 1];
}

// Approach 2: 1D DP (Space-Optimized) - O(m × n) time, O(n) space
export function uniquePaths(m: number, n: number): number {
  const dp: number[] = new Array(n).fill(1);

  for (let i = 1; i < m; i++) {
    for (let j = 1; j < n; j++) {
      dp[j] = dp[j] + dp[j - 1]; // current + left
    }
  }
  return dp[n - 1];
}

// ============================================================================
// Problem 5: Word Break
// ============================================================================

// Approach: Bottom-Up DP - O(n² × m) time, O(n + w) space
// where n = string length, m = avg word length, w = dictionary size
export function wordBreak(s: string, wordDict: string[]): boolean {
  const wordSet = new Set(wordDict);
  const dp: boolean[] = new Array(s.length + 1).fill(false);
  dp[0] = true; // Empty string is valid

  for (let i = 1; i <= s.length; i++) {
    for (let j = 0; j < i; j++) {
      if (dp[j] && wordSet.has(s.substring(j, i))) {
        dp[i] = true;
        break; // Found valid partition
      }
    }
  }
  return dp[s.length];
}
