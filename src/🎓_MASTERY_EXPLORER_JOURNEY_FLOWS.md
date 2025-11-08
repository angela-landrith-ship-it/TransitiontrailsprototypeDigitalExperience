# 🎓 TRAIL OF MASTERY & EXPLORER'S JOURNEY FLOWS

**Project:** Transition Trails Digital Experience Portal  
**Platform:** Salesforce Experience Cloud (LWR)  
**Date:** November 8, 2025  
**Status:** Ready to Implement  

---

## 🌟 OVERVIEW

This document defines the complete user journey for **advanced learners** and **lifelong community members**, extending the journey from Guided Trail completion to mastery achievement and continuous engagement.

---

## 🗺️ COMPLETE LEARNER LIFECYCLE

```
┌─────────────────────────────────────────────────────────────────┐
│                                                                 │
│  GUEST       →    VISITOR     →    GUIDED      →    MASTERY    │
│  (Public)         (Limited)        (Full)          (Advanced)   │
│                                                                 │
│                                              ↓                  │
│                                                                 │
│                                      EXPLORER'S JOURNEY         │
│                                      (Lifelong Learner)         │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘

Journey Stages:
1. Discovery (Guest)
2. Exploration (Visitor)
3. Transformation (Guided)
4. Mastery (Trail of Mastery)
5. Continuity (Explorer's Journey)
```

---

## 👥 AUDIENCES IN SCOPE

