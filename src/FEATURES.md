# Transition Trails - Feature Documentation

Comprehensive documentation of all features in the Transition Trails Digital Experience Portal.

## Table of Contents

1. [Learner Home Dashboard](#learner-home-dashboard)
2. [Trail Missions](#trail-missions)
3. [Learning Center](#learning-center)
4. [Capstone Projects](#capstone-projects)
5. [Community (Slack Integration)](#community-slack-integration)
6. [Profile & LinkedIn Integration](#profile--linkedin-integration)
7. [Penny AI Assistant](#penny-ai-assistant)
8. [Coach Dashboard](#coach-dashboard)
9. [Admin Panel](#admin-panel)

---

## Learner Home Dashboard

**Component**: `/components/LearnerHome.tsx`

### Overview
The central hub for learners, providing an intelligent overview of all activities, priorities, and progress.

### Key Features

#### Penny's Focus List
- **Intelligent Prioritization**: AI-curated list of most important tasks from across all activities
- **Source Indicators**: Shows whether task is from Capstone, Trail Missions, Daily Missions, etc.
- **Priority Levels**: Critical, High, Medium with color coding
- **Due Dates**: Clear deadline visibility
- **One-Click Navigation**: Direct links to relevant pages

**Data Structure**:
```typescript
{
  id: number;
  title: string;
  source: string; // 'Capstone Project', 'Trail Missions', etc.
  priority: 'critical' | 'high' | 'medium';
  dueDate: string;
  type: 'task' | 'session' | 'assignment';
  description: string;
  action: () => void;
  icon: LucideIcon;
  color: string;
}
```

#### Points System
- **Total Points**: 3,500 for Guided Trail completion
- **Current Progress**: Visual progress ring showing earned points
- **Breakdown by Category**:
  - Capstone Project: 1,400 points (40%)
  - Trail Missions: 525 points (15%)
  - Special Assignments: 525 points (15%)
  - Coach Feedback: 350 points (10%)
  - Skills IQ Assessment: 350 points (10%)
  - Meeting Engagement: 175 points (5%)
  - Slack Participation: 175 points (5%)

#### Calendar Integration
- Upcoming sessions with type indicators (standup, coaching, campfire, class, office-hours)
- Color-coded events
- Time and date visibility
- Session type badges

#### Coach Information
- Current coach name and title
- Slack handle for quick communication
- Avatar display

### UI Components Used
- `Collapsible` for expandable sections
- `Avatar` for profile images
- Custom `ProgressRing` component
- `Badge` for status indicators

---

## Trail Missions

**Component**: `/components/TrailMissions.tsx`

### Overview
Skill-based learning path selection and mission tracking system following a 12-week guided trail structure.

### Skill Paths

#### 1. Salesforce Admin Trail
- Focus areas: User management, security, data management, automation
- Mission count: 24 missions
- Certification target: Salesforce Administrator
- Key skills: Flow Builder, Reports & Dashboards, Security Model

#### 2. Developer Trail
- Focus areas: Apex, Lightning Web Components, API integration
- Mission count: 28 missions
- Certification target: Platform Developer I
- Key skills: Apex triggers, LWC, REST APIs

#### 3. Business Analyst Trail
- Focus areas: Requirements gathering, process mapping, user stories
- Mission count: 20 missions
- Certification target: Business Analyst
- Key skills: User stories, process design, stakeholder communication

#### 4. Designer Trail
- Focus areas: UX design, Lightning design system, accessibility
- Mission count: 22 missions
- Certification target: UX Designer
- Key skills: Wireframing, prototyping, accessibility standards

### Mission Structure

**12-Week Timeline**:
- Weeks 1-3: Fundamentals
- Weeks 4-6: Intermediate concepts
- Weeks 7-9: Advanced topics
- Weeks 10-12: Capstone integration

**Mission Details**:
```typescript
{
  id: number;
  week: number;
  title: string;
  description: string;
  objectives: string[];
  status: 'locked' | 'available' | 'in-progress' | 'completed';
  points: number;
  estimatedTime: string;
  resources: {
    trailheadModules: string[];
    externalLinks: string[];
  };
}
```

### Features
- Visual week-by-week timeline
- Progress indicators for each mission
- Lock/unlock mechanism based on prerequisites
- Points earned tracking
- Resource links to Trailhead modules

---

## Learning Center

**Component**: `/components/LearningCenter.tsx`

### Overview
Centralized learning resource hub integrating Viva Learning, PluralSight, and custom content.

### Three-Tab Interface

#### Tab 1: Courses
- **Course Library**: Browse all available courses
- **Search & Filter**: By skill, provider, difficulty
- **Course Cards**: Display title, provider, duration, rating, enrolled status
- **Quick Actions**: Enroll, Resume, Mark Complete
- **Provider Badges**: Viva Learning, PluralSight, Transition Trails custom

**Course Data Structure**:
```typescript
{
  id: number;
  title: string;
  provider: 'Viva Learning' | 'PluralSight' | 'Transition Trails';
  duration: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  rating: number;
  enrolled: boolean;
  progress?: number;
  description: string;
  skills: string[];
}
```

#### Tab 2: Progress
- **In Progress Courses**: Currently active courses with progress bars
- **Completed Courses**: History with completion dates
- **Recommended Next**: AI-powered course recommendations
- **Learning Streak**: Days of consecutive learning activity
- **Weekly Goals**: Target hours with progress

#### Tab 3: Resources
- **Downloadable Guides**: PDF resources for offline learning
- **Quick Reference**: Cheat sheets and syntax guides
- **External Links**: Official Salesforce documentation
- **Community Resources**: Blogs, forums, study groups

### Integration Points
- Viva Learning API for Microsoft 365 Learning content
- PluralSight API for tech courses
- Salesforce Learning custom objects for progress tracking

---

## Capstone Projects

**Component**: `/components/CapstoneProjects.tsx`

### Overview
Real-world nonprofit project management with comprehensive testing focus and proactive AI guidance.

### Project Phases

#### 1. Planning Phase
- Project charter and scope definition
- Stakeholder interviews
- Requirements gathering
- User stories in Linear
- Mural board wireframing
- **Penny AI**: Validates completeness of planning artifacts

#### 2. Development Phase
- Sprint planning
- Code development
- GitHub pull requests
- Code review process
- **Penny AI**: Monitors PR status, suggests reviewers, flags blocking issues

#### 3. Testing Phase (Emphasized)
- **Test Case Writing**: Comprehensive test scenarios
- **Unit Testing**: Apex test classes with coverage tracking
- **Integration Testing**: End-to-end workflow validation
- **User Acceptance Testing (UAT)**:
  - Partner collaboration
  - UAT session scheduling
  - Feedback collection
  - Bug tracking in Linear
- **Testing Dashboard**: Dedicated tab showing:
  - Test coverage percentage
  - Failed vs. Passed tests
  - UAT session results
  - Critical bugs to address
- **Penny AI**: Proactive testing recommendations, identifies missing test scenarios

#### 4. Deployment Phase
- Deployment checklist
- Production validation
- User training
- Documentation
- **Penny AI**: Pre-deployment validation, ensures no blockers

### Linear Integration

**Project Board Sync**:
- Real-time issue sync
- Status updates (Backlog, In Progress, In Review, Done)
- Assignee tracking
- Priority management
- Sprint organization

**Issue Types**:
- Feature
- Bug
- Task
- User Story
- Test Case

### GitHub Integration

**Pull Request Tracking**:
```typescript
{
  id: number;
  title: string;
  author: string;
  status: 'open' | 'merged' | 'closed';
  reviewers: string[];
  files: number;
  additions: number;
  deletions: number;
  checks: 'passing' | 'failing' | 'pending';
  created: string;
  mergedAt?: string;
}
```

**Code Review Features**:
- Approval status tracking
- Change metrics (additions/deletions)
- CI/CD checks status
- Merge conflict detection

### Penny AI Capstone Features

**Proactive Recommendations**:
- Critical bug alerts (e.g., "BUG-001 blocking automation phase")
- Missing documentation warnings
- Testing coverage gaps
- Deployment blockers
- Overdue status reports

**Weekly Status Reports**:
- Auto-generated summary of progress
- Blockers and risks highlighted
- Next week's priorities
- Sent to coach and nonprofit partner

### Testing Dashboard

**Metrics Displayed**:
- Test coverage: 78% (goal: 85%)
- Passed tests: 124
- Failed tests: 3
- UAT sessions completed: 2 of 3
- Critical bugs: 1 open
- Test case completion: 89%

**Penny Testing Recommendations**:
- "Add test for bulk data scenario"
- "Schedule final UAT with partner by Mar 15"
- "Fix failing Apex test: BatchJobTest.testNullPointer"

---

## Community (Slack Integration)

**Component**: `/components/Community.tsx`

### Overview
Comprehensive Slack integration for peer collaboration, coaching, and community engagement.

### Five-Tab Interface

#### Tab 1: Overview
**My Channels Summary**:
- Top 3 channels with unread counts
- Trending badges for active discussions
- Last activity timestamps
- Member counts

**Trending Discussions**:
- AI-curated top discussions from all channels
- Reaction and reply counts
- Topic summaries
- Direct links to Slack threads

**Upcoming Sessions Preview**:
- Next 2 upcoming huddles/events
- Join buttons
- Participant counts

**Penny's Insights Panel**:
- Weekly highlights
- Top contributor recognition
- Trending topics
- Suggested channels based on learning path

#### Tab 2: Channels
**All Channels List**:
- Expandable channel cards
- Member counts
- Descriptions
- "Open in Slack" buttons
- Unread indicators

**Channel Categories**:
- Cohort channels (#explorer-2025)
- Skill-specific (#salesforce-admin-crew, #developer-trail)
- General (#trail-mastery, #capstone-projects)
- Support (#coach-office-hours)

#### Tab 3: Direct Messages
**DM Preview Grid**:
- Recent conversations
- Unread badges
- Last message snippet
- Sender role (Coach, Peer Learner, AI Assistant)
- Timestamps
- View preview or Open in Slack options

**DM Modal**:
- Message preview with context
- Quick reply option
- Full conversation link

#### Tab 4: Group Sessions
**Upcoming Sessions**:
- Session title and description
- Host information
- Channel context
- Date, time, duration
- Participant count with capacity
- Join Session button
- Progress bar for capacity

**Past Sessions**:
- Session history
- Penny AI summaries with key takeaways
- Recording availability
- Participant count

**Session Types**:
- Huddles (video calls)
- Events (scheduled sessions)

#### Tab 5: My Cohort
**Cohort Directory**:
- Member cards with avatars
- Online status indicators (online, away, offline)
- Roles (Learner, Coach, Admin)
- Trail assignments
- Direct message buttons

**Cohort Highlights**:
- Most active member
- Weekly completions
- Average cohort progress
- Upcoming group sessions

### Slack Integration Architecture

**OAuth Scopes Required**:
- `channels:read` - Read channel information
- `groups:read` - Read private channels
- `im:read` - Read direct messages
- `im:write` - Send direct messages
- `chat:write` - Send messages
- `users:read` - Read user information
- `reactions:read` - Read message reactions

**Event Subscriptions**:
- `message.channels` - New channel messages
- `message.groups` - New group messages
- `message.im` - New direct messages
- `reaction_added` - Message reactions

**Data Sync**:
- Webhook to Salesforce custom object `Slack_Activity__c`
- User mapping via email: Slack User → Salesforce Contact
- Real-time notification delivery

### Notification System

**Global Bell Icon** (in Navigation):
- Unread count badge
- Dropdown with recent notifications
- Notification types:
  - Mentions (@username)
  - Direct messages
  - Session reminders
  - Reactions to posts
- Click to open Community page or Slack

**Toast Notifications**:
- New message alerts
- Session starting soon
- Mention notifications
- Slide-in animation

---

## Profile & LinkedIn Integration

**Component**: `/components/Profile.tsx`

### Overview
Comprehensive profile management with LinkedIn integration and AI-powered resume building.

### Profile Sections

#### 1. Basic Information
- Name, email, cohort
- Profile picture
- Contact preferences
- Bio/About section

#### 2. Achievements & Badges
**Badge Categories**:
- Trailhead badges (synced from Salesforce)
- Transition Trails program badges
- Filter by category

**Achievement Display**:
```typescript
{
  id: number;
  title: string;
  description: string;
  earnedDate: string;
  icon: string;
  source: 'Trailhead' | 'Transition Trails';
  category: string;
}
```

#### 3. Learning History
**Activity Log**:
- Course completions
- Daily missions completed
- Trail mission progress
- Capstone milestones
- Assignments submitted

**Filter Options**:
- All activities
- Courses only
- Daily missions
- Trail missions
- Capstone work
- Assignments

#### 4. Progress Analytics
**Charts & Metrics**:
- Learning progress over time (line chart)
- Points breakdown by category (pie chart)
- Weekly activity heatmap
- Course completion rate

### LinkedIn Profile Coach

#### Connection States

**Disconnected State**:
- Professional illustration
- Clear value proposition
- "Connect LinkedIn" CTA button
- OAuth flow explanation

**Connected State**:
- Profile picture and headline display
- Token status badge (Active/Reconnect)
- Last sync timestamp
- Disconnect option

#### Five Profile Tabs

**Tab 1: Headline**
- Current headline display
- Penny's AI-generated suggestion
- Reasoning explanation
- Copy and Regenerate buttons

**Example Transformation**:
```
Current: "Volunteer Coordinator at Community Foundation"

Penny's Suggestion: "Salesforce Administrator | Certified Admin Candidate | 
Volunteer Coordinator Transitioning to Tech"

Reasoning: "Your new headline emphasizes your tech journey and certification 
progress, making you more discoverable to recruiters."
```

**Tab 2: About**
- Current about section
- Penny's rewritten version with:
  - Transformation story
  - Technical skills
  - Capstone project highlights
  - Career goals
- Quantified achievements
- Keywords for SEO

**Tab 3: Experience**
- Current job description
- Penny's enhanced version with:
  - Quantified metrics
  - Salesforce integration examples
  - Impact statements
  - Technical achievements

**Tab 4: Skills**
- Current skills list
- Penny's optimized list with:
  - Technical skills first
  - ATS-friendly ordering
  - Transferable skills included
  - Endorsement priority suggestions

**Tab 5: Featured**
- Current featured content
- Penny's suggestions:
  - Capstone project showcase
  - Certifications in progress
  - Published posts/articles
  - Portfolio links

### Achievement Integration Panel

**Carousel Features**:
- 4 shareable achievements
- Emoji icons for visual appeal
- Achievement types: Capstone, Badge, Milestone
- Dates and descriptions
- Navigation controls

**Actions**:
- Add to Profile (toggle)
- Share on LinkedIn button
- Preview before sharing

**Achievement Data**:
```typescript
{
  id: string;
  type: 'capstone' | 'badge' | 'milestone';
  title: string;
  description: string;
  image: string; // emoji or icon
  date: string;
}
```

### Share Composer Modal

**Post Types**:
- Capstone project completion
- Badge earned
- Milestone reached

**Features**:
- Post type selector
- Pre-filled Penny-generated text
- Editable textarea
- Character count
- Media upload placeholder
- Three action buttons:
  - Cancel
  - Copy to Clipboard
  - Post to LinkedIn

**Post Templates**:
Each type has a unique template highlighting:
- Achievement details
- Skills demonstrated
- Learning journey
- Call to action
- Relevant hashtags

**Example Templates**:
```
Capstone: Focuses on project impact, technologies used, team collaboration
Badge: Highlights skill acquisition, training completed, practical application
Milestone: Emphasizes progress, dedication, next steps
```

### Penny Resume Builder

#### Upload Process
1. PDF upload via drag-and-drop or file picker
2. Processing with loading state
3. AI analysis and extraction
4. Enhancement suggestions

#### Review Panel
**Toggle Switches**:
- Enhance Formatting (auto-enabled)
- Add Transition Trails Experience (auto-enabled)
- Tailor for Specific Role (optional with input field)

#### Inline Chat Interface
**Penny Conversation**:
- Welcome message with initial recommendations
- User questions
- Penny responses with actionable suggestions
- Suggestion cards with Accept/Ignore/Edit options

**Suggestion Format**:
```typescript
{
  sender: 'penny' | 'user';
  message: string;
  suggestions?: string[];
}
```

#### Rebuild Section
- "Rebuild Resume" CTA button
- Processing state with spinner
- Success confirmation
- Action buttons:
  - Preview (modal view)
  - Download (PDF export)
  - LinkedIn Export (optimize for LinkedIn)

#### Version History
**Tracked Versions**:
- Original upload
- Each rebuild iteration
- Timestamps
- File sizes
- Change summaries
- View and Download options

### LinkedIn OAuth Flow

**Permissions Requested**:
- `r_liteprofile` - Basic profile information
- `r_emailaddress` - Email address
- `w_member_social` - Post to feed

**Token Management**:
- Stored in Salesforce Named Credentials
- Automatic refresh handling
- Expiration notifications
- Secure storage (never client-side)

### Toast Notifications

**Notification Events**:
- LinkedIn connected successfully
- Copied to clipboard
- Posted to LinkedIn
- Profile section updated
- Resume rebuilt
- Error states

---

## Penny AI Assistant

**Component**: `/components/PennyChat.tsx`

### Overview
Proactive AI assistant integrated throughout the platform providing personalized guidance.

### Core Capabilities

#### 1. Contextual Awareness
- Knows current page and user activity
- Accesses learning history
- Aware of capstone progress
- Understands deadlines and priorities

#### 2. Proactive Recommendations
**Capstone Project**:
- Bug alerts and blockers
- Missing documentation
- Testing gaps
- Deployment readiness

**Learning Path**:
- Next recommended course
- Study plan suggestions
- Time management tips

**Profile**:
- LinkedIn optimization
- Resume enhancement
- Achievement highlighting

**Community**:
- Channel recommendations
- Trending discussions
- Session summaries

#### 3. Chat Interface
**Features**:
- Floating button (bottom-right)
- Modal chat window
- Message history
- Quick actions
- Context switching

**Message Types**:
- Text responses
- Action cards (buttons)
- Suggestion lists
- Links to resources
- Code snippets

#### 4. Natural Language Processing
- Understands questions in plain English
- Context retention across conversation
- Intent recognition
- Sentiment analysis

### Integration Points

**Data Sources**:
- Salesforce user records
- Trailhead progress API
- Linear project data
- GitHub repository info
- Slack message analytics
- LinkedIn profile data

**AI Engine**:
- Salesforce Einstein GPT
- Custom prompt templates
- Real-time data injection
- Guardrails for accuracy

### Penny Personas

**Encouraging Coach**:
- Celebrates wins
- Motivates through challenges
- Sets achievable goals

**Technical Expert**:
- Provides code examples
- Explains concepts
- Suggests best practices

**Career Advisor**:
- LinkedIn optimization
- Resume guidance
- Interview preparation
- Job search strategies

**Project Manager**:
- Keeps capstone on track
- Identifies blockers
- Prioritizes tasks

---

## Coach Dashboard

**Component**: `/components/CoachDashboard.tsx`

### Overview
Comprehensive view for coaches to monitor and support learners.

### Features

#### Learner Overview
- List of assigned learners
- Progress indicators
- Recent activity
- Alerts for struggling learners

#### Bi-Weekly Feedback
- Feedback form submission
- Progress assessment
- Skill ratings
- Notes and recommendations

#### 1:1 Sessions
- Schedule management
- Session notes
- Action items tracking
- Follow-up reminders

#### Assessment Reviews
- Assignment submissions
- Grading interface
- Feedback provision
- Resubmission requests

#### Communication Tools
- Direct Slack messaging
- Email templates
- Broadcast announcements
- Office hours scheduling

---

## Admin Panel

**Component**: `/components/AdminPanel.tsx`

### Overview
Platform administration and analytics for program managers.

### Features

#### Cohort Management
- Create/edit cohorts
- Assign learners and coaches
- Set program dates
- Track cohort progress

#### Analytics Dashboard
- Enrollment metrics
- Completion rates
- Engagement analytics
- At-risk learner identification

#### Content Management
- Course catalog updates
- Trail mission configuration
- Resource library management
- Badge definitions

#### User Management
- Role assignments
- Permission management
- Account activation/deactivation
- Bulk user operations

#### Reporting
- Custom report builder
- Export functionality
- Scheduled reports
- Data visualization

---

## Technical Implementation Notes

### State Management
All components use React hooks for state management:
- `useState` for local state
- `useEffect` for side effects
- Custom hooks for shared logic

### API Integration
Mock data is used for demonstration. Production implementation requires:
- Salesforce REST API calls
- Trailhead API integration
- Slack API webhooks
- LinkedIn API OAuth
- Linear GraphQL API
- GitHub REST API

### Accessibility
- WCAG AA compliance
- Keyboard navigation
- ARIA labels
- Screen reader support
- Color contrast validation

### Performance
- Component lazy loading
- Memoization where appropriate
- Optimized re-renders
- Image optimization
- Code splitting

### Security
- OAuth token management
- API key protection via Named Credentials
- Input sanitization
- XSS prevention
- CSRF protection

---

## Future Enhancements

### Planned Features
1. Mobile app (React Native)
2. Offline mode
3. Video integration (coaching sessions)
4. Advanced analytics (predictive models)
5. Gamification expansion (leaderboards, competitions)
6. Partner portal (nonprofit view)
7. Alumni network
8. Job board integration
9. Certification exam prep
10. Multi-language support

### Integration Roadmap
- Zoom for video sessions
- Calendly for scheduling
- Stripe for payments
- SendGrid for email
- Twilio for SMS notifications
- Google Analytics for tracking

---

**Last Updated**: November 4, 2025
**Version**: 1.0.0
**Maintainer**: Transition Trails Engineering Team
