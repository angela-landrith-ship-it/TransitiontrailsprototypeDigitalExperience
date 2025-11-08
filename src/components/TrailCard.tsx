/**
 * TRAIL CARD COMPONENT - Trail of Mastery
 * 
 * Displays a professional role track card with hover effects
 * and progress indicators for enrolled learners.
 */

import React from 'react';
import { LucideIcon, ChevronRight, Lock } from 'lucide-react';

export interface TrailCardProps {
  role: string;
  title: string;
  description: string;
  duration: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  icon: LucideIcon;
  color: 'amber' | 'teal' | 'evergreen' | 'blue';
  isEnrolled?: boolean;
  progress?: number;
  isLocked?: boolean;
  onClick: () => void;
}

export function TrailCard({
  role,
  title,
  description,
  duration,
  difficulty,
  icon: Icon,
  color,
  isEnrolled = false,
  progress = 0,
  isLocked = false,
  onClick,
}: TrailCardProps) {
  const colorClasses = {
    amber: {
      bg: 'bg-sun-amber/10',
      icon: 'bg-sun-amber',
      glow: 'hover:shadow-sun-amber/20',
      border: 'border-sun-amber/20',
    },
    teal: {
      bg: 'bg-penny-guide/10',
      icon: 'bg-penny-guide',
      glow: 'hover:shadow-penny-guide/20',
      border: 'border-penny-guide/20',
    },
    evergreen: {
      bg: 'bg-evergreen/10',
      icon: 'bg-evergreen',
      glow: 'hover:shadow-evergreen/20',
      border: 'border-evergreen/20',
    },
    blue: {
      bg: 'bg-sky-blue/10',
      icon: 'bg-sky-blue',
      glow: 'hover:shadow-sky-blue/20',
      border: 'border-sky-blue/20',
    },
  };

  const difficultyColors = {
    Beginner: 'text-success',
    Intermediate: 'text-warning',
    Advanced: 'text-error',
  };

  const classes = colorClasses[color];

  return (
    <button
      onClick={onClick}
      disabled={isLocked}
      className={`
        relative w-full
        bg-white dark:bg-slate-800
        rounded-xl p-6
        border-2 ${classes.border}
        transition-all duration-300
        ${
          isLocked
            ? 'opacity-60 cursor-not-allowed'
            : `hover:-translate-y-1 hover:shadow-xl ${classes.glow} cursor-pointer`
        }
        text-left
        focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-evergreen
      `}
      aria-label={`${title} - ${isLocked ? 'Locked' : isEnrolled ? 'Continue' : 'Start'} trail`}
    >
      {/* Locked Overlay */}
      {isLocked && (
        <div className="absolute top-4 right-4">
          <Lock className="w-5 h-5 text-gray-400" aria-hidden="true" />
        </div>
      )}

      {/* Icon */}
      <div className={`w-16 h-16 rounded-xl ${classes.icon} flex items-center justify-center mb-4`}>
        <Icon className="w-8 h-8 text-white" aria-hidden="true" />
      </div>

      {/* Role */}
      <div className="text-xs text-gray-500 dark:text-gray-400 mb-1 uppercase tracking-wide">
        {role}
      </div>

      {/* Title */}
      <h3 className="text-gray-900 dark:text-gray-100 mb-2">
        {title}
      </h3>

      {/* Description */}
      <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 line-clamp-2">
        {description}
      </p>

      {/* Meta Info */}
      <div className="flex items-center space-x-4 mb-4 text-sm">
        <span className="text-gray-600 dark:text-gray-400">
          {duration}
        </span>
        <span className="text-gray-300 dark:text-gray-600">•</span>
        <span className={difficultyColors[difficulty]}>
          {difficulty}
        </span>
      </div>

      {/* Progress Bar (if enrolled) */}
      {isEnrolled && progress > 0 && (
        <div className="mb-4">
          <div className="flex items-center justify-between mb-1">
            <span className="text-xs text-gray-600 dark:text-gray-400">Progress</span>
            <span className="text-xs text-gray-900 dark:text-gray-100">{progress}%</span>
          </div>
          <div className="h-2 bg-gray-200 dark:bg-slate-700 rounded-full overflow-hidden">
            <div
              className={`h-full ${classes.icon} transition-all duration-500`}
              style={{ width: `${progress}%` }}
              role="progressbar"
              aria-valuenow={progress}
              aria-valuemin={0}
              aria-valuemax={100}
            />
          </div>
        </div>
      )}

      {/* CTA */}
      <div className="flex items-center justify-between">
        <span className="text-sm text-gray-900 dark:text-gray-100">
          {isLocked ? 'Locked' : isEnrolled ? 'Continue Trail' : 'Start Trail'}
        </span>
        <ChevronRight className="w-5 h-5 text-gray-400" aria-hidden="true" />
      </div>
    </button>
  );
}

export default TrailCard;
