# 📋 AUDIENCE JOURNEY FLOW: QUICK REFERENCE

**One-page guide for developers implementing the flow**

---

## 🎯 THE 3 AUDIENCES

```
GUEST (Unregistered)     →  VISITOR (Limited)      →  GUIDED (Full Access)
Color: Sky Blue              Color: Amber               Color: Evergreen
Badge: 🔵 Guest              Badge: 🟠 Visitor          Badge: 🟢 Guided
Access: Public only          Access: 3 courses          Access: Everything
Goal: Register               Goal: Upgrade              Goal: Complete trail
```

---

## 📦 NEW COMPONENTS (5)

### 1. **ProgressiveFeatureLock** - Blur & lock content
```tsx
<ProgressiveFeatureLock
  isLocked={true}
  unlockLevel="guided"  // visitor | guided | mastery
  onUpgrade={() => setShowUpgradeModal(true)}
>
  <LockedContent />
</ProgressiveFeatureLock>
```

### 2. **UpgradePromptModal** - Conversion modal
```tsx
<UpgradePromptModal
  isOpen={showUpgradeModal}
  onClose={() => setShowUpgradeModal(false)}
  onUpgrade={handleUpgrade}
  triggerReason="progress"  // progress | time | engagement | manual
  visitorProgress={75}
  visitorName="Alex"
/>
```

### 3. **WelcomeOverlay** - First-time guided onboarding
```tsx
<WelcomeOverlay
  isOpen={isFirstLogin}
  onComplete={handleWelcomeComplete}
  userName="Alex"
  coachName="Sarah Martinez"
  startDate="January 15, 2025"
/>
```

### 4. **RoleBadge** - Visual role indicator
```tsx
<RoleBadge role="visitor" size="md" showIcon />

// With description
<RoleBadgeWithDescription 
  role="visitor"
  userName="Alex"
  showProgress
  progressPercent={75}
/>
```

### 5. **ExplorationMeter** - Track visitor progress
```tsx
<ExplorationMeter
  currentPoints={375}
  targetPoints={500}
  coursesCompleted={2}
  totalCourses={3}
  onUpgrade={() => setShowUpgradeModal(true)}
  userName="Alex"
/>
```

---

## 🔄 UPGRADE TRIGGERS

```typescript
// Trigger upgrade modal when:
const shouldShowUpgrade = 
  explorationPoints >= 350 ||        // 70% progress
  daysSinceRegistration >= 7 ||      // 7 days elapsed
  lockedFeatureViews >= 5 ||         // Viewed 5 locked features
  userClickedUpgrade;                // Manual trigger

if (shouldShowUpgrade) {
  setShowUpgradeModal(true);
}
```

---

## 🎨 COLOR SYSTEM

```css
/* Guest/Visitor */
--visitor-accent: #7EB5C1;
--visitor-bg: #7EB5C120;

/* Guided */
--guided-accent: #F9A03F;
--guided-bg: #F9A03F20;

/* Mastery */
--mastery-accent: #2C6975;
--mastery-bg: #2C697520;

/* Success */
--success-accent: #3B6A52;
```

---

## 📐 TYPICAL IMPLEMENTATION

### **Visitor Page Example:**
```tsx
import { ExplorationMeter } from './ExplorationMeter';
import { ProgressiveFeatureLock } from './ProgressiveFeatureLock';
import { UpgradePromptModal } from './UpgradePromptModal';
import { RoleBadgeWithDescription } from './RoleBadge';

export function VisitorPage() {
  const [points, setPoints] = useState(0);
  const [showUpgrade, setShowUpgrade] = useState(false);

  return (
    <div>
      {/* Header with role */}
      <RoleBadgeWithDescription 
        role="visitor" 
        userName="Alex"
        showProgress
        progressPercent={(points / 500) * 100}
      />

      {/* Sidebar with progress */}
      <ExplorationMeter
        currentPoints={points}
        targetPoints={500}
        coursesCompleted={2}
        totalCourses={3}
        onUpgrade={() => setShowUpgrade(true)}
      />

      {/* Locked content */}
      <ProgressiveFeatureLock
        isLocked={true}
        unlockLevel="guided"
        onUpgrade={() => setShowUpgrade(true)}
      >
        <AdvancedCourse />
      </ProgressiveFeatureLock>

      {/* Upgrade modal */}
      <UpgradePromptModal
        isOpen={showUpgrade}
        onClose={() => setShowUpgrade(false)}
        onUpgrade={handleUpgrade}
        visitorProgress={(points / 500) * 100}
      />
    </div>
  );
}
```

---

## ⚙️ APP.TSX ADDITIONS

