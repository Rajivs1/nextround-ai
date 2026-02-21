import { useEffect, useState } from "react";
import {
  doc,
  onSnapshot,
  getDoc,
  deleteDoc,
  updateDoc,
} from "firebase/firestore";
import { db } from "../firebase";
import { useAuth } from "../context/AuthContext";
import { useNavigate, useLocation } from "react-router-dom";
import {
  signOut,
  deleteUser,
} from "firebase/auth";
import { auth } from "../firebase";
import ThemeToggle from "../components/ThemeToggle";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

export default function Dashboard() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [profile, setProfile] = useState(null);
  const [refreshTrigger, setRefreshTrigger] = useState(0);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteConfirmText, setDeleteConfirmText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [activeTab, setActiveTab] = useState("dashboard");
  const [isUploadingImage, setIsUploadingImage] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  // Force refresh when coming from result page
  useEffect(() => {
    if (location.state?.fromResult) {
      console.log("Refreshing dashboard after assessment completion");
      setRefreshTrigger((prev) => prev + 1);
      window.history.replaceState({}, document.title);
    }
  }, [location.state]);

  // Real-time listener
  useEffect(() => {
    if (!user) return;

    const unsub = onSnapshot(
      doc(db, "users", user.uid),
      (snap) => {
        if (snap.exists()) {
          const userData = snap.data();
          setProfile(userData);
        }
      },
      (error) => {
        console.error("Error in onSnapshot:", error);
      }
    );

    return () => unsub();
  }, [user, refreshTrigger]);

  const handleRefresh = async () => {
    if (!user) return;

    try {
      const docSnap = await getDoc(doc(db, "users", user.uid));
      if (docSnap.exists()) {
        setProfile(docSnap.data());
      }
    } catch (error) {
      console.error("Error manually refreshing:", error);
    }
  };

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

  const handleImageUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith("image/")) {
      alert("Please select an image file");
      return;
    }

    // Validate file size (max 1MB for base64 storage)
    if (file.size > 1 * 1024 * 1024) {
      alert("Image size should be less than 1MB");
      return;
    }

    setIsUploadingImage(true);

    try {
      // Convert image to base64 and store in Firestore instead of Storage
      const reader = new FileReader();
      reader.onload = async (e) => {
        try {
          const base64Image = e.target.result;

          // Update the user's profile in Firestore with base64 image
          await updateDoc(doc(db, "users", user.uid), {
            profilePicture: base64Image,
          });

          console.log("Profile picture updated successfully");
        } catch (error) {
          console.error("Error saving image to Firestore:", error);
          alert("Failed to upload image. Please try again.");
        } finally {
          setIsUploadingImage(false);
        }
      };

      reader.onerror = () => {
        console.error("Error reading file");
        alert("Failed to read image file");
        setIsUploadingImage(false);
      };

      reader.readAsDataURL(file);
    } catch (error) {
      console.error("Error uploading image:", error);
      alert("Failed to upload image. Please try again.");
      setIsUploadingImage(false);
    }
  };

  const removeProfilePicture = async () => {
    if (!profile?.profilePicture) return;

    setIsUploadingImage(true);
    try {
      // Remove from Firestore
      await updateDoc(doc(db, "users", user.uid), {
        profilePicture: null,
      });

      console.log("Profile picture removed successfully");
    } catch (error) {
      console.error("Error removing profile picture:", error);
      alert("Failed to remove profile picture. Please try again.");
    } finally {
      setIsUploadingImage(false);
    }
  };

  const handleDeleteAccount = async () => {
    if (deleteConfirmText !== "DELETE") {
      alert("Please type 'DELETE' to confirm account deletion");
      return;
    }

    setIsDeleting(true);
    try {
      // First delete the user document from Firestore
      console.log("Deleting user document from Firestore...");
      await deleteDoc(doc(db, "users", user.uid));
      console.log("User document deleted successfully");

      // Then delete the user from Firebase Auth
      console.log("Deleting user from Firebase Auth...");
      await deleteUser(user);
      console.log("User deleted from Firebase Auth successfully");

      // Navigate to home page
      navigate("/");
    } catch (error) {
      console.error("Error deleting account:", error);

      // Handle specific Firebase Auth errors
      if (error.code === "auth/requires-recent-login") {
        alert(
          "For security reasons, please log out and log back in, then try deleting your account again."
        );
        // Log out the user so they can re-authenticate
        try {
          await signOut(auth);
          navigate("/login");
        } catch (signOutError) {
          console.error("Error signing out:", signOutError);
          navigate("/");
        }
      } else if (error.code === "auth/user-not-found") {
        // User already deleted from auth, just navigate away
        console.log("User already deleted from auth, navigating to home");
        navigate("/");
      } else {
        // For other errors, show a more helpful message
        alert(
          `Error deleting account: ${error.message}. Please try logging out and back in, then try again.`
        );
      }
    } finally {
      setIsDeleting(false);
      setShowDeleteModal(false);
    }
  };

  if (!profile) {
    return (
      <div className="min-h-screen bg-[#1a1a1a] text-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-xl text-gray-300">Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  const scores = profile.scores || [];
  const data = scores.map((s, i) => ({ attempt: i + 1, score: s }));

  const getAverageScore = () => {
    if (scores.length === 0) return 0;
    return (
      scores.reduce((sum, score) => sum + score, 0) / scores.length
    ).toFixed(1);
  };

  const getLatestScore = () => {
    return scores.length > 0 ? scores[scores.length - 1] : 0;
  };

  const getScoreColor = (score) => {
    if (score >= 8) return "text-green-400";
    if (score >= 6) return "text-yellow-400";
    return "text-red-400";
  };

  const getProgressMessage = () => {
    const avgScore = parseFloat(getAverageScore());
    if (avgScore >= 8)
      return "Excellent performance! You're interview-ready! 🚀";
    if (avgScore >= 6)
      return "Good progress! Keep practicing to improve further 📈";
    if (avgScore >= 4) return "You're improving! Focus on weak areas 💪";
    return "Keep practicing! Every attempt makes you better 🎯";
  };

  return (
    <div className="min-h-screen bg-[#1a1a1a] text-gray-100">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-900/10 via-purple-900/10 to-pink-900/10"></div>
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl"></div>

      <div className="relative z-10">
        {/* Header */}
        <header className="border-b border-gray-800 bg-gray-900/50 backdrop-blur-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 sm:py-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div className="flex items-center space-x-3 sm:space-x-4">
                {/* Profile Picture in Header */}
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full overflow-hidden border-2 border-gray-600 bg-gray-700 flex items-center justify-center flex-shrink-0">
                  {profile?.profilePicture ? (
                    <img
                      src={profile.profilePicture}
                      alt="Profile"
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.target.style.display = "none";
                        e.target.nextSibling.style.display = "flex";
                      }}
                    />
                  ) : null}
                  <div
                    className={`w-full h-full flex items-center justify-center text-lg text-gray-400 ${
                      profile?.profilePicture ? "hidden" : "flex"
                    }`}
                  >
                    {profile?.username
                      ? profile.username.charAt(0).toUpperCase()
                      : "👤"}
                  </div>
                </div>

                <div>
                  <h1 
                    onClick={() => navigate('/')}
                    className="text-2xl sm:text-3xl lg:text-4xl font-black bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent cursor-pointer hover:scale-105 transition-transform duration-200"
                  >
                    NextRound AI
                  </h1>
                  <p className="text-gray-400 mt-1 text-sm sm:text-base">
                    Welcome back,{" "}
                    {profile.username || profile.email?.split("@")[0]}!
                  </p>
                </div>
              </div>
              <div className="flex flex-wrap gap-2 sm:gap-4">
                {/* Theme Toggle Button */}
                <ThemeToggle />
                
                <button
                  onClick={() => navigate("/chat")}
                  className="px-3 sm:px-6 py-2 sm:py-3 border border-green-600 rounded-xl text-green-400 hover:border-green-400 hover:bg-green-900/20 transition-all duration-300 text-sm sm:text-base"
                >
                  💬 <span className="hidden sm:inline">AI Chat</span>
                </button>
                <button
                  onClick={() => navigate("/interview")}
                  className="px-4 sm:px-8 py-2 sm:py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white font-bold rounded-xl hover:from-blue-600 hover:to-purple-600 transition-all duration-300 shadow-lg hover:shadow-blue-500/25 hover:scale-105 text-sm sm:text-base"
                >
                  <span className="hidden sm:inline">Start Practice</span>
                  <span className="sm:hidden">Practice</span>
                </button>
                <button
                  onClick={() => setShowLogoutModal(true)}
                  className="px-3 sm:px-6 py-2 sm:py-3 border border-gray-600 rounded-xl text-gray-300 hover:border-gray-400 hover:text-white transition-all duration-300 text-sm sm:text-base"
                >
                  Logout
                </button>
              </div>
            </div>
          </div>
        </header>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
          {/* Tab Navigation */}
          <div className="mb-8 sm:mb-12">
            <div className="flex space-x-1 bg-gray-900/50 p-1 rounded-2xl backdrop-blur-sm border border-gray-700/50 max-w-2xl mx-auto overflow-x-auto">
              <button
                onClick={() => setActiveTab("dashboard")}
                className={`flex-1 px-3 sm:px-6 py-2 sm:py-3 rounded-xl font-semibold transition-all duration-300 text-sm sm:text-base whitespace-nowrap ${
                  activeTab === "dashboard"
                    ? "bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg"
                    : "text-gray-400 hover:text-white hover:bg-gray-800/50"
                }`}
              >
                📊 <span className="hidden sm:inline">Dashboard</span>
              </button>
              <button
                onClick={() => setActiveTab("solved")}
                className={`flex-1 px-3 sm:px-6 py-2 sm:py-3 rounded-xl font-semibold transition-all duration-300 text-sm sm:text-base whitespace-nowrap ${
                  activeTab === "solved"
                    ? "bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg"
                    : "text-gray-400 hover:text-white hover:bg-gray-800/50"
                }`}
              >
                ✅ <span className="hidden sm:inline">Solved</span>
              </button>
              <button
                onClick={() => setActiveTab("profile")}
                className={`flex-1 px-3 sm:px-6 py-2 sm:py-3 rounded-xl font-semibold transition-all duration-300 text-sm sm:text-base whitespace-nowrap ${
                  activeTab === "profile"
                    ? "bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg"
                    : "text-gray-400 hover:text-white hover:bg-gray-800/50"
                }`}
              >
                👤 <span className="hidden sm:inline">Profile</span>
              </button>
            </div>
          </div>

          {/* Dashboard Tab Content */}
          {activeTab === "dashboard" && (
            <>
              {/* Welcome Section */}
              <div className="mb-8 sm:mb-12 text-center px-4">
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black mb-4">
                  Your Interview{" "}
                  <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                    Dashboard
                  </span>
                </h2>
                <p className="text-lg sm:text-xl text-gray-300 max-w-2xl mx-auto">
                  {getProgressMessage()}
                </p>
              </div>

              {/* Stats Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-8 mb-8 sm:mb-12">
                <div className="group p-8 rounded-2xl bg-gradient-to-br from-gray-900/80 to-gray-800/80 border border-gray-700/50 hover:border-blue-500/50 transition-all duration-300 hover:scale-105 hover-lift overflow-hidden relative">
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-cyan-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="absolute inset-0 animate-shimmer opacity-0 group-hover:opacity-100"></div>
                  <div className="relative z-10">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-xl font-bold text-white">
                        Total Interviews
                      </h3>
                      <div className="text-3xl animate-float-slow">🎯</div>
                    </div>
                    <p className="text-4xl font-black text-blue-400 mb-2 group-hover:scale-110 transition-transform">
                      {scores.length}
                    </p>
                    <p className="text-gray-400">Practice sessions completed</p>
                  </div>
                </div>

                <div className="group p-8 rounded-2xl bg-gradient-to-br from-gray-900/80 to-gray-800/80 border border-gray-700/50 hover:border-green-500/50 transition-all duration-300 hover:scale-105 hover-lift overflow-hidden relative">
                  <div className="absolute inset-0 bg-gradient-to-br from-green-500/10 to-emerald-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="absolute inset-0 animate-shimmer opacity-0 group-hover:opacity-100"></div>
                  <div className="relative z-10">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-xl font-bold text-white">
                        Average Score
                      </h3>
                      <div className="text-3xl animate-float-slow" style={{animationDelay: '0.5s'}}>📊</div>
                    </div>
                    <p
                      className={`text-4xl font-black mb-2 group-hover:scale-110 transition-transform ${getScoreColor(
                        getAverageScore()
                      )}`}
                    >
                      {getAverageScore()}/10
                    </p>
                    <p className="text-gray-400">Overall performance</p>
                  </div>
                </div>

                <div className="group p-8 rounded-2xl bg-gradient-to-br from-gray-900/80 to-gray-800/80 border border-gray-700/50 hover:border-purple-500/50 transition-all duration-300 hover:scale-105 hover-lift overflow-hidden relative">
                  <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-pink-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="absolute inset-0 animate-shimmer opacity-0 group-hover:opacity-100"></div>
                  <div className="relative z-10">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-xl font-bold text-white">
                        Latest Score
                      </h3>
                      <div className="text-3xl animate-float-slow" style={{animationDelay: '1s'}}>🏆</div>
                    </div>
                    <p
                      className={`text-4xl font-black mb-2 group-hover:scale-110 transition-transform ${getScoreColor(
                        getLatestScore()
                      )}`}
                    >
                      {getLatestScore()}/10
                    </p>
                    <p className="text-gray-400">Most recent attempt</p>
                  </div>
                </div>
              </div>

              {/* Features Section */}
              <div className="mb-8 sm:mb-12">
                <h3 className="text-2xl font-bold text-white mb-6 text-center">
                  🚀 Featured Tools
                </h3>
                <div className="grid md:grid-cols-2 gap-6">
                  {/* Interview Practice Card */}
                  <div 
                    onClick={() => navigate("/interview")}
                    className="group p-6 rounded-2xl bg-gradient-to-br from-blue-900/40 to-purple-900/40 border border-blue-500/30 hover:border-blue-500/60 transition-all duration-300 cursor-pointer hover:scale-105 hover-lift overflow-hidden relative"
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    <div className="absolute inset-0 animate-shimmer opacity-0 group-hover:opacity-100"></div>
                    <div className="relative z-10">
                      <div className="flex items-start justify-between mb-4">
                        <div className="text-4xl animate-float-slow">🎯</div>
                        <svg className="w-6 h-6 text-blue-400 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                        </svg>
                      </div>
                      <h4 className="text-xl font-bold text-white mb-2">
                        AI Interview Practice
                      </h4>
                      <p className="text-gray-300 text-sm mb-4">
                        Practice with AI-powered mock interviews and get instant feedback on your answers
                      </p>
                      <div className="flex items-center gap-2 text-blue-400 font-semibold text-sm">
                        <span>Start Practice</span>
                        <span>→</span>
                      </div>
                    </div>
                  </div>

                  {/* Resume Analyzer Card */}
                  <div 
                    onClick={() => navigate("/resume-analyzer")}
                    className="group p-6 rounded-2xl bg-gradient-to-br from-indigo-900/40 to-purple-900/40 border border-indigo-500/30 hover:border-indigo-500/60 transition-all duration-300 cursor-pointer hover:scale-105 hover-lift overflow-hidden relative"
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/10 to-purple-500/10 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    <div className="absolute inset-0 animate-shimmer opacity-0 group-hover:opacity-100"></div>
                    <div className="relative z-10">
                      <div className="flex items-start justify-between mb-4">
                        <div className="text-4xl animate-float-slow" style={{animationDelay: '0.5s'}}>📄</div>
                        <svg className="w-6 h-6 text-indigo-400 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                        </svg>
                      </div>
                      <h4 className="text-xl font-bold text-white mb-2">
                        AI Resume Analyzer
                      </h4>
                      <p className="text-gray-300 text-sm mb-4">
                        Get AI-powered insights and suggestions to improve your resume and increase interview chances
                      </p>
                      <div className="flex items-center gap-2 text-indigo-400 font-semibold text-sm">
                        <span>Analyze Resume</span>
                        <span>→</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Chart and Quick Actions */}
              <div className="grid lg:grid-cols-4 gap-6 sm:gap-8">
                {/* Chart */}
                <div className="lg:col-span-3 p-4 sm:p-8 rounded-2xl bg-gradient-to-br from-gray-900/80 to-gray-800/80 border border-gray-700/50">
                  <div className="flex items-center justify-between mb-8">
                    <h3 className="text-2xl font-bold text-white">
                      Performance Trend
                    </h3>
                    <div className="text-2xl">📈</div>
                  </div>

                  {scores.length > 0 ? (
                    <div style={{ width: "100%", height: "300px" }} className="sm:h-[400px]">
                      <ResponsiveContainer width="100%" height="100%">
                        <LineChart
                          data={data}
                          margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
                        >
                          <CartesianGrid
                            strokeDasharray="3 3"
                            stroke="#374151"
                          />
                          <XAxis
                            dataKey="attempt"
                            stroke="#9CA3AF"
                            fontSize={12}
                            tick={{ fill: "#9CA3AF" }}
                          />
                          <YAxis
                            stroke="#9CA3AF"
                            fontSize={12}
                            tick={{ fill: "#9CA3AF" }}
                            domain={[0, 10]}
                          />
                          <Tooltip
                            contentStyle={{
                              backgroundColor: "#1F2937",
                              border: "1px solid #374151",
                              borderRadius: "12px",
                              color: "#F9FAFB",
                            }}
                          />
                          <Line
                            type="monotone"
                            dataKey="score"
                            stroke="#3B82F6"
                            strokeWidth={3}
                            dot={{ fill: "#3B82F6", strokeWidth: 2, r: 6 }}
                            activeDot={{
                              r: 8,
                              stroke: "#3B82F6",
                              strokeWidth: 2,
                              fill: "#1E40AF",
                            }}
                          />
                        </LineChart>
                      </ResponsiveContainer>
                    </div>
                  ) : (
                    <div className="h-64 flex items-center justify-center text-gray-400">
                      <div className="text-center">
                        <div className="text-6xl mb-4">📊</div>
                        <p className="text-xl">No interview data yet</p>
                        <p className="text-sm mt-2">
                          Start practicing to see your progress!
                        </p>
                      </div>
                    </div>
                  )}
                </div>

                {/* Quick Actions Sidebar */}
                <div className="space-y-6">
                  <div className="p-6 rounded-2xl bg-gradient-to-br from-gray-900/80 to-gray-800/80 border border-gray-700/50">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-lg font-bold text-white">
                        Quick Actions
                      </h3>
                      <div className="text-2xl">⚡</div>
                    </div>
                    <div className="space-y-3">
                      <button
                        onClick={() => navigate("/daily-challenge")}
                        className="w-full p-3 bg-gradient-to-r from-yellow-500 to-orange-500 text-white font-semibold rounded-xl hover:from-yellow-600 hover:to-orange-600 transition-all duration-300 flex items-center justify-center gap-2"
                      >
                        🔥 Daily Challenge
                      </button>
                      <button
                        onClick={() => navigate("/interview")}
                        className="w-full p-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white font-semibold rounded-xl hover:from-blue-600 hover:to-purple-600 transition-all duration-300"
                      >
                        Start New Interview
                      </button>
                      <button
                        onClick={() => navigate("/resume-analyzer")}
                        className="w-full p-3 bg-gradient-to-r from-indigo-500 to-purple-500 text-white font-semibold rounded-xl hover:from-indigo-600 hover:to-purple-600 transition-all duration-300"
                      >
                        📄 Analyze Resume
                      </button>
                      <button
                        onClick={() => navigate("/")}
                        className="w-full p-3 border border-gray-600 text-gray-300 font-semibold rounded-xl hover:border-gray-400 hover:text-white transition-all duration-300"
                      >
                        Back to Home
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}

          {/* Solved Questions Tab Content */}
          {activeTab === "solved" && (
            <div className="max-w-7xl mx-auto">
              <div className="text-center mb-8 sm:mb-12 px-4">
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black mb-4">
                  Your{" "}
                  <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                    Solved Questions
                  </span>
                </h2>
                <p className="text-lg sm:text-xl text-gray-300">
                  Review your solutions and track your progress
                </p>
              </div>

              {profile.solvedQuestions && profile.solvedQuestions.length > 0 ? (
                <div className="grid gap-4 sm:gap-6">
                  {profile.solvedQuestions
                    .sort((a, b) => new Date(b.solvedAt) - new Date(a.solvedAt))
                    .map((solution, index) => (
                      <div
                        key={index}
                        className="p-4 sm:p-6 rounded-2xl bg-gradient-to-br from-gray-900/80 to-gray-800/80 border border-gray-700/50 hover:border-blue-500/50 transition-all duration-300"
                      >
                        <div className="flex flex-col sm:flex-row items-start justify-between mb-4 gap-3">
                          <div className="flex-1 min-w-0">
                            <div className="flex flex-wrap items-center gap-2 sm:gap-3 mb-2">
                              <h3 className="text-lg sm:text-2xl font-bold text-white">
                                {solution.questionTitle}
                              </h3>
                              <span className="px-2 sm:px-3 py-1 rounded-lg bg-blue-500/20 text-blue-300 text-xs sm:text-sm font-semibold border border-blue-500/30">
                                {solution.topicName}
                              </span>
                              <span className="px-2 sm:px-3 py-1 rounded-lg bg-purple-500/20 text-purple-300 text-xs sm:text-sm font-semibold border border-purple-500/30">
                                {solution.language === 'javascript' ? '🟨 JS' : solution.language === 'cpp' ? '🔵 C++' : '☕ Java'}
                              </span>
                            </div>
                            <p className="text-gray-400 text-xs sm:text-sm">
                              Solved on {new Date(solution.solvedAt).toLocaleDateString()} at {new Date(solution.solvedAt).toLocaleTimeString()}
                            </p>
                          </div>
                          <button
                            onClick={() => navigate(`/practice?topic=${solution.topic}&question=${solution.questionId}`)}
                            className="px-3 sm:px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors duration-300 text-sm whitespace-nowrap w-full sm:w-auto"
                          >
                            View Problem
                          </button>
                        </div>

                        <div className="mt-4">
                          <div className="bg-[#1e1e1e] rounded-xl overflow-hidden border border-gray-700">
                            <div className="bg-[#252526] px-3 sm:px-4 py-2 border-b border-gray-700">
                              <span className="text-gray-300 text-xs sm:text-sm font-medium">
                                Your Solution
                              </span>
                            </div>
                            <pre className="p-3 sm:p-4 text-xs sm:text-sm text-gray-300 overflow-x-auto">
                              <code>{solution.code}</code>
                            </pre>
                          </div>
                        </div>
                      </div>
                    ))}
                </div>
              ) : (
                <div className="text-center py-20">
                  <div className="text-8xl mb-6">📝</div>
                  <h3 className="text-3xl font-bold text-white mb-4">
                    No Solutions Yet
                  </h3>
                  <p className="text-xl text-gray-400 mb-8">
                    Start solving problems to see your solutions here!
                  </p>
                  <button
                    onClick={() => navigate("/problems")}
                    className="px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-500 text-white font-bold rounded-xl hover:from-blue-600 hover:to-purple-600 transition-all duration-300 shadow-lg hover:shadow-blue-500/25"
                  >
                    Browse Problems
                  </button>
                </div>
              )}
            </div>
          )}

          {/* Profile Tab Content */}
          {activeTab === "profile" && (
            <div className="max-w-4xl mx-auto">
              {/* Profile Header */}
              <div className="text-center mb-8 sm:mb-12 px-4">
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black mb-4">
                  Your{" "}
                  <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                    Profile
                  </span>
                </h2>
                <p className="text-lg sm:text-xl text-gray-300">
                  Manage your account settings and preferences
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-6 sm:gap-8">
                {/* Profile Picture & Account Information */}
                <div className="p-8 rounded-2xl bg-gradient-to-br from-gray-900/80 to-gray-800/80 border border-gray-700/50">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-2xl font-bold text-white">
                      Profile & Account
                    </h3>
                    <div className="text-3xl">👤</div>
                  </div>

                  {/* Profile Picture Section */}
                  <div className="mb-8">
                    <label className="block text-sm font-semibold text-gray-400 mb-4">
                      Profile Picture
                    </label>
                    <div className="flex items-center space-x-6">
                      {/* Profile Picture Display */}
                      <div className="relative">
                        <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-gray-600 bg-gray-700 flex items-center justify-center">
                          {profile?.profilePicture ? (
                            <img
                              src={profile.profilePicture}
                              alt="Profile"
                              className="w-full h-full object-cover"
                              onError={(e) => {
                                e.target.style.display = "none";
                                e.target.nextSibling.style.display = "flex";
                              }}
                            />
                          ) : null}
                          <div
                            className={`w-full h-full flex items-center justify-center text-3xl text-gray-400 ${
                              profile?.profilePicture ? "hidden" : "flex"
                            }`}
                          >
                            {profile?.username
                              ? profile.username.charAt(0).toUpperCase()
                              : "👤"}
                          </div>
                        </div>
                        {isUploadingImage && (
                          <div className="absolute inset-0 bg-[#1a1a1a]/50 rounded-full flex items-center justify-center">
                            <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                          </div>
                        )}
                      </div>

                      {/* Upload Controls */}
                      <div className="flex-1">
                        <div className="flex flex-col space-y-3">
                          <label className="cursor-pointer">
                            <input
                              type="file"
                              accept="image/*"
                              onChange={(e) => {
                                handleImageUpload(e);
                              }}
                              className="hidden"
                              disabled={isUploadingImage}
                            />
                            <div className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold rounded-lg transition-colors duration-300 text-center disabled:opacity-50">
                              {isUploadingImage
                                ? "Uploading..."
                                : "Upload Photo"}
                            </div>
                          </label>

                          {profile?.profilePicture && (
                            <button
                              onClick={removeProfilePicture}
                              disabled={isUploadingImage}
                              className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white text-sm font-semibold rounded-lg transition-colors duration-300 disabled:opacity-50"
                            >
                              Remove Photo
                            </button>
                          )}
                        </div>
                        <p className="text-xs text-gray-500 mt-2">
                          JPG, PNG or GIF. Max size 1MB.
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Account Information */}
                  <div className="space-y-6">
                    <div>
                      <label className="block text-sm font-semibold text-gray-400 mb-2">
                        Username
                      </label>
                      <div className="p-4 bg-gray-800/50 border border-gray-600 rounded-xl">
                        <p className="text-white font-semibold text-lg">
                          {profile.username || "Not set"}
                        </p>
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-400 mb-2">
                        Email Address
                      </label>
                      <div className="p-4 bg-gray-800/50 border border-gray-600 rounded-xl">
                        <p className="text-white font-semibold">
                          {profile.email}
                        </p>
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-400 mb-2">
                        Member Since
                      </label>
                      <div className="p-4 bg-gray-800/50 border border-gray-600 rounded-xl">
                        <p className="text-white font-semibold">
                          {profile.createdAt
                            ?.toDate?.()
                            ?.toLocaleDateString() || "Recently"}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Account Statistics */}
                <div className="p-8 rounded-2xl bg-gradient-to-br from-gray-900/80 to-gray-800/80 border border-gray-700/50">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-2xl font-bold text-white">
                      Your Statistics
                    </h3>
                    <div className="text-3xl">📈</div>
                  </div>
                  <div className="space-y-6">
                    <div className="flex justify-between items-center p-4 bg-gray-800/30 rounded-xl">
                      <span className="text-gray-300">Total Assessments:</span>
                      <span className="text-2xl font-bold text-blue-400">
                        {scores.length}
                      </span>
                    </div>
                    <div className="flex justify-between items-center p-4 bg-gray-800/30 rounded-xl">
                      <span className="text-gray-300">Average Score:</span>
                      <span
                        className={`text-2xl font-bold ${getScoreColor(
                          getAverageScore()
                        )}`}
                      >
                        {getAverageScore()}/10
                      </span>
                    </div>
                    <div className="flex justify-between items-center p-4 bg-gray-800/30 rounded-xl">
                      <span className="text-gray-300">Best Score:</span>
                      <span className="text-2xl font-bold text-green-400">
                        {scores.length > 0 ? Math.max(...scores) : 0}/10
                      </span>
                    </div>
                    <div className="flex justify-between items-center p-4 bg-gray-800/30 rounded-xl">
                      <span className="text-gray-300">Account Status:</span>
                      <span className="text-green-400 font-semibold">
                        Active
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Danger Zone */}
              <div className="mt-12 p-8 rounded-2xl bg-gradient-to-br from-red-900/20 to-red-800/20 border border-red-500/30">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-2xl font-bold text-red-400">
                    Danger Zone
                  </h3>
                  <div className="text-3xl">⚠️</div>
                </div>
                <div className="mb-6">
                  <p className="text-gray-300 mb-4">
                    Once you delete your account, there is no going back. Please
                    be certain.
                  </p>
                  <ul className="text-sm text-gray-400 space-y-1">
                    <li>
                      • All your assessment scores will be permanently deleted
                    </li>
                    <li>• Your progress tracking data will be lost</li>
                    <li>
                      • Your username will become available for others to use
                    </li>
                    <li>• This action cannot be undone</li>
                  </ul>
                </div>
                <button
                  onClick={() => setShowDeleteModal(true)}
                  className="px-8 py-4 bg-red-600 hover:bg-red-700 text-white font-bold rounded-xl transition-all duration-300 shadow-lg hover:shadow-red-500/25"
                >
                  🗑️ Delete Account
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Delete Account Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-[#1a1a1a]/80 backdrop-blur-sm flex items-center justify-center z-50 p-6">
          <div className="bg-gradient-to-br from-gray-900 to-gray-800 border border-red-500/50 rounded-2xl p-8 max-w-md w-full">
            <div className="text-center mb-6">
              <div className="text-6xl mb-4">⚠️</div>
              <h3 className="text-2xl font-bold text-white mb-2">
                Delete Account
              </h3>
              <p className="text-gray-300">
                This action cannot be undone. All your data, including scores
                and progress, will be permanently deleted.
              </p>
            </div>

            <div className="mb-6">
              <label className="block text-sm font-semibold text-gray-300 mb-2">
                Type "DELETE" to confirm:
              </label>
              <input
                type="text"
                value={deleteConfirmText}
                onChange={(e) => setDeleteConfirmText(e.target.value)}
                className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-red-500 focus:ring-2 focus:ring-red-500/20 transition-all duration-300"
                placeholder="Type DELETE here"
              />
            </div>

            <div className="flex gap-4">
              <button
                onClick={() => {
                  setShowDeleteModal(false);
                  setDeleteConfirmText("");
                }}
                className="flex-1 px-6 py-3 border border-gray-600 text-gray-300 font-semibold rounded-xl hover:border-gray-400 hover:text-white transition-all duration-300"
                disabled={isDeleting}
              >
                Cancel
              </button>
              <button
                onClick={handleDeleteAccount}
                disabled={deleteConfirmText !== "DELETE" || isDeleting}
                className="flex-1 px-6 py-3 bg-red-600 text-white font-bold rounded-xl hover:bg-red-700 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isDeleting ? (
                  <div className="flex items-center justify-center">
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                    Deleting...
                  </div>
                ) : (
                  "Delete Account"
                )}
              </button>
            </div>
          </div>
        </div>
      )}

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
    </div>
  );
}
