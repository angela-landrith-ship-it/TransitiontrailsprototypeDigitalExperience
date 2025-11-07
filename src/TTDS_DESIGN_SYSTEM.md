# Transition Trails Design System (TTDS)

**Version:** 1.0.0  
**Date:** November 7, 2025  
**Platform:** Salesforce Experience Cloud (LWR)  
**Mode:** Light Theme (Dark theme ready)  
**Design Philosophy:** Declarative-first, CMS-integrated, WCAG 2.1 AA compliant

---

## 🎯 Design System Overview

The Transition Trails Design System (TTDS) is a comprehensive component library designed to mirror Salesforce Experience Builder's flexibility while providing a cohesive, branded experience across the entire platform. Every component is built with CMS integration, accessibility, and declarative configuration in mind.

### Core Principles

1. **Declarative-First** - Components configurable via props, no code changes needed
2. **CMS-Integrated** - All content pulled from Salesforce CMS where possible
3. **Accessible** - WCAG 2.1 AA compliant with keyboard and screen reader support
4. **Responsive** - Mobile-first design with defined breakpoints
5. **Consistent** - Unified visual language across all components
6. **Extensible** - Easy to add variants and new components

---

## 🎨 1. Global Foundation

### Color Palette

#### Primary Colors

| Token | Hex | RGB | Usage |
|-------|-----|-----|-------|
| `--color-evergreen` | `#2F6B4E` | `47, 107, 78` | Primary actions, main CTA, success states |
| `--color-summit-teal` | `#254C59` | `37, 76, 89` | Secondary accent, coach mode, depth |
| `--color-sky-blue` | `#5B89A6` | `91, 137, 166` | Learning content, informational |
| `--color-trail-cream` | `#F2EAD3` | `242, 234, 211` | Background, card surfaces |
| `--color-sun-amber` | `#F59E33` | `245, 158, 51` | Attention, points, gamification |
| `--color-neutral-gray` | `#ECECEC` | `236, 236, 236` | Borders, dividers, disabled states |

#### Semantic Colors

| Token | Value | Usage |
|-------|-------|-------|
| `--color-primary` | `var(--color-evergreen)` | Primary buttons, links |
| `--color-accent` | `var(--color-sun-amber)` | Points, badges, highlights |
| `--color-surface` | `var(--color-trail-cream)` | Card backgrounds |
| `--color-success` | `#3B6A52` | Success messages, completed states |
| `--color-warning` | `#F59E33` | Warnings, pending actions |
| `--color-error` | `#D32F2F` | Error states, validation |
| `--color-info` | `#5B89A6` | Informational messages |

#### Neutral Palette

| Token | Hex | Usage |
|-------|-----|-------|
| `--color-gray-50` | `#FAFAFA` | Lightest background |
| `--color-gray-100` | `#F5F5F5` | Hover backgrounds |
| `--color-gray-200` | `#EEEEEE` | Borders |
| `--color-gray-300` | `#E0E0E0` | Dividers |
| `--color-gray-400` | `#BDBDBD` | Disabled text |
| `--color-gray-500` | `#9E9E9E` | Secondary text |
| `--color-gray-600` | `#757575` | Body text |
| `--color-gray-700` | `#616161` | Headings |
| `--color-gray-800` | `#424242` | Primary text |
| `--color-gray-900` | `#212121` | Maximum contrast |

#### Penny AI Mode Colors

| Mode | Color | Hex | Usage |
|------|-------|-----|-------|
| Guide | Teal | `#2C6975` | Mentor tone, learning guidance |
| Assistant | Amber | `#F9A03F` | Coordinator tone, task management |
| Career | Evergreen | `#3B6A52` | Coach tone, career development |
| TrailBuild | Blue-Amber | `linear-gradient(135deg, #5B89A6, #F9A03F)` | Event coordination |

### Typography

**Font Family:** Inter (Salesforce-compatible)

| Element | Size | Weight | Line Height | Letter Spacing | Usage |
|---------|------|--------|-------------|----------------|-------|
| `--font-h1` | 48px | Bold (700) | 120% (57.6px) | -0.02em | Page titles |
| `--font-h2` | 36px | SemiBold (600) | 125% (45px) | -0.01em | Section headers |
| `--font-h3` | 28px | SemiBold (600) | 130% (36.4px) | 0 | Card titles |
| `--font-h4` | 22px | Medium (500) | 135% (29.7px) | 0 | Subsection headers |
| `--font-body` | 18px | Regular (400) | 160% (28.8px) | 0 | Body text |
| `--font-body-sm` | 16px | Regular (400) | 150% (24px) | 0 | Secondary text |
| `--font-label` | 14px | Medium (500) | 140% (19.6px) | 0.01em | Form labels, metadata |
| `--font-caption` | 12px | Regular (400) | 140% (16.8px) | 0.02em | Captions, helper text |
| `--font-button` | 16px | SemiBold (600) | 100% | 0.05em | Button text (uppercase) |

**Mobile Adjustments:**
- H1: 36px (mobile)
- H2: 28px (mobile)
- Body: 16px (mobile)

### Spacing Scale

**Base Unit:** 8px

| Token | Value | Usage |
|-------|-------|-------|
| `--space-1` | 4px | Tight spacing |
| `--space-2` | 8px | Base unit |
| `--space-3` | 12px | Small gaps |
| `--space-4` | 16px | Default gaps |
| `--space-5` | 24px | Medium spacing |
| `--space-6` | 32px | Large spacing |
| `--space-8` | 48px | Section spacing |
| `--space-10` | 64px | Page spacing |
| `--space-12` | 80px | Desktop margins |

### Grid System

**12-Column Grid**

