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
  { id: 'javascript', name: 'JavaScript', icon: '🟨', extension: 'js' }
];

function Practice() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [searchParams] = useSearchParams();
  const topicId = searchParams.get('topic');
  const questionId = parseInt(searchParams.get('question'));
  const [selectedLanguage] = useState('javascript');
  const [code, setCode] = useState('');
  const [consoleOutput, setConsoleOutput] = useState([]);
  const [isRunning, setIsRunning] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [activeTab, setActiveTab] = useState('description');
  const currentTopic = TOPICS.find(t => t.id === topicId);
  const currentQuestion = currentTopic?.questions.find(q => q.id === questionId);
  
  // Use first 3 testcases as visible, rest as hidden
  const visibleTestCases = currentQuestion?.testCases?.slice(0, 3) || [];
  const allTestCases = currentQuestion?.testCases || [];

  const getStarterCode = useCallback(() => {
    return currentQuestion?.starterCode || '// Write your solution here\n';
  }, [currentQuestion]);

  useEffect(() => {
    if (!topicId || !questionId || !currentTopic || !currentQuestion) {
      navigate('/problems');
      return;
    }
    setCode(getStarterCode());
    setConsoleOutput([]);
  }, [topicId, questionId, currentQuestion, currentTopic, navigate, getStarterCode]);

  // Run visible test cases (like LeetCode's "Run" button)
  const handleRunCode = async () => {
    if (!currentQuestion.testCases || visibleTestCases.length === 0) {
      alert('No test cases available for this question');
      return;
    }

    setIsRunning(true);
    const results = [];

    for (let i = 0; i < visibleTestCases.length; i++) {
      const testCase = visibleTestCases[i];
      
      await new Promise(resolve => setTimeout(resolve, 200));

      try {
        // Execute user's code with the starter code wrapper
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

  // Submit solution (runs ALL test cases including hidden ones)
  const handleSubmitSolution = async () => {
    if (!user) {
      alert('Please login to save your solution');
      return;
    }

    if (!code.trim()) {
      alert('Please write some code before submitting');
      return;
    }

    if (allTestCases.length > 0) {
      setIsSaving(true);
      const results = [];

      for (let i = 0; i < allTestCases.length; i++) {
        const testCase = allTestCases[i];
        
        try {
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

        } catch (error) {
          results.push({ passed: false, error: error.message });
        }
      }

      const failedCount = results.filter(r => !r.passed).length;
      
      if (failedCount > 0) {
        setIsSaving(false);
        alert(`Wrong Answer\n\n${failedCount} out of ${allTestCases.length} test cases failed.\n\nClick "Run" to see results for visible test cases.`);
        return;
      }
    }

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

      const userDoc = await getDoc(doc(db, 'users', user.uid));
      const existingSolutions = userDoc.data()?.solvedQuestions || [];
      
      const filteredSolutions = existingSolutions.filter(
        s => !(s.questionId === solution.questionId && s.language === solution.language && s.topic === solution.topic)
      );

      await updateDoc(doc(db, 'users', user.uid), {
        solvedQuestions: [...filteredSolutions, solution]
      });

      alert('Accepted\n\nAll test cases passed!\nYour solution has been saved.');
    } catch (error) {
      console.error('Error saving solution:', error);
      alert('Failed to save solution. Please try again.');
    } finally {
      setIsSaving(false);
    }
  };

  if (!currentTopic || !currentQuestion) return null;

  const passedCount = consoleOutput.filter(r => r.passed).length;
  const totalRun = consoleOutput.length;

  return (
    <div className="h-screen flex flex-col bg-[#1a1a1a]">
      {/* Header */}
      <div className="bg-[#282828] border-b border-[#3a3a3a] px-4 sm:px-6 py-3">
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
                  : 'bg-[#2d2d2d] hover:bg-[#3a3a3a] text-white border border-[#3a3a3a]'
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
        <div className="w-full lg:w-[45%] bg-[#262626] border-b lg:border-b-0 lg:border-r border-[#3a3a3a] overflow-y-auto max-h-[40vh] lg:max-h-none">
          {/* Tabs */}
          <div className="flex border-b border-[#3a3a3a] bg-[#282828]">
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
                <div className="bg-[#2d2d2d] rounded-lg p-4 border border-[#3a3a3a]">
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
                      <div className="pt-2 border-t border-[#3a3a3a] text-[#eff1f6bf] text-xs">
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
                      <div key={index} className="bg-[#2d2d2d] rounded-lg p-4 border border-[#3a3a3a]">
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
                <div className="bg-[#2d2d2d] rounded-lg p-6 border border-[#3a3a3a] text-center">
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
                <div className="bg-[#2d2d2d] rounded-lg p-12 border border-[#3a3a3a] text-center">
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
                    <div key={index} className="bg-[#2d2d2d] rounded-lg p-4 border border-[#3a3a3a]">
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
        <div className="flex-1 flex flex-col bg-[#1e1e1e] min-h-0">
          {/* Editor Header */}
          <div className="bg-[#282828] border-b border-[#3a3a3a] px-5 py-2.5 flex items-center justify-between">
            <span className="text-[#eff1f6bf] text-sm font-medium">
              JavaScript
            </span>
            <span className="text-xs text-[#808080]">Write your code inside the function</span>
          </div>

          {/* Monaco Editor */}
          <div className="flex-1 overflow-hidden">
            <Editor
              height="100%"
              language="javascript"
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
          <div className="h-56 border-t border-[#3a3a3a]">
            <div className="h-full flex flex-col bg-[#262626]">
              <div className="bg-[#282828] px-5 py-2.5 border-b border-[#3a3a3a] flex items-center justify-between">
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
                      <div key={index} className="space-y-2 pb-4 border-b border-[#3a3a3a] last:border-b-0">
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
    </div>
  );
}

export default Practice;
