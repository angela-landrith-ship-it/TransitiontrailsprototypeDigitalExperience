import { Trophy, Target, Sparkles, ArrowRight, CheckCircle } from 'lucide-react';
import { Button } from './ui/button';

interface ExplorationMeterProps {
  currentPoints: number;
  targetPoints: number;
  coursesCompleted: number;
  totalCourses: number;
  onUpgrade?: () => void;
  userName?: string;
}

export function ExplorationMeter({
  currentPoints,
  targetPoints,
  coursesCompleted,
  totalCourses,
  onUpgrade,
  userName
}: ExplorationMeterProps) {
  const percentage = Math.min(Math.round((currentPoints / targetPoints) * 100), 100);
  const isReady = percentage >= 70;

  const milestones = [
    { points: 50, label: 'First Course', reached: currentPoints >= 50 },
    { points: 150, label: 'Explorer', reached: currentPoints >= 150 },
    { points: 350, label: 'Trail Ready', reached: currentPoints >= 350 }
  ];

  return (
    <div className="bg-gradient-to-br from-[#7EB5C1]/10 to-[#2C6975]/10 rounded-xl border-2 border-[#7EB5C1]/30 p-6">
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div>
          <div className="flex items-center space-x-2 mb-1">
            <Trophy className="w-5 h-5 text-[#F9A03F]" />
            <h3 className="text-gray-900">Exploration Progress</h3>
          </div>
          <p className="text-sm text-gray-600">
            {isReady 
              ? "You're ready for the Guided Trail!" 
              : `Earn ${targetPoints - currentPoints} more points to unlock`}
          </p>
        </div>
        {isReady && (
          <Sparkles className="w-6 h-6 text-[#F9A03F] animate-pulse" />
        )}
      </div>

      {/* Progress Ring */}
      <div className="flex items-center justify-center mb-6">
        <div className="relative">
          <svg className="w-32 h-32 transform -rotate-90">
            {/* Background circle */}
            <circle
              cx="64"
              cy="64"
              r="56"
              stroke="#e5e7eb"
              strokeWidth="8"
              fill="none"
            />
            {/* Progress circle */}
            <circle
              cx="64"
              cy="64"
              r="56"
              stroke="#7EB5C1"
              strokeWidth="8"
              fill="none"
              strokeDasharray={`${2 * Math.PI * 56}`}
              strokeDashoffset={`${2 * Math.PI * 56 * (1 - percentage / 100)}`}
              strokeLinecap="round"
              className="transition-all duration-500"
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <p className="text-3xl text-gray-900">{percentage}%</p>
            <p className="text-xs text-gray-600">Complete</p>
          </div>
        </div>
      </div>

      {/* Points Counter */}
      <div className="bg-white/50 rounded-lg p-4 mb-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm text-gray-600">Exploration Points</span>
          <span className="text-gray-900">
            {currentPoints} / {targetPoints}
          </span>
        </div>
        <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
          <div 
            className="h-full bg-gradient-to-r from-[#7EB5C1] to-[#2C6975] rounded-full transition-all duration-500"
            style={{ width: `${percentage}%` }}
          />
        </div>
      </div>

      {/* Courses Completed */}
      <div className="bg-white/50 rounded-lg p-4 mb-4">
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-600">Courses Completed</span>
          <span className="text-gray-900">
            {coursesCompleted} / {totalCourses}
          </span>
        </div>
        <div className="flex gap-1 mt-2">
          {Array.from({ length: totalCourses }).map((_, index) => (
            <div 
              key={index}
              className={`flex-1 h-1.5 rounded-full ${
                index < coursesCompleted 
                  ? 'bg-[#3B6A52]' 
                  : 'bg-gray-200'
              }`}
            />
          ))}
        </div>
      </div>

      {/* Milestones */}
      <div className="space-y-2 mb-4">
        <p className="text-xs text-gray-600 mb-2">Milestones</p>
        {milestones.map((milestone) => (
          <div 
            key={milestone.points}
            className={`flex items-center space-x-2 text-sm ${
              milestone.reached ? 'text-gray-900' : 'text-gray-500'
            }`}
          >
            {milestone.reached ? (
              <CheckCircle className="w-4 h-4 text-[#3B6A52]" />
            ) : (
              <div className="w-4 h-4 rounded-full border-2 border-gray-300" />
            )}
            <span className={milestone.reached ? '' : 'line-through'}>{milestone.label}</span>
            <span className="text-xs text-gray-500">({milestone.points} pts)</span>
          </div>
        ))}
      </div>

      {/* Upgrade CTA */}
      {isReady ? (
        <div className="bg-gradient-to-r from-[#F9A03F] to-[#e89135] text-white rounded-lg p-4">
          <div className="flex items-start space-x-3 mb-3">
            <Sparkles className="w-5 h-5 flex-shrink-0 mt-0.5" />
            <div className="flex-1">
              <p className="mb-1">
                Amazing work{userName ? `, ${userName}` : ''}! 🎉
              </p>
              <p className="text-sm text-white/90">
                You've completed {percentage}% of the Visitor Trail. Ready to unlock the full learning experience?
              </p>
            </div>
          </div>
          {onUpgrade && (
            <Button
              onClick={onUpgrade}
              className="w-full bg-white text-[#F9A03F] hover:bg-white/90 shadow-lg"
            >
              <span>Upgrade to Guided Trail</span>
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          )}
        </div>
      ) : (
        <div className="bg-white/50 rounded-lg p-4 border border-[#7EB5C1]/30">
          <div className="flex items-start space-x-2">
            <Target className="w-5 h-5 text-[#7EB5C1] flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-sm text-gray-900 mb-1">Keep exploring!</p>
              <p className="text-xs text-gray-600">
                Complete {Math.ceil((targetPoints - currentPoints) / 50)} more courses to reach {Math.ceil((targetPoints - currentPoints) / 50 * 50)} points
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
