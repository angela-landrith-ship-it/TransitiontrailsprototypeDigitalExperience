import { Book, Play, Clock, Award, ChevronRight, CheckCircle, ExternalLink, Search, TrendingUp, Target, Sparkles, Star, Zap, Lightbulb, BookOpen, Link, Trophy, Calendar, Shield } from 'lucide-react';
import { PageType } from '../App';
import { useState } from 'react';
import { ProgressRing } from './ProgressRing';

interface LearningCenterProps {
  onNavigate: (page: PageType) => void;
}

export function LearningCenter({ onNavigate }: LearningCenterProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState<'assigned' | 'catalog' | 'pathways'>('assigned');
  const [showPennyRecommendations, setShowPennyRecommendations] = useState(true);
  const [isTrailheadLinked, setIsTrailheadLinked] = useState(true); // User has linked their Trailhead account
  const [isTrailheadExpanded, setIsTrailheadExpanded] = useState(true);
  const [showPennyBadgeRecs, setShowPennyBadgeRecs] = useState(true);
  const [showAllPennyRecs, setShowAllPennyRecs] = useState(false);

  const assignedCourses = [
    {
      id: 1,
      title: 'Salesforce Administrator Fundamentals',
      provider: 'pluralsight',
      instructor: 'Don Robins',
      duration: '4h 32m',
      modules: 12,
      progress: 75,
      status: 'in-progress',
      level: 'Beginner',
      points: 250,
      earnedPoints: 188,
      dueDate: 'Mar 10, 2025',
      description: 'Master the fundamentals of Salesforce administration including user management, security, and data management.',
      skills: ['User Management', 'Security', 'Data Management'],
      isAssigned: true,
    },
    {
      id: 2,
      title: 'Salesforce Automation & Process Builder',
      provider: 'pluralsight',
      instructor: 'Tim Hynes',
      duration: '3h 15m',
      modules: 9,
      progress: 45,
      status: 'in-progress',
      level: 'Intermediate',
      points: 300,
      earnedPoints: 135,
      dueDate: 'Mar 17, 2025',
      description: 'Learn to automate business processes using Flow Builder, Process Builder, and Workflow Rules.',
      skills: ['Process Builder', 'Flow', 'Automation'],
      isAssigned: true,
    },
    {
      id: 3,
      title: 'Salesforce Reports and Dashboards',
      provider: 'pluralsight',
      instructor: 'Emma Garcia',
      duration: '2h 45m',
      modules: 8,
      progress: 0,
      status: 'not-started',
      level: 'Beginner',
      points: 200,
      earnedPoints: 0,
      dueDate: 'Mar 24, 2025',
      description: 'Create powerful reports and dashboards to visualize and analyze your Salesforce data.',
      skills: ['Reporting', 'Dashboards', 'Analytics'],
      isAssigned: true,
    },
    {
      id: 4,
      title: 'Advanced Apex Programming',
      provider: 'pluralsight',
      instructor: 'Sarah Mitchell',
      duration: '5h 20m',
      modules: 15,
      progress: 100,
      status: 'completed',
      level: 'Advanced',
      points: 400,
      earnedPoints: 400,
      dueDate: 'Completed',
      description: 'Deep dive into advanced Apex concepts including triggers, batch processing, and asynchronous programming.',
      skills: ['Apex', 'Triggers', 'Async Processing'],
      isAssigned: true,
    },
    {
      id: 5,
      title: 'Salesforce Lightning Experience Essentials',
      provider: 'viva',
      instructor: 'Microsoft Learn',
      duration: '2h 10m',
      modules: 6,
      progress: 60,
      status: 'in-progress',
      level: 'Beginner',
      points: 150,
      earnedPoints: 90,
      dueDate: 'Mar 12, 2025',
      description: 'Get up to speed with Salesforce Lightning Experience interface and features.',
      skills: ['Lightning', 'UI Navigation', 'Productivity'],
      isAssigned: true,
    },
    {
      id: 6,
      title: 'Data Modeling in Salesforce',
      provider: 'viva',
      instructor: 'Salesforce Trailhead',
      duration: '3h 00m',
      modules: 10,
      progress: 90,
      status: 'in-progress',
      level: 'Intermediate',
      points: 250,
      earnedPoints: 225,
      dueDate: 'Mar 15, 2025',
      description: 'Learn to design and implement effective data models using objects, fields, and relationships.',
      skills: ['Data Modeling', 'Objects', 'Relationships'],
      isAssigned: true,
    },
    {
      id: 7,
      title: 'Customer Service in Salesforce',
      provider: 'viva',
      instructor: 'LinkedIn Learning',
      duration: '1h 45m',
      modules: 5,
      progress: 0,
      status: 'not-started',
      level: 'Beginner',
      points: 175,
      earnedPoints: 0,
      dueDate: 'Mar 31, 2025',
      description: 'Explore Service Cloud features for managing customer cases and support operations.',
      skills: ['Service Cloud', 'Cases', 'Customer Support'],
      isAssigned: true,
    },
  ];

  const catalogCourses = [
    {
      id: 101,
      title: 'Lightning Web Components Fundamentals',
      provider: 'pluralsight',
      instructor: 'Kevin Poorman',
      duration: '4h 15m',
      modules: 11,
      progress: 0,
      status: 'not-started',
      level: 'Intermediate',
      points: 350,
      earnedPoints: 0,
      dueDate: 'Optional',
      description: 'Build modern, performant components using Lightning Web Components framework.',
      skills: ['LWC', 'JavaScript', 'Web Components'],
      isAssigned: false,
      recommendedBy: 'penny',
    },
    {
      id: 102,
      title: 'Salesforce Integration Patterns',
      provider: 'pluralsight',
      instructor: 'Marcus Torres',
      duration: '5h 00m',
      modules: 14,
      progress: 0,
      status: 'not-started',
      level: 'Advanced',
      points: 450,
      earnedPoints: 0,
      dueDate: 'Optional',
      description: 'Learn REST APIs, SOAP, and integration best practices for connecting Salesforce with external systems.',
      skills: ['REST API', 'SOAP', 'Integration', 'Middleware'],
      isAssigned: false,
      recommendedBy: 'penny',
    },
    {
      id: 103,
      title: 'Sales Cloud Implementation',
      provider: 'viva',
      instructor: 'Salesforce Trailhead',
      duration: '3h 30m',
      modules: 9,
      progress: 0,
      status: 'not-started',
      level: 'Intermediate',
      points: 275,
      earnedPoints: 0,
      dueDate: 'Optional',
      description: 'Configure and customize Sales Cloud for optimal sales team productivity.',
      skills: ['Sales Cloud', 'Opportunity Management', 'Lead Management'],
      isAssigned: false,
    },
    {
      id: 104,
      title: 'Salesforce Security & Sharing',
      provider: 'pluralsight',
      instructor: 'Rachel Kim',
      duration: '3h 45m',
      modules: 10,
      progress: 0,
      status: 'not-started',
      level: 'Intermediate',
      points: 300,
      earnedPoints: 0,
      dueDate: 'Optional',
      description: 'Master org-wide defaults, profiles, permission sets, and sharing rules.',
      skills: ['Security', 'Sharing Rules', 'Permissions', 'Profiles'],
      isAssigned: false,
      recommendedBy: 'penny',
    },
    {
      id: 105,
      title: 'Einstein Analytics for Admins',
      provider: 'viva',
      instructor: 'LinkedIn Learning',
      duration: '2h 30m',
      modules: 7,
      progress: 0,
      status: 'not-started',
      level: 'Advanced',
      points: 325,
      earnedPoints: 0,
      dueDate: 'Optional',
      description: 'Build interactive dashboards and leverage AI-powered analytics.',
      skills: ['Einstein Analytics', 'Dashboards', 'AI', 'Data Visualization'],
      isAssigned: false,
    },
    {
      id: 106,
      title: 'Marketing Cloud Basics',
      provider: 'pluralsight',
      instructor: 'Jennifer Wu',
      duration: '4h 00m',
      modules: 12,
      progress: 0,
      status: 'not-started',
      level: 'Beginner',
      points: 275,
      earnedPoints: 0,
      dueDate: 'Optional',
      description: 'Introduction to Marketing Cloud email studio, journey builder, and automation.',
      skills: ['Marketing Cloud', 'Email Marketing', 'Journey Builder'],
      isAssigned: false,
    },
    {
      id: 107,
      title: 'Salesforce Mobile App Customization',
      provider: 'viva',
      instructor: 'Salesforce Trailhead',
      duration: '2h 15m',
      modules: 6,
      progress: 0,
      status: 'not-started',
      level: 'Intermediate',
      points: 200,
      earnedPoints: 0,
      dueDate: 'Optional',
      description: 'Customize the Salesforce mobile app for on-the-go productivity.',
      skills: ['Mobile', 'Mobile App', 'Customization'],
      isAssigned: false,
    },
    {
      id: 108,
      title: 'Salesforce CPQ Essentials',
      provider: 'pluralsight',
      instructor: 'David Chen',
      duration: '3h 20m',
      modules: 8,
      progress: 0,
      status: 'not-started',
      level: 'Advanced',
      points: 350,
      earnedPoints: 0,
      dueDate: 'Optional',
      description: 'Configure pricing, quoting, and product catalog management with CPQ.',
      skills: ['CPQ', 'Pricing', 'Quote Management', 'Product Catalog'],
      isAssigned: false,
    },
    {
      id: 109,
      title: 'Experience Cloud Site Building',
      provider: 'viva',
      instructor: 'Microsoft Learn',
      duration: '3h 00m',
      modules: 9,
      progress: 0,
      status: 'not-started',
      level: 'Intermediate',
      points: 300,
      earnedPoints: 0,
      dueDate: 'Optional',
      description: 'Build and customize community portals using Experience Cloud.',
      skills: ['Experience Cloud', 'Communities', 'Portal Development'],
      isAssigned: false,
    },
    {
      id: 110,
      title: 'Salesforce DevOps Fundamentals',
      provider: 'pluralsight',
      instructor: 'Alex Rivera',
      duration: '4h 30m',
      modules: 13,
      progress: 0,
      status: 'not-started',
      level: 'Advanced',
      points: 400,
      earnedPoints: 0,
      dueDate: 'Optional',
      description: 'Learn version control, CI/CD pipelines, and deployment strategies for Salesforce.',
      skills: ['DevOps', 'Git', 'CI/CD', 'Deployment'],
      isAssigned: false,
    },
  ];

  const pennyRecommendations = catalogCourses.filter(c => c.recommendedBy === 'penny').slice(0, 3);

  // Self-paced learning trails
  const learningTrails = [
    {
      id: 1,
      title: 'Salesforce Admin Essentials',
      description: 'Master the fundamentals of Salesforce administration',
      progress: 75,
      modules: 12,
      completed: 9,
      estimatedTime: '8 hours',
      status: 'in-progress',
      color: '#2C6975',
      badges: ['Admin Basics', 'User Management'],
      topics: [
        { name: 'Introduction to Salesforce', status: 'completed' },
        { name: 'User Setup and Security', status: 'completed' },
        { name: 'Data Management', status: 'completed' },
        { name: 'Reports and Dashboards', status: 'in-progress' },
        { name: 'Process Automation', status: 'locked' },
      ]
    },
    {
      id: 2,
      title: 'Data Modeling Fundamentals',
      description: 'Learn to design effective data models in Salesforce',
      progress: 45,
      modules: 8,
      completed: 4,
      estimatedTime: '6 hours',
      status: 'in-progress',
      color: '#7EB5C1',
      badges: ['Data Architect'],
      topics: [
        { name: 'Understanding Objects and Fields', status: 'completed' },
        { name: 'Relationships and Lookups', status: 'completed' },
        { name: 'Schema Builder', status: 'in-progress' },
        { name: 'Data Import/Export', status: 'locked' },
      ]
    },
    {
      id: 3,
      title: 'Process Automation Basics',
      description: 'Automate business processes with Flow Builder',
      progress: 90,
      modules: 10,
      completed: 9,
      estimatedTime: '10 hours',
      status: 'in-progress',
      color: '#3B6A52',
      badges: ['Flow Builder', 'Automation Expert'],
      topics: [
        { name: 'Introduction to Automation', status: 'completed' },
        { name: 'Workflow Rules', status: 'completed' },
        { name: 'Process Builder', status: 'completed' },
        { name: 'Flow Builder Basics', status: 'completed' },
        { name: 'Advanced Flow Patterns', status: 'in-progress' },
      ]
    },
  ];

  const currentCourses = activeTab === 'pathways' ? [] : (activeTab === 'assigned' ? assignedCourses : catalogCourses);

  const filteredCourses = currentCourses.filter(course => {
    const matchesSearch = course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          course.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          course.skills.some(skill => skill.toLowerCase().includes(searchQuery.toLowerCase())) ||
                          course.instructor.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesSearch;
  });

  const allCourses = [...assignedCourses, ...catalogCourses];
  const stats = {
    totalCourses: assignedCourses.length,
    catalogCourses: catalogCourses.length,
    completed: assignedCourses.filter(c => c.status === 'completed').length,
    inProgress: assignedCourses.filter(c => c.status === 'in-progress').length,
    totalPoints: assignedCourses.reduce((acc, c) => acc + c.points, 0),
    earnedPoints: assignedCourses.reduce((acc, c) => acc + c.earnedPoints, 0),
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'in-progress':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'not-started':
        return 'bg-gray-100 text-gray-800 border-gray-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getProviderBadge = (provider: string) => {
    return provider === 'pluralsight' 
      ? 'bg-[#2C6975] text-white' 
      : 'bg-[#7EB5C1] text-white';
  };

  // Trailhead Data from TrailTracker sync package
  const trailheadData = {
    totalBadges: 47,
    totalPoints: 38250,
    rank: 'Ranger',
    rangerLevel: 3,
    trailblazerScore: 12450,
    lastSyncDate: 'Mar 7, 2025 2:15pm',
    profileUrl: 'https://trailblazer.me/id/alexjohnson'
  };

  const trailheadBadges = [
    {
      id: 'badge-001',
      name: 'Admin Beginner',
      imageUrl: 'https://res.cloudinary.com/hy4kyit2a/f_auto,fl_lossy,q_70/learn/modules/starting_force_com/0f822c7ca6c471f96f96c91e5a01bd98_badge.png',
      status: 'Completed',
      dateCompleted: 'Feb 15, 2025',
      points: 100,
      type: 'module',
      description: 'Learn the basics of Salesforce administration',
      linkedIssue: null
    },
    {
      id: 'badge-002',
      name: 'Data Modeling',
      imageUrl: 'https://res.cloudinary.com/hy4kyit2a/f_auto,fl_lossy,q_70/learn/modules/data_modeling/b87e74228827c92d954cb746cc1b6268_badge.png',
      status: 'Completed',
      dateCompleted: 'Feb 20, 2025',
      points: 200,
      type: 'module',
      description: 'Master object relationships and schema design',
      linkedIssue: null
    },
    {
      id: 'badge-003',
      name: 'Process Automation',
      imageUrl: 'https://res.cloudinary.com/hy4kyit2a/f_auto,fl_lossy,q_70/learn/modules/business_process_automation/9ab9c4ed2e0b1e1462d0a1c57cdbe0ba_badge.png',
      status: 'In Progress',
      dateCompleted: null,
      points: 250,
      progress: 65,
      type: 'module',
      description: 'Automate business processes with Flow Builder',
      linkedIssue: 'TT-126'
    },
    {
      id: 'badge-004',
      name: 'Lightning Experience',
      imageUrl: 'https://res.cloudinary.com/hy4kyit2a/f_auto,fl_lossy,q_70/learn/modules/lex_customization/98c4e04d8dcc4b42a80c7584c4e1d47b_badge.png',
      status: 'In Progress',
      dateCompleted: null,
      points: 150,
      progress: 40,
      type: 'module',
      description: 'Customize Lightning Experience for your users',
      linkedIssue: null
    },
    {
      id: 'badge-005',
      name: 'Reports & Dashboards',
      imageUrl: 'https://res.cloudinary.com/hy4kyit2a/f_auto,fl_lossy,q_70/learn/modules/reports_dashboards/4a202c4b7dc69cfc9f9e08e3bc8b21c1_badge.png',
      status: 'Not Started',
      dateCompleted: null,
      points: 200,
      type: 'module',
      description: 'Build powerful reports and dashboards',
      linkedIssue: null
    },
    {
      id: 'badge-006',
      name: 'Security Basics',
      imageUrl: 'https://res.cloudinary.com/hy4kyit2a/f_auto,fl_lossy,q_70/learn/modules/data_security/36822f670589ba6e55e7e411b5923635_badge.png',
      status: 'Not Started',
      dateCompleted: null,
      points: 150,
      type: 'module',
      description: 'Learn Salesforce security best practices',
      linkedIssue: null
    }
  ];

  const trailheadCertifications = [
    {
      id: 'cert-001',
      name: 'Salesforce Certified Administrator',
      status: 'In Progress',
      imageUrl: 'https://drm--c.na114.content.force.com/servlet/servlet.ImageServer?id=0153k00000A5cUU&oid=00DF0000000gZsu&lastMod=1597353974000',
      issueDate: null,
      expiryDate: null,
      examDate: 'Apr 15, 2025',
      studyProgress: 72,
      requiredBadges: 12,
      completedBadges: 9
    },
    {
      id: 'cert-002',
      name: 'Salesforce Certified Platform App Builder',
      status: 'Not Started',
      imageUrl: 'https://drm--c.na114.content.force.com/servlet/servlet.ImageServer?id=0153k00000A5cUZ&oid=00DF0000000gZsu&lastMod=1597354001000',
      issueDate: null,
      expiryDate: null,
      examDate: null,
      studyProgress: 0,
      requiredBadges: 15,
      completedBadges: 2
    }
  ];

  // Penny AI Badge Recommendations - Context-aware based on capstone project
  const pennyBadgeRecommendations = [
    {
      id: 'rec-001',
      badgeName: 'Apex Testing',
      imageUrl: 'https://res.cloudinary.com/hy4kyit2a/f_auto,fl_lossy,q_70/learn/modules/apex_testing/15d4d9c5c617baf2ea6cda103cdaf304_badge.png',
      reason: 'Your capstone project needs 85% test coverage. This badge will teach you how to write effective Apex test classes.',
      priority: 'high',
      estimatedTime: '2h 30m',
      points: 250,
      linkedTask: 'TT-125: Write Apex test classes',
      phaseRelevance: 'Quality Assurance Testing (Week 10)',
      skills: ['Unit Testing', 'Test Coverage', 'Assertions'],
      completionImpact: 'Directly helps you meet deployment requirements'
    },
    {
      id: 'rec-002',
      badgeName: 'User Acceptance Testing',
      imageUrl: 'https://res.cloudinary.com/hy4kyit2a/f_auto,fl_lossy,q_70/learn/modules/uat-trailhead/7bc5d8b2c4e3a1f96f96c91e5a01bd98_badge.png',
      reason: 'You have 3 UAT sessions scheduled. Learn best practices for conducting effective UAT with your nonprofit partner.',
      priority: 'high',
      estimatedTime: '1h 45m',
      points: 150,
      linkedTask: 'UAT Sessions Preparation',
      phaseRelevance: 'UAT & Documentation (Week 11)',
      skills: ['UAT Planning', 'Test Scripts', 'Stakeholder Communication'],
      completionImpact: 'Ensures productive UAT sessions with Maria Chen'
    },
    {
      id: 'rec-003',
      badgeName: 'Data Security & Privacy',
      imageUrl: 'https://res.cloudinary.com/hy4kyit2a/f_auto,fl_lossy,q_70/learn/modules/data_security/36822f670589ba6e55e7e411b5923635_badge.png',
      reason: 'Your volunteer management system handles sensitive donor and volunteer data. Master security best practices.',
      priority: 'medium',
      estimatedTime: '2h 15m',
      points: 200,
      linkedTask: 'TT-124: Volunteer onboarding flow',
      phaseRelevance: 'Data Architecture & Security (Week 3-4)',
      skills: ['Security', 'Sharing Rules', 'Field-Level Security'],
      completionImpact: 'Critical for protecting volunteer PII data'
    },
    {
      id: 'rec-004',
      badgeName: 'Debugging Strategies',
      imageUrl: 'https://res.cloudinary.com/hy4kyit2a/f_auto,fl_lossy,q_70/learn/modules/apex_debugging/2f8a4c5d8e3b1a2c96f96c91e5a01bd98_badge.png',
      reason: 'You have a high-severity bug (BUG-001) blocking your batch job. Learn advanced debugging techniques.',
      priority: 'high',
      estimatedTime: '1h 30m',
      points: 150,
      linkedTask: 'BUG-001: Batch job null pointer exception',
      phaseRelevance: 'Automation & Business Logic (Current)',
      skills: ['Debugging', 'Exception Handling', 'Logs'],
      completionImpact: 'Helps you resolve blocking bugs faster'
    }
  ];

  const getBadgeStatusColor = (status: string) => {
    switch (status) {
      case 'Completed': return 'bg-[#3B6A52] text-white';
      case 'In Progress': return 'bg-[#F9A03F] text-white';
      case 'Not Started': return 'bg-gray-300 text-gray-700';
      default: return 'bg-gray-300 text-gray-700';
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-gray-900 mb-2">Learning Center</h1>
            <p className="text-gray-600">Access your Pluralsight IQ and Viva Learning courses</p>
          </div>
          <button
            onClick={() => onNavigate('learner')}
            className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
          >
            Back to Home
          </button>
        </div>

        {/* Penny AI Recommendations */}
        {showPennyRecommendations && activeTab === 'catalog' && (
          <div className="bg-gradient-to-r from-[#2C6975] to-[#7EB5C1] rounded-xl p-6 mb-6 text-white relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -mr-32 -mt-32"></div>
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/5 rounded-full -ml-24 -mb-24"></div>
            
            <button
              onClick={() => setShowPennyRecommendations(false)}
              className="absolute top-4 right-4 text-white/80 hover:text-white transition-colors"
            >
              ✕
            </button>

            <div className="relative">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center">
                  <Sparkles className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-white">Penny's Recommendations</h3>
                  <p className="text-sm text-white/80">Based on your progress and interests</p>
                </div>
              </div>

              <p className="text-white/90 mb-4 text-sm">
                Hi Jordan! Based on your strong performance in Automation & Process Builder (75% complete) and your completed Advanced Apex course, I think you'd excel in these courses:
              </p>

              <div className="grid md:grid-cols-3 gap-4">
                {pennyRecommendations.map((course) => (
                  <div key={course.id} className="bg-white/10 backdrop-blur-sm rounded-lg p-4 hover:bg-white/15 transition-colors cursor-pointer border border-white/20">
                    <div className="flex items-center space-x-2 mb-2">
                      <Star className="w-4 h-4 text-[#F9A03F]" />
                      <span className="text-xs text-white/80">{course.level}</span>
                    </div>
                    <h4 className="text-white text-sm mb-2">{course.title}</h4>
                    <p className="text-xs text-white/70 mb-3 line-clamp-2">{course.description}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-white/80">{course.duration}</span>
                      <span className="text-xs text-[#F9A03F]">{course.points} pts</span>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-4 pt-4 border-t border-white/20 flex items-center justify-between">
                <p className="text-sm text-white/80">Want personalized course recommendations?</p>
                <button className="px-4 py-2 bg-white/20 hover:bg-white/30 rounded-lg transition-colors text-sm backdrop-blur-sm">
                  Chat with Penny
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-6 gap-4 mb-6">
          <div className="bg-white rounded-xl border border-gray-200 p-4">
            <div className="flex items-center space-x-2 mb-2">
              <Book className="w-5 h-5 text-[#2C6975]" />
              <span className="text-sm text-gray-600">Assigned</span>
            </div>
            <p className="text-2xl text-gray-900">{stats.totalCourses}</p>
          </div>
          <div className="bg-white rounded-xl border border-gray-200 p-4">
            <div className="flex items-center space-x-2 mb-2">
              <Lightbulb className="w-5 h-5 text-[#F9A03F]" />
              <span className="text-sm text-gray-600">Catalog</span>
            </div>
            <p className="text-2xl text-gray-900">{stats.catalogCourses}</p>
          </div>
          <div className="bg-white rounded-xl border border-gray-200 p-4">
            <div className="flex items-center space-x-2 mb-2">
              <CheckCircle className="w-5 h-5 text-green-600" />
              <span className="text-sm text-gray-600">Completed</span>
            </div>
            <p className="text-2xl text-gray-900">{stats.completed}</p>
          </div>
          <div className="bg-white rounded-xl border border-gray-200 p-4">
            <div className="flex items-center space-x-2 mb-2">
              <TrendingUp className="w-5 h-5 text-blue-600" />
              <span className="text-sm text-gray-600">In Progress</span>
            </div>
            <p className="text-2xl text-gray-900">{stats.inProgress}</p>
          </div>
          <div className="bg-white rounded-xl border border-gray-200 p-4">
            <div className="flex items-center space-x-2 mb-2">
              <Award className="w-5 h-5 text-[#F9A03F]" />
              <span className="text-sm text-gray-600">Earned</span>
            </div>
            <p className="text-2xl text-gray-900">{stats.earnedPoints}</p>
          </div>
          <div className="bg-white rounded-xl border border-gray-200 p-4">
            <div className="flex items-center space-x-2 mb-2">
              <Target className="w-5 h-5 text-gray-600" />
              <span className="text-sm text-gray-600">Total Pts</span>
            </div>
            <p className="text-2xl text-gray-900">{stats.totalPoints}</p>
          </div>
        </div>

        {/* Trailhead Achievement Section */}
        {isTrailheadLinked ? (
          <div className="bg-gradient-to-br from-[#F5F3E8] via-white to-[#F5F3E8] rounded-2xl border-2 border-[#3B6A52]/30 p-6 mb-8 shadow-lg">
            <div className="flex items-start justify-between">
              <div className="flex items-center space-x-4 flex-1">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#2C6975] to-[#7EB5C1] flex items-center justify-center shadow-lg flex-shrink-0">
                  <Trophy className="w-8 h-8 text-white" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-1">
                    <h2 className="text-gray-900">Your Trailhead Achievements</h2>
                    {!isTrailheadExpanded && (
                      <div className="flex items-center space-x-3 text-sm">
                        <span className="px-3 py-1 bg-white rounded-full border border-[#3B6A52]/30 text-gray-700">
                          {trailheadData.totalBadges} Badges
                        </span>
                        <span className="px-3 py-1 bg-white rounded-full border border-[#3B6A52]/30 text-gray-700">
                          {trailheadData.totalPoints.toLocaleString()} Points
                        </span>
                        <span className="px-3 py-1 bg-white rounded-full border border-[#3B6A52]/30 text-gray-700">
                          {trailheadData.rank}
                        </span>
                        {pennyBadgeRecommendations.filter(r => r.priority === 'high').length > 0 && (
                          <button 
                            onClick={(e) => {
                              e.stopPropagation();
                              setIsTrailheadExpanded(true);
                              setShowPennyBadgeRecs(true);
                            }}
                            className="px-3 py-1 bg-[#F9A03F]/10 rounded-full border border-[#F9A03F]/30 text-[#F9A03F] flex items-center space-x-1 hover:bg-[#F9A03F]/20 transition-colors cursor-pointer"
                          >
                            <Sparkles className="w-3 h-3" />
                            <span>{pennyBadgeRecommendations.filter(r => r.priority === 'high').length} Penny Recommendation{pennyBadgeRecommendations.filter(r => r.priority === 'high').length !== 1 ? 's' : ''}</span>
                          </button>
                        )}
                      </div>
                    )}
                  </div>
                  <p className="text-sm text-gray-600">Auto-syncs nightly via TrailTracker • Last sync: {trailheadData.lastSyncDate}</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                {isTrailheadExpanded && (
                  <a
                    href={trailheadData.profileUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center space-x-2 px-4 py-2 border-2 border-[#2C6975] text-[#2C6975] rounded-lg hover:bg-[#2C6975] hover:text-white transition-colors"
                  >
                    <ExternalLink className="w-4 h-4" />
                    <span>View Profile</span>
                  </a>
                )}
                <button
                  onClick={() => setIsTrailheadExpanded(!isTrailheadExpanded)}
                  className="p-2 hover:bg-white/50 rounded-lg transition-colors"
                  aria-label={isTrailheadExpanded ? 'Collapse section' : 'Expand section'}
                >
                  <ChevronRight className={`w-5 h-5 text-gray-600 transition-transform ${isTrailheadExpanded ? 'rotate-90' : ''}`} />
                </button>
              </div>
            </div>

            {isTrailheadExpanded && <div className="h-6"></div>}

            {isTrailheadExpanded && (
              <>
                {/* Penny AI Badge Recommendations - Collapsed State */}
                {!showPennyBadgeRecs && pennyBadgeRecommendations.filter(r => r.priority === 'high').length > 0 && (
                  <div className="mb-6">
                    <button
                      onClick={() => setShowPennyBadgeRecs(true)}
                      className="w-full bg-gradient-to-r from-[#2C6975]/10 to-[#7EB5C1]/10 border-2 border-[#2C6975]/30 rounded-xl p-4 hover:from-[#2C6975]/15 hover:to-[#7EB5C1]/15 transition-all group"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#2C6975] to-[#7EB5C1] flex items-center justify-center">
                            <Sparkles className="w-5 h-5 text-white" />
                          </div>
                          <div className="text-left">
                            <h4 className="text-gray-900 flex items-center space-x-2">
                              <span>Penny's Badge Recommendations</span>
                              <span className="px-2 py-0.5 bg-[#F9A03F] text-white rounded-full text-xs">
                                {pennyBadgeRecommendations.filter(r => r.priority === 'high').length} High Priority
                              </span>
                            </h4>
                            <p className="text-sm text-gray-600">Click to view personalized badge suggestions for your capstone project</p>
                          </div>
                        </div>
                        <ChevronRight className="w-5 h-5 text-[#2C6975] group-hover:translate-x-1 transition-transform" />
                      </div>
                    </button>
                  </div>
                )}

                {/* Penny AI Badge Recommendations - Expanded State */}
                {showPennyBadgeRecs && (
                  <div className="bg-gradient-to-r from-[#2C6975] to-[#7EB5C1] rounded-xl p-6 mb-6 text-white relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-48 h-48 bg-white/5 rounded-full -mr-24 -mt-24"></div>
                    <div className="absolute bottom-0 left-0 w-32 h-32 bg-white/5 rounded-full -ml-16 -mb-16"></div>
                    
                    <button
                      onClick={() => setShowPennyBadgeRecs(false)}
                      className="absolute top-4 right-4 text-white/80 hover:text-white transition-colors group/close"
                      title="Minimize recommendations (you can view them again anytime)"
                    >
                      <div className="relative">
                        <span className="text-lg">✕</span>
                        <span className="absolute -bottom-6 right-0 text-xs text-white/60 whitespace-nowrap opacity-0 group-hover/close:opacity-100 transition-opacity">
                          Minimize
                        </span>
                      </div>
                    </button>

                    <div className="relative">
                      <div className="flex items-center space-x-3 mb-4">
                        <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center">
                          <Sparkles className="w-6 h-6" />
                        </div>
                        <div>
                          <h3 className="text-white">Penny's Badge Recommendations</h3>
                          <p className="text-sm text-white/80">Badges to help you succeed in your capstone project</p>
                        </div>
                      </div>

                      <div className="grid md:grid-cols-2 gap-4">
                        {pennyBadgeRecommendations.filter(rec => rec.priority === 'high').map((rec) => (
                          <div key={rec.id} className="bg-white/10 backdrop-blur-sm rounded-lg p-4 hover:bg-white/15 transition-colors border border-white/20">
                            <div className="flex items-start space-x-3 mb-3">
                              <img
                                src={rec.imageUrl}
                                alt={rec.badgeName}
                                className="w-12 h-12 object-contain flex-shrink-0"
                              />
                              <div className="flex-1">
                                <div className="flex items-center space-x-2 mb-1">
                                  <h4 className="text-white">{rec.badgeName}</h4>
                                  {rec.priority === 'high' && (
                                    <span className="px-2 py-0.5 bg-red-500/30 text-white rounded-full text-xs">
                                      High Priority
                                    </span>
                                  )}
                                </div>
                                <p className="text-sm text-white/80 mb-2">{rec.reason}</p>
                                <div className="flex flex-wrap gap-2 text-xs text-white/70 mb-2">
                                  <span className="flex items-center space-x-1">
                                    <Clock className="w-3 h-3" />
                                    <span>{rec.estimatedTime}</span>
                                  </span>
                                  <span className="flex items-center space-x-1">
                                    <Star className="w-3 h-3" />
                                    <span>{rec.points} pts</span>
                                  </span>
                                </div>
                                {rec.linkedTask && (
                                  <div className="flex items-center space-x-1 text-xs bg-white/20 rounded px-2 py-1 inline-flex mb-2">
                                    <Target className="w-3 h-3" />
                                    <span>{rec.linkedTask}</span>
                                  </div>
                                )}
                                <p className="text-xs text-white/60 italic">{rec.completionImpact}</p>
                              </div>
                            </div>
                            <button className="w-full px-4 py-2 bg-white/20 hover:bg-white/30 rounded-lg transition-colors text-sm backdrop-blur-sm flex items-center justify-center space-x-2">
                              <Play className="w-4 h-4" />
                              <span>Start Badge</span>
                            </button>
                          </div>
                        ))}
                      </div>

                      <div className="mt-4 pt-4 border-t border-white/20">
                        <button 
                          onClick={() => setShowAllPennyRecs(true)}
                          className="text-sm text-white/80 hover:text-white transition-colors flex items-center space-x-2"
                        >
                          <span>View all {pennyBadgeRecommendations.length} recommended badges</span>
                          <ChevronRight className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                )}

                {/* Achievement Summary */}
                <div className="grid grid-cols-4 gap-4 mb-6">
              <div className="bg-white rounded-xl border-2 border-[#3B6A52]/20 p-4 shadow-sm">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-gray-600">Total Badges</span>
                  <Award className="w-5 h-5 text-[#F9A03F]" />
                </div>
                <p className="text-3xl text-gray-900">{trailheadData.totalBadges}</p>
                <div className="mt-2 text-xs text-gray-500">
                  {trailheadBadges.filter(b => b.status === 'Completed').length} completed, {trailheadBadges.filter(b => b.status === 'In Progress').length} in progress
                </div>
              </div>
              <div className="bg-white rounded-xl border-2 border-[#3B6A52]/20 p-4 shadow-sm">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-gray-600">Total Points</span>
                  <Star className="w-5 h-5 text-[#F9A03F]" />
                </div>
                <p className="text-3xl text-gray-900">{trailheadData.totalPoints.toLocaleString()}</p>
                <div className="mt-2 text-xs text-gray-500">
                  Trailblazer score: {trailheadData.trailblazerScore.toLocaleString()}
                </div>
              </div>
              <div className="bg-white rounded-xl border-2 border-[#3B6A52]/20 p-4 shadow-sm">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-gray-600">Ranger Status</span>
                  <Trophy className="w-5 h-5 text-[#3B6A52]" />
                </div>
                <p className="text-2xl text-gray-900">{trailheadData.rank}</p>
                <div className="mt-2 flex items-center space-x-1">
                  {[...Array(3)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${i < trailheadData.rangerLevel ? 'text-[#F9A03F] fill-[#F9A03F]' : 'text-gray-300'}`}
                    />
                  ))}
                </div>
              </div>
              <div className="bg-gradient-to-br from-[#2C6975] to-[#7EB5C1] rounded-xl p-4 text-white shadow-sm">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-white/90">Certifications</span>
                  <Shield className="w-5 h-5" />
                </div>
                <p className="text-2xl">{trailheadCertifications.filter(c => c.status === 'In Progress').length} In Progress</p>
                <div className="mt-2 text-xs text-white/80">
                  Admin exam: {trailheadCertifications[0].studyProgress}% ready
                </div>
              </div>
            </div>

            {/* Badges Grid */}
            <div className="mb-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-gray-900">Badges & Modules</h3>
                <div className="flex items-center space-x-2 text-sm text-gray-600">
                  <div className="flex items-center space-x-1">
                    <div className="w-3 h-3 rounded-full bg-[#3B6A52]"></div>
                    <span>Completed</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <div className="w-3 h-3 rounded-full bg-[#F9A03F]"></div>
                    <span>In Progress</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <div className="w-3 h-3 rounded-full bg-gray-300"></div>
                    <span>Not Started</span>
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-6 gap-4">
                {trailheadBadges.map((badge, index) => (
                  <div
                    key={badge.id}
                    className={`bg-white rounded-xl border-2 p-4 hover:shadow-lg transition-all cursor-pointer group relative ${
                      badge.status === 'Completed' ? 'border-[#3B6A52]/30' :
                      badge.status === 'In Progress' ? 'border-[#F9A03F]/30' :
                      'border-gray-200'
                    }`}
                  >
                    <div className="flex flex-col items-center">
                      <div className="w-20 h-20 mb-3 relative">
                        <img
                          src={badge.imageUrl}
                          alt={badge.name}
                          className="w-full h-full object-contain"
                        />
                        {badge.status === 'Completed' && (
                          <div className="absolute -top-1 -right-1 w-6 h-6 bg-[#3B6A52] rounded-full flex items-center justify-center shadow-md">
                            <CheckCircle className="w-4 h-4 text-white" />
                          </div>
                        )}
                      </div>
                      <h4 className="text-sm text-gray-900 text-center mb-2 line-clamp-2">{badge.name}</h4>
                      <span className={`px-2 py-1 rounded-full text-xs mb-2 ${getBadgeStatusColor(badge.status)}`}>
                        {badge.status}
                      </span>
                      {badge.status === 'In Progress' && badge.progress && (
                        <div className="w-full">
                          <div className="w-full bg-gray-200 rounded-full h-1.5 mb-1">
                            <div
                              className="bg-[#F9A03F] h-1.5 rounded-full"
                              style={{ width: `${badge.progress}%` }}
                            ></div>
                          </div>
                          <p className="text-xs text-gray-600 text-center">{badge.progress}%</p>
                        </div>
                      )}
                      <div className="text-xs text-gray-500 mt-1">{badge.points} pts</div>
                      {badge.linkedIssue && (
                        <div className="mt-2 px-2 py-1 bg-[#5E6AD2]/10 rounded text-xs text-[#5E6AD2]">
                          {badge.linkedIssue}
                        </div>
                      )}
                    </div>
                    
                    {/* Hover tooltip */}
                    <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 hidden group-hover:block z-10">
                      <div className="bg-gray-900 text-white text-xs rounded-lg p-3 whitespace-nowrap shadow-xl">
                        <p className="mb-1">{badge.description}</p>
                        {badge.dateCompleted && (
                          <p className="text-gray-300">Completed: {badge.dateCompleted}</p>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Certifications */}
            <div>
              <h3 className="text-gray-900 mb-4">Certification Progress</h3>
              <div className="grid grid-cols-2 gap-4">
                {trailheadCertifications.map((cert) => (
                  <div key={cert.id} className="bg-white rounded-xl border-2 border-[#2C6975]/20 p-6 hover:shadow-lg transition-all">
                    <div className="flex items-start space-x-4">
                      <img
                        src={cert.imageUrl}
                        alt={cert.name}
                        className="w-20 h-20 object-contain"
                      />
                      <div className="flex-1">
                        <h4 className="text-gray-900 mb-2">{cert.name}</h4>
                        <div className="flex items-center space-x-2 mb-3">
                          <span className={`px-2 py-1 rounded-full text-xs ${
                            cert.status === 'In Progress' ? 'bg-[#F9A03F] text-white' : 'bg-gray-300 text-gray-700'
                          }`}>
                            {cert.status}
                          </span>
                          {cert.examDate && (
                            <span className="text-xs text-gray-600 flex items-center space-x-1">
                              <Calendar className="w-3 h-3" />
                              <span>Exam: {cert.examDate}</span>
                            </span>
                          )}
                        </div>
                        <div className="space-y-2">
                          <div>
                            <div className="flex items-center justify-between text-xs text-gray-600 mb-1">
                              <span>Study Progress</span>
                              <span>{cert.studyProgress}%</span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-2">
                              <div
                                className="bg-[#2C6975] h-2 rounded-full"
                                style={{ width: `${cert.studyProgress}%` }}
                              ></div>
                            </div>
                          </div>
                          <div className="text-xs text-gray-600">
                            Required Badges: {cert.completedBadges} of {cert.requiredBadges} completed
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

                {/* Integration Info */}
                <div className="mt-6 pt-6 border-t border-gray-200">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2 text-sm text-gray-600">
                      <div className="w-2 h-2 rounded-full bg-[#3B6A52] animate-pulse"></div>
                      <span>Connected via TrailTracker Package</span>
                      <span className="text-gray-400">•</span>
                      <span>Auto-syncs nightly at 2:00 AM EST</span>
                      <span className="text-gray-400">•</span>
                      <span className="text-[#3B6A52]">Next sync in 18h 45m</span>
                    </div>
                    <button className="text-sm text-[#2C6975] hover:text-[#234f57] transition-colors">
                      Manage Integration Settings
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>
        ) : (
          /* Teaser for non-linked users */
          <div className="bg-gradient-to-br from-[#F5F3E8] to-white rounded-2xl border-2 border-dashed border-[#3B6A52]/30 p-8 mb-8 text-center">
            <div className="flex flex-col items-center max-w-2xl mx-auto">
              <div className="w-20 h-20 rounded-full bg-[#3B6A52]/10 flex items-center justify-center mb-4">
                <Trophy className="w-10 h-10 text-[#3B6A52]" />
              </div>
              <h3 className="text-gray-900 mb-2">Connect Your Trailhead Profile</h3>
              <p className="text-gray-600 mb-6">
                Link your Trailhead account to automatically sync your badges, points, and certifications. Track your progress alongside your Pluralsight and Viva Learning courses!
              </p>
              
              {/* Preview of what they'll see */}
              <div className="grid grid-cols-4 gap-4 mb-6 w-full">
                <div className="bg-white/50 rounded-lg p-4 border border-gray-200">
                  <Award className="w-8 h-8 text-gray-400 mb-2" />
                  <p className="text-sm text-gray-500">Your Badges</p>
                </div>
                <div className="bg-white/50 rounded-lg p-4 border border-gray-200">
                  <Star className="w-8 h-8 text-gray-400 mb-2" />
                  <p className="text-sm text-gray-500">Points Earned</p>
                </div>
                <div className="bg-white/50 rounded-lg p-4 border border-gray-200">
                  <Trophy className="w-8 h-8 text-gray-400 mb-2" />
                  <p className="text-sm text-gray-500">Ranger Status</p>
                </div>
                <div className="bg-white/50 rounded-lg p-4 border border-gray-200">
                  <Shield className="w-8 h-8 text-gray-400 mb-2" />
                  <p className="text-sm text-gray-500">Certifications</p>
                </div>
              </div>

              <button
                onClick={() => setIsTrailheadLinked(true)}
                className="flex items-center space-x-2 px-6 py-3 bg-[#3B6A52] text-white rounded-lg hover:bg-[#2d5440] transition-colors shadow-lg"
              >
                <Link className="w-5 h-5" />
                <span>Link Your Trailhead Profile</span>
              </button>
              
              <p className="text-xs text-gray-500 mt-4">
                🔒 Secure integration via TrailTracker package • Auto-syncs nightly • Only you can see your data
              </p>
            </div>
          </div>
        )}

        {/* Tabs */}
        <div className="bg-white rounded-xl border border-gray-200 p-2 mb-6 inline-flex">
          <button
            onClick={() => setActiveTab('assigned')}
            className={`px-6 py-2 rounded-lg transition-colors ${
              activeTab === 'assigned'
                ? 'bg-[#2C6975] text-white'
                : 'text-gray-700 hover:bg-gray-100'
            }`}
          >
            My Courses ({assignedCourses.length})
          </button>
          <button
            onClick={() => setActiveTab('catalog')}
            className={`px-6 py-2 rounded-lg transition-colors flex items-center space-x-2 ${
              activeTab === 'catalog'
                ? 'bg-[#2C6975] text-white'
                : 'text-gray-700 hover:bg-gray-100'
            }`}
          >
            <span>Course Catalog ({catalogCourses.length})</span>
            <Zap className="w-4 h-4 text-[#F9A03F]" />
          </button>
          <button
            onClick={() => setActiveTab('pathways')}
            className={`px-6 py-2 rounded-lg transition-colors flex items-center space-x-2 ${
              activeTab === 'pathways'
                ? 'bg-[#2C6975] text-white'
                : 'text-gray-700 hover:bg-gray-100'
            }`}
          >
            <span>Learning Pathways ({learningTrails.length})</span>
            <Target className="w-4 h-4 text-[#F9A03F]" />
          </button>
        </div>

        {/* Search */}
        <div className="bg-white rounded-xl border border-gray-200 p-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder={
                activeTab === 'assigned' 
                  ? 'Search your courses by title, instructor, skills, or topics...' 
                  : activeTab === 'catalog'
                  ? 'Search catalog courses by title, instructor, skills, or topics...'
                  : 'Search learning pathways by title or topics...'
              }
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2C6975] focus:border-transparent"
              disabled={activeTab === 'pathways'}
            />
          </div>
        </div>
      </div>

      {/* Learning Pathways */}
      {activeTab === 'pathways' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-xl text-gray-900">Self-Paced Learning Trails</h3>
              <p className="text-sm text-gray-600 mt-1">Structured learning paths to build your Salesforce skills</p>
            </div>
            <span className="text-sm text-gray-600">
              {Math.round(learningTrails.reduce((acc, t) => acc + t.progress, 0) / learningTrails.length)}% overall progress
            </span>
          </div>

          {learningTrails.map((trail) => (
            <div key={trail.id} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <BookOpen className="w-6 h-6" style={{ color: trail.color }} />
                      <h4 className="text-gray-900">{trail.title}</h4>
                      <span className="px-3 py-1 rounded-full bg-[#F9A03F] text-white text-xs">
                        {trail.status === 'in-progress' ? 'In Progress' : trail.status === 'completed' ? 'Completed' : 'Not Started'}
                      </span>
                    </div>
                    <p className="text-gray-600 mb-4">{trail.description}</p>
                    
                    {/* Stats */}
                    <div className="flex flex-wrap items-center gap-6 text-sm text-gray-600 mb-4">
                      <div className="flex items-center space-x-2">
                        <BookOpen className="w-4 h-4" />
                        <span>{trail.completed}/{trail.modules} modules</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Clock className="w-4 h-4" />
                        <span>{trail.estimatedTime} remaining</span>
                      </div>
                      {trail.badges.length > 0 && (
                        <div className="flex items-center space-x-2">
                          <Award className="w-4 h-4" />
                          <span>{trail.badges.length} badges earned</span>
                        </div>
                      )}
                    </div>

                    {/* Badges */}
                    {trail.badges.length > 0 && (
                      <div className="flex flex-wrap gap-2 mb-4">
                        {trail.badges.map((badge, idx) => (
                          <span key={idx} className="inline-flex items-center px-3 py-1 rounded-full bg-[#F9A03F]/10 text-[#F9A03F] text-xs">
                            <Award className="w-3 h-3 mr-1" />
                            {badge}
                          </span>
                        ))}
                      </div>
                    )}

                    {/* Progress Bar */}
                    <div className="flex items-center space-x-4">
                      <div className="flex-1">
                        <div className="w-full bg-gray-100 rounded-full h-3">
                          <div 
                            className="h-3 rounded-full transition-all duration-500"
                            style={{ width: `${trail.progress}%`, backgroundColor: trail.color }}
                          ></div>
                        </div>
                      </div>
                      <span className="text-sm text-gray-600">{trail.progress}%</span>
                    </div>
                  </div>

                  {/* Progress Ring */}
                  <div className="ml-6 hidden lg:block">
                    <ProgressRing progress={trail.progress} size={100} color={trail.color} />
                  </div>
                </div>

                {/* Topics List */}
                <div className="mt-6 pt-6 border-t border-gray-200">
                  <h5 className="text-sm text-gray-900 mb-3">Module Topics</h5>
                  <div className="grid sm:grid-cols-2 gap-3">
                    {trail.topics.map((topic, idx) => (
                      <div 
                        key={idx} 
                        className={`flex items-center space-x-3 p-3 rounded-lg border ${
                          topic.status === 'locked' 
                            ? 'border-gray-200 bg-gray-50' 
                            : 'border-gray-200 hover:border-[#2C6975] hover:bg-gray-50 cursor-pointer'
                        }`}
                      >
                        {topic.status === 'completed' && (
                          <CheckCircle className="w-5 h-5 text-[#3B6A52] flex-shrink-0" />
                        )}
                        {topic.status === 'in-progress' && (
                          <Play className="w-5 h-5 text-[#F9A03F] flex-shrink-0" />
                        )}
                        {topic.status === 'locked' && (
                          <div className="w-5 h-5 rounded-full border-2 border-gray-300 flex-shrink-0"></div>
                        )}
                        <span className={`text-sm ${topic.status === 'locked' ? 'text-gray-400' : 'text-gray-900'}`}>
                          {topic.name}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Actions */}
                <div className="mt-6 flex space-x-3">
                  {trail.status === 'not-started' ? (
                    <button 
                      className="flex-1 bg-[#2C6975] text-white px-6 py-3 rounded-lg hover:bg-[#234f57] transition-colors flex items-center justify-center space-x-2"
                    >
                      <Play className="w-4 h-4" />
                      <span>Start Trail</span>
                    </button>
                  ) : (
                    <button 
                      className="flex-1 bg-[#2C6975] text-white px-6 py-3 rounded-lg hover:bg-[#234f57] transition-colors"
                    >
                      Continue Learning
                    </button>
                  )}
                  <button className="px-6 py-3 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50 transition-colors">
                    View Details
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Courses Grid */}
      {activeTab !== 'pathways' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {filteredCourses.map((course) => (
          <div
            key={course.id}
            className={`bg-white rounded-xl shadow-sm border p-6 hover:shadow-md transition-shadow ${
              course.recommendedBy === 'penny' && activeTab === 'catalog' ? 'border-[#F9A03F] border-2' : 'border-gray-200'
            }`}
          >
            {/* Course Header */}
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <div className="flex items-center flex-wrap gap-2 mb-3">
                  <span className={`inline-block px-3 py-1 rounded-full text-xs ${getProviderBadge(course.provider)}`}>
                    {course.provider === 'pluralsight' ? 'Pluralsight IQ' : 'Viva Learning'}
                  </span>
                  {course.isAssigned && (
                    <span className={`inline-block px-3 py-1 rounded-full border text-xs ${getStatusColor(course.status)}`}>
                      {course.status === 'in-progress' ? 'In Progress' : course.status === 'completed' ? 'Completed' : 'Not Started'}
                    </span>
                  )}
                  {course.recommendedBy === 'penny' && activeTab === 'catalog' && (
                    <span className="inline-block px-3 py-1 rounded-full bg-[#F9A03F]/10 text-[#F9A03F] text-xs flex items-center space-x-1">
                      <Sparkles className="w-3 h-3" />
                      <span>Penny Recommends</span>
                    </span>
                  )}
                  <span className="inline-block px-3 py-1 rounded-full bg-gray-100 text-gray-700 text-xs">
                    {course.level}
                  </span>
                </div>
                <h3 className="text-gray-900 mb-1">{course.title}</h3>
                <p className="text-sm text-gray-600 mb-2">{course.instructor}</p>
              </div>
            </div>

            {/* Course Description */}
            <p className="text-sm text-gray-600 mb-4">{course.description}</p>

            {/* Skills Tags */}
            <div className="flex flex-wrap gap-2 mb-4">
              {course.skills.map((skill, idx) => (
                <span
                  key={idx}
                  className="inline-block px-2 py-1 bg-[#7EB5C1]/10 text-[#2C6975] rounded text-xs"
                >
                  {skill}
                </span>
              ))}
            </div>

            {/* Course Details */}
            <div className="grid grid-cols-3 gap-4 mb-4 text-sm">
              <div>
                <div className="flex items-center space-x-1 text-gray-600 mb-1">
                  <Clock className="w-4 h-4" />
                  <span>Duration</span>
                </div>
                <p className="text-gray-900">{course.duration}</p>
              </div>
              <div>
                <div className="flex items-center space-x-1 text-gray-600 mb-1">
                  <Book className="w-4 h-4" />
                  <span>Modules</span>
                </div>
                <p className="text-gray-900">{course.modules}</p>
              </div>
              <div>
                <div className="flex items-center space-x-1 text-gray-600 mb-1">
                  <Award className="w-4 h-4" />
                  <span>Points</span>
                </div>
                <p className="text-gray-900">{course.isAssigned ? `${course.earnedPoints} / ` : ''}{course.points}</p>
              </div>
            </div>

            {/* Progress Bar */}
            {course.isAssigned && course.status !== 'not-started' && (
              <div className="mb-4">
                <div className="flex items-center justify-between mb-2 text-sm">
                  <span className="text-gray-600">Progress</span>
                  <span className="text-gray-900">{course.progress}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-[#2C6975] h-2 rounded-full transition-all duration-500"
                    style={{ width: `${course.progress}%` }}
                  ></div>
                </div>
              </div>
            )}

            {/* Course Footer */}
            <div className="flex items-center justify-between pt-4 border-t border-gray-200">
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                {course.status === 'completed' ? (
                  <span className="flex items-center space-x-1 text-green-600">
                    <CheckCircle className="w-4 h-4" />
                    <span>{course.dueDate}</span>
                  </span>
                ) : course.isAssigned ? (
                  <span>Due: {course.dueDate}</span>
                ) : (
                  <span className="text-[#F9A03F]">Optional Course</span>
                )}
              </div>
              <button className="flex items-center space-x-2 px-4 py-2 bg-[#2C6975] text-white rounded-lg hover:bg-[#234d56] transition-colors text-sm">
                {course.status === 'completed' ? (
                  <>
                    <span>Review</span>
                    <ExternalLink className="w-4 h-4" />
                  </>
                ) : course.status === 'in-progress' ? (
                  <>
                    <span>Continue</span>
                    <Play className="w-4 h-4" />
                  </>
                ) : (
                  <>
                    <span>Start Course</span>
                    <ChevronRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </div>
          </div>
          ))}
        </div>
      )}

      {activeTab !== 'pathways' && filteredCourses.length === 0 && (
        <div className="bg-white rounded-xl border border-gray-200 p-12 text-center">
          <Book className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-gray-900 mb-2">No courses found</h3>
          <p className="text-gray-600">Try adjusting your search or filter criteria</p>
        </div>
      )}

      {/* Help Section */}
      {activeTab === 'catalog' && (
        <div className="mt-8 bg-gradient-to-r from-[#7EB5C1]/10 to-[#2C6975]/10 rounded-xl p-6 border border-[#2C6975]/20">
          <div className="flex items-start space-x-4">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#2C6975] to-[#7EB5C1] flex items-center justify-center flex-shrink-0">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <div className="flex-1">
              <h4 className="text-gray-900 mb-2">Need help choosing your next course?</h4>
              <p className="text-sm text-gray-600 mb-4">
                Penny can analyze your learning progress, skills gaps, and career goals to recommend the perfect courses from our catalog. You can also browse courses by topic, skill level, or learning provider.
              </p>
              <div className="flex flex-wrap gap-3">
                <button className="px-4 py-2 bg-[#2C6975] text-white rounded-lg hover:bg-[#234d56] transition-colors text-sm flex items-center space-x-2">
                  <Sparkles className="w-4 h-4" />
                  <span>Ask Penny for Recommendations</span>
                </button>
                <button className="px-4 py-2 border border-[#2C6975] text-[#2C6975] rounded-lg hover:bg-[#2C6975]/5 transition-colors text-sm">
                  Browse All Topics
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* All Penny Recommendations Modal */}
      {showAllPennyRecs && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4" onClick={() => setShowAllPennyRecs(false)}>
          <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden shadow-2xl" onClick={(e) => e.stopPropagation()}>
            {/* Modal Header */}
            <div className="bg-gradient-to-r from-[#2C6975] to-[#7EB5C1] p-6 text-white">
              <div className="flex items-start justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center">
                    <Sparkles className="w-6 h-6" />
                  </div>
                  <div>
                    <h2 className="text-white text-2xl">All Penny Recommendations</h2>
                    <p className="text-sm text-white/80">Personalized badge suggestions for your capstone project</p>
                  </div>
                </div>
                <button
                  onClick={() => setShowAllPennyRecs(false)}
                  className="text-white/80 hover:text-white transition-colors p-2"
                >
                  <span className="text-2xl">✕</span>
                </button>
              </div>
            </div>

            {/* Modal Content */}
            <div className="p-6 overflow-y-auto max-h-[calc(90vh-120px)]">
              <div className="space-y-4">
                {pennyBadgeRecommendations.map((rec) => (
                  <div key={rec.id} className="bg-white rounded-xl border-2 border-gray-200 p-5 hover:border-[#2C6975] transition-colors">
                    <div className="flex items-start space-x-4">
                      <img
                        src={rec.imageUrl}
                        alt={rec.badgeName}
                        className="w-16 h-16 object-contain flex-shrink-0"
                      />
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-2">
                          <h4 className="text-gray-900">{rec.badgeName}</h4>
                          {rec.priority === 'high' && (
                            <span className="px-2 py-0.5 bg-red-500/10 text-red-600 rounded-full text-xs border border-red-200">
                              High Priority
                            </span>
                          )}
                          {rec.priority === 'medium' && (
                            <span className="px-2 py-0.5 bg-[#F9A03F]/10 text-[#F9A03F] rounded-full text-xs border border-[#F9A03F]/20">
                              Medium Priority
                            </span>
                          )}
                          {rec.priority === 'low' && (
                            <span className="px-2 py-0.5 bg-gray-100 text-gray-600 rounded-full text-xs border border-gray-200">
                              Low Priority
                            </span>
                          )}
                        </div>
                        <p className="text-sm text-gray-700 mb-3">{rec.reason}</p>
                        
                        <div className="flex flex-wrap gap-3 text-sm text-gray-600 mb-3">
                          <span className="flex items-center space-x-1">
                            <Clock className="w-4 h-4" />
                            <span>{rec.estimatedTime}</span>
                          </span>
                          <span className="flex items-center space-x-1">
                            <Star className="w-4 h-4 text-[#F9A03F]" />
                            <span>{rec.points} points</span>
                          </span>
                        </div>

                        {rec.linkedTask && (
                          <div className="mb-3">
                            <div className="flex items-center space-x-2 text-sm bg-[#7EB5C1]/10 rounded-lg px-3 py-2 inline-flex border border-[#7EB5C1]/30">
                              <Target className="w-4 h-4 text-[#2C6975]" />
                              <span className="text-[#2C6975]">{rec.linkedTask}</span>
                            </div>
                          </div>
                        )}

                        <p className="text-sm text-gray-600 italic mb-3">
                          <span className="text-[#3B6A52]">Impact:</span> {rec.completionImpact}
                        </p>

                        <div className="flex space-x-3">
                          <button className="px-4 py-2 bg-[#2C6975] text-white rounded-lg hover:bg-[#234f57] transition-colors text-sm flex items-center space-x-2">
                            <Play className="w-4 h-4" />
                            <span>Start Badge</span>
                          </button>
                          <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors text-sm flex items-center space-x-2">
                            <ExternalLink className="w-4 h-4" />
                            <span>View Details</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Footer */}
              <div className="mt-6 pt-6 border-t border-gray-200">
                <div className="flex items-center justify-between">
                  <p className="text-sm text-gray-600">
                    <Sparkles className="w-4 h-4 inline mr-1 text-[#2C6975]" />
                    These recommendations are updated based on your capstone project progress and Linear task data
                  </p>
                  <button
                    onClick={() => setShowAllPennyRecs(false)}
                    className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors text-sm"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
