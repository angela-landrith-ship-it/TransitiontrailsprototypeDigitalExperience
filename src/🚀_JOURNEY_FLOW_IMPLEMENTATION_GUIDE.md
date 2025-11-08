# 🚀 AUDIENCE JOURNEY FLOW: IMPLEMENTATION GUIDE

**Date:** November 8, 2025  
**Status:** Ready to Implement  
**Components Created:** 5/5 ✅  

---

## ✅ WHAT WE'VE BUILT

### **New Components Created:**

1. ✅ **`ProgressiveFeatureLock.tsx`** - Locks content with blur overlay
2. ✅ **`UpgradePromptModal.tsx`** - Conversion modal for Visitor → Guided
3. ✅ **`WelcomeOverlay.tsx`** - First-time Guided Trail onboarding
4. ✅ **`RoleBadge.tsx`** - Visual role indicators
5. ✅ **`ExplorationMeter.tsx`** - Tracks Visitor progress

### **Existing Components (Already Have):**

- ✅ `VisitorLanding.tsx` - Public landing page
- ✅ `VisitorNavigation.tsx` - Visitor navigation
- ✅ `VisitorLearningCenter.tsx` - Visitor courses
- ✅ `VisitorCommunity.tsx` - Community preview
- ✅ `VisitorEvents.tsx` - Public events
- ✅ `LearnerHome.tsx` - Guided Trail dashboard
- ✅ `Navigation.tsx` - Main navigation

---

## 📊 COMPLETE JOURNEY IMPLEMENTATION

### **Flow Diagram:**

```
┌─────────────────────────────────────────────────────────────┐
│                                                             │
│  UNREGISTERED USER (Public)                                │
│  ────────────────────────────                              │
│  Page: VisitorLanding.tsx                                  │
│  Components: <RoleBadge role="guest" />                    │
│  CTA: "Start the Visitor Trail" → Registration Modal       │
│                                                             │
│                            ↓                                │
│                     [Registration]                          │
│                            ↓                                │
│                                                             │
│  VISITOR'S TRAIL PARTICIPANT (Limited Access)              │
│  ──────────────────────────────────────────                │
│  Page: VisitorLearningCenter.tsx                           │
│  Navigation: VisitorNavigation.tsx                         │
│  Components:                                                │
│    - <RoleBadge role="visitor" />                          │
│    - <ExplorationMeter /> (tracks progress)                │
│    - <ProgressiveFeatureLock /> (on locked content)        │
│  Trigger: At 70% progress → <UpgradePromptModal />        │
│                                                             │
│                            ↓                                │
│                    [Upgrade & Payment]                      │
│                            ↓                                │
│                                                             │
│  GUIDED TRAIL PARTICIPANT (Full Access)                    │
│  ────────────────────────────────────                       │
│  Page: LearnerHome.tsx                                     │
│  Navigation: Navigation.tsx                                 │
│  Components:                                                │
│    - <RoleBadge role="guided" />                           │
│    - <WelcomeOverlay /> (first login only)                 │
│    - Full feature access (no locks)                         │
│  Next: Trail of Mastery preparation                         │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

---

## 🎯 STEP-BY-STEP IMPLEMENTATION

### **Step 1: Update App.tsx with Role Management**

Add role detection and routing:

```typescript
// App.tsx
import { useState, useEffect } from 'react';
import { RoleBadge, UserRole } from './components/RoleBadge';
import { UpgradePromptModal } from './components/UpgradePromptModal';
import { WelcomeOverlay } from './components/WelcomeOverlay';

// Add to App component
const [userRole, setUserRole] = useState<UserRole>('guest');
const [showUpgradeModal, setShowUpgradeModal] = useState(false);
const [showWelcomeOverlay, setShowWelcomeOverlay] = useState(false);
const [isFirstLogin, setIsFirstLogin] = useState(false);

// Role determination logic
useEffect(() => {
  // In production: fetch from Salesforce User.Profile
  // For now: based on page state
  if (activePage.startsWith('visitor-') && currentUser) {
    setUserRole('visitor');
  } else if (currentUser && !activePage.startsWith('visitor-')) {
    setUserRole('guided');
    
    // Check if first login
    const hasSeenWelcome = localStorage.getItem('hasSeenWelcome');
    if (!hasSeenWelcome) {
      setIsFirstLogin(true);
      setShowWelcomeOverlay(true);
    }
  } else {
    setUserRole('guest');
  }
}, [activePage, currentUser]);

