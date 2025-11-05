import { Sparkles, Trophy, TrendingUp } from 'lucide-react';
import { useEffect, useState } from 'react';

interface ExplorationPointsMeterProps {
  currentPoints: number;
  maxPoints: number;
  variant?: 'circular' | 'linear';
  showAnimation?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

export function ExplorationPointsMeter({ 
  currentPoints, 
  maxPoints, 
  variant = 'circular',
  showAnimation = false,
  size = 'md'
}: ExplorationPointsMeterProps) {
  const [displayPoints, setDisplayPoints] = useState(0);
  const [showCheer, setShowCheer] = useState(false);
  const percentage = Math.min((currentPoints / maxPoints) * 100, 100);
  const isComplete = currentPoints >= maxPoints;

  // Animate points counting up
  useEffect(() => {
    if (currentPoints > displayPoints) {
      const increment = Math.ceil((currentPoints - displayPoints) / 10);
      const timer = setTimeout(() => {
        setDisplayPoints(Math.min(displayPoints + increment, currentPoints));
      }, 30);
      
      // Show cheer animation when points increase
      if (showAnimation && currentPoints > 0) {
        setShowCheer(true);
        setTimeout(() => setShowCheer(false), 2000);
      }
      
      return () => clearTimeout(timer);
    }
  }, [currentPoints, displayPoints, showAnimation]);

  const sizeClasses = {
    sm: { container: 'w-24 h-24', text: 'text-lg', label: 'text-xs' },
    md: { container: 'w-32 h-32', text: 'text-2xl', label: 'text-sm' },
    lg: { container: 'w-40 h-40', text: 'text-3xl', label: 'text-base' }
  };

  if (variant === 'circular') {
    const circumference = 2 * Math.PI * 45; // radius = 45
    const strokeDashoffset = circumference - (percentage / 100) * circumference;

    return (
      <div className="relative" role="progressbar" aria-valuenow={currentPoints} aria-valuemin={0} aria-valuemax={maxPoints} aria-label="Exploration Points Progress">
        <div className={`relative ${sizeClasses[size].container} mx-auto`}>
          {/* Background Circle */}
          <svg className="transform -rotate-90" width="100%" height="100%" viewBox="0 0 100 100">
            {/* Trail Cream background ring */}
            <circle
              cx="50"
              cy="50"
              r="45"
              fill="none"
              stroke="#F5F3E8"
              strokeWidth="8"
            />
            
            {/* Amber progress ring */}
            <circle
              cx="50"
              cy="50"
              r="45"
              fill="none"
              stroke={isComplete ? '#3B6A52' : '#F9A03F'}
              strokeWidth="8"
              strokeLinecap="round"
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
              style={{
                transition: 'stroke-dashoffset 0.5s ease-out, stroke 0.3s ease',
              }}
            />

            {/* Starburst animation when complete */}
            {isComplete && (
              <>
                <circle
                  cx="50"
                  cy="50"
                  r="45"
                  fill="none"
                  stroke="#F9A03F"
                  strokeWidth="2"
                  opacity="0.3"
                  className="animate-ping"
                />
              </>
            )}
          </svg>

          {/* Center content */}
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <div className={`${sizeClasses[size].text} text-gray-900 flex items-center space-x-1`}>
              <span>{displayPoints}</span>
              {showCheer && (
                <Sparkles className="w-5 h-5 text-[#F9A03F] animate-bounce" />
              )}
            </div>
            <div className={`${sizeClasses[size].label} text-gray-600`}>
              / {maxPoints}
            </div>
          </div>
        </div>

        {/* Label & Tooltip */}
        <div className="text-center mt-2">
          <p className="text-sm text-gray-700">Your Trail Progress</p>
          <div className="group relative inline-block">
            <p className="text-xs text-gray-500 cursor-help underline decoration-dotted">
              How it works
            </p>
            <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 hidden group-hover:block z-10">
              <div className="bg-gray-900 text-white text-xs rounded-lg px-3 py-2 whitespace-nowrap shadow-xl">
                Earn points for exploring, sharing, and learning!
                <div className="absolute top-full left-1/2 -translate-x-1/2 -mt-1 w-2 h-2 bg-gray-900 transform rotate-45"></div>
              </div>
            </div>
          </div>
        </div>

        {/* Completion badge */}
        {isComplete && (
          <div className="mt-3 flex items-center justify-center">
            <div className="bg-[#3B6A52]/10 border border-[#3B6A52]/30 rounded-full px-3 py-1 flex items-center space-x-2">
              <Trophy className="w-4 h-4 text-[#3B6A52]" />
              <span className="text-xs text-[#3B6A52]">Trail Complete!</span>
            </div>
          </div>
        )}

        {/* Glow pulse animation when points increase */}
        {showCheer && (
          <div className="absolute inset-0 rounded-full bg-[#F9A03F]/20 animate-ping pointer-events-none" 
               style={{ animationDuration: '1s', animationIterationCount: '1' }}
          />
        )}
      </div>
    );
  }

  // Linear variant
  return (
    <div className="w-full" role="progressbar" aria-valuenow={currentPoints} aria-valuemin={0} aria-valuemax={maxPoints} aria-label="Exploration Points Progress">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center space-x-2">
          <TrendingUp className="w-4 h-4 text-[#F9A03F]" />
          <span className="text-sm text-gray-700">Your Trail Progress</span>
        </div>
        <div className="flex items-center space-x-1">
          <span className="text-sm text-gray-900">{displayPoints}</span>
          <span className="text-sm text-gray-500">/ {maxPoints} points</span>
          {showCheer && (
            <Sparkles className="w-4 h-4 text-[#F9A03F] animate-bounce" />
          )}
        </div>
      </div>
      
      <div className="relative h-3 bg-[#F5F3E8] rounded-full overflow-hidden">
        <div 
          className={`h-full rounded-full transition-all duration-500 ${
            isComplete 
              ? 'bg-gradient-to-r from-[#3B6A52] to-[#2C6975]' 
              : 'bg-gradient-to-r from-[#F9A03F] to-[#e89135]'
          }`}
          style={{ width: `${percentage}%` }}
        />
        {isComplete && (
          <div className="absolute inset-0 bg-[#F9A03F]/20 animate-pulse" 
               style={{ animationDuration: '2s' }}
          />
        )}
      </div>

      <div className="flex items-center justify-between mt-1">
        <span className="text-xs text-gray-500">
          {Math.round(percentage)}% complete
        </span>
        {isComplete && (
          <div className="flex items-center space-x-1">
            <Trophy className="w-3 h-3 text-[#3B6A52]" />
            <span className="text-xs text-[#3B6A52]">Complete!</span>
          </div>
        )}
      </div>
    </div>
  );
}
