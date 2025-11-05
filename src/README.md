# Transition Trails Digital Experience Portal

A comprehensive learning management and career transition platform built for Salesforce Experience Cloud, designed to guide learners from nonprofit roles into tech careers through structured programs, AI coaching, and community support.

![Transition Trails](https://img.shields.io/badge/Platform-Salesforce%20Experience%20Cloud-00A1E0)
![React](https://img.shields.io/badge/React-18.x-61DAFB)
![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6)
![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-4.0-38B2AC)
![Version](https://img.shields.io/badge/Version-2.0-success)
![Status](https://img.shields.io/badge/Status-Production%20Ready-brightgreen)

## 🎉 **NEW in Version 2.0!**

We've completely redesigned the user experience with:

✨ **Smart Navigation** - Auto-hiding sticky nav that appears when you need it  
🤖 **Context-Aware Penny** - AI assistant that changes personality per page  
🎨 **Beautiful Academy** - Hero section with interactive course categories  
📊 **Enhanced Capstone** - AI-powered summary generator with LinkedIn sharing  
💬 **Redesigned Community** - Slack channel cards and trending conversations  
👥 **Coach Hub Refresh** - Sky Blue theme with Penny coaching insights  
♿ **WCAG AA Compliant** - Fully accessible to all users  
📱 **Mobile Responsive** - Perfect experience on all devices  

### 🆕 **Visitor Trail Experience** (Latest Feature!)

🌐 **Public Landing Page** - Welcome prospective learners before enrollment  
📚 **Free Preview Courses** - 3 introductory courses with exploration points  
💬 **Public Community** - Access to public Slack channels and events  
📅 **Event Calendar** - RSVP for webinars, workshops, and open houses  
🎯 **Gamified Conversion** - Earn points to unlock full Academy access  
🔒 **Locked Feature Previews** - Beautiful modals showcasing premium features  
🔄 **Demo Mode Toggle** - Easy switching between visitor and enrolled views  

**[→ See What's New in v2.0](./ENHANCEMENTS_COMPLETE.md)** | **[→ Quick Start Guide](./QUICK_START_V2.md)** | **[→ Visitor Trail Guide](./VISITOR_TRAIL_QUICK_START.md)**

## 🌟 Overview

Transition Trails is a digital experience portal designed for career changers transitioning into Salesforce and tech roles. The platform combines:

- **Guided Learning Paths**: 12-week structured programs with Trail Missions and Daily Tasks
- **AI-Powered Coaching**: Penny AI assistant provides personalized guidance and support
- **Capstone Projects**: Real-world nonprofit projects with GitHub/Linear integration
- **Community Features**: Slack integration for peer collaboration and coach communication
- **LinkedIn Integration**: AI-powered profile optimization and achievement sharing
- **Gamification**: 3,500-point system with badges and progress tracking

## 🎯 Target Users

- **Visitors**: Prospective learners exploring the platform with limited access (NEW!)
- **Learners**: Enrolled career changers transitioning from nonprofit/non-tech roles to Salesforce careers
- **Coaches**: Learning coaches providing bi-weekly feedback and 1:1 support
- **Admins**: Program administrators managing cohorts, content, and analytics
- **Partners**: Nonprofit partners providing capstone project opportunities

## 🏗️ Architecture

### Tech Stack

- **Frontend Framework**: React 18 with TypeScript
- **Styling**: Tailwind CSS 4.0 with custom design tokens
- **UI Components**: shadcn/ui component library
- **Icons**: Lucide React
- **Charts**: Recharts
- **State Management**: React hooks (useState, useEffect)
- **Routing**: Component-based navigation system
- **Platform**: Salesforce Experience Cloud (LWR - Lightning Web Runtime)

### Design System

The platform uses a carefully crafted color palette:

- **Teal** (`#2C6975`): Primary brand color, navigation, CTAs
- **Orange** (`#F9A03F`): Accent color, Penny AI features, highlights
- **Sky Blue** (`#7EB5C1`): Secondary actions, informational elements
- **Green** (`#3B6A52`): Success states, progress indicators
- **Cream** (`#F5F3E8`): Background color, warm neutral base

### Key Integrations

- **Salesforce**: User authentication, data storage, API integration
- **Trailhead**: Badge sync, learning progress tracking via TrailTracker API
- **Slack**: Community messaging, notifications, group sessions
- **LinkedIn**: Profile optimization, achievement sharing via OAuth
- **GitHub**: Pull request tracking, code review integration
- **Linear**: Project management, issue tracking for capstone projects
- **Mural**: Collaborative whiteboarding for planning sessions

## 📁 Project Structure

```
transition-trails/
├── App.tsx                      # Main application entry point
├── components/
│   ├── LearnerHome.tsx          # Learner dashboard with focus list
│   ├── TrailMissions.tsx        # Skill selection and mission tracking
│   ├── LearningCenter.tsx       # Course library with three tabs
│   ├── CapstoneProjects.tsx     # Project management with Linear/GitHub
│   ├── Community.tsx            # Slack integration and collaboration
│   ├── Profile.tsx              # User profile with LinkedIn/Resume features
│   ├── CoachDashboard.tsx       # Coach view for learner management
│   ├── AdminPanel.tsx           # Admin analytics and cohort management
│   ├── Navigation.tsx           # Global navigation with notifications
│   ├── PennyChat.tsx            # AI assistant chat interface
│   ├── ui/                      # shadcn/ui components
│   └── figma/                   # Figma-specific components
├── styles/
│   └── globals.css              # Global styles and design tokens
└── guidelines/
    └── Guidelines.md            # Component and development guidelines
```

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ and npm/yarn
- Salesforce Experience Cloud site (for production deployment)
- Access to Salesforce org with necessary permissions

### Installation

1. Clone the repository:
```bash
git clone https://github.com/your-org/transition-trails.git
cd transition-trails
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser to `http://localhost:5173`

### Environment Setup

For full functionality, configure the following integrations:

```env
# Salesforce
SALESFORCE_ORG_URL=your-org.salesforce.com
SALESFORCE_API_VERSION=v60.0

# Trailhead
TRAILHEAD_API_KEY=your-api-key

# Slack
SLACK_WORKSPACE_URL=transitiontrails.slack.com
SLACK_CLIENT_ID=your-client-id
SLACK_CLIENT_SECRET=your-client-secret

# LinkedIn
LINKEDIN_CLIENT_ID=your-client-id
LINKEDIN_CLIENT_SECRET=your-client-secret

# Linear
LINEAR_API_KEY=your-api-key

# GitHub
GITHUB_TOKEN=your-token
```

## 📚 Feature Documentation

### Core Features

#### 1. **Learner Home Dashboard**
- Penny AI curated focus list with intelligent prioritization
- Points progress tracking (3,500 total points system)
- Upcoming sessions calendar
- Trail Missions overview
- Coach information and quick actions

#### 2. **Trail Missions**
- Skill-based mission selection (Admin, Developer, Business Analyst, Designer)
- 12-week guided trail structure
- Progress tracking with visual indicators
- Mission details with learning objectives

#### 3. **Learning Center**
- Three-tab interface: Courses, Progress, Resources
- Viva Learning and PluralSight integration
- Course search and filtering
- Progress tracking and completion status
- Downloadable resources and guides

#### 4. **Capstone Projects**
- Real-world nonprofit project experience
- Linear project board integration
- GitHub pull request tracking
- Multi-phase project workflow (Planning, Development, Testing, Deployment)
- Proactive Penny AI recommendations
- Testing dashboard with UAT focus
- Weekly status reports
- Mural board collaboration

#### 5. **Community (Slack Integration)**
- Five-tab interface: Overview, Channels, Messages, Sessions, Cohort
- Real-time notifications
- Direct messaging preview
- Group sessions (huddles and events) with calendar
- Trending discussions curated by Penny AI
- Cohort member directory
- Past session summaries

#### 6. **LinkedIn Profile Coach**
- LinkedIn OAuth connection
- AI-powered profile optimization across 5 sections:
  - Headline suggestions
  - About section rewrite
  - Experience quantification
  - Skills optimization
  - Featured content recommendations
- Achievement carousel with sharing
- Share composer for posting to LinkedIn
- Copy-to-clipboard functionality
- Toast notifications

#### 7. **Penny Resume Builder**
- PDF resume upload
- AI-powered resume enhancement
- Inline chat interface for questions
- Real-time suggestions with accept/ignore/edit
- Version history tracking
- Preview, download, and LinkedIn export

#### 8. **Coach Dashboard**
- Learner overview with progress tracking
- Bi-weekly feedback forms
- 1:1 session scheduling
- Assessment submissions
- Communication tools

#### 9. **Admin Panel**
- Cohort management
- Analytics and reporting
- User role management
- Content configuration

### AI Features (Penny)

Penny AI is integrated throughout the platform:

- **Focus List Curation**: Intelligent prioritization of tasks across all activities
- **Capstone Recommendations**: Proactive alerts on bugs, blockers, and missing steps
- **Profile Optimization**: LinkedIn and resume enhancement suggestions
- **Community Insights**: Trending discussions and channel recommendations
- **Session Summaries**: AI-generated summaries of group sessions
- **Chat Support**: Context-aware assistance via floating chat widget

## 🎨 Design Guidelines

### Component Design Principles

1. **Clarity**: Clear visual hierarchy with consistent spacing
2. **Accessibility**: WCAG AA compliant with keyboard navigation
3. **Responsiveness**: Mobile-first design approach
4. **Performance**: Optimized rendering with minimal re-renders
5. **Consistency**: Unified design language across all components

### Typography

Default typography is set in `globals.css`:
- **Do not** use Tailwind font size classes (`text-2xl`, etc.) unless specifically changing typography
- **Do not** use font weight classes (`font-bold`) unless overriding defaults
- **Do not** use line height classes (`leading-none`) unless necessary

### Color Usage

- **Primary Actions**: Teal (`#2C6975`)
- **Penny AI Features**: Orange (`#F9A03F`)
- **Success/Progress**: Green (`#3B6A52`)
- **Information**: Sky Blue (`#7EB5C1`)
- **Warnings**: Orange (`#F9A03F`)
- **Backgrounds**: Cream (`#F5F3E8`)

### Component Patterns

See `guidelines/Guidelines.md` for detailed component-specific patterns.

## 🔌 Integration Guides

### Salesforce Experience Cloud

Deploy as Lightning Web Components (LWC) within Experience Cloud:

1. Convert React components to LWC using Salesforce guidelines
2. Map navigation to Experience Cloud pages
3. Use Salesforce authentication and user context
4. Store data in custom Salesforce objects

### Trailhead Integration

Use the TrailTracker sync package:
1. Install TrailTracker from AppExchange
2. Configure user mapping
3. Set up scheduled sync jobs
4. Map badges to achievement system

### Slack Integration

Leverage Salesforce for Slack:
1. Install Salesforce for Slack app
2. Configure OAuth scopes (r_liteprofile, r_emailaddress, w_member_social)
3. Set up event subscriptions for messages and reactions
4. Map Slack users to Salesforce contacts

### LinkedIn Integration

OAuth 2.0 flow:
1. Register LinkedIn application
2. Request permissions (r_liteprofile, r_emailaddress, w_member_social)
3. Store access tokens in Named Credentials
4. Use LinkedIn API for profile data and posting

## 🧪 Testing

### Component Testing
```bash
npm run test
```

### E2E Testing
```bash
npm run test:e2e
```

### Accessibility Testing
```bash
npm run test:a11y
```

## 🚢 Deployment

### Salesforce Experience Cloud

1. Build the project:
```bash
npm run build
```

2. Convert to LWC format:
```bash
npm run convert:lwc
```

3. Deploy to Salesforce:
```bash
sfdx force:source:deploy -p force-app
```

4. Configure Experience Cloud site
5. Assign user permissions
6. Test integration points

## 📖 Additional Documentation

- [Component Guidelines](./guidelines/Guidelines.md) - Detailed component specifications
- [Feature Documentation](./FEATURES.md) - Comprehensive feature documentation
- [API Integration Guide](./API_INTEGRATION.md) - Integration specifications
- [Attributions](./Attributions.md) - Third-party credits and licenses

## 🤝 Contributing

We welcome contributions! Please see our contributing guidelines:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Code Standards

- Follow TypeScript best practices
- Use functional components with hooks
- Maintain component modularity
- Add JSDoc comments for complex functions
- Ensure accessibility compliance
- Write meaningful commit messages

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- Salesforce Trailhead team for learning platform inspiration
- shadcn/ui for the excellent component library
- All contributors and the Transition Trails community

## 📞 Support

- **Documentation**: [docs.transitiontrails.org](https://docs.transitiontrails.org)
- **Community**: [Slack Workspace](https://transitiontrails.slack.com)
- **Issues**: [GitHub Issues](https://github.com/your-org/transition-trails/issues)
- **Email**: support@transitiontrails.org

---

**Built with ❤️ for career changers everywhere**