// Handle first-time guided user
const handleWelcomeComplete = () => {
  setShowWelcomeOverlay(false);
  localStorage.setItem('hasSeenWelcome', 'true');
};

// Handle upgrade from visitor to guided
const handleUpgrade = () => {
  setShowUpgradeModal(false);
  // In production: Process payment, update Salesforce User.Profile
  setUserRole('guided');
  setIsFirstLogin(true);
  setShowWelcomeOverlay(true);
  setActivePage('home');
};
```

---

### **Step 2: Enhanced VisitorLearningCenter with Locks**

Update to show exploration progress and locked content:

```typescript
// VisitorLearningCenter.tsx
import { ExplorationMeter } from './ExplorationMeter';
import { ProgressiveFeatureLock } from './ProgressiveFeatureLock';
import { UpgradePromptModal } from './UpgradePromptModal';
import { useState, useEffect } from 'react';

export function VisitorLearningCenter({ onNavigate, onUpgrade }: Props) {
  const [explorationPoints, setExplorationPoints] = useState(0);
  const [coursesCompleted, setCoursesCompleted] = useState(0);
  const [showUpgradeModal, setShowUpgradeModal] = useState(false);

  // Available courses for visitors (unlocked)
  const availableCourses = [
    {
      id: 1,
      title: 'Intro to Salesforce Nonprofit Cloud',
      modules: 3,
      duration: 45,
      points: 50,
      completed: false
    },
    {
      id: 2,
      title: 'Trailhead Basics',
      modules: 4,
      duration: 60,
      points: 75,
      completed: false
    },
    {
      id: 3,
      title: 'Community Engagement 101',
      modules: 2,
      duration: 30,
      points: 25,
      completed: false
    }
  ];

  // Locked courses (requires Guided Trail)
  const lockedCourses = [
    { id: 4, title: 'Salesforce Administration Fundamentals' },
    { id: 5, title: 'Lightning Web Components Basics' },
    { id: 6, title: 'Apex Programming Introduction' },
    { id: 7, title: 'Business Analysis for Nonprofits' },
    { id: 8, title: 'AI-Powered Salesforce Tools' }
  ];

  // Check if user should see upgrade prompt
  useEffect(() => {
    const progressPercent = (explorationPoints / 500) * 100;
    if (progressPercent >= 70 && !showUpgradeModal) {
      // Show modal after a delay
      setTimeout(() => {
        setShowUpgradeModal(true);
      }, 2000);
    }
  }, [explorationPoints]);

  return (
    <div className="min-h-screen bg-[#F5F3E8] py-8">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header with Role Badge */}
        <div className="mb-8">
          <RoleBadgeWithDescription 
            role="visitor" 
            userName={currentUser?.firstName}
            showProgress
            progressPercent={(explorationPoints / 500) * 100}
          />
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Available Courses */}
            <div>
              <h2 className="text-2xl text-gray-900 mb-4">Your Learning Path</h2>
              <div className="grid md:grid-cols-2 gap-4">
                {availableCourses.map((course) => (
                  <CourseCard 
                    key={course.id}
                    course={course}
                    onComplete={(points) => {
                      setExplorationPoints(prev => prev + points);
                      setCoursesCompleted(prev => prev + 1);
                    }}
                  />
                ))}
              </div>
            </div>

            {/* Locked Courses with Progressive Lock */}
            <div>
              <h2 className="text-2xl text-gray-900 mb-4">
                Unlock More Courses
              </h2>
              <div className="grid md:grid-cols-2 gap-4">
                {lockedCourses.map((course) => (
                  <ProgressiveFeatureLock
                    key={course.id}
                    isLocked={true}
                    unlockLevel="guided"
                    featureName={course.title}
                    onUpgrade={() => setShowUpgradeModal(true)}
                  >
                    <CourseCard 
                      course={course}
                      onComplete={() => {}}
                    />
                  </ProgressiveFeatureLock>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar with Exploration Meter */}
          <div className="lg:col-span-1">
            <div className="sticky top-8 space-y-6">
              <ExplorationMeter
                currentPoints={explorationPoints}
                targetPoints={500}
                coursesCompleted={coursesCompleted}
                totalCourses={3}
                onUpgrade={() => setShowUpgradeModal(true)}
                userName={currentUser?.firstName}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Upgrade Modal */}
      <UpgradePromptModal
        isOpen={showUpgradeModal}
        onClose={() => setShowUpgradeModal(false)}
        onUpgrade={onUpgrade}
        triggerReason="progress"
        visitorProgress={(explorationPoints / 500) * 100}
        visitorName={currentUser?.firstName}
      />
    </div>
  );
}
```

---

### **Step 3: Enhanced LearnerHome with Welcome Overlay**

```typescript
// LearnerHome.tsx (additions)
import { WelcomeOverlay } from './WelcomeOverlay';
import { RoleBadgeWithDescription } from './RoleBadge';