| Breakpoint | Container Width | Margins | Gutters | Columns |
|------------|----------------|---------|---------|---------|
| Mobile (375px) | 100% | 16px | 16px | 4 |
| Tablet (768px) | 100% | 40px | 24px | 8 |
| Desktop (1024px) | 100% | 80px | 32px | 12 |
| Wide (1440px) | 1280px | auto | 32px | 12 |

### Elevation (Shadows)

| Level | Shadow | Usage |
|-------|--------|-------|
| `--shadow-sm` | `0 1px 2px rgba(0,0,0,0.05)` | Subtle depth |
| `--shadow-md` | `0 4px 6px rgba(0,0,0,0.07)` | Cards, buttons |
| `--shadow-lg` | `0 10px 15px rgba(0,0,0,0.1)` | Modals, dropdowns |
| `--shadow-xl` | `0 20px 25px rgba(0,0,0,0.15)` | Floating elements |

### Border Radius

| Token | Value | Usage |
|-------|-------|-------|
| `--radius-sm` | 4px | Badges, pills |
| `--radius-md` | 8px | Inputs, buttons |
| `--radius-lg` | 12px | Cards |
| `--radius-xl` | 16px | Large containers |
| `--radius-full` | 9999px | Circles, avatars |

### Transitions

| Property | Duration | Easing | Usage |
|----------|----------|--------|-------|
| `--transition-fast` | 150ms | ease-in-out | Hover states |
| `--transition-base` | 200ms | ease-in-out | Standard interactions |
| `--transition-slow` | 300ms | ease-in-out | Complex animations |

---

## 🧩 2. Navigation & Layout Components

### 2.1 Header Component

**Purpose:** Global navigation with audience-based menu items

**Variants:**
- Visitor (unauthenticated)
- Learner (authenticated student)
- Coach (mentor/instructor)
- Partner (nonprofit organization)
- Sponsor (corporate partner)
- Admin (platform administrator)

**Props:**
```typescript
interface HeaderProps {
  variant: 'visitor' | 'learner' | 'coach' | 'partner' | 'sponsor' | 'admin';
  logoUrl?: string; // CMS: header_logo_url
  sticky?: boolean; // Default: true
  showSearch?: boolean; // Default: true for authenticated
  showNotifications?: boolean; // Default: true for authenticated
  showPointsBadge?: boolean; // Default: true for learner
  currentPoints?: number; // From Salesforce
  userName?: string; // From User.Name
  userAvatar?: string; // From User.SmallPhotoUrl
}
```

**CMS Bindings:**
- `[CMS:header_logo_alt_text]`
- `[CMS:nav_menu_{variant}_home_label]`
- `[CMS:nav_search_placeholder]`
- `[CMS:nav_notifications_empty_message]`

**Salesforce Mapping:**
- Logo: `Experience_Cloud_Settings__mdt.Logo_URL__c`
- Menu Items: `Navigation_Item__c` records filtered by `Audience__c`
- Points: `Points_Ledger__c.Available_Points__c`

### 2.2 Footer Component

**Purpose:** Global footer with quick links and contact info

**Props:**
```typescript
interface FooterProps {
  contactEmail?: string; // CMS: footer_contact_email
  socialLinks?: SocialLink[]; // CMS: footer_social_links
  quickLinks?: QuickLink[]; // CMS: footer_quick_links
  copyrightText?: string; // CMS: footer_copyright
  showNewsletter?: boolean; // Default: true
}
```

**CMS Bindings:**
- `[CMS:footer_tagline]`
- `[CMS:footer_newsletter_cta]`
- `[CMS:footer_contact_title]`

### 2.3 Sidebar Component

**Purpose:** Dashboard sidebar with dynamic navigation

**Variants:**
- Learner Dashboard
- Coach Dashboard
- Partner Dashboard
- Admin Dashboard

**Props:**
```typescript
interface SidebarProps {
  variant: 'learner' | 'coach' | 'partner' | 'admin';
  currentPath: string;
  showPointsWidget?: boolean; // Default: true for learner
  collapsed?: boolean; // Default: false
}
```

**Features:**
- Collapsible on mobile
- Points widget (learner only)
- Active state highlighting
- Smooth expand/collapse animation

### 2.4 Breadcrumbs Component

**Purpose:** Hierarchical navigation indicator

**Props:**
```typescript
interface BreadcrumbsProps {
  items: BreadcrumbItem[];
  showHome?: boolean; // Default: true
  separator?: 'chevron' | 'slash' | 'arrow'; // Default: chevron
}

interface BreadcrumbItem {
  label: string;
  href?: string;
  icon?: LucideIcon;
}
```

---

## 💬 3. Interaction Components

### 3.1 Button Component

**Variants:**
- Primary (Evergreen background, white text)
- Secondary (White background, Evergreen border)
- Accent (Amber background, white text)
- Ghost (Transparent, text only)
- Link (Underlined text)

**Sizes:**
- Small (32px height)
- Medium (40px height) - Default
- Large (48px height)

**States:**
- Default
- Hover (10% darker)
- Focus (ring outline)
- Active (pressed)
- Disabled (50% opacity)
- Loading (spinner + disabled)

**Props:**
```typescript
interface ButtonProps {
  variant: 'primary' | 'secondary' | 'accent' | 'ghost' | 'link';
  size: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
  isDisabled?: boolean;
  fullWidth?: boolean;
  leftIcon?: LucideIcon;
  rightIcon?: LucideIcon;
  onClick?: () => void;
  children: React.ReactNode;
}
```

**Accessibility:**
- ✅ Keyboard focusable
- ✅ ARIA labels for loading state
- ✅ Focus visible indicator
- ✅ Disabled cursor change

### 3.2 Form Components

#### Input Field

**Variants:**
- Text
- Email
- Password
- Number
- Search
- URL

**States:**
- Default (Gray border)
- Focus (Amber border)
- Error (Red border)
- Disabled (Gray background)
- Success (Green border)

