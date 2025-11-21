# Graphs

Graphs represent relationships between entities. Unlike trees, graphs may have cycles and don't have a root.

**Representations**:
- **Adjacency List**: `Map<node, neighbors[]>` - space efficient
- **Adjacency Matrix**: `boolean[][]` - quick edge lookup

---

## Problem 1: Number of Islands

**Problem**: Given 2D grid of '1's (land) and '0's (water), count islands (connected lands).

**Example**:
```
11110
11010
11000
00000
```
Output: `1`

### Interview Strategy

1. **Recognize DFS/BFS**: Classic graph traversal
2. **Mark visited**: Modify grid or use set
3. **Choice**: DFS (simpler) vs BFS (more code)

### Solution 1: DFS (Modify Grid)

```typescript
function numIslands(grid: string[][]): number {
    if (!grid.length) return 0;
    
    const rows = grid.length, cols = grid[0].length;
    let count = 0;
    
    function dfs(r: number, c: number) {
        if (r < 0 || r >= rows || c < 0 || c >= cols || grid[r][c] === '0') {
            return;
        }
        grid[r][c] = '0'; // Mark as visited
        dfs(r + 1, c);
        dfs(r - 1, c);
        dfs(r, c + 1);
        dfs(r, c - 1);
    }
    
    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
            if (grid[r][c] === '1') {
                count++;
                dfs(r, c); // Sink entire island
            }
        }
    }
    return count;
}
```

- **Time Complexity**: O(rows × cols) - visit each cell once
- **Space Complexity**: O(rows × cols) - recursion stack in worst case
- **When to use**: Can modify input, prefer DFS simplicity

### Solution 2: BFS (Preserve Grid)

```typescript
function numIslandsBFS(grid: string[][]): number {
    if (!grid.length) return 0;
    
    const rows = grid.length, cols = grid[0].length;
    const visited = new Set<string>();
    let count = 0;
    
    const directions = [[0,1], [0,-1], [1,0], [-1,0]];
    
    function bfs(r: number, c: number) {
        const queue: [number, number][] = [[r, c]];
        visited.add(`${r},${c}`);
        
        while (queue.length > 0) {
            const [row, col] = queue.shift()!;
            
            for (const [dr, dc] of directions) {
                const nr = row + dr, nc = col + dc;
                const key = `${nr},${nc}`;
                
                if (nr >= 0 && nr < rows && nc >= 0 && nc < cols &&
                    grid[nr][nc] === '1' && !visited.has(key)) {
                    visited.add(key);
                    queue.push([nr, nc]);
                }
            }
        }
    }
    
    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
            if (grid[r][c] === '1' && !visited.has(`${r},${c}`)) {
                count++;
                bfs(r, c);
            }
        }
    }
    return count;
}
```

- **Time Complexity**: O(rows × cols)
- **Space Complexity**: O(rows × cols) - visited set + queue
- **When to use**: Cannot modify input, want iterative approach

### How to Articulate

**Opening**: "I'll use DFS. For each unvisited land cell, I increment island count and DFS to mark all connected land as visited."

**Marking strategy**: "I can either modify the grid (change '1' to '0') or use a visited set. Modifying is simpler if allowed."

---

## Problem 2: Course Schedule (Cycle Detection)

**Problem**: Given `numCourses` and prerequisites `[a,b]` (must take b before a), can you finish all courses?

**Example**:
- Input: `numCourses = 2, prerequisites = [[1,0]]`
- Output: `true` (take course 0, then 1)

### Interview Strategy

