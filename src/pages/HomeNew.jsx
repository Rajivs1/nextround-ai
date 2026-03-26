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
import { checkAndResetStreak } from "../utils/streakUtils";

export default function HomeNew() {
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  const [userProfile, setUserProfile] = useState(null);
  const [leaderboard, setLeaderboard] = useState([]);
  const [loadingLeaderboard, setLoadingLeaderboard] = useState(true);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Get user profile data
  useEffect(() => {
    if (!user) return;

    checkAndResetStreak(user.uid).then((result) => {
      if (result.streakReset) {
        console.log("Streak was reset due to inactivity");
      }
    });

    const unsub = onSnapshot(doc(db, "users", user.uid), (snap) => {
      if (snap.exists()) {
        setUserProfile(snap.data());
      }
    });

    return () => unsub();
  }, [user]);

  // Fetch leaderboard
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

  if (loading) {
    return (
      <div className="min-h-screen bg-bg-secondary flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-xl text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  const displayName = userProfile?.username || user?.email?.split('@')[0] || "User";

  return (
    <div className="min-h-screen bg-bg-secondary">
      {/* Navigation */}
      <nav className="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex justify-between items-center h-16 sm:h-20">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
              <img src={logo} alt="NextRound AI" className="w-8 h-8 sm:w-10 sm:h-10" />
              <span className="text-xl sm:text-2xl font-bold text-gray-900">
                NextRound <span className="text-primary">AI</span>
              </span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-6">
              {user ? (
                <>
                  <Link to="/problems" className="text-gray-600 hover:text-gray-900 font-medium transition-colors">
                    Practice
                  </Link>
                  <Link to="/chat" className="text-gray-600 hover:text-gray-900 font-medium transition-colors">
                    AI Chat
                  </Link>
                  <Link to="/resume-analyzer" className="text-gray-600 hover:text-gray-900 font-medium transition-colors">
                    Resume
                  </Link>
                  <Link to="/dashboard" className="px-5 py-2.5 bg-gradient-to-r from-primary to-primary-dark text-white font-semibold rounded-lg hover:shadow-lg hover:shadow-primary/30 transition-all">
                    Dashboard
                  </Link>
                  <button
                    onClick={() => setShowLogoutModal(true)}
                    className="text-gray-600 hover:text-gray-900 font-medium transition-colors"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link to="/login" className="text-gray-600 hover:text-gray-900 font-medium transition-colors">
                    Login
                  </Link>
                  <Link to="/signup" className="px-5 py-2.5 bg-gradient-to-r from-primary to-primary-dark text-white font-semibold rounded-lg hover:shadow-lg hover:shadow-primary/30 transition-all">
                    Sign Up
                  </Link>
                </>
              )}
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-gray-600 hover:text-gray-900"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {mobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>

          {/* Mobile Menu */}
          {mobileMenuOpen && (
            <div className="md:hidden py-4 border-t border-gray-200">
              {user ? (
                <div className="flex flex-col gap-3">
                  <Link to="/problems" className="px-4 py-2 text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-lg transition-colors">
                    Practice
                  </Link>
                  <Link to="/chat" className="px-4 py-2 text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-lg transition-colors">
                    AI Chat
                  </Link>
                  <Link to="/resume-analyzer" className="px-4 py-2 text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-lg transition-colors">
                    Resume
                  </Link>
                  <Link to="/dashboard" className="px-4 py-2 bg-primary text-white rounded-lg font-semibold">
                    Dashboard
                  </Link>
                  <button onClick={() => setShowLogoutModal(true)} className="px-4 py-2 text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-lg transition-colors text-left">
                    Logout
                  </button>
                </div>
              ) : (
                <div className="flex flex-col gap-3">
                  <Link to="/login" className="px-4 py-2 text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-lg transition-colors">
                    Login
                  </Link>
                  <Link to="/signup" className="px-4 py-2 bg-primary text-white rounded-lg font-semibold">
                    Sign Up
                  </Link>
                </div>
              )}
            </div>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-purple-50 via-white to-blue-50 py-16 sm:py-24 lg:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white rounded-full border border-gray-200 shadow-sm mb-8">
            <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
            <span className="text-sm font-medium text-gray-700">AI-Powered Interview Preparation</span>
          </div>

          {/* Headline */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-gray-900 mb-6 leading-tight">
            Ace Your Next Interview with
            <br />
            <span className="text-primary">AI-Powered Practice</span>
          </h1>

          {/* Subtitle */}
          <p className="text-lg sm:text-xl text-gray-600 mb-12 max-w-3xl mx-auto leading-relaxed">
            Master technical interviews with personalized AI feedback, real-time code execution, and comprehensive progress tracking
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            {user ? (
              <>
                <Link
                  to="/interview"
                  className="px-8 py-4 bg-gradient-to-r from-primary to-primary-dark text-white font-bold rounded-xl hover:shadow-xl hover:shadow-primary/30 transition-all hover:-translate-y-0.5 text-lg"
                >
                  Start Practice Session →
                </Link>
                <Link
                  to="/problems"
                  className="px-8 py-4 bg-white text-primary border-2 border-primary font-bold rounded-xl hover:bg-primary hover:text-white transition-all text-lg"
                >
                  Browse Problems
                </Link>
              </>
            ) : (
              <>
                <Link
                  to="/signup"
                  className="px-8 py-4 bg-gradient-to-r from-primary to-primary-dark text-white font-bold rounded-xl hover:shadow-xl hover:shadow-primary/30 transition-all hover:-translate-y-0.5 text-lg"
                >
                  Get Started Free →
                </Link>
                <Link
                  to="/login"
                  className="px-8 py-4 bg-white text-primary border-2 border-primary font-bold rounded-xl hover:bg-primary hover:text-white transition-all text-lg"
                >
                  Sign In
                </Link>
              </>
            )}
          </div>

          {/* Stats */}
          <div className="flex flex-wrap justify-center gap-8 sm:gap-12">
            <div className="text-center">
              <div className="text-3xl sm:text-4xl font-black text-gray-900 mb-1">10K+</div>
              <div className="text-sm text-gray-600">Active Learners</div>
            </div>
            <div className="text-center">
              <div className="text-3xl sm:text-4xl font-black text-gray-900 mb-1">95%</div>
              <div className="text-sm text-gray-600">Success Rate</div>
            </div>
            <div className="text-center">
              <div className="text-3xl sm:text-4xl font-black text-gray-900 mb-1">500+</div>
              <div className="text-sm text-gray-600">Companies</div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 sm:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          {/* Section Header */}
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-gray-900 mb-4">
              Everything You Need to Succeed
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Comprehensive tools and resources to help you prepare for technical interviews
            </p>
          </div>

          {/* Feature Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* AI Interview Practice */}
            <Link to="/interview" className="group bg-white rounded-2xl border border-gray-200 p-8 hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
              <div className="w-14 h-14 bg-gradient-to-br from-purple-100 to-purple-200 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <span className="text-3xl">🤖</span>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">AI Interview Practice</h3>
              <p className="text-gray-600 mb-4 leading-relaxed">
                Practice with AI interviewer that adapts to your responses and provides real-time feedback
              </p>
              <div className="flex items-center text-primary font-semibold group-hover:gap-2 transition-all">
                <span>Start practicing</span>
                <span className="group-hover:translate-x-1 transition-transform">→</span>
              </div>
            </Link>

            {/* Code Practice */}
            <Link to="/problems" className="group bg-white rounded-2xl border border-gray-200 p-8 hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
              <div className="w-14 h-14 bg-gradient-to-br from-blue-100 to-blue-200 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <span className="text-3xl">💻</span>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">96+ Coding Problems</h3>
              <p className="text-gray-600 mb-4 leading-relaxed">
                Solve curated problems across 8 topics with comprehensive test cases and solutions
              </p>
              <div className="flex items-center text-primary font-semibold group-hover:gap-2 transition-all">
                <span>Browse problems</span>
                <span className="group-hover:translate-x-1 transition-transform">→</span>
              </div>
            </Link>

            {/* AI Chat */}
            <Link to="/chat" className="group bg-white rounded-2xl border border-gray-200 p-8 hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
              <div className="w-14 h-14 bg-gradient-to-br from-green-100 to-green-200 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <span className="text-3xl">💬</span>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">AI Chat Assistant</h3>
              <p className="text-gray-600 mb-4 leading-relaxed">
                Get instant help with coding questions, interview tips, and career guidance 24/7
              </p>
              <div className="flex items-center text-primary font-semibold group-hover:gap-2 transition-all">
                <span>Start chatting</span>
                <span className="group-hover:translate-x-1 transition-transform">→</span>
              </div>
            </Link>

            {/* Resume Analyzer */}
            <Link to="/resume-analyzer" className="group bg-white rounded-2xl border border-gray-200 p-8 hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
              <div className="w-14 h-14 bg-gradient-to-br from-indigo-100 to-indigo-200 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <span className="text-3xl">📄</span>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">Resume Analyzer</h3>
              <p className="text-gray-600 mb-4 leading-relaxed">
                Get AI-powered feedback to optimize your resume for ATS systems and recruiters
              </p>
              <div className="flex items-center text-primary font-semibold group-hover:gap-2 transition-all">
                <span>Analyze resume</span>
                <span className="group-hover:translate-x-1 transition-transform">→</span>
              </div>
            </Link>

            {/* Progress Tracking */}
            <Link to="/dashboard" className="group bg-white rounded-2xl border border-gray-200 p-8 hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
              <div className="w-14 h-14 bg-gradient-to-br from-pink-100 to-pink-200 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <span className="text-3xl">📊</span>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">Progress Tracking</h3>
              <p className="text-gray-600 mb-4 leading-relaxed">
                Track your improvement with detailed analytics and performance insights
              </p>
              <div className="flex items-center text-primary font-semibold group-hover:gap-2 transition-all">
                <span>View dashboard</span>
                <span className="group-hover:translate-x-1 transition-transform">→</span>
              </div>
            </Link>

            {/* Daily Challenge */}
            <Link to="/daily-challenge" className="group bg-white rounded-2xl border border-gray-200 p-8 hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
              <div className="w-14 h-14 bg-gradient-to-br from-yellow-100 to-yellow-200 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <span className="text-3xl">🔥</span>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">Daily Challenge</h3>
              <p className="text-gray-600 mb-4 leading-relaxed">
                Solve AI-generated challenges daily and compete on the global leaderboard
              </p>
              <div className="flex items-center text-primary font-semibold group-hover:gap-2 transition-all">
                <span>Today's challenge</span>
                <span className="group-hover:translate-x-1 transition-transform">→</span>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 sm:py-24 bg-bg-secondary">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-gray-900 mb-4">
              How It Works
            </h2>
            <p className="text-lg text-gray-600">Get started in three simple steps</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-20 h-20 bg-gradient-to-br from-primary to-primary-dark rounded-2xl flex items-center justify-center text-white text-3xl font-black mx-auto mb-6 shadow-lg shadow-primary/30">
                1
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">Sign Up</h3>
              <p className="text-gray-600 leading-relaxed">
                Create your free account and set up your profile in under 2 minutes
              </p>
            </div>

            <div className="text-center">
              <div className="w-20 h-20 bg-gradient-to-br from-primary to-primary-dark rounded-2xl flex items-center justify-center text-white text-3xl font-black mx-auto mb-6 shadow-lg shadow-primary/30">
                2
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">Practice</h3>
              <p className="text-gray-600 leading-relaxed">
                Take AI-powered mock interviews and solve coding problems with instant feedback
              </p>
            </div>

            <div className="text-center">
              <div className="w-20 h-20 bg-gradient-to-br from-primary to-primary-dark rounded-2xl flex items-center justify-center text-white text-3xl font-black mx-auto mb-6 shadow-lg shadow-primary/30">
                3
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">Succeed</h3>
              <p className="text-gray-600 leading-relaxed">
                Track your progress and land your dream job with confidence
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 sm:py-24 bg-gradient-to-br from-primary to-primary-dark">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white mb-6">
            Ready to Ace Your Next Interview?
          </h2>
          <p className="text-xl text-purple-100 mb-12">
            Join 10,000+ students who transformed their careers with NextRound AI
          </p>
          {user ? (
            <Link
              to="/interview"
              className="inline-block px-10 py-5 bg-white text-primary font-bold rounded-xl hover:shadow-2xl transition-all hover:-translate-y-1 text-lg"
            >
              Start Practice Session →
            </Link>
          ) : (
            <Link
              to="/signup"
              className="inline-block px-10 py-5 bg-white text-primary font-bold rounded-xl hover:shadow-2xl transition-all hover:-translate-y-1 text-lg"
            >
              Get Started Free →
            </Link>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex flex-col items-center text-center">
            <div className="flex items-center gap-3 mb-4">
              <img src={logo} alt="NextRound AI" className="w-10 h-10" />
              <span className="text-2xl font-bold text-gray-900">
                NextRound <span className="text-primary">AI</span>
              </span>
            </div>
            <p className="text-gray-600 mb-2">Your AI-powered companion for interview success</p>
            <p className="text-sm text-gray-500">© 2026 NextRound AI. All rights reserved.</p>
          </div>
        </div>
      </footer>

      {/* Logout Modal */}
      {showLogoutModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-8">
            <div className="text-center mb-6">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Logout Confirmation</h3>
              <p className="text-gray-600">Are you sure you want to logout?</p>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => setShowLogoutModal(false)}
                disabled={isLoggingOut}
                className="flex-1 px-6 py-3 bg-gray-100 text-gray-700 font-semibold rounded-lg hover:bg-gray-200 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleLogout}
                disabled={isLoggingOut}
                className="flex-1 px-6 py-3 bg-red-600 text-white font-semibold rounded-lg hover:bg-red-700 transition-colors flex items-center justify-center gap-2"
              >
                {isLoggingOut ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>Logging out...</span>
                  </>
                ) : (
                  "Yes, Logout"
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
