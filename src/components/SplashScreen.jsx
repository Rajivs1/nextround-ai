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
    <div className="fixed inset-0 bg-black z-[9999] animate-fadeIn overflow-hidden">
      {/* Animated background effects with subtle colors */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse" style={{animationDelay: '1s'}}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-pink-500/5 rounded-full blur-3xl animate-pulse" style={{animationDelay: '0.5s'}}></div>
      </div>

      {/* Animated grid pattern */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute inset-0" style={{
          backgroundImage: 'linear-gradient(rgba(59, 130, 246, 0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(59, 130, 246, 0.3) 1px, transparent 1px)',
          backgroundSize: '50px 50px',
          animation: 'gridMove 20s linear infinite'
        }}></div>
      </div>

      {/* Floating particles with different sizes and speeds */}
      <div className="absolute top-20 left-20 w-2 h-2 bg-blue-400 rounded-full animate-ping"></div>
      <div className="absolute top-40 right-32 w-3 h-3 bg-purple-400 rounded-full animate-ping" style={{animationDelay: '0.5s'}}></div>
      <div className="absolute bottom-32 left-1/3 w-2 h-2 bg-pink-400 rounded-full animate-ping" style={{animationDelay: '1s'}}></div>
      <div className="absolute top-1/3 right-1/4 w-2 h-2 bg-cyan-400 rounded-full animate-ping" style={{animationDelay: '1.5s'}}></div>
      
      {/* Additional floating particles */}
      <div className="absolute top-1/2 left-20 w-1 h-1 bg-teal-400 rounded-full animate-ping" style={{animationDelay: '0.3s'}}></div>
      <div className="absolute bottom-40 right-20 w-2 h-2 bg-indigo-400 rounded-full animate-ping" style={{animationDelay: '0.8s'}}></div>
      <div className="absolute top-3/4 left-1/2 w-1 h-1 bg-rose-400 rounded-full animate-ping" style={{animationDelay: '1.2s'}}></div>
      
      {/* Shooting stars effect */}
      <div className="absolute top-10 left-10 w-1 h-1 bg-white rounded-full animate-shootingStar"></div>
      <div className="absolute top-32 right-40 w-1 h-1 bg-white rounded-full animate-shootingStar" style={{animationDelay: '1.5s'}}></div>
      <div className="absolute bottom-20 left-1/3 w-1 h-1 bg-white rounded-full animate-shootingStar" style={{animationDelay: '2s'}}></div>
      
      {/* Rotating rings around logo area */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="absolute w-64 h-64 border-2 border-blue-400/20 rounded-full animate-spin-slow"></div>
        <div className="absolute w-80 h-80 border-2 border-purple-400/20 rounded-full animate-spin-reverse"></div>
        <div className="absolute w-96 h-96 border border-pink-400/10 rounded-full animate-spin-slower"></div>
      </div>

      {/* Main content */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="text-center">
          {/* Logo with animations */}
          <div className="relative mb-8">
            {/* Multiple glow layers */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-40 h-40 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-full blur-2xl opacity-50 animate-pulse"></div>
            </div>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-48 h-48 bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-500 rounded-full blur-3xl opacity-30 animate-pulse" style={{animationDelay: '0.5s'}}></div>
            </div>
            
            {/* Sparkle effects around logo */}
            <div className="absolute top-0 left-1/4 w-2 h-2 bg-white rounded-full animate-sparkle"></div>
            <div className="absolute top-1/4 right-0 w-1 h-1 bg-yellow-300 rounded-full animate-sparkle" style={{animationDelay: '0.3s'}}></div>
            <div className="absolute bottom-1/4 left-0 w-1 h-1 bg-cyan-300 rounded-full animate-sparkle" style={{animationDelay: '0.6s'}}></div>
            <div className="absolute bottom-0 right-1/4 w-2 h-2 bg-pink-300 rounded-full animate-sparkle" style={{animationDelay: '0.9s'}}></div>
            
            {/* Logo with spin-grow animation */}
            <img 
              src={logo} 
              alt="NextRound AI" 
              className="relative w-32 h-32 mx-auto animate-spinGrowUp drop-shadow-2xl"
              style={{filter: 'drop-shadow(0 0 20px rgba(59, 130, 246, 0.5))'}}
            />
          </div>

          {/* App name */}
          <h1 className="text-5xl font-black mb-4 animate-slideUp">
            <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent animate-gradient-text">
              NextRound AI
            </span>
          </h1>

          {/* Tagline with typing effect appearance */}
          <p className="text-xl text-gray-300 mb-8 animate-slideUp" style={{animationDelay: '0.2s'}}>
            Your AI-Powered Interview Coach
          </p>

          {/* Enhanced loading animation with progress bar */}
          <div className="space-y-4 animate-slideUp" style={{animationDelay: '0.4s'}}>
            <div className="flex items-center justify-center gap-2">
              <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce"></div>
              <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
              <div className="w-2 h-2 bg-pink-400 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
            </div>
            
            {/* Progress bar */}
            <div className="w-64 h-1 bg-gray-700/50 rounded-full overflow-hidden mx-auto">
              <div className="h-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 animate-progressBar rounded-full"></div>
            </div>
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
