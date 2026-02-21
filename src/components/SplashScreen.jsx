import { useEffect, useState } from 'react';
import logo from '../assets/NexrRoundAi2.png';

export default function SplashScreen({ onFinish }) {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    // Hide splash screen after 2.5 seconds
    const timer = setTimeout(() => {
      setIsVisible(false);
      // Call onFinish after fade out animation completes
      setTimeout(() => {
        onFinish();
      }, 500);
    }, 2500);

    return () => clearTimeout(timer);
  }, [onFinish]);

  if (!isVisible) {
    return (
      <div className="fixed inset-0 bg-gradient-to-br from-blue-900 via-purple-900 to-pink-900 z-[9999] animate-fadeOut pointer-events-none">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center animate-scaleOut">
            <img 
              src={logo} 
              alt="NextRound AI" 
              className="w-32 h-32 mx-auto mb-6 animate-spinOut"
            />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-gradient-to-br from-blue-900 via-purple-900 to-pink-900 z-[9999] animate-fadeIn">
      {/* Animated background effects */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/30 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/30 rounded-full blur-3xl animate-pulse" style={{animationDelay: '1s'}}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-pink-500/20 rounded-full blur-3xl animate-pulse" style={{animationDelay: '0.5s'}}></div>
      </div>

      {/* Floating particles */}
      <div className="absolute top-20 left-20 w-2 h-2 bg-blue-400 rounded-full animate-ping"></div>
      <div className="absolute top-40 right-32 w-3 h-3 bg-purple-400 rounded-full animate-ping" style={{animationDelay: '0.5s'}}></div>
      <div className="absolute bottom-32 left-1/3 w-2 h-2 bg-pink-400 rounded-full animate-ping" style={{animationDelay: '1s'}}></div>
      <div className="absolute top-1/3 right-1/4 w-2 h-2 bg-cyan-400 rounded-full animate-ping" style={{animationDelay: '1.5s'}}></div>

      {/* Main content */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="text-center">
          {/* Logo with animations */}
          <div className="relative mb-8">
            {/* Glow effect behind logo */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-40 h-40 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-full blur-2xl opacity-50 animate-pulse"></div>
            </div>
            
            {/* Logo */}
            <img 
              src={logo} 
              alt="NextRound AI" 
              className="relative w-32 h-32 mx-auto animate-bounceIn"
            />
          </div>

          {/* App name */}
          <h1 className="text-5xl font-black mb-4 animate-slideUp">
            <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              NextRound AI
            </span>
          </h1>

          {/* Tagline */}
          <p className="text-xl text-gray-300 mb-8 animate-slideUp" style={{animationDelay: '0.2s'}}>
            Your AI-Powered Interview Coach
          </p>

          {/* Loading animation */}
          <div className="flex items-center justify-center gap-2 animate-slideUp" style={{animationDelay: '0.4s'}}>
            <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce"></div>
            <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
            <div className="w-2 h-2 bg-pink-400 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
          </div>
        </div>
      </div>

      {/* Bottom decoration */}
      <div className="absolute bottom-8 left-0 right-0 text-center animate-fadeIn" style={{animationDelay: '1s'}}>
        <p className="text-sm text-gray-400">
          Preparing your interview experience...
        </p>
      </div>
    </div>
  );
}
