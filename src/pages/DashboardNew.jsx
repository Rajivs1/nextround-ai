import { useEffect, useState } from "react";
import { doc, onSnapshot, getDoc, deleteDoc, updateDoc } from "firebase/firestore";
import { db } from "../firebase";
import { useAuth } from "../context/AuthContext";
import { useNavigate, useLocation } from "react-router-dom";
import { signOut, deleteUser } from "firebase/auth";
import { auth } from "../firebase";
import { checkAndResetStreak } from "../utils/streakUtils";
import { getUserChallengeHistory } from "../services/dailyChallengeService";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

export default function DashboardNew() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [profile, setProfile] = useState(null);
  const [activeTab, setActiveTab] = useState("overview");
  const [challengeHistory, setChallengeHistory] = useState([]);
  const [loadingChallenges, setLoadingChallenges] = useState(false);

  useEffect(() => {
    if (!user) return;

    checkAndResetStreak(user.uid);

    const unsub = onSnapshot(doc(db, "users", user.uid), (snap) => {
      if (snap.exists()) {
        setProfile(snap.data());
      }
    });

    return () => unsub();
  }, [user]);

  useEffect(() => {
    if (!user || activeTab !== "challenges") return;
    
    const loadChallengeHistory = async () => {
      setLoadingChallenges(true);
      try {
        const history = await getUserChallengeHistory(user.uid);
        setChallengeHistory(history);
      } catch (error) {
        console.error("Error loading challenge history:", error);
      } finally {
        setLoadingChallenges(false);
      }
    };
    
    loadChallengeHistory();
  }, [user, activeTab]);

  if (!profile) {
    return (
      <div className="min-h-screen bg-bg-secondary flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-xl text-gray-600">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  const scores = profile.scores || [];
  const data = scores.map((s, i) => ({ attempt: i + 1, score: s }));

  const getAverageScore = () => {
    if (scores.length === 0) return 0;
    return (scores.reduce((sum, score) => sum + score, 0) / scores.length).toFixed(1);
  };

  const getLatestScore = () => {
    return scores.length > 0 ? scores[scores.length - 1] : 0;
  };

  return (
    <div className="min-h-screen bg-bg-secondary">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-40 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              {/* Profile Picture */}
              <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-gray-200 bg-gray-100 flex items-center justify-center">
                {profile?.profilePicture ? (
                  <img src={profile.profilePicture} alt="Profile" className="w-full h-full object-cover" />
                ) : (
                  <span className="text-xl text-gray-600">
                    {profile?.username?.charAt(0).toUpperCase() || "👤"}
                  </span>
                )}
              </div>

              <div>
                <h1 
                  onClick={() => navigate('/')}
                  className="text-2xl font-bold text-gray-900 cursor-pointer hover:text-primary transition-colors"
                >
                  NextRound <span className="text-primary">AI</span>
                </h1>
                <p className="text-sm text-gray-600">
                  Welcome, {profile.username || profile.email?.split("@")[0]}
                </p>
              </div>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => navigate("/interview")}
                className="px-6 py-2.5 bg-gradient-to-r from-primary to-primary-dark text-white font-semibold rounded-lg hover:shadow-lg hover:shadow-primary/30 transition-all"
              >
                Start Practice
              </button>
              <button
                onClick={() => navigate("/")}
                className="px-4 py-2.5 text-gray-600 hover:text-gray-900 font-medium transition-colors"
              >
                Home
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        {/* Tab Navigation */}
        <div className="mb-8">
          <div className="flex gap-2 bg-white p-1.5 rounded-xl border border-gray-200 max-w-2xl">
            <button
              onClick={() => setActiveTab("overview")}
              className={`flex-1 px-6 py-3 rounded-lg font-semibold transition-all ${
                activeTab === "overview"
                  ? "bg-primary text-white shadow-md"
                  : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
              }`}
            >
              📊 Overview
            </button>
            <button
              onClick={() => setActiveTab("solved")}
              className={`flex-1 px-6 py-3 rounded-lg font-semibold transition-all ${
                activeTab === "solved"
                  ? "bg-primary text-white shadow-md"
                  : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
              }`}
            >
              ✅ Solved
            </button>
            <button
              onClick={() => setActiveTab("profile")}
              className={`flex-1 px-6 py-3 rounded-lg font-semibold transition-all ${
                activeTab === "profile"
                  ? "bg-primary text-white shadow-md"
                  : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
              }`}
            >
              👤 Profile
            </button>
          </div>
        </div>

        {/* Overview Tab */}
        {activeTab === "overview" && (
          <>
            {/* Stats Cards */}
            <div className="grid sm:grid-cols-3 gap-6 mb-8">
              <div className="bg-white rounded-2xl border border-gray-200 p-6 hover:shadow-lg transition-all">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-bold text-gray-900">Total Interviews</h3>
                  <span className="text-3xl">🎯</span>
                </div>
                <p className="text-4xl font-black text-primary mb-2">{scores.length}</p>
                <p className="text-sm text-gray-600">Practice sessions completed</p>
              </div>

              <div className="bg-white rounded-2xl border border-gray-200 p-6 hover:shadow-lg transition-all">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-bold text-gray-900">Average Score</h3>
                  <span className="text-3xl">📊</span>
                </div>
                <p className="text-4xl font-black text-secondary mb-2">{getAverageScore()}/10</p>
                <p className="text-sm text-gray-600">Overall performance</p>
              </div>

              <div className="bg-white rounded-2xl border border-gray-200 p-6 hover:shadow-lg transition-all">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-bold text-gray-900">Latest Score</h3>
                  <span className="text-3xl">🏆</span>
                </div>
                <p className="text-4xl font-black text-primary mb-2">{getLatestScore()}/10</p>
                <p className="text-sm text-gray-600">Most recent attempt</p>
              </div>
            </div>

            {/* Chart */}
            <div className="bg-white rounded-2xl border border-gray-200 p-8 mb-8">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-bold text-gray-900">Performance Trend</h3>
                <span className="text-2xl">📈</span>
              </div>

              {scores.length > 0 ? (
                <div style={{ width: "100%", height: "400px" }}>
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                      <XAxis dataKey="attempt" stroke="#6b7280" fontSize={12} />
                      <YAxis stroke="#6b7280" fontSize={12} domain={[0, 10]} />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: "#ffffff",
                          border: "1px solid #e5e7eb",
                          borderRadius: "12px",
                          color: "#111827",
                        }}
                      />
                      <Line
                        type="monotone"
                        dataKey="score"
                        stroke="#8c52ff"
                        strokeWidth={3}
                        dot={{ fill: "#8c52ff", strokeWidth: 2, r: 6 }}
                        activeDot={{ r: 8, stroke: "#8c52ff", strokeWidth: 2, fill: "#7340d9" }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              ) : (
                <div className="h-64 flex items-center justify-center text-gray-500">
                  <div className="text-center">
                    <div className="text-6xl mb-4">📊</div>
                    <p className="text-xl">No interview data yet</p>
                    <p className="text-sm mt-2">Start practicing to see your progress</p>
                  </div>
                </div>
              )}
            </div>

            {/* Quick Actions */}
            <div className="grid md:grid-cols-2 gap-6">
              <div onClick={() => navigate("/interview")} className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-2xl border border-purple-200 p-6 cursor-pointer hover:shadow-lg transition-all">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-4xl">🎯</span>
                  <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </div>
                <h4 className="text-xl font-bold text-gray-900 mb-2">AI Interview Practice</h4>
                <p className="text-gray-700 text-sm">Practice with AI and get instant feedback</p>
              </div>

              <div onClick={() => navigate("/resume-analyzer")} className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl border border-blue-200 p-6 cursor-pointer hover:shadow-lg transition-all">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-4xl">📄</span>
                  <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </div>
                <h4 className="text-xl font-bold text-gray-900 mb-2">Resume Analyzer</h4>
                <p className="text-gray-700 text-sm">Get AI insights to improve your resume</p>
              </div>
            </div>
          </>
        )}

        {/* Solved Tab */}
        {activeTab === "solved" && (
          <div className="bg-white rounded-2xl border border-gray-200 p-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Solved Problems</h3>
            {profile.solvedProblems && profile.solvedProblems.length > 0 ? (
              <div className="space-y-3">
                {profile.solvedProblems.map((problemId, index) => (
                  <div key={index} className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl border border-gray-200">
                    <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                      <span className="text-green-600 font-bold">✓</span>
                    </div>
                    <div className="flex-1">
                      <p className="font-semibold text-gray-900">{problemId}</p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <div className="text-6xl mb-4">📝</div>
                <p className="text-xl text-gray-900 font-semibold mb-2">No problems solved yet</p>
                <p className="text-gray-600 mb-6">Start solving to track your progress</p>
                <button
                  onClick={() => navigate("/problems")}
                  className="px-6 py-3 bg-primary text-white font-semibold rounded-lg hover:shadow-lg hover:shadow-primary/30 transition-all"
                >
                  Browse Problems
                </button>
              </div>
            )}
          </div>
        )}

        {/* Profile Tab */}
        {activeTab === "profile" && (
          <div className="bg-white rounded-2xl border border-gray-200 p-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Profile Settings</h3>
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Email</label>
                <input
                  type="email"
                  value={profile.email || ""}
                  disabled
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg text-gray-900"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Username</label>
                <input
                  type="text"
                  value={profile.username || ""}
                  disabled
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg text-gray-900"
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
