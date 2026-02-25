import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { arrayQuestions } from '../data/questions/arrays';
import { stringQuestions } from '../data/questions/strings';
import { stackQuestions } from '../data/questions/stack';
import { queueQuestions } from '../data/questions/queue';
import { linkedListQuestions } from '../data/questions/linkedlist';
import { recursionQuestions } from '../data/questions/recursion';
import { patternQuestions } from '../data/questions/patterns';
import { functionQuestions } from '../data/questions/functions';
import { generateDSAProblems } from '../services/aiDSAGenerator';

const TOPICS = [
  { id: 'arrays', name: 'Arrays', icon: '📊', color: 'from-blue-500 to-cyan-500', questions: arrayQuestions },
  { id: 'strings', name: 'Strings', icon: '📝', color: 'from-purple-500 to-pink-500', questions: stringQuestions },
  { id: 'stack', name: 'Stack', icon: '📚', color: 'from-orange-500 to-red-500', questions: stackQuestions },
  { id: 'queue', name: 'Queue', icon: '🎯', color: 'from-green-500 to-emerald-500', questions: queueQuestions },
  { id: 'linkedlist', name: 'Linked List', icon: '🔗', color: 'from-indigo-500 to-blue-500', questions: linkedListQuestions },
  { id: 'recursion', name: 'Recursion', icon: '🔄', color: 'from-violet-500 to-purple-500', questions: recursionQuestions },
  { id: 'patterns', name: 'Patterns', icon: '🎨', color: 'from-pink-500 to-rose-500', questions: patternQuestions },
  { id: 'functions', name: 'Functions', icon: '⚡', color: 'from-yellow-500 to-orange-500', questions: functionQuestions }
];

