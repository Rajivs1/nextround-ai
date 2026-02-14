export const linkedListQuestions = [
  {
    id: 1,
    title: "Reverse Linked List",
    difficulty: "Easy",
    description: "Given the head of a singly linked list, reverse the list, and return the reversed list.",
    example: "Input: head = [1,2,3,4,5]\nOutput: [5,4,3,2,1]\nExplanation: The linked list is reversed.",
    starterCode: `function reverseList(head) {
  // Write your code here
  
}`,
    testCases: [
      { input: [[1,2,3,4,5]], expected: [5,4,3,2,1] },
      { input: [[1,2]], expected: [2,1] },
      { input: [[]], expected: [] }
    ]
  },
  {
    id: 2,
    title: "Merge Two Sorted Lists",
    difficulty: "Easy",
    description: "You are given the heads of two sorted linked lists list1 and list2. Merge the two lists in a one sorted list. The list should be made by splicing together the nodes of the first two lists. Return the head of the merged linked list.",
    example: "Input: list1 = [1,2,4], list2 = [1,3,4]\nOutput: [1,1,2,3,4,4]\nExplanation: The merged list is sorted.",
    starterCode: `function mergeTwoLists(list1, list2) {
  // Write your code here
  
}`,
    testCases: [
      { input: [[1,2,4], [1,3,4]], expected: [1,1,2,3,4,4] },
      { input: [[], []], expected: [] },
      { input: [[], [0]], expected: [0] }
    ]
  },
  {
    id: 3,
    title: "Linked List Cycle",
    difficulty: "Easy",
    description: "Given head, the head of a linked list, determine if the linked list has a cycle in it. There is a cycle in a linked list if there is some node in the list that can be reached again by continuously following the next pointer.",
    example: "Input: head = [3,2,0,-4], pos = 1\nOutput: true\nExplanation: There is a cycle in the linked list, where the tail connects to the 1st node.",
    starterCode: `function hasCycle(head) {
  // Write your code here
  
}`,
    testCases: [
      { input: [[3,2,0,-4]], expected: false },
      { input: [[1,2]], expected: false },
      { input: [[1]], expected: false }
    ]
  },
  {
    id: 4,
    title: "Remove Nth Node From End of List",
    difficulty: "Medium",
    description: "Given the head of a linked list, remove the nth node from the end of the list and return its head.",
    example: "Input: head = [1,2,3,4,5], n = 2\nOutput: [1,2,3,5]\nExplanation: The 2nd node from the end (4) is removed.",
    starterCode: `function removeNthFromEnd(head, n) {
  // Write your code here
  
}`,
    testCases: [
      { input: [[1,2,3,4,5], 2], expected: [1,2,3,5] },
      { input: [[1], 1], expected: [] },
      { input: [[1,2], 1], expected: [1] }
    ]
  },
  {
    id: 5,
    title: "Middle of the Linked List",
    difficulty: "Easy",
    description: "Given the head of a singly linked list, return the middle node of the linked list. If there are two middle nodes, return the second middle node.",
    example: "Input: head = [1,2,3,4,5]\nOutput: [3,4,5]\nExplanation: The middle node of the list is node 3.",
    starterCode: `function middleNode(head) {
  // Write your code here
  
}`,
    testCases: [
      { input: [[1,2,3,4,5]], expected: [3,4,5] },
      { input: [[1,2,3,4,5,6]], expected: [4,5,6] }
    ]
  },
  {
    id: 6,
    title: "Palindrome Linked List",
    difficulty: "Easy",
    description: "Given the head of a singly linked list, return true if it is a palindrome or false otherwise.",
    example: "Input: head = [1,2,2,1]\nOutput: true\nExplanation: The linked list reads the same forward and backward.",
    starterCode: `function isPalindrome(head) {
  // Write your code here
  
}`,
    testCases: [
      { input: [[1,2,2,1]], expected: true },
      { input: [[1,2]], expected: false },
      { input: [[1]], expected: true }
    ]
  },
  {
    id: 7,
    title: "Intersection of Two Linked Lists",
    difficulty: "Easy",
    description: "Given the heads of two singly linked-lists headA and headB, return the node at which the two lists intersect. If the two linked lists have no intersection at all, return null.",
    example: "Input: intersectVal = 8, listA = [4,1,8,4,5], listB = [5,6,1,8,4,5]\nOutput: 8\nExplanation: The intersected node's value is 8.",
    starterCode: `function getIntersectionNode(headA, headB) {
  // Write your code here
  
}`,
    testCases: [
      { input: [[4,1,8,4,5], [5,6,1,8,4,5]], expected: null },
      { input: [[1,9,1,2,4], [3,2,4]], expected: null }
    ]
  },
  {
    id: 8,
    title: "Add Two Numbers",
    difficulty: "Medium",
    description: "You are given two non-empty linked lists representing two non-negative integers. The digits are stored in reverse order, and each of their nodes contains a single digit. Add the two numbers and return the sum as a linked list.",
    example: "Input: l1 = [2,4,3], l2 = [5,6,4]\nOutput: [7,0,8]\nExplanation: 342 + 465 = 807.",
    starterCode: `function addTwoNumbers(l1, l2) {
  // Write your code here
  
}`,
    testCases: [
      { input: [[2,4,3], [5,6,4]], expected: [7,0,8] },
      { input: [[0], [0]], expected: [0] },
      { input: [[9,9,9,9,9,9,9], [9,9,9,9]], expected: [8,9,9,9,0,0,0,1] }
    ]
  },
  {
    id: 9,
    title: "Reorder List",
    difficulty: "Medium",
    description: "You are given the head of a singly linked-list. The list can be represented as: L0 → L1 → … → Ln - 1 → Ln. Reorder the list to be on the following form: L0 → Ln → L1 → Ln - 1 → L2 → Ln - 2 → …",
    example: "Input: head = [1,2,3,4]\nOutput: [1,4,2,3]\nExplanation: The list is reordered as specified.",
    starterCode: `function reorderList(head) {
  // Write your code here
  
}`,
    testCases: [
      { input: [[1,2,3,4]], expected: [1,4,2,3] },
      { input: [[1,2,3,4,5]], expected: [1,5,2,4,3] }
    ]
  },
  {
    id: 10,
    title: "Copy List with Random Pointer",
    difficulty: "Medium",
    description: "A linked list of length n is given such that each node contains an additional random pointer, which could point to any node in the list, or null. Construct a deep copy of the list.",
    example: "Input: head = [[7,null],[13,0],[11,4],[10,2],[1,0]]\nOutput: [[7,null],[13,0],[11,4],[10,2],[1,0]]\nExplanation: A deep copy is created with all pointers preserved.",
    starterCode: `function copyRandomList(head) {
  // Write your code here
  
}`,
    testCases: [
      { input: [[[7,null],[13,0],[11,4],[10,2],[1,0]]], expected: [[7,null],[13,0],[11,4],[10,2],[1,0]] },
      { input: [[[1,1],[2,1]]], expected: [[1,1],[2,1]] }
    ]
  },
  {
    id: 11,
    title: "Merge k Sorted Lists",
    difficulty: "Hard",
    description: "You are given an array of k linked-lists lists, each linked-list is sorted in ascending order. Merge all the linked-lists into one sorted linked-list and return it.",
    example: "Input: lists = [[1,4,5],[1,3,4],[2,6]]\nOutput: [1,1,2,3,4,4,5,6]\nExplanation: The linked-lists are merged into one sorted list.",
    starterCode: `function mergeKLists(lists) {
  // Write your code here
  
}`,
    testCases: [
      { input: [[[1,4,5],[1,3,4],[2,6]]], expected: [1,1,2,3,4,4,5,6] },
      { input: [[]], expected: [] },
      { input: [[[]]], expected: [] }
    ]
  },
  {
    id: 12,
    title: "Reverse Nodes in k-Group",
    difficulty: "Hard",
    description: "Given the head of a linked list, reverse the nodes of the list k at a time, and return the modified list. k is a positive integer and is less than or equal to the length of the linked list.",
    example: "Input: head = [1,2,3,4,5], k = 2\nOutput: [2,1,4,3,5]\nExplanation: The first 2 nodes are reversed, then the next 2, and 5 remains.",
    starterCode: `function reverseKGroup(head, k) {
  // Write your code here
  
}`,
    testCases: [
      { input: [[1,2,3,4,5], 2], expected: [2,1,4,3,5] },
      { input: [[1,2,3,4,5], 3], expected: [3,2,1,4,5] },
      { input: [[1,2,3,4,5], 1], expected: [1,2,3,4,5] }
    ]
  }
];
