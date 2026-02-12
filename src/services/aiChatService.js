import axios from "axios";

/**
 * AI Chat Assistant Service using Groq API
 * Provides intelligent assistance for interview preparation, career guidance, and technical questions
 */

const GROQ_API_KEY = import.meta.env.VITE_GROQ_API_KEY;
const GROQ_API_URL = "https://api.groq.com/openai/v1/chat/completions";

// Preferred Groq models for chat (fast and capable)
const CHAT_MODELS = [
  "llama-3.3-70b-versatile",
  "mixtral-8x7b-32768",
  "llama-3.1-8b-instant",
];

/**
 * System prompt that defines the AI assistant's personality and capabilities
 */
const SYSTEM_PROMPT = `You are NextRound AI Assistant - an expert career coach and technical interview mentor. Your role is to help users:

🎯 **Core Capabilities:**
- Prepare for technical interviews (coding, system design, behavioral)
- Review and improve resumes
- Practice Data Structures & Algorithms (DSA)
- Explain programming concepts clearly
- Provide career guidance and job search strategies
- Answer questions about companies and interview processes
- Give personalized feedback and improvement tips

💡 **Interaction Style:**
- Be friendly, encouraging, and supportive
- Provide practical, actionable advice
- Use examples and analogies to explain complex topics
- Break down problems into manageable steps
- Celebrate user progress and achievements
- Be concise but thorough

🚀 **Special Features:**
- Code review and optimization suggestions
- Mock interview practice
- Company-specific interview tips
- Salary negotiation guidance
- Career path recommendations

Always maintain a positive, professional tone while being approachable and helpful. Use emojis occasionally to keep the conversation engaging.`;

/**
 * Send a message to the AI chat assistant
 * @param {Array} conversationHistory - Array of message objects with {role, content}
 * @param {string} userMessage - The new user message
 * @returns {Promise<string>} AI assistant's response
 */
export const sendChatMessage = async (conversationHistory, userMessage) => {
  if (!GROQ_API_KEY) {
    throw new Error(
      "Groq API key not found. Please configure VITE_GROQ_API_KEY in .env file."
    );
  }

  if (!userMessage || userMessage.trim().length === 0) {
    throw new Error("Message cannot be empty");
  }

  console.log(`💬 Sending message to AI assistant`);

  // Build messages array with system prompt, history, and new message
  const messages = [
    {
      role: "system",
      content: SYSTEM_PROMPT,
    },
    ...conversationHistory,
    {
      role: "user",
      content: userMessage,
    },
  ];

  // Try multiple models
  for (const model of CHAT_MODELS) {
    try {
      console.log(`🔄 Using model: ${model}`);

      const response = await axios.post(
        GROQ_API_URL,
        {
          model: model,
          messages: messages,
          temperature: 0.7,
          max_tokens: 2000,
          top_p: 0.9,
        },
        {
          headers: {
            Authorization: `Bearer ${GROQ_API_KEY}`,
            "Content-Type": "application/json",
          },
          timeout: 30000,
        }
      );

      if (
        !response.data ||
        !response.data.choices ||
        !response.data.choices[0]
      ) {
        throw new Error("Invalid response structure from API");
      }

      const assistantMessage = response.data.choices[0].message.content;
      console.log(`✅ Response received from ${model}`);

      return assistantMessage;
    } catch (error) {
      console.warn(`Model ${model} failed:`, error.message);
      // Continue to next model
    }
  }

  throw new Error("All chat models failed. Please try again later.");
};

/**
 * Get a quick suggestion or tip (single-turn conversation)
 * @param {string} topic - Topic for the suggestion (e.g., 'interview tips', 'resume', 'coding')
 * @returns {Promise<string>} AI suggestion
 */
export const getQuickTip = async (topic) => {
  const message = `Give me a quick, practical tip about ${topic}. Keep it concise and actionable.`;
  
  try {
    const response = await sendChatMessage([], message);
    return response;
  } catch (error) {
    console.error("Error getting quick tip:", error);
    throw error;
  }
};

/**
 * Get personalized career advice based on user profile
 * @param {Object} userProfile - User profile data (role, experience, skills, etc.)
 * @returns {Promise<string>} Personalized career advice
 */
export const getCareerAdvice = async (userProfile) => {
  const message = `Based on this profile, provide personalized career advice:
  
Role: ${userProfile.role || "Not specified"}
Experience: ${userProfile.experience || "Beginner"}
Skills: ${userProfile.skills?.join(", ") || "Not specified"}
Target Companies: ${userProfile.targetCompanies?.join(", ") || "Any"}

Give specific, actionable recommendations for their career growth and interview preparation.`;

  try {
    const response = await sendChatMessage([], message);
    return response;
  } catch (error) {
    console.error("Error getting career advice:", error);
    throw error;
  }
};

