# 🎨 Automated Theme QA Specification (Light & Dark)

## Project: Transition Trails Digital Experience Portal

**Version:** 1.0  
**Last Updated:** November 9, 2025  
**Status:** Specification Ready for Implementation

---

## 📋 Overview

This document defines the automated Theme QA system that runs on every build/change to verify Light and Dark theme consistency across all pages, components, and interactive states in the Transition Trails Digital Experience.

---

## 🎯 Goals

1. **100% Variable Coverage** - No hardcoded colors anywhere
2. **WCAG AA Compliance** - All contrast ratios meet or exceed standards
3. **Component Variant Coverage** - All states theme correctly
4. **Theme Switch Reliability** - Seamless Light ↔ Dark transitions
5. **Developer Handoff** - Clear, actionable issue reports

---

## 0️⃣ Pre-Conditions

### **TTDS Variable Sets Required:**

**Core Tokens:**
- `core/color/primitive/*` - Base color palette
- `core/color/brand/*` - Brand colors (Teal, Orange, Sky Blue, Green, Cream)
- `core/elevation/*` - Shadow tokens
- `core/spacing/*` - Layout spacing
- `core/typography/*` - Text styles

**Semantic Tokens:**
- `semantic/color/text/*` - Text colors (primary, secondary, tertiary, inverse)
- `semantic/color/surface/*` - Surface backgrounds
- `semantic/color/bg/*` - Page backgrounds
- `semantic/color/accent/*` - Accent/highlight colors
- `semantic/color/border/*` - Border/divider colors
- `semantic/color/state/*` - Interactive states (hover, focus, active, disabled)

**Component Tokens:**
- `component/button/*` - Button-specific tokens
- `component/input/*` - Input field tokens
- `component/card/*` - Card component tokens
- `component/navigation/*` - Navigation tokens

### **Token Rules:**

✅ **ALLOWED:**
- Variables from `core/*`, `semantic/*`, `component/*`
- TTDS Typography styles
- Elevation tokens for shadows
- Spacing tokens for layout

