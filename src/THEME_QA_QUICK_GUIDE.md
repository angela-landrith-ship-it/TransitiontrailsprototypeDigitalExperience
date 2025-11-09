# ⚡ Theme QA Quick Guide for Developers

## 5-Minute Theme Check Before Committing

---

## 🎯 Quick Pre-Commit Checklist

Before pushing code, verify these 5 critical items:

### ✅ 1. No Hardcoded Colors
```bash
# Search your component for raw hex colors
grep -r "#[0-9A-Fa-f]\{6\}" YourComponent.tsx
```

**If found:** Replace with Tailwind classes that have dark mode variants

---

### ✅ 2. All Backgrounds Have Dark Mode
```tsx
// ❌ WRONG - Only light mode
<div className="bg-white">

// ✅ CORRECT - Both modes
<div className="bg-white dark:bg-slate-800">
```

---

### ✅ 3. All Text Has Dark Mode
```tsx
// ❌ WRONG - Only light mode  
<p className="text-gray-900">

// ✅ CORRECT - Both modes
<p className="text-gray-900 dark:text-white">
```

---

### ✅ 4. All Borders Have Dark Mode
```tsx
// ❌ WRONG - Only light mode
<div className="border border-gray-200">

// ✅ CORRECT - Both modes
<div className="border border-gray-200 dark:border-slate-700">
```

---

### ✅ 5. Interactive Elements Have Focus States
```tsx
// ❌ WRONG - No focus indicator
<button className="bg-blue-500 text-white">

// ✅ CORRECT - Focus ring
<button className="bg-blue-500 text-white focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
```

---

## 🎨 TTDS Color Token Cheat Sheet

### Backgrounds

| Use Case | Light Mode | Dark Mode |
|----------|------------|-----------|
| Page | `bg-[#F5F3E8]` | `dark:bg-slate-900` |
| Card | `bg-white` | `dark:bg-slate-800` |
| Section | `bg-gray-50` | `dark:bg-slate-700` |
| Input | `bg-white` | `dark:bg-slate-700` |

### Text

| Use Case | Light Mode | Dark Mode |
|----------|------------|-----------|
| Headings | `text-gray-900` | `dark:text-white` |
| Body | `text-gray-600` | `dark:text-slate-400` |
| Secondary | `text-gray-500` | `dark:text-slate-500` |
| Disabled | `text-gray-400` | `dark:text-slate-600` |

### Borders

| Use Case | Light Mode | Dark Mode |
|----------|------------|-----------|
| Default | `border-gray-200` | `dark:border-slate-700` |
| Input | `border-gray-300` | `dark:border-slate-600` |
| Strong | `border-gray-400` | `dark:border-slate-500` |
| Focus | `ring-blue-500` | `dark:ring-sky-400` |

### Brand Colors (Same in Both Modes)

| Color | Class | Hex |
|-------|-------|-----|
| Teal | `bg-[#2C6975]` | #2C6975 |
| Orange | `bg-[#F9A03F]` | #F9A03F |
| Sky Blue | `bg-[#7EB5C1]` | #7EB5C1 |
| Green | `bg-[#3B6A52]` | #3B6A52 |
| Cream | `bg-[#F5F3E8]` | #F5F3E8 |

---

## 🚦 Component State Requirements

### Every Interactive Component Needs:

**1. Default State**
```tsx
className="bg-blue-500 text-white"
```

**2. Hover State**
```tsx
className="bg-blue-500 hover:bg-blue-600 text-white"
```

**3. Focus State**
```tsx
className="bg-blue-500 text-white focus:ring-2 focus:ring-blue-500"
```

**4. Active State**
```tsx
className="bg-blue-500 active:bg-blue-700 text-white"
```

**5. Disabled State**
```tsx
className="bg-blue-500 text-white disabled:opacity-50 disabled:cursor-not-allowed"
```

---

## 🔍 Visual Testing in Browser

### Test Both Modes:

**1. Open your component in browser**

**2. Toggle theme** (click moon/sun icon in nav)