// Add to component state
const [showWelcome, setShowWelcome] = useState(false);

// Check for first login
useEffect(() => {
  const hasSeenWelcome = localStorage.getItem('hasSeenGuidedWelcome');
  if (!hasSeenWelcome) {
    setShowWelcome(true);
  }
}, []);

const handleWelcomeComplete = () => {
  setShowWelcome(false);
  localStorage.setItem('hasSeenGuidedWelcome', 'true');
};

// Add to render
return (
  <div className="min-h-screen bg-[#F5F3E8]">
    {/* Welcome Overlay (first-time only) */}
    <WelcomeOverlay
      isOpen={showWelcome}
      onComplete={handleWelcomeComplete}
      userName={learner.firstName}
      coachName="Sarah Martinez"
      coachAvatar="SM"
      startDate="January 15, 2025"
    />

    {/* Rest of dashboard... */}
  </div>
);
```

---

### **Step 4: Update Navigation with Role Badges**

```typescript
// Navigation.tsx
import { RoleBadge } from './RoleBadge';

// Add to header
<div className="flex items-center space-x-3">
  <span className="text-white">Transition Trails</span>
  <RoleBadge role={userRole} size="sm" />
</div>
```

---

### **Step 5: Visitor Community with Locked Features**

```typescript
// VisitorCommunity.tsx
import { ProgressiveFeatureLock } from './ProgressiveFeatureLock';

// Public channels (unlocked)
const publicChannels = [
  { name: '#general', members: 247 },
  { name: '#introductions', members: 189 },
  { name: '#events', members: 312 },
  { name: '#ask-a-question', members: 156 }
];

// Private channels (locked)
const privateChannels = [
  { name: '#guided-learners', members: 89 },
  { name: '#peer-support', members: 67 },
  { name: '#capstone-showcase', members: 45 },
  { name: '#coach-office-hours', members: 23 }
];

return (
  <div>
    {/* Public Channels */}
    <div className="mb-8">
      <h3>Public Channels</h3>
      {publicChannels.map(channel => (
        <ChannelCard key={channel.name} channel={channel} />
      ))}
    </div>

    {/* Locked Private Channels */}
    <div>
      <h3>Unlock More Channels</h3>
      <ProgressiveFeatureLock
        isLocked={true}
        unlockLevel="guided"
        customMessage="Upgrade to Guided Trail to access private study groups and peer support"
        onUpgrade={onUpgrade}
      >
        <div className="space-y-2">
          {privateChannels.map(channel => (
            <ChannelCard key={channel.name} channel={channel} />
          ))}
        </div>
      </ProgressiveFeatureLock>
    </div>
  </div>
);
```

---

## 🎨 STYLING GUIDELINES

### **Color Usage by Role:**

```css
/* Guest/Visitor - Sky Blue (#7EB5C1) */
.visitor-accent {
  color: #7EB5C1;
  background-color: #7EB5C120;
}

/* Guided - Amber (#F9A03F) */
.guided-accent {
  color: #F9A03F;
  background-color: #F9A03F20;
}

