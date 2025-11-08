/**
 * METRIC BADGE COMPONENT - TTDS Design System
 * 
 * =============================================================================
 * COMPONENT PURPOSE
 * =============================================================================
 * 
 * Displays small metric indicators for points, badges, levels, and other
 * gamification elements in a consistent, compact format.
 * 
 * =============================================================================
 * USAGE LOCATIONS
 * =============================================================================
 * 
 * - User profile headers
 * - Navigation (points display)
 * - Leaderboard entries
 * - Portfolio cards
 * - Community posts (author badges)
 * 
 * =============================================================================
 * FEATURES
 * =============================================================================
 * 
 * - Multiple style variants
 * - Optional icon support
 * - Tooltip-ready
 * - Accessible labeling
 * 
 * =============================================================================
 */

import React from 'react';
import { LucideIcon } from 'lucide-react';

export interface MetricBadgeProps {
  /** Badge label/value */
  label: string;
  
  /** Optional icon */
  icon?: LucideIcon;
  
  /** Visual variant */
  variant?: 'points' | 'level' | 'badge' | 'neutral' | 'success';
  
  /** Size variant */
  size?: 'sm' | 'md' | 'lg';
  
  /** Optional tooltip text */
  title?: string;
  
  /** Optional CSS class */
  className?: string;
}

export function MetricBadge({
  label,
  icon: Icon,
  variant = 'neutral',
  size = 'md',
  title,
  className = '',
}: MetricBadgeProps) {
  const variants = {
    points: 'bg-sun-amber/10 text-sun-amber border-sun-amber/20',
    level: 'bg-evergreen/10 text-evergreen border-evergreen/20',
    badge: 'bg-sky-blue/10 text-sky-blue border-sky-blue/20',
    success: 'bg-success/10 text-success border-success/20',
    neutral: 'bg-gray-100 dark:bg-slate-800 text-gray-700 dark:text-gray-300 border-gray-200 dark:border-slate-700',
  };

  const sizes = {
    sm: 'px-2 py-0.5 text-xs',
    md: 'px-2.5 py-1 text-sm',
    lg: 'px-3 py-1.5 text-base',
  };

  const iconSizes = {
    sm: 'w-3 h-3',
    md: 'w-3.5 h-3.5',
    lg: 'w-4 h-4',
  };

  return (
    <span
      className={`
        inline-flex items-center space-x-1
        rounded-full border
        ${variants[variant]}
        ${sizes[size]}
        ${className}
      `}
      title={title}
      role="status"
      aria-label={title || label}
    >
      {Icon && (
        <Icon 
          className={iconSizes[size]} 
          aria-hidden="true"
        />
      )}
      <span>{label}</span>
    </span>
  );
}

export default MetricBadge;
