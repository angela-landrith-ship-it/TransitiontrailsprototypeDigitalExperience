/**
 * TRAIL DETAIL - Individual Trail Dashboard
 * 
 * Displays modules, progress, Penny mentorship, and capstone
 * requirements for a specific Trail of Mastery.
 */

import React, { useState } from 'react';
import {
  ArrowLeft,
  Briefcase,
  Code,
  Network,
  BarChart3,
  Award,
  Target,
  Users,
  BookOpen,
  FileText,
  Rocket,
  MessageSquare,
  Trophy,
  CheckCircle,
  TrendingUp,
  Settings,
  Crown,
  Brain,
} from 'lucide-react';
import { ModuleCard } from './ModuleCard';
import { SectionHeader } from './SectionHeader';
import { StatCard } from './StatCard';
import { toast } from 'sonner@2.0.3';

export interface TrailDetailProps {
  trailId: string;
  onNavigate: (page: string) => void;
  onBack: () => void;
}

interface Module {
  id: number;
  title: string;
  description: string;
  points: number;
  isLocked: boolean;
  isCompleted: boolean;
  isCurrent: boolean;
}

const trailData: { [key: string]: any } = {
  'product-owner': {
    role: 'Salesforce Product Owner',
    title: 'Trail of Mastery: Product Owner',
    description: 'Master strategic planning, stakeholder management, and business process optimization.',
    icon: Briefcase,
    color: 'amber',
    badge: 'Trailblazer Visionary',
    pennyMode: 'Mentor',
    modules: [
      {
        id: 1,
        title: 'Business Strategy Alignment',
        description: 'Align Salesforce solutions with organizational goals and stakeholder priorities.',
        points: 50,
        isLocked: false,
        isCompleted: true,
        isCurrent: false,
      },
      {
        id: 2,
        title: 'Agile User Stories & Acceptance Criteria',
        description: 'Write effective user stories and define clear acceptance criteria for development teams.',
        points: 50,
        isLocked: false,
        isCompleted: true,
        isCurrent: false,
      },
      {
        id: 3,
        title: 'Salesforce Implementation Lifecycle',
        description: 'Navigate the full lifecycle from discovery through deployment and adoption.',
        points: 50,
        isLocked: false,
        isCompleted: false,
        isCurrent: true,
      },
      {
        id: 4,
        title: 'Partner Project Leadership',
        description: 'Lead a team project with a nonprofit partner to deliver measurable impact.',
        points: 100,
        isLocked: false,
        isCompleted: false,
        isCurrent: false,
      },
      {
        id: 5,
        title: 'Capstone: Design a Nonprofit Salesforce Roadmap',
        description: 'Create a comprehensive 12-month roadmap for a real nonprofit organization.',
        points: 250,
        isLocked: false,
        isCompleted: false,
        isCurrent: false,
      },
    ],
  },
  'developer': {
    role: 'Salesforce Developer',
    title: 'Trail of Mastery: Developer',
    description: 'Build expertise in Apex, LWC, and API integrations with declarative-first principles.',
    icon: Code,
    color: 'teal',
    badge: 'Trailblazer Engineer',
    pennyMode: 'Assistant',
    modules: [
      {
        id: 1,
        title: 'Advanced Apex & Triggers',
        description: 'Master complex Apex patterns, bulk processing, and trigger frameworks.',
        points: 50,
        isLocked: false,
        isCompleted: false,
        isCurrent: true,
      },
      {
        id: 2,
        title: 'Lightning Web Components Architecture',
        description: 'Build modern, performant LWC components following best practices.',
        points: 50,
        isLocked: true,
        isCompleted: false,
        isCurrent: false,
      },
      {
        id: 3,
        title: 'API Integrations & External Services',
        description: 'Connect Salesforce with external systems using REST, SOAP, and platform events.',
        points: 50,
        isLocked: true,
        isCompleted: false,
        isCurrent: false,
      },
      {
        id: 4,
        title: 'Partner Project: Custom Portal for Impact Reporting',
        description: 'Build a custom Experience Cloud portal with data visualization.',
        points: 100,
        isLocked: true,
        isCompleted: false,
        isCurrent: false,
      },
      {
        id: 5,
        title: 'Capstone: Automate Grant Management with Apex + Flow',
        description: 'Create an end-to-end automated grant management solution.',
        points: 250,
        isLocked: true,
        isCompleted: false,
        isCurrent: false,
      },
    ],
  },
  'solutions-architect': {
    role: 'Salesforce Solutions Architect',
    title: 'Trail of Mastery: Solutions Architect',
    description: 'Design end-to-end solutions with data modeling and multi-cloud integration.',
    icon: Network,
    color: 'evergreen',
    badge: 'Trailblazer Architect',
    pennyMode: 'Advisor',
    modules: [
      {
        id: 1,
        title: 'Business Requirements → Technical Blueprint',
        description: 'Transform business needs into comprehensive technical architecture diagrams.',
        points: 50,
        isLocked: false,
        isCompleted: false,
        isCurrent: true,
      },
      {
        id: 2,
        title: 'Data & Security Architecture',
        description: 'Design scalable data models and implement robust security frameworks.',
        points: 50,
        isLocked: true,
        isCompleted: false,
        isCurrent: false,
      },
      {
        id: 3,
        title: 'Multi-Cloud Integration',
        description: 'Architect solutions spanning Sales Cloud, Service Cloud, and Experience Cloud.',
        points: 50,
        isLocked: true,
        isCompleted: false,
        isCurrent: false,
      },
      {
        id: 4,
        title: 'Partner Project: Scalable Experience Cloud Architecture',
        description: 'Design a multi-tenant portal architecture for a nonprofit network.',
        points: 100,
        isLocked: true,
        isCompleted: false,
        isCurrent: false,
      },
      {
        id: 5,
        title: 'Capstone: Enterprise Data Model for Nonprofit Cloud',
        description: 'Deploy a complete data architecture for program and donor management.',
        points: 250,
        isLocked: true,
        isCompleted: false,
        isCurrent: false,
      },
    ],
  },
  'business-analyst': {
    role: 'Salesforce Business Analyst',
    title: 'Trail of Mastery: Business Analyst',
    description: 'Excel in discovery, documentation, and process optimization.',
    icon: BarChart3,
    color: 'blue',
    badge: 'Business Process Expert',
    pennyMode: 'Discovery Guide',
    modules: [
      {
        id: 1,
        title: 'Requirements Elicitation & Stakeholder Interviews',
        description: 'Conduct effective discovery sessions and document business needs.',
        points: 50,
        isLocked: false,
        isCompleted: false,
        isCurrent: true,
      },
      {
        id: 2,
        title: 'User Stories & Acceptance Criteria',
        description: 'Translate requirements into actionable user stories with testable criteria.',
        points: 50,
        isLocked: true,
        isCompleted: false,
        isCurrent: false,
      },
      {
        id: 3,
        title: 'Flow Design & Automation',
        description: 'Design and document automation workflows using Salesforce Flow.',
        points: 50,
        isLocked: true,
        isCompleted: false,
        isCurrent: false,
      },
      {
        id: 4,
        title: 'Partner Project: Optimize Volunteer Management Process',
        description: 'Analyze and improve volunteer onboarding and engagement workflows.',
        points: 100,
        isLocked: true,
        isCompleted: false,
        isCurrent: false,
      },
      {
        id: 5,
        title: 'Capstone: End-to-End Process Design for Fundraising',
        description: 'Map and optimize the complete donor journey from acquisition to retention.',
        points: 250,
        isLocked: true,
        isCompleted: false,
        isCurrent: false,
      },
    ],
  },
  'salesforce-admin': {
    role: 'Salesforce Administrator',
    title: 'Trail of Mastery: Salesforce Admin',
    description: 'Master user management, security, automation, and platform configuration.',
    icon: Settings,
    color: 'amber',
    badge: 'Certified Platform Expert',
    pennyMode: 'Configuration Guide',
    modules: [
      {
        id: 1,
        title: 'User Management & Security Fundamentals',
        description: 'Master profiles, permission sets, roles, and sharing rules.',
        points: 50,
        isLocked: false,
        isCompleted: false,
        isCurrent: true,
      },
      {
        id: 2,
        title: 'Workflow Automation with Flow Builder',
        description: 'Build automated processes using Flow Builder and Process Builder.',
        points: 50,
        isLocked: true,
        isCompleted: false,
        isCurrent: false,
      },
      {
        id: 3,
        title: 'Reports, Dashboards & Analytics',
        description: 'Create powerful reports and dashboards for data-driven decision making.',
        points: 50,
        isLocked: true,
        isCompleted: false,
        isCurrent: false,
      },
      {
        id: 4,
        title: 'Partner Project: Nonprofit CRM Setup',
        description: 'Configure a complete Salesforce CRM for a nonprofit organization.',
        points: 100,
        isLocked: true,
        isCompleted: false,
        isCurrent: false,
      },
      {
        id: 5,
        title: 'Capstone: Full Platform Configuration for Impact Tracking',
        description: 'Deploy a comprehensive Salesforce instance for program and outcome measurement.',
        points: 250,
        isLocked: true,
        isCompleted: false,
        isCurrent: false,
      },
    ],
  },
  'product-manager': {
    role: 'Salesforce Product Manager',
    title: 'Trail of Mastery: Product Manager',
    description: 'Lead product strategy, roadmaps, and cross-functional teams.',
    icon: Crown,
    color: 'amber',
    badge: 'Strategic Product Leader',
    pennyMode: 'Strategy Advisor',
    modules: [
      {
        id: 1,
        title: 'Product Strategy & Vision',
        description: 'Define product vision, strategy, and success metrics aligned with business goals.',
        points: 50,
        isLocked: false,
        isCompleted: false,
        isCurrent: true,
      },
      {
        id: 2,
        title: 'Roadmap Planning & Prioritization',
        description: 'Build strategic roadmaps and prioritize features using data-driven frameworks.',
        points: 50,
        isLocked: true,
        isCompleted: false,
        isCurrent: false,
      },
      {
        id: 3,
        title: 'Cross-Functional Leadership',
        description: 'Lead engineering, design, and business teams toward shared product outcomes.',
        points: 50,
        isLocked: true,
        isCompleted: false,
        isCurrent: false,
      },
      {
        id: 4,
        title: 'Partner Project: Launch a New Salesforce Product Feature',
        description: 'Define, build, and launch a new feature with measurable business impact.',
        points: 100,
        isLocked: true,
        isCompleted: false,
        isCurrent: false,
      },
      {
        id: 5,
        title: 'Capstone: 12-Month Product Strategy for Nonprofit Tech',
        description: 'Create a comprehensive product strategy and roadmap for a nonprofit organization.',
        points: 250,
        isLocked: true,
        isCompleted: false,
        isCurrent: false,
      },
    ],
  },
  'ai-specialist': {
    role: 'AI for Digital Platforms',
    title: 'Trail of Mastery: AI Specialist',
    description: 'Master AI tools across Salesforce Einstein, Canva AI, Jotform AI, and emerging technologies.',
    icon: Brain,
    color: 'blue',
    badge: 'AI Innovation Leader',
    pennyMode: 'AI Strategy Guide',
    modules: [
      {
        id: 1,
        title: 'Salesforce Einstein AI Fundamentals',
        description: 'Master Einstein GPT, Einstein Copilot, predictive AI, and generative AI in Salesforce.',
        points: 60,
        isLocked: false,
        isCompleted: false,
        isCurrent: true,
      },
      {
        id: 2,
        title: 'AI for Design & Content Creation',
        description: 'Leverage Canva AI, Adobe Firefly, and generative design tools for visual content.',
        points: 50,
        isLocked: true,
        isCompleted: false,
        isCurrent: false,
      },
      {
        id: 3,
        title: 'AI-Powered Forms & Automation',
        description: 'Use Jotform AI, Typeform AI, and intelligent form builders with conditional logic.',
        points: 50,
        isLocked: true,
        isCompleted: false,
        isCurrent: false,
      },
      {
        id: 4,
        title: 'AI Workflow Automation & Integration',
        description: 'Build AI-powered workflows using Zapier AI, Make.com, and intelligent automation.',
        points: 50,
        isLocked: true,
        isCompleted: false,
        isCurrent: false,
      },
      {
        id: 5,
        title: 'Prompt Engineering & AI Best Practices',
        description: 'Master prompt design, AI ethics, responsible AI usage, and optimization techniques.',
        points: 50,
        isLocked: true,
        isCompleted: false,
        isCurrent: false,
      },
      {
        id: 6,
        title: 'Capstone: AI-Powered Nonprofit Solution',
        description: 'Build an end-to-end AI solution integrating Einstein, automation tools, and data analytics.',
        points: 90,
        isLocked: true,
        isCompleted: false,
        isCurrent: false,
      },
    ],
  },
};

