import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "../firebase";
import logo from "../assets/NexrRoundAi2.png";
import { getLeaderboard } from "../utils/leaderboardUtils";
import { migrateUserIfNeeded } from "../utils/migrationUtils";

export default function Home() {
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  const [userProfile, setUserProfile] = useState(null);
  const [leaderboard, setLeaderboard] = useState([]);
  const [loadingLeaderboard, setLoadingLeaderboard] = useState(true);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Get user profile data for username
  useEffect(() => {
    if (!user) return;

    const unsub = onSnapshot(doc(db, "users", user.uid), (snap) => {
      if (snap.exists()) {
        setUserProfile(snap.data());
      }
    });

    return () => unsub();
  }, [user]);

  // Auto-migrate user if needed (for existing users)
  useEffect(() => {
    if (!user) return;
    
    const migrate = async () => {
      try {
        await migrateUserIfNeeded(user.uid);
      } catch (error) {
        console.error('Migration error:', error);
      }
    };
    
    migrate();
  }, [user]);

  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (mobileMenuOpen && !event.target.closest('nav')) {
        setMobileMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [mobileMenuOpen]);

  // Fetch leaderboard data
  useEffect(() => {
    const fetchLeaderboard = async () => {
      setLoadingLeaderboard(true);
      const data = await getLeaderboard(10);
      setLeaderboard(data);
      setLoadingLeaderboard(false);
    };

    fetchLeaderboard();
  }, []);

  const handleLogout = async () => {
    setIsLoggingOut(true);
    try {
      await signOut(auth);
      setShowLogoutModal(false);
      navigate("/");
    } catch (error) {
      console.error("Error signing out:", error);
      setIsLoggingOut(false);
    }
  };

  // Show loading state with fun GIF
  if (loading) {
    return (
      <div className="min-h-screen bg-[#1a1a1a] text-gray-100 flex items-center justify-center">
        <div className="text-center">
          <img 
            src="https://media.giphy.com/media/3oEjI6SIIHBdRxXI40/giphy.gif" 
            alt="Loading" 
            className="w-32 h-32 mx-auto mb-4 rounded-xl"
          />
          <p className="text-xl text-gray-300">Loading your awesome experience...</p>
        </div>
      </div>
    );
  }

  const displayName = userProfile?.username || user?.email?.split('@')[0] || "User";

  return (
    <div className="min-h-screen bg-[#1a1a1a] text-gray-100 overflow-hidden">
      {/* Navigation - Different for logged-in vs logged-out users */}
      <nav className="relative z-50 px-4 sm:px-6 py-4 sm:py-6 backdrop-blur-xl bg-gradient-to-r from-gray-900/95 via-gray-900/90 to-gray-900/95 border-b border-gray-800/50 shadow-lg">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-3 cursor-pointer hover:scale-105 transition-transform">
            <img 
              src={logo} 
              alt="NextRound AI Logo" 
              className="w-8 h-8 sm:w-10 sm:h-10 object-contain"
            />
            <span className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent animate-gradient">
              NextRound AI
            </span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-2 sm:gap-4">
            {user ? (
              // Logged-in user navigation
              <>
                <span className="text-gray-300 text-sm sm:text-base">
                  Welcome, <span className="text-white font-semibold">{displayName}</span>
                </span>
                <Link
                  to="/problems"
                  className="px-3 sm:px-6 py-2 text-sm sm:text-base text-gray-300 hover:text-white transition-all duration-300 hover:scale-105"
                >
                  Practice
                </Link>
                <Link
                  to="/chat"
                  className="px-3 sm:px-6 py-2 text-sm sm:text-base text-gray-300 hover:text-white transition-all duration-300 hover:scale-105"
                >
                  AI Chat
                </Link>
                <Link
                  to="/resume-analyzer"
                  className="px-3 sm:px-6 py-2 text-sm sm:text-base text-gray-300 hover:text-white transition-all duration-300 hover:scale-105"
                >
                  Resume
                </Link>
                <Link
                  to="/dashboard"
                  className="px-3 sm:px-6 py-2 text-sm sm:text-base bg-gradient-to-r from-blue-500 to-purple-500 rounded-full hover:from-blue-600 hover:to-purple-600 transition-all duration-300 shadow-lg hover:shadow-blue-500/50 hover:scale-105"
                >
                  Dashboard
                </Link>
                <button
                  onClick={() => setShowLogoutModal(true)}
                  className="px-3 sm:px-6 py-2 text-sm sm:text-base text-gray-300 hover:text-white transition-all duration-300 hover:scale-105"
                >
                  Logout
                </button>
              </>
            ) : (
              // Logged-out user navigation
              <>
                <Link
                  to="/login"
                  className="px-3 sm:px-6 py-2 text-sm sm:text-base text-gray-300 hover:text-white transition-all duration-300 hover:scale-105"
                >
                  Login
                </Link>
                <Link
                  to="/signup"
                  className="px-3 sm:px-6 py-2 text-sm sm:text-base bg-gradient-to-r from-blue-500 to-purple-500 rounded-full hover:from-blue-600 hover:to-purple-600 transition-all duration-300 shadow-lg hover:shadow-purple-500/50 hover:scale-105"
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button (Three Dots) */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-gray-300 hover:text-white transition-colors"
            aria-label="Toggle menu"
          >
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
              <circle cx="5" cy="12" r="2" />
              <circle cx="12" cy="12" r="2" />
              <circle cx="19" cy="12" r="2" />
            </svg>
          </button>
        </div>

        {/* Mobile Dropdown Menu with Backdrop */}
        {mobileMenuOpen && (
          <>
            {/* Backdrop overlay - completely opaque with blur */}
            <div 
              className="md:hidden fixed inset-0 bg-[#1a1a1a]/95 backdrop-blur-lg z-[100]"
              onClick={() => setMobileMenuOpen(false)}
            ></div>
            
            {/* Menu dropdown - completely opaque dark blue */}
            <div className="md:hidden absolute top-full left-0 right-0 mt-2 mx-4 bg-blue-950 border-2 border-blue-700 rounded-2xl shadow-2xl overflow-hidden animate-slideUp z-[110]">
              <div className="py-2">
              {user ? (
                // Logged-in user mobile menu
                <>
                  <div className="px-4 py-3 border-b border-blue-700 bg-blue-950">
                    <span className="text-blue-300 text-xs">Welcome,</span>
                    <p className="text-white font-semibold">{displayName}</p>
                  </div>
                  <Link
                    to="/problems"
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center gap-3 px-4 py-3 text-gray-200 hover:bg-blue-800 hover:text-white transition-all"
                  >
                    <span className="text-xl">💻</span>
                    <span>Practice</span>
                  </Link>
                  <Link
                    to="/chat"
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center gap-3 px-4 py-3 text-gray-200 hover:bg-blue-800 hover:text-white transition-all"
                  >
                    <span className="text-xl">💬</span>
                    <span>AI Chat</span>
                  </Link>
                  <Link
                    to="/resume-analyzer"
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center gap-3 px-4 py-3 text-gray-200 hover:bg-blue-800 hover:text-white transition-all"
                  >
                    <span className="text-xl">📄</span>
                    <span>Resume Analyzer</span>
                  </Link>
                  <Link
                    to="/dashboard"
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center gap-3 px-4 py-3 text-gray-200 hover:bg-blue-800 hover:text-white transition-all"
                  >
                    <span className="text-xl">📊</span>
                    <span>Dashboard</span>
                  </Link>
                  <button
                    onClick={() => {
                      setMobileMenuOpen(false);
                      setShowLogoutModal(true);
                    }}
                    className="flex items-center gap-3 px-4 py-3 text-gray-200 hover:bg-blue-800 hover:text-white transition-all w-full text-left border-t border-blue-700"
                  >
                    <span className="text-xl">🚪</span>
                    <span>Logout</span>
                  </button>
                </>
              ) : (
                // Logged-out user mobile menu
                <>
                  <Link
                    to="/login"
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center gap-3 px-4 py-3 text-gray-200 hover:bg-blue-800 hover:text-white transition-all"
                  >
                    <span className="text-xl">🔐</span>
                    <span>Login</span>
                  </Link>
                  <Link
                    to="/signup"
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center gap-3 px-4 py-3 text-gray-200 hover:bg-blue-800 hover:text-white transition-all"
                  >
                    <span className="text-xl">✨</span>
                    <span>Sign Up</span>
                  </Link>
                </>
              )}
            </div>
          </div>
          </>
        )}
      </nav>

      {/* Hero Section */}
      <section className="relative px-4 sm:px-6 py-16 sm:py-24 lg:py-32 text-center overflow-hidden">
        {/* Enhanced Background Effects */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/30 via-purple-900/30 to-pink-900/30 animate-gradient"></div>
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-pulse" style={{animationDelay: '1s'}}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-r from-cyan-500/10 to-pink-500/10 rounded-full blur-3xl animate-float-slow"></div>

        {/* Floating particles */}
        <div className="absolute top-20 left-20 w-2 h-2 bg-blue-400 rounded-full animate-ping"></div>
        <div className="absolute top-40 right-32 w-3 h-3 bg-purple-400 rounded-full animate-ping" style={{animationDelay: '0.5s'}}></div>
        <div className="absolute bottom-32 left-1/3 w-2 h-2 bg-pink-400 rounded-full animate-ping" style={{animationDelay: '1s'}}></div>
        <div className="absolute top-1/3 right-1/4 w-2 h-2 bg-cyan-400 rounded-full animate-ping" style={{animationDelay: '1.5s'}}></div>
        <div className="absolute bottom-1/3 left-1/4 w-3 h-3 bg-yellow-400 rounded-full animate-ping" style={{animationDelay: '2s'}}></div>

        <div className="relative z-10 max-w-7xl mx-auto">
          <div className="mb-8 sm:mb-12">
            <span className="inline-flex items-center px-4 sm:px-6 py-2 sm:py-3 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-full text-sm sm:text-lg font-semibold border border-blue-500/30 backdrop-blur-sm">
              <span className="mr-2 text-xl sm:text-2xl">🚀</span>
              <span className="hidden sm:inline">AI-Powered Interview Preparation Platform</span>
              <span className="sm:hidden">AI Interview Prep</span>
            </span>
          </div>

          <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-9xl font-black mb-8 sm:mb-12 leading-tight">
            <span className="block mb-2 sm:mb-4 text-gradient-animate">Crack Your Next</span>
            <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent animate-pulse">
              Interview
            </span>
          </h1>

          <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl text-gray-300 mb-12 sm:mb-16 max-w-4xl mx-auto leading-relaxed px-4">
            Master technical interviews and DSA problems with{" "}
            <span className="font-bold bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent">
              AI-powered practice sessions
            </span>
            . Get personalized feedback and land your dream job.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 sm:gap-8 justify-center items-center mb-12 sm:mb-16 px-4">
            {user ? (
              // Buttons for logged-in users
              <>
                <Link
                  to="/interview"
                  className="group relative px-8 sm:px-12 py-4 sm:py-6 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-full text-lg sm:text-xl font-bold hover:from-blue-600 hover:via-purple-600 hover:to-pink-600 transition-all duration-500 shadow-2xl hover:shadow-purple-500/50 hover:scale-110 w-full sm:w-auto"
                >
                  <span className="relative z-10 flex items-center justify-center">
                    Start New Assessment
                    <span className="ml-3 group-hover:translate-x-2 transition-transform text-xl sm:text-2xl">
                      →
                    </span>
                  </span>
                </Link>
                <Link
                  to="/resume-analyzer"
                  className="group px-8 sm:px-12 py-4 sm:py-6 border-2 border-indigo-500 rounded-full text-lg sm:text-xl font-semibold hover:bg-indigo-500 hover:border-indigo-400 transition-all duration-300 backdrop-blur-sm w-full sm:w-auto"
                >
                  <span className="flex items-center justify-center">
                    Resume Analyzer
                    <span className="ml-2 group-hover:translate-x-1 transition-transform">📄</span>
                  </span>
                </Link>
                <Link
                  to="/chat"
                  className="group px-8 sm:px-12 py-4 sm:py-6 border-2 border-green-500 rounded-full text-lg sm:text-xl font-semibold hover:bg-green-500 hover:border-green-400 transition-all duration-300 backdrop-blur-sm w-full sm:w-auto"
                >
                  <span className="flex items-center justify-center">
                    Chat with AI
                    <span className="ml-2 group-hover:translate-x-1 transition-transform">💬</span>
                  </span>
                </Link>
              </>
            ) : (
              // Buttons for logged-out users
              <>
                <Link
                  to="/signup"
                  className="group relative px-8 sm:px-12 py-4 sm:py-6 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-full text-lg sm:text-xl font-bold hover:from-blue-600 hover:via-purple-600 hover:to-pink-600 transition-all duration-500 shadow-2xl hover:shadow-purple-500/50 hover:scale-110 w-full sm:w-auto"
                >
                  <span className="relative z-10 flex items-center justify-center">
                    Start Practicing Now
                    <span className="ml-3 group-hover:translate-x-2 transition-transform text-xl sm:text-2xl">
                      →
                    </span>
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-xl"></div>
                </Link>
                <Link
                  to="/login"
                  className="group px-8 sm:px-12 py-4 sm:py-6 border-2 border-gray-600 rounded-full text-lg sm:text-xl font-semibold hover:border-purple-400 hover:bg-purple-900/20 transition-all duration-300 backdrop-blur-sm w-full sm:w-auto"
                >
                  <span className="flex items-center justify-center">
                    <span className="hidden sm:inline">Already have an account?</span>
                    <span className="sm:hidden">Login</span>
                    <span className="ml-2 group-hover:translate-x-1 transition-transform">
                      →
                    </span>
                  </span>
                </Link>
              </>
            )}
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-3 gap-4 sm:gap-8 max-w-3xl mx-auto px-4">
            <div className="text-center">
              <div className="text-2xl sm:text-4xl font-black text-white mb-1 sm:mb-2">10K+</div>
              <div className="text-xs sm:text-base text-gray-400">Active Users</div>
            </div>
            <div className="text-center">
              <div className="text-2xl sm:text-4xl font-black text-white mb-1 sm:mb-2">95%</div>
              <div className="text-xs sm:text-base text-gray-400">Success Rate</div>
            </div>
            <div className="text-center">
              <div className="text-2xl sm:text-4xl font-black text-white mb-1 sm:mb-2">24/7</div>
              <div className="text-xs sm:text-base text-gray-400">AI Support</div>
            </div>
          </div>
        </div>
      </section>

      {/* Streak and Leaderboard Section - Only for Logged-in Users */}
      {user && (
        <section id="leaderboard-section" className="relative px-4 sm:px-6 py-12 sm:py-16 bg-gradient-to-b from-[#1a1a1a] to-gray-900">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              
              {/* Streak Card */}
              <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl p-6 sm:p-8 border border-gray-700 shadow-2xl hover:shadow-orange-500/20 transition-all duration-300">
                <div className="flex items-center gap-3 mb-6">
                  <div className="text-4xl">🔥</div>
                  <h3 className="text-2xl sm:text-3xl font-bold text-white">Your Streak</h3>
                </div>
                
                <div className="space-y-6">
                  {/* Current Streak */}
                  <div className="bg-gradient-to-r from-orange-500/10 to-red-500/10 rounded-xl p-6 border border-orange-500/30">
                    <div className="text-center">
                      <div className="text-sm text-gray-400 mb-2">Current Streak</div>
                      <div className="text-5xl sm:text-6xl font-black bg-gradient-to-r from-orange-400 to-red-400 bg-clip-text text-transparent mb-2">
                        {userProfile?.currentStreak || 0}
                      </div>
                      <div className="text-sm text-gray-400">
                        {userProfile?.currentStreak === 1 ? 'day' : 'days'}
                      </div>
                    </div>
                  </div>

                  {/* Longest Streak */}
                  <div className="flex items-center justify-between p-4 bg-gray-800/50 rounded-lg border border-gray-700">
                    <div className="flex items-center gap-3">
                      <div className="text-2xl">🏆</div>
                      <div>
                        <div className="text-sm text-gray-400">Longest Streak</div>
                        <div className="text-xl sm:text-2xl font-bold text-white">
                          {userProfile?.longestStreak || 0} {userProfile?.longestStreak === 1 ? 'day' : 'days'}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Problems Solved */}
                  <div className="flex items-center justify-between p-4 bg-gray-800/50 rounded-lg border border-gray-700">
                    <div className="flex items-center gap-3">
                      <div className="text-2xl">✅</div>
                      <div>
                        <div className="text-sm text-gray-400">Problems Solved</div>
                        <div className="text-xl sm:text-2xl font-bold text-white">
                          {userProfile?.totalProblemsSolved || 0}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Motivation */}
                  <div className="text-center text-sm text-gray-400 italic">
                    {userProfile?.currentStreak === 0 
                      ? "Start solving to build your streak! 💪"
                      : userProfile?.currentStreak < 7
                      ? "Keep going! You're building momentum! 🚀"
                      : userProfile?.currentStreak < 30
                      ? "Amazing consistency! Keep it up! ⭐"
                      : "You're on fire! Legendary streak! 🔥"}
                  </div>
                </div>
              </div>

              {/* Leaderboard Card */}
              <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl p-6 sm:p-8 border border-gray-700 shadow-2xl hover:shadow-purple-500/20 transition-all duration-300">
                <div className="flex items-center gap-3 mb-6">
                  <div className="text-4xl">🏆</div>
                  <h3 className="text-2xl sm:text-3xl font-bold text-white">Top Coders</h3>
                </div>

                {loadingLeaderboard ? (
                  <div className="flex items-center justify-center py-12">
                    <div className="w-8 h-8 border-4 border-purple-500 border-t-transparent rounded-full animate-spin"></div>
                  </div>
                ) : leaderboard.length === 0 ? (
                  <div className="text-center py-12 text-gray-400">
                    No users on the leaderboard yet. Be the first! 🚀
                  </div>
                ) : (
                  <div className="space-y-3 max-h-[400px] overflow-y-auto custom-scrollbar">
                    {leaderboard.map((userEntry, index) => {
                      const isCurrentUser = userEntry.userId === user?.uid;
                      const rankColors = ['text-yellow-400', 'text-gray-300', 'text-orange-400'];
                      const rankEmojis = ['🥇', '🥈', '🥉'];
                      
                      return (
                        <div
                          key={userEntry.userId}
                          className={`flex items-center gap-4 p-4 rounded-lg border transition-all duration-300 ${
                            isCurrentUser
                              ? 'bg-gradient-to-r from-blue-500/20 to-purple-500/20 border-purple-500/50 shadow-lg'
                              : 'bg-gray-800/50 border-gray-700 hover:border-gray-600'
                          }`}
                        >
                          {/* Rank */}
                          <div className={`text-2xl font-bold ${index < 3 ? rankColors[index] : 'text-gray-400'} w-8 text-center`}>
                            {index < 3 ? rankEmojis[index] : `#${index + 1}`}
                          </div>

                          {/* Profile Image */}
                          <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-400 to-purple-400 flex items-center justify-center text-white font-bold overflow-hidden">
                            {userEntry.profileImage ? (
                              <img src={userEntry.profileImage} alt={userEntry.username} className="w-full h-full object-cover" />
                            ) : (
                              userEntry.username?.charAt(0).toUpperCase() || '?'
                            )}
                          </div>

                          {/* User Info */}
                          <div className="flex-1 min-w-0">
                            <div className="text-white font-semibold truncate flex items-center gap-2">
                              {userEntry.username}
                              {isCurrentUser && (
                                <span className="text-xs px-2 py-0.5 bg-purple-500/30 text-purple-300 rounded-full">You</span>
                              )}
                            </div>
                            <div className="text-xs text-gray-400">
                              {userEntry.totalProblemsSolved} problems solved
                            </div>
                          </div>

                          {/* Streak */}
                          <div className="text-right">
                            <div className="text-orange-400 font-bold flex items-center gap-1">
                              🔥 {userEntry.currentStreak}
                            </div>
                            <div className="text-xs text-gray-400">day streak</div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}

                {/* View Full Leaderboard Link */}
                <div className="mt-6 text-center">
                  <Link
                    to="/dashboard"
                    className="text-sm text-purple-400 hover:text-purple-300 transition-colors inline-flex items-center gap-2 group"
                  >
                    View your dashboard
                    <span className="group-hover:translate-x-1 transition-transform">→</span>
                  </Link>
                </div>
              </div>

            </div>
          </div>
        </section>
      )}

      {/* Features Section */}
      <section className="relative px-4 sm:px-6 py-16 sm:py-24 lg:py-32 bg-gradient-to-b from-[#1a1a1a] via-gray-900 to-[#1a1a1a]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <div className="mb-6">
              <span className="px-6 py-3 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-full text-lg font-semibold border border-purple-500/30 backdrop-blur-sm">
                ✨ Powerful Features
              </span>
            </div>
            <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black mb-6 sm:mb-8">
              Everything You Need to{" "}
              <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                Succeed
              </span>
            </h2>
            <p className="text-lg sm:text-xl md:text-2xl text-gray-400 max-w-3xl mx-auto px-4">
              Comprehensive tools designed to make you interview-ready in record time
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 md:gap-5 lg:gap-6 px-2 sm:px-0">
            {/* AI Chat Assistant */}
            <Link
              to="/chat"
              className="group relative p-5 sm:p-6 md:p-7 lg:p-8 rounded-xl sm:rounded-2xl bg-gradient-to-br from-gray-900/90 to-gray-800/90 border border-gray-700 hover:border-green-500/50 transition-all duration-300 hover:scale-[1.02] backdrop-blur-sm cursor-pointer overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-green-500/5 to-blue-500/5 rounded-xl sm:rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="relative z-10">
                <div className="text-4xl sm:text-5xl md:text-6xl mb-3 sm:mb-4 md:mb-6 group-hover:scale-110 transition-transform duration-300">
                  💬
                </div>
                <h3 className="text-lg sm:text-xl md:text-2xl font-bold mb-2 sm:mb-3 md:mb-4 text-white">
                  AI Chat Assistant
                </h3>
                <p className="text-sm sm:text-base text-gray-400 leading-relaxed mb-3 sm:mb-4">
                  Chat with your personal AI coach for interview tips and coding help 24/7
                </p>
                <div className="flex items-center text-green-400 font-semibold text-sm sm:text-base">
                  <span>Start chatting</span>
                  <span className="ml-2 group-hover:translate-x-1 transition-transform">→</span>
                </div>
              </div>
            </Link>

            {/* AI Interview Practice */}
            <Link
              to="/interview"
              className="group relative p-5 sm:p-6 md:p-7 lg:p-8 rounded-xl sm:rounded-2xl bg-gradient-to-br from-gray-900/90 to-gray-800/90 border border-gray-700 hover:border-blue-500/50 transition-all duration-300 hover:scale-[1.02] backdrop-blur-sm overflow-hidden cursor-pointer"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5 rounded-xl sm:rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="relative z-10">
                <div className="text-4xl sm:text-5xl md:text-6xl mb-3 sm:mb-4 md:mb-6 group-hover:scale-110 transition-transform duration-300">
                  🤖
                </div>
                <h3 className="text-lg sm:text-xl md:text-2xl font-bold mb-2 sm:mb-3 md:mb-4 text-white">
                  AI Interview Practice
                </h3>
                <p className="text-sm sm:text-base text-gray-400 leading-relaxed mb-3 sm:mb-4">
                  Practice with AI interviewer that adapts and provides real-time feedback
                </p>
                <div className="flex items-center text-blue-400 font-semibold text-sm sm:text-base">
                  <span>Start interview</span>
                  <span className="ml-2 group-hover:translate-x-1 transition-transform">→</span>
                </div>
              </div>
            </Link>

            {/* Code-Based Questions */}
            <Link
              to="/problems"
              className="group relative p-5 sm:p-6 md:p-7 lg:p-8 rounded-xl sm:rounded-2xl bg-gradient-to-br from-gray-900/90 to-gray-800/90 border border-gray-700 hover:border-purple-500/50 transition-all duration-300 hover:scale-[1.02] backdrop-blur-sm overflow-hidden cursor-pointer"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-pink-500/5 rounded-xl sm:rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="relative z-10">
                <div className="text-4xl sm:text-5xl md:text-6xl mb-3 sm:mb-4 md:mb-6 group-hover:scale-110 transition-transform duration-300">
                  💻
                </div>
                <h3 className="text-lg sm:text-xl md:text-2xl font-bold mb-2 sm:mb-3 md:mb-4 text-white">
                  Multi-Language Support
                </h3>
                <p className="text-sm sm:text-base text-gray-400 leading-relaxed mb-3 sm:mb-4">
                  Code in JavaScript, C++, or Java with real-time execution
                </p>
                <div className="flex items-center text-purple-400 font-semibold text-sm sm:text-base">
                  <span>Start coding</span>
                  <span className="ml-2 group-hover:translate-x-1 transition-transform">→</span>
                </div>
              </div>
            </Link>

            {/* Progress Tracking */}
            <Link
              to="/dashboard"
              className="group relative p-5 sm:p-6 md:p-7 lg:p-8 rounded-xl sm:rounded-2xl bg-gradient-to-br from-gray-900/90 to-gray-800/90 border border-gray-700 hover:border-pink-500/50 transition-all duration-300 hover:scale-[1.02] backdrop-blur-sm overflow-hidden cursor-pointer"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-pink-500/5 to-cyan-500/5 rounded-xl sm:rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="relative z-10">
                <div className="text-4xl sm:text-5xl md:text-6xl mb-3 sm:mb-4 md:mb-6 group-hover:scale-110 transition-transform duration-300">
                  📊
                </div>
                <h3 className="text-lg sm:text-xl md:text-2xl font-bold mb-2 sm:mb-3 md:mb-4 text-white">
                  Progress Tracking
                </h3>
                <p className="text-sm sm:text-base text-gray-400 leading-relaxed mb-3 sm:mb-4">
                  Track your improvement with detailed analytics and performance insights
                </p>
                <div className="flex items-center text-pink-400 font-semibold text-sm sm:text-base">
                  <span>View dashboard</span>
                  <span className="ml-2 group-hover:translate-x-1 transition-transform">→</span>
                </div>
              </div>
            </Link>

            {/* Streak & Leaderboard */}
            <Link
              to="/"
              onClick={(e) => {
                e.preventDefault();
                document.querySelector('#leaderboard-section')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="group relative p-5 sm:p-6 md:p-7 lg:p-8 rounded-xl sm:rounded-2xl bg-gradient-to-br from-gray-900/90 to-gray-800/90 border border-gray-700 hover:border-orange-500/50 transition-all duration-300 hover:scale-[1.02] backdrop-blur-sm overflow-hidden cursor-pointer"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-orange-500/5 to-red-500/5 rounded-xl sm:rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="relative z-10">
                <div className="text-4xl sm:text-5xl md:text-6xl mb-3 sm:mb-4 md:mb-6 group-hover:scale-110 transition-transform duration-300">
                  🔥
                </div>
                <h3 className="text-lg sm:text-xl md:text-2xl font-bold mb-2 sm:mb-3 md:mb-4 text-white">
                  Streaks & Rankings
                </h3>
                <p className="text-sm sm:text-base text-gray-400 leading-relaxed mb-3 sm:mb-4">
                  Build daily streaks and compete on the leaderboard with other coders
                </p>
                <div className="flex items-center text-orange-400 font-semibold text-sm sm:text-base">
                  <span>View leaderboard</span>
                  <span className="ml-2 group-hover:translate-x-1 transition-transform">→</span>
                </div>
              </div>
            </Link>

            {/* 96+ Problems */}
            <Link
              to="/problems"
              className="group relative p-5 sm:p-6 md:p-7 lg:p-8 rounded-xl sm:rounded-2xl bg-gradient-to-br from-gray-900/90 to-gray-800/90 border border-gray-700 hover:border-cyan-500/50 transition-all duration-300 hover:scale-[1.02] backdrop-blur-sm overflow-hidden cursor-pointer"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-blue-500/5 rounded-xl sm:rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="relative z-10">
                <div className="text-4xl sm:text-5xl md:text-6xl mb-3 sm:mb-4 md:mb-6 group-hover:scale-110 transition-transform duration-300">
                  📚
                </div>
                <h3 className="text-lg sm:text-xl md:text-2xl font-bold mb-2 sm:mb-3 md:mb-4 text-white">
                  96+ Coding Problems
                </h3>
                <p className="text-sm sm:text-base text-gray-400 leading-relaxed mb-3 sm:mb-4">
                  Curated problems across 8 topics with comprehensive test cases
                </p>
                <div className="flex items-center text-cyan-400 font-semibold text-sm sm:text-base">
                  <span>Start practicing</span>
                  <span className="ml-2 group-hover:translate-x-1 transition-transform">→</span>
                </div>
              </div>
            </Link>

            {/* Resume Analyzer */}
            <Link
              to="/resume-analyzer"
              className="group relative p-5 sm:p-6 md:p-7 lg:p-8 rounded-xl sm:rounded-2xl bg-gradient-to-br from-gray-900/90 to-gray-800/90 border border-gray-700 hover:border-indigo-500/50 transition-all duration-300 hover:scale-[1.02] backdrop-blur-sm overflow-hidden cursor-pointer"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 to-purple-500/5 rounded-xl sm:rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="relative z-10">
                <div className="text-4xl sm:text-5xl md:text-6xl mb-3 sm:mb-4 md:mb-6 group-hover:scale-110 transition-transform duration-300">
                  📄
                </div>
                <h3 className="text-lg sm:text-xl md:text-2xl font-bold mb-2 sm:mb-3 md:mb-4 text-white">
                  AI Resume Analyzer
                </h3>
                <p className="text-sm sm:text-base text-gray-400 leading-relaxed mb-3 sm:mb-4">
                  Get instant AI-powered feedback to optimize your resume for ATS and recruiters
                </p>
                <div className="flex items-center text-indigo-400 font-semibold text-sm sm:text-base">
                  <span>Analyze resume</span>
                  <span className="ml-2 group-hover:translate-x-1 transition-transform">→</span>
                </div>
              </div>
            </Link>

            {/* Daily Challenge */}
            <Link
              to="/daily-challenge"
              className="group relative p-5 sm:p-6 md:p-7 lg:p-8 rounded-xl sm:rounded-2xl bg-gradient-to-br from-gray-900/90 to-gray-800/90 border border-gray-700 hover:border-yellow-500/50 transition-all duration-300 hover:scale-[1.02] backdrop-blur-sm overflow-hidden cursor-pointer"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-yellow-500/5 to-orange-500/5 rounded-xl sm:rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="relative z-10">
                <div className="text-4xl sm:text-5xl md:text-6xl mb-3 sm:mb-4 md:mb-6 group-hover:scale-110 transition-transform duration-300">
                  🔥
                </div>
                <h3 className="text-lg sm:text-xl md:text-2xl font-bold mb-2 sm:mb-3 md:mb-4 text-white">
                  Daily Challenge
                </h3>
                <p className="text-sm sm:text-base text-gray-400 leading-relaxed mb-3 sm:mb-4">
                  Solve AI-generated coding challenges daily and compete on the global leaderboard
                </p>
                <div className="flex items-center text-yellow-400 font-semibold text-sm sm:text-base">
                  <span>Today's challenge</span>
                  <span className="ml-2 group-hover:translate-x-1 transition-transform">→</span>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="relative px-4 sm:px-6 py-16 sm:py-24 bg-gradient-to-b from-gray-900 to-[#1a1a1a]">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6">
              How It{" "}
              <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                Works
              </span>
            </h2>
            <p className="text-lg sm:text-xl text-gray-400">
              Get started in just three simple steps
            </p>
          </div>

          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-8 sm:gap-12">
            <div className="text-center group">
              <div className="relative mb-8">
                <div className="w-24 h-24 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white text-3xl font-bold mx-auto group-hover:scale-110 transition-transform shadow-2xl">
                  1
                </div>
                <div className="absolute -inset-4 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
              </div>
              <h3 className="text-2xl font-bold mb-4 text-white">
                {user ? "Choose Your Role" : "Sign Up & Create Profile"}
              </h3>
              <p className="text-gray-400 leading-relaxed">
                {user 
                  ? "Select from Developer, HR, Data Analyst, or SQL Developer assessments"
                  : "Create your account and set up your profile to get personalized recommendations"
                }
              </p>
            </div>

            <div className="text-center group">
              <div className="relative mb-8">
                <div className="w-24 h-24 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white text-3xl font-bold mx-auto group-hover:scale-110 transition-transform shadow-2xl">
                  2
                </div>
                <div className="absolute -inset-4 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
              </div>
              <h3 className="text-2xl font-bold mb-4 text-white">
                Practice with AI
              </h3>
              <p className="text-gray-400 leading-relaxed">
                Take AI-powered mock interviews and solve coding problems with instant feedback
              </p>
            </div>

            <div className="text-center group">
              <div className="relative mb-8">
                <div className="w-24 h-24 bg-gradient-to-r from-pink-500 to-cyan-500 rounded-full flex items-center justify-center text-white text-3xl font-bold mx-auto group-hover:scale-110 transition-transform shadow-2xl">
                  3
                </div>
                <div className="absolute -inset-4 bg-gradient-to-r from-pink-500/20 to-cyan-500/20 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
              </div>
              <h3 className="text-2xl font-bold mb-4 text-white">
                Track & Improve
              </h3>
              <p className="text-gray-400 leading-relaxed">
                Monitor your performance, identify weak areas, and continuously improve your skills
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="relative px-4 sm:px-6 py-16 sm:py-24 lg:py-32 overflow-hidden bg-gradient-to-b from-[#1a1a1a] to-gray-900">
        {/* Professional Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-[#1a1a1a] to-gray-900"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(59,130,246,0.15),transparent_70%)]"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(168,85,247,0.15),transparent_70%)]"></div>

        {/* Subtle floating elements */}
        <div className="absolute top-20 left-20 w-32 h-32 bg-blue-500/5 rounded-full blur-2xl"></div>
        <div className="absolute bottom-20 right-20 w-40 h-40 bg-purple-500/5 rounded-full blur-2xl"></div>

        <div className="relative z-10 max-w-7xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-20">
            <div className="mb-8">
              <span className="px-6 py-3 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-full text-lg font-semibold border border-blue-500/30 backdrop-blur-sm">
                🎯 Join the Success Story
              </span>
            </div>

            <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black mb-6 sm:mb-8 leading-tight">
              <span className="bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                Ready to Ace Your
              </span>
              <br />
              <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                Dream Interview?
              </span>
            </h2>

            <p className="text-lg sm:text-xl md:text-2xl text-gray-300 max-w-4xl mx-auto leading-relaxed mb-12 sm:mb-16 px-4">
              Join <span className="font-bold text-blue-400">10,000+</span>{" "}
              students who transformed their careers with NextRound AI
            </p>
          </div>

          {/* Stats Grid */}
          <div className="grid sm:grid-cols-3 gap-6 sm:gap-8 mb-16 sm:mb-20 max-w-4xl mx-auto">
            <div className="text-center p-8 rounded-2xl bg-gradient-to-br from-gray-900/80 to-gray-800/80 border border-gray-700/50 backdrop-blur-sm">
              <div className="text-5xl font-black text-white mb-3">10K+</div>
              <div className="text-gray-400 text-lg">Students Trained</div>
            </div>
            <div className="text-center p-8 rounded-2xl bg-gradient-to-br from-gray-900/80 to-gray-800/80 border border-gray-700/50 backdrop-blur-sm">
              <div className="text-5xl font-black text-white mb-3">95%</div>
              <div className="text-gray-400 text-lg">Success Rate</div>
            </div>
            <div className="text-center p-8 rounded-2xl bg-gradient-to-br from-gray-900/80 to-gray-800/80 border border-gray-700/50 backdrop-blur-sm">
              <div className="text-5xl font-black text-white mb-3">500+</div>
              <div className="text-gray-400 text-lg">Companies Hiring</div>
            </div>
          </div>

          {/* CTA Button Section */}
          <div className="text-center mb-12 sm:mb-16 px-4">
            {user ? (
              <Link
                to="/interview"
                className="group inline-flex items-center px-10 sm:px-16 py-4 sm:py-6 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-full text-lg sm:text-2xl font-bold text-white hover:from-blue-600 hover:via-purple-600 hover:to-pink-600 transition-all duration-500 shadow-2xl hover:shadow-purple-500/50 hover:scale-110"
              >
                <span className="relative z-10">Start Assessment Now</span>
                <span className="ml-4 text-2xl sm:text-3xl group-hover:rotate-12 transition-transform">🚀</span>
              </Link>
            ) : (
              <Link
                to="/signup"
                className="group inline-flex items-center px-10 sm:px-16 py-4 sm:py-6 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-full text-lg sm:text-2xl font-bold text-white hover:from-blue-600 hover:via-purple-600 hover:to-pink-600 transition-all duration-500 shadow-2xl hover:shadow-purple-500/50 hover:scale-110"
              >
                <span className="relative z-10">Start Your Journey</span>
                <span className="ml-4 text-2xl sm:text-3xl group-hover:rotate-12 transition-transform">🚀</span>
              </Link>
            )}

            <div className="flex flex-col sm:flex-row justify-center items-center gap-4 sm:gap-6 mt-6 sm:mt-8">
              <div className="flex -space-x-3">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full border-2 border-gray-800"></div>
                <div className="w-12 h-12 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full border-2 border-gray-800"></div>
                <div className="w-12 h-12 bg-gradient-to-r from-pink-400 to-cyan-400 rounded-full border-2 border-gray-800"></div>
                <div className="w-12 h-12 bg-gray-700 rounded-full border-2 border-gray-800 flex items-center justify-center text-sm font-bold text-white">
                  +1K
                </div>
              </div>
              <div className="text-gray-300 text-sm sm:text-base">
                <span className="font-semibold text-white">1,247</span> students joined this week
              </div>
            </div>
          </div>

          {/* Trust Indicators */}
          <div className="text-center pt-12 border-t border-gray-800">
            <p className="text-gray-400 text-lg mb-8">
              Trusted by students from top universities
            </p>
            <div className="flex flex-wrap justify-center items-center gap-12">
              <div className="text-gray-300 font-semibold text-lg hover:text-white transition-colors">IIT Delhi</div>
              <div className="text-gray-300 font-semibold text-lg hover:text-white transition-colors">IIT Bombay</div>
              <div className="text-gray-300 font-semibold text-lg hover:text-white transition-colors">BITS Pilani</div>
              <div className="text-gray-300 font-semibold text-lg hover:text-white transition-colors">NIT Trichy</div>
              <div className="text-gray-300 font-semibold text-lg hover:text-white transition-colors">VIT</div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#1a1a1a] border-t border-gray-800 py-16">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <div className="mb-8">
            <h3 className="text-4xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent mb-4">
              NextRound AI
            </h3>
            <p className="text-xl text-gray-400 mb-2">
              Your AI-powered companion for interview success
            </p>
            <p className="text-gray-500">
              Built for students & freshers who want to excel
            </p>
          </div>

          <div className="pt-8 border-t border-gray-800">
            <p className="text-gray-600">
              © 2026 NextRound AI. Empowering the next generation of developers.
            </p>
          </div>
        </div>
      </footer>

      {/* Logout Confirmation Modal */}
      {showLogoutModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 animate-fadeIn">
          {/* Backdrop */}
          <div 
            className="absolute inset-0 bg-[#1a1a1a]/70 backdrop-blur-sm"
            onClick={() => !isLoggingOut && setShowLogoutModal(false)}
          ></div>
          
          {/* Modal */}
          <div className="relative bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl shadow-2xl border border-gray-700 max-w-md w-full p-6 sm:p-8 animate-slideUp">
            {/* Icon */}
            <div className="flex justify-center mb-6">
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-gradient-to-br from-red-500/20 to-orange-500/20 border-2 border-red-500/50 flex items-center justify-center">
                <svg className="w-8 h-8 sm:w-10 sm:h-10 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                </svg>
              </div>
            </div>

            {/* Title */}
            <h3 className="text-2xl sm:text-3xl font-bold text-white text-center mb-3">
              Logout Confirmation
            </h3>

            {/* Message */}
            <p className="text-gray-300 text-center mb-8 text-base sm:text-lg">
              Are you sure you want to logout?
              <br />
              <span className="text-sm text-gray-400 mt-2 inline-block">
                You'll need to sign in again to access your account.
              </span>
            </p>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row gap-3">
              {/* Cancel Button */}
              <button
                onClick={() => setShowLogoutModal(false)}
                disabled={isLoggingOut}
                className="flex-1 px-6 py-3 sm:py-4 bg-gray-700 hover:bg-gray-600 text-white font-semibold rounded-xl transition-all duration-300 hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 border border-gray-600"
              >
                Cancel
              </button>

              {/* Logout Button */}
              <button
                onClick={handleLogout}
                disabled={isLoggingOut}
                className="flex-1 px-6 py-3 sm:py-4 bg-gradient-to-r from-red-500 to-orange-500 hover:from-red-600 hover:to-orange-600 text-white font-bold rounded-xl transition-all duration-300 hover:scale-105 active:scale-95 shadow-lg shadow-red-500/30 hover:shadow-red-500/50 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 flex items-center justify-center gap-2"
              >
                {isLoggingOut ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>Logging out...</span>
                  </>
                ) : (
                  <>
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                    </svg>
                    <span>Yes, Logout</span>
                  </>
                )}
              </button>
            </div>

            {/* Close button (X) */}
            {!isLoggingOut && (
              <button
                onClick={() => setShowLogoutModal(false)}
                className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            )}
          </div>
        </div>
      )}

      {/* Floating Daily Challenge Button */}
      <Link
        to="/daily-challenge"
        className="fixed bottom-8 right-8 z-50 group"
      >
        <div className="relative">
          {/* Pulsing ring effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full blur-xl opacity-75 animate-pulse"></div>
          
          {/* Main button */}
          <div className="relative bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-white font-bold px-6 py-4 rounded-full shadow-2xl transition-all duration-300 hover:scale-110 flex items-center gap-3 animate-float">
            <span className="text-3xl animate-bounce-slow">🔥</span>
            <div className="flex flex-col items-start">
              <span className="text-sm font-semibold">Daily Challenge</span>
              <span className="text-xs opacity-90">Solve & Compete!</span>
            </div>
          </div>
          
          {/* Notification badge */}
          <div className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center animate-ping-slow">
            NEW
          </div>
        </div>
      </Link>
    </div>
  );
}