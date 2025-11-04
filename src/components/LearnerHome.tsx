import { Trophy, Target, BookOpen, MessageSquare, TrendingUp, Clock, Award, Calendar, Users, Sparkles, ChevronRight, CheckCircle, ExternalLink, ChevronDown } from 'lucide-react';
import { ProgressRing } from './ProgressRing';
import { SkillsChart } from './SkillsChart';
import { SlackFeed } from './SlackFeed';
import { PageType } from '../App';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from './ui/collapsible';
import { useState } from 'react';

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

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Hero Banner */}
      <div className="bg-gradient-to-r from-[#2C6975] to-[#7EB5C1] rounded-2xl shadow-lg p-8 mb-8 text-white">
        <div className="flex items-center justify-between">
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
                <div className="w-12 h-12 rounded-lg bg-white/20 flex items-center justify-center">
                  <Users className="w-7 h-7 text-white" />
                </div>
                <div>
                  <p className="text-sm opacity-90">Your Coach</p>
                  <p>{currentCoach.name}</p>
                </div>
              </div>
            </div>
          </div>
          <div className="hidden xl:block ml-8">
            <Trophy className="w-32 h-32 text-[#F9A03F] opacity-80" />
          </div>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="grid lg:grid-cols-3 gap-6 mb-8">
        {/* Left & Center Columns */}
        <div className="lg:col-span-2 space-y-6">
          {/* Today's Focus - Daily Missions */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-gray-900 flex items-center space-x-2">
                <Target className="w-5 h-5 text-[#F9A03F]" />
                <span>Today's Focus</span>
              </h3>
              <button 
                onClick={() => onNavigate('daily-missions')}
                className="text-sm text-[#2C6975] hover:underline flex items-center space-x-1"
              >
                <span>View All</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="space-y-4">
                {dailyMissions.map((mission) => (
                  <div key={mission.id} className="flex items-center space-x-4">
                    <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                      mission.progress === 100 ? 'bg-[#3B6A52] border-[#3B6A52]' : 'border-gray-300'
                    }`}>
                      {mission.progress === 100 && (
                        <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                        </svg>
                      )}
                    </div>
                    <div className="flex-1">
                      <p className={`text-sm ${mission.progress === 100 ? 'text-gray-500 line-through' : 'text-gray-900'}`}>
                        {mission.title}
                      </p>
                      <p className="text-xs text-gray-500">{mission.due}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* This Week's Sessions - Calendar Widget */}
          <Collapsible open={isCalendarOpen} onOpenChange={setIsCalendarOpen}>
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
              <CollapsibleTrigger className="w-full p-6 flex items-center justify-between hover:bg-gray-50 transition-colors">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-lg bg-[#2C6975] text-white flex items-center justify-center">
                    <Calendar className="w-6 h-6" />
                  </div>
                  <div className="text-left">
                    <h3 className="text-gray-900">This Week's Sessions</h3>
                    <p className="text-sm text-gray-600">5 sessions scheduled</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onNavigate('program-calendar');
                    }}
                    className="px-4 py-2 bg-[#2C6975] text-white rounded-lg hover:bg-[#234d56] transition-colors text-sm"
                  >
                    View Full Calendar
                  </button>
                  <ChevronDown className={`w-5 h-5 text-gray-400 transition-transform ${isCalendarOpen ? 'rotate-180' : ''}`} />
                </div>
              </CollapsibleTrigger>
              
              <CollapsibleContent>
                <div className="px-6 pb-6 space-y-2">
                  {upcomingSessions.map((session) => (
                    <div 
                      key={session.id}
                      className="p-4 rounded-lg border-l-4 hover:bg-gray-50 transition-colors"
                      style={{ borderColor: session.color, backgroundColor: `${session.color}10` }}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <div className="w-12 text-center">
                            <p className="text-xs text-gray-600">{session.date}</p>
                            <p className="text-sm text-gray-900">{session.time}</p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-900">{session.title}</p>
                            <p className="text-xs text-gray-500 capitalize">{session.type.replace('-', ' ')}</p>
                          </div>
                        </div>
                        <button className="px-3 py-1.5 bg-white border border-gray-300 rounded-lg text-sm text-gray-700 hover:bg-gray-50 transition-colors">
                          Join
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </CollapsibleContent>
            </div>
          </Collapsible>

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

          {/* Trail Missions - Collapsible */}
          <Collapsible open={isTrailMissionsOpen} onOpenChange={setIsTrailMissionsOpen}>
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
              <CollapsibleTrigger className="w-full p-6 flex items-center justify-between hover:bg-gray-50 transition-colors">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-lg bg-[#2C6975] text-white flex items-center justify-center">
                    <BookOpen className="w-6 h-6" />
                  </div>
                  <div className="text-left">
                    <h3 className="text-gray-900">Trail Missions</h3>
                    <p className="text-sm text-gray-600">3 active learning paths</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onNavigate('trail-missions');
                    }}
                    className="px-4 py-2 bg-[#2C6975] text-white rounded-lg hover:bg-[#234d56] transition-colors text-sm flex items-center space-x-1"
                  >
                    <span>View All</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                  <ChevronDown className={`w-5 h-5 text-gray-400 transition-transform ${isTrailMissionsOpen ? 'rotate-180' : ''}`} />
                </div>
              </CollapsibleTrigger>
              
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
        </div>

        {/* Right Sidebar */}
        <div className="space-y-6">
          {/* Coach Card */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h3 className="text-gray-900 mb-4 flex items-center space-x-2">
              <Users className="w-5 h-5 text-[#2C6975]" />
              <span>Your Coach</span>
            </h3>
            <div className="flex items-start space-x-3 mb-4">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#2C6975] to-[#7EB5C1] text-white flex items-center justify-center flex-shrink-0">
                <span>{currentCoach.avatar}</span>
              </div>
              <div className="flex-1">
                <p className="text-gray-900">{currentCoach.name}</p>
                <p className="text-sm text-gray-600">{currentCoach.title}</p>
                <p className="text-xs text-gray-500 mt-1">{currentCoach.slackId}</p>
              </div>
            </div>
            <button className="w-full bg-[#2C6975] text-white px-4 py-2 rounded-lg hover:bg-[#234d56] transition-colors text-sm">
              Schedule 1:1 Session
            </button>
          </div>

          {/* Quick Links */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h3 className="text-gray-900 mb-4">Quick Links</h3>
            <div className="space-y-2">
              <button 
                onClick={() => onNavigate('assignments')}
                className="w-full text-left px-4 py-3 rounded-lg hover:bg-gray-50 transition-colors flex items-center justify-between"
              >
                <span className="text-sm text-gray-900">Assignments</span>
                <ChevronRight className="w-4 h-4 text-gray-400" />
              </button>
              <button 
                onClick={() => onNavigate('program-calendar')}
                className="w-full text-left px-4 py-3 rounded-lg hover:bg-gray-50 transition-colors flex items-center justify-between"
              >
                <span className="text-sm text-gray-900">Program Calendar</span>
                <ChevronRight className="w-4 h-4 text-gray-400" />
              </button>
              <button 
                onClick={() => onNavigate('skills-assessment')}
                className="w-full text-left px-4 py-3 rounded-lg hover:bg-gray-50 transition-colors flex items-center justify-between"
              >
                <span className="text-sm text-gray-900">Skills Assessment</span>
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

          {/* Skills Assessment */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-gray-900 flex items-center space-x-2">
                <TrendingUp className="w-5 h-5 text-[#3B6A52]" />
                <span>Skills Progress</span>
              </h3>
            </div>
            <SkillsChart />
            <button 
              onClick={() => onNavigate('skills-assessment')}
              className="w-full mt-4 bg-[#3B6A52] text-white px-4 py-2 rounded-lg hover:bg-[#2d5240] transition-colors text-sm"
            >
              Take Assessment
            </button>
          </div>

          {/* Slack Feed */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-gray-900 flex items-center space-x-2">
                <MessageSquare className="w-5 h-5 text-[#2C6975]" />
                <span>Team Updates</span>
              </h3>
            </div>
            <SlackFeed />
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
