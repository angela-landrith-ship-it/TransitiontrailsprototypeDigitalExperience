# 🌓 Learning Center Dark Mode - Testing Guide

## Quick Visual Checklist

Use this guide to verify that dark mode is working correctly on the Learning Center page.

---

## 🎯 What to Check

### 1. **Page Background**
✅ **Expected:** Dark slate background (not cream/beige)
- Light mode: Cream (#F5F3E8)
- Dark mode: Slate-900 (very dark blue-gray)

### 2. **Hero Section**
✅ **Expected:** Darker gradient in dark mode
- Light mode: Teal to Green gradient
- Dark mode: Darker teal to darker green

### 3. **Category Cards (3 cards in hero)**
✅ **Expected:** Semi-transparent with darker appearance
- Light mode: white/10 background
- Dark mode: white/5 background (less visible white overlay)
- All text should remain white in both modes

### 4. **Search Bar**
✅ **Expected:** Dark background with white text
- Light mode: White background, black text
- Dark mode: Slate-700 background, white text
- Placeholder text should be lighter gray

###5. **Filter Button**
✅ **Expected:** Dark background
- Light mode: White with gray text
- Dark mode: Slate-700 with light gray text

### 6. **Course Cards** (Main content area)
✅ **Expected:** Dark card backgrounds
- Light mode: White cards
- Dark mode: Slate-800 cards
- All borders should be slate-700

### 7. **Course Titles**
✅ **Expected:** White text
- Light mode: Gray-900 (dark text)
- Dark mode: White

### 8. **Provider Badges** (PluralSight/Trailhead)
✅ **Expected:** Adjusted colors
- PluralSight: Orange with increased opacity background
- Trailhead: Sky Blue (#7EB5C1) instead of Teal

### 9. **Skills Tags**
✅ **Expected:** Dark backgrounds
- Light mode: Gray-100
- Dark mode: Slate-700

### 10. **Progress Bars**
✅ **Expected:** Dark container
- Light mode: Gray-200 background
- Dark mode: Slate-700 background

### 11. **Buttons**
✅ **Expected:** High contrast
- "Continue Learning": Sky Blue with dark text in dark mode
- "Start Course": Sky Blue border with matching text

### 12. **Penny Recommendations Sidebar**
✅ **Expected:** Visible gradient background
- Light mode: Subtle orange/teal gradient
- Dark mode: Increased opacity gradient

### 13. **Priority Cards** (in Penny recommendations)
✅ **Expected:** Dark backgrounds with proper borders
- High (red): dark red background
- Medium (blue): dark blue background
- Low (gray): Slate-700 background

### 14. **Learning Stats Card**
✅ **Expected:** Dark background
- Light mode: White
- Dark mode: Slate-800

---

## 🔍 Common Issues & Solutions

### Issue: "I don't see any changes"
**Solution:** Clear browser cache or do a hard refresh
- Chrome/Edge: `Ctrl + Shift + R` (Windows) or `Cmd + Shift + R` (Mac)
- Firefox: `Ctrl + F5` (Windows) or `Cmd + Shift + R` (Mac)
- Safari: `Cmd + Option + R`

### Issue: "Some cards are still white"
**Check:**
1. Is dark mode actually enabled? (Check the theme toggle)
2. Browser cache cleared?
3. Are you looking at the right page? (Learning Center, not Learning Trails)

### Issue: "Text is hard to read"
**Expected dark mode text colors:**
- Headlines: White
- Body text: Slate-300
- Secondary text: Slate-400
- Muted text: Slate-500

### Issue: "Buttons don't have enough contrast"
**Expected button styling:**
- Primary buttons: Sky Blue (#7EB5C1) background, Slate-900 text
- Outline buttons: Sky Blue border and text
- All should have 7:1+ contrast ratio

---

## 🎨 Color Reference (Dark Mode)

### Backgrounds
```
Page:              #0F172A (slate-900)
Cards:             #1E293B (slate-800)
Nested elements:   #334155 (slate-700)
Input fields:      #334155 (slate-700)
```

### Text
```
Headlines:         #FFFFFF (white)
Body:              #CBD5E1 (slate-300)
Secondary:         #94A3B8 (slate-400)
Muted:             #64748B (slate-500)
```

### Accents
```
Primary:           #7EB5C1 (Sky Blue) - was #2C6975 (Teal) in light mode
Orange CTA:        #F9A03F (unchanged)
Borders:           #334155 (slate-700)
```

---

## 🧪 Step-by-Step Test

1. **Open Learning Center page**
2. **Toggle dark mode** (use theme switcher in navigation)
3. **Scroll through entire page** and check each section:

**Hero Section:**
   - [ ] Background is darker teal/green
   - [ ] Category cards are semi-transparent
   - [ ] All text is white

**Search & Filter Area:**
   - [ ] Search bar has dark background
   - [ ] Text is white when typing
   - [ ] Filter button is dark
   - [ ] Category pills (if showing) are Sky Blue

**Course List:**
   - [ ] All course cards have dark backgrounds
   - [ ] Course titles are white
   - [ ] Provider badges are visible
   - [ ] Skills tags have dark backgrounds
   - [ ] Progress bars visible with gradient
   - [ ] Buttons have high contrast

**Sidebar:**
   - [ ] Penny card has visible gradient background
   - [ ] All recommendation cards have proper backgrounds
   - [ ] Icon colors are lighter (red-400, blue-400, gray-400)
   - [ ] Stats card has dark background
   - [ ] All text is readable

4. **Test interactions:**
   - [ ] Hover over course cards - border changes to Sky Blue
   - [ ] Hover over buttons - background changes are visible
   - [ ] Click category cards in hero - selection state is clear

---

## 📸 Visual Comparison

### Hero Section
**Light Mode:** Bright teal/green gradient with visible white cards  
**Dark Mode:** Darker teal/green with subtle semi-transparent cards

### Course Cards
**Light Mode:** White cards with gray text and dark titles  
**Dark Mode:** Slate-800 cards with white/light gray text

### Penny Recommendations
**Light Mode:** Light orange/teal gradient background  
**Dark Mode:** More visible orange/Sky Blue gradient

### Buttons
**Light Mode:** Teal buttons with white text  
**Dark Mode:** Sky Blue buttons with dark text (high contrast)

---

## ✅ Final Verification

Run through this quick checklist:

- [ ] Page loads without console errors
- [ ] Theme toggle works smoothly
- [ ] All text is readable (no invisible text)
- [ ] All cards have visible backgrounds
- [ ] All borders are visible
- [ ] All buttons have adequate contrast
- [ ] Hover states work properly
- [ ] No layout shifts when switching themes
- [ ] Images load correctly
- [ ] Icons are visible

---

## 🐛 Still Having Issues?

### Debug Steps:

1. **Check browser console** for any errors
2. **Verify component is updated:**
   - File: `/components/LearningCenter.tsx`
   - Line 169 should have: `dark:bg-slate-900`
   - Line 171 should have: `dark:from-[#1e4a53] dark:to-[#2a5140]`

3. **Check if Tailwind dark mode is working:**
   - Open browser DevTools
   - Find an element with dark mode class
   - Check if class is being applied when `dark` class is on `<html>` element

4. **Verify ThemeProvider:**
   - Check if `ThemeProvider` component is wrapping the app
   - Confirm theme toggle is updating the state

---

## 📝 Expected Behavior Summary

**When you toggle to dark mode:**
- Background should immediately change from cream to dark slate
- All white cards should become slate-800
- All gray text should become white or light slate
- All buttons should change to Sky Blue
- Gradients should become darker
- Everything should remain readable with high contrast

**Performance:**
- Theme switch should be instant (< 100ms)
- No flickering
- No layout shift
- Smooth transitions on interactive elements

---

**Status:** All fixes applied - Testing guide created  
**Date:** November 8, 2025  
**Purpose:** Help identify specific dark mode issues on Learning Center