/* Mastery - Teal (#2C6975) */
.mastery-accent {
  color: #2C6975;
  background-color: #2C697520;
}
```

### **Animation Classes Needed:**

Add to `styles/globals.css`:

```css
@keyframes confetti-1 {
  0% {
    transform: translateY(0) rotate(0deg);
    opacity: 1;
  }
  100% {
    transform: translateY(100px) rotate(180deg);
    opacity: 0;
  }
}

@keyframes confetti-2 {
  0% {
    transform: translateY(0) rotate(0deg);
    opacity: 1;
  }
  100% {
    transform: translateY(120px) rotate(-180deg);
    opacity: 0;
  }
}

@keyframes confetti-3 {
  0% {
    transform: translateY(0) rotate(0deg);
    opacity: 1;
  }
  100% {
    transform: translateY(80px) rotate(120deg);
    opacity: 0;
  }
}

@keyframes confetti-4 {
  0% {
    transform: translateY(0) rotate(0deg);
    opacity: 1;
  }
  100% {
    transform: translateY(90px) rotate(-120deg);
    opacity: 0;
  }
}

@keyframes bounce-subtle {
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-4px);
  }
}

@keyframes scale-in {
  0% {
    transform: scale(0.95);
    opacity: 0;
  }
  100% {
    transform: scale(1);
    opacity: 1;
  }
}

@keyframes fade-in {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}

.animate-confetti-1 {
  animation: confetti-1 1.5s ease-out forwards;
}

.animate-confetti-2 {
  animation: confetti-2 1.7s ease-out forwards;
}

.animate-confetti-3 {
  animation: confetti-3 1.3s ease-out forwards;
}

.animate-confetti-4 {
  animation: confetti-4 1.6s ease-out forwards;
}

.animate-bounce-subtle {
  animation: bounce-subtle 2s ease-in-out infinite;
}

.animate-scale-in {
  animation: scale-in 0.3s ease-out forwards;
}

.animate-fade-in {
  animation: fade-in 0.3s ease-out forwards;
}
```

---

## 🔄 UPGRADE FLOW LOGIC

### **Trigger Conditions:**

```typescript
// UpgradeTrigger.ts
export interface UpgradeTrigger {
  condition: 'progress' | 'time' | 'engagement' | 'manual';
  threshold: number;
  priority: 'high' | 'medium' | 'low';
}

export const upgradeTriggers: UpgradeTrigger[] = [
  {
    condition: 'progress',
    threshold: 70, // 70% of visitor content
    priority: 'high'
  },
  {
    condition: 'time',
    threshold: 7, // 7 days since registration
    priority: 'medium'
  },
  {
    condition: 'engagement',
    threshold: 5, // 5+ locked feature views
    priority: 'medium'
  },
  {
    condition: 'manual',
    threshold: 0, // User clicked upgrade CTA
    priority: 'high'
  }
];

export function checkUpgradeTriggers(
  explorationPoints: number,
  daysSinceRegistration: number,
  lockedFeatureViews: number
): boolean {
  const progressPercent = (explorationPoints / 500) * 100;
  
  return (
    progressPercent >= 70 ||
    daysSinceRegistration >= 7 ||
    lockedFeatureViews >= 5
  );
}
```

---

## 📱 MOBILE RESPONSIVENESS

### **Mobile-Specific Adjustments:**

```typescript
// Use Tailwind responsive classes
<div className="
  px-4 md:px-6 lg:px-8
  py-6 md:py-8 lg:py-12
  grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3
  gap-4 md:gap-6 lg:gap-8
">
  {/* Content */}
</div>

// Mobile modal adjustments
<div className="
  fixed inset-0 p-4
  md:p-8
  flex items-end md:items-center justify-center
">
  <div className="
    w-full max-w-md
    max-h-[90vh] md:max-h-[80vh]
    overflow-y-auto
  ">
    {/* Modal content */}
  </div>
</div>
```

---

## ⚙️ SALESFORCE INTEGRATION

### **Profile & Audience Mapping:**

```apex
// ProfileMapping.cls
public class ProfileMapping {
    public enum UserRole {
        GUEST,
        VISITOR_TRAIL_PARTICIPANT,
        GUIDED_TRAIL_PARTICIPANT,
        MASTERY_TRAIL_PARTICIPANT
    }
    
