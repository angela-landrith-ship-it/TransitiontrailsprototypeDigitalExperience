/**
 * CITIZEN DEVELOPER MASTERY - Multi-Platform Learning Hub
 * 
 * =============================================================================
 * OVERVIEW
 * =============================================================================
 * 
 * Extends Trail of Mastery framework to include no-code/low-code platform
 * learning paths for tools like HubSpot, Canva, Notion, Airtable, etc.
 * 
 * Audience: Intermediate to Advanced Learners
 * URL: /trail-of-mastery/citizen-developer
 * Theme: Evergreen (#3B6A52) and Sky Blue (#7EB5C1)
 * 
 * =============================================================================
 * SALESFORCE OBJECTS
 * =============================================================================
 * 
 * Platform_Mastery__c:
 *   - Platform_Name__c (Text)
 *   - Description__c (Long Text Area)
 *   - Difficulty__c (Picklist: Beginner, Intermediate, Advanced)
 *   - Estimated_Hours__c (Number)
 *   - Points_On_Completion__c (Number)
 *   - Icon_Color__c (Text - hex color)
 *   - Status__c (Picklist: Active, Coming Soon, Archived)
 * 
 * Platform_Module__c:
 *   - Parent_Platform__c (Lookup: Platform_Mastery__c)
 *   - Title__c (Text)
 *   - Summary__c (Long Text Area)
 *   - Sequence__c (Number)
 *   - Content_Link__c (URL)
 *   - Duration_Hours__c (Number)
 *   - Points__c (Number)
 * 
 * Platform_Enrollment__c:
 *   - User__c (Lookup: User)
 *   - Platform_Mastery__c (Lookup: Platform_Mastery__c)
 *   - Enrollment_Date__c (Date)
 *   - Status__c (Picklist: Active, Paused, Completed, Dropped)
 *   - Progress_Percentage__c (Number)
 *   - Completed_Modules__c (Number)
 *   - Total_Modules__c (Number)
 * 
 * =============================================================================
 * APEX CONTROLLERS
 * =============================================================================
 * 
 * CitizenDeveloperController.cls:
 *   - getPlatformMasteryOptions() → List<Platform_Mastery__c>
 *   - enrollInPlatform(userId, platformId) → Platform_Enrollment__c
 *   - getUserEnrollments(userId) → List<Platform_Enrollment__c>
 *   - updateModuleProgress(enrollmentId, moduleId) → void
 * 
 * =============================================================================
 * DESIGN NOTES
 * =============================================================================
 * 
 * - Platform-agnostic visual design (no proprietary logos)
 * - Color-coded platform representations
 * - Symbolic icons only
 * - Focus on learner empowerment through creation
 * - Collaborative project elements
 * - Integration-focused capstone projects
 * 
 * =============================================================================
 */

import React, { useState } from 'react';
import {
  Sparkles,
  Mail,
  PenTool,
  FileText,
  Database,
  CheckSquare,
  Zap,
  Award,
  TrendingUp,
  Users,
  ArrowLeft,
  ChevronRight,
  Clock,
  Target,
  BookOpen,
  Code,
  Layers,
  Globe,
  Calendar,
  FileCheck,
  Send,
} from 'lucide-react';
import { SectionHeader } from './SectionHeader';
import { StatCard } from './StatCard';
import { ProgressRing } from './ProgressRing';
import { Badge } from './ui/badge';

export interface CitizenDeveloperMasteryProps {
  onNavigate: (page: string, platformId?: string) => void;
  onBack: () => void;
  userPoints?: number;
  userLevel?: string;
}

interface Platform {
  id: string;
  name: string;
  tagline: string;
  description: string;
  category: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  duration: string;
  modules: number;
  points: number;
  color: string;
  icon: typeof Mail;
  skills: string[];
  enrolled?: boolean;
  progress?: number;
}

