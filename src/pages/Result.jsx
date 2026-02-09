import { useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { roles, getPerformanceAnalysis } from "../services/interviewQuestions";

export default function Result() {
  const location = useLocation();
  const navigate = useNavigate();
  const {
    score,
    role,
    questions = [],
    answers = [],
    correctAnswers = 0,
    totalQuestions = 0,
    assessmentType = "text",
    question,
    answer,
  } = location.state || {};

  useEffect(() => {
    // Redirect if no score data
    if (!score) {
      navigate("/dashboard");
    }
  }, [score, navigate]);

  if (!score) return null;

  // Handle MCQ Results
  if (assessmentType === "mcq") {
    const roleInfo = roles.find((r) => r.id === role);
    const performance = getPerformanceAnalysis(
      score,
      totalQuestions,
      correctAnswers
    );
    const percentage = Math.round((correctAnswers / totalQuestions) * 100);

    return (
      <div className="min-h-screen bg-black text-white">
        {/* Background Effects */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/10 via-purple-900/10 to-pink-900/10"></div>
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl"></div>

        <div className="relative z-10">
          {/* Header */}
          <header className="border-b border-gray-800 bg-gray-900/50 backdrop-blur-sm">
            <div className="max-w-6xl mx-auto px-6 py-6">
              <div className="flex justify-between items-center">
                <div>
                  <h1 className="text-3xl font-black bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                    NextRound AI
                  </h1>
                  <p className="text-gray-400 mt-1">
                    {roleInfo?.name} Assessment Results
                  </p>
                </div>
                <button
                  onClick={() => navigate("/dashboard", { state: { fromResult: true } })}
                  className="px-6 py-3 border border-gray-600 rounded-xl text-gray-300 hover:border-gray-400 hover:text-white transition-all duration-300"
                >
                  Back to Dashboard
                </button>
              </div>
            </div>
          </header>

          <div className="max-w-6xl mx-auto px-6 py-12">
            {/* Results Header */}
            <div className="text-center mb-12">
              <div className="text-6xl mb-4">{roleInfo?.icon}</div>
              <h2 className="text-5xl font-black mb-4">
                Assessment{" "}
                <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                  Complete!
                </span>
              </h2>
              <p className="text-xl text-gray-300">
                {roleInfo?.name} - Detailed Performance Analysis
              </p>
            </div>

            <div className="grid lg:grid-cols-3 gap-8">
              {/* Left Column - Score and Analysis */}
              <div className="lg:col-span-2 space-y-8">
                {/* Score Display */}
                <div
                  className={`p-12 rounded-2xl bg-gradient-to-br ${performance.bgColor} border border-gray-700/50 text-center`}
                >
                  <div className="grid md:grid-cols-2 gap-8 mb-8">
                    <div>
                      <div className="text-6xl font-black text-white mb-2">
                        {score}/10
                      </div>
                      <div className="text-gray-300">Overall Score</div>
                    </div>
                    <div>
                      <div className="text-6xl font-black text-white mb-2">
                        {percentage}%
                      </div>
                      <div className="text-gray-300">Accuracy</div>
                    </div>
                  </div>
                  <div
                    className={`text-3xl font-bold ${performance.color} mb-4`}
                  >
                    {performance.level}
                  </div>
                  <p className="text-xl text-gray-200 leading-relaxed">
                    {performance.message}
                  </p>
                </div>

                {/* Detailed Results */}
                <div className="p-8 rounded-2xl bg-gradient-to-br from-gray-900/80 to-gray-800/80 border border-gray-700/50">
                  <h3 className="text-2xl font-bold text-white mb-6">
                    Detailed Results
                  </h3>
                  <div className="grid md:grid-cols-3 gap-6 mb-8">
                    <div className="text-center p-6 rounded-xl bg-green-500/20 border border-green-500/30">
                      <div className="text-3xl font-black text-green-400 mb-2">
                        {correctAnswers}
                      </div>
                      <div className="text-gray-300">Correct</div>
                    </div>
                    <div className="text-center p-6 rounded-xl bg-red-500/20 border border-red-500/30">
                      <div className="text-3xl font-black text-red-400 mb-2">
                        {totalQuestions - correctAnswers}
                      </div>
                      <div className="text-gray-300">Incorrect</div>
                    </div>
                    <div className="text-center p-6 rounded-xl bg-blue-500/20 border border-blue-500/30">
                      <div className="text-3xl font-black text-blue-400 mb-2">
                        {totalQuestions}
                      </div>
                      <div className="text-gray-300">Total</div>
                    </div>
                  </div>

                  {/* Question Review */}
                  <div className="max-h-96 overflow-y-auto space-y-4">
                    {questions.map((q, index) => {
                      const userAnswer = answers[index];
                      const isCorrect = userAnswer === q.correct;

                      return (
                        <div
                          key={q.id}
                          className={`p-4 rounded-xl border ${
                            isCorrect
                              ? "border-green-500/30 bg-green-500/10"
                              : "border-red-500/30 bg-red-500/10"
                          }`}
                        >
                          <div className="flex items-start justify-between mb-3">
                            <h4 className="text-white font-semibold">
                              Q{index + 1}. {q.question}
                            </h4>
                            <div
                              className={`px-3 py-1 rounded-full text-sm font-semibold ${
                                isCorrect
                                  ? "bg-green-500 text-white"
                                  : "bg-red-500 text-white"
                              }`}
                            >
                              {isCorrect ? "✓" : "✗"}
                            </div>
                          </div>
                          <div className="space-y-2 text-sm">
                            <div className="text-gray-300">
                              <span className="font-semibold">
                                Your answer:
                              </span>{" "}
                              {q.options[userAnswer] || "Not answered"}
                            </div>
                            {!isCorrect && (
                              <div className="text-green-400">
                                <span className="font-semibold">
                                  Correct answer:
                                </span>{" "}
                                {q.options[q.correct]}
                              </div>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Right Column - Actions and Stats */}
              <div className="space-y-8">
                {/* Quick Actions */}
                <div className="p-8 rounded-2xl bg-gradient-to-br from-gray-900/80 to-gray-800/80 border border-gray-700/50">
                  <div className="flex items-center mb-6">
                    <div className="text-3xl mr-4">⚡</div>
                    <h3 className="text-xl font-bold text-white">
                      Quick Actions
                    </h3>
                  </div>
                  <div className="space-y-4">
                    <button
                      onClick={() => navigate("/interview")}
                      className="w-full p-4 bg-gradient-to-r from-blue-500 to-purple-500 text-white font-bold rounded-xl hover:from-blue-600 hover:to-purple-600 transition-all duration-300 shadow-lg hover:shadow-blue-500/25"
                    >
                      Take Another Assessment
                    </button>
                    <button
                      onClick={() => navigate("/dashboard", { state: { fromResult: true } })}
                      className="w-full p-4 border border-gray-600 text-gray-300 font-semibold rounded-xl hover:border-gray-400 hover:text-white transition-all duration-300"
                    >
                      View Dashboard
                    </button>
                  </div>
                </div>

                {/* Performance Breakdown */}
                <div className="p-8 rounded-2xl bg-gradient-to-br from-gray-900/80 to-gray-800/80 border border-gray-700/50">
                  <div className="flex items-center mb-6">
                    <div className="text-3xl mr-4">📊</div>
                    <h3 className="text-xl font-bold text-white">
                      Performance Breakdown
                    </h3>
                  </div>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-300">Role:</span>
                      <span className="text-white font-semibold">
                        {roleInfo?.name}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-300">Score:</span>
                      <span className={`font-bold ${performance.color}`}>
                        {score}/10
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-300">Accuracy:</span>
                      <span className={`font-semibold ${performance.color}`}>
                        {percentage}%
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-300">Level:</span>
                      <span className={`font-semibold ${performance.color}`}>
                        {performance.level}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Improvement Tips */}
                <div className="p-8 rounded-2xl bg-gradient-to-br from-gray-900/80 to-gray-800/80 border border-gray-700/50">
                  <div className="flex items-center mb-6">
                    <div className="text-3xl mr-4">💡</div>
                    <h3 className="text-xl font-bold text-white">Next Steps</h3>
                  </div>
                  <ul className="space-y-3">
                    {percentage >= 90 ? (
                      <>
                        <li className="flex items-start">
                          <span className="text-green-400 mr-3 mt-1 text-sm">
                            •
                          </span>
                          <span className="text-gray-300 text-sm">
                            Excellent work! You're ready for interviews
                          </span>
                        </li>
                        <li className="flex items-start">
                          <span className="text-blue-400 mr-3 mt-1 text-sm">
                            •
                          </span>
                          <span className="text-gray-300 text-sm">
                            Practice with other role assessments
                          </span>
                        </li>
                        <li className="flex items-start">
                          <span className="text-purple-400 mr-3 mt-1 text-sm">
                            •
                          </span>
                          <span className="text-gray-300 text-sm">
                            Focus on advanced topics in your field
                          </span>
                        </li>
                      </>
                    ) : percentage >= 70 ? (
                      <>
                        <li className="flex items-start">
                          <span className="text-blue-400 mr-3 mt-1 text-sm">
                            •
                          </span>
                          <span className="text-gray-300 text-sm">
                            Review the questions you got wrong
                          </span>
                        </li>
                        <li className="flex items-start">
                          <span className="text-purple-400 mr-3 mt-1 text-sm">
                            •
                          </span>
                          <span className="text-gray-300 text-sm">
                            Practice more in weak areas
                          </span>
                        </li>
                        <li className="flex items-start">
                          <span className="text-pink-400 mr-3 mt-1 text-sm">
                            •
                          </span>
                          <span className="text-gray-300 text-sm">
                            Take the assessment again to improve
                          </span>
                        </li>
                      </>
                    ) : (
                      <>
                        <li className="flex items-start">
                          <span className="text-yellow-400 mr-3 mt-1 text-sm">
                            •
                          </span>
                          <span className="text-gray-300 text-sm">
                            Study the fundamentals more thoroughly
                          </span>
                        </li>
                        <li className="flex items-start">
                          <span className="text-orange-400 mr-3 mt-1 text-sm">
                            •
                          </span>
                          <span className="text-gray-300 text-sm">
                            Practice regularly with similar questions
                          </span>
                        </li>
                        <li className="flex items-start">
                          <span className="text-red-400 mr-3 mt-1 text-sm">
                            •
                          </span>
                          <span className="text-gray-300 text-sm">
                            Consider additional learning resources
                          </span>
                        </li>
                      </>
                    )}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Handle Text-based Interview Results (Legacy)
  const getScoreInfo = (score) => {
    if (score >= 9)
      return {
        text: "Outstanding!",
        emoji: "🏆",
        color: "text-yellow-400",
        bgGradient: "from-yellow-500/20 to-orange-500/20",
        borderColor: "border-yellow-500/30",
      };
    if (score >= 7)
      return {
        text: "Great Job!",
        emoji: "🎉",
        color: "text-green-400",
        bgGradient: "from-green-500/20 to-emerald-500/20",
        borderColor: "border-green-500/30",
      };
    if (score >= 5)
      return {
        text: "Good Effort!",
        emoji: "👍",
        color: "text-blue-400",
        bgGradient: "from-blue-500/20 to-cyan-500/20",
        borderColor: "border-blue-500/30",
      };
    return {
      text: "Keep Improving!",
      emoji: "💪",
      color: "text-purple-400",
      bgGradient: "from-purple-500/20 to-pink-500/20",
      borderColor: "border-purple-500/30",
    };
  };

  const getScoreDetails = (score) => {
    if (score >= 9)
      return "Outstanding performance! You demonstrated excellent communication skills, provided comprehensive answers with specific examples, and showed strong problem-solving abilities.";
    if (score >= 7)
      return "Great work! Your answers show solid understanding and good structure. Consider adding more specific examples and quantifiable results to strengthen your responses further.";
    if (score >= 5)
      return "Good effort! You're on the right track. Focus on providing more detailed answers with specific examples, better structure, and clearer explanations of your thought process.";
    return "There's significant room for improvement. Focus on providing more detailed answers with specific examples, better structure, and practice articulating your thoughts more clearly.";
  };

  const getImprovementTips = (score) => {
    if (score >= 9)
      return [
        "Continue practicing to maintain this excellent level",
        "Focus on industry-specific questions for your target role",
        "Practice with more complex scenario-based questions",
        "Work on your storytelling and presentation skills",
      ];
    if (score >= 7)
      return [
        "Add more quantifiable results to your examples",
        "Practice the STAR method more consistently",
        "Work on concise yet comprehensive answers",
        "Research company-specific interview questions",
      ];
    if (score >= 5)
      return [
        "Use the STAR method (Situation, Task, Action, Result)",
        "Prepare more specific examples from your experience",
        "Practice structuring your answers clearly",
        "Work on speaking more confidently and clearly",
      ];
    return [
      "Practice basic interview questions daily",
      "Prepare specific examples for common behavioral questions",
      "Work on clear communication and structure",
      "Consider mock interviews with friends or mentors",
      "Research the company and role thoroughly",
    ];
  };

  const scoreInfo = getScoreInfo(score);
  const wordCount = answer
    ? answer
        .trim()
        .split(/\s+/)
        .filter((word) => word.length > 0).length
    : 0;

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-900/10 via-purple-900/10 to-pink-900/10"></div>
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl"></div>

      <div className="relative z-10">
        {/* Header */}
        <header className="border-b border-gray-800 bg-gray-900/50 backdrop-blur-sm">
          <div className="max-w-6xl mx-auto px-6 py-6">
            <div className="flex justify-between items-center">
              <div>
                <h1 className="text-3xl font-black bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                  NextRound AI
                </h1>
                <p className="text-gray-400 mt-1">Interview Results</p>
              </div>
              <button
                onClick={() => navigate("/dashboard", { state: { fromResult: true } })}
                className="px-6 py-3 border border-gray-600 rounded-xl text-gray-300 hover:border-gray-400 hover:text-white transition-all duration-300"
              >
                Back to Dashboard
              </button>
            </div>
          </div>
        </header>

        <div className="max-w-6xl mx-auto px-6 py-12">
          {/* Results Header */}
          <div className="text-center mb-12">
            <div className="text-6xl mb-4">{scoreInfo.emoji}</div>
            <h2 className="text-5xl font-black mb-4">
              Interview{" "}
              <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                Complete!
              </span>
            </h2>
            <p className="text-xl text-gray-300">
              Here's your detailed performance analysis
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Left Column - Score and Analysis */}
            <div className="lg:col-span-2 space-y-8">
              {/* Score Display */}
              <div
                className={`p-12 rounded-2xl bg-gradient-to-br ${scoreInfo.bgGradient} border ${scoreInfo.borderColor} text-center`}
              >
                <div className="text-8xl font-black text-white mb-4">
                  {score}/10
                </div>
                <div className={`text-3xl font-bold ${scoreInfo.color} mb-6`}>
                  {scoreInfo.text}
                </div>
                <p className="text-xl text-gray-200 max-w-2xl mx-auto leading-relaxed">
                  {getScoreDetails(score)}
                </p>
              </div>

              {/* Question Review */}
              <div className="p-8 rounded-2xl bg-gradient-to-br from-gray-900/80 to-gray-800/80 border border-gray-700/50">
                <div className="flex items-center mb-6">
                  <div className="text-3xl mr-4">❓</div>
                  <h3 className="text-2xl font-bold text-white">
                    Question Asked
                  </h3>
                </div>
                <div className="p-6 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-xl border border-blue-500/20">
                  <p className="text-lg text-gray-100 leading-relaxed">
                    {question}
                  </p>
                </div>
              </div>

              {/* Answer Review */}
              <div className="p-8 rounded-2xl bg-gradient-to-br from-gray-900/80 to-gray-800/80 border border-gray-700/50">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center">
                    <div className="text-3xl mr-4">💬</div>
                    <h3 className="text-2xl font-bold text-white">
                      Your Answer
                    </h3>
                  </div>
                  <div className="text-gray-400">
                    <span
                      className={`font-semibold ${
                        wordCount > 100
                          ? "text-green-400"
                          : wordCount > 50
                          ? "text-yellow-400"
                          : "text-gray-400"
                      }`}
                    >
                      {wordCount}
                    </span>{" "}
                    words
                  </div>
                </div>

                <div className="p-6 bg-gray-800/50 rounded-xl border border-gray-600 max-h-64 overflow-y-auto">
                  <p className="text-gray-200 whitespace-pre-wrap leading-relaxed">
                    {answer || "No answer provided"}
                  </p>
                </div>

                <div className="mt-4 text-sm text-gray-400">
                  {wordCount === 0 && "⚠️ No answer was provided"}
                  {wordCount > 0 &&
                    wordCount < 50 &&
                    "💡 Consider providing more detailed answers"}
                  {wordCount >= 50 &&
                    wordCount < 100 &&
                    "👍 Good answer length"}
                  {wordCount >= 100 && "✅ Comprehensive answer!"}
                </div>
              </div>
            </div>

            {/* Right Column - Actions and Tips */}
            <div className="space-y-8">
              {/* Quick Actions */}
              <div className="p-8 rounded-2xl bg-gradient-to-br from-gray-900/80 to-gray-800/80 border border-gray-700/50">
                <div className="flex items-center mb-6">
                  <div className="text-3xl mr-4">⚡</div>
                  <h3 className="text-xl font-bold text-white">
                    Quick Actions
                  </h3>
                </div>
                <div className="space-y-4">
                  <button
                    onClick={() => navigate("/interview")}
                    className="w-full p-4 bg-gradient-to-r from-blue-500 to-purple-500 text-white font-bold rounded-xl hover:from-blue-600 hover:to-purple-600 transition-all duration-300 shadow-lg hover:shadow-blue-500/25"
                  >
                    Practice Again
                  </button>
                  <button
                    onClick={() => navigate("/dashboard", { state: { fromResult: true } })}
                    className="w-full p-4 border border-gray-600 text-gray-300 font-semibold rounded-xl hover:border-gray-400 hover:text-white transition-all duration-300"
                  >
                    View Dashboard
                  </button>
                </div>
              </div>

              {/* Performance Metrics */}
              <div className="p-8 rounded-2xl bg-gradient-to-br from-gray-900/80 to-gray-800/80 border border-gray-700/50">
                <div className="flex items-center mb-6">
                  <div className="text-3xl mr-4">📊</div>
                  <h3 className="text-xl font-bold text-white">
                    Performance Metrics
                  </h3>
                </div>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-300">Score:</span>
                    <span className={`font-bold ${scoreInfo.color}`}>
                      {score}/10
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-300">Answer Length:</span>
                    <span
                      className={`font-semibold ${
                        wordCount > 100
                          ? "text-green-400"
                          : wordCount > 50
                          ? "text-yellow-400"
                          : "text-gray-400"
                      }`}
                    >
                      {wordCount > 100
                        ? "Detailed"
                        : wordCount > 50
                        ? "Good"
                        : "Brief"}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-300">Performance:</span>
                    <span className={`font-semibold ${scoreInfo.color}`}>
                      {score >= 7
                        ? "Strong"
                        : score >= 5
                        ? "Average"
                        : "Needs Work"}
                    </span>
                  </div>
                </div>
              </div>

              {/* Improvement Tips */}
              <div className="p-8 rounded-2xl bg-gradient-to-br from-gray-900/80 to-gray-800/80 border border-gray-700/50">
                <div className="flex items-center mb-6">
                  <div className="text-3xl mr-4">💡</div>
                  <h3 className="text-xl font-bold text-white">
                    Tips for Improvement
                  </h3>
                </div>
                <ul className="space-y-3">
                  {getImprovementTips(score).map((tip, index) => (
                    <li key={index} className="flex items-start">
                      <span className="text-blue-400 mr-3 mt-1 text-sm">•</span>
                      <span className="text-gray-300 text-sm leading-relaxed">
                        {tip}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