**Props:**
```typescript
interface InputProps {
  type: 'text' | 'email' | 'password' | 'number' | 'search' | 'url';
  label?: string; // CMS-bindable
  placeholder?: string; // CMS-bindable
  value: string;
  onChange: (value: string) => void;
  error?: string;
  helpText?: string;
  required?: boolean;
  disabled?: boolean;
  leftIcon?: LucideIcon;
  rightIcon?: LucideIcon;
}
```

#### Select Field

**Props:**
```typescript
interface SelectProps {
  label?: string; // CMS-bindable
  options: SelectOption[];
  value: string;
  onChange: (value: string) => void;
  error?: string;
  placeholder?: string; // CMS-bindable
  required?: boolean;
  disabled?: boolean;
}
```

#### TextArea

**Props:**
```typescript
interface TextAreaProps {
  label?: string; // CMS-bindable
  placeholder?: string; // CMS-bindable
  value: string;
  onChange: (value: string) => void;
  rows?: number; // Default: 4
  maxLength?: number;
  error?: string;
  helpText?: string;
  required?: boolean;
  disabled?: boolean;
}
```

### 3.3 Modal Component

**Variants:**
- Standard (Default)
- Confirmation (Yes/No actions)
- Form (Contains form elements)
- CMS Content (Pull content from CMS)

**Sizes:**
- Small (400px)
- Medium (600px) - Default
- Large (800px)
- Full (90% viewport)

**Props:**
```typescript
interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string; // CMS-bindable
  description?: string; // CMS-bindable
  size: 'sm' | 'md' | 'lg' | 'full';
  variant: 'standard' | 'confirmation' | 'form' | 'cms';
  showCloseButton?: boolean; // Default: true
  closeOnOverlayClick?: boolean; // Default: true
  children: React.ReactNode;
  footer?: React.ReactNode;
}
```

**Features:**
- Amber accent top border
- Shadow depth 4 (`--shadow-xl`)
- Backdrop blur
- Focus trap
- ESC key to close

### 3.4 Toggle Components

#### Role Toggle

**Purpose:** Developer/admin tool to switch between audience views

**Props:**
```typescript
interface RoleToggleProps {
  currentRole: 'visitor' | 'learner' | 'coach' | 'partner' | 'sponsor' | 'admin';
  onChange: (role: string) => void;
  showInProduction?: boolean; // Default: false
}
```

#### Layout Toggle

**Purpose:** Switch between grid and list views

**Props:**
```typescript
interface LayoutToggleProps {
  currentLayout: 'grid' | 'list';
  onChange: (layout: string) => void;
}
```

#### Theme Toggle

**Purpose:** Placeholder for future dark mode

**Props:**
```typescript
interface ThemeToggleProps {
  currentTheme: 'light' | 'dark';
  onChange: (theme: string) => void;
  disabled?: boolean; // Default: true (not yet implemented)
}
```

---

## 🏕️ 4. Content & Media Components

### 4.1 Hero Section

**Variants:**
- With CTA
- Without CTA
- Background Video (placeholder)
- Background Image (CMS)

**Props:**
```typescript
interface HeroProps {
  variant: 'with-cta' | 'without-cta' | 'video' | 'image';
  title: string; // CMS-bindable: [CMS:hero_title]
  subtitle?: string; // CMS-bindable: [CMS:hero_subtitle]
  backgroundImage?: string; // CMS-bindable: [CMS:hero_bg_image]
  backgroundVideo?: string; // Future
  ctaText?: string; // CMS-bindable: [CMS:hero_cta_text]
  ctaAction?: () => void;
  ctaSecondaryText?: string; // CMS-bindable
  ctaSecondaryAction?: () => void;
  height?: 'sm' | 'md' | 'lg' | 'full'; // Default: md
  overlay?: boolean; // Dark overlay for readability
}
```

**Accessibility:**
- ✅ Alt text for background images
- ✅ Sufficient contrast on overlays
- ✅ Focus management for CTAs

### 4.2 Card Components

#### Default Card

**Purpose:** General purpose content card

**Props:**
```typescript
interface CardProps {
  image?: string; // CMS-bindable
  imageAlt?: string; // CMS-bindable
  title: string; // CMS-bindable
  description: string; // CMS-bindable
  ctaText?: string; // CMS-bindable
  ctaAction?: () => void;
  badge?: string; // Optional badge text
  badgeVariant?: 'success' | 'warning' | 'info' | 'amber';
  hoverLift?: boolean; // Default: true
  footer?: React.ReactNode;
}
```

**Salesforce Annotation:**
```html
<div data-source="CMS" data-cms-key="[CMS:card_content]">
```

#### Info Card

**Purpose:** Card without image, text-focused

**Props:**
```typescript
interface InfoCardProps {
  icon?: LucideIcon;
  iconColor?: string;
  title: string; // CMS-bindable
  description: string; // CMS-bindable
  ctaText?: string;
  ctaAction?: () => void;
  variant?: 'default' | 'accent' | 'success';
}
```

#### Partner Card

**Purpose:** Display partner organization summary

**Props:**
```typescript
interface PartnerCardProps {
  logo: string; // Partner__c.Logo_URL__c
  logoAlt: string; // Partner__c.Name
  name: string; // Partner__c.Name
  industry: string; // Partner__c.Industry__c
  summary: string; // Partner__c.Summary__c (first 150 chars)
  projectCount?: number; // Count of active projects
  ctaText?: string; // CMS: partner_card_cta
  ctaAction?: () => void;
}
```

**Salesforce Mapping:**
- Query: `Partner_Organization__c`
- Fields: Name, Logo_URL__c, Industry__c, Summary__c
- Related: Count of `Partner_Project__c` where `Status__c = 'Active'`

#### Job Card

**Purpose:** Job board posting card

