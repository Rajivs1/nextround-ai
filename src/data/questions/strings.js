export const stringQuestions = [
  {
    id: 1,
    title: "Valid Anagram",
    difficulty: "Easy",
    description: "Given two strings s and t, return true if t is an anagram of s, and false otherwise. An Anagram is a word or phrase formed by rearranging the letters of a different word or phrase, typically using all the original letters exactly once.",
    example: "Input: s = 'anagram', t = 'nagaram'\nOutput: true\nExplanation: Both strings contain the same characters with the same frequencies.",
    starterCode: `function isAnagram(s, t) {
  // Write your code here
  
}`,
    testCases: [
      { input: ["anagram", "nagaram"], expected: true },
      { input: ["rat", "car"], expected: false },
      { input: ["listen", "silent"], expected: true },
      { input: ["hello", "world"], expected: false }
    ]
  },
  {
    id: 2,
    title: "Valid Palindrome",
    difficulty: "Easy",
    description: "A phrase is a palindrome if, after converting all uppercase letters into lowercase letters and removing all non-alphanumeric characters, it reads the same forward and backward. Given a string s, return true if it is a palindrome, or false otherwise.",
    example: "Input: s = 'A man, a plan, a canal: Panama'\nOutput: true\nExplanation: 'amanaplanacanalpanama' is a palindrome.",
    starterCode: `function isPalindrome(s) {
  // Write your code here
  
}`,
    testCases: [
      { input: ["A man, a plan, a canal: Panama"], expected: true },
      { input: ["race a car"], expected: false },
      { input: [" "], expected: true },
      { input: ["Was it a car or a cat I saw?"], expected: true }
    ]
  },
  {
    id: 3,
    title: "Longest Substring Without Repeating Characters",
    difficulty: "Medium",
    description: "Given a string s, find the length of the longest substring without repeating characters.",
    example: "Input: s = 'abcabcbb'\nOutput: 3\nExplanation: The answer is 'abc', with the length of 3.",
    starterCode: `function lengthOfLongestSubstring(s) {
  // Write your code here
  
}`,
    testCases: [
      { input: ["abcabcbb"], expected: 3 },
      { input: ["bbbbb"], expected: 1 },
      { input: ["pwwkew"], expected: 3 },
      { input: [""], expected: 0 }
    ]
  },
  {
    id: 4,
    title: "Longest Palindromic Substring",
    difficulty: "Medium",
    description: "Given a string s, return the longest palindromic substring in s.",
    example: "Input: s = 'babad'\nOutput: 'bab'\nExplanation: 'aba' is also a valid answer.",
    starterCode: `function longestPalindrome(s) {
  // Write your code here
  
}`,
    testCases: [
      { input: ["babad"], expected: "bab" },
      { input: ["cbbd"], expected: "bb" },
      { input: ["a"], expected: "a" },
      { input: ["ac"], expected: "a" }
    ]
  },
  {
    id: 5,
    title: "Group Anagrams",
    difficulty: "Medium",
    description: "Given an array of strings strs, group the anagrams together. You can return the answer in any order.",
    example: "Input: strs = ['eat','tea','tan','ate','nat','bat']\nOutput: [['bat'],['nat','tan'],['ate','eat','tea']]\nExplanation: Words with the same sorted characters are grouped together.",
    starterCode: `function groupAnagrams(strs) {
  // Write your code here
  
}`,
    testCases: [
      { input: [["eat","tea","tan","ate","nat","bat"]], expected: [["bat"],["nat","tan"],["ate","eat","tea"]] },
      { input: [[""]], expected: [[""]] },
      { input: [["a"]], expected: [["a"]] }
    ]
  },
  {
    id: 6,
    title: "Valid Parentheses",
    difficulty: "Easy",
    description: "Given a string s containing just the characters '(', ')', '{', '}', '[' and ']', determine if the input string is valid. An input string is valid if: Open brackets must be closed by the same type of brackets and in the correct order.",
    example: "Input: s = '()[]{}'\nOutput: true\nExplanation: All brackets are properly closed.",
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
    id: 7,
    title: "Longest Common Prefix",
    difficulty: "Easy",
    description: "Write a function to find the longest common prefix string amongst an array of strings. If there is no common prefix, return an empty string ''.",
    example: "Input: strs = ['flower','flow','flight']\nOutput: 'fl'\nExplanation: 'fl' is the longest common prefix.",
    starterCode: `function longestCommonPrefix(strs) {
  // Write your code here
  
}`,
    testCases: [
      { input: [["flower","flow","flight"]], expected: "fl" },
      { input: [["dog","racecar","car"]], expected: "" },
      { input: [["ab","a"]], expected: "a" }
    ]
  },
  {
    id: 8,
    title: "String to Integer (atoi)",
    difficulty: "Medium",
    description: "Implement the myAtoi(string s) function, which converts a string to a 32-bit signed integer (similar to C/C++'s atoi function).",
    example: "Input: s = '42'\nOutput: 42\nExplanation: The string '42' is converted to integer 42.",
    starterCode: `function myAtoi(s) {
  // Write your code here
  
}`,
    testCases: [
      { input: ["42"], expected: 42 },
      { input: ["   -42"], expected: -42 },
      { input: ["4193 with words"], expected: 4193 },
      { input: ["words and 987"], expected: 0 }
    ]
  },
  {
    id: 9,
    title: "Implement strStr()",
    difficulty: "Easy",
    description: "Given two strings needle and haystack, return the index of the first occurrence of needle in haystack, or -1 if needle is not part of haystack.",
    example: "Input: haystack = 'sadbutsad', needle = 'sad'\nOutput: 0\nExplanation: 'sad' occurs at index 0 and 6. The first occurrence is at index 0.",
    starterCode: `function strStr(haystack, needle) {
  // Write your code here
  
}`,
    testCases: [
      { input: ["sadbutsad", "sad"], expected: 0 },
      { input: ["leetcode", "leeto"], expected: -1 },
      { input: ["hello", "ll"], expected: 2 },
      { input: ["", ""], expected: 0 }
    ]
  },
  {
    id: 10,
    title: "Reverse Words in a String",
    difficulty: "Medium",
    description: "Given an input string s, reverse the order of the words. A word is defined as a sequence of non-space characters. The words in s will be separated by at least one space. Return a string of the words in reverse order concatenated by a single space.",
    example: "Input: s = 'the sky is blue'\nOutput: 'blue is sky the'\nExplanation: Words are reversed in order.",
    starterCode: `function reverseWords(s) {
  // Write your code here
  
}`,
    testCases: [
      { input: ["the sky is blue"], expected: "blue is sky the" },
      { input: ["  hello world  "], expected: "world hello" },
      { input: ["a good   example"], expected: "example good a" }
    ]
  },
  {
    id: 11,
    title: "Minimum Window Substring",
    difficulty: "Hard",
    description: "Given two strings s and t of lengths m and n respectively, return the minimum window substring of s such that every character in t (including duplicates) is included in the window. If there is no such substring, return the empty string ''.",
    example: "Input: s = 'ADOBECODEBANC', t = 'ABC'\nOutput: 'BANC'\nExplanation: The minimum window substring 'BANC' includes 'A', 'B', and 'C' from string t.",
    starterCode: `function minWindow(s, t) {
  // Write your code here
  
}`,
    testCases: [
      { input: ["ADOBECODEBANC", "ABC"], expected: "BANC" },
      { input: ["a", "a"], expected: "a" },
      { input: ["a", "aa"], expected: "" }
    ]
  },
  {
    id: 12,
    title: "Decode String",
    difficulty: "Medium",
    description: "Given an encoded string, return its decoded string. The encoding rule is: k[encoded_string], where the encoded_string inside the square brackets is being repeated exactly k times.",
    example: "Input: s = '3[a]2[bc]'\nOutput: 'aaabcbc'\nExplanation: 'a' is repeated 3 times and 'bc' is repeated 2 times.",
    starterCode: `function decodeString(s) {
  // Write your code here
  
}`,
    testCases: [
      { input: ["3[a]2[bc]"], expected: "aaabcbc" },
      { input: ["3[a2[c]]"], expected: "accaccacc" },
      { input: ["2[abc]3[cd]ef"], expected: "abcabccdcdcdef" },
      { input: ["abc3[cd]xyz"], expected: "abccdcdcdxyz" }
    ]
  }
];
