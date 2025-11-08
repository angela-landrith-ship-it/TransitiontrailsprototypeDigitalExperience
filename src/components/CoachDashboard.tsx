/**
 * COACH DASHBOARD
 * 
 * =============================================================================
 * SALESFORCE ARCHITECTURE MAPPING
 * =============================================================================
 * 
 * Experience Page: ExpPage_Coach
 * URL Path: /s/coach
 * Primary Audience: Coach
 * Secondary Audiences: Admin (full access to all coaches)
 * 
 * =============================================================================
 * SALESFORCE OBJECTS & FIELDS
 * =============================================================================
 * 
 * Primary Object: Coach_Assignment__c (Junction between Coach and Learners)
 * Key Fields:
 * - Coach__c (Lookup: User) - The coach (UserRole = 'Coach Community')
 * - Learner__c (Lookup: User) - The assigned learner
 * - Assignment_Date__c (Date)
 * - Status__c (Picklist) - Active, On Hold, Completed, Transferred
 * - Next_Check_In__c (Date) - Upcoming 1:1 session
 * - Last_Interaction__c (DateTime) - Auto-updated on communication
 * - Notes__c (Long Text Area) - Coach's private notes about learner
 * 
 * Related Object: User (Learners)
 * Query: Learners assigned to current coach
 * Fields: Name, Email, SmallPhotoUrl, Trail__r.Name, Trail__r.Progress_Percentage__c,
 *         LastLoginDate, Total_Points__c
 * 
 * Related Object: Trail__c (Learner progress)
 * Fields: Status__c, Progress_Percentage__c, Current_Week__c, 
 *         Total_Points_Earned__c, Overdue_Tasks__c (Rollup Count)
 * 
 * Related Object: Assessment__c (Bi-weekly coach feedback)
 * Fields:
 * - Learner__c (Lookup: User)
 * - Coach__c (Lookup: User)
 * - Assessment_Date__c (Date)
 * - Assessment_Type__c (Picklist) - Bi-Weekly Check-In, Skills Assessment, Final Review
 * - Technical_Skills_Rating__c (Number, 1-5)
 * - Soft_Skills_Rating__c (Number, 1-5)
 * - Engagement_Level__c (Picklist) - Excellent, Good, Fair, Needs Improvement
 * - Strengths__c (Long Text Area)
 * - Areas_For_Growth__c (Long Text Area)
 * - Action_Items__c (Long Text Area)
 * - Next_Steps__c (Long Text Area)
 * - Points_Awarded__c (Number) - Points for completing assessment
 * 
 * Related Object: Message__c (Coach-Learner communication)
 * Fields:
 * - Sender__c (Lookup: User)
 * - Recipient__c (Lookup: User)
 * - Subject__c (Text, 255)
 * - Body__c (Rich Text Area)
 * - Sent_Date__c (DateTime)
 * - Read__c (Checkbox)
 * - Reply_To__c (Lookup: Message__c) - Thread support
 * 
 * Related Object: Event (1:1 Sessions)
 * Fields: Subject, StartDateTime, EndDateTime, WhoId (Learner Contact),
 *         OwnerId (Coach User), Location (Zoom link), Description
 * 
 * =============================================================================
 * CMS CONTENT REFERENCES
 * =============================================================================
 * 
 * - [CMS:coach_dashboard_welcome] → Welcome message for coaches
 * - [CMS:coach_best_practices] → Tips for effective coaching
 * - [CMS:assessment_templates] → Pre-filled assessment templates
 * 
 * =============================================================================
 * APEX CONTROLLERS
 * =============================================================================
 * 
 * CoachDashboardController.cls:
 * - getMyLearners() → Returns learners assigned to current coach
 *   Query: SELECT User.Name, Trail__r.Progress_Percentage__c, Trail__r.Status__c
 *          FROM Coach_Assignment__c 
 *          WHERE Coach__c = :currentUserId AND Status__c = 'Active'
 * 
 * - getLearnerDetails(learnerId) → Full learner profile with trail, projects, assessments
 * 
 * - getTeamPerformanceMetrics() → Aggregate metrics across all assigned learners
 *   - Average progress percentage
 *   - Completion rates by week
 *   - Engagement trends
 *   - At-risk learner count
 * 
 * - submitAssessment(learnerId, assessmentData) → Creates Assessment__c record
 * 
 * - sendMessage(recipientId, subject, body) → Creates Message__c record
 * 
 * - scheduleCheckIn(learnerId, dateTime) → Creates Event record
 * 
 * - getUpcomingCheckIns() → Returns scheduled Events for coach
 * 
 * - getRecentActivity() → Returns recent learner actions (module completions, 
 *   project updates, assessment submissions) using custom activity feed
 * 
 * =============================================================================
 * INTEGRATION POINTS
 * =============================================================================
 * 
 * 1. Slack Integration:
 *    - Send direct messages to learners via Slack API
 *    - Auto-post check-in reminders to coach's Slack
 *    - Notify coach when learner completes milestone
 * 
 * 2. Calendar Integration (Salesforce Events):
 *    - Schedule 1:1 sessions
 *    - Send calendar invites with Zoom links
 *    - Sync with coach's Google Calendar (optional)
 * 
 * 3. Email Notifications:
 *    - Alert coach when learner is at-risk (3+ overdue tasks)
 *    - Reminder emails for upcoming check-ins
 *    - Weekly summary email of team progress
 * 
 * 4. Reporting & Analytics:
 *    - Recharts library for visualizations
 *    - Data from aggregate SOQL queries
 *    - Export reports as PDF (Visualforce rendering)
 * 
 * =============================================================================
 * FLOWS & AUTOMATION
 * =============================================================================
 * 
 * 1. Flow: Create_Bi_Weekly_Assessment
 *    Trigger: Scheduled (every 2 weeks for each active assignment)
 *    Actions:
 *      - Create Assessment__c record (Status = 'Pending')
 *      - Send reminder email to coach
 *      - Update Coach_Assignment__c.Next_Check_In__c
 * 
 * 2. Flow: Alert_At_Risk_Learner
 *    Trigger: Trail__c.Overdue_Tasks__c >= 3
 *    Actions:
 *      - Send email to coach
 *      - Post to coach's Slack
 *      - Update learner status indicator
 * 
 * 3. Flow: Award_Assessment_Points
 *    Trigger: Assessment__c.Status__c = 'Completed'
 *    Actions:
 *      - Award points to learner (Points_Transaction__c)
 *      - Send feedback summary email to learner
 *      - Update Trail__c progress if needed
 * 
 * 4. Trigger: MessageTrigger (After Insert)
 *    Action: Send email notification to recipient
 * 
 * =============================================================================
 * COACH RESPONSIBILITIES & FEATURES
 * =============================================================================
 * 
 * Dashboard Tabs:
 * 1. Team Overview:
 *    - List of assigned learners
 *    - Quick status indicators (on-track, needs-support, at-risk)
 *    - Recent activity feed
 *    - Overdue tasks count
 * 
 * 2. Performance Analytics:
 *    - Team progress over time (line chart)
 *    - Completion rates by week (bar chart)
 *    - Individual learner comparisons
 *    - Engagement metrics
 * 
 * 3. Assessments:
 *    - Upcoming bi-weekly assessments
 *    - Submit new assessment
 *    - View assessment history
 *    - Assessment templates
 * 
 * 4. Communication:
 *    - Send messages to learners
 *    - View message threads
 *    - Unread messages count
 *    - Quick Slack links
 * 
 * 5. Schedule:
 *    - Upcoming 1:1 sessions
 *    - Schedule new check-ins
 *    - Calendar view
 *    - Zoom links for sessions
 * 
 * =============================================================================
 * LEARNER STATUS INDICATORS
 * =============================================================================
 * 
 * Status Calculation:
 * - Excelling: Progress > 80%, 0 overdue tasks, active in last 24 hours
 * - On Track: Progress > 50%, 0-1 overdue tasks, active in last 3 days
 * - Needs Support: Progress 30-50%, 2 overdue tasks, active in last 7 days
 * - At Risk: Progress < 30% OR 3+ overdue tasks OR inactive 7+ days
 * 
 * Visual Indicators:
 * - Green badge: Excelling
 * - Blue badge: On Track
 * - Yellow badge: Needs Support
 * - Red badge: At Risk
 * 
 * =============================================================================
 * BI-WEEKLY ASSESSMENT STRUCTURE
 * =============================================================================
 * 
 * Assessment Components:
 * 1. Technical Skills (1-5 rating):
 *    - Salesforce knowledge
 *    - Problem-solving ability
 *    - Code quality (if applicable)
 * 
 * 2. Soft Skills (1-5 rating):
 *    - Communication
 *    - Time management
 *    - Collaboration
 * 
 * 3. Engagement Level (Picklist):
 *    - Excellent, Good, Fair, Needs Improvement
 * 
 * 4. Narrative Feedback:
 *    - Strengths (what's working well)
 *    - Areas for growth (constructive feedback)
 *    - Action items (specific next steps)
 *    - Next steps (goals for next 2 weeks)
 * 
 * Points Awarded:
 * - Assessment completion: 350 points (10% of program total)
 * - Auto-awarded on Assessment__c.Status__c = 'Completed'
 * 
 * =============================================================================
 * REPORTING METRICS
 * =============================================================================
 * 
 * Team Performance Dashboard:
 * - Average progress percentage: AVG(Trail__c.Progress_Percentage__c)
 * - Completion rate: (Completed modules / Total modules) * 100
 * - Engagement score: Based on login frequency, activity timestamps
 * - At-risk count: COUNT(learners WHERE status = 'at-risk')
 * - Milestone completion rate: Percentage hitting weekly targets
 * 
 * Individual Learner Metrics:
 * - Progress percentage
 * - Points earned
 * - Overdue tasks count
 * - Last activity timestamp
 * - Assessment scores history
 * - Module completion velocity (modules per week)
 * 
 * =============================================================================
 * LWC COMPONENT MAPPING
 * =============================================================================
 * 
 * React Components → LWC:
 * - <CoachDashboard> → <c-coach-dashboard>
 * - Performance charts → Lightning Charts or Recharts in LWC
 * - Assessment form → <c-coach-assessment-form>
 * - Learner list → <c-coach-learner-list>
 * 
 * =============================================================================
 * ACCESSIBILITY
 * =============================================================================
 * 
 * - Status badges have aria-labels
 * - Learner cards keyboard navigable
 * - Charts have text alternatives
 * - Search input has aria-describedby
 * - Tab navigation follows ARIA practices
 * 
 * =============================================================================
 */

