import axios from "axios";

/**
 * AI-Powered DSA Problem Generator using Groq API
 * Generates coding problems for data structures and algorithms practice
 */

const GROQ_API_KEY = import.meta.env.VITE_GROQ_API_KEY;
const GROQ_API_URL = "https://api.groq.com/openai/v1/chat/completions";

// Groq models to try in order
const GROQ_MODELS = [
  "llama-3.1-8b-instant",
  "mixtral-8x7b-32768",
  "llama-3.3-70b-versatile",
];

/**
 * Generate DSA coding problems using Groq AI
 * @param {string} topic - Topic (e.g., 'arrays', 'strings', 'linkedlist')
 * @param {number} count - Number of problems to generate (default: 5)
 * @param {string} difficulty - Difficulty level: 'easy', 'medium', 'hard', or 'mixed'
 * @returns {Promise<Array>} Array of coding problems
 */
export const generateDSAProblems = async (
  topic,
  count = 5,
  difficulty = "mixed"
) => {
  if (!GROQ_API_KEY) {
    throw new Error(
      "Groq API key not found. Please configure VITE_GROQ_API_KEY in .env file."
    );
  }

  console.log(`🤖 Generating ${count} DSA problems for ${topic}`);

  // Build the prompt
  const prompt = buildDSAPrompt(topic, count, difficulty);

  // Try multiple Groq models
  for (const model of GROQ_MODELS) {
    try {
      console.log(`🔄 Trying Groq model: ${model}`);

      const response = await axios.post(
        GROQ_API_URL,
        {
          model: model,
          messages: [
            {
              role: "user",
              content: prompt,
            },
          ],
          temperature: 0.7,
          max_tokens: 8000,
        },
        {
          headers: {
            Authorization: `Bearer ${GROQ_API_KEY}`,
            "Content-Type": "application/json",
          },
          timeout: 90000, // 90 seconds for coding problems
        }
      );

      if (
        !response.data ||
        !response.data.choices ||
        !response.data.choices[0]
      ) {
        throw new Error("Invalid response structure from API");
      }

      const content = response.data.choices[0].message.content;
      console.log(`✅ Problems generated with ${model}`);

      // Parse and validate the response
      const problems = parseProblems(content);

      if (problems.length > 0) {
        return problems;
      } else {
        throw new Error("No valid problems parsed from AI response");
      }
    } catch (error) {
      console.warn(`Model ${model} failed:`, error.message);
      // Continue to next model
    }
  }

  throw new Error("All Groq models failed to generate problems");
};

/**
 * Build the prompt for AI to generate DSA problems
 */
const buildDSAPrompt = (topic, count, difficulty) => {
  const topicDescriptions = {
    arrays: "Array manipulation, searching, sorting, two pointers, sliding window",
    strings: "String manipulation, pattern matching, substrings, palindromes",
    stack: "Stack operations, balanced parentheses, infix/postfix, monotonic stack",
    queue: "Queue operations, circular queue, deque, priority queue",
    linkedlist: "Linked list traversal, reversal, cycle detection, merging",
    recursion: "Recursive algorithms, backtracking, divide and conquer, memoization",
    patterns: "Pattern printing, number patterns, star patterns, nested loops",
    functions: "Function composition, higher-order functions, closures, callbacks",
  };

  const topicDesc =
    topicDescriptions[topic] || "General data structures and algorithms";
  const difficultyText =
    difficulty === "mixed"
      ? "Mix difficulty: some Easy, some Medium, some Hard"
      : `All problems should be ${difficulty} difficulty`;

  return `Generate exactly ${count} coding problems about ${topicDesc}.

CRITICAL REQUIREMENTS:
1. Return ONLY a JSON array, no other text
2. Each problem must have: title, difficulty, description, example, starterCode
3. ${difficultyText}
4. Make problems practical and interview-relevant
5. Include clear input/output examples
6. Provide JavaScript starter code with function signature

JSON FORMAT (return ONLY this structure):
[
  {
    "id": 1,
    "title": "Clear Problem Title",
    "difficulty": "Easy",
    "description": "Clear problem description explaining what to do. Include constraints and requirements.",
    "example": "Input: arr = [1,2,3]\\nOutput: 6\\nExplanation: Sum of all elements is 1+2+3 = 6",
    "starterCode": "function solutionName(param) {\\n  // Write your code here\\n  \\n}"
  }
]

GUIDELINES:
- Title: Short, descriptive (e.g., "Find Missing Number", "Reverse String")
- Difficulty: Must be exactly "Easy", "Medium", or "Hard"
- Description: Clear problem statement, 2-4 sentences, include constraints
- Example: Use exact format "Input: ...\\nOutput: ...\\nExplanation: ..."
- StarterCode: JavaScript function with meaningful name and parameters
- Problems should be solvable in 5-30 minutes depending on difficulty

EXAMPLE for Arrays:
{
  "id": 1,
  "title": "Two Sum",
  "difficulty": "Easy",
  "description": "Given an array of integers nums and an integer target, return indices of the two numbers that add up to target. You may assume each input has exactly one solution.",
  "example": "Input: nums = [2,7,11,15], target = 9\\nOutput: [0,1]\\nExplanation: nums[0] + nums[1] = 2 + 7 = 9",
  "starterCode": "function twoSum(nums, target) {\\n  // Write your code here\\n  \\n}"
}

Generate ${count} ${topic} problems now. Return ONLY the JSON array, no markdown, no explanations.`;
};

