# 🧪 Our Vision Dark Mode - Testing Guide

## Quick Test Instructions

Follow these steps to verify all dark mode fixes are working properly.

---

## 🚀 Quick Start Test (2 minutes)

### 1. Navigate to Our Vision Page
```
1. Open the app in your browser
2. Click "Our Vision" ✨ in the navigation bar
3. Page should load in light mode by default
```

### 2. Toggle Dark Mode
```
1. Look for the theme toggle in the top-right corner
2. Click the icon (☀️ sun → 🌙 moon)
3. Page should smoothly transition to dark mode
4. All elements should remain visible
```

### 3. Verify Key Elements
```
✅ Page header gradient is dark but readable
✅ All text is clearly visible (no invisible text)
✅ Penny's speech bubble has contrast against card
✅ All cards have visible borders
✅ "Learn more" links are readable
```

**Expected Time:** < 2 minutes  
**Pass Criteria:** All 5 checkmarks ✅

---

## 🔍 Detailed Section-by-Section Test

### Section 1: Page Header

**Light Mode:**
```
1. Check gradient: Teal → Evergreen (vibrant)
2. Verify "Our Vision" badge is orange
3. Confirm headline is white and readable
4. Check subtitle is white/90 opacity
```

**Dark Mode:**
```
1. Check gradient: Darker Teal → Darker Evergreen
2. Verify badge still orange (unchanged)
3. Confirm headline still white and crisp
4. Check subtitle still readable
```

✅ **Pass if:** Text is readable in both modes, gradient visibly darker in dark mode.

---

### Section 2: Intro Narrative ("The Why")

**Light Mode:**
```
1. Background: Cream gradient
2. Headline: Teal (#2C6975)
3. Body text: Evergreen (#3B6A52)
4. Badges: Various brand colors
```

**Dark Mode:**
```
1. Background: Slate 900 → Slate 800 gradient
2. Headline: Sky Blue (#7EB5C1) ← Should change!
3. Body text: Slate 300 (light gray) ← Should change!
4. Badges: Same colors but adjusted opacity
```

✅ **Pass if:** Headlines and body text are clearly more readable in dark mode than they would be with light mode colors.

---

### Section 3: Founder's Story

**Test the Quote Card:**

Light Mode:
```
1. Card has light border on left (Teal)
2. Background: Cream → White gradient
3. Quote text: Teal
4. Penny bubble: White background with Teal text
```

Dark Mode:
```
1. Card has bright border on left (Sky Blue) ← Should change!
2. Background: Slate 800 → Slate 900 gradient ← Should change!
3. Quote text: White ← Should change!
4. Penny bubble: Slate 700 background ← CRITICAL: Must be visible!
5. Penny bubble text: Sky Blue ← Should change!
```

**Critical Test - Penny Bubble Visibility:**
```
❌ FAIL: If you can barely see Penny's bubble
✅ PASS: If bubble clearly stands out from card background
```

---

### Section 4: The Future We're Building (3 Cards)

**Test Each Card:**

Light Mode:
```
1. Cards: White background
2. Borders: Transparent (no visible border)
3. Titles: Teal
4. Descriptions: Evergreen
5. "Learn more" links: Match card color (Evergreen/Sky Blue/Teal)
```

Dark Mode:
```
1. Cards: Slate 800 background ← Should change!
2. Borders: Slate 700 (visible!) ← CRITICAL: Must be visible!
3. Titles: White ← Should change!
4. Descriptions: Slate 300 ← Should change!
5. "Learn more" links: Sky Blue ← Should change to uniform color!
```

**Hover Test (Both Modes):**
```
1. Hover over any card
2. Card should lift (-8px)
3. Border should turn orange
4. Icon should scale slightly
5. "Learn more" arrow should slide right
```

✅ **Pass if:** Card borders are visible in dark mode, hover effects work in both modes.

---

### Section 5: Impact Quote Band

