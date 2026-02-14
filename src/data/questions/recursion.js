export const recursionQuestions = [
  {
    id: 1,
    title: "Fibonacci Number",
    difficulty: "Easy",
    description: "The Fibonacci numbers, commonly denoted F(n) form a sequence, called the Fibonacci sequence, such that each number is the sum of the two preceding ones, starting from 0 and 1. Given n, calculate F(n).",
    example: "Input: n = 4\nOutput: 3\nExplanation: F(4) = F(3) + F(2) = 2 + 1 = 3.",
    starterCode: `function fib(n) {
  // Write your code here
  
}`,
    testCases: [
      { input: [2], expected: 1 },
      { input: [3], expected: 2 },
      { input: [4], expected: 3 },
      { input: [5], expected: 5 }
    ]
  },
  {
    id: 2,
    title: "Climbing Stairs",
    difficulty: "Easy",
    description: "You are climbing a staircase. It takes n steps to reach the top. Each time you can either climb 1 or 2 steps. In how many distinct ways can you climb to the top?",
    example: "Input: n = 3\nOutput: 3\nExplanation: There are three ways: 1+1+1, 1+2, 2+1.",
    starterCode: `function climbStairs(n) {
  // Write your code here
  
}`,
    testCases: [
      { input: [2], expected: 2 },
      { input: [3], expected: 3 },
      { input: [4], expected: 5 },
      { input: [5], expected: 8 }
    ]
  },
  {
    id: 3,
    title: "Power of Two",
    difficulty: "Easy",
    description: "Given an integer n, return true if it is a power of two. Otherwise, return false. An integer n is a power of two, if there exists an integer x such that n == 2^x.",
    example: "Input: n = 16\nOutput: true\nExplanation: 2^4 = 16.",
    starterCode: `function isPowerOfTwo(n) {
  // Write your code here
  
}`,
    testCases: [
      { input: [1], expected: true },
      { input: [16], expected: true },
      { input: [3], expected: false },
      { input: [4], expected: true }
    ]
  },
  {
    id: 4,
    title: "Generate Parentheses",
    difficulty: "Medium",
    description: "Given n pairs of parentheses, write a function to generate all combinations of well-formed parentheses.",
    example: "Input: n = 3\nOutput: ['((()))','(()())','(())()','()(())','()()()']\nExplanation: All valid combinations of 3 pairs of parentheses.",
    starterCode: `function generateParenthesis(n) {
  // Write your code here
  
}`,
    testCases: [
      { input: [1], expected: ["()"] },
      { input: [2], expected: ["(())","()()"] },
      { input: [3], expected: ["((()))","(()())","(())()","()(())","()()()"] }
    ]
  },
  {
    id: 5,
    title: "Subsets",
    difficulty: "Medium",
    description: "Given an integer array nums of unique elements, return all possible subsets (the power set). The solution set must not contain duplicate subsets. Return the solution in any order.",
    example: "Input: nums = [1,2,3]\nOutput: [[],[1],[2],[1,2],[3],[1,3],[2,3],[1,2,3]]\nExplanation: All possible subsets of the array.",
    starterCode: `function subsets(nums) {
  // Write your code here
  
}`,
    testCases: [
      { input: [[1,2,3]], expected: [[],[1],[2],[1,2],[3],[1,3],[2,3],[1,2,3]] },
      { input: [[0]], expected: [[],[0]] },
      { input: [[1,2]], expected: [[],[1],[2],[1,2]] }
    ]
  },
  {
    id: 6,
    title: "Permutations",
    difficulty: "Medium",
    description: "Given an array nums of distinct integers, return all the possible permutations. You can return the answer in any order.",
    example: "Input: nums = [1,2,3]\nOutput: [[1,2,3],[1,3,2],[2,1,3],[2,3,1],[3,1,2],[3,2,1]]\nExplanation: All permutations of the array.",
    starterCode: `function permute(nums) {
  // Write your code here
  
}`,
    testCases: [
      { input: [[1,2,3]], expected: [[1,2,3],[1,3,2],[2,1,3],[2,3,1],[3,1,2],[3,2,1]] },
      { input: [[0,1]], expected: [[0,1],[1,0]] },
      { input: [[1]], expected: [[1]] }
    ]
  },
  {
    id: 7,
    title: "Combination Sum",
    difficulty: "Medium",
    description: "Given an array of distinct integers candidates and a target integer target, return a list of all unique combinations of candidates where the chosen numbers sum to target. You may return the combinations in any order. The same number may be chosen from candidates an unlimited number of times.",
    example: "Input: candidates = [2,3,6,7], target = 7\nOutput: [[2,2,3],[7]]\nExplanation: 2+2+3=7 and 7=7 are the only combinations.",
    starterCode: `function combinationSum(candidates, target) {
  // Write your code here
  
}`,
    testCases: [
      { input: [[2,3,6,7], 7], expected: [[2,2,3],[7]] },
      { input: [[2,3,5], 8], expected: [[2,2,2,2],[2,3,3],[3,5]] },
      { input: [[2], 1], expected: [] }
    ]
  },
  {
    id: 8,
    title: "Letter Combinations of a Phone Number",
    difficulty: "Medium",
    description: "Given a string containing digits from 2-9 inclusive, return all possible letter combinations that the number could represent. Return the answer in any order.",
    example: "Input: digits = '23'\nOutput: ['ad','ae','af','bd','be','bf','cd','ce','cf']\nExplanation: All letter combinations for digits 2 and 3.",
    starterCode: `function letterCombinations(digits) {
  // Write your code here
  
}`,
    testCases: [
      { input: ["23"], expected: ["ad","ae","af","bd","be","bf","cd","ce","cf"] },
      { input: [""], expected: [] },
      { input: ["2"], expected: ["a","b","c"] }
    ]
  },
  {
    id: 9,
    title: "Word Search",
    difficulty: "Medium",
    description: "Given an m x n grid of characters board and a string word, return true if word exists in the grid. The word can be constructed from letters of sequentially adjacent cells, where adjacent cells are horizontally or vertically neighboring.",
    example: "Input: board = [['A','B','C','E'],['S','F','C','S'],['A','D','E','E']], word = 'ABCCED'\nOutput: true\nExplanation: The word exists in the grid.",
    starterCode: `function exist(board, word) {
  // Write your code here
  
}`,
    testCases: [
      { input: [[["A","B","C","E"],["S","F","C","S"],["A","D","E","E"]], "ABCCED"], expected: true },
      { input: [[["A","B","C","E"],["S","F","C","S"],["A","D","E","E"]], "SEE"], expected: true },
      { input: [[["A","B","C","E"],["S","F","C","S"],["A","D","E","E"]], "ABCB"], expected: false }
    ]
  },
  {
    id: 10,
    title: "N-Queens",
    difficulty: "Hard",
    description: "The n-queens puzzle is the problem of placing n queens on an n x n chessboard such that no two queens attack each other. Given an integer n, return all distinct solutions to the n-queens puzzle.",
    example: "Input: n = 4\nOutput: [['.Q..','...Q','Q...','..Q.'],['..Q.','Q...','...Q','.Q..']]\nExplanation: Two distinct solutions to the 4-queens puzzle.",
    starterCode: `function solveNQueens(n) {
  // Write your code here
  
}`,
    testCases: [
      { input: [1], expected: [["Q"]] },
      { input: [4], expected: [[".Q..","...Q","Q...","..Q."],["..Q.","Q...","...Q",".Q.."]] }
    ]
  },
  {
    id: 11,
    title: "Sudoku Solver",
    difficulty: "Hard",
    description: "Write a program to solve a Sudoku puzzle by filling the empty cells. A sudoku solution must satisfy all of the following rules: Each of the digits 1-9 must occur exactly once in each row, column, and 3x3 sub-box.",
    example: "Input: board = [['5','3','.','.','7','.','.','.','.'],['6','.','.','1','9','5','.','.','.'],...]\nOutput: Solved board\nExplanation: The empty cells are filled to complete the Sudoku.",
    starterCode: `function solveSudoku(board) {
  // Write your code here
  
}`,
    testCases: [
      { input: [[["5","3",".",".","7",".",".",".","."],["6",".",".","1","9","5",".",".","."],[".","9","8",".",".",".",".","6","."],["8",".",".",".","6",".",".",".","3"],["4",".",".","8",".","3",".",".","1"],["7",".",".",".","2",".",".",".","6"],[".","6",".",".",".",".","2","8","."],[".",".",".","4","1","9",".",".","5"],[".",".",".",".","8",".",".","7","9"]]], expected: [["5","3","4","6","7","8","9","1","2"],["6","7","2","1","9","5","3","4","8"],["1","9","8","3","4","2","5","6","7"],["8","5","9","7","6","1","4","2","3"],["4","2","6","8","5","3","7","9","1"],["7","1","3","9","2","4","8","5","6"],["9","6","1","5","3","7","2","8","4"],["2","8","7","4","1","9","6","3","5"],["3","4","5","2","8","6","1","7","9"]] }
    ]
  },
  {
    id: 12,
    title: "Binary Tree Maximum Path Sum",
    difficulty: "Hard",
    description: "A path in a binary tree is a sequence of nodes where each pair of adjacent nodes in the sequence has an edge connecting them. A node can only appear in the sequence at most once. Given the root of a binary tree, return the maximum path sum of any non-empty path.",
    example: "Input: root = [1,2,3]\nOutput: 6\nExplanation: The optimal path is 2 -> 1 -> 3 with a path sum of 2 + 1 + 3 = 6.",
    starterCode: `function maxPathSum(root) {
  // Write your code here
  
}`,
    testCases: [
      { input: [[1,2,3]], expected: 6 },
      { input: [[-10,9,20,null,null,15,7]], expected: 42 }
    ]
  }
];
