# Deployment Guide

Step-by-step guide for deploying the Transition Trails Digital Experience Portal to Salesforce Experience Cloud.

## Table of Contents

1. [Prerequisites](#prerequisites)
2. [Environment Setup](#environment-setup)
3. [Build Process](#build-process)
4. [Salesforce Configuration](#salesforce-configuration)
5. [Experience Cloud Setup](#experience-cloud-setup)
6. [Integration Configuration](#integration-configuration)
7. [Testing](#testing)
8. [Go-Live Checklist](#go-live-checklist)

---

## Prerequisites

### Required Access
- Salesforce org with Experience Cloud license
- System Administrator or equivalent permissions
- Developer access for deployment
- API access enabled

### Development Tools
- Node.js 18+ and npm/yarn
- Salesforce CLI (sf)
- Git
- VS Code with Salesforce extensions (recommended)

### Third-Party Accounts
- Slack workspace with admin access
- LinkedIn Developer account
- GitHub organization
- Linear workspace
- Mural workspace (optional)

---

## Environment Setup

### 1. Clone Repository

```bash
git clone https://github.com/your-org/transition-trails.git
cd transition-trails
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Configure Environment Variables

Create `.env` file:

```env
# Salesforce
SF_ORG_ALIAS=transition-trails-prod
SF_USERNAME=admin@transitiontrails.org
SF_API_VERSION=60.0

# Trailhead
TRAILHEAD_API_KEY=your-api-key

# Slack
SLACK_CLIENT_ID=your-client-id
SLACK_CLIENT_SECRET=your-client-secret
SLACK_SIGNING_SECRET=your-signing-secret

# LinkedIn
LINKEDIN_CLIENT_ID=your-client-id
LINKEDIN_CLIENT_SECRET=your-client-secret

# Linear
LINEAR_API_KEY=your-api-key

# GitHub
GITHUB_TOKEN=ghp_your-token
GITHUB_WEBHOOK_SECRET=your-webhook-secret

# Mural
MURAL_API_TOKEN=your-token

# Application
NODE_ENV=production
PUBLIC_URL=https://transitiontrails.force.com
```

### 4. Salesforce CLI Setup

```bash
# Install Salesforce CLI
npm install -g @salesforce/cli

# Authenticate to org
sf org login web --alias transition-trails-prod

# Set default org
sf config set target-org transition-trails-prod
```

---

## Build Process

### 1. Development Build

```bash
npm run dev
```

### 2. Production Build

```bash
npm run build
```

This creates optimized production files in the `dist/` directory.

### 3. Convert to Lightning Web Components

```bash
npm run convert:lwc
```

This script converts React components to LWC format:
- Transforms JSX to Lightning templates
- Converts hooks to LWC lifecycle methods
- Generates component metadata files

**Output Structure**:
```
force-app/
└── main/
    └── default/
        └── lwc/
            ├── learnerHome/
            │   ├── learnerHome.html
            │   ├── learnerHome.js
            │   └── learnerHome.js-meta.xml
            ├── trailMissions/
            └── ...
```

---

## Salesforce Configuration

### 1. Deploy Custom Objects

```bash
sf project deploy start --source-path force-app/main/default/objects
```

**Objects to Deploy**:
- TT_Learner__c
- TT_Cohort__c
- TT_Mission__c
- TT_Learner_Mission__c
- TT_Capstone_Project__c
- TT_Achievement__c
- TT_Slack_Activity__c
- TT_LinkedIn_Profile__c

### 2. Deploy Apex Classes

```bash
sf project deploy start --source-path force-app/main/default/classes
```

**Key Classes**:
- TT_LearnerAPI
- TT_TrailheadSyncBatch
- TT_SlackEventHandler
- TT_LinkedInService
- TT_LinearService
- TT_GitHubWebhook

### 3. Deploy Lightning Web Components

```bash
sf project deploy start --source-path force-app/main/default/lwc
```

### 4. Deploy Static Resources

```bash
sf project deploy start --source-path force-app/main/default/staticresources
```

Upload CSS, images, and other assets.

### 5. Configure Named Credentials

Navigate to Setup → Named Credentials:

**Trailhead API**:
```
Label: Trailhead_API
URL: https://trailhead.salesforce.com/api/v1
Identity Type: Named Principal
Authentication Protocol: OAuth 2.0
```

**Slack API**:
```
Label: Slack_API
URL: https://slack.com/api
Identity Type: Per User
Authentication Protocol: OAuth 2.0
Scope: channels:read,chat:write,users:read
```

**LinkedIn API**:
```
Label: LinkedIn_API
URL: https://api.linkedin.com/v2
Identity Type: Per User
Authentication Protocol: OAuth 2.0
Scope: r_liteprofile,r_emailaddress,w_member_social
```

**Linear API**:
```
Label: Linear_API
URL: https://api.linear.app/graphql
Identity Type: Named Principal
Authentication Protocol: Password Authentication
Custom Headers: Authorization: Bearer {token}
```

**GitHub API**:
```
Label: GitHub_API
URL: https://api.github.com
Identity Type: Named Principal
Authentication Protocol: Password Authentication
Custom Headers: Authorization: token {token}
```

### 6. Remote Site Settings

Setup → Remote Site Settings → New:

- https://trailhead.salesforce.com
- https://slack.com
- https://api.linkedin.com
- https://api.linear.app
- https://api.github.com
- https://app.mural.co

### 7. Create Permission Sets

**TT_Learner_Access**:
```
Object Permissions:
- TT_Learner__c: Read, Edit (own records)
- TT_Mission__c: Read
- TT_Learner_Mission__c: Read, Create, Edit (own)
- TT_Capstone_Project__c: Read, Edit (own)
- TT_Achievement__c: Read

Field Permissions: All fields
```

**TT_Coach_Access**:
```
Object Permissions:
- All TT objects: Read, Edit
- User: Read

Apex Classes: All TT classes
```

**TT_Admin_Access**:
```
Object Permissions: All TT objects - Full access
Apex Classes: All
```

### 8. Assign Permission Sets

```bash
# Assign to users via CLI
sf org assign permset --name TT_Learner_Access --target-org transition-trails-prod

# Or via UI: Setup → Users → Permission Set Assignments
```

---

## Experience Cloud Setup

### 1. Create Experience Site

1. Setup → Digital Experiences → All Sites → New
2. Select Template: **Build Your Own (LWR)**
3. Name: Transition Trails Portal
4. URL: transitiontrails

### 2. Configure Site Settings

**General**:
- Allow public access: No
- Login page: Custom (use branded login)
- Session timeout: 120 minutes

**Members**:
- Add profiles: Customer Community User, Partner Community User
- Enable self-registration: No (admin-managed)

**Branding**:
- Upload logo
- Set colors:
  - Primary: #2C6975 (Teal)
  - Secondary: #F9A03F (Orange)
  - Background: #F5F3E8 (Cream)

### 3. Create Site Pages

**Home Page** (`/home`):
- Component: `c:learnerHome`
- Visibility: Authenticated users

**Trail Missions** (`/trail-missions`):
- Component: `c:trailMissions`
- Visibility: Authenticated users

**Learning Center** (`/learning`):
- Component: `c:learningCenter`
- Visibility: Authenticated users

**Capstone Projects** (`/capstone`):
- Component: `c:capstoneProjects`
- Visibility: Authenticated users

**Community** (`/community`):
- Component: `c:community`
- Visibility: Authenticated users

**Profile** (`/profile`):
- Component: `c:profile`
- Visibility: Authenticated users (own profile)

**Coach Dashboard** (`/coach`):
- Component: `c:coachDashboard`
- Visibility: Users with TT_Coach_Access

**Admin Panel** (`/admin`):
- Component: `c:adminPanel`
- Visibility: Users with TT_Admin_Access

### 4. Configure Navigation

Setup → Digital Experiences → [Your Site] → Administration → Preferences:

**Navigation Menu**:
```javascript
[
  { label: 'Home', href: '/home', icon: 'utility:home' },
  { label: 'Community', href: '/community', icon: 'utility:groups' },
  { label: 'Trail Missions', href: '/trail-missions', icon: 'utility:trail' },
  { label: 'Learning Center', href: '/learning', icon: 'utility:education' },
  { label: 'Capstone', href: '/capstone', icon: 'utility:apex' },
  { label: 'Profile', href: '/profile', icon: 'utility:user' }
]
```

### 5. Activate Site

1. Builder → Settings → General
2. Click **Activate**
3. Confirm activation

---

## Integration Configuration

### 1. Trailhead Integration

**Install TrailTracker Package**:
1. AppExchange → Search "TrailTracker"
2. Install in production org
3. Configure settings:

```apex
TrailTracker_Settings__c settings = TrailTracker_Settings__c.getOrgDefaults();
settings.API_Endpoint__c = 'https://trailhead.salesforce.com/api/v1';
settings.Sync_Frequency__c = 'Daily';
settings.Auto_Award_Points__c = true;
upsert settings;
```

**Schedule Batch Job**:
```apex
String cronExp = '0 0 2 * * ?'; // Daily at 2 AM
System.schedule('Trailhead Sync Job', cronExp, new TT_TrailheadSyncBatch());
```

### 2. Slack Integration

**Install Salesforce for Slack**:
1. Slack App Directory → Salesforce
2. Add to workspace
3. Connect to Salesforce org

**Configure Slack App**:
1. api.slack.com → Your Apps → Create New App
2. OAuth & Permissions:
   - Add redirect URL: `https://transitiontrails.force.com/services/authcallback/Slack_OAuth`
   - Add scopes (listed in environment setup)
3. Event Subscriptions:
   - Enable Events
   - Request URL: `https://transitiontrails.force.com/services/apexrest/slack/events`
   - Subscribe to events (message, reaction_added)
4. Install app to workspace

**Create Slack Bot User**:
1. App Home → Add Bot User
2. Name: Penny AI
3. Display name: @penny
4. Enable messages tab

### 3. LinkedIn Integration

**Create LinkedIn App**:
1. linkedin.com/developers → My Apps → Create App
2. App Settings:
   - Redirect URLs: `https://transitiontrails.force.com/services/authcallback/LinkedIn_OAuth`
   - Products: Sign In with LinkedIn, Share on LinkedIn
3. Verify app
4. Copy Client ID and Secret to Named Credential

### 4. Linear Integration

**Generate API Key**:
1. Linear → Settings → API
2. Create Personal API Key
3. Add to Named Credential

**Create Webhook** (Optional):
```graphql
mutation {
  webhookCreate(input: {
    url: "https://transitiontrails.force.com/services/apexrest/linear/webhook"
    teamId: "YOUR_TEAM_ID"
    resourceTypes: ["Issue"]
  }) {
    success
    webhook {
      id
    }
  }
}
```

### 5. GitHub Integration

**Create GitHub App**:
1. GitHub → Settings → Developer Settings → GitHub Apps → New
2. Webhook URL: `https://transitiontrails.force.com/services/apexrest/github/webhook`
3. Webhook secret: Generate and save
4. Permissions:
   - Repository contents: Read
   - Pull requests: Read & write
   - Metadata: Read
5. Subscribe to events: pull_request, pull_request_review

**Install App**:
1. Install on organization/repositories
2. Generate private key
3. Add to Named Credential

---

## Testing

### 1. Unit Tests

Run Apex tests:
```bash
sf apex run test --test-level RunLocalTests --result-format human --code-coverage
```

Required coverage: 75%+

### 2. Integration Tests

Test each integration:

**Trailhead**:
```apex
@isTest
class TT_TrailheadIntegrationTest {
  @isTest
  static void testBadgeSync() {
    // Mock HTTP callout
    Test.setMock(HttpCalloutMock.class, new TrailheadMock());
    
    Test.startTest();
    TT_TrailheadSyncBatch batch = new TT_TrailheadSyncBatch();
    Database.executeBatch(batch);
    Test.stopTest();
    
    // Assert achievements created
    List<TT_Achievement__c> badges = [SELECT Id FROM TT_Achievement__c];
    System.assertEquals(5, badges.size());
  }
}
```

**Slack**:
- Send test message from Slack → verify webhook receives
- Post message via API → verify appears in Slack
- Test OAuth flow → verify token storage

**LinkedIn**:
- Test OAuth connection
- Verify profile data retrieval
- Test post sharing

### 3. User Acceptance Testing

**Test Scenarios**:
1. Learner logs in → sees dashboard with focus list
2. Learner selects Trail Mission → mission unlocks
3. Learner completes mission → points awarded
4. Learner connects LinkedIn → profile suggestions appear
5. Learner shares achievement → post appears on LinkedIn
6. Coach reviews learner → feedback saved
7. Slack message → notification appears in Community tab

### 4. Performance Testing

**Load Testing**:
```bash
# Use JMeter or similar
- Concurrent users: 100
- Test duration: 30 minutes
- Monitor: Page load times, API response times, CPU/memory
```

**Benchmarks**:
- Page load: < 2 seconds
- API response: < 500ms
- Component render: < 100ms

---

## Go-Live Checklist

### Pre-Launch (1 Week Before)

- [ ] All code deployed to production
- [ ] All integrations tested and working
- [ ] User acceptance testing complete
- [ ] Performance testing passed
- [ ] Security review completed
- [ ] Data migration plan finalized
- [ ] Backup and rollback plan documented
- [ ] Support team trained
- [ ] Documentation complete

### Launch Day

- [ ] Final code deployment
- [ ] Data migration executed
- [ ] Activate Experience Cloud site
- [ ] Enable integrations (Slack, LinkedIn, etc.)
- [ ] Create initial user accounts
- [ ] Send welcome emails to users
- [ ] Monitor system performance
- [ ] Monitor error logs
- [ ] Support team on standby

### Post-Launch (1 Week After)

- [ ] Daily monitoring of system health
- [ ] Review error logs
- [ ] Collect user feedback
- [ ] Address critical issues
- [ ] Performance optimization
- [ ] Update documentation based on feedback

---

## Monitoring & Maintenance

### 1. Set Up Monitoring

**Salesforce Event Monitoring**:
```
Setup → Event Monitoring → Enable
Track: Login, Logout, API calls, Page views
```

**Custom Logging**:
```apex
public class TT_Logger {
  public static void log(String component, String action, String details) {
    TT_System_Log__c log = new TT_System_Log__c(
      Component__c = component,
      Action__c = action,
      Details__c = details,
      Timestamp__c = System.now()
    );
    insert log;
  }
}
```

### 2. Regular Maintenance

**Weekly**:
- Review error logs
- Check integration health
- Monitor user activity
- Review performance metrics

**Monthly**:
- Update dependencies
- Security patches
- Performance tuning
- Backup verification

**Quarterly**:
- Feature releases
- Major updates
- User training sessions
- Documentation updates

### 3. Backup Strategy

**Data Backup**:
```bash
# Weekly full backup
sf data export --query "SELECT Id, Name FROM TT_Learner__c" --result-format csv

# Daily incremental
# Use Salesforce Data Export service
```

**Code Backup**:
- Git repository with tags for each release
- Automated nightly backups to external storage

---

## Troubleshooting

### Common Issues

**Issue: Components not loading**
```
Solution:
1. Check Lightning cache: Setup → Session Settings → Enable caching
2. Clear browser cache
3. Verify component deployment: sf project deploy report
```

**Issue: Integration failing**
```
Solution:
1. Check Named Credential status
2. Verify API keys haven't expired
3. Review debug logs: Developer Console → Logs
4. Test connection: Anonymous Apex
```

**Issue: Performance slow**
```
Solution:
1. Enable query optimization
2. Add database indexes
3. Implement caching
4. Review SOQL queries for bulk operations
```

### Support Contacts

- **Technical Issues**: tech-support@transitiontrails.org
- **Integration Issues**: integrations@transitiontrails.org
- **Emergency Hotline**: 1-800-TT-SUPPORT

---

## Rollback Procedure

If critical issues occur post-deployment:

1. **Disable Site**:
   ```
   Setup → Digital Experiences → [Site] → Deactivate
   ```

2. **Restore Previous Code**:
   ```bash
   git checkout tags/v1.0.0
   sf project deploy start --source-path force-app
   ```

3. **Restore Data** (if needed):
   ```bash
   sf data import tree --plan data-backup.json
   ```

4. **Notify Users**:
   - Send email notification
   - Update status page
   - Provide ETA for resolution

---

## Appendix

### A. Deployment Scripts

**deploy-full.sh**:
```bash
#!/bin/bash
set -e

echo "Starting full deployment..."

# Deploy objects
sf project deploy start --source-path force-app/main/default/objects --wait 10

# Deploy classes
sf project deploy start --source-path force-app/main/default/classes --wait 10

# Deploy LWC
sf project deploy start --source-path force-app/main/default/lwc --wait 10

# Run tests
sf apex run test --test-level RunLocalTests --wait 10

echo "Deployment complete!"
```

### B. Environment Variables Template

See `.env.example` in repository root.

### C. API Rate Limits

| Service | Limit | Window |
|---------|-------|--------|
| Salesforce API | 100,000 calls/day | 24 hours |
| Trailhead API | 10,000 calls/day | 24 hours |
| Slack API | 1 req/second | Rolling |
| LinkedIn API | 500 calls/day | 24 hours |
| Linear API | 2,000 calls/hour | 1 hour |
| GitHub API | 5,000 calls/hour | 1 hour |

---

**Last Updated**: November 4, 2025
**Version**: 1.0.0
