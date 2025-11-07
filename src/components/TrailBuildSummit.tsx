/**
 * TRAILBUILD SUMMIT - BIANNUAL VIRTUAL CODE-A-THON
 * 
 * =============================================================================
 * SALESFORCE ARCHITECTURE MAPPING
 * =============================================================================
 * 
 * Experience Page: ExpPage_TrailBuild
 * URL Path: /s/trailbuild
 * Primary Audiences: All (Visitor, Learner, Coach, Partner, Sponsor)
 * Event Model: Biannual (Spring & Fall)
 * 
 * =============================================================================
 * SALESFORCE OBJECTS & FIELDS
 * =============================================================================
 * 
 * Primary Object: TrailBuild_Event__c
 * Key Fields:
 * - Name (Text, 120) - "TrailBuild Summit Fall 2025"
 * - Event_Date__c (Date) - Event start date
 * - Event_End_Date__c (Date) - 3-day event (Fri-Sun)
 * - Status__c (Picklist) - Planning, Registration Open, In Progress, Completed
 * - Event_Type__c (Picklist) - Virtual, Hybrid
 * - Max_Attendees__c (Number) - Capacity limit
 * - Current_Attendees__c (Rollup Count) - COUNT(TrailBuild_Registration__c WHERE Status = 'Confirmed')
 * - Registration_Opens__c (DateTime)
 * - Registration_Closes__c (DateTime)
 * - Description__c (Rich Text Area) - Event overview
 * - Theme__c (Text, 255) - "Build for Good", "Tech for Impact", etc.
 * - Zoom_Link__c (URL) - Main event Zoom room
 * - Slack_Channel__c (Text, 50) - #trailbuild-summit-fall-2025
 * - Kickoff_Video_URL__c (URL) - Welcome video link
 * - Prize_Pool__c (Currency) - Total prizes for winning teams
 * - Featured__c (Checkbox) - Show on homepage
 * 
 * Related Object: TrailBuild_Registration__c
 * Fields:
 * - TrailBuild_Event__c (Master-Detail: TrailBuild_Event__c)
 * - Participant__c (Lookup: User)
 * - Registration_Date__c (DateTime) - Auto: NOW()
 * - Status__c (Picklist) - Pending, Confirmed, Cancelled, Waitlist
 * - Skill_Level__c (Picklist) - Beginner, Intermediate, Advanced
 * - Preferred_Track__c (Picklist) - Admin, Developer, Designer, QA
 * - Team_Assignment__c (Lookup: TrailBuild_Team__c) - Assigned later
 * - Badge_Tier__c (Text, 50) - TrailBuilder Bronze, Silver, Gold
 * - Participation_Points__c (Number) - Points earned during event
 * 
 * Related Object: TrailBuild_Team__c
 * Fields:
 * - TrailBuild_Event__c (Master-Detail: TrailBuild_Event__c)
 * - Name (Text, 80) - "Team Phoenix", "Code Crusaders"
 * - Team_Number__c (Auto-Number) - TEAM-{000}
 * - Project__c (Lookup: TrailBuild_Project__c)
 * - Team_Lead__c (Lookup: User)
 * - Team_Size__c (Number) - 4-6 members
 * - Slack_Channel__c (Text, 50) - #trailbuild-team-phoenix
 * - GitHub_Repo__c (URL) - Auto-created repository
 * - Submission_Link__c (URL) - Link to deliverable
 * - Submission_Date__c (DateTime)
 * - Final_Score__c (Number) - Judging score
 * - Award_Tier__c (Picklist) - Winner, Runner-Up, Honorable Mention
 * 
 * Related Object: TrailBuild_Project__c (Partner projects for event)
 * Fields:
 * - TrailBuild_Event__c (Master-Detail: TrailBuild_Event__c)
 * - Partner_Organization__c (Lookup: Account)
 * - Title__c (Text, 120)
 * - Description__c (Rich Text Area)
 * - Required_Skills__c (Multi-Select Picklist)
 * - Difficulty__c (Picklist) - Beginner, Intermediate, Advanced
 * - Assigned_Teams__c (Rollup Count)
 * - Max_Teams__c (Number) - 1-2 teams per project
 * 
 * Related Object: Event_Sponsor__c (Sponsors for prizes/branding)
 * Fields:
 * - TrailBuild_Event__c (Master-Detail: TrailBuild_Event__c)
 * - Sponsor_Account__c (Lookup: Account)
 * - Sponsorship_Tier__c (Picklist) - Platinum, Gold, Silver, Bronze
 * - Logo_URL__c (URL)
 * - Contribution_Amount__c (Currency)
 * - Benefits__c (Long Text Area) - Logo placement, shoutouts
 * 
 * =============================================================================
 * CMS CONTENT REFERENCES
 * =============================================================================
 * 
 * - [CMS:trailbuild_hero_title] → "TrailBuild Summit"
 * - [CMS:trailbuild_hero_subtitle] → "Build for Good — A 3-day virtual code-a-thon..."
 * - [CMS:trailbuild_event_theme] → Current event theme
 * - [CMS:trailbuild_past_events_gallery] → Image carousel of past summits
 * - [CMS:trailbuild_faq] → Frequently asked questions
 * - [CMS:sponsor_logos] → Sponsor images (Account.Logo_URL__c)
 * 
 * =============================================================================
 * APEX CONTROLLERS
 * =============================================================================
 * 
 * TrailBuildSummitController.cls:
 * - getUpcomingEvent() → Returns next TrailBuild_Event__c
 * - registerForEvent(eventId, userId) → Creates TrailBuild_Registration__c
 * - getRegistrationStatus(eventId, userId) → Check if user registered
 * - getEventProjects(eventId) → Returns available TrailBuild_Project__c
 * - getEventSponsors(eventId) → Returns Event_Sponsor__c records
 * - getMyTeam(eventId, userId) → Returns assigned TrailBuild_Team__c
 * - submitProject(teamId, submissionLink) → Records submission
 * 
 * =============================================================================
 * INTEGRATION POINTS
 * =============================================================================
 * 
 * 1. Slack Integration:
 *    - Main event channel: Auto-created on event creation
 *    - Team channels: Auto-created on team assignment
 *    - Penny TrailBuild Coordinator posts updates, reminders
 *    - Slack webhook: POST daily summaries, winner announcements
 * 
 * 2. GitHub Repository Integration:
 *    - Each team gets a repository: transition-trails-trailbuild-{event}-{team}
 *    - Auto-created via GitHubIntegrationService on team formation
 *    - Template includes: README, project brief, folder structure
 *    - Teams have write access; judges have read access
 * 
 * 3. Zoom Integration:
 *    - Main event room: TrailBuild_Event__c.Zoom_Link__c
 *    - Breakout rooms: Generated via Zoom API for team workspaces
 *    - Stored: TrailBuild_Team__c.Team_Zoom_Link__c
 * 
 * 4. Penny AI - TrailBuild Coordinator Mode:
 *    - <PennyTrailBuildMode> component (third mode, amber glow)
 *    - Context-aware for event coordination
 *    - Proactive suggestions: Team formation, project selection, timelines
 *    - Real-time progress tracking across all teams
 *    - API: POST /services/apexrest/penny/trailbuild-guidance
 * 
 * 5. Badge System Integration:
 *    - Auto-award TrailBuilder Bronze on registration
 *    - TrailBuilder Silver: Submit project
 *    - TrailBuilder Gold: Winning team
 *    - Stored: TrailBuild_Registration__c.Badge_Tier__c
 *    - Creates Badge_Award__c records
 * 
 * =============================================================================
 * FLOWS & AUTOMATION
 * =============================================================================
 * 
 * 1. Flow: Register_For_TrailBuild
 *    Trigger: User submits registration form
 *    Actions:
 *      - Create TrailBuild_Registration__c (Status = 'Confirmed')
 *      - Award TrailBuilder Bronze badge (Badge_Award__c)
 *      - Send confirmation email
 *      - Add to Slack event channel
 *      - Award 50 registration bonus points
 * 
 * 2. Flow: Assign_Teams
 *    Trigger: Admin clicks "Generate Teams" (before event)
 *    Actions:
 *      - Query registrations, group by skill level
 *      - Create TrailBuild_Team__c records (4-6 per team)
 *      - Assign team lead (most experienced or random)
 *      - Create Slack team channels
 *      - Create GitHub repositories
 *      - Send team assignment emails
 * 
 * 3. Flow: Submit_TrailBuild_Project
 *    Trigger: Team lead clicks "Submit Project"
 *    Actions:
 *      - Update TrailBuild_Team__c.Submission_Link__c
 *      - Set Submission_Date__c = NOW()
 *      - Award TrailBuilder Silver badges to all team members
 *      - Award 200 submission points to each member
 *      - Send submission confirmation email
 *      - Post to Slack: "Team {Name} submitted!"
 * 
 * 4. Flow: Announce_Winners
 *    Trigger: Admin updates Award_Tier__c on winning teams
 *    Actions:
 *      - Award TrailBuilder Gold badges to winning team
 *      - Award bonus points: 500 (Winner), 300 (Runner-Up), 150 (Honorable)
 *      - Send congratulations email
 *      - Post to Slack with @channel mention
 *      - Update user profiles with achievement
 * 
 * 5. Trigger: TrailBuildRegistrationTrigger (After Insert)
 *    Action: Check capacity, if full → set Status = 'Waitlist'
 * 
 * =============================================================================
 * GAMIFICATION & POINTS
 * =============================================================================
 * 
 * Points Breakdown:
 * - Registration: +50 points
 * - Attend kickoff: +25 points
 * - Submit project: +200 points
 * - Winner: +500 bonus
 * - Runner-Up: +300 bonus
 * - Honorable Mention: +150 bonus
 * - Community vote favorite: +100 bonus
 * 
 * Badges:
 * - TrailBuilder Bronze: Register for event
 * - TrailBuilder Silver: Submit project
 * - TrailBuilder Gold: Winning team
 * 
 * =============================================================================
 * EVENT TIMELINE
 * =============================================================================
 * 
 * Pre-Event (2 months before):
 * - Announce event, open registration
 * - Partner organizations submit project briefs
 * - Sponsors sign up, branding added
 * 
 * 2 Weeks Before:
 * - Close registration
 * - Assign teams (Flow: Assign_Teams)
 * - Send team introductions
 * - Create Slack channels, GitHub repos
 * 
 * Day 1 (Friday):
 * - Kickoff session (Zoom)
 * - Project selection by teams
 * - Team planning sessions
 * - Penny TrailBuild Coordinator activated
 * 
 * Day 2-3 (Sat-Sun):
 * - Teams work on projects
 * - Office hours with coaches
 * - Penny provides guidance
 * 
 * Day 3 (Sunday evening):
 * - Project submissions close
 * - Teams present demos (5 min each)
 * - Judging and winner announcement
 * 
 * =============================================================================
 * PENNY TRAILBUILD COORDINATOR MODE
 * =============================================================================
 * 
 * Third Mode Activation:
 * - Only active during TrailBuild Summit events
 * - Visual: Animated amber glow (different from Guide/Assistant modes)
 * - Icon: Coordination/team icon
 * - Context: Entire event + team progress
 * 
 * Coordinator Capabilities:
 * - Track all team progress in real-time
 * - Identify blockers across teams
 * - Suggest resource allocation
 * - Coordinate coach support
 * - Remind teams of deadlines
 * - Celebrate milestones (Slack posts)
 * - Generate event summary reports
 * 
 * =============================================================================
 * SPONSOR INTEGRATION
 * =============================================================================
 * 
 * Sponsor Tiers:
 * - Platinum ($5,000+): Logo on all materials, keynote mention, prize
 * - Gold ($2,500+): Logo on event page, social media shoutout
 * - Silver ($1,000+): Logo in footer, thank you post
 * - Bronze ($500+): Listed in sponsor section
 * 
 * Sponsor Dashboard:
 * - View event metrics (registrations, submissions)
 * - Access to demo recordings
 * - Post-event impact report
 * 
 * =============================================================================
 * LWC COMPONENT MAPPING
 * =============================================================================
 * 
 * React Components → LWC:
 * - <TrailBuildSummit> → <c-trailbuild-summit>
 * - <TrailBuildRegistration> → <c-trailbuild-registration>
 * - <TrailBuildWorkspace> → <c-trailbuild-workspace>
 * - <PennyTrailBuildMode> → <c-penny-trailbuild-mode>
 * 
 * =============================================================================
 * ACCESSIBILITY
 * =============================================================================
 * 
 * - Countdown timer has aria-live announcements
 * - Registration form fully keyboard navigable
 * - Team workspace accessible to screen readers
 * - Video captions for all recordings
 * - Alt text on all sponsor logos
 * 
 * =============================================================================
 */

