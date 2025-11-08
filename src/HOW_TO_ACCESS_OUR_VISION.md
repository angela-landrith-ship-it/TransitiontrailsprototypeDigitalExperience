# 🗺️ How to Access the "Our Vision" Page

## ✅ You now have **3 ways** to access the Our Vision page!

---

## 1️⃣ **Main Navigation Bar** ⭐ EASIEST

The "Our Vision" link is now in the **Visitor Navigation** header.

### Desktop:
```
Look at the top navigation bar:
Home | Our Vision ✨ | Learning Center | Portfolio | Community | Events | Donate | Trail Shop
        ^^^^^^^^^^
        Click here!
```

### Mobile:
```
Bottom mobile navigation (second icon):
🏠  ✨  🎓  💼  👥  📅  ❤️  🛍️
    ^^
  Tap here!
```

**Icon:** ✨ Sparkles  
**Location:** Second item in navigation (right after Home)

---

## 2️⃣ **From Donate Page (Postcards from the Future)**

If you're on the donation page, there's a new button in the hero section:

```
Hero Section Buttons:
┌──────────────┐  ┌─────────────────────────────┐  ┌──────────────────┐
│ Donate Now   │  │ Become Founding Supporter  │  │ Learn Our Vision │ ← NEW!
└──────────────┘  └─────────────────────────────┘  └──────────────────┘
```

**Button Style:** White outline button  
**Icon:** ✨ Sparkles

---

## 3️⃣ **Direct Navigation (For Developers)**

In any component with `onNavigate` prop:

```tsx
onNavigate('our-vision')
```

Or programmatically:
```tsx
setActivePage('our-vision')
```

---

## 📍 Page Structure

Once you navigate to Our Vision, you'll see:

### Section 1: Page Header
**Gradient hero** (Teal → Evergreen) with headline  
*"A Future of Pathways, Not Barriers"*

### Section 2: The Why
**Mission statement** with laptop/mountain imagery  
*"Talent is universal — opportunity is not"*

### Section 3: Founder's Story
**Angela Landrith** portrait + blockquote  
+ Penny AI companion bubble

### Section 4: The Future We're Building
**3 interactive cards:**
- 🎓 Accessible Education
- 👥 Community Mentorship
- 💼 Career Growth for Good

### Section 5: Impact Quote Band
**Full-width inspirational photo**  
*"When people learn with purpose..."*

### Section 6: Support CTAs
**3 action buttons:**
- 💖 Donate to the Vision
- 👥 Volunteer with Us
- 🎓 Learn More About the Academy

---

## 🚀 Quick Test

### To verify it's working:

1. **Start the app** (it should default to visitor-home)
2. **Look at the top navigation** → Click "Our Vision" (✨ icon)
3. **You should see** → Beautiful storytelling page with founder story
4. **Scroll down** → Animations trigger as you scroll
5. **Try dark mode** → Toggle theme to see dark mode support

---

## 🎯 Navigation Flow

### Recommended User Journey:

```
Visitor Landing (Home)
    ↓ (Click "Our Vision" in nav)
Our Vision Page
    ↓ (Inspired by story)
Click "Donate to the Vision"
    ↓
Postcards from the Future (Donation page)
    ↓
Make donation or explore more
```

---

## 🔗 Related Navigation Items

### Visitor Navigation Menu (Complete):
1. **Home** 🏠 → `visitor-home`
2. **Our Vision** ✨ → `our-vision` ← YOU ARE HERE
3. **Learning Center** 🎓 → `visitor-learning`
4. **Portfolio** 💼 → `portfolio`
5. **Community** 👥 → `visitor-community`
6. **Events** 📅 → `visitor-events`
7. **Donate** ❤️ → `postcards-from-future`
8. **Trail Shop** 🛍️ → `merch-store`

---

## 💡 Pro Tips

### For Testing:
- **Light Mode:** Default theme shows cream backgrounds
- **Dark Mode:** Click moon icon → Slate backgrounds
- **Responsive:** Resize browser to see mobile/tablet/desktop layouts
- **Animations:** Scroll slowly to see fade-in effects

### For Development:
- Component: `/components/OurVision.tsx`
- Route registered: `'our-vision'` in PageType
- Props: `onDonate`, `onVolunteer`, `onLearnMore`

---

## ⚠️ Troubleshooting

### "I don't see Our Vision in the menu"
✅ **Solution:** Make sure you're on the **Visitor** experience (not enrolled user)

### "Button doesn't navigate"
✅ **Solution:** Check that `setActivePage` is properly passed to navigation

### "Page looks blank"
✅ **Solution:** Check browser console for errors, verify images are loading

### "Dark mode doesn't work"
✅ **Solution:** Click the theme toggle (moon/sun icon) in top-right corner

---

## 📊 Current Status

✅ Our Vision component created  
✅ Added to App.tsx routing  
✅ Added to VisitorNavigation menu  
✅ Added button from Postcards page  
✅ Full dark mode support  
✅ Responsive design (mobile/tablet/desktop)  
✅ Motion animations enabled  
✅ Documentation complete  

**Status:** 🟢 **LIVE AND READY TO USE!**

---

## 🎉 You're All Set!

Just click **"Our Vision" (✨)** in the navigation bar and enjoy the storytelling experience!

---

**Questions?** Check:
- `/OUR_VISION_QUICK_START.md` - Quick reference
- `/OUR_VISION_IMPLEMENTATION.md` - Full technical docs
- `/TTDS_DESIGN_SYSTEM.md` - Design system details
