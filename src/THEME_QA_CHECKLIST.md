# ✅ Theme QA Manual Checklist

## Transition Trails Digital Experience - Light & Dark Mode Testing

**Use this checklist until automated QA is implemented**

---

## 📋 How to Use This Checklist

1. **Per Page:** Complete this checklist for each page/component
2. **Both Themes:** Test every item in BOTH Light and Dark modes
3. **Mark Complete:** Check ✅ when item passes, ❌ when it fails
4. **Document Issues:** Note problems in the Issues section
5. **Retest:** After fixes, retest failed items

---

## 🎨 Theme QA Checklist Template

### Page: __________________ | Date: __________ | Tester: __________

---

## SECTION 1: COLOR TOKENS

### A. Background Colors

| Element | Light Mode | Dark Mode | Uses Token? | Notes |
|---------|------------|-----------|-------------|-------|
| Page background | ⬜ Pass ⬜ Fail | ⬜ Pass ⬜ Fail | ⬜ Yes ⬜ No | |
| Section backgrounds | ⬜ Pass ⬜ Fail | ⬜ Pass ⬜ Fail | ⬜ Yes ⬜ No | |
| Card backgrounds | ⬜ Pass ⬜ Fail | ⬜ Pass ⬜ Fail | ⬜ Yes ⬜ No | |
| Modal backgrounds | ⬜ Pass ⬜ Fail | ⬜ Pass ⬜ Fail | ⬜ Yes ⬜ No | |
| Navigation bar | ⬜ Pass ⬜ Fail | ⬜ Pass ⬜ Fail | ⬜ Yes ⬜ No | |

**Required Tokens:**
- `bg-[#F5F3E8]` → `dark:bg-slate-900` (page)
- `bg-white` → `dark:bg-slate-800` (cards)
- `bg-gray-50` → `dark:bg-slate-700` (sections)

---

### B. Text Colors

| Element | Light Mode | Dark Mode | Uses Token? | Notes |
|---------|------------|-----------|-------------|-------|
| Headings (H1-H4) | ⬜ Pass ⬜ Fail | ⬜ Pass ⬜ Fail | ⬜ Yes ⬜ No | |
| Body text | ⬜ Pass ⬜ Fail | ⬜ Pass ⬜ Fail | ⬜ Yes ⬜ No | |
| Secondary text | ⬜ Pass ⬜ Fail | ⬜ Pass ⬜ Fail | ⬜ Yes ⬜ No | |
| Links | ⬜ Pass ⬜ Fail | ⬜ Pass ⬜ Fail | ⬜ Yes ⬜ No | |
| Button text | ⬜ Pass ⬜ Fail | ⬜ Pass ⬜ Fail | ⬜ Yes ⬜ No | |

**Required Tokens:**
- `text-gray-900` → `dark:text-white` (headings)
- `text-gray-600` → `dark:text-slate-400` (body)
- `text-gray-500` → `dark:text-slate-500` (secondary)

---

### C. Border & Divider Colors

| Element | Light Mode | Dark Mode | Uses Token? | Notes |
|---------|------------|-----------|-------------|-------|
| Card borders | ⬜ Pass ⬜ Fail | ⬜ Pass ⬜ Fail | ⬜ Yes ⬜ No | |
| Input borders | ⬜ Pass ⬜ Fail | ⬜ Pass ⬜ Fail | ⬜ Yes ⬜ No | |
| Dividers | ⬜ Pass ⬜ Fail | ⬜ Pass ⬜ Fail | ⬜ Yes ⬜ No | |
| Table lines | ⬜ Pass ⬜ Fail | ⬜ Pass ⬜ Fail | ⬜ Yes ⬜ No | |

**Required Tokens:**
- `border-gray-200` → `dark:border-slate-700` (default)
- `border-gray-300` → `dark:border-slate-600` (inputs)

---

## SECTION 2: INTERACTIVE STATES

### A. Button States

**Primary Button:**

| State | Light Mode | Dark Mode | Notes |
|-------|------------|-----------|-------|
| Default | ⬜ Pass ⬜ Fail | ⬜ Pass ⬜ Fail | |
| Hover | ⬜ Pass ⬜ Fail | ⬜ Pass ⬜ Fail | |
| Focus (ring visible) | ⬜ Pass ⬜ Fail | ⬜ Pass ⬜ Fail | |
| Active/Pressed | ⬜ Pass ⬜ Fail | ⬜ Pass ⬜ Fail | |
| Disabled | ⬜ Pass ⬜ Fail | ⬜ Pass ⬜ Fail | |

**Secondary Button:**

