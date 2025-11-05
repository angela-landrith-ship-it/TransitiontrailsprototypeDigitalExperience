import { Trophy, Target, BookOpen, MessageSquare, TrendingUp, Clock, Award, Calendar, Users, Sparkles, ChevronRight, CheckCircle, ExternalLink, ChevronDown, ArrowRight } from 'lucide-react';
import { ProgressRing } from './ProgressRing';
import { SkillsIQAssessment } from './SkillsIQAssessment';
import { TrailImpactMeter } from './TrailImpactMeter';
import { PageType } from '../App';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from './ui/collapsible';
import { Avatar, AvatarImage, AvatarFallback } from './ui/avatar';
import { useState } from 'react';
import profileImage from 'figma:asset/cc5353a77d95e01a0547378d6a7b5a415082cb97.png';

interface LearnerHomeProps {
  onNavigate: (page: PageType) => void;
}

export function LearnerHome({ onNavigate }: LearnerHomeProps) {
  const [isPointsOpen, setIsPointsOpen] = useState(true);
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const [isTrailMissionsOpen, setIsTrailMissionsOpen] = useState(true);

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
      <div className="bg-gradient-to-r from-[#2C6975] to-[#7EB5C1] rounded-2xl shadow-lg p-8 mb-8 text-white relative overflow-hidden">
        <div className="flex items-start justify-between relative z-10">
          <div className="flex-1">
            <h2 className="text-3xl mb-2">Welcome back, Alex!</h2>
            <p className="text-blue-100 mb-1">The Guided Trail • Spring 2025 Cohort</p>
            <p className="text-blue-100/80 text-sm mb-4">Salesforce Admin & Development Program</p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
              <div className="flex-1">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm">Overall Progress</span>
                  <span className="text-sm">68%</span>
                </div>
                <div className="w-full bg-white/20 rounded-full h-3">
                  <div className="bg-[#F9A03F] h-3 rounded-full" style={{ width: '68%' }}></div>
                </div>
                <p className="text-xs text-blue-100/70 mt-1">Week 7 of 12</p>
              </div>
              
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 rounded-lg bg-white/20 flex items-center justify-center">
                  <Trophy className="w-7 h-7 text-[#F9A03F]" />
                </div>
                <div>
                  <p className="text-sm opacity-90">Points Earned</p>
                  <p className="text-xl">{pointsSystem.earned} / {pointsSystem.total}</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0">
                  <Users className="w-7 h-7 text-white" />
                </div>
                <div>
                  <p className="text-sm opacity-90">Your Coach</p>
                  <p className="text-lg">{currentCoach.name}</p>
                  <button 
                    className="mt-2 text-xs bg-white/20 hover:bg-white/30 px-3 py-1.5 rounded-lg transition-colors backdrop-blur-sm border border-white/30"
                  >
                    Schedule 1:1 Session
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

      {/* Main Content Grid */}
      <div className="grid lg:grid-cols-3 gap-6 mb-8">
        {/* Left & Center Columns */}
        <div className="lg:col-span-2 space-y-6">
          {/* Capstone Project - Featured */}
          <div className="bg-gradient-to-br from-[#F9A03F]/10 to-[#F9A03F]/5 border-2 border-[#F9A03F]/30 rounded-xl p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-lg bg-[#F9A03F] text-white flex items-center justify-center">
                  <Trophy className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-gray-900">Your Capstone Project</h3>
                  <p className="text-sm text-gray-600">40% of your total program points</p>
                </div>
              </div>
              <button
                onClick={() => onNavigate('capstone-projects')}
                className="px-4 py-2 bg-[#F9A03F] text-white rounded-lg hover:bg-[#e69135] transition-colors flex items-center space-x-2"
              >
                <span>View Full Details</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
            
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <h4 className="text-gray-900 mb-2">Community Service Volunteer Management System</h4>
                  <p className="text-sm text-gray-600 mb-3">
                    Building a Salesforce application to manage volunteer programs for Hearts & Hands Community Services
                  </p>
                  <div className="flex items-center space-x-6 text-sm text-gray-600">
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
                <div className="bg-green-50 border border-green-200 rounded-lg p-3">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm text-gray-700">Completed Phases</span>
                    <CheckCircle className="w-4 h-4 text-green-600" />
                  </div>
                  <p className="text-xl text-gray-900">2 / 7</p>
                </div>
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm text-gray-700">Current Phase</span>
                    <Sparkles className="w-4 h-4 text-blue-600" />
                  </div>
                  <p className="text-sm text-gray-900">Automation & Logic</p>
                </div>
              </div>
              
              <button
                onClick={() => onNavigate('capstone-projects')}
                className="w-full py-2 border-2 border-[#F9A03F] text-[#F9A03F] rounded-lg hover:bg-[#F9A03F] hover:text-white transition-colors flex items-center justify-center space-x-2"
              >
                <span>Open Project Workspace</span>
                <ExternalLink className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Penny AI Focus Widget - Intelligent Priority & Event Curation */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            {/* Header */}
            <div className="p-6 bg-gradient-to-r from-[#F9A03F]/10 to-[#F9A03F]/5 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#F9A03F] to-[#e89135] text-white flex items-center justify-center shadow-md">
                    <Sparkles className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-gray-900 flex items-center space-x-2">
                      <span>Penny's Focus Recommendations</span>
                    </h3>
                    <p className="text-sm text-gray-600">Personalized priorities from across your learning journey</p>
                  </div>
                </div>
                <button
                  onClick={() => onNavigate('penny-chat')}
                  className="px-4 py-2 bg-[#F9A03F] text-white rounded-lg hover:bg-[#e89135] transition-colors text-sm flex items-center space-x-2"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>Ask Penny</span>
                </button>
              </div>
            </div>

            {/* Split View Content */}
            <div className="grid md:grid-cols-2 divide-x divide-gray-200">
              {/* Left: Priorities & Tasks */}
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h4 className="text-gray-900 flex items-center space-x-2">
                    <Target className="w-4 h-4 text-[#2C6975]" />
                    <span>Your Priorities</span>
                  </h4>
                  <span className="text-xs text-gray-500">{pennyFocusItems.length} items</span>
                </div>

                <div className="space-y-3">
                  {pennyFocusItems.map((item) => {
                    const ItemIcon = item.icon;
                    return (
                      <button
                        key={item.id}
                        onClick={item.action}
                        className="w-full text-left p-4 rounded-lg border border-gray-200 hover:border-[#2C6975] hover:bg-gray-50 transition-all group"
                      >
                        <div className="flex items-start space-x-3">
                          <div
                            className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
                            style={{ backgroundColor: `${item.color}15` }}
                          >
                            <ItemIcon className="w-4 h-4" style={{ color: item.color }} />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-start justify-between gap-2 mb-1">
                              <p className="text-sm text-gray-900 group-hover:text-[#2C6975] transition-colors">
                                {item.title}
                              </p>
                              {item.priority === 'critical' && (
                                <span className="px-2 py-0.5 bg-red-100 text-red-700 rounded-full text-xs flex-shrink-0">
                                  Critical
                                </span>
                              )}
                              {item.priority === 'high' && (
                                <span className="px-2 py-0.5 bg-[#F9A03F]/20 text-[#F9A03F] rounded-full text-xs flex-shrink-0">
                                  High
                                </span>
                              )}
                            </div>
                            <p className="text-xs text-gray-600 mb-2">{item.description}</p>
                            <div className="flex items-center space-x-3 text-xs text-gray-500">
                              <span className="flex items-center space-x-1">
                                <Clock className="w-3 h-3" />
                                <span>Due: {item.dueDate}</span>
                              </span>
                              <span className="px-2 py-0.5 bg-gray-100 rounded text-xs">
                                {item.source}
                              </span>
                            </div>
                          </div>
                        </div>
                      </button>
                    );
                  })}
                </div>

                <button
                  onClick={() => onNavigate('daily-missions')}
                  className="w-full mt-4 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors text-sm flex items-center justify-center space-x-2"
                >
                  <span>View All Tasks</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>

              {/* Right: Upcoming Events */}
              <div className="p-6 bg-gray-50/50">
                <div className="flex items-center justify-between mb-4">
                  <h4 className="text-gray-900 flex items-center space-x-2">
                    <Calendar className="w-4 h-4 text-[#2C6975]" />
                    <span>This Week's Sessions</span>
                  </h4>
                  <span className="text-xs text-gray-500">{upcomingSessions.length} scheduled</span>
                </div>

                <div className="space-y-2">
                  {upcomingSessions.map((session) => (
                    <div
                      key={session.id}
                      className="p-3 rounded-lg border-l-4 bg-white hover:shadow-sm transition-all"
                      style={{ borderColor: session.color }}
                    >
                      <div className="flex items-center justify-between gap-3">
                        <div className="flex items-center space-x-3 flex-1 min-w-0">
                          <div className="text-center flex-shrink-0">
                            <p className="text-xs text-gray-600">{session.date}</p>
                            <p className="text-xs text-gray-900">{session.time}</p>
                          </div>
                          <div className="min-w-0">
                            <p className="text-sm text-gray-900 truncate">{session.title}</p>
                            <p className="text-xs text-gray-500 capitalize">{session.type.replace('-', ' ')}</p>
                          </div>
                        </div>
                        <button
                          className="px-3 py-1.5 text-xs rounded-lg transition-colors flex-shrink-0"
                          style={{
                            backgroundColor: session.color,
                            color: 'white'
                          }}
                        >
                          Join
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                <button
                  onClick={() => onNavigate('program-calendar')}
                  className="w-full mt-4 px-4 py-2 bg-[#2C6975] text-white rounded-lg hover:bg-[#234d56] transition-colors text-sm flex items-center justify-center space-x-2"
                >
                  <span>View Full Calendar</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Penny Insight Footer */}
            <div className="px-6 py-4 bg-gradient-to-r from-blue-50 to-blue-50/50 border-t border-blue-100">
              <div className="flex items-start space-x-3">
                <Sparkles className="w-5 h-5 text-[#F9A03F] flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm text-gray-900 mb-1">
                    <span className="font-medium">Penny's Insight:</span> You have 2 critical items due this week. Focus on your status report and the batch job bug to stay on track for capstone completion.
                  </p>
                  <button
                    onClick={() => onNavigate('penny-chat')}
                    className="text-sm text-[#2C6975] hover:underline"
                  >
                    Get personalized guidance →
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Skills IQ Assessment */}
          <SkillsIQAssessment onNavigate={onNavigate} />
        </div>

        {/* Right Sidebar */}
        <div className="space-y-6">
          {/* Points Breakdown - Collapsible */}
          <Collapsible open={isPointsOpen} onOpenChange={setIsPointsOpen}>
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
              <CollapsibleTrigger className="w-full p-6 flex items-center justify-between hover:bg-gray-50 transition-colors">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#F9A03F] to-[#F9A03F]/70 text-white flex items-center justify-center">
                    <Award className="w-6 h-6" />
                  </div>
                  <div className="text-left">
                    <h3 className="text-gray-900">Points Breakdown</h3>
                    <p className="text-sm text-gray-600">{pointsSystem.earned} / {pointsSystem.total} points earned ({Math.round((pointsSystem.earned / pointsSystem.total) * 100)}%)</p>
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
                            <span className="text-gray-900">{item.category}</span>
                            <span className="text-xs text-gray-500">({item.percentage}% of program)</span>
                          </div>
                          <span className="text-gray-600">{item.earned} / {item.total}</span>
                        </div>
                        <div className="w-full bg-gray-100 rounded-full h-2">
                          <div 
                            className="bg-[#F9A03F] h-2 rounded-full transition-all duration-500"
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

          {/* Trail Impact Meter - Engagement Rewards */}
          <TrailImpactMeter currentPoints={47} showLeaderboard={true} />

          {/* Trail Missions - Collapsible */}
          <Collapsible open={isTrailMissionsOpen} onOpenChange={setIsTrailMissionsOpen}>
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
              <div className="p-6 flex items-center justify-between">
                <CollapsibleTrigger className="flex items-center space-x-3 hover:opacity-80 transition-opacity">
                  <div className="w-10 h-10 rounded-lg bg-[#2C6975] text-white flex items-center justify-center">
                    <BookOpen className="w-6 h-6" />
                  </div>
                  <div className="text-left">
                    <h3 className="text-gray-900">Trail Missions</h3>
                    <p className="text-sm text-gray-600">3 active learning paths</p>
                  </div>
                  <ChevronDown className={`w-5 h-5 text-gray-400 transition-transform ml-2 ${isTrailMissionsOpen ? 'rotate-180' : ''}`} />
                </CollapsibleTrigger>
                <button
                  onClick={() => onNavigate('trail-missions')}
                  className="px-4 py-2 bg-[#2C6975] text-white rounded-lg hover:bg-[#234d56] transition-colors text-sm flex items-center space-x-1"
                >
                  <span>View All</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
              
              <CollapsibleContent>
                <div className="px-6 pb-6 space-y-4">
                  {missions.map((mission) => (
                    <div key={mission.id} className="p-4 bg-gray-50 rounded-xl hover:shadow-md transition-shadow border border-gray-100">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-2">
                            <span className="inline-block px-3 py-1 rounded-full bg-[#7EB5C1]/10 text-[#2C6975] text-xs">
                              {mission.type}
                            </span>
                            <span className="text-xs text-gray-500">Due: {mission.dueDate}</span>
                          </div>
                          <h4 className="text-gray-900 mb-3">{mission.title}</h4>
                          <div className="flex items-center space-x-4">
                            <div className="flex-1">
                              <div className="w-full bg-gray-200 rounded-full h-2">
                                <div 
                                  className="h-2 rounded-full transition-all duration-500"
                                  style={{ width: `${mission.progress}%`, backgroundColor: mission.color }}
                                ></div>
                              </div>
                            </div>
                            <span className="text-sm text-gray-600">{mission.progress}%</span>
                          </div>
                        </div>
                        <ProgressRing progress={mission.progress} size={60} color={mission.color} />
                      </div>
                      <div className="mt-4 flex space-x-2">
                        <button className="flex-1 bg-[#2C6975] text-white px-4 py-2 rounded-lg hover:bg-[#234f57] transition-colors text-sm">
                          Continue
                        </button>
                        <button 
                          onClick={() => onNavigate('trail-missions')}
                          className="px-4 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50 transition-colors text-sm"
                        >
                          Details
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </CollapsibleContent>
            </div>
          </Collapsible>

          {/* Quick Links */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h3 className="text-gray-900 mb-4">Quick Links</h3>
            <div className="space-y-2">
              <button 
                onClick={() => onNavigate('program-calendar')}
                className="w-full text-left px-4 py-3 rounded-lg hover:bg-gray-50 transition-colors flex items-center justify-between"
              >
                <span className="text-sm text-gray-900">Program Calendar</span>
                <ChevronRight className="w-4 h-4 text-gray-400" />
              </button>
              <a 
                href="https://slack.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full text-left px-4 py-3 rounded-lg hover:bg-gray-50 transition-colors flex items-center justify-between"
              >
                <span className="text-sm text-gray-900">Open Slack</span>
                <ExternalLink className="w-4 h-4 text-gray-400" />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t border-gray-200 pt-6 mt-8">
        <div className="flex flex-wrap items-center justify-between text-sm text-gray-600">
          <div className="flex space-x-6">
            <a href="#" className="hover:text-[#2C6975]">Support</a>
            <a href="#" className="hover:text-[#2C6975]">Resources</a>
            <a href="#" className="hover:text-[#2C6975]">Policies</a>
            <a href="#" className="hover:text-[#2C6975]">Contact</a>
          </div>
          <p>© Transition Trails 2025</p>
        </div>
      </footer>
    </div>
  );
}
