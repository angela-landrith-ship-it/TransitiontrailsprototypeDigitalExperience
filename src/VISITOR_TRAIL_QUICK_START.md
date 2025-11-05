# Visitor Trail - Quick Start Guide

## 🚀 What You Get

The Transition Trails platform now includes a **complete Visitor Trail experience** that allows prospective learners to explore the platform before enrolling.

## 📍 Demo Mode Toggle

**Location**: Bottom-left corner of the screen

**Purpose**: Easily switch between visitor and enrolled user experiences

**How to Use**:
```
┌─────────────────┐
│ Demo Mode    🔄 │
├─────────────────┤
│ 👤 Visitor      │  ← Click to view as visitor
│ 🎓 Enrolled     │  ← Click to view as enrolled
│ ✓ Visitor Trail │
└─────────────────┘
```

## 🎯 Quick Testing Path

### 1️⃣ **Visitor Experience** (Default Start)
```
Start → Visitor Landing
  ↓ Click "Begin Your Journey"
Onboarding Modal (Name, Email, Interest)
  ↓ Submit Form
Learning Center (3 free courses)
  ↓ Click "Preview Course"
Earn Exploration Points (15/50)
  ↓ Navigate to Community
Public Slack Channels
  ↓ Navigate to Events
RSVP for Public Events
  ↓ Reach 50 Points OR Click "Enroll Now"
🎓 Switch to Enrolled Mode
```

### 2️⃣ **Enrolled Experience**
```
Learner Home Dashboard
  ↓ Full Navigation Available
Capstone Projects (Unlocked)
Skills Assessment (Unlocked)
Coach Dashboard (Unlocked)
  ↓ Penny Floating Widget Active
Complete Learning Journey
```

## 🔑 Key Features

### Visitor Mode
- ✅ **Landing Page**: Hero with CTA and onboarding
- ✅ **Learning Center**: 3 free + 3 locked courses
- ✅ **Community**: Public Slack channels only
- ✅ **Events**: Public event calendar with RSVP
- ✅ **Penny Preview**: Sky blue AI assistant (limited)
- ✅ **Points System**: Gamified exploration (0-50 points)
- ✅ **Locked Modals**: Preview premium features

### Enrolled Mode
- ✅ **Full Dashboard**: Complete learner home
- ✅ **All Features**: Capstone, Skills, Coach unlocked
- ✅ **Penny AI**: Full orange AI assistant with all capabilities
- ✅ **Complete Navigation**: All pages accessible
- ✅ **Progress Tracking**: 3,500 point system

## 🎨 Visual Indicators