/**
 * Analyze code and provide feedback
 * @param {string} code - Code snippet to analyze
 * @param {string} language - Programming language
 * @returns {Promise<string>} Code analysis and suggestions
 */
export const analyzeCode = async (code, language = "javascript") => {
  const message = `Analyze this ${language} code and provide feedback on:
1. Code quality and best practices
2. Potential bugs or issues
3. Performance optimization opportunities
4. Suggestions for improvement

\`\`\`${language}
${code}
\`\`\`

Be specific and practical in your feedback.`;

  try {
    const response = await sendChatMessage([], message);
    return response;
  } catch (error) {
    console.error("Error analyzing code:", error);
    throw error;
  }
};

/**
 * Generate mock interview questions for practice
 * @param {string} role - Job role (e.g., 'Frontend Developer', 'Data Scientist')
 * @param {string} level - Experience level ('beginner', 'intermediate', 'advanced')
 * @param {number} count - Number of questions to generate
 * @returns {Promise<string>} Mock interview questions
 */
export const generateMockInterviewQuestions = async (role, level = "intermediate", count = 5) => {
  const message = `Generate ${count} mock interview questions for a ${level} ${role} position. 

Include a mix of:
- Technical/coding questions
- Behavioral questions
- Problem-solving scenarios

For each question, briefly explain what the interviewer is looking for.`;

  try {
    const response = await sendChatMessage([], message);
    return response;
  } catch (error) {
    console.error("Error generating mock questions:", error);
    throw error;
  }
};

/**
 * Get company-specific interview tips
 * @param {string} companyName - Name of the company
 * @returns {Promise<string>} Company-specific interview advice
 */
export const getCompanyInterviewTips = async (companyName) => {
  const message = `Provide comprehensive interview tips and insights for ${companyName}:

1. Interview process overview
2. Common interview questions they ask
3. Company culture and values
4. What they look for in candidates
5. Preparation strategies specific to this company

Be as detailed and helpful as possible.`;

  try {
    const response = await sendChatMessage([], message);
    return response;
  } catch (error) {
    console.error("Error getting company tips:", error);
    throw error;
  }
};

/**
 * Explain a technical concept
 * @param {string} concept - Technical concept to explain
 * @param {string} level - Explanation depth ('beginner', 'intermediate', 'advanced')
 * @returns {Promise<string>} Detailed explanation
 */
export const explainConcept = async (concept, level = "intermediate") => {
  const message = `Explain "${concept}" at a ${level} level. 

Include:
1. Clear definition
2. Why it's important
3. Real-world examples or use cases
4. Common pitfalls or misconceptions
5. Resources for deeper learning

Make it easy to understand but comprehensive.`;

  try {
    const response = await sendChatMessage([], message);
    return response;
  } catch (error) {
    console.error("Error explaining concept:", error);
    throw error;
  }
};

/**
 * Predefined quick action prompts for common use cases
 */
export const QUICK_ACTIONS = [
  {
    id: "interview-tips",
    label: "Interview Preparation Tips",
    icon: "🎯",
    prompt: "Give me top 5 tips to ace my next technical interview.",
  },
  {
    id: "dsa-study-plan",
    label: "DSA Study Plan",
    icon: "📚",
    prompt: "Create a 30-day study plan for mastering Data Structures and Algorithms.",
  },
  {
    id: "resume-tips",
    label: "Resume Improvement",
    icon: "📄",
    prompt: "What are the key elements of a strong technical resume? Give me specific tips.",
  },
  {
    id: "behavioral-questions",
    label: "Behavioral Questions",
    icon: "💼",
    prompt: "List common behavioral interview questions and how to answer them using the STAR method.",
  },
  {
    id: "system-design",
    label: "System Design Basics",
    icon: "🏗️",
    prompt: "Explain the fundamentals of system design interviews and what topics I should focus on.",
  },
  {
    id: "salary-negotiation",
    label: "Salary Negotiation",
    icon: "💰",
    prompt: "How do I negotiate salary effectively as a software engineer? Give me strategies and phrases to use.",
  },
  {
    id: "debugging-approach",
    label: "Debugging Strategies",
    icon: "🐛",
    prompt: "What's the best approach to debugging code during a technical interview?",
  },
  {
    id: "career-path",
    label: "Career Growth Path",
    icon: "🚀",
    prompt: "What are the typical career progression paths for a software developer?",
  },
];

export default {
  sendChatMessage,
  getQuickTip,
  getCareerAdvice,
  analyzeCode,
  generateMockInterviewQuestions,
  getCompanyInterviewTips,
  explainConcept,
  QUICK_ACTIONS,
};
