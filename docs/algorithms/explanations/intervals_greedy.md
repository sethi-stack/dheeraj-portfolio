# Intervals & Greedy

Interval problems involve ranges [start, end]. Greedy algorithms make locally optimal choices hoping for global optimum.

---

## Problem 1: Merge Intervals

**Problem**: Merge all overlapping intervals.

**Example**:
- Input: `[[1,3],[2,6],[8,10],[15,18]]`
- Output: `[[1,6],[8,10],[15,18]]`

### Interview Strategy

1. **Sort first**: Critical for interval problems
2. **Greedy approach**: Merge as you go
3. **Overlap condition**: `start <= prevEnd`

### Solution: Sort and Merge

```typescript
function merge(intervals: number[][]): number[][] {
    if (intervals.length <= 1) return intervals;
    
    // Sort by start time
    intervals.sort((a, b) => a[0] - b[0]);
    
    const result: number[][] = [intervals[0]];
    
    for (let i = 1; i < intervals.length; i++) {
        const current = intervals[i];
        const lastMerged = result[result.length - 1];
        
        if (current[0] <= lastMerged[1]) {
            // Overlap - merge
            lastMerged[1] = Math.max(lastMerged[1], current[1]);
        } else {
            // No overlap - add new interval
            result.push(current);
        }
    }
    
    return result;
}
```

- **Time Complexity**: O(n log n) - dominated by sorting
- **Space Complexity**: O(n) - result array
- **When to use**: Interval merging, calendar problems

### How to Articulate

**Opening**: "I'll sort intervals by start time. Then iterate through, checking if each interval overlaps with the last merged one. If yes, extend it. If no, start a new merged interval."

**Why sort**: "Sorting ensures we process intervals in order, allowing us to determine overlap by comparing with just the last merged interval, not all previous ones."

---

## Problem 2: Meeting Rooms II

**Problem**: Given meeting time intervals, find mini number of conference rooms required.

**Example**:
- Input: `[[0,30],[5,10],[15,20]]`
- Output: `2` (room 1: [0,30], room 2: [5,10] then [15,20])

### Interview Strategy

1. **Track concurrent meetings**: When do meetings overlap?
2. **Approaches**: Min heap or separate start/end arrays
3. **Greedy**: Allocate room when needed, free when meeting ends

### Solution 1: Min Heap

```typescript
function minMeetingRooms(intervals: number[][]): number {
    if (intervals.length === 0) return 0;
    
    intervals.sort((a, b) => a[0] - b[0]);
    
    const endTimes: number[] = []; // Min heap (simulate with sorted array)
    
    for (const meeting of intervals) {
        // If earliest ending meeting has finished, reuse room
        if (endTimes.length > 0 && endTimes[0] <= meeting[0]) {
            endTimes.shift(); // Remove (simulating heap pop)
        }
        
        endTimes.push(meeting[1]);
        endTimes.sort((a, b) => a - b); // Maintain sorted (simulating heap)
    }
    
    return endTimes.length;
}
```

- **Time Complexity**: O(n² log n) with array (O(n log n) with proper heap)
- **Space Complexity**: O(n)
- **Note**: JavaScript doesn't have built-in heap, shown with sorted array

### Solution 2: Start/End Arrays (More Efficient)

```typescript
function minMeetingRoomsOptimized(intervals: number[][]): number {
    const starts = intervals.map(i => i[0]).sort((a, b) => a - b);
    const ends = intervals.map(i => i[1]).sort((a, b) => a - b);
    
    let rooms = 0, maxRooms = 0;
    let s = 0, e = 0;
    
    while (s < starts.length) {
        if (starts[s] < ends[e]) {
            rooms++; // Meeting starts, need a room
            s++;
            maxRooms = Math.max(maxRooms, rooms);
        } else {
            rooms--; // Meeting ends, free a room
            e++;
        }
    }
    
    return maxRooms;
}
```

- **Time Complexity**: O(n log n)
- **Space Complexity**: O(n)
- **Optimization**: Avoids heap entirely

### How to Articulate

**Opening**: "I'll track meeting start and end times separately and sort them. Using two pointers, when a meeting starts before the earliest one ends, we need an additional room. When one ends, we free a room."

**Intuition**: "Think of it like people entering and exiting a building. We count peak occupancy."

---

## Problem 3: Best Time to Buy and Sell Stock

**Problem**: Array of prices, maximize profit from one buy and one sell.

**Example**:
- Input: `[7,1,5,3,6,4]`
- Output: `5` (buy at 1, sell at 6)

### Interview Strategy