| Element | Visitor Mode | Enrolled Mode |
|---------|--------------|---------------|
| **Nav Color** | Green/Teal gradient | Teal/Orange |
| **Badge** | "Visitor" (Sky Blue) | Profile Avatar |
| **Penny Color** | Sky Blue (#7EB5C1) | Orange (#F9A03F) |
| **Top Banner** | "You're exploring as a Visitor" | None |
| **Locked Icons** | 🔒 on premium features | ✅ All unlocked |
| **Points** | 0-50 Exploration Points | 0-3,500 Program Points |

## 📱 Navigation Structure

### Visitor Navigation
```
Home | Learning Center | Community | Events | [Sign In]
```

### Enrolled Navigation
```
Home | Learning | Coach | Community | [Profile Dropdown]
  └─ Dropdown: Trail Missions, Skills, Capstone, etc.
```

## 🧪 Testing Scenarios

### ✅ Visitor Flow
1. Land on visitor home
2. Complete onboarding
3. Preview 3 courses (+35 points)
4. View community channels
5. RSVP for event (+5 points)
6. Click locked feature → See modal
7. Enroll → Switch to enrolled

### ✅ Enrolled Flow
1. View learner dashboard
2. Navigate to Capstone (unlocked)
3. Navigate to Skills (unlocked)
4. Use Penny AI assistant
5. Complete learning activities
6. Track progress (3,500 points)

### ✅ Mode Switching
1. Start in visitor mode
2. Click demo toggle → Switch to enrolled
3. Navigate enrolled pages
4. Click demo toggle → Switch back to visitor
5. Verify navigation updates correctly

## 🐛 Known Behaviors

### Expected (Not Bugs)
- **Page refresh** resets to visitor mode (session state)
- **Points reset** when switching modes (component state)
- **Navigation redirect** when changing modes (to home page)
- **Penny widget** only shows in enrolled mode

### For Production
- Persist user mode to backend (Salesforce)
- Real authentication (replace demo toggle)
- Store exploration points in database
- Implement Slack invite API
- Track conversion analytics

## 📂 Component Files

### New Components (Visitor Trail)
```
/components/
  ├── VisitorLanding.tsx          # Landing page with onboarding
  ├── VisitorLearningCenter.tsx   # Free courses + locked content
  ├── VisitorCommunity.tsx        # Public Slack channels
  ├── VisitorEvents.tsx           # Event calendar with RSVP
  ├── VisitorNavigation.tsx       # Simplified navigation
  └── LockedFeatureModal.tsx      # Premium feature previews
```

### Modified Components
```
/App.tsx                          # Added visitor mode logic
/components/LearnerHome.tsx       # Capstone card moved to top
```

## 🔗 Conversion Touchpoints

### Where Visitors Can Enroll
1. **Top Banner**: "Enroll Now" button (all visitor pages)
2. **Locked Course**: Click locked course → Modal → "Join Academy"
3. **50 Points**: Reach threshold → Success banner → "Unlock Full Access"
4. **Feature Modals**: Click Capstone/Skills/Coach → Modal → "Join Academy"
5. **Sign In Button**: Top navigation → Switches to enrolled
6. **CTA Banners**: Bottom of Learning/Community/Events pages

## 💡 Pro Tips

### For Demos
1. Start in **visitor mode** to show the full journey
2. Use **demo toggle** to quickly compare experiences
3. Show **locked modals** to highlight premium features
4. Demonstrate **points system** by previewing courses
5. End in **enrolled mode** to show complete platform

### For Development
- Demo toggle is in `App.tsx` (lines 142-188)
- Remove or hide toggle for production deployment
- Update `userMode` initial state to control default
- All visitor pages have consistent `onEnroll` prop

### For Testing
- Use browser DevTools to track state changes
- Check console for onboarding form submissions
- Verify localStorage is NOT being used (session only)
- Test responsive design on mobile (375px)
- Validate all conversion paths lead to enrollment

## 🎬 5-Minute Demo Script

1. **Open App** → "Starts in Visitor Mode"
2. **Landing Page** → "Prospective learners see this first"
3. **Click Begin Journey** → Fill form → Submit
4. **Learning Center** → Preview course → Earn points
5. **Click Locked Course** → Show modal → "Premium features"
6. **Navigate to Events** → RSVP → "Public events available"
7. **Click Enroll Now** → Switch to Enrolled Mode
8. **Learner Home** → "Full access unlocked"
9. **Click Capstone** → "Now accessible"
10. **Show Demo Toggle** → "Easy mode switching for testing"

**Time**: 5 minutes  
**Audience**: Stakeholders, QA, Developers

## 📞 Quick Reference

### State Management
```typescript
// User mode (visitor or enrolled)
const [userMode, setUserMode] = useState<UserMode>('visitor');

// Current page
const [activePage, setActivePage] = useState<PageType>('visitor-home');

// Locked feature modal
const [lockedFeature, setLockedFeature] = useState<...>(null);
```

### Page Types
```typescript
// Visitor pages
'visitor-home' | 'visitor-learning' | 'visitor-community' | 'visitor-events'

// Enrolled pages
'learner' | 'coach-dashboard' | 'capstone-projects' | 'skills-assessment' | ...
```

### Mode Functions
```typescript
handleEnrollment()      // Visitor → Enrolled + Learner Home
handleSignIn()          // Login → Enrolled + Learner Home
handleSwitchToVisitor() // Enrolled → Visitor + Visitor Home
```

## ✅ Testing Checklist

**Visitor Mode:**
- [ ] Landing page displays
- [ ] Onboarding form works
- [ ] Free courses accessible
- [ ] Locked courses show modals
- [ ] Points system tracks correctly
- [ ] Community shows public channels
- [ ] Events allow RSVP
- [ ] All CTAs lead to enrollment

**Enrolled Mode:**
- [ ] Learner home displays
- [ ] All features unlocked
- [ ] Penny widget appears
- [ ] Full navigation works
- [ ] Can access all pages

**Mode Switching:**
- [ ] Demo toggle visible
- [ ] Visitor button works
- [ ] Enrolled button works
- [ ] Navigation updates
- [ ] State changes correctly

---

## 🚦 Status

✅ **Frontend Complete**  
⏳ **Backend Integration Pending**  
📋 **Ready for QA Testing**

---

**Need Help?** See `/VISITOR_MODE_TESTING.md` for detailed testing guide  
**Production Ready?** See `/VISITOR_TRAIL_IMPLEMENTATION.md` for deployment notes
