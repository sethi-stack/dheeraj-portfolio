import { climbStairs, lengthOfLIS, coinChange, uniquePaths, wordBreak } from '../src/algorithms/dp';

describe('Dynamic Programming Algorithms', () => {
  describe('climbStairs', () => {
    test('should return correct ways for n=2', () => {
      expect(climbStairs(2)).toBe(2);
    });

    test('should return correct ways for n=3', () => {
      expect(climbStairs(3)).toBe(3);
    });

    test('should return correct ways for n=5', () => {
      expect(climbStairs(5)).toBe(8);
    });
  });

  describe('lengthOfLIS', () => {
    test('should return correct LIS length', () => {
      expect(lengthOfLIS([10, 9, 2, 5, 3, 7, 101, 18])).toBe(4); // [2, 3, 7, 101]
    });

    test('should handle unsorted array', () => {
      expect(lengthOfLIS([0, 1, 0, 3, 2, 3])).toBe(4); // [0, 1, 2, 3]
    });

    test('should handle repeating elements', () => {
      expect(lengthOfLIS([7, 7, 7, 7, 7, 7, 7])).toBe(1);
    });
  });

  describe('coinChange', () => {
    test('should return min coins', () => {
      expect(coinChange([1, 2, 5], 11)).toBe(3); // 5 + 5 + 1
    });

    test('should return -1 if not possible', () => {
      expect(coinChange([2], 3)).toBe(-1);
    });

    test('should return 0 for amount 0', () => {
      expect(coinChange([1], 0)).toBe(0);
    });
  });

  describe('uniquePaths', () => {
    test('should return correct paths', () => {
      expect(uniquePaths(3, 7)).toBe(28);
    });
  });

  describe('wordBreak', () => {
    test('should return true if breakable', () => {
      expect(wordBreak('leetcode', ['leet', 'code'])).toBe(true);
    });
    test('should return false if not breakable', () => {
      expect(wordBreak('catsandog', ['cats', 'dog', 'sand', 'and', 'cat'])).toBe(false);
    });
  });
});
