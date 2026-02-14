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

// Test case results component
const TestCaseResult = ({ testCase, index, result }) => {
  const isPassed = result?.passed;
  const isRunning = result?.running;
  
  return (
    <div className={`p-4 rounded-xl border-2 transition-all duration-300 ${
      isRunning ? 'border-yellow-500/50 bg-yellow-500/5' :
      isPassed ? 'border-emerald-500/50 bg-emerald-500/5' :
      result ? 'border-red-500/50 bg-red-500/5' :
      'border-gray-700 bg-gray-800/30'
    }`}>
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <span className="text-sm font-bold text-gray-300">Test Case {index + 1}</span>
          {isRunning && <span className="text-xs text-yellow-400 animate-pulse">Running...</span>}
          {result && !isRunning && (
            <span className={`text-xs font-semibold ${isPassed ? 'text-emerald-400' : 'text-red-400'}`}>
              {isPassed ? '✓ PASSED' : '✗ FAILED'}
            </span>
          )}
        </div>
        {result && !isRunning && (
          <span className={`text-2xl ${isPassed ? 'animate-bounce' : ''}`}>
            {isPassed ? '✅' : '❌'}
          </span>
        )}
      </div>
      
      <div className="space-y-2 text-sm">
        <div className="flex gap-2">
          <span className="text-purple-400 font-semibold min-w-16">Input:</span>
          <span className="text-gray-300 font-mono">{JSON.stringify(testCase.input)}</span>
        </div>
        <div className="flex gap-2">
          <span className="text-blue-400 font-semibold min-w-16">Expected:</span>
          <span className="text-gray-300 font-mono">{JSON.stringify(testCase.expected)}</span>
        </div>
        {result && result.output !== undefined && (
          <div className="flex gap-2">
            <span className={`font-semibold min-w-16 ${isPassed ? 'text-emerald-400' : 'text-red-400'}`}>
              Your Output:
            </span>
            <span className={`font-mono ${isPassed ? 'text-emerald-300' : 'text-red-300'}`}>
              {JSON.stringify(result.output)}
            </span>
          </div>
        )}
        {result && result.error && (
          <div className="mt-2 p-2 bg-red-900/20 rounded border border-red-500/30">
            <span className="text-red-400 text-xs">{result.error}</span>
          </div>
        )}
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
  const [output, setOutput] = useState('');
  const [isRunning, setIsRunning] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [testResults, setTestResults] = useState([]);
  const [isTestingAll, setIsTestingAll] = useState(false);
  const [activeTab, setActiveTab] = useState('description'); // description, testcases, submissions
  const currentTopic = TOPICS.find(t => t.id === topicId);
  const currentQuestion = currentTopic?.questions.find(q => q.id === questionId);

  const getStarterCode = useCallback((language) => {
    if (language === 'javascript') {
      return currentQuestion?.starterCode || '// Write your solution here\n';
    } else if (language === 'cpp') {
      return `#include <iostream>\n#include <vector>\nusing namespace std;\n\n// Write your solution here\n\nint main() {\n    cout << "Hello from C++!" << endl;\n    // Test your code here\n    return 0;\n}`;
    } else if (language === 'java') {
      return `public class Main {\n    // Write your solution here\n    \n    public static void main(String[] args) {\n        System.out.println("Hello from Java!");\n        // Test your code here\n    }\n}`;
    }
    return '';
  }, [currentQuestion]);

  useEffect(() => {
    if (!topicId || !questionId || !currentTopic || !currentQuestion) {
      navigate('/problems');
      return;
    }
    setCode(getStarterCode(selectedLanguage));
    setOutput('');
    setTestResults([]);
  }, [topicId, questionId, currentQuestion, currentTopic, navigate, selectedLanguage, getStarterCode]);

  // Run test cases
  const runTestCases = async () => {
    if (!currentQuestion.testCases || currentQuestion.testCases.length === 0) {
      alert('No test cases available for this question');
      return;
    }

    setIsTestingAll(true);
    setActiveTab('testcases');
    const results = [];

    for (let i = 0; i < currentQuestion.testCases.length; i++) {
      const testCase = currentQuestion.testCases[i];
      
      // Show running state
      setTestResults(prev => {
        const newResults = [...prev];
        newResults[i] = { running: true };
        return newResults;
      });

      await new Promise(resolve => setTimeout(resolve, 300));

      try {
        // Extract function name from starter code
        const functionNameMatch = currentQuestion.starterCode.match(/function\s+(\w+)/);
        const functionName = functionNameMatch ? functionNameMatch[1] : null;

        if (!functionName) {
          throw new Error('Could not determine function name');
        }

        // Execute code with test case
        let result;
        const testCode = `
          ${code}
          
          // Execute test
          const testInput = ${JSON.stringify(testCase.input)};
          const output = ${functionName}(...(Array.isArray(testInput) ? testInput : [testInput]));
          output;
        `;

        try {
          result = eval(testCode);
        } catch (error) {
          throw new Error(error.message);
        }

        // Compare result with expected
        const passed = JSON.stringify(result) === JSON.stringify(testCase.expected);
        
        results.push({
          passed,
          output: result,
          running: false
        });

        setTestResults(prev => {
          const newResults = [...prev];
          newResults[i] = results[i];
          return newResults;
        });

      } catch (error) {
        results.push({
          passed: false,
          output: null,
          error: error.message,
          running: false
        });

        setTestResults(prev => {
          const newResults = [...prev];
          newResults[i] = results[i];
          return newResults;
        });
      }
    }

    setIsTestingAll(false);
    
    // Check if all passed
    const allPassed = results.every(r => r.passed);
    return allPassed;
  };

  const handleRunCode = async () => {
    setIsRunning(true);
    setOutput('Running...');

    if (selectedLanguage === 'javascript') {
      setTimeout(() => {
        try {
          const logs = [];
          const originalLog = console.log;
          console.log = (...args) => logs.push(args.map(arg => typeof arg === 'object' ? JSON.stringify(arg) : String(arg)).join(' '));
          eval(code);
          console.log = originalLog;
          setOutput(logs.length > 0 ? logs.join('\n') : 'Success!');
        } catch (error) {
          setOutput(`Error: ${error.message}`);
        } finally {
          setIsRunning(false);
        }
      }, 300);
    } else {
      // Use Piston API for C++ and Java
      try {
        const languageMap = {
          cpp: 'cpp',
          java: 'java'
        };

        console.log('Sending request to Piston API...');
        console.log('Language:', languageMap[selectedLanguage]);
        console.log('Code:', code);

        const response = await fetch('https://emkc.org/api/v2/piston/execute', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            language: languageMap[selectedLanguage],
            version: '*',
            files: [{
              name: selectedLanguage === 'java' ? 'Main.java' : 'main.cpp',
              content: code
            }]
          })
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const result = await response.json();
        console.log('Full API Response:', result);
        
        // Handle the response
        let outputText = '';
        
        if (result.compile && result.compile.stderr) {
          outputText = `Compilation Error:\n${result.compile.stderr}`;
        } else if (result.run) {
          if (result.run.stderr) {
            outputText = `Runtime Error:\n${result.run.stderr}`;
          } else if (result.run.stdout) {
            outputText = result.run.stdout;
          } else if (result.run.output) {
            outputText = result.run.output;
          } else {
            outputText = 'Program executed successfully with no output!';
          }
        } else {
          outputText = `Unexpected response format:\n${JSON.stringify(result, null, 2)}`;
        }
        
        setOutput(outputText);
      } catch (error) {
        console.error('Execution error:', error);
        setOutput(`Error: ${error.message}\n\nPlease check your internet connection or try again.`);
      } finally {
        setIsRunning(false);
      }
    }
  };

  const handleSubmitSolution = async () => {
    if (!user) {
      alert('Please login to save your solution');
      return;
    }

    if (!code.trim()) {
      alert('Please write some code before submitting');
      return;
    }

    // Check if question has test cases
    if (currentQuestion.testCases && currentQuestion.testCases.length > 0) {
      // Run all test cases first
      const allPassed = await runTestCases();
      
      if (!allPassed) {
        const failedCount = testResults.filter(r => !r.passed).length;
        alert(`❌ Submission failed! ${failedCount} test case(s) did not pass. Please fix your code and try again.`);
        return;
      }
    }

    setIsSaving(true);
    try {
      const solution = {
        questionId: currentQuestion.id,
        questionTitle: currentQuestion.title,
        topic: topicId,
        topicName: currentTopic.name,
        language: selectedLanguage,
        code: code,
        solvedAt: new Date().toISOString()
      };

      // Check if solution already exists
      const userDoc = await getDoc(doc(db, 'users', user.uid));
      const existingSolutions = userDoc.data()?.solvedQuestions || [];
      
      // Remove old solution for same question and language if exists
      const filteredSolutions = existingSolutions.filter(
        s => !(s.questionId === solution.questionId && s.language === solution.language && s.topic === solution.topic)
      );

      // Update with new solution
      await updateDoc(doc(db, 'users', user.uid), {
        solvedQuestions: [...filteredSolutions, solution]
      });

      alert('✅ All test cases passed! Solution saved successfully!');
    } catch (error) {
      console.error('Error saving solution:', error);
      alert('Failed to save solution. Please try again.');
    } finally {
      setIsSaving(false);
    }
  };

  if (!currentTopic || !currentQuestion) return null;

  const passedTests = testResults.filter(r => r.passed).length;
  const totalTests = currentQuestion.testCases?.length || 0;

  return (
    <div className="h-screen flex flex-col bg-gradient-to-br from-slate-950 via-blue-950/20 to-slate-900 relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-900/5 via-purple-900/5 to-pink-900/5 animate-gradient"></div>
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/3 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/3 rounded-full blur-3xl animate-pulse" style={{animationDelay: '1s'}}></div>
      
      {/* Header */}
      <div className="relative z-10 glass-effect border-b border-purple-500/20 px-3 sm:px-6 py-3 sm:py-4 shadow-lg">
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-2 sm:gap-4 flex-1 min-w-0">
            <button 
              onClick={() => navigate('/problems')} 
              className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl glass-effect hover:bg-white/10 flex items-center justify-center text-white flex-shrink-0 hover-lift transition-all duration-300 hover:scale-110"
            >
              ←
            </button>
            <div className="flex items-center gap-2 sm:gap-3 min-w-0">
              <span className="text-xl sm:text-2xl flex-shrink-0 animate-float-slow">{currentTopic.icon}</span>
              <div className="min-w-0">
                <h1 className="text-sm sm:text-lg font-bold text-white truncate">{currentQuestion.title}</h1>
                <div className="flex items-center gap-1 sm:gap-2 text-xs">
                  <span className="text-purple-300 hidden sm:inline">{currentTopic.name}</span>
                  <span className="text-gray-600 hidden sm:inline">•</span>
                  <span className={`px-2 py-0.5 rounded-lg border font-semibold ${
                    currentQuestion.difficulty === 'Easy' ? 'border-emerald-500/50 text-emerald-400 bg-emerald-500/10' :
                    currentQuestion.difficulty === 'Medium' ? 'border-amber-500/50 text-amber-400 bg-amber-500/10' :
                    'border-rose-500/50 text-rose-400 bg-rose-500/10'
                  }`}>
                    {currentQuestion.difficulty}
                  </span>
                  {totalTests > 0 && testResults.length > 0 && (
                    <span className={`px-2 py-0.5 rounded-lg border font-semibold ${
                      passedTests === totalTests 
                        ? 'border-emerald-500/50 text-emerald-400 bg-emerald-500/10' 
                        : 'border-blue-500/50 text-blue-400 bg-blue-500/10'
                    }`}>
                      {passedTests}/{totalTests} Tests
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>
          <div className="flex gap-2 flex-shrink-0">
            <button 
              onClick={handleRunCode} 
              disabled={isRunning}
              className={`px-3 sm:px-6 py-2 sm:py-2.5 rounded-xl font-bold text-xs sm:text-sm flex items-center gap-1.5 sm:gap-2.5 transition-all duration-300 shadow-lg hover-lift ${
                isRunning 
                  ? 'bg-gray-600 text-gray-400 cursor-not-allowed' 
                  : 'bg-gradient-to-r from-emerald-500 to-green-500 text-white hover:from-emerald-600 hover:to-green-600 hover:scale-105 hover:shadow-emerald-500/50'
              }`}
            >
              <span>{isRunning ? '⏳' : '▶'}</span>
              <span className="hidden sm:inline">{isRunning ? 'Running...' : 'Run Code'}</span>
            </button>
            <button 
              onClick={handleSubmitSolution} 
              disabled={isSaving || isTestingAll}
              className={`px-3 sm:px-6 py-2 sm:py-2.5 rounded-xl font-bold text-xs sm:text-sm flex items-center gap-1.5 sm:gap-2.5 transition-all duration-300 shadow-lg hover-lift ${
                isSaving || isTestingAll
                  ? 'bg-gray-600 text-gray-400 cursor-not-allowed' 
                  : 'bg-gradient-to-r from-blue-500 to-purple-500 text-white hover:from-blue-600 hover:to-purple-600 hover:scale-105 hover:shadow-purple-500/50'
              }`}
            >
              <span>{isSaving ? '⏳' : '💾'}</span>
              <span className="hidden sm:inline">{isSaving ? 'Saving...' : 'Submit'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col lg:flex-row overflow-hidden relative z-10">
        {/* Left Panel - Problem Description */}
        <div className="w-full lg:w-[45%] glass-effect border-b lg:border-b-0 lg:border-r border-purple-500/10 overflow-y-auto max-h-[40vh] lg:max-h-none custom-scrollbar">
          {/* Tabs */}
          <div className="flex gap-1 p-4 border-b border-white/5">
            <button
              onClick={() => setActiveTab('description')}
              className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-300 ${
                activeTab === 'description'
                  ? 'bg-gradient-to-r from-purple-500 to-blue-500 text-white shadow-lg'
                  : 'text-gray-400 hover:text-white hover:bg-white/5'
              }`}
            >
              📄 Description
            </button>
            {totalTests > 0 && (
              <button
                onClick={() => setActiveTab('testcases')}
                className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-300 flex items-center gap-2 ${
                  activeTab === 'testcases'
                    ? 'bg-gradient-to-r from-purple-500 to-blue-500 text-white shadow-lg'
                    : 'text-gray-400 hover:text-white hover:bg-white/5'
                }`}
              >
                🧪 Test Cases
                {testResults.length > 0 && (
                  <span className={`px-2 py-0.5 rounded-full text-xs font-bold ${
                    passedTests === totalTests 
                      ? 'bg-emerald-500 text-white' 
                      : 'bg-blue-500 text-white'
                  }`}>
                    {passedTests}/{totalTests}
                  </span>
                )}
              </button>
            )}
          </div>

          {/* Tab Content */}
          <div className="p-4 sm:p-6 space-y-6">
            {activeTab === 'description' && (
              <>
                <div className="space-y-3">
                  <h2 className="text-purple-300 font-bold text-xs uppercase tracking-wider">Description</h2>
                  <div className="glass-effect rounded-xl p-4 sm:p-6 border border-white/10 hover-lift">
                    <p className="text-gray-300 text-sm sm:text-base leading-relaxed whitespace-pre-line">
                      {currentQuestion.description}
                    </p>
                  </div>
                </div>

                <div className="space-y-3">
                  <h2 className="text-blue-300 font-bold text-xs uppercase tracking-wider">Example</h2>
                  <div className="bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-xl p-4 sm:p-5 border border-blue-500/20 hover-lift">
                    <div className="bg-black/30 rounded-lg p-3 sm:p-4 font-mono text-xs sm:text-sm space-y-2.5">
                      <div className="flex flex-wrap gap-2">
                        <span className="text-cyan-400 font-semibold">Input:</span>
                        <span className="text-gray-300 break-all">
                          {currentQuestion.example.split('\n')[0].replace('Input: ', '')}
                        </span>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        <span className="text-emerald-400 font-semibold">Output:</span>
                        <span className="text-gray-300 break-all">
                          {currentQuestion.example.split('\n')[1].replace('Output: ', '')}
                        </span>
                      </div>
                      {currentQuestion.example.split('\n')[2] && (
                        <div className="pt-2 border-t border-white/10">
                          <span className="text-gray-400 text-xs italic">
                            {currentQuestion.example.split('\n').slice(2).join('\n')}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {totalTests > 0 && (
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <h2 className="text-emerald-300 font-bold text-xs uppercase tracking-wider">Test Cases</h2>
                      <span className="text-xs text-gray-400">{totalTests} test cases available</span>
                    </div>
                    <button
                      onClick={runTestCases}
                      disabled={isTestingAll}
                      className="w-full py-3 bg-gradient-to-r from-emerald-500 to-green-500 hover:from-emerald-600 hover:to-green-600 text-white font-semibold rounded-xl transition-all duration-300 shadow-lg hover:shadow-emerald-500/50 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                    >
                      {isTestingAll ? '🧪 Running Tests...' : '🧪 Run All Test Cases'}
                    </button>
                  </div>
                )}
              </>
            )}

            {activeTab === 'testcases' && totalTests > 0 && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h2 className="text-emerald-300 font-bold text-sm uppercase tracking-wider">
                    Test Results
                  </h2>
                  <button
                    onClick={runTestCases}
                    disabled={isTestingAll}
                    className="px-4 py-2 bg-gradient-to-r from-emerald-500 to-green-500 hover:from-emerald-600 hover:to-green-600 text-white text-sm font-semibold rounded-lg transition-all duration-300 shadow-lg hover:scale-105 disabled:opacity-50"
                  >
                    {isTestingAll ? '🔄 Running...' : '🔄 Re-run Tests'}
                  </button>
                </div>

                {testResults.length === 0 ? (
                  <div className="glass-effect rounded-xl p-8 border border-white/10 text-center">
                    <div className="text-6xl mb-4 animate-float-slow">🧪</div>
                    <p className="text-gray-400 mb-4">No test results yet</p>
                    <button
                      onClick={runTestCases}
                      className="px-6 py-3 bg-gradient-to-r from-emerald-500 to-green-500 hover:from-emerald-600 hover:to-green-600 text-white font-semibold rounded-xl transition-all duration-300 shadow-lg hover:scale-105"
                    >
                      Run Test Cases
                    </button>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {/* Summary */}
                    <div className={`p-4 rounded-xl border-2 transition-all duration-300 ${
                      passedTests === totalTests
                        ? 'border-emerald-500/50 bg-emerald-500/10'
                        : 'border-blue-500/50 bg-blue-500/10'
                    }`}>
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="text-lg font-bold text-white mb-1">
                            {passedTests === totalTests ? '🎉 All Tests Passed!' : `📊 ${passedTests}/${totalTests} Tests Passed`}
                          </div>
                          <div className="text-sm text-gray-300">
                            {passedTests === totalTests 
                              ? 'Great job! You can now submit your solution.' 
                              : 'Keep working on your solution to pass all tests.'}
                          </div>
                        </div>
                        <div className="text-4xl">
                          {passedTests === totalTests ? '✅' : '📝'}
                        </div>
                      </div>
                    </div>

                    {/* Individual Test Cases */}
                    {currentQuestion.testCases.map((testCase, index) => (
                      <TestCaseResult
                        key={index}
                        testCase={testCase}
                        index={index}
                        result={testResults[index]}
                      />
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
        {/* Right Panel - Code Editor */}
        <div className="flex-1 flex flex-col bg-[#1e1e1e] min-h-0">
          {/* Editor Header */}
          <div className="glass-effect border-b border-white/5 px-3 sm:px-5 py-2 sm:py-3 flex items-center justify-between gap-2">
            <span className="text-gray-300 text-xs sm:text-sm font-medium truncate">
              solution.{LANGUAGES.find(l => l.id === selectedLanguage)?.extension}
            </span>
            <div className="flex gap-1 sm:gap-2 flex-shrink-0">
              {LANGUAGES.map(lang => (
                <button
                  key={lang.id}
                  onClick={() => setSelectedLanguage(lang.id)}
                  className={`px-2 sm:px-4 py-1.5 sm:py-2 rounded-lg text-xs sm:text-sm font-semibold transition-all flex items-center gap-1 sm:gap-2 ${
                    selectedLanguage === lang.id
                      ? 'bg-gradient-to-r from-purple-500 to-blue-500 text-white shadow-lg scale-105'
                      : 'glass-effect text-gray-400 hover:bg-white/10 hover:text-gray-300'
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
              language={selectedLanguage}
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
                fontFamily: "'Fira Code', 'Cascadia Code', Consolas, monospace",
                fontLigatures: true,
                cursorBlinking: 'smooth',
                cursorSmoothCaretAnimation: true,
                smoothScrolling: true,
                padding: { top: 16, bottom: 16 }
              }}
            />
          </div>

          {/* Console Output */}
          <div className="h-40 sm:h-56 glass-effect border-t border-purple-500/20 flex-shrink-0">
            <div className="h-full flex flex-col">
              <div className="bg-[#252526] px-3 sm:px-5 py-2 sm:py-3 border-b border-white/5 flex items-center justify-between">
                <span className="text-gray-300 text-xs sm:text-sm font-semibold">Console Output</span>
                {output && (
                  <button
                    onClick={() => setOutput('')}
                    className="text-xs text-gray-400 hover:text-white transition-colors"
                  >
                    Clear
                  </button>
                )}
              </div>
              <div className="flex-1 overflow-y-auto p-3 sm:p-5 custom-scrollbar">
                {isRunning ? (
                  <div className="flex items-center gap-2 text-yellow-400 text-sm">
                    <span className="animate-pulse">⏳</span>
                    <span>Running code...</span>
                    <div className="flex gap-1 ml-2">
                      <div className="w-2 h-2 bg-yellow-400 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-yellow-400 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                      <div className="w-2 h-2 bg-yellow-400 rounded-full animate-bounce" style={{animationDelay: '0.4s'}}></div>
                    </div>
                  </div>
                ) : output ? (
                  <pre className={`font-mono text-xs sm:text-sm whitespace-pre-wrap ${
                    output.includes('Error') ? 'text-red-400' : 'text-emerald-400'
                  }`}>
                    {output}
                  </pre>
                ) : (
                  <div className="flex flex-col items-center justify-center h-full text-gray-500">
                    <div className="text-4xl mb-2 animate-float-slow">💻</div>
                    <p className="text-sm">Click "Run Code" to execute your solution</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Practice;
