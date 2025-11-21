import { isPalindrome, twoSumSorted, lengthOfLongestSubstring, findMedianSortedArrays } from '../src/algorithms/arrays';

describe('Array & String Algorithms', () => {
  describe('isPalindrome', () => {
    test('should return true for valid palindrome', () => {
      expect(isPalindrome('A man, a plan, a canal: Panama')).toBe(true);
    });

    test('should return false for invalid palindrome', () => {
      expect(isPalindrome('race a car')).toBe(false);
    });

    test('should handle empty string', () => {
      expect(isPalindrome(' ')).toBe(true);
    });
  });

  describe('twoSumSorted', () => {
    test('should find target', () => {
      expect(twoSumSorted([2, 7, 11, 15], 9)).toEqual([1, 2]);
    });

    test('should handle negative numbers', () => {
      expect(twoSumSorted([-1, 0], -1)).toEqual([1, 2]);
    });
  });

  describe('lengthOfLongestSubstring', () => {
    test('should return correct length', () => {
      expect(lengthOfLongestSubstring('abcabcbb')).toBe(3);
    });

    test('should handle repeating chars', () => {
      expect(lengthOfLongestSubstring('bbbbb')).toBe(1);
    });

    test('should handle single char', () => {
      expect(lengthOfLongestSubstring('pwwkew')).toBe(3);
    });
  });

  describe('findMedianSortedArrays', () => {
    test('should return median', () => {
      expect(findMedianSortedArrays([1, 3], [2])).toBe(2.0);
    });
    test('should return median for even length', () => {
      expect(findMedianSortedArrays([1, 2], [3, 4])).toBe(2.5);
    });
  });
});
