# 📍 Where to Find: Citizen Developer Platforms

## Quick Access Guide

---

## 🎯 How to See It Right Now

### **Method 1: Via Learning Center (Recommended)**

```
1. Start at LearnerHome page
   ↓
2. Click "Learning Center" in navigation
   ↓
3. Scroll to "Trail of Mastery Programs" section
   ↓
4. Click "View All Trails" or "Explore Trails"
   ↓
5. SEE: 5 trail tiles displayed
   ↓
6. BOTTOM TILE: "✨ Citizen Developer Platforms" (NEW!)
   ↓
7. Click to explore 7 platforms!
```

### **Method 2: Direct Navigation (For Testing)**

Add this temporary button anywhere in your app to test:

```tsx
<button 
  onClick={() => setActivePage('trail-mastery')}
  className="px-4 py-2 bg-evergreen text-white rounded"
>
  Go to Trail of Mastery
</button>
```

Then look for the **5th tile** with the **✨ Sparkles icon**.

---

## 📊 What You'll See

### **Trail of Mastery Page - 5 Tiles:**

```
┌─────────────────────────────────────────────────────┐
│        🏆 Trail of Mastery Programs                 │
└─────────────────────────────────────────────────────┘

Row 1:
┌──────────────────┐  ┌──────────────────┐
│ 💼 Product Owner │  │ 💻 Developer     │
│ Advanced         │  │ Advanced         │
└──────────────────┘  └──────────────────┘

Row 2:
┌──────────────────┐  ┌──────────────────┐
│ 🌐 Solutions...  │  │ 📊 Business...   │
│ Advanced         │  │ Advanced         │
└──────────────────┘  └──────────────────┘

Row 3 (NEW!):
┌───────────────────────────────────────────────────┐
│ ✨ Citizen Developer Platforms        ⭐ NEW!     │
│                                                   │
│ Master HubSpot, Canva, Notion, Airtable & more   │
│ Intermediate • Self-Paced • 1,725 points         │
│                                                   │
│          [ Explore Platforms → ]                  │
└───────────────────────────────────────────────────┘
```

---

## 🔍 Visual Identifiers

Look for these unique characteristics:

### **✨ Sparkles Icon**
The ONLY trail with a sparkles icon (all others use briefcase, code, network, or chart icons).

### **🟢 Evergreen Color**
Green-tinted header background (matches Solutions Architect but with sparkles instead of network icon).

### **📅 "Self-Paced" Duration**
All other trails say "12-16 weeks" — this one says "Self-Paced".

### **🎯 "1,725 points"**
Highest point value! All others show "300 points".

### **📝 Description Mentions Platforms**
"Master HubSpot, Canva, Notion, Airtable, and more..."

---

## 🎨 Comparison Chart

| Trail | Icon | Color | Duration | Difficulty | Points |
|-------|------|-------|----------|------------|--------|
| Product Owner | 💼 | Amber | 12-16 weeks | Advanced | 300 |
| Developer | 💻 | Teal | 12-16 weeks | Advanced | 300 |
| Solutions Architect | 🌐 | Evergreen | 12-16 weeks | Advanced | 300 |
| Business Analyst | 📊 | Blue | 12-16 weeks | Advanced | 300 |
| **Citizen Developer** | **✨** | **Evergreen** | **Self-Paced** | **Intermediate** | **1,725** |

**➡️ The NEW one stands out!**

---

## 🖱️ What Happens When You Click

### **Click the Citizen Developer tile:**

```
Trail of Mastery Page
  ↓ (Click "Citizen Developer Platforms")
  ↓
Citizen Developer Mastery Page
  ↓
You see:
  ✅ Hero banner (green-blue gradient)
  ✅ Category filter buttons (8 categories)
  ✅ 7 platform tiles in 3x3 grid:
      • HubSpot (Marketing)
      • Canva (Design)
      • Notion (Productivity)
      • Airtable (Data)
      • ClickUp (Project Mgmt)
      • Zapier (Integration)
      • Innovation Lab (Experimental)
  ✅ Capstone project section
  ✅ Penny AI mentor section
  ✅ Mastery badge display
```

---

## 📱 On Different Devices

### **Desktop (Large Screen):**
- 2 columns of Salesforce trails (2×2 grid)
- 1 full-width Citizen Developer tile below

### **Tablet (Medium Screen):**
- 2 columns of Salesforce trails (2×2 grid)
- 1 full-width Citizen Developer tile below

### **Mobile (Small Screen):**
- All 5 tiles stack vertically
- Citizen Developer is the 5th tile from top

---

## 🧪 Quick Test

### **Verify it's working:**

1. ✅ Can you see 5 tiles on Trail of Mastery page?
2. ✅ Does the 5th tile have a ✨ sparkles icon?
3. ✅ Does it say "Self-Paced" and "1,725 points"?
4. ✅ When clicked, does it navigate to a new page with 7 platforms?
5. ✅ Can you click "Back" to return to Trail of Mastery?

**If YES to all 5 → Working perfectly!** 🎉

---

## 🎯 Expected Position

### **Trail Cards Rendering Order:**

```javascript
trails.map((trail) => ...)

Order:
1. product-owner        (Row 1, Col 1)
2. developer            (Row 1, Col 2)
3. solutions-architect  (Row 2, Col 1)
4. business-analyst     (Row 2, Col 2)
5. citizen-developer    (Row 3, Full Width) ← NEW!
```

