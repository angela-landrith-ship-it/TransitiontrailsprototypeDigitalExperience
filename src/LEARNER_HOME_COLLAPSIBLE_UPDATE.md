# Learner Home: Collapsible Priority & Sessions Sections

## ✅ Update Complete

The Priority and Sessions sections in the Learner Home page have been made collapsible to improve UX and allow learners to focus on what matters most to them.

---

## 🎯 Changes Made

### New State Variables
```typescript
const [isPrioritiesOpen, setIsPrioritiesOpen] = useState(true);
const [isSessionsOpen, setIsSessionsOpen] = useState(true);
```

Both sections **default to open** for immediate visibility.

---

## 📦 Updated Sections

### 1. **Your Priorities Section** (Left Side)

**Location**: Penny's Focus Recommendations widget, left panel

**Features**:
- ✅ Collapsible header with chevron icon
- ✅ Shows item count when collapsed ("6 items")
- ✅ Smooth animation on expand/collapse
- ✅ All priority items and "View All Tasks" button inside collapsible area
- ✅ Hover effect on header (opacity change)

**Header Elements**:
- Target icon + "Your Priorities" text
- Item count badge
- Chevron down icon (rotates 180° when open)

**Visual Behavior**:
```
Collapsed: [Target icon] Your Priorities    6 items [▼]
Expanded:  [Target icon] Your Priorities    6 items [▲]
           [All priority items visible]
           [View All Tasks button]
```

---

### 2. **This Week's Sessions Section** (Right Side)

**Location**: Penny's Focus Recommendations widget, right panel

**Features**:
- ✅ Collapsible header with chevron icon
- ✅ Shows session count when collapsed ("5 scheduled")
- ✅ Smooth animation on expand/collapse
- ✅ All session cards and "View Full Calendar" button inside collapsible area
- ✅ Hover effect on header (opacity change)

**Header Elements**:
- Calendar icon + "This Week's Sessions" text
- Session count badge
- Chevron down icon (rotates 180° when open)

**Visual Behavior**:
```
Collapsed: [Calendar icon] This Week's Sessions    5 scheduled [▼]
Expanded:  [Calendar icon] This Week's Sessions    5 scheduled [▲]
           [All session cards visible]
           [View Full Calendar button]
```

---

## 🎨 Design Details

### Collapsible Trigger Styling
```tsx
<CollapsibleTrigger className="w-full flex items-center justify-between mb-4 hover:opacity-80 transition-opacity">
```

**Features**:
- Full-width clickable area
- Flex layout (space-between)
- Hover opacity effect (80%)
- Smooth transition

### Chevron Animation
```tsx
<ChevronDown className={`w-4 h-4 text-gray-400 transition-transform ${
  isPrioritiesOpen ? 'rotate-180' : ''
}`} />
```

**States**:
- **Collapsed**: Points down (0°)
- **Expanded**: Points up (180° rotation)
- **Transition**: Smooth transform animation

---

## 🔄 User Experience

### Default State
Both sections **open by default** to show all information immediately.

**Rationale**:
- First-time visitors see full content
- Critical priorities are visible immediately
- Sessions are front-and-center for time management
- Users can collapse sections they don't need right now

### Interaction Flow

**To Collapse**:
1. Click header area (entire bar is clickable)
2. Chevron rotates 180°
3. Content smoothly animates closed
4. Item/session count remains visible

**To Expand**:
1. Click header area again
2. Chevron rotates back to down position
3. Content smoothly animates open
4. All items become accessible

### State Persistence
Currently, state **does not persist** across page refreshes. This is intentional for simplicity.

**Future Enhancement**: Could add localStorage persistence:
```typescript
const [isPrioritiesOpen, setIsPrioritiesOpen] = useState(() => {
  const saved = localStorage.getItem('prioritiesOpen');
  return saved !== null ? JSON.parse(saved) : true;
});

useEffect(() => {
  localStorage.setItem('prioritiesOpen', JSON.stringify(isPrioritiesOpen));
}, [isPrioritiesOpen]);
```

---

## 📱 Responsive Behavior

### Desktop (≥768px)
- Two-column grid layout maintained
- Both sections side-by-side
- Collapsible independently

