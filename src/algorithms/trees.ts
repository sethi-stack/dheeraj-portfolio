/**
 * Tree Algorithms
 * Binary tree operations and traversals
 */

export class TreeNode {
  val: number;
  left: TreeNode | null;
  right: TreeNode | null;
  constructor(val?: number, left?: TreeNode | null, right?: TreeNode | null) {
    this.val = val === undefined ? 0 : val;
    this.left = left === undefined ? null : left;
    this.right = right === undefined ? null : right;
  }
}

// ============================================================================
// Problem 1: Maximum Depth of Binary Tree
// ============================================================================

// Approach: Recursive DFS - O(n) time, O(h) space where h is height

export function maxDepth(root: TreeNode | null): number {
  if (!root) return 0;
  return 1 + Math.max(maxDepth(root.left), maxDepth(root.right));
}

// ============================================================================
// Problem 2: Invert Binary Tree
// ============================================================================

// Approach: Recursive swap - O(n) time, O(h) space

export function invertTree(root: TreeNode | null): TreeNode | null {
  if (!root) return null;
  const temp = root.left;
  root.left = root.right;
  root.right = temp;
  invertTree(root.left);
  invertTree(root.right);
  return root;
}

// ============================================================================
// Problem 3: Binary Tree Level Order Traversal
// ============================================================================

// Approach: BFS with queue - O(n) time, O(w) space where w is max width

export function levelOrder(root: TreeNode | null): number[][] {
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

// ============================================================================
// Problem 4: Binary Tree Maximum Path Sum
// ============================================================================

// Approach: DFS with global max - O(n) time, O(h) space

export function maxPathSum(root: TreeNode | null): number {
  let maxSum = -Infinity;

  function dfs(node: TreeNode | null): number {
    if (!node) return 0;

    // Ignore negative paths
    const leftMax = Math.max(dfs(node.left), 0);
    const rightMax = Math.max(dfs(node.right), 0);

    // Update global max (split at this node)
    maxSum = Math.max(maxSum, node.val + leftMax + rightMax);

    // Return max path continuing upwards
    return node.val + Math.max(leftMax, rightMax);
  }

  dfs(root);
  return maxSum;
}

// ============================================================================
// Problem 5: Serialize and Deserialize Binary Tree
// ============================================================================

// Serialize Approach: Preorder DFS - O(n) time, O(n) space

export function serialize(root: TreeNode | null): string {
  const result: string[] = [];
  function dfs(node: TreeNode | null) {
    if (!node) {
      result.push('X');
      return;
    }
    result.push(node.val.toString());
    dfs(node.left);
    dfs(node.right);
  }
  dfs(root);
  return result.join(',');
}

export function deserialize(data: string): TreeNode | null {
  const nodes = data.split(',');
  let index = 0;

  function dfs(): TreeNode | null {
    if (nodes[index] === 'X') {
      index++;
      return null;
    }
    const node = new TreeNode(parseInt(nodes[index]));
    index++;
    node.left = dfs();
    node.right = dfs();
    return node;
  }

  return dfs();
}
