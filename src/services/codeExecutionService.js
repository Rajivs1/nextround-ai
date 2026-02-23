/**
 * Code Execution Service using Judge0 CE API
 * Executes C++, Java, and other languages in a sandboxed environment
 */

const JUDGE0_API_URL = "https://judge0-ce.p.rapidapi.com";
const RAPIDAPI_KEY = "test"; // Using public test endpoint

// Language IDs for Judge0
const LANGUAGE_IDS = {
  javascript: 63, // Node.js
  cpp: 54,        // C++ (GCC 9.2.0)
  java: 62        // Java (OpenJDK 13.0.1)
};

/**
 * Execute code using Judge0 API
 * @param {string} language - Language name (javascript, cpp, java)
 * @param {string} code - Source code to execute
 * @param {string} stdin - Standard input for the program
 * @returns {Promise<Object>} Execution result
 */
export const executeCode = async (language, code, stdin = "") => {
  try {
    const languageId = LANGUAGE_IDS[language];
    
    if (!languageId) {
      throw new Error(`Unsupported language: ${language}`);
    }

    console.log("Executing code:", {
      language,
      languageId,
      codeLength: code.length,
      stdinLength: stdin.length
    });

    // Create submission
    const submissionResponse = await fetch(`${JUDGE0_API_URL}/submissions?base64_encoded=false&wait=true`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-RapidAPI-Key": RAPIDAPI_KEY,
        "X-RapidAPI-Host": "judge0-ce.p.rapidapi.com"
      },
      body: JSON.stringify({
        source_code: code,
        language_id: languageId,
        stdin: stdin,
        cpu_time_limit: 2,
        memory_limit: 128000
      }),
    });

    if (!submissionResponse.ok) {
      // If RapidAPI fails, try the public CE endpoint
      return await executeWithPublicEndpoint(language, code, stdin);
    }

    const result = await submissionResponse.json();
    console.log("Execution result:", result);

    // Check status
    const status = result.status?.id;
    
    // Status codes:
    // 3 = Accepted
    // 4 = Wrong Answer
    // 5 = Time Limit Exceeded
    // 6 = Compilation Error
    // 7-12 = Runtime Errors
    
    if (status === 6) {
      // Compilation error
      return {
        success: false,
        output: "",
        error: result.compile_output || "Compilation failed",
        exitCode: 1,
      };
    } else if (status === 3) {
      // Success
      return {
        success: true,
        output: result.stdout || "",
        error: result.stderr || "",
        exitCode: 0,
      };
    } else {
      // Runtime error or other issue
      return {
        success: false,
        output: result.stdout || "",
        error: result.stderr || result.status?.description || "Execution failed",
        exitCode: 1,
      };
    }
  } catch (error) {
    console.error("Error executing code:", error);
    // Fallback to public endpoint
    return await executeWithPublicEndpoint(language, code, stdin);
  }
};

/**
 * Fallback: Execute using public Judge0 CE endpoint
 */
const executeWithPublicEndpoint = async (language, code, stdin = "") => {
  try {
    const languageId = LANGUAGE_IDS[language];
    
    // Use public CE endpoint (no auth required)
    const submissionResponse = await fetch("https://ce.judge0.com/submissions?base64_encoded=false&wait=true", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        source_code: code,
        language_id: languageId,
        stdin: stdin,
        cpu_time_limit: 2,
        memory_limit: 128000
      }),
    });

    if (!submissionResponse.ok) {
      throw new Error(`HTTP error! status: ${submissionResponse.status}`);
    }

    const result = await submissionResponse.json();
    console.log("Public endpoint result:", result);

    const status = result.status?.id;
    
    if (status === 6) {
      return {
        success: false,
        output: "",
        error: result.compile_output || "Compilation failed",
        exitCode: 1,
      };
    } else if (status === 3) {
      return {
        success: true,
        output: result.stdout || "",
        error: result.stderr || "",
        exitCode: 0,
      };
    } else {
      return {
        success: false,
        output: result.stdout || "",
        error: result.stderr || result.status?.description || "Execution failed",
        exitCode: 1,
      };
    }
  } catch (error) {
    console.error("Public endpoint error:", error);
    return {
      success: false,
      output: "",
      error: `Execution service unavailable: ${error.message}`,
      exitCode: 1,
    };
  }
};

/**
 * Get list of available runtimes
 */
export const getRuntimes = async () => {
  try {
    const response = await fetch("https://ce.judge0.com/languages");
    return await response.json();
  } catch (error) {
    console.error("Error fetching runtimes:", error);
    return [];
  }
};

/**
 * Execute code with test case
 * @param {string} language - Language name
 * @param {string} code - Source code
 * @param {string} input - Test input
 * @param {string} expectedOutput - Expected output
 * @returns {Promise<Object>} Test result
 */
export const executeTestCase = async (language, code, input, expectedOutput) => {
  try {
    const result = await executeCode(language, code, input);

    if (!result.success) {
      return {
        passed: false,
        actual: result.error || "Execution failed",
        expected: expectedOutput,
        error: result.error,
      };
    }

    // Normalize output for comparison (trim whitespace)
    const actualOutput = result.output.trim();
    const expected = expectedOutput.trim();

    return {
      passed: actualOutput === expected,
      actual: actualOutput,
      expected: expected,
      error: result.error,
    };
  } catch (error) {
    return {
      passed: false,
      actual: "",
      expected: expectedOutput,
      error: error.message,
    };
  }
};

export default {
  getRuntimes,
  executeCode,
  executeTestCase,
};