const platforms: Platform[] = [
  {
    id: 'hubspot',
    name: 'HubSpot',
    tagline: 'Marketing Automation Mastery',
    description: 'Master CRM setup, email automation, workflow design, and campaign management.',
    category: 'Marketing & Sales',
    difficulty: 'Intermediate',
    duration: '8–10 weeks',
    modules: 6,
    points: 250,
    color: '#FF7A59',
    icon: Mail,
    skills: ['CRM Setup', 'Email Automation', 'Workflow Design', 'Campaign Analytics'],
  },
  {
    id: 'canva',
    name: 'Canva',
    tagline: 'Visual Communication Mastery',
    description: 'Create professional designs with branding kits, templates, and team collaboration.',
    category: 'Design & Creative',
    difficulty: 'Beginner',
    duration: '6–8 weeks',
    modules: 5,
    points: 200,
    color: '#00C4CC',
    icon: PenTool,
    skills: ['Brand Design', 'Template Creation', 'Team Collaboration', 'Visual Storytelling'],
  },
  {
    id: 'notion',
    name: 'Notion',
    tagline: 'Systems & Docs Mastery',
    description: 'Build knowledge hubs, databases, automations, and collaborative project dashboards.',
    category: 'Productivity & Knowledge',
    difficulty: 'Intermediate',
    duration: '8–10 weeks',
    modules: 6,
    points: 250,
    color: '#000000',
    icon: FileText,
    skills: ['Database Design', 'Automations', 'Knowledge Management', 'Workspace Setup'],
  },
  {
    id: 'airtable',
    name: 'Airtable',
    tagline: 'Workflow Automation Mastery',
    description: 'Design powerful databases, automate workflows, and build custom apps.',
    category: 'Data & Automation',
    difficulty: 'Intermediate',
    duration: '8–10 weeks',
    modules: 6,
    points: 250,
    color: '#FCB400',
    icon: Database,
    skills: ['Relational Databases', 'Automation Scripts', 'Interface Builder', 'API Integration'],
  },
  {
    id: 'clickup',
    name: 'ClickUp',
    tagline: 'Project Management Mastery',
    description: 'Master task management, team workflows, dashboards, and productivity optimization.',
    category: 'Project Management',
    difficulty: 'Intermediate',
    duration: '6–8 weeks',
    modules: 5,
    points: 200,
    color: '#7B68EE',
    icon: CheckSquare,
    skills: ['Task Management', 'Custom Views', 'Automation', 'Team Dashboards'],
  },
  {
    id: 'zapier',
    name: 'Zapier',
    tagline: 'Integration Automation Mastery',
    description: 'Connect apps, automate workflows, and build multi-step integrations.',
    category: 'Integration & Automation',
    difficulty: 'Advanced',
    duration: '8–10 weeks',
    modules: 6,
    points: 275,
    color: '#FF4A00',
    icon: Zap,
    skills: ['Multi-App Integration', 'Webhook Configuration', 'Logic Building', 'Error Handling'],
  },
  {
    id: 'jotform',
    name: 'Jotform',
    tagline: 'Forms & Data Collection Mastery',
    description: 'Build powerful forms, collect data, automate workflows, and create approval processes.',
    category: 'Forms & Data Collection',
    difficulty: 'Beginner',
    duration: '6–8 weeks',
    modules: 5,
    points: 200,
    color: '#FF6100',
    icon: FileCheck,
    skills: ['Form Builder', 'Conditional Logic', 'Payment Integration', 'Workflow Automation'],
  },
  {
    id: 'monday',
    name: 'Monday.com',
    tagline: 'Work OS Mastery',
    description: 'Master team workflows, project tracking, automation recipes, and custom dashboards.',
    category: 'Project Management',
    difficulty: 'Intermediate',
    duration: '8–10 weeks',
    modules: 6,
    points: 250,
    color: '#FF3D57',
    icon: Calendar,
    skills: ['Board Management', 'Automation Recipes', 'Dashboard Design', 'Team Collaboration'],
  },
  {
    id: 'mailchimp',
    name: 'Mailchimp',
    tagline: 'Email Marketing Mastery',
    description: 'Create campaigns, segment audiences, automate journeys, and analyze engagement metrics.',
    category: 'Marketing & Sales',
    difficulty: 'Intermediate',
    duration: '6–8 weeks',
    modules: 5,
    points: 225,
    color: '#FFE01B',
    icon: Send,
    skills: ['Campaign Design', 'Audience Segmentation', 'Marketing Automation', 'Analytics'],
  },
  {
    id: 'innovation',
    name: 'Innovation Lab',
    tagline: 'Open Platform Challenges',
    description: 'Experiment with emerging tools, compete in hackathons, and create your own projects.',
    category: 'Innovation & Experimentation',
    difficulty: 'Advanced',
    duration: 'Self-Paced',
    modules: 8,
    points: 300,
    color: '#3B6A52',
    icon: Globe,
    skills: ['Platform Research', 'Rapid Prototyping', 'Cross-Tool Integration', 'Innovation Mindset'],
  },
];