**3. Check these:**
- [ ] All backgrounds visible
- [ ] All text readable
- [ ] Borders visible
- [ ] No "invisible" elements
- [ ] Images still visible
- [ ] Icons theme properly
- [ ] Shadows appropriate for theme

**4. Tab through interactive elements:**
- [ ] Focus ring visible in BOTH modes
- [ ] Focus ring has good contrast

**5. Try all button states:**
- [ ] Hover changes color
- [ ] Active/pressed works
- [ ] Disabled looks disabled

---

## 🎯 Common Mistakes & Fixes

### Mistake 1: Missing Dark Mode on Backgrounds

**❌ Wrong:**
```tsx
<div className="bg-white border border-gray-200 p-6">
  <h2 className="text-gray-900">Title</h2>
  <p className="text-gray-600">Description</p>
</div>
```

**✅ Fixed:**
```tsx
<div className="bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 p-6">
  <h2 className="text-gray-900 dark:text-white">Title</h2>
  <p className="text-gray-600 dark:text-slate-400">Description</p>
</div>
```

---

### Mistake 2: No Focus State

**❌ Wrong:**
```tsx
<button className="px-4 py-2 bg-blue-500 text-white rounded-lg">
  Click Me
</button>
```

**✅ Fixed:**
```tsx
<button className="px-4 py-2 bg-blue-500 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-slate-900">
  Click Me
</button>
```

---

### Mistake 3: Hardcoded Brand Colors Without Dark Variant

**❌ Wrong:**
```tsx
<div className="bg-[#2C6975] text-white">
```

**✅ Fixed:**
```tsx
<div className="bg-[#2C6975] dark:bg-[#1f4f5a] text-white">
```

---

### Mistake 4: Images with No Dark Mode Consideration

**❌ Wrong:**
```tsx
<div className="relative">
  <img src="hero.jpg" alt="Hero" />
  <h1 className="absolute top-1/2 left-1/2">Title</h1>
</div>
```

**✅ Fixed:**
```tsx
<div className="relative">
  <img src="hero.jpg" alt="Hero" className="dark:opacity-80" />
  <div className="absolute inset-0 bg-black/20 dark:bg-black/40" />
  <h1 className="absolute top-1/2 left-1/2 text-white">Title</h1>
</div>
```

---

### Mistake 5: Shadow Not Adjusting for Dark Mode

**❌ Wrong:**
```tsx
<div className="shadow-sm">
```

**✅ Fixed:**
```tsx
<div className="shadow-sm dark:shadow-md">
```

---

## 🎨 Complete Component Example

### Before (Light Mode Only):

```tsx
export function FeatureCard({ title, description, icon }) {
  return (
    <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
      <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
        {icon}
      </div>
      <h3 className="text-xl text-gray-900 mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
      <button className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg">
        Learn More
      </button>
    </div>
  );
}
```

### After (Full Theme Support):

```tsx
export function FeatureCard({ title, description, icon }) {
  return (
    <div className="bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-xl p-6 shadow-sm dark:shadow-md hover:shadow-md dark:hover:shadow-lg transition-shadow">
      <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center mb-4 text-blue-600 dark:text-blue-400">
        {icon}
      </div>
      <h3 className="text-xl text-gray-900 dark:text-white mb-2">{title}</h3>
      <p className="text-gray-600 dark:text-slate-400">{description}</p>
      <button className="mt-4 px-4 py-2 bg-blue-500 dark:bg-blue-600 hover:bg-blue-600 dark:hover:bg-blue-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-slate-800 transition-colors">
        Learn More
      </button>
    </div>
  );
}
```

**Changes Made:**
1. ✅ Background: `dark:bg-slate-800`
2. ✅ Border: `dark:border-slate-700`
3. ✅ Shadow: `dark:shadow-md`
4. ✅ Icon background: `dark:bg-blue-900/30`
5. ✅ Icon color: `dark:text-blue-400`
6. ✅ Heading: `dark:text-white`
7. ✅ Body text: `dark:text-slate-400`
8. ✅ Button background: `dark:bg-blue-600`
9. ✅ Button hover: `dark:hover:bg-blue-700`
10. ✅ Focus ring offset: `dark:focus:ring-offset-slate-800`

