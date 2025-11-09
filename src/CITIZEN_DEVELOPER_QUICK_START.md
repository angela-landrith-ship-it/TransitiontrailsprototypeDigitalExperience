# 🚀 Citizen Developer Mastery - Quick Start Guide

## TL;DR

A new **multi-platform learning hub** has been added to Trail of Mastery, enabling learners to master HubSpot, Canva, Notion, Airtable, ClickUp, Zapier, and emerging tools.

**Status:** Component created ✅ | Routing pending ⚠️

---

## 🎯 What You Get

### **7 Platform Learning Paths:**
1. **HubSpot** - Marketing automation (250 pts)
2. **Canva** - Visual design (200 pts)
3. **Notion** - Knowledge systems (250 pts)
4. **Airtable** - Database workflows (250 pts)
5. **ClickUp** - Project management (200 pts)
6. **Zapier** - App integrations (275 pts)
7. **Innovation Lab** - Open experiments (300 pts)

### **Total:** 1,725 points available 🏆

---

## ⚡ 5-Minute Setup

### **Step 1: Verify Component**
```bash
✅ File exists: /components/CitizenDeveloperMastery.tsx
```

### **Step 2: Add Routing**

**Open:** `/App.tsx`

**Find:** Line ~314 (before `default:` case)

**Add:**
```tsx
      case 'citizen-developer':\n        return <CitizenDeveloperMastery
          onNavigate={(page, platformId) => {
            setActivePage(page as PageType);
            if (platformId) setSelectedTrailId(platformId);
          }}
          onBack={() => setActivePage('trail-mastery')}
          userPoints={2380}
          userLevel="Explorer"
        />;\n
      case 'platform-detail':\n        return <div className="p-8 text-center bg-white dark:bg-slate-800 min-h-screen">
          <h2 className="text-2xl mb-4 text-gray-900 dark:text-white">
            Platform Detail Page
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            Platform ID: {selectedTrailId}
          </p>
          <button 
            onClick={() => setActivePage('citizen-developer')}
            className="px-6 py-3 bg-evergreen text-white rounded-lg"
          >
            Back to Platforms
          </button>
        </div>;
```

### **Step 3: Test**

1. Run your dev server
2. Navigate to `/trail-mastery` page
3. Add a "Citizen Developer" link/button
4. Click to navigate to `citizen-developer` route
5. Verify platform tiles render correctly

---

## 🎨 Quick Visual Guide

### **Hero Section:**
```
┌─────────────────────────────────────────┐
│  🌟 Citizen Developer Platforms         │
│  Expand Your Platform Mastery           │
│                                         │
│  Master the tools that power modern...  │
│                                         │
│  [Start Learning] [Preview Platforms]   │
└─────────────────────────────────────────┘
```

### **Platform Tiles (3x3 Grid):**
```
┌──────────┐ ┌──────────┐ ┌──────────┐
│ 📧 HubSpot│ │ 🎨 Canva │ │ 📄 Notion│
│ Marketing│ │ Visual   │ │ Systems  │
│ [Explore]│ │ [Explore]│ │ [Explore]│
└──────────┘ └──────────┘ └──────────┘

┌──────────┐ ┌──────────┐ ┌──────────┐
│ 📊 Airtab│ │ ✅ ClickUp│ │ ⚡ Zapier│
│ Workflow │ │ Projects │ │ Integrat │
│ [Explore]│ │ [Explore]│ │ [Explore]│
└──────────┘ └──────────┘ └──────────┘

┌──────────┐
│ 🌍 Innovation Lab              │
│ Open Platform Challenges       │
│ [Explore]                      │
└────────────────────────────────┘
```

---

## 🎯 User Flow

```
Learning Center
    ↓
Trail of Mastery Hub
    ↓
Citizen Developer Platforms ← YOU ARE HERE
    ↓
Select a Platform
    ↓
Platform Detail Page (TODO)
    ↓
Enroll & Learn Modules
    ↓
Complete Capstone Project
    ↓
Earn Mastery Badge 🏆
```

---

## 🧪 Test Scenarios

### **Scenario 1: Browse Platforms**
1. Navigate to `citizen-developer`
2. See 7 platform tiles
3. Click category filters (Marketing, Design, etc.)
4. Tiles filter correctly

### **Scenario 2: Explore Platform**
1. Click "Explore Platform" on any tile
2. Navigate to `platform-detail` (placeholder page)
3. See platform ID displayed
4. Click "Back" returns to grid

### **Scenario 3: Enrolled State**
1. Mock enrollment: Add `'notion'` to `enrolledPlatforms` array (line ~164)
2. Notion tile shows progress ring
3. Button changes to "Continue Learning"
4. Progress displays (e.g., 45%)

### **Scenario 4: Dark Mode**
1. Toggle dark mode
2. All backgrounds switch to dark slate
3. Text switches to white
4. Platform colors remain vibrant

---

## 🎨 Customization Points

### **Add a Platform:**

**Edit:** `/components/CitizenDeveloperMastery.tsx` line ~65

