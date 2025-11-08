/**
 * LEARNER HOME DASHBOARD
 * 
 * =============================================================================
 * SALESFORCE ARCHITECTURE MAPPING
 * =============================================================================
 * 
 * Experience Page: ExpPage_Home
 * URL Path: /s/home
 * Primary Audience: Learner
 * Secondary Audiences: None (Learner-only view)
 * 
 * =============================================================================
 * SALESFORCE OBJECTS & FIELDS
 * =============================================================================
 * 
 * Primary Objects:
 * - Trail__c (Active learning trail for current user)
 *   Fields: Name, Status__c, Progress_Percentage__c, Current_Week__c, 
 *           Total_Points_Earned__c, Start_Date__c, Target_Completion_Date__c
 * 
 * - User (Current learner and coach)
 *   Fields: Name, Email, SmallPhotoUrl, Contact.Cohort__c, Contact.Program_Start_Date__c
 * 
 * - Coach_Assignment__c (Learner's assigned coach)
 *   Fields: Coach__c (Lookup: User), Learner__c (Lookup: User), 
 *           Assignment_Date__c, Status__c
 * 
 * - Points_Transaction__c (All points earned/redeemed)
 *   Queries: Rollup by Transaction_Type__c and Source__c
 *   Fields: Points__c, Transaction_Type__c, Source__c, Transaction_Date__c
 * 
 * - Project__c (Capstone project)
 *   Fields: Name, Description__c, Status__c, Progress_Percentage__c, 
 *           Points_Value__c, Points_Earned__c, Due_Date__c, Current_Phase__c,
 *           Repo_Link__c, Linear_Project_Link__c
 * 
 * - Event__c (Upcoming sessions, meetings, standups)
 *   Fields: Name, Event_Date__c, Event_Time__c, Event_Type__c, Zoom_Link__c,
 *           Calendar_Color__c
 * 
 * - Task (Penny's curated focus items - from multiple sources)
 *   Custom query combining: Project__c tasks, Trail_Module__c assignments,
 *   Assessment__c deadlines, and custom Task records
 * 
 * =============================================================================
 * CMS CONTENT REFERENCES
 * =============================================================================
 * 
 * Hero Banner:
 * - [CMS:learner_home_hero_title] → "Welcome back, {User.FirstName}!"
 * - [CMS:learner_home_cohort_label] → "The Guided Trail • {Contact.Cohort__c}"
 * - [CMS:learner_home_program_description] → "Salesforce Admin & Development Program"
 * 
 * Profile Images:
 * - User.SmallPhotoUrl → Learner profile picture
 * - Coach__r.SmallPhotoUrl → Coach profile picture
 * 
 * Quick Links:
 * - [CMS:quick_links_calendar_url] → Calendar external link
 * - [CMS:quick_links_slack_url] → Slack workspace URL
 * 
 * =============================================================================
 * APEX CONTROLLERS & DATA SOURCES
 * =============================================================================
 * 
 * LearnerHomeController.cls:
 * - getCurrentTrail() → Returns active Trail__c record with progress
 * - getPointsBreakdown() → Aggregates Points_Transaction__c by Source__c
 * - getCapstoneProject() → Returns active Project__c (Type = 'Capstone')
 * - getUpcomingSessions() → Returns next 5 Event__c records ordered by date
 * - getPennyFocusItems() → Custom SOQL combining tasks from multiple objects
 * - getCoachInfo() → Returns Coach__c from Coach_Assignment__c
 * 
 * =============================================================================
 * INTEGRATION POINTS
 * =============================================================================
 * 
 * 1. Penny AI Integration:
 *    - AI-curated focus items (critical path detection)
 *    - Click "Ask Penny" → Opens PennyChat component
 *    - API: POST /services/apexrest/penny/focus-recommendations
 * 
 * 2. Capstone GitHub Repository:
 *    - Project__c.Repo_Link__c → Opens GitHub repo in new tab
 *    - Auto-created via GitHubIntegrationService.cls on project creation
 * 
 * 3. Calendar Integration:
 *    - "View Full Calendar" → Experience Cloud calendar page
 *    - Events synced from Event__c object
 * 
 * 4. Slack Deep Links:
 *    - Quick Links → Opens team Slack workspace
 *    - URL stored in Custom Metadata: Slack_Workspace_URL__mdt
 * 
 * =============================================================================
 * FLOWS & AUTOMATION
 * =============================================================================
 * 
 * 1. Flow: Update_Trail_Progress
 *    Trigger: Module completion
 *    Action: Recalculates Trail__c.Progress_Percentage__c
 * 
 * 2. Flow: Award_Points
 *    Trigger: Task completion, module finish, assessment submission
 *    Action: Creates Points_Transaction__c record
 * 
 * 3. Flow: Schedule_Coaching_Session
 *    Trigger: "Schedule 1:1 Session" button click
 *    Action: Creates Event__c, sends calendar invite
 * 
 * =============================================================================
 * LWC COMPONENT MAPPING
 * =============================================================================
 * 
 * React Component → LWC Component:
 * - <ProgressRing> → <c-progress-ring>
 * - <TrailImpactMeter> → <c-trail-impact-meter>
 * - <CommunityEngagementMeter> → <c-community-engagement-meter>
 * 
 * =============================================================================
 * RESPONSIVE DESIGN
 * =============================================================================
 * 
 * Breakpoints:
 * - Mobile: < 768px (single column, collapsible sections)
 * - Tablet: 768px - 1023px (2-column grid)
 * - Desktop: 1024px+ (3-column grid with sidebar)
 * 
 * Grid: 12-column system
 * Margins: 16px (mobile) / 40px (tablet) / 80px (desktop)
 * 
 * =============================================================================
 * ACCESSIBILITY
 * =============================================================================
 * 
 * - ARIA labels on all interactive elements
 * - Keyboard navigation support (tab order)
 * - Focus indicators on buttons (ring-2)
 * - Alt text on all images
 * - Semantic HTML (nav, main, section)
 * 
 * =============================================================================
 */

