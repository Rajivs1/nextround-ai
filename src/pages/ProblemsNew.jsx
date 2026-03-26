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
  { id: 'arrays', name: 'Arrays', icon: '📊', color: 'from-blue-500 to-blue-600', questions: arrayQuestions },
  { id: 'strings', name: 'Strings', icon: '📝', color: 'from-purple-500 to-purple-600', questions: stringQuestions },
  { id: 'stack', name: 'Stack', icon: '📚', color: 'from-orange-500 to-orange-600', questions: stackQuestions },
  { id: 'queue', name: 'Queue', icon: '🎯', color: 'from-green-500 to-green-600', questions: queueQuestions },
  { id: 'linkedlist', name: 'Linked List', icon: '🔗', color: 'from-indigo-500 to-indigo-600', questions: linkedListQuestions },
  { id: 'recursion', name: 'Recursion', icon: '🔄', color: 'from-violet-500 to-violet-600', questions: recursionQuestions },
  { id: 'patterns', name: 'Patterns', icon: '🎨', color: 'from-pink-500 to-pink-600', questions: patternQuestions },
  { id: 'functions', name: 'Functions', icon: '⚡', color: 'from-yellow-500 to-yellow-600', questions: functionQuestions }
];

export default function ProblemsNew() {
  const navigate = useNavigate();
  const [selectedTopics, setSelectedTopics] = useState(['arrays']);
  const [searchQuery, setSearchQuery] = useState('');
  const [difficultyFilter, setDifficultyFilter] = useState('All');
  const [useAI, setUseAI] = useState(false);
  const [aiProblems, setAiProblems] = useState({});
  const [isGeneratingProblems, setIsGeneratingProblems] = useState(false);

  useEffect(() => {
    if (useAI && selectedTopics.length > 0) {
      generateProblemsForSelectedTopics();
    }
  }, [useAI]);

  const generateProblemsForSelectedTopics = async () => {
    setIsGeneratingProblems(true);
    
    try {
      const newAiProblems = {};
      
      for (const topicId of selectedTopics) {
        if (aiProblems[topicId] && aiProblems[topicId].length > 0) {
          newAiProblems[topicId] = aiProblems[topicId];
          continue;
        }
        
        const problems = await generateDSAProblems(topicId, 8, 'mixed');
        newAiProblems[topicId] = problems;
        
        if (selectedTopics.indexOf(topicId) < selectedTopics.length - 1) {
          await new Promise(resolve => setTimeout(resolve, 1000));
        }
      }
      
      setAiProblems(prev => ({ ...prev, ...newAiProblems }));
    } catch (error) {
      console.error('Error generating problems:', error);
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
      case 'Easy': return 'bg-green-50 text-green-700 border-green-200';
      case 'Medium': return 'bg-yellow-50 text-yellow-700 border-yellow-200';
      case 'Hard': return 'bg-red-50 text-red-700 border-red-200';
      default: return 'bg-gray-50 text-gray-700 border-gray-200';
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
    <div className="min-h-screen bg-bg-secondary">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-40 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-primary to-primary-dark rounded-xl flex items-center justify-center">
                <span className="text-xl">💻</span>
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Practice Problems</h1>
                <p className="text-sm text-gray-600">Choose a problem and start coding</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              {/* AI Toggle */}
              <div className="hidden sm:flex items-center gap-2 bg-gray-100 rounded-lg p-1">
                <button
                  onClick={() => setUseAI(false)}
                  disabled={isGeneratingProblems}
                  className={`px-4 py-2 rounded-md text-sm font-semibold transition-all ${
                    !useAI
                      ? 'bg-white text-gray-900 shadow-sm'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  📚 Standard
                </button>
                <button
                  onClick={() => setUseAI(true)}
                  disabled={isGeneratingProblems}
                  className={`px-4 py-2 rounded-md text-sm font-semibold transition-all ${
                    useAI
                      ? 'bg-white text-gray-900 shadow-sm'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  🤖 AI
                </button>
              </div>
              
              <button
                onClick={() => navigate('/')}
                className="px-4 py-2 text-gray-600 hover:text-gray-900 font-medium transition-colors"
              >
                ← Back
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        {/* AI Mode Banner */}
        {useAI && (
          <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-xl">
            <div className="flex items-start gap-3">
              <span className="text-2xl">🤖</span>
              <div>
                <p className="text-green-900 font-semibold">AI-Generated Problems Active</p>
                <p className="text-green-700 text-sm mt-1">
                  {isGeneratingProblems 
                    ? 'Generating fresh coding problems...' 
                    : 'You\'re solving AI-generated problems!'}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Topic Selection */}
        <div className="mb-8">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Select Topics</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {topicStats.map(topic => (
              <button
                key={topic.id}
                onClick={() => toggleTopic(topic.id)}
                className={`p-5 rounded-xl transition-all duration-300 border-2 ${
                  selectedTopics.includes(topic.id)
                    ? 'border-primary bg-purple-50 shadow-md'
                    : 'border-gray-200 bg-white hover:border-gray-300 hover:shadow-sm'
                }`}
              >
                <div className="flex items-center justify-between mb-3">
                  <span className="text-3xl">{topic.icon}</span>
                  <div className={`w-5 h-5 rounded-md border-2 flex items-center justify-center ${
                    selectedTopics.includes(topic.id)
                      ? 'bg-primary border-primary'
                      : 'border-gray-300'
                  }`}>
                    {selectedTopics.includes(topic.id) && (
                      <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                      </svg>
                    )}
                  </div>
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">{topic.name}</h3>
                <div className="flex items-center gap-2 text-xs text-gray-600">
                  <span className="text-green-600">{topic.easy}E</span>
                  <span>•</span>
                  <span className="text-yellow-600">{topic.medium}M</span>
                  <span>•</span>
                  <span className="text-red-600">{topic.hard}H</span>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="flex-1 relative">
            <input
              type="text"
              placeholder="Search problems..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-4 py-3 bg-white border border-gray-300 rounded-xl text-gray-900 placeholder-gray-500 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
            />
            <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400">🔍</span>
          </div>
          <div className="flex gap-2">
            {['All', 'Easy', 'Medium', 'Hard'].map(diff => (
              <button
                key={diff}
                onClick={() => setDifficultyFilter(diff)}
                className={`px-5 py-3 rounded-xl font-semibold text-sm transition-all ${
                  difficultyFilter === diff
                    ? 'bg-primary text-white shadow-md'
                    : 'bg-white text-gray-700 border border-gray-300 hover:border-gray-400'
                }`}
              >
                {diff}
              </button>
            ))}
          </div>
        </div>

        {/* Problems List */}
        <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm">
          <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-bold text-gray-900">
                {filteredQuestions.length} Problems
              </h3>
              <div className="text-sm text-gray-600">
                {selectedTopics.map((topicId, index) => {
                  const topic = TOPICS.find(t => t.id === topicId);
                  return (
                    <span key={topicId} className="text-primary font-medium">
                      {topic.icon} {topic.name}{index < selectedTopics.length - 1 ? ', ' : ''}
                    </span>
                  );
                })}
              </div>
            </div>
          </div>

          <div className="divide-y divide-gray-200">
            {filteredQuestions.map((question, index) => (
              <div
                key={`${question.topicId}-${question.id}`}
                className="px-6 py-5 hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-center gap-6">
                  <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-gray-100 flex items-center justify-center text-gray-600 font-bold">
                    {index + 1}
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h4 className="text-gray-900 font-semibold text-lg">
                        {question.title}
                      </h4>
                      <span className={`px-3 py-1 rounded-lg text-xs font-bold border ${getDifficultyBadge(question.difficulty)}`}>
                        {question.difficulty}
                      </span>
                    </div>
                    <div className="flex items-center gap-3 text-sm text-gray-600">
                      <span className="flex items-center gap-1.5">
                        <span>{question.topicIcon}</span>
                        <span>{question.topic}</span>
                      </span>
                    </div>
                  </div>

                  <button
                    onClick={() => handleSolve(question.topicId, question.id)}
                    className="px-6 py-3 bg-gradient-to-r from-primary to-primary-dark text-white rounded-xl font-semibold hover:shadow-lg hover:shadow-primary/30 transition-all"
                  >
                    Solve →
                  </button>
                </div>
              </div>
            ))}
          </div>

          {filteredQuestions.length === 0 && (
            <div className="px-6 py-16 text-center">
              <div className="text-6xl mb-4">🔍</div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">No problems found</h3>
              <p className="text-gray-600">Try adjusting your filters or search query</p>
            </div>
          )}
        </div>
      </div>

      {/* Loading Overlay */}
      {isGeneratingProblems && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center">
          <div className="bg-white p-8 rounded-2xl max-w-md mx-4 text-center shadow-2xl">
            <div className="animate-spin text-6xl mb-6">🤖</div>
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Generating AI Problems...
            </h3>
            <p className="text-gray-600 mb-4">
              Creating fresh coding challenges
            </p>
            <div className="flex gap-2 justify-center">
              <div className="w-3 h-3 bg-primary rounded-full animate-bounce"></div>
              <div className="w-3 h-3 bg-primary rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
              <div className="w-3 h-3 bg-primary rounded-full animate-bounce" style={{animationDelay: '0.4s'}}></div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