**Add to `platforms` array:**
```tsx
{
  id: 'monday',
  name: 'Monday.com',
  tagline: 'Team Workflow Mastery',
  description: 'Build collaborative workflows...',
  category: 'Project Management',
  difficulty: 'Intermediate',
  duration: '6–8 weeks',
  modules: 5,
  points: 225,
  color: '#FF3D57',
  icon: CheckSquare,
  skills: ['Workflow Design', 'Automation', 'Team Boards', 'Integrations'],
}
```

### **Change Colors:**

**Hero Gradient:**
```tsx
className="bg-gradient-to-r from-evergreen to-sky-blue"
```

**Platform Tile Gradient:**
```tsx
style={{ 
  background: `linear-gradient(135deg, ${platform.color}15 0%, ${platform.color}05 100%)` 
}}
```

---

## 📊 Sample Data

### **Mock Enrollments:**
```tsx
const enrolledPlatforms = ['notion', 'canva']; // User enrolled in these

const platformProgress = {
  'notion': 45,  // 45% complete
  'canva': 100,  // Completed!
};
```

### **Display Logic:**
- **Enrolled + Progress < 100:** Shows progress ring, "Continue Learning"
- **Enrolled + Progress = 100:** Shows checkmark, "View Certificate"
- **Not Enrolled:** Shows platform icon, "Explore Platform"

---

## 🔧 Troubleshooting

### **Platform tiles not showing:**
- ✅ Check imports at top of CitizenDeveloperMastery.tsx
- ✅ Verify `platforms` array has 7 objects
- ✅ Check category filter isn't hiding all tiles

### **Routing not working:**
- ✅ Verify PageType includes `'citizen-developer'` and `'platform-detail'`
- ✅ Check App.tsx has case statements added
- ✅ Confirm import: `import { CitizenDeveloperMastery } from './components/CitizenDeveloperMastery';`

### **Dark mode issues:**
- ✅ All `bg-` classes need `dark:bg-` variants
- ✅ All `text-` classes need `dark:text-` variants
- ✅ Check platform color opacity in dark mode

### **Platform colors not showing:**
- ✅ Verify `platform.color` is a valid hex color
- ✅ Check inline styles use `style={{ backgroundColor: platform.color }}`
- ✅ Gradient overlays use template literal: `${platform.color}15`

---

## 🚀 Next Steps (After Routing)

### **Priority 1: Navigation from Trail of Mastery**
Add "Citizen Developer" option to Trail of Mastery hub page:

**Edit:** `/components/TrailOfMastery.tsx`

**Add 5th trail tile:**
```tsx
{
  id: 'citizen-developer',
  role: 'Citizen Developer',
  title: 'Trail of Mastery: Citizen Developer',
  description: 'Master no-code/low-code platforms like HubSpot, Canva, Notion, and more.',
  duration: 'Self-Paced',
  difficulty: 'Intermediate',
  icon: Globe,
  color: 'evergreen',
  badge: 'Multi-Platform Maker',
  pennyMode: 'Mentor',
  modules: 7,
  totalPoints: 1725,
}
```

### **Priority 2: Build PlatformDetail Component**
Create `/components/PlatformDetail.tsx` with:
- Platform header
- Module list (6 modules per platform)
- Enrollment CTA
- Progress tracker
- Skill breakdown

### **Priority 3: Salesforce Integration**
- Create Platform_Mastery__c object
- Create Platform_Module__c object  
- Create Platform_Enrollment__c object
- Deploy Apex controller
- Build progress tracking Flow

---

## 📋 Checklist

**Setup:**
- [ ] Component created ✅
- [ ] Imports added to App.tsx ✅
- [ ] PageType updated ✅
- [ ] Routing cases added ⚠️ (manual step)
- [ ] Test navigation works

**Visual QA:**
- [ ] 7 platform tiles render
- [ ] Category filters work
- [ ] Hover states active
- [ ] Dark mode works
- [ ] Mobile responsive

**Features:**
- [ ] Enrolled state shows progress ring
- [ ] Non-enrolled shows "Explore" CTA
- [ ] Back button returns to Trail of Mastery
- [ ] Capstone section displays
- [ ] Penny section displays

**Integration:**
- [ ] Add link from Trail of Mastery hub
- [ ] Add to Learning Center navigation
- [ ] Add to Penny recommendations

---

## 💡 Pro Tips

1. **Test with mock data first** - No Salesforce needed to demo UI
2. **Use category filter** - Great for showing focused platform sets
3. **Demo enrolled state** - Hardcode an enrollment to show progress ring
4. **Show capstone section** - Highlights integration focus
5. **Emphasize Penny's role** - Cross-platform mentor is unique value

---

## 🎊 You're Ready!

**Current Status:**
- ✅ Component built
- ✅ Design system compliant
- ✅ Dark mode ready
- ✅ Responsive layout
- ✅ 7 platforms configured

**Pending:**
- ⚠️ 2 routing case statements
- 🔄 PlatformDetail component
- 🔄 Salesforce objects

**Estimated time to functional demo:** 10 minutes  
**Estimated time to production-ready:** 2-3 days (with Salesforce setup)

---

**Let's ship this!** 🚀✨

**Need help?** Check `/CITIZEN_DEVELOPER_MASTERY_IMPLEMENTATION.md` for full details.
