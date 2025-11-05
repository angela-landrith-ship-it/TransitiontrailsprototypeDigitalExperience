# Visitor Trail Implementation Guide

## Overview
The Visitor Trail is a comprehensive public entry point for the Transition Trails Digital Experience Portal that allows prospective learners to explore the platform before enrolling. It includes limited access to learning content, community events, and AI guidance from Penny in "Preview Mode."

## Features Implemented

### 1. **Visitor Landing Page** (`/components/VisitorLanding.tsx`)
A welcoming entry point with:
- Hero section with "Start Your Visitor Trail" CTA
- Progress bar showing exploration points (0/50)
- Feature grid highlighting what visitors can explore
- "What You'll Unlock" section showcasing premium features
- Testimonials from successful learners
- Onboarding modal to capture visitor information (Name, Email, Interest)

**Key Components:**
- Onboarding form creates Contact + Experience User with Visitor role
- Behind the scenes would assign `Visitor_Trail_Permission_Set`
- Progress tracking with exploration points system

### 2. **Visitor Learning Center** (`/components/VisitorLearningCenter.tsx`)
Limited learning access with:
- 3 free preview courses (Salesforce Basics, AI Intro, Nonprofit Tech)
- Locked premium courses with visual indicators
- Penny's Preview Mode with sky blue color scheme
- Exploration points system (+10-15 points per preview)
- Conversion CTA at 50 points threshold

**Features:**
- Visual distinction between free and locked content
- Preview buttons earn exploration points
- Progress tracking (15/50 points displayed)
- Enrollment CTAs throughout the experience

### 3. **Visitor Community** (`/components/VisitorCommunity.tsx`)
Public Slack channel access:
- 3 public channels: #visitors, #public-events, #introductions
- Read-only message previews
- Locked premium channels (greyed out)
- "Join our Visitor Slack" button for Slack invite API
- Penny's Community Highlights widget
- Upcoming public events calendar

**Access Scope:**
- Public Slack channels only
- Read and react permissions
- No DMs or private huddles
- Event RSVP functionality

### 4. **Visitor Events** (`/components/VisitorEvents.tsx`)
Public event calendar:
- Upcoming webinars and workshops
- RSVP functionality with confirmation
- Event recordings from past sessions
- Penny's Event Picks recommendations
- Detailed event information (date, time, capacity, host)

**Event Types:**
- Webinars (e.g., "Intro to Salesforce")
- Workshops (e.g., "Meet Penny: AI Learning")
- Social Events (Community Open House)
- Panel Discussions (Career Pathways)

### 5. **Locked Feature Modals** (`/components/LockedFeatureModal.tsx`)
Premium feature previews for:
- **Capstone Projects**: Real nonprofit Salesforce applications
- **Skills Assessment & Goals**: Personalized assessments and tracking
- **Personal Coaching**: 1:1 sessions with learning coaches

**Features:**
- Beautiful color-coded modals (feature-specific colors)
- Detailed benefit lists with checkmarks
- Program overview stats (12 weeks, 3,500 points, 24/7 Penny AI)
- Testimonials from graduates
- Dual CTAs: "Continue Exploring" or "Join the Academy"

### 6. **Visitor Navigation** (`/components/VisitorNavigation.tsx`)
Simplified navigation for visitors:
- Limited menu: Home | Learning Center | Community | Events
- Visitor badge indicator
- Sign In button (converts to enrolled mode)
- Mobile-responsive with bottom nav
- Sky blue accent colors

### 7. **Penny Visitor Mode**
Special Penny implementation for visitors:
- Sky blue color scheme (instead of orange)
- "Visitor Guide" badge
- Friendlier, greeter tone vs mentor tone
- Pre-filled prompts:
  - "What can I learn for free?"
  - "How do I join the Academy?"
  - "What is a Trail?"
- Limited capabilities with upgrade prompts

## Technical Implementation

### App.tsx Updates
```typescript
// New user mode state
const [userMode, setUserMode] = useState<UserMode>('visitor' | 'enrolled');

// New page types
'visitor-home' | 'visitor-learning' | 'visitor-community' | 'visitor-events'

// Mode switching
handleEnrollment() - Converts visitor to enrolled user
handleSignIn() - Existing user login
```

### Routing Logic
- Visitor mode shows VisitorNavigation + visitor pages
- Enrolled mode shows Navigation + full application
- Penny Floating Widget only appears for enrolled users
- Locked features show modal instead of navigating

