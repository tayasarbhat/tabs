import React, { useEffect, useState, useCallback } from 'react';
import { Clock3 } from 'lucide-react';

interface TimerProps {
  totalTime: number;
  onTimeout: () => void;
  currentQuestion: number;
  totalQuestions: number;
}

const Timer: React.FC<TimerProps> = ({ totalTime, onTimeout, currentQuestion, totalQuestions }) => {
  const [timeLeft, setTimeLeft] = useState(totalTime);
  
  const formatTime = useCallback((seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          onTimeout();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [onTimeout]);

  const percentage = (timeLeft / totalTime) * 100;
  const getTimerColor = () => {
    if (percentage > 50) return 'from-emerald-500 to-green-500';
    if (percentage > 25) return 'from-yellow-500 to-orange-500';
    return 'from-red-500 to-rose-500';
  };

  return (
    <div className="relative flex items-center w-full sm:w-auto">
      <div className={`absolute -inset-2 sm:-inset-3 bg-gradient-to-r ${getTimerColor()} opacity-20 rounded-xl sm:rounded-2xl blur-lg transition-colors duration-500`} />
      
      <div className="relative flex items-center gap-3 sm:gap-4 bg-black/5 backdrop-blur-xl px-4 sm:px-6 py-2 sm:py-3 rounded-lg sm:rounded-xl border border-white/20 w-full sm:w-auto justify-between sm:justify-start">
        <div className="flex items-center gap-2">
          <Clock3 className={`w-4 h-4 sm:w-5 sm:h-5 animate-pulse bg-gradient-to-r ${getTimerColor()} bg-clip-text text-transparent transition-colors duration-500`} />
          <span className="font-mono text-base sm:text-lg font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
            {formatTime(timeLeft)}
          </span>
        </div>
        
        <div className="h-6 sm:h-8 w-[2px] bg-gradient-to-b from-indigo-500/20 to-purple-500/20 mx-2 sm:mx-4" />
        
        <div className="relative w-24 sm:w-32 h-1.5 sm:h-2 bg-gray-200/50 rounded-full overflow-hidden backdrop-blur-sm">
          <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/10 to-purple-500/10 animate-pulse" />
          
          <div
            className={`absolute left-0 top-0 h-full bg-gradient-to-r ${getTimerColor()} transition-all duration-1000 rounded-full`}
            style={{ width: `${percentage}%` }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/30 to-white/0 animate-shine" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Timer;