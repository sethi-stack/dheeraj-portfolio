"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const backtracking_1 = require("../src/algorithms/backtracking");
describe('Backtracking Algorithms', () => {
    describe('letterCombinations', () => {
        test('should return combinations', () => {
            expect((0, backtracking_1.letterCombinations)('23')).toEqual([
                'ad',
                'ae',
                'af',
                'bd',
                'be',
                'bf',
                'cd',
                'ce',
                'cf',
            ]);
        });
    });
    describe('generateParenthesis', () => {
        test('should generate valid parentheses', () => {
            const res = (0, backtracking_1.generateParenthesis)(3);
            expect(res).toContain('((()))');
            expect(res).toContain('()()()');
            expect(res.length).toBe(5);
        });
    });
    describe('solveNQueens', () => {
        test('should solve 4-Queens', () => {
            const res = (0, backtracking_1.solveNQueens)(4);
            expect(res.length).toBe(2);
        });
    });
    describe('exist (Word Search)', () => {
        const board = [
            ['A', 'B', 'C', 'E'],
            ['S', 'F', 'C', 'S'],
            ['A', 'D', 'E', 'E'],
        ];
        test('should find word', () => {
            expect((0, backtracking_1.exist)(board, 'ABCCED')).toBe(true);
        });
        test('should not find word', () => {
            expect((0, backtracking_1.exist)(board, 'ABCB')).toBe(false);
        });
    });
    describe('decodeString', () => {
        test('should decode correctly', () => {
            expect(decodeString('3[a]2[bc]')).toBe('aaabcbc');
        });
        test('should handle nested', () => {
            expect(decodeString('3[a2[c]]')).toBe('accaccacc');
        });
    });
});
