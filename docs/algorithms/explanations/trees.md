# Trees

Trees are hierarchical data structures with a root node and children forming subtrees. Binary trees are most common in interviews.

**Node Definition**:
```typescript
class TreeNode {
    val: number;
    left: TreeNode | null;
    right: TreeNode | null;
}
```

---

## Problem 1: Binary Tree Level Order Traversal

**Problem**: Return level-by-level traversal of binary tree nodes' values (left to right).

**Example**:
```
    3
   / \
  9  20
    /  \
   15   7
```
Output: `[[3], [9,20], [15,7]]`

### Interview Strategy

1. **Recognize BFS**: Level-by-level suggests queue-based BFS
2. **Alternative**: DFS with level tracking (less intuitive)
3. **Clarify**: Empty tree returns `[]`

### Solution 1: BFS with Queue

```typescript
function levelOrder(root: TreeNode | null): number[][] {
    if (!root) return [];
    
    const result: number[][] = [];
    const queue: TreeNode[] = [root];
    
    while (queue.length > 0) {
        const levelSize = queue.length;
        const currentLevel: number[] = [];
        
        for (let i = 0; i < levelSize; i++) {
            const node = queue.shift()!;
            currentLevel.push(node.val);
            
            if (node.left) queue.push(node.left);
            if (node.right) queue.push(node.right);
        }
        result.push(currentLevel);
    }
    return result;
}
```

- **Time Complexity**: O(n) - visit each node once
- **Space Complexity**: O(w) where w = max width of tree (for queue)
- **When to use**: Perfect for level-by-level problems

### Solution 2: DFS with Level Tracking

```typescript
function levelOrderDFS(root: TreeNode | null): number[][] {
    const result: number[][] = [];
    
    function dfs(node: TreeNode | null, level: number) {
        if (!node) return;
        
        if (result.length === level) {
            result.push([]); // Create new level
        }
        result[level].push(node.val);
        
        dfs(node.left, level + 1);
        dfs(node.right, level + 1);
    }
    
    dfs(root, 0);
    return result;
}
```

- **Time Complexity**: O(n)
- **Space Complexity**: O(h) - recursion stack where h = height
- **When to use**: When you want to show DFS alternative

### How to Articulate

**Opening**: "I'll use BFS with a queue. For each level, I'll process all nodes currently in the queue (tracking level size), add their values to current level array, and enqueue their children for next level."

**Key technique**: "Capturing `levelSize` before the inner loop ensures I only process the current level's nodes."

---

## Problem 2: Binary Tree Maximum Path Sum

**Problem**: Find maximum path sum where path can start and end at any node.

**Example**:
```
   -10
   /  \
  9   20
     /  \
    15   7
```
Output: `42` (path: 15→20→7)

### Interview Strategy

1. **Clarify**: Path doesn't need to go through root
2. **Post-order DFS**: Process children before parent
3. **Track global max**: Max path through current node

### Solution: Post-Order DFS

```typescript
function maxPathSum(root: TreeNode | null): number {
    let maxSum = -Infinity;
    
    function dfs(node: TreeNode | null): number {
        if (!node) return 0;
        
        // Get max path sums from children (ignore negative)
        const leftMax = Math.max(0, dfs(node.left));
        const rightMax = Math.max(0, dfs(node.right));
        
        // Max path *through* current node (could be global max)
        const pathThroughNode = node.val + leftMax + rightMax;
        maxSum = Math.max(maxSum, pathThroughNode);
        
        // Return max path *ending at* current node (for parent)
        return node.val + Math.max(leftMax, rightMax);
    }
    
    dfs(root);
    return maxSum;
}
```

- **Time Complexity**: O(n) - visit each node once
- **Space Complexity**: O(h) - recursion stack
- **Key insight**: Distinguish between path *through* node vs path *ending at* node

### How to Articulate

**Opening**: "I'll use post-order DFS. At each node, I compute two things: (1) max path sum *through* this node (left + node + right) which could be the global answer, and (2) max path sum *ending at* this node to return to parent."

**Why ignore negative children**: "If a subtree contributes negative value, it's better to not include it in the path."