| State | Light Mode | Dark Mode | Notes |
|-------|------------|-----------|-------|
| Default | ⬜ Pass ⬜ Fail | ⬜ Pass ⬜ Fail | |
| Hover | ⬜ Pass ⬜ Fail | ⬜ Pass ⬜ Fail | |
| Focus (ring visible) | ⬜ Pass ⬜ Fail | ⬜ Pass ⬜ Fail | |
| Active/Pressed | ⬜ Pass ⬜ Fail | ⬜ Pass ⬜ Fail | |
| Disabled | ⬜ Pass ⬜ Fail | ⬜ Pass ⬜ Fail | |

---

### B. Input Field States

| State | Light Mode | Dark Mode | Notes |
|-------|------------|-----------|-------|
| Default/Empty | ⬜ Pass ⬜ Fail | ⬜ Pass ⬜ Fail | |
| Focus (ring visible) | ⬜ Pass ⬜ Fail | ⬜ Pass ⬜ Fail | |
| Filled | ⬜ Pass ⬜ Fail | ⬜ Pass ⬜ Fail | |
| Error state | ⬜ Pass ⬜ Fail | ⬜ Pass ⬜ Fail | |
| Success state | ⬜ Pass ⬜ Fail | ⬜ Pass ⬜ Fail | |
| Disabled | ⬜ Pass ⬜ Fail | ⬜ Pass ⬜ Fail | |

---

### C. Card States

| State | Light Mode | Dark Mode | Notes |
|-------|------------|-----------|-------|
| Default | ⬜ Pass ⬜ Fail | ⬜ Pass ⬜ Fail | |
| Hover | ⬜ Pass ⬜ Fail | ⬜ Pass ⬜ Fail | |
| Selected/Active | ⬜ Pass ⬜ Fail | ⬜ Pass ⬜ Fail | |
| Focus (if clickable) | ⬜ Pass ⬜ Fail | ⬜ Pass ⬜ Fail | |

---

### D. Navigation States

| State | Light Mode | Dark Mode | Notes |
|-------|------------|-----------|-------|
| Default | ⬜ Pass ⬜ Fail | ⬜ Pass ⬜ Fail | |
| Hover | ⬜ Pass ⬜ Fail | ⬜ Pass ⬜ Fail | |
| Active/Current page | ⬜ Pass ⬜ Fail | ⬜ Pass ⬜ Fail | |
| Focus | ⬜ Pass ⬜ Fail | ⬜ Pass ⬜ Fail | |

---

## SECTION 3: CONTRAST TESTING

### A. Text Contrast (Use Contrast Checker Tool)

| Text Element | Background | Ratio | Pass? | Notes |
|--------------|------------|-------|-------|-------|
| H1 heading | Page bg | _____:1 | ⬜ Yes ⬜ No | Min 4.5:1 |
| Body text | Card bg | _____:1 | ⬜ Yes ⬜ No | Min 4.5:1 |
| Secondary text | Page bg | _____:1 | ⬜ Yes ⬜ No | Min 4.5:1 |
| Button text | Button bg | _____:1 | ⬜ Yes ⬜ No | Min 4.5:1 |
| Link text | Page bg | _____:1 | ⬜ Yes ⬜ No | Min 4.5:1 |

**Tools:** 
- WebAIM Contrast Checker: https://webaim.org/resources/contrastchecker/
- Browser DevTools (Inspect → Accessibility)

---

### B. UI Component Contrast

| Component | Background | Ratio | Pass? | Notes |
|-----------|------------|-------|-------|-------|
| Icons | Icon bg | _____:1 | ⬜ Yes ⬜ No | Min 3:1 |
| Focus ring | Adjacent color | _____:1 | ⬜ Yes ⬜ No | Min 3:1 |
| Borders | Both sides | _____:1 | ⬜ Yes ⬜ No | Min 3:1 |
| Badges | Badge bg | _____:1 | ⬜ Yes ⬜ No | Min 4.5:1 |

---

## SECTION 4: SHADOWS & ELEVATION

| Element | Light Mode Shadow | Dark Mode Shadow | Correct Token? | Notes |
|---------|-------------------|------------------|----------------|-------|
| Cards | ⬜ Pass ⬜ Fail | ⬜ Pass ⬜ Fail | ⬜ Yes ⬜ No | |
| Modals | ⬜ Pass ⬜ Fail | ⬜ Pass ⬜ Fail | ⬜ Yes ⬜ No | |
| Dropdowns | ⬜ Pass ⬜ Fail | ⬜ Pass ⬜ Fail | ⬜ Yes ⬜ No | |
| Floating elements | ⬜ Pass ⬜ Fail | ⬜ Pass ⬜ Fail | ⬜ Yes ⬜ No | |

**Required Shadows:**
- Cards: `shadow-sm` in light, `shadow-md` in dark
- Modals: `shadow-xl` in both
- Dropdowns: `shadow-lg` in both

---

## SECTION 5: IMAGES & MEDIA

