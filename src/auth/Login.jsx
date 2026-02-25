import { useState, useEffect } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import { useNavigate, Link } from "react-router-dom";
import logo from "../assets/NexrRoundAi2.png";

export default function Login() {
  // Add floating animation styles
  useEffect(() => {
    const style = document.createElement('style');
    style.textContent = `
      @keyframes float {
        0%, 100% {
          transform: translateY(0px) rotate(0deg);
        }
        25% {
          transform: translateY(-20px) rotate(5deg);
        }
        50% {
          transform: translateY(-10px) rotate(-5deg);
        }
        75% {
          transform: translateY(-30px) rotate(3deg);
        }
      }
      .animate-float {
        animation: float 6s ease-in-out infinite;
      }
    `;
    document.head.appendChild(style);
    return () => document.head.removeChild(style);
  }, []);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const login = async () => {
    if (!email || !password) {
      alert("Please fill in all fields");
      return;
    }
    
    setLoading(true);
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/dashboard");
    } catch (e) {
      alert(e.message);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      login();
    }
  };

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center p-4 sm:p-6 overflow-hidden relative">
      {/* Animated Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-900/10 via-purple-900/10 to-transparent"></div>
      <div className="absolute top-1/4 left-1/4 w-72 sm:w-96 h-72 sm:h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-1/4 right-1/4 w-72 sm:w-96 h-72 sm:h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse" style={{animationDelay: '1s'}}></div>
      
      {/* Floating AI Icons */}
      <div className="absolute top-20 left-[10%] text-blue-400/30 animate-float" style={{animationDelay: '0s'}}>
        <svg className="w-8 h-8 sm:w-12 sm:h-12" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-5-9h2v2H7zm8 0h2v2h-2zm-4 0h2v2h-2z"/>
        </svg>
      </div>
      
      <div className="absolute top-40 right-[15%] text-purple-400/30 animate-float" style={{animationDelay: '2s'}}>
        <svg className="w-10 h-10 sm:w-14 sm:h-14" fill="currentColor" viewBox="0 0 24 24">
          <path d="M9 3L5 7h3v7h2V7h3L9 3zm7 14h-3v-7h-2v7H8l4 4 4-4z"/>
        </svg>
      </div>
      
      <div className="absolute bottom-32 left-[8%] text-cyan-400/30 animate-float" style={{animationDelay: '1.5s'}}>
        <svg className="w-10 h-10 sm:w-16 sm:h-16" fill="currentColor" viewBox="0 0 24 24">
          <path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zM8 11H6V9h2v2zm0 2H6v2h2v-2zm4-2h-2V9h2v2zm0 2h-2v2h2v-2zm4-2h-2V9h2v2zm0 2h-2v2h2v-2z"/>
        </svg>
      </div>
      
      <div className="absolute top-[60%] right-[8%] text-pink-400/30 animate-float" style={{animationDelay: '3s'}}>
        <svg className="w-8 h-8 sm:w-12 sm:h-12" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"/>
          <circle cx="12" cy="12" r="3"/>
        </svg>
      </div>
      
      <div className="absolute bottom-[15%] right-[25%] text-indigo-400/30 animate-float" style={{animationDelay: '2.5s'}}>
        <svg className="w-6 h-6 sm:w-10 sm:h-10" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2L2 7v10c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V7l-10-5z"/>
        </svg>
      </div>

      <div className="absolute top-[15%] left-[70%] text-teal-400/30 animate-float" style={{animationDelay: '1s'}}>
        <svg className="w-8 h-8 sm:w-12 sm:h-12" fill="currentColor" viewBox="0 0 24 24">
          <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-7 3c1.93 0 3.5 1.57 3.5 3.5S13.93 13 12 13s-3.5-1.57-3.5-3.5S10.07 6 12 6zm7 13H5v-.23c0-.62.28-1.2.76-1.58C7.47 15.82 9.64 15 12 15s4.53.82 6.24 2.19c.48.38.76.97.76 1.58V19z"/>
        </svg>
      </div>

      {/* Grid Pattern Overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(59,130,246,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(59,130,246,0.03)_1px,transparent_1px)] bg-[size:50px_50px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_50%,black,transparent)]"></div>

      <div className="relative z-10 w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8 sm:mb-12">
          <Link 
            to="/"
            className="inline-flex items-center gap-3 mb-4 hover:scale-105 transition-transform"
          >
            <img 
              src={logo} 
              alt="NextRound AI Logo" 
              className="w-10 h-10 sm:w-12 sm:h-12 object-contain"
            />
            <span className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-blue-400 via-cyan-400 to-purple-400 bg-clip-text text-transparent">
              NextRound AI
            </span>
          </Link>
          <h1 className="text-3xl sm:text-4xl font-black mb-3 sm:mb-4 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
            Welcome Back
          </h1>
          <p className="text-gray-400 text-base sm:text-lg px-4">
            Continue your AI-powered interview preparation journey
          </p>
          
          {/* AI Badge */}
          <div className="mt-4 inline-flex items-center gap-2 px-4 py-2 bg-blue-500/10 border border-blue-500/30 rounded-full">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
            </span>
            <span className="text-xs sm:text-sm text-blue-300 font-semibold">AI-Powered Platform</span>
          </div>
        </div>

        {/* Login Form */}
        <div className="bg-black/70 backdrop-blur-xl backdrop-blur-xl border border-gray-700/50 rounded-2xl p-6 sm:p-8 shadow-2xl shadow-blue-500/10 hover:shadow-blue-500/20 transition-all duration-500">
          <div className="space-y-5 sm:space-y-6">
            <div className="group">
              <label className="block text-sm font-semibold text-gray-300 mb-2 flex items-center gap-2">
                <svg className="w-4 h-4 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                Email Address
              </label>
              <div className="relative">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onKeyPress={handleKeyPress}
                  className="w-full px-4 py-3 sm:py-4 bg-black/50 border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/30 focus:bg-black/90/70 transition-all duration-300 group-hover:border-gray-500"
                  placeholder="Enter your email"
                  required
                />
              </div>
            </div>

            <div className="group">
              <label className="block text-sm font-semibold text-gray-300 mb-2 flex items-center gap-2">
                <svg className="w-4 h-4 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
                Password
              </label>
              <div className="relative">
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onKeyPress={handleKeyPress}
                  className="w-full px-4 py-3 sm:py-4 bg-black/50 border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/30 focus:bg-black/90/70 transition-all duration-300 group-hover:border-gray-500"
                  placeholder="Enter your password"
                  required
                />
              </div>
            </div>

            <button
              onClick={login}
              disabled={loading}
              className="relative w-full py-3 sm:py-4 bg-gradient-to-r from-blue-500 via-blue-600 to-purple-600 text-white font-bold rounded-xl hover:from-blue-600 hover:via-purple-600 hover:to-purple-700 transition-all duration-300 shadow-lg shadow-blue-500/30 hover:shadow-blue-500/50 hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 overflow-hidden group"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-1000"></div>
              {loading ? (
                <div className="flex items-center justify-center relative z-10">
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                  <span>Signing In...</span>
                </div>
              ) : (
                <span className="relative z-10 flex items-center justify-center gap-2">
                  Sign In
                  <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </span>
              )}
            </button>
          </div>

          {/* Divider */}
          <div className="my-8 flex items-center">
            <div className="flex-1 border-t border-gray-600"></div>
            <span className="px-4 text-gray-400 text-sm">or</span>
            <div className="flex-1 border-t border-gray-600"></div>
          </div>

          {/* Sign Up Link */}
          <div className="text-center">
            <p className="text-gray-400 mb-4 text-sm sm:text-base">
              Don't have an account yet?
            </p>
            <Link
              to="/signup"
              className="inline-flex items-center gap-2 px-5 sm:px-6 py-2.5 sm:py-3 border-2 border-gray-600 rounded-xl text-white font-semibold hover:border-purple-400 hover:bg-purple-900/30 hover:scale-105 active:scale-95 transition-all duration-300 group"
            >
              <svg className="w-4 h-4 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
              </svg>
              Create Account
              <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        </div>

        {/* Back to Home */}
        <div className="text-center mt-8">
          <Link
            to="/"
            className="text-gray-400 hover:text-white transition-colors"
          >
            ← Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}