**Props:**
```typescript
interface JobCardProps {
  title: string; // Job_Posting__c.Title__c
  organization: string; // Job_Posting__c.Partner__r.Name
  location: string; // Job_Posting__c.Location__c
  type: 'Full-time' | 'Part-time' | 'Contract' | 'Volunteer'; // Job_Posting__c.Type__c
  skills: string[]; // Job_Posting__c.Required_Skills__c (multi-select)
  featured?: boolean; // Job_Posting__c.Featured__c
  applyAction?: () => void;
}
```

**Featured Variant:**
- Amber border (`border-2 border-sun-amber`)
- "Featured" badge

#### Project Card

**Purpose:** Partner project listing

**Props:**
```typescript
interface ProjectCardProps {
  title: string; // Partner_Project__c.Name
  partner: string; // Partner_Project__c.Partner__r.Name
  partnerLogo?: string; // Partner_Project__c.Partner__r.Logo_URL__c
  description: string; // Partner_Project__c.Description__c
  skills: string[]; // Partner_Project__c.Required_Skills__c
  teamSize: number; // Partner_Project__c.Team_Size__c
  spotsAvailable: number; // Calculated from Project_Team__c
  duration: number; // Partner_Project__c.Duration_Weeks__c
  locked?: boolean; // Based on user's capstone completion
  joinAction?: () => void;
}
```

#### Trail Card

**Purpose:** Learning trail/course card

**Props:**
```typescript
interface TrailCardProps {
  icon: LucideIcon; // Course icon
  iconColor: string; // Brand color
  title: string; // Trail__c.Name or CMS
  highlights: string[]; // Key learning outcomes
  duration?: string; // "12 weeks", "8 hours", etc.
  ctaText?: string; // CMS: trail_card_cta
  ctaAction?: () => void;
  progress?: number; // 0-100, if user enrolled
}
```

**All Cards Include:**
- ✅ Hover lift effect (transform: translateY(-4px))
- ✅ CMS data bindings
- ✅ Figma annotation: `data-source="CMS"`
- ✅ Responsive layout (full width mobile, grid desktop)

---

## 🧭 5. Learning & Projects Components

### 5.1 Course Card

**Purpose:** Individual course/module display

**Props:**
```typescript
interface CourseCardProps {
  image: string; // Trail_Module__c.Image_URL__c or CMS
  title: string; // Trail_Module__c.Name
  description: string; // Trail_Module__c.Description__c
  progress?: number; // Module_Completion__c.Progress_Percentage__c
  status: 'not-started' | 'in-progress' | 'completed'; // Calculated
  ctaText: string; // "Start" or "Continue" based on status
  ctaAction: () => void;
  duration?: string; // Trail_Module__c.Estimated_Hours__c
  points?: number; // Trail_Module__c.Points_Value__c
}
```

**Features:**
- Progress bar at bottom (if in-progress)
- Checkmark icon (if completed)
- Points badge (top-right)

### 5.2 Trail Progress Meter

**Purpose:** Circular progress indicator with points

**Variants:**
- Circular (default)
- Linear (alternative)

**Props:**
```typescript
interface TrailProgressMeterProps {
  variant: 'circular' | 'linear';
  progress: number; // 0-100
  points: number; // Current points earned
  totalPoints: number; // Max points possible
  size?: 'sm' | 'md' | 'lg'; // Circular only
  showLabel?: boolean; // Default: true
  animated?: boolean; // Default: true (1.5s animation)
}
```

**Animation:**
- Circular: SVG stroke-dashoffset animation
- Linear: Width transition
- Duration: 1.5s ease-in-out

### 5.3 Project Workspace Frame

**Purpose:** Header for project workspace view

**Props:**
```typescript
interface ProjectWorkspaceFrameProps {
  title: string; // Project__c.Name
  status: 'planning' | 'active' | 'review' | 'completed'; // Project__c.Status__c
  teamAvatars: TeamMember[]; // Project_Team__c records
  slackChannelUrl?: string; // Project__c.Slack_Channel_URL__c
  githubRepoUrl?: string; // Project__c.Repo_Link__c
  progressPercentage: number; // Project__c.Progress_Percentage__c
  currentPhase?: string; // Project__c.Current_Phase__c
}

interface TeamMember {
  name: string;
  avatar: string;
  role: 'leader' | 'member';
}
```

**Features:**
- Status bar with phase indicators
- Team avatar group (max 5, +N for overflow)
- Quick links to Slack and GitHub
- Progress percentage

### 5.4 Partner Submission Modal

**Purpose:** Form for submitting partner project proposals

**Props:**
```typescript
interface PartnerSubmissionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: PartnerSubmissionData) => void;
}

interface PartnerSubmissionData {
  organizationName: string;
  contactName: string;
  contactEmail: string;
  projectTitle: string;
  projectDescription: string; // Rich text
  desiredOutcome: string;
  timeline: string;
  budget?: string;
  logoUpload?: File; // CMS image upload
}
```

**CMS Integrations:**
- Form labels from CMS
- Field help text from CMS
- Success message from CMS

### 5.5 Generate PDF Button

**Purpose:** Export project summary to branded PDF

**States:**
- Default ("Generate PDF")
- Generating (spinner + "Generating...")
- Success (checkmark + "PDF Ready!")
- Error (alert icon + "Failed")

**Props:**
```typescript
interface GeneratePDFButtonProps {
  projectId: string; // Project__c.Id
  projectName: string; // Project__c.Name
  variant?: 'default' | 'outline'; // Default: outline
  onGenerate?: () => void; // Optional callback
  onSuccess?: (pdfUrl: string) => void;
  onError?: (error: string) => void;
}
```