    public static UserRole getUserRole(User user) {
        if (user == null || user.Profile == null) {
            return UserRole.GUEST;
        }
        
        String profileName = user.Profile.Name;
        
        switch on profileName {
            when 'Visitor_Trail_Participant' {
                return UserRole.VISITOR_TRAIL_PARTICIPANT;
            }
            when 'Guided_Trail_Participant' {
                return UserRole.GUIDED_TRAIL_PARTICIPANT;
            }
            when 'Mastery_Trail_Participant' {
                return UserRole.MASTERY_TRAIL_PARTICIPANT;
            }
            when else {
                return UserRole.GUEST;
            }
        }
    }
}
```

### **Upgrade Flow:**

```apex
// UpgradeController.cls
@AuraEnabled
public static void upgradeToGuidedTrail(Id userId) {
    try {
        User user = [SELECT Id, ProfileId, ContactId FROM User WHERE Id = :userId];
        
        // Update profile
        Profile guidedProfile = [SELECT Id FROM Profile WHERE Name = 'Guided_Trail_Participant' LIMIT 1];
        user.ProfileId = guidedProfile.Id;
        update user;
        
        // Create Trail Enrollment
        Trail_Enrollment__c enrollment = new Trail_Enrollment__c(
            User__c = userId,
            Start_Date__c = System.today(),
            Status__c = 'Active',
            Trail_Type__c = 'Guided'
        );
        insert enrollment;
        
        // Assign Coach
        Coach_Assignment__c assignment = assignCoach(userId);
        
        // Send welcome email
        sendGuidedTrailWelcomeEmail(user, assignment.Coach__r.Name);
        
        // Schedule welcome call
        scheduleWelcomeCall(userId, assignment.Coach__c);
        
    } catch (Exception e) {
        throw new AuraHandledException('Upgrade failed: ' + e.getMessage());
    }
}
```

---

## ✅ TESTING CHECKLIST

### **User Flow Testing:**

- [ ] Guest can view landing page
- [ ] Guest can register as Visitor
- [ ] Visitor sees unlocked content
- [ ] Visitor sees locked content with blur
- [ ] Exploration meter updates correctly
- [ ] Upgrade modal triggers at 70%
- [ ] Upgrade modal triggers after 7 days
- [ ] Upgrade process works end-to-end
- [ ] Guided user sees welcome overlay (first time)
- [ ] Guided user has full access
- [ ] Role badges display correctly
- [ ] Navigation updates per role

### **Component Testing:**

- [ ] `ProgressiveFeatureLock` shows/hides correctly
- [ ] `UpgradePromptModal` displays all benefits
- [ ] `WelcomeOverlay` has working CTAs
- [ ] `RoleBadge` colors match role
- [ ] `ExplorationMeter` calculates correctly

### **Mobile Testing:**

- [ ] All modals responsive
- [ ] Touch targets adequate size
- [ ] Navigation works on mobile
- [ ] Content readable on small screens
- [ ] Forms usable on mobile

### **Accessibility Testing:**

- [ ] Keyboard navigation works
- [ ] Screen reader announces roles
- [ ] Focus indicators visible
- [ ] Color contrast meets WCAG AA
- [ ] ARIA labels present

---

## 📊 SUCCESS METRICS

### **Conversion Tracking:**

```typescript
// Analytics.ts
export interface ConversionMetrics {
  guestToVisitor: number;      // Registration rate
  visitorToGuided: number;      // Upgrade rate
  daysToupgrade: number;        // Time to upgrade
  completionAtUpgrade: number;  // % complete when upgraded
}

export function trackConversion(
  userId: string,
  fromRole: UserRole,
  toRole: UserRole
) {
  // Send to analytics
  gtag('event', 'role_upgrade', {
    user_id: userId,
    from_role: fromRole,
    to_role: toRole,
    timestamp: new Date().toISOString()
  });
}
```

### **Target Metrics:**

```
Goal Metrics:
├─ Guest → Visitor:        40% conversion
├─ Visitor → Guided:       25% within 30 days
├─ First Login Welcome:    95% completion
├─ Exploration Meter:      80% engage with it
└─ Upgrade Modal:          35% click-through rate