---

## 🧪 Testing Script

Save this as `test-theme.sh`:

```bash
#!/bin/bash

echo "🎨 Theme QA Quick Test"
echo "====================="
echo ""

# Check for hardcoded colors
echo "Checking for hardcoded hex colors..."
HARDCODED=$(grep -r "#[0-9A-Fa-f]\{6\}" components/ --include="*.tsx" | wc -l)
if [ $HARDCODED -gt 0 ]; then
  echo "❌ Found $HARDCODED hardcoded colors"
  echo "Run: grep -r \"#[0-9A-Fa-f]\{6\}\" components/ --include=\"*.tsx\""
else
  echo "✅ No hardcoded colors found"
fi
echo ""

# Check for bg classes without dark variant
echo "Checking backgrounds..."
BG_NO_DARK=$(grep -r "className.*bg-" components/ --include="*.tsx" | grep -v "dark:bg-" | wc -l)
if [ $BG_NO_DARK -gt 5 ]; then
  echo "⚠️  Found $BG_NO_DARK backgrounds without dark mode"
else
  echo "✅ Most backgrounds have dark variants"
fi
echo ""

# Check for text classes without dark variant
echo "Checking text colors..."
TEXT_NO_DARK=$(grep -r "className.*text-" components/ --include="*.tsx" | grep -v "dark:text-" | wc -l)
if [ $TEXT_NO_DARK -gt 5 ]; then
  echo "⚠️  Found $TEXT_NO_DARK text elements without dark mode"
else
  echo "✅ Most text has dark variants"
fi
echo ""

echo "✅ Theme QA Check Complete"
echo ""
echo "Next: Test manually in browser by toggling theme"
```

**Run with:**
```bash
chmod +x test-theme.sh
./test-theme.sh
```

---

## 📱 Browser DevTools Testing

### Chrome/Edge:

1. Open DevTools (F12)
2. Click "Elements" tab
3. Select an element
4. Look at "Styles" panel
5. Check computed colors
6. Use "Accessibility" tab for contrast

### Firefox:

1. Open DevTools (F12)
2. Click "Inspector"
3. Click "Accessibility" panel
4. Use "Check for issues" → Contrast

---

## 🎯 Contrast Quick Check

**Minimum Requirements:**

- **Normal text:** 4.5:1
- **Large text (18px+):** 3:1
- **UI components:** 3:1

**Quick Online Check:**
1. Go to: https://webaim.org/resources/contrastchecker/
2. Enter foreground color (text)
3. Enter background color
4. Check if it passes

---

## ✅ Final Checklist Before Commit

```
[ ] No hardcoded hex colors in className
[ ] All backgrounds have dark: variant
[ ] All text colors have dark: variant
[ ] All borders have dark: variant
[ ] All buttons have focus states
[ ] All inputs have focus states
[ ] Manually tested in browser (Light mode)
[ ] Manually tested in browser (Dark mode)
[ ] Theme toggle works without breaking
[ ] No console errors when switching themes
```

---

## 🚀 Ready to Commit?

**If all checks pass:**
```bash
git add .
git commit -m "feat: add ThemeCompliantComponent with full dark mode support"
git push
```

**If checks fail:**
- Fix issues
- Re-run checks
- Test in browser
- Then commit

---

## 📚 Full Documentation

For complete details, see:
- `/THEME_QA_AUTOMATION_SPEC.md` - Complete automation spec
- `/THEME_QA_CHECKLIST.md` - Full manual checklist
- `/TTDS_DESIGN_SYSTEM.md` - Design system reference
- `/DARK_MODE_IMPLEMENTATION.md` - Dark mode guide

---

## 💡 Pro Tips

1. **Use dark mode while developing** - Switch between modes frequently
2. **Tab through your UI** - Ensure focus states visible
3. **Test on actual dark OS theme** - Some elements behave differently
4. **Use browser high contrast mode** - Reveals missing contrasts
5. **Test with screen reader** - Ensures accessibility

---

**Quick Guide Version:** 1.0  
**Last Updated:** November 9, 2025  
**Estimated Read Time:** 5 minutes
