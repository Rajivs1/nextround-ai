import axios from "axios";

/**
 * AI-Powered MCQ Generator using Groq API
 * Generates dynamic multiple-choice questions for different roles and topics
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
 * Generate MCQ questions using Groq AI
 * @param {string} role - The role/domain (e.g., 'developer', 'hr', 'dataAnalyst')
 * @param {string} topic - Specific topic (optional, e.g., 'JavaScript', 'Arrays', 'SQL Joins')
 * @param {number} count - Number of questions to generate (default: 10)
 * @param {string} difficulty - Difficulty level: 'easy', 'medium', 'hard', or 'mixed' (default: 'mixed')
 * @returns {Promise<Array>} Array of MCQ questions
 */
export const generateMCQQuestions = async (
  role,
  topic = null,
  count = 10,
  difficulty = "mixed"
) => {
  if (!GROQ_API_KEY) {
    throw new Error(
      "Groq API key not found. Please configure VITE_GROQ_API_KEY in .env file."
    );
  }

  console.log(`🤖 Generating ${count} MCQ questions for ${role}${topic ? ` - ${topic}` : ""}`);

  // Build the prompt
  const prompt = buildPrompt(role, topic, count, difficulty);

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
          temperature: 0.7, // Slightly higher for creative question generation
          max_tokens: 8000,
        },
        {
          headers: {
            Authorization: `Bearer ${GROQ_API_KEY}`,
            "Content-Type": "application/json",
          },
          timeout: 60000,
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
      console.log(`✅ Questions generated with ${model}`);

      // Parse and validate the response
      const questions = parseQuestions(content);

      if (questions.length > 0) {
        return questions;
      } else {
        throw new Error("No valid questions parsed from AI response");
      }
    } catch (error) {
      console.warn(`Model ${model} failed:`, error.message);
      // Continue to next model
    }
  }

  throw new Error("All Groq models failed to generate questions");
};

/**
 * Build the prompt for AI to generate MCQ questions
 */
const buildPrompt = (role, topic, count, difficulty) => {
  const roleDescriptions = {
    developer:
      "Software Developer with focus on programming concepts, algorithms, data structures, and code snippets in JavaScript, C++, and general programming",
    frontendDeveloper:
      "Frontend Developer with focus on HTML, CSS, JavaScript, React, Vue, Angular, and modern web development",
    hr: "Human Resources Professional with focus on recruitment, employee management, workplace policies, and HR best practices",
    dataAnalyst:
      "Data Analyst with focus on statistics, data visualization, SQL, Python, data processing, and analytics",
    sqlDeveloper:
      "SQL Developer with focus on database design, queries, optimization, stored procedures, and database management",
    backendDeveloper:
      "Backend Developer with focus on server-side programming, APIs, databases, security, and system architecture",
    devops:
      "DevOps Engineer with focus on CI/CD, containerization, cloud platforms, automation, and infrastructure",
    cybersecurity:
      "Cybersecurity Specialist with focus on security principles, threat detection, encryption, and best practices",
  };

  const roleDesc =
    roleDescriptions[role] || "General technical and professional knowledge";
  const topicText = topic ? ` specifically about ${topic}` : "";
  const difficultyText =
    difficulty === "mixed"
      ? "Mix difficulty levels: some easy, some medium, some hard."
      : `All questions should be ${difficulty} difficulty.`;

  return `Generate exactly ${count} multiple-choice questions for a ${roleDesc}${topicText}.

CRITICAL REQUIREMENTS:
1. Return ONLY a JSON array, no other text
2. Each question must have exactly 4 options
3. ${difficultyText}
4. Include code snippets where appropriate (use proper formatting)
5. Make questions practical and interview-relevant
6. Ensure correct answers are accurate and options are plausible

JSON FORMAT (return ONLY this structure):
[
  {
    "id": 1,
    "question": "Clear, specific question text",
    "options": ["Option A", "Option B", "Option C", "Option D"],
    "correct": 0,
    "difficulty": "easy"
  }
]

GUIDELINES:
- For code questions, use proper markdown: \`\`\`language\\ncode\\n\`\`\`
- Make distractors (wrong answers) plausible but clearly wrong
- Vary question types: conceptual, code output, best practices, definitions
- Difficulty: easy (basic concepts), medium (application), hard (advanced/tricky)
- correct index: 0 for first option, 1 for second, 2 for third, 3 for fourth

Generate ${count} high-quality MCQ questions now. Return ONLY the JSON array.`;
};

/**
 * Parse AI response and extract questions
 */
const parseQuestions = (content) => {
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
    const questions = JSON.parse(jsonText);

    // Validate questions
    if (!Array.isArray(questions)) {
      throw new Error("Response is not an array");
    }

    // Filter and validate each question
    const validQuestions = questions.filter((q) => {
      return (
        q.question &&
        Array.isArray(q.options) &&
        q.options.length === 4 &&
        typeof q.correct === "number" &&
        q.correct >= 0 &&
        q.correct < 4 &&
        q.difficulty
      );
    });

    console.log(`✅ Parsed ${validQuestions.length} valid questions`);
    return validQuestions;
  } catch (error) {
    console.error("❌ Failed to parse questions:", error.message);
    return [];
  }
};

/**
 * Generate questions for a specific programming topic
 * @param {string} topic - Programming topic (e.g., 'Arrays', 'Strings', 'Recursion')
 * @param {number} count - Number of questions
 * @param {string} difficulty - Difficulty level
 * @returns {Promise<Array>} Array of MCQ questions
 */
export const generateProgrammingQuestions = async (
  topic,
  count = 10,
  difficulty = "mixed"
) => {
  return generateMCQQuestions("developer", topic, count, difficulty);
};

/**
 * Generate interview questions for a specific role
 * @param {string} role - Job role
 * @param {number} count - Number of questions
 * @returns {Promise<Array>} Array of MCQ questions
 */
export const generateInterviewQuestions = async (role, count = 25) => {
  return generateMCQQuestions(role, null, count, "mixed");
};

/**
 * Get a quick batch of questions (uses cache if available)
 */
const questionCache = new Map();

export const getQuickQuestions = async (
  role,
  topic = null,
  count = 10,
  useCache = true
) => {
  const cacheKey = `${role}-${topic || "general"}-${count}`;

  if (useCache && questionCache.has(cacheKey)) {
    console.log("📦 Using cached questions");
    return questionCache.get(cacheKey);
  }

  const questions = await generateMCQQuestions(role, topic, count, "mixed");
  questionCache.set(cacheKey, questions);

  // Clear cache after 5 minutes
  setTimeout(() => {
    questionCache.delete(cacheKey);
  }, 5 * 60 * 1000);

  return questions;
};

/**
 * Clear the question cache
 */
export const clearQuestionCache = () => {
  questionCache.clear();
  console.log("🗑️ Question cache cleared");
};