Quality Metrics:
├─ Page Load Time:         < 2 seconds
├─ Modal Response Time:    < 100ms
├─ Animation Smoothness:   60fps
└─ Mobile Performance:     90+ Lighthouse score
```

---

## 🚀 DEPLOYMENT PLAN

### **Phase 1: Foundation (Days 1-2)**
- [x] Create 5 new components
- [ ] Update App.tsx with role management
- [ ] Add CSS animations
- [ ] Test components in isolation

### **Phase 2: Integration (Days 3-4)**
- [ ] Update VisitorLearningCenter
- [ ] Update LearnerHome
- [ ] Update Navigation components
- [ ] Wire up upgrade flow

### **Phase 3: Polish (Days 5-6)**
- [ ] Mobile responsiveness
- [ ] Accessibility audit
- [ ] Performance optimization
- [ ] Cross-browser testing

### **Phase 4: Launch (Day 7)**
- [ ] Staging deployment
- [ ] User acceptance testing
- [ ] Production deployment
- [ ] Monitor metrics

---

## 📚 DOCUMENTATION UPDATES NEEDED

### **User Documentation:**
- [ ] Visitor Trail guide
- [ ] Upgrade process FAQ
- [ ] Guided Trail onboarding
- [ ] Feature comparison chart

### **Developer Documentation:**
- [ ] Component API docs
- [ ] Salesforce integration guide
- [ ] Analytics implementation
- [ ] Troubleshooting guide

---

## 🎯 NEXT IMMEDIATE STEPS

### **1. Update App.tsx** (15 min)
Add role management and state:
```typescript
const [userRole, setUserRole] = useState<UserRole>('guest');
const [showUpgradeModal, setShowUpgradeModal] = useState(false);
const [showWelcomeOverlay, setShowWelcomeOverlay] = useState(false);
```

### **2. Update VisitorLearningCenter** (30 min)
Add ExplorationMeter and ProgressiveFeatureLock:
```typescript
import { ExplorationMeter } from './ExplorationMeter';
import { ProgressiveFeatureLock } from './ProgressiveFeatureLock';
```

### **3. Add CSS Animations** (10 min)
Copy animation code to `styles/globals.css`

### **4. Test Complete Flow** (20 min)
- Guest → Visitor registration
- Visitor exploration + upgrade trigger
- Upgrade → Guided welcome

---

## 💡 TIPS & BEST PRACTICES

### **UX Best Practices:**
- ✅ Never surprise users with modals (always triggered by action)
- ✅ Make locked content visible (but blurred) to create desire
- ✅ Show progress toward upgrades to motivate
- ✅ Celebrate transitions with animations
- ✅ Provide clear next steps at each stage

### **Performance:**
- ✅ Lazy load modals (don't render until needed)
- ✅ Optimize blur effect (use backdrop-blur sparingly)
- ✅ Preload welcome overlay for guided users
- ✅ Cache role determination to avoid flicker

### **Accessibility:**
- ✅ Trap focus in modals
- ✅ Announce role changes to screen readers
- ✅ Ensure all CTAs keyboard accessible
- ✅ Provide skip links for long content

---

## 🎊 COMPLETION CHECKLIST

### **Implementation:**
- [x] Components created (5/5)
- [ ] App.tsx updated
- [ ] VisitorLearningCenter enhanced
- [ ] LearnerHome enhanced
- [ ] Navigation updated
- [ ] CSS animations added

### **Testing:**
- [ ] User flows tested
- [ ] Components tested
- [ ] Mobile tested
- [ ] Accessibility tested
- [ ] Performance tested

### **Documentation:**
- [x] Implementation guide complete
- [x] Journey flow documented
- [ ] User guides written
- [ ] API docs updated

### **Deployment:**
- [ ] Staging deployed
- [ ] UAT completed
- [ ] Production deployed
- [ ] Metrics tracking

---

**Status:** Components ready, integration in progress  
**Next Step:** Update App.tsx with role management  
**ETA:** 1 week to full implementation  

**LET'S BUILD THE SMOOTHEST JOURNEY FLOW! 🚀**