**Test Background Overlay:**

Light Mode:
```
1. Background image visible
2. Overlay: Teal → Evergreen gradient (95% opacity)
3. Quote: White text (clearly readable)
4. Button: Orange (high contrast)
```

Dark Mode:
```
1. Background image still visible (dimmed)
2. Overlay: DARKER Teal → Darker Evergreen ← Should be noticeably darker!
3. Quote: White text (still readable)
4. Button: Orange (unchanged)
```

✅ **Pass if:** Text remains crisp and readable in both modes, overlay darkens in dark mode.

---

### Section 6: Support Callout

**Test CTA Buttons:**

Light Mode:
```
Button 1 (Donate):     Orange solid
Button 2 (Volunteer):  Teal outline
Button 3 (Learn More): Evergreen outline
```

Dark Mode:
```
Button 1 (Donate):     Orange solid (unchanged) ✓
Button 2 (Volunteer):  Sky Blue outline ← Should change!
Button 3 (Learn More): Sky Blue outline ← Should change!
```

**Hover Test (Dark Mode - Critical!):**
```
Button 1 (Donate):
  - Default: Orange
  - Hover: Slightly darker orange ✓

Button 2 (Volunteer):
  - Default: Sky Blue outline, Sky Blue text
  - Hover: Sky Blue background, SLATE 900 text ← Must be readable!

Button 3 (Learn More):
  - Default: Sky Blue outline, Sky Blue text
  - Hover: Sky Blue background, SLATE 900 text ← Must be readable!
```

✅ **Pass if:** All buttons are visible, hover states have good contrast in both modes.

---

## 🎯 Critical Test Points (Must Pass All)

### 1. Penny Bubble Visibility Test
```
Steps:
1. Toggle to dark mode
2. Scroll to "Founder's Story" section
3. Look for Penny's speech bubble below the quote
4. Bubble should clearly stand out from card

❌ FAIL: Bubble blends into background
✅ PASS: Bubble is clearly visible with Slate 700 background
```

### 2. Card Border Visibility Test
```
Steps:
1. Toggle to dark mode
2. Scroll to "The Future We're Building"
3. Look at the 3 cards
4. Each card should have a visible border

❌ FAIL: Cards look like floating boxes with no borders
✅ PASS: Cards have clear Slate 700 borders
```

### 3. "Learn More" Links Readability Test
```
Steps:
1. Toggle to dark mode
2. Scroll to "The Future We're Building"
3. Look at "Learn more →" at bottom of each card
4. Text should be Sky Blue (#7EB5C1)

❌ FAIL: Text is dark teal and hard to read
✅ PASS: Text is bright Sky Blue and clearly readable
```

### 4. Button Hover Contrast Test
```
Steps:
1. Toggle to dark mode
2. Scroll to Support Callout section
3. Hover over "Volunteer with Us" button
4. Background should be Sky Blue, text should be Slate 900

❌ FAIL: Text is white on light background (unreadable)
✅ PASS: Text is dark on light background (high contrast)
```

### 5. Theme Toggle Consistency Test
```
Steps:
1. Start in light mode
2. Scroll through entire page (note appearance)
3. Toggle to dark mode
4. Scroll through entire page again
5. Toggle back to light mode
6. Page should look identical to step 2

❌ FAIL: Elements don't restore properly
✅ PASS: Perfect consistency on theme toggle
```

---

## 🐛 Known Issues to Watch For

### Issue: Flashing During Toggle
**Symptom:** Elements flash white briefly when switching to dark mode  
**Expected:** Smooth transition with no flash  
**Fix:** Check ThemeProvider implementation

### Issue: Inline Styles Override
**Symptom:** Some elements don't change color in dark mode  
**Expected:** All elements respond to dark mode  
**Fix:** Remove `style={{...}}` attributes, use Tailwind classes