1. **Cannot sell before buy**: Need to track minimum so far
2. **Greedy**: Always buy at lowest price seen so far
3. **One pass**: O(n) solution exists

### Solution: Greedy - Track Min Price

```typescript
function maxProfit(prices: number[]): number {
    let minPrice = Infinity;
    let maxProfit = 0;
    
    for (const price of prices) {
        minPrice = Math.min(minPrice, price);
        maxProfit = Math.max(maxProfit, price - minPrice);
    }
    
    return maxProfit;
}
```

- **Time Complexity**: O(n)
- **Space Complexity**: O(1)
- **Greedy choice**: Always consider buying at the minimum price seen so far

### How to Articulate

**Opening**: "I'll track the minimum price seen so far and the maximum profit. For each price, I check if selling today (after buying at the min price) would give better profit."

**Why greedy works**: "We want to buy as low as possible before selling. By tracking the minimum, we ensure we consider the best buy price for each potential sell price."

---

## Problem 4: Jump Game

**Problem**: Array where each element is max jump length. Can you reach the last index starting from first?

**Example**:
- Input: `[2,3,1,1,4]`
- Output: `true` (jump 1 step to index 1, then 3 steps to last)

### Interview Strategy

1. **Greedy approach**: Track farthest reachable index
2. **Alternative**: DP (overkill for this problem)
3. **Early termination**: If we can reach end, no need to continue

### Solution: Greedy - Max Reach

```typescript
function canJump(nums: number[]): boolean {
    let maxReach = 0;
    
    for (let i = 0; i < nums.length; i++) {
        if (i > maxReach) return false; // Can't reach this position
        
        maxReach = Math.max(maxReach, i + nums[i]);
        
        if (maxReach >= nums.length - 1) {
            return true; // Can reach end
        }
    }
    
    return maxReach >= nums.length - 1;
}
```

- **Time Complexity**: O(n)
- **Space Complexity**: O(1)
- **Greedy**: Always extend our reach as far as possible

### How to Articulate

**Opening**: "I'll track the farthest index I can reach. At each position, I update the max reach based on current position + jump length. If I ever reach a position beyond my max reach, it's impossible."

**Example** (`[2,3,1,1,4]`):
```
i=0: maxReach = 0 + 2 = 2
i=1: maxReach = max(2, 1+3) = 4 (reached end!)
```

---

## Problem 5: Non-overlapping Intervals

**Problem**: Remove minimum number of intervals to make rest non-overlapping.

**Example**:
- Input: `[[1,2],[2,3],[3,4],[1,3]]`
- Output: `1` (remove [1,3])

### Interview Strategy

1. **Greedy**: Keep interval ending earliest
2. **Sort by end time**: Key insight!
3. **Activity selection**: Classic greedy problem

### Solution: Greedy - Earliest End Time

```typescript
function eraseOverlapIntervals(intervals: number[][]): number {
    if (intervals.length === 0) return 0;
    
    // Sort by end time
    intervals.sort((a, b) => a[1] - b[1]);
    
    let removals = 0;
    let prevEnd = intervals[0][1];
    
    for (let i = 1; i < intervals.length; i++) {
        if (intervals[i][0] < prevEnd) {
            // Overlap - remove current interval
            removals++;
        } else {
            // No overlap - update prevEnd
            prevEnd = intervals[i][1];
        }
    }
    
    return removals;
}
```

- **Time Complexity**: O(n log n)
- **Space Complexity**: O(1) (ignoring sort)
- **Greedy choice**: Keep interval that ends first, freeing more space

### How to Articulate

**Opening**: "I'll sort by end time and greedily keep intervals that end earliest. This leaves maximum room for future intervals. When I encounter overlap, I remove the interval ending later (which is the current one after sorting)."

**Why sort by end**: "Intervals ending earlier leave more room for subsequent intervals, maximizing the count we can keep."

---

## Key Greedy Patterns

| Problem Type | Greedy Choice | Sorting Key |
|--------------|---------------|-------------|
| **Interval Merging** | Merge overlapping | Start time |
| **Room Scheduling** | Min concurrent | Start/End times |
| **Activity Selection** | Choose earliest ending | End time |
| **Stock Trading** | Buy at minimum seen | Linear scan |
| **Jump Game** | Maximize reach | Linear scan |

## Interview Tips

1. **Sort first**: Most interval problems start with sorting
2. **Identify greedy property**: What makes a choice locally optimal?
3. **Prove correctness**: Can you argue why greedy works?
4. **Consider DP alternative**: Sometimes greedy doesn't work
5. **Edge cases**: Empty intervals, single element, all overlapping
6. **Time complexity**: Often O(n log n) due to sorting
