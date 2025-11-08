# TTDS Color Quick Reference

**Quick lookup for converting hardcoded hex colors to TTDS tokens**

---

## 🎨 Color Replacement Guide

### Brand Colors

| Hex Code | TTDS Token | Tailwind Class | Usage |
|----------|------------|----------------|-------|
| `#2F6B4E` | `--color-evergreen` | `bg-evergreen` | Primary actions, success states |
| `#254C59` | `--color-summit-teal` | `bg-summit-teal` | Secondary accent, depth |
| `#5B89A6` | `--color-sky-blue` | `bg-sky-blue` | Learning content, info |
| `#F2EAD3` | `--color-trail-cream` | `bg-trail-cream` | Background, card surfaces |
| `#F59E33` | `--color-sun-amber` | `bg-sun-amber` | Points, badges, gamification |
| `#ECECEC` | `--color-neutral-gray` | `bg-neutral-gray` | Borders, dividers |

### Penny AI Mode Colors

| Hex Code | TTDS Token | Tailwind Class | Usage |
|----------|------------|----------------|-------|
| `#2C6975` | `--color-penny-guide` | `bg-penny-guide` | Teal mentor mode |
| `#F9A03F` | `--color-penny-assistant` | `bg-penny-assistant` | Amber coordinator mode |
| `#3B6A52` | `--color-penny-career` | `bg-penny-career` | Green career coach |

### Semantic Colors

| Hex Code | TTDS Token | Tailwind Class | Usage |
|----------|------------|----------------|-------|
| `#3B6A52` | `--color-success` | `bg-success` | Success messages, completed |
| `#F59E33` | `--color-warning` | `bg-warning` | Warnings, pending |
| `#D32F2F` | `--color-error` | `bg-error` | Error states, validation |

### Hover States (Darker Variants)

| Base Color | Hover Class | Usage |
|------------|-------------|-------|
| `bg-evergreen` | `hover:bg-evergreen-dark` | Primary button hover |
| `bg-sun-amber` | `hover:bg-sun-amber-dark` | Points button hover |
| `bg-penny-guide` | `hover:bg-penny-guide-dark` | Teal button hover |

---

## 🔄 Common Replacements

### Background Colors

```tsx
// ❌ Before
<div className="bg-[#F5F3E8]">

// ✅ After
<div className="bg-trail-cream">
```

```tsx
// ❌ Before
<div className="bg-[#2C6975]">

// ✅ After
<div className="bg-penny-guide">
```

```tsx
// ❌ Before
<div className="bg-[#F9A03F]">

// ✅ After
<div className="bg-sun-amber">
```

### Text Colors

```tsx
// ❌ Before
<p className="text-[#2C6975]">

// ✅ After
<p className="text-penny-guide">
```

```tsx
// ❌ Before
<span className="text-[#F9A03F]">

// ✅ After
<span className="text-sun-amber">
```

### Border Colors

```tsx
// ❌ Before
<button className="border-[#F9A03F]">

// ✅ After
<button className="border-sun-amber">
```

### Hover States

```tsx
// ❌ Before
<button className="bg-[#F9A03F] hover:bg-[#e89135]">

// ✅ After
<button className="bg-sun-amber hover:bg-sun-amber-dark">
```

```tsx
// ❌ Before
<button className="bg-[#2C6975] hover:bg-[#234d56]">

// ✅ After
<button className="bg-penny-guide hover:bg-penny-guide-dark">
```

### Opacity Modifiers

```tsx
// ❌ Before
<div className="bg-[#F9A03F]/20">

// ✅ After
<div className="bg-sun-amber/20">
```

```tsx
// ❌ Before
<div className="border-[#2C6975]/30">

// ✅ After
<div className="border-penny-guide/30">
```

---

## 📋 Find & Replace Patterns

Use these patterns in VS Code (enable regex):

### Pattern 1: Amber/Orange
```
Find:    bg-\[#F9A03F\]
Replace: bg-sun-amber

Find:    text-\[#F9A03F\]
Replace: text-sun-amber

Find:    border-\[#F9A03F\]
Replace: border-sun-amber

Find:    hover:bg-\[#e[0-9]9135\]
Replace: hover:bg-sun-amber-dark
```

### Pattern 2: Teal
```
Find:    bg-\[#2C6975\]
Replace: bg-penny-guide

Find:    text-\[#2C6975\]
Replace: text-penny-guide

Find:    border-\[#2C6975\]
Replace: border-penny-guide

Find:    hover:bg-\[#234d56\]
Replace: hover:bg-penny-guide-dark
```

