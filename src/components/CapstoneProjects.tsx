import { ArrowLeft, FileText, Clock, Users, Code, CheckCircle, AlertCircle, Trophy, Target, Sparkles, ExternalLink, Download, MessageCircle, Calendar, Github, FileCode, Database, Zap, CheckSquare, ChevronDown, Play } from 'lucide-react';
import { PageType } from '../App';
import { ProgressRing } from './ProgressRing';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from './ui/collapsible';
import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';

interface CapstoneProjectsProps {
  onNavigate: (page: PageType) => void;
}

export function CapstoneProjects({ onNavigate }: CapstoneProjectsProps) {
  const [isResourcesOpen, setIsResourcesOpen] = useState(false);
  const [isObjectivesOpen, setIsObjectivesOpen] = useState(false);

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
      { name: 'GitHub Repository', value: 'github.com/transitiontrails/volunteer-mgmt', type: 'tool', icon: Github },
      { name: 'Design Documents', value: 'Google Drive Folder', type: 'document', icon: FileText },
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
        ],
        deliverables: []
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
        ],
        deliverables: []
      }
    ]
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
            <button className="flex items-center space-x-2 bg-[#2C6975] text-white px-6 py-3 rounded-lg hover:bg-[#234f57] transition-colors">
              <Code className="w-4 h-4" />
              <span>Open Salesforce Sandbox</span>
              <ExternalLink className="w-3 h-3" />
            </button>
            <button className="flex items-center space-x-2 bg-gray-900 text-white px-6 py-3 rounded-lg hover:bg-gray-800 transition-colors">
              <Github className="w-4 h-4" />
              <span>View GitHub Repo</span>
              <ExternalLink className="w-3 h-3" />
            </button>
            <button className="px-6 py-3 rounded-lg border-2 border-gray-300 text-gray-700 hover:bg-gray-50 transition-colors">
              <MessageCircle className="w-4 h-4 inline mr-2" />
              Contact Nonprofit Partner
            </button>
            <button className="px-6 py-3 rounded-lg border-2 border-gray-300 text-gray-700 hover:bg-gray-50 transition-colors">
              <FileText className="w-4 h-4 inline mr-2" />
              View Design Docs
            </button>
          </div>
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
    </div>
  );
}
