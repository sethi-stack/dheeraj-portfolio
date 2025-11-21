"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const trees_1 = require("../src/algorithms/trees");
describe('Tree Algorithms', () => {
    const root = new trees_1.TreeNode(1);
    root.left = new trees_1.TreeNode(2);
    root.right = new trees_1.TreeNode(3);
    root.right.left = new trees_1.TreeNode(4);
    root.right.right = new trees_1.TreeNode(5);
    // Tree:
    //    1
    //   / \
    //  2   3
    //     / \
    //    4   5
    describe('maxDepth', () => {
        test('should return correct depth', () => {
            expect((0, trees_1.maxDepth)(root)).toBe(3);
        });
    });
    describe('invertTree', () => {
        test('should invert tree', () => {
            var _a, _b;
            const inverted = (0, trees_1.invertTree)(new trees_1.TreeNode(1, new trees_1.TreeNode(2), new trees_1.TreeNode(3)));
            expect((_a = inverted === null || inverted === void 0 ? void 0 : inverted.left) === null || _a === void 0 ? void 0 : _a.val).toBe(3);
            expect((_b = inverted === null || inverted === void 0 ? void 0 : inverted.right) === null || _b === void 0 ? void 0 : _b.val).toBe(2);
        });
    });
    describe('levelOrder', () => {
        test('should return level order traversal', () => {
            expect((0, trees_1.levelOrder)(root)).toEqual([[1], [2, 3], [4, 5]]);
        });
    });
    describe('maxPathSum', () => {
        test('should return max path sum', () => {
            const node = new trees_1.TreeNode(-10);
            node.left = new trees_1.TreeNode(9);
            node.right = new trees_1.TreeNode(20);
            node.right.left = new trees_1.TreeNode(15);
            node.right.right = new trees_1.TreeNode(7);
            expect((0, trees_1.maxPathSum)(node)).toBe(42); // 15 + 20 + 7
        });
    });
    describe('serialize & deserialize', () => {
        test('should serialize and deserialize correctly', () => {
            const original = new trees_1.TreeNode(1, new trees_1.TreeNode(2), new trees_1.TreeNode(3));
            const str = (0, trees_1.serialize)(original);
            const deserialized = (0, trees_1.deserialize)(str);
            expect((0, trees_1.serialize)(deserialized)).toBe(str);
        });
    });
});
