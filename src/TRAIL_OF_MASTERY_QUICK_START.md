# Trail of Mastery - Quick Start Guide

**For Developers, Designers, and Product Owners**

---

## 🚀 Quick Access

### In the Application

1. **Navigate:** Click "Learning" in top navigation
2. **Select:** Click "Trail of Mastery" (🏆 icon) in dropdown
3. **Explore:** Browse 4 professional tracks
4. **Start:** Click any trail card to view details

### Direct Routes

```
/academy/trails/mastery         → Landing page
/academy/trails/product-owner   → Product Owner trail
/academy/trails/developer       → Developer trail
/academy/trails/architect       → Solutions Architect trail
/academy/trails/analyst         → Business Analyst trail
```

---

## 🎨 Design Tokens

### Role Colors

```css
/* Product Owner - Amber */
bg-sun-amber         /* #F9A03F */
hover:bg-sun-amber-dark

/* Developer - Teal */
bg-penny-guide       /* #2C6975 */
hover:bg-penny-guide-dark

/* Solutions Architect - Evergreen */
bg-evergreen         /* #2F6B4E */
hover:bg-evergreen-dark

/* Business Analyst - Sky Blue */
bg-sky-blue          /* #5B89A6 */
```

### Status Colors

```css
/* Current Module */
border-sun-amber     /* Active/in progress */

/* Completed */
text-success         /* #3B6A52 */
bg-success/10

/* Locked */
text-gray-400        /* Disabled state */
```

---

## 📦 Components Usage

### TrailCard

```tsx
import { TrailCard } from './components/TrailCard';
import { Briefcase } from 'lucide-react';

<TrailCard
  role="Salesforce Product Owner"
  title="Trail of Mastery: Product Owner"
  description="Master strategic planning and stakeholder management"
  duration="12–16 weeks"
  difficulty="Advanced"
  icon={Briefcase}
  color="amber"
  isEnrolled={true}
  progress={45}
  onClick={() => handleClick('product-owner')}
/>
```

### ModuleCard

```tsx
import { ModuleCard } from './components/ModuleCard';

<ModuleCard
  moduleNumber={1}
  title="Business Strategy Alignment"
  description="Align Salesforce solutions with organizational goals"
  points={50}
  isLocked={false}
  isCompleted={false}
  isCurrent={true}
  onClick={() => handleModuleClick(1)}
/>
```

---

## 🏆 The Four Trails

### 1. Product Owner (Amber)
- **Icon:** Briefcase
- **Badge:** Trailblazer Visionary
- **Penny:** Mentor tone
- **Focus:** Strategy, stakeholders, backlog

### 2. Developer (Teal)
- **Icon:** Code
- **Badge:** Trailblazer Engineer
- **Penny:** Assistant tone
- **Focus:** Apex, LWC, APIs

### 3. Solutions Architect (Evergreen)
- **Icon:** Network
- **Badge:** Trailblazer Architect
- **Penny:** Advisor tone
- **Focus:** Design, data model, integration

### 4. Business Analyst (Sky Blue)
- **Icon:** BarChart3
- **Badge:** Trailblazer Analyst
- **Penny:** Guide tone
- **Focus:** Discovery, documentation, process

---

## 📊 Module Structure

All trails follow this 5-module pattern:

```
Module 1: Foundational Skills      → 50 pts
Module 2: Advanced Techniques      → 50 pts
Module 3: Implementation           → 50 pts
Module 4: Partner Project          → 100 pts
Module 5: Capstone Project         → 250 pts
                                   ─────────
                        TOTAL:       500 pts
```

---

## 🎮 Points & Badges

### Earning Points
- Complete Module 1-3: +50 pts each
- Complete Partner Project: +100 pts
- Complete Capstone: +250 pts
- **Total per trail:** 500 pts

### Leveling Up
```
1 Trail  → Expert Level + Role Badge
2 Trails → Expert+ Title
3 Trails → Master Title
4 Trails → Grand Master + Multi-Mastery Badge
```

---

## 🤖 Penny AI Messages

### Product Owner
> "As your mentor, I'll guide you through strategic thinking and stakeholder alignment. You're 40% through module 3—keep pushing! 🎯"

### Developer
> "I'm here to assist with code reviews and best practices. Your Apex skills are solid—ready to tackle LWC next? 💻"

### Solutions Architect
> "As your advisor, I'll help you think through architectural decisions. Your data model design in module 1 was excellent! 🏗️"

### Business Analyst
> "I'm your guide through process optimization. Your stakeholder interview techniques are improving—let's refine those user stories next! 📊"

---

## 📱 Responsive Breakpoints

```css
/* Desktop (≥768px) */
- 2×2 grid for trail cards
- Two-column layout (modules + sidebar)

/* Mobile (<768px) */
- 1×4 vertical stack
- Single column layout
- 44×44px minimum touch targets
```

---

## ♿ Accessibility Quick Check

```tsx
// Focus rings (already applied)
className="focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-evergreen"

// ARIA labels
aria-label="Start Product Owner trail"
role="progressbar"
aria-valuenow={45}
aria-valuemin={0}
aria-valuemax={100}

// Keyboard support
- Tab to navigate
- Enter to select
- Escape to close
```

---

## 🔧 Customization Examples

### Add New Trail

