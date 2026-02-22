import axios from "axios";
import { 
  collection, 
  doc, 
  setDoc, 
  getDoc, 
  getDocs, 
  query, 
  where, 
  orderBy, 
  limit,
  updateDoc,
  serverTimestamp,
  Timestamp
} from "firebase/firestore";
import { db } from "../firebase";

const GROQ_API_KEY = import.meta.env.VITE_GROQ_API_KEY;
const GROQ_API_URL = "https://api.groq.com/openai/v1/chat/completions";

/**
 * Generate a daily coding challenge using AI
 * @returns {Promise<Object>} Generated challenge object
 */
export const generateDailyChallenge = async () => {
  if (!GROQ_API_KEY) {
    throw new Error("Groq API key not found");
  }

  // Add randomization to ensure different challenges
  const topics = [
    "arrays and hash tables",
    "strings and string manipulation", 
    "linked lists",
    "trees and graphs",
    "dynamic programming",
    "sorting and searching",
    "stack and queue",
    "recursion and backtracking",
    "greedy algorithms",
    "bit manipulation"
  ];
  
  const difficulties = ["Easy", "Medium", "Hard"];
  const randomTopic = topics[Math.floor(Math.random() * topics.length)];
  const randomDifficulty = difficulties[Math.floor(Math.random() * difficulties.length)];
  const timestamp = Date.now();

  const prompt = `Generate a UNIQUE coding challenge about ${randomTopic} at ${randomDifficulty} difficulty level. 
  
IMPORTANT: Create a COMPLETELY NEW and ORIGINAL problem. DO NOT repeat common problems like "Two Sum" or "Find Maximum".

Timestamp for uniqueness: ${timestamp}

Return ONLY valid JSON (no markdown, no code blocks, no extra text).

Structure:
{
  "title": "Unique Problem Title (not a common LeetCode problem)",
  "difficulty": "${randomDifficulty}",
  "description": "Clear problem description with real-world context (2-3 paragraphs)",
  "examples": [
    {
      "input": "example input",
      "output": "example output",
      "explanation": "why this output"
    }
  ],
  "constraints": ["constraint 1", "constraint 2"],
  "hints": ["hint 1", "hint 2"],
  "tags": ["${randomTopic.split(' ')[0]}", "algorithms"],
  "timeLimit": 30,
  "starterCode": {
    "javascript": "function solution(params) {\n  // Your code here\n  return result;\n}",
    "cpp": "class Solution {\npublic:\n    returnType solution(params) {\n        // Your code here\n        return result;\n    }\n};",
    "java": "class Solution {\n    public returnType solution(params) {\n        // Your code here\n        return result;\n    }\n}"
  },
  "testCases": [
    {"input": "test1", "expectedOutput": "output1"},
    {"input": "test2", "expectedOutput": "output2"}
  ]
}

CRITICAL: Make this problem UNIQUE and CREATIVE. Avoid standard problems.`;

  try {
    console.log("Generating challenge with AI...");
    console.log("Topic:", randomTopic, "Difficulty:", randomDifficulty);
    
    const response = await axios.post(
      GROQ_API_URL,
      {
        model: "llama-3.3-70b-versatile",
        messages: [
          {
            role: "system",
            content: "You are a creative coding challenge generator. Create UNIQUE, ORIGINAL problems that are different from common LeetCode problems. Return only valid JSON without any markdown formatting or code blocks."
          },
          {
            role: "user",
            content: prompt
          }
        ],
        temperature: 0.9, // Higher temperature for more creativity
        max_tokens: 2500,
      },
      {
        headers: {
          Authorization: `Bearer ${GROQ_API_KEY}`,
          "Content-Type": "application/json",
        },
        timeout: 30000,
      }
    );

    let content = response.data.choices[0].message.content.trim();
    console.log("Raw AI response:", content);
    
    // Remove markdown code blocks if present
    content = content.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();
    
    // Try to find JSON in the response
    const jsonMatch = content.match(/\{[\s\S]*\}/);
    if (jsonMatch) {
      content = jsonMatch[0];
    }
    
    console.log("Cleaned content:", content);
    
    const challenge = JSON.parse(content);
    console.log("Parsed challenge:", challenge);
    
    return challenge;
  } catch (error) {
    console.error("Error generating challenge:", error);
    console.error("Error details:", error.response?.data || error.message);
    
    // Return a random fallback challenge if AI fails
    const fallbackChallenges = [
      {
        title: "Find Maximum in Array",
        difficulty: "Easy",
        description: "Write a function that takes an array of numbers and returns the maximum value.\n\nYou need to iterate through the array and keep track of the largest number seen so far.",
        examples: [
          { input: "[1, 5, 3, 9, 2]", output: "9", explanation: "9 is the largest number" }
        ],
        constraints: ["1 <= array.length <= 1000"],
        hints: ["Initialize with first element", "Compare each element"],
        tags: ["array", "basics"],
        timeLimit: 15,
        starterCode: {
          javascript: "function findMax(arr) {\n  // Your code here\n  return 0;\n}",
          cpp: "class Solution {\npublic:\n    int findMax(vector<int>& arr) {\n        // Your code here\n        return 0;\n    }\n};",
          java: "class Solution {\n    public int findMax(int[] arr) {\n        // Your code here\n        return 0;\n    }\n}"
        },
        testCases: [
          { input: "[1, 5, 3, 9, 2]", expectedOutput: "9" },
          { input: "[-1, -5, -3]", expectedOutput: "-1" }
        ]
      },
      {
        title: "Count Vowels in String",
        difficulty: "Easy",
        description: "Write a function that counts the number of vowels (a, e, i, o, u) in a given string.\n\nThe function should be case-insensitive.",
        examples: [
          { input: "Hello World", output: "3", explanation: "e, o, o are vowels" }
        ],
        constraints: ["1 <= string.length <= 1000"],
        hints: ["Convert to lowercase first", "Check each character"],
        tags: ["string", "basics"],
        timeLimit: 15,
        starterCode: {
          javascript: "function countVowels(str) {\n  // Your code here\n  return 0;\n}",
          cpp: "class Solution {\npublic:\n    int countVowels(string str) {\n        // Your code here\n        return 0;\n    }\n};",
          java: "class Solution {\n    public int countVowels(String str) {\n        // Your code here\n        return 0;\n    }\n}"
        },
        testCases: [
          { input: "Hello World", expectedOutput: "3" },
          { input: "Programming", expectedOutput: "3" }
        ]
      },
      {
        title: "Reverse Array In-Place",
        difficulty: "Easy",
        description: "Write a function that reverses an array in-place without using extra space.\n\nYou should modify the original array.",
        examples: [
          { input: "[1, 2, 3, 4, 5]", output: "[5, 4, 3, 2, 1]", explanation: "Array reversed" }
        ],
        constraints: ["1 <= array.length <= 1000"],
        hints: ["Use two pointers", "Swap elements"],
        tags: ["array", "two-pointers"],
        timeLimit: 20,
        starterCode: {
          javascript: "function reverseArray(arr) {\n  // Your code here\n  return arr;\n}",
          cpp: "class Solution {\npublic:\n    void reverseArray(vector<int>& arr) {\n        // Your code here\n    }\n};",
          java: "class Solution {\n    public void reverseArray(int[] arr) {\n        // Your code here\n    }\n}"
        },
        testCases: [
          { input: "[1, 2, 3, 4, 5]", expectedOutput: "[5, 4, 3, 2, 1]" },
          { input: "[10, 20]", expectedOutput: "[20, 10]" }
        ]
      }
    ];
    
    // Return a random fallback
    return fallbackChallenges[Math.floor(Math.random() * fallbackChallenges.length)];
  }
};