### Issue: Poor Contrast
**Symptom:** Text hard to read on dark backgrounds  
**Expected:** All text meets WCAG AA (4.5:1) minimum  
**Fix:** Use lighter colors (Slate 300 for body, Sky Blue for accents)

---

## 📊 Contrast Checker Tool

Use this to verify contrast ratios:

### Online Tool
Visit: https://webaim.org/resources/contrastchecker/

### Test These Combinations (Dark Mode):

```
1. Sky Blue Headline on Slate 900
   Foreground: #7EB5C1
   Background: #0f172a
   Expected: > 7:1 (AAA) ✅

2. Slate 300 Body on Slate 900
   Foreground: #cbd5e1
   Background: #0f172a
   Expected: > 10:1 (AAA) ✅

3. Sky Blue on Slate 700 (Penny Bubble)
   Foreground: #7EB5C1
   Background: #334155
   Expected: > 7:1 (AAA) ✅

4. Slate 900 on Sky Blue (Button Hover)
   Foreground: #0f172a
   Background: #7EB5C1
   Expected: > 9:1 (AAA) ✅
```

---

## ✅ Final Test Checklist

**Visual Elements:**
- [ ] Page header gradient is darker in dark mode
- [ ] All headlines are Sky Blue in dark mode
- [ ] All body text is Slate 300 in dark mode
- [ ] Penny bubble is Slate 700 and clearly visible
- [ ] All card borders are visible (Slate 700)
- [ ] All badges maintain visibility

**Interactive Elements:**
- [ ] Primary CTA (orange) buttons work in both modes
- [ ] Outline buttons have proper contrast
- [ ] Button hover states are readable
- [ ] "Learn more" links are Sky Blue in dark mode
- [ ] All hover effects work smoothly

**Functionality:**
- [ ] Theme toggle switches instantly
- [ ] No elements disappear in either mode
- [ ] Images remain visible (not too dark)
- [ ] Animations work in both modes
- [ ] No console errors when switching themes

**Accessibility:**
- [ ] All text contrast > 4.5:1 (AA minimum)
- [ ] Most text contrast > 7:1 (AAA preferred)
- [ ] Focus states visible in both modes
- [ ] Keyboard navigation works

**Performance:**
- [ ] Theme switch happens instantly (< 300ms)
- [ ] No layout shift during switch
- [ ] Page remains responsive after multiple toggles

---

## 🎉 Test Results Template

```
Test Date: __________
Tester: __________
Browser: __________

CRITICAL TESTS (Must All Pass):
[ ] Penny Bubble Visible
[ ] Card Borders Visible
[ ] "Learn More" Links Readable
[ ] Button Hover States Good Contrast
[ ] Theme Toggle Consistent

SECTION TESTS:
[ ] Page Header
[ ] Intro Narrative
[ ] Founder's Story
[ ] Future We're Building
[ ] Impact Quote Band
[ ] Support Callout

OVERALL RESULT:
[ ] PASS - All tests passed
[ ] FAIL - See issues below

Issues Found:
_________________________________
_________________________________
_________________________________
```

---

## 🔧 Quick Fix Reference

If you find issues, here are the common fixes:

**Penny Bubble Not Visible:**
```tsx
// Change from:
className="bg-white dark:bg-slate-800"
// To:
className="bg-[#F5F3E8]/50 dark:bg-slate-700"
```

**Card Borders Missing:**
```tsx
// Add:
dark:border-slate-700
```

**Text Hard to Read:**
```tsx
// Headlines:
className="text-[#2C6975] dark:text-[#7EB5C1]"

// Body:
className="text-[#3B6A52] dark:text-slate-300"
```

**Button Hover Poor Contrast:**
```tsx
// Change from:
dark:hover:bg-[#3B6A52] dark:hover:text-white
// To:
dark:hover:bg-[#7EB5C1] dark:hover:text-slate-900
```

---

**Ready to test!** Follow the checklist and verify all items pass. ✅