import { Trophy, Target, BookOpen, MessageSquare, TrendingUp, Clock, Award, Calendar, Users, Sparkles, ChevronRight, CheckCircle, ExternalLink, ChevronDown, ArrowRight, Heart, LayoutDashboard, Map, CalendarDays, Zap } from 'lucide-react';
import { ProgressRing } from './ProgressRing';
import { TrailImpactMeter } from './TrailImpactMeter';
import { CommunityEngagementMeter } from './CommunityEngagementMeter';
import { PageType } from '../App';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from './ui/collapsible';
import { Avatar, AvatarImage, AvatarFallback } from './ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { useState } from 'react';
import profileImage from 'figma:asset/f5ce76cc9cdd7a0e710f2a4ab182ac3c118f5ea0.png';
import { CMS, CMSWithVars } from './CMSContent';
import { CareerNavigator } from './CareerNavigator';
import { DailyChallenges } from './DailyChallenges';
import { PennyRecommendations } from './PennyRecommendations';
import { StreakTracker } from './StreakTracker';
import { LeaderboardWidget } from './LeaderboardWidget';

interface LearnerHomeProps {
  onNavigate: (page: PageType) => void;
}

export function LearnerHome({ onNavigate }: LearnerHomeProps) {
  const [activeTab, setActiveTab] = useState('overview');
  const [isPointsOpen, setIsPointsOpen] = useState(true);
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const [isTrailMissionsOpen, setIsTrailMissionsOpen] = useState(true);
  const [isPrioritiesOpen, setIsPrioritiesOpen] = useState(true);
  const [isSessionsOpen, setIsSessionsOpen] = useState(true);
  const [showCommunityEngagement, setShowCommunityEngagement] = useState(false);

  const missions = [
    { id: 1, title: 'Salesforce Admin Essentials', type: 'Trail Mission', progress: 75, color: '#2C6975', dueDate: 'Mar 12' },
    { id: 2, title: 'Data Modeling Fundamentals', type: 'Trail Mission', progress: 45, color: '#7EB5C1', dueDate: 'Mar 15' },
    { id: 3, title: 'Process Automation Basics', type: 'Trail Mission', progress: 90, color: '#3B6A52', dueDate: 'Mar 10' },
  ];

  const dailyMissions = [
    { id: 1, title: 'Complete 2 Trailhead Modules', progress: 50, due: 'Today' },
    { id: 2, title: 'Submit Code Review', progress: 100, due: 'Completed' },
    { id: 3, title: 'Attend Team Standup', progress: 100, due: 'Completed' },
  ];

  // Points System (3500 total for Guided Trail)
  const pointsSystem = {
    total: 3500,
    earned: 2380,
    breakdown: [
      { category: 'Capstone Project', total: 1400, earned: 520, percentage: 40 },
      { category: 'Trail Missions', total: 525, earned: 425, percentage: 15 },
      { category: 'Special Assignments', total: 525, earned: 380, percentage: 15 },
      { category: 'Coach Feedback', total: 350, earned: 285, percentage: 10 },
      { category: 'Skills IQ Assessment', total: 350, earned: 280, percentage: 10 },
      { category: 'Meeting Engagement', total: 175, earned: 155, percentage: 5 },
      { category: 'Slack Participation', total: 175, earned: 135, percentage: 5 },
    ]
  };

  // Current Learner Info (from Salesforce Experience Cloud User Record)
  const currentLearner = {
    name: 'Alex Johnson',
    email: 'alex.johnson@email.com',
    profilePicture: profileImage, // From Salesforce Experience Cloud User.SmallPhotoUrl
    initials: 'AJ',
    cohort: 'Spring 2025',
    programStartDate: 'Jan 15, 2025'
  };

  // Current Coach Info
  const currentCoach = {
    name: 'Sarah Martinez',
    title: 'Senior Learning Coach',
    avatar: 'SM',
    slackId: '@sarah.martinez'
  };

  const upcomingSessions = [
    { id: 1, title: 'Weekly Stand-up', date: 'Mon', time: '9:00 AM', color: '#7EB5C1', type: 'standup' },
    { id: 2, title: '1:1 Coaching', date: 'Tue', time: '2:00 PM', color: '#2C6975', type: 'coaching' },
    { id: 3, title: 'Campfire Session', date: 'Wed', time: '4:00 PM', color: '#F9A03F', type: 'campfire' },
    { id: 4, title: 'Salesforce Admin Fundamentals', date: 'Thu', time: '10:00 AM', color: '#3B6A52', type: 'class' },
    { id: 5, title: 'Office Hours', date: 'Fri', time: '3:00 PM', color: '#9333ea', type: 'office-hours' },
  ];

  // Penny AI Curated Focus Items - Intelligent prioritization across all activities
  const pennyFocusItems = [
    {
      id: 1,
      title: 'Submit Week 6 Status Report',
      source: 'Capstone Project',
      priority: 'critical',
      dueDate: 'Today',
      type: 'task',
      description: 'Required weekly update for coach and nonprofit partner',
      action: () => onNavigate('capstone-projects'),
      icon: Trophy,
      color: '#F9A03F'
    },
    {
      id: 2,
      title: 'Fix Critical Bug: Batch Job Null Pointer',
      source: 'Capstone Project',
      priority: 'high',
      dueDate: 'Mar 12',
      type: 'task',
      description: 'BUG-001 blocking automation phase completion',
      action: () => onNavigate('capstone-projects'),
      icon: Target,
      color: '#F9A03F'
    },
    {
      id: 3,
      title: 'Complete Process Automation Module',
      source: 'Trail Missions',
      priority: 'high',
      dueDate: 'Mar 10',
      type: 'task',
      description: '90% complete - just 1 module remaining',
      action: () => onNavigate('trail-missions'),
      icon: BookOpen,
      color: '#3B6A52'
    },
    {
      id: 4,
      title: 'Write 4 Apex Test Classes',
      source: 'Capstone Project',
      priority: 'medium',
      dueDate: 'Mar 21',
      type: 'task',
      description: 'Need 85% coverage for deployment (currently 67%)',
      action: () => onNavigate('capstone-projects'),
      icon: Target,
      color: '#2C6975'
    },
    {
      id: 5,
      title: 'Review PR #48 - Apex Trigger',
      source: 'Capstone Project',
      priority: 'medium',
      dueDate: 'Mar 8',
      type: 'task',
      description: 'Open for 2 days with pending checks',
      action: () => onNavigate('capstone-projects'),
      icon: Target,
      color: '#2C6975'
    },
    {
      id: 6,
      title: 'Complete Data Modeling Quiz',
      source: 'Learning Center',
      priority: 'medium',
      dueDate: 'Mar 11',
      type: 'task',
      description: 'Assessment for current learning path',
      action: () => onNavigate('learning-center'),
      icon: BookOpen,
      color: '#7EB5C1'
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Hero Banner */}
      <div className="bg-gradient-to-r from-[#2C6975] to-[#7EB5C1] dark:from-[#1e4a53] dark:to-[#5a9fb0] rounded-2xl shadow-lg p-8 mb-6 text-white relative overflow-hidden">
        <div className="flex items-start justify-between relative z-10">
          <div className="flex-1">
            <div className="mb-2">
              <h2 className="text-3xl mb-2">{CMSWithVars('learner_home_welcome_title', { name: currentLearner.name.split(' ')[0] })}</h2>
              <p className="text-blue-100 mb-1">{CMSWithVars('learner_home_cohort_label', { cohort: currentLearner.cohort })}</p>
              <p className="text-blue-100/80 text-sm mb-4">{CMS('learner_home_program_label')}</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
              <div className="flex-1">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm">{CMS('learner_home_progress_label')}</span>
                  <span className="text-sm">68%</span>
                </div>
                <div className="w-full bg-white/20 rounded-full h-3">
                  <div className="bg-sun-amber h-3 rounded-full" style={{ width: '68%' }}></div>
                </div>
                <p className="text-xs text-blue-100/70 mt-1">{CMSWithVars('learner_home_week_label', { current: '7', total: '12' })}</p>
              </div>
              
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 rounded-lg bg-white/20 flex items-center justify-center">
                  <Trophy className="w-7 h-7 text-sun-amber" />
                </div>
                <div>
                  <p className="text-sm opacity-90">{CMS('learner_home_points_label')}</p>
                  <p className="text-xl">{pointsSystem.earned} / {pointsSystem.total}</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0">
                  <Users className="w-7 h-7 text-white" />
                </div>
                <div>
                  <p className="text-sm opacity-90">{CMS('learner_home_coach_label')}</p>
                  <p className="text-lg">{currentCoach.name}</p>
                  <button 
                    className="mt-2 text-xs bg-white/20 hover:bg-white/30 px-3 py-1.5 rounded-lg transition-colors backdrop-blur-sm border border-white/30"
                  >
                    {CMS('learner_home_btn_schedule_session')}
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="hidden xl:block ml-8">
            <Avatar className="w-32 h-32 border-4 border-white/30 shadow-xl">
              <AvatarImage src={currentLearner.profilePicture} alt={currentLearner.name} />
              <AvatarFallback className="bg-white/20 text-white text-3xl">
                {currentLearner.initials}
              </AvatarFallback>
            </Avatar>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-4 mb-8 bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700">
          <TabsTrigger value="overview" className="flex items-center justify-center space-x-2 data-[state=active]:bg-[#2C6975] dark:data-[state=active]:bg-[#7EB5C1] data-[state=active]:text-white dark:data-[state=active]:text-slate-900">
            <LayoutDashboard className="w-4 h-4" />
            <span className="hidden sm:inline">Overview</span>
          </TabsTrigger>
          <TabsTrigger value="trail" className="flex items-center justify-center space-x-2 data-[state=active]:bg-[#2C6975] dark:data-[state=active]:bg-[#7EB5C1] data-[state=active]:text-white dark:data-[state=active]:text-slate-900">
            <Map className="w-4 h-4" />
            <span className="hidden sm:inline">My Trail</span>
          </TabsTrigger>
          <TabsTrigger value="penny" className="flex items-center justify-center space-x-2 data-[state=active]:bg-[#F9A03F] data-[state=active]:text-white">
            <Sparkles className="w-4 h-4" />
            <span className="hidden sm:inline">Penny's Picks</span>
          </TabsTrigger>
          <TabsTrigger value="growth" className="flex items-center justify-center space-x-2 data-[state=active]:bg-[#2C6975] dark:data-[state=active]:bg-[#7EB5C1] data-[state=active]:text-white dark:data-[state=active]:text-slate-900">
            <Zap className="w-4 h-4" />
            <span className="hidden sm:inline">Growth</span>
          </TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview" className="space-y-6">
          <div className="grid lg:grid-cols-3 gap-6">
            {/* Left & Center Columns */}
            <div className="lg:col-span-2 space-y-6">
              {/* Penny AI Focus Widget */}
              <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-gray-200 dark:border-slate-700 overflow-hidden">
                <div className="p-6 bg-gradient-to-r from-[#F9A03F]/10 to-[#F9A03F]/5 dark:from-[#F9A03F]/20 dark:to-[#F9A03F]/10 border-b border-gray-200 dark:border-slate-700">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#F9A03F] to-[#e89135] text-white flex items-center justify-center shadow-md">
                        <Sparkles className="w-6 h-6" />
                      </div>
                      <div>
                        <h3 className="text-gray-900 dark:text-white flex items-center space-x-2">
                          <span>{CMS('learner_home_penny_focus_title')}</span>
                        </h3>
                        <p className="text-sm text-gray-600 dark:text-slate-400">{CMS('learner_home_penny_focus_description')}</p>
                      </div>
                    </div>
                    <button
                      onClick={() => onNavigate('penny-chat')}
                      className="px-4 py-2 bg-sun-amber text-white rounded-lg hover:bg-sun-amber-dark transition-colors text-sm flex items-center space-x-2"
                    >
                      <MessageSquare className="w-4 h-4" />
                      <span>{CMS('learner_home_btn_ask_penny')}</span>
                    </button>
                  </div>
                </div>

                {/* Split View Content */}
                <div className="grid md:grid-cols-2 divide-x divide-gray-200 dark:divide-slate-700">
                  {/* Left: Priorities & Tasks - Collapsible */}
                  <Collapsible open={isPrioritiesOpen} onOpenChange={setIsPrioritiesOpen}>
                    <div className="p-6">
                      <CollapsibleTrigger className="w-full flex items-center justify-between mb-4 hover:opacity-80 transition-opacity">
                        <h4 className="text-gray-900 dark:text-white flex items-center space-x-2">
                          <Target className="w-5 h-5" />
                          <span>Focus Items</span>
                        </h4>
                        <ChevronDown className={`w-5 h-5 text-gray-400 transition-transform ${isPrioritiesOpen ? 'rotate-180' : ''}`} />
                      </CollapsibleTrigger>
                      
                      <CollapsibleContent>
                        <div className="space-y-3">
                          {pennyFocusItems.slice(0, 4).map((item) => {
                            const Icon = item.icon;
                            return (
                              <button
                                key={item.id}
                                onClick={item.action}
                                className={`w-full text-left p-3 rounded-lg border-2 transition-all hover:shadow-md ${
                                  item.priority === 'critical' 
                                    ? 'border-red-300 dark:border-red-700 bg-red-50 dark:bg-red-900/20' 
                                    : item.priority === 'high' 
                                    ? 'border-orange-300 dark:border-orange-700 bg-orange-50 dark:bg-orange-900/20' 
                                    : 'border-gray-200 dark:border-slate-700 bg-gray-50 dark:bg-slate-700/50'
                                }`}
                              >
                                <div className="flex items-start space-x-3">
                                  <div 
                                    className="w-8 h-8 rounded-lg flex items-center justify-center text-white flex-shrink-0"
                                    style={{ backgroundColor: item.color }}
                                  >
                                    <Icon className="w-4 h-4" />
                                  </div>
                                  <div className="flex-1 min-w-0">
                                    <h5 className="text-sm text-gray-900 dark:text-white mb-1">{item.title}</h5>
                                    <p className="text-xs text-gray-600 dark:text-slate-400 mb-2">{item.description}</p>
                                    <div className="flex items-center justify-between text-xs">
                                      <span className="text-gray-500 dark:text-slate-500">{item.source}</span>
                                      <span className={`${
                                        item.priority === 'critical' ? 'text-red-600 dark:text-red-400' : 
                                        item.priority === 'high' ? 'text-orange-600 dark:text-orange-400' : 
                                        'text-gray-600 dark:text-slate-400'
                                      }`}>
                                        Due: {item.dueDate}
                                      </span>
                                    </div>
                                  </div>
                                </div>
                              </button>
                            );
                          })}
                        </div>
                      </CollapsibleContent>
                    </div>
                  </Collapsible>

                  {/* Right: Upcoming Sessions - Collapsible */}
                  <Collapsible open={isSessionsOpen} onOpenChange={setIsSessionsOpen}>
                    <div className="p-6">
                      <CollapsibleTrigger className="w-full flex items-center justify-between mb-4 hover:opacity-80 transition-opacity">
                        <h4 className="text-gray-900 dark:text-white flex items-center space-x-2">
                          <Calendar className="w-5 h-5" />
                          <span>This Week</span>
                        </h4>
                        <ChevronDown className={`w-5 h-5 text-gray-400 transition-transform ${isSessionsOpen ? 'rotate-180' : ''}`} />
                      </CollapsibleTrigger>
                      
                      <CollapsibleContent>
                        <div className="space-y-2">
                          {upcomingSessions.map((session) => (
                            <div 
                              key={session.id}
                              className="p-3 rounded-lg bg-gray-50 dark:bg-slate-700/50 hover:bg-gray-100 dark:hover:bg-slate-700 transition-colors cursor-pointer border border-transparent hover:border-gray-200 dark:hover:border-slate-600"
                            >
                              <div className="flex items-center space-x-3">
                                <div 
                                  className="w-2 h-2 rounded-full flex-shrink-0"
                                  style={{ backgroundColor: session.color }}
                                ></div>
                                <div className="flex-1 min-w-0">
                                  <p className="text-sm text-gray-900 dark:text-white truncate">{session.title}</p>
                                  <div className="flex items-center space-x-3 text-xs text-gray-600 dark:text-slate-400 mt-1">
                                    <span>{session.date}</span>
                                    <span>•</span>
                                    <span>{session.time}</span>
                                  </div>
                                </div>
                                <ExternalLink className="w-4 h-4 text-gray-400 flex-shrink-0" />
                              </div>
                            </div>
                          ))}
                          <button 
                            onClick={() => setActiveTab('schedule')}
                            className="w-full mt-2 text-sm text-[#2C6975] dark:text-[#7EB5C1] hover:underline"
                          >
                            View full calendar →
                          </button>
                        </div>
                      </CollapsibleContent>
                    </div>
                  </Collapsible>
                </div>
              </div>

              {/* Capstone Project */}
              <div className="bg-gradient-to-br from-[#F9A03F]/5 to-[#F9A03F]/10 dark:from-[#F9A03F]/10 dark:to-[#F9A03F]/20 rounded-xl p-6 border-2 border-[#F9A03F]/30 dark:border-[#F9A03F]/50">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 rounded-lg bg-sun-amber text-white flex items-center justify-center">
                      <Trophy className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="text-gray-900 dark:text-white">Your Capstone Project</h3>
                      <p className="text-sm text-gray-600 dark:text-slate-400">40% of your total program points</p>
                    </div>
                  </div>
                  <button
                    onClick={() => onNavigate('capstone-projects')}
                    className="px-4 py-2 bg-sun-amber text-white rounded-lg hover:bg-sun-amber-dark transition-colors flex items-center space-x-2"
                  >
                    <span>View Full Details</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
                
                <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-slate-700">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <h4 className="text-gray-900 dark:text-white mb-2">Community Service Volunteer Management System</h4>
                      <p className="text-sm text-gray-600 dark:text-slate-400 mb-3">
                        Building a Salesforce application to manage volunteer programs for Hearts & Hands Community Services
                      </p>
                      <div className="flex items-center space-x-6 text-sm text-gray-600 dark:text-slate-400">
                        <div className="flex items-center space-x-2">
                          <Clock className="w-4 h-4" />
                          <span>Due: Apr 8, 2025</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Target className="w-4 h-4" />
                          <span>520 / 1,400 points</span>
                        </div>
                      </div>
                    </div>
                    <ProgressRing progress={37} size={80} color="#F9A03F" />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-3 mb-4">
                    <div className="bg-green-50 dark:bg-green-900/30 border border-green-200 dark:border-green-700 rounded-lg p-3">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-sm text-gray-700 dark:text-slate-300">Completed Phases</span>
                        <CheckCircle className="w-4 h-4 text-green-600 dark:text-green-400" />
                      </div>
                      <p className="text-xl text-gray-900 dark:text-white">2 / 7</p>
                    </div>
                    <div className="bg-blue-50 dark:bg-blue-900/30 border border-blue-200 dark:border-blue-700 rounded-lg p-3">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-sm text-gray-700 dark:text-slate-300">Current Phase</span>
                        <Sparkles className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                      </div>
                      <p className="text-sm text-gray-900 dark:text-white">Automation & Logic</p>
                    </div>
                  </div>
                  
                  <button
                    onClick={() => onNavigate('capstone-projects')}
                    className="w-full py-2 border-2 border-sun-amber text-sun-amber dark:text-[#F9A03F] rounded-lg hover:bg-sun-amber hover:text-white transition-colors flex items-center justify-center space-x-2"
                  >
                    <span>Open Project Workspace</span>
                    <ExternalLink className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Career Navigator */}
              <CareerNavigator
                currentLevel="Explorer"
                completedMilestones={['skills-assessment']}
                currentMilestone="trail-missions"
                totalPoints={2380}
                certificationsEarned={0}
                onNavigate={onNavigate}
              />
            </div>

            {/* Right Sidebar */}
            <div className="space-y-6">
              {/* Daily Challenges */}
              <DailyChallenges
                onNavigate={onNavigate}
                currentStreak={3}
                completedToday={[]}
              />

              {/* Learning Streaks */}
              <StreakTracker
                currentStreak={12}
                longestStreak={28}
                totalActiveDays={45}
                lastActiveDate={new Date().toISOString().split('T')[0]}
                streakSaverAvailable={true}
                milestonesReached={[7]}
              />

              {/* Leaderboard Widget */}
              <LeaderboardWidget
                category="points"
                timeframe="weekly"
                limit={5}
                currentUserId="user-4"
                onViewFull={() => onNavigate('leaderboard')}
              />

              {/* Quick Links */}
              <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-gray-200 dark:border-slate-700 p-6">
                <h3 className="text-gray-900 dark:text-white mb-4">Quick Links</h3>
                <div className="space-y-2">
                  <button 
                    onClick={() => onNavigate('program-calendar')}
                    className="w-full text-left px-4 py-3 rounded-lg hover:bg-gray-50 dark:hover:bg-slate-700 transition-colors flex items-center justify-between"
                  >
                    <span className="text-sm text-gray-900 dark:text-white">Program Calendar</span>
                    <ChevronRight className="w-4 h-4 text-gray-400" />
                  </button>
                  <a 
                    href="https://slack.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full text-left px-4 py-3 rounded-lg hover:bg-gray-50 dark:hover:bg-slate-700 transition-colors flex items-center justify-between"
                  >
                    <span className="text-sm text-gray-900 dark:text-white">Open Slack</span>
                    <ExternalLink className="w-4 h-4 text-gray-400" />
                  </a>
                  <button 
                    onClick={() => onNavigate('community')}
                    className="w-full text-left px-4 py-3 rounded-lg hover:bg-gray-50 dark:hover:bg-slate-700 transition-colors flex items-center justify-between"
                  >
                    <span className="text-sm text-gray-900 dark:text-white">Community</span>
                    <ChevronRight className="w-4 h-4 text-gray-400" />
                  </button>
                  <button 
                    onClick={() => onNavigate('learning-center')}
                    className="w-full text-left px-4 py-3 rounded-lg hover:bg-gray-50 dark:hover:bg-slate-700 transition-colors flex items-center justify-between"
                  >
                    <span className="text-sm text-gray-900 dark:text-white">Learning Center</span>
                    <ChevronRight className="w-4 h-4 text-gray-400" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </TabsContent>

        {/* My Trail Tab */}
        <TabsContent value="trail" className="space-y-6">
          <div className="grid lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-6">
              {/* Trail Missions */}
              <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-gray-200 dark:border-slate-700 overflow-hidden">
                <div className="p-6 flex items-center justify-between border-b border-gray-200 dark:border-slate-700">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 rounded-lg bg-penny-guide text-white flex items-center justify-center">
                      <BookOpen className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="text-gray-900 dark:text-white">Trail Missions</h3>
                      <p className="text-sm text-gray-600 dark:text-slate-400">3 active learning paths</p>
                    </div>
                  </div>
                  <button
                    onClick={() => onNavigate('trail-missions')}
                    className="px-4 py-2 bg-penny-guide dark:bg-[#3B6A52] text-white rounded-lg hover:bg-penny-guide-dark transition-colors text-sm flex items-center space-x-1"
                  >
                    <span>View All</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
                <div className="p-6 space-y-4">
                  {missions.map((mission) => (
                    <div key={mission.id} className="p-4 bg-gray-50 dark:bg-slate-700/50 rounded-lg border border-gray-200 dark:border-slate-600">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <h4 className="text-gray-900 dark:text-white mb-1">{mission.title}</h4>
                          <p className="text-sm text-gray-600 dark:text-slate-400">{mission.type} • Due {mission.dueDate}</p>
                        </div>
                        <span className="text-sm text-gray-900 dark:text-white">{mission.progress}%</span>
                      </div>
                      <div className="w-full bg-gray-200 dark:bg-slate-600 rounded-full h-2">
                        <div 
                          className="h-2 rounded-full transition-all"
                          style={{ width: `${mission.progress}%`, backgroundColor: mission.color }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Trail Impact Meter */}
              <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-gray-200 dark:border-slate-700 p-6">
                <h3 className="text-gray-900 dark:text-white mb-4">Trail Impact</h3>
                <TrailImpactMeter />
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Points Breakdown */}
              <Collapsible open={isPointsOpen} onOpenChange={setIsPointsOpen}>
                <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-gray-200 dark:border-slate-700 overflow-hidden">
                  <CollapsibleTrigger className="w-full p-6 flex items-center justify-between hover:bg-gray-50 dark:hover:bg-slate-700 transition-colors">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#F9A03F] to-[#F9A03F]/70 text-white flex items-center justify-center">
                        <Award className="w-6 h-6" />
                      </div>
                      <div className="text-left">
                        <h3 className="text-gray-900 dark:text-white">Points Breakdown</h3>
                        <p className="text-sm text-gray-600 dark:text-slate-400">{pointsSystem.earned} / {pointsSystem.total} points earned ({Math.round((pointsSystem.earned / pointsSystem.total) * 100)}%)</p>
                      </div>
                    </div>
                    <ChevronDown className={`w-5 h-5 text-gray-400 transition-transform ${isPointsOpen ? 'rotate-180' : ''}`} />
                  </CollapsibleTrigger>
                  
                  <CollapsibleContent>
                    <div className="px-6 pb-6 space-y-3">
                      {pointsSystem.breakdown.map((item, index) => {
                        const percentage = Math.round((item.earned / item.total) * 100);
                        return (
                          <div key={index} className="space-y-2">
                            <div className="flex items-center justify-between text-sm">
                              <div className="flex items-center space-x-2">
                                <span className="text-gray-900 dark:text-white">{item.category}</span>
                                <span className="text-xs text-gray-500 dark:text-slate-500">({item.percentage}% of program)</span>
                              </div>
                              <span className="text-gray-600 dark:text-slate-400">{item.earned} / {item.total}</span>
                            </div>
                            <div className="w-full bg-gray-100 dark:bg-slate-700 rounded-full h-2">
                              <div 
                                className="bg-sun-amber h-2 rounded-full transition-all duration-500"
                                style={{ width: `${percentage}%` }}
                              ></div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </CollapsibleContent>
                </div>
              </Collapsible>

              {/* Community Impact */}
              <Collapsible open={showCommunityEngagement} onOpenChange={setShowCommunityEngagement}>
                <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-gray-200 dark:border-slate-700 overflow-hidden">
                  <CollapsibleTrigger className="w-full p-6 flex items-center justify-between hover:bg-gray-50 dark:hover:bg-slate-700 transition-colors">
                    <div className="flex items-center space-x-3">
                      <div className={`w-10 h-10 rounded-lg flex items-center justify-center transition-all ${
                        showCommunityEngagement 
                          ? 'bg-penny-guide text-white' 
                          : 'bg-gray-100 dark:bg-slate-700 text-gray-600 dark:text-slate-400'
                      }`}>
                        <Heart className="w-6 h-6" />
                      </div>
                      <div className="text-left">
                        <h3 className="text-gray-900 dark:text-white">Community Impact</h3>
                        <p className="text-sm text-gray-600 dark:text-slate-400">147 engagement points</p>
                      </div>
                    </div>
                    <ChevronDown className={`w-5 h-5 text-gray-400 transition-transform ${showCommunityEngagement ? 'rotate-180' : ''}`} />
                  </CollapsibleTrigger>
                  
                  <CollapsibleContent>
                    <div className="px-6 pb-6">
                      <CommunityEngagementMeter currentPoints={147} showLeaderboard={true} />
                    </div>
                  </CollapsibleContent>
                </div>
              </Collapsible>
            </div>
          </div>
        </TabsContent>

        {/* Penny's Recommendations Tab */}
        <TabsContent value="penny" className="space-y-6">
          <div className="grid lg:grid-cols-3 gap-6">
            {/* Main Content - 2 Columns */}
            <div className="lg:col-span-2 space-y-6">
              {/* Penny AI Recommendations */}
              <PennyRecommendations
                onNavigate={onNavigate}
                userId="current-user"
                userSkills={[
                  { name: 'Apex Development', level: 2 },
                  { name: 'Lightning Web Components', level: 3 },
                  { name: 'Data Modeling', level: 4 },
                  { name: 'Process Automation', level: 3 },
                ]}
                completedTrails={[]}
                currentLevel="Explorer"
              />

              {/* Penny's Priority Focus Items */}
              <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-gray-200 dark:border-slate-700 overflow-hidden">
                <div className="p-6 bg-gradient-to-r from-[#F9A03F]/10 to-[#F9A03F]/5 dark:from-[#F9A03F]/20 dark:to-[#F9A03F]/10 border-b border-gray-200 dark:border-slate-700">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#F9A03F] to-[#e89135] text-white flex items-center justify-center shadow-md">
                        <Target className="w-6 h-6" />
                      </div>
                      <div>
                        <h3 className="text-gray-900 dark:text-white">Critical Path Focus</h3>
                        <p className="text-sm text-gray-600 dark:text-slate-400">Tasks prioritized by impact and urgency</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="p-6 space-y-3">
                  {pennyFocusItems.map((item) => {
                    const Icon = item.icon;
                    return (
                      <button
                        key={item.id}
                        onClick={item.action}
                        className={`w-full text-left p-4 rounded-lg border-2 transition-all hover:shadow-md ${
                          item.priority === 'critical' 
                            ? 'border-red-300 dark:border-red-700 bg-red-50 dark:bg-red-900/20' 
                            : item.priority === 'high' 
                            ? 'border-orange-300 dark:border-orange-700 bg-orange-50 dark:bg-orange-900/20' 
                            : 'border-gray-200 dark:border-slate-700 bg-gray-50 dark:bg-slate-700/50'
                        }`}
                      >
                        <div className="flex items-start space-x-3">
                          <div 
                            className="w-10 h-10 rounded-lg flex items-center justify-center text-white flex-shrink-0"
                            style={{ backgroundColor: item.color }}
                          >
                            <Icon className="w-5 h-5" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between mb-2">
                              <h5 className="text-sm text-gray-900 dark:text-white">{item.title}</h5>
                              <span className={`text-xs px-2 py-1 rounded-full ${
                                item.priority === 'critical' ? 'bg-red-100 dark:bg-red-900/40 text-red-700 dark:text-red-300' : 
                                item.priority === 'high' ? 'bg-orange-100 dark:bg-orange-900/40 text-orange-700 dark:text-orange-300' : 
                                'bg-gray-100 dark:bg-slate-700 text-gray-600 dark:text-slate-400'
                              }`}>
                                {item.priority}
                              </span>
                            </div>
                            <p className="text-xs text-gray-600 dark:text-slate-400 mb-2">{item.description}</p>
                            <div className="flex items-center justify-between text-xs">
                              <span className="text-gray-500 dark:text-slate-500 flex items-center space-x-1">
                                <BookOpen className="w-3 h-3" />
                                <span>{item.source}</span>
                              </span>
                              <span className={`flex items-center space-x-1 ${
                                item.priority === 'critical' ? 'text-red-600 dark:text-red-400' : 
                                item.priority === 'high' ? 'text-orange-600 dark:text-orange-400' : 
                                'text-gray-600 dark:text-slate-400'
                              }`}>
                                <Clock className="w-3 h-3" />
                                <span>Due: {item.dueDate}</span>
                              </span>
                            </div>
                          </div>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Career Navigator */}
              <CareerNavigator
                currentLevel="Explorer"
                completedMilestones={['skills-assessment']}
                currentMilestone="trail-missions"
                totalPoints={2380}
                certificationsEarned={0}
                onNavigate={onNavigate}
              />
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* This Week's Schedule */}
              <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-gray-200 dark:border-slate-700 overflow-hidden">
                <div className="p-6 border-b border-gray-200 dark:border-slate-700">
                  <div className="flex items-center justify-between mb-1">
                    <div className="flex items-center space-x-2">
                      <Calendar className="w-5 h-5 text-[#2C6975] dark:text-[#7EB5C1]" />
                      <h3 className="text-gray-900 dark:text-white">This Week</h3>
                    </div>
                    <button 
                      onClick={() => onNavigate('program-calendar')}
                      className="text-xs text-[#2C6975] dark:text-[#7EB5C1] hover:underline flex items-center space-x-1"
                    >
                      <span>Full Calendar</span>
                      <ExternalLink className="w-3 h-3" />
                    </button>
                  </div>
                </div>
                
                <div className="p-4 space-y-2">
                  {upcomingSessions.map((session) => (
                    <div 
                      key={session.id}
                      className="p-3 rounded-lg bg-gray-50 dark:bg-slate-700/50 hover:bg-gray-100 dark:hover:bg-slate-700 transition-colors cursor-pointer border border-transparent hover:border-gray-200 dark:hover:border-slate-600"
                    >
                      <div className="flex items-center space-x-3">
                        <div 
                          className="w-2 h-2 rounded-full flex-shrink-0"
                          style={{ backgroundColor: session.color }}
                        ></div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm text-gray-900 dark:text-white truncate">{session.title}</p>
                          <div className="flex items-center space-x-2 text-xs text-gray-600 dark:text-slate-400 mt-1">
                            <span>{session.date}</span>
                            <span>•</span>
                            <span>{session.time}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Ask Penny */}
              <div className="bg-gradient-to-br from-[#F9A03F]/10 to-[#F9A03F]/5 dark:from-[#F9A03F]/20 dark:to-[#F9A03F]/10 rounded-xl p-6 border-2 border-[#F9A03F]/30 dark:border-[#F9A03F]/50">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#F9A03F] to-[#e89135] flex items-center justify-center">
                    <Sparkles className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-gray-900 dark:text-white">Ask Penny</h3>
                    <p className="text-xs text-gray-600 dark:text-slate-400">Your AI Learning Guide</p>
                  </div>
                </div>
                <p className="text-sm text-gray-700 dark:text-slate-300 mb-4">
                  Need help with these recommendations or want personalized guidance? Chat with Penny anytime!
                </p>
                <button
                  onClick={() => onNavigate('penny-chat')}
                  className="w-full px-4 py-2 bg-sun-amber text-white rounded-lg hover:bg-sun-amber-dark transition-colors text-sm flex items-center justify-center space-x-2"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>Chat with Penny</span>
                </button>
              </div>

              {/* Quick Links */}
              <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-gray-200 dark:border-slate-700 p-6">
                <h3 className="text-gray-900 dark:text-white mb-4">Quick Actions</h3>
                <div className="space-y-2">
                  <button 
                    onClick={() => onNavigate('trail-missions')}
                    className="w-full text-left px-4 py-3 rounded-lg hover:bg-gray-50 dark:hover:bg-slate-700 transition-colors flex items-center justify-between"
                  >
                    <span className="text-sm text-gray-900 dark:text-white">Browse Trail Missions</span>
                    <ChevronRight className="w-4 h-4 text-gray-400" />
                  </button>
                  <button 
                    onClick={() => onNavigate('learning-center')}
                    className="w-full text-left px-4 py-3 rounded-lg hover:bg-gray-50 dark:hover:bg-slate-700 transition-colors flex items-center justify-between"
                  >
                    <span className="text-sm text-gray-900 dark:text-white">Learning Center</span>
                    <ChevronRight className="w-4 h-4 text-gray-400" />
                  </button>
                  <button 
                    onClick={() => onNavigate('capstone-projects')}
                    className="w-full text-left px-4 py-3 rounded-lg hover:bg-gray-50 dark:hover:bg-slate-700 transition-colors flex items-center justify-between"
                  >
                    <span className="text-sm text-gray-900 dark:text-white">My Capstone Project</span>
                    <ChevronRight className="w-4 h-4 text-gray-400" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </TabsContent>

        {/* Growth Tab */}
        <TabsContent value="growth" className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            {/* Daily Challenges - Full Width */}
            <DailyChallenges
              onNavigate={onNavigate}
              currentStreak={3}
              completedToday={[]}
            />

            {/* Learning Streaks - Full Width */}
            <StreakTracker
              currentStreak={12}
              longestStreak={28}
              totalActiveDays={45}
              lastActiveDate={new Date().toISOString().split('T')[0]}
              streakSaverAvailable={true}
              milestonesReached={[7]}
            />
          </div>

          {/* Leaderboard - Full Width */}
          <LeaderboardWidget
            category="points"
            timeframe="weekly"
            limit={10}
            currentUserId="user-4"
            onViewFull={() => onNavigate('leaderboard')}
          />

          {/* Community Engagement */}
          <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-gray-200 dark:border-slate-700 p-6">
            <h3 className="text-xl text-gray-900 dark:text-white mb-6">Community Engagement</h3>
            <CommunityEngagementMeter currentPoints={147} showLeaderboard={true} />
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
