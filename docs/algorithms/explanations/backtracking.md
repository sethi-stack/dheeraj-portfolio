# Backtracking

Backtracking is a technique for finding all (or some) solutions by exploring candidates and abandoning ("backtracking") those that fail to satisfy constraints.

**Pattern**: Build solution incrementally, backtrack when constraints violated.

---

## Problem 1: Letter Combinations of Phone Number

**Problem**: Given digit string, return all letter combinations (like T9 texting).

**Example**:
- Input: `"23"`
- Output: `["ad","ae","af","bd","be","bf","cd","ce","cf"]`

### Interview Strategy

1. **Recognize backtracking**: Generate all combinations
2. **Map digits to letters**: Pre-define mapping
3. **Base case**: When we've processed all digits

### Solution: Recursive Backtracking

```typescript
function letterCombinations(digits: string): string[] {
    if (!digits) return [];
    
    const phone: Record<string, string> = {
        '2': 'abc', '3': 'def', '4': 'ghi', '5': 'jkl',
        '6': 'mno', '7': 'pqrs', '8': 'tuv', '9': 'wxyz'
    };
    
    const result: string[] = [];
    
    function backtrack(index: number, current: string) {
        if (index === digits.length) {
            result.push(current);
            return;
        }
        
        const letters = phone[digits[index]];
        for (const letter of letters) {
            backtrack(index + 1, current + letter);
        }
    }
    
    backtrack(0, '');
    return result;
}
```

- **Time Complexity**: O(4^n × n) where n = digits length (worst case: 7 or 9 with 4 letters)
- **Space Complexity**: O(n) - recursion depth
- **When to use**: Need all combinations

### How to Articulate

**Opening**: "I'll use backtracking to build combinations. For each digit, I'll try all possible letters, recurse to the next digit, and collect complete combinations."

**Walkthrough** (`"23"`):
1. "Try 'a' (from 2), then all of3: ad, ae, af"
2. "Backtrack, try 'b' (from 2), then all of 3: bd, be, bf"
3. "Continue for 'c'"

---

## Problem 2: Generate Parentheses

**Problem**: Generate all valid combinations of `n` pairs of parentheses.

**Example**:
- Input: `n = 3`
- Output: `["((()))","(()())","(())()","()(())","()()()"]`

### Interview Strategy

1. **Constraint**: More closing than opening is invalid
2. **Track counts**: Open and close parentheses used
3. **Pruning**: Don't explore invalid paths

### Solution: Backtracking with Constraints

```typescript
function generateParenthesis(n: number): string[] {
    const result: string[] = [];
    
    function backtrack(current: string, open: number, close: number) {
        if (current.length === 2 * n) {
            result.push(current);
            return;
        }
        
        if (open < n) {
            backtrack(current + '(', open + 1, close);
        }
        if (close < open) {
            backtrack(current + ')', open, close + 1);
        }
    }
    
    backtrack('', 0, 0);
    return result;
}
```

- **Time Complexity**: O(4^n / √n) - Catalan number
- **Space Complexity**: O(n) - recursion depth
- **Optimization**: Only explore valid branches

### How to Articulate

**Opening**: "I'll backtrack while maintaining counts of open and close parentheses. I can add '(' if we haven't used all `n`, and ')' only if it wouldn't make the string invalid (more close than open)."

**Pruning**: "This avoids exploring invalid paths. For example, we never try ')))...' because close > open is immediately invalid."

---

## Problem 3: N-Queens

**Problem**: Place `n` queens on n×n chessboard so no two queens attack each other.

### Interview Strategy

1. **Recognize constraints**: No two queens in same row, column, or diagonal
2. **Place row by row**: One queen per row
3. **Track attacked positions**: Use sets for columns and diagonals

### Solution: Backtracking with Sets

```typescript
function solveNQueens(n: number): string[][] {
    const result: string[][] = [];
    const board: string[] = Array(n).fill('.'.repeat(n));
    const cols = new Set<number>();
    const diag1 = new Set<number>(); // row - col
    const diag2 = new Set<number>(); // row + col
    
    function backtrack(row: number) {
        if (row === n) {
            result.push([...board]);
            return;
        }
        
        for (let col = 0; col < n; col++) {
            if (cols.has(col) || diag1.has(row - col) || diag2.has(row + col)) {
                continue; // Position under attack
            }
            
            // Place queen
            board[row] = '.'.repeat(col) + 'Q' + '.'.repeat(n - col - 1);
            cols.add(col);
            diag1.add(row - col);
            diag2.add(row + col);
            
            backtrack(row + 1);
            
            // Remove queen (backtrack)
            cols.delete(col);
            diag1.delete(row - col);
            diag2.delete(row + col);
        }
    }
    
    backtrack(0);
    return result;
}
```

