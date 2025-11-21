import { maxArea, threeSum, trap, minWindow } from '../src/algorithms/pointers_window';

describe('Two Pointers & Sliding Window Algorithms', () => {
  describe('maxArea', () => {
    test('should return max area', () => {
      expect(maxArea([1, 8, 6, 2, 5, 4, 8, 3, 7])).toBe(49);
    });
  });

  describe('threeSum', () => {
    test('should return triplets', () => {
      const res = threeSum([-1, 0, 1, 2, -1, -4]);
      // [[-1,-1,2],[-1,0,1]]
      expect(res.length).toBe(2);
      expect(res[0]).toEqual([-1, -1, 2]);
      expect(res[1]).toEqual([-1, 0, 1]);
    });
  });

  describe('trap', () => {
    test('should return trapped water', () => {
      expect(trap([0, 1, 0, 2, 1, 0, 1, 3, 2, 1, 2, 1])).toBe(6);
    });
  });

  describe('minWindow', () => {
    test('should return min window', () => {
      expect(minWindow('ADOBECODEBANC', 'ABC')).toBe('BANC');
    });
    test('should return empty if not found', () => {
      expect(minWindow('a', 'aa')).toBe('');
    });
  });
});
