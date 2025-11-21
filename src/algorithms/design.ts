/**
 * Design & Data Structure Implementations
 * Advanced data structures with optimized operations
 */

// ============================================================================
// Problem 1: LRU Cache
// ============================================================================

// Approach: HashMap + Doubly Linked List
// - get(): O(1) time
// - put(): O(1) time
// - Space: O(capacity)

class DNode {
  key: number;
  val: number;
  prev: DNode | null = null;
  next: DNode | null = null;
  constructor(key: number, val: number) {
    this.key = key;
    this.val = val;
  }
}

export class LRUCache {
  private capacity: number;
  private map: Map<number, DNode>;
  private head: DNode;
  private tail: DNode;

  constructor(capacity: number) {
    this.capacity = capacity;
    this.map = new Map();
    this.head = new DNode(0, 0);
    this.tail = new DNode(0, 0);
    this.head.next = this.tail;
    this.tail.prev = this.head;
  }

  get(key: number): number {
    if (!this.map.has(key)) return -1;
    const node = this.map.get(key)!;
    this.remove(node);
    this.insert(node);
    return node.val;
  }

  put(key: number, value: number): void {
    if (this.map.has(key)) {
      this.remove(this.map.get(key)!);
    }
    const newNode = new DNode(key, value);
    this.map.set(key, newNode);
    this.insert(newNode);

    if (this.map.size > this.capacity) {
      const lru = this.tail.prev!;
      this.remove(lru);
      this.map.delete(lru.key);
    }
  }

  private remove(node: DNode) {
    node.prev!.next = node.next;
    node.next!.prev = node.prev;
  }

  private insert(node: DNode) {
    const headNext = this.head.next!;
    this.head.next = node;
    node.prev = this.head;
    node.next = headNext;
    headNext.prev = node;
  }
}

// ============================================================================
// Problem 2: Trie (Prefix Tree)
// ============================================================================

// Approach: Tree structure with character nodes
// - insert(word): O(m) time where m is word length
// - search(word): O(m) time
// - startsWith(prefix): O(m) time
// - Space: O(ALPHABET_SIZE × N × M) where N is number of words

class TrieNode {
  children: Map<string, TrieNode>;
  isEnd: boolean;
  constructor() {
    this.children = new Map();
    this.isEnd = false;
  }
}

export class Trie {
  private root: TrieNode;

  constructor() {
    this.root = new TrieNode();
  }

  insert(word: string): void {
    let node = this.root;
    for (const char of word) {
      if (!node.children.has(char)) {
        node.children.set(char, new TrieNode());
      }
      node = node.children.get(char)!;
    }
    node.isEnd = true;
  }

  search(word: string): boolean {
    let node = this.root;
    for (const char of word) {
      if (!node.children.has(char)) return false;
      node = node.children.get(char)!;
    }
    return node.isEnd;
  }

  startsWith(prefix: string): boolean {
    let node = this.root;
    for (const char of prefix) {
      if (!node.children.has(char)) return false;
      node = node.children.get(char)!;
    }
    return true;
  }
}

// ============================================================================
// Problem 3: Min Stack
// ============================================================================

// Approach: Two stacks (main + min tracking)
// - push(): O(1) time
// - pop(): O(1) time
// - top(): O(1) time
// - getMin(): O(1) time
// - Space: O(n)

export class MinStack {
  private stack: number[];
  private minStack: number[];

  constructor() {
    this.stack = [];
    this.minStack = [];
  }

  push(val: number): void {
    this.stack.push(val);
    if (this.minStack.length === 0 || val <= this.minStack[this.minStack.length - 1]) {
      this.minStack.push(val);
    }
  }

  pop(): void {
    const val = this.stack.pop();
    if (val === this.minStack[this.minStack.length - 1]) {
      this.minStack.pop();
    }
  }

  top(): number {
    return this.stack[this.stack.length - 1];
  }

  getMin(): number {
    return this.minStack[this.minStack.length - 1];
  }
}
