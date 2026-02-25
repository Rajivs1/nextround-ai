import { useState, useEffect, useCallback } from 'react';
import Editor from '@monaco-editor/react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { arrayQuestions } from '../data/questions/arrays';
import { stringQuestions } from '../data/questions/strings';
import { stackQuestions } from '../data/questions/stack';
import { queueQuestions } from '../data/questions/queue';
import { linkedListQuestions } from '../data/questions/linkedlist';
import { recursionQuestions } from '../data/questions/recursion';
import { patternQuestions } from '../data/questions/patterns';
import { functionQuestions } from '../data/questions/functions';
import { useAuth } from '../context/AuthContext';
import { doc, updateDoc, getDoc } from 'firebase/firestore';
import { db } from '../firebase';
import { updateUserStreak } from '../utils/streakUtils';

// Modern Modal Component
const Modal = ({ isOpen, onClose, type = 'info', title, message, details }) => {
  if (!isOpen) return null;

  const getIcon = () => {
    switch (type) {
      case 'success':
        return '✅';
      case 'error':
        return '❌';
      case 'warning':
        return '⚠️';
      default:
        return 'ℹ️';
    }
  };

  const getColors = () => {
    switch (type) {
      case 'success':
        return {
          border: 'border-[#00b8a3]',
          bg: 'bg-[#00b8a3]/10',
          text: 'text-[#00b8a3]',
          button: 'bg-[#00b8a3] hover:bg-[#00a08f]'
        };
      case 'error':
        return {
          border: 'border-[#ef4743]',
          bg: 'bg-[#ef4743]/10',
          text: 'text-[#ef4743]',
          button: 'bg-[#ef4743] hover:bg-[#d63d3a]'
        };
      case 'warning':
        return {
          border: 'border-[#ffc01e]',
          bg: 'bg-[#ffc01e]/10',
          text: 'text-[#ffc01e]',
          button: 'bg-[#ffc01e] hover:bg-[#e6ac1b] text-[#1a1a1a]'
        };
      default:
        return {
          border: 'border-gray-800',
          bg: 'bg-[#2d2d2d]',
          text: 'text-white',
          button: 'bg-[#3a3a3a] hover:bg-[#4a4a4a]'
        };
    }
  };

  const colors = getColors();

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn">
      <div className="bg-black/90 rounded-2xl border-2 border-gray-800 shadow-2xl max-w-lg w-full overflow-hidden animate-slideUp">
        {/* Header */}
        <div className={`${colors.bg} border-b-2 ${colors.border} p-6`}>
          <div className="flex items-center gap-4">
            <div className="text-5xl">{getIcon()}</div>
            <h2 className={`text-2xl font-bold ${colors.text}`}>{title}</h2>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 space-y-4">
          <p className="text-[#eff1f6bf] text-base leading-relaxed whitespace-pre-line">
            {message}
          </p>

          {details && (
            <div className={`${colors.bg} rounded-lg p-4 border ${colors.border}`}>
              <pre className="text-sm font-mono text-white whitespace-pre-wrap">
                {details}
              </pre>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-6 bg-black/90 border-t border-gray-800 flex justify-end gap-3">
          <button
            onClick={onClose}
            className={`px-6 py-3 rounded-lg font-semibold text-white transition-all duration-200 ${colors.button}`}
          >
            Got it!
          </button>
        </div>
      </div>
    </div>
  );
};

const TOPICS = [
  { id: 'arrays', name: 'Arrays', icon: '📊', questions: arrayQuestions },
  { id: 'strings', name: 'Strings', icon: '📝', questions: stringQuestions },
  { id: 'stack', name: 'Stack', icon: '📚', questions: stackQuestions },
  { id: 'queue', name: 'Queue', icon: '🎯', questions: queueQuestions },
  { id: 'linkedlist', name: 'Linked List', icon: '🔗', questions: linkedListQuestions },
  { id: 'recursion', name: 'Recursion', icon: '🔄', questions: recursionQuestions },
  { id: 'patterns', name: 'Patterns', icon: '🎨', questions: patternQuestions },
  { id: 'functions', name: 'Functions', icon: '⚡', questions: functionQuestions }
];

const LANGUAGES = [
  { id: 'javascript', name: 'JavaScript', icon: '🟨', extension: 'js' },
  { id: 'cpp', name: 'C++', icon: '🔵', extension: 'cpp' },
  { id: 'java', name: 'Java', icon: '☕', extension: 'java' }
];

function Practice() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [searchParams] = useSearchParams();
  const topicId = searchParams.get('topic');
  const questionId = parseInt(searchParams.get('question'));
  const [selectedLanguage, setSelectedLanguage] = useState('javascript');
  const [code, setCode] = useState('');
  const [consoleOutput, setConsoleOutput] = useState([]);
  const [isRunning, setIsRunning] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [activeTab, setActiveTab] = useState('description');
  const [modal, setModal] = useState({ isOpen: false, type: 'info', title: '', message: '', details: '' });
  const currentTopic = TOPICS.find(t => t.id === topicId);
  const currentQuestion = currentTopic?.questions.find(q => q.id === questionId);
  
  // Use first 3 testcases as visible, rest as hidden
  const visibleTestCases = currentQuestion?.testCases?.slice(0, 3) || [];
  const allTestCases = currentQuestion?.testCases || [];

  // Helper function to show modal
  const showModal = (type, title, message, details = '') => {
    setModal({ isOpen: true, type, title, message, details });
  };

  const closeModal = () => {
    setModal({ isOpen: false, type: 'info', title: '', message: '', details: '' });
  };

  const getStarterCode = useCallback((language) => {
    if (!currentQuestion) return '// Write your solution here\n';
    
    if (language === 'javascript') {
      return currentQuestion.starterCode || '// Write your solution here\n';
    } else if (language === 'cpp') {
      // Just the function signature for C++ (like LeetCode)
      const functionMatch = currentQuestion.starterCode?.match(/function\s+(\w+)\s*\(([^)]*)\)/);
      if (functionMatch) {
        const funcName = functionMatch[1];
        // Return only the function signature
        return `class Solution {\npublic:\n    vector<int> ${funcName}(vector<int>& nums, int target) {\n        // Write your code here\n        \n    }\n};`;
      }
      return `class Solution {\npublic:\n    // Write your solution here\n    \n};`;
    } else if (language === 'java') {
      // Just the method signature for Java (like LeetCode)
      const functionMatch = currentQuestion.starterCode?.match(/function\s+(\w+)\s*\(([^)]*)\)/);
      if (functionMatch) {
        const funcName = functionMatch[1];
        return `class Solution {\n    public int[] ${funcName}(int[] nums, int target) {\n        // Write your code here\n        \n    }\n}`;
      }
      return `class Solution {\n    // Write your solution here\n    \n}`;
    }
    return '// Write your solution here\n';
  }, [currentQuestion]);

  useEffect(() => {
    if (!topicId || !questionId || !currentTopic || !currentQuestion) {
      navigate('/problems');
      return;
    }
    setCode(getStarterCode(selectedLanguage));
    setConsoleOutput([]);
  }, [topicId, questionId, currentQuestion, currentTopic, navigate, selectedLanguage, getStarterCode]);

  // Run visible test cases (like LeetCode's "Run" button)
  const handleRunCode = async () => {
    if (!currentQuestion.testCases || visibleTestCases.length === 0) {
      showModal('warning', 'No Test Cases', 'No test cases available for this question.');
      return;
    }

    setIsRunning(true);
    const results = [];

    for (let i = 0; i < visibleTestCases.length; i++) {
      const testCase = visibleTestCases[i];
      
      await new Promise(resolve => setTimeout(resolve, 200));

      try {
        if (selectedLanguage === 'javascript') {
          // JavaScript execution
          const fullCode = `
            ${code}
            
            // Test execution
            const testInput = ${JSON.stringify(testCase.input)};
            const result = (() => {
              ${extractFunctionCall(currentQuestion.starterCode, testCase.input)}
            })();
            result;
          `;

          // eslint-disable-next-line no-eval
          const result = eval(fullCode);
          const passed = JSON.stringify(result) === JSON.stringify(testCase.expected);
          
          results.push({
            caseNumber: i + 1,
            input: testCase.input,
            expected: testCase.expected,
            output: result,
            passed,
            error: null
          });
        } else {
          // C++ and Java execution via Piston API
          const languageMap = {
            cpp: 'cpp',
            java: 'java'
          };

          // Wrap user's code with test harness
          let fullCode = '';
          if (selectedLanguage === 'cpp') {
            fullCode = `#include <iostream>
#include <vector>
#include <string>
#include <algorithm>
using namespace std;

${code}

int main() {
    Solution sol;
    // Test input
    ${generateCppTestCode(testCase)}
    return 0;
}`;
          } else if (selectedLanguage === 'java') {
            fullCode = `import java.util.*;
import java.util.stream.*;

${code}

class Main {
    public static void main(String[] args) {
        Solution sol = new Solution();
        // Test input
        ${generateJavaTestCode(testCase)}
    }
}`;
          }

          const response = await fetch('https://emkc.org/api/v2/piston/execute', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              language: languageMap[selectedLanguage],
              version: '*',
              files: [{
                name: selectedLanguage === 'java' ? 'Main.java' : 'main.cpp',
                content: fullCode
              }]
            })
          });

          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }

          const apiResult = await response.json();
          
          if (apiResult.compile && apiResult.compile.stderr) {
            throw new Error(apiResult.compile.stderr);
          }
          
          let output = apiResult.run?.stdout?.trim() || '';
          
          if (apiResult.run?.stderr) {
            throw new Error(apiResult.run.stderr);
          }

          // Try to parse output and compare
          let parsedOutput;
          try {
            parsedOutput = JSON.parse(output);
          } catch {
            parsedOutput = output;
          }

          const passed = JSON.stringify(parsedOutput) === JSON.stringify(testCase.expected);
          
          results.push({
            caseNumber: i + 1,
            input: testCase.input,
            expected: testCase.expected,
            output: parsedOutput,
            passed,
            error: null
          });
        }

      } catch (error) {
        results.push({
          caseNumber: i + 1,
          input: testCase.input,
          expected: testCase.expected,
          output: null,
          passed: false,
          error: error.message
        });
      }
    }

    setIsRunning(false);
    setConsoleOutput(results);
  };

  // Helper function to extract function call
  const extractFunctionCall = (starterCode, input) => {
    const functionNameMatch = starterCode.match(/function\s+(\w+)/);
    const functionName = functionNameMatch ? functionNameMatch[1] : null;
    
    if (!functionName) {
      throw new Error('Could not determine function name');
    }

    // Handle array input vs multiple arguments
    if (Array.isArray(input)) {
      return `return ${functionName}(...testInput);`;
    } else {
      return `return ${functionName}(testInput);`;
    }
  };

  // Generate C++ test code
  const generateCppTestCode = (testCase) => {
    const input = testCase.input;
    const functionNameMatch = currentQuestion.starterCode?.match(/function\s+(\w+)/);
    const functionName = functionNameMatch ? functionNameMatch[1] : 'solution';
    const expected = testCase.expected;
    
    // Helper to determine C++ type based on value
    const getCppType = (value) => {
      if (typeof value === 'boolean') return 'bool';
      if (typeof value === 'number') return Number.isInteger(value) ? 'int' : 'double';
      if (typeof value === 'string') return 'string';
      if (Array.isArray(value)) {
        if (value.length === 0) return 'vector<int>';
        if (typeof value[0] === 'number') return 'vector<int>';
        if (typeof value[0] === 'string') return 'vector<string>';
        if (Array.isArray(value[0])) return 'vector<vector<int>>';
      }
      return 'auto';
    };

    // Helper to format C++ value
    const formatCppValue = (value) => {
      if (typeof value === 'boolean') return value ? 'true' : 'false';
      if (typeof value === 'number') return value.toString();
      if (typeof value === 'string') return `"${value}"`;
      if (Array.isArray(value)) {
        if (value.length === 0) return '{}';
        if (Array.isArray(value[0])) {
          // 2D array
          return `{${value.map(row => `{${row.join(', ')}}`).join(', ')}}`;
        }
        // 1D array
        return `{${value.join(', ')}}`;
      }
      return 'null';
    };

    // Helper to print C++ result
    const getCppPrintCode = (type, varName = 'result') => {
      if (type === 'bool') return `cout << (${varName} ? "true" : "false") << endl;`;
      if (type === 'int' || type === 'double') return `cout << ${varName} << endl;`;
      if (type === 'string') return `cout << ${varName} << endl;`;
      if (type.startsWith('vector<vector')) {
        return `cout << "[";
    for(int i = 0; i < ${varName}.size(); i++) {
        cout << "[";
        for(int j = 0; j < ${varName}[i].size(); j++) {
            cout << ${varName}[i][j];
            if(j < ${varName}[i].size()-1) cout << ",";
        }
        cout << "]";
        if(i < ${varName}.size()-1) cout << ",";
    }
    cout << "]" << endl;`;
      }
      if (type.startsWith('vector')) {
        return `cout << "[";
    for(int i = 0; i < ${varName}.size(); i++) {
        cout << ${varName}[i];
        if(i < ${varName}.size()-1) cout << ",";
    }
    cout << "]" << endl;`;
      }
      return `cout << ${varName} << endl;`;
    };

    try {
      const resultType = getCppType(expected);
      let code = '';

      // Handle different input patterns
      if (!Array.isArray(input)) {
        // Single primitive value
        const inputType = getCppType(input);
        code = `${inputType} input = ${formatCppValue(input)};
    ${resultType} result = sol.${functionName}(input);
    ${getCppPrintCode(resultType)}`;
      } else if (input.length === 1) {
        // Single parameter (string, array, etc.)
        const param = input[0];
        const paramType = getCppType(param);
        code = `${paramType} input = ${formatCppValue(param)};
    ${resultType} result = sol.${functionName}(input);
    ${getCppPrintCode(resultType)}`;
      } else if (input.length === 2) {
        // Two parameters
        const param1 = input[0];
        const param2 = input[1];
        const type1 = getCppType(param1);
        const type2 = getCppType(param2);
        code = `${type1} param1 = ${formatCppValue(param1)};
    ${type2} param2 = ${formatCppValue(param2)};
    ${resultType} result = sol.${functionName}(param1, param2);
    ${getCppPrintCode(resultType)}`;
      } else if (input.length === 3) {
        // Three parameters
        const param1 = input[0];
        const param2 = input[1];
        const param3 = input[2];
        const type1 = getCppType(param1);
        const type2 = getCppType(param2);
        const type3 = getCppType(param3);
        code = `${type1} param1 = ${formatCppValue(param1)};
    ${type2} param2 = ${formatCppValue(param2)};
    ${type3} param3 = ${formatCppValue(param3)};
    ${resultType} result = sol.${functionName}(param1, param2, param3);
    ${getCppPrintCode(resultType)}`;
      } else {
        code = '// Test code generation not supported for this input format';
      }

      return code;
    } catch (error) {
      console.error('C++ test code generation error:', error);
      return '// Error generating test code';
    }
  };

  // Generate Java test code
  const generateJavaTestCode = (testCase) => {
    const input = testCase.input;
    const functionNameMatch = currentQuestion.starterCode?.match(/function\s+(\w+)/);
    const functionName = functionNameMatch ? functionNameMatch[1] : 'solution';
    const expected = testCase.expected;
    
    // Helper to determine Java type based on value
    const getJavaType = (value) => {
      if (typeof value === 'boolean') return 'boolean';
      if (typeof value === 'number') return Number.isInteger(value) ? 'int' : 'double';
      if (typeof value === 'string') return 'String';
      if (Array.isArray(value)) {
        if (value.length === 0) return 'int[]';
        if (typeof value[0] === 'number') return 'int[]';
        if (typeof value[0] === 'string') return 'String[]';
        if (Array.isArray(value[0])) return 'int[][]';
      }
      return 'Object';
    };

    // Helper to format Java value
    const formatJavaValue = (value) => {
      if (typeof value === 'boolean') return value ? 'true' : 'false';
      if (typeof value === 'number') return value.toString();
      if (typeof value === 'string') return `"${value}"`;
      if (Array.isArray(value)) {
        if (value.length === 0) return '{}';
        if (Array.isArray(value[0])) {
          // 2D array
          return `{{${value.map(row => row.join(', ')).join('}, {')}}}`;
        }
        // 1D array
        return `{${value.join(', ')}}`;
      }
      return 'null';
    };

    // Helper to print Java result
    const getJavaPrintCode = (type, varName = 'result') => {
      if (type === 'boolean' || type === 'int' || type === 'double') {
        return `System.out.println(${varName});`;
      }
      if (type === 'String') {
        return `System.out.println(${varName});`;
      }
      if (type === 'int[][]') {
        return `System.out.print("[");
        for(int i = 0; i < ${varName}.length; i++) {
            System.out.print("[");
            for(int j = 0; j < ${varName}[i].length; j++) {
                System.out.print(${varName}[i][j]);
                if(j < ${varName}[i].length-1) System.out.print(",");
            }
            System.out.print("]");
            if(i < ${varName}.length-1) System.out.print(",");
        }
        System.out.println("]");`;
      }
      if (type === 'int[]' || type === 'String[]') {
        return `System.out.print("[");
        for(int i = 0; i < ${varName}.length; i++) {
            System.out.print(${varName}[i]);
            if(i < ${varName}.length-1) System.out.print(",");
        }
        System.out.println("]");`;
      }
      return `System.out.println(${varName});`;
    };

    try {
      const resultType = getJavaType(expected);
      let code = '';

      // Handle different input patterns
      if (!Array.isArray(input)) {
        // Single primitive value
        const inputType = getJavaType(input);
        code = `${inputType} input = ${formatJavaValue(input)};
        ${resultType} result = sol.${functionName}(input);
        ${getJavaPrintCode(resultType)}`;
      } else if (input.length === 1) {
        // Single parameter (string, array, etc.)
        const param = input[0];
        const paramType = getJavaType(param);
        code = `${paramType} input = ${formatJavaValue(param)};
        ${resultType} result = sol.${functionName}(input);
        ${getJavaPrintCode(resultType)}`;
      } else if (input.length === 2) {
        // Two parameters
        const param1 = input[0];
        const param2 = input[1];
        const type1 = getJavaType(param1);
        const type2 = getJavaType(param2);
        code = `${type1} param1 = ${formatJavaValue(param1)};
        ${type2} param2 = ${formatJavaValue(param2)};
        ${resultType} result = sol.${functionName}(param1, param2);
        ${getJavaPrintCode(resultType)}`;
      } else if (input.length === 3) {
        // Three parameters
        const param1 = input[0];
        const param2 = input[1];
        const param3 = input[2];
        const type1 = getJavaType(param1);
        const type2 = getJavaType(param2);
        const type3 = getJavaType(param3);
        code = `${type1} param1 = ${formatJavaValue(param1)};
        ${type2} param2 = ${formatJavaValue(param2)};
        ${type3} param3 = ${formatJavaValue(param3)};
        ${resultType} result = sol.${functionName}(param1, param2, param3);
        ${getJavaPrintCode(resultType)}`;
      } else {
        code = '// Test code generation not supported for this input format';
      }

      return code;
    } catch (error) {
      console.error('Java test code generation error:', error);
      return '// Error generating test code';
    }
  };

  // Submit solution (runs ALL test cases including hidden ones)
  const handleSubmitSolution = async () => {
    if (!user) {
      showModal('warning', 'Login Required', 'Please login to save your solution.');
      return;
    }

    if (!code.trim()) {
      showModal('warning', 'Empty Code', 'Please write some code before submitting.');
      return;
    }

    setIsSaving(true);

    try {
      // Only run tests if test cases exist
      if (allTestCases.length > 0) {
        const results = [];

        for (let i = 0; i < allTestCases.length; i++) {
          const testCase = allTestCases[i];
          
          try {
            if (selectedLanguage === 'javascript') {
              const fullCode = `
                ${code}
                
                const testInput = ${JSON.stringify(testCase.input)};
                const result = (() => {
                  ${extractFunctionCall(currentQuestion.starterCode, testCase.input)}
                })();
                result;
              `;

              // eslint-disable-next-line no-eval
              const result = eval(fullCode);
              const passed = JSON.stringify(result) === JSON.stringify(testCase.expected);
              
              results.push({ passed, output: result });
            } else {
              // C++ and Java execution
              const languageMap = { cpp: 'cpp', java: 'java' };

              // Wrap user's code with test harness
              let fullCode = '';
              if (selectedLanguage === 'cpp') {
                fullCode = `#include <iostream>
#include <vector>
#include <string>
#include <algorithm>
using namespace std;

${code}

int main() {
    Solution sol;
    ${generateCppTestCode(testCase)}
    return 0;
}`;
              } else if (selectedLanguage === 'java') {
                fullCode = `import java.util.*;
import java.util.stream.*;

${code}

class Main {
    public static void main(String[] args) {
        Solution sol = new Solution();
        ${generateJavaTestCode(testCase)}
    }
}`;
              }

              const response = await fetch('https://emkc.org/api/v2/piston/execute', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                  language: languageMap[selectedLanguage],
                  version: '*',
                  files: [{
                    name: selectedLanguage === 'java' ? 'Main.java' : 'main.cpp',
                    content: fullCode
                  }]
                })
              });

              const apiResult = await response.json();
              
              if (apiResult.compile?.stderr || apiResult.run?.stderr) {
                throw new Error(apiResult.compile?.stderr || apiResult.run?.stderr);
              }

              let output = apiResult.run?.stdout?.trim() || '';
              let parsedOutput;
              try {
                parsedOutput = JSON.parse(output);
              } catch {
                parsedOutput = output;
              }

              const passed = JSON.stringify(parsedOutput) === JSON.stringify(testCase.expected);
              results.push({ passed, output: parsedOutput });
            }

          } catch (error) {
            results.push({ passed: false, error: error.message });
          }
        }

        const failedCount = results.filter(r => !r.passed).length;
        
        if (failedCount > 0) {
          setIsSaving(false);
          
          // Find first failing test case and show details
          const firstFailure = results.findIndex(r => !r.passed);
          const failedTest = results[firstFailure];
          const failedTestCase = allTestCases[firstFailure];
          
          let message = `${failedCount} out of ${allTestCases.length} test cases failed.`;
          
          let details = `Test Case ${firstFailure + 1}:\n`;
          details += `Input: ${JSON.stringify(failedTestCase.input)}\n`;
          details += `Expected: ${JSON.stringify(failedTestCase.expected)}\n`;
          details += `Your Output: ${failedTest.output !== null && failedTest.output !== undefined ? JSON.stringify(failedTest.output) : 'null'}`;
          
          if (failedTest.error) {
            details += `\n\nError: ${failedTest.error}`;
          }
          
          if (firstFailure >= visibleTestCases.length) {
            message += `\n\n💡 This is a hidden test case - think about edge cases!`;
          }
          
          showModal('error', 'Wrong Answer', message, details);
          return;
        }
      }

      // Save solution
      const solution = {
        questionId: currentQuestion.id,
        questionTitle: currentQuestion.title,
        topic: topicId,
        topicName: currentTopic.name,
        language: selectedLanguage,
        code: code,
        solvedAt: new Date().toISOString()
      };

      const userDoc = await getDoc(doc(db, 'users', user.uid));
      const existingSolutions = userDoc.data()?.solvedQuestions || [];
      
      const filteredSolutions = existingSolutions.filter(
        s => !(s.questionId === solution.questionId && s.language === solution.language && s.topic === solution.topic)
      );

      // Check if this is a new problem (not just re-solving in same language)
      const isNewProblem = !existingSolutions.some(
        s => s.questionId === solution.questionId && s.topic === solution.topic
      );

      // Update user document with solution and total problems count
      const updateData = {
        solvedQuestions: [...filteredSolutions, solution]
      };

      // Increment totalProblemsSolved if this is a new problem
      if (isNewProblem) {
        const currentTotal = userDoc.data()?.totalProblemsSolved || 0;
        updateData.totalProblemsSolved = currentTotal + 1;
      }

      await updateDoc(doc(db, 'users', user.uid), updateData);

      // Update streak
      try {
        const streakData = await updateUserStreak(user.uid);
        if (streakData.streakIncreased) {
          showModal('success', 'Accepted', `All test cases passed!\n\n🔥 Streak: ${streakData.currentStreak} day${streakData.currentStreak > 1 ? 's' : ''}!\n\nYour solution has been saved successfully.`);
        } else {
          showModal('success', 'Accepted', 'All test cases passed!\n\nYour solution has been saved successfully.');
        }
      } catch (streakError) {
        console.error('Error updating streak:', streakError);
        showModal('success', 'Accepted', 'All test cases passed!\n\nYour solution has been saved successfully.');
      }

      setIsSaving(false);
    } catch (error) {
      console.error('Error saving solution:', error);
      setIsSaving(false);
      showModal('error', 'Save Failed', 'Failed to save solution. Please try again.');
    }
  };

  if (!currentTopic || !currentQuestion) return null;

  const passedCount = consoleOutput.filter(r => r.passed).length;
  const totalRun = consoleOutput.length;

  return (
    <div className="h-screen flex flex-col bg-black">
      {/* Header */}
      <div className="bg-black/90 border-b border-gray-800 px-4 sm:px-6 py-3">
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-3 flex-1 min-w-0">
            <button 
              onClick={() => navigate('/problems')} 
              className="w-9 h-9 rounded-lg bg-[#3a3a3a] hover:bg-[#4a4a4a] flex items-center justify-center text-[#eff1f6bf] transition-colors"
            >
              ←
            </button>
            <div className="flex items-center gap-3 min-w-0">
              <span className="text-xl flex-shrink-0">{currentTopic.icon}</span>
              <div className="min-w-0">
                <h1 className="text-base font-semibold text-white truncate">{currentQuestion.title}</h1>
                <div className="flex items-center gap-2 text-xs">
                  <span className="text-[#eff1f6bf] hidden sm:inline">{currentTopic.name}</span>
                  <span className="text-gray-600 hidden sm:inline">•</span>
                  <span className={`px-2 py-0.5 rounded text-xs font-medium ${
                    currentQuestion.difficulty === 'Easy' ? 'text-[#00b8a3] bg-[#00b8a3]/10' :
                    currentQuestion.difficulty === 'Medium' ? 'text-[#ffc01e] bg-[#ffc01e]/10' :
                    'text-[#ef4743] bg-[#ef4743]/10'
                  }`}>
                    {currentQuestion.difficulty}
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div className="flex gap-2">
            <button 
              onClick={handleRunCode} 
              disabled={isRunning || !currentQuestion.testCases || visibleTestCases.length === 0}
              className={`px-4 sm:px-6 py-2 rounded-lg font-medium text-sm transition-colors ${
                isRunning || !currentQuestion.testCases || visibleTestCases.length === 0
                  ? 'bg-[#3a3a3a] text-gray-500 cursor-not-allowed' 
                  : 'bg-[#2d2d2d] hover:bg-[#3a3a3a] text-white border border-gray-800'
              }`}
            >
              {isRunning ? 'Running...' : 'Run'}
            </button>
            <button 
              onClick={handleSubmitSolution} 
              disabled={isSaving}
              className={`px-4 sm:px-6 py-2 rounded-lg font-medium text-sm transition-colors ${
                isSaving
                  ? 'bg-[#3a3a3a] text-gray-500 cursor-not-allowed' 
                  : 'bg-[#2cbb5d] hover:bg-[#2fa954] text-white'
              }`}
            >
              {isSaving ? 'Submitting...' : 'Submit'}
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col lg:flex-row overflow-hidden">
        {/* Left Panel */}
        <div className="w-full lg:w-[45%] bg-black/90 border-b lg:border-b-0 lg:border-r border-gray-800 overflow-y-auto max-h-[40vh] lg:max-h-none">
          {/* Tabs */}
          <div className="flex border-b border-gray-800 bg-black/90">
            <button
              onClick={() => setActiveTab('description')}
              className={`px-6 py-3 text-sm font-medium transition-colors relative ${
                activeTab === 'description' ? 'text-white' : 'text-[#eff1f6bf] hover:text-white'
              }`}
            >
              Description
              {activeTab === 'description' && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-white"></div>
              )}
            </button>
            <button
              onClick={() => setActiveTab('result')}
              className={`px-6 py-3 text-sm font-medium transition-colors relative ${
                activeTab === 'result' ? 'text-white' : 'text-[#eff1f6bf] hover:text-white'
              }`}
            >
              Result
              {activeTab === 'result' && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-white"></div>
              )}
            </button>
          </div>

          {/* Description Tab */}
          {activeTab === 'description' && (
            <div className="p-6 space-y-6">
              <div className="text-[#eff1f6bf] text-base leading-relaxed whitespace-pre-line">
                {currentQuestion.description}
              </div>

              <div>
                <div className="text-white font-semibold mb-3">Example 1:</div>
                <div className="bg-[#2d2d2d] rounded-lg p-4 border border-gray-800">
                  <div className="font-mono text-sm space-y-2">
                    <div>
                      <span className="text-[#eff1f6bf] font-semibold">Input:</span>
                      <span className="text-white ml-2">
                        {currentQuestion.example.split('\n')[0].replace('Input: ', '')}
                      </span>
                    </div>
                    <div>
                      <span className="text-[#eff1f6bf] font-semibold">Output:</span>
                      <span className="text-white ml-2">
                        {currentQuestion.example.split('\n')[1].replace('Output: ', '')}
                      </span>
                    </div>
                    {currentQuestion.example.split('\n')[2] && (
                      <div className="pt-2 border-t border-gray-800 text-[#eff1f6bf] text-xs">
                        {currentQuestion.example.split('\n').slice(2).join('\n')}
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Visible Test Cases */}
              {visibleTestCases.length > 0 && (
                <div>
                  <div className="text-white font-semibold mb-3">Test Cases:</div>
                  <div className="space-y-3">
                    {visibleTestCases.map((testCase, index) => (
                      <div key={index} className="bg-[#2d2d2d] rounded-lg p-4 border border-gray-800">
                        <div className="font-mono text-sm space-y-2">
                          <div>
                            <span className="text-[#eff1f6bf] font-semibold">Input:</span>
                            <span className="text-white ml-2">{JSON.stringify(testCase.input)}</span>
                          </div>
                          <div>
                            <span className="text-[#eff1f6bf] font-semibold">Output:</span>
                            <span className="text-white ml-2">{JSON.stringify(testCase.expected)}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {visibleTestCases.length === 0 && (
                <div className="bg-[#2d2d2d] rounded-lg p-6 border border-gray-800 text-center">
                  <div className="text-4xl mb-2">📝</div>
                  <p className="text-[#eff1f6bf] text-sm">No test cases available for this question yet</p>
                </div>
              )}
            </div>
          )}

          {/* Result Tab */}
          {activeTab === 'result' && (
            <div className="p-6 space-y-4">
              {consoleOutput.length === 0 ? (
                <div className="bg-[#2d2d2d] rounded-lg p-12 border border-gray-800 text-center">
                  <div className="text-5xl mb-4">💻</div>
                  <p className="text-[#eff1f6bf] text-sm">You must run your code first</p>
                </div>
              ) : (
                <>
                  {/* Result Summary */}
                  <div className={`p-4 rounded-lg border ${
                    passedCount === totalRun
                      ? 'bg-[#00b8a3]/10 border-[#00b8a3]/30'
                      : 'bg-[#ef4743]/10 border-[#ef4743]/30'
                  }`}>
                    <div className="flex items-center justify-between">
                      <div className={`text-lg font-semibold ${
                        passedCount === totalRun ? 'text-[#00b8a3]' : 'text-[#ef4743]'
                      }`}>
                        {passedCount === totalRun ? 'Accepted' : 'Wrong Answer'}
                      </div>
                      <div className="text-sm text-[#eff1f6bf]">
                        {passedCount}/{totalRun} testcases passed
                      </div>
                    </div>
                  </div>

                  {/* Individual Results */}
                  {consoleOutput.map((result, index) => (
                    <div key={index} className="bg-[#2d2d2d] rounded-lg p-4 border border-gray-800">
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-white font-semibold">Case {result.caseNumber}</span>
                        <span className={`text-sm font-medium ${
                          result.passed ? 'text-[#00b8a3]' : 'text-[#ef4743]'
                        }`}>
                          {result.passed ? '✓ Passed' : '✗ Failed'}
                        </span>
                      </div>
                      <div className="space-y-2 font-mono text-sm">
                        <div>
                          <span className="text-[#eff1f6bf]">Input:</span>
                          <div className="text-white ml-4 mt-1">{JSON.stringify(result.input)}</div>
                        </div>
                        <div>
                          <span className="text-[#eff1f6bf]">Expected:</span>
                          <div className="text-white ml-4 mt-1">{JSON.stringify(result.expected)}</div>
                        </div>
                        <div>
                          <span className={result.passed ? 'text-[#00b8a3]' : 'text-[#ef4743]'}>
                            Output:
                          </span>
                          <div className={`ml-4 mt-1 ${result.passed ? 'text-[#00b8a3]' : 'text-[#ef4743]'}`}>
                            {result.output !== null ? JSON.stringify(result.output) : 'null'}
                          </div>
                        </div>
                        {result.error && (
                          <div className="mt-2 p-2 bg-[#ef4743]/10 rounded border border-[#ef4743]/30">
                            <span className="text-[#ef4743] text-xs">{result.error}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </>
              )}
            </div>
          )}
        </div>

        {/* Right Panel - Code Editor */}
        <div className="flex-1 flex flex-col bg-black/90 min-h-0">
          {/* Editor Header */}
          <div className="bg-black/90 border-b border-gray-800 px-5 py-2.5 flex items-center justify-between">
            <span className="text-[#eff1f6bf] text-sm font-medium">
              Code
            </span>
            <div className="flex gap-2">
              {LANGUAGES.map(lang => (
                <button
                  key={lang.id}
                  onClick={() => {
                    setSelectedLanguage(lang.id);
                    setCode(getStarterCode(lang.id));
                    setConsoleOutput([]);
                  }}
                  className={`px-3 sm:px-4 py-1.5 rounded text-xs sm:text-sm font-medium transition-colors flex items-center gap-2 ${
                    selectedLanguage === lang.id
                      ? 'bg-[#3a3a3a] text-white'
                      : 'text-[#eff1f6bf] hover:text-white hover:bg-[#2d2d2d]'
                  }`}
                >
                  <span>{lang.icon}</span>
                  <span className="hidden sm:inline">{lang.name}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Monaco Editor */}
          <div className="flex-1 overflow-hidden">
            <Editor
              height="100%"
              language={selectedLanguage === 'cpp' ? 'cpp' : selectedLanguage}
              theme="vs-dark"
              value={code}
              onChange={(value) => setCode(value || '')}
              options={{
                fontSize: 14,
                minimap: { enabled: false },
                tabSize: 2,
                lineNumbers: 'on',
                scrollBeyondLastLine: false,
                automaticLayout: true,
                wordWrap: 'on',
                fontFamily: "'Fira Code', 'Cascadia Code', 'Consolas', monospace",
                fontLigatures: true,
                cursorBlinking: 'smooth',
                smoothScrolling: true,
                padding: { top: 16, bottom: 16 }
              }}
            />
          </div>

          {/* Console Output - LeetCode Style */}
          <div className="h-56 border-t border-gray-800">
            <div className="h-full flex flex-col bg-black/90">
              <div className="bg-black/90 px-5 py-2.5 border-b border-gray-800 flex items-center justify-between">
                <span className="text-[#eff1f6bf] text-sm font-medium">Testcase</span>
                {consoleOutput.length > 0 && (
                  <button
                    onClick={() => setConsoleOutput([])}
                    className="text-xs text-[#eff1f6bf] hover:text-white transition-colors"
                  >
                    Clear
                  </button>
                )}
              </div>
              
              <div className="flex-1 overflow-y-auto p-5">
                {isRunning ? (
                  <div className="flex items-center gap-2 text-[#ffc01e] text-sm">
                    <div className="w-4 h-4 border-2 border-[#ffc01e] border-t-transparent rounded-full animate-spin"></div>
                    <span>Running testcases...</span>
                  </div>
                ) : consoleOutput.length > 0 ? (
                  <div className="space-y-4">
                    {/* Result Header */}
                    <div className={`text-lg font-semibold ${
                      passedCount === totalRun ? 'text-[#00b8a3]' : 'text-[#ef4743]'
                    }`}>
                      {passedCount === totalRun ? 'Accepted' : 'Wrong Answer'}
                    </div>
                    
                    {/* Individual Results */}
                    {consoleOutput.map((result, index) => (
                      <div key={index} className="space-y-2 pb-4 border-b border-gray-800 last:border-b-0">
                        <div className="flex items-center gap-2">
                          <span className="text-[#eff1f6bf] text-sm">Case {result.caseNumber}:</span>
                          <span className={`text-sm font-medium ${
                            result.passed ? 'text-[#00b8a3]' : 'text-[#ef4743]'
                          }`}>
                            {result.passed ? '✓' : '✗'}
                          </span>
                        </div>
                        <div className="font-mono text-sm space-y-1">
                          <div>
                            <span className="text-[#eff1f6bf]">Input</span>
                            <div className="text-white ml-4 mt-1">{JSON.stringify(result.input)}</div>
                          </div>
                          <div>
                            <span className="text-[#eff1f6bf]">Output</span>
                            <div className={`ml-4 mt-1 ${result.passed ? 'text-white' : 'text-[#ef4743]'}`}>
                              {result.output !== null ? JSON.stringify(result.output) : 'null'}
                            </div>
                          </div>
                          {!result.passed && (
                            <div>
                              <span className="text-[#eff1f6bf]">Expected</span>
                              <div className="text-white ml-4 mt-1">{JSON.stringify(result.expected)}</div>
                            </div>
                          )}
                          {result.error && (
                            <div className="text-[#ef4743] text-xs mt-2">Error: {result.error}</div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center h-full text-[#eff1f6bf]/50">
                    <div className="text-4xl mb-3">💻</div>
                    <p className="text-sm">You must click "Run" first</p>
                    <p className="text-xs mt-2 text-[#808080]">Write your solution and test it with visible test cases</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modal Component */}
      <Modal
        isOpen={modal.isOpen}
        onClose={closeModal}
        type={modal.type}
        title={modal.title}
        message={modal.message}
        details={modal.details}
      />
    </div>
  );
}

export default Practice;




