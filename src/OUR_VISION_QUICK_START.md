# 🌄 Our Vision - Quick Start Guide

## What Was Built

A **visually immersive storytelling page** that communicates the Transition Trails mission through authentic narrative, founder story, and clear calls to action.

---

## 🚀 Quick Access

**Component:** `/components/OurVision.tsx`  
**Route:** `our-vision`  
**In App:** Navigate to page with `setActivePage('our-vision')`

---

## 📋 5 Main Sections

### 1️⃣ Page Header
**Gradient hero** (Teal → Evergreen) with main headline:  
*"A Future of Pathways, Not Barriers"*

### 2️⃣ The Why
**Mission statement** with laptop/mountain image  
*"Talent is universal — opportunity is not"*

### 3️⃣ Founder's Story
**Angela Landrith portrait + blockquote**  
*"I spent two decades in corporate technology — and I saw too many people with potential left on the sidelines"*

### 4️⃣ The Future We're Building
**3 cards with hover animations:**
- 🎓 Accessible Education (Evergreen)
- 👥 Community Mentorship (Sky Blue)  
- 💼 Career Growth for Good (Summit Teal)

### 5️⃣ Impact Quote Band
**Full-width photo with overlay:**  
*"When people learn with purpose, they change their own story — and ours"*

### 6️⃣ Support Callout
**3 CTA buttons:**
- 💖 Donate to the Vision
- 👥 Volunteer with Us
- 🎓 Learn More About the Academy

---

## 🎨 Brand Colors Used

| Color | Hex | Usage |
|-------|-----|-------|
| **Evergreen** | `#3B6A52` | Accessible Education card, nature themes |
| **Summit Teal** | `#2C6975` | Headlines, authority, primary brand |
| **Sky Blue** | `#7EB5C1` | Mentorship card, supportive elements |
| **Trail Cream** | `#F5F3E8` | Backgrounds, warm neutrals |
| **Sun Amber** | `#F9A03F` | CTAs, badges, urgent actions |

---

## 🌓 Dark Mode

**Fully supported** with automatic theme switching:
- Backgrounds: Cream → Slate 900
- Cards: White → Slate 800  
- Text: Teal/Evergreen → Sky Blue/White
- All hover states and animations preserved

---

## ✨ Key Features

✅ **Motion animations** - Fade-in on scroll, hover lifts, scale effects  
✅ **Penny AI companion** - Floating wisdom bubble in founder section  
✅ **Responsive grid** - Mobile stacked, tablet 2-col, desktop 3-col  
✅ **High-quality images** - Unsplash integration with fallbacks  
✅ **Accessible** - Semantic HTML, keyboard nav, ARIA labels  
✅ **Reserved word compliance** - No "Trailhead" or "Trailblazer"

---

## 🔧 Usage Example

```tsx
import { OurVision } from './components/OurVision';

function MyPage() {
  return (
    <OurVision 
      onDonate={() => navigateTo('postcards-from-future')}
      onVolunteer={() => navigateTo('visitor-home')}
      onLearnMore={() => navigateTo('visitor-learning')}
    />
  );
}
```

---

## 🎯 User Journey

```
Visitor lands on page
    ↓
Reads mission statement (emotional hook)
    ↓
Connects with founder's authentic story
    ↓
Understands the 3 pillars of impact
    ↓
Inspired by quote band
    ↓
Takes action: Donate / Volunteer / Learn More
```

---

## 📱 Responsive Breakpoints

- **Mobile (< 768px):** Single column, stacked sections
- **Tablet (768px+):** 2-column future cards  
- **Desktop (1024px+):** Full 3-column grid

---

## 🎭 Animation Patterns

### Scroll Triggers
All sections fade in as they enter viewport (once, no repeat)

### Hover Effects
- **Cards:** Lift 8px upward
- **Icons:** Scale to 110%
- **Arrows:** Slide 4px right
- **Borders:** Color change to Sun Amber

### Timing
- **Duration:** 0.6-0.8s for smoothness
- **Delays:** Staggered 0.15s for card sequences
- **Easing:** Default spring physics

---

## 🧭 Navigation Integration

### Add to Visitor Navigation

```tsx
<Button onClick={() => onNavigate('our-vision')}>
  Our Vision
</Button>
```

### Add to Postcards Hero

```tsx
<Button onClick={() => setActivePage('our-vision')}>
  Learn Our Story
</Button>
```

---

## 📊 Component Props

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `onDonate` | `() => void` | Optional | Handler for donate button |
| `onVolunteer` | `() => void` | Optional | Handler for volunteer button |
| `onLearnMore` | `() => void` | Optional | Handler for learn more button |

---

## 🎨 Design Tokens

### Spacing
- **Section padding:** `py-24` (96px)
- **Container max-width:** `max-w-7xl` (1280px)
- **Grid gap:** `gap-8` or `gap-12` (32-48px)

### Border Radius
- **Cards:** `rounded-2xl` (16px)
- **Icons:** `rounded-2xl` (16px)
- **Buttons:** `rounded-lg` (8px)

### Shadows
- **Cards:** `shadow-lg` or `shadow-2xl`
- **Hover:** `hover:shadow-2xl`
- **Images:** `shadow-2xl` with ring decoration

---

## ✅ Testing Checklist

- [ ] Load page in light mode
- [ ] Toggle to dark mode - all colors switch
- [ ] Scroll down - animations trigger
- [ ] Hover over cards - lift effect works
- [ ] Click all 3 CTA buttons - handlers fire
- [ ] Check mobile responsive (< 768px)
- [ ] Check tablet responsive (768-1024px)
- [ ] Verify no console errors
- [ ] Confirm images load
- [ ] Check Penny bubble appears

---

## 🔗 Related Files

- `/components/OurVision.tsx` - Main component
- `/OUR_VISION_IMPLEMENTATION.md` - Full documentation
- `/TTDS_DESIGN_SYSTEM.md` - Design system reference
- `/components/PostcardsFromTheFuture.tsx` - Related donation page

---

## 🎉 What Makes This Special

1. **Authentic Storytelling** - Real founder story, not generic marketing
2. **Visual Hierarchy** - Clear flow from why → who → what → impact → action
3. **Emotional Connection** - Images and copy work together to inspire
4. **Action-Oriented** - Multiple clear CTAs at strategic points
5. **Brand Consistency** - Full TTDS color palette and typography compliance

---

**Ready to use!** 🚀  
Just navigate to `'our-vision'` in your app routing.
