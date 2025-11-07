/**
 * PROGRESSIVE LEVEL METER
 * 
 * Visual indicator of user's current level and progress to next tier.
 * Features color transitions, tooltips, and animations.
 * 
 * =============================================================================
 * SALESFORCE INTEGRATION
 * =============================================================================
 * 
 * Data Source: User_Level__c
 * Fields:
 * - Total_Points__c → totalPoints
 * - Current_Level__c → currentLevel
 * - Points_To_Next_Level__c → pointsToNext
 * - Progress_Percentage__c → progressPercentage
 * 
 * =============================================================================
 */

import { useState } from 'react';
import { Compass, MapPin, Mountain, Flame, Crown, TrendingUp } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from './ui/tooltip';

export type ProgressLevel = 'Visitor' | 'Explorer' | 'Pathfinder' | 'Expert' | 'Expert+';

interface LevelConfig {
  name: ProgressLevel;
  icon: React.ComponentType<{ className?: string }>;
  color: string;
  gradientFrom: string;
  gradientTo: string;
  minPoints: number;
  maxPoints: number;
}

const LEVEL_CONFIGS: Record<ProgressLevel, LevelConfig> = {
  'Visitor': {
    name: 'Visitor',
    icon: Compass,
    color: '#5B89A6', // Sky Blue
    gradientFrom: '#5B89A6',
    gradientTo: '#7DA3BA',
    minPoints: 0,
    maxPoints: 99
  },
  'Explorer': {
    name: 'Explorer',
    icon: MapPin,
    color: '#2F6B4E', // Evergreen
    gradientFrom: '#2F6B4E',
    gradientTo: '#3B8562',
    minPoints: 100,
    maxPoints: 299
  },
  'Pathfinder': {
    name: 'Pathfinder',
    icon: Mountain,
    color: '#F59E33', // Amber
    gradientFrom: '#F59E33',
    gradientTo: '#FFB84D',
    minPoints: 300,
    maxPoints: 599
  },
  'Expert': {
    name: 'Expert',
    icon: Flame,
    color: '#2C6975', // Teal
    gradientFrom: '#2C6975',
    gradientTo: '#FFD700', // Gold gradient
    minPoints: 600,
    maxPoints: 999
  },
  'Expert+': {
    name: 'Expert+',
    icon: Crown,
    color: '#FFD700', // Gold
    gradientFrom: '#FFD700',
    gradientTo: '#FFA500',
    minPoints: 1000,
    maxPoints: 9999
  }
};

interface ProgressiveLevelMeterProps {
  currentLevel: ProgressLevel;
  totalPoints: number;
  pointsToNext: number;
  progressPercentage: number;
  size?: 'sm' | 'md' | 'lg';
  showTooltip?: boolean;
  animated?: boolean;
  showPointsLabel?: boolean;
}