---

## Problem 3: Serialize and Deserialize Binary Tree

**Problem**: Design algorithm to serialize tree to string and deserialize back.

### Interview Strategy

1. **Choose encoding**: Level-order or pre-order (both work)
2. **Handle nulls**: Need markers for structure
3. **Discuss trade-offs**: Space vs implementation complexity

### Solution: Pre-Order with Null Markers

```typescript
function serialize(root: TreeNode | null): string {
    const values: string[] = [];
    
    function dfs(node: TreeNode | null) {
        if (!node) {
            values.push('null');
            return;
        }
        values.push(String(node.val));
        dfs(node.left);
        dfs(node.right);
    }
    
    dfs(root);
    return values.join(',');
}

function deserialize(data: string): TreeNode | null {
    const values = data.split(',');
    let index = 0;
    
    function dfs(): TreeNode | null {
        if (values[index] === 'null') {
            index++;
            return null;
        }
        const node = new TreeNode(parseInt(values[index++]));
        node.left = dfs();
        node.right = dfs();
        return node;
    }
    
    return dfs();
}
```

- **Time Complexity**: O(n) for both operations
- **Space Complexity**: O(n) for serialized string
- **When to use**: Pre-order is most natural for binary trees

### How to Articulate

**Opening**: "I'll use pre-order traversal for serialization, marking nulls explicitly. Deserialization follows the same pre-order pattern, recursively building left subtree before right."

**Why pre-order**: "Pre-order (root, left, right) naturally matches how we construct trees. We know the root first, then build left and right subtrees."

---

## Problem 4: Validate Binary Search Tree

**Problem**: Determine if a tree is a valid BST.

### Interview Strategy

1. **Clarify BST property**: All left < root < all right (not just immediate children!)
2. **Common mistake**: Only checking immediate children
3. **Track valid range**: Each node must be in `(min, max)` range

### Solution 1: Correct but Suboptimal - In-Order Check

```typescript
function isValidBSTInorder(root: TreeNode | null): boolean {
    const values: number[] = [];
    
    function inorder(node: TreeNode | null) {
        if (!node) return;
        inorder(node.left);
        values.push(node.val);
        inorder(node.right);
    }
    
    inorder(root);
    
    for (let i = 1; i < values.length; i++) {
        if (values[i] <= values[i-1]) return false;
    }
    return true;
}
```

- **Time Complexity**: O(n)
- **Space Complexity**: O(n) - storing all values
- **Issue**: Needs extra space for array

### Solution 2: Optimized - Range Validation

```typescript
function isValidBST(root: TreeNode | null): boolean {
    function validate(node: TreeNode | null, min: number, max: number): boolean {
        if (!node) return true;
        
        if (node.val <= min || node.val >= max) {
            return false;
        }
        
        return validate(node.left, min, node.val) &&
               validate(node.right, node.val, max);
    }
    
    return validate(root, -Infinity, Infinity);
}
```

- **Time Complexity**: O(n)
- **Space Complexity**: O(h) - recursion stack only
- **Optimization**: No array needed, validate during traversal

### How to Articulate

**Opening**: "I'll recursively validate that each node is within its valid range. Left subtree must be less than current node, and right subtree must be greater."

**Common mistake to avoid**: "It's not enough to check `left.val < node.val < right.val`. ALL nodes in left subtree must be less than root, not just immediate child."

---

## Key Tree Patterns

| Pattern | When to Use | Technique |
|---------|-------------|-----------|
| **BFS (Level Order)** | Level-by-level traversal | Queue |
| **Pre-Order DFS** | Process parent before children | Root, Left, Right |
| **In-Order DFS** | BST in sorted order | Left, Root, Right |
| **Post-Order DFS** | Process children first (path sums) | Left, Right, Root |
| **Range Validation** | Validate BST, ranges | Track min/max |

## Interview Tips

1. **Draw the tree**: Visualize helps immensely
2. **Ask about null values**: How to serialize them?
3. **Choose right traversal**: Pre/In/Post order changes everything
4. **Track extra info**: Level, parent, min/max ranges
5. **Base case**: Always handle null nodes first
