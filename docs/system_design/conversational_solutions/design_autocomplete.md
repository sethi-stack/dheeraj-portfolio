# Design Autocomplete (Typeahead)

## 1. Requirements

### Functional
- **Suggest**: As user types, show top 5 completions.
- **Rank**: Based on popularity/history.

### Non-Functional
- **Latency**: Extremely low (< 100ms).
- **Freshness**: Update trends hourly/daily.

---

## 2. Architecture

### Components
1.  **Trie Service**: In-memory data structure.
2.  **Assembler**: Aggregates logs to build the Trie.
3.  **API**: Returns suggestions.

---

## 3. Deep Dive

### Data Structure: Trie (Prefix Tree)
- Root -> 'a' -> 'p' -> 'p' -> 'l' -> 'e'.
- Each node stores top 5 most searched terms ending at or passing through this node.
- **Optimization**: Store top 5 at the node itself to avoid traversing down.

### Storage
- **In-Memory**: Redis or custom in-memory solution.
- **Persistence**: Serialize Trie to disk/DB periodically (Snapshot).

### Updating
- **Real-time**: Too expensive to update Trie on every search.
- **Batch**: Log searches -> MapReduce to aggregate frequencies -> Rebuild Trie every hour.
- **Sampling**: Only log 1% of searches.

### Client-Side Caching
- Cache results for "app" -> "apple", "app store".
- Browser TTL: 5-10 mins.
