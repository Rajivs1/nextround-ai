export const stackQuestions = [
  {
    id: 1,
    title: "Implement Stack using Arrays",
    difficulty: "Easy",
    description: "Implement a stack data structure using arrays with push, pop, peek, and isEmpty operations.",
    example: "Input: push(1), push(2), pop(), peek()\nOutput: 2, 1\nExplanation: After pushing 1 and 2, pop returns 2, peek returns 1.",
    starterCode: `class Stack {
  constructor() {
    // Initialize your stack
  }
  
  push(val) {
    // Add element to stack
  }
  
  pop() {
    // Remove and return top element
  }
  
  peek() {
    // Return top element without removing
  }
  
  isEmpty() {
    // Check if stack is empty
  }
}`,
    testCases: [
      { input: [["push",1,"push",2,"pop","peek"]], expected: [undefined,undefined,2,1] },
      { input: [["push",5,"isEmpty","pop","isEmpty"]], expected: [undefined,false,5,true] }
    ]
  },
  {
    id: 2,
    title: "Min Stack",
    difficulty: "Medium",
    description: "Design a stack that supports push, pop, top, and retrieving the minimum element in constant time.",
    example: "Input: push(-2), push(0), push(-3), getMin(), pop(), top(), getMin()\nOutput: -3, 0, -2\nExplanation: getMin() returns -3, after pop top is 0, getMin is -2.",
    starterCode: `class MinStack {
  constructor() {
    // Initialize your data structure
  }
  
  push(val) {
    // Push element
  }
  
  pop() {
    // Remove top element
  }
  
  top() {
    // Get top element
  }
  
  getMin() {
    // Retrieve minimum element
  }
}`,
    testCases: [
      { input: [["push",-2,"push",0,"push",-3,"getMin","pop","top","getMin"]], expected: [undefined,undefined,undefined,-3,undefined,0,-2] }
    ]
  },
  {
    id: 3,
    title: "Valid Parentheses",
    difficulty: "Easy",
    description: "Given a string containing just the characters '(', ')', '{', '}', '[' and ']', determine if the input string is valid using a stack.",
    example: "Input: s = '([]){}'\nOutput: true\nExplanation: All brackets are properly matched and closed.",
    starterCode: `function isValid(s) {
  // Write your code here
  
}`,
    testCases: [
      { input: ["()"], expected: true },
      { input: ["()[]{}"], expected: true },
      { input: ["(]"], expected: false },
      { input: ["([)]"], expected: false }
    ]
  },
  {
    id: 4,
    title: "Evaluate Reverse Polish Notation",
    difficulty: "Medium",
    description: "You are given an array of strings tokens that represents an arithmetic expression in Reverse Polish Notation. Evaluate the expression and return an integer that represents the value of the expression.",
    example: "Input: tokens = ['2','1','+','3','*']\nOutput: 9\nExplanation: ((2 + 1) * 3) = 9",
    starterCode: `function evalRPN(tokens) {
  // Write your code here
  
}`,
    testCases: [
      { input: [["2","1","+","3","*"]], expected: 9 },
      { input: [["4","13","5","/","+"]], expected: 6 },
      { input: [["10","6","9","3","+","-11","*","/","*","17","+","5","+"]], expected: 22 }
    ]
  },
  {
    id: 5,
    title: "Daily Temperatures",
    difficulty: "Medium",
    description: "Given an array of integers temperatures represents the daily temperatures, return an array answer such that answer[i] is the number of days you have to wait after the ith day to get a warmer temperature.",
    example: "Input: temperatures = [73,74,75,71,69,72,76,73]\nOutput: [1,1,4,2,1,1,0,0]\nExplanation: For 73, next warmer is 74 (1 day away).",
    starterCode: `function dailyTemperatures(temperatures) {
  // Write your code here
  
}`,
    testCases: [
      { input: [[73,74,75,71,69,72,76,73]], expected: [1,1,4,2,1,1,0,0] },
      { input: [[30,40,50,60]], expected: [1,1,1,0] },
      { input: [[30,60,90]], expected: [1,1,0] }
    ]
  },
  {
    id: 6,
    title: "Next Greater Element I",
    difficulty: "Easy",
    description: "The next greater element of some element x in an array is the first greater element that is to the right of x in the same array. You are given two distinct 0-indexed integer arrays nums1 and nums2, where nums1 is a subset of nums2.",
    example: "Input: nums1 = [4,1,2], nums2 = [1,3,4,2]\nOutput: [-1,3,-1]\nExplanation: For 4, no greater element. For 1, next greater is 3. For 2, no greater element.",
    starterCode: `function nextGreaterElement(nums1, nums2) {
  // Write your code here
  
}`,
    testCases: [
      { input: [[4,1,2], [1,3,4,2]], expected: [-1,3,-1] },
      { input: [[2,4], [1,2,3,4]], expected: [3,-1] }
    ]
  },
  {
    id: 7,
    title: "Largest Rectangle in Histogram",
    difficulty: "Hard",
    description: "Given an array of integers heights representing the histogram's bar height where the width of each bar is 1, return the area of the largest rectangle in the histogram.",
    example: "Input: heights = [2,1,5,6,2,3]\nOutput: 10\nExplanation: The largest rectangle has area = 10 (bars at index 2 and 3).",
    starterCode: `function largestRectangleArea(heights) {
  // Write your code here
  
}`,
    testCases: [
      { input: [[2,1,5,6,2,3]], expected: 10 },
      { input: [[2,4]], expected: 4 },
      { input: [[1,1]], expected: 2 }
    ]
  },
  {
    id: 8,
    title: "Simplify Path",
    difficulty: "Medium",
    description: "Given a string path, which is an absolute path (starting with a slash '/') to a file or directory in a Unix-style file system, convert it to the simplified canonical path.",
    example: "Input: path = '/home//foo/'\nOutput: '/home/foo'\nExplanation: Multiple slashes are replaced by a single one.",
    starterCode: `function simplifyPath(path) {
  // Write your code here
  
}`,
    testCases: [
      { input: ["/home/"], expected: "/home" },
      { input: ["/../"], expected: "/" },
      { input: ["/home//foo/"], expected: "/home/foo" }
    ]
  },
  {
    id: 9,
    title: "Remove All Adjacent Duplicates In String",
    difficulty: "Easy",
    description: "You are given a string s consisting of lowercase English letters. A duplicate removal consists of choosing two adjacent and equal letters and removing them. We repeatedly make duplicate removals on s until we no longer can.",
    example: "Input: s = 'abbaca'\nOutput: 'ca'\nExplanation: Remove 'bb', then 'aa', leaving 'ca'.",
    starterCode: `function removeDuplicates(s) {
  // Write your code here
  
}`,
    testCases: [
      { input: ["abbaca"], expected: "ca" },
      { input: ["azxxzy"], expected: "ay" },
      { input: ["aabbcc"], expected: "" }
    ]
  },
  {
    id: 10,
    title: "Decode String",
    difficulty: "Medium",
    description: "Given an encoded string, return its decoded string using a stack. The encoding rule is: k[encoded_string], where the encoded_string inside the square brackets is being repeated exactly k times.",
    example: "Input: s = '3[a2[c]]'\nOutput: 'accaccacc'\nExplanation: 'c' repeated 2 times is 'cc', then repeated 3 times.",
    starterCode: `function decodeString(s) {
  // Write your code here
  
}`,
    testCases: [
      { input: ["3[a]2[bc]"], expected: "aaabcbc" },
      { input: ["3[a2[c]]"], expected: "accaccacc" },
      { input: ["2[abc]3[cd]ef"], expected: "abcabccdcdcdef" }
    ]
  },
  {
    id: 11,
    title: "Asteroid Collision",
    difficulty: "Medium",
    description: "We are given an array asteroids of integers representing asteroids in a row. For each asteroid, the absolute value represents its size, and the sign represents its direction (positive meaning right, negative meaning left). Find out the state of the asteroids after all collisions.",
    example: "Input: asteroids = [5,10,-5]\nOutput: [5,10]\nExplanation: The 10 and -5 collide resulting in 10. The 5 and 10 never collide.",
    starterCode: `function asteroidCollision(asteroids) {
  // Write your code here
  
}`,
    testCases: [
      { input: [[5,10,-5]], expected: [5,10] },
      { input: [[8,-8]], expected: [] },
      { input: [[10,2,-5]], expected: [10] },
      { input: [[-2,-1,1,2]], expected: [-2,-1,1,2] }
    ]
  },
  {
    id: 12,
    title: "Basic Calculator II",
    difficulty: "Medium",
    description: "Given a string s which represents an expression, evaluate this expression and return its value. The integer division should truncate toward zero.",
    example: "Input: s = '3+2*2'\nOutput: 7\nExplanation: Multiplication has higher precedence, so 2*2=4, then 3+4=7.",
    starterCode: `function calculate(s) {
  // Write your code here
  
}`,
    testCases: [
      { input: ["3+2*2"], expected: 7 },
      { input: [" 3/2 "], expected: 1 },
      { input: [" 3+5 / 2 "], expected: 5 }
    ]
  }
];
