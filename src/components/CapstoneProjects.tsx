import { ArrowLeft, FileText, Clock, Users, Code, CheckCircle, AlertCircle, Trophy, Target, Sparkles, ExternalLink, Download, MessageCircle, Calendar, Github, Database, Zap, CheckSquare, ChevronDown, ChevronUp, Play, GitPullRequest, AlertTriangle, Edit2, Share2, Copy, Linkedin, TrendingUp, BookOpen, Layout, Eye } from 'lucide-react';
import { PageType } from '../App';
import { ProgressRing } from './ProgressRing';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from './ui/collapsible';
import { useState } from 'react';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { Textarea } from './ui/textarea';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from './ui/dialog';
import { toast } from 'sonner@2.0.3';

interface CapstoneProjectsProps {
  onNavigate: (page: PageType) => void;
}

export function CapstoneProjects({ onNavigate }: CapstoneProjectsProps) {
  const [isPennySummaryOpen, setIsPennySummaryOpen] = useState(true);
  const [isGeneratingSummary, setIsGeneratingSummary] = useState(false);
  const [generationProgress, setGenerationProgress] = useState(0);
  const [summaryGenerated, setSummaryGenerated] = useState(false);
  const [isVersionHistoryOpen, setIsVersionHistoryOpen] = useState(false);
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const [shareText, setShareText] = useState('');

  // Main Capstone Project
  const capstoneProject = {
    title: 'Community Service Volunteer Management System',
    description: 'Build a comprehensive Salesforce application to manage volunteer programs, track service hours, and coordinate community events for a local nonprofit organization.',
    nonprofit: 'Hearts & Hands Community Services',
    coach: 'Sarah Martinez',
    status: 'in-progress' as const,
    progress: 52,
    pointsTotal: 1400,
    pointsEarned: 728,
    startDate: 'Feb 1, 2025',
    dueDate: 'Apr 8, 2025',
    daysRemaining: 32,
  };

  // Project phases
  const phases = [
    {
      id: 1,
      name: 'Discovery & Planning',
      status: 'completed' as const,
      progress: 100,
      points: 200,
      dueDate: 'Feb 14, 2025',
      tasks: [
        { name: 'Stakeholder interviews', completed: true },
        { name: 'Requirements documentation', completed: true },
        { name: 'Data model design', completed: true },
        { name: 'User stories creation', completed: true },
      ],
    },
    {
      id: 2,
      name: 'Data Architecture',
      status: 'completed' as const,
      progress: 100,
      points: 250,
      dueDate: 'Feb 28, 2025',
      tasks: [
        { name: 'Custom objects setup', completed: true },
        { name: 'Relationships defined', completed: true },
        { name: 'Security model designed', completed: true },
        { name: 'Validation rules created', completed: true },
      ],
    },
    {
      id: 3,
      name: 'Automation & Logic',
      status: 'in-progress' as const,
      progress: 65,
      points: 350,
      dueDate: 'Mar 21, 2025',
      tasks: [
        { name: 'Flow automation built', completed: true },
        { name: 'Apex triggers developed', completed: true },
        { name: 'Process Builder logic', completed: false },
        { name: 'Email alerts configured', completed: false },
      ],
    },
    {
      id: 4,
      name: 'User Interface',
      status: 'not-started' as const,
      progress: 0,
      points: 300,
      dueDate: 'Apr 1, 2025',
      tasks: [
        { name: 'Lightning pages created', completed: false },
        { name: 'Custom components built', completed: false },
        { name: 'Mobile optimization', completed: false },
        { name: 'User acceptance testing', completed: false },
      ],
    },
    {
      id: 5,
      name: 'Testing & Deployment',
      status: 'not-started' as const,
      progress: 0,
      points: 300,
      dueDate: 'Apr 8, 2025',
      tasks: [
        { name: 'Unit tests written', completed: false },
        { name: 'Integration testing', completed: false },
        { name: 'UAT with nonprofit', completed: false },
        { name: 'Production deployment', completed: false },
      ],
    },
  ];

  // GitHub & Linear Stats
  const projectStats = {
    linearIssues: { total: 24, completed: 15, inProgress: 6, blocked: 3 },
    githubPRs: { total: 12, merged: 8, open: 3, draft: 1 },
    commits: 47,
    linesOfCode: 2340,
    testCoverage: 78,
  };

  // Penny's critical alerts
  const pennyAlerts = [
    {
      type: 'critical' as const,
      title: 'UAT Scheduling Needed',
      message: 'You haven\'t scheduled UAT with your nonprofit partner yet. Phase 4 starts in 10 days - book time with Maria Chen ASAP!',
      action: 'Schedule Meeting',
    },
    {
      type: 'warning' as const,
      title: 'Test Coverage Gap',
      message: 'Current test coverage is 78%. You need 80% minimum for certification submission. Add 3-4 more test classes.',
      action: 'View Test Plan',
    },
    {
      type: 'info' as const,
      title: 'Documentation Opportunity',
      message: 'Your Flow automation is complex - add inline comments to help your coach review it effectively.',
      action: 'Review Code',
    },
  ];

  // Version history
  const summaryVersions = [
    {
      version: 3,
      date: 'Mar 5, 2025',
      generatedBy: 'Penny AI',
      wordCount: 487,
      highlights: ['Added automation metrics', 'Updated test coverage', 'Included stakeholder feedback'],
    },
    {
      version: 2,
      date: 'Feb 20, 2025',
      generatedBy: 'Penny AI',
      wordCount: 423,
      highlights: ['Data model completion', 'Security implementation', 'First PR merged'],
    },
    {
      version: 1,
      date: 'Feb 10, 2025',
      generatedBy: 'Penny AI',
      wordCount: 356,
      highlights: ['Initial discovery', 'Requirements gathering', 'Stakeholder interviews'],
    },
  ];

  // Generated summary content
  const generatedSummary = {
    executiveSummary: 'Designed and implemented a volunteer management system for Hearts & Hands Community Services, a local nonprofit serving 500+ volunteers across 12 community programs. The Salesforce-based solution automates volunteer onboarding, tracks service hours, and provides real-time reporting for program coordinators.',
    
    valueProposition: 'This system reduces administrative overhead by 60%, allowing staff to focus on community impact rather than spreadsheet management. Automated matching between volunteer skills and opportunities increases placement efficiency by 40%.',
    
    technicalHighlights: [
      'Built 5 custom objects with complex relationships (Volunteers, Opportunities, Shifts, Hours, Programs)',
      'Implemented Flow automation for volunteer matching based on skills, availability, and location',
      'Developed 3 Apex triggers for data validation and automated hour calculation',
      'Created custom Lightning Web Components for volunteer self-service portal',
      'Designed role-based security model with sharing rules for multi-program coordination',
      'Achieved 78% test coverage with 23 test classes and 145 assertions',
    ],
    
    challenges: [
      'Complex data migration from Excel spreadsheets with inconsistent formatting - solved with custom data loader scripts and validation rules',
      'Performance optimization for hour calculation trigger handling bulk operations - implemented batch processing pattern',
      'Nonprofit staff had limited Salesforce experience - created training documentation and conducted 3 hands-on sessions',
    ],
    
    learnings: [
      'Importance of stakeholder communication in requirements gathering',
      'Best practices for governor limit optimization in trigger design',
      'Value of iterative development with frequent user feedback',
      'How to balance declarative vs. programmatic solutions',
    ],
    
    nextSteps: [
      'Complete UI development and mobile optimization (Phase 4)',
      'Conduct comprehensive UAT with 5 nonprofit staff members',
      'Increase test coverage to 80% minimum',
      'Prepare deployment checklist and rollback plan',
    ],
  };

  const handleGenerateSummary = () => {
    setIsGeneratingSummary(true);
    setGenerationProgress(0);
    setPdfGenerationStep('Analyzing your Linear issues...');

    const steps = [
      { progress: 20, text: 'Analyzing your Linear issues...' },
      { progress: 40, text: 'Reviewing GitHub commits and PRs...' },
      { progress: 60, text: 'Compiling technical achievements...' },
      { progress: 80, text: 'Generating narrative summary...' },
      { progress: 100, text: 'Finalizing document...' },
    ];

    let currentStep = 0;
    const interval = setInterval(() => {
      if (currentStep < steps.length) {
        setGenerationProgress(steps[currentStep].progress);
        setPdfGenerationStep(steps[currentStep].text);
        currentStep++;
      } else {
        clearInterval(interval);
        setIsGeneratingSummary(false);
        setSummaryGenerated(true);
        toast.success('Summary generated successfully!');
      }
    }, 800);
  };

  const [pdfGenerationStep, setPdfGenerationStep] = useState('');

  const handleDownloadPDF = () => {
    toast.success('PDF downloaded! Check your downloads folder.');
  };

  const handleShareLinkedIn = () => {
    setShareText(`🚀 Excited to share my capstone project progress!\n\nI'm building a volunteer management system for Hearts & Hands Community Services using Salesforce. The solution automates volunteer onboarding and reduces administrative overhead by 60%.\n\nKey technical achievements:\n✅ 5 custom objects with complex relationships\n✅ Flow automation for intelligent volunteer matching\n✅ Custom Lightning Web Components\n✅ 78% test coverage (and climbing!)\n\nBig thanks to my coach Sarah Martinez and the Transition Trails community for their guidance.\n\n#Salesforce #NonprofitTech #LearningJourney #CapstoneProject`);
    setIsShareModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-[#F5F3E8] dark:bg-slate-900 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-6">
          <button
            onClick={() => onNavigate('learner')}
            className="flex items-center space-x-2 text-[#2C6975] hover:underline mb-4 transition-all duration-150"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Home</span>
          </button>

          <div className="flex items-start justify-between">
            <div className="flex-1">
              <h1 className="text-4xl text-gray-900 mb-2">{capstoneProject.title}</h1>
              <p className="text-lg text-gray-600 mb-4">{capstoneProject.description}</p>
              
              <div className="flex flex-wrap gap-3 text-sm">
                <div className="flex items-center space-x-2">
                  <Users className="w-4 h-4 text-gray-500" />
                  <span className="text-gray-700">{capstoneProject.nonprofit}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <MessageCircle className="w-4 h-4 text-gray-500" />
                  <span className="text-gray-700">Coach: {capstoneProject.coach}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Calendar className="w-4 h-4 text-gray-500" />
                  <span className="text-gray-700">Due: {capstoneProject.dueDate}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Clock className="w-4 h-4 text-gray-500" />
                  <span className="text-gray-700">{capstoneProject.daysRemaining} days remaining</span>
                </div>
              </div>
            </div>

            <div className="flex flex-col items-end space-y-2">
              <Badge
                variant="outline"
                className="bg-[#F9A03F]/20 text-[#F9A03F] border-[#F9A03F]"
              >
                In Progress
              </Badge>
              <div className="text-right">
                <p className="text-3xl text-gray-900">{capstoneProject.progress}%</p>
                <p className="text-sm text-gray-600">Complete</p>
              </div>
            </div>
          </div>

          {/* Overall Progress */}
          <div className="mt-6">
            <Progress value={capstoneProject.progress} className="h-3" />
            <div className="flex items-center justify-between mt-2 text-sm">
              <span className="text-gray-600">{capstoneProject.pointsEarned} / {capstoneProject.pointsTotal} points earned</span>
              <span className="text-gray-900">{capstoneProject.pointsTotal - capstoneProject.pointsEarned} points remaining</span>
            </div>
          </div>
        </div>

        {/* Two-Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Project Overview (2 columns) */}
          <div className="lg:col-span-2 space-y-6">
            {/* Project Phases */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h2 className="text-2xl text-gray-900 mb-6">Project Phases</h2>

              <div className="space-y-4">
                {phases.map((phase) => (
                  <Collapsible key={phase.id} defaultOpen={phase.status === 'in-progress'}>
                    <CollapsibleTrigger className="w-full">
                      <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors duration-150 cursor-pointer">
                        <div className="flex items-center space-x-4 flex-1">
                          <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                            phase.status === 'completed'
                              ? 'bg-green-100'
                              : phase.status === 'in-progress'
                              ? 'bg-[#F9A03F]/20'
                              : 'bg-gray-200'
                          }`}>
                            {phase.status === 'completed' ? (
                              <CheckCircle className="w-5 h-5 text-green-600" />
                            ) : phase.status === 'in-progress' ? (
                              <Zap className="w-5 h-5 text-[#F9A03F]" />
                            ) : (
                              <CheckSquare className="w-5 h-5 text-gray-400" />
                            )}
                          </div>

                          <div className="flex-1 text-left">
                            <div className="flex items-center space-x-3 mb-1">
                              <h3 className="text-gray-900">Phase {phase.id}: {phase.name}</h3>
                              <Badge
                                variant="outline"
                                className={`text-xs ${
                                  phase.status === 'completed'
                                    ? 'bg-green-50 text-green-700 border-green-300'
                                    : phase.status === 'in-progress'
                                    ? 'bg-[#F9A03F]/20 text-[#F9A03F] border-[#F9A03F]'
                                    : 'bg-gray-100 text-gray-600 border-gray-300'
                                }`}
                              >
                                {phase.status === 'completed' && 'Completed'}
                                {phase.status === 'in-progress' && 'In Progress'}
                                {phase.status === 'not-started' && 'Not Started'}
                              </Badge>
                            </div>
                            <div className="flex items-center space-x-4 text-sm text-gray-600">
                              <span>Due: {phase.dueDate}</span>
                              <span>{phase.points} points</span>
                            </div>
                          </div>

                          <div className="text-right">
                            <p className="text-2xl text-gray-900">{phase.progress}%</p>
                          </div>

                          <ChevronDown className="w-5 h-5 text-gray-400" />
                        </div>
                      </div>
                    </CollapsibleTrigger>

                    <CollapsibleContent>
                      <div className="mt-3 ml-14 space-y-2">
                        {phase.tasks.map((task, idx) => (
                          <div
                            key={idx}
                            className="flex items-center space-x-3 p-2 text-sm"
                          >
                            {task.completed ? (
                              <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0" />
                            ) : (
                              <div className="w-4 h-4 border-2 border-gray-300 rounded-full flex-shrink-0"></div>
                            )}
                            <span className={task.completed ? 'text-gray-500 line-through' : 'text-gray-900'}>
                              {task.name}
                            </span>
                          </div>
                        ))}
                      </div>
                    </CollapsibleContent>
                  </Collapsible>
                ))}
              </div>
            </div>

            {/* Project Stats */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h2 className="text-2xl text-gray-900 mb-6">Development Activity</h2>

              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                <div className="p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center space-x-2 mb-2">
                    <Target className="w-4 h-4 text-[#2C6975]" />
                    <p className="text-sm text-gray-600">Linear Issues</p>
                  </div>
                  <p className="text-2xl text-gray-900">{projectStats.linearIssues.completed}/{projectStats.linearIssues.total}</p>
                  <p className="text-xs text-gray-500 mt-1">{projectStats.linearIssues.inProgress} in progress</p>
                </div>

                <div className="p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center space-x-2 mb-2">
                    <GitPullRequest className="w-4 h-4 text-[#2C6975]" />
                    <p className="text-sm text-gray-600">GitHub PRs</p>
                  </div>
                  <p className="text-2xl text-gray-900">{projectStats.githubPRs.merged}/{projectStats.githubPRs.total}</p>
                  <p className="text-xs text-gray-500 mt-1">{projectStats.githubPRs.open} open</p>
                </div>

                <div className="p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center space-x-2 mb-2">
                    <Code className="w-4 h-4 text-[#2C6975]" />
                    <p className="text-sm text-gray-600">Commits</p>
                  </div>
                  <p className="text-2xl text-gray-900">{projectStats.commits}</p>
                  <p className="text-xs text-gray-500 mt-1">Across 3 branches</p>
                </div>

                <div className="p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center space-x-2 mb-2">
                    <FileText className="w-4 h-4 text-[#2C6975]" />
                    <p className="text-sm text-gray-600">Lines of Code</p>
                  </div>
                  <p className="text-2xl text-gray-900">{projectStats.linesOfCode.toLocaleString()}</p>
                  <p className="text-xs text-gray-500 mt-1">Apex & LWC</p>
                </div>

                <div className="p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center space-x-2 mb-2">
                    <CheckCircle className="w-4 h-4 text-[#2C6975]" />
                    <p className="text-sm text-gray-600">Test Coverage</p>
                  </div>
                  <p className="text-2xl text-gray-900">{projectStats.testCoverage}%</p>
                  <p className="text-xs text-gray-500 mt-1">23 test classes</p>
                </div>

                <div className="p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center space-x-2 mb-2">
                    <Database className="w-4 h-4 text-[#2C6975]" />
                    <p className="text-sm text-gray-600">Custom Objects</p>
                  </div>
                  <p className="text-2xl text-gray-900">5</p>
                  <p className="text-xs text-gray-500 mt-1">12 relationships</p>
                </div>
              </div>

              <div className="mt-4 flex items-center space-x-3">
                <button className="flex-1 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors duration-150 flex items-center justify-center space-x-2 text-sm">
                  <ExternalLink className="w-4 h-4" />
                  <span>Open in Linear</span>
                </button>
                <button className="flex-1 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors duration-150 flex items-center justify-center space-x-2 text-sm">
                  <Github className="w-4 h-4" />
                  <span>View GitHub</span>
                </button>
              </div>
            </div>
          </div>

          {/* Right Column - Penny Summary (1 column) */}
          <div className="lg:col-span-1 space-y-6">
            {/* Penny Critical Alerts */}
            <div className="bg-gradient-to-br from-[#F9A03F]/10 to-red-50 rounded-xl border-2 border-[#F9A03F]/30 p-6">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#F9A03F] to-[#e89135] flex items-center justify-center animate-pulse">
                  <Sparkles className="w-5 h-5 text-white" />
                </div>
                <h3 className="text-lg text-gray-900">Penny's Alerts</h3>
              </div>

              <div className="space-y-3">
                {pennyAlerts.map((alert, idx) => (
                  <div
                    key={idx}
                    className={`p-4 rounded-lg border-2 ${
                      alert.type === 'critical'
                        ? 'bg-red-50 border-red-300'
                        : alert.type === 'warning'
                        ? 'bg-yellow-50 border-yellow-300'
                        : 'bg-blue-50 border-blue-300'
                    }`}
                  >
                    <div className="flex items-start space-x-2 mb-2">
                      {alert.type === 'critical' ? (
                        <AlertTriangle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                      ) : alert.type === 'warning' ? (
                        <AlertCircle className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
                      ) : (
                        <TrendingUp className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                      )}
                      <div className="flex-1">
                        <h4 className="text-sm text-gray-900 mb-1">{alert.title}</h4>
                        <p className="text-xs text-gray-700">{alert.message}</p>
                      </div>
                    </div>
                    <button className="w-full mt-2 text-xs py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors duration-150">
                      {alert.action}
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Penny Summary Generator */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 sticky top-20">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg text-gray-900">Project Summary</h3>
                <button
                  onClick={() => setIsPennySummaryOpen(!isPennySummaryOpen)}
                  className="p-1 hover:bg-gray-100 rounded transition-colors"
                >
                  {isPennySummaryOpen ? (
                    <ChevronUp className="w-5 h-5 text-gray-600" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-gray-600" />
                  )}
                </button>
              </div>

              {isPennySummaryOpen && (
                <div className="space-y-4">
                  {!summaryGenerated ? (
                    <div className="text-center py-8">
                      <div className="w-16 h-16 mx-auto rounded-full bg-gradient-to-br from-[#F9A03F] to-[#e89135] flex items-center justify-center mb-4">
                        <Sparkles className="w-8 h-8 text-white" />
                      </div>
                      <h4 className="text-gray-900 mb-2">Generate Your Story</h4>
                      <p className="text-sm text-gray-600 mb-6">
                        Let Penny compile your Linear issues, GitHub commits, and achievements into a compelling project summary.
                      </p>

                      {isGeneratingSummary ? (
                        <div className="space-y-3">
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div
                              className="bg-gradient-to-r from-[#F9A03F] to-[#e89135] h-2 rounded-full transition-all duration-300"
                              style={{ width: `${generationProgress}%` }}
                            ></div>
                          </div>
                          <p className="text-sm text-gray-600">{pdfGenerationStep}</p>
                        </div>
                      ) : (
                        <button
                          onClick={handleGenerateSummary}
                          className="w-full py-3 bg-gradient-to-r from-[#F9A03F] to-[#e89135] text-white rounded-lg hover:from-[#e89135] hover:to-[#d68024] transition-all duration-150 flex items-center justify-center space-x-2"
                        >
                          <Sparkles className="w-5 h-5" />
                          <span>Generate Summary</span>
                        </button>
                      )}
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {/* Summary Content */}
                      <div className="space-y-4 max-h-96 overflow-y-auto pr-2">
                        <div>
                          <h5 className="text-sm text-gray-900 mb-2">Executive Summary</h5>
                          <p className="text-sm text-gray-700">{generatedSummary.executiveSummary}</p>
                        </div>

                        <div>
                          <h5 className="text-sm text-gray-900 mb-2">Value & Impact</h5>
                          <p className="text-sm text-gray-700">{generatedSummary.valueProposition}</p>
                        </div>

                        <div>
                          <h5 className="text-sm text-gray-900 mb-2">Technical Highlights</h5>
                          <ul className="space-y-1">
                            {generatedSummary.technicalHighlights.map((highlight, idx) => (
                              <li key={idx} className="text-sm text-gray-700 flex items-start space-x-2">
                                <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                                <span>{highlight}</span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        <div>
                          <h5 className="text-sm text-gray-900 mb-2">Challenges & Solutions</h5>
                          <ul className="space-y-2">
                            {generatedSummary.challenges.map((challenge, idx) => (
                              <li key={idx} className="text-sm text-gray-700">• {challenge}</li>
                            ))}
                          </ul>
                        </div>
                      </div>

                      {/* Actions */}
                      <div className="space-y-2 pt-4 border-t border-gray-200">
                        <button
                          onClick={handleDownloadPDF}
                          className="w-full py-2 bg-[#2C6975] text-white rounded-lg hover:bg-[#1f4f5a] transition-colors duration-150 flex items-center justify-center space-x-2"
                        >
                          <Download className="w-4 h-4" />
                          <span>Download PDF</span>
                        </button>
                        
                        <button
                          onClick={handleShareLinkedIn}
                          className="w-full py-2 bg-[#0A66C2] text-white rounded-lg hover:bg-[#084d8f] transition-colors duration-150 flex items-center justify-center space-x-2"
                        >
                          <Linkedin className="w-4 h-4" />
                          <span>Share to LinkedIn</span>
                        </button>

                        <button
                          onClick={() => setIsVersionHistoryOpen(true)}
                          className="w-full py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors duration-150 flex items-center justify-center space-x-2"
                        >
                          <Clock className="w-4 h-4" />
                          <span>Version History</span>
                        </button>

                        <button
                          onClick={handleGenerateSummary}
                          className="w-full py-2 border border-[#F9A03F] text-[#F9A03F] rounded-lg hover:bg-[#F9A03F]/5 transition-colors duration-150 flex items-center justify-center space-x-2"
                        >
                          <Sparkles className="w-4 h-4" />
                          <span>Regenerate</span>
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Version History Modal */}
      <Dialog open={isVersionHistoryOpen} onOpenChange={setIsVersionHistoryOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Summary Version History</DialogTitle>
            <DialogDescription>
              View and restore previous versions of your project summary
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-3">
            {summaryVersions.map((version) => (
              <div
                key={version.version}
                className="p-4 border border-gray-200 rounded-lg hover:border-[#2C6975] hover:bg-gray-50 cursor-pointer transition-all duration-150"
              >
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <h4 className="text-sm text-gray-900">Version {version.version}</h4>
                    <p className="text-xs text-gray-600">{version.date} • {version.wordCount} words</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <button className="p-1 hover:bg-gray-200 rounded">
                      <Eye className="w-4 h-4 text-gray-600" />
                    </button>
                    <button className="p-1 hover:bg-gray-200 rounded">
                      <Download className="w-4 h-4 text-gray-600" />
                    </button>
                  </div>
                </div>
                <div className="flex flex-wrap gap-1">
                  {version.highlights.map((highlight, idx) => (
                    <span
                      key={idx}
                      className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded"
                    >
                      {highlight}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </DialogContent>
      </Dialog>

      {/* LinkedIn Share Modal */}
      <Dialog open={isShareModalOpen} onOpenChange={setIsShareModalOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Share to LinkedIn</DialogTitle>
            <DialogDescription>
              Penny has drafted a post highlighting your capstone achievements
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4">
            <Textarea
              value={shareText}
              onChange={(e) => setShareText(e.target.value)}
              className="min-h-[300px]"
            />

            <div className="flex items-center justify-between text-sm text-gray-600">
              <span>✓ Includes hashtags</span>
              <span>✓ Quantifiable results</span>
              <span>✓ Tags coach</span>
            </div>

            <div className="flex items-center justify-end space-x-3">
              <button
                onClick={() => setIsShareModalOpen(false)}
                className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  toast.success('Posted to LinkedIn!');
                  setIsShareModalOpen(false);
                }}
                className="px-4 py-2 bg-[#0A66C2] text-white rounded-lg hover:bg-[#084d8f] transition-colors flex items-center space-x-2"
              >
                <Linkedin className="w-4 h-4" />
                <span>Post to LinkedIn</span>
              </button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
