# Intervals & Greedy

## 1. Intervals
- **Concept**: Dealing with overlapping time ranges.
- **Pattern**: Sort by start time. Iterate and merge.
- **Example**: `[1,3], [2,6]` -> `[1,6]` because `2 < 3`.

## 2. Greedy
- **Concept**: Make the locally optimal choice at each step.
- **Example**: Best Time to Buy and Sell Stock.
    - Iterate through prices.
    - Keep track of `minPrice` so far.
    - Calculate `profit = currentPrice - minPrice`.
    - Update `maxProfit`.

## 3. Kadane's Algorithm (Maximum Subarray)
- **Problem**: Find contiguous subarray with largest sum.
- **Algorithm**:
    - `currentSum = max(num, currentSum + num)`
    - `maxSum = max(maxSum, currentSum)`
    - Reset `currentSum` if it drops below 0? No, the `max` check handles it. Effectively, if `currentSum` becomes negative, start fresh from current number.