/**
 * Parse AI response and extract problems
 */
const parseProblems = (content) => {
  try {
    let jsonText = content.trim();

    // Remove markdown code blocks if present
    const jsonMatch = jsonText.match(/```(?:json)?\s*\n?([\s\S]*?)\n?```/);
    if (jsonMatch) {
      jsonText = jsonMatch[1].trim();
    } else if (jsonText.includes("```")) {
      jsonText = jsonText
        .replace(/```[\s\S]*?\n/, "")
        .replace(/\n```/g, "")
        .trim();
    }

    // Find JSON array (start with [ and end with ])
    const jsonStart = jsonText.indexOf("[");
    const jsonEnd = jsonText.lastIndexOf("]");

    if (jsonStart !== -1 && jsonEnd !== -1 && jsonEnd > jsonStart) {
      jsonText = jsonText.substring(jsonStart, jsonEnd + 1);
    }

    // Clean up any non-printable characters
    // eslint-disable-next-line no-control-regex
    jsonText = jsonText.replace(/[\u0000-\u001F\u007F-\u009F]/g, "");

    // Parse JSON
    const problems = JSON.parse(jsonText);

    // Validate problems
    if (!Array.isArray(problems)) {
      throw new Error("Response is not an array");
    }

    // Filter and validate each problem
    const validProblems = problems.filter((p) => {
      return (
        p.title &&
        p.difficulty &&
        p.description &&
        p.example &&
        p.starterCode &&
        (p.difficulty === "Easy" ||
          p.difficulty === "Medium" ||
          p.difficulty === "Hard")
      );
    });

    console.log(`✅ Parsed ${validProblems.length} valid problems`);
    return validProblems;
  } catch (error) {
    console.error("❌ Failed to parse problems:", error.message);
    return [];
  }
};

/**
 * Generate problems for all topics
 * @param {Array} topics - Array of topic IDs
 * @param {number} problemsPerTopic - Number of problems per topic
 * @returns {Promise<Object>} Object with topic as key and problems as value
 */
export const generateAllTopicProblems = async (
  topics,
  problemsPerTopic = 5
) => {
  const allProblems = {};

  for (const topic of topics) {
    try {
      console.log(`📚 Generating problems for ${topic}...`);
      const problems = await generateDSAProblems(topic, problemsPerTopic, "mixed");
      allProblems[topic] = problems;
      
      // Small delay between topics to avoid rate limiting
      await new Promise((resolve) => setTimeout(resolve, 1000));
    } catch (error) {
      console.error(`Failed to generate problems for ${topic}:`, error.message);
      allProblems[topic] = [];
    }
  }

  return allProblems;
};

/**
 * Generate problems for a specific difficulty level
 */
export const generateProblemsByDifficulty = async (
  topic,
  difficulty,
  count = 5
) => {
  return generateDSAProblems(topic, count, difficulty);
};

/**
 * Problem cache for quick access
 */
const problemCache = new Map();

/**
 * Get problems with optional caching
 */
export const getProblemsWithCache = async (
  topic,
  count = 5,
  difficulty = "mixed",
  useCache = true
) => {
  const cacheKey = `${topic}-${count}-${difficulty}`;

  if (useCache && problemCache.has(cacheKey)) {
    console.log("📦 Using cached problems");
    return problemCache.get(cacheKey);
  }

  const problems = await generateDSAProblems(topic, count, difficulty);
  problemCache.set(cacheKey, problems);

  // Clear cache after 10 minutes
  setTimeout(() => {
    problemCache.delete(cacheKey);
  }, 10 * 60 * 1000);

  return problems;
};

/**
 * Clear the problem cache
 */
export const clearProblemCache = () => {
  problemCache.clear();
  console.log("🗑️ Problem cache cleared");
};

/**
 * Validate a problem structure
 */
export const validateProblem = (problem) => {
  const required = ["id", "title", "difficulty", "description", "example", "starterCode"];
  
  for (const field of required) {
    if (!problem[field]) {
      return { valid: false, missing: field };
    }
  }

  if (!["Easy", "Medium", "Hard"].includes(problem.difficulty)) {
    return { valid: false, error: "Invalid difficulty level" };
  }

  return { valid: true };
};