### Pattern 3: Cream Background
```
Find:    bg-\[#F5F3E8\]
Replace: bg-trail-cream

Find:    bg-\[#F2EAD3\]
Replace: bg-trail-cream
```

### Pattern 4: Sky Blue
```
Find:    bg-\[#7EB5C1\]
Replace: bg-sky-blue

Find:    bg-\[#5B89A6\]
Replace: bg-sky-blue
```

---

## 🎯 Complete Color Palette Reference

### All Available Tailwind Classes

```tsx
// Primary Brand Colors
bg-evergreen          text-evergreen          border-evergreen
bg-summit-teal        text-summit-teal        border-summit-teal
bg-sky-blue           text-sky-blue           border-sky-blue
bg-trail-cream        text-trail-cream        border-trail-cream
bg-sun-amber          text-sun-amber          border-sun-amber
bg-neutral-gray       text-neutral-gray       border-neutral-gray

// Penny AI Colors
bg-penny-guide        text-penny-guide        border-penny-guide
bg-penny-assistant    text-penny-assistant    border-penny-assistant
bg-penny-career       text-penny-career       border-penny-career

// Semantic Colors
bg-success            text-success            border-success
bg-warning            text-warning            border-warning
bg-error              text-error              border-error
bg-info               text-info               border-info

// Hover Variants (darker)
hover:bg-evergreen-dark
hover:bg-sun-amber-dark
hover:bg-penny-guide-dark
hover:bg-trail-cream-dark

// Alias (same as penny-guide)
bg-trail-teal         text-trail-teal         border-trail-teal
hover:bg-trail-teal-dark
```

---

## 🧪 Testing Checklist

After replacing colors:

- [ ] Test in light mode
- [ ] Test in dark mode
- [ ] Verify hover states work
- [ ] Check opacity modifiers (/20, /50, etc.)
- [ ] Confirm focus rings are visible
- [ ] Validate color contrast (4.5:1 minimum)

---

## 💡 Pro Tips

### Use Semantic Names
```tsx
// ❌ Less clear
<button className="bg-[#2F6B4E]">

// ✅ Better
<button className="bg-evergreen">

// ⭐ Best (semantic)
<button className="bg-primary">
```

### Leverage Opacity
```tsx
// Create subtle backgrounds
<div className="bg-sun-amber/10">  // 10% opacity
<div className="bg-penny-guide/20">  // 20% opacity
```

### Combine with Dark Mode
```tsx
<div className="bg-trail-cream dark:bg-slate-900">
<p className="text-gray-900 dark:text-gray-100">
```

### Use Focus Ring Utilities
```tsx
<button className="bg-evergreen text-white focus-ring">
  Primary Action
</button>

<button className="bg-sun-amber text-white focus-ring-amber">
  Award Points
</button>
```

---

## 📊 Files to Fix (Priority Order)

### ✅ Complete (26 instances)
- [x] App.tsx (7 instances)
- [x] LearnerHome.tsx (19 instances)

### ⏳ In Progress (50+ instances remaining)
1. **CoachDashboard.tsx** - 12 instances
2. **VisitorLanding.tsx** - 9 instances
3. **AdminPanel.tsx** - 8 instances
4. **PortfolioResumeTile.tsx** - 6 instances
5. **Navigation.tsx** - 5 instances
6. **Others** - 10+ instances

---

## 🚫 Common Mistakes to Avoid

### Mistake 1: Using raw CSS variables
```tsx
// ❌ Wrong
<div style={{ backgroundColor: 'var(--color-sun-amber)' }}>

// ✅ Right
<div className="bg-sun-amber">
```

### Mistake 2: Missing dark mode
```tsx
// ❌ Incomplete
<div className="bg-white">

// ✅ Complete
<div className="bg-white dark:bg-slate-800">
```

### Mistake 3: Hardcoded hover colors
```tsx
// ❌ Will break theming
<button className="bg-[#2C6975] hover:bg-[#234d56]">

// ✅ Uses tokens
<button className="bg-penny-guide hover:bg-penny-guide-dark">
```

---

## 📚 Related Documentation

- [TTDS Design System](./TTDS_DESIGN_SYSTEM.md) - Complete design system
- [Component Library](./COMPONENT_LIBRARY.md) - Reusable components
- [Tailwind Config](./tailwind.config.js) - Color token mappings
- [Critical Issues Fixed](./CRITICAL_ISSUES_FIXED.md) - Progress tracking

---

**Last Updated:** November 8, 2025  
**Maintained By:** TTDS Design System Team

