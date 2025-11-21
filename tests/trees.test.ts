import { TreeNode, maxDepth, invertTree, levelOrder, maxPathSum, serialize, deserialize } from '../src/algorithms/trees';

describe('Tree Algorithms', () => {
  const root = new TreeNode(1);
  root.left = new TreeNode(2);
  root.right = new TreeNode(3);
  root.right.left = new TreeNode(4);
  root.right.right = new TreeNode(5);
  // Tree:
  //    1
  //   / \
  //  2   3
  //     / \
  //    4   5

  describe('maxDepth', () => {
    test('should return correct depth', () => {
      expect(maxDepth(root)).toBe(3);
    });
  });

  describe('invertTree', () => {
    test('should invert tree', () => {
      const inverted = invertTree(new TreeNode(1, new TreeNode(2), new TreeNode(3)));
      expect(inverted?.left?.val).toBe(3);
      expect(inverted?.right?.val).toBe(2);
    });
  });

  describe('levelOrder', () => {
    test('should return level order traversal', () => {
      expect(levelOrder(root)).toEqual([[1], [2, 3], [4, 5]]);
    });
  });

  describe('maxPathSum', () => {
    test('should return max path sum', () => {
      const node = new TreeNode(-10);
      node.left = new TreeNode(9);
      node.right = new TreeNode(20);
      node.right.left = new TreeNode(15);
      node.right.right = new TreeNode(7);
      expect(maxPathSum(node)).toBe(42); // 15 + 20 + 7
    });
  });

  describe('serialize & deserialize', () => {
    test('should serialize and deserialize correctly', () => {
      const original = new TreeNode(1, new TreeNode(2), new TreeNode(3));
      const str = serialize(original);
      const deserialized = deserialize(str);
      expect(serialize(deserialized)).toBe(str);
    });
  });
});