```tsx
// In TrailOfMastery.tsx trails array
{
  id: 'new-trail',
  role: 'Salesforce Data Scientist',
  title: 'Trail of Mastery: Data Scientist',
  description: 'Master analytics and AI with Salesforce Einstein',
  duration: '12–16 weeks',
  difficulty: 'Advanced',
  icon: Brain, // from lucide-react
  color: 'blue',
  badge: 'Trailblazer Data Wizard',
  pennyMode: 'Analyst',
  modules: 5,
  totalPoints: 500,
}
```

### Customize Module Points

```tsx
// In TrailDetail.tsx modules array
{
  id: 6,
  title: 'Bonus Challenge',
  description: 'Optional advanced project',
  points: 100, // Custom point value
  isLocked: false,
  isCompleted: false,
  isCurrent: false,
}
```

---

## 🐛 Troubleshooting

### Trail Card Not Clickable
- Check `isLocked={false}`
- Verify `onClick` handler is defined
- Ensure no pointer-events:none CSS

### Progress Not Updating
- Verify enrollment record exists
- Check module completion status
- Recalculate percentage: `(completed / total) * 100`

### Penny Messages Not Showing
- Confirm `trailId` matches data key
- Check `pennyMessages` object in TrailDetail
- Verify Penny sidebar is rendering

### Navigation Not Working
- Check `PageType` includes 'trail-mastery' and 'trail-detail'
- Verify routes in App.tsx
- Confirm Navigation.tsx dropdown updated

---

## 📊 Sample Data

### Mock Enrollment

```tsx
const [enrollments] = useState({
  'product-owner': 45,  // 45% complete
  'developer': 0,       // Enrolled, not started
});
```

### Mock Module Progress

```tsx
{
  id: 1,
  title: 'Business Strategy Alignment',
  points: 50,
  isLocked: false,      // Unlocked
  isCompleted: true,    // Finished
  isCurrent: false,     // Not active
}
```

---

## 🎯 User Flows

### Enroll in Trail

```
1. Click "Learning" → "Trail of Mastery"
2. View 4 trail cards
3. Click "Start Trail" on desired role
4. → Navigate to TrailDetail page
5. See modules unlocked sequentially
```

### Complete Module

```
1. Click current module card
2. → Opens module content
3. Complete activities
4. Earn points (+50)
5. → Next module unlocks automatically
```

### Track Progress

```
1. View progress stats at top
2. See progress bar on each trail card
3. Check points earned vs. total
4. Monitor current module number
```

---

## 🔗 Integration Points

### Salesforce Data

```apex
// Query enrolled trails
SELECT Id, Trail__c, Progress_Percentage__c, Points_Earned__c
FROM Trail_Enrollment__c
WHERE Learner__c = :currentUserId

// Update module progress
Trail_Progress__c progress = new Trail_Progress__c(
  Module__c = moduleId,
  Status__c = 'Completed',
  Points_Awarded__c = 50
);
insert progress;
```

### Gamification

```tsx
// Award points on module complete
handleModuleComplete(moduleId) {
  const module = getModule(moduleId);
  awardPoints(module.points);
  checkLevelUp();
  unlockNextModule();
}
```

### Penny AI

```tsx
// Get contextual message
const getPennyMessage = (trailId, progress) => {
  if (progress < 30) return "Just getting started! Let's build momentum.";
  if (progress < 70) return "You're making great progress!";
  return "Almost there! Finish strong!";
};
```

---

## ✅ Launch Checklist

### Before Going Live

- [ ] Test all 4 trail cards display
- [ ] Verify hover effects work
- [ ] Check mobile responsive layout
- [ ] Test keyboard navigation
- [ ] Verify ARIA labels
- [ ] Test navigation integration
- [ ] Load sample trail data
- [ ] Configure Penny AI prompts
- [ ] Test enrollment flow
- [ ] Verify points calculation

---

## 📚 Related Files

```
/components/TrailCard.tsx
/components/ModuleCard.tsx
/components/TrailOfMastery.tsx
/components/TrailDetail.tsx
/App.tsx (routes)
/components/Navigation.tsx (menu)
/TRAIL_OF_MASTERY_IMPLEMENTATION.md (full docs)
```

---

## 💡 Pro Tips

1. **Use TTDS Tokens:** Always use design tokens (e.g., `bg-sun-amber`) instead of hex codes

2. **Progressive Unlocking:** Keep modules locked until previous complete to maintain flow

3. **Penny Context:** Match Penny's tone to the trail role (Mentor, Assistant, Advisor, Guide)

4. **Mobile First:** Design for mobile, enhance for desktop

5. **Accessibility:** Test with keyboard and screen reader

6. **Points Balance:** Keep points per module balanced (50, 100, 250 pattern)

---

## 🆘 Support

### Questions?
- Check [TRAIL_OF_MASTERY_IMPLEMENTATION.md](./TRAIL_OF_MASTERY_IMPLEMENTATION.md) for details
- Review [COMPONENT_LIBRARY.md](./COMPONENT_LIBRARY.md) for component patterns
- See [TTDS_DESIGN_SYSTEM.md](./TTDS_DESIGN_SYSTEM.md) for design tokens

### Common Issues
- **Cards not clickable?** Check `isLocked` and `onClick` props
- **Colors wrong?** Use TTDS tokens, not hex codes
- **Layout broken?** Verify responsive classes
- **Accessibility issues?** Add ARIA labels and focus rings

---

**Last Updated:** November 8, 2025  
**Version:** 1.0.0  
**Status:** ✅ Production Ready