1. **Recognize graph problem**: Courses are nodes, prerequisites are edges
2. **Detect cycle**: If cycle exists, impossible to complete
3. **Algorithms**: DFS with states or Topological sort (Kahn's)

### Solution 1: DFS with States

```typescript
function canFinish(numCourses: number, prerequisites: number[][]): boolean {
    const graph = new Map<number, number[]>();
    
    // Build adjacency list
    for (let i = 0; i < numCourses; i++) {
        graph.set(i, []);
    }
    for (const [course, prereq] of prerequisites) {
        graph.get(course)!.push(prereq);
    }
    
    const UNVISITED = 0, VISITING = 1, VISITED = 2;
    const state = new Array(numCourses).fill(UNVISITED);
    
    function hasCycle(course: number): boolean {
        if (state[course] === VISITING) return true; // Cycle!
        if (state[course] === VISITED) return false; // Already checked
        
        state[course] = VISITING;
        for (const prereq of graph.get(course)!) {
            if (hasCycle(prereq)) return true;
        }
        state[course] = VISITED;
        return false;
    }
    
    for (let i = 0; i < numCourses; i++) {
        if (hasCycle(i)) return false;
    }
    return true;
}
```

- **Time Complexity**: O(V + E) - vertices + edges
- **Space Complexity**: O(V + E) - graph + recursion
- **When to use**: Clean detection of cycles

### Solution 2: Topological Sort (Kahn's Algorithm)

```typescript
function canFinishKahns(numCourses: number, prerequisites: number[][]): boolean {
    const inDegree = new Array(numCourses).fill(0);
    const graph = new Map<number, number[]>();
    
    for (let i = 0; i < numCourses; i++) {
        graph.set(i, []);
    }
    
    for (const [course, prereq] of prerequisites) {
        graph.get(prereq)!.push(course);
        inDegree[course]++;
    }
    
    const queue: number[] = [];
    for (let i = 0; i < numCourses; i++) {
        if (inDegree[i] === 0) queue.push(i);
    }
    
    let completed = 0;
    while (queue.length > 0) {
        const course = queue.shift()!;
        completed++;
        
        for (const next of graph.get(course)!) {
            inDegree[next]--;
            if (inDegree[next] === 0) {
                queue.push(next);
            }
        }
    }
    
    return completed === numCourses;
}
```

- **Time Complexity**: O(V + E)
- **Space Complexity**: O(V + E)
- **When to use**: Also gives valid course order (Course Schedule II)

### How to Articulate

**Opening**: "This is a cycle detection problem on a directed graph. I'll use DFS with three states: UNVISITED, VISITING (in current path), and VISITED (fully explored). If we encounter a VISITING node, there's a cycle."

**Alternative**: "I could use topological sort (Kahn's algorithm). Start with courses having no prerequisites, take them, and reduce prerequisites for dependent courses. If we complete all courses, no cycle exists."

---

## Problem 3: Clone Graph

**Problem**: Deep copy an undirected graph where nodes contain a value and list of neighbors.

### Interview Strategy

1. **Recognize DFS/BFS traversal**: Need to visit all nodes
2. **Track clones**: Use hash map to avoid duplicates
3. **Clone neighbors recursively**: Depth-first approach

### Solution: DFS with Hash Map

```typescript
function cloneGraph(node: Node | null): Node | null {
    if (!node) return null;
    
    const clones = new Map<Node, Node>();
    
    function dfs(original: Node): Node {
        if (clones.has(original)) {
            return clones.get(original)!;
        }
        
        const clone = new Node(original.val);
        clones.set(original, clone); // Save before recursing!
        
        for (const neighbor of original.neighbors) {
            clone.neighbors.push(dfs(neighbor));
        }
        
        return clone;
    }
    
    return dfs(node);
}
```

- **Time Complexity**: O(V + E) - visit all nodes and edges
- **Space Complexity**: O(V) - hash map + recursion
- **Key insight**: Save clone before recursing to handle cycles

### How to Articulate

**Opening**: "I'll DFS through the graph while maintaining a map from original nodes to cloned nodes. This prevents infinite loops and ensures each node is cloned once."

**Critical step**: "I must add the clone to the map *before* recursing on neighbors, otherwise cycles cause infinite recursion."

---

## Problem 4: Word Ladder

**Problem**: Transform `beginWord` to `endWord` by changing one letter at a time. Each intermediate word must be in dictionary. Return shortest length.

**Example**:
- Input: `beginWord = "hit"`, `endWord = "cog"`, `wordList = ["hot","dot","dog","lot","log","cog"]`
- Output: `5` (hit → hot → dot → dog → cog)

### Interview Strategy

1. **Recognize BFS**: Shortest path suggests BFS
2. **Graph structure**: Each word is a node, edge exists if one letter different
3. **Optimization**: Use set for O(1) word lookups

### Solution: BFS

```typescript
function ladderLength(beginWord: string, endWord: string, wordList: string[]): number {
    const wordSet = new Set(wordList);
    if (!wordSet.has(endWord)) return 0;
    
    const queue: [string, number][] = [[beginWord, 1]];
    const visited = new Set<string>([beginWord]);
    
    while (queue.length > 0) {
        const [word, level] = queue.shift()!;
        
        if (word === endWord) return level;
        
        // Try changing each position
        for (let i = 0; i < word.length; i++) {
            for (let c = 97; c <= 122; c++) { // 'a' to 'z'
                const newWord = word.slice(0, i) + String.fromCharCode(c) + word.slice(i + 1);
                
                if (wordSet.has(newWord) && !visited.has(newWord)) {
                    visited.add(newWord);
                    queue.push([newWord, level + 1]);
                }
            }
        }
    }
    return 0;
}
```

- **Time Complexity**: O(M² × N) where M = word length, N = wordList size
- **Space Complexity**: O(N) - queue + visited
- **Optimization**: BFS guarantees shortest path

### How to Articulate

**Opening**: "This is a shortest path problem, so I'll use BFS. Each word is a node, and I can move to any word in the dictionary that differs by one letter."

**Neighbor generation**: "For each position in the word, I'll try all 26 letters and check if the resulting word is in the dictionary and unvisited."

**Why BFS not DFS**: "BFS explores level by level, so the first time we reach the end word, we've found the shortest path. DFS would need to explore all paths."

---

## Key Graph Patterns

| Pattern | When to Use | Algorithm | Complexity |
|---------|-------------|-----------|------------|
| **Cycle Detection** | Prerequisites, dependencies | DFS with states | O(V + E) |
| **Connected Components** | Islands, clusters | DFS/BFS from each unvisited | O(V + E) |
| **Shortest Path (Unweighted)** | Minimum transformations | BFS | O(V + E) |
| **Clone/Copy** | Deep copy graphs | DFS with hash map | O(V + E) |
| **Topological Sort** | Valid ordering | Kahn's algorithm | O(V + E) |

## Interview Tips

1. **Clarify graph type**: Directed vs undirected, weighted vs unweighted
2. **Choose representation**: Adjacency list for sparse graphs
3. **Track visited**: Essential to avoid infinite loops
4. **BFS for shortest**: Unweighted shortest path → BFS
5. **DFS for detection**: Cycles, connected components → DFS
