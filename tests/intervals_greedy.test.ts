import { merge, minMeetingRooms, maxProfit, maxSubArray } from '../src/algorithms/intervals_greedy';

describe('Intervals & Greedy Algorithms', () => {
  describe('merge', () => {
    test('should merge overlapping intervals', () => {
      expect(
        merge([
          [1, 3],
          [2, 6],
          [8, 10],
          [15, 18],
        ])
      ).toEqual([
        [1, 6],
        [8, 10],
        [15, 18],
      ]);
    });
  });

  describe('minMeetingRooms', () => {
    test('should return min rooms', () => {
      expect(
        minMeetingRooms([
          [0, 30],
          [5, 10],
          [15, 20],
        ])
      ).toBe(2);
    });
  });

  describe('maxProfit', () => {
    test('should return max profit', () => {
      expect(maxProfit([7, 1, 5, 3, 6, 4])).toBe(5);
    });
  });

  describe('maxSubArray', () => {
    test('should return max sum', () => {
      expect(maxSubArray([-2, 1, -3, 4, -1, 2, 1, -5, 4])).toBe(6); // [4, -1, 2, 1]
    });
  });
});