/**
 * Get today's challenge date string (YYYY-MM-DD) based on IST timezone
 * Challenges reset at 7 AM IST instead of midnight
 */
export const getTodayDateString = () => {
  // Get current time in IST (UTC+5:30)
  const now = new Date();
  const utcTime = now.getTime() + (now.getTimezoneOffset() * 60000);
  const istTime = new Date(utcTime + (5.5 * 60 * 60 * 1000)); // IST is UTC+5:30
  
  console.log('IST Time:', istTime.toISOString());
  console.log('IST Hour:', istTime.getHours());
  
  // If it's before 7 AM IST, use yesterday's date
  // This means the challenge from yesterday continues until 7 AM IST today
  if (istTime.getHours() < 7) {
    const yesterday = new Date(istTime);
    yesterday.setDate(yesterday.getDate() - 1);
    const dateStr = yesterday.toISOString().split('T')[0];
    console.log('Before 7 AM IST, using yesterday:', dateStr);
    return dateStr;
  }
  
  const dateStr = istTime.toISOString().split('T')[0];
  console.log('After 7 AM IST, using today:', dateStr);
  return dateStr;
};

/**
 * Get or create today's daily challenge
 * @returns {Promise<Object>} Today's challenge
 */
export const getTodaysChallenge = async () => {
  const dateString = getTodayDateString();
  const challengeRef = doc(db, "dailyChallenges", dateString);
  
  try {
    console.log("Fetching challenge for date:", dateString);
    const challengeDoc = await getDoc(challengeRef);
    
    if (challengeDoc.exists()) {
      console.log("Challenge found in database");
      return { id: challengeDoc.id, ...challengeDoc.data() };
    }
    
    // Generate new challenge if it doesn't exist
    console.log("No challenge found, generating new one...");
    const newChallenge = await generateDailyChallenge();
    
    const challengeData = {
      ...newChallenge,
      date: dateString,
      createdAt: serverTimestamp(),
      participantCount: 0,
      completionCount: 0
    };
    
    console.log("Saving challenge to database...");
    await setDoc(challengeRef, challengeData);
    console.log("Challenge saved successfully");
    
    return { id: dateString, ...challengeData };
  } catch (error) {
    console.error("Error in getTodaysChallenge:", error);
    console.error("Error stack:", error.stack);
    throw new Error(`Failed to load challenge: ${error.message}`);
  }
};

