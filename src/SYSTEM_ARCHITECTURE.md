# Transition Trails Academy - System Architecture & Integration Guide

**Version:** 1.0  
**Last Updated:** November 7, 2025  
**Platform:** Salesforce Experience Cloud (LWR)  
**Theme:** Light Mode  
**Status:** Production-Ready Architecture

---

## 📋 Table of Contents

1. [Executive Overview](#executive-overview)
2. [System Architecture](#system-architecture)
3. [Platform Stack](#platform-stack)
4. [Role-Based Access (Audiences)](#role-based-access-audiences)
5. [Content Management Strategy](#content-management-strategy)
6. [Integration Layer](#integration-layer)
7. [Data Model & Objects](#data-model--objects)
8. [Component Mapping](#component-mapping)
9. [Design System Guidelines](#design-system-guidelines)
10. [Development Workflow](#development-workflow)
11. [Testing & Quality Assurance](#testing--quality-assurance)
12. [Deployment Strategy](#deployment-strategy)

---

## 🎯 Executive Overview

### Purpose
This document serves as the **single source of truth** for developers, architects, and designers implementing the Transition Trails Digital Experience Portal. It defines the complete system architecture, integration patterns, data models, and implementation standards.

### Core Principles
- **Declarative-First:** Leverage Salesforce Experience Cloud native components with minimal custom code
- **CMS-Driven:** All content managed through Salesforce CMS workspace for non-technical updates
- **API-First:** Clean integration layer for external services (Stripe, GitHub, Slack, Linear)
- **Role-Based:** Audience-driven experiences with declarative visibility controls
- **Mobile-Responsive:** 12-column grid system with breakpoints for desktop/tablet/mobile
- **Accessible:** WCAG 2.1 AA compliance across all interfaces

---

## 🏗️ System Architecture

### High-Level Architecture Diagram

```
┌─────────────────────────────────────────────────────────────────┐
│                    SALESFORCE EXPERIENCE CLOUD (LWR)            │
│                                                                 │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐         │
│  │   Visitor    │  │   Learner    │  │    Coach     │         │
│  │  Experience  │  │  Experience  │  │  Experience  │         │
│  └──────────────┘  └──────────────┘  └──────────────┘         │
│                                                                 │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐         │
│  │   Partner    │  │   Sponsor    │  │    Admin     │         │
│  │  Experience  │  │  Experience  │  │  Experience  │         │
│  └──────────────┘  └──────────────┘  └──────────────┘         │
│                                                                 │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │              SALESFORCE CMS WORKSPACE                   │   │
│  │  (Content, Images, Videos, Text Blocks)                │   │
│  └─────────────────────────────────────────────────────────┘   │
│                                                                 │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │           CUSTOM OBJECTS & DATA MODEL                   │   │
│  │  (Trail__c, Project__c, TrailBuild_Event__c, etc.)    │   │
│  └─────────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────────┘
                              │
                              │ REST APIs / Platform Events
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│                    INTEGRATION LAYER                            │
│                                                                 │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────┐       │
│  │  Stripe  │  │  GitHub  │  │  Slack   │  │  Linear  │       │
│  │ Payment  │  │   Repos  │  │ Channels │  │ Projects │       │
│  └──────────┘  └──────────┘  └──────────┘  └──────────┘       │
│                                                                 │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐                     │
│  │   Viva   │  │Plural    │  │  Penny   │                     │
│  │ Learning │  │ Sight    │  │   AI     │                     │
│  └──────────┘  └──────────┘  └──────────┘                     │
└─────────────────────────────────────────────────────────────────┘
```

### Architecture Layers

#### 1. Presentation Layer (Experience Cloud)
- **Framework:** Lightning Web Runtime (LWR)
- **Rendering:** Server-side rendering with client-side hydration
- **Styling:** Salesforce Lightning Design System (SLDS) + Tailwind CSS utilities
- **Components:** Lightning Web Components (LWC) + React prototype components

#### 2. Business Logic Layer (Salesforce Platform)
- **Apex Controllers:** RESTful endpoints for external integrations
- **Flow Automation:** Declarative process automation (record creation, notifications, PDF generation)
- **Validation Rules:** Data quality enforcement
- **Triggers:** Event-driven automation (Slack channel creation, GitHub repo provisioning)

#### 3. Data Layer (Salesforce Objects)
- **Standard Objects:** User, Contact, Account, ContentVersion
- **Custom Objects:** Trail__c, Project__c, Capstone__c, TrailBuild_Event__c, Partner_Project__c, Badge__c
- **External Objects:** Stripe customers, GitHub repositories (via API)

#### 4. Integration Layer
- **REST APIs:** Outbound to Stripe, GitHub, Slack, Linear
- **Platform Events:** Asynchronous processing for integrations
- **Named Credentials:** Secure API authentication
- **Remote Site Settings:** Whitelisted external endpoints

---

## 🛠️ Platform Stack

### Core Technologies

| Component | Technology | Purpose |
|-----------|-----------|---------|
| **Frontend Platform** | Salesforce Experience Cloud (LWR) | Site hosting, authentication, role-based access |
| **Component Framework** | Lightning Web Components (LWC) | Production components |
| **Prototype Framework** | React 18 + TypeScript | Design prototypes, UI/UX validation |
| **Styling** | Salesforce Lightning Design System (SLDS) + Tailwind CSS v4 | Consistent UI, responsive design |
| **Content Management** | Salesforce CMS | Images, videos, text, marketing content |
| **Payment Processing** | Stripe | Checkout, subscriptions, point redemption |
| **Project Management** | Linear + GitHub | Capstone projects, code repositories |
| **Communication** | Slack | Partner project channels, team collaboration |
| **Learning Content** | Viva Learning + PluralSight | Curriculum integration (12-week Guided Trail) |
| **AI Assistant** | Penny AI Agent | Context-aware guidance across 3 modes |
| **Analytics** | Salesforce Reports & Dashboards | Learning progress, engagement metrics |

### Environment Setup

```yaml
Production:
  URL: trails.force.com/s
  CMS Workspace: Transition_Trails_Content
  Stripe Mode: Live
  
Sandbox:
  URL: trails--sandbox.sandbox.my.site.com/s
  CMS Workspace: Transition_Trails_Content_Sandbox
  Stripe Mode: Test
  
Development:
  URL: trails--dev.sandbox.my.site.com/s
  CMS Workspace: Transition_Trails_Content_Dev
  Stripe Mode: Test
```

---

## 👥 Role-Based Access (Audiences)

### Audience Definition

Salesforce Experience Cloud uses **Audiences** to control feature visibility and content delivery. Each audience has specific permissions and sees a tailored experience.

| Audience | Profile | Primary Use Case | Key Features |
|----------|---------|------------------|--------------|
| **Visitor** | Guest User | Public website exploration, pre-enrollment | Landing page, 3-Path learning intro, free resources, event calendar |
| **Learner** | Learner Community | Active program participant | Guided Trail, Capstone projects, skill assessments, gamification |
| **Coach** | Coach Community | Mentorship and feedback | Coach dashboard, learner progress, bi-weekly assessments |
| **Partner** | Partner Community | Real-world project collaboration | Partner Board, project briefs, team workspace |
| **Sponsor** | Partner Community Plus | TrailBuild Summit sponsorship | Event branding, attendee access, sponsor dashboard |
| **Admin** | System Administrator | Program management | User management, content updates, analytics |

### Audience Control Implementation

#### Declarative (Preferred)
```yaml
Component: Record List (Projects)
Audience Targeting:
  - Visible to: Learner, Coach, Partner, Admin
  - Hidden from: Visitor, Sponsor
  
Component: CMS Collection (Blog Posts)
Audience Targeting:
  - Visible to: All Audiences
  - Filter by: Content Tag = "Public"
```

#### Programmatic (When Necessary)
```apex
// Apex Controller Method
@AuraEnabled(cacheable=true)
public static List<Project__c> getProjects() {
    String userType = UserInfo.getUserType();
    
    if (userType == 'Guest') {
        return new List<Project__c>(); // No access
    } else if (userType == 'CommunityUser') {
        return [SELECT Id, Name FROM Project__c WHERE OwnerId = :UserInfo.getUserId()];
    }
    // Additional role logic...
}
```

### Figma Prototype Implementation
All prototype components should accept a `userRole` prop for testing different audience experiences:

```tsx
interface NavigationProps {
  userRole: 'visitor' | 'learner' | 'coach' | 'partner' | 'sponsor' | 'admin';
}

export function Navigation({ userRole }: NavigationProps) {
  const showProjects = ['learner', 'coach', 'partner', 'admin'].includes(userRole);
  const showAdminPanel = userRole === 'admin';
  
  return (
    <nav>
      {/* Conditional rendering based on role */}
    </nav>
  );
}
```

---

## 📝 Content Management Strategy

### CMS Architecture

All content is managed through **Salesforce CMS Workspace** to enable non-technical updates without code deployment.

#### CMS Content Types

| Content Type | Fields | Usage Example |
|--------------|--------|---------------|
| **News** | Title, Body, Image, Date, Author | Landing page announcements, blog posts |
| **Media** | Title, Image/Video, Alt Text, Caption | Hero images, video tutorials |
| **Document** | Title, File, Category, Description | PDF guides, templates |
| **Custom: Trail_Module** | Module Name, Description, Points, Duration | Learning curriculum modules |
| **Custom: Badge_Info** | Badge Name, Icon, Requirements | Gamification badge details |

#### CMS Reference Pattern

All prototype components should use **CMS placeholder syntax** to indicate content sources:

```tsx
// ❌ Bad: Hard-coded content
<h1>Welcome to Transition Trails</h1>
<img src="/images/hero.jpg" alt="Hero" />

// ✅ Good: CMS-referenced content
<h1>[CMS:homepage_hero_title]</h1>
<img src="[CMS:homepage_hero_image]" alt="[CMS:homepage_hero_image_alt]" />
```

#### CMS Developer Mapping

When implementing in Salesforce, developers should:

1. Create CMS content items matching placeholder names
2. Use **CMS Connect** in Experience Builder to bind content
3. Reference via `{!contentItem.title}` in Lightning components

```html
<!-- LWC Template -->
<template>
    <div class="hero-section">
        <h1>{contentTitle}</h1>
        <img src={contentImageUrl} alt={contentImageAlt} />
    </div>
</template>
```

```javascript
// LWC JavaScript
import { LightningElement, wire } from 'lwc';
import { getRecord } from 'lightning/uiRecordApi';

export default class HeroSection extends LightningElement {
    @wire(getRecord, { contentId: 'homepage_hero', fields: ['title', 'imageUrl', 'imageAlt'] })
    contentData;
    
    get contentTitle() {
        return this.contentData?.data?.fields?.title?.value;
    }
}
```

---

## 🔗 Integration Layer

### 1. Stripe Payment Integration

#### Architecture
- **Mode:** Stripe Checkout (hosted payment page)
- **Connection:** Named Credential + Remote Site Setting
- **Flow:** User clicks "Checkout" → Apex creates Stripe Session → Redirect to Stripe → Webhook processes result

#### Implementation Pattern

```apex
// Apex REST Endpoint
@RestResource(urlMapping='/stripe/checkout/*')
global class StripeCheckoutController {
    
    @HttpPost
    global static String createCheckoutSession(String productId, Decimal pointsDiscount) {
        // 1. Retrieve product from Stripe
        HttpRequest req = new HttpRequest();
        req.setEndpoint('callout:Stripe_API/v1/prices/' + productId);
        req.setMethod('GET');
        
        Http http = new Http();
        HttpResponse res = http.send(req);
        
        // 2. Calculate final price (member discount, points redemption)
        Decimal basePrice = parsePrice(res.getBody());
        Decimal finalPrice = applyDiscounts(basePrice, pointsDiscount);
        
        // 3. Create Stripe Checkout Session
        HttpRequest sessionReq = new HttpRequest();
        sessionReq.setEndpoint('callout:Stripe_API/v1/checkout/sessions');
        sessionReq.setMethod('POST');
        sessionReq.setBody('price=' + finalPrice + '&success_url=' + getSuccessUrl());
        
        HttpResponse sessionRes = http.send(sessionReq);
        
        return sessionRes.getBody(); // Returns session URL
    }
}
```

#### Figma Component Annotation
```tsx
// Component: MerchStore.tsx
// Salesforce Mapping: ExpPage_Shop
// Stripe Integration: createCheckoutSession() Apex method
// Flow: User clicks "Buy Now" → Trigger Flow → Apex callout → Redirect

<Button onClick={handleCheckout}>
  {/* Developer Note: Calls Flow: Create_Stripe_Checkout */}
  Buy Now - ${finalPrice}
</Button>
```

#### Required Salesforce Setup
- **Named Credential:** `Stripe_API` (stores API key securely)
- **Remote Site:** `https://api.stripe.com`
- **Custom Setting:** `Stripe_Configuration__c` (webhook secret, publishable key)
- **Platform Event:** `Stripe_Webhook_Event__e` (processes async webhooks)

---

### 2. GitHub Repository Integration

#### Architecture
- **Purpose:** Each Capstone and Partner Project gets a dedicated GitHub repository
- **Provisioning:** Auto-created via GitHub API when project is created
- **Access:** Repository link stored in `Project__c.Repo_Link__c` field

#### Repository Naming Convention
```
Format: transition-trails-[project-type]-[project-id]

Examples:
- transition-trails-capstone-a0X5e000001Abcd
- transition-trails-partner-nonprofit-housing-connect
```

#### Folder Structure (Enforced via Template)
```
/project-root
  ├── /docs              # Documentation, requirements, deliverables
  ├── /code              # Source code
  ├── /assets            # Images, design files, media
  ├── /tests             # Test files, QA scripts
  ├── README.md          # Project overview
  └── .gitignore
```

#### Implementation Pattern

```apex
// Apex Service: GitHubIntegrationService.cls
public class GitHubIntegrationService {
    
    public static String createRepository(String projectName, Id projectId) {
        String repoName = 'transition-trails-' + formatProjectName(projectName);
        
        HttpRequest req = new HttpRequest();
        req.setEndpoint('callout:GitHub_API/orgs/transition-trails/repos');
        req.setMethod('POST');
        req.setHeader('Content-Type', 'application/json');
        req.setBody(JSON.serialize(new Map<String, Object>{
            'name' => repoName,
            'description' => 'Transition Trails Project: ' + projectName,
            'private' => false,
            'auto_init' => true,
            'gitignore_template' => 'Node'
        }));
        
        Http http = new Http();
        HttpResponse res = http.send(req);
        
        if (res.getStatusCode() == 201) {
            Map<String, Object> repoData = (Map<String, Object>) JSON.deserializeUntyped(res.getBody());
            String repoUrl = (String) repoData.get('html_url');
            
            // Update Project record
            Project__c project = new Project__c(
                Id = projectId,
                Repo_Link__c = repoUrl
            );
            update project;
            
            return repoUrl;
        }
        return null;
    }
}
```

#### Trigger: Auto-Create on Project Insert

```apex
// Trigger: ProjectTrigger
trigger ProjectTrigger on Project__c (after insert) {
    if (Trigger.isAfter && Trigger.isInsert) {
        for (Project__c proj : Trigger.new) {
            // Queue GitHub repo creation
            System.enqueueJob(new CreateGitHubRepoQueueable(proj.Id, proj.Name));
        }
    }
}
```

#### Figma Component Annotation
```tsx
// Component: MyCapstone.tsx
// GitHub Field: Project__c.Repo_Link__c
// Auto-created on project creation via ProjectTrigger

<Button onClick={() => window.open(project.repoUrl)}>
  {/* Opens GitHub repository */}
  <GitHubIcon /> View Repository
</Button>
```

---

### 3. Slack Channel Integration

#### Architecture
- **Purpose:** Each Partner Project gets a dedicated Slack channel for client collaboration
- **Channel Naming:** `project-[project-id]` (e.g., `project-a0x5e000001abcd`)
- **Members:** Auto-invite project team, partner contact, coach
- **Penny Integration:** AI summaries posted to channel daily

#### Implementation Pattern

```apex
// Apex Service: SlackIntegrationService.cls
public class SlackIntegrationService {
    
    public static String createProjectChannel(Id projectId, String projectName, List<Id> teamMemberIds) {
        String channelName = 'project-' + projectId.to15();
        
        // 1. Create Slack channel
        HttpRequest req = new HttpRequest();
        req.setEndpoint('callout:Slack_API/conversations.create');
        req.setMethod('POST');
        req.setHeader('Content-Type', 'application/json');
        req.setBody(JSON.serialize(new Map<String, Object>{
            'name' => channelName,
            'is_private' => false
        }));
        
        Http http = new Http();
        HttpResponse res = http.send(req);
        
        Map<String, Object> channelData = (Map<String, Object>) JSON.deserializeUntyped(res.getBody());
        String channelId = (String) ((Map<String, Object>) channelData.get('channel')).get('id');
        
        // 2. Invite team members
        for (Id memberId : teamMemberIds) {
            inviteMember(channelId, getSlackUserId(memberId));
        }
        
        // 3. Post welcome message
        postMessage(channelId, 'Welcome to ' + projectName + '! 🎉 This channel is for project collaboration.');
        
        // 4. Store channel link
        Partner_Project__c project = new Partner_Project__c(
            Id = projectId,
            Slack_Channel_Id__c = channelId,
            Slack_Channel_Link__c = 'https://transition-trails.slack.com/archives/' + channelId
        );
        update project;
        
        return channelId;
    }
    
    public static void postPennySummary(Id projectId, String summaryText) {
        Partner_Project__c project = [SELECT Slack_Channel_Id__c FROM Partner_Project__c WHERE Id = :projectId];
        
        postMessage(project.Slack_Channel_Id__c, ':robot_face: *Penny Daily Summary*\n' + summaryText);
    }
}
```

#### Figma Component Annotation
```tsx
// Component: PartnerBoard.tsx
// Slack Integration: Auto-creates channel on project acceptance
// Field: Partner_Project__c.Slack_Channel_Link__c

<div className="project-card">
  <a href={project.slackChannelLink} target="_blank">
    <SlackIcon className="w-4 h-4" />
    Open Slack Channel
  </a>
</div>
```

---

### 4. Linear Project Management Integration

#### Architecture
- **Purpose:** Capstone projects use Linear for task management, sprints, and GitHub integration
- **Provisioning:** Manual (Linear workspace shared, team creates project)
- **GitHub Sync:** Linear issues auto-link to GitHub commits
- **Field Storage:** `Capstone__c.Linear_Project_Link__c`

#### Developer Notes
Linear integration is **not automated** via API. Instead:
1. Team manually creates Linear project
2. Copies Linear project URL into Capstone record
3. Linear's native GitHub integration syncs commits → issues

No custom Apex required; Linear handles GitHub webhook subscription.

---

### 5. Branded PDF Generation

#### Architecture
- **Purpose:** Generate professional deliverables (project summaries, certificates, partner briefs)
- **Method:** Salesforce Flow → Visualforce PDF → ContentVersion
- **Template:** Transition Trails header, logo, project metadata

#### Visualforce Template Example

```html
<!-- Visualforce Page: ProjectSummaryPDF -->
<apex:page renderAs="pdf" standardController="Project__c" applyBodyTag="false">
  <head>
    <style>
      @page {
        size: letter;
        margin: 1in;
        @top-center {
          content: element(header);
        }
      }
      .header {
        position: running(header);
        text-align: center;
        border-bottom: 2px solid #2C6975;
        padding-bottom: 10px;
      }
      .logo {
        width: 150px;
      }
      body {
        font-family: 'Salesforce Sans', Arial, sans-serif;
        color: #333;
      }
      .title {
        color: #2C6975;
        font-size: 24pt;
        margin-top: 20px;
      }
    </style>
  </head>
  <body>
    <div class="header">
      <img src="{!$Resource.TransitionTrailsLogo}" class="logo" alt="Transition Trails" />
      <p>Transition Trails Academy | Project Summary</p>
    </div>
    
    <h1 class="title">{!Project__c.Name}</h1>
    <p><strong>Team:</strong> {!Project__c.Team_Name__c}</p>
    <p><strong>Duration:</strong> {!Project__c.Start_Date__c} - {!Project__c.End_Date__c}</p>
    
    <h2>Project Summary</h2>
    <p>{!Project__c.Summary__c}</p>
    
    <h2>Key Deliverables</h2>
    <p>{!Project__c.Deliverables__c}</p>
  </body>
</apex:page>
```

#### Flow: Generate PDF

```yaml
Flow Name: Generate_Project_PDF
Trigger: Manual (Button on Project record)
Steps:
  1. Get Project Record (Id from button)
  2. Create Content Version:
      - Title: "{Project.Name} - Summary.pdf"
      - PathOnClient: "Summary.pdf"
      - VersionData: [Call Visualforce: ProjectSummaryPDF]
      - FirstPublishLocationId: {Project.Id}
  3. Update Project:
      - Latest_PDF__c: {ContentVersion.Id}
  4. Send Email:
      - To: Project team
      - Attachment: PDF file
```

#### Figma Component Annotation
```tsx
// Component: MyCapstone.tsx
// PDF Generation: Flow "Generate_Project_PDF"
// Triggers on button click

<Button onClick={handleGeneratePDF}>
  {/* Developer: Triggers Flow via LWC action */}
  <FileText className="w-4 h-4 mr-2" />
  Generate PDF Summary
</Button>
```

---

## 📊 Data Model & Objects

### Custom Object Schema

#### 1. Trail__c (Learning Trail)
```yaml
Object: Trail__c
Label: Trail
Fields:
  - Name (Text, 80) - Auto-number: TRAIL-{0000}
  - Status__c (Picklist) - Not Started, In Progress, Completed, On Hold
  - Start_Date__c (Date)
  - Target_Completion_Date__c (Date)
  - Actual_Completion_Date__c (Date)
  - Total_Points_Earned__c (Number) - Rollup from modules
  - Current_Week__c (Number) - 1-12
  - Learner__c (Lookup: User)
  - Coach__c (Lookup: User)
  - Progress_Percentage__c (Formula) - (Completed_Modules / Total_Modules) * 100

Relationships:
  - Trail_Modules__r (Children: Trail_Module__c)
  - Assessments__r (Children: Assessment__c)
  - Badges__r (Many-to-Many: Badge_Award__c)
```

#### 2. Project__c (Capstone & Partner Projects)
```yaml
Object: Project__c
Label: Project
Fields:
  - Name (Text, 120)
  - Project_Type__c (Picklist) - Capstone, Partner, Team
  - Status__c (Picklist) - Planning, Active, Testing, Completed, Archived
  - Description__c (Long Text Area)
  - Repo_Link__c (URL) - GitHub repository
  - Linear_Project_Link__c (URL) - Linear workspace
  - Start_Date__c (Date)
  - End_Date__c (Date)
  - Team_Name__c (Text, 80)
  - Points_Value__c (Number) - Points awarded on completion
  - Submission_Date__c (DateTime)
  - Latest_PDF__c (Lookup: ContentVersion)
  
Relationships:
  - Team_Members__r (Many-to-Many: Project_Team__c → User)
  - Tasks__r (Children: Project_Task__c)
  - Deliverables__r (Children: Project_Deliverable__c)
```

#### 3. Partner_Project__c
```yaml
Object: Partner_Project__c
Label: Partner Project
Extends: Project__c (or has Master-Detail)
Fields:
  - Partner_Organization__c (Lookup: Account)
  - Partner_Contact__c (Lookup: Contact)
  - Project_Brief__c (Long Text Area)
  - Required_Skills__c (Multi-Select Picklist) - Frontend, Backend, Design, QA
  - Team_Size__c (Number) - 3-5 team members
  - Budget__c (Currency)
  - Slack_Channel_Id__c (Text, 50)
  - Slack_Channel_Link__c (URL)
  - Client_Facing__c (Checkbox) - True if external deliverable
  - Impact_Category__c (Picklist) - Nonprofit, Small Business, Community
```

#### 4. TrailBuild_Event__c
```yaml
Object: TrailBuild_Event__c
Label: TrailBuild Summit Event
Fields:
  - Name (Text, 120) - e.g., "TrailBuild Summit Fall 2025"
  - Event_Date__c (Date)
  - Status__c (Picklist) - Upcoming, Registration Open, In Progress, Completed
  - Max_Attendees__c (Number)
  - Current_Attendees__c (Rollup Count)
  - Event_Type__c (Picklist) - Virtual, Hybrid
  - Description__c (Rich Text Area)
  - Zoom_Link__c (URL)
  - Slack_Channel__c (Text, 50)
  
Relationships:
  - Registrations__r (Children: TrailBuild_Registration__c)
  - Projects__r (Children: TrailBuild_Project__c)
  - Sponsors__r (Many-to-Many: Event_Sponsor__c → Account)
```

#### 5. Badge__c (Gamification)
```yaml
Object: Badge__c
Label: Badge
Fields:
  - Name (Text, 80) - e.g., "TrailBuilder Bronze"
  - Badge_Type__c (Picklist) - Trail Progress, Event, Community, Skill, Special
  - Icon_URL__c (URL) - CMS image reference
  - Description__c (Text Area)
  - Points_Required__c (Number)
  - Requirements__c (Long Text Area) - Markdown formatting
  
Relationships:
  - Badge_Awards__r (Children: Badge_Award__c → User)
```

#### 6. Points_Transaction__c
```yaml
Object: Points_Transaction__c
Label: Points Transaction
Fields:
  - User__c (Lookup: User) - Required
  - Points__c (Number) - Can be positive or negative
  - Transaction_Type__c (Picklist) - Earned, Redeemed, Bonus, Penalty
  - Source__c (Picklist) - Module Completion, Event Attendance, Purchase, Referral
  - Description__c (Text, 255)
  - Related_Record_Id__c (Text, 18) - Generic lookup to any record
  - Transaction_Date__c (DateTime) - Auto: NOW()
  
Indexes:
  - User__c, Transaction_Date__c (for leaderboard queries)
```

### Object Relationships Diagram

```
User
  ├── Trail__c (1:1 active trail)
  ├── Project__c (Many:Many via Project_Team__c)
  ├── Badge_Award__c (Many:Many)
  ├── Points_Transaction__c (1:Many)
  └── Coach_Assignment__c (1:Many as coach)

Trail__c
  ├── Trail_Module__c (1:Many)
  ├── Assessment__c (1:Many)
  └── User (Learner + Coach)

Project__c
  ├── Project_Team__c (Many:Many to User)
  ├── Project_Task__c (1:Many)
  └── Project_Deliverable__c (1:Many)

TrailBuild_Event__c
  ├── TrailBuild_Registration__c (1:Many)
  ├── TrailBuild_Project__c (1:Many)
  └── Event_Sponsor__c (Many:Many to Account)
```

---

## 🎨 Component Mapping

### Experience Cloud Page Structure

| Page Name | URL Path | Primary Audience | React Prototype | Salesforce Object |
|-----------|----------|------------------|-----------------|-------------------|
| **Landing** | `/` | Visitor | `VisitorLanding.tsx` | CMS Content |
| **Learning Center** | `/learning` | Visitor, Learner | `VisitorLearningCenter.tsx` / `LearningCenter.tsx` | Trail__c, CMS |
| **Learner Home** | `/home` | Learner | `LearnerHome.tsx` | Trail__c, User |
| **Projects Hub** | `/projects` | Learner, Coach, Partner | `ProjectsHub.tsx` | Project__c |
| **My Capstone** | `/projects/capstone` | Learner | `MyCapstone.tsx` | Project__c |
| **Partner Board** | `/projects/partners` | Learner, Partner | `PartnerBoard.tsx` | Partner_Project__c |
| **Team Projects** | `/projects/teams` | Learner | `TeamProjects.tsx` | Project__c |
| **TrailBuild Summit** | `/trailbuild` | All | `TrailBuildSummit.tsx` | TrailBuild_Event__c |
| **Coach Dashboard** | `/coach` | Coach | `CoachDashboard.tsx` | Trail__c, Assessment__c |
| **Community** | `/community` | Learner, Coach | `Community.tsx` | User, Post__c |
| **Merch Store** | `/shop` | Learner | `MerchStore.tsx` | Product2, Stripe |
| **Profile** | `/profile` | Learner | `Profile.tsx` | User, Contact |
| **Admin Panel** | `/admin` | Admin | `AdminPanel.tsx` | User, Trail__c, Project__c |

### Component-to-LWC Mapping

When converting React prototypes to production Lightning Web Components:

```tsx
// React Prototype: LearnerHome.tsx
export default function LearnerHome({ userRole }) {
  return (
    <div className="learner-home">
      <TrailProgress />
      <CommunityEngagementMeter />
      <UpcomingMilestones />
    </div>
  );
}

// LWC Implementation: learnerHome.html
<template>
  <div class="learner-home">
    <c-trail-progress user-id={userId}></c-trail-progress>
    <c-community-engagement-meter user-id={userId}></c-community-engagement-meter>
    <c-upcoming-milestones user-id={userId}></c-upcoming-milestones>
  </div>
</template>

// LWC JavaScript: learnerHome.js
import { LightningElement, wire } from 'lwc';
import { getRecord } from 'lightning/uiRecordApi';
import USER_ID from '@salesforce/user/Id';

export default class LearnerHome extends LightningElement {
    userId = USER_ID;
    
    @wire(getRecord, { recordId: '$userId', fields: ['User.Name'] })
    user;
}
```

### Figma Frame Naming Convention

When creating Figma prototypes, use this naming structure for developer handoff:

```
Format: [ExpPage]_[PageName]_[Variant]_[State]

Examples:
- ExpPage_Home_Learner_Default
- ExpPage_Home_Learner_Mobile
- ExpPage_Projects_Desktop_Loading
- ExpPage_Shop_Checkout_Success
- ExpPage_Admin_Desktop_Expanded
```

This maps directly to:
- **Experience Page:** The Salesforce page
- **Variant:** Audience or device type
- **State:** Interactive state (default, loading, error, success)

---

## 🎨 Design System Guidelines

### Salesforce Lightning Design System (SLDS)

All components must follow SLDS guidelines to ensure consistency with Salesforce platform aesthetics.

#### Core Design Tokens

```css
/* Brand Colors */
--color-brand-primary: #2C6975;    /* Teal */
--color-brand-secondary: #F9A03F;  /* Orange */
--color-brand-accent-1: #7EB5C1;   /* Sky Blue */
--color-brand-accent-2: #3B6A52;   /* Green */
--color-background-light: #F5F3E8; /* Cream */

/* SLDS Tokens (use these for UI components) */
--slds-c-button-brand-color-background: #2C6975;
--slds-c-button-brand-color-border: #2C6975;
--slds-c-card-color-background: #FFFFFF;
--slds-c-card-radius-border: 0.25rem;
```

#### Typography Scale

**DO NOT** override these with Tailwind classes unless specifically requested:

```css
/* globals.css - Already configured */
h1 { font-size: 2rem; font-weight: 700; line-height: 1.2; }
h2 { font-size: 1.5rem; font-weight: 600; line-height: 1.3; }
h3 { font-size: 1.25rem; font-weight: 600; line-height: 1.4; }
p  { font-size: 1rem; font-weight: 400; line-height: 1.5; }
```

#### Responsive Grid System

Use **12-column grid** with these breakpoints:

```css
/* Breakpoints */
--mobile: 320px - 767px   (12 columns, 16px margins)
--tablet: 768px - 1023px  (12 columns, 40px margins)
--desktop: 1024px+        (12 columns, 80px margins)

/* Tailwind Implementation */
.container {
  @apply px-4 md:px-10 lg:px-20;
  max-width: 1440px;
  margin: 0 auto;
}
```

#### Spacing Scale

```yaml
Space-1: 4px   (Tailwind: space-x-1, gap-1)
Space-2: 8px   (Tailwind: space-x-2, gap-2)
Space-3: 12px  (Tailwind: space-x-3, gap-3)
Space-4: 16px  (Tailwind: space-x-4, gap-4)
Space-6: 24px  (Tailwind: space-x-6, gap-6)
Space-8: 32px  (Tailwind: space-x-8, gap-8)
Space-12: 48px (Tailwind: space-x-12, gap-12)
```

### Animation Guidelines

- **Duration:** Maximum 200ms for UI transitions
- **Easing:** Use `ease-in-out` for most animations
- **Accessibility:** Respect `prefers-reduced-motion`

```tsx
// ✅ Good animation
<motion.div
  initial={{ opacity: 0, y: 10 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.2, ease: "easeInOut" }}
>
  Content
</motion.div>

// ❌ Bad animation (too long, flashy)
<motion.div
  animate={{ scale: [1, 1.5, 1], rotate: 360 }}
  transition={{ duration: 1, repeat: Infinity }}
>
  Content
</motion.div>
```

### Accessibility Requirements

All components must meet **WCAG 2.1 AA** standards:

#### Color Contrast
- **Normal text:** 4.5:1 minimum
- **Large text (18pt+):** 3:1 minimum
- **UI components:** 3:1 minimum

```tsx
// ✅ Good contrast
<div className="bg-[#2C6975] text-white"> {/* 7.2:1 ratio */}

// ❌ Poor contrast
<div className="bg-[#7EB5C1] text-white"> {/* 2.1:1 ratio */}
```

#### Keyboard Navigation
- All interactive elements must be keyboard accessible
- Visible focus indicators required
- Logical tab order

```tsx
<Button
  className="focus:outline-none focus:ring-2 focus:ring-[#F9A03F] focus:ring-offset-2"
  tabIndex={0}
>
  Accessible Button
</Button>
```

#### ARIA Labels
```tsx
<button aria-label="Close modal">
  <X className="w-4 h-4" />
</button>

<img src={imageUrl} alt="Learner progress dashboard showing 75% completion" />

<nav aria-label="Main navigation">
  <ul role="menubar">
    <li role="none">
      <a role="menuitem" href="/home">Home</a>
    </li>
  </ul>
</nav>
```

---

## 🔧 Development Workflow

### Local Development (React Prototypes)

1. **Clone Repository**
   ```bash
   git clone https://github.com/transition-trails/digital-experience
   cd digital-experience
   npm install
   ```

2. **Run Dev Server**
   ```bash
   npm run dev
   # Prototype available at http://localhost:3000
   ```

3. **Test Different Roles**
   ```tsx
   // In App.tsx, toggle between roles
   const [userRole, setUserRole] = useState<'visitor' | 'learner' | 'coach'>('learner');
   ```

4. **Component Development**
   - Create new components in `/components`
   - Use existing shadcn/ui components from `/components/ui`
   - Follow CMS placeholder pattern: `[CMS:asset_name]`
   - Add Salesforce mapping comments:
     ```tsx
     // Salesforce Object: Trail__c
     // Experience Page: ExpPage_Home
     // Apex Controller: TrailProgressController
     ```

### Salesforce Development (Production Implementation)

1. **Setup Scratch Org**
   ```bash
   sf org create scratch -f config/project-scratch-def.json -a trails-dev
   sf project deploy start --source-path force-app
   ```

2. **Create Custom Objects**
   - Use Object Manager to create custom objects from data model
   - Set up fields, relationships, validation rules
   - Configure page layouts for each profile

3. **Build LWC Components**
   ```bash
   sf lightning generate component -n learnerHome -d force-app/main/default/lwc
   ```

4. **Configure Experience Cloud**
   - Create site from LWR template
   - Set up audiences (Visitor, Learner, Coach, etc.)
   - Add LWC components to pages via Experience Builder
   - Configure audience targeting rules

5. **Test Integrations**
   - Stripe: Test Mode API keys
   - GitHub: Personal Access Token for testing
   - Slack: Create test workspace

### Git Workflow

```bash
# Feature branch naming
git checkout -b feature/partner-board-unlock
git checkout -b fix/navigation-dropdown-mobile
git checkout -b integration/stripe-checkout

# Commit message format
git commit -m "feat(partner-board): Add unlock flow with points deduction"
git commit -m "fix(navigation): Resolve mobile dropdown overflow issue"
git commit -m "integration(stripe): Implement checkout session API"

# Pull request template
Title: [FEATURE] Partner Board Unlock Flow
Description:
- Implements unlock functionality with 500 points cost
- Adds confirmation modal
- Updates points balance in real-time
- Salesforce mapping: Partner_Project__c, Points_Transaction__c
```

---

## 🧪 Testing & Quality Assurance

### Frontend Testing (React Prototypes)

#### Unit Tests (Jest + React Testing Library)
```tsx
// __tests__/CommunityEngagementMeter.test.tsx
import { render, screen } from '@testing-library/react';
import { CommunityEngagementMeter } from '@/components/CommunityEngagementMeter';

describe('CommunityEngagementMeter', () => {
  it('displays correct engagement level', () => {
    render(<CommunityEngagementMeter posts={8} comments={12} reactions={25} />);
    expect(screen.getByText(/Engaged/i)).toBeInTheDocument();
  });
  
  it('shows upgrade prompt when below threshold', () => {
    render(<CommunityEngagementMeter posts={1} comments={0} reactions={2} />);
    expect(screen.getByText(/Stay Engaged/i)).toBeInTheDocument();
  });
});
```

#### Accessibility Testing
```bash
# Install axe-core
npm install --save-dev @axe-core/react

# Run accessibility audit
npm run test:a11y
```

### Backend Testing (Salesforce)

#### Apex Test Classes
```apex
@isTest
private class StripeCheckoutControllerTest {
    
    @isTest
    static void testCreateCheckoutSession() {
        // Setup test data
        User learner = TestDataFactory.createLearner();
        Product2 product = TestDataFactory.createProduct('Trail Hat', 25.00);
        
        Test.startTest();
        
        // Mock HTTP callout
        Test.setMock(HttpCalloutMock.class, new StripeCheckoutMock());
        
        // Call Apex method
        String sessionUrl = StripeCheckoutController.createCheckoutSession(
            product.Id, 
            500 // points discount
        );
        
        Test.stopTest();
        
        // Assertions
        System.assertNotEquals(null, sessionUrl);
        System.assert(sessionUrl.contains('stripe.com'));
    }
}
```

#### Test Coverage Requirements
- **Apex Code:** 75% minimum (Salesforce requirement)
- **LWC JavaScript:** 80% minimum (Jest)
- **Critical Paths:** 100% (payments, data updates)

### User Acceptance Testing (UAT)

#### UAT Test Plan Template

```yaml
Test Case: TC-001 - Learner Home Dashboard Load
Audience: Learner
Preconditions: 
  - User enrolled in Guided Trail
  - Completed at least 2 modules
Steps:
  1. Log in as learner
  2. Navigate to Home page
  3. Verify Trail Progress shows correct percentage
  4. Verify Community Engagement Meter displays
  5. Verify upcoming milestones are visible
Expected Result: All dashboard components load within 2 seconds
Status: [Pass/Fail]
Tested By: [Name]
Date: [Date]
```

#### Critical UAT Scenarios

1. **Visitor → Learner Conversion**
   - Complete 3-Path Learning intro
   - Unlock Exploration Trail
   - Redeem 200 points for discount
   - Purchase membership via Stripe

2. **Capstone Project Lifecycle**
   - Create capstone project
   - Verify GitHub repo auto-created
   - Add tasks in Linear
   - Submit for review
   - Generate PDF deliverable

3. **Partner Project Collaboration**
   - Browse Partner Board (locked)
   - Unlock with 500 points
   - Apply to project
   - Get accepted → Slack channel created
   - Collaborate with team
   - Submit final deliverable

4. **TrailBuild Summit Registration**
   - Register for event
   - Receive TrailBuilder Bronze badge
   - Join event workspace
   - Access Penny TrailBuild Coordinator mode

---

## 🚀 Deployment Strategy

### Environments

```yaml
Development:
  Purpose: Active feature development
  Refresh: Weekly from Sandbox
  Users: Developers, QA
  
Sandbox:
  Purpose: Integration testing, UAT
  Refresh: Bi-weekly from Production
  Users: QA, Product Team, Selected Learners
  
Production:
  Purpose: Live platform
  Deployment Window: Saturdays 10 PM - 12 AM PST
  Users: All live users
```

### Deployment Checklist

#### Pre-Deployment
- [ ] All Apex tests passing (75%+ coverage)
- [ ] UAT signed off by Product Owner
- [ ] Integration tests completed (Stripe, GitHub, Slack)
- [ ] Accessibility audit passed (WCAG 2.1 AA)
- [ ] Performance tested (Lighthouse score 90+)
- [ ] Backup created (Data Export + Metadata)

#### Deployment Steps
1. **Deploy Metadata**
   ```bash
   sf project deploy start --source-path force-app --target-org production
   ```

2. **Run Data Migration (if needed)**
   ```bash
   sf data import tree --plan data/migration-plan.json
   ```

3. **Activate Flows**
   - Navigate to Setup → Flows
   - Activate new/updated flows

4. **Update Experience Cloud Pages**
   - Experience Builder → Publish changes

5. **Clear Cache**
   ```bash
   sf org open --target-org production
   # Setup → Cache Control → Clear All Caches
   ```

#### Post-Deployment
- [ ] Smoke test critical paths (login, checkout, project creation)
- [ ] Verify integrations (Stripe test transaction, Slack channel creation)
- [ ] Monitor error logs for 24 hours
- [ ] Send release notes to users

### Rollback Plan

If critical issues detected:

1. **Immediate:** Deactivate problematic Flow/Process
2. **Within 1 hour:** Rollback metadata deployment
   ```bash
   sf project deploy start --source-path force-app-backup
   ```
3. **Within 2 hours:** Restore data from backup (if data corruption)

---

## 📚 Additional Resources

### Documentation Links
- [Salesforce Experience Cloud Developer Guide](https://developer.salesforce.com/docs/atlas.en-us.exp_cloud_lwr.meta/exp_cloud_lwr/)
- [Lightning Web Components Documentation](https://developer.salesforce.com/docs/component-library/overview/components)
- [Salesforce CMS Documentation](https://help.salesforce.com/s/articleView?id=sf.cms_overview.htm)
- [Stripe API Reference](https://stripe.com/docs/api)
- [GitHub REST API](https://docs.github.com/en/rest)
- [Slack API Documentation](https://api.slack.com/)

### Internal Documentation
- [API Integration Guide](/API_INTEGRATION.md)
- [Gamification System](/GAMIFICATION_IMPLEMENTATION.md)
- [Visitor Trail Implementation](/VISITOR_TRAIL_IMPLEMENTATION.md)
- [TrailBuild Summit Setup](/TRAILBUILD_SUMMIT_IMPLEMENTATION.md)
- [Quick Reference](/QUICK_REFERENCE.md)

### Support Contacts
- **Technical Lead:** [Contact]
- **Salesforce Admin:** [Contact]
- **Product Owner:** [Contact]
- **DevOps:** [Contact]

---

## 📝 Changelog

| Version | Date | Changes | Author |
|---------|------|---------|--------|
| 1.0 | Nov 7, 2025 | Initial architecture documentation | System Architect |

---

## ✅ Developer Checklist

Use this checklist when implementing new features:

- [ ] Component follows SLDS design guidelines
- [ ] Responsive (tested on mobile, tablet, desktop)
- [ ] Accessibility compliant (WCAG 2.1 AA)
- [ ] CMS placeholders used for content (not hard-coded)
- [ ] Salesforce object mapping documented in comments
- [ ] Role-based visibility implemented (audience targeting)
- [ ] Integration endpoints use Named Credentials
- [ ] Error handling implemented (try/catch, user-friendly messages)
- [ ] Loading states implemented (spinners, skeletons)
- [ ] Unit tests written (80%+ coverage)
- [ ] Code reviewed by peer
- [ ] UAT test cases created
- [ ] Documentation updated

---

**End of System Architecture Guide**

For questions or clarifications, contact the technical team or open an issue in the repository.
