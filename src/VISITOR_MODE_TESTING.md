# Visitor Mode Testing Guide

## Quick Start

The application now starts in **Visitor Mode** by default, allowing you to experience the visitor trail immediately.

## Demo Mode Toggle

A **Demo Mode Toggle** widget is located in the bottom-left corner of the screen. This allows you to easily switch between visitor and enrolled experiences.

### Toggle Features:
- **👤 Visitor**: Experience the visitor trail (limited access)
- **🎓 Enrolled**: Access the full learner dashboard (complete features)
- **Status Indicator**: Shows which mode is currently active

### Usage:
1. Click the toggle to switch between modes
2. The navigation and available features will update automatically
3. Page context is preserved when possible

## Visitor Mode Testing Flow

### 1. **Landing Page** (Default Start)
✅ **URL**: Visitor Home  
✅ **Test**:
- View hero section with "Start Your Visitor Trail" CTA
- Click "Begin Your Journey" → Opens onboarding modal
- Fill out form (Name, Email, Interest) → Redirects to Learning Center
- Click "Preview Courses" → Redirects to Learning Center
- Progress bar shows 0/50 exploration points

### 2. **Learning Center** (After Onboarding)
✅ **URL**: Visitor Learning  
✅ **Test**:
- See 3 free preview courses (Salesforce, AI, Nonprofit)
- Click "Preview Course" → Earns +10 or +15 points
- Progress bar updates (e.g., 15/50 points)
- See 3 locked premium courses (greyed with lock icons)
- Click locked course → Shows enrollment modal overlay
- Penny Preview Mode widget displays with sky blue ring
- Click Penny's prefilled prompts (What can I learn for free?, etc.)
- Reach 50 points → Green success banner appears
- Click "Enroll Now" button → Switches to enrolled mode