**Salesforce Flow:**
```
[Flow:Generate_Branded_PDF]
1. Trigger Visualforce PDF render
2. Save to ContentVersion
3. Create ContentDocumentLink to Project__c
4. Update Project__c.Latest_PDF_URL__c
5. Return download URL
```

---

## 🧠 6. Penny AI Components

### 6.1 Penny Floating Widget

**Position:** Bottom-right corner (fixed)

**Modes:**
- Guide Mode (Teal ring, mentor tone)
- Assistant Mode (Amber ring, coordinator tone)
- Career Mode (Evergreen ring, coach tone)
- TrailBuild Mode (Blue-Amber gradient, event tone)

**Props:**
```typescript
interface PennyFloatingWidgetProps {
  mode: 'guide' | 'assistant' | 'career' | 'trailbuild';
  defaultOpen?: boolean; // Default: false
  showUnreadBadge?: boolean; // Red dot for new messages
  position?: 'bottom-right' | 'bottom-left'; // Default: bottom-right
}
```

**Features:**
- Click to expand chat
- Mode ring color animation (pulsing)
- Unread badge (if new AI suggestions)
- Smooth slide-in animation (200ms)

### 6.2 Penny Message Bubble

**Purpose:** Display AI message with contextual prompts

**Props:**
```typescript
interface PennyMessageBubbleProps {
  mode: 'guide' | 'assistant' | 'career' | 'trailbuild';
  message: string; // AI-generated or CMS
  prompts?: PennyPrompt[]; // Quick action buttons
  timestamp?: Date;
  avatarSize?: 'sm' | 'md'; // Default: sm
}

interface PennyPrompt {
  text: string; // CMS-bindable
  action: () => void;
  icon?: LucideIcon;
}
```

**Sample Prompts (per mode):**

**Guide Mode:**
- "Explain this concept"
- "Show example"
- "Practice quiz"

**Assistant Mode:**
- "Add to task list"
- "Schedule reminder"
- "View full plan"

**Career Mode:**
- "Update my resume"
- "Find similar roles"
- "Prepare for interview"

**TrailBuild Mode:**
- "View event schedule"
- "Join a team"
- "Check in progress"

### 6.3 Penny Interaction Pop-in

**Purpose:** Contextual inline guidance (appears above cards/modals)

**Props:**
```typescript
interface PennyPopInProps {
  message: string; // AI-generated or CMS
  ctaButtons: PennyPopInCTA[];
  dismissible?: boolean; // Default: true
  variant?: 'info' | 'suggestion' | 'warning'; // Default: info
}

interface PennyPopInCTA {
  text: string; // "Show More", "Summarize", "Generate PDF"
  action: () => void;
  variant: 'primary' | 'secondary';
}
```

**Animation:**
- Fade in (200ms)
- Slide down from top (150ms)
- Auto-dismiss after 10s (if dismissible)

**Integration Annotation:**
```html
<div data-ai-context="[AI:context_tag]">
  <!-- AI uses context_tag to determine relevant guidance -->
</div>
```

---

## 🏆 7. Gamification Components

### 7.1 Badge Component

**Purpose:** Display earned and locked badges

**Badge Types:**
- Trail Contributor
- Trail Leader
- Client Hero
- TrailBuilder
- Community Champion
- Code Warrior

**States:**
- Locked (grayscale, lock icon)
- Unlocked (full color)
- Earned (full color + amber glow)
- Just Earned (full color + amber glow + confetti animation)

**Props:**
```typescript
interface BadgeComponentProps {
  badgeId: string; // Badge_Definition__c.Id
  name: string; // Badge_Definition__c.Name
  description: string; // Badge_Definition__c.Description__c
  icon: LucideIcon; // Badge_Definition__c.Icon_Name__c
  iconColor: string; // Badge_Definition__c.Icon_Color__c
  state: 'locked' | 'unlocked' | 'earned' | 'just-earned';
  earnedDate?: Date; // Badge_Award__c.Award_Date__c
  tier?: 'bronze' | 'silver' | 'gold'; // Badge_Definition__c.Tier__c
  showDescription?: boolean; // Default: hover only
}
```

**Features:**
- Amber glow for earned state (box-shadow animation)
- Confetti animation for just-earned (using canvas or CSS)
- Tooltip with description on hover
- Tier indicator (bronze/silver/gold ribbon)

### 7.2 Leaderboard Component

**Purpose:** Display top performers

**Variants:**
- Global (all learners)
- Cohort (filtered by cohort)
- Challenge (specific event/challenge)

**Time Filters:**
- This Week
- This Month
- All Time

**Props:**
```typescript
interface LeaderboardProps {
  variant: 'global' | 'cohort' | 'challenge';
  timeFilter: 'week' | 'month' | 'all-time';
  entries: LeaderboardEntry[];
  currentUserRank?: number; // Highlight current user
  showTop?: number; // Default: 10
}

interface LeaderboardEntry {
  rank: number;
  userId: string;
  name: string;
  avatar: string;
  points: number;
  badgeCount?: number;
  cohort?: string;
}
```

**Features:**
- Crown icon for #1
- Amber highlight for top 3
- User summary on hover (tooltip)
- Infinite scroll for full leaderboard

### 7.3 Points Meter

**Variants:**
- Circular (ring)
- Linear (bar)

**Props:**
```typescript
interface PointsMeterProps {
  variant: 'circular' | 'linear';
  currentPoints: number; // Points_Ledger__c.Available_Points__c
  goalPoints?: number; // Optional goal/milestone
  label?: string; // CMS-bindable
  size?: 'sm' | 'md' | 'lg'; // Circular only
  showAnimation?: boolean; // Default: true
  animationDuration?: number; // Default: 1500ms
}
```

**Animation:**
- Amber fill animation (fill from 0 to current)
- Easing: ease-in-out
- Duration: 1.5s

---

## 🎯 8. Commerce Components

### 8.1 Merch Card

