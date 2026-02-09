import { useState, useEffect } from "react";

export default function Timer({ duration = 120, onTimeUp, isActive = true }) {
  const [timeLeft, setTimeLeft] = useState(duration);

  useEffect(() => {
    if (!isActive) return;

    if (timeLeft <= 0) {
      onTimeUp();
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft, onTimeUp, isActive]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  const getTimerColor = () => {
    if (timeLeft <= 30) return "text-red-400";
    if (timeLeft <= 60) return "text-yellow-400";
    return "text-green-400";
  };

  const getProgressPercentage = () => {
    return ((duration - timeLeft) / duration) * 100;
  };

  return (
    <div className="text-center p-6 rounded-2xl bg-gradient-to-br from-gray-900/80 to-gray-800/80 border border-gray-700/50">
      <div className="mb-4">
        <div className={`text-5xl font-black ${getTimerColor()} mb-2`}>
          {formatTime(timeLeft)}
        </div>
        <div className="text-gray-400 text-lg">Time Remaining</div>
      </div>
      
      {/* Progress Bar */}
      <div className="w-full bg-gray-700 rounded-full h-3 mb-2">
        <div 
          className={`h-3 rounded-full transition-all duration-1000 ${
            timeLeft <= 30 ? 'bg-gradient-to-r from-red-500 to-red-400' :
            timeLeft <= 60 ? 'bg-gradient-to-r from-yellow-500 to-yellow-400' :
            'bg-gradient-to-r from-green-500 to-green-400'
          }`}
          style={{ width: `${getProgressPercentage()}%` }}
        ></div>
      </div>
      
      <div className="text-sm text-gray-500">
        {timeLeft <= 30 && "⚠️ Hurry up!"}
        {timeLeft > 30 && timeLeft <= 60 && "⏰ Time running low"}
        {timeLeft > 60 && "✅ Plenty of time"}
      </div>
    </div>
  );
}