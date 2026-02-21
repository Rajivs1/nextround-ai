import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "./context/ThemeContext";
import SplashScreen from "./components/SplashScreen";
import Home from "./pages/Home";
import Login from "./auth/Login";
import Signup from "./auth/Signup";
import Dashboard from "./pages/Dashboard";
import Interview from "./pages/Interview";
import Result from "./pages/Result";
import Problems from "./pages/Problems";
import Practice from "./pages/Practice";
import ResumeAnalyzer from "./pages/ResumeAnalyzer";
import ChatAssistant from "./pages/ChatAssistant";
import ProtectedRoute from "./components/ProtectedRoute";

export default function App() {
  const [showSplash, setShowSplash] = useState(true);

  const handleSplashFinish = () => {
    setShowSplash(false);
  };

  return (
    <ThemeProvider>
      {showSplash && <SplashScreen onFinish={handleSplashFinish} />}
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/interview"
            element={
              <ProtectedRoute>
                <Interview />
              </ProtectedRoute>
            }
          />
          <Route
            path="/interview/result"
            element={
              <ProtectedRoute>
                <Result />
              </ProtectedRoute>
            }
          />
          <Route
            path="/problems"
            element={
              <ProtectedRoute>
                <Problems />
              </ProtectedRoute>
            }
          />
          <Route
            path="/practice"
            element={
              <ProtectedRoute>
                <Practice />
              </ProtectedRoute>
            }
          />
          <Route
            path="/resume-analyzer"
            element={
              <ProtectedRoute>
                <ResumeAnalyzer />
              </ProtectedRoute>
            }
          />
          <Route
            path="/chat"
            element={
              <ProtectedRoute>
                <ChatAssistant />
              </ProtectedRoute>
            }
          />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}