```typescript
// Add to App.tsx
import { RoleBadge, UserRole } from './components/RoleBadge';
import { UpgradePromptModal } from './components/UpgradePromptModal';
import { WelcomeOverlay } from './components/WelcomeOverlay';

const [userRole, setUserRole] = useState<UserRole>('guest');
const [showWelcome, setShowWelcome] = useState(false);

// Determine role
useEffect(() => {
  if (activePage.startsWith('visitor-') && currentUser) {
    setUserRole('visitor');
  } else if (currentUser) {
    setUserRole('guided');
    
    // Check first login
    if (!localStorage.getItem('hasSeenWelcome')) {
      setShowWelcome(true);
    }
  } else {
    setUserRole('guest');
  }
}, [activePage, currentUser]);

// Handle upgrade
const handleUpgrade = () => {
  setUserRole('guided');
  setShowWelcome(true);
  setActivePage('home');
  // In production: update Salesforce profile
};

// Render welcome overlay
<WelcomeOverlay
  isOpen={showWelcome}
  onComplete={() => {
    setShowWelcome(false);
    localStorage.setItem('hasSeenWelcome', 'true');
  }}
  userName={currentUser?.firstName}
  coachName="Sarah Martinez"
/>
```

---

## 🎬 ANIMATIONS (Add to globals.css)

```css
@keyframes confetti-1 {
  0% { transform: translateY(0) rotate(0deg); opacity: 1; }
  100% { transform: translateY(100px) rotate(180deg); opacity: 0; }
}

@keyframes bounce-subtle {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-4px); }
}

@keyframes scale-in {
  0% { transform: scale(0.95); opacity: 0; }
  100% { transform: scale(1); opacity: 1; }
}

.animate-confetti-1 { animation: confetti-1 1.5s ease-out forwards; }
.animate-confetti-2 { animation: confetti-1 1.7s ease-out forwards; }
.animate-confetti-3 { animation: confetti-1 1.3s ease-out forwards; }
.animate-confetti-4 { animation: confetti-1 1.6s ease-out forwards; }
.animate-bounce-subtle { animation: bounce-subtle 2s ease-in-out infinite; }
.animate-scale-in { animation: scale-in 0.3s ease-out forwards; }
```

---

## 📱 RESPONSIVE CLASSES

```tsx
// Always use these patterns:
className="
  px-4 md:px-6 lg:px-8              // Padding
  py-6 md:py-8 lg:py-12             // Vertical padding
  grid-cols-1 md:grid-cols-2 lg:grid-cols-3  // Grid
  text-sm md:text-base lg:text-lg   // Text size
  gap-4 md:gap-6 lg:gap-8           // Gap
"
```

---

## ✅ QUICK CHECKLIST

### Before Launch:
- [ ] All 5 components imported
- [ ] App.tsx has role management
- [ ] Visitor pages show ExplorationMeter
- [ ] Locked content uses ProgressiveFeatureLock
- [ ] Upgrade modal triggers at 70%
- [ ] Welcome overlay shows for new guided users
- [ ] Role badges in navigation
- [ ] CSS animations added
- [ ] Mobile responsive
- [ ] Accessibility tested

---

## 🐛 COMMON ISSUES

### Issue: Modal not showing
```typescript
// Check useState is initialized
const [showModal, setShowModal] = useState(false);

// Check trigger logic
if (progress >= 70) {
  setShowModal(true);  // ✅ Correct
}
```

### Issue: Blur not working
```css
/* Ensure backdrop-blur is supported */
.blur-overlay {
  backdrop-filter: blur(4px);
  -webkit-backdrop-filter: blur(4px);
}
```

### Issue: Role not updating
```typescript
// Check useEffect dependencies
useEffect(() => {
  determineRole();
}, [currentUser, activePage]);  // ✅ Include deps
```

---

## 📊 KEY METRICS TO TRACK

```typescript
// Track these events:
gtag('event', 'visitor_registered');
gtag('event', 'exploration_70_percent');
gtag('event', 'upgrade_modal_shown');
gtag('event', 'upgrade_completed');
gtag('event', 'welcome_overlay_completed');
```

---

## 🎯 SALESFORCE PROFILES

```
Guest User Profile          → 'guest'
Visitor_Trail_Participant   → 'visitor'
Guided_Trail_Participant    → 'guided'
Mastery_Trail_Participant   → 'mastery'
```

---

## 💡 QUICK TIPS

1. **Always show progress** - Users love seeing how far they've come
2. **Lock, don't hide** - Blurred content creates desire
3. **Celebrate transitions** - Confetti and animations matter
4. **Personalize messages** - Use first names
5. **Provide next steps** - Never leave users wondering what's next

---

## 🔗 RELATED DOCS

- Full Guide: `/🎯_AUDIENCE_JOURNEY_FLOW_ENHANCEMENT.md`
- Implementation: `/🚀_JOURNEY_FLOW_IMPLEMENTATION_GUIDE.md`
- Components in: `/components/`

---

**Ready to implement? Start with App.tsx role management!** 🚀
