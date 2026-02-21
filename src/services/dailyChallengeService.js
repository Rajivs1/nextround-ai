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

  const prompt = `Generate a coding challenge suitable for technical interviews. Return ONLY valid JSON (no markdown, no code blocks, no extra text).

Structure:
{
  "title": "Two Sum Problem",
  "difficulty": "Medium",
  "description": "Given an array of integers nums and an integer target, return indices of the two numbers that add up to target. You may assume each input has exactly one solution.",
  "examples": [
    {
      "input": "nums = [2,7,11,15], target = 9",
      "output": "[0,1]",
      "explanation": "nums[0] + nums[1] = 2 + 7 = 9"
    }
  ],
  "constraints": ["2 <= nums.length <= 10^4", "-10^9 <= nums[i] <= 10^9"],
  "hints": ["Use a hash map to store values", "Check if target - current exists"],
  "tags": ["array", "hash-table"],
  "timeLimit": 30,
  "starterCode": {
    "javascript": "function solution(nums, target) {\n  // Your code here\n  return [];\n}",
    "cpp": "class Solution {\npublic:\n    vector<int> solution(vector<int>& nums, int target) {\n        // Your code here\n        return {};\n    }\n};",
    "java": "class Solution {\n    public int[] solution(int[] nums, int target) {\n        // Your code here\n        return new int[0];\n    }\n}"
  },
  "testCases": [
    {"input": "[2,7,11,15], 9", "expectedOutput": "[0,1]"},
    {"input": "[3,2,4], 6", "expectedOutput": "[1,2]"}
  ]
}

IMPORTANT: For C++ starter code, ALWAYS use this format with class:
class Solution {
public:
    returnType functionName(parameters) {
        // Your code here
        return defaultValue;
    }
};

Create a unique, interview-relevant problem. Return ONLY the JSON object.`;

  try {
    console.log("Generating challenge with AI...");
    
    const response = await axios.post(
      GROQ_API_URL,
      {
        model: "llama-3.3-70b-versatile",
        messages: [
          {
            role: "system",
            content: "You are a coding challenge generator. Return only valid JSON without any markdown formatting or code blocks."
          },
          {
            role: "user",
            content: prompt
          }
        ],
        temperature: 0.8,
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
    
    // Return a fallback challenge if AI fails
    return {
      title: "Find Maximum in Array",
      difficulty: "Easy",
      description: "Write a function that takes an array of numbers and returns the maximum value.\n\nYou need to iterate through the array and keep track of the largest number seen so far.",
      examples: [
        {
          input: "[1, 5, 3, 9, 2]",
          output: "9",
          explanation: "9 is the largest number in the array"
        },
        {
          input: "[-1, -5, -3]",
          output: "-1",
          explanation: "-1 is the largest among negative numbers"
        }
      ],
      constraints: [
        "1 <= array.length <= 1000",
        "-10^6 <= array[i] <= 10^6"
      ],
      hints: [
        "Initialize a variable with the first element",
        "Compare each element with the current maximum",
        "Update the maximum if you find a larger value"
      ],
      tags: ["array", "basics"],
      timeLimit: 15,
      starterCode: {
        javascript: "function findMax(arr) {\n  // Your code here\n  return 0;\n}",
        cpp: "class Solution {\npublic:\n    int findMax(vector<int>& arr) {\n        // Your code here\n        return 0;\n    }\n};",
        java: "class Solution {\n    public int findMax(int[] arr) {\n        // Your code here\n        return 0;\n    }\n}"
      },
      testCases: [
        { input: "[1, 5, 3, 9, 2]", expectedOutput: "9" },
        { input: "[-1, -5, -3]", expectedOutput: "-1" },
        { input: "[42]", expectedOutput: "42" }
      ]
    };
  }
};

/**
 * Get today's challenge date string (YYYY-MM-DD)
 */
export const getTodayDateString = () => {
  const today = new Date();
  return today.toISOString().split('T')[0];
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

export default {
  generateDailyChallenge,
  getTodaysChallenge,
  submitChallengeSolution,
  getChallengeLeaderboard,
  getUserSubmission,
  getChallengeStats,
  getTodayDateString
};