import { useState, useEffect } from 'react';
import { Calendar, Users, Zap, Trophy, Clock, CheckCircle2, Sparkles, PlayCircle, Award, ExternalLink } from 'lucide-react';
import { Badge } from './ui/badge';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { TrailBuildRegistration } from './TrailBuildRegistration';
import { TrailBuildWorkspace } from './TrailBuildWorkspace';

interface TrailBuildSummitProps {
  userRole?: 'learner' | 'coach' | 'partner';
}

export function TrailBuildSummit({ userRole = 'learner' }: TrailBuildSummitProps) {
  const [showRegistration, setShowRegistration] = useState(false);
  const [isRegistered, setIsRegistered] = useState(false);
  const [showWorkspace, setShowWorkspace] = useState(false);
  
  // Countdown timer for next event (example: 45 days from now)
  const [timeLeft, setTimeLeft] = useState({
    days: 45,
    hours: 12,
    minutes: 30,
    seconds: 0
  });

  // Event status: 'upcoming' | 'live' | 'completed'
  const eventStatus = 'upcoming';

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        } else if (prev.hours > 0) {
          return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 };
        } else if (prev.days > 0) {
          return { ...prev, days: prev.days - 1, hours: 23, minutes: 59, seconds: 59 };
        }
        return prev;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  if (showWorkspace && isRegistered) {
    return <TrailBuildWorkspace onClose={() => setShowWorkspace(false)} />;
  }

  return (
    <div className="space-y-8">
      {/* Hero Banner */}
      <div className="relative bg-gradient-to-br from-[#2C6975] via-[#3B6A52] to-[#F9A03F] rounded-2xl overflow-hidden shadow-2xl">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 right-0 w-96 h-96 bg-white rounded-full -mr-48 -mt-48" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-white rounded-full -ml-32 -mb-32" />
        </div>

        <div className="relative z-10 p-12">
          <div className="max-w-4xl">
            <Badge className="bg-white/20 text-white mb-4 px-4 py-2 backdrop-blur-sm">
              <Zap className="w-4 h-4 mr-2" />
              Biannual Virtual Event
            </Badge>
            
            <h1 className="text-6xl text-white mb-4">
              TrailBuild Summit
            </h1>
            <p className="text-2xl text-white/90 mb-8 max-w-2xl">
              Build for Good — A 3-day virtual code-a-thon where community teams create 
              Salesforce solutions for featured nonprofit partners.
            </p>

            {eventStatus === 'upcoming' && (
              <div className="mb-8">
                <p className="text-white/80 mb-4 text-lg">Next Event Starts In:</p>
                <div className="grid grid-cols-4 gap-4 max-w-xl">
                  {[
                    { label: 'Days', value: timeLeft.days },
                    { label: 'Hours', value: timeLeft.hours },
                    { label: 'Minutes', value: timeLeft.minutes },
                    { label: 'Seconds', value: timeLeft.seconds }
                  ].map((item) => (
                    <div key={item.label} className="bg-white/10 backdrop-blur-sm rounded-xl p-4 text-center">
                      <div className="text-4xl text-white mb-1">{String(item.value).padStart(2, '0')}</div>
                      <div className="text-sm text-white/70">{item.label}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="flex items-center space-x-4">
              <button
                onClick={() => setShowRegistration(true)}
                className="px-8 py-4 bg-[#F9A03F] text-white rounded-xl hover:bg-[#e89135] transition-all shadow-xl flex items-center space-x-2 text-lg"
              >
                <Sparkles className="w-5 h-5" />
                <span>Register Early</span>
              </button>
              
              {isRegistered && eventStatus === 'live' && (
                <button
                  onClick={() => setShowWorkspace(true)}
                  className="px-8 py-4 bg-white text-[#2C6975] rounded-xl hover:shadow-xl transition-all flex items-center space-x-2 text-lg"
                >
                  <Zap className="w-5 h-5" />
                  <span>Enter Event Workspace</span>
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Event Timeline */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
        <h2 className="text-2xl text-gray-900 mb-6">How TrailBuild Works</h2>
        
        <div className="grid md:grid-cols-3 gap-6">
          {/* Step 1 */}
          <div className="relative">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#2C6975] to-[#7EB5C1] flex items-center justify-center text-white text-xl">
                1
              </div>
              <h3 className="text-xl text-gray-900">Form Team</h3>
            </div>
            <p className="text-gray-600 mb-3">
              Register individually or with a team. Choose your role: Builder, Analyst, Designer, 
              or Admin. Get matched with complementary skills.
            </p>
            <div className="flex items-center space-x-2 text-sm text-[#2C6975]">
              <Users className="w-4 h-4" />
              <span>2-5 members per team</span>
            </div>
          </div>

          {/* Step 2 */}
          <div className="relative">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#F9A03F] to-[#e89135] flex items-center justify-center text-white text-xl">
                2
              </div>
              <h3 className="text-xl text-gray-900">Build</h3>
            </div>
            <p className="text-gray-600 mb-3">
              3 days to design, develop, and deploy a Salesforce solution for your assigned partner. 
              Use provided sandboxes, collaborate via Slack, get support from sponsors.
            </p>
            <div className="flex items-center space-x-2 text-sm text-[#F9A03F]">
              <Zap className="w-4 h-4" />
              <span>72 hours of building</span>
            </div>
          </div>

          {/* Step 3 */}
          <div className="relative">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#3B6A52] to-[#2C6975] flex items-center justify-center text-white text-xl">
                3
              </div>
              <h3 className="text-xl text-gray-900">Demo</h3>
            </div>
            <p className="text-gray-600 mb-3">
              Present your solution to partners, sponsors, and the community. Top 3 teams receive 
              recognition, prizes, and featured showcase on the platform.
            </p>
            <div className="flex items-center space-x-2 text-sm text-[#3B6A52]">
              <Trophy className="w-4 h-4" />
              <span>Demo Day celebration</span>
            </div>
          </div>
        </div>
      </div>

      {/* Featured Partners */}
      <div className="bg-gradient-to-br from-[#F5F3E8] to-white rounded-xl border border-[#3B6A52]/20 p-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl text-gray-900 mb-2">Featured Partners</h2>
            <p className="text-gray-600">Organizations you'll be building solutions for</p>
          </div>
          <Badge className="bg-[#3B6A52] text-white px-4 py-2">
            Spring 2025 Summit
          </Badge>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {[
            {
              name: 'Green Earth Foundation',
              challenge: 'Volunteer coordination and impact tracking system',
              image: 'https://images.unsplash.com/photo-1758790636662-2f8eec12077e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxub25wcm9maXQlMjBjaGFyaXR5JTIwbG9nb3xlbnwxfHx8fDE3NjI1NTM1MTB8MA&ixlib=rb-4.1.0&q=80&w=1080'
            },
            {
              name: 'Community Connect',
              challenge: 'Member engagement and program delivery platform',
              image: 'https://images.unsplash.com/photo-1603077721634-6826d51d814c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb21tdW5pdHklMjBvcmdhbml6YXRpb258ZW58MXx8fHwxNzYyNTUzNTExfDA&ixlib=rb-4.1.0&q=80&w=1080'
            },
            {
              name: 'Tech for Good Alliance',
              challenge: 'Grant management and reporting automation',
              image: 'https://images.unsplash.com/photo-1760138270903-d95903188730?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0ZWNoJTIwY29tcGFueSUyMGxvZ28lMjB8ZW58MXx8fHwxNzYyNTE5MTgwfDA&ixlib=rb-4.1.0&q=80&w=1080'
            }
          ].map((partner, index) => (
            <div key={index} className="bg-white rounded-xl p-6 border-2 border-gray-200 hover:border-[#3B6A52] hover:shadow-lg transition-all">
              <div className="w-16 h-16 rounded-lg overflow-hidden bg-gray-100 mb-4">
                <ImageWithFallback
                  src={partner.image}
                  alt={partner.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="text-lg text-gray-900 mb-2">{partner.name}</h3>
              <p className="text-sm text-gray-600">{partner.challenge}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Sponsors */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
        <h2 className="text-2xl text-gray-900 mb-6 text-center">Proudly Sponsored By</h2>
        <div className="flex items-center justify-center space-x-8 flex-wrap gap-6">
          {['Salesforce', 'Trailhead', 'Nonprofit Cloud', 'Einstein AI'].map((sponsor) => (
            <div key={sponsor} className="px-8 py-4 bg-gray-50 rounded-lg border border-gray-200 hover:shadow-md transition-all">
              <span className="text-lg text-gray-700">{sponsor}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Past Event Results (if completed) */}
      {eventStatus === 'completed' && (
        <div className="bg-gradient-to-br from-[#2C6975] to-[#3B6A52] rounded-xl p-8 text-white">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl">Fall 2024 Results</h2>
            <Badge className="bg-white/20 text-white">
              <Trophy className="w-3 h-3 mr-1" />
              12 Teams Competed
            </Badge>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mb-8">
            {[
              { place: '1st Place', team: 'Trail Blazers', project: 'Automated Donor Engagement System', points: 500 },
              { place: '2nd Place', team: 'Code for Good', project: 'Volunteer Scheduling Platform', points: 350 },
              { place: '3rd Place', team: 'Impact Builders', project: 'Grant Tracking Dashboard', points: 250 }
            ].map((winner, index) => (
              <div key={index} className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
                <div className="flex items-center space-x-2 mb-3">
                  <Award className="w-5 h-5 text-[#F9A03F]" />
                  <span className="text-[#F9A03F]">{winner.place}</span>
                </div>
                <h3 className="text-xl mb-2">{winner.team}</h3>
                <p className="text-white/80 text-sm mb-3">{winner.project}</p>
                <div className="text-sm text-white/60">+{winner.points} points awarded</div>
              </div>
            ))}
          </div>

          <div className="flex items-center justify-center space-x-4">
            <button className="px-6 py-3 bg-white/20 backdrop-blur-sm text-white rounded-lg hover:bg-white/30 transition-all flex items-center space-x-2">
              <PlayCircle className="w-5 h-5" />
              <span>Watch Demo Day Recap</span>
            </button>
            <button className="px-6 py-3 bg-white text-[#2C6975] rounded-lg hover:shadow-xl transition-all flex items-center space-x-2">
              <ExternalLink className="w-5 h-5" />
              <span>View All Solutions</span>
            </button>
          </div>
        </div>
      )}

      {/* What You'll Earn */}
      <div className="bg-gradient-to-br from-[#7EB5C1]/10 to-[#2C6975]/10 rounded-xl border border-[#2C6975]/20 p-8">
        <h2 className="text-2xl text-gray-900 mb-6">What You'll Earn</h2>
        
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-white rounded-xl p-6 border-2 border-gray-200">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#F9A03F] to-[#e89135] flex items-center justify-center">
                <Trophy className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-lg text-gray-900">TrailBuilder Badge</h3>
                <p className="text-sm text-gray-600">+25 points</p>
              </div>
            </div>
            <p className="text-gray-700 text-sm">
              Exclusive badge for all participants. Showcase your commitment to building for good.
            </p>
          </div>

          <div className="bg-white rounded-xl p-6 border-2 border-gray-200">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#3B6A52] to-[#2C6975] flex items-center justify-center">
                <Sparkles className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-lg text-gray-900">Exclusive Merch</h3>
                <p className="text-sm text-gray-600">Limited edition</p>
              </div>
            </div>
            <p className="text-gray-700 text-sm">
              TrailBuild t-shirts, hoodies, and swag available only to participants.
            </p>
          </div>

          <div className="bg-white rounded-xl p-6 border-2 border-gray-200">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#7EB5C1] to-[#2C6975] flex items-center justify-center">
                <Award className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-lg text-gray-900">Portfolio Project</h3>
                <p className="text-sm text-gray-600">Real-world experience</p>
              </div>
            </div>
            <p className="text-gray-700 text-sm">
              Add your TrailBuild solution to your portfolio with partner testimonials.
            </p>
          </div>

          <div className="bg-white rounded-xl p-6 border-2 border-gray-200">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#2C6975] to-[#7EB5C1] flex items-center justify-center">
                <Users className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-lg text-gray-900">Community Connections</h3>
                <p className="text-sm text-gray-600">Network building</p>
              </div>
            </div>
            <p className="text-gray-700 text-sm">
              Build lasting relationships with partners, sponsors, and fellow builders.
            </p>
          </div>
        </div>
      </div>

      {/* Registration Modal */}
      {showRegistration && (
        <TrailBuildRegistration
          onClose={() => setShowRegistration(false)}
          onRegister={() => {
            setIsRegistered(true);
            setShowRegistration(false);
          }}
        />
      )}
    </div>
  );
}
