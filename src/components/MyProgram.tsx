import { ArrowLeft, BookOpen, Users, Calendar, Award, TrendingUp, FileText, MessageSquare, UserCircle, CheckCircle, Clock, History, Target, Sparkles, ChevronRight, FileCode, Database, Zap, CheckSquare, ExternalLink, ChevronDown } from 'lucide-react';
import { PageType } from '../App';
import { ProgressRing } from './ProgressRing';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from './ui/collapsible';
import { PennyChat } from './PennyChat';
import { useState } from 'react';

interface MyProgramProps {
  onNavigate: (page: PageType) => void;
}

export function MyProgram({ onNavigate }: MyProgramProps) {
  const [isProgramHistoryOpen, setIsProgramHistoryOpen] = useState(false);
  const [isPennyChatOpen, setIsPennyChatOpen] = useState(false);
  const [isPointsOpen, setIsPointsOpen] = useState(true);
  const [isCapstoneOpen, setIsCapstoneOpen] = useState(true);
  const [isLearningPathsOpen, setIsLearningPathsOpen] = useState(false);
  const [isSkillsIQOpen, setIsSkillsIQOpen] = useState(false);
  const [isCoachFeedbackOpen, setIsCoachFeedbackOpen] = useState(false);
  const [isAcademyDetailsOpen, setIsAcademyDetailsOpen] = useState(true);
  const [isMilestonesOpen, setIsMilestonesOpen] = useState(true);

  // Current Coach Info
  const currentCoach = {
    name: 'Sarah Martinez',
    title: 'Senior Learning Coach',
    specialties: ['Salesforce Development', 'Career Transition', 'Technical Mentorship'],
    email: 'sarah.martinez@transitiontrails.org',
    slackId: '@sarah.martinez',
    avatar: 'SM',
    bio: '8+ years coaching tech professionals through career transitions',
    certifications: ['Salesforce Certified Technical Architect', 'Professional Coach (ICF)']
  };

  // Points System (3500 total for Guided Trail)
  const pointsSystem = {
    total: 3500,
    earned: 2380,
    breakdown: [
      { category: 'Capstone Project', total: 1400, earned: 520, percentage: 40 }, // 40% of program
      { category: 'Trail Missions', total: 525, earned: 425, percentage: 15 },
      { category: 'Special Assignments', total: 525, earned: 380, percentage: 15 },
      { category: 'Coach Feedback', total: 350, earned: 285, percentage: 10 },
      { category: 'Skills IQ Assessment', total: 350, earned: 280, percentage: 10 },
      { category: 'Meeting Engagement', total: 175, earned: 155, percentage: 5 },
      { category: 'Slack Participation', total: 175, earned: 135, percentage: 5 },
    ]
  };

  // Program History
  const programHistory = [
    {
      id: 1,
      name: 'The Guided Trail - Salesforce Development',
      academy: 'The Guided Trail',
      status: 'current',
      startDate: 'Jan 15, 2025',
      endDate: 'Apr 8, 2025',
      progress: 68,
      cohort: 'Spring 2025',
      coach: 'Sarah Martinez',
      completionDate: null,
      certifications: ['Salesforce Administrator (In Progress)', 'Platform App Builder (Planned)'],
      finalScore: null,
      platform: 'Viva Learning & PluralSight'
    },
    {
      id: 2,
      name: 'Business Analysis Fundamentals',
      status: 'completed',
      startDate: 'Sep 1, 2024',
      endDate: 'Dec 15, 2024',
      progress: 100,
      cohort: 'Fall 2024',
      coach: 'Michael Chen',
      completionDate: 'Dec 15, 2024',
      certifications: ['Entry Level Business Analyst (Completed)'],
      finalScore: 92,
      badges: 8,
      capstoneProject: 'Enterprise CRM Requirements Analysis'
    },
    {
      id: 3,
      name: 'Professional Development Bootcamp',
      status: 'completed',
      startDate: 'Jun 1, 2024',
      endDate: 'Aug 20, 2024',
      progress: 100,
      cohort: 'Summer 2024',
      coach: 'Jennifer Williams',
      completionDate: 'Aug 20, 2024',
      certifications: ['Professional Communication (Completed)'],
      finalScore: 88,
      badges: 5,
      capstoneProject: 'Personal Brand Development'
    }
  ];

  // Academy and Learning Paths from Viva Learning & PluralSight
  const academy = {
    name: 'The Guided Trail',
    description: '12-week intensive Salesforce development program',
    platform: 'Viva Learning & PluralSight',
    duration: '12 weeks',
    learningPaths: [
      {
        name: 'Salesforce Platform Fundamentals',
        platform: 'Viva Learning',
        weeks: '1-3',
        status: 'completed',
        progress: 100,
        courses: [
          { name: 'Salesforce Platform Basics', completed: true, hours: 8 },
          { name: 'Data Model & Objects', completed: true, hours: 6 },
          { name: 'Security & User Management', completed: true, hours: 5 },
        ]
      },
      {
        name: 'Declarative Development',
        platform: 'PluralSight',
        weeks: '4-6',
        status: 'in-progress',
        progress: 75,
        courses: [
          { name: 'Process Automation with Flow', completed: true, hours: 10 },
          { name: 'Reports and Dashboards', completed: true, hours: 8 },
          { name: 'Lightning App Builder', completed: false, hours: 7 },
        ]
      },
      {
        name: 'Programmatic Development',
        platform: 'PluralSight',
        weeks: '7-9',
        status: 'in-progress',
        progress: 40,
        courses: [
          { name: 'Apex Programming Basics', completed: true, hours: 12 },
          { name: 'Triggers and SOQL', completed: false, hours: 10 },
          { name: 'Lightning Web Components', completed: false, hours: 15 },
        ]
      },
      {
        name: 'Integration & Advanced Topics',
        platform: 'Viva Learning',
        weeks: '10-11',
        status: 'upcoming',
        progress: 0,
        courses: [
          { name: 'REST API Integration', completed: false, hours: 8 },
          { name: 'Testing & Debugging', completed: false, hours: 6 },
          { name: 'Deployment Strategies', completed: false, hours: 5 },
        ]
      },
      {
        name: 'Capstone & Certification',
        platform: 'Internal',
        weeks: '12',
        status: 'upcoming',
        progress: 0,
        courses: [
          { name: 'Capstone Project Development', completed: false, hours: 20 },
          { name: 'Certification Exam Prep', completed: false, hours: 10 },
        ]
      },
    ]
  };

  // Capstone Project
  const capstoneProject = {
    title: 'Community Service Volunteer Management System',
    description: 'Build a comprehensive Salesforce application to manage volunteer programs, track service hours, and coordinate community events for a local nonprofit organization.',
    goal: 'Demonstrate mastery of Salesforce development skills by creating a real-world application that solves a business problem using both declarative and programmatic tools.',
    status: 'in-progress',
    pointsTotal: 1400,
    pointsEarned: 520,
    startDate: 'Feb 1, 2025',
    dueDate: 'Apr 8, 2025',
    nonprofit: 'Hearts & Hands Community Services',
    
    objectives: [
      'Design and implement a custom data model with 5+ custom objects',
      'Create automated processes using Flow and Apex triggers',
      'Build custom Lightning Web Components for volunteer portal',
      'Implement role-based security and sharing rules',
      'Develop comprehensive reports and dashboards',
      'Deploy solution using change sets and version control'
    ],
    
    resources: [
      { name: 'Nonprofit Partner Contact', value: 'Maria Chen, Program Director', type: 'contact' },
      { name: 'Developer Sandbox', value: 'Access granted', type: 'tool' },
      { name: 'GitHub Repository', value: 'transitiontrails/volunteer-mgmt', type: 'tool' },
      { name: 'Design Documents', value: 'Available in Google Drive', type: 'document' },
      { name: 'Weekly Office Hours', value: 'Fridays 3-4pm with Coach', type: 'support' },
      { name: 'Peer Review Group', value: '4 cohort members', type: 'support' }
    ],
    
    phases: [
      {
        id: 1,
        name: 'Discovery & Planning',
        weeks: 'Weeks 1-2',
        points: 200,
        earned: 200,
        status: 'completed',
        dueDate: 'Feb 14, 2025',
        tasks: [
          { name: 'Conduct stakeholder interviews', completed: true },
          { name: 'Document requirements', completed: true },
          { name: 'Create user stories', completed: true },
          { name: 'Design data model diagram', completed: true },
          { name: 'Submit project proposal', completed: true }
        ]
      },
      {
        id: 2,
        name: 'Data Model & Security',
        weeks: 'Weeks 3-4',
        points: 250,
        earned: 220,
        status: 'completed',
        dueDate: 'Feb 28, 2025',
        tasks: [
          { name: 'Build custom objects (Volunteer, Event, Service Hours)', completed: true },
          { name: 'Configure fields and relationships', completed: true },
          { name: 'Set up page layouts and record types', completed: true },
          { name: 'Implement security model (profiles, roles, sharing)', completed: true },
          { name: 'Create validation rules', completed: false }
        ]
      },
      {
        id: 3,
        name: 'Automation & Business Logic',
        weeks: 'Weeks 5-7',
        points: 350,
        earned: 100,
        status: 'in-progress',
        dueDate: 'Mar 21, 2025',
        tasks: [
          { name: 'Build Flow for volunteer onboarding', completed: true },
          { name: 'Create Apex trigger for hour tracking', completed: true },
          { name: 'Develop scheduled batch job for reporting', completed: false },
          { name: 'Implement email notifications', completed: false },
          { name: 'Add approval process for event creation', completed: false }
        ]
      },
      {
        id: 4,
        name: 'User Interface & Experience',
        weeks: 'Weeks 8-9',
        points: 300,
        earned: 0,
        status: 'upcoming',
        dueDate: 'Apr 4, 2025',
        tasks: [
          { name: 'Build Lightning App for volunteers', completed: false },
          { name: 'Create custom LWC for event calendar', completed: false },
          { name: 'Design volunteer self-service portal', completed: false },
          { name: 'Build mobile-responsive layouts', completed: false },
          { name: 'Implement quick actions and utilities', completed: false }
        ]
      },
      {
        id: 5,
        name: 'Reporting & Analytics',
        weeks: 'Week 10',
        points: 150,
        earned: 0,
        status: 'upcoming',
        dueDate: 'Apr 4, 2025',
        tasks: [
          { name: 'Create custom report types', completed: false },
          { name: 'Build 5+ reports for different stakeholders', completed: false },
          { name: 'Design executive dashboard', completed: false },
          { name: 'Set up scheduled report delivery', completed: false }
        ]
      },
      {
        id: 6,
        name: 'Testing & Documentation',
        weeks: 'Week 11',
        points: 100,
        earned: 0,
        status: 'upcoming',
        dueDate: 'Apr 4, 2025',
        tasks: [
          { name: 'Write Apex test classes (85%+ coverage)', completed: false },
          { name: 'Perform UAT with nonprofit partner', completed: false },
          { name: 'Create user documentation', completed: false },
          { name: 'Document technical architecture', completed: false }
        ]
      },
      {
        id: 7,
        name: 'Deployment & Presentation',
        weeks: 'Week 12',
        points: 50,
        earned: 0,
        status: 'upcoming',
        dueDate: 'Apr 8, 2025',
        tasks: [
          { name: 'Deploy to production org', completed: false },
          { name: 'Train nonprofit staff', completed: false },
          { name: 'Present to cohort and coaches', completed: false },
          { name: 'Submit final deliverables', completed: false }
        ]
      }
    ]
  };

  // PluralSight Skills IQ Assessment
  const skillsIQ = {
    programStart: 'Jan 15, 2025',
    programEnd: 'Apr 8, 2025',
    currentWeek: 7,
    assessmentStatus: 'in-progress', // 'baseline', 'in-progress', 'completed'
    skills: [
      {
        name: 'Salesforce Platform',
        baseline: 45,
        current: 72,
        target: 85,
        level: 'Proficient',
        assessedDate: 'Mar 4, 2025'
      },
      {
        name: 'Apex Programming',
        baseline: 30,
        current: 58,
        target: 75,
        level: 'Working',
        assessedDate: 'Mar 4, 2025'
      },
      {
        name: 'Process Automation',
        baseline: 52,
        current: 81,
        target: 85,
        level: 'Expert',
        assessedDate: 'Mar 4, 2025'
      },
      {
        name: 'Data Management',
        baseline: 40,
        current: 68,
        target: 80,
        level: 'Proficient',
        assessedDate: 'Mar 4, 2025'
      },
      {
        name: 'Lightning Components',
        baseline: 25,
        current: 50,
        target: 70,
        level: 'Working',
        assessedDate: 'Mar 4, 2025'
      },
      {
        name: 'Integration Patterns',
        baseline: 20,
        current: 35,
        target: 65,
        level: 'Novice',
        assessedDate: null // Not yet assessed
      },
    ],
    overallGrowth: 27 // Average improvement across all skills
  };

  // Skills IQ Proficiency Levels
  const getSkillLevel = (score: number) => {
    if (score >= 80) return { label: 'Expert', color: '#3B6A52' };
    if (score >= 60) return { label: 'Proficient', color: '#2C6975' };
    if (score >= 40) return { label: 'Working', color: '#F9A03F' };
    return { label: 'Novice', color: '#7EB5C1' };
  };

  // Bi-weekly Coach Feedback Assessments
  const coachFeedback = [
    {
      id: 1,
      week: 'Weeks 1-2',
      date: 'Jan 29, 2025',
      status: 'completed',
      coach: 'Sarah Martinez',
      overallScore: 95,
      feedback: 'Excellent start! Strong grasp of platform fundamentals. Continue maintaining this momentum.',
      areas: [
        { name: 'Assignment Completion', score: 100, comment: 'All assignments submitted on time with high quality' },
        { name: 'Trail Missions', score: 95, comment: 'Completed all required Trail Missions, excellent engagement' },
        { name: 'Participation', score: 90, comment: 'Active in Slack discussions and peer collaboration' },
      ]
    },
    {
      id: 2,
      week: 'Weeks 3-4',
      date: 'Feb 12, 2025',
      status: 'completed',
      coach: 'Sarah Martinez',
      overallScore: 88,
      feedback: 'Great progress on data modeling. Focus more on best practices for schema design in next phase.',
      areas: [
        { name: 'Assignment Completion', score: 90, comment: 'Assignments complete, minor improvements needed in documentation' },
        { name: 'Trail Missions', score: 85, comment: 'Good progress, one mission slightly delayed' },
        { name: 'Participation', score: 90, comment: 'Continued strong engagement with cohort' },
      ]
    },
    {
      id: 3,
      week: 'Weeks 5-6',
      date: 'Feb 26, 2025',
      status: 'completed',
      coach: 'Sarah Martinez',
      overallScore: 92,
      feedback: 'Excellent work on Flow automation! Your process builder solutions show strong logical thinking.',
      areas: [
        { name: 'Assignment Completion', score: 95, comment: 'Outstanding Flow assignments with creative solutions' },
        { name: 'Trail Missions', score: 90, comment: 'Completed all declarative development trails successfully' },
        { name: 'Participation', score: 90, comment: 'Helped peers with Flow debugging - great collaboration' },
      ]
    },
    {
      id: 4,
      week: 'Weeks 7-8',
      date: 'Mar 11, 2025',
      status: 'pending',
      coach: 'Sarah Martinez',
      overallScore: null,
      feedback: null,
      areas: []
    },
    {
      id: 5,
      week: 'Weeks 9-10',
      date: 'Mar 25, 2025',
      status: 'upcoming',
      coach: 'Sarah Martinez',
      overallScore: null,
      feedback: null,
      areas: []
    },
    {
      id: 6,
      week: 'Weeks 11-12',
      date: 'Apr 8, 2025',
      status: 'upcoming',
      coach: 'Sarah Martinez',
      overallScore: null,
      feedback: null,
      areas: []
    },
  ];

  const milestones = [
    { name: 'Program Start', date: 'Jan 15, 2025', completed: true },
    { name: 'Baseline Skills IQ', date: 'Jan 15, 2025', completed: true },
    { name: 'Week 2 Assessment', date: 'Jan 29, 2025', completed: true },
    { name: 'Week 4 Assessment', date: 'Feb 12, 2025', completed: true },
    { name: 'Week 6 Assessment', date: 'Feb 26, 2025', completed: true },
    { name: 'Mid-Program Skills IQ', date: 'Mar 4, 2025', completed: true },
    { name: 'Week 8 Assessment', date: 'Mar 11, 2025', completed: false, upcoming: true },
    { name: 'Week 10 Assessment', date: 'Mar 25, 2025', completed: false },
    { name: 'Final Skills IQ', date: 'Apr 8, 2025', completed: false },
    { name: 'Capstone & Certification', date: 'Apr 8, 2025', completed: false },
  ];

  const resources = [
    { name: 'Trailhead Learning Paths', icon: '🎓', link: '#' },
    { name: 'Salesforce Documentation', icon: '📚', link: '#' },
    { name: 'Community Forums', icon: '💬', link: '#' },
    { name: 'Video Tutorials', icon: '🎥', link: '#' },
    { name: 'Practice Orgs', icon: '⚡', link: '#' },
    { name: 'Study Guides', icon: '📖', link: '#' },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <button 
          onClick={() => onNavigate('learner')}
          className="flex items-center space-x-2 text-[#2C6975] hover:underline mb-4"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Home</span>
        </button>
        <h2 className="text-3xl text-gray-900 mb-2">My Program</h2>
        <p className="text-gray-600">{academy.name} • Cohort Spring 2025</p>
      </div>

      {/* Coach Card */}
      <div className="bg-gradient-to-br from-[#2C6975] to-[#7EB5C1] rounded-xl shadow-lg border border-[#2C6975]/20 p-6 mb-8 text-white">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-start space-x-4">
            <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-white border-2 border-white/30 flex-shrink-0">
              <span className="text-xl">{currentCoach.avatar}</span>
            </div>
            <div className="flex-1">
              <div className="flex items-center space-x-2 mb-1">
                <h3 className="text-xl">{currentCoach.name}</h3>
                <CheckCircle className="w-5 h-5 text-white/90" />
              </div>
              <p className="text-white/90 text-sm mb-2">{currentCoach.title}</p>
              <p className="text-white/80 text-sm mb-3">{currentCoach.bio}</p>
              <div className="flex flex-wrap gap-2">
                {currentCoach.specialties.map((specialty, idx) => (
                  <span key={idx} className="px-2 py-1 rounded-full bg-white/20 backdrop-blur-sm text-xs text-white border border-white/30">
                    {specialty}
                  </span>
                ))}
              </div>
            </div>
          </div>
          <div className="flex md:flex-col gap-2 md:items-end">
            <button
              onClick={() => onNavigate('profile')}
              className="flex items-center space-x-2 bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white px-4 py-2 rounded-lg transition-colors border border-white/30"
            >
              <UserCircle className="w-4 h-4" />
              <span className="text-sm">View Profile</span>
            </button>
            <a
              href={`slack://user?team=T12345&id=${currentCoach.slackId}`}
              className="flex items-center space-x-2 bg-white text-[#2C6975] hover:bg-white/90 px-4 py-2 rounded-lg transition-colors"
            >
              <MessageSquare className="w-4 h-4" />
              <span className="text-sm">Message on Slack</span>
            </a>
          </div>
        </div>
      </div>

      {/* Program Overview */}
      <div className="grid md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 rounded-lg bg-[#2C6975]/10 flex items-center justify-center">
              <Target className="w-6 h-6 text-[#2C6975]" />
            </div>
            <ProgressRing progress={Math.round((pointsSystem.earned / pointsSystem.total) * 100)} size={60} color="#2C6975" />
          </div>
          <h3 className="text-gray-900 mb-1">Program Points</h3>
          <p className="text-2xl text-gray-900 mb-1">{pointsSystem.earned.toLocaleString()}</p>
          <p className="text-gray-600 text-sm">of {pointsSystem.total.toLocaleString()} points</p>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 rounded-lg bg-[#F9A03F]/10 flex items-center justify-center">
              <Calendar className="w-6 h-6 text-[#F9A03F]" />
            </div>
          </div>
          <h3 className="text-gray-900 mb-1">Time Remaining</h3>
          <p className="text-2xl text-gray-900 mb-1">5 weeks</p>
          <p className="text-gray-600 text-sm">Target: Apr 8, 2025</p>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 rounded-lg bg-[#3B6A52]/10 flex items-center justify-center">
              <Award className="w-6 h-6 text-[#3B6A52]" />
            </div>
          </div>
          <h3 className="text-gray-900 mb-1">Badges Earned</h3>
          <p className="text-2xl text-gray-900 mb-1">12 badges</p>
          <p className="text-gray-600 text-sm">Target: 20 badges</p>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 rounded-lg bg-[#7EB5C1]/10 flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-[#7EB5C1]" />
            </div>
          </div>
          <h3 className="text-gray-900 mb-1">Skills IQ Growth</h3>
          <p className="text-2xl text-[#3B6A52] mb-1">+{skillsIQ.overallGrowth}</p>
          <p className="text-gray-600 text-sm">Average across 6 skills</p>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Curriculum */}
        <div className="lg:col-span-2 space-y-6">
          {/* Academy Overview */}
          <div className="bg-gradient-to-br from-[#F5F3E8] to-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="text-gray-900 mb-2 flex items-center space-x-2">
                  <BookOpen className="w-5 h-5 text-[#2C6975]" />
                  <span>{academy.name}</span>
                </h3>
                <p className="text-gray-600 text-sm mb-2">{academy.description}</p>
                <div className="flex items-center space-x-3 text-sm text-gray-600">
                  <span className="flex items-center space-x-1">
                    <Calendar className="w-4 h-4" />
                    <span>{academy.duration}</span>
                  </span>
                  <span>•</span>
                  <span>{academy.platform}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Points Breakdown */}
          <Collapsible open={isPointsOpen} onOpenChange={setIsPointsOpen}>
            <div className="bg-white rounded-xl shadow-sm border border-gray-200">
              <CollapsibleTrigger className="w-full p-6 flex items-center justify-between hover:bg-gray-50 transition-colors rounded-t-xl">
                <div className="flex items-center space-x-3">
                  <Target className="w-5 h-5 text-[#2C6975]" />
                  <h3 className="text-gray-900">Points Breakdown</h3>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="text-right">
                    <div className="text-2xl text-[#2C6975]">{pointsSystem.earned.toLocaleString()}</div>
                    <p className="text-xs text-gray-600">of {pointsSystem.total.toLocaleString()}</p>
                  </div>
                  <ChevronDown className={`w-5 h-5 text-gray-400 transition-transform ${isPointsOpen ? 'rotate-180' : ''}`} />
                </div>
              </CollapsibleTrigger>

              <CollapsibleContent>
                <div className="px-6 pb-6">

            <div className="space-y-4">
              {pointsSystem.breakdown.map((item, idx) => {
                const progressPercent = (item.earned / item.total) * 100;
                return (
                  <div key={idx}>
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-gray-900 text-sm">{item.category}</span>
                          <span className="text-sm text-gray-600">
                            {item.earned} / {item.total} pts
                          </span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <div className="flex-1 bg-gray-200 rounded-full h-2">
                            <div
                              className="h-2 rounded-full bg-[#2C6975]"
                              style={{ width: `${progressPercent}%` }}
                            ></div>
                          </div>
                          <span className="text-xs text-gray-500 w-12 text-right">{item.percentage}%</span>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="mt-6 p-4 bg-gradient-to-r from-[#2C6975]/10 to-[#7EB5C1]/10 rounded-lg border border-[#2C6975]/20">
              <div className="flex items-center space-x-3">
                <Award className="w-8 h-8 text-[#2C6975]" />
                <div className="flex-1">
                  <h4 className="text-gray-900 mb-1">Completion Requirement</h4>
                  <p className="text-sm text-gray-600">
                    Earn at least 3,150 points (90% of total) to successfully complete The Guided Trail program.
                  </p>
                  <div className="mt-2 flex items-center space-x-2">
                    <div className="flex-1 bg-gray-300 rounded-full h-3">
                      <div
                        className="h-3 rounded-full bg-gradient-to-r from-[#2C6975] to-[#3B6A52]"
                        style={{ width: `${Math.min(100, (pointsSystem.earned / 3150) * 100)}%` }}
                      ></div>
                    </div>
                    <span className="text-sm text-[#2C6975]">
                      {Math.round((pointsSystem.earned / 3150) * 100)}%
                    </span>
                  </div>
                </div>
              </div>
            </div>
                </div>
              </CollapsibleContent>
            </div>
          </Collapsible>

          {/* Capstone Project */}
          <Collapsible open={isCapstoneOpen} onOpenChange={setIsCapstoneOpen}>
            <div className="bg-white rounded-xl shadow-sm border border-gray-200">
              <CollapsibleTrigger className="w-full p-6 flex items-center justify-between hover:bg-gray-50 transition-colors rounded-t-xl">
                <div className="flex items-center space-x-3">
                  <FileCode className="w-5 h-5 text-[#F9A03F]" />
                  <h3 className="text-gray-900">Capstone Project</h3>
                  <span className="px-3 py-1 rounded-full text-xs bg-[#F9A03F] text-white">
                    In Progress
                  </span>
                </div>
                <ChevronDown className={`w-5 h-5 text-gray-400 transition-transform ${isCapstoneOpen ? 'rotate-180' : ''}`} />
              </CollapsibleTrigger>

              <CollapsibleContent>
                <div className="px-6 pb-6">

            {/* Project Header */}
            <div className="mb-6 p-4 bg-gradient-to-br from-[#F9A03F]/10 to-[#F5F3E8] rounded-lg border border-[#F9A03F]/20">
              <h4 className="text-gray-900 mb-2">{capstoneProject.title}</h4>
              <p className="text-sm text-gray-600 mb-3">{capstoneProject.description}</p>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-xs text-gray-500 mb-1">Partner Organization</p>
                  <p className="text-sm text-gray-900">{capstoneProject.nonprofit}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 mb-1">Due Date</p>
                  <p className="text-sm text-gray-900">{capstoneProject.dueDate}</p>
                </div>
              </div>
            </div>

            {/* Points Progress */}
            <div className="mb-6 p-4 bg-white rounded-lg border-2 border-[#2C6975]">
              <div className="flex items-center justify-between mb-3">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Capstone Points Progress</p>
                  <p className="text-2xl text-[#2C6975]">{capstoneProject.pointsEarned} / {capstoneProject.pointsTotal}</p>
                </div>
                <div className="text-right">
                  <ProgressRing 
                    progress={Math.round((capstoneProject.pointsEarned / capstoneProject.pointsTotal) * 100)} 
                    size={70} 
                    color="#2C6975" 
                  />
                </div>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="h-2 rounded-full bg-[#2C6975]"
                  style={{ width: `${(capstoneProject.pointsEarned / capstoneProject.pointsTotal) * 100}%` }}
                ></div>
              </div>
              <p className="text-xs text-gray-600 mt-2">40% of total program points</p>
            </div>

            {/* Project Goal */}
            <div className="mb-6">
              <h4 className="text-gray-900 mb-2 flex items-center space-x-2">
                <Target className="w-4 h-4 text-[#2C6975]" />
                <span>Project Goal</span>
              </h4>
              <p className="text-sm text-gray-600 bg-[#F5F3E8] p-3 rounded-lg">{capstoneProject.goal}</p>
            </div>

            {/* Learning Objectives */}
            <div className="mb-6">
              <h4 className="text-gray-900 mb-3 flex items-center space-x-2">
                <CheckSquare className="w-4 h-4 text-[#2C6975]" />
                <span>Learning Objectives</span>
              </h4>
              <div className="grid gap-2">
                {capstoneProject.objectives.map((objective, idx) => (
                  <div key={idx} className="flex items-start space-x-2 text-sm">
                    <CheckCircle className="w-4 h-4 text-[#3B6A52] mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">{objective}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Resources */}
            <div className="mb-6">
              <h4 className="text-gray-900 mb-3 flex items-center space-x-2">
                <Database className="w-4 h-4 text-[#2C6975]" />
                <span>Resources & Support</span>
              </h4>
              <div className="grid gap-3">
                {capstoneProject.resources.map((resource, idx) => (
                  <div key={idx} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center space-x-3">
                      {resource.type === 'tool' && <Zap className="w-4 h-4 text-[#F9A03F]" />}
                      {resource.type === 'contact' && <Users className="w-4 h-4 text-[#2C6975]" />}
                      {resource.type === 'document' && <FileText className="w-4 h-4 text-[#7EB5C1]" />}
                      {resource.type === 'support' && <MessageSquare className="w-4 h-4 text-[#3B6A52]" />}
                      <div>
                        <p className="text-sm text-gray-900">{resource.name}</p>
                        <p className="text-xs text-gray-600">{resource.value}</p>
                      </div>
                    </div>
                    {(resource.type === 'tool' || resource.type === 'document') && (
                      <ExternalLink className="w-4 h-4 text-gray-400" />
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Project Phases */}
            <div>
              <h4 className="text-gray-900 mb-4 flex items-center space-x-2">
                <ChevronRight className="w-4 h-4 text-[#2C6975]" />
                <span>Project Phases & Tasks</span>
              </h4>
              <div className="space-y-4">
                {capstoneProject.phases.map((phase, idx) => (
                  <div 
                    key={phase.id}
                    className={`border-l-4 pl-4 ${
                      phase.status === 'completed' ? 'border-[#3B6A52]' :
                      phase.status === 'in-progress' ? 'border-[#F9A03F]' :
                      'border-gray-300'
                    }`}
                  >
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-1">
                          <h5 className="text-gray-900">{phase.name}</h5>
                          <span className={`px-2 py-0.5 rounded-full text-xs ${
                            phase.status === 'completed' ? 'bg-[#3B6A52] text-white' :
                            phase.status === 'in-progress' ? 'bg-[#F9A03F] text-white' :
                            'bg-gray-200 text-gray-700'
                          }`}>
                            {phase.status === 'completed' ? 'Completed' :
                             phase.status === 'in-progress' ? 'In Progress' :
                             'Upcoming'}
                          </span>
                        </div>
                        <p className="text-xs text-gray-600 mb-2">{phase.weeks} • Due: {phase.dueDate}</p>
                      </div>
                      <div className="text-right ml-4">
                        <p className="text-sm text-[#2C6975]">{phase.earned} / {phase.points}</p>
                        <p className="text-xs text-gray-500">points</p>
                      </div>
                    </div>

                    {/* Tasks */}
                    <div className="space-y-2 mb-3">
                      {phase.tasks.map((task, tIdx) => (
                        <div key={tIdx} className="flex items-center space-x-2 text-sm">
                          <div className={`w-4 h-4 rounded flex items-center justify-center flex-shrink-0 ${
                            task.completed ? 'bg-[#3B6A52]' : 'border-2 border-gray-300'
                          }`}>
                            {task.completed && (
                              <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                              </svg>
                            )}
                          </div>
                          <span className={task.completed ? 'text-gray-700' : 'text-gray-500'}>
                            {task.name}
                          </span>
                        </div>
                      ))}
                    </div>

                    {/* Progress Bar */}
                    <div className="flex items-center space-x-3">
                      <div className="flex-1 bg-gray-200 rounded-full h-1.5">
                        <div
                          className={`h-1.5 rounded-full ${
                            phase.status === 'completed' ? 'bg-[#3B6A52]' :
                            phase.status === 'in-progress' ? 'bg-[#F9A03F]' :
                            'bg-gray-300'
                          }`}
                          style={{ width: `${(phase.earned / phase.points) * 100}%` }}
                        ></div>
                      </div>
                      <span className="text-xs text-gray-600 w-12 text-right">
                        {Math.round((phase.earned / phase.points) * 100)}%
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Ask Penny CTA */}
            <div className="mt-6 p-4 bg-gradient-to-r from-[#2C6975]/10 to-[#F9A03F]/10 rounded-lg border border-[#2C6975]/20">
              <div className="flex items-start space-x-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#2C6975] to-[#F9A03F] flex items-center justify-center flex-shrink-0">
                  <Sparkles className="w-5 h-5 text-white" />
                </div>
                <div className="flex-1">
                  <h4 className="text-gray-900 mb-1">Need Help with Your Capstone?</h4>
                  <p className="text-sm text-gray-600 mb-3">
                    Penny can help you brainstorm ideas, troubleshoot code, review your approach, or answer questions about best practices.
                  </p>
                  <button 
                    onClick={() => setIsPennyChatOpen(true)}
                    className="text-sm text-[#2C6975] hover:underline flex items-center space-x-1"
                  >
                    <Sparkles className="w-4 h-4" />
                    <span>Ask Penny for Help →</span>
                  </button>
                </div>
              </div>
            </div>
                </div>
              </CollapsibleContent>
            </div>
          </Collapsible>

          {/* Learning Paths */}
          <Collapsible open={isLearningPathsOpen} onOpenChange={setIsLearningPathsOpen}>
            <div className="bg-white rounded-xl shadow-sm border border-gray-200">
              <CollapsibleTrigger className="w-full p-6 flex items-center justify-between hover:bg-gray-50 transition-colors rounded-t-xl">
                <div className="flex items-center space-x-3">
                  <BookOpen className="w-5 h-5 text-[#2C6975]" />
                  <h3 className="text-gray-900">Learning Paths</h3>
                  <span className="text-sm text-gray-600">(5 paths)</span>
                </div>
                <ChevronDown className={`w-5 h-5 text-gray-400 transition-transform ${isLearningPathsOpen ? 'rotate-180' : ''}`} />
              </CollapsibleTrigger>

              <CollapsibleContent>
                <div className="px-6 pb-6">
            
            <div className="space-y-6">
              {academy.learningPaths.map((path, idx) => (
                <div key={idx} className="border-l-4 pl-6 relative" style={{ 
                  borderColor: path.status === 'completed' ? '#3B6A52' : 
                              path.status === 'in-progress' ? '#F9A03F' : '#E5E7EB' 
                }}>
                  <div className="absolute -left-2 top-0 w-3 h-3 rounded-full" style={{ 
                    backgroundColor: path.status === 'completed' ? '#3B6A52' : 
                                   path.status === 'in-progress' ? '#F9A03F' : '#E5E7EB' 
                  }}></div>
                  
                  <div className="mb-4">
                    <div className="flex items-center justify-between mb-2">
                      <div>
                        <h4 className="text-gray-900">{path.name}</h4>
                        <p className="text-sm text-gray-500">Weeks {path.weeks} • {path.platform}</p>
                      </div>
                      <span className={`px-3 py-1 rounded-full text-xs ${
                        path.status === 'completed' ? 'bg-[#3B6A52] text-white' :
                        path.status === 'in-progress' ? 'bg-[#F9A03F] text-white' :
                        'bg-gray-200 text-gray-700'
                      }`}>
                        {path.status === 'completed' ? 'Completed' :
                         path.status === 'in-progress' ? 'In Progress' :
                         'Upcoming'}
                      </span>
                    </div>
                    
                    {/* Progress Bar */}
                    <div className="flex items-center space-x-3 mb-3">
                      <div className="flex-1">
                        <div className="w-full bg-gray-100 rounded-full h-2">
                          <div 
                            className="h-2 rounded-full transition-all duration-500"
                            style={{ 
                              width: `${path.progress}%`,
                              backgroundColor: path.status === 'completed' ? '#3B6A52' : 
                                             path.status === 'in-progress' ? '#F9A03F' : '#E5E7EB'
                            }}
                          ></div>
                        </div>
                      </div>
                      <span className="text-sm text-gray-600">{path.progress}%</span>
                    </div>
                  </div>

                  {/* Courses */}
                  <div className="space-y-2">
                    {path.courses.map((course, cIdx) => (
                      <div key={cIdx} className="flex items-center justify-between text-sm">
                        <div className="flex items-center space-x-3">
                          <div className={`w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 ${
                            course.completed ? 'bg-[#3B6A52]' : 'border-2 border-gray-300'
                          }`}>
                            {course.completed && (
                              <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                              </svg>
                            )}
                          </div>
                          <span className={course.completed ? 'text-gray-700' : 'text-gray-500'}>
                            {course.name}
                          </span>
                        </div>
                        <span className="text-xs text-gray-500">{course.hours}h</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
                </div>
              </CollapsibleContent>
            </div>
          </Collapsible>

          {/* PluralSight Skills IQ Assessment */}
          <Collapsible open={isSkillsIQOpen} onOpenChange={setIsSkillsIQOpen}>
            <div className="bg-white rounded-xl shadow-sm border border-gray-200">
              <CollapsibleTrigger className="w-full p-6 flex items-center justify-between hover:bg-gray-50 transition-colors rounded-t-xl">
                <div className="flex items-center space-x-3">
                  <TrendingUp className="w-5 h-5 text-[#2C6975]" />
                  <h3 className="text-gray-900">PluralSight Skills IQ</h3>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="text-right">
                    <div className="text-2xl text-[#3B6A52]">+{skillsIQ.overallGrowth}</div>
                    <p className="text-xs text-gray-600">Avg Growth</p>
                  </div>
                  <ChevronDown className={`w-5 h-5 text-gray-400 transition-transform ${isSkillsIQOpen ? 'rotate-180' : ''}`} />
                </div>
              </CollapsibleTrigger>

              <CollapsibleContent>
                <div className="px-6 pb-6">

            <div className="mb-6 p-4 bg-gradient-to-r from-[#2C6975]/10 to-[#7EB5C1]/10 rounded-lg border border-[#2C6975]/20">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-gray-600 mb-1">Baseline Assessment</p>
                  <p className="text-gray-900">{skillsIQ.programStart}</p>
                </div>
                <div>
                  <p className="text-gray-600 mb-1">Final Assessment</p>
                  <p className="text-gray-900">{skillsIQ.programEnd}</p>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              {skillsIQ.skills.map((skill, idx) => {
                const improvement = skill.current - skill.baseline;
                const progressToTarget = ((skill.current - skill.baseline) / (skill.target - skill.baseline)) * 100;
                const levelInfo = getSkillLevel(skill.current);
                
                return (
                  <div key={idx} className="pb-4 border-b border-gray-100 last:border-0 last:pb-0">
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-1">
                          <h4 className="text-gray-900">{skill.name}</h4>
                          <span 
                            className="px-2 py-0.5 rounded-full text-xs text-white"
                            style={{ backgroundColor: levelInfo.color }}
                          >
                            {levelInfo.label}
                          </span>
                        </div>
                        {skill.assessedDate && (
                          <p className="text-xs text-gray-500">Last assessed: {skill.assessedDate}</p>
                        )}
                        {!skill.assessedDate && (
                          <p className="text-xs text-gray-500 italic">Not yet assessed</p>
                        )}
                      </div>
                      <div className="text-right">
                        {improvement > 0 && (
                          <div className="flex items-center space-x-1 text-[#3B6A52]">
                            <TrendingUp className="w-4 h-4" />
                            <span className="text-sm">+{improvement}</span>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Skills Progress Bars */}
                    <div className="space-y-2">
                      {/* Baseline to Current */}
                      <div>
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-xs text-gray-600">Baseline → Current</span>
                          <span className="text-xs text-gray-900">{skill.baseline} → {skill.current}</span>
                        </div>
                        <div className="relative w-full bg-gray-200 rounded-full h-2">
                          {/* Baseline marker */}
                          <div 
                            className="absolute top-0 h-2 bg-gray-400 rounded-l-full"
                            style={{ width: `${skill.baseline}%` }}
                          ></div>
                          {/* Current score */}
                          <div 
                            className="absolute top-0 h-2 rounded-full"
                            style={{ 
                              width: `${skill.current}%`,
                              backgroundColor: levelInfo.color
                            }}
                          ></div>
                        </div>
                      </div>

                      {/* Progress to Target */}
                      <div>
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-xs text-gray-600">Progress to Target ({skill.target})</span>
                          <span className="text-xs text-gray-900">{Math.min(100, Math.round(progressToTarget))}%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-1.5">
                          <div 
                            className="h-1.5 rounded-full bg-[#2C6975]"
                            style={{ width: `${Math.min(100, progressToTarget)}%` }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="mt-6 p-4 bg-[#F5F3E8] rounded-lg">
              <div className="flex items-start space-x-3">
                <div className="w-10 h-10 rounded-lg bg-white flex items-center justify-center flex-shrink-0">
                  <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none">
                    <path d="M12 2L2 7L12 12L22 7L12 2Z" fill="#F9A03F" opacity="0.5"/>
                    <path d="M2 17L12 22L22 17" stroke="#F9A03F" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M2 12L12 17L22 12" stroke="#F9A03F" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <div className="flex-1">
                  <h4 className="text-gray-900 mb-1">PluralSight Skills Assessment</h4>
                  <p className="text-sm text-gray-600">
                    Your Skills IQ is measured at program start and end using PluralSight's assessment technology. 
                    Take practice assessments anytime to track your progress.
                  </p>
                  <button className="mt-3 text-sm text-[#2C6975] hover:underline">
                    Take Practice Assessment →
                  </button>
                </div>
              </div>
            </div>
                </div>
              </CollapsibleContent>
            </div>
          </Collapsible>

          {/* Coach Feedback Assessments */}
          <Collapsible open={isCoachFeedbackOpen} onOpenChange={setIsCoachFeedbackOpen}>
            <div className="bg-white rounded-xl shadow-sm border border-gray-200">
              <CollapsibleTrigger className="w-full p-6 flex items-center justify-between hover:bg-gray-50 transition-colors rounded-t-xl">
                <div className="flex items-center space-x-3">
                  <MessageSquare className="w-5 h-5 text-[#2C6975]" />
                  <h3 className="text-gray-900">Coach Feedback Assessments</h3>
                  <span className="text-sm text-gray-600">(Bi-weekly)</span>
                </div>
                <ChevronDown className={`w-5 h-5 text-gray-400 transition-transform ${isCoachFeedbackOpen ? 'rotate-180' : ''}`} />
              </CollapsibleTrigger>

              <CollapsibleContent>
                <div className="px-6 pb-6">
            
            <div className="space-y-4">
              {coachFeedback.map((feedback, idx) => (
                <div 
                  key={feedback.id} 
                  className={`p-4 rounded-lg border-2 ${
                    feedback.status === 'completed' ? 'border-[#3B6A52] bg-[#3B6A52]/5' :
                    feedback.status === 'pending' ? 'border-[#F9A03F] bg-[#F9A03F]/5' :
                    'border-gray-200 bg-gray-50'
                  }`}
                >
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <div className="flex items-center space-x-2 mb-1">
                        <h4 className="text-gray-900">{feedback.week}</h4>
                        {feedback.status === 'completed' && (
                          <CheckCircle className="w-5 h-5 text-[#3B6A52]" />
                        )}
                        {feedback.status === 'pending' && (
                          <Clock className="w-5 h-5 text-[#F9A03F]" />
                        )}
                      </div>
                      <p className="text-sm text-gray-600">{feedback.date}</p>
                    </div>
                    {feedback.overallScore !== null && (
                      <div className="text-right">
                        <div className="text-2xl text-[#2C6975]">{feedback.overallScore}%</div>
                        <p className="text-xs text-gray-600">Overall Score</p>
                      </div>
                    )}
                  </div>

                  {feedback.status === 'completed' && (
                    <>
                      <div className="mb-3 p-3 bg-white rounded-lg border border-gray-200">
                        <p className="text-sm text-gray-700 italic">"{feedback.feedback}"</p>
                        <p className="text-xs text-gray-500 mt-2">— {feedback.coach}</p>
                      </div>

                      <div className="space-y-2">
                        {feedback.areas.map((area, aIdx) => (
                          <div key={aIdx} className="flex items-start justify-between text-sm">
                            <div className="flex-1">
                              <div className="flex items-center justify-between mb-1">
                                <span className="text-gray-900">{area.name}</span>
                                <span className="text-[#2C6975]">{area.score}%</span>
                              </div>
                              <div className="w-full bg-gray-200 rounded-full h-1.5 mb-1">
                                <div 
                                  className="h-1.5 rounded-full bg-[#2C6975]"
                                  style={{ width: `${area.score}%` }}
                                ></div>
                              </div>
                              <p className="text-xs text-gray-600">{area.comment}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </>
                  )}

                  {feedback.status === 'pending' && (
                    <div className="text-sm text-gray-600">
                      <p>Assessment in progress. Feedback will be available soon.</p>
                    </div>
                  )}

                  {feedback.status === 'upcoming' && (
                    <div className="text-sm text-gray-500">
                      <p>Scheduled for {feedback.date}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
                </div>
              </CollapsibleContent>
            </div>
          </Collapsible>

          {/* Program Details */}
          <Collapsible open={isAcademyDetailsOpen} onOpenChange={setIsAcademyDetailsOpen}>
            <div className="bg-white rounded-xl shadow-sm border border-gray-200">
              <CollapsibleTrigger className="w-full p-6 flex items-center justify-between hover:bg-gray-50 transition-colors rounded-t-xl">
                <div className="flex items-center space-x-3">
                  <FileText className="w-5 h-5 text-[#2C6975]" />
                  <h3 className="text-gray-900">Program Details</h3>
                </div>
                <ChevronDown className={`w-5 h-5 text-gray-400 transition-transform ${isAcademyDetailsOpen ? 'rotate-180' : ''}`} />
              </CollapsibleTrigger>

              <CollapsibleContent>
                <div className="px-6 pb-6">
            <div className="space-y-4">
              <div>
                <p className="text-sm text-gray-500 mb-1">Academy</p>
                <p className="text-gray-900">{academy.name}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500 mb-1">Learning Platforms</p>
                <p className="text-gray-900">Viva Learning & PluralSight</p>
              </div>
              <div>
                <p className="text-sm text-gray-500 mb-1">Duration</p>
                <p className="text-gray-900">{academy.duration} (Jan 15 - Apr 8, 2025)</p>
              </div>
              <div>
                <p className="text-sm text-gray-500 mb-1">Cohort</p>
                <p className="text-gray-900">Spring 2025 • 20 learners</p>
              </div>
              <div>
                <p className="text-sm text-gray-500 mb-1">Coach Reviews</p>
                <p className="text-gray-900">Bi-weekly feedback (every 2 weeks)</p>
              </div>
              <div>
                <p className="text-sm text-gray-500 mb-1">Skills IQ Assessment</p>
                <p className="text-gray-900">Start & End + Practice Anytime</p>
              </div>
              <div>
                <p className="text-sm text-gray-500 mb-1">Target Certifications</p>
                <p className="text-gray-900">Salesforce Administrator, Platform App Builder</p>
              </div>
              <div>
                <p className="text-sm text-gray-500 mb-1">Learning Hours</p>
                <p className="text-gray-900">15-20 hours/week recommended</p>
              </div>
            </div>
                </div>
              </CollapsibleContent>
            </div>
          </Collapsible>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Milestones */}
          <Collapsible open={isMilestonesOpen} onOpenChange={setIsMilestonesOpen}>
            <div className="bg-white rounded-xl shadow-sm border border-gray-200">
              <CollapsibleTrigger className="w-full p-6 flex items-center justify-between hover:bg-gray-50 transition-colors rounded-t-xl">
                <div className="flex items-center space-x-3">
                  <Calendar className="w-5 h-5 text-[#2C6975]" />
                  <h3 className="text-gray-900">Key Milestones</h3>
                </div>
                <ChevronDown className={`w-5 h-5 text-gray-400 transition-transform ${isMilestonesOpen ? 'rotate-180' : ''}`} />
              </CollapsibleTrigger>

              <CollapsibleContent>
                <div className="px-6 pb-6">
            <div className="space-y-4">
              {milestones.map((milestone, idx) => (
                <div key={idx} className="flex items-start space-x-3">
                  <div className={`mt-1 w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 ${
                    milestone.completed ? 'bg-[#3B6A52]' :
                    milestone.upcoming ? 'bg-[#F9A03F]' :
                    'border-2 border-gray-300'
                  }`}>
                    {milestone.completed && (
                      <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                      </svg>
                    )}
                  </div>
                  <div>
                    <p className="text-sm text-gray-900">{milestone.name}</p>
                    <p className="text-xs text-gray-500">{milestone.date}</p>
                  </div>
                </div>
              ))}
            </div>
                </div>
              </CollapsibleContent>
            </div>
          </Collapsible>

          {/* Program Calendar CTA */}
          <div className="bg-gradient-to-r from-[#2C6975] to-[#7EB5C1] rounded-xl shadow-sm p-6 text-white">
            <div className="flex items-start space-x-3">
              <Calendar className="w-8 h-8 text-white flex-shrink-0" />
              <div className="flex-1">
                <h3 className="text-white mb-2">Program Calendar</h3>
                <p className="text-sm text-white/90 mb-4">
                  View your schedule including stand-ups, campfire sessions, coaching, and classes.
                </p>
                <button 
                  onClick={() => onNavigate('program-calendar')}
                  className="px-4 py-2 bg-white text-[#2C6975] rounded-lg text-sm hover:bg-gray-100 transition-colors"
                >
                  View Calendar →
                </button>
              </div>
            </div>
          </div>

          {/* Team */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h3 className="text-gray-900 mb-4 flex items-center space-x-2">
              <Users className="w-5 h-5 text-[#2C6975]" />
              <span>Your Team</span>
            </h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#2C6975] to-[#7EB5C1] flex items-center justify-center text-white">
                  SJ
                </div>
                <div>
                  <p className="text-sm text-gray-900">Sarah Johnson</p>
                  <p className="text-xs text-gray-500">Lead Coach</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#F9A03F] to-[#7EB5C1] flex items-center justify-center text-white">
                  MT
                </div>
                <div>
                  <p className="text-sm text-gray-900">Mike Torres</p>
                  <p className="text-xs text-gray-500">Technical Mentor</p>
                </div>
              </div>
              <button className="w-full mt-2 text-sm text-[#2C6975] hover:underline text-center py-2">
                View Full Cohort →
              </button>
            </div>
          </div>

          {/* Resources */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h3 className="text-gray-900 mb-4">Learning Resources</h3>
            <div className="space-y-2">
              {resources.map((resource, idx) => (
                <a
                  key={idx}
                  href={resource.link}
                  className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <span className="text-xl">{resource.icon}</span>
                  <span className="text-sm text-gray-700">{resource.name}</span>
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Program History */}
      <Collapsible open={isProgramHistoryOpen} onOpenChange={setIsProgramHistoryOpen} className="mt-8">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200">
          <CollapsibleTrigger className="w-full p-4 flex items-center justify-between hover:bg-gray-50 rounded-t-xl transition-colors">
            <h3 className="text-gray-900 flex items-center space-x-2">
              <History className="w-5 h-5 text-[#2C6975]" />
              <span>Program History</span>
            </h3>
            <div className="flex items-center space-x-2">
              <span className="text-xs text-gray-600">{programHistory.length} programs</span>
              <svg 
                className={`w-5 h-5 text-gray-500 transition-transform ${isProgramHistoryOpen ? 'rotate-180' : ''}`} 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </CollapsibleTrigger>
          <CollapsibleContent>
            <div className="p-4 pt-0">
              <div className="space-y-4">
                {programHistory.map((program) => (
                  <div 
                    key={program.id} 
                    className={`p-4 rounded-lg border-2 ${
                      program.status === 'current' 
                        ? 'border-[#2C6975] bg-[#2C6975]/5' 
                        : 'border-gray-200 bg-gray-50'
                    }`}
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-2">
                          <h4 className="text-gray-900">{program.name}</h4>
                          {program.status === 'current' && (
                            <span className="px-2 py-1 rounded-full bg-[#2C6975] text-white text-xs">
                              Current
                            </span>
                          )}
                          {program.status === 'completed' && (
                            <CheckCircle className="w-5 h-5 text-[#3B6A52]" />
                          )}
                        </div>
                        <div className="flex flex-wrap items-center gap-3 text-sm text-gray-600 mb-3">
                          <span className="flex items-center space-x-1">
                            <Calendar className="w-4 h-4" />
                            <span>{program.startDate} - {program.endDate}</span>
                          </span>
                          <span>•</span>
                          <span>{program.cohort}</span>
                          <span>•</span>
                          <span className="flex items-center space-x-1">
                            <UserCircle className="w-4 h-4" />
                            <span>Coach: {program.coach}</span>
                          </span>
                        </div>

                        {/* Progress Bar */}
                        <div className="mb-3">
                          <div className="flex items-center justify-between mb-1">
                            <span className="text-xs text-gray-600">Progress</span>
                            <span className="text-xs text-gray-900">{program.progress}%</span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div 
                              className={`h-2 rounded-full ${
                                program.status === 'completed' ? 'bg-[#3B6A52]' : 'bg-[#2C6975]'
                              }`}
                              style={{ width: `${program.progress}%` }}
                            ></div>
                          </div>
                        </div>

                        {/* Certifications */}
                        <div className="mb-3">
                          <p className="text-xs text-gray-600 mb-1">Certifications:</p>
                          <div className="flex flex-wrap gap-1">
                            {program.certifications.map((cert, idx) => (
                              <span 
                                key={idx} 
                                className="px-2 py-1 rounded-full bg-white border border-gray-300 text-xs text-gray-700"
                              >
                                {cert}
                              </span>
                            ))}
                          </div>
                        </div>

                        {/* Completed Program Details */}
                        {program.status === 'completed' && (
                          <div className="grid grid-cols-3 gap-4 mt-3 pt-3 border-t border-gray-300">
                            <div>
                              <p className="text-xs text-gray-600 mb-1">Completed</p>
                              <p className="text-sm text-gray-900">{program.completionDate}</p>
                            </div>
                            <div>
                              <p className="text-xs text-gray-600 mb-1">Final Score</p>
                              <p className="text-sm text-gray-900">{program.finalScore}%</p>
                            </div>
                            <div>
                              <p className="text-xs text-gray-600 mb-1">Badges Earned</p>
                              <p className="text-sm text-gray-900">{program.badges} badges</p>
                            </div>
                            {program.capstoneProject && (
                              <div className="col-span-3">
                                <p className="text-xs text-gray-600 mb-1">Capstone Project</p>
                                <p className="text-sm text-gray-900">{program.capstoneProject}</p>
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Actions */}
                    {program.status === 'completed' && (
                      <div className="flex items-center space-x-2 mt-3">
                        <button className="text-xs text-[#2C6975] hover:underline flex items-center space-x-1">
                          <FileText className="w-3 h-3" />
                          <span>View Certificate</span>
                        </button>
                        <span className="text-gray-400">•</span>
                        <button className="text-xs text-[#2C6975] hover:underline flex items-center space-x-1">
                          <History className="w-3 h-3" />
                          <span>View Full Details</span>
                        </button>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </CollapsibleContent>
        </div>
      </Collapsible>

      {/* Floating Penny Assistant */}
      {!isPennyChatOpen && (
        <button
          onClick={() => setIsPennyChatOpen(true)}
          className="fixed bottom-6 right-6 w-16 h-16 bg-gradient-to-br from-[#2C6975] to-[#F9A03F] text-white rounded-full shadow-2xl hover:shadow-3xl transition-all hover:scale-110 flex items-center justify-center group z-40"
          aria-label="Open Penny AI Assistant"
        >
          <Sparkles className="w-7 h-7" />
          <span className="absolute -top-2 -right-2 w-5 h-5 bg-[#F9A03F] rounded-full border-2 border-white flex items-center justify-center">
            <span className="text-xs">?</span>
          </span>
        </button>
      )}

      {/* Penny Chat Interface */}
      <PennyChat isOpen={isPennyChatOpen} onClose={() => setIsPennyChatOpen(false)} />
    </div>
  );
}