**Purpose:** Product listing for Trail Shop

**Props:**
```typescript
interface MerchCardProps {
  productId: string; // Product__c.Id
  image: string; // Product__c.Image_URL__c
  name: string; // Product__c.Name
  description: string; // Product__c.Description__c
  priceUSD: number; // Product__c.Price__c
  pricePoints: number; // Product__c.Points_Price__c
  discountPercent?: number; // Product__c.Discount_Percentage__c
  stockStatus: 'in-stock' | 'limited' | 'out-of-stock'; // Product__c.Stock_Status__c
  featured?: boolean; // Product__c.Featured__c
  tags?: string[]; // ["TrailBuild Exclusive", "Popular", "New"]
  onView?: () => void;
  onAddToCart?: () => void;
}
```

**Features:**
- Points redemption slider
- Discount badge (if applicable)
- "TrailBuild Exclusive" tag variant (Amber)
- Stock status indicator
- Quick add to cart

### 8.2 Checkout Modal

**Purpose:** Complete purchase flow

**Props:**
```typescript
interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  pointsBalance: number; // Points_Ledger__c.Available_Points__c
  onCheckout: (data: CheckoutData) => void;
}

interface CartItem {
  productId: string;
  name: string;
  image: string;
  priceUSD: number;
  pricePoints: number;
  quantity: number;
  pointsToRedeem: number; // User-selected
}

interface CheckoutData {
  items: CartItem[];
  totalPoints: number;
  totalUSD: number;
  paymentMethod: 'stripe' | 'points' | 'hybrid';
  stripeSessionId?: string;
}
```

**Features:**
- Product summary table
- Points redemption slider (per item)
- Stripe logo (bottom-right, 60% opacity)
- Payment confirmation state
- Order summary

### 8.3 Order Confirmation Modal

**Purpose:** Post-purchase success message

**Props:**
```typescript
interface OrderConfirmationProps {
  isOpen: boolean;
  onClose: () => void;
  orderNumber: string; // Order__c.Order_Number__c
  orderDate: Date; // Order__c.Order_Date__c
  items: OrderItem[];
  pointsSpent: number;
  amountPaidUSD: number;
  estimatedDelivery?: Date;
}
```

**CMS Bindings:**
- `[CMS:order_confirmation_title]` - "Order Confirmed!"
- `[CMS:order_confirmation_message]` - Thank you message
- `[CMS:order_delivery_message]` - Delivery timeline

---

## 🧾 9. Job Board Components

### 9.1 Job Card

**Purpose:** Job posting card (detailed in section 4.2)

**Featured Variant:**
- 2px Amber border
- "Featured" badge (top-right)
- Elevated shadow

### 9.2 Post a Job Modal

**Purpose:** Partner/admin form to create job posting

**Props:**
```typescript
interface PostJobModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: JobPostingData) => void;
  userRole: 'partner' | 'admin';
}

interface JobPostingData {
  title: string;
  description: string; // Rich text editor
  location: string;
  type: 'Full-time' | 'Part-time' | 'Contract' | 'Volunteer';
  requiredSkills: string[]; // Multi-select
  preferredSkills: string[];
  salaryRange?: string;
  applicationDeadline: Date;
  featured: boolean; // Admin only
}
```

**Features:**
- Rich text editor for description
- Multi-select for skills (with autocomplete)
- Admin review tag state (if submitted by partner)
- Preview before submit

### 9.3 Job Detail View

**Purpose:** Full job posting page

**Layout:**
- Left column (60%): Job description, requirements, responsibilities
- Right column (40%): Partner info, apply button, Penny sidebar

**Props:**
```typescript
interface JobDetailViewProps {
  job: JobPosting;
  partner: PartnerOrganization;
  showPenny?: boolean; // Default: true
  onApply: () => void;
}
```

**Features:**
- Apply button (sticky on scroll)
- Penny AI suggestions for resume tailoring
- Share to LinkedIn button
- Save job button

---

## 💼 10. TrailBuild Summit Components

### 10.1 Event Banner

**Purpose:** Hero section for TrailBuild Summit page

**Props:**
```typescript
interface EventBannerProps {
  eventName: string; // TrailBuild_Event__c.Name
  eventDate: Date; // TrailBuild_Event__c.Event_Date__c
  eventEndDate: Date; // TrailBuild_Event__c.End_Date__c
  tagline: string; // CMS: trailbuild_tagline
  registrationOpen: boolean; // TrailBuild_Event__c.Registration_Open__c
  spotsAvailable?: number; // Count of Registration limit
  onRegister: () => void;
  onLearnMore: () => void;
}
```

**Features:**
- Live countdown timer (days, hours, minutes, seconds)
- CTA "Register Early" (changes to "Register Now" if < 7 days)
- Background gradient (Evergreen to Sky Blue)

### 10.2 Team Grid Component

**Purpose:** Display TrailBuild teams

**Props:**
```typescript
interface TeamGridProps {
  teams: TrailBuildTeam[];
  currentUserId?: string; // Highlight user's team
  onJoinTeam?: (teamId: string) => void;
  maxTeamSize: number; // TrailBuild_Event__c.Max_Team_Size__c
}

interface TrailBuildTeam {
  teamId: string; // TrailBuild_Team__c.Id
  teamName: string; // TrailBuild_Team__c.Name
  members: TeamMember[];
  projectTopic?: string; // TrailBuild_Team__c.Project_Topic__c
  progress: number; // 0-100
  slackChannel?: string; // TrailBuild_Team__c.Slack_Channel__c
}
```

**Features:**
- Avatar group (circular overlap)
- Progress bar (team completion %)
- "Join Team" button (if spots available)
- Team size indicator (e.g., "4/5 members")

### 10.3 Event Workspace

**Purpose:** Active workspace during TrailBuild event