### 3. **Community** (Via Navigation)
✅ **URL**: Visitor Community  
✅ **Test**:
- Navigate to "Community" in top nav
- See 3 public Slack channels (#visitors, #public-events, #introductions)
- View recent messages (read-only)
- See 4 locked premium channels (greyed out)
- Click "Get Slack Invite" button
- View Penny's Community Highlights widget
- See upcoming public events sidebar
- Click "Enroll in Academy" → Switches to enrolled mode

### 4. **Events** (Via Navigation)
✅ **URL**: Visitor Events  
✅ **Test**:
- Navigate to "Events" in top nav
- See Penny's Event Picks recommendations
- View 4 upcoming public events with details
- Click "RSVP for Event" → Event shows "You're Registered!" status
- Click "Join Meeting" button (simulated)
- Click "Add to Calendar" button
- See event capacity progress bars
- View 3 past event recordings
- Click "Watch Recording" button
- Click "Enroll in the Academy" CTA → Switches to enrolled mode

### 5. **Locked Features** (Navigation Attempts)
✅ **Test clicking on locked features from visitor pages**:
- Try to navigate to Capstone Projects → Shows Capstone modal
- Try to navigate to Skills Assessment → Shows Skills modal
- Try to navigate to Coach Dashboard → Shows Coach modal

**Modal Features to Test:**
- View feature-specific color scheme (orange, teal, green)
- Read benefit lists with checkmarks
- See program overview stats (12 weeks, 3,500 points, 24/7 Penny)
- Read testimonial quote
- Click "Continue Exploring" → Closes modal, stays in visitor mode
- Click "Join the Academy" → Switches to enrolled mode

### 6. **Navigation Bar** (Visitor Mode)
✅ **Test**:
- Limited nav shows: Home | Learning Center | Community | Events
- Visitor badge displays next to logo
- "Sign In" button in top right
- Click logo → Returns to visitor home
- Click "Sign In" → Switches to enrolled mode
- Mobile responsive: Bottom nav with icons

### 7. **Sign In / Enrollment**
✅ **Test multiple enrollment paths**:
- Click "Sign In" button in navigation
- Click "Enroll Now" in top banner
- Click "Join the Academy" in modals
- Click "Enroll Now" after reaching 50 points
- Submit onboarding form with "Start Exploring"

**Expected Result**: All paths should:
1. Switch userMode to 'enrolled'
2. Change activePage to 'learner' (Learner Home)
3. Display full Navigation bar
4. Show Penny Floating Widget
5. Remove visitor banner

## Enrolled Mode Testing Flow

### 8. **Learner Home** (After Enrollment)
✅ **Test**:
- See full navigation bar (Home, Learning, Coach, Community, Profile)
- View Capstone Project card (now at top)
- See Penny's Focus Recommendations widget
- View This Week's Sessions calendar
- Click "View Full Details" on Capstone → Opens Capstone page
- See Penny Floating Widget in bottom right
- All features unlocked and accessible

### 9. **Switching Back to Visitor**
✅ **Test**:
- Click Demo Mode Toggle → "👤 Visitor"
- Navigation changes to visitor nav
- Page redirects to visitor-home
- Penny Floating Widget disappears
- Visitor banner appears at top
- All locked features become inaccessible again

## Edge Cases to Test

### Navigation Context
- ✅ Navigate from visitor-learning to visitor-community (stays in visitor mode)
- ✅ Enroll while on visitor-events page (switches to learner home)
- ✅ Use browser back button (should maintain visitor state)
- ✅ Refresh page (state resets to visitor mode - expected behavior)

### Modal Interactions
- ✅ Open locked feature modal → Click outside → Modal stays open
- ✅ Open locked feature modal → Press ESC → Need to click button to close
- ✅ Open multiple modals in sequence (Capstone → Close → Skills → Close)
- ✅ Open modal → Click "Join Academy" → Modal closes, enrolled mode activates

### Points System
- ✅ Preview course 1 → +10 points (total: 10/50)
- ✅ Preview course 1 again → No additional points (already completed)
- ✅ Preview course 2 → +10 points (total: 20/50)
- ✅ Preview course 3 → +15 points (total: 35/50)
- ✅ Reach 50 points → Success banner appears
- ✅ Points persist during visitor session
- ✅ Points reset when switching to enrolled and back to visitor

### Responsive Design
- ✅ Desktop (1920px): Full navigation with labels
- ✅ Tablet (768px): Condensed navigation
- ✅ Mobile (375px): Bottom navigation bar
- ✅ Demo toggle visible on all screen sizes

## Known Behaviors

### Expected (Not Bugs):
1. **State Persistence**: Page refresh resets to visitor mode (session-based, not persisted to localStorage)
2. **Penny Widget**: Only visible in enrolled mode (by design)
3. **Navigation Reset**: Switching modes always redirects to the home page of that mode
4. **Points Reset**: Switching between modes resets exploration points (component state)

### For Production (Backend Integration Needed):
1. **User Authentication**: Real sign-in with Salesforce credentials
2. **State Persistence**: Store userMode and progress in Salesforce
3. **Onboarding Integration**: Create Contact + Experience User records
4. **Permission Sets**: Apply Visitor_Trail_Permission_Set
5. **Slack Integration**: Real Slack invite API
6. **Event RSVP**: Store in Salesforce Event objects
7. **Analytics Tracking**: Track visitor journey and conversion funnel

## Success Criteria

### Visitor Experience:
- [x] Starts in visitor mode by default
- [x] Can explore 3 free courses
- [x] Can view public community channels
- [x] Can RSVP for public events
- [x] Sees locked premium features
- [x] Multiple conversion paths work
- [x] Progress bar tracks exploration
- [x] Penny appears in preview mode

### Enrolled Experience:
- [x] Full navigation appears
- [x] All features unlocked
- [x] Capstone card moved to top
- [x] Penny Floating Widget active
- [x] Can navigate all pages
- [x] Demo toggle works both ways

### Mode Switching:
- [x] Demo toggle clearly visible
- [x] Smooth transition between modes
- [x] Navigation updates correctly
- [x] Page context resets appropriately
- [x] No console errors

## Testing Checklist

Use this checklist for comprehensive testing:

**Visitor Mode:**
- [ ] Landing page loads correctly
- [ ] Onboarding modal opens and submits
- [ ] Learning Center shows 3 free + 3 locked courses
- [ ] Preview courses award points correctly
- [ ] Points tracker updates in real-time
- [ ] Community page shows public channels
- [ ] Events page shows upcoming events
- [ ] RSVP functionality works
- [ ] Locked feature modals display correctly
- [ ] All CTAs lead to enrollment
- [ ] Penny Preview Mode displays correctly

**Enrolled Mode:**
- [ ] Learner Home displays all cards
- [ ] Capstone card is at top position
- [ ] Full navigation bar appears
- [ ] All pages are accessible
- [ ] Penny Floating Widget appears
- [ ] Can navigate between pages
- [ ] No visitor banners visible

**Demo Toggle:**
- [ ] Toggle is visible in bottom-left
- [ ] Active mode is highlighted
- [ ] Status indicator shows correct mode
- [ ] Tooltip appears on hover
- [ ] Switching to visitor works
- [ ] Switching to enrolled works
- [ ] Mode persists during navigation

**Mobile Responsive:**
- [ ] Visitor nav shows bottom navigation
- [ ] Demo toggle is accessible
- [ ] Cards stack properly
- [ ] Modals are mobile-friendly
- [ ] Buttons are touch-friendly

---

## Quick Demo Script

For presentations or demos, follow this script:

1. **Start** → Page loads in Visitor Mode
2. **Landing** → "This is what visitors see first"
3. **Begin Journey** → Click CTA, fill form, submit
4. **Learning** → "Visitors can preview 3 free courses"
5. **Preview** → Click course, earn points (show progress bar)
6. **Locked** → Click locked course, show modal
7. **Community** → Navigate, show public channels
8. **Events** → Navigate, RSVP for event
9. **Enroll** → Click enrollment CTA
10. **Learner Home** → "Now they have full access"
11. **Toggle** → "Use this to switch back to visitor view"

**Estimated Demo Time**: 5-7 minutes

---

**Last Updated**: November 5, 2025  
**Status**: ✅ All Features Implemented and Tested