/**
 * Submit a solution for today's challenge
 * @param {string} userId - User ID
 * @param {string} challengeId - Challenge ID (date string)
 * @param {Object} submission - Submission data
 * @returns {Promise<Object>} Submission result
 */
export const submitChallengeSolution = async (userId, challengeId, submission) => {
  const submissionRef = doc(db, "challengeSubmissions", `${challengeId}_${userId}`);
  
  try {
    const existingSubmission = await getDoc(submissionRef);
    
    const submissionData = {
      userId,
      challengeId,
      code: submission.code,
      language: submission.language,
      timeSpent: submission.timeSpent,
      passed: submission.passed,
      score: submission.score,
      submittedAt: serverTimestamp(),
      timestamp: Date.now()
    };
    
    // If first submission, increment participant count
    if (!existingSubmission.exists()) {
      const challengeRef = doc(db, "dailyChallenges", challengeId);
      await updateDoc(challengeRef, {
        participantCount: (await getDoc(challengeRef)).data().participantCount + 1
      });
    }
    
    // If passed and first time passing, increment completion count
    if (submission.passed && (!existingSubmission.exists() || !existingSubmission.data().passed)) {
      const challengeRef = doc(db, "dailyChallenges", challengeId);
      await updateDoc(challengeRef, {
        completionCount: (await getDoc(challengeRef)).data().completionCount + 1
      });
    }
    
    await setDoc(submissionRef, submissionData);
    
    return { success: true, submissionId: submissionRef.id };
  } catch (error) {
    console.error("Error submitting solution:", error);
    throw error;
  }
};

/**
 * Get leaderboard for today's challenge
 * @param {string} challengeId - Challenge ID (date string)
 * @param {number} limitCount - Number of top entries to fetch
 * @returns {Promise<Array>} Leaderboard entries
 */
