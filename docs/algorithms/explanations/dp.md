# Dynamic Programming

Dynamic Programming (DP) is an optimization technique for solving problems by breaking them down into overlapping subproblems. The key is recognizing when a problem can be solved by combining solutions to smaller instances.

**Core Principles**:
1. **Optimal Substructure**: Optimal solution contains optimal solutions to sub problems
2. **Overlapping Subproblems**: Same subproblems are solved multiple times

---

## Problem 1: Climbing Stairs

**Problem**: You're climbing stairs with `n` steps. You can climb 1 or 2 steps at a time. How many distinct ways can you reach the top?

**Example**:
- Input: `n = 3`
- Output: `3` (ways: 1+1+1, 1+2, 2+1)

### Interview Strategy

1. **Recognize the pattern**: This is Fibonacci!
2. **Start with recursion**: Shows understanding but inefficient
3. **Optimize with memoization**: Then bottom-up DP
4. **Space optimization**: Can we use O(1) space?

### Solution 1: Recursive (Naive)

**Approach**: Ways to reach step `n` = ways to reach `n-1` + ways to reach `n-2`

```typescript
function climbStairsRecursive(n: number): number {
    if (n <= 2) return n;
    return climbStairsRecursive(n - 1) + climbStairsRecursive(n - 2);
}
```

- **Time Complexity**: O(2^n) - exponential, very slow!
- **Space Complexity**: O(n) - recursion stack
- **When to use**: Never in production, but shows problem understanding

### Solution 2: Memoization (Top-Down DP)

```typescript
function climbStairsMemo(n: number, memo: Record<number, number> = {}): number {
    if (n <= 2) return n;
    if (memo[n]) return memo[n];
    
    memo[n] = climbStairsMemo(n - 1, memo) + climbStairsMemo(n - 2, memo);
    return memo[n];
}
```

- **Time Complexity**: O(n) - compute each state once
- **Space Complexity**: O(n) - memo + recursion stack
- **Optimization**: Caching eliminates redundant calculations

### Solution 3: Tabulation (Bottom-Up DP)

```typescript
function climbStairs(n: number): number {
    if (n <= 2) return n;
    
    const dp: number[] = new Array(n + 1);
    dp[1] = 1;
    dp[2] = 2;
    
    for (let i = 3; i <= n; i++) {
        dp[i] = dp[i - 1] + dp[i - 2];
    }
    return dp[n];
}
```

- **Time Complexity**: O(n)
- **Space Complexity**: O(n) - DP array
- **When to use**: Clearer than recursion, avoids stack overflow

### Solution 4: Space-Optimized DP

```typescript
function climbStairsOptimized(n: number): number {
    if (n <= 2) return n;
    
    let prev2 = 1, prev1 = 2;
    for (let i = 3; i <= n; i++) {
        const curr = prev1 + prev2;
        prev2 = prev1;
        prev1 = curr;
    }
    return prev1;
}
```

- **Time Complexity**: O(n)
- **Space Complexity**: O(1) - two variables only  
- **Optimization**: Only need last two values, not entire array

### How to Articulate in Interview

**Opening**: "This is similar to Fibonacci. To reach step `n`, I must have come from step `n-1` or `n-2`. So `ways(n) = ways(n-1) + ways(n-2)`."

**Progression**:
1. "I could solve recursively but it's O(2^n) due to repeated calculations"
2. "Adding memoization makes it O(n) time and space"
3. "Bottom-up DP avoids recursion overhead"
4. "Since I only need the last two values, I can optimize to O(1) space"

---

## Problem 2: Longest Increasing Subsequence (LIS)

**Problem**: Find the length of the longest strictly increasing subsequence.

**Example**:
- Input: `[10,9,2,5,3,7,101,18]`
- Output: `4` (subsequence: `[2,3,7,101]`)

### Interview Strategy

