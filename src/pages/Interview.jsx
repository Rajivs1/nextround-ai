import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { doc, updateDoc, arrayUnion } from "firebase/firestore";
import { db } from "../firebase";
import { useAuth } from "../context/AuthContext";
import { roles, getQuestionsForRole, calculateMCQScore } from "../services/interviewQuestions";
import { generateInterviewQuestions } from "../services/aiMCQGenerator";
import Timer from "../components/Timer";

export default function Interview() {
  const { user } = useAuth();
  const navigate = useNavigate();
  
  // State management
  const [selectedRole, setSelectedRole] = useState(null);
  const [assessmentStarted, setAssessmentStarted] = useState(false);
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [timerActive, setTimerActive] = useState(false);
  const [useAI, setUseAI] = useState(false);
  const [isGeneratingQuestions, setIsGeneratingQuestions] = useState(false);

  useEffect(() => {
    // Reset selected answer when question changes
    if (assessmentStarted && questions.length > 0) {
      setSelectedAnswer(answers[currentQuestionIndex] || null);
    }
  }, [currentQuestionIndex, assessmentStarted, questions.length, answers]);

  const startAssessment = async (roleId) => {
    setIsGeneratingQuestions(true);
    
    try {
      let roleQuestions;
      
      if (useAI) {
        // Generate AI questions
        console.log('🤖 Generating AI questions...');
        roleQuestions = await generateInterviewQuestions(roleId, 25);
      } else {
        // Use hard-coded questions
        roleQuestions = getQuestionsForRole(roleId, 25);
      }
      
      setQuestions(roleQuestions);
      setSelectedRole(roleId);
      setAssessmentStarted(true);
      setTimerActive(true);
      setAnswers(new Array(roleQuestions.length).fill(null));
    } catch (error) {
      console.error('Error generating questions:', error);
      alert('Failed to generate questions. Please try again or use standard questions.');
    } finally {
      setIsGeneratingQuestions(false);
    }
  };

  const handleAnswerSelect = (answerIndex) => {
    setSelectedAnswer(answerIndex);
  };

  const handleNextQuestion = () => {
    // Save current answer
    const newAnswers = [...answers];
    newAnswers[currentQuestionIndex] = selectedAnswer;
    setAnswers(newAnswers);
    setSelectedAnswer(null);

    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      handleSubmitAssessment(newAnswers);
    }
  };

  const handlePreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      // Save current answer
      const newAnswers = [...answers];
      newAnswers[currentQuestionIndex] = selectedAnswer;
      setAnswers(newAnswers);
      
      setCurrentQuestionIndex(currentQuestionIndex - 1);
      setSelectedAnswer(answers[currentQuestionIndex - 1]);
    }
  };

  const handleSubmitAssessment = async (finalAnswers = answers) => {
    if (isSubmitting) return;
    
    setIsSubmitting(true);
    setTimerActive(false);

    try {
      // Calculate score
      const correctAnswers = finalAnswers.filter((answer, index) => 
        answer === questions[index]?.correct
      ).length;
      
      const score = calculateMCQScore(finalAnswers, questions);
      
      console.log("Saving score to Firestore:", score); // Debug log
      console.log("User ID:", user.uid); // Debug log
      
      // Save score to Firestore with error handling
      const userDocRef = doc(db, "users", user.uid);
      
      try {
        await updateDoc(userDocRef, {
          scores: arrayUnion(score)
        });
        console.log("Score saved successfully using updateDoc"); // Debug log
      } catch (updateError) {
        console.log("UpdateDoc failed, trying setDoc:", updateError);
        // If updateDoc fails (document doesn't exist), create it
        const { setDoc } = await import("firebase/firestore");
        await setDoc(userDocRef, {
          email: user.email,
          scores: [score],
          createdAt: new Date()
        }, { merge: true });
        console.log("Score saved successfully using setDoc"); // Debug log
      }

      // Small delay to ensure Firestore has processed the update
      await new Promise(resolve => setTimeout(resolve, 500));

      // Navigate to result page with detailed results
      navigate("/interview/result", { 
        state: { 
          score,
          role: selectedRole,
          questions,
          answers: finalAnswers,
          correctAnswers,
          totalQuestions: questions.length,
          assessmentType: 'mcq'
        } 
      });
    } catch (error) {
      console.error("Error saving score:", error);
      alert("Error submitting assessment. Please try again.");
      setIsSubmitting(false);
      setTimerActive(true);
    }
  };

  const handleTimeUp = () => {
    if (!isSubmitting) {
      handleSubmitAssessment();
    }
  };

  const getProgressPercentage = () => {
    return ((currentQuestionIndex + 1) / questions.length) * 100;
  };

  const getAnsweredCount = () => {
    return answers.filter(answer => answer !== null).length;
  };

  // Role Selection Screen
  if (!assessmentStarted) {
    return (
      <div className="min-h-screen bg-black text-gray-100 relative overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/10 via-purple-900/10 to-pink-900/10 animate-gradient"></div>
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl animate-pulse" style={{animationDelay: '1s'}}></div>

        <div className="relative z-10">
          {/* Header */}
          <header className="border-b border-gray-800 bg-black/50 backdrop-blur-sm">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 py-4 sm:py-6">
              <div className="flex justify-between items-center">
                <div>
                  <h1 
                    onClick={() => navigate("/")}
                    className="text-xl sm:text-2xl lg:text-3xl font-black bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent cursor-pointer hover:scale-105 transition-transform duration-200"
                  >
                    NextRound AI
                  </h1>
                  <p className="text-gray-400 mt-1 text-xs sm:text-sm">Choose Your Assessment</p>
                </div>
                <button
                  onClick={() => navigate("/dashboard")}
                  className="px-3 sm:px-6 py-2 sm:py-3 border border-gray-600 rounded-xl text-gray-300 hover:border-gray-400 hover:text-white transition-all duration-300 text-xs sm:text-base"
                >
                  <span className="hidden sm:inline">Back to Dashboard</span>
                  <span className="sm:hidden">Dashboard</span>
                </button>
              </div>
            </div>
          </header>

          <div className="max-w-6xl mx-auto px-6 py-12">
            {/* Header Section */}
            <div className="text-center mb-12">
              <h2 className="text-5xl font-black mb-6">
                Choose Your{" "}
                <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                  Interview Role
                </span>
              </h2>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-8">
                Select the role you're preparing for and take a comprehensive 25-question MCQ assessment
              </p>
              
              {/* AI Toggle */}
              <div className="max-w-2xl mx-auto mb-8">
                <div className="inline-flex items-center gap-4 bg-gradient-to-r from-black/90 to-gray-800/90 border border-gray-700/50 rounded-2xl p-4">
                  <span className="text-gray-300 font-medium">Question Type:</span>
                  <button
                    onClick={() => setUseAI(false)}
                    className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
                      !useAI
                        ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg scale-105'
                        : 'bg-black/90 text-gray-400 hover:text-white'
                    }`}
                  >
                    📚 Standard Questions
                  </button>
                  <button
                    onClick={() => setUseAI(true)}
                    className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
                      useAI
                        ? 'bg-gradient-to-r from-emerald-500 to-green-500 text-white shadow-lg scale-105'
                        : 'bg-black/90 text-gray-400 hover:text-white'
                    }`}
                  >
                    🤖 AI-Generated Questions
                  </button>
                </div>
                {useAI && (
                  <p className="text-sm text-emerald-400 mt-3 animate-pulse">
                    ✨ Questions will be dynamically generated by AI for you!
                  </p>
                )}
              </div>
            </div>

            {/* Role Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-12 max-w-7xl mx-auto">
              {roles.map((role) => (
                <div
                  key={role.id}
                  className={`group p-6 rounded-2xl bg-black/70 backdrop-blur-xl border-2 border-gray-700 hover:border-purple-500/50 transition-all duration-300 hover:scale-105 ${
                    isGeneratingQuestions ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'
                  } overflow-hidden relative shadow-xl hover:shadow-purple-500/20`}
                  onClick={() => !isGeneratingQuestions && startAssessment(role.id)}
                >
                  <div className={`absolute inset-0 bg-gradient-to-br ${role.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300 rounded-2xl`}></div>
                  <div className="text-center relative z-10">
                    <div className="text-5xl mb-4 group-hover:scale-110 transition-transform duration-300">
                      {role.icon}
                    </div>
                    <h3 className="text-xl font-bold text-white mb-3">
                      {role.name}
                    </h3>
                    <p className="text-gray-400 mb-4 leading-relaxed text-sm">
                      {role.description}
                    </p>
                    <button 
                      disabled={isGeneratingQuestions}
                      className={`w-full py-2.5 bg-gradient-to-r ${role.color} text-white font-semibold rounded-xl hover:scale-105 transition-all duration-300 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed text-sm`}
                    >
                      {isGeneratingQuestions ? 'Generating...' : 'Start Assessment'}
                    </button>
                  </div>
                </div>
              ))}
            </div>
            
            {/* Loading Indicator */}
            {isGeneratingQuestions && (
              <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center">
                <div className="bg-black/80 backdrop-blur-xl p-8 rounded-2xl border border-gray-700 max-w-md mx-4 text-center">
                  <div className="animate-spin text-6xl mb-6">🤖</div>
                  <h3 className="text-2xl font-bold text-white mb-4">
                    {useAI ? 'Generating AI Questions...' : 'Loading Questions...'}
                  </h3>
                  <p className="text-gray-400">
                    {useAI 
                      ? 'Creating personalized questions tailored for you. This may take 10-20 seconds.'
                      : 'Preparing your assessment...'
                    }
                  </p>
                  <div className="mt-6 flex gap-2 justify-center">
                    <div className="w-3 h-3 bg-blue-500 rounded-full animate-bounce" style={{animationDelay: '0s'}}></div>
                    <div className="w-3 h-3 bg-purple-500 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                    <div className="w-3 h-3 bg-pink-500 rounded-full animate-bounce" style={{animationDelay: '0.4s'}}></div>
                  </div>
                </div>
              </div>
            )}

            {/* Assessment Info */}
            <div className="max-w-4xl mx-auto p-8 rounded-2xl bg-black/70 backdrop-blur-xl border border-gray-700/50">
              <div className="text-center">
                <h3 className="text-2xl font-bold text-white mb-6">Assessment Details</h3>
                <div className="grid md:grid-cols-3 gap-8">
                  <div className="text-center">
                    <div className="text-4xl mb-4">📝</div>
                    <h4 className="text-lg font-semibold text-white mb-2">25 Questions</h4>
                    <p className="text-gray-400">Comprehensive MCQ assessment</p>
                  </div>
                  <div className="text-center">
                    <div className="text-4xl mb-4">⏱️</div>
                    <h4 className="text-lg font-semibold text-white mb-2">30 Minutes</h4>
                    <p className="text-gray-400">Timed assessment for real experience</p>
                  </div>
                  <div className="text-center">
                    <div className="text-4xl mb-4">🎯</div>
                    <h4 className="text-lg font-semibold text-white mb-2">Instant Results</h4>
                    <p className="text-gray-400">Detailed performance analysis</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Assessment Screen
  const currentQuestion = questions[currentQuestionIndex];
  const roleInfo = roles.find(r => r.id === selectedRole);

  return (
    <div className="min-h-screen bg-black text-gray-100">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-900/10 via-purple-900/10 to-pink-900/10"></div>
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl"></div>

      <div className="relative z-10">
        {/* Header */}
        <header className="border-b border-gray-800 bg-black/50 backdrop-blur-sm">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 py-4 sm:py-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 sm:gap-0">
              <div>
                <h1 
                  onClick={() => navigate("/")}
                  className="text-xl sm:text-2xl lg:text-3xl font-black bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent cursor-pointer hover:scale-105 transition-transform duration-200"
                >
                  NextRound AI
                </h1>
                <p className="text-gray-400 mt-1 text-xs sm:text-sm">{roleInfo?.name} Assessment</p>
              </div>
              <div className="flex items-center gap-2 sm:gap-4 w-full sm:w-auto justify-between sm:justify-end">
                <div className="text-gray-300 text-sm sm:text-base">
                  Q {currentQuestionIndex + 1}/{questions.length}
                </div>
                <button
                  onClick={() => navigate("/dashboard")}
                  className="px-3 sm:px-6 py-2 sm:py-3 border border-gray-600 rounded-xl text-gray-300 hover:border-gray-400 hover:text-white transition-all duration-300 text-xs sm:text-base"
                >
                  <span className="hidden sm:inline">Exit Assessment</span>
                  <span className="sm:hidden">Exit</span>
                </button>
              </div>
            </div>
          </div>
        </header>

        <div className="max-w-6xl mx-auto px-6 py-8">
          <div className="grid lg:grid-cols-4 gap-8">
            {/* Main Question Area */}
            <div className="lg:col-span-3 space-y-8">
              {/* Progress Bar */}
              <div className="p-6 rounded-2xl bg-black/70 backdrop-blur-xl border border-gray-700/50">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-semibold text-white">Progress</h3>
                  <span className="text-gray-400">{Math.round(getProgressPercentage())}% Complete</span>
                </div>
                <div className="w-full bg-gray-700 rounded-full h-3">
                  <div 
                    className="h-3 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full transition-all duration-500"
                    style={{ width: `${getProgressPercentage()}%` }}
                  ></div>
                </div>
              </div>

              {/* Question Card */}
              <div className="p-8 rounded-2xl bg-black/70 backdrop-blur-xl border border-gray-700/50">
                <div className="flex items-center mb-6">
                  <div className="text-3xl mr-4">{roleInfo?.icon}</div>
                  <div>
                    <h3 className="text-xl font-bold text-white">Question {currentQuestionIndex + 1}</h3>
                    <p className="text-gray-400">Choose the best answer</p>
                  </div>
                </div>
                
                <div className="mb-8">
                  <p className="text-xl text-gray-100 leading-relaxed whitespace-pre-wrap font-mono">
                    {currentQuestion?.question}
                  </p>
                </div>

                {/* Answer Options */}
                <div className="space-y-4 mb-8">
                  {currentQuestion?.options.map((option, index) => (
                    <button
                      key={index}
                      onClick={() => handleAnswerSelect(index)}
                      className={`w-full p-4 text-left rounded-xl border-2 transition-all duration-300 ${
                        selectedAnswer === index
                          ? 'border-blue-500 bg-blue-500/20 text-white'
                          : 'border-gray-600 bg-black/50 text-gray-300 hover:border-gray-500 hover:bg-gray-700/50'
                      }`}
                    >
                      <div className="flex items-start">
                        <div className={`w-6 h-6 rounded-full border-2 mr-4 flex items-center justify-center flex-shrink-0 mt-1 ${
                          selectedAnswer === index ? 'border-blue-500 bg-blue-500' : 'border-gray-500'
                        }`}>
                          {selectedAnswer === index && (
                            <div className="w-2 h-2 bg-white rounded-full"></div>
                          )}
                        </div>
                        <span className="text-lg whitespace-pre-wrap font-mono break-words flex-1">{option}</span>
                      </div>
                    </button>
                  ))}
                </div>

                {/* Navigation Buttons */}
                <div className="flex justify-between items-center">
                  <button
                    onClick={handlePreviousQuestion}
                    disabled={currentQuestionIndex === 0}
                    className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
                      currentQuestionIndex === 0
                        ? 'bg-gray-700 text-gray-500 cursor-not-allowed'
                        : 'bg-gray-600 text-white hover:bg-gray-500'
                    }`}
                  >
                    Previous
                  </button>

                  <button
                    onClick={handleNextQuestion}
                    disabled={selectedAnswer === null}
                    className={`px-8 py-3 rounded-xl font-bold transition-all duration-300 ${
                      selectedAnswer === null
                        ? 'bg-gray-600 text-gray-400 cursor-not-allowed'
                        : currentQuestionIndex === questions.length - 1
                        ? 'bg-gradient-to-r from-green-500 to-emerald-500 text-white hover:from-green-600 hover:to-emerald-600 shadow-lg hover:shadow-green-500/25'
                        : 'bg-gradient-to-r from-blue-500 to-purple-500 text-white hover:from-blue-600 hover:to-purple-600 shadow-lg hover:shadow-blue-500/25'
                    }`}
                  >
                    {isSubmitting ? (
                      <div className="flex items-center">
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                        Submitting...
                      </div>
                    ) : currentQuestionIndex === questions.length - 1 ? (
                      'Submit Assessment'
                    ) : (
                      'Next Question'
                    )}
                  </button>
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Timer */}
              <Timer 
                duration={1800} // 30 minutes
                onTimeUp={handleTimeUp}
                isActive={timerActive}
              />

              {/* Assessment Stats */}
              <div className="p-6 rounded-2xl bg-black/70 backdrop-blur-xl border border-gray-700/50">
                <h3 className="text-lg font-bold text-white mb-4">Assessment Stats</h3>
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Total Questions:</span>
                    <span className="text-white font-semibold">{questions.length}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Answered:</span>
                    <span className="text-green-400 font-semibold">{getAnsweredCount()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Remaining:</span>
                    <span className="text-yellow-400 font-semibold">{questions.length - getAnsweredCount()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Current:</span>
                    <span className="text-blue-400 font-semibold">{currentQuestionIndex + 1}</span>
                  </div>
                </div>
              </div>

              {/* Tips */}
              <div className="p-6 rounded-2xl bg-black/70 backdrop-blur-xl border border-gray-700/50">
                <h3 className="text-lg font-bold text-white mb-4">Assessment Tips</h3>
                <ul className="space-y-3 text-sm text-gray-300">
                  <li className="flex items-start">
                    <span className="text-blue-400 mr-2">•</span>
                    Read each question carefully
                  </li>
                  <li className="flex items-start">
                    <span className="text-purple-400 mr-2">•</span>
                    You can go back to previous questions
                  </li>
                  <li className="flex items-start">
                    <span className="text-pink-400 mr-2">•</span>
                    Manage your time wisely
                  </li>
                  <li className="flex items-start">
                    <span className="text-cyan-400 mr-2">•</span>
                    Choose the best possible answer
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}



