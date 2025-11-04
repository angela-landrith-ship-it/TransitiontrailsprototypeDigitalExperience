import { ArrowLeft, FileText, Clock, Users, Code, CheckCircle, AlertCircle, Trophy, Target, Sparkles, ExternalLink, Download, MessageCircle, Calendar, Github, FileCode, Database, Zap, CheckSquare, ChevronDown, Play, GitPullRequest, Circle, Square, ArrowUpRight, TestTube, Bug, ClipboardCheck, UserCheck, TrendingUp, Lightbulb, Bell, Zap as ZapIcon, AlertTriangle, Layout, Edit2, Save, X, Eye, RefreshCw, Folder } from 'lucide-react';
import { PageType } from '../App';
import { ProgressRing } from './ProgressRing';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from './ui/collapsible';
import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import { Checkbox } from './ui/checkbox';
import { Switch } from './ui/switch';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { Progress } from './ui/progress';

interface CapstoneProjectsProps {
  onNavigate: (page: PageType) => void;
}

export function CapstoneProjects({ onNavigate }: CapstoneProjectsProps) {
  const [isResourcesOpen, setIsResourcesOpen] = useState(false);
  const [isObjectivesOpen, setIsObjectivesOpen] = useState(false);
  const [activeWorkspaceTab, setActiveWorkspaceTab] = useState<'overview' | 'linear' | 'github' | 'testing' | 'status-reports'>('overview');
  const [isPennyExpanded, setIsPennyExpanded] = useState(true);
  const [muralBoardUrl, setMuralBoardUrl] = useState('');
  const [isEditingMural, setIsEditingMural] = useState(false);
  const [tempMuralUrl, setTempMuralUrl] = useState('');
  const [isSubmittingReport, setIsSubmittingReport] = useState(false);
  const [reportWorkCompleted, setReportWorkCompleted] = useState('');
  const [reportNextSteps, setReportNextSteps] = useState('');
  const [reportBlockers, setReportBlockers] = useState('');
  
  // PDF Generation Modal State
  const [isPdfModalOpen, setIsPdfModalOpen] = useState(false);
  const [isGeneratingPdf, setIsGeneratingPdf] = useState(false);
  const [pdfGenerationProgress, setPdfGenerationProgress] = useState(0);
  const [pdfGenerationStep, setPdfGenerationStep] = useState('');
  const [pdfGenerated, setPdfGenerated] = useState(false);
  const [pdfNotes, setPdfNotes] = useState('');
  const [includeTrailhead, setIncludeTrailhead] = useState(true);
  const [pdfSections, setPdfSections] = useState({
    executiveSummary: true,
    valueImpact: true,
    scope: true,
    prd: true,
    architecture: true,
    implementation: true,
    testing: true,
    metrics: true,
    githubPRs: true,
    screenshots: true
  });

  // Main Capstone Project
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
    coach: 'Sarah Martinez',
    
    objectives: [
      'Design and implement a custom data model with 5+ custom objects',
      'Create automated processes using Flow and Apex triggers',
      'Build custom Lightning Web Components for volunteer portal',
      'Implement role-based security and sharing rules',
      'Develop comprehensive reports and dashboards',
      'Deploy solution using change sets and version control'
    ],
    
    resources: [
      { name: 'Nonprofit Partner Contact', value: 'Maria Chen, Program Director', type: 'contact', icon: Users },
      { name: 'Developer Sandbox', value: 'transitiontrails-dev.my.salesforce.com', type: 'tool', icon: ExternalLink },
      { name: 'Linear Project Board', value: 'linear.app/transitiontrails/capstone', type: 'tool', icon: Target },
      { name: 'GitHub Repository', value: 'github.com/transitiontrails/volunteer-mgmt', type: 'tool', icon: Github },
      { name: 'Design Documents', value: 'Google Drive Folder', type: 'document', icon: FileText },
      { name: 'QA Test Case Template', value: 'Download Template', type: 'document', icon: TestTube },
      { name: 'UAT Script Template', value: 'Download Template', type: 'document', icon: ClipboardCheck },
      { name: 'Bug Report Template', value: 'Download Template', type: 'document', icon: Bug },
      { name: 'Testing Best Practices Guide', value: 'View Guide', type: 'document', icon: FileText },
      { name: 'Weekly Office Hours', value: 'Fridays 3-4pm with Coach Sarah', type: 'support', icon: Calendar },
      { name: 'Peer Review Group', value: '4 cohort members', type: 'support', icon: MessageCircle }
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
        completedDate: 'Feb 14, 2025',
        coachFeedback: 'Excellent requirements gathering! Your user stories are well-defined and the data model diagram is thorough.',
        tasks: [
          { name: 'Conduct stakeholder interviews', completed: true },
          { name: 'Document requirements', completed: true },
          { name: 'Create user stories', completed: true },
          { name: 'Design data model diagram', completed: true },
          { name: 'Submit project proposal', completed: true }
        ],
        deliverables: [
          { name: 'Project Proposal', status: 'submitted', feedback: 'Approved - Great detail on scope and timeline' },
          { name: 'Requirements Document', status: 'submitted', feedback: 'Comprehensive coverage of user needs' },
          { name: 'Data Model Diagram', status: 'submitted', feedback: 'Well-structured relationships' }
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
        completedDate: 'Feb 27, 2025',
        coachFeedback: 'Strong implementation! Consider adding a few more validation rules to ensure data quality.',
        tasks: [
          { name: 'Build custom objects (Volunteer, Event, Service Hours)', completed: true },
          { name: 'Configure fields and relationships', completed: true },
          { name: 'Set up page layouts and record types', completed: true },
          { name: 'Implement security model (profiles, roles, sharing)', completed: true },
          { name: 'Create validation rules', completed: false }
        ],
        deliverables: [
          { name: 'Object Schema', status: 'submitted', feedback: 'Good use of master-detail relationships' },
          { name: 'Security Documentation', status: 'submitted', feedback: 'Comprehensive role hierarchy' }
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
        ],
        deliverables: [
          { name: 'Flow Documentation', status: 'in-progress', feedback: '' },
          { name: 'Apex Test Classes', status: 'pending', feedback: '' }
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
        ],
        deliverables: []
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
        ],
        deliverables: []
      },
      {
        id: 6,
        name: 'Quality Assurance Testing',
        weeks: 'Week 10',
        points: 150,
        earned: 0,
        status: 'upcoming',
        dueDate: 'Mar 28, 2025',
        tasks: [
          { name: 'Write Apex test classes (85%+ coverage)', completed: false },
          { name: 'Create QA test cases for all features', completed: false },
          { name: 'Execute functional testing', completed: false },
          { name: 'Document and track bugs in Linear', completed: false },
          { name: 'Perform integration testing', completed: false },
          { name: 'Test mobile responsiveness', completed: false }
        ],
        deliverables: [
          { name: 'Test Coverage Report', status: 'pending', feedback: '' },
          { name: 'QA Test Case Document', status: 'pending', feedback: '' },
          { name: 'Bug Tracking Report', status: 'pending', feedback: '' }
        ]
      },
      {
        id: 7,
        name: 'User Acceptance Testing & Documentation',
        weeks: 'Week 11',
        points: 100,
        earned: 0,
        status: 'upcoming',
        dueDate: 'Apr 4, 2025',
        tasks: [
          { name: 'Schedule UAT sessions with nonprofit partner', completed: false },
          { name: 'Conduct UAT walkthrough sessions', completed: false },
          { name: 'Collect and document partner feedback', completed: false },
          { name: 'Fix critical UAT issues', completed: false },
          { name: 'Create user documentation and guides', completed: false },
          { name: 'Document technical architecture', completed: false }
        ],
        deliverables: [
          { name: 'UAT Test Scripts', status: 'pending', feedback: '' },
          { name: 'Partner Feedback Report', status: 'pending', feedback: '' },
          { name: 'User Documentation', status: 'pending', feedback: '' },
          { name: 'Technical Documentation', status: 'pending', feedback: '' }
        ]
      },
      {
        id: 8,
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
        ],
        deliverables: []
      }
    ]
  };

  // Linear Issues
  const linearIssues = [
    {
      id: 'TT-123',
      title: 'Build custom object for Volunteer tracking',
      status: 'done',
      priority: 'high',
      assignee: 'Alex Johnson',
      labels: ['data-model', 'custom-objects'],
      linkedPR: 'PR-45',
      createdAt: 'Feb 15, 2025',
      completedAt: 'Feb 20, 2025',
      estimate: 5,
      phase: 'Data Model & Security'
    },
    {
      id: 'TT-124',
      title: 'Implement Flow for volunteer onboarding',
      status: 'done',
      priority: 'high',
      assignee: 'Alex Johnson',
      labels: ['automation', 'flow'],
      linkedPR: 'PR-47',
      createdAt: 'Feb 28, 2025',
      completedAt: 'Mar 5, 2025',
      estimate: 8,
      phase: 'Automation & Business Logic'
    },
    {
      id: 'TT-125',
      title: 'Create Apex trigger for hour tracking',
      status: 'in-progress',
      priority: 'high',
      assignee: 'Alex Johnson',
      labels: ['apex', 'triggers'],
      linkedPR: 'PR-48',
      createdAt: 'Mar 1, 2025',
      estimate: 5,
      phase: 'Automation & Business Logic'
    },
    {
      id: 'TT-126',
      title: 'Develop scheduled batch job for reporting',
      status: 'in-progress',
      priority: 'medium',
      assignee: 'Alex Johnson',
      labels: ['apex', 'batch', 'reporting'],
      createdAt: 'Mar 3, 2025',
      estimate: 8,
      phase: 'Automation & Business Logic'
    },
    {
      id: 'TT-127',
      title: 'Build Lightning Web Component for event calendar',
      status: 'todo',
      priority: 'medium',
      assignee: 'Alex Johnson',
      labels: ['lwc', 'ui'],
      createdAt: 'Mar 5, 2025',
      estimate: 13,
      phase: 'User Interface & Experience'
    },
    {
      id: 'TT-128',
      title: 'Implement email notifications for events',
      status: 'todo',
      priority: 'low',
      assignee: 'Alex Johnson',
      labels: ['automation', 'email'],
      createdAt: 'Mar 5, 2025',
      estimate: 3,
      phase: 'Automation & Business Logic'
    },
  ];

  // GitHub Pull Requests
  const githubPRs = [
    {
      number: 45,
      title: 'Add Volunteer and Event custom objects',
      status: 'merged',
      author: 'Alex Johnson',
      linkedIssue: 'TT-123',
      createdAt: 'Feb 18, 2025',
      mergedAt: 'Feb 20, 2025',
      commits: 8,
      additions: 245,
      deletions: 12,
      reviewers: ['Sarah Martinez'],
      branch: 'feature/volunteer-objects'
    },
    {
      number: 47,
      title: 'Implement volunteer onboarding flow',
      status: 'merged',
      author: 'Alex Johnson',
      linkedIssue: 'TT-124',
      createdAt: 'Mar 2, 2025',
      mergedAt: 'Mar 5, 2025',
      commits: 5,
      additions: 156,
      deletions: 8,
      reviewers: ['Sarah Martinez'],
      branch: 'feature/onboarding-flow'
    },
    {
      number: 48,
      title: 'Add hour tracking trigger and test coverage',
      status: 'open',
      author: 'Alex Johnson',
      linkedIssue: 'TT-125',
      createdAt: 'Mar 6, 2025',
      commits: 3,
      additions: 89,
      deletions: 4,
      reviewers: ['Sarah Martinez'],
      branch: 'feature/hour-tracking',
      comments: 2,
      checksStatus: 'pending'
    },
  ];

  // Testing Data
  const testingMetrics = {
    apexCoverage: 67,
    targetCoverage: 85,
    testClassesWritten: 8,
    testClassesNeeded: 12,
    testsPassing: 45,
    testsFailing: 3,
    lastRun: 'Mar 7, 2025 10:23am'
  };

  const testCases = [
    {
      id: 'TC-001',
      name: 'Volunteer Registration Flow',
      category: 'Functional',
      priority: 'high',
      status: 'passed',
      lastRun: 'Mar 6, 2025',
      assignedTo: 'Alex Johnson',
      steps: 5,
      linkedIssue: 'TT-124'
    },
    {
      id: 'TC-002',
      name: 'Service Hour Calculation',
      category: 'Integration',
      priority: 'high',
      status: 'passed',
      lastRun: 'Mar 7, 2025',
      assignedTo: 'Alex Johnson',
      steps: 7,
      linkedIssue: 'TT-125'
    },
    {
      id: 'TC-003',
      name: 'Event Calendar Display',
      category: 'UI/UX',
      priority: 'medium',
      status: 'not-run',
      assignedTo: 'Alex Johnson',
      steps: 4,
      linkedIssue: 'TT-127'
    },
    {
      id: 'TC-004',
      name: 'Email Notification Trigger',
      category: 'Integration',
      priority: 'medium',
      status: 'not-run',
      assignedTo: 'Alex Johnson',
      steps: 3,
      linkedIssue: 'TT-128'
    },
    {
      id: 'TC-005',
      name: 'Batch Job Error Handling',
      category: 'Functional',
      priority: 'high',
      status: 'failed',
      lastRun: 'Mar 6, 2025',
      assignedTo: 'Alex Johnson',
      steps: 6,
      linkedIssue: 'TT-126',
      failureReason: 'Null pointer exception on empty volunteer list'
    }
  ];

  const bugs = [
    {
      id: 'BUG-001',
      title: 'Batch job fails with null volunteer list',
      severity: 'high',
      status: 'open',
      linkedTestCase: 'TC-005',
      linkedIssue: 'TT-126',
      reportedBy: 'Alex Johnson',
      reportedDate: 'Mar 6, 2025',
      description: 'Scheduled batch job throws null pointer when processing empty volunteer records'
    },
    {
      id: 'BUG-002',
      title: 'Hour calculation rounds incorrectly',
      severity: 'medium',
      status: 'in-progress',
      linkedTestCase: 'TC-002',
      linkedIssue: 'TT-125',
      reportedBy: 'Alex Johnson',
      reportedDate: 'Mar 5, 2025',
      description: 'Service hours not rounding to nearest quarter hour as specified'
    },
    {
      id: 'BUG-003',
      title: 'Validation rule blocking valid registrations',
      severity: 'low',
      status: 'resolved',
      linkedTestCase: 'TC-001',
      linkedIssue: 'TT-124',
      reportedBy: 'Alex Johnson',
      reportedDate: 'Mar 3, 2025',
      resolvedDate: 'Mar 4, 2025',
      description: 'Email validation too strict, rejecting valid addresses'
    }
  ];

  const uatSessions = [
    {
      id: 'UAT-001',
      title: 'Volunteer Portal Walkthrough',
      scheduledDate: 'Mar 22, 2025',
      duration: '2 hours',
      status: 'scheduled',
      participants: ['Maria Chen (Partner)', 'Alex Johnson', 'Sarah Martinez (Coach)'],
      focusAreas: ['Volunteer registration', 'Profile management', 'Event browsing'],
      prepared: false
    },
    {
      id: 'UAT-002',
      title: 'Admin Dashboard Testing',
      scheduledDate: 'Mar 25, 2025',
      duration: '1.5 hours',
      status: 'scheduled',
      participants: ['Maria Chen (Partner)', 'Alex Johnson'],
      focusAreas: ['Reporting dashboard', 'Volunteer management', 'Event creation'],
      prepared: false
    },
    {
      id: 'UAT-003',
      title: 'Mobile Experience Review',
      scheduledDate: 'Mar 29, 2025',
      duration: '1 hour',
      status: 'scheduled',
      participants: ['Maria Chen (Partner)', 'Alex Johnson'],
      focusAreas: ['Mobile responsiveness', 'Volunteer app experience'],
      prepared: false
    }
  ];

  // Weekly Status Reports
  const weeklyStatusReports = [
    {
      id: 'SR-005',
      weekNumber: 5,
      weekDates: 'Mar 3 - Mar 9, 2025',
      submittedDate: 'Mar 8, 2025',
      workCompleted: 'Completed Flow for volunteer onboarding with automated email notifications. Created Apex trigger for hour tracking with initial test coverage at 45%. Set up Linear board with all remaining tasks for phases 3-8.',
      nextSteps: 'Focus on completing the batch job for reporting this week. Start writing comprehensive test classes to improve coverage. Begin planning LWC components for the event calendar.',
      blockers: 'None currently. Waiting for nonprofit partner to review volunteer onboarding flow before finalizing email templates.',
      viewedBy: ['Sarah Martinez (Coach)', 'Maria Chen (Partner)'],
      coachFeedback: 'Great progress on automation! Make sure your test classes cover edge cases.'
    },
    {
      id: 'SR-004',
      weekNumber: 4,
      weekDates: 'Feb 24 - Mar 2, 2025',
      submittedDate: 'Mar 1, 2025',
      workCompleted: 'Finished implementing security model with profiles, roles, and sharing rules. Created all validation rules for data quality. Successfully deployed custom objects to dev sandbox and tested relationships.',
      nextSteps: 'Begin Phase 3 - Automation & Business Logic. Start with volunteer onboarding Flow and hour tracking trigger. Set up GitHub repository and implement branching strategy.',
      blockers: 'Clarification needed on whether volunteer background check status should be a picklist or custom object.',
      viewedBy: ['Sarah Martinez (Coach)', 'Maria Chen (Partner)'],
      coachFeedback: 'Excellent work on security! For the background check, use a picklist for simplicity.'
    },
    {
      id: 'SR-003',
      weekNumber: 3,
      weekDates: 'Feb 17 - Feb 23, 2025',
      submittedDate: 'Feb 22, 2025',
      workCompleted: 'Built all 5 custom objects (Volunteer, Event, Service Hours, Skill, Assignment) with proper relationships. Configured page layouts for each object. Created record types for different volunteer categories.',
      nextSteps: 'Implement security model next week including profiles for volunteers, coordinators, and admins. Create validation rules to ensure data quality.',
      blockers: 'None',
      viewedBy: ['Sarah Martinez (Coach)'],
      coachFeedback: 'Strong data model! The relationships are well thought out.'
    },
    {
      id: 'SR-002',
      weekNumber: 2,
      weekDates: 'Feb 10 - Feb 16, 2025',
      submittedDate: 'Feb 15, 2025',
      workCompleted: 'Completed all stakeholder interviews with Maria Chen and her team. Documented 25 user stories with acceptance criteria. Created comprehensive data model diagram in Lucidchart. Submitted project proposal to coach.',
      nextSteps: 'Begin building custom objects in Salesforce based on approved data model. Start with core objects: Volunteer, Event, and Service Hours.',
      blockers: 'None',
      viewedBy: ['Sarah Martinez (Coach)'],
      coachFeedback: 'Thorough requirements gathering! Your user stories are very detailed.'
    }
  ];

  const currentWeek = 6;
  const currentWeekDates = 'Mar 10 - Mar 16, 2025';
  const isCurrentWeekReportSubmitted = false;

  // Penny AI Insights - Context-aware recommendations
  const pennyInsights = [
    {
      type: 'critical',
      title: 'Week 6 Status Report Due',
      message: 'Your weekly status report for Week 6 (Mar 10-16) is required by end of day Sunday. Your coach and nonprofit partner are waiting for your update on progress, next steps, and any blockers.',
      action: 'Submit status report',
      linkedTo: 'status-reports',
      priority: 'high',
      daysUntilDeadline: 2
    },
    {
      type: 'critical',
      title: 'Test Coverage Below Threshold',
      message: 'Your Apex test coverage is at 67% but Salesforce requires 85% for deployment. You need to write 4 more test classes by Week 10.',
      action: 'Create test classes',
      linkedTo: 'testing',
      priority: 'high',
      daysUntilDeadline: 21
    },
    {
      type: 'warning',
      title: 'Open PR Needs Review',
      message: 'PR #48 has been open for 2 days with pending checks. This is blocking your progress on the Automation phase.',
      action: 'Review PR status',
      linkedTo: 'github',
      priority: 'high',
      daysUntilDeadline: null
    },
    {
      type: 'info',
      title: 'UAT Sessions Not Prepared',
      message: 'You have 3 UAT sessions scheduled but no test scripts created yet. I recommend preparing UAT materials at least 3 days before each session.',
      action: 'Prepare UAT scripts',
      linkedTo: 'testing',
      priority: 'medium',
      daysUntilDeadline: 15
    },
    {
      type: 'critical',
      title: 'High Severity Bug Blocking Phase',
      message: 'BUG-001 is blocking the completion of your batch job task. This affects 100 points in the Automation phase. Consider pair programming with your coach.',
      action: 'Fix critical bug',
      linkedTo: 'testing',
      priority: 'high',
      daysUntilDeadline: 14
    },
    {
      type: 'success',
      title: 'Great Progress on Automation!',
      message: 'You\'ve completed 2 of 5 automation tasks and your Flow implementation looks solid. Keep up the momentum!',
      action: null,
      linkedTo: 'linear',
      priority: 'low',
      daysUntilDeadline: null
    },
    {
      type: 'warning',
      title: 'Schedule Partner Communication',
      message: 'You haven\'t contacted your nonprofit partner in 5 days. Best practice is weekly check-ins to ensure alignment.',
      action: 'Schedule check-in',
      linkedTo: 'overview',
      priority: 'medium',
      daysUntilDeadline: null
    }
  ];

  const getLinearStatusColor = (status: string) => {
    switch (status) {
      case 'done': return 'bg-[#3B6A52] text-white';
      case 'in-progress': return 'bg-[#F9A03F] text-white';
      case 'todo': return 'bg-gray-300 text-gray-700';
      case 'backlog': return 'bg-gray-200 text-gray-600';
      default: return 'bg-gray-300 text-gray-700';
    }
  };

  const getLinearStatusIcon = (status: string) => {
    switch (status) {
      case 'done': return <CheckCircle className="w-4 h-4" />;
      case 'in-progress': return <Circle className="w-4 h-4" />;
      case 'todo': return <Square className="w-4 h-4" />;
      default: return <Square className="w-4 h-4" />;
    }
  };

  const getPRStatusColor = (status: string) => {
    switch (status) {
      case 'merged': return 'bg-purple-600 text-white';
      case 'open': return 'bg-green-600 text-white';
      case 'closed': return 'bg-red-600 text-white';
      default: return 'bg-gray-300 text-gray-700';
    }
  };

  const getTestStatusColor = (status: string) => {
    switch (status) {
      case 'passed': return 'bg-[#3B6A52] text-white';
      case 'failed': return 'bg-red-600 text-white';
      case 'not-run': return 'bg-gray-300 text-gray-700';
      default: return 'bg-gray-300 text-gray-700';
    }
  };

  const getBugSeverityColor = (severity: string) => {
    switch (severity) {
      case 'high': return 'bg-red-100 text-red-700 border-red-300';
      case 'medium': return 'bg-yellow-100 text-yellow-700 border-yellow-300';
      case 'low': return 'bg-blue-100 text-blue-700 border-blue-300';
      default: return 'bg-gray-100 text-gray-700 border-gray-300';
    }
  };

  const getPennyInsightStyle = (type: string) => {
    switch (type) {
      case 'critical': return {
        bg: 'bg-red-50',
        border: 'border-red-200',
        icon: 'text-red-600',
        iconComponent: AlertTriangle
      };
      case 'warning': return {
        bg: 'bg-yellow-50',
        border: 'border-yellow-200',
        icon: 'text-yellow-600',
        iconComponent: AlertCircle
      };
      case 'info': return {
        bg: 'bg-blue-50',
        border: 'border-blue-200',
        icon: 'text-blue-600',
        iconComponent: Lightbulb
      };
      case 'success': return {
        bg: 'bg-green-50',
        border: 'border-green-200',
        icon: 'text-green-600',
        iconComponent: CheckCircle
      };
      default: return {
        bg: 'bg-gray-50',
        border: 'border-gray-200',
        icon: 'text-gray-600',
        iconComponent: Lightbulb
      };
    }
  };

  const getPhaseStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-[#3B6A52] text-white';
      case 'in-progress': return 'bg-[#F9A03F] text-white';
      case 'upcoming': return 'bg-gray-300 text-gray-700';
      default: return 'bg-gray-300 text-gray-700';
    }
  };

  const getPhaseStatusIcon = (status: string) => {
    switch (status) {
      case 'completed': return <CheckCircle className="w-5 h-5" />;
      case 'in-progress': return <Sparkles className="w-5 h-5" />;
      case 'upcoming': return <Clock className="w-5 h-5" />;
      default: return <Clock className="w-5 h-5" />;
    }
  };

  const percentComplete = Math.round((capstoneProject.pointsEarned / capstoneProject.pointsTotal) * 100);
  const completedPhases = capstoneProject.phases.filter(p => p.status === 'completed').length;
  const totalPhases = capstoneProject.phases.length;

  // PDF Generation History
  const pdfHistory = [
    {
      id: 'PDF-003',
      timestamp: 'Mar 8, 2025 3:42 PM',
      size: '4.2 MB',
      sections: 8,
      includesTrailhead: true
    },
    {
      id: 'PDF-002',
      timestamp: 'Feb 28, 2025 11:15 AM',
      size: '3.8 MB',
      sections: 7,
      includesTrailhead: false
    },
    {
      id: 'PDF-001',
      timestamp: 'Feb 14, 2025 9:30 AM',
      size: '2.1 MB',
      sections: 5,
      includesTrailhead: true
    }
  ];

  const handleGeneratePdf = () => {
    setIsGeneratingPdf(true);
    setPdfGenerated(false);
    setPdfGenerationProgress(0);

    const steps = [
      { progress: 15, message: 'Gathering footprints from your trail...' },
      { progress: 30, message: 'Analyzing Linear project data...' },
      { progress: 45, message: 'Reviewing GitHub contributions...' },
      { progress: 60, message: 'Compiling testing metrics...' },
      { progress: 75, message: 'Organizing screenshots and documentation...' },
      { progress: 90, message: 'Formatting your amazing work...' },
      { progress: 100, message: 'PDF generated successfully!' }
    ];

    let currentStep = 0;
    const interval = setInterval(() => {
      if (currentStep < steps.length) {
        setPdfGenerationProgress(steps[currentStep].progress);
        setPdfGenerationStep(steps[currentStep].message);
        currentStep++;
      } else {
        clearInterval(interval);
        setIsGeneratingPdf(false);
        setPdfGenerated(true);
      }
    }, 800);
  };

  const handleClosePdfModal = () => {
    setIsPdfModalOpen(false);
    setPdfGenerated(false);
    setPdfGenerationProgress(0);
    setPdfGenerationStep('');
    setPdfNotes('');
  };

  return (
    <div className="min-h-screen bg-[#F5F3E8]">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center space-x-4 mb-4">
            <button 
              onClick={() => onNavigate('learner')}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <ArrowLeft className="w-5 h-5 text-gray-600" />
            </button>
            <div className="flex-1">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#F9A03F] to-[#F9A03F]/70 text-white flex items-center justify-center">
                  <Trophy className="w-6 h-6" />
                </div>
                <div>
                  <h1 className="text-gray-900">Capstone Project</h1>
                  <p className="text-sm text-gray-600">Worth 40% of your program points • Due Apr 8, 2025</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Project Overview Card */}
        <div className="bg-gradient-to-br from-[#F9A03F]/10 to-[#F9A03F]/5 border-2 border-[#F9A03F]/30 rounded-2xl p-8 mb-8">
          <div className="flex items-start justify-between mb-6">
            <div className="flex-1">
              <h2 className="text-2xl text-gray-900 mb-3">{capstoneProject.title}</h2>
              <p className="text-gray-700 mb-4 max-w-3xl">{capstoneProject.description}</p>
              <div className="flex flex-wrap gap-6 text-sm">
                <div className="flex items-center space-x-2 text-gray-700">
                  <Users className="w-4 h-4 text-[#2C6975]" />
                  <span>Nonprofit Partner: <strong>{capstoneProject.nonprofit}</strong></span>
                </div>
                <div className="flex items-center space-x-2 text-gray-700">
                  <Users className="w-4 h-4 text-[#2C6975]" />
                  <span>Coach: <strong>{capstoneProject.coach}</strong></span>
                </div>
                <div className="flex items-center space-x-2 text-gray-700">
                  <Calendar className="w-4 h-4 text-[#2C6975]" />
                  <span>{capstoneProject.startDate} - {capstoneProject.dueDate}</span>
                </div>
              </div>
            </div>
            <div className="ml-8">
              <ProgressRing progress={percentComplete} size={120} color="#F9A03F" />
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="bg-white rounded-xl p-4 shadow-sm">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-gray-600">Points Earned</span>
                <Trophy className="w-5 h-5 text-[#F9A03F]" />
              </div>
              <p className="text-2xl text-gray-900">{capstoneProject.pointsEarned}</p>
              <p className="text-xs text-gray-500">of {capstoneProject.pointsTotal} total</p>
            </div>
            <div className="bg-white rounded-xl p-4 shadow-sm">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-gray-600">Phases Complete</span>
                <CheckCircle className="w-5 h-5 text-[#3B6A52]" />
              </div>
              <p className="text-2xl text-gray-900">{completedPhases} / {totalPhases}</p>
              <p className="text-xs text-gray-500">{Math.round((completedPhases / totalPhases) * 100)}% complete</p>
            </div>
            <div className="bg-white rounded-xl p-4 shadow-sm">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-gray-600">Current Phase</span>
                <Sparkles className="w-5 h-5 text-[#F9A03F]" />
              </div>
              <p className="text-sm text-gray-900">Automation & Logic</p>
              <p className="text-xs text-gray-500">Week 5-7</p>
            </div>
            <div className="bg-white rounded-xl p-4 shadow-sm">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-gray-600">Days Remaining</span>
                <Clock className="w-5 h-5 text-[#2C6975]" />
              </div>
              <p className="text-2xl text-gray-900">35</p>
              <p className="text-xs text-gray-500">Until final deadline</p>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="flex flex-wrap gap-3 mt-6">
            <Dialog open={isPdfModalOpen} onOpenChange={setIsPdfModalOpen}>
              <DialogTrigger asChild>
                <button className="flex items-center space-x-2 bg-gradient-to-r from-[#F9A03F] to-[#F9A03F]/80 text-white px-6 py-3 rounded-lg hover:from-[#e89135] hover:to-[#e89135]/80 transition-all shadow-md hover:shadow-lg">
                  <Sparkles className="w-4 h-4" />
                  <span>Generate Capstone Summary (PDF) with Penny</span>
                  <Download className="w-4 h-4" />
                </button>
              </DialogTrigger>
            </Dialog>
            <button className="flex items-center space-x-2 bg-[#5E6AD2] text-white px-6 py-3 rounded-lg hover:bg-[#4f5bc4] transition-colors">
              <Target className="w-4 h-4" />
              <span>Open Linear Project</span>
              <ExternalLink className="w-3 h-3" />
            </button>
            <button className="flex items-center space-x-2 bg-gray-900 text-white px-6 py-3 rounded-lg hover:bg-gray-800 transition-colors">
              <Github className="w-4 h-4" />
              <span>View GitHub Repo</span>
              <ExternalLink className="w-3 h-3" />
            </button>
            {muralBoardUrl && (
              <a 
                href={muralBoardUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-2 bg-[#FF4563] text-white px-6 py-3 rounded-lg hover:bg-[#e63d57] transition-colors"
              >
                <Layout className="w-4 h-4" />
                <span>Open Mural Board</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            )}
            <button className="flex items-center space-x-2 bg-[#2C6975] text-white px-6 py-3 rounded-lg hover:bg-[#234f57] transition-colors">
              <Code className="w-4 h-4" />
              <span>Salesforce Sandbox</span>
              <ExternalLink className="w-3 h-3" />
            </button>
            <button className="px-6 py-3 rounded-lg border-2 border-gray-300 text-gray-700 hover:bg-gray-50 transition-colors">
              <MessageCircle className="w-4 h-4 inline mr-2" />
              Contact Partner
            </button>
          </div>
        </div>

        {/* Penny AI Assistant - Proactive Insights */}
        <div className="bg-gradient-to-r from-[#7EB5C1]/20 to-[#2C6975]/20 border-2 border-[#2C6975]/30 rounded-2xl p-6 mb-8">
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#7EB5C1] to-[#2C6975] text-white flex items-center justify-center shadow-lg">
                <Sparkles className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-gray-900">Penny's Project Insights</h3>
                <p className="text-sm text-gray-600">AI-powered recommendations based on your project data</p>
              </div>
            </div>
            <button 
              onClick={() => setIsPennyExpanded(!isPennyExpanded)}
              className="p-2 hover:bg-white/50 rounded-lg transition-colors"
            >
              <ChevronDown className={`w-5 h-5 text-gray-600 transition-transform ${isPennyExpanded ? 'rotate-180' : ''}`} />
            </button>
          </div>

          {isPennyExpanded && (
            <div className="space-y-3">
              {pennyInsights
                .sort((a, b) => {
                  const priorityOrder: Record<string, number> = { high: 0, medium: 1, low: 2 };
                  return priorityOrder[a.priority] - priorityOrder[b.priority];
                })
                .map((insight, index) => {
                  const style = getPennyInsightStyle(insight.type);
                  const IconComponent = style.iconComponent;
                  
                  return (
                    <div key={index} className={`${style.bg} border ${style.border} rounded-xl p-4`}>
                      <div className="flex items-start justify-between">
                        <div className="flex items-start space-x-3 flex-1">
                          <IconComponent className={`w-5 h-5 ${style.icon} flex-shrink-0 mt-0.5`} />
                          <div className="flex-1">
                            <div className="flex items-center space-x-2 mb-1">
                              <h4 className="text-gray-900">{insight.title}</h4>
                              {insight.daysUntilDeadline !== null && (
                                <span className="px-2 py-0.5 bg-white/50 rounded-full text-xs text-gray-700">
                                  {insight.daysUntilDeadline} days left
                                </span>
                              )}
                            </div>
                            <p className="text-sm text-gray-700 mb-3">{insight.message}</p>
                            {insight.action && (
                              <button
                                onClick={() => setActiveWorkspaceTab(insight.linkedTo as any)}
                                className="flex items-center space-x-2 px-4 py-2 bg-white text-gray-900 rounded-lg hover:bg-gray-50 transition-colors text-sm shadow-sm"
                              >
                                <ZapIcon className="w-4 h-4 text-[#F9A03F]" />
                                <span>{insight.action}</span>
                                <ArrowUpRight className="w-3 h-3" />
                              </button>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              
              <div className="flex items-center justify-between pt-4 border-t border-gray-300">
                <button 
                  onClick={() => onNavigate('learner')}
                  className="flex items-center space-x-2 text-sm text-gray-600 hover:text-gray-900 transition-colors"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Chat with Penny for more help</span>
                </button>
                <span className="text-xs text-gray-500">Last updated: Just now</span>
              </div>
            </div>
          )}
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Main Content - Phases */}
          <div className="lg:col-span-2 space-y-6">
            {/* Project Goal */}
            <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
              <div className="flex items-start space-x-3">
                <Target className="w-6 h-6 text-blue-600 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="text-gray-900 mb-2">Project Goal</h3>
                  <p className="text-sm text-gray-700">{capstoneProject.goal}</p>
                </div>
              </div>
            </div>

            {/* Objectives - Collapsible */}
            <Collapsible open={isObjectivesOpen} onOpenChange={setIsObjectivesOpen}>
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                <CollapsibleTrigger className="w-full p-6 flex items-center justify-between hover:bg-gray-50 transition-colors">
                  <h3 className="text-gray-900">Learning Objectives</h3>
                  <ChevronDown className={`w-5 h-5 text-gray-400 transition-transform ${isObjectivesOpen ? 'rotate-180' : ''}`} />
                </CollapsibleTrigger>
                <CollapsibleContent>
                  <div className="px-6 pb-6">
                    <ul className="space-y-2">
                      {capstoneProject.objectives.map((objective, index) => (
                        <li key={index} className="flex items-start space-x-3">
                          <CheckSquare className="w-5 h-5 text-[#2C6975] flex-shrink-0 mt-0.5" />
                          <span className="text-sm text-gray-700">{objective}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </CollapsibleContent>
              </div>
            </Collapsible>

            {/* Project Workspace - Linear & GitHub Integration */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h3 className="text-gray-900 mb-6">Project Workspace</h3>
              
              {/* Workspace Tabs */}
              <div className="bg-gray-100 rounded-lg p-1 mb-6 inline-flex">
                <button
                  onClick={() => setActiveWorkspaceTab('overview')}
                  className={`px-4 py-2 rounded-md transition-colors ${
                    activeWorkspaceTab === 'overview'
                      ? 'bg-white text-gray-900 shadow-sm'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  Overview
                </button>
                <button
                  onClick={() => setActiveWorkspaceTab('linear')}
                  className={`px-4 py-2 rounded-md transition-colors flex items-center space-x-2 ${
                    activeWorkspaceTab === 'linear'
                      ? 'bg-white text-gray-900 shadow-sm'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  <Target className="w-4 h-4 text-[#5E6AD2]" />
                  <span>Linear Issues</span>
                  <span className="px-2 py-0.5 bg-[#5E6AD2] text-white rounded-full text-xs">{linearIssues.length}</span>
                </button>
                <button
                  onClick={() => setActiveWorkspaceTab('github')}
                  className={`px-4 py-2 rounded-md transition-colors flex items-center space-x-2 ${
                    activeWorkspaceTab === 'github'
                      ? 'bg-white text-gray-900 shadow-sm'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  <Github className="w-4 h-4" />
                  <span>Pull Requests</span>
                  <span className="px-2 py-0.5 bg-gray-900 text-white rounded-full text-xs">{githubPRs.length}</span>
                </button>
                <button
                  onClick={() => setActiveWorkspaceTab('testing')}
                  className={`px-4 py-2 rounded-md transition-colors flex items-center space-x-2 ${
                    activeWorkspaceTab === 'testing'
                      ? 'bg-white text-gray-900 shadow-sm'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  <TestTube className="w-4 h-4 text-[#3B6A52]" />
                  <span>Testing</span>
                  <span className="px-2 py-0.5 bg-[#3B6A52] text-white rounded-full text-xs">{testCases.length}</span>
                </button>
                <button
                  onClick={() => setActiveWorkspaceTab('status-reports')}
                  className={`px-4 py-2 rounded-md transition-colors flex items-center space-x-2 ${
                    activeWorkspaceTab === 'status-reports'
                      ? 'bg-white text-gray-900 shadow-sm'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  <FileText className="w-4 h-4 text-[#F9A03F]" />
                  <span>Status Reports</span>
                  {!isCurrentWeekReportSubmitted && (
                    <div className="w-2 h-2 bg-red-500 rounded-full" title="Report due this week" />
                  )}
                </button>
              </div>

              {/* Overview Tab */}
              {activeWorkspaceTab === 'overview' && (
                <div className="space-y-4">
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="bg-gray-50 rounded-lg p-4">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm text-gray-600">Linear Issues</span>
                        <Target className="w-5 h-5 text-[#5E6AD2]" />
                      </div>
                      <p className="text-2xl text-gray-900">{linearIssues.length}</p>
                      <div className="flex items-center space-x-2 text-xs text-gray-600 mt-1">
                        <span className="flex items-center space-x-1">
                          <CheckCircle className="w-3 h-3 text-[#3B6A52]" />
                          <span>{linearIssues.filter(i => i.status === 'done').length} done</span>
                        </span>
                        <span className="flex items-center space-x-1">
                          <Circle className="w-3 h-3 text-[#F9A03F]" />
                          <span>{linearIssues.filter(i => i.status === 'in-progress').length} active</span>
                        </span>
                      </div>
                    </div>
                    <div className="bg-gray-50 rounded-lg p-4">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm text-gray-600">Pull Requests</span>
                        <GitPullRequest className="w-5 h-5 text-gray-900" />
                      </div>
                      <p className="text-2xl text-gray-900">{githubPRs.length}</p>
                      <div className="flex items-center space-x-2 text-xs text-gray-600 mt-1">
                        <span className="flex items-center space-x-1">
                          <CheckCircle className="w-3 h-3 text-purple-600" />
                          <span>{githubPRs.filter(pr => pr.status === 'merged').length} merged</span>
                        </span>
                        <span className="flex items-center space-x-1">
                          <Circle className="w-3 h-3 text-green-600" />
                          <span>{githubPRs.filter(pr => pr.status === 'open').length} open</span>
                        </span>
                      </div>
                    </div>
                    <div className="bg-gray-50 rounded-lg p-4">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm text-gray-600">Code Changes</span>
                        <Code className="w-5 h-5 text-[#2C6975]" />
                      </div>
                      <p className="text-2xl text-gray-900">{githubPRs.reduce((acc, pr) => acc + pr.commits, 0)}</p>
                      <div className="flex items-center space-x-2 text-xs text-gray-600 mt-1">
                        <span className="text-green-600">+{githubPRs.reduce((acc, pr) => acc + pr.additions, 0)}</span>
                        <span className="text-red-600">-{githubPRs.reduce((acc, pr) => acc + pr.deletions, 0)}</span>
                        <span>commits</span>
                      </div>
                    </div>
                    <div className="bg-[#3B6A52]/5 border border-[#3B6A52]/20 rounded-lg p-4">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm text-gray-600">Test Coverage</span>
                        <TestTube className="w-5 h-5 text-[#3B6A52]" />
                      </div>
                      <p className="text-2xl text-gray-900">{testingMetrics.apexCoverage}%</p>
                      <div className="flex items-center space-x-2 text-xs text-gray-600 mt-1">
                        <span className={testingMetrics.apexCoverage >= testingMetrics.targetCoverage ? 'text-[#3B6A52]' : 'text-yellow-600'}>
                          Target: {testingMetrics.targetCoverage}%
                        </span>
                        <span>• {testCases.filter(t => t.status === 'failed').length} bugs</span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <div className="flex items-start space-x-3">
                      <Sparkles className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                      <div>
                        <h4 className="text-sm text-gray-900 mb-1">Integrated Project Management</h4>
                        <p className="text-sm text-gray-700">
                          Track your work in Linear and link issues to GitHub pull requests. This helps maintain clear traceability between your tasks and code changes.
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Mural Board Link Section */}
                  <div className="bg-gradient-to-br from-[#FF4563]/5 to-[#FF4563]/10 border-2 border-[#FF4563]/30 rounded-lg p-4">
                    <div className="flex items-start justify-between">
                      <div className="flex items-start space-x-3 flex-1">
                        <Layout className="w-5 h-5 text-[#FF4563] flex-shrink-0 mt-0.5" />
                        <div className="flex-1">
                          <h4 className="text-sm text-gray-900 mb-1">Project Mural Board</h4>
                          {!isEditingMural && !muralBoardUrl ? (
                            <div>
                              <p className="text-sm text-gray-600 mb-3">
                                Add a link to your project's Mural board for visual collaboration, wireframes, and planning.
                              </p>
                              <button
                                onClick={() => {
                                  setIsEditingMural(true);
                                  setTempMuralUrl('');
                                }}
                                className="flex items-center space-x-2 px-4 py-2 bg-[#FF4563] text-white rounded-lg hover:bg-[#e63d57] transition-colors text-sm"
                              >
                                <Layout className="w-4 h-4" />
                                <span>Add Mural Board Link</span>
                              </button>
                            </div>
                          ) : !isEditingMural && muralBoardUrl ? (
                            <div>
                              <a
                                href={muralBoardUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-sm text-[#FF4563] hover:underline flex items-center space-x-1 mb-2"
                              >
                                <span>{muralBoardUrl}</span>
                                <ExternalLink className="w-3 h-3" />
                              </a>
                              <div className="flex items-center space-x-2 mt-3">
                                <a
                                  href={muralBoardUrl}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="flex items-center space-x-2 px-4 py-2 bg-[#FF4563] text-white rounded-lg hover:bg-[#e63d57] transition-colors text-sm"
                                >
                                  <Layout className="w-4 h-4" />
                                  <span>Open Board</span>
                                </a>
                                <button
                                  onClick={() => {
                                    setIsEditingMural(true);
                                    setTempMuralUrl(muralBoardUrl);
                                  }}
                                  className="flex items-center space-x-2 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors text-sm"
                                >
                                  <Edit2 className="w-4 h-4" />
                                  <span>Edit Link</span>
                                </button>
                              </div>
                            </div>
                          ) : (
                            <div>
                              <input
                                type="url"
                                placeholder="https://app.mural.co/..."
                                value={tempMuralUrl}
                                onChange={(e) => setTempMuralUrl(e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF4563] focus:border-transparent text-sm mb-3"
                              />
                              <div className="flex items-center space-x-2">
                                <button
                                  onClick={() => {
                                    setMuralBoardUrl(tempMuralUrl);
                                    setIsEditingMural(false);
                                  }}
                                  className="flex items-center space-x-2 px-4 py-2 bg-[#FF4563] text-white rounded-lg hover:bg-[#e63d57] transition-colors text-sm"
                                >
                                  <Save className="w-4 h-4" />
                                  <span>Save Link</span>
                                </button>
                                <button
                                  onClick={() => {
                                    setIsEditingMural(false);
                                    setTempMuralUrl('');
                                  }}
                                  className="flex items-center space-x-2 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors text-sm"
                                >
                                  <X className="w-4 h-4" />
                                  <span>Cancel</span>
                                </button>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Linear Tab */}
              {activeWorkspaceTab === 'linear' && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between mb-4">
                    <p className="text-sm text-gray-600">Manage and track project issues in Linear</p>
                    <button className="flex items-center space-x-2 px-4 py-2 bg-[#5E6AD2] text-white rounded-lg hover:bg-[#4f5bc4] transition-colors text-sm">
                      <Target className="w-4 h-4" />
                      <span>Create Issue</span>
                    </button>
                  </div>

                  {linearIssues.map((issue) => (
                    <div key={issue.id} className="border border-gray-200 rounded-lg p-4 hover:border-[#5E6AD2] transition-colors">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex items-start space-x-3 flex-1">
                          <div className="mt-1">
                            {getLinearStatusIcon(issue.status)}
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center space-x-2 mb-1">
                              <span className="text-sm text-gray-500">{issue.id}</span>
                              <span className={`px-2 py-0.5 rounded-full text-xs ${getLinearStatusColor(issue.status)}`}>
                                {issue.status.replace('-', ' ')}
                              </span>
                              {issue.priority === 'high' && (
                                <span className="px-2 py-0.5 bg-red-100 text-red-700 rounded-full text-xs">High Priority</span>
                              )}
                            </div>
                            <h4 className="text-gray-900 mb-2">{issue.title}</h4>
                            <div className="flex flex-wrap items-center gap-3 text-xs text-gray-600">
                              <span className="flex items-center space-x-1">
                                <Users className="w-3 h-3" />
                                <span>{issue.assignee}</span>
                              </span>
                              <span className="flex items-center space-x-1">
                                <Clock className="w-3 h-3" />
                                <span>Est: {issue.estimate}h</span>
                              </span>
                              <span className="px-2 py-0.5 bg-gray-100 rounded-full">{issue.phase}</span>
                              {issue.labels.map((label, idx) => (
                                <span key={idx} className="px-2 py-0.5 bg-blue-50 text-blue-700 rounded-full">
                                  {label}
                                </span>
                              ))}
                            </div>
                          </div>
                        </div>
                        {issue.linkedPR && (
                          <div className="ml-4">
                            <div className="flex items-center space-x-2 px-3 py-1.5 bg-gray-50 rounded-lg text-xs">
                              <GitPullRequest className="w-3 h-3 text-gray-600" />
                              <span className="text-gray-700">{issue.linkedPR}</span>
                              <ArrowUpRight className="w-3 h-3 text-gray-400" />
                            </div>
                          </div>
                        )}
                      </div>
                      {issue.completedAt && (
                        <div className="text-xs text-gray-500 flex items-center space-x-1">
                          <CheckCircle className="w-3 h-3 text-[#3B6A52]" />
                          <span>Completed on {issue.completedAt}</span>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}

              {/* GitHub Tab */}
              {activeWorkspaceTab === 'github' && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between mb-4">
                    <p className="text-sm text-gray-600">Review and merge pull requests from GitHub</p>
                    <button className="flex items-center space-x-2 px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors text-sm">
                      <Github className="w-4 h-4" />
                      <span>New Pull Request</span>
                    </button>
                  </div>

                  {githubPRs.map((pr) => (
                    <div key={pr.number} className="border border-gray-200 rounded-lg p-4 hover:border-gray-900 transition-colors">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex items-start space-x-3 flex-1">
                          <GitPullRequest className="w-5 h-5 text-gray-600 mt-0.5" />
                          <div className="flex-1">
                            <div className="flex items-center space-x-2 mb-1">
                              <span className="text-sm text-gray-500">#{pr.number}</span>
                              <span className={`px-2 py-0.5 rounded-full text-xs ${getPRStatusColor(pr.status)}`}>
                                {pr.status}
                              </span>
                              {pr.checksStatus === 'pending' && (
                                <span className="px-2 py-0.5 bg-yellow-100 text-yellow-700 rounded-full text-xs">Checks Running</span>
                              )}
                            </div>
                            <h4 className="text-gray-900 mb-2">{pr.title}</h4>
                            <div className="flex flex-wrap items-center gap-3 text-xs text-gray-600 mb-2">
                              <span className="flex items-center space-x-1">
                                <Users className="w-3 h-3" />
                                <span>{pr.author}</span>
                              </span>
                              <span className="flex items-center space-x-1">
                                <Code className="w-3 h-3" />
                                <span>{pr.branch}</span>
                              </span>
                              <span className="flex items-center space-x-1">
                                <span className="text-green-600">+{pr.additions}</span>
                                <span className="text-red-600">-{pr.deletions}</span>
                              </span>
                              <span>{pr.commits} commits</span>
                            </div>
                            {pr.linkedIssue && (
                              <div className="flex items-center space-x-2 text-xs">
                                <span className="text-gray-500">Closes:</span>
                                <span className="px-2 py-0.5 bg-[#5E6AD2]/10 text-[#5E6AD2] rounded-full flex items-center space-x-1">
                                  <Target className="w-3 h-3" />
                                  <span>{pr.linkedIssue}</span>
                                </span>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                        <div className="flex items-center space-x-3 text-xs text-gray-600">
                          {pr.mergedAt ? (
                            <span className="flex items-center space-x-1 text-purple-600">
                              <CheckCircle className="w-3 h-3" />
                              <span>Merged on {pr.mergedAt}</span>
                            </span>
                          ) : (
                            <>
                              <span>Created {pr.createdAt}</span>
                              {pr.comments && <span>• {pr.comments} comments</span>}
                              <span>• Reviewed by {pr.reviewers.join(', ')}</span>
                            </>
                          )}
                        </div>
                        {pr.status === 'open' && (
                          <button className="px-3 py-1.5 bg-gray-900 text-white rounded-md hover:bg-gray-800 transition-colors text-xs">
                            Review Changes
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Testing Tab */}
              {activeWorkspaceTab === 'testing' && (
                <div className="space-y-6">
                  {/* Testing Overview */}
                  <div className="grid grid-cols-3 gap-4">
                    <div className="bg-[#3B6A52]/5 border border-[#3B6A52]/20 rounded-lg p-4">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm text-gray-600">Test Coverage</span>
                        <TestTube className="w-5 h-5 text-[#3B6A52]" />
                      </div>
                      <div className="flex items-baseline space-x-2">
                        <p className="text-2xl text-gray-900">{testingMetrics.apexCoverage}%</p>
                        <span className="text-xs text-gray-500">/ {testingMetrics.targetCoverage}% target</span>
                      </div>
                      <div className="mt-2 w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className={`h-2 rounded-full ${testingMetrics.apexCoverage >= testingMetrics.targetCoverage ? 'bg-[#3B6A52]' : 'bg-yellow-500'}`}
                          style={{ width: `${(testingMetrics.apexCoverage / testingMetrics.targetCoverage) * 100}%` }}
                        ></div>
                      </div>
                    </div>
                    <div className="bg-gray-50 rounded-lg p-4">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm text-gray-600">Test Cases</span>
                        <ClipboardCheck className="w-5 h-5 text-gray-600" />
                      </div>
                      <p className="text-2xl text-gray-900">{testCases.length}</p>
                      <div className="flex items-center space-x-2 text-xs text-gray-600 mt-1">
                        <span className="flex items-center space-x-1">
                          <CheckCircle className="w-3 h-3 text-[#3B6A52]" />
                          <span>{testCases.filter(t => t.status === 'passed').length} passed</span>
                        </span>
                        <span className="flex items-center space-x-1">
                          <AlertCircle className="w-3 h-3 text-red-600" />
                          <span>{testCases.filter(t => t.status === 'failed').length} failed</span>
                        </span>
                      </div>
                    </div>
                    <div className="bg-gray-50 rounded-lg p-4">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm text-gray-600">Bugs</span>
                        <Bug className="w-5 h-5 text-red-600" />
                      </div>
                      <p className="text-2xl text-gray-900">{bugs.filter(b => b.status !== 'resolved').length}</p>
                      <div className="flex items-center space-x-2 text-xs text-gray-600 mt-1">
                        <span className="text-red-600">{bugs.filter(b => b.severity === 'high').length} high</span>
                        <span className="text-yellow-600">{bugs.filter(b => b.severity === 'medium').length} medium</span>
                        <span className="text-blue-600">{bugs.filter(b => b.severity === 'low').length} low</span>
                      </div>
                    </div>
                  </div>

                  {/* Test Cases */}
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <h4 className="text-gray-900">Test Cases</h4>
                      <button className="flex items-center space-x-2 px-4 py-2 bg-[#3B6A52] text-white rounded-lg hover:bg-[#2d5440] transition-colors text-sm">
                        <ClipboardCheck className="w-4 h-4" />
                        <span>Create Test Case</span>
                      </button>
                    </div>
                    <div className="space-y-3">
                      {testCases.map((testCase) => (
                        <div key={testCase.id} className="border border-gray-200 rounded-lg p-4 hover:border-[#3B6A52] transition-colors">
                          <div className="flex items-start justify-between mb-2">
                            <div className="flex-1">
                              <div className="flex items-center space-x-2 mb-1">
                                <span className="text-sm text-gray-500">{testCase.id}</span>
                                <span className={`px-2 py-0.5 rounded-full text-xs ${getTestStatusColor(testCase.status)}`}>
                                  {testCase.status.replace('-', ' ')}
                                </span>
                                <span className="px-2 py-0.5 bg-gray-100 text-gray-700 rounded-full text-xs">
                                  {testCase.category}
                                </span>
                                {testCase.priority === 'high' && (
                                  <span className="px-2 py-0.5 bg-red-100 text-red-700 rounded-full text-xs">High Priority</span>
                                )}
                              </div>
                              <h5 className="text-gray-900 mb-2">{testCase.name}</h5>
                              <div className="flex flex-wrap items-center gap-3 text-xs text-gray-600">
                                <span className="flex items-center space-x-1">
                                  <Users className="w-3 h-3" />
                                  <span>{testCase.assignedTo}</span>
                                </span>
                                <span>{testCase.steps} steps</span>
                                {testCase.lastRun && <span>Last run: {testCase.lastRun}</span>}
                                {testCase.linkedIssue && (
                                  <span className="flex items-center space-x-1">
                                    <Target className="w-3 h-3 text-[#5E6AD2]" />
                                    <span>{testCase.linkedIssue}</span>
                                  </span>
                                )}
                              </div>
                              {testCase.failureReason && (
                                <div className="mt-2 p-2 bg-red-50 border border-red-200 rounded text-xs text-red-700">
                                  <strong>Failure:</strong> {testCase.failureReason}
                                </div>
                              )}
                            </div>
                            <button className="px-3 py-1.5 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 transition-colors text-xs">
                              Run Test
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Bugs */}
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <h4 className="text-gray-900">Bug Tracking</h4>
                      <button className="flex items-center space-x-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors text-sm">
                        <Bug className="w-4 h-4" />
                        <span>Report Bug</span>
                      </button>
                    </div>
                    <div className="space-y-3">
                      {bugs.map((bug) => (
                        <div key={bug.id} className={`border rounded-lg p-4 ${getBugSeverityColor(bug.severity)}`}>
                          <div className="flex items-start justify-between mb-2">
                            <div className="flex-1">
                              <div className="flex items-center space-x-2 mb-1">
                                <span className="text-sm">{bug.id}</span>
                                <span className={`px-2 py-0.5 rounded-full text-xs ${
                                  bug.status === 'resolved' ? 'bg-[#3B6A52] text-white' :
                                  bug.status === 'in-progress' ? 'bg-[#F9A03F] text-white' :
                                  'bg-gray-300 text-gray-700'
                                }`}>
                                  {bug.status}
                                </span>
                                <span className="px-2 py-0.5 bg-white/50 rounded-full text-xs capitalize">
                                  {bug.severity} severity
                                </span>
                              </div>
                              <h5 className="text-gray-900 mb-2">{bug.title}</h5>
                              <p className="text-sm text-gray-700 mb-2">{bug.description}</p>
                              <div className="flex flex-wrap items-center gap-3 text-xs">
                                <span>Reported by {bug.reportedBy}</span>
                                <span>{bug.reportedDate}</span>
                                {bug.resolvedDate && <span className="text-[#3B6A52]">Resolved: {bug.resolvedDate}</span>}
                                {bug.linkedTestCase && (
                                  <span className="flex items-center space-x-1">
                                    <TestTube className="w-3 h-3" />
                                    <span>{bug.linkedTestCase}</span>
                                  </span>
                                )}
                                {bug.linkedIssue && (
                                  <span className="flex items-center space-x-1">
                                    <Target className="w-3 h-3 text-[#5E6AD2]" />
                                    <span>{bug.linkedIssue}</span>
                                  </span>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* UAT Sessions */}
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <h4 className="text-gray-900">User Acceptance Testing Sessions</h4>
                      <button className="flex items-center space-x-2 px-4 py-2 bg-[#2C6975] text-white rounded-lg hover:bg-[#234f57] transition-colors text-sm">
                        <Calendar className="w-4 h-4" />
                        <span>Schedule UAT</span>
                      </button>
                    </div>
                    <div className="space-y-3">
                      {uatSessions.map((session) => (
                        <div key={session.id} className="border border-gray-200 rounded-lg p-4 hover:border-[#2C6975] transition-colors">
                          <div className="flex items-start justify-between mb-3">
                            <div className="flex-1">
                              <div className="flex items-center space-x-2 mb-1">
                                <UserCheck className="w-4 h-4 text-[#2C6975]" />
                                <h5 className="text-gray-900">{session.title}</h5>
                                {!session.prepared && (
                                  <span className="px-2 py-0.5 bg-yellow-100 text-yellow-700 rounded-full text-xs">
                                    Not Prepared
                                  </span>
                                )}
                              </div>
                              <div className="flex flex-wrap items-center gap-3 text-sm text-gray-600 mb-2">
                                <span className="flex items-center space-x-1">
                                  <Calendar className="w-4 h-4" />
                                  <span>{session.scheduledDate}</span>
                                </span>
                                <span className="flex items-center space-x-1">
                                  <Clock className="w-4 h-4" />
                                  <span>{session.duration}</span>
                                </span>
                              </div>
                              <div className="mb-2">
                                <p className="text-xs text-gray-500 mb-1">Participants:</p>
                                <div className="flex flex-wrap gap-2">
                                  {session.participants.map((participant, idx) => (
                                    <span key={idx} className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs">
                                      {participant}
                                    </span>
                                  ))}
                                </div>
                              </div>
                              <div>
                                <p className="text-xs text-gray-500 mb-1">Focus Areas:</p>
                                <div className="flex flex-wrap gap-2">
                                  {session.focusAreas.map((area, idx) => (
                                    <span key={idx} className="px-2 py-1 bg-blue-50 text-blue-700 rounded text-xs">
                                      {area}
                                    </span>
                                  ))}
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="flex gap-2 pt-3 border-t border-gray-100">
                            <button className="flex-1 px-3 py-2 bg-[#2C6975] text-white rounded-lg hover:bg-[#234f57] transition-colors text-sm">
                              Prepare Session
                            </button>
                            <button className="px-3 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors text-sm">
                              View Details
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Testing Best Practices */}
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <div className="flex items-start space-x-3">
                      <Lightbulb className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                      <div>
                        <h4 className="text-gray-900 mb-2">Testing Best Practices</h4>
                        <ul className="text-sm text-gray-700 space-y-1 list-disc list-inside">
                          <li>Write test cases before coding features (Test-Driven Development)</li>
                          <li>Aim for 85%+ code coverage for Salesforce deployment</li>
                          <li>Test both positive and negative scenarios</li>
                          <li>Document bugs with clear reproduction steps in Linear</li>
                          <li>Schedule UAT sessions at least 3 days in advance</li>
                          <li>Prepare UAT scripts and test data before each session</li>
                          <li>Collect detailed feedback from your nonprofit partner</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Status Reports Tab */}
              {activeWorkspaceTab === 'status-reports' && (
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600">Weekly status reports keep your team aligned and informed</p>
                      <p className="text-xs text-gray-500 mt-1">Reports are visible to your coach and nonprofit partner</p>
                    </div>
                  </div>

                  {/* Current Week Report - Submit Form */}
                  {!isCurrentWeekReportSubmitted && (
                    <div className="bg-gradient-to-r from-[#F9A03F]/10 to-[#F9A03F]/5 border-2 border-[#F9A03F] rounded-xl p-6">
                      <div className="flex items-start space-x-3 mb-4">
                        <AlertCircle className="w-6 h-6 text-[#F9A03F] flex-shrink-0 mt-0.5" />
                        <div className="flex-1">
                          <h4 className="text-gray-900 mb-1">Week {currentWeek} Status Report Required</h4>
                          <p className="text-sm text-gray-600 mb-4">{currentWeekDates} • Due by Sunday, Mar 16</p>
                          
                          {!isSubmittingReport ? (
                            <button
                              onClick={() => setIsSubmittingReport(true)}
                              className="flex items-center space-x-2 px-6 py-3 bg-[#F9A03F] text-white rounded-lg hover:bg-[#e89435] transition-colors"
                            >
                              <FileText className="w-4 h-4" />
                              <span>Submit This Week's Report</span>
                            </button>
                          ) : (
                            <div className="space-y-4 mt-4">
                              <div>
                                <label className="block text-sm text-gray-900 mb-2">
                                  What did you work on this week? <span className="text-red-600">*</span>
                                </label>
                                <textarea
                                  value={reportWorkCompleted}
                                  onChange={(e) => setReportWorkCompleted(e.target.value)}
                                  placeholder="Describe the tasks you completed, features you built, or deliverables you finished..."
                                  rows={4}
                                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#F9A03F] focus:border-transparent text-sm"
                                />
                              </div>
                              
                              <div>
                                <label className="block text-sm text-gray-900 mb-2">
                                  What are your next steps? <span className="text-red-600">*</span>
                                </label>
                                <textarea
                                  value={reportNextSteps}
                                  onChange={(e) => setReportNextSteps(e.target.value)}
                                  placeholder="Outline what you plan to work on next week and your goals..."
                                  rows={3}
                                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#F9A03F] focus:border-transparent text-sm"
                                />
                              </div>
                              
                              <div>
                                <label className="block text-sm text-gray-900 mb-2">
                                  Any blockers or challenges?
                                </label>
                                <textarea
                                  value={reportBlockers}
                                  onChange={(e) => setReportBlockers(e.target.value)}
                                  placeholder="List any obstacles, questions, or areas where you need help (or write 'None')..."
                                  rows={3}
                                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#F9A03F] focus:border-transparent text-sm"
                                />
                              </div>
                              
                              <div className="flex items-center space-x-3">
                                <button
                                  onClick={() => {
                                    // In real app, this would submit to backend
                                    alert('Status report submitted successfully!');
                                    setIsSubmittingReport(false);
                                    setReportWorkCompleted('');
                                    setReportNextSteps('');
                                    setReportBlockers('');
                                  }}
                                  disabled={!reportWorkCompleted || !reportNextSteps}
                                  className="flex items-center space-x-2 px-6 py-3 bg-[#3B6A52] text-white rounded-lg hover:bg-[#2f5542] transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
                                >
                                  <CheckCircle className="w-4 h-4" />
                                  <span>Submit Report</span>
                                </button>
                                <button
                                  onClick={() => {
                                    setIsSubmittingReport(false);
                                    setReportWorkCompleted('');
                                    setReportNextSteps('');
                                    setReportBlockers('');
                                  }}
                                  className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                                >
                                  Cancel
                                </button>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Historical Reports */}
                  <div>
                    <h4 className="text-gray-900 mb-4">Previous Reports</h4>
                    <div className="space-y-4">
                      {weeklyStatusReports.map((report) => (
                        <div key={report.id} className="bg-white border border-gray-200 rounded-lg p-6 hover:border-[#2C6975] transition-colors">
                          <div className="flex items-start justify-between mb-4">
                            <div>
                              <div className="flex items-center space-x-3 mb-1">
                                <h5 className="text-gray-900">Week {report.weekNumber} Status Report</h5>
                                <span className="px-2 py-0.5 bg-[#3B6A52] text-white rounded-full text-xs">
                                  Submitted
                                </span>
                              </div>
                              <p className="text-sm text-gray-600">{report.weekDates}</p>
                              <p className="text-xs text-gray-500">Submitted on {report.submittedDate}</p>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Users className="w-4 h-4 text-gray-400" />
                              <span className="text-xs text-gray-600">{report.viewedBy.length} views</span>
                            </div>
                          </div>

                          <div className="space-y-4">
                            <div>
                              <h6 className="text-sm text-gray-900 mb-2 flex items-center space-x-2">
                                <CheckCircle className="w-4 h-4 text-[#3B6A52]" />
                                <span>Work Completed</span>
                              </h6>
                              <p className="text-sm text-gray-700 pl-6">{report.workCompleted}</p>
                            </div>

                            <div>
                              <h6 className="text-sm text-gray-900 mb-2 flex items-center space-x-2">
                                <Target className="w-4 h-4 text-[#2C6975]" />
                                <span>Next Steps</span>
                              </h6>
                              <p className="text-sm text-gray-700 pl-6">{report.nextSteps}</p>
                            </div>

                            <div>
                              <h6 className="text-sm text-gray-900 mb-2 flex items-center space-x-2">
                                <AlertCircle className="w-4 h-4 text-[#F9A03F]" />
                                <span>Blockers</span>
                              </h6>
                              <p className="text-sm text-gray-700 pl-6">{report.blockers}</p>
                            </div>

                            {report.coachFeedback && (
                              <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                                <div className="flex items-start space-x-2">
                                  <MessageCircle className="w-4 h-4 text-blue-600 flex-shrink-0 mt-0.5" />
                                  <div>
                                    <p className="text-sm text-gray-900 mb-1">Coach Feedback</p>
                                    <p className="text-sm text-gray-700">{report.coachFeedback}</p>
                                  </div>
                                </div>
                              </div>
                            )}

                            <div className="mt-4 pt-4 border-t border-gray-100">
                              <p className="text-xs text-gray-500">Viewed by: {report.viewedBy.join(', ')}</p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Status Report Guidelines */}
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <div className="flex items-start space-x-3">
                      <Lightbulb className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                      <div>
                        <h4 className="text-gray-900 mb-2">Status Report Best Practices</h4>
                        <ul className="text-sm text-gray-700 space-y-1 list-disc list-inside">
                          <li>Submit your report by the end of each week (Sunday)</li>
                          <li>Be specific about accomplishments - include metrics and deliverables</li>
                          <li>Set clear, measurable goals for the upcoming week</li>
                          <li>Don't be afraid to highlight blockers - your team wants to help!</li>
                          <li>Reference Linear issues and GitHub PRs when relevant</li>
                          <li>Keep your nonprofit partner informed about features affecting them</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Project Phases */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h3 className="text-gray-900 mb-6">Project Phases & Timeline</h3>
              
              <Tabs defaultValue="timeline" className="w-full">
                <TabsList className="mb-6">
                  <TabsTrigger value="timeline">Timeline View</TabsTrigger>
                  <TabsTrigger value="details">Detailed View</TabsTrigger>
                </TabsList>
                
                <TabsContent value="timeline">
                  <div className="space-y-4">
                    {capstoneProject.phases.map((phase, index) => (
                      <div key={phase.id} className="relative">
                        {/* Timeline Line */}
                        {index < capstoneProject.phases.length - 1 && (
                          <div className="absolute left-[19px] top-12 w-0.5 h-full bg-gray-200"></div>
                        )}
                        
                        <div className="flex items-start space-x-4">
                          {/* Timeline Dot */}
                          <div className={`w-10 h-10 rounded-full ${
                            phase.status === 'completed' ? 'bg-[#3B6A52]' :
                            phase.status === 'in-progress' ? 'bg-[#F9A03F]' :
                            'bg-gray-300'
                          } text-white flex items-center justify-center flex-shrink-0 shadow-lg relative z-10`}>
                            {getPhaseStatusIcon(phase.status)}
                          </div>
                          
                          {/* Phase Card */}
                          <div className="flex-1 pb-8">
                            <div className={`rounded-lg border-2 p-4 ${
                              phase.status === 'in-progress' ? 'border-[#F9A03F] bg-[#F9A03F]/5' : 'border-gray-200 bg-white'
                            }`}>
                              <div className="flex items-start justify-between mb-3">
                                <div>
                                  <div className="flex items-center space-x-3 mb-1">
                                    <h4 className="text-gray-900">{phase.name}</h4>
                                    <span className={`px-2 py-1 rounded-full text-xs ${getPhaseStatusColor(phase.status)}`}>
                                      {phase.status === 'in-progress' ? 'In Progress' :
                                       phase.status === 'upcoming' ? 'Upcoming' : 'Completed'}
                                    </span>
                                  </div>
                                  <p className="text-sm text-gray-600">{phase.weeks} • Due: {phase.dueDate}</p>
                                </div>
                                <div className="text-right">
                                  <p className="text-sm text-gray-900">{phase.earned} / {phase.points} pts</p>
                                  <p className="text-xs text-gray-500">{Math.round((phase.earned / phase.points) * 100)}%</p>
                                </div>
                              </div>
                              
                              {/* Progress Bar */}
                              <div className="w-full bg-gray-100 rounded-full h-2 mb-3">
                                <div 
                                  className={`h-2 rounded-full ${
                                    phase.status === 'completed' ? 'bg-[#3B6A52]' :
                                    phase.status === 'in-progress' ? 'bg-[#F9A03F]' :
                                    'bg-gray-300'
                                  }`}
                                  style={{ width: `${(phase.earned / phase.points) * 100}%` }}
                                ></div>
                              </div>
                              
                              {/* Tasks Summary */}
                              <div className="flex items-center space-x-4 text-sm text-gray-600">
                                <span>{phase.tasks.filter(t => t.completed).length} / {phase.tasks.length} tasks complete</span>
                                {phase.status === 'completed' && phase.completedDate && (
                                  <span className="text-[#3B6A52]">✓ Completed {phase.completedDate}</span>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </TabsContent>
                
                <TabsContent value="details">
                  <div className="space-y-6">
                    {capstoneProject.phases.map((phase) => (
                      <div key={phase.id} className={`rounded-xl border-2 overflow-hidden ${
                        phase.status === 'in-progress' ? 'border-[#F9A03F]' : 'border-gray-200'
                      }`}>
                        {/* Phase Header */}
                        <div className={`p-6 ${
                          phase.status === 'completed' ? 'bg-[#3B6A52]/10' :
                          phase.status === 'in-progress' ? 'bg-[#F9A03F]/10' :
                          'bg-gray-50'
                        }`}>
                          <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center space-x-3">
                              <h4 className="text-gray-900">{phase.name}</h4>
                              <span className={`px-3 py-1 rounded-full text-xs ${getPhaseStatusColor(phase.status)}`}>
                                {phase.status === 'in-progress' ? 'In Progress' :
                                 phase.status === 'upcoming' ? 'Upcoming' : 'Completed'}
                              </span>
                            </div>
                            <div className="text-right">
                              <p className="text-sm text-gray-900">{phase.earned} / {phase.points} points</p>
                            </div>
                          </div>
                          <p className="text-sm text-gray-600">{phase.weeks} • Due: {phase.dueDate}</p>
                        </div>

                        {/* Phase Content */}
                        <div className="p-6 bg-white">
                          {/* Tasks */}
                          <div className="mb-6">
                            <h5 className="text-sm text-gray-700 mb-3">Tasks</h5>
                            <div className="space-y-2">
                              {phase.tasks.map((task, idx) => (
                                <div key={idx} className="flex items-center space-x-3">
                                  <div className={`w-5 h-5 rounded-full flex items-center justify-center ${
                                    task.completed ? 'bg-[#3B6A52]' : 'border-2 border-gray-300'
                                  }`}>
                                    {task.completed && (
                                      <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                                      </svg>
                                    )}
                                  </div>
                                  <span className={`text-sm ${task.completed ? 'text-gray-700' : 'text-gray-500'}`}>
                                    {task.name}
                                  </span>
                                </div>
                              ))}
                            </div>
                          </div>

                          {/* Deliverables */}
                          {phase.deliverables && phase.deliverables.length > 0 && (
                            <div className="mb-6">
                              <h5 className="text-sm text-gray-700 mb-3">Deliverables</h5>
                              <div className="space-y-2">
                                {phase.deliverables.map((deliverable, idx) => (
                                  <div key={idx} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                                    <div className="flex items-center space-x-3">
                                      {deliverable.status === 'submitted' && <CheckCircle className="w-4 h-4 text-[#3B6A52]" />}
                                      {deliverable.status === 'in-progress' && <AlertCircle className="w-4 h-4 text-[#F9A03F]" />}
                                      {deliverable.status === 'pending' && <div className="w-4 h-4 rounded-full border-2 border-gray-300"></div>}
                                      <span className="text-sm text-gray-900">{deliverable.name}</span>
                                    </div>
                                    <span className="text-xs text-gray-500 capitalize">{deliverable.status}</span>
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}

                          {/* Coach Feedback */}
                          {phase.coachFeedback && (
                            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                              <div className="flex items-start space-x-2">
                                <MessageCircle className="w-4 h-4 text-blue-600 flex-shrink-0 mt-0.5" />
                                <div>
                                  <p className="text-xs text-blue-600 mb-1">Coach Feedback</p>
                                  <p className="text-sm text-gray-700">{phase.coachFeedback}</p>
                                </div>
                              </div>
                            </div>
                          )}

                          {/* Action Buttons */}
                          {phase.status === 'in-progress' && (
                            <div className="flex gap-3 mt-4 pt-4 border-t border-gray-200">
                              <button className="flex-1 bg-[#2C6975] text-white px-4 py-2 rounded-lg hover:bg-[#234f57] transition-colors text-sm">
                                Submit Deliverable
                              </button>
                              <button className="px-4 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50 transition-colors text-sm">
                                Get Help
                              </button>
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          </div>

          {/* Right Sidebar */}
          <div className="space-y-6">
            {/* Resources - Collapsible */}
            <Collapsible open={isResourcesOpen} onOpenChange={setIsResourcesOpen}>
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                <CollapsibleTrigger className="w-full p-6 flex items-center justify-between hover:bg-gray-50 transition-colors">
                  <h3 className="text-gray-900">Project Resources</h3>
                  <ChevronDown className={`w-5 h-5 text-gray-400 transition-transform ${isResourcesOpen ? 'rotate-180' : ''}`} />
                </CollapsibleTrigger>
                <CollapsibleContent>
                  <div className="px-6 pb-6 space-y-3">
                    {capstoneProject.resources.map((resource, index) => {
                      const Icon = resource.icon;
                      return (
                        <div key={index} className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer">
                          <Icon className="w-5 h-5 text-[#2C6975] flex-shrink-0 mt-0.5" />
                          <div className="flex-1 min-w-0">
                            <p className="text-sm text-gray-900">{resource.name}</p>
                            <p className="text-xs text-gray-600 truncate">{resource.value}</p>
                          </div>
                          <ExternalLink className="w-4 h-4 text-gray-400 flex-shrink-0" />
                        </div>
                      );
                    })}
                  </div>
                </CollapsibleContent>
              </div>
            </Collapsible>

            {/* Upcoming Milestones */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h3 className="text-gray-900 mb-4">Upcoming Milestones</h3>
              <div className="space-y-3">
                <div className="p-3 bg-[#F9A03F]/10 border-l-4 border-[#F9A03F] rounded">
                  <p className="text-sm text-gray-900 mb-1">Current Phase Due</p>
                  <p className="text-xs text-gray-600">Mar 21, 2025 (16 days)</p>
                </div>
                <div className="p-3 bg-gray-50 border-l-4 border-gray-300 rounded">
                  <p className="text-sm text-gray-900 mb-1">Next Coach Check-in</p>
                  <p className="text-xs text-gray-600">Mar 14, 2025</p>
                </div>
                <div className="p-3 bg-gray-50 border-l-4 border-gray-300 rounded">
                  <p className="text-sm text-gray-900 mb-1">Final Presentation</p>
                  <p className="text-xs text-gray-600">Apr 8, 2025</p>
                </div>
              </div>
            </div>

            {/* Tips & Support */}
            <div className="bg-[#7EB5C1]/10 border border-[#7EB5C1]/30 rounded-xl p-6">
              <h3 className="text-gray-900 mb-3 flex items-center space-x-2">
                <Sparkles className="w-5 h-5 text-[#2C6975]" />
                <span>Project Tips</span>
              </h3>
              <ul className="space-y-2 text-sm text-gray-700">
                <li>• Break down large tasks into smaller pieces</li>
                <li>• Schedule weekly check-ins with your coach</li>
                <li>• Document your work as you go</li>
                <li>• Test frequently and get peer reviews</li>
                <li>• Use Slack for team collaboration</li>
              </ul>
              <button className="w-full mt-4 bg-[#2C6975] text-white px-4 py-2 rounded-lg hover:bg-[#234d56] transition-colors text-sm">
                Schedule Coach Session
              </button>
            </div>

            {/* Peer Review Group */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h3 className="text-gray-900 mb-4">Peer Review Group</h3>
              <div className="space-y-3">
                {['Jordan Kim', 'Sam Chen', 'Taylor Rodriguez', 'Casey Park'].map((peer, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#2C6975] to-[#7EB5C1] text-white flex items-center justify-center text-xs">
                      {peer.split(' ').map(n => n[0]).join('')}
                    </div>
                    <span className="text-sm text-gray-900">{peer}</span>
                  </div>
                ))}
              </div>
              <button className="w-full mt-4 bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200 transition-colors text-sm">
                <MessageCircle className="w-4 h-4 inline mr-2" />
                Open Group Chat
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* PDF Generation Modal */}
      <Dialog open={isPdfModalOpen} onOpenChange={setIsPdfModalOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#F9A03F] to-[#e89135] text-white flex items-center justify-center">
                <Sparkles className="w-5 h-5" />
              </div>
              <span>Generate Capstone Summary with Penny</span>
            </DialogTitle>
            <DialogDescription>
              Create a comprehensive PDF summary of your capstone project work including all key deliverables, metrics, and achievements.
            </DialogDescription>
          </DialogHeader>

          {!isGeneratingPdf && !pdfGenerated && (
            <div className="space-y-6 py-4">
              {/* Sections Checklist */}
              <div>
                <h3 className="text-gray-900 mb-3 flex items-center space-x-2">
                  <CheckSquare className="w-4 h-4 text-[#2C6975]" />
                  <span>Include Sections</span>
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-center space-x-3">
                    <Checkbox 
                      id="executiveSummary"
                      checked={pdfSections.executiveSummary}
                      onCheckedChange={(checked) => setPdfSections({...pdfSections, executiveSummary: checked as boolean})}
                    />
                    <Label htmlFor="executiveSummary" className="text-sm cursor-pointer">Executive Summary</Label>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Checkbox 
                      id="valueImpact"
                      checked={pdfSections.valueImpact}
                      onCheckedChange={(checked) => setPdfSections({...pdfSections, valueImpact: checked as boolean})}
                    />
                    <Label htmlFor="valueImpact" className="text-sm cursor-pointer">Value & Impact</Label>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Checkbox 
                      id="scope"
                      checked={pdfSections.scope}
                      onCheckedChange={(checked) => setPdfSections({...pdfSections, scope: checked as boolean})}
                    />
                    <Label htmlFor="scope" className="text-sm cursor-pointer">Project Scope</Label>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Checkbox 
                      id="prd"
                      checked={pdfSections.prd}
                      onCheckedChange={(checked) => setPdfSections({...pdfSections, prd: checked as boolean})}
                    />
                    <Label htmlFor="prd" className="text-sm cursor-pointer">PRD (Product Requirements)</Label>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Checkbox 
                      id="architecture"
                      checked={pdfSections.architecture}
                      onCheckedChange={(checked) => setPdfSections({...pdfSections, architecture: checked as boolean})}
                    />
                    <Label htmlFor="architecture" className="text-sm cursor-pointer">Solution Architecture</Label>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Checkbox 
                      id="implementation"
                      checked={pdfSections.implementation}
                      onCheckedChange={(checked) => setPdfSections({...pdfSections, implementation: checked as boolean})}
                    />
                    <Label htmlFor="implementation" className="text-sm cursor-pointer">Implementation Details</Label>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Checkbox 
                      id="testing"
                      checked={pdfSections.testing}
                      onCheckedChange={(checked) => setPdfSections({...pdfSections, testing: checked as boolean})}
                    />
                    <Label htmlFor="testing" className="text-sm cursor-pointer">Testing & QA</Label>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Checkbox 
                      id="metrics"
                      checked={pdfSections.metrics}
                      onCheckedChange={(checked) => setPdfSections({...pdfSections, metrics: checked as boolean})}
                    />
                    <Label htmlFor="metrics" className="text-sm cursor-pointer">Metrics & Outcomes</Label>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Checkbox 
                      id="githubPRs"
                      checked={pdfSections.githubPRs}
                      onCheckedChange={(checked) => setPdfSections({...pdfSections, githubPRs: checked as boolean})}
                    />
                    <Label htmlFor="githubPRs" className="text-sm cursor-pointer">GitHub & PR Links</Label>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Checkbox 
                      id="screenshots"
                      checked={pdfSections.screenshots}
                      onCheckedChange={(checked) => setPdfSections({...pdfSections, screenshots: checked as boolean})}
                    />
                    <Label htmlFor="screenshots" className="text-sm cursor-pointer">Screenshots & Appendix</Label>
                  </div>
                </div>
              </div>

              {/* Trailhead Toggle */}
              <div className="bg-[#F9A03F]/10 border border-[#F9A03F]/30 rounded-lg p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <Trophy className="w-5 h-5 text-[#F9A03F]" />
                    <div>
                      <Label htmlFor="trailhead-toggle" className="text-sm cursor-pointer">Include Trailhead Achievements</Label>
                      <p className="text-xs text-gray-600">Show your completed badges and modules</p>
                    </div>
                  </div>
                  <Switch 
                    id="trailhead-toggle"
                    checked={includeTrailhead}
                    onCheckedChange={setIncludeTrailhead}
                  />
                </div>
              </div>

              {/* Notes Field */}
              <div>
                <Label htmlFor="pdf-notes" className="text-sm mb-2 block">Add Notes or Special Highlights</Label>
                <Textarea 
                  id="pdf-notes"
                  value={pdfNotes}
                  onChange={(e) => setPdfNotes(e.target.value)}
                  placeholder="Add any specific accomplishments, learnings, or context you'd like to highlight in your summary..."
                  className="min-h-[100px]"
                />
                <p className="text-xs text-gray-500 mt-2">Optional: Penny will incorporate these highlights throughout your summary</p>
              </div>

              {/* Penny's Inline Hints */}
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <div className="flex items-start space-x-3">
                  <Sparkles className="w-5 h-5 text-[#F9A03F] flex-shrink-0 mt-0.5" />
                  <div className="space-y-2">
                    <p className="text-sm text-gray-900">
                      <span className="font-medium">Penny's Tips:</span>
                    </p>
                    <ul className="text-sm text-gray-700 space-y-1">
                      <li>• Want a tighter executive summary? Focus on impact metrics and key technical decisions</li>
                      <li>• Including your testing section will showcase your understanding of QA best practices</li>
                      <li>• Screenshots help tell your story—I'll pull recent ones from your submissions</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                <button
                  onClick={() => setIsPdfModalOpen(false)}
                  className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleGeneratePdf}
                  className="px-6 py-2 bg-gradient-to-r from-[#F9A03F] to-[#e89135] text-white rounded-lg hover:from-[#e89135] hover:to-[#d88230] transition-all flex items-center space-x-2 shadow-md"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>Generate PDF</span>
                </button>
              </div>
            </div>
          )}

          {/* Generating State */}
          {isGeneratingPdf && (
            <div className="py-12">
              <div className="max-w-md mx-auto text-center space-y-6">
                <div className="w-20 h-20 rounded-full bg-gradient-to-br from-[#F9A03F] to-[#e89135] text-white flex items-center justify-center mx-auto shadow-lg animate-pulse">
                  <Sparkles className="w-10 h-10" />
                </div>
                <div>
                  <h3 className="text-gray-900 mb-2">Penny is working her magic...</h3>
                  <p className="text-sm text-gray-600 mb-4">{pdfGenerationStep}</p>
                  <Progress value={pdfGenerationProgress} className="h-3" />
                  <p className="text-xs text-gray-500 mt-2">{pdfGenerationProgress}% complete</p>
                </div>
              </div>
            </div>
          )}

          {/* Success State */}
          {pdfGenerated && (
            <div className="py-6 space-y-6">
              {/* Success Message */}
              <div className="bg-green-50 border border-green-200 rounded-lg p-6 text-center">
                <div className="w-16 h-16 rounded-full bg-green-100 text-green-600 flex items-center justify-center mx-auto mb-4">
                  <CheckCircle className="w-8 h-8" />
                </div>
                <h3 className="text-gray-900 mb-2">PDF Generated Successfully!</h3>
                <p className="text-sm text-gray-600">
                  Your comprehensive capstone summary is ready. Penny has compiled all your amazing work into a professional document.
                </p>
              </div>

              {/* PDF Preview */}
              <div className="border-2 border-gray-300 rounded-lg p-6 bg-gray-50">
                <div className="flex items-center space-x-4 mb-4">
                  <div className="w-24 h-32 bg-white border border-gray-300 rounded shadow-sm flex items-center justify-center">
                    <FileText className="w-12 h-12 text-gray-400" />
                  </div>
                  <div className="flex-1">
                    <h4 className="text-gray-900 mb-1">Capstone_Summary_AlexJohnson_Mar2025.pdf</h4>
                    <p className="text-sm text-gray-600 mb-2">Generated on {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric', hour: 'numeric', minute: '2-digit' })}</p>
                    <div className="flex items-center space-x-4 text-xs text-gray-500">
                      <span>4.8 MB</span>
                      <span>•</span>
                      <span>{Object.values(pdfSections).filter(Boolean).length} sections</span>
                      <span>•</span>
                      <span>{includeTrailhead ? 'Includes' : 'Excludes'} Trailhead</span>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="grid grid-cols-3 gap-3">
                  <button className="flex items-center justify-center space-x-2 bg-[#2C6975] text-white px-4 py-3 rounded-lg hover:bg-[#234f57] transition-colors">
                    <Download className="w-4 h-4" />
                    <span>Download PDF</span>
                  </button>
                  <button className="flex items-center justify-center space-x-2 bg-[#F9A03F] text-white px-4 py-3 rounded-lg hover:bg-[#e89135] transition-colors">
                    <Folder className="w-4 h-4" />
                    <span>Save to Portfolio</span>
                  </button>
                  <button 
                    onClick={() => {
                      setPdfGenerated(false);
                      setPdfGenerationProgress(0);
                    }}
                    className="flex items-center justify-center space-x-2 border-2 border-gray-300 text-gray-700 px-4 py-3 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <RefreshCw className="w-4 h-4" />
                    <span>Regenerate</span>
                  </button>
                </div>
              </div>

              {/* History List */}
              <div>
                <h4 className="text-gray-900 mb-3 flex items-center space-x-2">
                  <Clock className="w-4 h-4 text-[#2C6975]" />
                  <span>Previous Versions</span>
                </h4>
                <div className="space-y-2">
                  {pdfHistory.map((pdf) => (
                    <div key={pdf.id} className="flex items-center justify-between p-3 bg-white border border-gray-200 rounded-lg hover:border-[#2C6975] transition-colors">
                      <div className="flex items-center space-x-3">
                        <FileText className="w-5 h-5 text-gray-400" />
                        <div>
                          <p className="text-sm text-gray-900">{pdf.id}</p>
                          <div className="flex items-center space-x-3 text-xs text-gray-500">
                            <span>{pdf.timestamp}</span>
                            <span>•</span>
                            <span>{pdf.size}</span>
                            <span>•</span>
                            <span>{pdf.sections} sections</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <button 
                          className="p-2 text-gray-600 hover:text-[#2C6975] hover:bg-gray-100 rounded transition-colors"
                          aria-label="Quick view"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        <button 
                          className="p-2 text-gray-600 hover:text-[#2C6975] hover:bg-gray-100 rounded transition-colors"
                          aria-label="Download"
                        >
                          <Download className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Close Button */}
              <div className="flex justify-end pt-4 border-t border-gray-200">
                <button
                  onClick={handleClosePdfModal}
                  className="px-6 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
                >
                  Close
                </button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
