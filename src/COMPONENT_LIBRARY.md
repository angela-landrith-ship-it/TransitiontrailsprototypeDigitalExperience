# TTDS Component Library

**Version:** 1.0.0  
**Date:** November 8, 2025  
**Platform:** Salesforce Experience Cloud (LWR)

---

## 📚 Overview

The Transition Trails Design System (TTDS) Component Library provides a comprehensive set of reusable, accessible, and well-documented React components for building consistent user experiences across the platform.

### Design Principles

1. **Reusable** - DRY (Don't Repeat Yourself) approach
2. **Accessible** - WCAG 2.1 AA compliant
3. **Typed** - Full TypeScript support
4. **Documented** - Inline JSDoc and usage examples
5. **Themeable** - Light/dark mode support
6. **Responsive** - Mobile-first design

---

## 🎯 Core Components

### StatCard

**Purpose:** Display KPIs, metrics, and statistics in dashboards

**Usage Locations:**
- Learner Home (Points, Badges, Progress, Sessions)
- Coach Dashboard (Cohort stats, Completion rates)
- Admin Panel (System metrics, User counts)
- Visitor Landing (Program statistics)

**Props:**
```typescript
interface StatCardProps {
  icon: React.ReactNode;
  label: string;
  value: string | number;
  iconColor?: 'evergreen' | 'amber' | 'blue' | 'teal' | 'success';
  trend?: {
    direction: 'up' | 'down' | 'neutral';
    value: string;
  };
  subtitle?: string;
  onClick?: () => void;
  className?: string;
}
```

**Example:**
```tsx
import { StatCard } from './components/StatCard';
import { Trophy } from 'lucide-react';

<StatCard
  icon={<Trophy className="w-6 h-6" />}
  label="Total Points"
  value="2,380"
  iconColor="amber"
  trend={{ direction: 'up', value: '+120 this week' }}
  subtitle="68% of total program points"
/>
```

**Accessibility:**
- ✅ ARIA labels on clickable cards
- ✅ Semantic color coding
- ✅ Screen reader friendly trend indicators
- ✅ Keyboard navigable (when onClick provided)

**Replaces:** 200+ lines of duplicated stat card markup across 4+ files

---

### EmptyState

**Purpose:** Display friendly empty state messages when no content is available

**Usage Locations:**
- Portfolio Gallery (no projects yet)
- Community (no posts)
- Projects Hub (no active projects)
- Learning Center (no enrolled courses)
- Notifications (no new notifications)

**Props:**
```typescript
interface EmptyStateProps {
  icon: LucideIcon;
  title: string;
  description: string;
  action?: {
    label: string;
    onClick: () => void;
    variant?: 'primary' | 'secondary';
  };
  variant?: 'default' | 'compact';
  className?: string;
}
```

**Example:**
```tsx
import { EmptyState } from './components/EmptyState';
import { FolderOpen } from 'lucide-react';

<EmptyState
  icon={FolderOpen}
  title="No projects yet"
  description="Start your capstone journey by creating your first project. You'll showcase your skills and build your portfolio."
  action={{
    label: 'Create Project',
    onClick: () => handleCreateProject(),
    variant: 'primary'
  }}
/>
```

**Accessibility:**
- ✅ ARIA role="status" for screen readers
- ✅ aria-live="polite" for dynamic updates
- ✅ Semantic heading structure
- ✅ High contrast icons and text

---

### FilterChipGroup

**Purpose:** Multi-select filter interface with chip-style buttons

**Usage Locations:**
- Portfolio Gallery (filter by skills, type, status)
- Projects Hub (filter by team, technology)
- Community (filter by topic, author)
- Learning Center (filter by subject, difficulty)

**Props:**
```typescript
interface FilterChipGroupProps {
  label: string;
  options: FilterOption[];
  selected: string[];
  onChange: (selected: string[]) => void;
  multiSelect?: boolean;
  showClearAll?: boolean;
  className?: string;
}

interface FilterOption {
  id: string;
  label: string;
  count?: number;
}
```

**Example:**
```tsx
import { FilterChipGroup } from './components/FilterChipGroup';

const [selectedSkills, setSelectedSkills] = useState<string[]>([]);

<FilterChipGroup
  label="Skills"
  options={[
    { id: 'react', label: 'React', count: 12 },
    { id: 'typescript', label: 'TypeScript', count: 8 },
    { id: 'salesforce', label: 'Salesforce', count: 15 },
  ]}
  selected={selectedSkills}
  onChange={setSelectedSkills}
  multiSelect={true}
  showClearAll={true}
/>
```

**Accessibility:**
- ✅ role="checkbox" on filter chips
- ✅ aria-checked state management
- ✅ Keyboard navigation (Tab, Enter, Space)
- ✅ Screen reader announcements for filter changes
- ✅ Clear all button with descriptive label

**Replaces:** Duplicated filter UI in PortfolioFilters.tsx and other components

---

### SectionHeader

**Purpose:** Consistent section headers across all dashboard views

**Usage Locations:**
- All dashboard sections (Learner Home, Coach, Admin)
- Portfolio sections
- Projects Hub sections
- Community sections

**Props:**
```typescript
interface SectionHeaderProps {
  title: string;
  description?: string;
  icon?: LucideIcon;
  badge?: {
    label: string;
    variant?: 'default' | 'success' | 'warning' | 'info';
  };
  action?: {
    label: string;
    onClick: () => void;
    icon?: LucideIcon;
  };
  level?: 'h1' | 'h2' | 'h3' | 'h4';
  className?: string;
}
```

**Example:**
```tsx
import { SectionHeader } from './components/SectionHeader';
import { BookOpen, Plus } from 'lucide-react';

<SectionHeader
  title="Trail Missions"
  description="Complete learning paths to earn points and build skills"
  icon={BookOpen}
  badge={{ label: '3 Active', variant: 'success' }}
  action={{
    label: 'Browse Missions',
    onClick: () => navigate('/trail-missions'),
    icon: Plus
  }}
  level="h2"
/>
```

**Accessibility:**
- ✅ Semantic heading levels (h1-h4)
- ✅ Optional icon with aria-hidden
- ✅ Action button with focus-ring
- ✅ Badge with appropriate color contrast

---

### MetricBadge

**Purpose:** Compact metric indicators for points, badges, levels

**Usage Locations:**
- User profile headers
- Navigation (points display)
- Leaderboard entries
- Portfolio cards
- Community posts (author badges)

**Props:**
```typescript
interface MetricBadgeProps {
  label: string;
  icon?: LucideIcon;
  variant?: 'points' | 'level' | 'badge' | 'neutral' | 'success';
  size?: 'sm' | 'md' | 'lg';
  title?: string;
  className?: string;
}
```

**Example:**
```tsx
import { MetricBadge } from './components/MetricBadge';
import { Trophy, Award, Star } from 'lucide-react';

<MetricBadge 
  label="2,380" 
  icon={Trophy} 
  variant="points" 
  size="md"
  title="Total Points Earned"
/>

<MetricBadge 
  label="Level 4" 
  icon={Star} 
  variant="level" 
  size="sm"
/>

<MetricBadge 
  label="5 Badges" 
  icon={Award} 
  variant="badge" 
  size="md"
/>
```

**Accessibility:**
- ✅ role="status" for screen readers
- ✅ aria-label with full context
- ✅ Optional title attribute for tooltips
- ✅ High contrast color variants

---

## 🎨 Design Tokens Integration

All components use TTDS design tokens from `tailwind.config.js`:

### Color Classes
```tsx
// Brand Colors
bg-evergreen, text-evergreen, border-evergreen
bg-sun-amber, text-sun-amber, hover:bg-sun-amber-dark
bg-sky-blue, text-sky-blue
bg-trail-cream, text-trail-cream
bg-penny-guide, text-penny-guide, hover:bg-penny-guide-dark

// Semantic Colors
bg-success, text-success
bg-warning, text-warning
bg-error, text-error
bg-info, text-info
```

### Focus Ring Utilities
```tsx
// WCAG 2.1 AA Compliant Focus Indicators
className="focus-ring"              // Primary (evergreen)
className="focus-ring-amber"        // Amber variant
className="focus-ring-teal"         // Teal variant
className="focus-ring-blue"         // Blue variant
```

---

## ♿ Accessibility Features

All components include:

1. **Keyboard Navigation**
   - Tab to focus
   - Enter/Space to activate
   - Escape to close modals

2. **Screen Reader Support**
   - ARIA labels on all interactive elements
   - ARIA live regions for dynamic content
   - Semantic HTML structure

3. **Visual Indicators**
   - 2px focus rings (WCAG 2.1 AA)
   - High contrast colors (4.5:1 minimum)
   - 44×44px touch targets (mobile)

4. **Dark Mode**
   - All components support light/dark themes
   - Contrast verified in both modes

---

## 📋 Usage Guidelines

### Import Components

```tsx
// Named imports (preferred)
import { StatCard } from './components/StatCard';
import { EmptyState } from './components/EmptyState';
import { FilterChipGroup } from './components/FilterChipGroup';

// Default imports (also supported)
import StatCard from './components/StatCard';
```

### Combine Components

```tsx
import { SectionHeader } from './components/SectionHeader';
import { StatCard } from './components/StatCard';
import { EmptyState } from './components/EmptyState';
import { Trophy, Target, Calendar, TrendingUp } from 'lucide-react';

function Dashboard() {
  return (
    <div>
      {/* Section Header */}
      <SectionHeader
        title="Performance Metrics"
        description="Track your progress across all learning paths"
        icon={TrendingUp}
        action={{
          label: 'View Details',
          onClick: () => navigate('/analytics')
        }}
      />

      {/* Stat Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
        <StatCard
          icon={<Trophy className="w-6 h-6" />}
          label="Total Points"
          value="2,380"
          iconColor="amber"
          trend={{ direction: 'up', value: '+120' }}
        />
        
        <StatCard
          icon={<Target className="w-6 h-6" />}
          label="Completed"
          value="8/12"
          iconColor="success"
        />
        
        <StatCard
          icon={<Calendar className="w-6 h-6" />}
          label="This Week"
          value="3 sessions"
          iconColor="blue"
        />
      </div>

      {/* Empty State (conditional) */}
      {projects.length === 0 && (
        <EmptyState
          icon={FolderOpen}
          title="No projects yet"
          description="Get started by creating your first project"
          action={{
            label: 'Create Project',
            onClick: handleCreateProject
          }}
        />
      )}
    </div>
  );
}
```

---

## 🧪 Testing Checklist

Before deploying a component:

- [ ] TypeScript types defined and exported
- [ ] JSDoc documentation complete
- [ ] Props interface documented
- [ ] Usage examples provided
- [ ] ARIA labels on interactive elements
- [ ] Focus indicators visible (focus-ring)
- [ ] Keyboard navigation working
- [ ] Screen reader tested (NVDA/JAWS)
- [ ] Dark mode verified
- [ ] Mobile responsive
- [ ] Color contrast ≥ 4.5:1 (WCAG AA)

---

## 📊 Impact Summary

### Code Reduction

| Component | Lines Saved | Files Affected |
|-----------|-------------|----------------|
| StatCard | 200-300 | 4 dashboards |
| EmptyState | 100-150 | 8+ views |
| FilterChipGroup | 150-200 | 3 galleries |
| SectionHeader | 50-100 | 15+ sections |
| MetricBadge | 30-50 | 10+ locations |
| **TOTAL** | **530-800** | **40+** |

### Maintenance Benefits

- ✅ Single source of truth for common patterns
- ✅ Consistent styling across all pages
- ✅ Easy global updates (change once, apply everywhere)
- ✅ Reduced testing burden (test component once)
- ✅ Better documentation (centralized examples)

### Accessibility Improvements

- ✅ All components WCAG 2.1 AA compliant
- ✅ Consistent ARIA labeling
- ✅ Standardized keyboard navigation
- ✅ Screen reader friendly

---

## 🚀 Next Steps

### Phase 1: Refactor Existing Pages (Week 2)
- [ ] Refactor LearnerHome.tsx to use StatCard
- [ ] Refactor CoachDashboard.tsx to use StatCard
- [ ] Refactor AdminPanel.tsx to use StatCard
- [ ] Replace custom empty states with EmptyState component
- [ ] Replace custom filters with FilterChipGroup

### Phase 2: Expand Library (Week 3)
- [ ] Create `AlertBanner` component
- [ ] Create `LoadingState` component (skeleton screens)
- [ ] Create `PaginationControls` component
- [ ] Create `SearchBar` component
- [ ] Create `Breadcrumbs` component

### Phase 3: Documentation (Week 4)
- [ ] Create Storybook stories for each component
- [ ] Add interactive examples
- [ ] Create component playground
- [ ] Generate visual regression tests

---

## 📚 Related Documentation

- [TTDS Design System](./TTDS_DESIGN_SYSTEM.md)
- [TTDS Audit Report](./TTDS_AUDIT_REPORT.md)
- [Critical Issues Fixed](./CRITICAL_ISSUES_FIXED.md)
- [Quick Reference](./QUICK_REFERENCE.md)

---

## 🤝 Contributing

When creating new components:

1. Follow the component template structure (see existing components)
2. Include comprehensive JSDoc documentation
3. Add TypeScript types for all props
4. Provide usage examples
5. Test with keyboard and screen readers
6. Verify dark mode support
7. Update this documentation

---

**Last Updated:** November 8, 2025  
**Maintained By:** TTDS Design System Team