export function ProgressiveLevelMeter({
  currentLevel,
  totalPoints,
  pointsToNext,
  progressPercentage,
  size = 'md',
  showTooltip = true,
  animated = true,
  showPointsLabel = true
}: ProgressiveLevelMeterProps) {
  const [isHovered, setIsHovered] = useState(false);

  const levelConfig = LEVEL_CONFIGS[currentLevel];
  const LevelIcon = levelConfig.icon;

  // Size configurations
  const sizes = {
    sm: {
      diameter: 120,
      strokeWidth: 8,
      iconSize: 'w-6 h-6',
      fontSize: 'text-sm',
      pointsSize: 'text-xs'
    },
    md: {
      diameter: 180,
      strokeWidth: 12,
      iconSize: 'w-10 h-10',
      fontSize: 'text-base',
      pointsSize: 'text-sm'
    },
    lg: {
      diameter: 240,
      strokeWidth: 16,
      iconSize: 'w-14 h-14',
      fontSize: 'text-lg',
      pointsSize: 'text-base'
    }
  };

  const config = sizes[size];
  const radius = (config.diameter - config.strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (progressPercentage / 100) * circumference;

  const centerX = config.diameter / 2;
  const centerY = config.diameter / 2;

  // Calculate next level
  const nextLevel = currentLevel === 'Expert+' ? null : 
    (Object.keys(LEVEL_CONFIGS) as ProgressLevel[])[
      (Object.keys(LEVEL_CONFIGS) as ProgressLevel[]).indexOf(currentLevel) + 1
    ];

  const tooltipContent = nextLevel
    ? `Earn ${pointsToNext} more points to reach ${nextLevel} level!`
    : `You've reached the maximum level! Total: ${totalPoints} points`;

  const MeterContent = () => (
    <div 
      className="relative inline-block"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <svg
        width={config.diameter}
        height={config.diameter}
        className={animated ? 'transition-all duration-300' : ''}
        style={{ transform: isHovered ? 'scale(1.05)' : 'scale(1)' }}
      >
        {/* Background circle */}
        <circle
          cx={centerX}
          cy={centerY}
          r={radius}
          fill="none"
          stroke="#EEEEEE"
          strokeWidth={config.strokeWidth}
        />

        {/* Progress circle with gradient */}
        <defs>
          <linearGradient id={`gradient-${currentLevel}`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={levelConfig.gradientFrom} />
            <stop offset="100%" stopColor={levelConfig.gradientTo} />
          </linearGradient>
        </defs>

        <circle
          cx={centerX}
          cy={centerY}
          r={radius}
          fill="none"
          stroke={`url(#gradient-${currentLevel})`}
          strokeWidth={config.strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          transform={`rotate(-90 ${centerX} ${centerY})`}
          className={animated ? 'transition-all duration-1500 ease-in-out' : ''}
        />

        {/* Glow effect on hover */}
        {isHovered && (
          <circle
            cx={centerX}
            cy={centerY}
            r={radius}
            fill="none"
            stroke={levelConfig.color}
            strokeWidth={config.strokeWidth}
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            transform={`rotate(-90 ${centerX} ${centerY})`}
            opacity="0.3"
            filter="blur(4px)"
          />
        )}
      </svg>

      {/* Center content */}
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <div 
          className={`rounded-full p-3 mb-2`}
          style={{ 
            backgroundColor: `${levelConfig.color}20`,
            boxShadow: isHovered ? `0 0 20px ${levelConfig.color}40` : 'none',
            transition: 'all 0.3s ease-in-out'
          }}
        >
          <LevelIcon 
            className={config.iconSize}
            style={{ color: levelConfig.color }}
          />
        </div>
        <p className={`${config.fontSize} text-gray-900 mt-1`}>
          {currentLevel}
        </p>
        {showPointsLabel && (
          <p className={`${config.pointsSize} text-gray-600 mt-0.5`}>
            {totalPoints} pts
          </p>
        )}
      </div>

      {/* Progress percentage badge */}
      {nextLevel && (
        <div 
          className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 px-3 py-1 rounded-full text-xs shadow-md"
          style={{ 
            backgroundColor: levelConfig.color,
            color: 'white'
          }}
        >
          {Math.round(progressPercentage)}%
        </div>
      )}
    </div>
  );

  if (showTooltip) {
    return (
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <div className="cursor-help">
              <MeterContent />
            </div>
          </TooltipTrigger>
          <TooltipContent 
            side="bottom"
            className="max-w-xs p-4"
          >
            <div className="space-y-2">
              <div className="flex items-center justify-between gap-4">
                <span className="text-sm">Current Level:</span>
                <span className="font-medium">{currentLevel}</span>
              </div>
              <div className="flex items-center justify-between gap-4">
                <span className="text-sm">Total Points:</span>
                <span className="font-medium">{totalPoints}</span>
              </div>
              {nextLevel && (
                <>
                  <div className="flex items-center justify-between gap-4">
                    <span className="text-sm">Next Level:</span>
                    <span className="font-medium">{nextLevel}</span>
                  </div>
                  <div className="flex items-center justify-between gap-4">
                    <span className="text-sm">Points Needed:</span>
                    <span className="font-medium text-amber-600">+{pointsToNext}</span>
                  </div>
                </>
              )}
              <div className="pt-2 border-t border-gray-200">
                <p className="text-sm text-gray-600">
                  {tooltipContent}
                </p>
              </div>
            </div>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    );
  }

  return <MeterContent />;
}

// Level Ladder Visualization Component
interface LevelLadderProps {
  currentLevel: ProgressLevel;
  totalPoints: number;
}

export function LevelLadder({ currentLevel, totalPoints }: LevelLadderProps) {
  const levels: ProgressLevel[] = ['Visitor', 'Explorer', 'Pathfinder', 'Expert', 'Expert+'];
  
  return (
    <div className="space-y-3">
      <h3 className="text-sm text-gray-700 mb-4">Your Progress Journey</h3>
      {levels.map((level, index) => {
        const config = LEVEL_CONFIGS[level];
        const Icon = config.icon;
        const isCurrentLevel = level === currentLevel;
        const isPastLevel = totalPoints >= config.minPoints && !isCurrentLevel;
        const isFutureLevel = totalPoints < config.minPoints;

        return (
          <div 
            key={level} 
            className={`flex items-center gap-4 p-3 rounded-lg border transition-all ${
              isCurrentLevel 
                ? 'border-2 bg-white shadow-md' 
                : isPastLevel
                ? 'border-gray-200 bg-gray-50'
                : 'border-gray-200 bg-white opacity-60'
            }`}
            style={isCurrentLevel ? { borderColor: config.color } : {}}
          >
            {/* Level Icon */}
            <div 
              className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${
                isPastLevel ? 'bg-green-100' : ''
              }`}
              style={isCurrentLevel ? { 
                backgroundColor: `${config.color}20`,
                boxShadow: `0 0 15px ${config.color}30`
              } : {}}
            >
              <Icon 
                className="w-5 h-5"
                style={{ color: isCurrentLevel || isPastLevel ? config.color : '#9CA3AF' }}
              />
            </div>

            {/* Level Info */}
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <p className={`text-sm ${isCurrentLevel ? '' : 'text-gray-700'}`}>
                  {level}
                </p>
                {isCurrentLevel && (
                  <span className="px-2 py-0.5 bg-amber-100 text-amber-700 rounded text-xs">
                    Current
                  </span>
                )}
                {isPastLevel && (
                  <span className="px-2 py-0.5 bg-green-100 text-green-700 rounded text-xs">
                    Achieved
                  </span>
                )}
              </div>
              <p className="text-xs text-gray-600">
                {config.minPoints} - {config.maxPoints === 9999 ? '∞' : config.maxPoints} points
              </p>
            </div>

            {/* Progress Indicator */}
            {isCurrentLevel && (
              <div className="flex items-center gap-2">
                <TrendingUp className="w-4 h-4" style={{ color: config.color }} />
                <span className="text-sm" style={{ color: config.color }}>
                  {totalPoints} pts
                </span>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
