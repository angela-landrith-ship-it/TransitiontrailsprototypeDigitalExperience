/**
 * PORTFOLIO FILTERS COMPONENT
 * 
 * Search bar and filter chips for portfolio gallery.
 * Allows filtering by Trail, Role, Domain, and Status.
 */

import { Search, X } from 'lucide-react';
import { Badge } from './ui/badge';

export interface FilterOptions {
  trail: ('Visitor' | 'Guided' | 'Mastery')[];
  role: ('Admin' | 'BA' | 'Dev')[];
  domain: string[];
  status: ('Completed' | 'In Progress')[];
}

interface PortfolioFiltersProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  activeFilters: {
    trail?: string;
    role?: string;
    domain?: string;
    status?: string;
  };
  onFilterChange: (filterType: keyof FilterOptions, value: string) => void;
  onClearFilters: () => void;
}

export function PortfolioFilters({
  searchQuery,
  onSearchChange,
  activeFilters,
  onFilterChange,
  onClearFilters
}: PortfolioFiltersProps) {
  const filterOptions: FilterOptions = {
    trail: ['Visitor', 'Guided', 'Mastery'],
    role: ['Admin', 'BA', 'Dev'],
    domain: ['Nonprofit Cloud', 'Experience Cloud', 'AI', 'Marketing Cloud', 'Sales Cloud'],
    status: ['Completed', 'In Progress']
  };

  const hasActiveFilters = Object.values(activeFilters).some(v => v);

  return (
    <div className="space-y-4">
      {/* Search Bar */}
      <div className="relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 dark:text-gray-500" />
        <input
          type="text"
          placeholder="Search projects by keyword..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          className="w-full pl-12 pr-4 py-3 bg-white dark:bg-slate-800 border border-gray-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-[#2C6975] focus:border-transparent text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400"
        />
      </div>

      {/* Filter Chips */}
      <div className="space-y-3">
        {/* Trail Filter */}
        <div>
          <label className="text-sm text-gray-600 dark:text-gray-400 mb-2 block">
            Trail
          </label>
          <div className="flex flex-wrap gap-2">
            {filterOptions.trail.map((trail) => (
              <button
                key={trail}
                onClick={() => onFilterChange('trail', trail)}
                className={`px-3 py-1.5 rounded-full text-sm transition-all ${
                  activeFilters.trail === trail
                    ? 'bg-[#2C6975] text-white shadow-md'
                    : 'bg-gray-100 dark:bg-slate-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-slate-600'
                }`}
              >
                {trail}
              </button>
            ))}
          </div>
        </div>

        {/* Role Filter */}
        <div>
          <label className="text-sm text-gray-600 dark:text-gray-400 mb-2 block">
            Role
          </label>
          <div className="flex flex-wrap gap-2">
            {filterOptions.role.map((role) => (
              <button
                key={role}
                onClick={() => onFilterChange('role', role)}
                className={`px-3 py-1.5 rounded-full text-sm transition-all ${
                  activeFilters.role === role
                    ? 'bg-[#7EB5C1] text-white shadow-md'
                    : 'bg-gray-100 dark:bg-slate-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-slate-600'
                }`}
              >
                {role}
              </button>
            ))}
          </div>
        </div>

        {/* Domain Filter */}
        <div>
          <label className="text-sm text-gray-600 dark:text-gray-400 mb-2 block">
            Domain
          </label>
          <div className="flex flex-wrap gap-2">
            {filterOptions.domain.map((domain) => (
              <button
                key={domain}
                onClick={() => onFilterChange('domain', domain)}
                className={`px-3 py-1.5 rounded-full text-sm transition-all ${
                  activeFilters.domain === domain
                    ? 'bg-[#3B6A52] text-white shadow-md'
                    : 'bg-gray-100 dark:bg-slate-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-slate-600'
                }`}
              >
                {domain}
              </button>
            ))}
          </div>
        </div>

        {/* Status Filter */}
        <div>
          <label className="text-sm text-gray-600 dark:text-gray-400 mb-2 block">
            Status
          </label>
          <div className="flex flex-wrap gap-2">
            {filterOptions.status.map((status) => (
              <button
                key={status}
                onClick={() => onFilterChange('status', status)}
                className={`px-3 py-1.5 rounded-full text-sm transition-all ${
                  activeFilters.status === status
                    ? 'bg-[#F9A03F] text-white shadow-md'
                    : 'bg-gray-100 dark:bg-slate-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-slate-600'
                }`}
              >
                {status}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Clear Filters */}
      {hasActiveFilters && (
        <button
          onClick={onClearFilters}
          className="flex items-center space-x-2 px-4 py-2 text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 transition-colors"
        >
          <X className="w-4 h-4" />
          <span>Clear all filters</span>
        </button>
      )}
    </div>
  );
}
