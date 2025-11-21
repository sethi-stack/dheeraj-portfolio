# Dynamic Programming (DP)

DP is an optimization technique for solving recursive problems that have overlapping subproblems.

## 1. Top-Down (Memoization)
- **Approach**: Start from the big problem, break it down. Store results of subproblems in a map/array to avoid re-computation.
- **Recursion + Cache**.

## 2. Bottom-Up (Tabulation)
- **Approach**: Solve the smallest subproblems first and build up to the final solution.
- **Iteration + Table**.

### Example: Climbing Stairs
You are climbing a staircase. It takes `n` steps to reach the top. Each time you can either climb 1 or 2 steps. In how many distinct ways can you climb to the top?

**Recurrence Relation**: `dp[i] = dp[i-1] + dp[i-2]`
(To reach step `i`, you could have come from `i-1` or `i-2`).

```typescript
function climbStairs(n: number): number {
    if (n <= 2) return n;
    let dp = new Array(n + 1);
    dp[1] = 1; dp[2] = 2;
    for (let i = 3; i <= n; i++) {
        dp[i] = dp[i-1] + dp[i-2];
    }
    return dp[n];
}
```

### Example: Longest Increasing Subsequence (LIS)
Given an integer array `nums`, return the length of the longest strictly increasing subsequence.

**Recurrence Relation**: `dp[i] = max(dp[j]) + 1` for all `j < i` where `nums[j] < nums[i]`.
`dp[i]` represents the length of LIS ending at index `i`.