1. **Clarify**: Subsequence vs subarray (can skip elements)
2. **Start with O(n²) DP**: Clear but not optimal
3. **Optimize with Binary Search**: O(n log n)

### Solution 1: DP - O(n²)

**Approach**: `dp[i]` = length of LIS ending at index `i`

```typescript
function lengthOfLISQuadratic(nums: number[]): number {
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
```

- **Time Complexity**: O(n²) - nested loops
- **Space Complexity**: O(n) - DP array
- **When to use**: Straightforward DP, acceptable for n ≤ 1000

### Solution 2: Binary Search + Patience Sorting

```typescript
function lengthOfLIS(nums: number[]): number {
    const tails: number[] = [];
    
    for (const num of nums) {
        let left = 0, right = tails.length;
        
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
```

- **Time Complexity**: O(n log n) - binary search for each element
- **Space Complexity**: O(n) - tails array
- **Optimization**: Maintains array of smallest tails for each length

### How to Articulate in Interview

**Opening**: "I'll start with O(n²) DP where `dp[i]` represents the longest increasing subsequence ending at index `i`. For each position, I check all previous elements."

**Optimization**: "There's a clever O(n log n) solution using binary search. I maintain an array of the smallest tail elements for increasing subsequences of each length. For each new number, I binary search where it fits."

**Intuition**: "Think of patience sorting - we're maintaining multiple piles, placing each card on the leftmost pile it can go on, creating new piles when necessary."

---

## Problem 3: Coin Change

**Problem**: Given coins of different denominations and amount, find minimum number of coins to make that amount. Return -1 if impossible.

**Example**:
- Input: `coins = [1,2,5], amount = 11`
- Output: `3` (11 = 5 + 5 + 1)

### Interview Strategy

1. **Greedy doesn't work**: Example: coins=[1,3,4], amount=6
2. **Recognize DP**: Unbounded knapsack variant
3. **Build from bottom up**: Solve for all amounts 0 to target

### Solution 1: Recursive with Memoization

```typescript
function coinChangeRecursive(coins: number[], amount: number, memo: Map<number, number> = new Map()): number {
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
```

- **Time Complexity**: O(amount × coins) - each state computed once
- **Space Complexity**: O(amount) - memo + stack
- **When to use**: Top-down approach, easier to conceptualize

### Solution 2: Bottom-Up DP

```typescript
function coinChange(coins: number[], amount: number): number {
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
```

- **Time Complexity**: O(amount × coins)
- **Space Complexity**: O(amount) - DP array
- **Optimization**: No recursion overhead, easier to debug

### How to Articulate in Interview

**Opening**: "This is a classic unbounded knapsack problem. For each amount from 1 to target, I'll compute the minimum coins needed by trying each coin and taking the best option."

**Recurrence**: "`dp[i] = min(dp[i - coin] + 1)` for all coins where `i - coin >= 0`"

**Why not greedy**: "Greedy (always pick largest coin) fails. Example: coins=[1,3,4], amount=6. Greedy gives 4+1+1=3 coins, but optimal is 3+3=2 coins."

---

## Problem 4: Unique Paths

**Problem**: Robot on `m × n` grid. Starting at top-left, can only move right or down. How many unique paths to bottom-right?

**Example**:
- Input: `m = 3, n = 2`
- Output: `3` (Right→Down, Down→Right, Right→Right→Down is impossible)

### Interview Strategy

1. **Recognize grid DP**: Classic 2D DP problem
2. **Space optimization**: Can reduce from O(m×n) to O(n)
3. **Mathematical solution exists**: Combinations, but DP is more general

### Solution 1: 2D DP

```typescript
function uniquePaths2D(m: number, n: number): number {
    const dp: number[][] = Array.from({ length: m }, () => new Array(n).fill(0));
    
    // Base case: first row and column have 1 path each
    for (let i = 0; i < m; i++) dp[i][0] = 1;
    for (let j = 0; j < n; j++) dp[0][j] = 1;
    
    for (let i = 1; i < m; i++) {
        for (let j = 1; j < n; j++) {
            dp[i][j] = dp[i-1][j] + dp[i][j-1];
        }
    }
    return dp[m-1][n-1];
}
```