❌ **FORBIDDEN:**
- Raw hex colors (#2C6975, #F9A03F, etc.)
- Hardcoded RGB/RGBA values
- Ad-hoc text styles
- Custom shadows not from tokens
- Inline opacity without token

---

## 1️⃣ What to Test (Per Page & Component)

### **A. Variable Binding Check**

**Scan all layers for:**
- ✅ Fills → Must use `semantic/color/*` or `component/*`
- ✅ Strokes → Must use `semantic/color/border/*`
- ✅ Text → Must use TTDS Typography + `semantic/color/text/*`
- ✅ Effects → Must use `core/elevation/*` tokens
- ✅ Opacity → Prefer token-based transparency

**Auto-flag any layer with:**
- ❌ Raw hex values (#2C6975)
- ❌ Hardcoded RGB (rgb(44, 105, 117))
- ❌ Custom shadows
- ❌ Non-TTDS text styles

---

### **B. Variant Coverage Check**

**For each interactive component, verify all states exist and theme correctly:**

**Buttons:**
- [ ] Default (Light + Dark)
- [ ] Hover (Light + Dark)
- [ ] Focus (Light + Dark with visible ring)
- [ ] Active/Pressed (Light + Dark)
- [ ] Disabled (Light + Dark)
- [ ] Loading (if applicable)

**Input Fields:**
- [ ] Default/Empty (Light + Dark)
- [ ] Focused (Light + Dark with ring)
- [ ] Filled (Light + Dark)
- [ ] Error (Light + Dark)
- [ ] Disabled (Light + Dark)
- [ ] Read-only (if applicable)

**Cards:**
- [ ] Default (Light + Dark)
- [ ] Hover (Light + Dark)
- [ ] Selected/Active (Light + Dark)
- [ ] Disabled (Light + Dark)

**Navigation Elements:**
- [ ] Default (Light + Dark)
- [ ] Hover (Light + Dark)
- [ ] Active/Current page (Light + Dark)
- [ ] Disabled (Light + Dark)

**Modals/Dialogs:**
- [ ] Backdrop/Scrim (Light + Dark)
- [ ] Content area (Light + Dark)
- [ ] Close buttons (all states)

---

### **C. Elevation & Borders**

**Shadows (Elevation):**
- Card shadows → `core/elevation/card`
- Modal shadows → `core/elevation/modal`
- Dropdown shadows → `core/elevation/dropdown`
- No custom drop-shadows

**Borders:**
- All borders → `semantic/color/border/default` or `/subtle` or `/strong`
- Dividers → `semantic/color/border/subtle`
- Focus rings → `semantic/color/border/focus`

---

### **D. Imagery & Overlays**

**Images:**
- Light mode: Images at 100% opacity
- Dark mode: Consider dark scrim (black overlay at 20-40% opacity) for readability

**Background Images:**
- Must have sufficient contrast with overlaid text
- Apply `semantic/color/surface/scrim-dark` or `/scrim-light` when needed

**Icons:**
- Vector icons → Inherit `currentColor` or use `semantic/color/text/*`
- No embedded fill colors
- Scale appropriately for both themes

---

### **E. State Layers**

**Focus Rings:**
- Visible in both Light and Dark modes
- Use `semantic/color/border/focus` (typically 2-3px)
- Minimum 3:1 contrast against adjacent colors
- Apply to all interactive elements (buttons, inputs, links, cards)

**Disabled States:**
- Reduced opacity: 40-50%
- Use `semantic/color/text/disabled` and `semantic/color/surface/disabled`
- Cursor: `not-allowed`
- No hover effects

**Loading States:**
- Spinner/skeleton → `semantic/color/surface/skeleton`
- Animation maintains theme colors

---

### **F. Contrast Requirements (WCAG 2.1 AA)**

**Text Contrast:**
- Normal text (< 18px): **4.5:1 minimum**
- Large text (≥ 18px or 14px bold): **3:0:1 minimum**
- Target: **7:1 for AAA** where possible

**UI Component Contrast:**
- Icons: **3:1 minimum**
- Focus indicators: **3:1 minimum**
- Graphical objects: **3:1 minimum**

**Check These Combinations:**
- Text on page background
- Text on card surfaces
- Text on colored buttons
- Icons on backgrounds
- Border against background
- Focus ring against button

---

### **G. Backgrounds**

**Page Backgrounds:**
- Light mode: `semantic/color/bg/primary` (Cream #F5F3E8)
- Dark mode: `semantic/color/bg/primary` (Dark slate-900)

**Section Backgrounds:**
- Alternating sections: `semantic/color/surface/base` and `/secondary`
- Hero sections: `semantic/color/surface/accent`

**Card Backgrounds:**
- Light mode: `semantic/color/surface/base` (White)
- Dark mode: `semantic/color/surface/base` (slate-800)

---

### **H. Penny Widget**

**Floating Button:**
- Ring color: `semantic/color/accent/primary` (Orange #F9A03F)
- Icon: Inherits theme text color
- Shadow: `core/elevation/modal`

**Speech Bubble:**
- Background: `semantic/color/surface/base`
- Text: `semantic/color/text/primary`
- Border: `semantic/color/border/default`
- Readable in both themes

**Chat Interface:**
- Messages: Alternate surface colors
- Input: Standard form field theming
- All interactive elements have focus states

---

### **I. Errors/Warnings/Success States**

**Validation States:**
- Error: `semantic/color/state/error` (Red)
- Warning: `semantic/color/state/warning` (Amber)
- Success: `semantic/color/state/success` (Green)
- Info: `semantic/color/state/info` (Blue)

**Text Contrast:**
- Error text on light bg: 4.5:1 minimum
- Success text on dark bg: 4.5:1 minimum

**Icons:**
- Use semantic state colors
- Maintain 3:1 contrast

---

## 2️⃣ Automated Actions (Figma Plugin/Script Should Perform)

### **Action 1: Toggle Theme Variables**

```
For each frame in file:
  1. Capture screenshot in Light mode
  2. Switch to Dark mode variables
  3. Capture screenshot in Dark mode
  4. Store both for comparison
```

### **Action 2: Scan for Raw Values**

```
For each layer in frame:
  Check fills:
    If raw hex → FLAG with severity HIGH
    If raw RGB → FLAG with severity HIGH
    
  Check strokes:
    If raw color → FLAG with severity HIGH
    
  Check text:
    If not TTDS Typography → FLAG with severity MEDIUM
    If raw color → FLAG with severity HIGH
    
  Check effects:
    If custom shadow → FLAG with severity MEDIUM
    If not using elevation token → FLAG with severity MEDIUM
```

### **Action 3: Contrast Audit**

```
For each text layer:
  Get text color
  Get background color (including parent fills)
  Calculate contrast ratio
  
  If ratio < 4.5:1 (for normal text):
    FLAG with severity CRITICAL
    Suggest alternative token
    
  If ratio < 3:1 (for large text):
    FLAG with severity CRITICAL
```

### **Action 4: Variant Sweep**

```
For each component instance:
  Get component master
  Get all variants
  
  For each variant:
    Switch to Light mode
    Check token bindings
    Switch to Dark mode
    Check token bindings
    
  If any variant missing:
    FLAG with severity HIGH
    
  If tokens inconsistent:
    FLAG with severity HIGH
```

### **Action 5: Generate Diffs**

```
Compare Light vs Dark screenshots:
  Highlight regions with:
    - Color changes (expected)
    - Missing elements (unexpected)
    - Layout shifts (unexpected)
    - Illegible text (critical)
    
  Overlay diff on report frame
```

### **Action 6: Create Fix Pins**

```
For each flagged issue:
  Create sticky note at layer location
  Pin content:
    - Issue description
    - Current value (if hardcoded)
    - Suggested token
    - Severity level
    - Link to documentation
```

---

## 3️⃣ Output: Theme QA Report

### **Report Frame Structure**

**Frame Name:** `Theme_QA_Report_[YYYY-MM-DD]`

**Header Section:**
```
╔══════════════════════════════════════════════════════════════╗
║          THEME QA REPORT - [Date]                           ║
║          Transition Trails Digital Experience                ║
╚══════════════════════════════════════════════════════════════╝
```

**Score Cards (0-100 per category):**

1. **Variable Coverage Score**
   - Formula: (Layers with tokens / Total layers) × 100
   - Target: 100%

2. **Contrast Score**
   - Formula: (Passing contrast checks / Total checks) × 100
   - Target: 100%

3. **Component Variant Coverage**
   - Formula: (Complete variants / Required variants) × 100
   - Target: 100%

4. **Token Hygiene Score**
   - Formula: (Correct token usage / Total token usage) × 100
   - Target: 100%

**Overall Score:**
```
Average of all 4 scores
Pass threshold: 95%
```

**Summary Chips:**
```
✅ Pages Passed: [#]
⚠️  Pages With Issues: [#]
❌ Critical Failures: [#]
```

---

### **Per-Page Audit Frames**

**Frame Name:** `[Page Name]_Theme_Audit`

**Layout:**
```
┌────────────────────────────────────────────────────────┐
│  [Page Name] - Light Mode      │                       │
│  Screenshot here               │   Issue Overlays      │
│                                │   - Red pins          │
└────────────────────────────────┴───────────────────────┘

┌────────────────────────────────────────────────────────┐
│  [Page Name] - Dark Mode       │                       │
│  Screenshot here               │   Issue Overlays      │
│                                │   - Red pins          │
└────────────────────────────────┴───────────────────────┘
```

---

### **Issue Table Component**

**Auto-generated table with columns:**

| Page | Layer | Problem | Suggested Fix | Severity | Status |
|------|-------|---------|---------------|----------|--------|
| LearningCenter | HeroSection/Background | Raw hex #2C6975 | Use semantic/color/surface/accent | 🔴 High | Open |
| TrailCard | CardHover/Border | No Dark mode token | Use semantic/color/border/hover | 🟡 Medium | Open |
| Button/Primary | FocusState | Missing focus ring | Add semantic/color/border/focus | 🔴 Critical | Open |

**Severity Levels:**

🔴 **Critical** = Blocks accessibility or breaks theme switch
- Raw hex on text/background
- Contrast failure (<4.5:1 for text)
- Missing focus state
- Component breaks in Dark mode

🟡 **Moderate** = Visual inconsistency, not blocking
- Icon not theming properly
- Shadow/border token mismatch
- Suboptimal contrast (4.5-7:1)
- Missing hover state

🟢 **Info** = Improvement opportunity
- Naming inconsistency
- Structure optimization
- Documentation needed

---

### **Auto Tags**

**Applied automatically based on issue type:**

- `#hardcoded-color` - Raw hex/RGB detected
- `#contrast-fail` - Below AA threshold
- `#missing-focus` - No focus indicator
- `#token-mismatch` - Wrong token category used
- `#dark-mode-broken` - Element broken in Dark mode
- `#accessibility` - WCAG violation

---

## 4️⃣ Fix Guidance (Auto-Suggestions)

### **Color Fixes**

**Text Colors:**
```
Replace: #1F2937 (black)
With:    semantic/color/text/primary

Replace: #6B7280 (gray)
With:    semantic/color/text/secondary

Replace: #9CA3AF (light gray)
With:    semantic/color/text/tertiary

Replace: #FFFFFF (white text on dark)
With:    semantic/color/text/inverse
```

**Background Colors:**
```
Replace: #FFFFFF (white)
With:    semantic/color/surface/base

Replace: #F5F3E8 (cream)
With:    semantic/color/bg/primary

Replace: #F9FAFB (light gray)
With:    semantic/color/surface/secondary

Replace: #1F2937 (dark)
With:    semantic/color/surface/base (in dark mode)
```

**Accent Colors:**
```
Replace: #F9A03F (orange)
With:    semantic/color/accent/primary

Replace: #2C6975 (teal)
With:    semantic/color/accent/secondary

Replace: #3B6A52 (green)
With:    semantic/color/accent/success

Replace: #7EB5C1 (sky blue)
With:    semantic/color/accent/info
```

**Border Colors:**
```
Replace: #E5E7EB (light border)
With:    semantic/color/border/default

Replace: #D1D5DB (medium border)
With:    semantic/color/border/subtle

Replace: #9CA3AF (strong border)
With:    semantic/color/border/strong

Replace: #2563EB (focus ring)
With:    semantic/color/border/focus
```

---

### **Shadow Fixes**

```
Replace: drop-shadow(0 1px 2px rgba(0,0,0,0.05))
With:    core/elevation/card/level-1

Replace: drop-shadow(0 10px 15px rgba(0,0,0,0.1))
With:    core/elevation/card/level-2

Replace: drop-shadow(0 20px 25px rgba(0,0,0,0.15))
With:    core/elevation/modal
```

---

### **Typography Fixes**

```
Replace: Custom text style
With:    TTDS/Typography/Heading-1 (48px, Semibold)
         TTDS/Typography/Heading-2 (36px, Semibold)
         TTDS/Typography/Body (16px, Regular)
         TTDS/Typography/Label (14px, Medium)
```

---

### **Focus State Fixes**

```
Add focus ring:
  Outline: 2-3px solid
  Color: semantic/color/border/focus
  Offset: 2px
  
  Ensure 3:1 contrast with adjacent color
  
  Apply to:
    - All buttons
    - All inputs
    - All links
    - All interactive cards
```

---

## 5️⃣ Pass/Fail Rules

### **Page PASSES if:**

✅ **100% Token Coverage**
- Zero raw hex/RGB colors
- All fills use semantic tokens
- All text uses TTDS Typography

✅ **100% Contrast Compliance**
- All text meets 4.5:1 (AA)
- All large text meets 3:1 (AA)
- Focus indicators meet 3:1

✅ **Complete Variant Coverage**
- All interactive components have all required states
- All states theme correctly in Light + Dark

✅ **Accessibility Complete**
- Focus indicators visible
- Disabled states clear
- Loading states accessible
- Keyboard navigation works

---

### **Page FAILS if ANY Critical issue:**

❌ **Raw colors detected** on text or backgrounds
❌ **Contrast failure** (<4.5:1 for text, <3:1 for UI)
❌ **Missing focus state** on interactive elements
❌ **Dark mode broken** - elements invisible/illegible
❌ **Component missing variants** - incomplete state coverage

---

### **Build Gate**

**If page fails:**
1. Add ⚠️ pin to page frame title: `⚠️ THEME QA FAIL`
2. Block production deployment
3. Assign to designer for fixes
4. Re-run QA after fixes

**If page passes:**
1. Add ✅ badge to frame title: `✅ THEME QA PASS`
2. Clear for development handoff

---

## 6️⃣ Re-run Conditions

**Automatically trigger Theme QA when:**

1. **Component Library Changes**
   - Any component in `TTDS/Components/` modified
   - New component added
   - Variant added/removed

2. **Page Frame Changes**
   - Layer count changes
   - Variable set changes
   - New page added
   - Existing page modified

3. **Token Changes**
   - Core tokens updated
   - Semantic tokens updated
   - New tokens added

4. **Scheduled**
   - Daily scan at 2:00 AM UTC
   - Before each release candidate build

---

**Result Handling:**

- Append to latest `Theme_QA_Report_[date]`
- Increment version note: `v1.1`, `v1.2`, etc.
- Send Slack notification to #design-system channel if failures detected
- Auto-create GitHub issue for Critical failures

---

## 7️⃣ Accessibility Requirements

### **Text Sizes (Minimum)**

- Body text: **≥ 16px**
- Labels: **≥ 14px**
- Captions: **≥ 12px** (use sparingly)
- Headings: **≥ 18px**

### **Touch Targets (Minimum)**

- Buttons: **≥ 44×44px**
- Inputs: **≥ 44px height**
- Links: **≥ 44×44px** (with padding)
- Icon buttons: **≥ 44×44px**

### **Keyboard Focus**

- Visible on ALL interactive elements
- 3:1 contrast minimum
- 2-3px outline width
- 2px offset from element

### **Image Text Contrast**

- Text on images: **Requires scrim**
- Scrim opacity: 40-60% for readability
- Alternative: Solid background shape behind text
- Test both Light and Dark modes

### **Color Independence**

- Don't rely on color alone to convey information
- Add icons or text labels
- Example: Error states use red + error icon + "Error" text

---

## 8️⃣ Developer Handoff Deliverables

### **1. Issue Table Export**

**File:** `theme-qa-findings.csv`

**Format:**
```csv
Page,Layer,Problem,Suggested Fix,Severity,Status,Screenshot
LearningCenter,Hero Background,Raw hex #2C6975,semantic/color/surface/accent,Critical,Open,link-to-screenshot
TrailCard,Hover Border,No dark token,semantic/color/border/hover,Moderate,Open,link-to-screenshot
```

---

### **2. What Changed Summary**

**File:** `theme-qa-summary.md`

**Contents:**
```markdown
# Theme QA Summary - [Date]

## Overview
- Total pages scanned: [#]
- Pages passed: [#]
- Pages with issues: [#]
- Critical issues: [#]

## New Issues Since Last Scan
1. LearningCenter - Missing dark mode tokens (Critical)
2. TrailCard - Focus state invisible (Critical)
3. Button/Secondary - Contrast failure (Moderate)

## Fixed Issues
1. Navigation - Focus rings added ✅
2. PennyWidget - Dark mode readable ✅

## Action Required
- [ ] Fix LearningCenter dark mode
- [ ] Add focus states to TrailCard
- [ ] Improve Button/Secondary contrast
```

---

### **3. Screenshots Package**

**Folder:** `theme-qa-screenshots/[date]/`

**Structure:**
```
/light-mode/
  ├── learning-center.png
  ├── trail-mastery.png
  └── ...

/dark-mode/
  ├── learning-center.png
  ├── trail-mastery.png
  └── ...

/issues/
  ├── learning-center-contrast-fail.png
  ├── trail-card-missing-focus.png
  └── ...
```

---

### **4. Token Usage Report**

**File:** `token-usage-report.json`

**Format:**
```json
{
  "scanDate": "2025-11-09",
  "totalLayers": 1247,
  "layersWithTokens": 1198,
  "layersWithRawValues": 49,
  "tokenCoverage": "96.1%",
  "mostUsedTokens": [
    "semantic/color/text/primary (342 uses)",
    "semantic/color/surface/base (287 uses)",
    "semantic/color/border/default (156 uses)"
  ],
  "issues": [...]
}
```

---

## 9️⃣ Implementation Phases

### **Phase 1: Manual Audits (Current)**
- Use checklist (see THEME_QA_CHECKLIST.md)
- Manual Light/Dark switching
- Spreadsheet tracking
- **Timeline:** Ongoing

### **Phase 2: Semi-Automated (Q1 2026)**
- Figma plugin for token scanning
- Contrast checking tool
- Screenshot generator
- **Timeline:** January 2026

### **Phase 3: Fully Automated (Q2 2026)**
- Complete automation
- CI/CD integration
- Auto-reporting
- **Timeline:** April 2026

---

## 🔟 TTDS Token Reference

### **Quick Token Map**

| Use Case | Light Mode Token | Dark Mode Token |
|----------|------------------|-----------------|
| Page background | semantic/color/bg/primary (Cream) | semantic/color/bg/primary (slate-900) |
| Card background | semantic/color/surface/base (White) | semantic/color/surface/base (slate-800) |
| Primary text | semantic/color/text/primary (gray-900) | semantic/color/text/primary (white) |
| Secondary text | semantic/color/text/secondary (gray-600) | semantic/color/text/secondary (slate-400) |
| Button primary bg | semantic/color/accent/primary (Orange) | semantic/color/accent/primary (Orange) |
| Border default | semantic/color/border/default (gray-200) | semantic/color/border/default (slate-700) |
| Focus ring | semantic/color/border/focus (blue-500) | semantic/color/border/focus (sky-400) |

---

## 📚 Related Documentation

- `/TTDS_DESIGN_SYSTEM.md` - Complete design system
- `/TTDS_COLOR_QUICK_REFERENCE.md` - Color token guide
- `/THEME_QA_CHECKLIST.md` - Manual QA checklist
- `/DARK_MODE_IMPLEMENTATION.md` - Dark mode guide
- `/styles/globals.css` - CSS implementation

---

## ✅ Success Criteria

**System is successful when:**

- [ ] 100% of pages pass Theme QA
- [ ] Zero raw colors in production
- [ ] All WCAG AA requirements met
- [ ] Theme switching is seamless
- [ ] Zero Dark mode bugs reported
- [ ] Developer handoff requires no design clarification
- [ ] QA runs automatically on every commit

---

**Specification Status:** ✅ **COMPLETE**  
**Implementation Status:** 📋 **Phase 1 (Manual) - Active**  
**Next Steps:** Build Figma plugin for automation (Phase 2)

---

**Last Updated:** November 9, 2025  
**Version:** 1.0  
**Owner:** Design System Team