**Props:**
```typescript
interface EventWorkspaceProps {
  teamId: string; // TrailBuild_Team__c.Id
  eventPhase: 'day1' | 'day2' | 'day3'; // Current day
  tasks: EventTask[];
  pennyReminders: PennyReminder[];
}

interface EventTask {
  taskId: string;
  description: string;
  dueTime: Date;
  completed: boolean;
  assignedTo?: string;
}

interface PennyReminder {
  message: string;
  priority: 'low' | 'medium' | 'high';
  dismissible: boolean;
}
```

**Features:**
- Day 1-3 timeline (visual stepper)
- Task checklist with assignments
- Penny proactive reminders
- GitHub commits feed (if integrated)
- Team chat (Slack integration)

### 10.4 Results Showcase

**Purpose:** Post-event results and winners

**Props:**
```typescript
interface ResultsShowcaseProps {
  winners: WinnerTeam[];
  sponsors: Sponsor[];
  replayVideoUrl?: string; // CMS or external URL
}

interface WinnerTeam {
  rank: 1 | 2 | 3;
  teamName: string;
  projectName: string;
  projectSummary: string;
  prize: string;
  teamMembers: TeamMember[];
  demoUrl?: string;
}
```

**Features:**
- Top 3 teams cards (larger card for #1)
- Sponsor carousel (logos with links)
- Replay video embed (if available)
- Confetti animation on load

---

## 🧩 11. Integration Annotations

### CMS Integration

**Pattern:** `[CMS:asset_name]`

**Example:**
```typescript
<h1>{CMS('learner_home_welcome_title')}</h1>
```

**HTML Annotation:**
```html
<div data-cms-key="learner_home_welcome_title">
  {content}
</div>
```

### GitHub Repository

**Pattern:** `[Repo_Link__c]`

**Salesforce Field:** `Project__c.Repo_Link__c`

**Component Usage:**
```tsx
<GitHubRepositoryLink
  repoUrl={project.Repo_Link__c}
  variant="card"
  showStats={true}
/>
```

### Slack Channel

**Pattern:** `[Slack_Channel_URL__c]`

**Salesforce Field:** `Partner_Project__c.Slack_Channel_URL__c`

**Component Usage:**
```tsx
<SlackChannelLink
  channelUrl={project.Slack_Channel_URL__c}
  channelName={project.Slack_Channel_Name__c}
  variant="compact"
/>
```

### PDF Export

**Pattern:** `[Flow:Generate_Branded_PDF]`

**Salesforce Flow:** Invocable Apex action

**Component Usage:**
```tsx
<PDFGenerationButton
  projectId={project.Id}
  projectName={project.Name}
  variant="outline"
/>
```

### Stripe Checkout

**Pattern:** `[LWC:ttStripeCheckout]`

**LWC Component:** `c-tt-stripe-checkout`

**Component Usage:**
```tsx
<StripeCheckoutButton
  amount={orderTotal}
  currency="USD"
  description={orderSummary}
  onSuccess={handlePaymentSuccess}
/>
```

### Penny AI Context

**Pattern:** `[AI:context_tag]`

**Context Tags:**
- `learning_module` - Course/module content
- `project_workspace` - Project tasks
- `capstone_phase` - Capstone project phases
- `job_application` - Job board interactions
- `trailbuild_event` - Event participation

**Component Usage:**
```tsx
<div data-ai-context="capstone_phase">
  {/* Penny uses this to provide relevant guidance */}
</div>
```

---

## 🔐 12. Accessibility & Responsiveness

### Accessibility (WCAG 2.1 AA)

**Color Contrast:**
- ✅ Body text: 7:1 minimum (AAA)
- ✅ UI components: 4.5:1 minimum (AA)
- ✅ Large text: 3:1 minimum (AA)

**Keyboard Navigation:**
- ✅ All interactive elements focusable
- ✅ Focus visible (2px ring, Amber color)
- ✅ Logical tab order
- ✅ Skip links for main content
- ✅ Escape key closes modals

**Screen Reader Support:**
- ✅ ARIA labels on all inputs
- ✅ ARIA live regions for dynamic updates
- ✅ Alt text on all images
- ✅ Heading hierarchy (H1 → H2 → H3)
- ✅ Semantic HTML (nav, main, section, article)

**Focus Management:**
- ✅ Focus trapped in modals
- ✅ Focus returned on modal close
- ✅ Focus on first input when form opens

### Responsiveness

**Breakpoints:**
- Mobile: 375px - 767px
- Tablet: 768px - 1023px
- Desktop: 1024px - 1439px
- Wide: 1440px+

**Mobile-First Approach:**
```css
/* Mobile (default) */
.component { ... }

/* Tablet */
@media (min-width: 768px) {
  .component { ... }
}

/* Desktop */
@media (min-width: 1024px) {
  .component { ... }
}
```

**Touch Targets:**
- Minimum size: 44x44px (iOS guideline)
- Spacing between targets: 8px minimum

**Responsive Patterns:**
- Single column → Multi-column grid
- Horizontal scroll → Vertical stack
- Full-width buttons → Inline buttons
- Hamburger menu → Full navigation

---

## 📚 Component Usage Examples

### Example 1: Learner Dashboard Hero

```tsx
import { CMS, CMSWithVars } from './CMSContent';
import { ProgressRing } from './ProgressRing';
import { Button } from './ui/button';

function LearnerHero({ user, trail }) {
  return (
    <div className="bg-gradient-to-r from-evergreen to-sky-blue rounded-xl p-8 text-white">
      <h1 className="text-h1">
        {CMSWithVars('learner_home_welcome_title', { name: user.firstName })}
      </h1>
      <p className="text-body-sm opacity-90">
        {CMS('learner_home_subtitle')}
      </p>
      
      <div className="grid md:grid-cols-3 gap-6 mt-6">
        <ProgressRing
          progress={trail.progressPercentage}
          label={CMS('learner_home_progress_label')}
        />
        <div className="text-center">
          <p className="text-body-sm opacity-90">{CMS('learner_home_points_label')}</p>
          <p className="text-h2">{user.totalPoints}</p>
        </div>
        <Button variant="secondary" size="lg">
          {CMS('learner_home_btn_continue_trail')}
        </Button>
      </div>
    </div>
  );
}
```

### Example 2: Partner Project Card

```tsx
import { ProjectCard } from './components/cards/ProjectCard';
import { SlackChannelLink } from './components/integrations/SlackChannelLink';
import { GitHubRepositoryLink } from './components/integrations/GitHubRepositoryLink';

function PartnerProjectList({ projects }) {
  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
      {projects.map(project => (
        <ProjectCard
          key={project.Id}
          title={project.Name}
          partner={project.Partner__r.Name}
          partnerLogo={project.Partner__r.Logo_URL__c}
          description={project.Description__c}
          skills={project.Required_Skills__c.split(';')}
          teamSize={project.Team_Size__c}
          spotsAvailable={project.Spots_Available__c}
          duration={project.Duration_Weeks__c}
          locked={!user.capstoneCompleted}
          joinAction={() => handleJoinProject(project.Id)}
        />
      ))}
    </div>
  );
}
```

### Example 3: Penny AI Widget

```tsx
import { PennyFloatingWidget } from './components/PennyFloatingWidget';
import { PennyPopIn } from './components/PennyPopIn';

function CapstonePage({ project }) {
  const [showPenny, setShowPenny] = useState(false);
  
  // Penny appears when user reaches testing phase
  useEffect(() => {
    if (project.Current_Phase__c === 'Testing') {
      setShowPenny(true);
    }
  }, [project.Current_Phase__c]);
  
  return (
    <div data-ai-context="capstone_phase">
      <h1>{project.Name}</h1>
      
      {showPenny && (
        <PennyPopIn
          message="Don't forget to test your Apex code! Let's review your testing strategy."
          ctaButtons={[
            { text: 'Show QA Checklist', action: () => showQAChecklist(), variant: 'primary' },
            { text: 'Dismiss', action: () => setShowPenny(false), variant: 'secondary' }
          ]}
          dismissible={true}
        />
      )}
      
      <PennyFloatingWidget mode="guide" />
    </div>
  );
}
```

---

## 🚀 Implementation Roadmap

### Phase 1: Foundation (Week 1)
- [ ] Update globals.css with TTDS color tokens
- [ ] Create typography scale
- [ ] Set up spacing scale
- [ ] Configure grid system
- [ ] Add shadow and radius tokens

### Phase 2: Base Components (Week 2-3)
- [ ] Button component with all variants
- [ ] Input, Select, TextArea components
- [ ] Modal component
- [ ] Card components (Default, Info, Partner, Job, Project, Trail)
- [ ] Toggle components (Role, Layout, Theme)

### Phase 3: Navigation & Layout (Week 4)
- [ ] Header component with audience variants
- [ ] Footer component
- [ ] Sidebar component
- [ ] Breadcrumbs component

### Phase 4: Learning & Projects (Week 5-6)
- [ ] Course Card
- [ ] Trail Progress Meter
- [ ] Project Workspace Frame
- [ ] Partner Submission Modal
- [ ] Generate PDF Button

### Phase 5: Penny AI (Week 7)
- [ ] Penny Floating Widget
- [ ] Penny Message Bubble
- [ ] Penny Interaction Pop-in
- [ ] AI context integration

### Phase 6: Gamification (Week 8)
- [ ] Badge component with animations
- [ ] Leaderboard component
- [ ] Points Meter (circular and linear)

### Phase 7: Commerce (Week 9)
- [ ] Merch Card
- [ ] Checkout Modal
- [ ] Order Confirmation

### Phase 8: Job Board (Week 10)
- [ ] Job Card with featured variant
- [ ] Post a Job Modal
- [ ] Job Detail View

### Phase 9: TrailBuild (Week 11)
- [ ] Event Banner with countdown
- [ ] Team Grid
- [ ] Event Workspace
- [ ] Results Showcase

### Phase 10: Testing & Polish (Week 12)
- [ ] Accessibility audit (WCAG 2.1 AA)
- [ ] Responsive testing (all breakpoints)
- [ ] Performance optimization
- [ ] Documentation completion

---

## 📊 Component Inventory

**Total Components:** 50+

| Category | Components | Priority |
|----------|-----------|----------|
| Foundation | 1 (CSS tokens) | ✅ Critical |
| Navigation & Layout | 4 | ✅ Critical |
| Interaction | 6 | ✅ Critical |
| Content & Media | 7 | High |
| Learning & Projects | 5 | High |
| Penny AI | 3 | High |
| Gamification | 3 | Medium |
| Commerce | 3 | Medium |
| Job Board | 3 | Medium |
| TrailBuild | 4 | Medium |
| Integration | 5 (existing) | High |

---

## ✅ Acceptance Criteria

- [ ] All color tokens defined in globals.css
- [ ] Typography scale implemented
- [ ] Spacing scale consistent across components
- [ ] Grid system functional on all breakpoints
- [ ] All components have TypeScript props interfaces
- [ ] All components have CMS bindings documented
- [ ] All components WCAG 2.1 AA compliant
- [ ] All components responsive (mobile, tablet, desktop)
- [ ] All integration annotations documented
- [ ] Storybook or component showcase created
- [ ] Implementation examples provided
- [ ] Salesforce LWC mapping documented for each component

---

**Design System Status:** 📋 Specification Complete, Ready for Implementation  
**Next Steps:** Update globals.css with color tokens, create base Button component