export default function Problems() {
  const navigate = useNavigate();
  const [selectedTopics, setSelectedTopics] = useState(['arrays']);
  const [searchQuery, setSearchQuery] = useState('');
  const [difficultyFilter, setDifficultyFilter] = useState('All');
  const [useAI, setUseAI] = useState(false);
  const [aiProblems, setAiProblems] = useState({});
  const [isGeneratingProblems, setIsGeneratingProblems] = useState(false);
  const [generationError, setGenerationError] = useState('');

  // Generate AI problems when AI mode is enabled
  useEffect(() => {
    if (useAI && selectedTopics.length > 0) {
      generateProblemsForSelectedTopics();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [useAI]);

  const generateProblemsForSelectedTopics = async () => {
    setIsGeneratingProblems(true);
    setGenerationError('');
    
    try {
      const newAiProblems = {};
      
      for (const topicId of selectedTopics) {
        // Skip if already generated for this topic
        if (aiProblems[topicId] && aiProblems[topicId].length > 0) {
          newAiProblems[topicId] = aiProblems[topicId];
          continue;
        }
        
        console.log(`🤖 Generating problems for ${topicId}...`);
        const problems = await generateDSAProblems(topicId, 8, 'mixed');
        newAiProblems[topicId] = problems;
        
        // Small delay between topics
        if (selectedTopics.indexOf(topicId) < selectedTopics.length - 1) {
          await new Promise(resolve => setTimeout(resolve, 1000));
        }
      }
      
      setAiProblems(prev => ({ ...prev, ...newAiProblems }));
    } catch (error) {
      console.error('Error generating problems:', error);
      setGenerationError('Failed to generate AI problems. Using standard problems instead.');
      setUseAI(false);
    } finally {
      setIsGeneratingProblems(false);
    }
  };

  const toggleTopic = (topicId) => {
    if (selectedTopics.includes(topicId)) {
      if (selectedTopics.length > 1) {
        setSelectedTopics(selectedTopics.filter(id => id !== topicId));
      }
    } else {
      setSelectedTopics([...selectedTopics, topicId]);
      
      // Generate AI problems for newly selected topic if in AI mode
      if (useAI && (!aiProblems[topicId] || aiProblems[topicId].length === 0)) {
        generateDSAProblems(topicId, 8, 'mixed')
          .then(problems => {
            setAiProblems(prev => ({ ...prev, [topicId]: problems }));
          })
          .catch(error => {
            console.error(`Failed to generate problems for ${topicId}:`, error);
          });
      }
    }
  };

  const getFilteredQuestions = () => {
    const allQuestions = TOPICS
      .filter(topic => selectedTopics.includes(topic.id))
      .flatMap(topic => {
        // Use AI problems if available and AI mode is on
        const questionsSource = (useAI && aiProblems[topic.id]) 
          ? aiProblems[topic.id] 
          : topic.questions;
        
        return questionsSource.map(q => ({ 
          ...q, 
          topic: topic.name, 
          topicId: topic.id, 
          topicIcon: topic.icon, 
          topicColor: topic.color 
        }));
      });

    return allQuestions.filter(q => {
      const matchesSearch = q.title.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesDifficulty = difficultyFilter === 'All' || q.difficulty === difficultyFilter;
      return matchesSearch && matchesDifficulty;
    });
  };

  const filteredQuestions = getFilteredQuestions();

  const getDifficultyBadge = (difficulty) => {
    switch(difficulty) {
      case 'Easy': return 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30';
      case 'Medium': return 'bg-amber-500/10 text-amber-400 border-amber-500/30';
      case 'Hard': return 'bg-rose-500/10 text-rose-400 border-rose-500/30';
      default: return 'bg-gray-500/10 text-gray-400 border-gray-500/30';
    }
  };

  const handleSolve = (topicId, questionId) => {
    navigate(`/practice?topic=${topicId}&question=${questionId}`);
  };

  const getTopicStats = () => {
    return TOPICS.map(topic => {
      const easy = topic.questions.filter(q => q.difficulty === 'Easy').length;
      const medium = topic.questions.filter(q => q.difficulty === 'Medium').length;
      const hard = topic.questions.filter(q => q.difficulty === 'Hard').length;
      return { ...topic, easy, medium, hard, total: topic.questions.length };
    });
  };

  const topicStats = getTopicStats();

  return (
    <div className="min-h-screen bg-black relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-900/10 via-blue-900/10 to-pink-900/10 animate-gradient"></div>
      <div className="absolute top-1/3 left-1/4 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-1/3 right-1/4 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl animate-pulse" style={{animationDelay: '1s'}}></div>
      
      {/* Header */}
      <div className="relative bg-gradient-to-r from-slate-900 via-purple-900/20 to-black border-b border-purple-500/20 backdrop-blur-xl">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0zNiAxOGMzLjMxNCAwIDYgMi42ODYgNiA2cy0yLjY4NiA2LTYgNi02LTIuNjg2LTYtNiAyLjY4Ni02IDYtNnoiIHN0cm9rZT0iIzhjNWZmZiIgc3Ryb2tlLXdpZHRoPSIuNSIgb3BhY2l0eT0iLjEiLz48L2c+PC9zdmc+')] opacity-30"></div>
        
        <div className="relative px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            {/* Title Section */}
            <div className="flex items-center gap-3 sm:gap-4">
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center shadow-lg shadow-purple-500/50">
                <span className="text-xl sm:text-2xl">🎯</span>
              </div>
              <div>
                <h1 className="text-2xl sm:text-3xl font-bold text-white">Practice Problems</h1>
                <p className="text-xs sm:text-sm text-purple-300">Choose a problem and start coding</p>
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-wrap items-center gap-2 sm:gap-4 w-full sm:w-auto">
              {/* AI/Standard Toggle */}
              <div className="flex items-center gap-2 sm:gap-3 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl px-3 sm:px-4 py-2 flex-1 sm:flex-initial">
                <span className="text-xs sm:text-sm text-gray-300 hidden sm:inline">Source:</span>
                <button
                  onClick={() => setUseAI(false)}
                  disabled={isGeneratingProblems}
                  className={`px-2 sm:px-4 py-1 sm:py-1.5 rounded-lg text-xs sm:text-sm font-semibold transition-all duration-300 ${
                    !useAI
                      ? 'bg-blue-500 text-white'
                      : 'bg-transparent text-gray-400 hover:text-white'
                  }`}
                >
                  <span className="hidden sm:inline">📚 Standard</span>
                  <span className="sm:hidden">📚</span>
                </button>
                <button
                  onClick={() => setUseAI(true)}
                  disabled={isGeneratingProblems}
                  className={`px-2 sm:px-4 py-1 sm:py-1.5 rounded-lg text-xs sm:text-sm font-semibold transition-all duration-300 ${
                    useAI
                      ? 'bg-emerald-500 text-white'
                      : 'bg-transparent text-gray-400 hover:text-white'
                  }`}
                >
                  <span className="hidden sm:inline">🤖 AI</span>
                  <span className="sm:hidden">🤖</span>
                </button>
              </div>
              
              <button
                onClick={() => navigate('/')}
                className="px-4 sm:px-5 py-2 sm:py-2.5 glass-effect hover:bg-white/10 text-white rounded-xl transition-all duration-300 border border-white/10 backdrop-blur-sm flex items-center gap-2 group text-sm sm:text-base"
              >
                <span className="group-hover:-translate-x-1 transition-transform">←</span>
                <span className="hidden sm:inline">Back to Home</span>
                <span className="sm:hidden">Back</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        {/* AI Mode Banner */}
        {useAI && (
          <div className="mb-6 p-4 bg-gradient-to-r from-emerald-900/30 to-green-900/30 border border-emerald-500/30 rounded-xl">
            <div className="flex items-start gap-3">
              <span className="text-2xl">🤖</span>
              <div>
                <p className="text-emerald-300 font-semibold">AI-Generated Problems Active</p>
                <p className="text-emerald-200/80 text-sm mt-1">
                  {isGeneratingProblems 
                    ? 'Generating fresh coding problems with AI...' 
                    : 'You\'re solving AI-generated problems! Each problem is uniquely created.'}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Error Message */}
        {generationError && (
          <div className="mb-6 p-4 bg-red-900/30 border border-red-500/30 rounded-xl">
            <div className="flex items-start gap-3">
              <span className="text-2xl">⚠️</span>
              <div>
                <p className="text-red-300 font-semibold">Generation Error</p>
                <p className="text-red-200/80 text-sm mt-1">{generationError}</p>
              </div>
            </div>
          </div>
        )}

        {/* Loading Overlay */}
        {isGeneratingProblems && (
          <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center">
            <div className="bg-black/80 backdrop-blur-xl p-8 rounded-2xl border border-gray-700 max-w-md mx-4 text-center">
              <div className="animate-spin text-6xl mb-6">🤖</div>
              <h3 className="text-2xl font-bold text-white mb-4">
                Generating AI Problems...
              </h3>
              <p className="text-gray-400 mb-4">
                Creating fresh coding challenges for {selectedTopics.map(t => 
                  TOPICS.find(topic => topic.id === t)?.name
                ).join(', ')}
              </p>
              <p className="text-sm text-gray-500">
                This may take 10-30 seconds per topic
              </p>
              <div className="mt-6 flex gap-2 justify-center">
                <div className="w-3 h-3 bg-blue-500 rounded-full animate-bounce" style={{animationDelay: '0s'}}></div>
                <div className="w-3 h-3 bg-purple-500 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                <div className="w-3 h-3 bg-pink-500 rounded-full animate-bounce" style={{animationDelay: '0.4s'}}></div>
              </div>
            </div>
          </div>
        )}

        {/* Topic Selection Cards */}
        <div className="mb-6 sm:mb-8 relative z-10">
          <h2 className="text-lg sm:text-xl font-bold text-white mb-3 sm:mb-4 flex items-center gap-2 px-2">
            <span>📚</span> Select Topics
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 gap-3 sm:gap-4">
            {topicStats.map(topic => (
              <button
                key={topic.id}
                onClick={() => toggleTopic(topic.id)}
                className={`group relative p-4 sm:p-5 rounded-xl sm:rounded-2xl transition-all duration-300 border-2 ${
                  selectedTopics.includes(topic.id)
                    ? 'border-purple-500/50 shadow-lg shadow-purple-500/20'
                    : 'border-white/10 hover:border-white/20'
                }`}
              >
                {selectedTopics.includes(topic.id) && (
                  <div className={`absolute inset-0 rounded-xl sm:rounded-2xl bg-gradient-to-br ${topic.color} opacity-10`}></div>
                )}
                <div className="relative">
                  <div className="flex items-start justify-between mb-2 sm:mb-3">
                    <span className="text-2xl sm:text-3xl">{topic.icon}</span>
                    <div className={`w-5 h-5 sm:w-6 sm:h-6 rounded-lg border-2 flex items-center justify-center transition-all ${
                      selectedTopics.includes(topic.id)
                        ? 'bg-purple-500 border-purple-500'
                        : 'border-white/20 group-hover:border-white/40'
                    }`}>
                      {selectedTopics.includes(topic.id) && (
                        <svg className="w-3 h-3 sm:w-4 sm:h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                        </svg>
                      )}
                    </div>
                  </div>
                  <h3 className="text-sm sm:text-lg font-bold text-white mb-1 sm:mb-2 truncate">{topic.name}</h3>
                  <div className="flex items-center gap-1 sm:gap-2 text-xs flex-wrap">
                    <span className="text-emerald-400">{topic.easy}E</span>
                    <span className="text-gray-500">•</span>
                    <span className="text-amber-400">{topic.medium}M</span>
                    <span className="text-gray-500">•</span>
                    <span className="text-rose-400">{topic.hard}H</span>
                  </div>
                  <div className="mt-1 text-xs text-gray-400">
                    {topic.total} problems
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4 mb-4 sm:mb-6">
          <div className="flex-1 relative">
            <input
              type="text"
              placeholder="Search problems..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-4 sm:px-5 py-2.5 sm:py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-purple-500/50 transition-all text-sm sm:text-base"
            />
            <span className="absolute right-3 sm:right-4 top-1/2 -translate-y-1/2 text-gray-500 text-lg">🔍</span>
          </div>
          <div className="flex gap-2 overflow-x-auto pb-1 sm:pb-0 -mx-4 px-4 sm:mx-0 sm:px-0">
            {['All', 'Easy', 'Medium', 'Hard'].map(diff => (
              <button
                key={diff}
                onClick={() => setDifficultyFilter(diff)}
                className={`px-4 sm:px-5 py-2 sm:py-3 rounded-xl font-semibold text-xs sm:text-sm transition-all whitespace-nowrap ${
                  difficultyFilter === diff
                    ? 'bg-purple-500 text-white shadow-lg shadow-purple-500/30'
                    : 'bg-white/5 text-gray-400 hover:bg-white/10 border border-white/10'
                }`}
              >
                {diff}
              </button>
            ))}
          </div>
        </div>

        {/* Problems List */}
        <div className="glass-effect rounded-2xl border border-white/10 overflow-hidden relative z-10 shadow-2xl">
          <div className="bg-white/5 px-4 sm:px-6 py-3 sm:py-4 border-b border-white/10">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 sm:gap-0">
              <h3 className="text-base sm:text-lg font-bold text-white">
                {filteredQuestions.length} Problems
              </h3>
              <div className="flex items-center gap-2 text-xs sm:text-sm text-gray-400 flex-wrap">
                <span className="hidden sm:inline">Showing problems from:</span>
                <span className="sm:hidden">From:</span>
                {selectedTopics.map((topicId, index) => {
                  const topic = TOPICS.find(t => t.id === topicId);
                  return (
                    <span key={topicId} className="text-purple-300">
                      {topic.icon} <span className="hidden sm:inline">{topic.name}</span>{index < selectedTopics.length - 1 ? ',' : ''}
                    </span>
                  );
                })}
              </div>
            </div>
          </div>

          <div className="divide-y divide-white/10">
            {filteredQuestions.map((question, index) => (
              <div
                key={`${question.topicId}-${question.id}`}
                className="group px-4 sm:px-6 py-4 sm:py-5 hover:bg-white/5 transition-all duration-200 relative overflow-hidden"
              >
                <div className="flex items-start sm:items-center gap-3 sm:gap-6 relative z-10">
                  <div className="flex-shrink-0 w-8 h-8 sm:w-12 sm:h-12 rounded-lg sm:rounded-xl glass-effect flex items-center justify-center text-gray-400 font-bold group-hover:bg-white/10 transition-all text-xs sm:text-base">
                    {index + 1}
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-col sm:flex-row sm:items-center gap-2 mb-2">
                      <h4 className="text-white font-semibold text-sm sm:text-lg group-hover:text-purple-300 transition-colors line-clamp-2 sm:line-clamp-1">
                        {question.title}
                      </h4>
                      <span className={`px-2 sm:px-3 py-1 rounded-lg text-xs font-bold border ${getDifficultyBadge(question.difficulty)} w-fit`}>
                        {question.difficulty}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 sm:gap-3 text-xs sm:text-sm text-gray-400">
                      <span className="flex items-center gap-1 sm:gap-1.5">
                        <span>{question.topicIcon}</span>
                        <span className="hidden sm:inline">{question.topic}</span>
                      </span>
                    </div>
                  </div>

                  <button
                    onClick={() => handleSolve(question.topicId, question.id)}
                    className="flex-shrink-0 px-4 sm:px-6 py-2 sm:py-3 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white rounded-xl font-semibold transition-all duration-300 shadow-lg shadow-purple-500/30 hover:shadow-purple-500/50 flex items-center gap-1 sm:gap-2 text-sm sm:text-base"
                  >
                    <span>Solve</span>
                    <span className="hidden sm:inline group-hover:translate-x-1 transition-transform">→</span>
                  </button>
                </div>
              </div>
            ))}
          </div>

          {filteredQuestions.length === 0 && (
            <div className="px-6 py-16 text-center">
              <div className="text-6xl mb-4 animate-float-slow">🔍</div>
              <h3 className="text-xl font-bold text-white mb-2">No problems found</h3>
              <p className="text-gray-400">Try adjusting your filters or search query</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}




