/**
 * STAT CARD COMPONENT - TTDS Design System
 * 
 * =============================================================================
 * COMPONENT PURPOSE
 * =============================================================================
 * 
 * Displays KPIs, metrics, and statistics in dashboards with consistent styling
 * and optional trend indicators.
 * 
 * =============================================================================
 * USAGE LOCATIONS
 * =============================================================================
 * 
 * - LearnerHome.tsx (Points, Badges, Progress, Sessions)
 * - CoachDashboard.tsx (Cohort stats, Completion rates, Engagement)
 * - AdminPanel.tsx (System metrics, User counts, Revenue)
 * - VisitorLanding.tsx (Program statistics, Success rates)
 * 
 * =============================================================================
 * SALESFORCE MAPPING
 * =============================================================================
 * 
 * Data Sources:
 * - Gamification_Config__c (points, levels, badges)
 * - User aggregate queries (cohort statistics)
 * - Platform Events (real-time updates)
 * 
 * =============================================================================
 */

import React from 'react';

export interface StatCardProps {
  /** Icon component to display (e.g., <Trophy />) */
  icon: React.ReactNode;
  
  /** Label/title for the metric */
  label: string;
  
  /** The metric value (number or formatted string) */
  value: string | number;
  
  /** Icon container background color */
  iconColor?: 'evergreen' | 'amber' | 'blue' | 'teal' | 'success';
  
  /** Optional trend indicator */
  trend?: {
    direction: 'up' | 'down' | 'neutral';
    value: string;
  };
  
  /** Optional subtitle/description */
  subtitle?: string;
  
  /** Optional click handler */
  onClick?: () => void;
  
  /** Optional CSS class */
  className?: string;
}

export function StatCard({
  icon,
  label,
  value,
  iconColor = 'evergreen',
  trend,
  subtitle,
  onClick,
  className = '',
}: StatCardProps) {
  const iconBgColors = {
    evergreen: 'bg-evergreen',
    amber: 'bg-sun-amber',
    blue: 'bg-sky-blue',
    teal: 'bg-penny-guide',
    success: 'bg-success',
  };

  const trendColors = {
    up: 'text-green-600 dark:text-green-400',
    down: 'text-red-600 dark:text-red-400',
    neutral: 'text-gray-600 dark:text-gray-400',
  };

  const trendIcons = {
    up: '↑',
    down: '↓',
    neutral: '→',
  };

  const baseClasses = `
    bg-white dark:bg-slate-800 
    rounded-xl shadow-sm 
    border border-gray-200 dark:border-slate-700 
    p-6
    transition-all
    ${onClick ? 'cursor-pointer hover:shadow-md hover:border-gray-300 dark:hover:border-slate-600' : ''}
    ${className}
  `.trim();

  const content = (
    <>
      <div className="flex items-center space-x-3">
        {/* Icon Container */}
        <div 
          className={`
            w-12 h-12 rounded-lg 
            ${iconBgColors[iconColor]} 
            flex items-center justify-center 
            flex-shrink-0
          `}
        >
          <div className="text-white">
            {icon}
          </div>
        </div>

        {/* Value & Label */}
        <div className="flex-1 min-w-0">
          <p className="text-sm text-gray-600 dark:text-gray-400 truncate">
            {label}
          </p>
          <h3 className="text-2xl text-gray-900 dark:text-gray-100">
            {value}
          </h3>
          {subtitle && (
            <p className="text-xs text-gray-500 dark:text-gray-500 mt-0.5">
              {subtitle}
            </p>
          )}
        </div>
      </div>

      {/* Trend Indicator */}
      {trend && (
        <div className={`mt-3 text-sm flex items-center space-x-1 ${trendColors[trend.direction]}`}>
          <span aria-label={`Trend ${trend.direction}`}>
            {trendIcons[trend.direction]}
          </span>
          <span>{trend.value}</span>
        </div>
      )}
    </>
  );

  if (onClick) {
    return (
      <button
        onClick={onClick}
        className={baseClasses}
        aria-label={`View details for ${label}: ${value}`}
      >
        {content}
      </button>
    );
  }

  return (
    <div className={baseClasses}>
      {content}
    </div>
  );
}

// Export as default for easier imports
export default StatCard;
