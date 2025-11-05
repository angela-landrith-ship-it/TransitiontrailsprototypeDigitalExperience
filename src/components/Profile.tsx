import { ArrowLeft, User, Mail, Calendar, Award, BookOpen, Target, Edit, Linkedin, TrendingUp, Brain, CheckCircle, AlertCircle, ChevronDown, ChevronUp, Sparkles, Clock, Trophy, Zap, Briefcase, Star, BookMarked, Upload, FileText, Download, Eye, MessageSquare, ThumbsUp, X as XIcon, Check, Loader2, RefreshCw, Copy, Share2, Plus, ExternalLink, ChevronRight, GraduationCap, Code, Database, Users, FileCode, Palette, BarChart } from 'lucide-react';
import { PageType } from '../App';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar } from 'recharts';
import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { Textarea } from './ui/textarea';
import { Switch } from './ui/switch';
import { Label } from './ui/label';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from './ui/dialog';
import { toast } from 'sonner@2.0.3';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from './ui/collapsible';

interface ProfileProps {
  onNavigate: (page: PageType) => void;
}

export function Profile({ onNavigate }: ProfileProps) {
  const [activeTab, setActiveTab] = useState('resume-linkedin');
  const [isPennyOpen, setIsPennyOpen] = useState(false);
  
  // Resume & LinkedIn states
  const [resumeUploaded, setResumeUploaded] = useState(false);
  const [resumeFileName, setResumeFileName] = useState('');
  const [isResumeProcessing, setIsResumeProcessing] = useState(false);
  const [linkedInTab, setLinkedInTab] = useState('headline');
  const [isLinkedInConnected, setIsLinkedInConnected] = useState(true);
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const [sharePostType, setSharePostType] = useState<'capstone' | 'badge' | 'milestone'>('capstone');
  const [sharePostText, setSharePostText] = useState('');
  
  // Skills & Certifications states
  const [badgeFilter, setBadgeFilter] = useState<'all' | 'trailhead' | 'transition-trails'>('all');
  
  // Goals & Assessments states
  const [isGoalModalOpen, setIsGoalModalOpen] = useState(false);
  const [newGoalText, setNewGoalText] = useState('');

  // User profile data
  const userProfile = {
    name: 'Alex Johnson',
    email: 'alex.johnson@email.com',
    cohort: 'Spring 2025',
    trail: 'Salesforce Admin',
    startDate: 'January 15, 2025',
    location: 'Portland, OR',
    timezone: 'Pacific Time',
    points: 2380,
    totalPoints: 3500,
    avatar: 'AJ',
    bio: 'Career transitioner passionate about Salesforce and helping nonprofits scale their impact through technology.',
    linkedInUrl: 'https://linkedin.com/in/alexjohnson',
    githubUrl: 'https://github.com/alexjohnson',
  };

  // Skills data from multiple sources
  const skillsData = {
    technical: [
      { name: 'Salesforce Admin', level: 75, source: 'trailhead', lastUpdated: '2 days ago', trend: 'up' },
      { name: 'Process Automation', level: 82, source: 'pluralsight', lastUpdated: '1 week ago', trend: 'up' },
      { name: 'Flow Builder', level: 68, source: 'trailhead', lastUpdated: '3 days ago', trend: 'stable' },
      { name: 'Data Management', level: 71, source: 'trailhead', lastUpdated: '5 days ago', trend: 'up' },
      { name: 'Reports & Dashboards', level: 65, source: 'pluralsight', lastUpdated: '1 week ago', trend: 'stable' },
      { name: 'Security Model', level: 58, source: 'trailhead', lastUpdated: '2 weeks ago', trend: 'up' },
    ],
    soft: [
      { name: 'Communication', level: 85, source: 'coach-feedback', lastUpdated: '1 week ago' },
      { name: 'Problem Solving', level: 78, source: 'coach-feedback', lastUpdated: '1 week ago' },
      { name: 'Team Collaboration', level: 88, source: 'peer-review', lastUpdated: '3 days ago' },
      { name: 'Time Management', level: 72, source: 'self-assessment', lastUpdated: '2 weeks ago' },
    ]
  };

  // Radar chart data for skills visualization
  const skillRadarData = [
    { skill: 'Admin', current: 75, target: 90, industry: 70 },
    { skill: 'Automation', current: 82, target: 85, industry: 65 },
    { skill: 'Data Mgmt', current: 71, target: 80, industry: 68 },
    { skill: 'Reporting', current: 65, target: 75, industry: 62 },
    { skill: 'Security', current: 58, target: 75, industry: 60 },
    { skill: 'Integration', current: 45, target: 70, industry: 55 },
  ];

  // Certifications
  const certifications = [
    {
      name: 'Salesforce Certified Administrator',
      status: 'in-progress' as const,
      progress: 68,
      targetDate: 'May 1, 2025',
      modulesCompleted: 18,
      modulesTotal: 24,
      studyHoursWeek: 10,
      lastActivity: '2 hours ago',
      source: 'trailhead' as const,
      examDate: 'April 25, 2025',
      mockTestScore: 78,
      passingScore: 65,
    },
    {
      name: 'Platform App Builder',
      status: 'planned' as const,
      progress: 0,
      targetDate: 'June 1, 2025',
      modulesCompleted: 0,
      modulesTotal: 20,
      studyHoursWeek: 0,
      lastActivity: 'Not started',
      source: 'trailhead' as const,
    },
    {
      name: 'JavaScript Developer I',
      status: 'planned' as const,
      targetDate: 'September 1, 2025',
      source: 'user-added' as const,
    },
  ];

  // Badges from Trailhead and Transition Trails
  const badges = [
    { name: 'Apex Specialist', icon: '⚡', earnedDate: 'Feb 28, 2025', category: 'Development', source: 'trailhead' as const, points: 500 },
    { name: 'Report Master', icon: '📊', earnedDate: 'Feb 22, 2025', category: 'Analytics', source: 'transition-trails' as const, points: 150 },
    { name: 'Lightning Experience Specialist', icon: '🌩️', earnedDate: 'Feb 20, 2025', category: 'UI/UX', source: 'trailhead' as const, points: 400 },
    { name: 'Data Architect', icon: '🏗️', earnedDate: 'Feb 20, 2025', category: 'Data', source: 'transition-trails' as const, points: 200 },
    { name: 'Process Automation', icon: '🔄', earnedDate: 'Feb 18, 2025', category: 'Automation', source: 'trailhead' as const, points: 600 },
    { name: 'Automation Expert', icon: '🤖', earnedDate: 'Feb 15, 2025', category: 'Automation', source: 'transition-trails' as const, points: 175 },
    { name: 'Security Specialist', icon: '🔒', earnedDate: 'Feb 10, 2025', category: 'Security', source: 'trailhead' as const, points: 350 },
    { name: 'Flow Builder', icon: '⚡', earnedDate: 'Feb 5, 2025', category: 'Automation', source: 'transition-trails' as const, points: 125 },
    { name: 'Data Management', icon: '💾', earnedDate: 'Feb 1, 2025', category: 'Data', source: 'trailhead' as const, points: 300 },
    { name: 'User Management', icon: '👥', earnedDate: 'Jan 25, 2025', category: 'Admin', source: 'transition-trails' as const, points: 100 },
    { name: 'Admin Basics', icon: '🏆', earnedDate: 'Jan 20, 2025', category: 'Foundation', source: 'trailhead' as const, points: 200 },
    { name: 'First Steps', icon: '🎯', earnedDate: 'Jan 15, 2025', category: 'Foundation', source: 'transition-trails' as const, points: 50 },
  ];

  const filteredBadges = badgeFilter === 'all' ? badges : badges.filter(b => b.source === badgeFilter);

  // Career goals
  const careerGoals = [
    {
      id: 1,
      goal: 'Become a Certified Salesforce Administrator',
      category: 'certification' as const,
      targetDate: 'May 2025',
      status: 'in-progress' as const,
      progress: 68,
      milestones: [
        { name: 'Complete all modules', completed: false },
        { name: 'Pass practice exam (65%)', completed: true },
        { name: 'Schedule certification exam', completed: false },
        { name: 'Pass certification exam', completed: false },
      ],
      pennyInsight: 'You\'re on track! Focus on Security & Access modules this week.',
    },
    {
      id: 2,
      goal: 'Transition to Salesforce Admin role',
      category: 'career' as const,
      targetDate: 'July 2025',
      status: 'in-progress' as const,
      progress: 45,
      milestones: [
        { name: 'Complete capstone project', completed: false },
        { name: 'Get certified', completed: false },
        { name: 'Build portfolio', completed: false },
        { name: 'Apply to 10 jobs', completed: false },
      ],
      pennyInsight: 'Update your LinkedIn headline to include "Salesforce Admin" to attract recruiters.',
    },
    {
      id: 3,
      goal: 'Build 3 portfolio projects',
      category: 'skill' as const,
      targetDate: 'June 2025',
      status: 'in-progress' as const,
      progress: 33,
      milestones: [
        { name: 'Capstone project (nonprofit CRM)', completed: false },
        { name: 'Personal automation project', completed: false },
        { name: 'Open source contribution', completed: false },
      ],
      pennyInsight: 'Consider showcasing your capstone on GitHub and linking it to LinkedIn.',
    },
  ];

  // Assessments data
  const skillIQHistory = [
    { date: 'Feb 15', score: 178, level: 'Proficient' },
    { date: 'Jan 15', score: 152, level: 'Working' },
    { date: 'Dec 15', score: 128, level: 'Working' },
  ];

  const selfAssessments = [
    {
      quarter: 'Q4 2024',
      completedDate: 'Dec 28, 2024',
      status: 'completed' as const,
      coachReviewed: true,
      coachFeedback: 'Strong progress in automation skills, certification on track',
      confidenceLevels: { technical: 7, communication: 8, problemSolving: 7 },
    },
    {
      quarter: 'Q3 2024',
      completedDate: 'Sep 30, 2024',
      status: 'completed' as const,
      coachReviewed: true,
      coachFeedback: 'Good foundation, focus on hands-on practice',
      confidenceLevels: { technical: 5, communication: 7, problemSolving: 6 },
    },
  ];

  const nextSelfAssessment = {
    quarter: 'Q1 2025',
    dueDate: 'March 31, 2025',
    daysRemaining: 25,
  };

  // Penny AI suggestions for each tab
  const pennyInsights = {
    'resume-linkedin': [
      {
        title: 'LinkedIn Headline Optimization',
        insight: 'Your headline should include "Salesforce" to improve recruiter visibility by 3x',
        action: 'Update Headline',
        priority: 'high' as const,
      },
      {
        title: 'Resume Achievement Gap',
        insight: 'Add quantifiable results from your capstone project (e.g., "Improved nonprofit data accuracy by 40%")',
        action: 'Edit Resume',
        priority: 'high' as const,
      },
      {
        title: 'Share Your Progress',
        insight: 'You haven\'t shared any achievements this week. Posting increases profile views by 5x!',
        action: 'Create Post',
        priority: 'medium' as const,
      },
    ],
    'skills-certs': [
      {
        title: 'Certification Exam Ready',
        insight: 'Your practice test score (78%) is above passing (65%). Schedule your exam now!',
        action: 'Schedule Exam',
        priority: 'high' as const,
      },
      {
        title: 'Skill Gap Detected',
        insight: 'Security & Access is your weakest area (58%). Focus here before the exam.',
        action: 'View Resources',
        priority: 'high' as const,
      },
      {
        title: 'Badge Milestone',
        insight: 'You\'re 1 badge away from earning the "Automation Master" superbadge!',
        action: 'See Progress',
        priority: 'medium' as const,
      },
    ],
    'goals-assessments': [
      {
        title: 'Goal Alignment',
        insight: 'Your career goal timeline (July 2025) assumes May certification. Stay on schedule!',
        action: 'Review Timeline',
        priority: 'medium' as const,
      },
      {
        title: 'Assessment Due Soon',
        insight: 'Q1 Self-Assessment due in 25 days. Schedule time to reflect on your growth.',
        action: 'Schedule Time',
        priority: 'high' as const,
      },
      {
        title: 'Portfolio Suggestion',
        insight: 'Jobs in your area prefer candidates with GitHub portfolios. Showcase your capstone!',
        action: 'Create Portfolio',
        priority: 'medium' as const,
      },
    ],
  };

  const handleResumeUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setResumeFileName(file.name);
      setIsResumeProcessing(true);
      setTimeout(() => {
        setResumeUploaded(true);
        setIsResumeProcessing(false);
        toast.success('Resume uploaded and analyzed by Penny AI!');
      }, 2000);
    }
  };

  const handleLinkedInConnect = () => {
    toast.success('LinkedIn connected successfully!');
    setIsLinkedInConnected(true);
  };

  const handleShareAchievement = () => {
    toast.success('Post shared to LinkedIn!');
    setIsShareModalOpen(false);
    setSharePostText('');
  };

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

        {/* Profile Header Card */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
          <div className="flex items-start justify-between">
            <div className="flex items-start space-x-6">
              {/* Avatar */}
              <div className="w-24 h-24 rounded-full bg-gradient-to-br from-[#2C6975] to-[#7EB5C1] flex items-center justify-center text-white text-3xl flex-shrink-0">
                {userProfile.avatar}
              </div>

              {/* Profile Info */}
              <div className="flex-1">
                <div className="flex items-center space-x-3 mb-2">
                  <h1 className="text-3xl text-gray-900">{userProfile.name}</h1>
                  <Badge variant="outline" className="bg-[#2C6975]/10 text-[#2C6975] border-[#2C6975]">
                    {userProfile.trail}
                  </Badge>
                </div>
                <p className="text-gray-600 mb-4 max-w-2xl">{userProfile.bio}</p>
                
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                  <div>
                    <p className="text-gray-500 text-xs mb-1">Email</p>
                    <p className="text-gray-900 flex items-center space-x-1">
                      <Mail className="w-3 h-3" />
                      <span className="truncate">{userProfile.email}</span>
                    </p>
                  </div>
                  <div>
                    <p className="text-gray-500 text-xs mb-1">Cohort</p>
                    <p className="text-gray-900 flex items-center space-x-1">
                      <Users className="w-3 h-3" />
                      <span>{userProfile.cohort}</span>
                    </p>
                  </div>
                  <div>
                    <p className="text-gray-500 text-xs mb-1">Start Date</p>
                    <p className="text-gray-900 flex items-center space-x-1">
                      <Calendar className="w-3 h-3" />
                      <span>{userProfile.startDate}</span>
                    </p>
                  </div>
                  <div>
                    <p className="text-gray-500 text-xs mb-1">Progress</p>
                    <p className="text-gray-900 flex items-center space-x-1">
                      <Trophy className="w-3 h-3" />
                      <span>{userProfile.points}/{userProfile.totalPoints} pts</span>
                    </p>
                  </div>
                </div>

                {/* Social Links */}
                <div className="flex items-center space-x-3 mt-4">
                  <a
                    href={userProfile.linkedInUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center space-x-1 text-sm text-[#0A66C2] hover:underline"
                  >
                    <Linkedin className="w-4 h-4" />
                    <span>LinkedIn</span>
                  </a>
                  <a
                    href={userProfile.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center space-x-1 text-sm text-gray-700 hover:underline"
                  >
                    <ExternalLink className="w-4 h-4" />
                    <span>GitHub</span>
                  </a>
                </div>
              </div>
            </div>

            {/* Edit Profile Button */}
            <button className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-sm">
              <Edit className="w-4 h-4" />
              <span>Edit Profile</span>
            </button>
          </div>
        </div>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-8">
            <TabsTrigger value="resume-linkedin" className="flex items-center space-x-2">
              <Briefcase className="w-4 h-4" />
              <span>Resume & LinkedIn</span>
            </TabsTrigger>
            <TabsTrigger value="skills-certs" className="flex items-center space-x-2">
              <Award className="w-4 h-4" />
              <span>Skills & Certifications</span>
            </TabsTrigger>
            <TabsTrigger value="goals-assessments" className="flex items-center space-x-2">
              <Target className="w-4 h-4" />
              <span>Goals & Assessments</span>
            </TabsTrigger>
          </TabsList>

          {/* TAB 1: Resume & LinkedIn */}
          <TabsContent value="resume-linkedin" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Main Content - 2 columns */}
              <div className="lg:col-span-2 space-y-6">
                {/* Resume Builder */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-xl text-gray-900 flex items-center space-x-2">
                      <FileText className="w-5 h-5 text-[#2C6975]" />
                      <span>Penny Resume Builder</span>
                    </h3>
                    {resumeUploaded && (
                      <Badge variant="outline" className="bg-green-50 text-green-700 border-green-300">
                        <Check className="w-3 h-3 mr-1" />
                        AI Analyzed
                      </Badge>
                    )}
                  </div>

                  {!resumeUploaded ? (
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                      <Upload className="w-12 h-12 mx-auto text-gray-400 mb-4" />
                      <h4 className="text-gray-900 mb-2">Upload Your Resume</h4>
                      <p className="text-sm text-gray-600 mb-4">
                        Penny AI will analyze and suggest improvements
                      </p>
                      <label className="inline-flex items-center space-x-2 px-4 py-2 bg-[#2C6975] text-white rounded-lg hover:bg-[#1f4f5a] transition-colors cursor-pointer">
                        <Upload className="w-4 h-4" />
                        <span>Choose File</span>
                        <input
                          type="file"
                          accept=".pdf,.doc,.docx"
                          className="hidden"
                          onChange={handleResumeUpload}
                        />
                      </label>
                      <p className="text-xs text-gray-500 mt-2">PDF, DOC, or DOCX (max 5MB)</p>
                    </div>
                  ) : isResumeProcessing ? (
                    <div className="text-center py-8">
                      <Loader2 className="w-8 h-8 mx-auto text-[#2C6975] animate-spin mb-4" />
                      <p className="text-gray-600">Penny is analyzing your resume...</p>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {/* Resume Preview */}
                      <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                        <div className="flex items-center space-x-3">
                          <div className="w-10 h-10 bg-[#2C6975] rounded-lg flex items-center justify-center">
                            <FileText className="w-5 h-5 text-white" />
                          </div>
                          <div>
                            <p className="text-sm text-gray-900">{resumeFileName}</p>
                            <p className="text-xs text-gray-500">Last updated: 5 min ago</p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <button className="p-2 hover:bg-gray-200 rounded-lg transition-colors" title="Download">
                            <Download className="w-4 h-4 text-gray-600" />
                          </button>
                          <button className="p-2 hover:bg-gray-200 rounded-lg transition-colors" title="Preview">
                            <Eye className="w-4 h-4 text-gray-600" />
                          </button>
                        </div>
                      </div>

                      {/* Penny's Resume Analysis */}
                      <div className="border border-[#F9A03F]/30 bg-[#F9A03F]/5 rounded-lg p-4">
                        <div className="flex items-start space-x-3">
                          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#F9A03F] to-[#e89135] flex items-center justify-center flex-shrink-0">
                            <Sparkles className="w-4 h-4 text-white" />
                          </div>
                          <div className="flex-1">
                            <h4 className="text-sm text-gray-900 mb-2">Penny's Resume Analysis</h4>
                            <div className="space-y-2 text-sm">
                              <div className="flex items-start space-x-2">
                                <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                                <p className="text-gray-700">Strong: Clear education and cohort experience highlighted</p>
                              </div>
                              <div className="flex items-start space-x-2">
                                <AlertCircle className="w-4 h-4 text-[#F9A03F] flex-shrink-0 mt-0.5" />
                                <p className="text-gray-700">
                                  <span className="text-gray-900">Add quantifiable results:</span> "Improved nonprofit data accuracy by 40%" sounds better than "Worked on data migration"
                                </p>
                              </div>
                              <div className="flex items-start space-x-2">
                                <AlertCircle className="w-4 h-4 text-[#F9A03F] flex-shrink-0 mt-0.5" />
                                <p className="text-gray-700">
                                  <span className="text-gray-900">Add Salesforce keywords:</span> Flow Builder, Process Builder, Security Model (helps with ATS)
                                </p>
                              </div>
                              <div className="flex items-start space-x-2">
                                <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                                <p className="text-gray-700">ATS Score: 85/100 (Good! Most systems will parse this correctly)</p>
                              </div>
                            </div>
                            <button className="mt-3 text-sm text-[#2C6975] hover:underline flex items-center space-x-1">
                              <span>Apply Penny's Suggestions</span>
                              <ChevronRight className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      </div>

                      {/* Resume Optimization Options */}
                      <div className="space-y-3">
                        <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                          <div className="flex items-center space-x-3">
                            <Switch id="format" defaultChecked />
                            <div>
                              <Label htmlFor="format" className="text-sm text-gray-900 cursor-pointer">Enhance Formatting</Label>
                              <p className="text-xs text-gray-500">Clean layout optimized for ATS systems</p>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                          <div className="flex items-center space-x-3">
                            <Switch id="transition" defaultChecked />
                            <div>
                              <Label htmlFor="transition" className="text-sm text-gray-900 cursor-pointer">Add Transition Trails Experience</Label>
                              <p className="text-xs text-gray-500">Includes capstone project and certifications</p>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                          <div className="flex items-center space-x-3">
                            <Switch id="tailor" />
                            <div>
                              <Label htmlFor="tailor" className="text-sm text-gray-900 cursor-pointer">Tailor for Specific Role</Label>
                              <p className="text-xs text-gray-500">Customize keywords for job description</p>
                            </div>
                          </div>
                        </div>
                      </div>

                      <button className="w-full py-3 bg-gradient-to-r from-[#2C6975] to-[#7EB5C1] text-white rounded-lg hover:from-[#1f4f5a] hover:to-[#6a9fb0] transition-all flex items-center justify-center space-x-2">
                        <RefreshCw className="w-4 h-4" />
                        <span>Rebuild Resume with Penny AI</span>
                      </button>
                    </div>
                  )}
                </div>

                {/* LinkedIn Profile Coach */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-xl text-gray-900 flex items-center space-x-2">
                      <Linkedin className="w-5 h-5 text-[#0A66C2]" />
                      <span>LinkedIn Profile Coach</span>
                    </h3>
                    {isLinkedInConnected ? (
                      <Badge variant="outline" className="bg-green-50 text-green-700 border-green-300">
                        <Check className="w-3 h-3 mr-1" />
                        Connected
                      </Badge>
                    ) : (
                      <button
                        onClick={handleLinkedInConnect}
                        className="px-4 py-2 bg-[#0A66C2] text-white rounded-lg hover:bg-[#084d8f] transition-colors text-sm"
                      >
                        Connect LinkedIn
                      </button>
                    )}
                  </div>

                  {isLinkedInConnected ? (
                    <div className="space-y-4">
                      {/* LinkedIn Sub-tabs */}
                      <div className="flex items-center space-x-2 border-b border-gray-200">
                        {['headline', 'summary', 'experience', 'skills'].map((tab) => (
                          <button
                            key={tab}
                            onClick={() => setLinkedInTab(tab)}
                            className={`px-4 py-2 text-sm capitalize transition-colors border-b-2 ${
                              linkedInTab === tab
                                ? 'border-[#0A66C2] text-[#0A66C2]'
                                : 'border-transparent text-gray-600 hover:text-gray-900'
                            }`}
                          >
                            {tab}
                          </button>
                        ))}
                      </div>

                      {/* Headline Tab */}
                      {linkedInTab === 'headline' && (
                        <div className="space-y-4">
                          <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                            <div className="flex items-start space-x-2">
                              <AlertCircle className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
                              <div>
                                <h4 className="text-sm text-gray-900 mb-1">Current Headline</h4>
                                <p className="text-sm text-gray-700 italic mb-2">"Marketing Professional | Career Transitioner"</p>
                                <p className="text-xs text-gray-600">
                                  <span className="text-yellow-700">Penny says:</span> This headline doesn't mention Salesforce! Recruiters won't find you.
                                </p>
                              </div>
                            </div>
                          </div>

                          <div className="space-y-3">
                            <h4 className="text-sm text-gray-900">Penny's Suggested Headlines (Click to use)</h4>
                            {[
                              'Salesforce Administrator | Nonprofit CRM Specialist | Career Transitioner',
                              'Aspiring Salesforce Admin | Process Automation Enthusiast | Helping Nonprofits Scale',
                              'Marketing → Salesforce Admin | Certified in Progress | Passionate About Data-Driven Impact',
                            ].map((suggestion, idx) => (
                              <button
                                key={idx}
                                className="w-full text-left p-4 border-2 border-gray-200 rounded-lg hover:border-[#0A66C2] hover:bg-[#0A66C2]/5 transition-all group"
                              >
                                <div className="flex items-start justify-between">
                                  <p className="text-sm text-gray-900 flex-1">{suggestion}</p>
                                  <Copy className="w-4 h-4 text-gray-400 group-hover:text-[#0A66C2] flex-shrink-0 ml-2" />
                                </div>
                                <div className="flex items-center space-x-4 mt-2 text-xs text-gray-500">
                                  <span>✓ Includes Salesforce</span>
                                  <span>✓ Clear role</span>
                                  <span>✓ {60 + idx * 5} char / 220</span>
                                </div>
                              </button>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Summary Tab */}
                      {linkedInTab === 'summary' && (
                        <div className="space-y-4">
                          <div className="p-4 bg-gray-50 rounded-lg">
                            <h4 className="text-sm text-gray-900 mb-2">Current Summary</h4>
                            <p className="text-sm text-gray-700 italic mb-3">
                              "Experienced marketing professional looking to transition into tech..."
                            </p>
                            <div className="flex items-center space-x-2 text-xs">
                              <span className="text-red-600 flex items-center space-x-1">
                                <XIcon className="w-3 h-3" />
                                <span>No Salesforce mentions</span>
                              </span>
                              <span className="text-red-600 flex items-center space-x-1">
                                <XIcon className="w-3 h-3" />
                                <span>No specific achievements</span>
                              </span>
                            </div>
                          </div>

                          <div className="p-4 bg-[#0A66C2]/5 border border-[#0A66C2]/30 rounded-lg">
                            <div className="flex items-start space-x-2 mb-3">
                              <Sparkles className="w-5 h-5 text-[#F9A03F] flex-shrink-0" />
                              <h4 className="text-sm text-gray-900">Penny's Optimized Summary</h4>
                            </div>
                            <div className="text-sm text-gray-700 space-y-2 mb-3">
                              <p>
                                <span className="text-gray-900">Salesforce Administrator in training</span> with a unique background in marketing and nonprofit collaboration. Currently completing an intensive Salesforce program with Transition Trails, focusing on process automation, data management, and CRM optimization.
                              </p>
                              <p>
                                <span className="text-gray-900">Recent achievements:</span>
                              </p>
                              <ul className="list-disc list-inside space-y-1 ml-2">
                                <li>Improved nonprofit partner's data accuracy by 40% through custom Flow automation</li>
                                <li>Earned 12 Salesforce badges including Process Automation Specialist</li>
                                <li>Building toward Salesforce Administrator certification (May 2025)</li>
                              </ul>
                              <p>
                                <span className="text-gray-900">I'm passionate about</span> using Salesforce to help organizations scale their impact through better data and smarter processes. Open to Salesforce Admin roles starting July 2025.
                              </p>
                            </div>
                            <div className="flex items-center space-x-2 text-xs text-green-700">
                              <Check className="w-3 h-3" />
                              <span>Includes keywords</span>
                              <Check className="w-3 h-3" />
                              <span>Quantifiable results</span>
                              <Check className="w-3 h-3" />
                              <span>Clear call to action</span>
                            </div>
                            <button className="mt-3 px-4 py-2 bg-[#0A66C2] text-white rounded-lg hover:bg-[#084d8f] transition-colors text-sm flex items-center space-x-2">
                              <Copy className="w-4 h-4" />
                              <span>Copy to LinkedIn</span>
                            </button>
                          </div>
                        </div>
                      )}

                      {/* Experience Tab */}
                      {linkedInTab === 'experience' && (
                        <div className="space-y-4">
                          <div className="p-4 bg-[#F9A03F]/5 border border-[#F9A03F]/30 rounded-lg">
                            <div className="flex items-start space-x-2 mb-3">
                              <Sparkles className="w-5 h-5 text-[#F9A03F] flex-shrink-0" />
                              <div className="flex-1">
                                <h4 className="text-sm text-gray-900 mb-1">Add Transition Trails Experience</h4>
                                <p className="text-xs text-gray-600 mb-3">
                                  Penny suggests adding your capstone project as professional experience
                                </p>
                              </div>
                            </div>
                            <div className="p-3 bg-white rounded-lg border border-gray-200 text-sm">
                              <h5 className="text-gray-900">Salesforce Administrator (Training Program)</h5>
                              <p className="text-gray-600 text-xs mb-2">Transition Trails · Jan 2025 - Present</p>
                              <ul className="list-disc list-inside space-y-1 text-gray-700 text-xs">
                                <li>Designed and implemented automated workflows using Flow Builder, reducing manual data entry by 60%</li>
                                <li>Partnered with nonprofit organization to migrate legacy CRM data, improving data accuracy by 40%</li>
                                <li>Built custom reports and dashboards for executive decision-making</li>
                                <li>Earned 12+ Salesforce badges including Process Automation Specialist and Data Management Expert</li>
                              </ul>
                            </div>
                            <button className="mt-3 px-4 py-2 bg-[#0A66C2] text-white rounded-lg hover:bg-[#084d8f] transition-colors text-sm">
                              Add to LinkedIn
                            </button>
                          </div>

                          <div className="p-4 bg-gray-50 rounded-lg">
                            <h4 className="text-sm text-gray-900 mb-2">Optimize Existing Roles</h4>
                            <p className="text-xs text-gray-600 mb-3">
                              Penny can help reframe your past experience to highlight transferable Salesforce skills
                            </p>
                            <button className="text-sm text-[#2C6975] hover:underline">
                              Review & Optimize →
                            </button>
                          </div>
                        </div>
                      )}

                      {/* Skills Tab */}
                      {linkedInTab === 'skills' && (
                        <div className="space-y-4">
                          <div className="p-4 bg-[#F9A03F]/5 border border-[#F9A03F]/30 rounded-lg">
                            <div className="flex items-start space-x-2 mb-3">
                              <Sparkles className="w-5 h-5 text-[#F9A03F] flex-shrink-0" />
                              <div>
                                <h4 className="text-sm text-gray-900 mb-1">Recommended Skills to Add</h4>
                                <p className="text-xs text-gray-600">Based on your Trailhead progress and capstone work</p>
                              </div>
                            </div>
                            <div className="flex flex-wrap gap-2">
                              {[
                                'Salesforce Administration',
                                'Process Automation',
                                'Flow Builder',
                                'Data Management',
                                'Reports & Dashboards',
                                'Security & Access',
                                'Nonprofit CRM',
                                'Salesforce Lightning',
                              ].map((skill) => (
                                <button
                                  key={skill}
                                  className="px-3 py-1 bg-white border border-[#0A66C2] text-[#0A66C2] rounded-full text-xs hover:bg-[#0A66C2] hover:text-white transition-colors"
                                >
                                  + {skill}
                                </button>
                              ))}
                            </div>
                          </div>

                          <div className="p-4 bg-gray-50 rounded-lg">
                            <h4 className="text-sm text-gray-900 mb-2">Skills to Feature (Top 3)</h4>
                            <p className="text-xs text-gray-600 mb-3">
                              These appear at the top of your profile - choose wisely!
                            </p>
                            <div className="space-y-2">
                              {[
                                { skill: 'Salesforce Administration', endorsements: 0, reason: 'Your target role - get endorsed!' },
                                { skill: 'Process Automation', endorsements: 0, reason: 'Your strongest verified skill' },
                                { skill: 'Data Management', endorsements: 0, reason: 'High-demand in your area' },
                              ].map((item, idx) => (
                                <div key={idx} className="flex items-center justify-between p-2 bg-white rounded border border-gray-200">
                                  <div className="flex-1">
                                    <p className="text-sm text-gray-900">{item.skill}</p>
                                    <p className="text-xs text-gray-500">{item.reason}</p>
                                  </div>
                                  <Badge variant="outline" className="text-xs">
                                    {item.endorsements} endorsements
                                  </Badge>
                                </div>
                              ))}
                            </div>
                            <button className="mt-3 text-sm text-[#2C6975] hover:underline">
                              Request Endorsements →
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  ) : (
                    <div className="text-center py-8">
                      <Linkedin className="w-12 h-12 mx-auto text-gray-400 mb-4" />
                      <h4 className="text-gray-900 mb-2">Connect Your LinkedIn</h4>
                      <p className="text-sm text-gray-600 mb-4">
                        Let Penny analyze your profile and provide personalized optimization tips
                      </p>
                    </div>
                  )}
                </div>

                {/* Share Achievement */}
                <div className="bg-gradient-to-r from-[#0A66C2]/10 to-[#7EB5C1]/10 rounded-xl border border-[#0A66C2]/30 p-6">
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#0A66C2] to-[#7EB5C1] flex items-center justify-center flex-shrink-0">
                      <Share2 className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg text-gray-900 mb-2">Share Your Progress on LinkedIn</h3>
                      <p className="text-sm text-gray-600 mb-4">
                        Posts with achievements get 5x more views! Share your recent badges, capstone progress, or certification milestones.
                      </p>
                      <button
                        onClick={() => setIsShareModalOpen(true)}
                        className="px-4 py-2 bg-[#0A66C2] text-white rounded-lg hover:bg-[#084d8f] transition-colors text-sm flex items-center space-x-2"
                      >
                        <Share2 className="w-4 h-4" />
                        <span>Create LinkedIn Post</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Sidebar - Penny Insights */}
              <div className="lg:col-span-1">
                <div className="sticky top-6 space-y-6">
                  {/* Penny Insights Card */}
                  <div className="bg-gradient-to-br from-[#F9A03F]/10 to-[#2C6975]/10 rounded-xl border-2 border-[#F9A03F]/30 p-6">
                    <div className="flex items-center space-x-3 mb-4">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#F9A03F] to-[#e89135] flex items-center justify-center">
                        <Sparkles className="w-5 h-5 text-white" />
                      </div>
                      <h3 className="text-lg text-gray-900">Penny's Insights</h3>
                    </div>

                    <div className="space-y-3">
                      {pennyInsights['resume-linkedin'].map((insight, idx) => (
                        <div
                          key={idx}
                          className={`p-4 rounded-lg border-2 ${
                            insight.priority === 'high'
                              ? 'bg-red-50 border-red-200'
                              : 'bg-blue-50 border-blue-200'
                          }`}
                        >
                          <div className="flex items-start space-x-2 mb-2">
                            {insight.priority === 'high' ? (
                              <AlertCircle className="w-4 h-4 text-red-600 flex-shrink-0 mt-0.5" />
                            ) : (
                              <TrendingUp className="w-4 h-4 text-blue-600 flex-shrink-0 mt-0.5" />
                            )}
                            <div className="flex-1">
                              <h4 className="text-sm text-gray-900">{insight.title}</h4>
                              <p className="text-xs text-gray-700 mt-1">{insight.insight}</p>
                            </div>
                          </div>
                          <button className="text-xs text-[#2C6975] hover:underline flex items-center space-x-1">
                            <span>{insight.action}</span>
                            <ChevronRight className="w-3 h-3" />
                          </button>
                        </div>
                      ))}
                    </div>

                    <button className="w-full mt-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-sm flex items-center justify-center space-x-2">
                      <MessageSquare className="w-4 h-4" />
                      <span>Ask Penny</span>
                    </button>
                  </div>

                  {/* Quick Stats */}
                  <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                    <h4 className="text-sm text-gray-900 mb-4">Career Profile Stats</h4>
                    <div className="space-y-3 text-sm">
                      <div className="flex items-center justify-between">
                        <span className="text-gray-600">LinkedIn Views</span>
                        <span className="text-gray-900">127 this week</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-gray-600">Resume Downloads</span>
                        <span className="text-gray-900">5</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-gray-600">Profile Strength</span>
                        <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-300 text-xs">
                          Intermediate
                        </Badge>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-gray-600">ATS Score</span>
                        <span className="text-gray-900">85/100</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>

          {/* TAB 2: Skills & Certifications */}
          <TabsContent value="skills-certs" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Main Content */}
              <div className="lg:col-span-2 space-y-6">
                {/* Skills Overview with Radar Chart */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                  <h3 className="text-xl text-gray-900 mb-6 flex items-center space-x-2">
                    <Brain className="w-5 h-5 text-[#2C6975]" />
                    <span>Skills Overview</span>
                  </h3>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Radar Chart */}
                    <div>
                      <h4 className="text-sm text-gray-700 mb-4">Technical Skills Profile</h4>
                      <ResponsiveContainer width="100%" height={250}>
                        <RadarChart data={skillRadarData}>
                          <PolarGrid stroke="#e5e7eb" />
                          <PolarAngleAxis dataKey="skill" tick={{ fill: '#6b7280', fontSize: 12 }} />
                          <PolarRadiusAxis angle={90} domain={[0, 100]} tick={{ fill: '#6b7280', fontSize: 10 }} />
                          <Radar name="Current" dataKey="current" stroke="#2C6975" fill="#2C6975" fillOpacity={0.5} />
                          <Radar name="Target" dataKey="target" stroke="#F9A03F" fill="#F9A03F" fillOpacity={0.2} />
                          <Radar name="Industry Avg" dataKey="industry" stroke="#7EB5C1" fill="#7EB5C1" fillOpacity={0.1} />
                          <Tooltip />
                        </RadarChart>
                      </ResponsiveContainer>
                      <div className="flex items-center justify-center space-x-4 text-xs mt-2">
                        <div className="flex items-center space-x-1">
                          <div className="w-3 h-3 bg-[#2C6975] rounded-sm"></div>
                          <span className="text-gray-600">Current</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <div className="w-3 h-3 bg-[#F9A03F] rounded-sm"></div>
                          <span className="text-gray-600">Target</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <div className="w-3 h-3 bg-[#7EB5C1] rounded-sm"></div>
                          <span className="text-gray-600">Industry</span>
                        </div>
                      </div>
                    </div>

                    {/* Skills Breakdown */}
                    <div className="space-y-3">
                      <h4 className="text-sm text-gray-700 mb-2">Technical Skills Details</h4>
                      {skillsData.technical.slice(0, 6).map((skill, idx) => (
                        <div key={idx} className="space-y-1">
                          <div className="flex items-center justify-between text-sm">
                            <div className="flex items-center space-x-2">
                              <span className="text-gray-900">{skill.name}</span>
                              <Badge variant="outline" className="text-xs">
                                {skill.source === 'trailhead' ? '🌲 Trailhead' : '📚 PluralSight'}
                              </Badge>
                            </div>
                            <span className="text-gray-600">{skill.level}%</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Progress value={skill.level} className="h-2" />
                            {skill.trend === 'up' && (
                              <TrendingUp className="w-3 h-3 text-green-600 flex-shrink-0" />
                            )}
                          </div>
                          <p className="text-xs text-gray-500">Updated {skill.lastUpdated}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Soft Skills */}
                  <div className="mt-6 pt-6 border-t border-gray-200">
                    <h4 className="text-sm text-gray-700 mb-4">Professional Skills</h4>
                    <div className="grid grid-cols-2 gap-4">
                      {skillsData.soft.map((skill, idx) => (
                        <div key={idx} className="space-y-2">
                          <div className="flex items-center justify-between text-sm">
                            <span className="text-gray-900">{skill.name}</span>
                            <span className="text-gray-600">{skill.level}%</span>
                          </div>
                          <Progress value={skill.level} className="h-2" />
                          <p className="text-xs text-gray-500">
                            {skill.source === 'coach-feedback' && '👤 Coach Feedback'}
                            {skill.source === 'peer-review' && '👥 Peer Review'}
                            {skill.source === 'self-assessment' && '✍️ Self Assessment'}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Certifications */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                  <h3 className="text-xl text-gray-900 mb-6 flex items-center space-x-2">
                    <Award className="w-5 h-5 text-[#2C6975]" />
                    <span>Certifications</span>
                  </h3>

                  <div className="space-y-4">
                    {certifications.map((cert, idx) => (
                      <div
                        key={idx}
                        className={`p-4 rounded-lg border-2 ${
                          cert.status === 'in-progress'
                            ? 'border-[#F9A03F] bg-[#F9A03F]/5'
                            : 'border-gray-200 bg-gray-50'
                        }`}
                      >
                        <div className="flex items-start justify-between mb-3">
                          <div className="flex-1">
                            <h4 className="text-gray-900 mb-1">{cert.name}</h4>
                            <p className="text-sm text-gray-600">Target: {cert.targetDate}</p>
                          </div>
                          <Badge
                            variant="outline"
                            className={`${
                              cert.status === 'in-progress'
                                ? 'bg-[#F9A03F]/20 text-[#F9A03F] border-[#F9A03F]'
                                : 'bg-gray-200 text-gray-700 border-gray-300'
                            }`}
                          >
                            {cert.status === 'in-progress' ? 'In Progress' : 'Planned'}
                          </Badge>
                        </div>

                        {cert.status === 'in-progress' && 'progress' in cert && (
                          <>
                            <div className="space-y-2 mb-3">
                              <div className="flex items-center justify-between text-sm">
                                <span className="text-gray-700">Study Progress</span>
                                <span className="text-gray-900">{cert.progress}%</span>
                              </div>
                              <Progress value={cert.progress} className="h-2" />
                            </div>

                            {cert.modulesCompleted !== undefined && (
                              <div className="grid grid-cols-2 gap-4 text-sm mb-3">
                                <div>
                                  <p className="text-gray-600">Modules</p>
                                  <p className="text-gray-900">{cert.modulesCompleted}/{cert.modulesTotal}</p>
                                </div>
                                <div>
                                  <p className="text-gray-600">Study Hours/Week</p>
                                  <p className="text-gray-900">{cert.studyHoursWeek}hrs</p>
                                </div>
                              </div>
                            )}

                            {cert.mockTestScore && (
                              <div className="p-3 bg-white rounded border border-green-300 mb-3">
                                <div className="flex items-center justify-between text-sm">
                                  <span className="text-gray-700">Latest Practice Score</span>
                                  <span className="text-green-700">{cert.mockTestScore}% (Passing: {cert.passingScore}%)</span>
                                </div>
                                <div className="mt-2">
                                  <Progress value={(cert.mockTestScore / 100) * 100} className="h-2" />
                                </div>
                              </div>
                            )}

                            {cert.examDate && (
                              <div className="flex items-center justify-between p-3 bg-[#F9A03F]/10 rounded border border-[#F9A03F]/30">
                                <div className="flex items-center space-x-2">
                                  <Calendar className="w-4 h-4 text-[#F9A03F]" />
                                  <span className="text-sm text-gray-900">Exam Scheduled</span>
                                </div>
                                <span className="text-sm text-gray-900">{cert.examDate}</span>
                              </div>
                            )}
                          </>
                        )}

                        {cert.status === 'planned' && (
                          <button className="text-sm text-[#2C6975] hover:underline flex items-center space-x-1">
                            <span>Begin Preparation</span>
                            <ChevronRight className="w-4 h-4" />
                          </button>
                        )}
                      </div>
                    ))}

                    <button className="w-full py-3 border-2 border-dashed border-gray-300 text-gray-600 rounded-lg hover:border-[#2C6975] hover:text-[#2C6975] transition-colors text-sm flex items-center justify-center space-x-2">
                      <Plus className="w-4 h-4" />
                      <span>Add Certification Goal</span>
                    </button>
                  </div>
                </div>

                {/* Badges & Achievements */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-xl text-gray-900 flex items-center space-x-2">
                      <Trophy className="w-5 h-5 text-[#2C6975]" />
                      <span>Badges & Achievements</span>
                    </h3>

                    {/* Filter */}
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => setBadgeFilter('all')}
                        className={`px-3 py-1 rounded-full text-xs transition-colors ${
                          badgeFilter === 'all'
                            ? 'bg-[#2C6975] text-white'
                            : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                        }`}
                      >
                        All ({badges.length})
                      </button>
                      <button
                        onClick={() => setBadgeFilter('trailhead')}
                        className={`px-3 py-1 rounded-full text-xs transition-colors ${
                          badgeFilter === 'trailhead'
                            ? 'bg-[#2C6975] text-white'
                            : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                        }`}
                      >
                        🌲 Trailhead
                      </button>
                      <button
                        onClick={() => setBadgeFilter('transition-trails')}
                        className={`px-3 py-1 rounded-full text-xs transition-colors ${
                          badgeFilter === 'transition-trails'
                            ? 'bg-[#2C6975] text-white'
                            : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                        }`}
                      >
                        TT Program
                      </button>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                    {filteredBadges.map((badge, idx) => (
                      <div
                        key={idx}
                        className="p-4 border border-gray-200 rounded-lg hover:border-[#2C6975] hover:shadow-md transition-all text-center group cursor-pointer"
                      >
                        <div className="text-4xl mb-2">{badge.icon}</div>
                        <h4 className="text-sm text-gray-900 mb-1 line-clamp-2">{badge.name}</h4>
                        <p className="text-xs text-gray-500 mb-2">{badge.category}</p>
                        <div className="flex items-center justify-center space-x-1 text-xs text-gray-600">
                          <Trophy className="w-3 h-3" />
                          <span>{badge.points} pts</span>
                        </div>
                        <p className="text-xs text-gray-400 mt-1">{badge.earnedDate}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Sidebar - Penny Insights */}
              <div className="lg:col-span-1">
                <div className="sticky top-6 space-y-6">
                  {/* Penny Insights */}
                  <div className="bg-gradient-to-br from-[#F9A03F]/10 to-[#2C6975]/10 rounded-xl border-2 border-[#F9A03F]/30 p-6">
                    <div className="flex items-center space-x-3 mb-4">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#F9A03F] to-[#e89135] flex items-center justify-center">
                        <Sparkles className="w-5 h-5 text-white" />
                      </div>
                      <h3 className="text-lg text-gray-900">Penny's Insights</h3>
                    </div>

                    <div className="space-y-3">
                      {pennyInsights['skills-certs'].map((insight, idx) => (
                        <div
                          key={idx}
                          className={`p-4 rounded-lg border-2 ${
                            insight.priority === 'high'
                              ? 'bg-red-50 border-red-200'
                              : 'bg-blue-50 border-blue-200'
                          }`}
                        >
                          <div className="flex items-start space-x-2 mb-2">
                            {insight.priority === 'high' ? (
                              <AlertCircle className="w-4 h-4 text-red-600 flex-shrink-0 mt-0.5" />
                            ) : (
                              <TrendingUp className="w-4 h-4 text-blue-600 flex-shrink-0 mt-0.5" />
                            )}
                            <div className="flex-1">
                              <h4 className="text-sm text-gray-900">{insight.title}</h4>
                              <p className="text-xs text-gray-700 mt-1">{insight.insight}</p>
                            </div>
                          </div>
                          <button className="text-xs text-[#2C6975] hover:underline flex items-center space-x-1">
                            <span>{insight.action}</span>
                            <ChevronRight className="w-3 h-3" />
                          </button>
                        </div>
                      ))}
                    </div>

                    <button className="w-full mt-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-sm flex items-center justify-center space-x-2">
                      <MessageSquare className="w-4 h-4" />
                      <span>Ask Penny</span>
                    </button>
                  </div>

                  {/* Skills IQ Progress */}
                  <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                    <h4 className="text-sm text-gray-900 mb-4">Skills IQ Progress</h4>
                    <ResponsiveContainer width="100%" height={150}>
                      <LineChart data={skillIQHistory}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                        <XAxis dataKey="date" tick={{ fill: '#6b7280', fontSize: 11 }} />
                        <YAxis tick={{ fill: '#6b7280', fontSize: 11 }} domain={[100, 200]} />
                        <Tooltip />
                        <Line type="monotone" dataKey="score" stroke="#2C6975" strokeWidth={2} dot={{ fill: '#2C6975', r: 4 }} />
                      </LineChart>
                    </ResponsiveContainer>
                    <div className="mt-4 text-sm">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-gray-600">Current Level</span>
                        <Badge variant="outline" className="bg-green-50 text-green-700 border-green-300">
                          Proficient
                        </Badge>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-gray-600">Next Assessment</span>
                        <span className="text-gray-900">March 15</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>

          {/* TAB 3: Goals & Assessments */}
          <TabsContent value="goals-assessments" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Main Content */}
              <div className="lg:col-span-2 space-y-6">
                {/* Career Goals */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-xl text-gray-900 flex items-center space-x-2">
                      <Target className="w-5 h-5 text-[#2C6975]" />
                      <span>Career Goals</span>
                    </h3>
                    <button
                      onClick={() => setIsGoalModalOpen(true)}
                      className="flex items-center space-x-2 px-4 py-2 bg-[#2C6975] text-white rounded-lg hover:bg-[#1f4f5a] transition-colors text-sm"
                    >
                      <Plus className="w-4 h-4" />
                      <span>New Goal</span>
                    </button>
                  </div>

                  <div className="space-y-4">
                    {careerGoals.map((goal) => (
                      <div key={goal.id} className="border-2 border-gray-200 rounded-lg p-5 hover:border-[#2C6975] transition-colors">
                        <div className="flex items-start justify-between mb-3">
                          <div className="flex-1">
                            <div className="flex items-center space-x-2 mb-2">
                              <h4 className="text-gray-900">{goal.goal}</h4>
                              <Badge
                                variant="outline"
                                className={`text-xs ${
                                  goal.category === 'certification'
                                    ? 'bg-purple-50 text-purple-700 border-purple-300'
                                    : goal.category === 'career'
                                    ? 'bg-blue-50 text-blue-700 border-blue-300'
                                    : 'bg-green-50 text-green-700 border-green-300'
                                }`}
                              >
                                {goal.category}
                              </Badge>
                            </div>
                            <p className="text-sm text-gray-600">Target: {goal.targetDate}</p>
                          </div>
                          <button className="text-gray-400 hover:text-gray-600">
                            <Edit className="w-4 h-4" />
                          </button>
                        </div>

                        {/* Progress */}
                        <div className="space-y-2 mb-4">
                          <div className="flex items-center justify-between text-sm">
                            <span className="text-gray-700">Overall Progress</span>
                            <span className="text-gray-900">{goal.progress}%</span>
                          </div>
                          <Progress value={goal.progress} className="h-2" />
                        </div>

                        {/* Milestones */}
                        <div className="space-y-2 mb-4">
                          <h5 className="text-sm text-gray-700">Milestones</h5>
                          {goal.milestones.map((milestone, idx) => (
                            <div key={idx} className="flex items-center space-x-2 text-sm">
                              {milestone.completed ? (
                                <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0" />
                              ) : (
                                <div className="w-4 h-4 border-2 border-gray-300 rounded-full flex-shrink-0"></div>
                              )}
                              <span className={milestone.completed ? 'text-gray-500 line-through' : 'text-gray-900'}>
                                {milestone.name}
                              </span>
                            </div>
                          ))}
                        </div>

                        {/* Penny Insight */}
                        {goal.pennyInsight && (
                          <div className="p-3 bg-[#F9A03F]/10 border border-[#F9A03F]/30 rounded-lg">
                            <div className="flex items-start space-x-2">
                              <Sparkles className="w-4 h-4 text-[#F9A03F] flex-shrink-0 mt-0.5" />
                              <p className="text-xs text-gray-700">
                                <span className="text-gray-900">Penny says:</span> {goal.pennyInsight}
                              </p>
                            </div>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Skills IQ Assessments */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                  <h3 className="text-xl text-gray-900 mb-6 flex items-center space-x-2">
                    <Brain className="w-5 h-5 text-[#2C6975]" />
                    <span>Skills IQ Assessments</span>
                    <Badge variant="outline" className="text-xs">Monthly</Badge>
                  </h3>

                  {/* Next Assessment Due */}
                  <div className="p-4 mb-6 rounded-lg border-2 border-[#F9A03F] bg-[#F9A03F]/5">
                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <p className="text-sm text-gray-600 mb-1">Next Assessment Due</p>
                        <p className="text-xl text-gray-900">March 15, 2025</p>
                      </div>
                      <div className="text-right">
                        <p className="text-3xl text-[#F9A03F]">14</p>
                        <p className="text-xs text-gray-600">days left</p>
                      </div>
                    </div>
                    <button className="w-full py-2 bg-[#F9A03F] text-white rounded-lg hover:bg-[#e89135] transition-colors text-sm">
                      Take Assessment Now
                    </button>
                  </div>

                  {/* Assessment History */}
                  <div>
                    <h4 className="text-sm text-gray-700 mb-4">Assessment History</h4>
                    <div className="space-y-3">
                      {skillIQHistory.map((assessment, idx) => (
                        <div key={idx} className="p-4 border border-gray-200 rounded-lg hover:border-[#2C6975] transition-colors">
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-sm text-gray-900">{assessment.date}</span>
                            <Badge
                              variant="outline"
                              className={`text-xs ${
                                assessment.level === 'Proficient'
                                  ? 'bg-green-50 text-green-700 border-green-300'
                                  : 'bg-blue-50 text-blue-700 border-blue-300'
                              }`}
                            >
                              {assessment.level}
                            </Badge>
                          </div>
                          <div className="flex items-center space-x-4">
                            <div className="flex-1">
                              <div className="flex items-center justify-between text-sm mb-1">
                                <span className="text-gray-600">Score</span>
                                <span className="text-gray-900">{assessment.score}/200</span>
                              </div>
                              <Progress value={(assessment.score / 200) * 100} className="h-2" />
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Self-Assessments */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                  <h3 className="text-xl text-gray-900 mb-6 flex items-center space-x-2">
                    <User className="w-5 h-5 text-[#2C6975]" />
                    <span>Self-Assessments</span>
                    <Badge variant="outline" className="text-xs">Quarterly</Badge>
                  </h3>

                  {/* Next Due */}
                  <div className="p-4 mb-6 rounded-lg border-2 border-blue-300 bg-blue-50">
                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <p className="text-sm text-gray-600 mb-1">Next Self-Assessment</p>
                        <p className="text-xl text-gray-900">{nextSelfAssessment.quarter}</p>
                        <p className="text-sm text-gray-700">{nextSelfAssessment.dueDate}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-3xl text-blue-600">{nextSelfAssessment.daysRemaining}</p>
                        <p className="text-xs text-gray-600">days left</p>
                      </div>
                    </div>
                    <button
                      onClick={() => onNavigate('self-assessment')}
                      className="w-full py-2 bg-[#2C6975] text-white rounded-lg hover:bg-[#1f4f5a] transition-colors text-sm"
                    >
                      Start Self-Assessment
                    </button>
                  </div>

                  {/* Assessment History */}
                  <div>
                    <h4 className="text-sm text-gray-700 mb-4">Past Self-Assessments</h4>
                    <div className="space-y-3">
                      {selfAssessments.map((assessment, idx) => (
                        <div key={idx} className="p-4 border border-gray-200 rounded-lg">
                          <div className="flex items-center justify-between mb-3">
                            <div>
                              <p className="text-sm text-gray-900">{assessment.quarter}</p>
                              <p className="text-xs text-gray-600">Completed: {assessment.completedDate}</p>
                            </div>
                            {assessment.coachReviewed && (
                              <Badge variant="outline" className="bg-green-50 text-green-700 border-green-300 text-xs">
                                <Check className="w-3 h-3 mr-1" />
                                Coach Reviewed
                              </Badge>
                            )}
                          </div>

                          {assessment.confidenceLevels && (
                            <div className="space-y-2 mb-3">
                              <div className="flex items-center justify-between text-xs">
                                <span className="text-gray-600">Technical</span>
                                <span className="text-gray-900">{assessment.confidenceLevels.technical}/10</span>
                              </div>
                              <div className="flex items-center justify-between text-xs">
                                <span className="text-gray-600">Communication</span>
                                <span className="text-gray-900">{assessment.confidenceLevels.communication}/10</span>
                              </div>
                              <div className="flex items-center justify-between text-xs">
                                <span className="text-gray-600">Problem Solving</span>
                                <span className="text-gray-900">{assessment.confidenceLevels.problemSolving}/10</span>
                              </div>
                            </div>
                          )}

                          {assessment.coachFeedback && (
                            <div className="p-3 bg-gray-50 rounded border border-gray-200">
                              <p className="text-xs text-gray-600 mb-1">Coach Feedback</p>
                              <p className="text-sm text-gray-900">{assessment.coachFeedback}</p>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Sidebar - Penny Insights */}
              <div className="lg:col-span-1">
                <div className="sticky top-6 space-y-6">
                  {/* Penny Insights */}
                  <div className="bg-gradient-to-br from-[#F9A03F]/10 to-[#2C6975]/10 rounded-xl border-2 border-[#F9A03F]/30 p-6">
                    <div className="flex items-center space-x-3 mb-4">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#F9A03F] to-[#e89135] flex items-center justify-center">
                        <Sparkles className="w-5 h-5 text-white" />
                      </div>
                      <h3 className="text-lg text-gray-900">Penny's Insights</h3>
                    </div>

                    <div className="space-y-3">
                      {pennyInsights['goals-assessments'].map((insight, idx) => (
                        <div
                          key={idx}
                          className={`p-4 rounded-lg border-2 ${
                            insight.priority === 'high'
                              ? 'bg-red-50 border-red-200'
                              : 'bg-blue-50 border-blue-200'
                          }`}
                        >
                          <div className="flex items-start space-x-2 mb-2">
                            {insight.priority === 'high' ? (
                              <AlertCircle className="w-4 h-4 text-red-600 flex-shrink-0 mt-0.5" />
                            ) : (
                              <TrendingUp className="w-4 h-4 text-blue-600 flex-shrink-0 mt-0.5" />
                            )}
                            <div className="flex-1">
                              <h4 className="text-sm text-gray-900">{insight.title}</h4>
                              <p className="text-xs text-gray-700 mt-1">{insight.insight}</p>
                            </div>
                          </div>
                          <button className="text-xs text-[#2C6975] hover:underline flex items-center space-x-1">
                            <span>{insight.action}</span>
                            <ChevronRight className="w-3 h-3" />
                          </button>
                        </div>
                      ))}
                    </div>

                    <button className="w-full mt-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-sm flex items-center justify-center space-x-2">
                      <MessageSquare className="w-4 h-4" />
                      <span>Ask Penny</span>
                    </button>
                  </div>

                  {/* Goal Timeline */}
                  <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                    <h4 className="text-sm text-gray-900 mb-4">Goal Timeline</h4>
                    <div className="space-y-4">
                      {careerGoals.map((goal) => (
                        <div key={goal.id} className="flex items-start space-x-3">
                          <div className={`w-3 h-3 rounded-full flex-shrink-0 mt-1 ${
                            goal.progress >= 66 ? 'bg-green-500' :
                            goal.progress >= 33 ? 'bg-yellow-500' :
                            'bg-red-500'
                          }`}></div>
                          <div className="flex-1">
                            <p className="text-sm text-gray-900 mb-1">{goal.goal}</p>
                            <p className="text-xs text-gray-600">{goal.targetDate}</p>
                            <div className="mt-2">
                              <Progress value={goal.progress} className="h-1" />
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>

      {/* LinkedIn Share Modal */}
      <Dialog open={isShareModalOpen} onOpenChange={setIsShareModalOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Share Achievement on LinkedIn</DialogTitle>
            <DialogDescription>
              Penny will help you craft the perfect post to showcase your progress
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4">
            {/* Post Type Selection */}
            <div>
              <Label className="text-sm text-gray-900 mb-2 block">What would you like to share?</Label>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { type: 'capstone' as const, label: 'Capstone Progress', icon: '🚀' },
                  { type: 'badge' as const, label: 'New Badge', icon: '🏆' },
                  { type: 'milestone' as const, label: 'Program Milestone', icon: '🎯' },
                ].map((option) => (
                  <button
                    key={option.type}
                    onClick={() => setSharePostType(option.type)}
                    className={`p-3 border-2 rounded-lg text-center transition-all ${
                      sharePostType === option.type
                        ? 'border-[#0A66C2] bg-[#0A66C2]/5'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div className="text-2xl mb-1">{option.icon}</div>
                    <p className="text-xs text-gray-900">{option.label}</p>
                  </button>
                ))}
              </div>
            </div>

            {/* Penny's Suggested Post */}
            <div className="p-4 bg-[#F9A03F]/5 border border-[#F9A03F]/30 rounded-lg">
              <div className="flex items-center space-x-2 mb-3">
                <Sparkles className="w-4 h-4 text-[#F9A03F]" />
                <p className="text-sm text-gray-900">Penny's Suggested Post</p>
              </div>
              <Textarea
                value={sharePostText || `🚀 Excited to share my progress!\n\nI'm currently working through the Transition Trails Salesforce program, and just completed a major capstone milestone. Partnered with a local nonprofit to build automated workflows that improved their data accuracy by 40%!\n\nKey learnings:\n• Process automation with Flow Builder\n• Data migration best practices\n• Nonprofit CRM optimization\n\nBig thanks to my coach Sarah Martinez and the amazing Transition Trails community. Can't wait to earn my Salesforce Admin certification in May!\n\n#Salesforce #CareerTransition #NonprofitTech #LearningJourney`}
                onChange={(e) => setSharePostText(e.target.value)}
                className="min-h-[200px] text-sm"
              />
              <div className="flex items-center justify-between mt-3">
                <p className="text-xs text-gray-600">
                  ✓ Includes hashtags · ✓ Quantifiable results · ✓ Tags coach
                </p>
                <button className="text-xs text-[#2C6975] hover:underline flex items-center space-x-1">
                  <RefreshCw className="w-3 h-3" />
                  <span>Regenerate</span>
                </button>
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center justify-end space-x-3">
              <button
                onClick={() => setIsShareModalOpen(false)}
                className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-sm"
              >
                Cancel
              </button>
              <button
                onClick={handleShareAchievement}
                className="px-4 py-2 bg-[#0A66C2] text-white rounded-lg hover:bg-[#084d8f] transition-colors text-sm flex items-center space-x-2"
              >
                <Share2 className="w-4 h-4" />
                <span>Share to LinkedIn</span>
              </button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* New Goal Modal */}
      <Dialog open={isGoalModalOpen} onOpenChange={setIsGoalModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create New Goal</DialogTitle>
            <DialogDescription>
              Set a career goal and Penny will help you create a plan to achieve it
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4">
            <div>
              <Label className="text-sm text-gray-900 mb-2 block">Goal Description</Label>
              <Textarea
                value={newGoalText}
                onChange={(e) => setNewGoalText(e.target.value)}
                placeholder="e.g., Become a Platform App Builder certified professional"
                className="min-h-[100px]"
              />
            </div>

            <div className="p-4 bg-[#F9A03F]/5 border border-[#F9A03F]/30 rounded-lg">
              <div className="flex items-start space-x-2">
                <Sparkles className="w-4 h-4 text-[#F9A03F] flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm text-gray-900 mb-1">Penny will help you:</p>
                  <ul className="text-xs text-gray-700 space-y-1">
                    <li>• Break down your goal into milestones</li>
                    <li>• Suggest a realistic timeline</li>
                    <li>• Recommend learning resources</li>
                    <li>• Track your progress automatically</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-end space-x-3">
              <button
                onClick={() => setIsGoalModalOpen(false)}
                className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-sm"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  toast.success('Goal created! Penny is creating your plan...');
                  setIsGoalModalOpen(false);
                  setNewGoalText('');
                }}
                className="px-4 py-2 bg-[#2C6975] text-white rounded-lg hover:bg-[#1f4f5a] transition-colors text-sm"
              >
                Create Goal
              </button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