import { useState } from 'react';
import { Users, TrendingUp, Send, MessageSquare, Plus, Calendar, CheckCircle, Clock, AlertCircle, Sparkles, BarChart3, Target, Award, Search, Eye, Bell, Zap, BookOpen, ChevronRight } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Badge } from './ui/badge';
import { Avatar, AvatarFallback } from './ui/avatar';
import { Progress } from './ui/progress';

export function CoachDashboard() {
  const [activeTab, setActiveTab] = useState('team-overview');
  const [searchQuery, setSearchQuery] = useState('');

  // Learner data
  const learners = [
    {
      id: 1,
      name: 'Alex Johnson',
      initials: 'AJ',
      trail: 'Salesforce Admin',
      progress: 68,
      lastActive: '2 hours ago',
      status: 'on-track' as const,
      nextCheckIn: 'Mar 12, 2025',
      missionsOverdue: 0,
      recentActivity: 'Completed Flow Builder module',
    },
    {
      id: 2,
      name: 'Sam Chen',
      initials: 'SC',
      trail: 'Salesforce Developer',
      progress: 82,
      lastActive: '1 day ago',
      status: 'on-track' as const,
      nextCheckIn: 'Mar 14, 2025',
      missionsOverdue: 0,
      recentActivity: 'Submitted capstone Phase 2',
    },
    {
      id: 3,
      name: 'Jordan Kim',
      initials: 'JK',
      trail: 'Salesforce Admin',
      progress: 45,
      lastActive: '5 hours ago',
      status: 'needs-support' as const,
      nextCheckIn: 'Mar 10, 2025',
      missionsOverdue: 2,
      recentActivity: 'Stuck on Security Model',
    },
    {
      id: 4,
      name: 'Taylor Martinez',
      initials: 'TM',
      trail: 'Platform App Builder',
      progress: 91,
      lastActive: '30 min ago',
      status: 'excelling' as const,
      nextCheckIn: 'Mar 15, 2025',
      missionsOverdue: 0,
      recentActivity: 'Passed certification exam!',
    },
    {
      id: 5,
      name: 'Morgan Lee',
      initials: 'ML',
      trail: 'Salesforce Admin',
      progress: 38,
      lastActive: '3 days ago',
      status: 'at-risk' as const,
      nextCheckIn: 'Mar 9, 2025',
      missionsOverdue: 3,
      recentActivity: 'Low engagement this week',
    },
  ];

  // Team performance data
  const performanceData = [
    { week: 'Week 1', avgProgress: 45, completionRate: 78 },
    { week: 'Week 2', avgProgress: 52, completionRate: 82 },
    { week: 'Week 3', avgProgress: 58, completionRate: 79 },
    { week: 'Week 4', avgProgress: 64, completionRate: 85 },
    { week: 'Week 5', avgProgress: 69, completionRate: 88 },
  ];

  // Penny insights for coaches
  const pennyInsights = [
    {
      type: 'critical' as const,
      title: 'Morgan Lee Needs Immediate Support',
      message: '3 days inactive, 3 overdue missions. Last engagement was low. Recommend scheduling emergency check-in.',
      action: 'Schedule Call',
    },
    {
      type: 'warning' as const,
      title: 'Jordan Kim Struggling with Security',
      message: 'Spent 4+ hours on Security Model module without completion. Consider assigning peer mentor or extra resources.',
      action: 'Assign Resources',
    },
    {
      type: 'success' as const,
      title: 'Taylor Martinez Ready for Next Level',
      message: 'Completed certification with 91% progress. Consider assigning advanced capstone or mentor role.',
      action: 'View Recommendations',
    },
  ];

  // Team stats
  const teamStats = {
    totalLearners: 5,
    onTrack: 2,
    needsSupport: 1,
    atRisk: 1,
    excelling: 1,
    avgProgress: 65,
    avgEngagement: 78,
    upcomingCheckIns: 3,
  };

  // Mission suggestions from Penny
  const missionSuggestions = [
    {
      title: 'Security Model Deep Dive',
      targetedFor: 'Jordan Kim',
      reason: 'Struggling with current module',
      estimatedTime: '3 hours',
      difficulty: 'intermediate' as const,
    },
    {
      title: 'Advanced Flow Patterns',
      targetedFor: 'Taylor Martinez',
      reason: 'Ready for advanced content',
      estimatedTime: '4 hours',
      difficulty: 'advanced' as const,
    },
    {
      title: 'Engagement Reboot Challenge',
      targetedFor: 'Morgan Lee',
      reason: 'Low recent engagement',
      estimatedTime: '2 hours',
      difficulty: 'beginner' as const,
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#7EB5C1]/10 to-[#F5F3E8] dark:from-slate-900 dark:to-slate-900">
      {/* Sky Blue themed header */}
      <div className="bg-gradient-to-r from-[#7EB5C1] to-[#5a9fb0] text-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl mb-2">Coach Hub</h1>
              <p className="text-white/90">Guiding your team to success</p>
            </div>

            <div className="flex items-center space-x-4">
              <div className="text-right">
                <p className="text-2xl">{teamStats.totalLearners}</p>
                <p className="text-sm text-white/80">Total Learners</p>
              </div>
              <div className="text-right">
                <p className="text-2xl">{teamStats.avgProgress}%</p>
                <p className="text-sm text-white/80">Avg Progress</p>
              </div>
              <div className="text-right">
                <p className="text-2xl">{teamStats.upcomingCheckIns}</p>
                <p className="text-sm text-white/80">Check-ins This Week</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-8 bg-white border border-gray-200">
            <TabsTrigger value="team-overview" className="data-[state=active]:bg-[#7EB5C1] data-[state=active]:text-white">
              <Users className="w-4 h-4 mr-2" />
              Team Overview
            </TabsTrigger>
            <TabsTrigger value="missions" className="data-[state=active]:bg-[#7EB5C1] data-[state=active]:text-white">
              <Target className="w-4 h-4 mr-2" />
              Missions
            </TabsTrigger>
            <TabsTrigger value="insights" className="data-[state=active]:bg-[#7EB5C1] data-[state=active]:text-white">
              <Sparkles className="w-4 h-4 mr-2" />
              Penny Insights
            </TabsTrigger>
          </TabsList>

          {/* Team Overview Tab */}
          <TabsContent value="team-overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Main Content */}
              <div className="lg:col-span-2 space-y-6">
                {/* Team Table */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl text-gray-900">My Team</h2>
                    
                    <div className="flex items-center space-x-3">
                      <div className="relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <input
                          type="text"
                          placeholder="Search learners..."
                          value={searchQuery}
                          onChange={(e) => setSearchQuery(e.target.value)}
                          className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#7EB5C1] text-sm"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="space-y-3">
                    {learners.map((learner) => (
                      <div
                        key={learner.id}
                        className="group p-4 border border-gray-200 rounded-lg hover:border-[#7EB5C1] hover:shadow-md transition-all duration-150"
                      >
                        <div className="flex items-start space-x-4">
                          <Avatar className="w-12 h-12">
                            <AvatarFallback className="bg-gradient-to-br from-[#7EB5C1] to-[#5a9fb0] text-white">
                              {learner.initials}
                            </AvatarFallback>
                          </Avatar>

                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between mb-2">
                              <div>
                                <h3 className="text-gray-900 group-hover:text-[#7EB5C1] transition-colors">
                                  {learner.name}
                                </h3>
                                <p className="text-sm text-gray-600">{learner.trail}</p>
                              </div>

                              <Badge
                                variant="outline"
                                className={`${
                                  learner.status === 'on-track'
                                    ? 'bg-green-50 text-green-700 border-green-300'
                                    : learner.status === 'needs-support'
                                    ? 'bg-yellow-50 text-yellow-700 border-yellow-300'
                                    : learner.status === 'at-risk'
                                    ? 'bg-red-50 text-red-700 border-red-300'
                                    : 'bg-blue-50 text-blue-700 border-blue-300'
                                }`}
                              >
                                {learner.status === 'on-track' && '✓ On Track'}
                                {learner.status === 'needs-support' && '⚠ Needs Support'}
                                {learner.status === 'at-risk' && '⚠ At Risk'}
                                {learner.status === 'excelling' && '⭐ Excelling'}
                              </Badge>
                            </div>

                            {/* Progress */}
                            <div className="mb-3">
                              <div className="flex items-center justify-between text-sm mb-1">
                                <span className="text-gray-600">Progress</span>
                                <span className="text-gray-900">{learner.progress}%</span>
                              </div>
                              <Progress value={learner.progress} className="h-2" />
                            </div>

                            {/* Details */}
                            <div className="grid grid-cols-2 gap-4 text-sm">
                              <div>
                                <p className="text-gray-600">Last Active</p>
                                <p className="text-gray-900">{learner.lastActive}</p>
                              </div>
                              <div>
                                <p className="text-gray-600">Next Check-in</p>
                                <p className="text-gray-900">{learner.nextCheckIn}</p>
                              </div>
                              <div>
                                <p className="text-gray-600">Recent Activity</p>
                                <p className="text-gray-900">{learner.recentActivity}</p>
                              </div>
                              <div>
                                <p className="text-gray-600">Overdue Missions</p>
                                <p className={learner.missionsOverdue > 0 ? 'text-red-600' : 'text-gray-900'}>
                                  {learner.missionsOverdue}
                                </p>
                              </div>
                            </div>

                            {/* Actions */}
                            <div className="flex items-center space-x-2 mt-3">
                              <button className="flex-1 py-2 bg-[#7EB5C1] text-white rounded-lg hover:bg-[#6a9fb0] transition-colors text-sm flex items-center justify-center space-x-2">
                                <MessageSquare className="w-4 h-4" />
                                <span>Message</span>
                              </button>
                              <button className="flex-1 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors text-sm flex items-center justify-center space-x-2">
                                <Eye className="w-4 h-4" />
                                <span>View Profile</span>
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Team Performance Chart */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                  <h3 className="text-xl text-gray-900 mb-6">Team Performance Trend</h3>
                  <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={performanceData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                      <XAxis dataKey="week" tick={{ fill: '#6b7280', fontSize: 12 }} />
                      <YAxis tick={{ fill: '#6b7280', fontSize: 12 }} />
                      <Tooltip />
                      <Line type="monotone" dataKey="avgProgress" stroke="#7EB5C1" strokeWidth={2} dot={{ fill: '#7EB5C1', r: 4 }} name="Avg Progress %" />
                      <Line type="monotone" dataKey="completionRate" stroke="#F9A03F" strokeWidth={2} dot={{ fill: '#F9A03F', r: 4 }} name="Completion Rate %" />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Sidebar - Quick Stats */}
              <div className="lg:col-span-1 space-y-6">
                {/* Status Breakdown */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                  <h3 className="text-lg text-gray-900 mb-4">Team Status</h3>
                  
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                      <div className="flex items-center space-x-2">
                        <Award className="w-5 h-5 text-blue-600" />
                        <span className="text-sm text-gray-700">Excelling</span>
                      </div>
                      <span className="text-lg text-gray-900">{teamStats.excelling}</span>
                    </div>

                    <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                      <div className="flex items-center space-x-2">
                        <CheckCircle className="w-5 h-5 text-green-600" />
                        <span className="text-sm text-gray-700">On Track</span>
                      </div>
                      <span className="text-lg text-gray-900">{teamStats.onTrack}</span>
                    </div>

                    <div className="flex items-center justify-between p-3 bg-yellow-50 rounded-lg">
                      <div className="flex items-center space-x-2">
                        <AlertCircle className="w-5 h-5 text-yellow-600" />
                        <span className="text-sm text-gray-700">Needs Support</span>
                      </div>
                      <span className="text-lg text-gray-900">{teamStats.needsSupport}</span>
                    </div>

                    <div className="flex items-center justify-between p-3 bg-red-50 rounded-lg">
                      <div className="flex items-center space-x-2">
                        <Bell className="w-5 h-5 text-red-600" />
                        <span className="text-sm text-gray-700">At Risk</span>
                      </div>
                      <span className="text-lg text-gray-900">{teamStats.atRisk}</span>
                    </div>
                  </div>
                </div>

                {/* Quick Actions */}
                <div className="bg-gradient-to-br from-[#7EB5C1]/10 to-white rounded-xl border border-[#7EB5C1]/20 p-6">
                  <h3 className="text-lg text-gray-900 mb-4">Quick Actions</h3>
                  
                  <div className="space-y-2">
                    <button className="w-full py-3 bg-[#7EB5C1] text-white rounded-lg hover:bg-[#6a9fb0] transition-colors flex items-center justify-center space-x-2">
                      <Plus className="w-4 h-4" />
                      <span>Create Mission</span>
                    </button>
                    
                    <button className="w-full py-3 border border-[#7EB5C1] text-[#7EB5C1] rounded-lg hover:bg-[#7EB5C1]/5 transition-colors flex items-center justify-center space-x-2">
                      <Calendar className="w-4 h-4" />
                      <span>Schedule Check-in</span>
                    </button>
                    
                    <button className="w-full py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors flex items-center justify-center space-x-2">
                      <Send className="w-4 h-4" />
                      <span>Send Team Update</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>

          {/* Missions Tab */}
          <TabsContent value="missions" className="space-y-6">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl text-gray-900">Mission Suggestions</h2>
                <Badge variant="outline" className="bg-[#F9A03F]/10 text-[#F9A03F] border-[#F9A03F]/30">
                  Powered by Penny
                </Badge>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {missionSuggestions.map((mission, idx) => (
                  <div
                    key={idx}
                    className="p-4 border-2 border-gray-200 rounded-lg hover:border-[#7EB5C1] hover:shadow-md transition-all duration-150"
                  >
                    <h4 className="text-gray-900 mb-2">{mission.title}</h4>
                    <div className="space-y-2 mb-4 text-sm">
                      <div className="flex items-center justify-between">
                        <span className="text-gray-600">For:</span>
                        <span className="text-gray-900">{mission.targetedFor}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-gray-600">Time:</span>
                        <span className="text-gray-900">{mission.estimatedTime}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-gray-600">Level:</span>
                        <Badge variant="outline" className={`text-xs ${
                          mission.difficulty === 'beginner' ? 'bg-green-50 text-green-700 border-green-300' :
                          mission.difficulty === 'intermediate' ? 'bg-yellow-50 text-yellow-700 border-yellow-300' :
                          'bg-red-50 text-red-700 border-red-300'
                        }`}>
                          {mission.difficulty}
                        </Badge>
                      </div>
                    </div>
                    <p className="text-xs text-gray-600 mb-4 italic">{mission.reason}</p>
                    <button className="w-full py-2 bg-[#7EB5C1] text-white rounded-lg hover:bg-[#6a9fb0] transition-colors text-sm">
                      Assign Mission
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </TabsContent>

          {/* Penny Insights Tab */}
          <TabsContent value="insights" className="space-y-6">
            <div className="bg-gradient-to-br from-[#F9A03F]/10 to-white rounded-xl border-2 border-[#F9A03F]/30 p-6">
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#F9A03F] to-[#e89135] flex items-center justify-center">
                  <Sparkles className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h2 className="text-2xl text-gray-900">Penny's Coaching Insights</h2>
                  <p className="text-sm text-gray-600">AI-powered recommendations for your team</p>
                </div>
              </div>

              <div className="space-y-4">
                {pennyInsights.map((insight, idx) => (
                  <div
                    key={idx}
                    className={`p-5 rounded-lg border-2 ${
                      insight.type === 'critical'
                        ? 'bg-red-50 border-red-300'
                        : insight.type === 'warning'
                        ? 'bg-yellow-50 border-yellow-300'
                        : 'bg-green-50 border-green-300'
                    }`}
                  >
                    <div className="flex items-start space-x-3 mb-3">
                      {insight.type === 'critical' ? (
                        <Bell className="w-6 h-6 text-red-600 flex-shrink-0 mt-0.5" />
                      ) : insight.type === 'warning' ? (
                        <AlertCircle className="w-6 h-6 text-yellow-600 flex-shrink-0 mt-0.5" />
                      ) : (
                        <Zap className="w-6 h-6 text-green-600 flex-shrink-0 mt-0.5" />
                      )}
                      <div className="flex-1">
                        <h4 className="text-gray-900 mb-2">{insight.title}</h4>
                        <p className="text-sm text-gray-700">{insight.message}</p>
                      </div>
                    </div>
                    <button className="w-full py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-sm flex items-center justify-center space-x-2">
                      <span>{insight.action}</span>
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>

              <div className="mt-6 p-4 bg-white rounded-lg border border-gray-200">
                <h4 className="text-sm text-gray-900 mb-2">Ask Penny for Help</h4>
                <p className="text-xs text-gray-600 mb-3">
                  Get personalized coaching advice, mission suggestions, and intervention strategies
                </p>
                <button className="w-full py-2 bg-gradient-to-r from-[#F9A03F] to-[#e89135] text-white rounded-lg hover:from-[#e89135] hover:to-[#d68024] transition-all flex items-center justify-center space-x-2">
                  <MessageSquare className="w-4 h-4" />
                  <span>Chat with Penny</span>
                </button>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
