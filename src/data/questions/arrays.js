export const arrayQuestions = [
  {
    id: 1,
    title: "Two Sum",
    difficulty: "Easy",
    description: "Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target. You may assume that each input would have exactly one solution, and you may not use the same element twice.",
    example: "Input: nums = [2,7,11,15], target = 9\nOutput: [0,1]\nExplanation: Because nums[0] + nums[1] == 9, we return [0, 1].",
    starterCode: `function twoSum(nums, target) {
  // Write your code here
  
}`,
    testCases: [
      { input: [[2, 7, 11, 15], 9], expected: [0, 1] },
      { input: [[3, 2, 4], 6], expected: [1, 2] },
      { input: [[3, 3], 6], expected: [0, 1] },
      { input: [[1, 5, 3, 7, 9], 12], expected: [2, 4] }
    ]
  },
  {
    id: 2,
    title: "Best Time to Buy and Sell Stock",
    difficulty: "Easy",
    description: "You are given an array prices where prices[i] is the price of a given stock on the ith day. You want to maximize your profit by choosing a single day to buy one stock and choosing a different day in the future to sell that stock. Return the maximum profit you can achieve from this transaction.",
    example: "Input: prices = [7,1,5,3,6,4]\nOutput: 5\nExplanation: Buy on day 2 (price = 1) and sell on day 5 (price = 6), profit = 6-1 = 5.",
    starterCode: `function maxProfit(prices) {
  // Write your code here
  
}`,
    testCases: [
      { input: [[7, 1, 5, 3, 6, 4]], expected: 5 },
      { input: [[7, 6, 4, 3, 1]], expected: 0 },
      { input: [[1, 2, 3, 4, 5]], expected: 4 },
      { input: [[2, 4, 1]], expected: 2 }
    ]
  },
  {
    id: 3,
    title: "Contains Duplicate",
    difficulty: "Easy",
    description: "Given an integer array nums, return true if any value appears at least twice in the array, and return false if every element is distinct.",
    example: "Input: nums = [1,2,3,1]\nOutput: true\nExplanation: The element 1 appears at index 0 and 3.",
    starterCode: `function containsDuplicate(nums) {
  // Write your code here
  
}`,
    testCases: [
      { input: [[1, 2, 3, 1]], expected: true },
      { input: [[1, 2, 3, 4]], expected: false },
      { input: [[1, 1, 1, 3, 3, 4, 3, 2, 4, 2]], expected: true },
      { input: [[1]], expected: false }
    ]
  },
  {
    id: 4,
    title: "Product of Array Except Self",
    difficulty: "Medium",
    description: "Given an integer array nums, return an array answer such that answer[i] is equal to the product of all the elements of nums except nums[i]. You must write an algorithm that runs in O(n) time and without using the division operation.",
    example: "Input: nums = [1,2,3,4]\nOutput: [24,12,8,6]\nExplanation: answer[0] = 2*3*4 = 24, answer[1] = 1*3*4 = 12, etc.",
    starterCode: `function productExceptSelf(nums) {
  // Write your code here
  
}`,
    testCases: [
      { input: [[1, 2, 3, 4]], expected: [24, 12, 8, 6] },
      { input: [[-1, 1, 0, -3, 3]], expected: [0, 0, 9, 0, 0] },
      { input: [[2, 3, 4, 5]], expected: [60, 40, 30, 24] }
    ]
  },
  {
    id: 5,
    title: "Maximum Subarray",
    difficulty: "Medium",
    description: "Given an integer array nums, find the subarray with the largest sum, and return its sum.",
    example: "Input: nums = [-2,1,-3,4,-1,2,1,-5,4]\nOutput: 6\nExplanation: The subarray [4,-1,2,1] has the largest sum 6.",
    starterCode: `function maxSubArray(nums) {
  // Write your code here
  
}`,
    testCases: [
      { input: [[-2, 1, -3, 4, -1, 2, 1, -5, 4]], expected: 6 },
      { input: [[1]], expected: 1 },
      { input: [[5, 4, -1, 7, 8]], expected: 23 },
      { input: [[-1, -2, -3, -4]], expected: -1 }
    ]
  },
  {
    id: 6,
    title: "3Sum",
    difficulty: "Medium",
    description: "Given an integer array nums, return all the triplets [nums[i], nums[j], nums[k]] such that i != j, i != k, and j != k, and nums[i] + nums[j] + nums[k] == 0. Notice that the solution set must not contain duplicate triplets.",
    example: "Input: nums = [-1,0,1,2,-1,-4]\nOutput: [[-1,-1,2],[-1,0,1]]\nExplanation: The distinct triplets are [-1,0,1] and [-1,-1,2].",
    starterCode: `function threeSum(nums) {
  // Write your code here
  
}`,
    testCases: [
      { input: [[-1, 0, 1, 2, -1, -4]], expected: [[-1, -1, 2], [-1, 0, 1]] },
      { input: [[0, 1, 1]], expected: [] },
      { input: [[0, 0, 0]], expected: [[0, 0, 0]] }
    ]
  },
  {
    id: 7,
    title: "Container With Most Water",
    difficulty: "Medium",
    description: "You are given an integer array height of length n. There are n vertical lines drawn such that the two endpoints of the ith line are (i, 0) and (i, height[i]). Find two lines that together with the x-axis form a container, such that the container contains the most water.",
    example: "Input: height = [1,8,6,2,5,4,8,3,7]\nOutput: 49\nExplanation: The vertical lines are at indices 1 and 8, forming a container with area = 7 * 7 = 49.",
    starterCode: `function maxArea(height) {
  // Write your code here
  
}`,
    testCases: [
      { input: [[1, 8, 6, 2, 5, 4, 8, 3, 7]], expected: 49 },
      { input: [[1, 1]], expected: 1 },
      { input: [[4, 3, 2, 1, 4]], expected: 16 }
    ]
  },
  {
    id: 8,
    title: "Find Minimum in Rotated Sorted Array",
    difficulty: "Medium",
    description: "Suppose an array of length n sorted in ascending order is rotated between 1 and n times. Given the sorted rotated array nums of unique elements, return the minimum element of this array.",
    example: "Input: nums = [3,4,5,1,2]\nOutput: 1\nExplanation: The original array was [1,2,3,4,5] rotated 3 times.",
    starterCode: `function findMin(nums) {
  // Write your code here
  
}`,
    testCases: [
      { input: [[3, 4, 5, 1, 2]], expected: 1 },
      { input: [[4, 5, 6, 7, 0, 1, 2]], expected: 0 },
      { input: [[11, 13, 15, 17]], expected: 11 }
    ]
  },
  {
    id: 9,
    title: "Search in Rotated Sorted Array",
    difficulty: "Medium",
    description: "There is an integer array nums sorted in ascending order (with distinct values). Prior to being passed to your function, nums is possibly rotated at an unknown pivot index. Given the array nums after the possible rotation and an integer target, return the index of target if it is in nums, or -1 if it is not in nums.",
    example: "Input: nums = [4,5,6,7,0,1,2], target = 0\nOutput: 4\nExplanation: 0 is at index 4.",
    starterCode: `function search(nums, target) {
  // Write your code here
  
}`,
    testCases: [
      { input: [[4, 5, 6, 7, 0, 1, 2], 0], expected: 4 },
      { input: [[4, 5, 6, 7, 0, 1, 2], 3], expected: -1 },
      { input: [[1], 0], expected: -1 }
    ]
  },
  {
    id: 10,
    title: "Merge Intervals",
    difficulty: "Medium",
    description: "Given an array of intervals where intervals[i] = [starti, endi], merge all overlapping intervals, and return an array of the non-overlapping intervals that cover all the intervals in the input.",
    example: "Input: intervals = [[1,3],[2,6],[8,10],[15,18]]\nOutput: [[1,6],[8,10],[15,18]]\nExplanation: Since intervals [1,3] and [2,6] overlap, merge them into [1,6].",
    starterCode: `function merge(intervals) {
  // Write your code here
  
}`
  },
  {
    id: 11,
    title: "Rotate Array",
    difficulty: "Medium",
    description: "Given an integer array nums, rotate the array to the right by k steps, where k is non-negative.",
    example: "Input: nums = [1,2,3,4,5,6,7], k = 3\nOutput: [5,6,7,1,2,3,4]\nExplanation: Rotate 1 step: [7,1,2,3,4,5,6], 2 steps: [6,7,1,2,3,4,5], 3 steps: [5,6,7,1,2,3,4]",
    starterCode: `function rotate(nums, k) {
  // Write your code here
  
}`
  },
  {
    id: 12,
    title: "Trapping Rain Water",
    difficulty: "Hard",
    description: "Given n non-negative integers representing an elevation map where the width of each bar is 1, compute how much water it can trap after raining.",
    example: "Input: height = [0,1,0,2,1,0,1,3,2,1,2,1]\nOutput: 6\nExplanation: The elevation map traps 6 units of rain water.",
    starterCode: `function trap(height) {
  // Write your code here
  
}`
  }
];
