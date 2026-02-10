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
  }, [topicId, questionId, currentQuestion, currentTopic, navigate, selectedLanguage, getStarterCode]);

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

      alert('✅ Solution saved successfully!');
    } catch (error) {
      console.error('Error saving solution:', error);
      alert('Failed to save solution. Please try again.');
    } finally {
      setIsSaving(false);
    }
  };

  if (!currentTopic || !currentQuestion) return null;

  return (
    <div className="h-screen flex flex-col bg-[#0a0e27]">
      <div className="bg-slate-900 border-b border-purple-500/20 px-3 sm:px-6 py-2 sm:py-3">
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-2 sm:gap-4 flex-1 min-w-0">
            <button onClick={() => navigate('/problems')} className="w-8 h-8 sm:w-9 sm:h-9 rounded-lg bg-white/5 hover:bg-white/10 flex items-center justify-center text-white flex-shrink-0">←</button>
            <div className="flex items-center gap-2 sm:gap-3 min-w-0">
              <span className="text-lg sm:text-xl flex-shrink-0">{currentTopic.icon}</span>
              <div className="min-w-0">
                <h1 className="text-sm sm:text-lg font-bold text-white truncate">{currentQuestion.title}</h1>
                <div className="flex items-center gap-1 sm:gap-2 text-xs text-purple-300">
                  <span className="hidden sm:inline">{currentTopic.name}</span>
                  <span className="hidden sm:inline">•</span>
                  <span className="px-1.5 sm:px-2 py-0.5 rounded border border-emerald-500/30 text-emerald-400 text-xs">{currentQuestion.difficulty}</span>
                </div>
              </div>
            </div>
          </div>
          <div className="flex gap-2 flex-shrink-0">
            <button onClick={handleRunCode} disabled={isRunning} className={`px-3 sm:px-6 py-2 sm:py-2.5 rounded-xl font-bold text-xs sm:text-sm flex items-center gap-1.5 sm:gap-2.5 ${isRunning ? 'bg-gray-600 text-gray-400' : 'bg-gradient-to-r from-emerald-500 to-green-500 text-white'}`}>
              <span>▶</span><span className="hidden sm:inline">{isRunning ? 'Running...' : 'Run Code'}</span>
            </button>
            <button onClick={handleSubmitSolution} disabled={isSaving} className={`px-3 sm:px-6 py-2 sm:py-2.5 rounded-xl font-bold text-xs sm:text-sm flex items-center gap-1.5 sm:gap-2.5 ${isSaving ? 'bg-gray-600 text-gray-400' : 'bg-gradient-to-r from-blue-500 to-purple-500 text-white'}`}>
              <span>💾</span><span className="hidden sm:inline">{isSaving ? 'Saving...' : 'Submit'}</span>
            </button>
          </div>
        </div>
      </div>
      <div className="flex-1 flex flex-col lg:flex-row overflow-hidden">
        <div className="w-full lg:w-[45%] bg-[#0f1629] border-b lg:border-b-0 lg:border-r border-purple-500/10 overflow-y-auto p-4 sm:p-8 space-y-4 sm:space-y-8 max-h-[40vh] lg:max-h-none">
          <div>
            <h2 className="text-purple-300 font-bold text-xs uppercase mb-2 sm:mb-4">Description</h2>
            <div className="bg-white/5 rounded-xl p-4 sm:p-6 border border-white/10">
              <p className="text-gray-300 text-sm sm:text-base leading-relaxed whitespace-pre-line">{currentQuestion.description}</p>
            </div>
          </div>
          <div>
            <h2 className="text-purple-300 font-bold text-xs uppercase mb-2 sm:mb-4">Example</h2>
            <div className="bg-purple-500/10 rounded-xl p-3 sm:p-5 border border-purple-500/20">
              <div className="bg-black/30 rounded-lg p-3 sm:p-4 font-mono text-xs sm:text-sm space-y-2 sm:space-y-2.5">
                <div><span className="text-cyan-400 font-semibold">Input:</span><span className="text-gray-300 ml-2">{currentQuestion.example.split('\n')[0].replace('Input: ', '')}</span></div>
                <div><span className="text-emerald-400 font-semibold">Output:</span><span className="text-gray-300 ml-2">{currentQuestion.example.split('\n')[1].replace('Output: ', '')}</span></div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex-1 flex flex-col bg-[#1e1e1e] min-h-0">
          <div className="bg-[#252526] border-b border-white/5 px-3 sm:px-5 py-2 sm:py-2.5 flex items-center justify-between gap-2">
            <span className="text-gray-300 text-xs sm:text-sm font-medium truncate">solution.{LANGUAGES.find(l => l.id === selectedLanguage)?.extension}</span>
            <div className="flex gap-1 sm:gap-2 flex-shrink-0">
              {LANGUAGES.map(lang => (
                <button
                  key={lang.id}
                  onClick={() => setSelectedLanguage(lang.id)}
                  className={`px-2 sm:px-3 py-1 sm:py-1.5 rounded-lg text-xs font-medium transition-all flex items-center gap-1 sm:gap-1.5 ${
                    selectedLanguage === lang.id
                      ? 'bg-purple-600 text-white'
                      : 'bg-white/5 text-gray-400 hover:bg-white/10 hover:text-gray-300'
                  }`}
                >
                  <span>{lang.icon}</span>
                  <span className="hidden sm:inline">{lang.name}</span>
                </button>
              ))}
            </div>
          </div>
          <div className="flex-1 overflow-hidden">
            <Editor height="100%" language={selectedLanguage} theme="vs-dark" value={code} onChange={(value) => setCode(value || '')} options={{fontSize: 14, minimap: { enabled: false }, tabSize: 2, lineNumbers: 'on'}} />
          </div>
          <div className="h-32 sm:h-56 bg-[#1e1e1e] border-t border-purple-500/20 flex-shrink-0">
            <div className="h-full flex flex-col">
              <div className="bg-[#252526] px-3 sm:px-5 py-2 sm:py-2.5 border-b border-white/5">
                <span className="text-gray-300 text-xs sm:text-sm font-semibold">Console Output</span>
              </div>
              <div className="flex-1 overflow-y-auto p-3 sm:p-5">
                {isRunning ? (
                  <div className="flex items-center gap-2 text-yellow-400 text-sm">
                    <span className="animate-pulse">⏳</span>
                    <span>Running code...</span>
                  </div>
                ) : (
                  <pre className="text-emerald-400 font-mono text-xs sm:text-sm whitespace-pre-wrap">{output || '// Click "Run Code" to execute'}</pre>
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
