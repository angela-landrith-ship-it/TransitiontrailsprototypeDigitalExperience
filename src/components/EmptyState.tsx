/**
 * EMPTY STATE COMPONENT - TTDS Design System
 * 
 * =============================================================================
 * COMPONENT PURPOSE
 * =============================================================================
 * 
 * Displays a friendly empty state message when no content is available,
 * with optional call-to-action button.
 * 
 * =============================================================================
 * USAGE LOCATIONS
 * =============================================================================
 * 
 * - Portfolio Gallery (no projects yet)
 * - Community (no posts)
 * - Projects Hub (no active projects)
 * - Learning Center (no enrolled courses)
 * - Notifications (no new notifications)
 * 
 * =============================================================================
 * ACCESSIBILITY
 * =============================================================================
 * 
 * - ARIA role="status" for screen readers
 * - Semantic heading structure
 * - High contrast for readability
 * 
 * =============================================================================
 */

import React from 'react';
import { LucideIcon } from 'lucide-react';

export interface EmptyStateProps {
  /** Icon to display (Lucide icon component) */
  icon: LucideIcon;
  
  /** Main heading text */
  title: string;
  
  /** Descriptive message */
  description: string;
  
  /** Optional call-to-action button */
  action?: {
    label: string;
    onClick: () => void;
    variant?: 'primary' | 'secondary';
  };
  
  /** Visual style variant */
  variant?: 'default' | 'compact';
  
  /** Optional CSS class */
  className?: string;
}

export function EmptyState({
  icon: Icon,
  title,
  description,
  action,
  variant = 'default',
  className = '',
}: EmptyStateProps) {
  const isCompact = variant === 'compact';
  
  return (
    <div 
      className={`
        flex flex-col items-center justify-center text-center
        ${isCompact ? 'py-8' : 'py-12'}
        ${className}
      `}
      role="status"
      aria-live="polite"
    >
      {/* Icon */}
      <div 
        className={`
          rounded-full bg-gray-100 dark:bg-slate-800
          flex items-center justify-center
          ${isCompact ? 'w-12 h-12 mb-3' : 'w-16 h-16 mb-4'}
        `}
      >
        <Icon 
          className={`
            text-gray-400 dark:text-gray-600
            ${isCompact ? 'w-6 h-6' : 'w-8 h-8'}
          `}
          aria-hidden="true"
        />
      </div>

      {/* Title */}
      <h3 
        className={`
          text-gray-900 dark:text-gray-100
          ${isCompact ? 'text-base mb-1' : 'text-lg mb-2'}
        `}
      >
        {title}
      </h3>

      {/* Description */}
      <p 
        className={`
          text-gray-600 dark:text-gray-400
          ${isCompact ? 'text-sm max-w-xs' : 'text-base max-w-md'}
        `}
      >
        {description}
      </p>

      {/* Optional Action Button */}
      {action && (
        <button
          onClick={action.onClick}
          className={`
            mt-4 px-6 py-2 rounded-lg
            transition-colors
            focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-evergreen
            ${
              action.variant === 'secondary'
                ? 'border-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-slate-700'
                : 'bg-evergreen text-white hover:bg-evergreen-dark'
            }
          `}
          aria-label={action.label}
        >
          {action.label}
        </button>
      )}
    </div>
  );
}

export default EmptyState;