export function TrailDetail({ trailId, onNavigate, onBack }: TrailDetailProps) {
  const trail = trailData[trailId];

  if (!trail) {
    return (
      <div className="min-h-screen bg-trail-cream dark:bg-slate-900 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600 dark:text-gray-400 mb-4">Trail not found</p>
          <button
            onClick={onBack}
            className="text-evergreen hover:text-evergreen-dark"
          >
            Return to Trail Gallery
          </button>
        </div>
      </div>
    );
  }

  const Icon = trail.icon;
  const completedModules = trail.modules.filter((m: Module) => m.isCompleted).length;
  const totalModules = trail.modules.length;
  const progress = Math.round((completedModules / totalModules) * 100);
  const earnedPoints = trail.modules
    .filter((m: Module) => m.isCompleted)
    .reduce((sum: number, m: Module) => sum + m.points, 0);
  const totalPoints = trail.modules.reduce((sum: number, m: Module) => sum + m.points, 0);

  const handleModuleClick = (moduleId: number) => {
    const module = trail.modules.find((m: Module) => m.id === moduleId);
    if (module && !module.isLocked) {
      toast.success(`Opening ${module.title}...`);
      // In production, navigate to module content
    }
  };

  const handleEnroll = () => {
    toast.success(`Enrolled in ${trail.title}!`);
    // In production, create enrollment record
  };

  // Penny messages based on role
  const pennyMessages: { [key: string]: string } = {
    'product-owner': "As your mentor, I'll guide you through strategic thinking and stakeholder alignment. You're 40% through module 3—keep pushing! 🎯",
    'developer': "I'm here to assist with code reviews and best practices. Your Apex skills are solid—ready to tackle LWC next? 💻",
    'solutions-architect': "As your advisor, I'll help you think through architectural decisions. Your data model design in module 1 was excellent! 🏗️",
    'business-analyst': "I'm your guide through process optimization. Your stakeholder interview techniques are improving—let's refine those user stories next! 📊",
  };

  return (
    <div className="min-h-screen bg-trail-cream dark:bg-slate-900">
      {/* Header */}
      <div className="bg-white dark:bg-slate-800 border-b border-gray-200 dark:border-slate-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <button
            onClick={onBack}
            className="flex items-center space-x-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200 mb-6 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-evergreen rounded"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Trails</span>
          </button>

          <div className="flex items-start justify-between">
            <div className="flex items-start space-x-4">
              <div className={`w-16 h-16 rounded-xl bg-${trail.color === 'amber' ? 'sun-amber' : trail.color === 'teal' ? 'penny-guide' : trail.color === 'evergreen' ? 'evergreen' : 'sky-blue'} flex items-center justify-center`}>
                <Icon className="w-8 h-8 text-white" />
              </div>
              <div>
                <div className="text-xs text-gray-500 dark:text-gray-400 mb-1 uppercase tracking-wide">
                  {trail.role}
                </div>
                <h1 className="text-gray-900 dark:text-gray-100 mb-2">
                  {trail.title}
                </h1>
                <p className="text-gray-600 dark:text-gray-400 max-w-2xl">
                  {trail.description}
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <Award className={`w-5 h-5 text-${trail.color === 'amber' ? 'sun-amber' : trail.color === 'teal' ? 'penny-guide' : trail.color === 'evergreen' ? 'evergreen' : 'sky-blue'}`} />
              <span className="text-sm text-gray-600 dark:text-gray-400">{trail.badge}</span>
            </div>
          </div>

          {/* Progress Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-8">
            <StatCard
              icon={<TrendingUp className="w-6 h-6" />}
              label="Progress"
              value={`${progress}%`}
              iconColor="blue"
              subtitle={`${completedModules} of ${totalModules} modules`}
            />
            <StatCard
              icon={<Trophy className="w-6 h-6" />}
              label="Points Earned"
              value={earnedPoints.toString()}
              iconColor="amber"
              subtitle={`${totalPoints} total available`}
            />
            <StatCard
              icon={<CheckCircle className="w-6 h-6" />}
              label="Completed"
              value={completedModules.toString()}
              iconColor="success"
            />
            <StatCard
              icon={<Target className="w-6 h-6" />}
              label="Current Module"
              value={trail.modules.find((m: Module) => m.isCurrent)?.id.toString() || 'N/A'}
              iconColor="evergreen"
            />
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column: Modules */}
          <div className="lg:col-span-2 space-y-6">
            <SectionHeader
              title="Learning Modules"
              description="Complete all modules to earn your certification badge"
              icon={BookOpen}
            />

            <div className="space-y-4">
              {trail.modules.map((module: Module) => (
                <ModuleCard
                  key={module.id}
                  moduleNumber={module.id}
                  title={module.title}
                  description={module.description}
                  points={module.points}
                  isLocked={module.isLocked}
                  isCompleted={module.isCompleted}
                  isCurrent={module.isCurrent}
                  onClick={() => handleModuleClick(module.id)}
                />
              ))}
            </div>
          </div>

          {/* Right Column: Penny + Info */}
          <div className="space-y-6">
            {/* Penny Mentorship */}
            <div className="bg-white dark:bg-slate-800 rounded-xl p-6 border border-gray-200 dark:border-slate-700">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-penny-guide to-sun-amber flex items-center justify-center">
                  <MessageSquare className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="text-gray-900 dark:text-gray-100">Penny AI {trail.pennyMode}</h3>
                  <p className="text-xs text-gray-500 dark:text-gray-400">Your guide on this trail</p>
                </div>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                {pennyMessages[trailId]}
              </p>
              <button
                onClick={() => toast.info('Opening Penny chat...')}
                className="w-full px-4 py-2 bg-evergreen text-white rounded-lg hover:bg-evergreen-dark transition-colors text-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-evergreen"
              >
                Ask Penny
              </button>
            </div>

            {/* Trail Info */}
            <div className="bg-white dark:bg-slate-800 rounded-xl p-6 border border-gray-200 dark:border-slate-700">
              <h3 className="text-gray-900 dark:text-gray-100 mb-4">Trail Information</h3>
              <div className="space-y-3 text-sm">
                <div className="flex items-center justify-between">
                  <span className="text-gray-600 dark:text-gray-400">Duration</span>
                  <span className="text-gray-900 dark:text-gray-100">12–16 weeks</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600 dark:text-gray-400">Difficulty</span>
                  <span className="text-error">Advanced</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600 dark:text-gray-400">Total Points</span>
                  <span className="text-sun-amber">{totalPoints} pts</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600 dark:text-gray-400">Team Project</span>
                  <CheckCircle className="w-4 h-4 text-success" />
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600 dark:text-gray-400">Capstone</span>
                  <CheckCircle className="w-4 h-4 text-success" />
                </div>
              </div>
            </div>

            {/* Next Steps */}
            <div className="bg-sky-blue/10 border border-sky-blue/20 rounded-xl p-6">
              <div className="flex items-start space-x-3 mb-4">
                <Rocket className="w-5 h-5 text-sky-blue flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-gray-900 dark:text-gray-100 text-sm mb-1">Next Steps</h4>
                  <p className="text-xs text-gray-600 dark:text-gray-400">
                    Complete Module 3 to unlock the Partner Project phase. You'll work with a
                    real nonprofit organization!
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TrailDetail;