### Color Scheme
**Visitor Mode:**
- Primary: Sky Blue (#7EB5C1) - softer, welcoming
- Accent: Teal (#2C6975)
- CTA: Orange (#F9A03F)

**Enrolled Mode:**
- Primary: Teal (#2C6975)
- Accent: Orange (#F9A03F)
- Success: Green (#3B6A52)

## Gamification & Conversion

### Exploration Points System
- Start: 0 points
- Preview Course 1: +10 points
- Preview Course 2: +10 points  
- Preview Course 3: +15 points
- RSVP Event: +5 points
- Join Slack: +10 points
- **Goal: 50 points** triggers enrollment invitation

### Conversion Touchpoints
1. **Progress Milestone**: "You've reached 50 points! Unlock full access"
2. **Locked Features**: Click premium content shows enrollment modal
3. **Banner Reminders**: Persistent top banner on visitor pages
4. **Post-Preview**: After completing visitor lesson → enrollment CTA
5. **Penny Prompts**: AI assistant encourages enrollment at key moments

## Salesforce Integration Notes

### Objects & Fields
```
Contact
  - Visitor_Trail_Status__c (picklist: Active, Converted, Inactive)
  - Exploration_Points__c (number)
  - Interests__c (multi-picklist: Salesforce, AI, Nonprofit Leadership)
  - First_Visit_Date__c (date)

Visitor_Progress__c (Custom Object)
  - Contact__c (lookup)
  - Module_Completed__c (text)
  - Completion_Date__c (datetime)
  - Points_Earned__c (number)
```

### Permission Sets
- `Visitor_Trail_Permission_Set`
  - Read access to public learning modules
  - Read access to public Slack channels
  - Read access to public events
  - No access to capstone, skills assessment, or coaching features

### Experience Cloud Configuration
- Public pages (no login required):
  - Visitor_Trail_Landing_Page
  - Visitor_Learning_Center_Page
  - Visitor_Community_Page
  - Visitor_Events_Page
- Role-based visibility filters:
  - `Profile.Role__c = 'Visitor'` → Show visitor content
  - `Profile.Role__c = 'Learner'` → Show full content

### Slack Workspace Integration
- Filter channel access by user tag: `visitor` vs `learner`
- Visitor channels: `#visitors`, `#public-events`, `#introductions`
- Premium channels: `#trail-mastery`, `#coaching-questions`, `#capstone-projects`, `#job-opportunities`

## User Flows

### Visitor Journey
1. **Discovery**: Land on public page
2. **Onboarding**: Fill out form (Name, Email, Interest)
3. **Exploration**: Preview 2-3 courses, earn points
4. **Community**: Join public Slack, RSVP for events
5. **Conversion**: Reach 50 points or click premium feature
6. **Enrollment**: Complete registration, unlock full access

### Conversion Triggers
- Exploration points ≥ 50
- Click on locked feature (Capstone, Skills, Coach)
- Complete all 3 preview courses
- Weekly Penny email reminders
- Event attendance milestone

## Next Steps for Production

### Backend Requirements
1. Create Salesforce objects and fields
2. Configure Experience Cloud guest user permissions
3. Set up Slack workspace with visitor channels
4. Implement email automation (weekly Penny emails)
5. Create API endpoints for:
   - Visitor onboarding
   - Progress tracking
   - Enrollment conversion

### Analytics Tracking
- Visitor acquisition source
- Exploration point progression
- Conversion rate by interest type
- Drop-off points in visitor journey
- Most popular preview courses
- Event attendance rates

### Email Campaigns
- **Welcome Email**: After onboarding
- **Weekly Progress**: Penny summary of completed activities
- **Milestone Celebration**: Reached 25 points, 50 points
- **Conversion Nudge**: "You're 80% there!"
- **Event Reminders**: Upcoming public events

### Social Integration
- LinkedIn "First Trail Completed" badge (teaser-level)
- Share event attendance
- Visitor achievement badges

## Component Files Created

1. `/components/VisitorLanding.tsx` - Public entry point
2. `/components/VisitorLearningCenter.tsx` - Limited learning access
3. `/components/VisitorCommunity.tsx` - Public Slack channels
4. `/components/VisitorEvents.tsx` - Event calendar
5. `/components/VisitorNavigation.tsx` - Simplified navigation
6. `/components/LockedFeatureModal.tsx` - Premium feature previews

## Testing Scenarios

### Visitor Mode
- [ ] Landing page displays correctly
- [ ] Onboarding form captures data
- [ ] Preview courses award points
- [ ] Locked courses show modal
- [ ] Public events allow RSVP
- [ ] Penny shows visitor mode (sky blue)
- [ ] Exploration progress tracks correctly
- [ ] 50-point threshold triggers CTA
- [ ] Enrollment converts to full access

### Mode Switching
- [ ] Visitor → Enrolled navigation updates
- [ ] Visitor → Enrolled unlocks all features
- [ ] Sign In button works correctly
- [ ] State persists across navigation

## Success Metrics

**Target KPIs:**
- 40% visitor-to-enrollment conversion rate
- Average time in visitor mode: 2-5 days
- 60% of visitors complete ≥2 preview courses
- 30% RSVP for at least one public event
- 25% join public Slack workspace

---

**Status**: ✅ Frontend Implementation Complete
**Next**: Backend Salesforce integration required for production deployment
