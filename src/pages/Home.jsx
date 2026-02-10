import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "../firebase";

export default function Home() {
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  const [userProfile, setUserProfile] = useState(null);

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

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate("/");
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  // Show loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-xl text-gray-300">Loading...</p>
        </div>
      </div>
    );
  }

  const displayName = userProfile?.username || user?.email?.split('@')[0] || "User";

  return (
    <div className="min-h-screen bg-black text-white overflow-hidden">
      {/* Navigation - Different for logged-in vs logged-out users */}
      <nav className="relative z-10 px-4 sm:px-6 py-4 sm:py-6">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            NextRound AI
          </div>
          <div className="flex items-center gap-2 sm:gap-4">
            {user ? (
              // Logged-in user navigation
              <>
                <span className="text-gray-300 text-sm sm:text-base hidden md:block">
                  Welcome, <span className="text-white font-semibold">{displayName}</span>
                </span>
                <Link
                  to="/problems"
                  className="px-3 sm:px-6 py-2 text-sm sm:text-base text-gray-300 hover:text-white transition-colors"
                >
                  Practice
                </Link>
                <Link
                  to="/dashboard"
                  className="px-3 sm:px-6 py-2 text-sm sm:text-base bg-gradient-to-r from-blue-500 to-purple-500 rounded-full hover:from-blue-600 hover:to-purple-600 transition-all duration-300"
                >
                  Dashboard
                </Link>
                <button
                  onClick={handleLogout}
                  className="px-3 sm:px-6 py-2 text-sm sm:text-base text-gray-300 hover:text-white transition-colors hidden sm:block"
                >
                  Logout
                </button>
              </>
            ) : (
              // Logged-out user navigation
              <>
                <Link
                  to="/login"
                  className="px-3 sm:px-6 py-2 text-sm sm:text-base text-gray-300 hover:text-white transition-colors"
                >
                  Login
                </Link>
                <Link
                  to="/signup"
                  className="px-3 sm:px-6 py-2 text-sm sm:text-base bg-gradient-to-r from-blue-500 to-purple-500 rounded-full hover:from-blue-600 hover:to-purple-600 transition-all duration-300"
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative px-4 sm:px-6 py-16 sm:py-24 lg:py-32 text-center overflow-hidden">
        {/* Enhanced Background Effects */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/30 via-purple-900/30 to-pink-900/30"></div>
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-r from-cyan-500/10 to-pink-500/10 rounded-full blur-3xl"></div>

        {/* Floating particles */}
        <div className="absolute top-20 left-20 w-2 h-2 bg-blue-400 rounded-full animate-ping"></div>
        <div className="absolute top-40 right-32 w-3 h-3 bg-purple-400 rounded-full animate-ping delay-500"></div>
        <div className="absolute bottom-32 left-1/3 w-2 h-2 bg-pink-400 rounded-full animate-ping delay-1000"></div>

        <div className="relative z-10 max-w-7xl mx-auto">
          <div className="mb-8 sm:mb-12">
            <span className="inline-flex items-center px-4 sm:px-6 py-2 sm:py-3 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-full text-sm sm:text-lg font-semibold border border-blue-500/30 backdrop-blur-sm">
              <span className="mr-2 text-xl sm:text-2xl">🚀</span>
              <span className="hidden sm:inline">AI-Powered Interview Preparation Platform</span>
              <span className="sm:hidden">AI Interview Prep</span>
            </span>
          </div>

          <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-9xl font-black mb-8 sm:mb-12 leading-tight">
            <span className="block mb-2 sm:mb-4">Crack Your Next</span>
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
                  to="/dashboard"
                  className="group px-8 sm:px-12 py-4 sm:py-6 border-2 border-gray-600 rounded-full text-lg sm:text-xl font-semibold hover:border-purple-400 hover:bg-purple-900/20 transition-all duration-300 backdrop-blur-sm w-full sm:w-auto"
                >
                  <span className="flex items-center justify-center">
                    View Progress
                    <span className="ml-2 group-hover:translate-x-1 transition-transform">📊</span>
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

      {/* Features Section */}
      <section className="relative px-4 sm:px-6 py-16 sm:py-24 lg:py-32 bg-gradient-to-b from-black via-gray-900 to-black">
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

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            <div className="group relative p-10 rounded-3xl bg-gradient-to-br from-gray-900/80 to-gray-800/80 border border-gray-700/50 hover:border-blue-500/50 transition-all duration-500 hover:scale-105 backdrop-blur-sm">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="relative z-10">
                <div className="text-6xl mb-8 group-hover:scale-125 transition-transform duration-500">
                  🤖
                </div>
                <h3 className="text-2xl font-bold mb-6 text-white">
                  AI Interview Practice
                </h3>
                <p className="text-gray-400 leading-relaxed mb-6">
                  Practice with AI interviewer that adapts to your responses and provides real-time feedback
                </p>
                <div className="flex items-center text-blue-400 font-semibold">
                  <span>Learn more</span>
                  <span className="ml-2 group-hover:translate-x-1 transition-transform">
                    →
                  </span>
                </div>
              </div>
            </div>

            <div className="group relative p-10 rounded-3xl bg-gradient-to-br from-gray-900/80 to-gray-800/80 border border-gray-700/50 hover:border-purple-500/50 transition-all duration-500 hover:scale-105 backdrop-blur-sm">
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-pink-500/5 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="relative z-10">
                <div className="text-6xl mb-8 group-hover:scale-125 transition-transform duration-500">
                  💻
                </div>
                <h3 className="text-2xl font-bold mb-6 text-white">
                  Code-Based Questions
                </h3>
                <p className="text-gray-400 leading-relaxed mb-6">
                  Real coding challenges with JavaScript, C++, and pseudocode snippets for practical assessment
                </p>
                <div className="flex items-center text-purple-400 font-semibold">
                  <span>Learn more</span>
                  <span className="ml-2 group-hover:translate-x-1 transition-transform">
                    →
                  </span>
                </div>
              </div>
            </div>

            <div className="group relative p-10 rounded-3xl bg-gradient-to-br from-gray-900/80 to-gray-800/80 border border-gray-700/50 hover:border-pink-500/50 transition-all duration-500 hover:scale-105 backdrop-blur-sm">
              <div className="absolute inset-0 bg-gradient-to-br from-pink-500/5 to-cyan-500/5 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="relative z-10">
                <div className="text-6xl mb-8 group-hover:scale-125 transition-transform duration-500">
                  📊
                </div>
                <h3 className="text-2xl font-bold mb-6 text-white">
                  Performance Analytics
                </h3>
                <p className="text-gray-400 leading-relaxed mb-6">
                  Track your progress with detailed analytics and identify areas for improvement
                </p>
                <div className="flex items-center text-pink-400 font-semibold">
                  <span>Learn more</span>
                  <span className="ml-2 group-hover:translate-x-1 transition-transform">
                    →
                  </span>
                </div>
              </div>
            </div>

            <div className="group relative p-10 rounded-3xl bg-gradient-to-br from-gray-900/80 to-gray-800/80 border border-gray-700/50 hover:border-cyan-500/50 transition-all duration-500 hover:scale-105 backdrop-blur-sm">
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-blue-500/5 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="relative z-10">
                <div className="text-6xl mb-8 group-hover:scale-125 transition-transform duration-500">
                  🎯
                </div>
                <h3 className="text-2xl font-bold mb-6 text-white">
                  Role-Based Assessments
                </h3>
                <p className="text-gray-400 leading-relaxed mb-6">
                  Choose from Developer, HR, Data Analyst, and SQL Developer role-specific questions
                </p>
                <div className="flex items-center text-cyan-400 font-semibold">
                  <span>Learn more</span>
                  <span className="ml-2 group-hover:translate-x-1 transition-transform">
                    →
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="relative px-4 sm:px-6 py-16 sm:py-24 bg-gradient-to-b from-gray-900 to-black">
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
      <section className="relative px-4 sm:px-6 py-16 sm:py-24 lg:py-32 overflow-hidden bg-gradient-to-b from-black to-gray-900">
        {/* Professional Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-black to-gray-900"></div>
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

          {/* Testimonials */}
          <div className="mb-16 sm:mb-20">
            <h3 className="text-2xl sm:text-3xl font-bold text-center text-white mb-8 sm:mb-12 px-4">
              What Our Students Say
            </h3>
            <div className="grid md:grid-cols-2 gap-6 sm:gap-8 max-w-5xl mx-auto">
              <div className="p-8 rounded-2xl bg-gradient-to-br from-gray-900/80 to-gray-800/80 border border-gray-700/50 backdrop-blur-sm">
                <div className="flex items-center mb-6">
                  <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white text-xl font-bold mr-4">
                    A
                  </div>
                  <div>
                    <div className="text-xl font-semibold text-white">Arjun K.</div>
                    <div className="text-gray-400">Software Engineer @ Google</div>
                  </div>
                </div>
                <p className="text-gray-300 text-lg leading-relaxed">
                  "NextRound AI helped me crack Google's interview. The AI feedback was incredibly accurate and helped me improve my weak areas."
                </p>
              </div>

              <div className="p-8 rounded-2xl bg-gradient-to-br from-gray-900/80 to-gray-800/80 border border-gray-700/50 backdrop-blur-sm">
                <div className="flex items-center mb-6">
                  <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white text-xl font-bold mr-4">
                    P
                  </div>
                  <div>
                    <div className="text-xl font-semibold text-white">Priya S.</div>
                    <div className="text-gray-400">Frontend Dev @ Microsoft</div>
                  </div>
                </div>
                <p className="text-gray-300 text-lg leading-relaxed">
                  "The code-based questions with real snippets made the practice feel like actual technical interviews. Highly recommend!"
                </p>
              </div>
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
      <footer className="bg-black border-t border-gray-800 py-16">
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
              © 2024 NextRound AI. Empowering the next generation of developers.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}