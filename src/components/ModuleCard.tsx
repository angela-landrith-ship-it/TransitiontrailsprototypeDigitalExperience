/**
 * MODULE CARD COMPONENT - Trail of Mastery
 * 
 * Displays an individual trail module with lock/unlock states
 * and completion status.
 */

import React from 'react';
import { LucideIcon, Lock, CheckCircle, Circle, ChevronRight } from 'lucide-react';

export interface ModuleCardProps {
  moduleNumber: number;
  title: string;
  description: string;
  points: number;
  isLocked: boolean;
  isCompleted: boolean;
  isCurrent: boolean;
  onClick?: () => void;
}

export function ModuleCard({
  moduleNumber,
  title,
  description,
  points,
  isLocked,
  isCompleted,
  isCurrent,
  onClick,
}: ModuleCardProps) {
  const canClick = !isLocked && onClick;

  return (
    <div
      className={`
        relative
        bg-white dark:bg-slate-800
        rounded-xl p-5
        border-2
        transition-all
        ${
          isLocked
            ? 'border-gray-200 dark:border-slate-700 opacity-60'
            : isCurrent
            ? 'border-sun-amber shadow-sm'
            : isCompleted
            ? 'border-success/20'
            : 'border-gray-200 dark:border-slate-700 hover:border-gray-300 dark:hover:border-slate-600'
        }
        ${canClick ? 'cursor-pointer hover:shadow-md' : ''}
      `}
      onClick={canClick ? onClick : undefined}
      role={canClick ? 'button' : undefined}
      tabIndex={canClick ? 0 : undefined}
      onKeyPress={canClick ? (e) => e.key === 'Enter' && onClick?.() : undefined}
    >
      {/* Status Icon */}
      <div className="absolute top-5 right-5">
        {isLocked ? (
          <Lock className="w-5 h-5 text-gray-400" aria-label="Locked" />
        ) : isCompleted ? (
          <CheckCircle className="w-5 h-5 text-success" aria-label="Completed" />
        ) : isCurrent ? (
          <Circle className="w-5 h-5 text-sun-amber fill-sun-amber" aria-label="In Progress" />
        ) : (
          <Circle className="w-5 h-5 text-gray-300 dark:text-gray-600" aria-label="Not Started" />
        )}
      </div>

      {/* Module Number */}
      <div className="text-xs text-gray-500 dark:text-gray-400 mb-2 uppercase tracking-wide">
        Module {moduleNumber}
      </div>

      {/* Title */}
      <h4 className="text-gray-900 dark:text-gray-100 mb-2 pr-8">
        {title}
      </h4>

      {/* Description */}
      <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
        {description}
      </p>

      {/* Points & CTA */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <span className="text-xs px-2 py-1 bg-sun-amber/10 text-sun-amber rounded-full">
            +{points} pts
          </span>
          {isCurrent && (
            <span className="text-xs px-2 py-1 bg-sun-amber text-white rounded-full">
              Current
            </span>
          )}
          {isCompleted && (
            <span className="text-xs px-2 py-1 bg-success/10 text-success rounded-full">
              Complete
            </span>
          )}
        </div>

        {canClick && !isCompleted && (
          <ChevronRight className="w-5 h-5 text-gray-400" aria-hidden="true" />
        )}
      </div>
    </div>
  );
}

export default ModuleCard;
