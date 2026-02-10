export const recursionQuestions = [
  {
    id: 1,
    title: "Fibonacci Number",
    difficulty: "Easy",
    description: "The Fibonacci numbers, commonly denoted F(n) form a sequence, called the Fibonacci sequence, such that each number is the sum of the two preceding ones, starting from 0 and 1. Given n, calculate F(n).",
    example: "Input: n = 4\nOutput: 3\nExplanation: F(4) = F(3) + F(2) = 2 + 1 = 3.",
    starterCode: `function fib(n) {
  // Write your code here
  
}`
  },
  {
    id: 2,
    title: "Climbing Stairs",
    difficulty: "Easy",
    description: "You are climbing a staircase. It takes n steps to reach the top. Each time you can either climb 1 or 2 steps. In how many distinct ways can you climb to the top?",
    example: "Input: n = 3\nOutput: 3\nExplanation: There are three ways: 1+1+1, 1+2, 2+1.",
    starterCode: `function climbStairs(n) {
  // Write your code here
  
}`
  },
  {
    id: 3,
    title: "Power of Two",
    difficulty: "Easy",
    description: "Given an integer n, return true if it is a power of two. Otherwise, return false. An integer n is a power of two, if there exists an integer x such that n == 2^x.",
    example: "Input: n = 16\nOutput: true\nExplanation: 2^4 = 16.",
    starterCode: `function isPowerOfTwo(n) {
  // Write your code here
  
}`
  },
  {
    id: 4,
    title: "Generate Parentheses",
    difficulty: "Medium",
    description: "Given n pairs of parentheses, write a function to generate all combinations of well-formed parentheses.",
    example: "Input: n = 3\nOutput: ['((()))','(()())','(())()','()(())','()()()']\nExplanation: All valid combinations of 3 pairs of parentheses.",
    starterCode: `function generateParenthesis(n) {
  // Write your code here
  
}`
  },
  {
    id: 5,
    title: "Subsets",
    difficulty: "Medium",
    description: "Given an integer array nums of unique elements, return all possible subsets (the power set). The solution set must not contain duplicate subsets. Return the solution in any order.",
    example: "Input: nums = [1,2,3]\nOutput: [[],[1],[2],[1,2],[3],[1,3],[2,3],[1,2,3]]\nExplanation: All possible subsets of the array.",
    starterCode: `function subsets(nums) {
  // Write your code here
  
}`
  },
  {
    id: 6,
    title: "Permutations",
    difficulty: "Medium",
    description: "Given an array nums of distinct integers, return all the possible permutations. You can return the answer in any order.",
    example: "Input: nums = [1,2,3]\nOutput: [[1,2,3],[1,3,2],[2,1,3],[2,3,1],[3,1,2],[3,2,1]]\nExplanation: All permutations of the array.",
    starterCode: `function permute(nums) {
  // Write your code here
  
}`
  },
  {
    id: 7,
    title: "Combination Sum",
    difficulty: "Medium",
    description: "Given an array of distinct integers candidates and a target integer target, return a list of all unique combinations of candidates where the chosen numbers sum to target. You may return the combinations in any order. The same number may be chosen from candidates an unlimited number of times.",
    example: "Input: candidates = [2,3,6,7], target = 7\nOutput: [[2,2,3],[7]]\nExplanation: 2+2+3=7 and 7=7 are the only combinations.",
    starterCode: `function combinationSum(candidates, target) {
  // Write your code here
  
}`
  },
  {
    id: 8,
    title: "Letter Combinations of a Phone Number",
    difficulty: "Medium",
    description: "Given a string containing digits from 2-9 inclusive, return all possible letter combinations that the number could represent. Return the answer in any order.",
    example: "Input: digits = '23'\nOutput: ['ad','ae','af','bd','be','bf','cd','ce','cf']\nExplanation: All letter combinations for digits 2 and 3.",
    starterCode: `function letterCombinations(digits) {
  // Write your code here
  
}`
  },
  {
    id: 9,
    title: "Word Search",
    difficulty: "Medium",
    description: "Given an m x n grid of characters board and a string word, return true if word exists in the grid. The word can be constructed from letters of sequentially adjacent cells, where adjacent cells are horizontally or vertically neighboring.",
    example: "Input: board = [['A','B','C','E'],['S','F','C','S'],['A','D','E','E']], word = 'ABCCED'\nOutput: true\nExplanation: The word exists in the grid.",
    starterCode: `function exist(board, word) {
  // Write your code here
  
}`
  },
  {
    id: 10,
    title: "N-Queens",
    difficulty: "Hard",
    description: "The n-queens puzzle is the problem of placing n queens on an n x n chessboard such that no two queens attack each other. Given an integer n, return all distinct solutions to the n-queens puzzle.",
    example: "Input: n = 4\nOutput: [['.Q..','...Q','Q...','..Q.'],['..Q.','Q...','...Q','.Q..']]\nExplanation: Two distinct solutions to the 4-queens puzzle.",
    starterCode: `function solveNQueens(n) {
  // Write your code here
  
}`
  },
  {
    id: 11,
    title: "Sudoku Solver",
    difficulty: "Hard",
    description: "Write a program to solve a Sudoku puzzle by filling the empty cells. A sudoku solution must satisfy all of the following rules: Each of the digits 1-9 must occur exactly once in each row, column, and 3x3 sub-box.",
    example: "Input: board = [['5','3','.','.','7','.','.','.','.'],['6','.','.','1','9','5','.','.','.'],...]\nOutput: Solved board\nExplanation: The empty cells are filled to complete the Sudoku.",
    starterCode: `function solveSudoku(board) {
  // Write your code here
  
}`
  },
  {
    id: 12,
    title: "Binary Tree Maximum Path Sum",
    difficulty: "Hard",
    description: "A path in a binary tree is a sequence of nodes where each pair of adjacent nodes in the sequence has an edge connecting them. A node can only appear in the sequence at most once. Given the root of a binary tree, return the maximum path sum of any non-empty path.",
    example: "Input: root = [1,2,3]\nOutput: 6\nExplanation: The optimal path is 2 -> 1 -> 3 with a path sum of 2 + 1 + 3 = 6.",
    starterCode: `function maxPathSum(root) {
  // Write your code here
  
}`
  }
];
