import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { deleteDoc, doc } from "firebase/firestore";
import { db } from "../firebase";
import SubmissionModal from "../components/SubmissionModal";
import {
  getTodaysChallenge,
  submitChallengeSolution,
  getChallengeLeaderboard,
  getUserSubmission,
  getChallengeStats,
  getTodayDateString
} from "../services/dailyChallengeService";

export default function DailyChallenge() {
  const { user } = useAuth();
  const navigate = useNavigate();
  
  const [challenge, setChallenge] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedLanguage, setSelectedLanguage] = useState("javascript");
  const [code, setCode] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showLeaderboard, setShowLeaderboard] = useState(false);
  const [leaderboard, setLeaderboard] = useState([]);
  const [userSubmission, setUserSubmission] = useState(null);
  const [stats, setStats] = useState(null);
  const [timeSpent, setTimeSpent] = useState(0);
  const [timerStarted, setTimerStarted] = useState(false);
  const [showHints, setShowHints] = useState(false);
  const [testResults, setTestResults] = useState(null);
  const [error, setError] = useState(null);
  const [isRegenerating, setIsRegenerating] = useState(false);
  const [modal, setModal] = useState({ isOpen: false, type: '', title: '', message: '', details: null });

  const showModal = (type, title, message, details = null) => {
    setModal({ isOpen: true, type, title, message, details });
  };

  const closeModal = () => {
    setModal({ isOpen: false, type: '', title: '', message: '', details: null });
  };

  // Load today's challenge
  useEffect(() => {
    loadChallenge();
  }, []);

  // Timer
  useEffect(() => {
    let interval;
    if (timerStarted && !userSubmission?.passed) {
      interval = setInterval(() => {
        setTimeSpent(prev => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [timerStarted, userSubmission]);

  const loadChallenge = async () => {
    try {
      setLoading(true);
      setError(null);
      console.log("Loading today's challenge...");
      
      const todaysChallenge = await getTodaysChallenge();
      console.log("Challenge loaded:", todaysChallenge);
      
      setChallenge(todaysChallenge);
      
      // Load starter code with AGGRESSIVE formatting
      if (todaysChallenge.starterCode) {
        let starterCode = todaysChallenge.starterCode[selectedLanguage] || "";
        
        console.log("RAW CODE FROM DB:", JSON.stringify(starterCode));
        
        // Try multiple replacement strategies
        starterCode = starterCode
          .replace(/\\n/g, '\n')      // Replace escaped \n
          .replace(/\\r\\n/g, '\n')   // Replace Windows line endings
          .replace(/\\t/g, '    ')    // Replace tabs with spaces
          .replace(/\r\n/g, '\n')     // Normalize line endings
          .replace(/\r/g, '\n');      // Mac line endings
        
        // If still no newlines, try to add them based on language syntax
        if (!starterCode.includes('\n')) {
          console.log("NO NEWLINES FOUND - Adding them manually");
          
          if (selectedLanguage === 'cpp') {
            starterCode = starterCode
              .replace(/class Solution \{ ?public: ?/g, 'class Solution {\npublic:\n    ')
              .replace(/\( ?/g, '(')
              .replace(/ ?\)/g, ')')
              .replace(/ ?\{ ?/g, ' {\n        ')
              .replace(/ ?\} ?;/g, '\n    }\n};')
              .replace(/\/\/ Your code here/g, '// Your code here')
              .replace(/return /g, 'return ')
              .trim();
          } else if (selectedLanguage === 'java') {
            starterCode = starterCode
              .replace(/class Solution \{ ?public /g, 'class Solution {\n    public ')
              .replace(/\( ?/g, '(')
              .replace(/ ?\)/g, ')')
              .replace(/ ?\{ ?/g, ' {\n        ')
              .replace(/ ?\} ?}/g, '\n    }\n}')
              .replace(/\/\/ Your code here/g, '// Your code here')
              .replace(/return /g, 'return ')
              .trim();
          } else if (selectedLanguage === 'javascript') {
            starterCode = starterCode
              .replace(/function /g, 'function ')
              .replace(/\( ?/g, '(')
              .replace(/ ?\)/g, ')')
              .replace(/ ?\{ ?/g, ' {\n  ')
              .replace(/ ?\}/g, '\n}')
              .replace(/\/\/ Your code here/g, '// Your code here')
              .replace(/return /g, 'return ')
              .trim();
          }
        } else {
          // Clean up existing formatting
          starterCode = starterCode
            .split('\n')
            .map(line => line.trim())
            .join('\n')
            .replace(/\n\n+/g, '\n'); // Remove multiple blank lines
          
          // Re-indent based on language
          const lines = starterCode.split('\n');
          let indentLevel = 0;
          const indentSize = selectedLanguage === 'javascript' ? 2 : 4;
          
          starterCode = lines.map(line => {
            const trimmed = line.trim();
            if (!trimmed) return '';
            
            // Decrease indent for closing braces
            if (trimmed.startsWith('}')) {
              indentLevel = Math.max(0, indentLevel - 1);
            }
            
            const indented = ' '.repeat(indentLevel * indentSize) + trimmed;
            
            // Increase indent after opening braces
            if (trimmed.endsWith('{') || trimmed === 'public:') {
              indentLevel++;
            }
            
            return indented;
          }).join('\n');
        }
        
        console.log("FORMATTED CODE:", starterCode);
        console.log("HAS NEWLINES:", starterCode.includes('\n'));
        setCode(starterCode);
      }
      
      // Load user's previous submission (non-blocking)
      try {
        const submission = await getUserSubmission(user.uid, getTodayDateString());
        setUserSubmission(submission);
      } catch (err) {
        console.warn("Failed to load user submission:", err);
      }
      
      // Load stats (non-blocking)
      try {
        const challengeStats = await getChallengeStats(getTodayDateString());
        setStats(challengeStats);
      } catch (err) {
        console.warn("Failed to load stats:", err);
      }
      
      // Load leaderboard (non-blocking)
      try {
        const leaderboardData = await getChallengeLeaderboard(getTodayDateString());
        setLeaderboard(leaderboardData);
      } catch (err) {
        console.warn("Failed to load leaderboard:", err);
        setLeaderboard([]);
      }
      
    } catch (error) {
      console.error("Error loading challenge:", error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleLanguageChange = (lang) => {
    setSelectedLanguage(lang);
    if (challenge?.starterCode) {
      let starterCode = challenge.starterCode[lang] || "";
      
      console.log("SWITCHING TO", lang, "RAW:", JSON.stringify(starterCode));
      
      // Try multiple replacement strategies
      starterCode = starterCode
        .replace(/\\n/g, '\n')
        .replace(/\\r\\n/g, '\n')
        .replace(/\\t/g, '    ')
        .replace(/\r\n/g, '\n')
        .replace(/\r/g, '\n');
      
      // If still no newlines, add them manually
      if (!starterCode.includes('\n')) {
        if (lang === 'cpp') {
          starterCode = starterCode
            .replace(/class Solution \{ ?public: ?/g, 'class Solution {\npublic:\n    ')
            .replace(/\( ?/g, '(')
            .replace(/ ?\)/g, ')')
            .replace(/ ?\{ ?/g, ' {\n        ')
            .replace(/ ?\} ?;/g, '\n    }\n};')
            .replace(/\/\/ Your code here/g, '// Your code here')
            .replace(/return /g, 'return ')
            .trim();
        } else if (lang === 'java') {
          starterCode = starterCode
            .replace(/class Solution \{ ?public /g, 'class Solution {\n    public ')
            .replace(/\( ?/g, '(')
            .replace(/ ?\)/g, ')')
            .replace(/ ?\{ ?/g, ' {\n        ')
            .replace(/ ?\} ?}/g, '\n    }\n}')
            .replace(/\/\/ Your code here/g, '// Your code here')
            .replace(/return /g, 'return ')
            .trim();
        } else if (lang === 'javascript') {
          starterCode = starterCode
            .replace(/function /g, 'function ')
            .replace(/\( ?/g, '(')
            .replace(/ ?\)/g, ')')
            .replace(/ ?\{ ?/g, ' {\n  ')
            .replace(/ ?\}/g, '\n}')
            .replace(/\/\/ Your code here/g, '// Your code here')
            .replace(/return /g, 'return ')
            .trim();
        }
      } else {
        // Clean up existing formatting
        starterCode = starterCode
          .split('\n')
          .map(line => line.trim())
          .join('\n')
          .replace(/\n\n+/g, '\n');
        
        // Re-indent based on language
        const lines = starterCode.split('\n');
        let indentLevel = 0;
        const indentSize = lang === 'javascript' ? 2 : 4;
        
        starterCode = lines.map(line => {
          const trimmed = line.trim();
          if (!trimmed) return '';
          
          if (trimmed.startsWith('}')) {
            indentLevel = Math.max(0, indentLevel - 1);
          }
          
          const indented = ' '.repeat(indentLevel * indentSize) + trimmed;
          
          if (trimmed.endsWith('{') || trimmed === 'public:') {
            indentLevel++;
          }
          
          return indented;
        }).join('\n');
      }
      
      console.log("FORMATTED:", starterCode);
      setCode(starterCode);
    }
  };

  const startTimer = () => {
    if (!timerStarted) {
      setTimerStarted(true);
    }
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const runTests = () => {
    try {
      if (!code.trim()) {
        showModal('warning', 'No Code Found', 'Please write some code before running tests!');
        return false;
      }

      const results = challenge.testCases.map((testCase, index) => {
        try {
          let actual;
          let passed = false;

          if (selectedLanguage === 'javascript') {
            // Execute JavaScript code
            try {
              // Create a safe execution context
              const userFunction = new Function('return ' + code)();
              
              // Parse input - handle different formats
              let parsedInput;
              try {
                parsedInput = JSON.parse(testCase.input);
              } catch {
                parsedInput = testCase.input;
              }

              // Execute the function
              if (Array.isArray(parsedInput)) {
                actual = userFunction(...parsedInput);
              } else {
                actual = userFunction(parsedInput);
              }

              // Convert actual to string for comparison
              actual = JSON.stringify(actual);
              
              // Compare with expected output
              const expected = typeof testCase.expectedOutput === 'string' 
                ? testCase.expectedOutput 
                : JSON.stringify(testCase.expectedOutput);
              
              passed = actual === expected;
            } catch (execError) {
              console.error(`Test ${index + 1} execution error:`, execError);
              actual = `Error: ${execError.message}`;
              passed = false;
            }
          } else {
            // For C++ and Java, we can't execute directly in browser
            actual = "Cannot run in browser";
            passed = false;
          }

          return {
            index: index + 1,
            passed,
            input: testCase.input,
            expected: testCase.expectedOutput,
            actual
          };
        } catch (error) {
          console.error(`Test case ${index + 1} error:`, error);
          return {
            index: index + 1,
            passed: false,
            input: testCase.input,
            expected: testCase.expectedOutput,
            actual: `Error: ${error.message}`
          };
        }
      });
      
      setTestResults(results);
      const allPassed = results.every(r => r.passed);
      const passedCount = results.filter(r => r.passed).length;
      const totalCount = results.length;
      
      if (selectedLanguage !== 'javascript') {
        showModal(
          'warning',
          'Browser Testing Not Available',
          'C++ and Java code cannot be tested directly in the browser.',
          [
            'JavaScript is recommended for instant feedback',
            'You can still submit, but validation is limited',
            'Consider switching to JavaScript for this challenge'
          ]
        );
      } else if (allPassed) {
        showModal(
          'success',
          'All Tests Passed! 🎉',
          `Congratulations! Your solution passed all ${totalCount} test cases.`,
          [
            'Your code is working correctly',
            'You can now submit your solution',
            'Click "Submit Solution" to complete the challenge'
          ]
        );
      } else {
        const failedTests = results.filter(r => !r.passed).map(r => `Test ${r.index}`).join(', ');
        showModal(
          'error',
          'Tests Failed',
          `${passedCount} out of ${totalCount} test cases passed.`,
          [
            `Failed tests: ${failedTests}`,
            'Check the test results below for details',
            'Fix your code and try again'
          ]
        );
      }
      
      return allPassed;
    } catch (error) {
      console.error("Test execution error:", error);
      showModal('error', 'Test Execution Error', `Failed to run tests: ${error.message}`);
      return false;
    }
  };

  const handleSubmit = async () => {
    if (!code.trim()) {
      showModal('warning', 'No Code Found', 'Please write some code before submitting!');
      return;
    }

    // STRICT VALIDATION: Must run tests first
    if (!testResults) {
      showModal(
        'warning',
        'Run Tests First',
        'You must run tests before submitting your solution.',
        [
          'Click "Run Tests" to validate your code',
          'Ensure all test cases pass',
          'Then you can submit your solution'
        ]
      );
      return;
    }

    // Check if all tests passed
    const allPassed = testResults.every(r => r.passed);
    const passedCount = testResults.filter(r => r.passed).length;
    const totalCount = testResults.length;

    // BLOCK SUBMISSION if tests failed for JavaScript
    if (selectedLanguage === 'javascript' && !allPassed) {
      const failedTests = testResults.filter(r => !r.passed).map(r => `Test ${r.index}`).join(', ');
      showModal(
        'error',
        'Cannot Submit - Tests Failed',
        `Your solution failed ${totalCount - passedCount} out of ${totalCount} test cases.`,
        [
          `Failed tests: ${failedTests}`,
          'All test cases must pass before submission',
          'Review the test results and fix your code',
          'Run tests again after making changes'
        ]
      );
      return;
    }

    // For C++ and Java, show warning but allow submission
    if (selectedLanguage !== 'javascript') {
      showModal(
        'warning',
        'Limited Validation',
        'C++ and Java code cannot be fully validated in the browser.',
        [
          'Your code will be submitted without complete validation',
          'Make sure you have tested your logic carefully',
          'Consider using JavaScript for instant feedback'
        ]
      );
      // Don't return - allow submission to continue
    }

    setIsSubmitting(true);
    
    try {
      const submission = {
        code,
        language: selectedLanguage,
        timeSpent,
        passed: allPassed,
        score: allPassed ? Math.max(100 - timeSpent, 50) : 0
      };
      
      await submitChallengeSolution(user.uid, getTodayDateString(), submission);
      
      // Reload data
      await loadChallenge();
      
      if (allPassed) {
        const timeBonus = timeSpent < 300 ? ' (Speed Bonus!)' : '';
        showModal(
          'success',
          'Challenge Completed! 🎉',
          `Congratulations! You successfully solved today's challenge${timeBonus}`,
          [
            `Score: ${submission.score} points`,
            `Time: ${formatTime(timeSpent)}`,
            `Language: ${selectedLanguage}`,
            'Check the leaderboard to see your ranking!'
          ]
        );
        setShowLeaderboard(true);
      } else {
        showModal(
          'info',
          'Solution Submitted',
          'Your solution has been submitted but did not pass all tests.',
          [
            'Keep practicing to improve',
            'Try again tomorrow for a new challenge',
            'Review the test results to learn more'
          ]
        );
      }
      
    } catch (error) {
      console.error("Error submitting solution:", error);
      showModal(
        'error',
        'Submission Failed',
        'Failed to submit your solution. Please try again.',
        [
          'Check your internet connection',
          'Make sure you are logged in',
          'Try refreshing the page if the problem persists'
        ]
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleRegenerateChallenge = async () => {
    if (!window.confirm("⚠️ Delete current challenge and generate a new one?\n\nThis will:\n- Delete the current challenge from database\n- Generate a completely new challenge\n- Reset all submissions for today\n\nAre you sure?")) {
      return;
    }

    setIsRegenerating(true);
    try {
      // Delete the current challenge
      await deleteDoc(doc(db, "dailyChallenges", getTodayDateString()));
      console.log("Challenge deleted successfully");
      
      // Reload to generate new challenge
      await loadChallenge();
      
      alert("✅ New challenge generated successfully!");
    } catch (error) {
      console.error("Error regenerating challenge:", error);
      alert("Failed to regenerate challenge: " + error.message);
    } finally {
      setIsRegenerating(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#1a1a1a] flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-400">Loading today's challenge...</p>
          <p className="text-gray-500 text-sm mt-2">This may take a moment while we generate a new challenge</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-[#1a1a1a] flex items-center justify-center">
        <div className="text-center max-w-md mx-auto p-6">
          <div className="text-6xl mb-4">❌</div>
          <h2 className="text-2xl font-bold text-white mb-4">Failed to Load Challenge</h2>
          <p className="text-gray-400 mb-6">{error}</p>
          <div className="space-y-3">
            <button
              onClick={loadChallenge}
              className="w-full px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-xl transition-all"
            >
              Try Again
            </button>
            <button
              onClick={() => navigate("/dashboard")}
              className="w-full px-6 py-3 bg-gray-700 hover:bg-gray-600 text-white font-semibold rounded-xl transition-all"
            >
              Back to Dashboard
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (!challenge) {
    return (
      <div className="min-h-screen bg-[#1a1a1a] flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">🤔</div>
          <p className="text-gray-400">No challenge available</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#1a1a1a] text-gray-100">
      {/* Header */}
      <header className="bg-gray-900/80 border-b border-gray-800 sticky top-0 z-10 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button
                onClick={() => navigate("/dashboard")}
                className="text-gray-400 hover:text-white transition-colors"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
              </button>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-yellow-400 via-orange-400 to-red-400 bg-clip-text text-transparent">
                  🔥 Daily Challenge
                </h1>
                <p className="text-sm text-gray-400">{new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              {/* Timer */}
              <div className="px-4 py-2 bg-gray-800 rounded-lg">
                <span className="text-sm text-gray-400">Time: </span>
                <span className="text-lg font-bold text-blue-400">{formatTime(timeSpent)}</span>
              </div>
              
              {/* Stats */}
              {stats && (
                <div className="hidden sm:flex items-center gap-4 text-sm">
                  <div className="text-gray-400">
                    <span className="text-green-400 font-bold">{stats.participantCount}</span> participants
                  </div>
                  <div className="text-gray-400">
                    <span className="text-blue-400 font-bold">{stats.completionRate}%</span> solved
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6">
        {/* Debug Info with Regenerate Button - Only for Admin */}
        {user?.email === "rajeev04632@gmail.com" && (
          <div className="mb-4 p-4 bg-gray-800 rounded-lg text-sm border border-gray-700">
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1">
                <p className="text-gray-400 mb-2 font-semibold">🔧 Admin Debug Info:</p>
                <div className="space-y-1">
                  <p className="text-gray-300">📅 Current Date String: <span className="text-blue-400 font-mono">{getTodayDateString()}</span></p>
                  <p className="text-gray-300">🆔 Challenge ID: <span className="text-blue-400 font-mono">{challenge?.id || 'Not loaded'}</span></p>
                  <p className="text-gray-300">📝 Challenge Title: <span className="text-green-400">{challenge?.title || 'N/A'}</span></p>
                  <p className="text-gray-300">🕐 Created: <span className="text-purple-400">{challenge?.createdAt ? new Date(challenge.createdAt.seconds * 1000).toLocaleString() : 'N/A'}</span></p>
                </div>
              </div>
              <button
                onClick={handleRegenerateChallenge}
                disabled={isRegenerating || loading}
                className="px-4 py-2 bg-red-600 hover:bg-red-700 disabled:bg-gray-600 disabled:cursor-not-allowed text-white font-semibold rounded-lg transition-all flex items-center gap-2 whitespace-nowrap"
              >
                {isRegenerating ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Regenerating...
                  </>
                ) : (
                  <>
                    🔄 Delete & Regenerate
                  </>
                )}
              </button>
            </div>
            <p className="text-yellow-400 mt-3 text-xs">
              💡 Admin Only: Use "Delete & Regenerate" button to get a completely new challenge for today
            </p>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Left: Problem Description */}
          <div className="space-y-4">
            {/* Challenge Info */}
            <div className="glass-effect rounded-xl p-6 border border-gray-800">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-2xl font-bold">{challenge?.title}</h2>
                <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                  challenge?.difficulty === 'Easy' ? 'bg-green-500/20 text-green-400' :
                  challenge?.difficulty === 'Medium' ? 'bg-yellow-500/20 text-yellow-400' :
                  'bg-red-500/20 text-red-400'
                }`}>
                  {challenge?.difficulty}
                </span>
              </div>
              
              <div className="prose prose-invert max-w-none">
                <p className="text-gray-300 leading-relaxed whitespace-pre-wrap">{challenge?.description}</p>
              </div>
              
              {/* Tags */}
              <div className="flex flex-wrap gap-2 mt-4">
                {challenge?.tags?.map((tag, index) => (
                  <span key={index} className="px-3 py-1 bg-blue-500/10 text-blue-400 rounded-full text-xs">
                    #{tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Examples */}
            <div className="glass-effect rounded-xl p-6 border border-gray-800">
              <h3 className="text-lg font-bold mb-4">Examples</h3>
              {challenge?.examples?.map((example, index) => (
                <div key={index} className="mb-4 last:mb-0">
                  <p className="text-sm text-gray-400 mb-1">Example {index + 1}:</p>
                  <div className="bg-gray-900/50 rounded-lg p-3 space-y-2">
                    <div>
                      <span className="text-blue-400">Input:</span>
                      <code className="ml-2 text-gray-300">{example.input}</code>
                    </div>
                    <div>
                      <span className="text-green-400">Output:</span>
                      <code className="ml-2 text-gray-300">{example.output}</code>
                    </div>
                    {example.explanation && (
                      <div className="text-sm text-gray-400 italic">
                        {example.explanation}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Constraints */}
            <div className="glass-effect rounded-xl p-6 border border-gray-800">
              <h3 className="text-lg font-bold mb-3">Constraints</h3>
              <ul className="space-y-2">
                {challenge?.constraints?.map((constraint, index) => (
                  <li key={index} className="text-sm text-gray-400 flex items-start gap-2">
                    <span className="text-blue-400 mt-1">•</span>
                    <span>{constraint}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Hints */}
            <div className="glass-effect rounded-xl p-6 border border-gray-800">
              <button
                onClick={() => setShowHints(!showHints)}
                className="flex items-center justify-between w-full text-left"
              >
                <h3 className="text-lg font-bold">💡 Hints</h3>
                <span className="text-gray-400">{showHints ? '▼' : '▶'}</span>
              </button>
              {showHints && (
                <ul className="mt-4 space-y-2">
                  {challenge?.hints?.map((hint, index) => (
                    <li key={index} className="text-sm text-gray-400 flex items-start gap-2">
                      <span className="text-yellow-400 mt-1">{index + 1}.</span>
                      <span>{hint}</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {/* Leaderboard Toggle */}
            <button
              onClick={() => setShowLeaderboard(!showLeaderboard)}
              className="w-full glass-effect rounded-xl p-4 border border-gray-800 hover:border-yellow-500/50 transition-all"
            >
              <div className="flex items-center justify-between">
                <span className="font-bold">🏆 View Leaderboard</span>
                <span className="text-gray-400">{showLeaderboard ? '▼' : '▶'}</span>
              </div>
            </button>

            {/* Leaderboard */}
            {showLeaderboard && (
              <div className="glass-effect rounded-xl p-6 border border-gray-800">
                <h3 className="text-lg font-bold mb-4">🏆 Today's Leaderboard</h3>
                {leaderboard.length === 0 ? (
                  <p className="text-gray-400 text-center py-4">No submissions yet. Be the first!</p>
                ) : (
                  <div className="space-y-2">
                    {leaderboard.map((entry, index) => (
                      <div
                        key={entry.userId}
                        className={`flex items-center justify-between p-3 rounded-lg ${
                          entry.userId === user.uid ? 'bg-blue-500/10 border border-blue-500/30' : 'bg-gray-900/50'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <span className={`text-lg font-bold ${
                            index === 0 ? 'text-yellow-400' :
                            index === 1 ? 'text-gray-300' :
                            index === 2 ? 'text-orange-400' :
                            'text-gray-500'
                          }`}>
                            #{entry.rank}
                          </span>
                          <span className="font-medium">{entry.username}</span>
                        </div>
                        <div className="flex items-center gap-4 text-sm">
                          <span className="text-gray-400">{formatTime(entry.timeSpent)}</span>
                          <span className="text-blue-400 font-bold">{entry.score} pts</span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Right: Code Editor */}
          <div className="space-y-4">
            {/* Language Selector */}
            <div className="glass-effect rounded-xl p-4 border border-gray-800">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-400">Language:</span>
                <div className="flex gap-2">
                  {['javascript', 'cpp', 'java'].map((lang) => (
                    <button
                      key={lang}
                      onClick={() => handleLanguageChange(lang)}
                      className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                        selectedLanguage === lang
                          ? 'bg-blue-500 text-white'
                          : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
                      }`}
                    >
                      {lang === 'javascript' ? 'JavaScript' : lang === 'cpp' ? 'C++' : 'Java'}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Code Editor */}
            <div className="glass-effect rounded-xl border border-gray-800 overflow-hidden shadow-2xl">
              <div className="bg-[#1e1e1e] px-4 py-3 border-b border-gray-700 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex gap-1.5">
                    <div className="w-3 h-3 rounded-full bg-red-500"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                    <div className="w-3 h-3 rounded-full bg-green-500"></div>
                  </div>
                  <span className="text-gray-400 text-sm font-medium">
                    solution.{selectedLanguage === 'javascript' ? 'js' : selectedLanguage === 'cpp' ? 'cpp' : 'java'}
                  </span>
                </div>
                {userSubmission?.passed && (
                  <span className="text-green-400 text-sm flex items-center gap-1.5 bg-green-500/10 px-3 py-1 rounded-full border border-green-500/30">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    Solved
                  </span>
                )}
              </div>
              <div className="relative">
                {/* Line numbers */}
                <div className="absolute left-0 top-0 bottom-0 w-12 bg-[#1e1e1e] border-r border-gray-700 pt-4 pb-4 text-right pr-3 select-none">
                  {code.split('\n').map((_, index) => (
                    <div key={index} className="text-gray-600 text-sm font-mono leading-6">
                      {index + 1}
                    </div>
                  ))}
                </div>
                <textarea
                  value={code}
                  onChange={(e) => {
                    setCode(e.target.value);
                    startTimer();
                  }}
                  className="w-full h-[500px] bg-[#1e1e1e] text-gray-100 pl-16 pr-4 py-4 font-mono text-sm leading-6 focus:outline-none resize-none overflow-auto"
                  placeholder="Write your solution here..."
                  spellCheck="false"
                  style={{
                    tabSize: 4,
                    fontFamily: "'Fira Code', 'Consolas', 'Monaco', 'Courier New', monospace",
                  }}
                />
              </div>
              {/* Editor footer */}
              <div className="bg-[#252526] px-4 py-2 border-t border-gray-700 flex items-center justify-between text-xs text-gray-400">
                <div className="flex items-center gap-4">
                  <span>Lines: {code.split('\n').length}</span>
                  <span>Characters: {code.length}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="px-2 py-1 bg-blue-500/10 text-blue-400 rounded border border-blue-500/30">
                    {selectedLanguage === 'javascript' ? 'JavaScript' : selectedLanguage === 'cpp' ? 'C++' : 'Java'}
                  </span>
                </div>
              </div>
            </div>

            {/* Test Results */}
            {testResults && (
              <div className="glass-effect rounded-xl p-4 border border-gray-800">
                <h3 className="text-sm font-bold mb-3">Test Results</h3>
                <div className="space-y-2">
                  {testResults.map((result) => (
                    <div
                      key={result.index}
                      className={`p-3 rounded-lg ${
                        result.passed ? 'bg-green-500/10 border border-green-500/30' : 'bg-red-500/10 border border-red-500/30'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium">Test Case {result.index}</span>
                        <span className={result.passed ? 'text-green-400' : 'text-red-400'}>
                          {result.passed ? '✓ Passed' : '✗ Failed'}
                        </span>
                      </div>
                      <div className="text-xs space-y-1">
                        <div className="text-gray-400">
                          <span className="text-blue-400">Input:</span> {result.input}
                        </div>
                        <div className="text-gray-400">
                          <span className="text-green-400">Expected:</span> {typeof result.expected === 'string' ? result.expected : JSON.stringify(result.expected)}
                        </div>
                        <div className="text-gray-400">
                          <span className={result.passed ? 'text-green-400' : 'text-red-400'}>Your Output:</span> {result.actual}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex gap-3">
              <button
                onClick={runTests}
                disabled={isSubmitting || !code.trim()}
                className="flex-1 px-6 py-3 bg-gray-800 hover:bg-gray-700 rounded-xl font-semibold transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Run Tests
              </button>
              <button
                onClick={handleSubmit}
                disabled={isSubmitting || !code.trim() || userSubmission?.passed}
                className="flex-1 px-6 py-3 bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 rounded-xl font-semibold transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {isSubmitting ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Submitting...
                  </>
                ) : userSubmission?.passed ? (
                  '✓ Already Solved'
                ) : (
                  'Submit Solution'
                )}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Submission Modal */}
      <SubmissionModal
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
