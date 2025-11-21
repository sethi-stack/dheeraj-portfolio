import { LRUCache, Trie, MinStack } from '../src/algorithms/design';

describe('Design Algorithms', () => {
  describe('LRUCache', () => {
    test('should work correctly', () => {
      const lru = new LRUCache(2);
      lru.put(1, 1);
      lru.put(2, 2);
      expect(lru.get(1)).toBe(1);
      lru.put(3, 3); // Evicts 2
      expect(lru.get(2)).toBe(-1);
      lru.put(4, 4); // Evicts 1
      expect(lru.get(1)).toBe(-1);
      expect(lru.get(3)).toBe(3);
      expect(lru.get(4)).toBe(4);
    });
  });

  describe('Trie', () => {
    test('should insert and search', () => {
      const trie = new Trie();
      trie.insert('apple');
      expect(trie.search('apple')).toBe(true);
      expect(trie.search('app')).toBe(false);
      expect(trie.startsWith('app')).toBe(true);
      trie.insert('app');
      expect(trie.search('app')).toBe(true);
    });
  });

  describe('MinStack', () => {
    test('should return min', () => {
      const minStack = new MinStack();
      minStack.push(-2);
      minStack.push(0);
      minStack.push(-3);
      expect(minStack.getMin()).toBe(-3);
      minStack.pop();
      expect(minStack.top()).toBe(0);
      expect(minStack.getMin()).toBe(-2);
    });
  });
});
