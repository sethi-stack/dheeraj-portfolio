"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pointers_window_1 = require("../src/algorithms/pointers_window");
describe('Two Pointers & Sliding Window Algorithms', () => {
    describe('maxArea', () => {
        test('should return max area', () => {
            expect((0, pointers_window_1.maxArea)([1, 8, 6, 2, 5, 4, 8, 3, 7])).toBe(49);
        });
    });
    describe('threeSum', () => {
        test('should return triplets', () => {
            const res = (0, pointers_window_1.threeSum)([-1, 0, 1, 2, -1, -4]);
            // [[-1,-1,2],[-1,0,1]]
            expect(res.length).toBe(2);
            expect(res[0]).toEqual([-1, -1, 2]);
            expect(res[1]).toEqual([-1, 0, 1]);
        });
    });
    describe('trap', () => {
        test('should return trapped water', () => {
            expect((0, pointers_window_1.trap)([0, 1, 0, 2, 1, 0, 1, 3, 2, 1, 2, 1])).toBe(6);
        });
    });
    describe('minWindow', () => {
        test('should return min window', () => {
            expect((0, pointers_window_1.minWindow)('ADOBECODEBANC', 'ABC')).toBe('BANC');
        });
        test('should return empty if not found', () => {
            expect((0, pointers_window_1.minWindow)('a', 'aa')).toBe('');
        });
    });
});
