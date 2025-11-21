# Design Data Structures

These problems require designing custom data structures that support specific operations efficiently.

---

## Problem 1: LRU Cache

**Problem**: Design a cache that evicts the Least Recently Used item when capacity is reached.

**Operations**:
- `get(key)`: Return value if exists, -1 otherwise (marks as recently used)
- `put(key, value)`: Add/update key-value (marks as recently used, evicts LRU if full)

### Interview Strategy

1. **Requirements**: Both operations must be O(1)
2. **Data structures**: Hash map for O(1) lookup, doubly linked list for O(1) removal/insertion
3. **Edge cases**: Capacity 1, updating existing keys

### Solution 1: Hash Map + Array (Incorrect - Not O(1))

```typescript
class LRUCacheSimple {
    private capacity: number;
    private cache: Map<number, number>;
    private order: number[]; // Track usage order
    
    constructor(capacity: number) {
        this.capacity = capacity;
        this.cache = new Map();
        this.order = [];
    }
    
    get(key: number): number {
        if (!this.cache.has(key)) return -1;
        
        // Move to end (most recent)
        const index = this.order.indexOf(key);
        this.order.splice(index, 1); // O(n) - WRONG!
        this.order.push(key);
        
        return this.cache.get(key)!;
    }
    
    put(key: number, value: number): void {
        // ... similar issue with splice
    }
}
```

- **Issue**: `splice()` and `indexOf()` are O(n)
- **Why shown**: Common mistake in interviews

### Solution 2: Hash Map + Doubly Linked List (Correct)

```typescript
class ListNode {
    key: number;
    value: number;
    prev: ListNode | null = null;
    next: ListNode | null = null;
    
    constructor(key: number, value: number) {
        this.key = key;
        this.value = value;
    }
}

class LRUCache {
    private capacity: number;
    private cache: Map<number, ListNode>;
    private head: ListNode; // Dummy head
    private tail: ListNode; // Dummy tail
    
    constructor(capacity: number) {
        this.capacity = capacity;
        this.cache = new Map();
        this.head = new ListNode(0, 0);
        this.tail = new ListNode(0, 0);
        this.head.next = this.tail;
        this.tail.prev = this.head;
    }
    
    private removeNode(node: ListNode): void {
        node.prev!.next = node.next;
        node.next!.prev = node.prev;
    }
    
    private addToHead(node: ListNode): void {
        node.next = this.head.next;
        node.prev = this.head;
        this.head.next!.prev = node;
        this.head.next = node;
    }
    
    get(key: number): number {
        if (!this.cache.has(key)) return -1;
        
        const node = this.cache.get(key)!;
        this.removeNode(node);
        this.addToHead(node); // Mark as recently used
        return node.value;
    }
    
    put(key: number, value: number): void {
        if (this.cache.has(key)) {
            const node = this.cache.get(key)!;
            node.value = value;
            this.removeNode(node);
            this.addToHead(node);
        } else {
            const newNode = new ListNode(key, value);
            this.cache.set(key, newNode);
            this.addToHead(newNode);
            
            if (this.cache.size > this.capacity) {
                const lru = this.tail.prev!;
                this.removeNode(lru);
                this.cache.delete(lru.key);
            }
        }
    }
}
```

- **Time Complexity**: O(1) for both get and put
- **Space Complexity**: O(capacity)
- **Key insight**: Doubly linked list enables O(1) removal from middle

### How to Articulate

**Opening**: "I need O(1) for both operations. Hash map gives O(1) lookup, but we also need to track order. A doubly linked list allows O(1) removal and insertion. I'll use dummy head/tail to simplify edge cases."

**Operations**:
- "Get: Look up in map, move node to head (most recent)"
- "Put: If exists, update and move to head. If new and at capacity, remove tail (LRU) first"

**Why doubly linked**: "Singly linked list doesn't work because we need to update the previous node when removing."

---

## Problem 2: Implement Trie (Prefix Tree)

**Problem**: Implement data structure for efficient string storage and prefix searching.

**Operations**:
- `insert(word)`: Add word
- `search(word)`: Return if word exists
- `startsWith(prefix)`: Return if any word starts with prefix

### Interview Strategy

1. **Tree structure**: Each node has children (26 in English alphabet)
2. **Mark end of word**: Not all paths are complete words
3. **Optimization**: Use hash map for children if alphabet is large

### Solution: Trie with Array Children

