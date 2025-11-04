# Contributing to Transition Trails

Thank you for your interest in contributing to Transition Trails! This document provides guidelines and instructions for contributing to the project.

## Table of Contents

1. [Code of Conduct](#code-of-conduct)
2. [Getting Started](#getting-started)
3. [Development Workflow](#development-workflow)
4. [Coding Standards](#coding-standards)
5. [Component Guidelines](#component-guidelines)
6. [Testing Requirements](#testing-requirements)
7. [Pull Request Process](#pull-request-process)
8. [Bug Reports](#bug-reports)
9. [Feature Requests](#feature-requests)

---

## Code of Conduct

### Our Pledge

We are committed to providing a welcoming and inclusive experience for everyone. We pledge to:

- Use welcoming and inclusive language
- Be respectful of differing viewpoints and experiences
- Gracefully accept constructive criticism
- Focus on what is best for the community
- Show empathy towards other community members

### Our Standards

**Positive behavior includes**:
- Demonstrating empathy and kindness
- Being respectful of differing opinions
- Giving and gracefully accepting constructive feedback
- Accepting responsibility and apologizing for mistakes
- Focusing on the community's best interests

**Unacceptable behavior includes**:
- Harassment, trolling, or derogatory comments
- Public or private harassment
- Publishing others' private information
- Other conduct which could reasonably be considered inappropriate

---

## Getting Started

### Prerequisites

- Node.js 18+ and npm/yarn
- Git
- Salesforce CLI (for deployment)
- Code editor (VS Code recommended)

### Initial Setup

1. **Fork the repository**:
   ```bash
   # Click "Fork" on GitHub, then clone your fork
   git clone https://github.com/YOUR_USERNAME/transition-trails.git
   cd transition-trails
   ```

2. **Add upstream remote**:
   ```bash
   git remote add upstream https://github.com/transition-trails/transition-trails.git
   ```

3. **Install dependencies**:
   ```bash
   npm install
   ```

4. **Create a branch**:
   ```bash
   git checkout -b feature/your-feature-name
   ```

5. **Start development server**:
   ```bash
   npm run dev
   ```

---

## Development Workflow

### Branch Naming

Use descriptive branch names with prefixes:

- `feature/` - New features (e.g., `feature/slack-notifications`)
- `fix/` - Bug fixes (e.g., `fix/login-error`)
- `docs/` - Documentation updates (e.g., `docs/api-guide`)
- `refactor/` - Code refactoring (e.g., `refactor/profile-component`)
- `test/` - Test additions/updates (e.g., `test/capstone-integration`)

### Commit Messages

Follow the [Conventional Commits](https://www.conventionalcommits.org/) specification:

```
<type>(<scope>): <subject>

<body>

<footer>
```

**Types**:
- `feat` - New feature
- `fix` - Bug fix
- `docs` - Documentation changes
- `style` - Formatting, missing semicolons, etc.
- `refactor` - Code restructuring
- `test` - Adding tests
- `chore` - Maintenance tasks

**Examples**:
```bash
feat(community): add Slack channel filtering

- Implement filter dropdown for channel list
- Add search functionality
- Update UI to show filter state

Closes #123
```

```bash
fix(profile): resolve LinkedIn OAuth token refresh issue

The token was not refreshing correctly when expired.
Added retry logic and better error handling.

Fixes #456
```

### Keeping Your Fork Updated

```bash
# Fetch upstream changes
git fetch upstream

# Merge upstream main into your branch
git checkout main
git merge upstream/main

# Push to your fork
git push origin main
```

---

## Coding Standards

### TypeScript/React

**Use functional components**:
```typescript
// Good
export function LearnerHome({ onNavigate }: LearnerHomeProps) {
  const [isOpen, setIsOpen] = useState(false);
  // ...
}

// Avoid
export class LearnerHome extends React.Component {
  // ...
}
```

**Use hooks for state management**:
```typescript
// Good
const [activeTab, setActiveTab] = useState('overview');

// Avoid complex state objects
const [state, setState] = useState({ activeTab: 'overview', isLoading: false, data: [] });
```

**Type everything**:
```typescript
// Good
interface Mission {
  id: number;
  title: string;
  status: 'locked' | 'available' | 'in-progress' | 'completed';
}

// Avoid
// const mission = { id: 1, title: 'Mission', status: 'available' };
```

**Use meaningful variable names**:
```typescript
// Good
const learnerProgress = calculateProgress(missions);
const isCapstoneComplete = checkCompletion(project);

// Avoid
const prog = calc(m);
const x = check(p);
```

### Component Structure

**Standard component layout**:
```typescript
// 1. Imports
import { useState } from 'react';
import { Button } from './ui/button';
import { PageType } from '../App';

// 2. Types/Interfaces
interface ComponentProps {
  onNavigate: (page: PageType) => void;
}

// 3. Component
export function Component({ onNavigate }: ComponentProps) {
  // 4. State
  const [isOpen, setIsOpen] = useState(false);
  
  // 5. Handlers
  const handleClick = () => {
    setIsOpen(!isOpen);
  };
  
  // 6. Effects (if needed)
  // useEffect(() => { ... }, []);
  
  // 7. Render
  return (
    <div>
      {/* JSX */}
    </div>
  );
}
```

### CSS/Tailwind

**Follow design system**:
```tsx
// Good - Use design tokens
<div className="bg-[#F5F3E8] text-[#2C6975]">

// Avoid - Custom colors
<div className="bg-gray-100 text-blue-600">
```

**Do NOT use typography classes** (unless specifically changing defaults):
```tsx
// Good - Let globals.css handle it
<h1>Title</h1>
<p>Body text</p>

// Avoid - Overriding default typography
<h1 className="text-2xl font-bold">Title</h1>
```

**Use responsive classes**:
```tsx
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
```

### File Organization

```
components/
├── ComponentName.tsx      # Main component
├── ui/                    # shadcn components only
│   ├── button.tsx
│   └── dialog.tsx
└── figma/                 # Figma-specific components (protected)
    └── ImageWithFallback.tsx
```

---

## Component Guidelines

### Creating New Components

1. **Use existing patterns**:
   - Review similar components
   - Follow established conventions
   - Reuse UI components from `/components/ui`

2. **Component checklist**:
   - [ ] TypeScript interfaces defined
   - [ ] Props properly typed
   - [ ] State management with hooks
   - [ ] Accessibility attributes (ARIA)
   - [ ] Keyboard navigation support
   - [ ] Responsive design
   - [ ] Error states handled
   - [ ] Loading states handled

3. **Example skeleton**:
```typescript
import { useState } from 'react';
import { ArrowLeft, Plus } from 'lucide-react';
import { PageType } from '../App';
import { Button } from './ui/button';
import { Badge } from './ui/badge';

interface NewComponentProps {
  onNavigate: (page: PageType) => void;
}

export function NewComponent({ onNavigate }: NewComponentProps) {
  const [items, setItems] = useState<Item[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  
  const handleAddItem = () => {
    // Implementation
  };
  
  if (isLoading) {
    return <div>Loading...</div>;
  }
  
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Back button */}
      <button 
        onClick={() => onNavigate('learner')}
        className="flex items-center space-x-2 text-[#2C6975] hover:underline mb-4"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Back to Home</span>
      </button>
      
      {/* Header */}
      <div className="mb-8">
        <h2 className="text-3xl text-gray-900 mb-2">Page Title</h2>
        <p className="text-gray-600">Page description</p>
      </div>
      
      {/* Content */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        {/* Component content */}
      </div>
    </div>
  );
}
```

### Using shadcn Components

Import from `/components/ui`:
```typescript
import { Button } from './ui/button';
import { Dialog, DialogContent, DialogHeader } from './ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
```

**Do NOT**:
- Modify existing shadcn components
- Create custom versions of shadcn components
- Add new files to `/components/ui` (it's for shadcn only)

### Icons

Use Lucide React:
```typescript
import { Mail, User, Settings, Bell } from 'lucide-react';

<Mail className="w-4 h-4 text-gray-500" />
```

### Images

Use ImageWithFallback component:
```typescript
import { ImageWithFallback } from './figma/ImageWithFallback';

<ImageWithFallback 
  src="https://example.com/image.jpg" 
  alt="Description"
  className="w-full h-auto"
/>
```

---

## Testing Requirements

### Unit Tests

All new components should have basic tests:

```typescript
import { render, screen, fireEvent } from '@testing-library/react';
import { Component } from './Component';

describe('Component', () => {
  it('renders correctly', () => {
    render(<Component onNavigate={jest.fn()} />);
    expect(screen.getByText('Expected Text')).toBeInTheDocument();
  });
  
  it('handles click events', () => {
    const handleNavigate = jest.fn();
    render(<Component onNavigate={handleNavigate} />);
    
    fireEvent.click(screen.getByText('Button'));
    expect(handleNavigate).toHaveBeenCalledWith('expected-page');
  });
});
```

### Accessibility Tests

Check for accessibility issues:
```typescript
import { axe, toHaveNoViolations } from 'jest-axe';

expect.extend(toHaveNoViolations);

it('should have no accessibility violations', async () => {
  const { container } = render(<Component onNavigate={jest.fn()} />);
  const results = await axe(container);
  expect(results).toHaveNoViolations();
});
```

### Manual Testing Checklist

Before submitting PR:
- [ ] Component renders correctly
- [ ] Responsive design works (mobile, tablet, desktop)
- [ ] Keyboard navigation functions
- [ ] Screen reader announces correctly
- [ ] Loading states display properly
- [ ] Error states handled gracefully
- [ ] Navigation works as expected
- [ ] No console errors or warnings

---

## Pull Request Process

### Before Submitting

1. **Update from main**:
   ```bash
   git fetch upstream
   git rebase upstream/main
   ```

2. **Run tests**:
   ```bash
   npm test
   npm run lint
   ```

3. **Build check**:
   ```bash
   npm run build
   ```

4. **Review changes**:
   ```bash
   git diff main
   ```

### PR Template

When creating a PR, use this template:

```markdown
## Description
Brief description of changes

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Breaking change
- [ ] Documentation update

## Related Issues
Closes #123
Relates to #456

## Changes Made
- Added X feature
- Fixed Y bug
- Updated Z documentation

## Testing
- [ ] Unit tests pass
- [ ] Manual testing completed
- [ ] Accessibility checked
- [ ] Responsive design verified

## Screenshots (if applicable)
Before: [screenshot]
After: [screenshot]

## Checklist
- [ ] Code follows project style guidelines
- [ ] Self-review completed
- [ ] Comments added for complex code
- [ ] Documentation updated
- [ ] No new warnings generated
```

### Review Process

1. Automated checks run (tests, linting, build)
2. Code review by maintainer(s)
3. Address feedback with new commits
4. Approval required before merge
5. Squash and merge to main

### After Merge

1. Delete your feature branch:
   ```bash
   git branch -d feature/your-feature
   git push origin --delete feature/your-feature
   ```

2. Update your fork:
   ```bash
   git checkout main
   git pull upstream main
   git push origin main
   ```

---

## Bug Reports

### Before Reporting

1. Check existing issues
2. Verify it's reproducible
3. Test on latest version

### Bug Report Template

```markdown
**Bug Description**
Clear description of the bug

**To Reproduce**
Steps to reproduce:
1. Go to '...'
2. Click on '...'
3. Scroll down to '...'
4. See error

**Expected Behavior**
What you expected to happen

**Screenshots**
If applicable, add screenshots

**Environment**
- Browser: [e.g., Chrome 98]
- OS: [e.g., macOS 12.2]
- Version: [e.g., 1.0.0]

**Additional Context**
Any other relevant information
```

---

## Feature Requests

### Proposal Template

```markdown
**Feature Summary**
Brief description of the feature

**Problem Statement**
What problem does this solve?

**Proposed Solution**
How should it work?

**Alternatives Considered**
What other approaches did you consider?

**User Impact**
Who benefits and how?

**Technical Considerations**
Any implementation notes or concerns?
```

---

## Questions?

- **Documentation**: Check [README.md](./README.md), [FEATURES.md](./FEATURES.md)
- **Technical Questions**: Open a discussion on GitHub
- **Security Issues**: Email security@transitiontrails.org (do not create public issue)
- **General Questions**: Join our [Slack Community](https://transitiontrails.slack.com)

---

## Recognition

Contributors will be:
- Listed in [CONTRIBUTORS.md](./CONTRIBUTORS.md)
- Mentioned in release notes
- Recognized in our community Slack

Thank you for contributing to Transition Trails! Together we're helping career changers achieve their dreams. 🚀

---

**Last Updated**: November 4, 2025
**Version**: 1.0.0
