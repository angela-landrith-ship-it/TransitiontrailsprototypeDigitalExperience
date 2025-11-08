# 🎭 Enhanced Audience Selector - Quick Guide

**Status:** ✅ SHIPPED  
**Location:** Top-right corner (fixed position)  
**Component:** `/components/integrations/AudienceSelector.tsx`

---

## 📍 What Is It?

The **Enhanced Audience Selector** is a sophisticated demo mode toggle that allows designers and testers to instantly preview the platform from 8 different user perspectives:

### **Learner Journey Stages** (Progressive)
1. 🧭 **Unregistered Visitor** - Public browsing, no account
2. 👋 **Visitor Trail Participant** - Limited exploration mode
3. 🎓 **Guided Trail Participant** - Full 12-week program
4. 🏆 **Trail of Mastery Participant** - Advanced role tracks
5. 🌍 **Explorer's Journey Member** - Lifelong learning subscription

### **Staff Roles**
6. 🧑‍🏫 **Coach / Mentor** - Guides and assesses learners
7. 🤝 **Partner Organization** - Capstone project partners
8. ⚙️ **Admin** - System administration

---

## 🎨 Visual Design

### **Collapsed State** (Default)
```
┌─────────────────────────┐
│ 👁️  Demo Mode         ∨ │
├─────────────────────────┤
│ 🎓 Guided Trail    Active│
└─────────────────────────┘
```
- Width: 220px
- Background: Dark Evergreen (#243A3E)
- Text: Trail Cream (#F2EAD3)
- Border: Subtle green glow
- Hover: Amber accent

### **Expanded State** (On Click)
```
┌────────────────────────────────┐
│ 👁️ Demo Mode          🔄  ✕   │
│ Switch between user audiences │
├────────────────────────────────┤
│ ✨ Learner Journey              │
│ ┌──────────────────────────┐  │
│ │ 🧭 Unregistered Visitor   │  │
│ │ Public browsing          │  │
│ │ [Landing] [Sign up]      │  │
│ └──────────────────────────┘  │
│ ┌──────────────────────────┐  │
│ │ 👋 Visitor Trail         │  │
│ │ Limited exploration      │  │
│ │ [Free previews] [Points] │  │
│ └──────────────────────────┘  │
│ ┌──────────────────────────┐  │
│ │ 🎓 Guided Trail  ✓       │  │ ← Active
│ │ 12-week program          │  │
│ │ [Curriculum] [Coaching]  │  │
│ └──────────────────────────┘  │
│ ...more roles...              │
├────────────────────────────────┤
│ 👁️ Staff Roles                 │
│ ┌──────────────────────────┐  │
│ │ 🧑‍🏫 Coach / Mentor        │  │
│ └──────────────────────────┘  │
├────────────────────────────────┤
│ Prototype testing only        │
└────────────────────────────────┘
```
- Width: 320px
- Max Height: 90vh (scrollable)
- Shadow: Deep (0px 4px 16px rgba(0,0,0,0.3))
- Animation: 150ms ease-out expand/collapse

---

## 🎯 Key Features

### **1. Smart Role Switching**
- Instant view updates
- Automatic page navigation
- State preservation
- No page reload required

### **2. Visual Feedback**
- Active role highlighted with amber glow
- Check icon on selected role
- Color-coded role badges
- Feature tags for each role

### **3. Organized Categories**
- Learner Journey section (progressive stages)
- Staff Roles section (operational roles)
- Clear visual separation
- Logical grouping

### **4. Feature Preview**
- Shows 2 key features per role
- Color-coded badges
- Contextual descriptions
- Quick understanding of access level

### **5. Refresh Button** 🔄
- Reloads entire view
- Resets state
- Useful for testing
- Located in header

---

## 🚀 How To Use

### **As a Designer:**
1. Click the collapsed selector (top-right)
2. Choose a learner stage or staff role
3. View updates instantly
4. Test navigation, features, permissions
5. Use refresh to reset state

### **As a Developer:**
```typescript
import { AudienceSelector } from './components/integrations/AudienceSelector';
import type { AudienceRole } from './components/integrations/AudienceSelector';

function App() {
  const [audienceRole, setAudienceRole] = 
    useState<AudienceRole>('guided-trail');

  const handleRoleChange = (role: AudienceRole) => {
    setAudienceRole(role);
    // Update app state, navigation, features
  };

  return (
    <AudienceSelector
      currentRole={audienceRole}
      onRoleChange={handleRoleChange}
      onRefresh={() => window.location.reload()}
    />
  );
}
```

### **As a Tester:**
1. **Test Visitor Journey:**
   - Unregistered → Visitor Trail → Guided Trail
2. **Test Mastery Flow:**
   - Guided Trail → Mastery Trail → Explorer
3. **Test Staff Views:**
   - Coach → Partner → Admin
4. **Test Permissions:**
   - Switch roles to verify locked features
   - Check navigation visibility
   - Validate access control

---

## 📊 Role Mapping to App State

### **Unregistered** 🧭
```typescript
userMode: 'visitor'
activePage: 'visitor-home'
features: ['Landing', 'Public resources', 'Sign up']
```

### **Visitor Trail** 👋
```typescript
userMode: 'visitor'
activePage: 'visitor-learning'
features: ['Free previews', 'Exploration points', 'Upgrades']
```

### **Guided Trail** 🎓
```typescript
userMode: 'enrolled'
activePage: 'learner'
features: ['Full curriculum', 'Coaching', 'Capstone', 'Community']
```

### **Trail of Mastery** 🏆
```typescript
userMode: 'enrolled'
activePage: 'trail-mastery'
features: ['PO/Dev/Arch/BA tracks', 'Expert mentorship', 'Certs']
```

### **Explorer's Journey** 🌍
```typescript
userMode: 'enrolled'
activePage: 'explorers-journey'
features: ['Monthly events', 'Workshops', 'Alumni network']
```

### **Coach** 🧑‍🏫
```typescript
userMode: 'enrolled'
activePage: 'coach-dashboard'
testRole: 'coach'
features: ['Dashboard', 'Assessments', 'Analytics']
```

### **Partner** 🤝
```typescript
userMode: 'enrolled'
activePage: 'capstone-projects'
testRole: 'partner'
features: ['Project board', 'Applications', 'Workspace']
```

### **Admin** ⚙️
```typescript
userMode: 'enrolled'
activePage: 'admin-panel'
testRole: 'admin'
features: ['All access', 'User management', 'CMS', 'Analytics']
```

---

## 🎨 Color System

Each role has a unique color for instant recognition:

| Role | Icon | Color | Background | Use |
|------|------|-------|------------|-----|
| Unregistered | 🧭 | Gray (#9CA3AF) | Light Gray | Neutral |
| Visitor Trail | 👋 | Sky Blue (#7EB5C1) | Soft Blue | Exploration |
| Guided Trail | 🎓 | Amber (#F9A03F) | Warm Cream | Active Learning |
| Mastery Trail | 🏆 | Evergreen (#3B6A52) | Soft Green | Achievement |
| Explorer | 🌍 | Teal (#2C6975) | Cool Teal | Continuity |
| Coach | 🧑‍🏫 | Purple (#8B5CF6) | Light Purple | Guidance |
| Partner | 🤝 | Bright Blue (#0EA5E9) | Sky Blue | Collaboration |
| Admin | ⚙️ | Red (#DC2626) | Soft Red | Authority |

---

## 🔗 Integration Points

### **In App.tsx:**
```typescript
// Import
import { AudienceSelector, type AudienceRole } 
  from './components/integrations';

// State
const [audienceRole, setAudienceRole] = 
  useState<AudienceRole>('guided-trail');

// Handler
const handleAudienceRoleChange = (role: AudienceRole) => {
  setAudienceRole(role);
  // Update userMode, activePage, testRole
};

// Render
<AudienceSelector
  currentRole={audienceRole}
  onRoleChange={handleAudienceRoleChange}
  onRefresh={() => window.location.reload()}
/>
```

### **Replaces:**
- ✅ Old "Demo Mode" toggle (bottom-left)
- ✅ Simple Visitor/Enrolled switch
- ✅ Basic SF Audience dropdown

### **Keeps:**
- ✅ Theme toggle (bottom-right)
- ✅ Role indicator badge (optional)
- ✅ Existing AudienceToggle (for legacy)

---

## 📱 Responsive Behavior

### **Desktop:**
- Top-right fixed position
- Full width panel (320px)
- All features visible
- Smooth animations

### **Mobile:**
- Stays top-right
- Collapses to icon only (optional)
- Full-screen overlay when expanded
- Touch-optimized buttons

### **Tablet:**
- Same as desktop
- Slightly smaller panel (280px)
- Optimized spacing

---

## ♿ Accessibility

### **Keyboard Navigation:**
- `Tab` - Navigate between roles
- `Enter/Space` - Select role
- `Esc` - Close expanded panel
- `Arrow keys` - Move within list

### **Screen Readers:**
- Role labels announced
- Active state indicated
- Feature lists read
- Section headers clear

### **Focus Management:**
- Visible focus rings
- Logical tab order
- Focus trap when expanded
- Returns focus on close

### **Color Contrast:**
- WCAG AA compliant
- High contrast mode support
- Color + icon for role ID
- Text alternatives provided

---

## 🧪 Testing Workflows

### **Test 1: Complete Learner Journey**
```
1. Start: Unregistered
2. Click → Browse visitor home
3. Switch: Visitor Trail
4. Click → See exploration points
5. Switch: Guided Trail
6. Click → Full dashboard
7. Switch: Mastery Trail
8. Click → Role tracks
9. Switch: Explorer Journey
10. Click → Subscription page
```

### **Test 2: Staff Role Switching**
```
1. Start: Guided Trail (learner view)
2. Switch: Coach
3. Verify: Coach dashboard, assessments visible
4. Switch: Partner
5. Verify: Partner board, applications
6. Switch: Admin
7. Verify: Admin panel, all access
```

### **Test 3: Permission Validation**
```
1. Unregistered → Try locked features → Blocked ✓
2. Visitor Trail → Try capstone → Upgrade prompt ✓
3. Guided Trail → Access capstone → Unlocked ✓
4. Coach → Access admin → Hidden ✓
5. Admin → Access everything → Unlocked ✓
```

---

## 📈 Benefits

### **For Designers:**
- ✅ Test all user journeys instantly
- ✅ Validate progressive disclosure
- ✅ Check visual consistency across roles
- ✅ Demo different user experiences

### **For Developers:**
- ✅ Verify permission logic
- ✅ Test state management
- ✅ Debug role-based features
- ✅ Validate navigation flows

### **For QA:**
- ✅ Comprehensive testing coverage
- ✅ Easy regression testing
- ✅ Rapid role switching
- ✅ No manual login/logout

### **For Product:**
- ✅ Understand user journeys visually
- ✅ Demo to stakeholders
- ✅ Validate feature access
- ✅ Plan progressive enrollment

---

## 🔮 Future Enhancements (Optional)

### **Phase 1 (Shipped):**
- ✅ 8 role types
- ✅ Learner journey stages
- ✅ Staff roles
- ✅ Visual feedback
- ✅ Smooth animations

### **Phase 2 (Possible):**
- [ ] Penny AI mode preview toggle
- [ ] Trail progress simulation
- [ ] Points balance override
- [ ] Cohort date selector
- [ ] Feature flag overrides

### **Phase 3 (Advanced):**
- [ ] URL-based role switching
- [ ] Preset scenarios
- [ ] User flow automation
- [ ] Screenshot comparison
- [ ] Test report generation

---

## 🎯 Quick Reference

### **Top 3 Use Cases:**

1. **Design Review:**
   - Click selector → Choose each role
   - Review layout, navigation, features
   - Validate progressive disclosure

2. **User Flow Testing:**
   - Start at Unregistered
   - Progress through all learner stages
   - Verify upgrade prompts, unlocks

3. **Permission Testing:**
   - Switch between staff roles
   - Check feature visibility
   - Validate access control

### **Keyboard Shortcuts (Future):**
```
Ctrl/Cmd + Shift + 1 → Unregistered
Ctrl/Cmd + Shift + 2 → Visitor Trail
Ctrl/Cmd + Shift + 3 → Guided Trail
Ctrl/Cmd + Shift + 4 → Mastery Trail
Ctrl/Cmd + Shift + 5 → Explorer
Ctrl/Cmd + Shift + 9 → Admin
```

---

## 📚 Related Documentation

- **Component:** `/components/integrations/AudienceSelector.tsx`
- **Legacy Toggle:** `/components/integrations/AudienceToggle.tsx`
- **Integration:** `/App.tsx` (lines 25-147)
- **Journey Flows:** `/🎉_JOURNEY_FLOWS_INTEGRATED_🎉.md`
- **Quick Guide:** `/🎯_INTEGRATED_FLOWS_QUICK_GUIDE.md`

---

## 🎊 Status

```
┌─────────────────────────────────────┐
│  AUDIENCE SELECTOR: SHIPPED ✅     │
│                                     │
│  Features:           100%           │
│  Roles:              8/8            │
│  Integration:        Complete       │
│  Documentation:      Complete       │
│                                     │
│  Status: PRODUCTION READY 🚀       │
│                                     │
└─────────────────────────────────────┘
```

**The Enhanced Audience Selector is now live and ready for comprehensive prototype testing!** 🎭✨

---

**Built with:** React, TypeScript, Tailwind CSS  
**Design System:** Transition Trails Design System (TTDS)  
**Location:** Top-right corner, fixed position, z-index 50  
**Version:** 1.0.0