export const getChallengeLeaderboard = async (challengeId, limitCount = 50) => {
  try {
    const submissionsRef = collection(db, "challengeSubmissions");
    
    // Simplified query - just filter by challengeId and passed
    // We'll sort in memory to avoid needing a composite index
    const q = query(
      submissionsRef,
      where("challengeId", "==", challengeId),
      where("passed", "==", true)
    );
    
    const querySnapshot = await getDocs(q);
    const submissions = [];
    
    for (const docSnap of querySnapshot.docs) {
      const data = docSnap.data();
      
      // Fetch user data
      const userRef = doc(db, "users", data.userId);
      const userDoc = await getDoc(userRef);
      const userData = userDoc.exists() ? userDoc.data() : {};
      
      submissions.push({
        userId: data.userId,
        username: userData.username || "Anonymous",
        timeSpent: data.timeSpent,
        score: data.score,
        language: data.language,
        submittedAt: data.submittedAt,
        timestamp: data.timestamp || 0
      });
    }
    
    // Sort by timeSpent (ascending) in memory
    submissions.sort((a, b) => a.timeSpent - b.timeSpent);
    
    // Limit results and add rank
    const leaderboard = submissions.slice(0, limitCount).map((entry, index) => ({
      ...entry,
      rank: index + 1
    }));
    
    return leaderboard;
  } catch (error) {
    console.error("Error fetching leaderboard:", error);
    // Return empty array instead of throwing to prevent page crash
    return [];
  }
};

/**
 * Get user's submission for a specific challenge
 * @param {string} userId - User ID
 * @param {string} challengeId - Challenge ID
 * @returns {Promise<Object|null>} User's submission or null
 */
export const getUserSubmission = async (userId, challengeId) => {
  try {
    const submissionRef = doc(db, "challengeSubmissions", `${challengeId}_${userId}`);
    const submissionDoc = await getDoc(submissionRef);
    
    if (submissionDoc.exists()) {
      return { id: submissionDoc.id, ...submissionDoc.data() };
    }
    
    return null;
  } catch (error) {
    console.error("Error fetching user submission:", error);
    return null;
  }
};

/**
 * Get challenge statistics
 * @param {string} challengeId - Challenge ID
 * @returns {Promise<Object>} Challenge statistics
 */
export const getChallengeStats = async (challengeId) => {
  try {
    const challengeRef = doc(db, "dailyChallenges", challengeId);
    const challengeDoc = await getDoc(challengeRef);
    
    if (!challengeDoc.exists()) {
      return null;
    }
    
    const data = challengeDoc.data();
    
    return {
      participantCount: data.participantCount || 0,
      completionCount: data.completionCount || 0,
      completionRate: data.participantCount > 0 
        ? ((data.completionCount / data.participantCount) * 100).toFixed(1)
        : 0
    };
  } catch (error) {
    console.error("Error fetching challenge stats:", error);
    return null;
  }
};

/**
 * Get user's daily challenge submission history
 * @param {string} userId - User ID
 * @param {number} limitCount - Number of recent submissions to fetch
 * @returns {Promise<Array>} User's challenge history
 */
export const getUserChallengeHistory = async (userId, limitCount = 10) => {
  try {
    const submissionsRef = collection(db, "challengeSubmissions");
    const q = query(
      submissionsRef,
      where("userId", "==", userId),
      where("passed", "==", true)
    );
    
    const querySnapshot = await getDocs(q);
    const history = [];
    
    for (const docSnap of querySnapshot.docs) {
      const data = docSnap.data();
      
      // Fetch challenge data
      const challengeRef = doc(db, "dailyChallenges", data.challengeId);
      const challengeDoc = await getDoc(challengeRef);
      const challengeData = challengeDoc.exists() ? challengeDoc.data() : {};
      
      history.push({
        challengeId: data.challengeId,
        challengeTitle: challengeData.title || "Daily Challenge",
        difficulty: challengeData.difficulty || "Medium",
        timeSpent: data.timeSpent,
        score: data.score,
        language: data.language,
        submittedAt: data.submittedAt,
        timestamp: data.timestamp || 0,
        code: data.code
      });
    }
    
    // Sort by timestamp (most recent first)
    history.sort((a, b) => b.timestamp - a.timestamp);
    
    return history.slice(0, limitCount);
  } catch (error) {
    console.error("Error fetching user challenge history:", error);
    return [];
  }
};

export default {
  generateDailyChallenge,
  getTodaysChallenge,
  submitChallengeSolution,
  getChallengeLeaderboard,
  getUserSubmission,
  getChallengeStats,
  getTodayDateString,
  getUserChallengeHistory
};