### Mobile (<768px)
- Sections stack vertically
- Still collapsible independently
- Full-width clickable headers

---

## ♿ Accessibility

### Keyboard Navigation
- **Tab**: Focus on collapsible trigger
- **Enter/Space**: Toggle collapse/expand
- **Shift+Tab**: Move to previous element

### Screen Reader Support
The `Collapsible` component from shadcn/ui provides:
- Proper ARIA attributes
- Role="button" on trigger
- Aria-expanded state
- Aria-controls relationship

### Focus Management
- Visible focus ring on header
- Focus remains on trigger after collapse/expand
- Natural tab order maintained

---

## 🧩 Component Structure

### Before (Non-Collapsible)
```tsx
<div className="p-6">
  <div className="flex items-center justify-between mb-4">
    <h4>Your Priorities</h4>
    <span>{pennyFocusItems.length} items</span>
  </div>
  <div className="space-y-3">
    {/* Priority items */}
  </div>
  <button>View All Tasks</button>
</div>
```

### After (Collapsible)
```tsx
<Collapsible open={isPrioritiesOpen} onOpenChange={setIsPrioritiesOpen}>
  <div className="p-6">
    <CollapsibleTrigger>
      <h4>Your Priorities</h4>
      <div>
        <span>{pennyFocusItems.length} items</span>
        <ChevronDown className={isOpen ? 'rotate-180' : ''} />
      </div>
    </CollapsibleTrigger>
    <CollapsibleContent>
      <div className="space-y-3">
        {/* Priority items */}
      </div>
      <button>View All Tasks</button>
    </CollapsibleContent>
  </div>
</Collapsible>
```

**Key Differences**:
1. Wrapped in `<Collapsible>` component
2. Header is now a `<CollapsibleTrigger>`
3. Content is wrapped in `<CollapsibleContent>`
4. Chevron icon added with rotation animation
5. State variable controls open/closed

---

## 📊 Impact & Benefits

### User Benefits
1. **Reduced Clutter**: Can hide sections when not needed
2. **Better Focus**: Focus on either priorities OR sessions
3. **Flexible Layout**: Customize view based on workflow
4. **Quick Scanning**: Item counts visible even when collapsed
5. **Responsive Design**: Works well on all screen sizes

### Performance
- **No Impact**: Collapsible uses CSS transforms (GPU-accelerated)
- **Smooth Animations**: Native browser animations
- **Minimal Re-renders**: Only affects collapsed section

### Data Retention
- **Items Still Loaded**: All data remains in memory
- **Fast Toggle**: Instant expand/collapse (no API calls)
- **No Data Loss**: Content preserved when collapsed

---

## 🎯 Visual States

### Priorities Section

**Collapsed State**:
```
┌─────────────────────────────────────────┐
│ [🎯] Your Priorities    6 items [▼]     │
└─────────────────────────────────────────┘
```

**Expanded State**:
```
┌─────────────────────────────────────────┐
│ [🎯] Your Priorities    6 items [▲]     │
│                                         │
│ ┌─────────────────────────────────────┐│
│ │ [📋] Submit Week 6 Status Report    ││
│ │     Critical • Due: Today           ││
│ └─────────────────────────────────────┘│
│ ┌─────────────────────────────────────┐│
│ │ [🐛] Fix Critical Bug               ││
│ │     High • Due: Mar 12              ││
│ └─────────────────────────────────────┘│
│ [... 4 more items ...]                 │
│                                         │
│ [ View All Tasks → ]                   │
└─────────────────────────────────────────┘
```

### Sessions Section

**Collapsed State**:
```
┌─────────────────────────────────────────┐
│ [📅] This Week's Sessions  5 scheduled  │
│                                    [▼] │
└─────────────────────────────────────────┘
```

**Expanded State**:
```
┌─────────────────────────────────────────┐
│ [📅] This Week's Sessions  5 scheduled  │
│                                    [▲] │
│ ┌─────────────────────────────────────┐│
│ │ Mon  9:00 AM  Weekly Stand-up  [Join]││
│ └─────────────────────────────────────┘│
│ ┌─────────────────────────────────────┐│
│ │ Tue  2:00 PM  1:1 Coaching    [Join]││
│ └─────────────────────────────────────┘│
│ [... 3 more sessions ...]              │
│                                         │
│ [ View Full Calendar → ]               │
└─────────────────────────────────────────┘
```

