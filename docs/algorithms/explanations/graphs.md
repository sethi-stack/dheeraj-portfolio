# Graph Algorithms

Graphs model relationships between objects. Key traversals are BFS and DFS.

## 1. Breadth-First Search (BFS)
- **Concept**: Explore neighbors layer by layer.
- **Data Structure**: Queue (FIFO).
- **Use Case**: Shortest path in unweighted graphs.

## 2. Depth-First Search (DFS)
- **Concept**: Explore as deep as possible before backtracking.
- **Data Structure**: Stack (LIFO) or Recursion.
- **Use Case**: Detecting cycles, topological sort, pathfinding.

## 3. Topological Sort
- **Concept**: Linear ordering of vertices such that for every edge `u -> v`, `u` comes before `v`.
- **Requirement**: Directed Acyclic Graph (DAG).
- **Algorithm (Kahn's)**:
    1. Calculate in-degree of all nodes.
    2. Add nodes with 0 in-degree to queue.
    3. Process queue: remove node, reduce in-degree of neighbors.
    4. If neighbor's in-degree becomes 0, add to queue.

### Example: Number of Islands
Given a grid of '1's (land) and '0's (water), count the number of islands.
- Iterate through grid.
- If '1' found, increment count and trigger DFS/BFS to sink (mark visited) all connected land.
