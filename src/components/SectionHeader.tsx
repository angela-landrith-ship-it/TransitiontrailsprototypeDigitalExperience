/**
 * SECTION HEADER COMPONENT - TTDS Design System
 * 
 * =============================================================================
 * COMPONENT PURPOSE
 * =============================================================================
 * 
 * Provides consistent section headers across all dashboard and page views
 * with optional action buttons, descriptions, and badges.
 * 
 * =============================================================================
 * USAGE LOCATIONS
 * =============================================================================
 * 
 * - All dashboard sections (Learner Home, Coach, Admin)
 * - Portfolio sections
 * - Projects Hub sections
 * - Community sections
 * - Profile sections
 * 
 * =============================================================================
 * FEATURES
 * =============================================================================
 * 
 * - Optional icon
 * - Optional badge/count indicator
 * - Optional description text
 * - Optional action button
 * - Flexible alignment
 * - Semantic heading levels
 * 
 * =============================================================================
 */

import React from 'react';
import { LucideIcon } from 'lucide-react';

export interface SectionHeaderProps {
  /** Section title */
  title: string;
  
  /** Optional description/subtitle */
  description?: string;
  
  /** Optional icon (Lucide icon component) */
  icon?: LucideIcon;
  
  /** Optional badge/count */
  badge?: {
    label: string;
    variant?: 'default' | 'success' | 'warning' | 'info';
  };
  
  /** Optional action button */
  action?: {
    label: string;
    onClick: () => void;
    icon?: LucideIcon;
  };
  
  /** Heading level (semantic HTML) */
  level?: 'h1' | 'h2' | 'h3' | 'h4';
  
  /** Optional CSS class */
  className?: string;
}

export function SectionHeader({
  title,
  description,
  icon: Icon,
  badge,
  action,
  level = 'h2',
  className = '',
}: SectionHeaderProps) {
  const HeadingTag = level;
  
  const badgeVariants = {
    default: 'bg-gray-100 dark:bg-slate-800 text-gray-700 dark:text-gray-300',
    success: 'bg-success/10 text-success',
    warning: 'bg-sun-amber/10 text-sun-amber',
    info: 'bg-sky-blue/10 text-sky-blue',
  };

  const ActionIcon = action?.icon;

  return (
    <div className={`flex items-start justify-between ${className}`}>
      {/* Left: Title, Description, Badge */}
      <div className="flex-1">
        <div className="flex items-center space-x-2 mb-1">
          {/* Optional Icon */}
          {Icon && (
            <Icon 
              className="w-5 h-5 text-gray-600 dark:text-gray-400" 
              aria-hidden="true"
            />
          )}
          
          {/* Title */}
          <HeadingTag className="text-gray-900 dark:text-gray-100">
            {title}
          </HeadingTag>
          
          {/* Optional Badge */}
          {badge && (
            <span 
              className={`
                px-2 py-0.5 rounded-full text-xs
                ${badgeVariants[badge.variant || 'default']}
              `}
            >
              {badge.label}
            </span>
          )}
        </div>
        
        {/* Optional Description */}
        {description && (
          <p className="text-sm text-gray-600 dark:text-gray-400 max-w-2xl">
            {description}
          </p>
        )}
      </div>

      {/* Right: Action Button */}
      {action && (
        <button
          onClick={action.onClick}
          className="
            px-4 py-2 
            bg-evergreen text-white 
            rounded-lg 
            hover:bg-evergreen-dark 
            transition-colors
            flex items-center space-x-2
            focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-evergreen
            flex-shrink-0
          "
          aria-label={action.label}
        >
          {ActionIcon && <ActionIcon className="w-4 h-4" aria-hidden="true" />}
          <span>{action.label}</span>
        </button>
      )}
    </div>
  );
}

export default SectionHeader;