### **A. Trail of Mastery Participant (Advanced Learner)**
- **Profile:** Guided Trail graduate pursuing specialized role
- **Access Level:** Advanced content + mentorship + team projects
- **Duration:** 12-16 weeks per track
- **Goal:** Master specialized Salesforce role
- **Transition Goal:** Earn certification & become mentor
- **Color Theme:** Evergreen (#3B6A52) + Amber (#F9A03F)

### **B. Explorer's Journey Participant (Continuous Learner / Alumni)**
- **Profile:** Trail graduate or subscription member
- **Access Level:** All content + events + community + new releases
- **Duration:** Ongoing subscription
- **Goal:** Continue development & stay connected
- **Transition Goal:** Lifelong community contributor
- **Color Theme:** Sky Blue (#7EB5C1) + Teal (#2C6975)

---

## 🎯 AUDIENCE GOALS

| Role | Primary Goal | Transition Goal | Success Metric |
|------|-------------|-----------------|----------------|
| **Trail of Mastery Participant** | Master specialized Salesforce role (Admin, Dev, Architect, Analyst, PO) | Earn certification & become mentor or team lead | Certification pass rate |
| **Explorer's Journey Participant** | Continue personal development through workshops, events, and new skill paths | Remain active contributor & lifelong community member | Monthly engagement score |

---

## 🎓 TRAIL OF MASTERY PARTICIPANT FLOW

### **Journey Overview:**

```
Guided Trail Completion
         ↓
    [Enrollment]
         ↓
    Orientation
         ↓
Mastery Dashboard
         ↓
 Learning Modules
         ↓
 Team Projects
         ↓
Capstone Project
         ↓
   Completion
         ↓
Mentor/Explorer Choice
```

---

### **Stage 1: Enrollment Trigger**

**Trigger Conditions:**
1. Guided Trail completion (80%+)
2. All assessments passed
3. Capstone project submitted
4. Coach recommendation

**Page:** `/trail-of-mastery/enroll`  
**Component:** `MasteryEnrollmentModal.tsx` (NEW)

**Penny Greeting:**
```
"🌟 Congratulations, [Name]! You've completed the Guided Trail.

Ready to take the next step toward Salesforce mastery? 
Choose a specialized role path that aligns with your career goals."
```

**Enrollment Form Fields:**
- **Role Path Selection** (required)
  - Salesforce Product Owner
  - Salesforce Developer
  - Salesforce Solutions Architect
  - Salesforce Business Analyst
  
- **Prior Trail** (auto-filled)
  - Guided Trail completion date
  - Final score & level
  
- **Career Goals** (text area)
  - Where do you see yourself in 6 months?
  - Which certifications are you targeting?
  
- **Time Commitment** (dropdown)
  - Part-time (10-15 hrs/week)
  - Full-time (25-30 hrs/week)
  
- **Start Date Preference** (calendar)
  - Next available cohort
  - Specific date

**CTA:** "Start Mastery Trail" → Creates enrollment record

**Salesforce Action:**
```apex
Trail_Enrollment__c masteryEnrollment = new Trail_Enrollment__c(
    User__c = userId,
    Trail_Type__c = 'Mastery',
    Role_Track__c = selectedRole, // PO, Dev, Architect, BA
    Start_Date__c = cohortStartDate,
    Status__c = 'Enrolled',
    Prior_Trail__c = guidedTrailId
);
insert masteryEnrollment;

// Assign mentor
assignMentorFlow(userId, selectedRole);

// Create Slack channel
createMasterySlackChannel(userId, selectedRole);
```

---

### **Stage 2: Orientation Page**

**Page:** `/mastery/orientation`  
**Component:** `MasteryOrientationPage.tsx` (NEW)

**Hero Section:**
```
┌──────────────────────────────────────────────────────┐
│  🏔️ Trail of Mastery: [Role Track]                  │
│                                                      │
│  12-16 week advanced learning journey               │
│  Team-based projects • Real-world experience        │
│                                                      │
│  Your cohort starts: [Date]                         │
│  [ Meet Your Team → ]                               │
└──────────────────────────────────────────────────────┘
```

**Overview Sections:**

**1. Curriculum Overview**
```
Week 1-4:   Foundations & Best Practices
Week 5-8:   Advanced Techniques & Tools  
Week 9-12:  Capstone Project Development
Week 13-16: Certification Prep (optional)
```

**2. Schedule & Commitments**
- Weekly live sessions (Tuesdays, 6-8pm PT)
- Team project sprints (3 total)
- 1:1 mentor check-ins (bi-weekly)
- Final capstone presentation

**3. Points & Recognition**
- Total points available: 3,500
- Expert level: 2,800 pts
- Master level: 3,500 pts
- Badge: "Trailblazer [Role] Master"

**4. Team Formation**
- Cohort size: 15-20 learners
- Project teams: 3-4 members
- Slack workspace: `#mastery-{role}`
- Team lead rotation

**5. Mentorship Pairing**
```
┌────────────────────────────────────┐
│  👤 Your Mentor                    │
│                                    │
│  [Avatar]  Sarah Chen              │
│  Senior Solutions Architect        │
│  5 years Salesforce experience     │
│                                    │
│  [ Message Mentor ]                │
│                                    │
└────────────────────────────────────┘
```

**6. Tools & Integrations**
- GitHub: Team repositories
- Linear: Project management
- Slack: Real-time communication
- Zoom: Live sessions
- Trailhead: Supplemental learning

**CTA:** "Meet Your Team" → Navigate to dashboard

**Penny Context:**
```
"Welcome to the Trail of Mastery, [Name]! 

This journey is designed to transform you from a competent Salesforce 
professional into a true expert in [Role]. 

I'll be here in Advisor mode, helping you track milestones, optimize 
your learning path, and stay on track for certification.

Let's make this the most impactful learning experience of your career!"
```

---

### **Stage 3: Mastery Dashboard**

**Page:** `/mastery/dashboard`  
**Component:** `MasteryDashboard.tsx` (NEW)

**Layout:** Two-column layout with vertical content flow

**Left Column (Primary Progress):**

**1. Progress Header**
```
┌──────────────────────────────────────────────────────┐
│  Trail of Mastery: [Role Track]                      │
│  Week 3 of 12                                        │
│                                                      │
│  [Progress Ring: 25%]                                │
│                                                      │
│  875 / 3,500 points                                  │
│  Level: Advancing                                    │
│  Next Milestone: Module 4 Complete                   │
│                                                      │
└──────────────────────────────────────────────────────┘
```

**2. Current Module**
```
┌──────────────────────────────────────────────────────┐
│  📚 Module 3: Advanced Data Architecture             │
│                                                      │
│  [Progress Bar: 60%]                                 │
│                                                      │
│  ✅ Data Modeling Best Practices                    │
│  ✅ Relationship Design Patterns                    │
│  ▶️  Custom Metadata & Settings                     │
│  ⬜ Big Objects & Scalability                       │
│                                                      │
│  [ Continue Learning → ]                             │
│                                                      │
└──────────────────────────────────────────────────────┘
```

**3. Team Project Status**
```
┌──────────────────────────────────────────────────────┐
│  👥 Team Alpha - Sprint 1                           │
│                                                      │
│  Project: Nonprofit CRM Enhancement                  │
│  Due: Nov 22, 2025                                  │
│                                                      │
│  [Progress: 45%]                                     │
│                                                      │
│  Your role: Technical Lead                           │
│  Tasks pending: 3                                    │
│                                                      │
│  [ Open in Linear ]  [ GitHub Repo ]                │
│                                                      │
└──────────────────────────────────────────────────────┘
```

**4. Upcoming Sessions**
```
┌──────────────────────────────────────────────────────┐
│  📅 This Week's Schedule                             │
│                                                      │
│  • Tue, Nov 12 @ 6pm PT - Live Session              │
│    "Advanced SOQL Optimization"                      │
│    [ Join Zoom ]                                     │
│                                                      │
│  • Thu, Nov 14 @ 3pm PT - 1:1 Mentor Check-in      │
│    With Sarah Chen                                   │
│    [ Reschedule? ]                                   │
│                                                      │
│  • Sat, Nov 16 @ 10am PT - Team Standup            │
│    Project Sprint Review                             │
│    [ Add to Calendar ]                               │
│                                                      │
└──────────────────────────────────────────────────────┘
```

**Right Column (Recommendations + Community):**

**1. Penny Contextual Guidance**
```
┌────────────────────────────────────┐
│  ✨ Penny's Priorities             │
│                                    │
│  Based on your progress:           │
│                                    │
│  1. 🎯 Complete Module 3.3        │
│     Priority: HIGH                 │
│     Est. time: 45 min              │
│                                    │
│  2. 💬 Review team PR #23         │
│     Priority: MEDIUM               │
│     Waiting since: 2 days          │
│                                    │
│  3. 📖 Study for cert exam        │
│     Priority: LOW                  │
│     Recommended: Trailhead         │
│                                    │
│  [ Ask Penny ]                     │
│                                    │
└────────────────────────────────────┘
```

**2. Certification Progress**
```
┌────────────────────────────────────┐
│  🏆 Certification Tracker          │
│                                    │
│  Target: Platform Developer I      │
│                                    │
│  Readiness: 73%                    │
│  [Progress bar]                    │
│                                    │
│  Strengths:                        │
│  ✅ Data Modeling (92%)           │
│  ✅ Apex Basics (88%)             │
│                                    │
│  Needs Work:                       │
│  ⚠️  Testing & Debugging (64%)    │
│  ⚠️  Async Processing (58%)       │
│                                    │
│  [ Study Plan → ]                  │
│                                    │
└────────────────────────────────────┘
```

**3. Cohort Activity**
```
┌────────────────────────────────────┐
│  👥 Cohort Feed                    │
│                                    │
│  • Alex J. completed Module 4      │
│    2 hours ago                     │
│                                    │
│  • Team Beta merged PR #45         │
│    4 hours ago                     │
│                                    │
│  • Jordan K. earned "Code Review   │
│    Expert" badge                   │
│    Yesterday                       │
│                                    │
│  [ View All Activity ]             │
│                                    │
└────────────────────────────────────┘
```

**Sidebar Navigation:**
- My Progress
- Team Projects
- Mentor
- Cohort Directory
- Resources
- Certification Prep
- Achievements

**Penny Mode:** Advisor (performance tracking, optimization suggestions)

---

### **Stage 4: Capstone Project**

**Page:** `/mastery/capstone`  
**Component:** Enhanced version of existing `MyCapstone.tsx`

**Project Workspace Layout:**

**Tab 1: Overview**
```
┌──────────────────────────────────────────────────────┐
│  🚀 Capstone Project                                 │
│                                                      │
│  Client: Hope Haven Nonprofit                        │
│  Project: Volunteer Management System                │
│                                                      │
│  Team: Alpha (4 members)                             │
│  Your Role: Technical Lead                           │
│                                                      │
│  Timeline: 4 weeks (Nov 15 - Dec 13)                │
│  Status: ▶️  In Progress (Week 2)                   │
│                                                      │
│  [Progress Ring: 35%]                                │
│                                                      │
└──────────────────────────────────────────────────────┘
```

**Tab 2: Requirements**
- Client brief (PDF download)
- User stories (Linear integration)
- Acceptance criteria
- Technical specifications
- Design mockups

**Tab 3: Development**
```
┌────────────────────────────────────┐
│  💻 GitHub Repository              │
│                                    │
│  master: 47 commits                │
│  feature/volunteer-portal: 12 PRs  │
│                                    │
│  Your contributions:               │
│  • 23 commits                      │
│  • 8 PRs merged                    │
│  • 142 lines added                 │
│                                    │
│  [ Open Repo ]  [ New PR ]         │
│                                    │
└────────────────────────────────────┘
```

**Tab 4: Project Management**
```
┌────────────────────────────────────┐
│  📋 Linear Board                   │
│                                    │
│  Sprint 2 of 4                     │
│                                    │
│  To Do: 8                          │
│  In Progress: 4                    │
│  In Review: 2                      │
│  Done: 23                          │
│                                    │
│  [ Open Linear ]                   │
│                                    │
└────────────────────────────────────┘
```

**Tab 5: Mentor Feedback**
```
┌──────────────────────────────────────────────────────┐
│  💬 Mentor Review Thread                             │
│                                                      │
│  Sarah Chen • Nov 8, 2025                           │
│  "Great progress on the data model! A few           │
│  suggestions for optimization..."                    │
│                                                      │
│  [Full feedback thread with inline comments]        │
│                                                      │
│  Your response: [Reply box]                          │
│                                                      │
└──────────────────────────────────────────────────────┘
```

**Tab 6: Presentation**
- Slide deck upload
- Demo video recording
- Presentation schedule
- Rehearsal feedback

**CTA Actions:**
- Submit for Review (triggers Flow)
- Request Mentor Feedback
- Schedule Demo
- View Rubric

**Salesforce Trigger:**
```apex
// When "Submit for Review" clicked
trigger CapstoneSubmission on Capstone_Project__c (after update) {
    if (trigger.new[0].Status__c == 'Submitted_For_Review') {
        // Create review assignment
        // Notify mentor
        // Update Trail_Mastery_Progress__c
        // Award completion points
    }
}
```

---

### **Stage 5: Completion & Transition**

**Page:** `/mastery/completion`  
**Component:** `MasteryCompletionPage.tsx` (NEW)

**Celebration Screen:**
```
┌──────────────────────────────────────────────────────┐
│                  [Confetti Animation]                │
│                                                      │
│              🏆 MASTERY ACHIEVED! 🏆                │
│                                                      │
│  Congratulations, [Name]!                            │
│  You've completed the Trail of Mastery               │
│                                                      │
│              [Role Track Badge Reveal]               │
│          "Trailblazer [Role] Master"                │
│                                                      │
│  Final Score: 3,425 / 3,500 points                  │
│  Level: Master                                       │
│  Certification Ready: Yes                            │
│                                                      │
└──────────────────────────────────────────────────────┘
```

**Achievement Summary:**
```
Your Trail of Mastery Stats:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Modules Completed:        16 / 16
Team Projects:            3 / 3
Capstone Grade:           A+
Mentor Rating:            5 / 5
Certification Readiness:  94%
Cohort Rank:              Top 15%
```

**Penny's Message:**
```
┌──────────────────────────────────────────────────────┐
│  ✨ "Incredible work, [Name]!                        │
│                                                      │
│  Over the past 12 weeks, you've transformed from a   │
│  competent professional into a true [Role] expert.   │
│                                                      │
│  You've mastered advanced techniques, led a team     │
│  through a real-world project, and demonstrated      │
│  the skills needed for [Certification].              │
│                                                      │
│  What's next? Here are your options..."              │
│                                                      │
└──────────────────────────────────────────────────────┘
```

**Next Steps Options:**

**Option 1: Become a Mentor**
```
┌────────────────────────────────────┐
│  👥 Join Our Mentor Team           │
│                                    │
│  Share your expertise with new     │
│  learners in the Guided Trail      │
│                                    │
│  • 2-4 hours/week                  │
│  • Bi-weekly mentee sessions       │
│  • Earn $500/month stipend         │
│  • Give back to community          │
│                                    │
│  [ Apply to Be a Mentor ]          │
│                                    │
└────────────────────────────────────┘
```

**Option 2: Start Another Mastery Track**
```
┌────────────────────────────────────┐
│  🎓 Expand Your Expertise          │
│                                    │
│  Explore another role track:       │
│  • Solutions Architect             │
│  • Business Analyst                │
│  • Product Owner                   │
│                                    │
│  Multi-role experts are in high    │
│  demand!                           │
│                                    │
│  [ Browse Other Trails ]           │
│                                    │
└────────────────────────────────────┘
```

**Option 3: Join Explorer's Journey**
```
┌────────────────────────────────────┐
│  🌍 Explorer's Journey             │
│                                    │
│  Continue learning & stay          │
│  connected with the community      │
│                                    │
│  • Monthly workshops & events      │
│  • New skill releases              │
│  • Job board access                │
│  • Alumni network                  │
│                                    │
│  $49/month or $490/year            │
│                                    │
│  [ Join Explorer's Journey ]       │
│                                    │
└────────────────────────────────────┘
```

**Option 4: Take a Break**
```
┌────────────────────────────────────┐
│  🎉 Celebrate Your Achievement     │
│                                    │
│  You've earned a rest! Your        │
│  account will remain active for:   │
│                                    │
│  • Community access (3 months)     │
│  • Resource downloads              │
│  • Certificate access              │
│                                    │
│  Come back anytime!                │
│                                    │
│  [ Stay Connected ]                │
│                                    │
└────────────────────────────────────┘
```

**Downloadable Assets:**
- Digital badge (PNG/SVG)
- LinkedIn shareable certificate
- Transcript of completion
- Letter of recommendation (from mentor)
- Portfolio project showcase

**Share Buttons:**
- Share on LinkedIn (auto-generated post)
- Share on Twitter
- Email achievement to family/friends
- Add to Salesforce Trailhead profile

---

## 🌍 EXPLORER'S JOURNEY PARTICIPANT FLOW

### **Journey Overview:**

```
Trail Completion
    OR
Paid Subscription
       ↓
  Welcome Page
       ↓
Explorer Dashboard
       ↓
Events & Workshops
       ↓
Skill Refreshers
       ↓
Job Opportunities
       ↓
Ongoing Engagement
```

---

### **Stage 1: Welcome & Subscription**

**Entry Points:**
1. **Post-Mastery:** Automatic invitation after Trail of Mastery completion
2. **Direct Subscription:** $49/month or $490/year
3. **Alumni Reconnection:** Email campaign to past graduates

**Page:** `/explorers-journey/welcome`  
**Component:** `ExplorersWelcomePage.tsx` (NEW)

**Hero Section:**
```
┌──────────────────────────────────────────────────────┐
│                                                      │
│          🌍 Welcome to Explorer's Journey            │
│                                                      │
│          Continue the Journey. Stay Connected.       │
│                                                      │
│  Your learning doesn't end with graduation.          │
│  Join a thriving community of lifelong learners.     │
│                                                      │
│           [ Join This Month's Event → ]              │
│                                                      │
└──────────────────────────────────────────────────────┘
```

**What You'll Get:**

**1. Workshops & Labs** (CMS event feed)
```
┌────────────────────────────────────┐
│  🛠️ Monthly Workshops               │
│                                    │
│  • Live coding sessions            │
│  • Q&A with experts                │
│  • Hands-on labs                   │
│  • Community hackathons            │
│                                    │
│  Next up:                          │
│  "AI in Salesforce: Prompt Builder"│
│  Nov 20, 2025 @ 6pm PT            │
│                                    │
│  [ Register Now ]                  │
│                                    │
└────────────────────────────────────┘
```

**2. New Trails** (Emerging tech)
```
┌────────────────────────────────────┐
│  🚀 New Skill Releases              │
│                                    │
│  Coming soon:                      │
│  • Slack Integration Patterns      │
│  • Flow Orchestration              │
│  • Einstein GPT                    │
│  • Net Zero Cloud                  │
│                                    │
│  Early access for Explorers!       │
│                                    │
│  [ Browse Coming Soon ]            │
│                                    │
└────────────────────────────────────┘
```

**3. Community Impact** (Partner stories)
```
┌────────────────────────────────────┐
│  💚 Partner Success Stories         │
│                                    │
│  See how your capstone projects    │
│  are making a real difference      │
│                                    │
│  Latest:                           │
│  "Hope Haven now serves 2x more    │
│  volunteers thanks to Team Alpha's │
│  Volunteer Management System"      │
│                                    │
│  [ Read Story ]                    │
│                                    │
└────────────────────────────────────┘
```

**Pricing:**
```
┌──────────────────────────────────────────────────────┐
│  Explorer's Journey Membership                       │
│                                                      │
│  ○ Monthly:  $49/month                              │
│    Cancel anytime                                    │
│                                                      │
│  ● Annual:   $490/year (2 months free!)             │
│    Best value                                        │
│                                                      │
│  Mastery graduates: First 3 months free! 🎉         │
│                                                      │
│  [ Start Free Trial ]  [ Subscribe Now ]             │
│                                                      │
└──────────────────────────────────────────────────────┘
```

**CTA:** "Join This Month's Event" or "Start Free Trial"

---

### **Stage 2: Explorer Dashboard**

**Page:** `/explorers/dashboard`  
**Component:** `ExplorerDashboard.tsx` (NEW)

**Layout:** Dynamic feed-based design (like LinkedIn)

**Main Feed:**

**1. Personalized Recommendations (AI-Powered)**
```
┌──────────────────────────────────────────────────────┐
│  ✨ Recommended for You                              │
│                                                      │
│  Based on your [Role] expertise and interests        │
│                                                      │
│  📚 Trail: "Advanced API Integration Patterns"      │
│  Duration: 4 weeks • Level: Expert                   │
│  [ Start Trail ]                                     │
│                                                      │
│  🎙️ Podcast: "Scaling Nonprofits with Salesforce"  │
│  Duration: 45 min • Guest: Sarah Chen               │
│  [ Listen Now ]                                      │
│                                                      │
│  🛠️ Workshop: "Einstein GPT Hands-On Lab"          │
│  Date: Nov 25 @ 6pm PT                              │
│  [ Register ]                                        │
│                                                      │
└──────────────────────────────────────────────────────┘
```

**2. Job Opportunities** (Partner postings)
```
┌──────────────────────────────────────────────────────┐
│  💼 Job Board                                        │
│                                                      │
│  3 new opportunities match your profile              │
│                                                      │
│  • Senior Salesforce Developer                       │
│    Nonprofit Inc. • Remote • $120-140K              │
│    [ View Details ]                                  │
│                                                      │
│  • Solutions Architect                               │
│    Hope Foundation • San Francisco • $140-160K      │
│    [ View Details ]                                  │
│                                                      │
│  • Technical Product Manager                         │
│    Social Impact Co. • Hybrid • $130-150K          │
│    [ View Details ]                                  │
│                                                      │
│  [ Browse All Jobs ]                                 │
│                                                      │
└──────────────────────────────────────────────────────┘
```

**3. Engagement Leaderboard**
```
┌────────────────────────────────────┐
│  🏆 This Month's Top Explorers     │
│                                    │
│  1. 🥇 Jordan K. - 1,250 pts      │
│  2. 🥈 Alex M. - 1,180 pts        │
│  3. 🥉 You - 1,050 pts            │
│  4. Sam T. - 980 pts               │
│  5. Morgan L. - 920 pts            │
│                                    │
│  Your rank: #3 of 247              │
│                                    │
│  [ View Full Leaderboard ]         │
│                                    │
└────────────────────────────────────┘
```

**4. Skill Refresh Cards** (Trailhead sync)
```
┌────────────────────────────────────┐
│  🎯 Keep Your Skills Sharp          │
│                                    │
│  It's been 6 months since you      │
│  completed "Advanced Apex"         │
│                                    │
│  📝 Quick Refresher Quiz (10 min) │
│  Earn 50 engagement points         │
│                                    │
│  [ Take Quiz ]  [ Skip ]           │
│                                    │
└────────────────────────────────────┘
```

**5. Community Activity Feed**
```
┌──────────────────────────────────────────────────────┐
│  📰 Community Feed                                   │
│                                                      │
│  • Sarah C. published: "5 Flow Best Practices"      │
│    12 likes • 4 comments • 2 hours ago              │
│                                                      │
│  • New workshop announced: "Einstein GPT Lab"        │
│    34 registered • Nov 25 @ 6pm PT                   │
│                                                      │
│  • Alex J. earned "Community Champion" badge         │
│    15 reactions • Yesterday                          │
│                                                      │
│  • Hiring: Senior Developer @ Hope Foundation        │
│    8 applications • 3 days ago                       │
│                                                      │
│  [ Load More ]                                       │
│                                                      │
└──────────────────────────────────────────────────────┘
```

**Sidebar:**

**Your Stats:**
```
┌────────────────────────────────────┐
│  📊 Your Explorer Stats            │
│                                    │
│  Member since: Jan 2025            │
│  Status: Active                    │
│                                    │
│  This Month:                       │
│  • Events attended: 3              │
│  • Trails started: 2               │
│  • Forum posts: 12                 │
│  • Engagement pts: 1,050           │
│                                    │
│  All-Time:                         │
│  • Total points: 5,420             │
│  • Trails completed: 8             │
│  • Community rank: #23             │
│                                    │
└────────────────────────────────────┘
```

**Penny Motivator:**
```
┌────────────────────────────────────┐
│  ✨ Penny Says                     │
│                                    │
│  "Let's find something new to      │
│  explore today, [Name]!            │
│                                    │
│  I noticed you haven't attended    │
│  a workshop in 2 weeks. The        │
│  'Einstein GPT Lab' looks perfect  │
│  for your interests.               │
│                                    │
│  Want me to register you?"         │
│                                    │
│  [ Yes, Register ]  [ Suggest More]│
│                                    │
└────────────────────────────────────┘
```

**Penny Mode:** Motivator (continuous learning encouragement, discovery)

---

### **Stage 3: Events & Challenges**

**Page:** `/explorers/events`  
**Component:** `ExplorerEventsHub.tsx` (NEW)

**Global Calendar Integration:**
```
┌──────────────────────────────────────────────────────┐
│  📅 November 2025 Events                             │
│                                                      │
│  [Calendar View]                                     │
│                                                      │
│  Filters: [ All ] [ Workshops ] [ Hackathons ]       │
│           [ Community Calls ] [ TrailBuild ]         │
│                                                      │
└──────────────────────────────────────────────────────┘
```

**Tab 1: Live Sessions**
```
┌──────────────────────────────────────────────────────┐
│  🎥 Upcoming Live Sessions                           │
│                                                      │
│  • Nov 15 @ 6pm PT - "Flow Orchestration Deep Dive" │
│    Host: Michael Rodriguez • 47 registered          │
│    [ Register ]                                      │
│                                                      │
│  • Nov 20 @ 7pm PT - "Einstein GPT Hands-On Lab"   │
│    Host: Sarah Chen • 89 registered                 │
│    [ Register ]                                      │
│                                                      │
│  • Nov 27 @ 6pm PT - "Career Q&A with Architects"  │
│    Panel discussion • 56 registered                  │
│    [ Register ]                                      │
│                                                      │
└──────────────────────────────────────────────────────┘
```

**Tab 2: TrailBuild Events**
```
┌──────────────────────────────────────────────────────┐
│  🏗️ TrailBuild Challenge Days                       │
│                                                      │
│  Build apps for nonprofits in 24-hour sprints       │
│                                                      │
│  Next Event: December 7-8, 2025                      │
│  Theme: "Winter of Impact"                           │
│  Teams: 4-6 members                                  │
│  Prize: $2,000 to winning nonprofit                  │
│                                                      │
│  [ Form a Team ]  [ Join as Individual ]             │
│                                                      │
└──────────────────────────────────────────────────────┘
```

**Tab 3: Community Hackathons**
```
┌──────────────────────────────────────────────────────┐
│  💻 Virtual Hackathons                               │
│                                                      │
│  Current: "Einstein GPT Challenge"                   │
│  Ends: Nov 30, 2025                                  │
│  Prize: $500 gift card + Dreamforce ticket          │
│                                                      │
│  Build the best Einstein GPT implementation          │
│                                                      │
│  Your submission: Not started                        │
│  Submissions so far: 23                              │
│                                                      │
│  [ Submit Entry ]  [ View Leaderboard ]              │
│                                                      │
└──────────────────────────────────────────────────────┘
```

**Engagement Points System:**
```
Event Participation Points:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Attend live session:       +50 pts
Complete hands-on lab:     +100 pts
Submit hackathon entry:    +200 pts
Win hackathon:             +500 pts
Form TrailBuild team:      +75 pts
Complete TrailBuild:       +300 pts

Redeem points in merch store!
```

**Slack Integration:**
- Auto-reminders 1 day before event
- Event channels created automatically
- Recording links shared after session

---

### **Stage 4: Ongoing Achievements**

**Component:** `ExplorerAchievements.tsx` (NEW)

**Progress Toward "Lifelong Learner" Badge:**
```
┌──────────────────────────────────────────────────────┐
│  🎯 Lifelong Learner Progress                        │
│                                                      │
│  [Progress Ring: 67%]                                │
│                                                      │
│  Requirements:                                        │
│  ✅ Active member for 6+ months (8 months)          │
│  ✅ Attended 10+ events (14 events)                 │
│  ✅ Completed 5+ skill refreshers (7 refreshers)    │
│  ⬜ Mentored 1+ learner (0 mentees)                 │
│  ⬜ Contributed to 3+ forums (2 posts)              │
│                                                      │
│  Almost there! Complete 2 more activities.           │
│                                                      │
└──────────────────────────────────────────────────────┘
```

**Alumni Spotlight Carousel:**
```
┌──────────────────────────────────────────────────────┐
│  ⭐ Alumni Spotlight                                 │
│                                                      │
│  [Photo] Jordan Kim                                  │
│  Trail of Mastery Graduate (2024)                    │
│  Now: Senior Salesforce Developer @ Nonprofit Inc.   │
│                                                      │
│  "Explorer's Journey helped me stay current and      │
│  connected. The workshops are invaluable!"           │
│                                                      │
│  [ Read Full Story ]  [ Next → ]                     │
│                                                      │
└──────────────────────────────────────────────────────┘
```

**LinkedIn Sharing:**
```
┌────────────────────────────────────┐
│  📱 Share Your Journey             │
│                                    │
│  Auto-generate LinkedIn posts:     │
│                                    │
│  • "I just completed my 5th       │
│    workshop with Transition        │
│    Trails Explorer's Journey!"     │
│                                    │
│  • "Excited to join the Einstein  │
│    GPT Hackathon! #Salesforce"     │
│                                    │
│  [ Generate Post ]                 │
│                                    │
└────────────────────────────────────┘
```

---

### **Stage 5: Re-engagement Hooks**

**Seasonal Recaps (Automated):**
```
┌──────────────────────────────────────────────────────┐
│  🎊 Your 2025 Year of Growth                         │
│                                                      │
│  Penny's personalized recap:                         │
│                                                      │
│  "What a year, [Name]!                               │
│                                                      │
│  You attended 18 workshops, completed 3 new trails,  │
│  and earned 6,200 engagement points.                 │
│                                                      │
│  You're in the top 10% of Explorer's Journey         │
│  members for community contributions!                │
│                                                      │
│  Here's to an even bigger 2026! 🚀"                 │
│                                                      │
│  [ View Full Recap ]  [ Share on LinkedIn ]          │
│                                                      │
└──────────────────────────────────────────────────────┘
```

**Slack Reminders:**
- Weekly digest of new content
- Monthly event calendar
- Streak notifications ("3-week engagement streak!")
- Skill refresh reminders

**Points Reset (Quarterly):**
```
Prestige System:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Every quarter, points reset BUT:

Your lifetime total is preserved
You earn a prestige star ⭐
Point earning rate increases 10%
Unlock exclusive "Prestige" badge

Q1 2025: ⭐ (1.1x multiplier)
Q2 2025: ⭐⭐ (1.2x multiplier)
Q3 2025: ⭐⭐⭐ (1.3x multiplier)
Q4 2025: ⭐⭐⭐⭐ (1.4x multiplier)
```

---

## 🎨 DESIGN GUIDANCE

### **Color Coding**

**Trail of Mastery:**
- Primary: Evergreen (#3B6A52) - Focus, mastery
- Secondary: Amber (#F9A03F) - Achievement, excellence
- Accent: Teal (#2C6975) - Advanced expertise
- Use: Gradients, progress bars, badges

**Explorer's Journey:**
- Primary: Sky Blue (#7EB5C1) - Growth, exploration
- Secondary: Teal (#2C6975) - Depth, continuity
- Accent: Cream (#F5F3E8) - Warmth, community
- Use: Feed items, event cards, stats

### **Imagery**

**Mastery:**
- Real learners collaborating in workspaces
- Mentor-mentee pairs in discussion
- Team project work sessions
- Code reviews and technical discussions
- Certification celebration moments

**Explorer:**
- Workshop attendance (virtual and in-person)
- Community members at events
- Hackathon teams coding together
- Alumni success stories
- Job placement celebrations

### **Layout Patterns**

**Mastery Dashboard:**
- Two-column layout
- Left: Primary progress (vertical flow)
- Right: Recommendations + community
- Sticky sidebar navigation
- Module cards stacked vertically

**Explorer Dashboard:**
- Feed-based design (like LinkedIn/Twitter)
- Infinite scroll
- Sidebar with stats + Penny
- Card-based content blocks
- Responsive masonry grid

### **Motion & Animation**

**Mastery:**
- Smooth fade-in transitions
- Progress bar animations (left-to-right)
- Badge reveal on completion (scale + fade)
- Confetti burst (subtle, professional)

**Explorer:**
- Feed item slide-in (staggered)
- Penny chat bubble float-in
- Event card hover effects
- Point counter animations

### **Penny Roles**

**Mastery = Advisor Mode:**
- Performance tracking language
- Optimization suggestions
- "Based on your progress..."
- "Your next priority is..."
- Data-driven recommendations

**Explorer = Motivator Mode:**
- Continuous learning encouragement
- Discovery language
- "Let's find something new..."
- "Have you tried..."
- Community connection prompts

---

## 📊 SALESFORCE DATA MODEL

### **Objects**

**Trail_Enrollment__c** (Enhanced)
```apex
Trail_Enrollment__c {
    User__c (Lookup)
    Trail_Type__c (Picklist: Visitor, Guided, Mastery, Explorer)
    Role_Track__c (Picklist: PO, Dev, Architect, BA)  // For Mastery
    Start_Date__c (Date)
    Status__c (Picklist: Enrolled, Active, Completed, Inactive)
    Prior_Trail__c (Lookup: Trail_Enrollment__c)
    Subscription_Type__c (Picklist: Monthly, Annual)  // For Explorer
}
```

**Trail_Mastery_Progress__c** (NEW)
```apex
Trail_Mastery_Progress__c {
    Enrollment__c (Lookup: Trail_Enrollment__c)
    User__c (Lookup: User)
    Current_Module__c (Number)
    Total_Modules__c (Number: 16)
    Progress_Percentage__c (Formula)
    Points_Earned__c (Number)
    Total_Points__c (Number: 3500)
    Certification_Readiness__c (Percent)
    Team_Project_Status__c (Picklist)
    Capstone_Status__c (Picklist)
    Mentor__c (Lookup: User)
    Cohort_Name__c (Text)
}
```

**Explorer_Activity__c** (NEW)
```apex
Explorer_Activity__c {
    User__c (Lookup: User)
    Activity_Type__c (Picklist: Workshop, Lab, Hackathon, TrailBuild, Forum, Job_Application)
    Activity_Name__c (Text)
    Activity_Date__c (DateTime)
    Points_Earned__c (Number)
    Event__c (Lookup: Event__c)  // Optional
    Status__c (Picklist: Registered, Attended, Completed, Missed)
}
```

**Badge__c** (Enhanced)
```apex
Badge__c {
    User__c (Lookup: User)
    Badge_Type__c (Picklist: Mastery_Role, Lifelong_Learner, Prestige, Community, etc.)
    Badge_Name__c (Text)
    Badge_Icon__c (Text: URL or emoji)
    Earned_Date__c (Date)
    Trail_Type__c (Picklist: Mastery, Explorer)
    Prestige_Level__c (Number)  // For quarterly prestige
}
```

**Engagement_Point__c** (Enhanced)
```apex
Engagement_Point__c {
    User__c (Lookup: User)
    Points__c (Number)
    Source__c (Picklist: Event, Workshop, Lab, Forum, Referral, Streak)
    Source_Record__c (Text: Polymorphic lookup)
    Transaction_Date__c (DateTime)
    Trail_Type__c (Picklist: Mastery, Explorer)
    Prestige_Multiplier__c (Decimal: 1.0-2.0)
}
```

### **Flows**

**1. PromoteToExplorer Flow**
```
Trigger: Trail_Enrollment__c (Status = 'Completed')
Criteria: Trail_Type__c = 'Mastery'

Actions:
1. Create new Trail_Enrollment__c (Trail_Type = 'Explorer')
2. Set Status = 'Trial' (3 months free)
3. Send welcome email with Explorer benefits
4. Create Slack invite
5. Award "Graduate" badge
```

**2. AssignMentor Flow**
```
Trigger: Trail_Enrollment__c (Trail_Type = 'Mastery')

Actions:
1. Query available mentors (Role_Track__c matches)
2. Find mentor with lowest learner count
3. Create Trail_Mastery_Progress__c
4. Assign Mentor__c
5. Send intro email (learner + mentor)
6. Create initial 1:1 Event__c
```

**3. RecordExplorerActivity Flow**
```
Trigger: Event__c (Type = 'Workshop' AND Status = 'Completed')

Actions:
1. For each attendee:
   - Create Explorer_Activity__c
   - Calculate points (base + prestige multiplier)
   - Create Engagement_Point__c
   - Check badge eligibility
2. Send follow-up survey
3. Post to community feed
```

---

## 🎯 COMPONENT ARCHITECTURE

### **New Components Needed**

**Mastery Components:**
1. **`MasteryEnrollmentModal.tsx`** - Enrollment form
2. **`MasteryOrientationPage.tsx`** - Orientation overview
3. **`MasteryDashboard.tsx`** - Main dashboard
4. **`MasteryCompletionPage.tsx`** - Celebration & next steps
5. **`CertificationTracker.tsx`** - Cert readiness widget
6. **`TeamProjectCard.tsx`** - Project status card
7. **`MentorConnectionCard.tsx`** - Mentor info widget

**Explorer Components:**
8. **`ExplorersWelcomePage.tsx`** - Welcome & pricing
9. **`ExplorerDashboard.tsx`** - Feed-based dashboard
10. **`ExplorerEventsHub.tsx`** - Events calendar
11. **`ExplorerAchievements.tsx`** - Progress tracking
12. **`JobBoardWidget.tsx`** - Job opportunities
13. **`SkillRefreshCard.tsx`** - Skill refresh prompts
14. **`LifelongLearnerMeter.tsx`** - Badge progress
15. **`PrestigeIndicator.tsx`** - Quarterly prestige display

### **Enhanced Components**

16. Enhance `TrailOfMastery.tsx` - Add mastery-specific features
17. Enhance `MyCapstone.tsx` - Add team project tabs
18. Enhance `PennyChat.tsx` - Add Advisor & Motivator modes
19. Enhance `BadgeSystem.tsx` - Add mastery & prestige badges

---

## 📱 RESPONSIVE DESIGN

### **Mastery Dashboard**

**Desktop (1024px+):**
- Two-column layout (66% / 33%)
- Sidebar navigation visible
- All modules in view

**Tablet (768px - 1023px):**
- Single column with collapsible sidebar
- Sticky header
- Module cards full width

**Mobile (< 768px):**
- Single column
- Bottom navigation bar
- Collapsible sections

### **Explorer Dashboard**

**Desktop:**
- Feed in center (max-width: 800px)
- Sidebar on right
- Infinite scroll

**Tablet:**
- Full-width feed
- Sidebar becomes horizontal scroll
- Compact stats

**Mobile:**
- Single column feed
- Sidebar hidden in drawer
- Sticky Penny widget

---

## ✅ IMPLEMENTATION CHECKLIST

### **Phase 1: Mastery Flow (Weeks 1-2)**
- [ ] Create `MasteryEnrollmentModal.tsx`
- [ ] Create `MasteryOrientationPage.tsx`
- [ ] Create `MasteryDashboard.tsx`
- [ ] Create `MasteryCompletionPage.tsx`
- [ ] Enhance `TrailOfMastery.tsx`
- [ ] Add Penny Advisor mode
- [ ] Implement team project integration
- [ ] Test complete mastery journey

### **Phase 2: Explorer Flow (Weeks 3-4)**
- [ ] Create `ExplorersWelcomePage.tsx`
- [ ] Create `ExplorerDashboard.tsx`
- [ ] Create `ExplorerEventsHub.tsx`
- [ ] Create `ExplorerAchievements.tsx`
- [ ] Create job board widget
- [ ] Add Penny Motivator mode
- [ ] Implement engagement points system
- [ ] Test complete explorer journey

### **Phase 3: Integration (Week 5)**
- [ ] Connect mastery → explorer transition
- [ ] Implement prestige system
- [ ] Add seasonal recaps
- [ ] Wire up Slack notifications
- [ ] Test end-to-end lifecycle

### **Phase 4: Polish (Week 6)**
- [ ] Mobile responsive testing
- [ ] Accessibility audit
- [ ] Performance optimization
- [ ] Documentation
- [ ] Launch!

---

## 📊 SUCCESS METRICS

### **Trail of Mastery**
```
Target Metrics:
├─ Enrollment rate:           30% of Guided graduates
├─ Completion rate:            75% complete all modules
├─ Certification pass rate:    85% pass target cert
├─ Mentor satisfaction:        90%+ rating
├─ Capstone quality:           4.5/5 avg score
└─ Job placement:              60% placed within 3 months
```

### **Explorer's Journey**
```
Target Metrics:
├─ Conversion rate:            40% of Mastery graduates
├─ Subscription retention:     75% renew after Year 1
├─ Event attendance:           65% attend monthly event
├─ Community engagement:       50 actions/month avg
├─ Job board success:          25% apply, 10% hired
└─ Lifetime value:             $1,200 avg per member
```

---

## 🎊 CONCLUSION

The **Trail of Mastery** and **Explorer's Journey** complete the full learner lifecycle at Transition Trails, creating pathways from curious beginner to expert practitioner to lifelong community member.

**Key Differentiators:**
- ✅ Role-specific mastery tracks
- ✅ Real-world team projects
- ✅ Mentor-guided learning
- ✅ Continuous engagement post-graduation
- ✅ Job placement support
- ✅ Prestige system for longevity
- ✅ Community-driven growth

**This creates a platform where learners never have to leave—they grow, contribute, and thrive for life!** 🚀

---

**Status:** Ready to implement  
**Next Step:** Build `MasteryEnrollmentModal` component  
**Timeline:** 6 weeks to complete both flows  

**LET'S BUILD THE COMPLETE JOURNEY! 🌟**
