# Backtracking

Backtracking is an algorithmic-technique for solving problems recursively by trying to build a solution incrementally, one piece at a time, removing those solutions that fail to satisfy the constraints of the problem at any point of time.

## Pattern
```typescript
function backtrack(candidate) {
    if (find_solution(candidate)) {
        output(candidate);
        return;
    }
    for (next_candidate in list_of_candidates) {
        if (is_valid(next_candidate)) {
            place(next_candidate);
            backtrack(next_candidate);
            remove(next_candidate); // Backtrack
        }
    }
}
```

## Examples

### 1. N-Queens
Place N queens on an NxN chessboard such that no two queens attack each other.
- **Constraint**: No two queens share the same row, column, or diagonal.

### 2. Generate Parentheses
Generate all combinations of well-formed parentheses.
- **Constraint**: `close < open` and `open < n`.

### 3. Word Search
Find if a word exists in a grid.
- **Constraint**: Can move horizontally or vertically. Cannot reuse cells.
