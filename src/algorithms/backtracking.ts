/**
 * Backtracking Algorithms
 */

// --- Letter Combinations of a Phone Number ---

export function letterCombinations(digits: string): string[] {
  if (!digits) return [];
  const map: { [key: string]: string } = {
    '2': 'abc',
    '3': 'def',
    '4': 'ghi',
    '5': 'jkl',
    '6': 'mno',
    '7': 'pqrs',
    '8': 'tuv',
    '9': 'wxyz',
  };
  const result: string[] = [];

  function backtrack(index: number, current: string) {
    if (index === digits.length) {
      result.push(current);
      return;
    }
    const letters = map[digits[index]];
    for (const char of letters) {
      backtrack(index + 1, current + char);
    }
  }

  backtrack(0, '');
  return result;
}

// --- Generate Parentheses ---

export function generateParenthesis(n: number): string[] {
  const result: string[] = [];

  function backtrack(open: number, close: number, current: string) {
    if (current.length === n * 2) {
      result.push(current);
      return;
    }
    if (open < n) {
      backtrack(open + 1, close, current + '(');
    }
    if (close < open) {
      backtrack(open, close + 1, current + ')');
    }
  }

  backtrack(0, 0, '');
  return result;
}

// --- N-Queens ---

export function solveNQueens(n: number): string[][] {
  const result: string[][] = [];
  const board: string[][] = Array(n)
    .fill(null)
    .map(() => Array(n).fill('.'));
  const cols = new Set<number>();
  const posDiag = new Set<number>(); // r + c
  const negDiag = new Set<number>(); // r - c

  function backtrack(r: number) {
    if (r === n) {
      result.push(board.map((row) => row.join('')));
      return;
    }

    for (let c = 0; c < n; c++) {
      if (cols.has(c) || posDiag.has(r + c) || negDiag.has(r - c)) continue;

      cols.add(c);
      posDiag.add(r + c);
      negDiag.add(r - c);
      board[r][c] = 'Q';

      backtrack(r + 1);

      cols.delete(c);
      posDiag.delete(r + c);
      negDiag.delete(r - c);
      board[r][c] = '.';
    }
  }

  backtrack(0);
  return result;
}

// --- Word Search ---

export function exist(board: string[][], word: string): boolean {
  const rows = board.length;
  const cols = board[0].length;

  function dfs(r: number, c: number, i: number): boolean {
    if (i === word.length) return true;
    if (r < 0 || c < 0 || r >= rows || c >= cols || board[r][c] !== word[i]) return false;

    const temp = board[r][c];
    board[r][c] = '#'; // Mark visited

    const res =
      dfs(r + 1, c, i + 1) ||
      dfs(r - 1, c, i + 1) ||
      dfs(r, c + 1, i + 1) ||
      dfs(r, c - 1, i + 1);

    board[r][c] = temp; // Backtrack
    return res;
  }

  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      if (dfs(r, c, 0)) return true;
    }
  }
  return false;
}

// --- Decode String ---

export function decodeString(s: string): string {
  const countStack: number[] = [];
  const stringStack: string[] = [];
  let currentString = '';
  let k = 0;

  for (const char of s) {
    if (!isNaN(Number(char))) {
      k = k * 10 + Number(char);
    } else if (char === '[') {
      countStack.push(k);
      stringStack.push(currentString);
      currentString = '';
      k = 0;
    } else if (char === ']') {
      const count = countStack.pop()!;
      const prevString = stringStack.pop()!;
      currentString = prevString + currentString.repeat(count);
    } else {
      currentString += char;
    }
  }
  return currentString;
}
