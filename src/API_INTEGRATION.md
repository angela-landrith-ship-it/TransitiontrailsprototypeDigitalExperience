# API Integration Guide

Comprehensive guide for integrating external APIs and services with the Transition Trails Digital Experience Portal.

## Table of Contents

1. [Salesforce Integration](#salesforce-integration)
2. [Trailhead API](#trailhead-api)
3. [Slack Integration](#slack-integration)
4. [LinkedIn Integration](#linkedin-integration)
5. [Linear Integration](#linear-integration)
6. [GitHub Integration](#github-integration)
7. [Mural Integration](#mural-integration)
8. [Learning Platforms](#learning-platforms)

---

## Salesforce Integration

### Overview
The platform is built for Salesforce Experience Cloud and uses Salesforce as the backend data store and authentication provider.

### Authentication

**Lightning Web Runtime (LWR)**:
```javascript
// User context automatically available
import { getRecord } from 'lightning/uiRecordApi';
import USER_ID from '@salesforce/user/Id';

// Get current user details
const userId = USER_ID;
```

### Custom Objects

#### Program Objects

**TT_Learner__c**:
```javascript
{
  Name: String,
  User__c: Lookup(User),
  Cohort__c: Lookup(TT_Cohort__c),
  Trail_Path__c: Picklist, // Admin, Developer, BA, Designer
  Program_Start_Date__c: Date,
  Points_Earned__c: Number,
  Status__c: Picklist // Active, On Hold, Completed, Withdrawn
}
```

**TT_Cohort__c**:
```javascript
{
  Name: String,
  Start_Date__c: Date,
  End_Date__c: Date,
  Coach__c: Lookup(User),
  Total_Learners__c: Number,
  Active_Learners__c: Number
}
```

**TT_Mission__c**:
```javascript
{
  Name: String,
  Week_Number__c: Number,
  Trail_Path__c: Picklist,
  Points__c: Number,
  Status__c: Picklist,
  Objectives__c: Long Text Area,
  Resources__c: Long Text Area
}
```

**TT_Learner_Mission__c** (Junction):
```javascript
{
  Learner__c: Master-Detail(TT_Learner__c),
  Mission__c: Master-Detail(TT_Mission__c),
  Status__c: Picklist, // Not Started, In Progress, Completed
  Progress__c: Percent,
  Started_Date__c: DateTime,
  Completed_Date__c: DateTime,
  Points_Earned__c: Number
}
```

**TT_Capstone_Project__c**:
```javascript
{
  Name: String,
  Learner__c: Lookup(TT_Learner__c),
  Nonprofit_Partner__c: Lookup(Account),
  Phase__c: Picklist, // Planning, Development, Testing, Deployment
  Linear_Workspace_ID__c: String,
  GitHub_Repo_URL__c: URL,
  Mural_Board_URL__c: URL,
  Start_Date__c: Date,
  Target_Completion__c: Date,
  Status__c: Picklist
}
```

**TT_Achievement__c**:
```javascript
{
  Learner__c: Master-Detail(TT_Learner__c),
  Type__c: Picklist, // Trailhead Badge, Program Badge, Milestone
  Title__c: String,
  Description__c: Long Text Area,
  Earned_Date__c: Date,
  External_ID__c: String, // For Trailhead sync
  Icon_URL__c: URL
}
```

**TT_Slack_Activity__c**:
```javascript
{
  User__c: Lookup(User),
  Channel_ID__c: String,
  Message_ID__c: String,
  Activity_Type__c: Picklist, // Message, Reaction, Mention
  Timestamp__c: DateTime,
  Content_Summary__c: Text(255)
}
```

### API Calls

**Apex REST Services**:
```apex
@RestResource(urlMapping='/learner/*')
global class TT_LearnerAPI {
  
  @HttpGet
  global static TT_Learner__c getLearner() {
    String learnerId = RestContext.request.params.get('id');
    return [SELECT Id, Name, Points_Earned__c, Status__c 
            FROM TT_Learner__c 
            WHERE Id = :learnerId];
  }
  
  @HttpPost
  global static String updateProgress(String missionId, Integer progress) {
    // Update learner mission progress
    // Award points based on completion
    // Return updated status
  }
}
```

**Named Credentials**:
- Set up Named Credentials for external API authentication
- Store OAuth tokens securely
- Automatic token refresh

---

## Trailhead API

### Overview
Integration with Salesforce Trailhead to sync badges, module completions, and rank.

### TrailTracker Package

**Installation**:
1. Install from AppExchange: TrailTracker
2. Configure user mapping
3. Set up scheduled sync

**Custom Settings**:
```apex
TrailTracker_Settings__c settings = new TrailTracker_Settings__c();
settings.API_Endpoint__c = 'https://trailhead.salesforce.com/api/v1';
settings.Sync_Frequency__c = 'Daily';
settings.Auto_Award_Points__c = true;
insert settings;
```

### API Endpoints

**Get User Profile**:
```http
GET https://trailhead.salesforce.com/api/v1/users/{trailblazer-id}
Authorization: Bearer {token}

Response:
{
  "profileUser": {
    "TrailblazerId": "005...",
    "FirstName": "Alex",
    "LastName": "Johnson",
    "CompanyName": "Transition Trails",
    "Title": "Learner",
    "ProfilePhotoUrl": "https://...",
    "RankLabel": "Ranger",
    "RankImageUrl": "https://...",
    "EarnedPointsSum": 12400,
    "EarnedBadgesCount": 42,
    "CompletedTrailCount": 5
  }
}
```

**Get User Badges**:
```http
GET https://trailhead.salesforce.com/api/v1/users/{trailblazer-id}/badges
Authorization: Bearer {token}

Response:
{
  "badges": [
    {
      "id": "badge-001",
      "title": "Apex Basics & Database",
      "type": "Module",
      "icon": "https://...",
      "earnedDate": "2025-02-15T10:30:00Z",
      "earnedPointsSum": 400
    }
  ]
}
```

### Apex Integration

**Scheduled Sync**:
```apex
global class TT_TrailheadSyncBatch implements Database.Batchable<sObject>, Database.AllowsCallouts {
  
  global Database.QueryLocator start(Database.BatchableContext bc) {
    return Database.getQueryLocator(
      'SELECT Id, Trailblazer_ID__c FROM TT_Learner__c WHERE Status__c = \'Active\''
    );
  }
  
  global void execute(Database.BatchableContext bc, List<TT_Learner__c> scope) {
    for (TT_Learner__c learner : scope) {
      syncTrailheadData(learner);
    }
  }
  
  private void syncTrailheadData(TT_Learner__c learner) {
    HttpRequest req = new HttpRequest();
    req.setEndpoint('callout:Trailhead_API/users/' + learner.Trailblazer_ID__c + '/badges');
    req.setMethod('GET');
    
    Http http = new Http();
    HttpResponse res = http.send(req);
    
    if (res.getStatusCode() == 200) {
      Map<String, Object> badges = (Map<String, Object>) JSON.deserializeUntyped(res.getBody());
      // Process and insert new badges
    }
  }
  
  global void finish(Database.BatchableContext bc) {
    // Send completion notification
  }
}
```

**Schedule Job**:
```apex
// Schedule to run daily at 2 AM
String cronExp = '0 0 2 * * ?';
System.schedule('Trailhead Sync Job', cronExp, new TT_TrailheadSyncBatch());
```

---

## Slack Integration

### Overview
Real-time messaging, collaboration, and community features powered by Slack.

### Salesforce for Slack

**Installation**:
1. Install Salesforce for Slack from Slack App Directory
2. Connect to Salesforce org
3. Configure channels and permissions

### OAuth Configuration

**Slack App Settings**:
```json
{
  "client_id": "YOUR_CLIENT_ID",
  "client_secret": "YOUR_CLIENT_SECRET",
  "scopes": [
    "channels:read",
    "channels:history",
    "chat:write",
    "groups:read",
    "groups:history",
    "im:read",
    "im:write",
    "reactions:read",
    "users:read",
    "users:read.email"
  ],
  "redirect_urls": [
    "https://your-site.force.com/oauth/callback"
  ]
}
```

**OAuth Flow**:
```javascript
// Step 1: Redirect to Slack authorization
const authUrl = `https://slack.com/oauth/v2/authorize?client_id=${clientId}&scope=${scopes}&redirect_uri=${redirectUri}`;
window.location.href = authUrl;

// Step 2: Handle callback
// Slack redirects to: https://your-site.force.com/oauth/callback?code=ABC123

// Step 3: Exchange code for access token
const tokenResponse = await fetch('https://slack.com/api/oauth.v2.access', {
  method: 'POST',
  headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
  body: `code=${code}&client_id=${clientId}&client_secret=${clientSecret}`
});

const { access_token } = await tokenResponse.json();

// Step 4: Store token in Salesforce Named Credential
```

### API Endpoints

**Get Channels**:
```javascript
const response = await fetch('https://slack.com/api/conversations.list', {
  headers: { 'Authorization': `Bearer ${accessToken}` }
});

const { channels } = await response.json();
// Returns list of channels user has access to
```

**Send Message**:
```javascript
await fetch('https://slack.com/api/chat.postMessage', {
  method: 'POST',
  headers: {
    'Authorization': `Bearer ${accessToken}`,
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    channel: 'C01234567',
    text: 'Hello from Transition Trails!',
    blocks: [
      {
        type: 'section',
        text: {
          type: 'mrkdwn',
          text: '*New capstone milestone!* 🎉\nAlex completed the development phase.'
        }
      }
    ]
  })
});
```

**Get User Messages**:
```javascript
const response = await fetch(
  `https://slack.com/api/conversations.history?channel=${channelId}&limit=50`,
  { headers: { 'Authorization': `Bearer ${accessToken}` } }
);

const { messages } = await response.json();
```

### Event Subscriptions

**Webhook Setup**:
```
Request URL: https://your-site.force.com/services/apexrest/slack/events
Challenge: enabled
```

**Event Types**:
- `message.channels` - New public channel message
- `message.groups` - New private channel message  
- `message.im` - New direct message
- `reaction_added` - Reaction added to message

**Event Payload**:
```json
{
  "type": "event_callback",
  "event": {
    "type": "message",
    "user": "U01234567",
    "text": "Great question about Flow Builder!",
    "channel": "C01234567",
    "ts": "1234567890.123456"
  }
}
```

**Apex Webhook Handler**:
```apex
@RestResource(urlMapping='/slack/events')
global class TT_SlackEventHandler {
  
  @HttpPost
  global static String handleEvent() {
    RestRequest req = RestContext.request;
    Map<String, Object> event = (Map<String, Object>) JSON.deserializeUntyped(req.requestBody.toString());
    
    // Handle challenge verification
    if (event.containsKey('challenge')) {
      return (String) event.get('challenge');
    }
    
    // Process event
    String eventType = (String) ((Map<String, Object>) event.get('event')).get('type');
    
    if (eventType == 'message') {
      processMessage(event);
    } else if (eventType == 'reaction_added') {
      processReaction(event);
    }
    
    return 'OK';
  }
  
  private static void processMessage(Map<String, Object> event) {
    // Create Slack_Activity__c record
    // Send notification to user
    // Update Penny AI context
  }
}
```

### Bot Integration (Penny)

**Bot User Configuration**:
```javascript
// Bot posts proactive messages
await fetch('https://slack.com/api/chat.postMessage', {
  method: 'POST',
  headers: {
    'Authorization': `Bearer ${botToken}`,
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    channel: '@alex.johnson',
    text: 'Hi Alex! I noticed you haven\'t submitted your weekly status report. Need help?',
    blocks: [
      {
        type: 'actions',
        elements: [
          {
            type: 'button',
            text: { type: 'plain_text', text: 'Submit Report' },
            url: 'https://transitiontrails.force.com/capstone'
          }
        ]
      }
    ]
  })
});
```

---

## LinkedIn Integration

### Overview
OAuth integration for profile optimization and achievement sharing.

### OAuth Setup

**LinkedIn App Configuration**:
```json
{
  "client_id": "YOUR_CLIENT_ID",
  "client_secret": "YOUR_CLIENT_SECRET",
  "redirect_uri": "https://your-site.force.com/linkedin/callback",
  "scope": "r_liteprofile r_emailaddress w_member_social"
}
```

**Authorization Flow**:
```javascript
// Step 1: Redirect to LinkedIn
const linkedInAuthUrl = `https://www.linkedin.com/oauth/v2/authorization?
  response_type=code&
  client_id=${clientId}&
  redirect_uri=${encodeURIComponent(redirectUri)}&
  scope=r_liteprofile%20r_emailaddress%20w_member_social`;

window.location.href = linkedInAuthUrl;

// Step 2: Exchange code for token
const tokenResponse = await fetch('https://www.linkedin.com/oauth/v2/accessToken', {
  method: 'POST',
  headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
  body: `grant_type=authorization_code&code=${code}&client_id=${clientId}&client_secret=${clientSecret}&redirect_uri=${redirectUri}`
});

const { access_token } = await tokenResponse.json();
```

### API Endpoints

**Get Profile**:
```javascript
const profile = await fetch('https://api.linkedin.com/v2/me', {
  headers: {
    'Authorization': `Bearer ${accessToken}`,
    'X-Restli-Protocol-Version': '2.0.0'
  }
});

const profileData = await profile.json();
// Returns: firstName, lastName, profilePicture, headline
```

**Get Email**:
```javascript
const email = await fetch(
  'https://api.linkedin.com/v2/emailAddress?q=members&projection=(elements*(handle~))',
  { headers: { 'Authorization': `Bearer ${accessToken}` } }
);
```

**Share Post**:
```javascript
await fetch('https://api.linkedin.com/v2/ugcPosts', {
  method: 'POST',
  headers: {
    'Authorization': `Bearer ${accessToken}`,
    'Content-Type': 'application/json',
    'X-Restli-Protocol-Version': '2.0.0'
  },
  body: JSON.stringify({
    author: `urn:li:person:${personId}`,
    lifecycleState: 'PUBLISHED',
    specificContent: {
      'com.linkedin.ugc.ShareContent': {
        shareCommentary: {
          text: '🎉 Excited to share my latest capstone project...'
        },
        shareMediaCategory: 'NONE'
      }
    },
    visibility: {
      'com.linkedin.ugc.MemberNetworkVisibility': 'PUBLIC'
    }
  })
});
```

**Share with Media**:
```javascript
// Step 1: Register upload
const registerResponse = await fetch('https://api.linkedin.com/v2/assets?action=registerUpload', {
  method: 'POST',
  headers: {
    'Authorization': `Bearer ${accessToken}`,
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    registerUploadRequest: {
      recipes: ['urn:li:digitalmediaRecipe:feedshare-image'],
      owner: `urn:li:person:${personId}`,
      serviceRelationships: [{
        relationshipType: 'OWNER',
        identifier: 'urn:li:userGeneratedContent'
      }]
    }
  })
});

// Step 2: Upload image
// Step 3: Create post with media asset
```

### Apex Implementation

**LinkedIn Service Class**:
```apex
public class TT_LinkedInService {
  
  public static void shareAchievement(String learnerId, String achievementType) {
    // Get access token from Named Credential
    String accessToken = getAccessToken(learnerId);
    
    // Generate post text using Einstein
    String postText = generatePostText(achievementType);
    
    // Post to LinkedIn
    HttpRequest req = new HttpRequest();
    req.setEndpoint('callout:LinkedIn_API/ugcPosts');
    req.setMethod('POST');
    req.setHeader('Authorization', 'Bearer ' + accessToken);
    req.setHeader('Content-Type', 'application/json');
    req.setBody(buildPostPayload(postText));
    
    Http http = new Http();
    HttpResponse res = http.send(req);
    
    // Log result
    logShareActivity(learnerId, achievementType, res.getStatusCode());
  }
  
  private static String generatePostText(String achievementType) {
    // Use Einstein Prompt Builder
    ConnectApi.EinsteinPromptTemplateGenerationsInput input = 
      new ConnectApi.EinsteinPromptTemplateGenerationsInput();
    input.promptTemplateDeveloperName = 'LinkedIn_Achievement_Post';
    input.inputParams = new Map<String, ConnectApi.WrappedValue>{
      'achievementType' => ConnectApi.WrappedValue.create(achievementType)
    };
    
    ConnectApi.EinsteinPromptTemplateGenerationsRepresentation response =
      ConnectApi.EinsteinLLM.generateMessagesForPromptTemplate(input);
      
    return response.generations[0].text;
  }
}
```

---

## Linear Integration

### Overview
Project management integration for capstone projects using Linear's GraphQL API.

### API Configuration

**Authentication**:
```javascript
const linearApiKey = 'lin_api_...'; // Store in Named Credential
const apiEndpoint = 'https://api.linear.app/graphql';
```

### GraphQL Queries

**Get Team Issues**:
```graphql
query TeamIssues($teamId: String!) {
  team(id: $teamId) {
    issues {
      nodes {
        id
        identifier
        title
        description
        priority
        state {
          name
          type
        }
        assignee {
          name
          email
        }
        createdAt
        updatedAt
        dueDate
      }
    }
  }
}
```

**Create Issue**:
```graphql
mutation CreateIssue($teamId: String!, $title: String!, $description: String) {
  issueCreate(input: {
    teamId: $teamId
    title: $title
    description: $description
    priority: 1
  }) {
    success
    issue {
      id
      identifier
      url
    }
  }
}
```

**Update Issue**:
```graphql
mutation UpdateIssue($issueId: String!, $stateId: String!) {
  issueUpdate(id: $issueId, input: {
    stateId: $stateId
  }) {
    success
    issue {
      id
      state {
        name
      }
    }
  }
}
```

### JavaScript Integration

```javascript
async function getLinearIssues(teamId) {
  const response = await fetch('https://api.linear.app/graphql', {
    method: 'POST',
    headers: {
      'Authorization': linearApiKey,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      query: `
        query { team(id: "${teamId}") { issues { nodes { id title state { name } } } } }
      `
    })
  });
  
  const { data } = await response.json();
  return data.team.issues.nodes;
}
```

### Apex Implementation

```apex
public class TT_LinearService {
  
  public static List<Issue> getProjectIssues(String projectId) {
    TT_Capstone_Project__c project = [
      SELECT Linear_Workspace_ID__c 
      FROM TT_Capstone_Project__c 
      WHERE Id = :projectId
    ];
    
    HttpRequest req = new HttpRequest();
    req.setEndpoint('callout:Linear_API');
    req.setMethod('POST');
    req.setHeader('Content-Type', 'application/json');
    req.setBody(buildGraphQLQuery(project.Linear_Workspace_ID__c));
    
    Http http = new Http();
    HttpResponse res = http.send(req);
    
    return parseIssues(res.getBody());
  }
  
  public class Issue {
    public String id;
    public String title;
    public String status;
    public String priority;
    public String assignee;
    public Date dueDate;
  }
}
```

---

## GitHub Integration

### Overview
Code repository integration for pull request tracking and code review.

### REST API

**Authentication**:
```javascript
const githubToken = 'ghp_...'; // Store in Named Credential
const apiBase = 'https://api.github.com';
```

**Get Repository**:
```javascript
const repo = await fetch(`${apiBase}/repos/${owner}/${repo}`, {
  headers: {
    'Authorization': `token ${githubToken}`,
    'Accept': 'application/vnd.github.v3+json'
  }
});
```

**List Pull Requests**:
```javascript
const prs = await fetch(`${apiBase}/repos/${owner}/${repo}/pulls?state=all`, {
  headers: {
    'Authorization': `token ${githubToken}`,
    'Accept': 'application/vnd.github.v3+json'
  }
});

const pullRequests = await prs.json();
// Returns array of PR objects
```

**PR Object Structure**:
```json
{
  "id": 123,
  "number": 42,
  "title": "Add Flow Builder automation",
  "state": "open",
  "user": {
    "login": "alexjohnson",
    "avatar_url": "https://..."
  },
  "created_at": "2025-03-01T10:00:00Z",
  "updated_at": "2025-03-02T15:30:00Z",
  "merged_at": null,
  "requested_reviewers": [],
  "additions": 234,
  "deletions": 45,
  "changed_files": 8
}
```

**Get PR Reviews**:
```javascript
const reviews = await fetch(
  `${apiBase}/repos/${owner}/${repo}/pulls/${prNumber}/reviews`,
  { headers: { 'Authorization': `token ${githubToken}` } }
);
```

**Check Status**:
```javascript
const checks = await fetch(
  `${apiBase}/repos/${owner}/${repo}/commits/${sha}/check-runs`,
  { headers: {
    'Authorization': `token ${githubToken}`,
    'Accept': 'application/vnd.github.v3+json'
  }}
);
```

### Webhooks

**Configure Webhook**:
```json
{
  "url": "https://your-site.force.com/services/apexrest/github/webhook",
  "content_type": "json",
  "events": ["pull_request", "pull_request_review", "push"]
}
```

**Webhook Payload (PR opened)**:
```json
{
  "action": "opened",
  "pull_request": {
    "id": 123,
    "number": 42,
    "title": "Add automation",
    "user": { "login": "alexjohnson" }
  },
  "repository": {
    "name": "capstone-project",
    "owner": { "login": "transition-trails" }
  }
}
```

**Apex Webhook Handler**:
```apex
@RestResource(urlMapping='/github/webhook')
global class TT_GitHubWebhook {
  
  @HttpPost
  global static void handleWebhook() {
    RestRequest req = RestContext.request;
    String eventType = req.headers.get('X-GitHub-Event');
    
    if (eventType == 'pull_request') {
      processPullRequest(req.requestBody.toString());
    }
  }
  
  private static void processPullRequest(String payload) {
    Map<String, Object> data = (Map<String, Object>) JSON.deserializeUntyped(payload);
    String action = (String) data.get('action');
    
    if (action == 'opened') {
      // Notify learner and coach
      // Update Capstone Project record
      // Trigger Penny recommendation
    }
  }
}
```

---

## Mural Integration

### Overview
Visual collaboration board integration for capstone planning phases.

### API Configuration

**Authentication**:
```javascript
const muralToken = 'YOUR_MURAL_TOKEN';
const apiBase = 'https://app.mural.co/api/public/v1';
```

**Get Workspace**:
```javascript
const workspace = await fetch(`${apiBase}/workspaces`, {
  headers: { 'Authorization': `Bearer ${muralToken}` }
});
```

**Create Mural**:
```javascript
const newMural = await fetch(`${apiBase}/workspaces/${workspaceId}/murals`, {
  method: 'POST',
  headers: {
    'Authorization': `Bearer ${muralToken}`,
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    title: 'Capstone Project Planning - Alex Johnson'
  })
});

const { value } = await newMural.json();
// Returns mural ID and URL
```

**Embed Mural**:
```html
<iframe 
  src="https://app.mural.co/embed/${muralId}" 
  width="100%" 
  height="600" 
  frameborder="0"
></iframe>
```

---

## Learning Platforms

### Viva Learning (Microsoft)

**Graph API**:
```javascript
// Get learning content
const content = await fetch(
  'https://graph.microsoft.com/v1.0/employeeExperience/learningProviders/13727311-e7bb-470d-8b20-6a23d9030d70/learningContents',
  { headers: { 'Authorization': `Bearer ${msToken}` } }
);
```

### PluralSight

**API Endpoints**:
```javascript
// Get user progress
const progress = await fetch(
  'https://app.pluralsight.com/api/users/${userId}/courses',
  { headers: { 'Authorization': `Bearer ${psToken}` } }
);
```

---

## Security Best Practices

### Token Storage
- **Never** store tokens in JavaScript variables
- Use Salesforce Named Credentials
- Implement token refresh logic
- Encrypt tokens at rest

### API Key Protection
```apex
// Good: Use Named Credential
HttpRequest req = new HttpRequest();
req.setEndpoint('callout:LinkedIn_API/me');

// Bad: Hardcoded token
// req.setEndpoint('https://api.linkedin.com/v2/me');
// req.setHeader('Authorization', 'Bearer hardcoded_token');
```

### Rate Limiting
- Implement exponential backoff
- Cache responses where appropriate
- Batch API calls when possible

### Error Handling
```apex
try {
  Http http = new Http();
  HttpResponse res = http.send(req);
  
  if (res.getStatusCode() != 200) {
    throw new APIException('API returned status: ' + res.getStatusCode());
  }
  
  return res.getBody();
} catch (Exception e) {
  System.debug('API Error: ' + e.getMessage());
  // Log to custom object for monitoring
  // Send alert to admin
  return null;
}
```

---

**Last Updated**: November 4, 2025
**Version**: 1.0.0
