# Trees

Trees are hierarchical data structures.

## 1. Traversals
- **DFS (Depth-First Search)**:
    - **Pre-order**: Root -> Left -> Right.
    - **In-order**: Left -> Root -> Right (Sorted for BST).
    - **Post-order**: Left -> Right -> Root.
- **BFS (Breadth-First Search)**:
    - **Level-order**: Level by level. Uses a Queue.

## 2. Recursion
Most tree problems are solved recursively.
- **Base Case**: If node is null, return.
- **Recursive Step**: Process left child, process right child, combine results.

### Example: Maximum Depth
`maxDepth(root) = 1 + max(maxDepth(left), maxDepth(right))`

### Example: Serialize/Deserialize
- **Serialize**: Convert tree to string (e.g., "1,2,X,X,3,X,X" for pre-order).
- **Deserialize**: Use a queue/iterator to rebuild tree from string.