---

## 🌈 Dark Mode View

### **Light Mode:**
- White tile background
- Gray text
- Platform color tint in header

### **Dark Mode:**
- Slate-800 tile background
- White text
- Platform color tint (darker) in header

**Test both modes** to ensure visibility!

---

## 🔗 Full Navigation Flow

```
App Start
  │
  ├─> LearnerHome
  │     └─> Navigation: Click "Learning Center"
  │           └─> LearningCenter Page
  │                 └─> "Trail of Mastery Programs" section
  │                       └─> Click "View Trails" button
  │                             └─> TrailOfMastery Page
  │                                   └─> See 5 tiles
  │                                         └─> Click "Citizen Developer" tile
  │                                               └─> CitizenDeveloperMastery Page
  │                                                     └─> See 7 platform tiles
  │                                                           └─> Click any platform
  │                                                                 └─> Platform Detail (placeholder)
  │
  └─> (Alternative) Direct: setActivePage('trail-mastery')
```

---

## 🎁 Bonus: Add Direct Link

Want a **faster way** to access it? Add this to your Navigation or LearnerHome:

```tsx
<button
  onClick={() => setActivePage('citizen-developer')}
  className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-evergreen to-sky-blue text-white rounded-lg hover:opacity-90"
>
  <Sparkles className="w-5 h-5" />
  <span>Explore Citizen Developer Platforms</span>
</button>
```

This skips the Trail of Mastery gallery and goes **directly** to the 7 platforms!

---

## 📸 Screenshot Guide

### **What to look for in screenshots:**

**Trail of Mastery Page:**
- [ ] Page title: "Trail of Mastery Programs"
- [ ] Info banner mentions "four Salesforce role tracks or explore our new Citizen Developer Platforms path"
- [ ] Grid layout with tiles
- [ ] **5th tile visible** with sparkles icon

**Citizen Developer Tile:**
- [ ] Icon: ✨ (sparkles, not briefcase/code/network/chart)
- [ ] Color: Green tint background
- [ ] Title: "Trail of Mastery: Citizen Developer Platforms"
- [ ] Duration: "Self-Paced"
- [ ] Points: "1,725 points"
- [ ] Button: "View Trail" or similar

---

## 🎯 Files Modified

To see the changes in code:

### **1. TrailOfMastery.tsx**
**Line 10:** Added `Sparkles` to imports  
**Line 104-117:** Added `citizen-developer` trail object  
**Line 134-142:** Updated `handleTrailClick` with special routing  
**Line 218-220:** Updated info banner description

### **2. App.tsx**
**Line 31:** Added `CitizenDeveloperMastery` import  
**Line 69-70:** Added `'citizen-developer'` and `'platform-detail'` to PageType  
**Line 314-333:** Added routing cases for both pages

---

## ✅ Checklist

**Can you see it?**
- [ ] Navigate to Learning Center
- [ ] Click to Trail of Mastery Programs
- [ ] Count tiles: Should be **5 total**
- [ ] Find tile with ✨ sparkles icon
- [ ] Verify text says "Citizen Developer Platforms"
- [ ] Verify points say "1,725"
- [ ] Click the tile
- [ ] Confirm navigation to platform gallery with 7 platforms

**If you can check all boxes → It's working!** 🎊

---

## 🚨 Troubleshooting

### **"I don't see 5 tiles, only 4"**
- Check that TrailOfMastery.tsx includes the new trail object
- Verify the `trails` array has 5 items (line 46-117)
- Check browser console for errors

### **"I see the tile but clicking does nothing"**
- Verify App.tsx has the `case 'citizen-developer':` routing
- Check that the import for CitizenDeveloperMastery exists
- Verify handleTrailClick has the special citizen-developer check

### **"The tile looks broken or has wrong colors"**
- Check that `color: 'evergreen'` is set in the trail object
- Verify TrailCard component supports the evergreen color
- Check dark mode toggle (might look different in dark mode)

### **"I can't find Learning Center"**
- Look in main navigation bar
- Or search for "Trail of Mastery" text
- Or use direct navigation: `setActivePage('trail-mastery')`

---

## 🎉 Success Indicators

You'll know it's working when you see:

✅ **5 tiles** on Trail of Mastery page (not 4)  
✅ **Sparkles icon** on 5th tile  
✅ **"Self-Paced"** duration (unique to this trail)  
✅ **"1,725 points"** (highest point value)  
✅ **Clicking navigates** to 7-platform gallery  
✅ **Back button works** to return to Trail of Mastery  

---

## 📞 Quick Support

**Still can't find it?**

1. Check file `/components/TrailOfMastery.tsx` - search for "citizen-developer"
2. Check file `/App.tsx` - search for "CitizenDeveloperMastery"
3. Review `/CITIZEN_DEVELOPER_ADDED_TO_UI.md` for visual guide
4. Read `/CITIZEN_DEVELOPER_QUICK_START.md` for setup details

**Or just navigate directly:**
```tsx
setActivePage('citizen-developer')
```

---

**Status:** ✅ **LIVE AND VISIBLE IN UI**

**Location:** Trail of Mastery Programs (5th tile with ✨ icon)

**Ready to explore!** 🚀✨
