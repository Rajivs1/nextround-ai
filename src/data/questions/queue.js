export const queueQuestions = [
  {
    id: 1,
    title: "Implement Queue using Stacks",
    difficulty: "Easy",
    description: "Implement a first in first out (FIFO) queue using only two stacks. The implemented queue should support all the functions of a normal queue (push, peek, pop, and empty).",
    example: "Input: push(1), push(2), peek(), pop(), empty()\nOutput: 1, 1, false\nExplanation: After pushing 1 and 2, peek returns 1, pop returns 1, queue is not empty.",
    starterCode: `class MyQueue {
  constructor() {
    // Initialize your data structure
  }
  
  push(x) {
    // Push element to the back of queue
  }
  
  pop() {
    // Remove element from front of queue
  }
  
  peek() {
    // Get the front element
  }
  
  empty() {
    // Check if queue is empty
  }
}`,
    testCases: [
      { input: [["push",1,"push",2,"peek","pop","empty"]], expected: [undefined,undefined,1,1,false] }
    ]
  },
  {
    id: 2,
    title: "Number of Recent Calls",
    difficulty: "Easy",
    description: "You have a RecentCounter class which counts the number of recent requests within a certain time frame. Implement the RecentCounter class with ping(int t) method that adds a new request at time t and returns the number of requests that has happened in the past 3000 milliseconds.",
    example: "Input: ping(1), ping(100), ping(3001), ping(3002)\nOutput: 1, 2, 3, 3\nExplanation: At 3001, requests at 1, 100, 3001 are within 3000ms window.",
    starterCode: `class RecentCounter {
  constructor() {
    // Initialize your data structure
  }
  
  ping(t) {
    // Add request and return count
  }
}`,
    testCases: [
      { input: [["ping",1,"ping",100,"ping",3001,"ping",3002]], expected: [1,2,3,3] }
    ]
  },
  {
    id: 3,
    title: "Design Circular Queue",
    difficulty: "Medium",
    description: "Design your implementation of the circular queue. The circular queue is a linear data structure in which the operations are performed based on FIFO principle and the last position is connected back to the first position to make a circle.",
    example: "Input: enQueue(1), enQueue(2), deQueue(), enQueue(3), deQueue()\nOutput: true, true, true, true, true\nExplanation: All operations succeed in the circular queue.",
    starterCode: `class MyCircularQueue {
  constructor(k) {
    // Initialize with size k
  }
  
  enQueue(value) {
    // Insert element
  }
  
  deQueue() {
    // Delete element
  }
  
  Front() {
    // Get front item
  }
  
  Rear() {
    // Get last item
  }
  
  isEmpty() {
    // Check if empty
  }
  
  isFull() {
    // Check if full
  }
}`,
    testCases: [
      { input: [[3,"enQueue",1,"enQueue",2,"enQueue",3,"enQueue",4,"Rear","isFull","deQueue","enQueue",4,"Rear"]], expected: [undefined,true,true,true,false,3,true,true,true,4] }
    ]
  },
  {
    id: 4,
    title: "Moving Average from Data Stream",
    difficulty: "Easy",
    description: "Given a stream of integers and a window size, calculate the moving average of all integers in the sliding window.",
    example: "Input: size=3, next(1), next(10), next(3), next(5)\nOutput: 1, 5.5, 4.67, 6\nExplanation: Moving average of last 3 elements.",
    starterCode: `class MovingAverage {
  constructor(size) {
    // Initialize with window size
  }
  
  next(val) {
    // Add value and return moving average
  }
}`,
    testCases: [
      { input: [[3,"next",1,"next",10,"next",3,"next",5]], expected: [undefined,1,5.5,4.666666666666667,6] }
    ]
  },
  {
    id: 5,
    title: "First Unique Character in a String",
    difficulty: "Easy",
    description: "Given a string s, find the first non-repeating character in it and return its index. If it does not exist, return -1.",
    example: "Input: s = 'leetcode'\nOutput: 0\nExplanation: The character 'l' at index 0 is the first character that does not occur at any other index.",
    starterCode: `function firstUniqChar(s) {
  // Write your code here
  
}`,
    testCases: [
      { input: ["leetcode"], expected: 0 },
      { input: ["loveleetcode"], expected: 2 },
      { input: ["aabb"], expected: -1 }
    ]
  },
  {
    id: 6,
    title: "Sliding Window Maximum",
    difficulty: "Hard",
    description: "You are given an array of integers nums, there is a sliding window of size k which is moving from the very left of the array to the very right. Return the max sliding window.",
    example: "Input: nums = [1,3,-1,-3,5,3,6,7], k = 3\nOutput: [3,3,5,5,6,7]\nExplanation: Window [1,3,-1] max is 3, [3,-1,-3] max is 3, etc.",
    starterCode: `function maxSlidingWindow(nums, k) {
  // Write your code here
  
}`,
    testCases: [
      { input: [[1,3,-1,-3,5,3,6,7], 3], expected: [3,3,5,5,6,7] },
      { input: [[1], 1], expected: [1] },
      { input: [[1,-1], 1], expected: [1,-1] }
    ]
  },
  {
    id: 7,
    title: "Task Scheduler",
    difficulty: "Medium",
    description: "Given a characters array tasks, representing the tasks a CPU needs to do, where each letter represents a different task. Tasks could be done in any order. Each task is done in one unit of time. For each unit of time, the CPU could complete either one task or just be idle. However, there is a non-negative integer n that represents the cooldown period between two same tasks.",
    example: "Input: tasks = ['A','A','A','B','B','B'], n = 2\nOutput: 8\nExplanation: A -> B -> idle -> A -> B -> idle -> A -> B.",
    starterCode: `function leastInterval(tasks, n) {
  // Write your code here
  
}`,
    testCases: [
      { input: [["A","A","A","B","B","B"], 2], expected: 8 },
      { input: [["A","A","A","B","B","B"], 0], expected: 6 },
      { input: [["A","A","A","A","A","A","B","C","D","E","F","G"], 2], expected: 16 }
    ]
  },
  {
    id: 8,
    title: "Design Hit Counter",
    difficulty: "Medium",
    description: "Design a hit counter which counts the number of hits received in the past 5 minutes (i.e., the past 300 seconds).",
    example: "Input: hit(1), hit(2), hit(3), getHits(4), hit(300), getHits(300), getHits(301)\nOutput: 3, 4, 3\nExplanation: At 4, all 3 hits are within 300s. At 301, hit at 1 is outside window.",
    starterCode: `class HitCounter {
  constructor() {
    // Initialize your data structure
  }
  
  hit(timestamp) {
    // Record a hit at timestamp
  }
  
  getHits(timestamp) {
    // Return hits in past 300 seconds
  }
}`,
    testCases: [
      { input: [["hit",1,"hit",2,"hit",3,"getHits",4,"hit",300,"getHits",300,"getHits",301]], expected: [undefined,undefined,undefined,3,undefined,4,3] }
    ]
  },
  {
    id: 9,
    title: "Dota2 Senate",
    difficulty: "Medium",
    description: "In the world of Dota2, there are two parties: the Radiant and the Dire. The Dota2 senate consists of senators coming from two parties. The voting for this change is a round-based procedure. In each round, each senator can exercise one of the two rights: Ban one senator's right or Announce the victory.",
    example: "Input: senate = 'RD'\nOutput: 'Radiant'\nExplanation: The first senator comes from Radiant and bans the next senator's right.",
    starterCode: `function predictPartyVictory(senate) {
  // Write your code here
  
}`,
    testCases: [
      { input: ["RD"], expected: "Radiant" },
      { input: ["RDD"], expected: "Dire" },
      { input: ["RRDDD"], expected: "Dire" }
    ]
  },
  {
    id: 10,
    title: "Reveal Cards In Increasing Order",
    difficulty: "Medium",
    description: "You are given an integer array deck. There is a deck of cards where every card has a unique integer. You can order the deck in any order you want. Initially, all the cards start face down (unrevealed) in one deck. You will do the following steps repeatedly until all cards are revealed: Take the top card of the deck, reveal it, and take it out of the deck. If there are still cards in the deck then put the next top card of the deck at the bottom of the deck. Return an ordering of the deck that would reveal the cards in increasing order.",
    example: "Input: deck = [17,13,11,2,3,5,7]\nOutput: [2,13,3,11,5,17,7]\nExplanation: We get the deck in the order [17,13,11,2,3,5,7] (this order does not matter), and reorder it.",
    starterCode: `function deckRevealedIncreasing(deck) {
  // Write your code here
  
}`,
    testCases: [
      { input: [[17,13,11,2,3,5,7]], expected: [2,13,3,11,5,17,7] },
      { input: [[1,1000]], expected: [1,1000] }
    ]
  },
  {
    id: 11,
    title: "Time Needed to Buy Tickets",
    difficulty: "Easy",
    description: "There are n people in a line queuing to buy tickets, where the 0th person is at the front of the line and the (n - 1)th person is at the back of the line. You are given a 0-indexed integer array tickets of length n where the number of tickets that the ith person would like to buy is tickets[i]. Return the time taken for the person at position k to finish buying tickets.",
    example: "Input: tickets = [2,3,2], k = 2\nOutput: 6\nExplanation: Person at position 2 needs 2 tickets, takes 6 seconds total.",
    starterCode: `function timeRequiredToBuy(tickets, k) {
  // Write your code here
  
}`,
    testCases: [
      { input: [[2,3,2], 2], expected: 6 },
      { input: [[5,1,1,1], 0], expected: 8 }
    ]
  },
  {
    id: 12,
    title: "Jump Game VI",
    difficulty: "Medium",
    description: "You are given a 0-indexed integer array nums and an integer k. You are initially standing at index 0. In one move, you can jump at most k steps forward without going outside the boundaries of the array. Return the maximum score you can get.",
    example: "Input: nums = [1,-1,-2,4,-7,3], k = 2\nOutput: 7\nExplanation: You can choose your jumps forming the subsequence [1,-1,4,3] (sum = 7).",
    starterCode: `function maxResult(nums, k) {
  // Write your code here
  
}`,
    testCases: [
      { input: [[1,-1,-2,4,-7,3], 2], expected: 7 },
      { input: [[10,-5,-2,4,0,3], 3], expected: 17 },
      { input: [[1,-5,-20,4,-1,3,-6,-3], 2], expected: 0 }
    ]
  }
];