- **Time Complexity**: O(n!) - try n positions in first row, n-1 in second, etc.
- **Space Complexity**: O(n²) - board + sets
- **Optimization**: Sets for O(1) conflict checking

### How to Articulate

**Opening**: "I'll place queens row by row. For each row, try each column. Check if that position is safe (not attacked by previous queens in same column or diagonals). If safe, place queen and recurse to next row."

**Diagonal trick**: "For diagonals, I use `row - col` for one direction and `row + col` for the other. Cells on the same diagonal have the same sum/difference."

---

## Problem 4: Word Search

**Problem**: Given 2D board and word, check if word exists in grid (adjacent cells horizontally/vertically).

**Example**:
```
A B C E
S F C S
A D E E
```
Word: `"ABCCED"` → `true`

### Interview Strategy

1. **Try all starting positions**: DFS from each cell
2. **Mark visited**: Avoid reusing cells
3. **Backtrack**: Restore cell after exploring

### Solution: DFS with Backtracking

```typescript
function exist(board: string[][], word: string): boolean {
    const rows = board.length, cols = board[0].length;
    
    function dfs(r: number, c: number, index: number): boolean {
        if (index === word.length) return true;
        
        if (r < 0 || r >= rows || c < 0 || c >= cols ||
            board[r][c] !== word[index]) {
            return false;
        }
        
        const temp = board[r][c];
        board[r][c] = '#'; // Mark visited
        
        const found = dfs(r + 1, c, index + 1) ||
                      dfs(r - 1, c, index + 1) ||
                      dfs(r, c + 1, index + 1) ||
                      dfs(r, c - 1, index + 1);
        
        board[r][c] = temp; // Restore (backtrack)
        return found;
    }
    
    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
            if (dfs(r, c, 0)) return true;
        }
    }
    return false;
}
```

- **Time Complexity**: O(rows × cols × 4^L) where L = word length
- **Space Complexity**: O(L) - recursion depth
- **When to use**: Grid + path problems

### How to Articulate

**Opening**: "I'll try DFS from every cell as a potential starting point. For each path, I'll mark cells as visited by temporarily modifying the board, then restore them when backtracking."

**Optimization**: "Modifying the board in-place avoids needing a separate visited set."

---

## Problem 5: Decode String

**Problem**: Decode string where `k[encoded_string]` means repeat the encoded string `k` times.

**Example**:
- Input: `"3[a2[c]]"`
- Output: `"accaccacc"`

### Interview Strategy

1. **Recognize nesting**: Stack or recursion
2. **Parse carefully**: Numbers can be multi-digit
3. **Build inside-out**: Innermost brackets first

### Solution: Stack-Based

```typescript
function decodeString(s: string): string {
    const numStack: number[] = [];
    const strStack: string[] = [];
    let currentNum = 0;
    let currentStr = '';
    
    for (const char of s) {
        if (char >= '0' && char <= '9') {
            currentNum = currentNum * 10 + parseInt(char);
        } else if (char === '[') {
            numStack.push(currentNum);
            strStack.push(currentStr);
            currentNum = 0;
            currentStr = '';
        } else if (char === ']') {
            const repeatTimes = numStack.pop()!;
            const prevStr = strStack.pop()!;
            currentStr = prevStr + currentStr.repeat(repeatTimes);
        } else {
            currentStr += char;
        }
    }
    
    return currentStr;
}
```

- **Time Complexity**: O(maxK × n) where maxK = max repeat count
- **Space Complexity**: O(n) - stacks
- **When to use**: Nested structures with brackets

### How to Articulate

**Opening**: "I'll use two stacks - one for numbers and one for strings. When I hit '[', I save the current state. When I hit ']', I pop and apply the repetition."

**Example walkthrough** (`"3[a2[c]]"`):
1. "See 3, save it. See '[', push to stacks"
2. "See a. See 2, save it. See '[', push again"
3. "See c. See ']', pop: repeat c 2 times → cc"
4. "Now have 'a' + 'cc' = 'acc'. See ']', pop: repeat acc 3 times"

---

## Key Backtracking Patterns

| Problem Type | Technique | Key Constraint |
|--------------|-----------|----------------|
| **Combinations** | Try each option, recurse | Count/target sum |
| **Permutations** | Swap or use visited set | Use each element once |
| **Grid Search** | 4-directional DFS | Mark visited, restore |
| **Constraint Satisfaction** | Prune invalid branches | N-Queens, Sudoku |
| **String Building** | Build incrementally | Valid parentheses |

## Interview Tips

1. **Define base case**: When to stop recursing?
2. **Explore choices**: What options at each step?
3. **Prune early**: Skip invalid paths
4. **Backtrack properly**: Restore state after exploring
5. **Time complexity**: Often exponential - count branches
6. **Optimize with memoization**: If subproblems overlap (rare in pure backtracking)