| Element | Light Mode | Dark Mode | Readable? | Needs Scrim? | Notes |
|---------|------------|-----------|-----------|--------------|-------|
| Hero images | ⬜ Pass ⬜ Fail | ⬜ Pass ⬜ Fail | ⬜ Yes ⬜ No | ⬜ Yes ⬜ No | |
| Background images | ⬜ Pass ⬜ Fail | ⬜ Pass ⬜ Fail | ⬜ Yes ⬜ No | ⬜ Yes ⬜ No | |
| Thumbnails | ⬜ Pass ⬜ Fail | ⬜ Pass ⬜ Fail | ⬜ Yes ⬜ No | ⬜ Yes ⬜ No | |
| Avatars | ⬜ Pass ⬜ Fail | ⬜ Pass ⬜ Fail | ⬜ Yes ⬜ No | ⬜ Yes ⬜ No | |
| Icons (SVG) | ⬜ Pass ⬜ Fail | ⬜ Pass ⬜ Fail | ⬜ Yes ⬜ No | ⬜ Yes ⬜ No | |

**If scrim needed, add:**
- Light mode: `bg-black/20` overlay
- Dark mode: `bg-black/40` overlay

---

## SECTION 6: ACCESSIBILITY

### A. Focus Indicators

| Element | Focus Ring Visible | Meets 3:1 Contrast | Keyboard Nav Works | Notes |
|---------|-------------------|--------------------|--------------------|-------|
| Buttons | ⬜ Yes ⬜ No | ⬜ Yes ⬜ No | ⬜ Yes ⬜ No | |
| Input fields | ⬜ Yes ⬜ No | ⬜ Yes ⬜ No | ⬜ Yes ⬜ No | |
| Links | ⬜ Yes ⬜ No | ⬜ Yes ⬜ No | ⬜ Yes ⬜ No | |
| Cards (clickable) | ⬜ Yes ⬜ No | ⬜ Yes ⬜ No | ⬜ Yes ⬜ No | |
| Navigation items | ⬜ Yes ⬜ No | ⬜ Yes ⬜ No | ⬜ Yes ⬜ No | |

---

### B. Text Sizes

| Element | Size | Meets Minimum? | Notes |
|---------|------|----------------|-------|
| Body text | ____px | ⬜ ≥16px | |
| Labels | ____px | ⬜ ≥14px | |
| Headings | ____px | ⬜ ≥18px | |
| Captions | ____px | ⬜ ≥12px | |

---

### C. Touch Targets

| Element | Width × Height | Meets 44×44? | Notes |
|---------|----------------|--------------|-------|
| Primary button | ____×____ | ⬜ Yes ⬜ No | |
| Icon button | ____×____ | ⬜ Yes ⬜ No | |
| Input field | ____×____ | ⬜ ≥44px height | |
| Nav links | ____×____ | ⬜ Yes ⬜ No | |

---

## SECTION 7: SPECIAL COMPONENTS

### A. Penny Widget

| Element | Light Mode | Dark Mode | Notes |
|---------|------------|-----------|-------|
| Floating button | ⬜ Pass ⬜ Fail | ⬜ Pass ⬜ Fail | |
| Ring color (Orange) | ⬜ Pass ⬜ Fail | ⬜ Pass ⬜ Fail | |
| Speech bubble | ⬜ Pass ⬜ Fail | ⬜ Pass ⬜ Fail | |
| Chat messages | ⬜ Pass ⬜ Fail | ⬜ Pass ⬜ Fail | |
| Text legible | ⬜ Yes ⬜ No | ⬜ Yes ⬜ No | |

---

### B. Badge/Tag Components

| Element | Light Mode | Dark Mode | Text Readable? | Notes |
|---------|------------|-----------|----------------|-------|
| Level badges | ⬜ Pass ⬜ Fail | ⬜ Pass ⬜ Fail | ⬜ Yes ⬜ No | |
| Status tags | ⬜ Pass ⬜ Fail | ⬜ Pass ⬜ Fail | ⬜ Yes ⬜ No | |
| Skill chips | ⬜ Pass ⬜ Fail | ⬜ Pass ⬜ Fail | ⬜ Yes ⬜ No | |
| Category tags | ⬜ Pass ⬜ Fail | ⬜ Pass ⬜ Fail | ⬜ Yes ⬜ No | |

---

### C. Data Visualization

| Element | Light Mode | Dark Mode | Labels Readable? | Notes |
|---------|------------|-----------|------------------|-------|
| Progress bars | ⬜ Pass ⬜ Fail | ⬜ Pass ⬜ Fail | ⬜ Yes ⬜ No | |
| Charts/graphs | ⬜ Pass ⬜ Fail | ⬜ Pass ⬜ Fail | ⬜ Yes ⬜ No | |
| Stat cards | ⬜ Pass ⬜ Fail | ⬜ Pass ⬜ Fail | ⬜ Yes ⬜ No | |
| Meters | ⬜ Pass ⬜ Fail | ⬜ Pass ⬜ Fail | ⬜ Yes ⬜ No | |