```typescript
class TrieNode {
    children: (TrieNode | null)[];
    isEndOfWord: boolean;
    
    constructor() {
        this.children = Array(26).fill(null);
        this.isEndOfWord = false;
    }
}

class Trie {
    private root: TrieNode;
    
    constructor() {
        this.root = new TrieNode();
    }
    
    private charToIndex(char: string): number {
        return char.charCodeAt(0) - 'a'.charCodeAt(0);
    }
    
    insert(word: string): void {
        let node = this.root;
        for (const char of word) {
            const index = this.charToIndex(char);
            if (!node.children[index]) {
                node.children[index] = new TrieNode();
            }
            node = node.children[index]!;
        }
        node.isEndOfWord = true;
    }
    
    search(word: string): boolean {
        let node = this.root;
        for (const char of word) {
            const index = this.charToIndex(char);
            if (!node.children[index]) {
                return false;
            }
            node = node.children[index]!;
        }
        return node.isEndOfWord;
    }
    
    startsWith(prefix: string): boolean {
        let node = this.root;
        for (const char of prefix) {
            const index = this.charToIndex(char);
            if (!node.children[index]) {
                return false;
            }
            node = node.children[index]!;
        }
        return true; // Don't need isEndOfWord check
    }
}
```

- **Time Complexity**: O(m) for all operations where m = word/prefix length
- **Space Complexity**: O(total characters in all words × 26)
- **When to use**: Autocomplete, spell check, IP routing

### How to Articulate

**Opening**: "A Trie is a tree where each node represents a character. Each node has up to 26 children (for English). Words share common prefixes, making it efficient for prefix operations."

**Example** (insert "cat" and "car"):
```
    root
     |
     c
     |
     a
    / \
   t   r
   *   *  (* = isEndOfWord)
```

**Why better than hash set**: "For prefix search, I'd need to check all words in a hash set. Trie finds all words with prefix in O(prefix length + results) time."

---

## Problem 3: Min Stack

**Problem**: Design stack supporting push, pop, top, and getMin in O(1).

### Interview Strategy

1. **Challenge**: Maintaining min while popping
2. **Approaches**: Two stacks or single stack with pairs
3. **Space tradeoff**: Constant extra vs proportional to size

### Solution 1: Two Stacks

```typescript
class MinStack {
    private stack: number[];
    private minStack: number[];
    
    constructor() {
        this.stack = [];
        this.minStack = [];
    }
    
    push(val: number): void {
        this.stack.push(val);
        const currentMin = this.minStack.length === 0 ? val : this.minStack[this.minStack.length - 1];
        this.minStack.push(Math.min(val, currentMin));
    }
    
    pop(): void {
        this.stack.pop();
        this.minStack.pop();
    }
    
    top(): number {
        return this.stack[this.stack.length - 1];
    }
    
    getMin(): number {
        return this.minStack[this.minStack.length - 1];
    }
}
```

- **Time Complexity**: O(1) for all operations
- **Space Complexity**: O(n) - two stacks
- **When to use**: Clean, easy to understand

### Solution 2: Single Stack with Pairs (Space Optimized)

```typescript
class MinStackOptimized {
    private stack: [number, number][]; // [value, minAtThisLevel]
    
    constructor() {
        this.stack = [];
    }
    
    push(val: number): void {
        const currentMin = this.stack.length === 0 ? val : this.stack[this.stack.length - 1][1];
        this.stack.push([val, Math.min(val, currentMin)]);
    }
    
    pop(): void {
        this.stack.pop();
    }
    
    top(): number {
        return this.stack[this.stack.length - 1][0];
    }
    
    getMin(): number {
        return this.stack[this.stack.length - 1][1];
    }
}
```

- **Space Complexity**: Still O(n) but uses one stack
- **Optimization**: Can further optimize by only storing min when it changes

### How to Articulate

**Opening**: "I'll maintain a second 'min stack' that tracks the minimum value at each level. When I push a new value, I push both the value and the current minimum."

**Example** (push 3, 1, 4, 2):
```
stack:    [3, 1, 4, 2]
minStack: [3, 1, 1, 1]
```

**Why it works**: "When I pop, the minimum for the previous state is now at the top of minStack. Both stacks stay synchronized."

---

## Key Design Patterns

| Problem | Data Structures | Key Insight |
|---------|----------------|-------------|
| **LRU Cache** | Hash Map + Doubly Linked List | Need O(1) removal from middle |
| **Trie** | Tree with 26-way children | Share common prefixes |
| **Min Stack** | Two stacks or stack of pairs | Track auxiliary info per level |
| **Max Heap** | Array-based binary heap | Parent > children, root is max |
| **Disjoint Set (Union-Find)** | Array with path compression | Quick connectivity checks |

## Interview Tips

1. **Clarify requirements**: What operations? Time constraints?
2. **Start with simple solution**: Then optimize
3. **Draw diagrams**: Visual helps for complex structures
4. **Discuss trade-offs**: Time vs Space, simplicity vs optimization
5. **Handle edge cases**: Empty structure, capacity limits
6. **Test with examples**: Walk through a few operations