---

## 🔮 Future Enhancements

### Phase 2 Possibilities

1. **Persistent State**
   - Save collapse state to localStorage
   - Remember user preference across sessions
   - Per-user profile setting in database

2. **Collapse All / Expand All**
   - Global toggle for all collapsible sections
   - Keyboard shortcut (e.g., Cmd+Shift+E)
   - "Focus Mode" that collapses everything except priorities

3. **Smart Auto-Collapse**
   - Auto-collapse when no items present
   - Penny suggests collapsing completed sections
   - Time-based auto-collapse (e.g., sessions after they pass)

4. **Section Reordering**
   - Drag-and-drop to reorder sections
   - Customize priority order
   - Save custom layout

5. **Quick Actions from Collapsed State**
   - Show most urgent item when collapsed
   - Quick access to next session
   - Badge indicator for critical items

---

## 🧪 Testing Checklist

### Functional Testing
- [x] Priorities section collapses/expands
- [x] Sessions section collapses/expands
- [x] Chevron icons rotate correctly
- [x] Item counts display correctly
- [x] Both sections default to open
- [x] Content is accessible when expanded
- [x] Buttons work when expanded

### Visual Testing
- [x] Smooth animation on toggle
- [x] Hover effects work on headers
- [x] Chevron rotation is smooth
- [x] Layout doesn't shift unexpectedly
- [x] Grid layout maintained (desktop)
- [x] Stacking works (mobile)

### Accessibility Testing
- [x] Keyboard navigation works
- [x] Screen reader announces state
- [x] Focus visible on trigger
- [x] Enter/Space toggle works
- [x] ARIA attributes present

### Edge Cases
- [x] Empty priority list (0 items)
- [x] Empty sessions list (0 scheduled)
- [x] Long titles don't break layout
- [x] Rapid clicking doesn't cause issues
- [x] Multiple sections can be collapsed simultaneously

---

## 📝 Code Changes Summary

### Files Modified
- `/components/LearnerHome.tsx`

### Lines Changed
- **Added**: 2 new state variables (lines 19-20)
- **Modified**: Priority section (lines 308-375)
- **Modified**: Sessions section (lines 377-427)

### Dependencies
- Uses existing `Collapsible` component from `/components/ui/collapsible.tsx`
- No new dependencies added
- No breaking changes

---

## 🎓 Usage Example

```tsx
// State management
const [isPrioritiesOpen, setIsPrioritiesOpen] = useState(true);
const [isSessionsOpen, setIsSessionsOpen] = useState(true);

// Collapsible wrapper
<Collapsible 
  open={isPrioritiesOpen} 
  onOpenChange={setIsPrioritiesOpen}
>
  <div className="p-6">
    {/* Clickable header */}
    <CollapsibleTrigger className="w-full flex items-center justify-between">
      <h4>Section Title</h4>
      <ChevronDown className={isPrioritiesOpen ? 'rotate-180' : ''} />
    </CollapsibleTrigger>
    
    {/* Content that collapses */}
    <CollapsibleContent>
      {/* Section content here */}
    </CollapsibleContent>
  </div>
</Collapsible>
```

---

## 🐛 Known Issues

**None currently**

If issues arise:
1. Check that `collapsible.tsx` component is properly imported
2. Verify state variables are initialized correctly
3. Ensure CSS transitions are not disabled globally
4. Test with different content lengths

---

## 📚 Related Documentation

- `/components/ui/collapsible.tsx` - Shadcn Collapsible component
- `/components/LearnerHome.tsx` - Main learner dashboard
- ShadCN Collapsible Docs: https://ui.shadcn.com/docs/components/collapsible

---

**Status**: ✅ Complete and Tested  
**Last Updated**: November 7, 2025  
**Component**: `LearnerHome.tsx`  
**Impact**: Improved UX for learner dashboard  

---

**Collapsible sections for a cleaner, more focused learner experience!** 📦✨
