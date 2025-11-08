/**
 * FILTER CHIP GROUP COMPONENT - TTDS Design System
 * 
 * =============================================================================
 * COMPONENT PURPOSE
 * =============================================================================
 * 
 * Provides a multi-select filter interface with chip-style buttons for
 * filtering content by categories, tags, skills, or other attributes.
 * 
 * =============================================================================
 * USAGE LOCATIONS
 * =============================================================================
 * 
 * - Portfolio Gallery (filter by skills, type, status)
 * - Projects Hub (filter by team, technology, status)
 * - Community (filter by topic, author, date)
 * - Learning Center (filter by subject, difficulty, progress)
 * 
 * =============================================================================
 * FEATURES
 * =============================================================================
 * 
 * - Multi-select support
 * - Clear all functionality
 * - Active count indicator
 * - Keyboard accessible (Tab, Enter, Space)
 * - Screen reader friendly
 * 
 * =============================================================================
 */

import React from 'react';
import { X } from 'lucide-react';

export interface FilterOption {
  id: string;
  label: string;
  count?: number;
}

export interface FilterChipGroupProps {
  /** Label for the filter group */
  label: string;
  
  /** Available filter options */
  options: FilterOption[];
  
  /** Currently selected option IDs */
  selected: string[];
  
  /** Callback when selection changes */
  onChange: (selected: string[]) => void;
  
  /** Allow multiple selections */
  multiSelect?: boolean;
  
  /** Show clear all button */
  showClearAll?: boolean;
  
  /** Optional CSS class */
  className?: string;
}

export function FilterChipGroup({
  label,
  options,
  selected,
  onChange,
  multiSelect = true,
  showClearAll = true,
  className = '',
}: FilterChipGroupProps) {
  const handleToggle = (optionId: string) => {
    if (multiSelect) {
      // Multi-select mode
      if (selected.includes(optionId)) {
        onChange(selected.filter(id => id !== optionId));
      } else {
        onChange([...selected, optionId]);
      }
    } else {
      // Single-select mode
      onChange(selected.includes(optionId) ? [] : [optionId]);
    }
  };

  const handleClearAll = () => {
    onChange([]);
  };

  const activeCount = selected.length;

  return (
    <div className={className}>
      {/* Label and Clear Button */}
      <div className="flex items-center justify-between mb-3">
        <label className="text-sm text-gray-700 dark:text-gray-300">
          {label}
          {activeCount > 0 && (
            <span className="ml-2 text-xs text-gray-500 dark:text-gray-400">
              ({activeCount} active)
            </span>
          )}
        </label>
        
        {showClearAll && activeCount > 0 && (
          <button
            onClick={handleClearAll}
            className="text-xs text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200 flex items-center space-x-1 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-evergreen rounded px-2 py-1"
            aria-label="Clear all filters"
          >
            <X className="w-3 h-3" aria-hidden="true" />
            <span>Clear all</span>
          </button>
        )}
      </div>

      {/* Filter Chips */}
      <div className="flex flex-wrap gap-2">
        {options.map((option) => {
          const isSelected = selected.includes(option.id);
          
          return (
            <button
              key={option.id}
              onClick={() => handleToggle(option.id)}
              className={`
                px-3 py-1.5 rounded-full text-sm
                transition-all
                focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-evergreen
                ${
                  isSelected
                    ? 'bg-evergreen text-white shadow-sm'
                    : 'bg-gray-100 dark:bg-slate-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-slate-700 border border-gray-300 dark:border-slate-600'
                }
              `}
              role="checkbox"
              aria-checked={isSelected}
              aria-label={`${isSelected ? 'Remove' : 'Add'} ${option.label} filter`}
            >
              <span>{option.label}</span>
              {option.count !== undefined && (
                <span 
                  className={`ml-1.5 ${isSelected ? 'text-white/80' : 'text-gray-500 dark:text-gray-400'}`}
                  aria-label={`${option.count} items`}
                >
                  ({option.count})
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* Screen Reader Summary */}
      <div className="sr-only" aria-live="polite">
        {activeCount === 0 
          ? `No ${label.toLowerCase()} filters active` 
          : `${activeCount} ${label.toLowerCase()} ${activeCount === 1 ? 'filter' : 'filters'} active`
        }
      </div>
    </div>
  );
}

export default FilterChipGroup;