export function CitizenDeveloperMastery({
  onNavigate,
  onBack,
  userPoints = 0,
  userLevel = 'Explorer',
}: CitizenDeveloperMasteryProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  
  // Mock enrollment data
  const enrolledPlatforms = ['notion']; // Example: user enrolled in Notion
  const platformProgress = {
    'notion': 45, // 45% progress
  };

  const categories = ['all', 'Marketing & Sales', 'Design & Creative', 'Productivity & Knowledge', 'Data & Automation', 'Forms & Data Collection', 'Project Management', 'Integration & Automation', 'Innovation & Experimentation'];

  const filteredPlatforms = selectedCategory === 'all' 
    ? platforms 
    : platforms.filter(p => p.category === selectedCategory);

  const totalEnrolled = enrolledPlatforms.length;
  const totalCompleted = Object.values(platformProgress).filter(p => p === 100).length;

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
            <span>Back to Trail of Mastery</span>
          </button>

          <div className="mb-6">
            <div className="flex items-center space-x-3 mb-3">
              <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-evergreen to-sky-blue flex items-center justify-center">
                <Sparkles className="w-7 h-7 text-white" />
              </div>
              <div>
                <h1 className="text-3xl text-gray-900 dark:text-white">Citizen Developer Platforms</h1>
                <p className="text-gray-600 dark:text-gray-400">Expand Your Platform Mastery</p>
              </div>
            </div>
            <p className="text-gray-700 dark:text-gray-300 max-w-3xl">
              Master the tools that power modern creativity and collaboration. Learn to automate, design, and build 
              across the platforms shaping today's digital work — and tomorrow's opportunities.
            </p>
          </div>

          {/* Stats */}
          {totalEnrolled > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
              <StatCard
                icon={<TrendingUp className="w-6 h-6" />}
                label="Active Platforms"
                value={totalEnrolled.toString()}
                iconColor="blue"
              />
              <StatCard
                icon={<Award className="w-6 h-6" />}
                label="Completed Platforms"
                value={totalCompleted.toString()}
                iconColor="success"
              />
              <StatCard
                icon={<Users className="w-6 h-6" />}
                label="Your Level"
                value={userLevel}
                iconColor="evergreen"
                subtitle="Multi-platform maker"
              />
            </div>
          )}
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero Banner */}
        <div className="bg-gradient-to-r from-evergreen to-sky-blue rounded-2xl p-8 mb-8 text-white">
          <div className="max-w-3xl">
            <h2 className="text-2xl mb-3">Master the tools that power modern creativity</h2>
            <p className="text-blue-100 mb-6">
              Learn to automate, design, and collaborate across the platforms shaping today's digital work.
              Each platform path includes hands-on projects, team collaboration, and capstone integration challenges.
            </p>
            <div className="flex flex-wrap gap-3">
              <button
                onClick={() => window.scrollTo({ top: 400, behavior: 'smooth' })}
                className="px-6 py-3 bg-white text-evergreen rounded-lg hover:bg-blue-50 transition-colors flex items-center space-x-2"
              >
                <span>Start Learning</span>
                <ChevronRight className="w-4 h-4" />
              </button>
              <button
                onClick={() => window.scrollTo({ top: 400, behavior: 'smooth' })}
                className="px-6 py-3 border-2 border-white text-white rounded-lg hover:bg-white/10 transition-colors"
              >
                Preview Platforms
              </button>
            </div>
          </div>
        </div>

        {/* Category Filter */}
        <div className="mb-8">
          <h3 className="text-gray-900 dark:text-white mb-4">Filter by Category</h3>
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-lg text-sm transition-colors ${
                  selectedCategory === category
                    ? 'bg-evergreen text-white'
                    : 'bg-gray-100 dark:bg-slate-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-slate-700'
                }`}
              >
                {category === 'all' ? 'All Platforms' : category}
              </button>
            ))}
          </div>
        </div>

        {/* Platform Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {filteredPlatforms.map((platform) => (
            <PlatformTile
              key={platform.id}
              platform={platform}
              enrolled={enrolledPlatforms.includes(platform.id)}
              progress={platformProgress[platform.id]}
              onNavigate={onNavigate}
            />
          ))}
        </div>

        {/* Capstone Section */}
        <div className="bg-gradient-to-br from-evergreen/5 to-sky-blue/5 dark:from-evergreen/10 dark:to-sky-blue/10 rounded-xl p-8 border-2 border-evergreen/20 dark:border-evergreen/30">
          <div className="flex items-start space-x-4 mb-6">
            <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-evergreen to-sky-blue flex items-center justify-center flex-shrink-0">
              <Award className="w-7 h-7 text-white" />
            </div>
            <div className="flex-1">
              <h3 className="text-xl text-gray-900 dark:text-white mb-2">Capstone Integration Project</h3>
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                Complete a team-based capstone that integrates multiple platforms. Example: "Design a Nonprofit 
                Growth Dashboard using Canva + HubSpot + Notion + Airtable."
              </p>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mb-6">
            <div className="bg-white dark:bg-slate-800 rounded-lg p-4 border border-gray-200 dark:border-slate-700">
              <div className="flex items-center space-x-2 mb-2">
                <Code className="w-5 h-5 text-evergreen" />
                <h4 className="text-sm text-gray-900 dark:text-white">GitHub Integration</h4>
              </div>
              <p className="text-xs text-gray-600 dark:text-gray-400">
                Document your project and share code/templates in your capstone repository.
              </p>
            </div>
            
            <div className="bg-white dark:bg-slate-800 rounded-lg p-4 border border-gray-200 dark:border-slate-700">
              <div className="flex items-center space-x-2 mb-2">
                <Users className="w-5 h-5 text-sky-blue" />
                <h4 className="text-sm text-gray-900 dark:text-white">Team Collaboration</h4>
              </div>
              <p className="text-xs text-gray-600 dark:text-gray-400">
                Work with peers in Slack workspace to coordinate multi-platform solutions.
              </p>
            </div>
            
            <div className="bg-white dark:bg-slate-800 rounded-lg p-4 border border-gray-200 dark:border-slate-700">
              <div className="flex items-center space-x-2 mb-2">
                <Layers className="w-5 h-5 text-sun-amber" />
                <h4 className="text-sm text-gray-900 dark:text-white">Portfolio Showcase</h4>
              </div>
              <p className="text-xs text-gray-600 dark:text-gray-400">
                Submit deliverables via Salesforce CMS for portfolio and certification.
              </p>
            </div>
          </div>

          <button
            onClick={() => onNavigate('capstone-projects')}
            className="px-6 py-3 bg-evergreen text-white rounded-lg hover:bg-evergreen-dark transition-colors flex items-center space-x-2"
          >
            <span>View Capstone Projects</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        {/* Penny AI Integration */}
        <div className="mt-8 bg-gradient-to-br from-sun-amber/10 to-sun-amber/5 dark:from-sun-amber/20 dark:to-sun-amber/10 rounded-xl p-6 border-2 border-sun-amber/30">
          <div className="flex items-start space-x-4">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-sun-amber to-orange-500 flex items-center justify-center flex-shrink-0">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
            <div className="flex-1">
              <h3 className="text-lg text-gray-900 dark:text-white mb-2">Penny: Your Cross-Platform Mentor</h3>
              <p className="text-sm text-gray-700 dark:text-gray-300 mb-4">
                Penny's role expands here from coach to cross-platform mentor, offering learning prompts 
                that bridge tools. Get help like: <em>"Want to connect your Notion workspace to your HubSpot contacts?"</em>
              </p>
              <button
                onClick={() => onNavigate('penny-chat')}
                className="px-4 py-2 bg-sun-amber text-white rounded-lg hover:bg-sun-amber-dark transition-colors text-sm flex items-center space-x-2"
              >
                <span>Chat with Penny</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Recognition Badge */}
        <div className="mt-8 text-center">
          <div className="inline-flex items-center space-x-3 px-6 py-3 bg-gradient-to-r from-evergreen to-teal-primary rounded-full border-2 border-evergreen/20">
            <Award className="w-6 h-6 text-white" />
            <span className="text-white">
              Complete all platforms to earn: <strong>Citizen Developer Mastery Badge</strong>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

interface PlatformTileProps {
  platform: Platform;
  enrolled: boolean;
  progress?: number;
  onNavigate: (page: string, platformId?: string) => void;
}

function PlatformTile({ platform, enrolled, progress = 0, onNavigate }: PlatformTileProps) {
  const Icon = platform.icon;
  
  const difficultyColors = {
    'Beginner': 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400',
    'Intermediate': 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-400',
    'Advanced': 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400',
  };

  return (
    <div className="bg-white dark:bg-slate-800 rounded-xl border-2 border-gray-200 dark:border-slate-700 hover:border-gray-300 dark:hover:border-slate-600 transition-all overflow-hidden group">
      {/* Platform Header */}
      <div 
        className="p-6 border-b border-gray-200 dark:border-slate-700"
        style={{ 
          background: `linear-gradient(135deg, ${platform.color}15 0%, ${platform.color}05 100%)` 
        }}
      >
        <div className="flex items-start justify-between mb-3">
          <div 
            className="w-12 h-12 rounded-lg flex items-center justify-center"
            style={{ backgroundColor: platform.color }}
          >
            <Icon className="w-7 h-7 text-white" />
          </div>
          
          {enrolled && (
            <ProgressRing progress={progress} size={48} color={platform.color} />
          )}
        </div>

        <h3 className="text-lg text-gray-900 dark:text-white mb-1">{platform.name}</h3>
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">{platform.tagline}</p>
        
        <div className="flex items-center space-x-2">
          <Badge className={difficultyColors[platform.difficulty]}>
            {platform.difficulty}
          </Badge>
          <Badge variant="outline" className="text-xs">
            {platform.category}
          </Badge>
        </div>
      </div>

      {/* Platform Details */}
      <div className="p-6">
        <p className="text-sm text-gray-700 dark:text-gray-300 mb-4">
          {platform.description}
        </p>

        {/* Meta Info */}
        <div className="grid grid-cols-2 gap-3 mb-4 text-xs text-gray-600 dark:text-gray-400">
          <div className="flex items-center space-x-1">
            <Clock className="w-3 h-3" />
            <span>{platform.duration}</span>
          </div>
          <div className="flex items-center space-x-1">
            <BookOpen className="w-3 h-3" />
            <span>{platform.modules} modules</span>
          </div>
          <div className="flex items-center space-x-1">
            <Award className="w-3 h-3 text-sun-amber" />
            <span>{platform.points} points</span>
          </div>
          <div className="flex items-center space-x-1">
            <Target className="w-3 h-3" />
            <span>{platform.skills.length} skills</span>
          </div>
        </div>

        {/* Skills */}
        <div className="mb-4">
          <p className="text-xs text-gray-500 dark:text-gray-500 mb-2">Key Skills:</p>
          <div className="flex flex-wrap gap-1">
            {platform.skills.slice(0, 3).map((skill, index) => (
              <span
                key={index}
                className="text-xs px-2 py-1 bg-gray-100 dark:bg-slate-700 text-gray-700 dark:text-gray-300 rounded"
              >
                {skill}
              </span>
            ))}
            {platform.skills.length > 3 && (
              <span className="text-xs px-2 py-1 text-gray-500 dark:text-gray-500">
                +{platform.skills.length - 3} more
              </span>
            )}
          </div>
        </div>

        {/* Action Button */}
        {enrolled ? (
          <button
            onClick={() => onNavigate('platform-detail', platform.id)}
            className="w-full py-2 bg-gradient-to-r from-evergreen to-sky-blue text-white rounded-lg hover:opacity-90 transition-opacity flex items-center justify-center space-x-2"
          >
            <span>Continue Learning</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        ) : (
          <button
            onClick={() => onNavigate('platform-detail', platform.id)}
            className="w-full py-2 border-2 border-gray-300 dark:border-slate-600 text-gray-700 dark:text-gray-300 rounded-lg hover:border-evergreen hover:text-evergreen dark:hover:border-sky-blue dark:hover:text-sky-blue transition-colors flex items-center justify-center space-x-2"
          >
            <span>Explore Platform</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        )}
      </div>
    </div>
  );
}