---

## SECTION 8: ERROR & VALIDATION STATES

| State | Light Mode | Dark Mode | Icon Visible | Text Readable | Notes |
|-------|------------|-----------|--------------|---------------|-------|
| Error state | ⬜ Pass ⬜ Fail | ⬜ Pass ⬜ Fail | ⬜ Yes ⬜ No | ⬜ Yes ⬜ No | |
| Warning state | ⬜ Pass ⬜ Fail | ⬜ Pass ⬜ Fail | ⬜ Yes ⬜ No | ⬜ Yes ⬜ No | |
| Success state | ⬜ Pass ⬜ Fail | ⬜ Pass ⬜ Fail | ⬜ Yes ⬜ No | ⬜ Yes ⬜ No | |
| Info state | ⬜ Pass ⬜ Fail | ⬜ Pass ⬜ Fail | ⬜ Yes ⬜ No | ⬜ Yes ⬜ No | |

---

## SECTION 9: LOADING & SKELETON STATES

| Element | Light Mode | Dark Mode | Visible? | Notes |
|---------|------------|-----------|----------|-------|
| Skeleton cards | ⬜ Pass ⬜ Fail | ⬜ Pass ⬜ Fail | ⬜ Yes ⬜ No | |
| Loading spinners | ⬜ Pass ⬜ Fail | ⬜ Pass ⬜ Fail | ⬜ Yes ⬜ No | |
| Progress indicators | ⬜ Pass ⬜ Fail | ⬜ Pass ⬜ Fail | ⬜ Yes ⬜ No | |

---

## SECTION 10: THEME SWITCHING

### A. Transition Smoothness

⬜ Theme switches without flash  
⬜ Theme switches without layout shift  
⬜ Images remain visible during switch  
⬜ No "blink" or jarring changes  

### B. State Preservation

⬜ Focus state preserved during switch  
⬜ Scroll position maintained  
⬜ Form data retained  
⬜ Modal/dialog state unchanged  

---

## 📊 SCORING

### Calculate Scores:

**Total Checkboxes:** _______  
**Passed (✅):** _______  
**Failed (❌):** _______  
**Pass Rate:** _______% 

**Target:** ≥95% pass rate

---

## 🐛 ISSUES FOUND

### Issue Log

| # | Element/Layer | Issue Description | Severity | Light/Dark | Fix Required |
|---|---------------|-------------------|----------|------------|--------------|
| 1 | | | 🔴 High / 🟡 Med / 🟢 Low | L / D / Both | |
| 2 | | | 🔴 High / 🟡 Med / 🟢 Low | L / D / Both | |
| 3 | | | 🔴 High / 🟡 Med / 🟢 Low | L / D / Both | |
| 4 | | | 🔴 High / 🟡 Med / 🟢 Low | L / D / Both | |
| 5 | | | 🔴 High / 🟡 Med / 🟢 Low | L / D / Both | |

---

## 🔧 COMMON FIXES

### If you find hardcoded colors:

**❌ Wrong:**
```css
background-color: #2C6975;
color: #1F2937;
border-color: #E5E7EB;
```

**✅ Correct:**
```css
className="bg-[#2C6975] dark:bg-[#1f4f5a]"
className="text-gray-900 dark:text-white"
className="border-gray-200 dark:border-slate-700"
```

---

### If contrast fails:

1. Use contrast checker tool
2. Test text/background combination
3. If < 4.5:1, choose darker/lighter shade
4. Retest until passing

---

### If focus ring invisible:

**Add focus ring classes:**
```css
className="focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
```

Or:
```css
className="focus-visible:ring-2 focus-visible:ring-blue-500"
```

---

## ✅ FINAL SIGN-OFF

**Page Status:**

⬜ **PASS** - All checks passed, ready for development  
⬜ **PASS WITH NOTES** - Minor issues, can proceed with tracking  
⬜ **FAIL** - Critical issues, must fix before development  

---

**Tester Signature:** _________________  
**Date:** _________________  
**Next Review Date:** _________________

---

## 📚 Resources

- **TTDS Design System:** `/TTDS_DESIGN_SYSTEM.md`
- **Color Reference:** `/TTDS_COLOR_QUICK_REFERENCE.md`
- **Dark Mode Guide:** `/DARK_MODE_IMPLEMENTATION.md`
- **Contrast Checker:** https://webaim.org/resources/contrastchecker/
- **WCAG Guidelines:** https://www.w3.org/WAI/WCAG21/quickref/

---

**Checklist Version:** 1.0  
**Last Updated:** November 9, 2025
