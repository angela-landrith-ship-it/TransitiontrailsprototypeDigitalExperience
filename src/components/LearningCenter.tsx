import { Book, Play, Clock, Award, ChevronRight, CheckCircle, ExternalLink, Search, TrendingUp, Target, Sparkles, Star, Zap, Lightbulb, BookOpen, Trophy, Users, GraduationCap, ArrowRight, Filter, BarChart3, Settings, Code, Network, Crown, Brain, FileCheck } from 'lucide-react';
import { PageType } from '../App';
import { useState } from 'react';
import { ProgressRing } from './ProgressRing';
import { Badge } from './ui/badge';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface LearningCenterProps {
  onNavigate: (page: PageType) => void;
}

export function LearningCenter({ onNavigate }: LearningCenterProps) {
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'trails' | 'platforms' | 'activities'>('all');

  // Main Learning Categories
  const learningCategories = [
    {
      id: 'trails' as const,
      title: 'Trail of Mastery',
      description: '8 role-based learning paths from Beginner to Advanced',
      icon: <Trophy className="w-8 h-8" />,
      count: 8,
      color: 'from-[#2C6975] to-[#1f4f5a]',
      features: ['Guided curriculum', 'Expert coaching', 'Certification prep'],
    },
    {
      id: 'platforms' as const,
      title: 'Citizen Developer',
      description: 'Master 10 no-code/low-code platforms',
      icon: <Sparkles className="w-8 h-8" />,
      count: 10,
      color: 'from-[#3B6A52] to-[#2a5140]',
      features: ['Self-paced', 'Multi-platform', 'Real-world projects'],
    },
    {
      id: 'activities' as const,
      title: 'Learning Activities',
      description: 'Missions, projects, and collaborative learning',
      icon: <Target className="w-8 h-8" />,
      count: 4,
      color: 'from-[#F9A03F] to-[#e89135]',
      features: ['Daily missions', 'Team projects', 'Peer review'],
    },
  ];

  // Trail of Mastery Programs (8 trails)
  const trailPrograms = [
    {
      id: 'business-analyst',
      title: 'Business Analyst',
      level: 'Beginner',
      icon: <BarChart3 className="w-6 h-6" />,
      color: 'blue',
      duration: '12-16 weeks',
      points: 300,
      badge: 'Business Process Expert',
      description: 'Excel in discovery, documentation, and process optimization.',
      skills: ['Requirements', 'Stakeholder Interviews', 'Process Mapping'],
    },
    {
      id: 'salesforce-admin',
      title: 'Salesforce Administrator',
      level: 'Beginner',
      icon: <Settings className="w-6 h-6" />,
      color: 'amber',
      duration: '12-16 weeks',
      points: 300,
      badge: 'Certified Platform Expert',
      description: 'Master user management, security, automation, and configuration.',
      skills: ['Security', 'Automation', 'Reports & Dashboards'],
    },
    {
      id: 'citizen-developer',
      title: 'Citizen Developer Platforms',
      level: 'Intermediate',
      icon: <Sparkles className="w-6 h-6" />,
      color: 'evergreen',
      duration: 'Self-Paced',
      points: 2200,
      badge: 'Multi-Platform Maker',
      description: 'Master 10 platforms: HubSpot, Canva, Notion, Airtable, Jotform, Monday.com, Mailchimp & more.',
      skills: ['10 Platforms', 'No-Code Tools', 'Integration'],
      isExpanded: true,
    },
    {
      id: 'ai-specialist',
      title: 'AI for Digital Platforms',
      level: 'Intermediate',
      icon: <Brain className="w-6 h-6" />,
      color: 'blue',
      duration: '12-16 weeks',
      points: 350,
      badge: 'AI Innovation Leader',
      description: 'Master AI tools: Salesforce Einstein, Canva AI, Jotform AI, automation & prompt engineering.',
      skills: ['Einstein AI', 'AI Design', 'Prompt Engineering'],
      isNew: true,
    },
    {
      id: 'product-owner',
      title: 'Product Owner',
      level: 'Intermediate',
      icon: <Target className="w-6 h-6" />,
      color: 'blue',
      duration: '12-16 weeks',
      points: 300,
      badge: 'Agile Product Leader',
      description: 'Master backlog management, user stories, and agile delivery.',
      skills: ['Backlog Management', 'User Stories', 'Agile'],
    },
    {
      id: 'developer',
      title: 'Salesforce Developer',
      level: 'Intermediate',
      icon: <Code className="w-6 h-6" />,
      color: 'teal',
      duration: '12-16 weeks',
      points: 300,
      badge: 'Certified Developer',
      description: 'Build expertise in Apex, Lightning Web Components, and API integrations.',
      skills: ['Apex', 'Lightning Web Components', 'APIs'],
    },
    {
      id: 'product-manager',
      title: 'Product Manager',
      level: 'Advanced',
      icon: <Crown className="w-6 h-6" />,
      color: 'amber',
      duration: '12-16 weeks',
      points: 300,
      badge: 'Strategic Product Leader',
      description: 'Lead product strategy, roadmaps, and cross-functional teams.',
      skills: ['Strategy', 'Roadmaps', 'Leadership'],
    },
    {
      id: 'solutions-architect',
      title: 'Solutions Architect',
      level: 'Advanced',
      icon: <Network className="w-6 h-6" />,
      color: 'evergreen',
      duration: '12-16 weeks',
      points: 300,
      badge: 'Enterprise Architect',
      description: 'Design end-to-end solutions with data modeling and multi-cloud integration.',
      skills: ['Architecture', 'Data Modeling', 'Integration'],
    },
  ];

  // Citizen Developer Platforms (10 platforms)
  const citizenPlatforms = [
    { name: 'HubSpot', points: 250, icon: '📧', category: 'Marketing & Sales' },
    { name: 'Canva', points: 200, icon: '🎨', category: 'Design & Creative' },
    { name: 'Notion', points: 250, icon: '📝', category: 'Productivity' },
    { name: 'Airtable', points: 250, icon: '🗄️', category: 'Data & Automation' },
    { name: 'ClickUp', points: 200, icon: '✅', category: 'Project Management' },
    { name: 'Zapier', points: 275, icon: '⚡', category: 'Integration' },
    { name: 'Jotform', points: 200, icon: '📋', category: 'Forms & Data', isNew: true },
    { name: 'Monday.com', points: 250, icon: '📅', category: 'Project Management', isNew: true },
    { name: 'Mailchimp', points: 225, icon: '📧', category: 'Email Marketing', isNew: true },
    { name: 'Innovation Lab', points: 300, icon: '🌐', category: 'Innovation' },
  ];

  // Learning Activities
  const learningActivities = [
    {
      id: 'trail-missions',
      title: 'Trail Missions',
      icon: <Target className="w-6 h-6" />,
      description: 'Complete daily and weekly challenges to earn points and badges',
      color: 'from-[#F9A03F] to-[#e89135]',
      action: 'View Missions',
      stats: { daily: 3, weekly: 2, total: 145 },
    },
    {
      id: 'capstone-projects',
      title: 'Capstone Projects',
      icon: <Trophy className="w-6 h-6" />,
      description: 'Build real-world solutions for nonprofit partners',
      color: 'from-[#2C6975] to-[#1f4f5a]',
      action: 'Browse Projects',
      stats: { active: 12, completed: 47 },
    },
    {
      id: 'study-groups',
      title: 'Study Groups',
      icon: <Users className="w-6 h-6" />,
      description: 'Collaborate with peers in structured learning groups',
      color: 'from-[#7EB5C1] to-[#5a9fb0]',
      action: 'Join a Group',
      stats: { available: 18, members: 234 },
    },
    {
      id: 'peer-review',
      title: 'Peer Review',
      icon: <FileCheck className="w-6 h-6" />,
      description: 'Review and provide feedback on peer projects',
      color: 'from-[#3B6A52] to-[#2a5140]',
      action: 'Start Reviewing',
      stats: { pending: 5, completed: 23 },
    },
  ];

  // Filter content based on selected category
  const getFilteredContent = () => {
    if (selectedCategory === 'trails') {
      return trailPrograms;
    } else if (selectedCategory === 'platforms') {
      return citizenPlatforms;
    } else if (selectedCategory === 'activities') {
      return learningActivities;
    }
    return null; // Show all
  };

  return (
    <div className="min-h-screen bg-[#F5F3E8] dark:bg-slate-900">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-[#2C6975] to-[#3B6A52] dark:from-[#1e4a53] dark:to-[#2a5140] text-white overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <ImageWithFallback
            src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1200"
            alt="Learning Together"
            className="w-full h-full object-cover"
          />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center mb-12">
            <h1 className="text-5xl mb-4">Explore Your Path to Digital Skill Mastery</h1>
            <p className="text-xl text-white/90 max-w-3xl mx-auto">
              Choose from 8 Trail of Mastery programs, 10 Citizen Developer platforms, or dive into collaborative learning activities. Build real skills for real impact.
            </p>
          </div>

          {/* Learning Category Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {learningCategories.map((category) => {
              const isSelected = selectedCategory === category.id;
              return (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(isSelected ? 'all' : category.id)}
                  className={`group bg-white/10 dark:bg-white/5 backdrop-blur-sm border-2 ${
                    isSelected ? 'border-white' : 'border-white/20 dark:border-white/10'
                  } rounded-xl p-6 text-left transition-all duration-150 hover:bg-white/20 dark:hover:bg-white/10 hover:scale-105 hover:shadow-xl`}
                >
                  <div className={`w-16 h-16 rounded-lg bg-gradient-to-br ${category.color} flex items-center justify-center text-white mb-4 group-hover:scale-110 transition-transform duration-150`}>
                    {category.icon}
                  </div>
                  
                  <h3 className="text-xl text-white mb-2 group-hover:text-[#F9A03F] transition-colors duration-150">
                    {category.title}
                  </h3>
                  <p className="text-sm text-white/80 mb-4">{category.description}</p>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-2xl text-white">{category.count}</span>
                    <span className="text-sm text-white/60">
                      {category.id === 'trails' ? 'trails' : category.id === 'platforms' ? 'platforms' : 'activities'}
                    </span>
                  </div>

                  {/* Features */}
                  <div className="mt-4 space-y-1">
                    {category.features.map((feature, idx) => (
                      <div key={idx} className="flex items-center space-x-2 text-xs text-white/70">
                        <CheckCircle className="w-3 h-3" />
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>

                  <div className="mt-4 flex items-center space-x-2 text-sm text-white group-hover:text-[#F9A03F] transition-colors duration-150">
                    <span>{isSelected ? 'Viewing' : 'Explore'}</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-150" />
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Show All Categories */}
        {selectedCategory === 'all' && (
          <div className="space-y-12">
            {/* Trail of Mastery Programs */}
            <section>
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-3xl text-gray-900 dark:text-white mb-2">Trail of Mastery Programs</h2>
                  <p className="text-gray-600 dark:text-slate-400">8 comprehensive learning paths from Beginner to Advanced</p>
                </div>
                <button
                  onClick={() => onNavigate('trail-mastery')}
                  className="flex items-center space-x-2 px-4 py-2 bg-[#2C6975] dark:bg-[#7EB5C1] text-white dark:text-slate-900 rounded-lg hover:bg-[#1f4f5a] dark:hover:bg-[#6a9fb0] transition-colors"
                >
                  <span>View All Trails</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {trailPrograms.map((trail) => (
                  <div
                    key={trail.id}
                    onClick={() => {
                      if (trail.id === 'citizen-developer') {
                        onNavigate('citizen-developer');
                      } else {
                        onNavigate('trail-mastery');
                      }
                    }}
                    className="group bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-gray-200 dark:border-slate-700 p-5 hover:shadow-lg hover:border-[#2C6975] dark:hover:border-[#7EB5C1] transition-all cursor-pointer"
                  >
                    {/* Icon & Level */}
                    <div className="flex items-center justify-between mb-3">
                      <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${
                        trail.color === 'blue' ? 'from-[#7EB5C1] to-[#5a9fb0]' :
                        trail.color === 'amber' ? 'from-[#F9A03F] to-[#e89135]' :
                        trail.color === 'teal' ? 'from-[#2C6975] to-[#1f4f5a]' :
                        'from-[#3B6A52] to-[#2a5140]'
                      } flex items-center justify-center text-white`}>
                        {trail.icon}
                      </div>
                      {trail.isNew && (
                        <Badge className="bg-[#F9A03F] text-white">NEW</Badge>
                      )}
                    </div>

                    <h3 className="text-gray-900 dark:text-white mb-1 group-hover:text-[#2C6975] dark:group-hover:text-[#7EB5C1] transition-colors">
                      {trail.title}
                    </h3>
                    
                    <div className="flex items-center space-x-2 mb-3">
                      <Badge variant="outline" className={`text-xs ${
                        trail.level === 'Beginner' ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 border-green-300 dark:border-green-700' :
                        trail.level === 'Intermediate' ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 border-blue-300 dark:border-blue-700' :
                        'bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-400 border-purple-300 dark:border-purple-700'
                      }`}>
                        {trail.level}
                      </Badge>
                      {trail.isExpanded && (
                        <Badge variant="outline" className="text-xs bg-[#3B6A52]/10 dark:bg-[#3B6A52]/20 text-[#3B6A52] dark:text-green-400 border-[#3B6A52]/30 dark:border-green-700">
                          10 Platforms
                        </Badge>
                      )}
                    </div>

                    <p className="text-sm text-gray-600 dark:text-slate-400 mb-3 line-clamp-2">{trail.description}</p>

                    <div className="flex items-center justify-between text-xs text-gray-500 dark:text-slate-500 mb-3">
                      <div className="flex items-center space-x-1">
                        <Clock className="w-3 h-3" />
                        <span>{trail.duration}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Trophy className="w-3 h-3" />
                        <span>{trail.points} pts</span>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-1 mb-3">
                      {trail.skills.slice(0, 3).map((skill, idx) => (
                        <span key={idx} className="px-2 py-1 bg-gray-100 dark:bg-slate-700 text-gray-600 dark:text-slate-300 text-xs rounded">
                          {skill}
                        </span>
                      ))}
                    </div>

                    <button className="w-full py-2 bg-[#2C6975]/10 dark:bg-[#7EB5C1]/20 text-[#2C6975] dark:text-[#7EB5C1] rounded-lg hover:bg-[#2C6975]/20 dark:hover:bg-[#7EB5C1]/30 transition-colors flex items-center justify-center space-x-2 group-hover:bg-[#2C6975] dark:group-hover:bg-[#7EB5C1] group-hover:text-white dark:group-hover:text-slate-900">
                      <span>Learn More</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            </section>

            {/* Citizen Developer Platforms Highlight */}
            <section className="bg-gradient-to-br from-[#3B6A52]/10 to-[#7EB5C1]/10 dark:from-[#3B6A52]/20 dark:to-[#7EB5C1]/20 rounded-2xl border-2 border-[#3B6A52]/30 dark:border-[#3B6A52]/50 p-8">
              <div className="flex items-start justify-between mb-6">
                <div>
                  <div className="flex items-center space-x-3 mb-2">
                    <Sparkles className="w-8 h-8 text-[#3B6A52] dark:text-green-400" />
                    <h2 className="text-3xl text-gray-900 dark:text-white">Citizen Developer: 10 Platforms</h2>
                  </div>
                  <p className="text-gray-600 dark:text-slate-300">Master no-code and low-code tools to build cross-platform solutions</p>
                  <div className="flex items-center space-x-4 mt-4">
                    <div className="flex items-center space-x-2">
                      <Trophy className="w-5 h-5 text-[#F9A03F]" />
                      <span className="text-gray-900 dark:text-white">2,200 total points</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Target className="w-5 h-5 text-[#2C6975] dark:text-[#7EB5C1]" />
                      <span className="text-gray-900 dark:text-white">Self-paced learning</span>
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => onNavigate('citizen-developer')}
                  className="px-6 py-3 bg-[#3B6A52] dark:bg-green-600 text-white rounded-lg hover:bg-[#2a5140] dark:hover:bg-green-700 transition-colors flex items-center space-x-2"
                >
                  <span>Explore All Platforms</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
                {citizenPlatforms.map((platform, idx) => (
                  <div
                    key={idx}
                    className="bg-white dark:bg-slate-800 rounded-lg p-4 border border-gray-200 dark:border-slate-700 hover:shadow-md hover:border-[#3B6A52] dark:hover:border-green-600 transition-all cursor-pointer"
                  >
                    <div className="text-3xl mb-2">{platform.icon}</div>
                    <div className="text-sm text-gray-900 dark:text-white mb-1">{platform.name}</div>
                    <div className="text-xs text-gray-500 dark:text-slate-400 mb-2">{platform.category}</div>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-[#F9A03F]">{platform.points} pts</span>
                      {platform.isNew && (
                        <Badge className="text-xs bg-[#F9A03F] text-white">NEW</Badge>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Learning Activities */}
            <section>
              <div className="mb-6">
                <h2 className="text-3xl text-gray-900 dark:text-white mb-2">Learning Activities</h2>
                <p className="text-gray-600 dark:text-slate-400">Enhance your learning through missions, projects, and collaboration</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {learningActivities.map((activity) => (
                  <div
                    key={activity.id}
                    className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-gray-200 dark:border-slate-700 p-6 hover:shadow-lg hover:border-[#2C6975] dark:hover:border-[#7EB5C1] transition-all"
                  >
                    <div className={`w-14 h-14 rounded-lg bg-gradient-to-br ${activity.color} flex items-center justify-center text-white mb-4`}>
                      {activity.icon}
                    </div>
                    
                    <h3 className="text-xl text-gray-900 dark:text-white mb-2">{activity.title}</h3>
                    <p className="text-sm text-gray-600 dark:text-slate-400 mb-4">{activity.description}</p>

                    <div className="flex items-center space-x-4 mb-4 text-sm">
                      {Object.entries(activity.stats).map(([key, value], idx) => (
                        <div key={idx} className="flex items-center space-x-1">
                          <span className="text-gray-500 dark:text-slate-500 capitalize">{key}:</span>
                          <span className="text-gray-900 dark:text-white">{value}</span>
                        </div>
                      ))}
                    </div>

                    <button
                      onClick={() => onNavigate(activity.id as PageType)}
                      className="w-full py-2 bg-[#2C6975] dark:bg-[#7EB5C1] text-white dark:text-slate-900 rounded-lg hover:bg-[#1f4f5a] dark:hover:bg-[#6a9fb0] transition-colors flex items-center justify-center space-x-2"
                    >
                      <span>{activity.action}</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            </section>
          </div>
        )}

        {/* Filtered Views */}
        {selectedCategory === 'trails' && (
          <div>
            <div className="mb-6">
              <h2 className="text-3xl text-gray-900 dark:text-white mb-2">Trail of Mastery Programs (8 Trails)</h2>
              <p className="text-gray-600 dark:text-slate-400">Comprehensive learning paths designed for real-world expertise</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {trailPrograms.map((trail) => (
                <div
                  key={trail.id}
                  onClick={() => {
                    if (trail.id === 'citizen-developer') {
                      onNavigate('citizen-developer');
                    } else {
                      onNavigate('trail-mastery');
                    }
                  }}
                  className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-gray-200 dark:border-slate-700 p-6 hover:shadow-lg hover:border-[#2C6975] dark:hover:border-[#7EB5C1] transition-all cursor-pointer"
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className={`w-14 h-14 rounded-lg bg-gradient-to-br ${
                      trail.color === 'blue' ? 'from-[#7EB5C1] to-[#5a9fb0]' :
                      trail.color === 'amber' ? 'from-[#F9A03F] to-[#e89135]' :
                      trail.color === 'teal' ? 'from-[#2C6975] to-[#1f4f5a]' :
                      'from-[#3B6A52] to-[#2a5140]'
                    } flex items-center justify-center text-white`}>
                      {trail.icon}
                    </div>
                    {trail.isNew && <Badge className="bg-[#F9A03F] text-white">NEW</Badge>}
                  </div>

                  <h3 className="text-xl text-gray-900 dark:text-white mb-2">{trail.title}</h3>
                  <Badge variant="outline" className={`mb-3 ${
                    trail.level === 'Beginner' ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 border-green-300 dark:border-green-700' :
                    trail.level === 'Intermediate' ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 border-blue-300 dark:border-blue-700' :
                    'bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-400 border-purple-300 dark:border-purple-700'
                  }`}>
                    {trail.level}
                  </Badge>

                  <p className="text-sm text-gray-600 dark:text-slate-400 mb-4">{trail.description}</p>

                  <div className="space-y-2 mb-4">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-500 dark:text-slate-500">Duration:</span>
                      <span className="text-gray-900 dark:text-white">{trail.duration}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-500 dark:text-slate-500">Points:</span>
                      <span className="text-gray-900 dark:text-white">{trail.points}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-500 dark:text-slate-500">Badge:</span>
                      <span className="text-gray-900 dark:text-white text-xs">{trail.badge}</span>
                    </div>
                  </div>

                  <button className="w-full py-2 bg-[#2C6975] dark:bg-[#7EB5C1] text-white dark:text-slate-900 rounded-lg hover:bg-[#1f4f5a] dark:hover:bg-[#6a9fb0] transition-colors">
                    View Trail Details
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {selectedCategory === 'platforms' && (
          <div>
            <div className="mb-6">
              <h2 className="text-3xl text-gray-900 dark:text-white mb-2">Citizen Developer Platforms (10 Tools)</h2>
              <p className="text-gray-600 dark:text-slate-400">Master no-code and low-code platforms for cross-platform solutions</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
              {citizenPlatforms.map((platform, idx) => (
                <div
                  key={idx}
                  onClick={() => onNavigate('citizen-developer')}
                  className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-gray-200 dark:border-slate-700 p-5 hover:shadow-lg hover:border-[#3B6A52] dark:hover:border-green-600 transition-all cursor-pointer"
                >
                  <div className="text-4xl mb-3">{platform.icon}</div>
                  <h3 className="text-lg text-gray-900 dark:text-white mb-2">{platform.name}</h3>
                  <p className="text-sm text-gray-600 dark:text-slate-400 mb-3">{platform.category}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-[#F9A03F]">{platform.points} points</span>
                    {platform.isNew && (
                      <Badge className="text-xs bg-[#F9A03F] text-white">NEW</Badge>
                    )}
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-8 text-center">
              <button
                onClick={() => onNavigate('citizen-developer')}
                className="px-8 py-3 bg-[#3B6A52] dark:bg-green-600 text-white rounded-lg hover:bg-[#2a5140] dark:hover:bg-green-700 transition-colors"
              >
                Explore All Platforms
              </button>
            </div>
          </div>
        )}

        {selectedCategory === 'activities' && (
          <div>
            <div className="mb-6">
              <h2 className="text-3xl text-gray-900 dark:text-white mb-2">Learning Activities</h2>
              <p className="text-gray-600 dark:text-slate-400">Missions, projects, and collaborative learning opportunities</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {learningActivities.map((activity) => (
                <div
                  key={activity.id}
                  className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-gray-200 dark:border-slate-700 p-8 hover:shadow-lg transition-all"
                >
                  <div className={`w-16 h-16 rounded-lg bg-gradient-to-br ${activity.color} flex items-center justify-center text-white mb-4`}>
                    {activity.icon}
                  </div>
                  
                  <h3 className="text-2xl text-gray-900 dark:text-white mb-3">{activity.title}</h3>
                  <p className="text-gray-600 dark:text-slate-400 mb-6">{activity.description}</p>

                  <div className="grid grid-cols-3 gap-4 mb-6">
                    {Object.entries(activity.stats).map(([key, value], idx) => (
                      <div key={idx} className="text-center">
                        <div className="text-2xl text-gray-900 dark:text-white mb-1">{value}</div>
                        <div className="text-xs text-gray-500 dark:text-slate-500 capitalize">{key}</div>
                      </div>
                    ))}
                  </div>

                  <button
                    onClick={() => onNavigate(activity.id as PageType)}
                    className="w-full py-3 bg-[#2C6975] dark:bg-[#7EB5C1] text-white dark:text-slate-900 rounded-lg hover:bg-[#1f4f5a] dark:hover:bg-[#6a9fb0] transition-colors"
                  >
                    {activity.action}
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Quick Stats Summary (shown for all views) */}
        <div className="mt-12 bg-gradient-to-br from-[#2C6975]/10 to-[#F9A03F]/10 dark:from-[#2C6975]/20 dark:to-[#F9A03F]/20 rounded-2xl border-2 border-[#2C6975]/30 dark:border-[#2C6975]/50 p-8">
          <div className="text-center mb-6">
            <h3 className="text-2xl text-gray-900 dark:text-white mb-2">Your Learning Journey</h3>
            <p className="text-gray-600 dark:text-slate-400">Track your progress across all programs</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="text-4xl text-[#2C6975] dark:text-[#7EB5C1] mb-2">4,075</div>
              <div className="text-sm text-gray-600 dark:text-slate-400">Total Points Available</div>
            </div>
            <div className="text-center">
              <div className="text-4xl text-[#3B6A52] dark:text-green-400 mb-2">8</div>
              <div className="text-sm text-gray-600 dark:text-slate-400">Trail Programs</div>
            </div>
            <div className="text-center">
              <div className="text-4xl text-[#F9A03F] mb-2">10</div>
              <div className="text-sm text-gray-600 dark:text-slate-400">Citizen Platforms</div>
            </div>
            <div className="text-center">
              <div className="text-4xl text-[#7EB5C1] dark:text-sky-400 mb-2">42</div>
              <div className="text-sm text-gray-600 dark:text-slate-400">Total Modules</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
