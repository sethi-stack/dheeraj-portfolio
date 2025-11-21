# Design Data Structures

These problems test your ability to combine data structures to achieve specific time complexities.

## 1. LRU Cache (Least Recently Used)
- **Requirement**: `get` and `put` in O(1).
- **Solution**: Hash Map + Doubly Linked List.
    - **Map**: `Key -> Node`.
    - **List**: Maintains order. Most recent at head, least recent at tail.
    - **Eviction**: Remove tail node.

## 2. Trie (Prefix Tree)
- **Requirement**: Efficient string search and prefix matching.
- **Structure**: Tree where each node represents a character.
- **Use Case**: Autocomplete, Spell Checker.

## 3. Min Stack
- **Requirement**: `push`, `pop`, `top`, and `getMin` in O(1).
- **Solution**: Use two stacks.
    - **Main Stack**: Stores values.
    - **Min Stack**: Stores minimum value seen so far.
