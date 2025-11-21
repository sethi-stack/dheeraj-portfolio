/**
 * Graph Algorithms
 * Each problem includes multiple solution approaches
 */

// ============================================================================
// Problem 1: Number of Islands
// ============================================================================

// Approach 1: DFS (Modify Grid) - O(rows × cols) time, O(rows × cols) space
export function numIslands(grid: string[][]): number {
  if (!grid || grid.length === 0) return 0;

  const rows = grid.length;
  const cols = grid[0].length;
  let count = 0;

  function dfs(r: number, c: number) {
    if (r < 0 || r >= rows || c < 0 || c >= cols || grid[r][c] === '0') {
      return;
    }
    grid[r][c] = '0'; // Mark as visited
    dfs(r + 1, c);
    dfs(r - 1, c);
    dfs(r, c + 1);
    dfs(r, c - 1);
  }

  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      if (grid[r][c] === '1') {
        count++;
        dfs(r, c); // Sink entire island
      }
    }
  }

  return count;
}

// Approach 2: BFS (Preserve Grid) - O(rows × cols) time, O(rows × cols) space
export function numIslandsBFS(grid: string[][]): number {
  if (!grid.length) return 0;

  const rows = grid.length;
  const cols = grid[0].length;
  const visited = new Set<string>();
  let count = 0;

  const directions = [
    [0, 1],
    [0, -1],
    [1, 0],
    [-1, 0],
  ];

  function bfs(r: number, c: number) {
    const queue: [number, number][] = [[r, c]];
    visited.add(`${r},${c}`);

    while (queue.length > 0) {
      const [row, col] = queue.shift()!;

      for (const [dr, dc] of directions) {
        const nr = row + dr;
        const nc = col + dc;
        const key = `${nr},${nc}`;

        if (
          nr >= 0 &&
          nr < rows &&
          nc >= 0 &&
          nc < cols &&
          grid[nr][nc] === '1' &&
          !visited.has(key)
        ) {
          visited.add(key);
          queue.push([nr, nc]);
        }
      }
    }
  }

  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      if (grid[r][c] === '1' && !visited.has(`${r},${c}`)) {
        count++;
        bfs(r, c);
      }
    }
  }
  return count;
}

// ============================================================================
// Problem 2: Course Schedule (Cycle Detection)
// ============================================================================

// Approach 1: DFS with States - O(V + E) time, O(V + E) space
export function canFinishDFS(
  numCourses: number,
  prerequisites: number[][]
): boolean {
  const graph = new Map<number, number[]>();

  // Build adjacency list
  for (let i = 0; i < numCourses; i++) {
    graph.set(i, []);
  }
  for (const [course, prereq] of prerequisites) {
    graph.get(course)!.push(prereq);
  }

  const UNVISITED = 0;
  const VISITING = 1;
  const VISITED = 2;
  const state = new Array(numCourses).fill(UNVISITED);

  function hasCycle(course: number): boolean {
    if (state[course] === VISITING) return true; // Cycle!
    if (state[course] === VISITED) return false; // Already checked

    state[course] = VISITING;
    for (const prereq of graph.get(course)!) {
      if (hasCycle(prereq)) return true;
    }
    state[course] = VISITED;
    return false;
  }

  for (let i = 0; i < numCourses; i++) {
    if (hasCycle(i)) return false;
  }
  return true;
}

// Approach 2: Topological Sort (Kahn's Algorithm) - O(V + E) time, O(V + E) space
export function canFinish(
  numCourses: number,
  prerequisites: number[][]
): boolean {
  const inDegree = new Array(numCourses).fill(0);
  const graph = new Map<number, number[]>();

  for (let i = 0; i < numCourses; i++) {
    graph.set(i, []);
  }

  for (const [course, prereq] of prerequisites) {
    graph.get(prereq)!.push(course);
    inDegree[course]++;
  }

  const queue: number[] = [];
  for (let i = 0; i < numCourses; i++) {
    if (inDegree[i] === 0) queue.push(i);
  }

  let completed = 0;
  while (queue.length > 0) {
    const course = queue.shift()!;
    completed++;

    for (const next of graph.get(course)!) {
      inDegree[next]--;
      if (inDegree[next] === 0) {
        queue.push(next);
      }
    }
  }

  return completed === numCourses;
}

// ============================================================================
// Problem 3: Clone Graph
// ============================================================================

export class Node {
  val: number;
  neighbors: Node[];
  constructor(val?: number, neighbors?: Node[]) {
    this.val = val === undefined ? 0 : val;
    this.neighbors = neighbors === undefined ? [] : neighbors;
  }
}

// Approach: DFS with Hash Map - O(V + E) time, O(V) space
export function cloneGraph(node: Node | null): Node | null {
  if (!node) return null;

  const clones = new Map<Node, Node>();

  function dfs(original: Node): Node {
    if (clones.has(original)) {
      return clones.get(original)!;
    }

    const clone = new Node(original.val);
    clones.set(original, clone); // Save before recursing!

    for (const neighbor of original.neighbors) {
      clone.neighbors.push(dfs(neighbor));
    }

    return clone;
  }

  return dfs(node);
}

// ============================================================================
// Problem 4: Word Ladder
// ============================================================================

// Approach: BFS - O(M² × N) time, O(N) space
// where M = word length, N = wordList size
export function ladderLength(
  beginWord: string,
  endWord: string,
  wordList: string[]
): number {
  const wordSet = new Set(wordList);
  if (!wordSet.has(endWord)) return 0;

  const queue: [string, number][] = [[beginWord, 1]];
  const visited = new Set<string>([beginWord]);

  while (queue.length > 0) {
    const [word, level] = queue.shift()!;

    if (word === endWord) return level;

    // Try changing each position
    for (let i = 0; i < word.length; i++) {
      for (let c = 97; c <= 122; c++) {
        // 'a' to 'z'
        const newWord =
          word.slice(0, i) + String.fromCharCode(c) + word.slice(i + 1);

        if (wordSet.has(newWord) && !visited.has(newWord)) {
          visited.add(newWord);
          queue.push([newWord, level + 1]);
        }
      }
    }
  }
  return 0;
}
