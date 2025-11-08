# 🎯 AUDIENCE JOURNEY FLOW ENHANCEMENT

**Project:** Transition Trails Digital Experience Portal  
**Platform:** Salesforce Experience Cloud (LWR)  
**Date:** November 8, 2025  
**Status:** Ready to Implement  

---

## 🧭 OVERVIEW

This document defines the enhanced user journey flows for **three distinct audience types**, ensuring smooth progression from first contact to active participation with emotionally engaging touchpoints and clear upgrade paths.

---

## 👥 AUDIENCES IN SCOPE

### **A. Unregistered User (Public Visitor)**
- **Profile:** Anonymous website visitor
- **Access Level:** Public pages only
- **Goal:** Discover the Academy and understand its mission
- **Transition Goal:** Register to join the Visitor's Trail
- **Color Theme:** Sky Blue (#7EB5C1) - Curiosity

### **B. Visitor's Trail Participant**
- **Profile:** Registered user with limited access
- **Access Level:** Preview courses, public community spaces
- **Goal:** Sample limited content and explore community
- **Transition Goal:** Upgrade to Guided Trail
- **Color Theme:** Amber (#F9A03F) - Momentum

### **C. Guided Trail Participant**
- **Profile:** Active learner with full access
- **Access Level:** Complete learning experience + coaching
- **Goal:** Engage deeply in structured learning
- **Transition Goal:** Prepare for Trail of Mastery
- **Color Theme:** Evergreen (#3B6A52) - Growth

---

## 📊 FLOW OBJECTIVES

| Audience | Primary Goal | Transition Goal | Key Metric |
|----------|-------------|-----------------|------------|
| **Unregistered User** | Discover the Academy and understand its mission | Register to join the Visitor's Trail | Conversion to Visitor |
| **Visitor's Trail Participant** | Sample limited courses and community spaces | Upgrade to Guided Trail through value-driven prompts | Upgrade rate |
| **Guided Trail Participant** | Engage deeply in structured learning and mentorship | Prepare for Trail of Mastery enrollment | Completion rate |

---

## 🔄 COMPLETE JOURNEY FLOW

```
DISCOVERY → EXPLORATION → ENGAGEMENT → TRANSFORMATION

┌──────────────┐     ┌──────────────┐     ┌──────────────┐     ┌──────────────┐
│              │     │              │     │              │     │              │
│ UNREGISTERED │ ──► │   VISITOR    │ ──► │   GUIDED     │ ──► │   MASTERY    │
│     USER     │     │    TRAIL     │     │    TRAIL     │     │    TRAIL     │
│              │     │              │     │              │     │              │
└──────────────┘     └──────────────┘     └──────────────┘     └──────────────┘
   Discovery            Exploration         Engagement         Transformation
   
   Public Site      Limited Access      Full Learning      Advanced Tracks
   Curiosity        Momentum            Growth             Expertise
   Sky Blue         Amber               Evergreen          Teal
```

---

## 🎬 A. UNREGISTERED USER FLOW

### **Stage 1: Landing (Public Homepage)**

**Page:** `VisitorLanding.tsx`  
**URL:** `/` or `/visitor`  
**Experience Cloud:** Guest User Profile

**Hero Section:**
```
┌─────────────────────────────────────────────────────┐
│  [Full-width background image: diverse learners]    │
│                                                     │
│          🎒 Transition Trails Academy               │
│                                                     │
│         Find Your Trail. Build Your Future.        │
│                                                     │
│    Start your free Visitor Trail and see what      │
│         the Academy offers.                         │
│                                                     │
│       [ Start the Visitor Trail → ]                │
│          Learn More | Success Stories               │
│                                                     │
└─────────────────────────────────────────────────────┘
```

**Key Elements:**
- Logo + "Free Visitor Access" badge
- Clear value proposition
- Social proof (5k+ learners, testimonials)
- Single primary CTA: "Start the Visitor Trail"
- Secondary CTAs: "Learn More", "See Community Stories"

**Penny Interaction:**
- **Placement:** Bottom-right floating widget
- **Message:** "Want to explore? I can show you around! 👋"
- **Tone:** Welcoming, curious
- **CTA:** "Get Started"

---

### **Stage 2: About & Benefits Section**

**Content Blocks:**
1. **What You Can Explore** (4-column grid)
   - 🎓 Explore Learning Paths (Sky Blue)
   - 👥 Join Public Community (Sky Blue)
   - 📅 Attend Free Events (Green)
   - ✨ Meet Penny AI (Amber)

2. **Ready for More?** (Upgrade Preview)
   - Shows locked features with blur/lock icons
   - 🏆 Capstone Projects (Amber border)
   - 🎯 Personal Coaching (Teal border)
   - 🎓 Trail of Mastery (Sky Blue border)

3. **From Visitors to Success Stories** (Testimonials)
   - 2-column testimonial cards
   - Real learner transformations
   - "Sarah Martinez: Visitor → Certified Admin"

---

### **Stage 3: Registration Flow**

**Modal:** 2-Step Registration  
**Trigger:** CTA button clicks

**Step 1 - Registration Form:**
```
┌─────────────────────────────────────┐
│    ✨ Join the Visitor Trail        │
│                                     │
│  Tell us a bit about yourself      │
│                                     │
│  ⬤ ○  (Step 1 of 2)               │
│                                     │
│  First Name: [____________]         │
│  Last Name:  [____________]         │
│  Email:      [____________]         │
│  Interest:   [▼ Salesforce    ]     │
│                                     │
│  ☐ I agree to join Visitor Slack    │
│                                     │
│  [ Cancel ]  [ Continue → ]         │
│                                     │
└─────────────────────────────────────┘
```

**Fields:**
- First Name (required)
- Last Name (required)
- Email Address (required)
- Area of Interest (dropdown: Salesforce, Business Analysis, AI, Nonprofit)
- Slack agreement (checkbox)

**Step 2 - Confirmation:**
```
┌─────────────────────────────────────┐
│    ✅ ○  (Step 2 of 2)             │
│                                     │
│         ✨                          │
│     [Penny Avatar]                  │
│                                     │
│  Welcome to Transition Trails!      │
│  Your Visitor account is ready.     │
│                                     │
│  ┌─────────────────────────────┐   │
│  │ "Let's explore your first   │   │
│  │  trail together!"           │   │
│  │  — Penny, Your AI Guide     │   │
│  └─────────────────────────────┘   │
│                                     │
│  [ 🎓 Go to Learning Center ]       │
│                                     │
└─────────────────────────────────────┘
```

**Salesforce Action:**
- Creates Contact record
- Creates Experience User with "Visitor_Trail_Participant" profile
- Assigns to "Visitor" audience
- Sends welcome email
- Auto-joins public Slack channels

**Completion → Redirect to Visitor Dashboard**

---

## 🔍 B. VISITOR'S TRAIL FLOW

### **Stage 1: Visitor Dashboard (First Login)**

**Page:** `VisitorLearningCenter.tsx`  
**URL:** `/visitor/home`  
**Profile:** Visitor_Trail_Participant

**Welcome Banner:**
```
┌─────────────────────────────────────────────────────┐
│  👋 Welcome, [FirstName]!                          │
│  You're now on the Visitor's Trail                 │
│                                                     │
│  ✅ Completed: Registration                        │
│  ▶️  Next: Explore your first course               │
│                                                     │
│  [Profile Avatar] Exploration Points: 0/500        │
│                                                     │
└─────────────────────────────────────────────────────┘
```

**Sections Visible:**
1. **Learning Center** (Limited Access)
   - 3 intro courses unlocked
   - Remaining courses with blur + lock icon
   - Progress rings for available courses

2. **Events** (Full Access)
   - Public webinars and workshops
   - Calendar integration
   - RSVP capability

3. **Community Preview** (Limited Access)
   - Public Slack channels visible
   - Private channels blurred
   - "Unlock Guided Trail to collaborate with peers"

4. **Portfolio** (Preview)
   - Empty state with example projects
   - "Unlock with Guided Trail enrollment"

**Penny Widget:**
- **Placement:** Bottom-right, persistent
- **Message:** "You've unlocked the Visitor's Trail! Ready to go further?"
- **Tone:** Encouraging, guide
- **Actions:** "Show me around", "What can I do here?"

---

### **Stage 2: Learning Center (Limited Courses)**

**Available Courses:**
1. ✅ **Intro to Salesforce Nonprofit Cloud** (Unlocked)
   - 3 modules, 15 min each
   - Progress ring: 0%
   - +50 points on completion

2. ✅ **Trailhead Basics** (Unlocked)
   - 4 modules, 20 min each
   - Progress ring: 0%
   - +75 points on completion

3. ✅ **Community Engagement 101** (Unlocked)
   - 2 modules, 10 min each
   - Progress ring: 0%
   - +25 points on completion

**Locked Courses:** (Blurred with lock icon)
4. 🔒 **Salesforce Administration Fundamentals**
5. 🔒 **Lightning Web Components Basics**
6. 🔒 **Apex Programming Introduction**
7. 🔒 **Business Analysis for Nonprofits**
8. 🔒 **AI-Powered Salesforce Tools**

**Each locked course shows:**
```
┌─────────────────────────────────┐
│  [Blurred course card]          │
│                                 │
│  🔒 Unlock with Guided Trail    │
│                                 │
│  [ Upgrade Now → ]              │
│                                 │
└─────────────────────────────────┘
```

---

### **Stage 3: Community Tab (Preview)**

**Public Channels Available:**
- #general
- #introductions
- #events
- #ask-a-question

**Private Channels (Blurred):**
- #guided-learners (locked)
- #peer-support (locked)
- #capstone-showcase (locked)
- #coach-office-hours (locked)

**CTA Card:**
```
┌─────────────────────────────────────────┐
│  🚀 Unlock Full Community Access        │
│                                         │
│  Guided Trail members get:              │
│  ✓ Private study groups                │
│  ✓ Peer review network                 │
│  ✓ Direct coach messaging              │
│  ✓ Exclusive events                    │
│                                         │
│  [ Upgrade to Guided Trail → ]         │
│                                         │
└─────────────────────────────────────────┘
```

---

### **Stage 4: Upgrade Prompt (Conversion Trigger)**

**Trigger Conditions:**
1. **Progress-based:** 70% of Visitor content completed
2. **Time-based:** After 7 days of exploration
3. **Engagement-based:** Viewed 5+ locked features
4. **Manual:** Clicked any "Upgrade" CTA

**Modal - Upgrade to Guided Trail:**
```
┌─────────────────────────────────────────────────┐
│         🎉 Ready to Go Deeper?                  │
│                                                 │
│  You've completed 75% of the Visitor Trail!     │
│                                                 │
│  Upgrade to the Guided Trail and unlock:        │
│                                                 │
│  ✓ 12-week structured learning path             │
│  ✓ Personal learning coach                      │
│  ✓ Capstone project with real nonprofit        │
│  ✓ Full community access                        │
│  ✓ Certification prep                           │
│  ✓ Career placement support                     │
│                                                 │
│  ┌─────────────────────────────────────┐       │
│  │  Investment: $1,495/learner          │       │
│  │  Next cohort: January 15, 2025       │       │
│  └─────────────────────────────────────┘       │
│                                                 │
│  [ Maybe Later ]  [ Enroll in Guided Trail → ]  │
│                                                 │
└─────────────────────────────────────────────────┘
```

**Penny Intervention:**
- Appears alongside modal
- "I've seen your progress, [FirstName]. You're ready for the next level!"
- Shows personalized stats
- Encouragement message

**Salesforce Action on Upgrade:**
- Updates User Profile → "Guided_Trail_Participant"
- Creates Trail_Enrollment__c record
- Assigns coach via Coach_Assignment__c
- Unlocks all learning content
- Sends enrollment confirmation email
- Schedules welcome call with coach

---

## 🎓 C. GUIDED TRAIL PARTICIPANT FLOW

### **Stage 1: Welcome Page (First Login)**

**Page:** `LearnerHome.tsx` with first-time overlay  
**URL:** `/home`  
**Profile:** Guided_Trail_Participant

**Welcome Overlay:**
```
┌──────────────────────────────────────────────────┐
│          ✨ Welcome to the Guided Trail!        │
│                                                  │
│         You're now on the Guided Trail!         │
│                                                  │
│  Your personalized learning journey starts now. │
│                                                  │
│  Next steps:                                     │
│  1. 👤 Meet your coach (Sarah Martinez)         │
│  2. 💬 Join your Slack group                    │
│  3. 🎯 Select your learning goals               │
│                                                  │
│  [ Get Started → ]                               │
│                                                  │
└──────────────────────────────────────────────────┘
```

---

### **Stage 2: Guided Dashboard**

**Full Navigation:**
```
┌─────────────────────────────────────────────────┐
│  [Logo] Transition Trails  [Guided Badge]       │
│                                                 │
│  Home | Trails | Community | Coach | Progress   │
│                                                 │
└─────────────────────────────────────────────────┘
```

**Sidebar:**
- My Trails
- My Coach
- Events
- Progress
- Merch
- Feedback

**Dashboard Sections:**
1. **Hero - Current Trail Progress**
   ```
   ┌────────────────────────────────────┐
   │  Week 3 of 12                      │
   │  Salesforce Admin Trail            │
   │                                    │
   │  [Progress Ring: 25%]              │
   │                                    │
   │  1,250 / 3,500 points              │
   │  Level 3: Apprentice               │
   │                                    │
   └────────────────────────────────────┘
   ```

2. **Today's Focus (Penny Curated)**
   - 3 priority tasks
   - AI-selected based on critical path
   - Color-coded by urgency

3. **Coach Connection**
   ```
   ┌────────────────────────────────────┐
   │  👤 Your Coach: Sarah Martinez      │
   │                                    │
   │  Last check-in: Yesterday          │
   │  Next 1:1: Monday 2pm              │
   │                                    │
   │  [ Message Coach ]  [ Schedule ]   │
   │                                    │
   └────────────────────────────────────┘
   ```

4. **Upcoming Sessions**
   - Next 5 events
   - Calendar integration
   - Zoom links ready

5. **Capstone Progress**
   - Current phase indicator
   - GitHub repo link
   - Linear project link
   - Next milestone

---

### **Stage 3: Coach Interaction**

**Direct Message Capability:**
- Real-time Slack integration
- In-app messaging fallback
- Message history
- File sharing

**Mission Feed:**
- Coach-assigned tasks
- Feedback threads
- Assessment results
- Milestone celebrations

**1:1 Sessions:**
- Calendar integration
- Zoom auto-join
- Session notes
- Recording access

---

### **Stage 4: Course Pathway (Full Access)**

**Learning Sequence:**
1. ✅ **Foundation Week (Week 1-2)**
   - All Visitor content + expanded modules
   - Assessment at end

2. ▶️ **Core Skills (Week 3-6)**
   - Salesforce Administration
   - Lightning Components
   - Apex Basics
   - Weekly quizzes

3. 🔒 **Advanced Topics (Week 7-10)**
   - Integration patterns
   - Security & governance
   - AI tools
   - Unlocks after Week 6

4. 🔒 **Capstone Project (Week 11-12)**
   - Real nonprofit partner
   - GitHub repository
   - Linear project management
   - Peer review process

**Capstone Preview Banner:**
```
┌────────────────────────────────────────────────┐
│  🏆 Capstone Project                           │
│                                                │
│  Complete this trail to unlock a              │
│  certification prep session and build your    │
│  final project with a nonprofit partner.      │
│                                                │
│  [ Learn More ]                                │
│                                                │
└────────────────────────────────────────────────┘
```

---

### **Stage 5: Gamification Elements**

**Visible Everywhere:**
1. **Streaks Widget**
   ```
   🔥 7-day learning streak
   Keep it going!
   ```

2. **Points Progress**
   ```
   ⭐ 1,250 / 3,500 points
   250 points to next level
   ```

3. **Community Contributions**
   ```
   💬 5 helpful forum replies
   🏅 Earned "Helpful" badge
   ```

4. **Level Indicator**
   ```
   Level 3: Apprentice
   [Progress bar] → Level 4
   ```

---

### **Stage 6: Next-Level Prompt (Trail of Mastery)**

**Trigger:** 80% completion of Guided Trail

**Modal - Prepare for Mastery:**
```
┌─────────────────────────────────────────────────┐
│          🌟 You're Almost There!                │
│                                                 │
│  You've completed 80% of the Guided Trail!      │
│                                                 │
│  Ready for the Trail of Mastery?                │
│                                                 │
│  Choose your professional track:                │
│  • Salesforce Administrator                     │
│  • Salesforce Developer                         │
│  • Business Analyst                             │
│  • Nonprofit Consultant                         │
│                                                 │
│  [ Explore Mastery Tracks → ]                   │
│                                                 │
└─────────────────────────────────────────────────┘
```

---

## 🎨 DESIGN GUIDANCE

### **Navigation Consistency**

**All Roles Use Same Top Nav Structure:**
```
[Logo] [Role Badge] | Navigation Items | [Profile/Actions]
```

**Role-Specific Badges:**
- 🔵 Visitor (Sky Blue)
- 🟠 Guided (Amber)
- 🟢 Mastery (Evergreen)

---

### **Progressive Disclosure**

**Visual Patterns:**
1. **Unlocked Content:**
   - Full visibility
   - Interactive
   - Progress indicators

2. **Locked Content:**
   - Blur effect (backdrop-blur-sm)
   - Lock icon overlay
   - "Unlock with..." label
   - Upgrade CTA button

3. **Coming Soon:**
   - Grayscale filter
   - "Available after Week X"
   - Countdown timer

**Example Code:**
```tsx
<div className="relative">
  {isLocked && (
    <div className="absolute inset-0 backdrop-blur-sm bg-white/30 flex items-center justify-center z-10">
      <div className="text-center">
        <Lock className="w-8 h-8 text-gray-500 mb-2 mx-auto" />
        <p className="text-sm text-gray-700">Unlock with Guided Trail</p>
        <button className="mt-2 px-4 py-2 bg-[#F9A03F] text-white rounded-lg">
          Upgrade Now
        </button>
      </div>
    </div>
  )}
  {/* Actual content */}
</div>
```

---

### **Penny Placement by Role**

**1. Unregistered User:**
- **Position:** Bottom-right floating widget
- **State:** Minimized with pulse
- **Message:** "Want to explore? I can show you around! 👋"
- **Tone:** Welcoming, inviting
- **Color:** Sky Blue accent

**2. Visitor:**
- **Position:** Bottom-right, context-aware
- **State:** Expanded when helpful
- **Messages:**
  - On landing: "Great choice! Let me show you what you can explore."
  - After first course: "Nice work! Ready for another?"
  - At 70% complete: "You're doing great! Have you considered the Guided Trail?"
- **Tone:** Encouraging, supportive
- **Color:** Amber accent

**3. Guided:**
- **Position:** Integrated into dashboard + floating widget
- **State:** Proactive with tasks
- **Messages:**
  - Morning: "Good morning! Here are today's priorities."
  - Milestone: "Congratulations on completing Module 5! 🎉"
  - Stuck: "Having trouble? Let me suggest some resources."
- **Tone:** Coach-like, personalized
- **Color:** Evergreen accent

---

### **Visual Theme: Trail-Inspired**

**Imagery:**
- Pathways and trails
- Milestones and signposts
- Mountains and peaks
- Journey metaphors
- Nature gradients

**Iconography:**
- 🎒 Backpack (learner identity)
- 🗺️ Map (navigation)
- 🏔️ Mountain (goals)
- 🔥 Campfire (community)
- ⭐ Stars (achievements)

---

### **Color Accents by Stage**

| Stage | Primary Color | Usage |
|-------|--------------|-------|
| **Unregistered** | Sky Blue (#7EB5C1) | CTAs, badges, highlights |
| **Visitor** | Amber (#F9A03F) | Upgrade prompts, unlocked content |
| **Guided** | Evergreen (#3B6A52) | Active state, success messages |
| **Mastery** | Teal (#2C6975) | Advanced features, expertise |

**Gradient Usage:**
- Unregistered: `from-[#7EB5C1] to-[#2C6975]`
- Visitor: `from-[#F9A03F] to-[#e89135]`
- Guided: `from-[#3B6A52] to-[#2d5240]`

---

## 📐 COMPONENT ARCHITECTURE

### **New Components Needed:**

1. **`ProgressiveFeatureLock.tsx`**
   - Wraps locked content
   - Shows blur + lock icon
   - Displays upgrade CTA
   - Props: `isLocked`, `unlockLevel`, `onUpgrade`

2. **`UpgradePromptModal.tsx`**
   - Triggered by various conditions
   - Shows benefits of upgrade
   - Pricing and enrollment info
   - Integration with enrollment flow

3. **`WelcomeOverlay.tsx`**
   - First-time user onboarding
   - Role-specific welcome messages
   - Next steps guidance
   - Props: `role`, `firstName`, `onComplete`

4. **`PennyContextual.tsx`**
   - Enhanced Penny widget
   - Role-aware messaging
   - Context detection
   - Proactive suggestions

5. **`RoleBadge.tsx`**
   - Visual indicator of user role
   - Color-coded
   - Used in navigation
   - Props: `role`, `size`

6. **`ExplorationMeter.tsx`**
   - Tracks Visitor progress
   - Shows points toward unlock
   - Gamifies exploration
   - Props: `current`, `target`, `onGoalReached`

---

## ⚙️ TECHNICAL IMPLEMENTATION

### **Salesforce Role Mapping**

```apex
// User Profiles
public enum UserRole {
    GUEST,                        // Unregistered
    VISITOR_TRAIL_PARTICIPANT,    // Visitor
    GUIDED_TRAIL_PARTICIPANT,     // Guided
    MASTERY_TRAIL_PARTICIPANT     // Mastery
}
```

**Profile-to-Component Mapping:**
```typescript
// App.tsx
const getUserRole = (user: User): UserRole => {
  if (!user) return 'GUEST';
  if (user.profile === 'Visitor_Trail_Participant') return 'VISITOR';
  if (user.profile === 'Guided_Trail_Participant') return 'GUIDED';
  if (user.profile === 'Mastery_Trail_Participant') return 'MASTERY';
  return 'GUEST';
};
```

---

### **Experience Cloud Audiences**

**Audience Definitions:**
1. **Guest User**
   - Profile: Guest User Profile
   - Pages: `/visitor`, `/about`, `/contact`

2. **Visitor Trail**
   - Profile: Visitor_Trail_Participant
   - Pages: `/visitor/home`, `/visitor/learning`, `/visitor/events`
   - Restricted: Coach, Capstone, Mastery content

3. **Guided Trail**
   - Profile: Guided_Trail_Participant
   - Pages: All learner pages
   - Restricted: Admin panels, Mastery-only content

4. **Trail of Mastery**
   - Profile: Mastery_Trail_Participant
   - Pages: All content + advanced tracks
   - Full access

---

### **Registration Flow (Self-Registration)**

**Experience Cloud Flow:** `Visitor_Trail_Registration`

**Steps:**
1. Screen 1: Collect user info
2. Decision: Check for existing Contact by email
3. Create Contact (if new)
4. Create Experience User
5. Assign to Visitor profile
6. Send welcome email
7. Add to "Visitor_Trail_Members" public group
8. Auto-join Slack (via API)
9. Redirect to `/visitor/home`

**Apex Class:** `VisitorRegistrationController.cls`

```apex
@AuraEnabled
public static User createVisitorUser(String firstName, String lastName, String email, String interest) {
    // Create Contact
    Contact newContact = new Contact(
        FirstName = firstName,
        LastName = lastName,
        Email = email,
        Interest_Area__c = interest,
        Registration_Date__c = System.today(),
        Source__c = 'Visitor Trail Web Registration'
    );
    insert newContact;
    
    // Create Experience User
    User newUser = new User(
        FirstName = firstName,
        LastName = lastName,
        Email = email,
        Username = email + '.visitor@transitiontrails.org',
        ProfileId = [SELECT Id FROM Profile WHERE Name = 'Visitor_Trail_Participant' LIMIT 1].Id,
        ContactId = newContact.Id
    );
    insert newUser;
    
    // Auto-assign to public group
    // Send welcome email
    // Return user record
    
    return newUser;
}
```

---

### **Upgrade Process Flow**

**Experience Cloud Flow:** `Upgrade_to_Guided_Trail`

**Trigger:** User clicks "Upgrade" CTA

**Steps:**
1. Screen: Confirm enrollment details
2. Payment processing (Stripe integration)
3. Update User Profile → Guided_Trail_Participant
4. Create Trail_Enrollment__c record
5. Assign Coach (Coach_Assignment__c)
6. Send enrollment confirmation email
7. Schedule welcome call (Event__c)
8. Update permissions
9. Redirect to `/home` with welcome overlay

---

## 📊 SUCCESS METRICS

### **Unregistered → Visitor Conversion**
- **Goal:** 40% of landing page visitors register
- **Tracking:** GA4 conversion events
- **Key Metric:** Registration completion rate

### **Visitor → Guided Upgrade Rate**
- **Goal:** 25% of Visitors upgrade within 30 days
- **Tracking:** Salesforce Trail_Enrollment__c records
- **Key Metric:** Days to upgrade, completion % at upgrade

### **Guided Completion Rate**
- **Goal:** 85% complete Guided Trail
- **Tracking:** Trail__c Progress_Percentage__c
- **Key Metric:** Time to completion, engagement score

### **Overall Journey Metrics**
```
Unregistered Users:      10,000/month
  ↓ (40% convert)
Visitor Sign-ups:        4,000/month
  ↓ (25% upgrade)
Guided Enrollments:      1,000/month
  ↓ (85% complete)
Trail Completions:       850/month
```

---

## 🎯 IMPLEMENTATION CHECKLIST

### **Phase 1: Foundation (Week 1)**
- [ ] Create role-based routing logic
- [ ] Build `RoleBadge` component
- [ ] Build `ProgressiveFeatureLock` component
- [ ] Update `VisitorNavigation` with role indicator
- [ ] Test role transitions

### **Phase 2: Unregistered Flow (Week 1)**
- [ ] Enhance `VisitorLanding` with journey messaging
- [ ] Add Penny guest widget
- [ ] Polish registration modal
- [ ] Test conversion funnel

### **Phase 3: Visitor Flow (Week 2)**
- [ ] Build `ExplorationMeter` component
- [ ] Add locked content overlays
- [ ] Build `UpgradePromptModal` component
- [ ] Implement trigger logic (70% completion)
- [ ] Add Penny visitor mode

### **Phase 4: Guided Flow (Week 2)**
- [ ] Build `WelcomeOverlay` component
- [ ] Enhance `LearnerHome` first-time experience
- [ ] Add Penny guided mode
- [ ] Implement next-level prompts
- [ ] Test full journey flow

### **Phase 5: Polish & Testing (Week 3)**
- [ ] QA all three flows
- [ ] Mobile responsiveness
- [ ] Accessibility audit
- [ ] Performance optimization
- [ ] Documentation

---

## 🎨 DESIGN ASSETS NEEDED

### **Images:**
- [ ] Hero background (diverse learners outdoors)
- [ ] Testimonial photos (2-3 real learners)
- [ ] Trail imagery (pathways, milestones)
- [ ] Penny avatar variations (3 moods)
- [ ] Success story photos

### **Icons:**
- [ ] Lock icon (locked features)
- [ ] Unlock animation
- [ ] Progress indicators
- [ ] Role badges
- [ ] Trail metaphors

### **Illustrations:**
- [ ] Empty states for each role
- [ ] Upgrade benefit graphics
- [ ] Journey map visual
- [ ] Milestone celebrations

---

## 📱 RESPONSIVE DESIGN

### **Breakpoints:**
- **Mobile:** < 768px (single column, simplified nav)
- **Tablet:** 768px - 1023px (2-column layout)
- **Desktop:** 1024px+ (full grid system)

### **Mobile-Specific:**
- Bottom navigation for Visitor/Guided
- Collapsible sections
- Swipeable content
- Simplified upgrade modals
- Thumb-friendly CTAs

---

## ♿ ACCESSIBILITY

### **WCAG AA Compliance:**
- [ ] All interactive elements keyboard accessible
- [ ] Focus indicators on all buttons/links
- [ ] Alt text on all images
- [ ] ARIA labels for screen readers
- [ ] Color contrast ratios meet standards
- [ ] Form labels properly associated
- [ ] Modal trap focus properly

### **Screen Reader Testing:**
- [ ] Test with NVDA
- [ ] Test with JAWS
- [ ] Test with VoiceOver (iOS)
- [ ] Test with TalkBack (Android)

---

## 🚀 LAUNCH PLAN

### **Soft Launch (Week 1):**
- Deploy to staging environment
- Internal team testing
- Fix critical bugs

### **Beta Launch (Week 2):**
- Open to 50 beta users
- Collect feedback
- Monitor conversion metrics
- Iterate based on feedback

### **Full Launch (Week 3):**
- Deploy to production
- Monitor metrics daily
- A/B test upgrade prompts
- Optimize conversion funnels

---

## 📈 EXPECTED OUTCOMES

### **Improved Conversion:**
- Unregistered → Visitor: 40% (up from 25%)
- Visitor → Guided: 25% (up from 15%)
- Guided → Completion: 85% (up from 70%)

### **Better Engagement:**
- Time on site: +50%
- Content completion: +35%
- Community participation: +40%
- Satisfaction scores: 90%+

### **Clear Value Prop:**
- Users understand progression
- Upgrade reasons are clear
- Transition friction reduced
- Emotional connection established

---

## 🎊 SUCCESS CRITERIA

### **User Experience:**
✅ Smooth progression between roles  
✅ Clear value at each stage  
✅ No confusion about access levels  
✅ Penny guidance feels natural  
✅ Upgrade prompts feel timely, not pushy  

### **Technical:**
✅ Role transitions instant  
✅ No permission errors  
✅ Responsive on all devices  
✅ Page load < 2 seconds  
✅ 99.9% uptime  

### **Business:**
✅ 40% visitor conversion rate  
✅ 25% guided upgrade rate  
✅ 85% completion rate  
✅ Positive NPS (70+)  
✅ Low support tickets  

---

**Status:** Ready to implement  
**Next Step:** Build `ProgressiveFeatureLock` and `UpgradePromptModal` components  
**Timeline:** 3 weeks to full implementation  

**LET'S BUILD THE SMOOTHEST LEARNING JOURNEY! 🚀**