- **Time Complexity**: O(m × n)
- **Space Complexity**: O(m × n) - 2D array
- **When to use**: Clear, extensible to variations (obstacles, etc.)

### Solution 2: 1D DP (Space-Optimized)

```typescript
function uniquePaths(m: number, n: number): number {
    const dp: number[] = new Array(n).fill(1);
    
    for (let i = 1; i < m; i++) {
        for (let j = 1; j < n; j++) {
            dp[j] = dp[j] + dp[j-1]; // current + left
        }
    }
    return dp[n-1];
}
```

- **Time Complexity**: O(m × n)
- **Space Complexity**: O(n) - single array
- **Optimization**: Only need previous row, not entire grid

### How to Articulate in Interview

**Opening**: "This is a 2D grid DP. At each cell `(i,j)`, the paths equals paths from above `(i-1,j)` plus paths from left `(i,j-1)`."

**Base case**: "First row and column each have exactly 1 path (all right or all down)."

**Optimization**: "Since I only need the previous row, I can optimize space to O(n) by using a 1D array and updating it row by row."

---

## Problem 5: Word Break

**Problem**: Given string `s` and dictionary `wordDict`, return true if `s` can be segmented into words from dictionary.

**Example**:
- Input: `s = "leetcode"`, `wordDict = ["leet", "code"]`
- Output: `true`

### Interview Strategy

1. **Clarify**: Can words be reused? What about empty string?
2. **DP state**: `dp[i]` = can substring `s[0:i]` be segmented?
3. **Optimization**: Use set for O(1) word lookups

### Solution: Bottom-Up DP

```typescript
function wordBreak(s: string, wordDict: string[]): boolean {
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
```

- **Time Complexity**: O(n² × m) where n = string length, m = avg word length
- **Space Complexity**: O(n + w) where w = dictionary size
- **Optimization**: Set for O(1) lookups, early break

### How to Articulate in Interview

**Opening**: "I'll use DP where `dp[i]` tells me if substring `s[0:i]` can be formed. For each position, I check all possible last words ending there."

**Recurrence**: "For position `i`, check all `j < i`: if `dp[j]` is true AND `s[j:i]` is in dict, then `dp[i]` is true."

**Example** (`"leetcode"`, `["leet","code"]`):
1. `dp[0] = true` (empty)
2. `dp[4] = true` because `dp[0]` and `"leet"` exists
3. `dp[8] = true` because `dp[4]` and `"code"` exists

---

## Key DP Patterns

| Pattern | When to Use | State | Recurrence |
|---------|-------------|-------|------------|
| **Fibonacci** | Current depends on 2 previous | `dp[i]` | `dp[i] = dp[i-1] + dp[i-2]` |
| **Unbounded Knapsack** | Unlimited items, minimize/maximize | `dp[amount]` | `dp[i] = min(dp[i-x] + 1)` |
| **2D Grid** | Paths, costs on grid | `dp[i][j]` | `dp[i][j] = dp[i-1][j] + dp[i][j-1]` |
| **Subsequence** | Elements can be skipped | `dp[i]` | Check all `j < i` |
| **String Partition** | Split string into valid parts | `dp[i]` | Try all partitions ending at `i` |

## Interview Tips

1. **Identify Optimal Substructure**: Can you build solution from smaller parts?
2. **Define the State**: What does `dp[i]` represent?
3. **Find the Recurrence**: How does `dp[i]` relate to previous states?
4. **Handle Base Cases**: Usually `dp[0]` or small inputs
5. **Optimize Space**: Can you use rolling arrays or 1D instead of 2D?
6. **Trace Through Example**: Walk through a small example to verify logic
