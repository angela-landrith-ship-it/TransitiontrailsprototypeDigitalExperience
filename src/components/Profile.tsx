import { ArrowLeft, User, Mail, Calendar, Award, BookOpen, Target, Edit, Linkedin, TrendingUp, Brain, CheckCircle, AlertCircle, ChevronDown, ChevronUp, Sparkles, Clock, Trophy, Zap, Briefcase, Star, BookMarked, Upload, FileText, Download, Eye, MessageSquare, ThumbsUp, X as XIcon, Check, Loader2, RefreshCw, Copy, Share2, Plus, ChevronLeft, ChevronRight } from 'lucide-react';
import { PageType } from '../App';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from './ui/collapsible';
import { useState } from 'react';
import { Switch } from './ui/switch';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { Badge } from './ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from './ui/dialog';
import { toast } from 'sonner@2.0.3';

interface ProfileProps {
  onNavigate: (page: PageType) => void;
}

export function Profile({ onNavigate }: ProfileProps) {
  // Collapsible section states
  const [isAssessmentsOpen, setIsAssessmentsOpen] = useState(true);
  const [isSelfAssessmentOpen, setIsSelfAssessmentOpen] = useState(true);
  const [isGoalsOpen, setIsGoalsOpen] = useState(true);
  const [isSkillsOpen, setIsSkillsOpen] = useState(true);
  const [isBadgesOpen, setIsBadgesOpen] = useState(false);
  const [isCertsOpen, setIsCertsOpen] = useState(true);
  const [isActivityOpen, setIsActivityOpen] = useState(false);
  const [isLearningHistoryOpen, setIsLearningHistoryOpen] = useState(true);
  const [isResumeBuilderOpen, setIsResumeBuilderOpen] = useState(true);
  const [isLinkedInCoachOpen, setIsLinkedInCoachOpen] = useState(true);
  
  // Badge filter state
  const [badgeFilter, setBadgeFilter] = useState<'all' | 'trailhead' | 'transition-trails'>('all');
  
  // Learning History filter state
  const [learningHistoryFilter, setLearningHistoryFilter] = useState<'all' | 'courses' | 'daily-missions' | 'trail-missions' | 'capstone' | 'assignments'>('all');
  
  // Resume Builder state
  const [resumeUploaded, setResumeUploaded] = useState(false);
  const [resumeFileName, setResumeFileName] = useState('');
  const [isResumeProcessing, setIsResumeProcessing] = useState(false);
  const [enhanceFormatting, setEnhanceFormatting] = useState(true);
  const [addTransitionTrails, setAddTransitionTrails] = useState(true);
  const [tailorForRole, setTailorForRole] = useState(false);
  const [targetRole, setTargetRole] = useState('');
  const [pennyMessages, setPennyMessages] = useState<Array<{sender: 'penny' | 'user', message: string, suggestions?: string[]}>>([]);
  const [userMessage, setUserMessage] = useState('');
  const [isRebuilding, setIsRebuilding] = useState(false);
  
  // LinkedIn Integration state
  const [isLinkedInConnected, setIsLinkedInConnected] = useState(true);
  const [isLinkedInProcessing, setIsLinkedInProcessing] = useState(false);
  const [linkedInProfileTab, setLinkedInProfileTab] = useState('headline');
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const [sharePostType, setSharePostType] = useState<'capstone' | 'badge' | 'milestone'>('capstone');
  const [sharePostText, setSharePostText] = useState('');
  const [selectedAchievements, setSelectedAchievements] = useState<string[]>([]);
  const [achievementCarouselIndex, setAchievementCarouselIndex] = useState(0);

  // Pluralsight IQ Assessments
  const skillAssessments = [
    { 
      date: 'Feb 15, 2025', 
      score: 178, 
      level: 'Proficient',
      skills: [
        { name: 'Salesforce Admin', score: 185 },
        { name: 'Process Automation', score: 192 },
        { name: 'Data Management', score: 165 },
        { name: 'Reporting', score: 171 }
      ]
    },
    { 
      date: 'Jan 15, 2025', 
      score: 152, 
      level: 'Working',
      skills: [
        { name: 'Salesforce Admin', score: 158 },
        { name: 'Process Automation', score: 165 },
        { name: 'Data Management', score: 142 },
        { name: 'Reporting', score: 145 }
      ]
    },
  ];

  const nextAssessmentDue = 'March 15, 2025';
  const daysUntilAssessment = 14;

  const assessmentHistory = [
    { date: 'Jan 15', score: 152 },
    { date: 'Feb 15', score: 178 },
  ];

  // Career Goals
  const careerGoals = [
    { 
      goal: 'Become a Certified Salesforce Administrator',
      targetDate: 'May 2025',
      status: 'in-progress',
      progress: 68
    },
    { 
      goal: 'Transition to Salesforce Admin role',
      targetDate: 'July 2025',
      status: 'in-progress',
      progress: 45
    },
    { 
      goal: 'Build 3 portfolio projects',
      targetDate: 'June 2025',
      status: 'in-progress',
      progress: 33
    },
  ];

  // Skills Focus
  const focusedSkills = [
    { name: 'Process Automation', priority: 'high', weeklyHours: 8, progress: 75 },
    { name: 'Apex Development', priority: 'high', weeklyHours: 6, progress: 45 },
    { name: 'Lightning Components', priority: 'medium', weeklyHours: 4, progress: 60 },
    { name: 'Integration Patterns', priority: 'medium', weeklyHours: 3, progress: 30 },
  ];

  // Certifications - Trailhead certs and user-added goals
  const trailheadCerts = [
    { 
      name: 'Salesforce Certified Administrator', 
      status: 'in-progress', 
      progress: 68, 
      targetDate: 'May 1, 2025',
      studyHoursWeek: 10,
      modulesCompleted: 18,
      modulesTotal: 24,
      lastActivity: '2 hours ago',
      source: 'trailhead' as const
    },
    { 
      name: 'Platform App Builder', 
      status: 'planned', 
      progress: 0, 
      targetDate: 'June 1, 2025',
      studyHoursWeek: 0,
      modulesCompleted: 0,
      modulesTotal: 20,
      lastActivity: 'Not started',
      source: 'trailhead' as const
    },
  ];

  // User can add up to 3 additional certification goals
  const userCertGoals = [
    {
      name: 'AWS Solutions Architect',
      targetDate: 'August 1, 2025',
      status: 'planned' as const,
      source: 'user-added' as const
    },
    {
      name: 'JavaScript Developer I',
      targetDate: 'September 1, 2025',
      status: 'planned' as const,
      source: 'user-added' as const
    }
  ];

  const allCertifications = [...trailheadCerts, ...userCertGoals];
  const canAddMoreCerts = userCertGoals.length < 3;

  // Combined badges from Trailhead and Transition Trails
  const allBadges = [
    { name: 'Apex Specialist', icon: '⚡', earnedDate: 'Feb 28, 2025', category: 'Development', source: 'trailhead' as const },
    { name: 'Report Master', icon: '📊', earnedDate: 'Feb 22, 2025', category: 'Analytics', source: 'transition-trails' as const },
    { name: 'Lightning Experience Specialist', icon: '🌩️', earnedDate: 'Feb 20, 2025', category: 'UI/UX', source: 'trailhead' as const },
    { name: 'Data Architect', icon: '🏗️', earnedDate: 'Feb 20, 2025', category: 'Data', source: 'transition-trails' as const },
    { name: 'Process Automation', icon: '🔄', earnedDate: 'Feb 18, 2025', category: 'Automation', source: 'trailhead' as const },
    { name: 'Automation Expert', icon: '🤖', earnedDate: 'Feb 15, 2025', category: 'Automation', source: 'transition-trails' as const },
    { name: 'Security Specialist', icon: '🔒', earnedDate: 'Feb 10, 2025', category: 'Security', source: 'trailhead' as const },
    { name: 'Flow Builder', icon: '⚡', earnedDate: 'Feb 5, 2025', category: 'Automation', source: 'transition-trails' as const },
    { name: 'Data Management', icon: '💾', earnedDate: 'Feb 1, 2025', category: 'Data', source: 'trailhead' as const },
    { name: 'User Management', icon: '👥', earnedDate: 'Jan 25, 2025', category: 'Admin', source: 'transition-trails' as const },
    { name: 'Admin Basics', icon: '🏆', earnedDate: 'Jan 20, 2025', category: 'Foundation', source: 'trailhead' as const },
    { name: 'First Steps', icon: '🎯', earnedDate: 'Jan 15, 2025', category: 'Foundation', source: 'transition-trails' as const },
  ];

  // Filter badges based on selected filter
  const filteredBadges = badgeFilter === 'all' 
    ? allBadges 
    : allBadges.filter(badge => badge.source === badgeFilter);

  // Quarterly Self-Assessments
  const selfAssessments = [
    {
      quarter: 'Q4 2024',
      completedDate: 'Dec 28, 2024',
      status: 'completed',
      coachReviewed: true,
      highlights: 'Strong progress in automation skills, certification on track'
    },
    {
      quarter: 'Q3 2024',
      completedDate: 'Sep 30, 2024',
      status: 'completed',
      coachReviewed: true,
      highlights: 'Good foundation building, consistent engagement'
    }
  ];

  const nextSelfAssessment = {
    quarter: 'Q1 2025',
    dueDate: 'March 31, 2025',
    daysRemaining: 28,
    status: 'pending',
    setBy: 'Coach Sarah Martinez'
  };

  // Learning History
  const learningHistory = [
    // Courses
    { 
      id: 1,
      type: 'courses', 
      title: 'Process Automation Specialist', 
      completedDate: 'Feb 28, 2025',
      duration: '8 hours',
      score: 95,
      badge: 'Process Automation Expert',
      category: 'Salesforce Development'
    },
    { 
      id: 2,
      type: 'courses', 
      title: 'Salesforce Admin Fundamentals', 
      completedDate: 'Feb 15, 2025',
      duration: '12 hours',
      score: 88,
      badge: 'Admin Fundamentals',
      category: 'Salesforce Administration'
    },
    { 
      id: 3,
      type: 'courses', 
      title: 'Data Management Best Practices', 
      completedDate: 'Feb 1, 2025',
      duration: '6 hours',
      score: 92,
      category: 'Data & Analytics'
    },
    { 
      id: 4,
      type: 'courses', 
      title: 'Lightning Web Components Basics', 
      completedDate: 'Jan 20, 2025',
      duration: '10 hours',
      score: 85,
      category: 'Salesforce Development'
    },
    
    // Daily Missions
    { 
      id: 5,
      type: 'daily-missions', 
      title: 'Master Flow Builder Variables',
      completedDate: 'Feb 28, 2025',
      points: 50,
      streak: true,
      category: 'Automation'
    },
    { 
      id: 6,
      type: 'daily-missions', 
      title: 'Create Custom Report Dashboard',
      completedDate: 'Feb 27, 2025',
      points: 50,
      streak: true,
      category: 'Reporting'
    },
    { 
      id: 7,
      type: 'daily-missions', 
      title: 'Configure Email Templates',
      completedDate: 'Feb 26, 2025',
      points: 50,
      streak: true,
      category: 'Administration'
    },
    { 
      id: 8,
      type: 'daily-missions', 
      title: 'Practice SOQL Queries',
      completedDate: 'Feb 25, 2025',
      points: 50,
      streak: true,
      category: 'Development'
    },
    
    // Trail Missions
    { 
      id: 9,
      type: 'trail-missions', 
      title: 'Admin Trail: User Management',
      completedDate: 'Feb 20, 2025',
      modules: 8,
      points: 400,
      badge: 'User Management Master',
      difficulty: 'Intermediate'
    },
    { 
      id: 10,
      type: 'trail-missions', 
      title: 'Developer Trail: Apex Fundamentals',
      completedDate: 'Feb 10, 2025',
      modules: 12,
      points: 600,
      badge: 'Apex Explorer',
      difficulty: 'Advanced'
    },
    { 
      id: 11,
      type: 'trail-missions', 
      title: 'Business Analyst Trail: Requirements Gathering',
      completedDate: 'Jan 28, 2025',
      modules: 6,
      points: 300,
      difficulty: 'Beginner'
    },
    
    // Capstone Projects
    { 
      id: 12,
      type: 'capstone', 
      title: 'Customer Service Portal Redesign',
      completedDate: 'Feb 18, 2025',
      score: 94,
      coachFeedback: 'Excellent work on the user flow and automation logic!',
      skills: ['Process Automation', 'Lightning Web Components', 'User Experience']
    },
    { 
      id: 13,
      type: 'capstone', 
      title: 'Sales Pipeline Analytics Dashboard',
      completedDate: 'Jan 25, 2025',
      score: 89,
      coachFeedback: 'Great use of custom reports and dynamic dashboards.',
      skills: ['Reporting', 'Data Analysis', 'Dashboard Design']
    },
    
    // Special Assignments
    { 
      id: 14,
      type: 'assignments', 
      title: 'Build Custom Object Schema',
      completedDate: 'Today, 9:15 AM',
      score: 100,
      submittedOn: 'Mar 3, 2025',
      coachReviewed: true,
      category: 'Data Modeling'
    },
    { 
      id: 15,
      type: 'assignments', 
      title: 'Create Validation Rules',
      completedDate: 'Feb 24, 2025',
      score: 95,
      submittedOn: 'Feb 24, 2025',
      coachReviewed: true,
      category: 'Administration'
    },
    { 
      id: 16,
      type: 'assignments', 
      title: 'Design Email Campaign Automation',
      completedDate: 'Feb 18, 2025',
      score: 92,
      submittedOn: 'Feb 18, 2025',
      coachReviewed: true,
      category: 'Marketing Automation'
    },
    { 
      id: 17,
      type: 'assignments', 
      title: 'Configure Permission Sets',
      completedDate: 'Feb 10, 2025',
      score: 88,
      submittedOn: 'Feb 10, 2025',
      coachReviewed: true,
      category: 'Security'
    }
  ];

  const filteredLearningHistory = learningHistoryFilter === 'all' 
    ? learningHistory 
    : learningHistory.filter(item => item.type === learningHistoryFilter);

  const activityLog = [
    { date: 'Today, 10:30 AM', activity: 'Completed Process Automation module', type: 'learning' },
    { date: 'Today, 9:15 AM', activity: 'Submitted assignment: Build Custom Object Schema', type: 'assignment' },
    { date: 'Yesterday, 3:45 PM', activity: 'Earned badge: Report Master', type: 'achievement' },
    { date: 'Yesterday, 2:00 PM', activity: 'Attended Team Standup', type: 'collaboration' },
    { date: 'Feb 26, 4:20 PM', activity: 'Completed Daily Missions streak (4 days)', type: 'achievement' },
  ];

  const preferences = [
    { label: 'Email Notifications', enabled: true },
    { label: 'Slack Notifications', enabled: true },
    { label: 'Weekly Progress Reports', enabled: true },
    { label: 'Assignment Reminders', enabled: true },
    { label: 'Peer Collaboration Invites', enabled: false },
  ];

  // Resume History
  const resumeVersions = [
    {
      id: 'RES-003',
      timestamp: 'Mar 10, 2025 2:15 PM',
      fileName: 'AlexJohnson_Resume_v3.pdf',
      size: '185 KB',
      changes: 'Added 3 new achievements, reworded summary paragraph'
    },
    {
      id: 'RES-002',
      timestamp: 'Feb 28, 2025 11:30 AM',
      fileName: 'AlexJohnson_Resume_v2.pdf',
      size: '178 KB',
      changes: 'Enhanced formatting, added Capstone project details'
    },
    {
      id: 'RES-001',
      timestamp: 'Feb 14, 2025 9:45 AM',
      fileName: 'AlexJohnson_Resume_v1.pdf',
      size: '165 KB',
      changes: 'Initial upload'
    }
  ];

  // Initial Penny suggestions when resume is uploaded
  const initialPennySuggestions = [
    {
      sender: 'penny' as const,
      message: "I've reviewed your résumé! Here are some suggestions to make it shine:",
      suggestions: [
        'Your "Volunteer Coordinator" role could use quantifiable metrics. Try: "Managed 50+ volunteers across 12 community events"',
        'Consider adding your Salesforce Administrator certification progress (68% complete)',
        'Your skills section is missing key technologies from your Capstone project: Process Automation, Lightning Web Components'
      ]
    }
  ];

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setResumeFileName(file.name);
      setIsResumeProcessing(true);
      
      // Simulate processing
      setTimeout(() => {
        setIsResumeProcessing(false);
        setResumeUploaded(true);
        setPennyMessages(initialPennySuggestions);
      }, 2000);
    }
  };

  const handleSendMessage = () => {
    if (!userMessage.trim()) return;
    
    setPennyMessages([...pennyMessages, { sender: 'user', message: userMessage }]);
    setUserMessage('');
    
    // Simulate Penny's response
    setTimeout(() => {
      setPennyMessages(prev => [...prev, {
        sender: 'penny',
        message: "Great question! I can help with that. Let me suggest some improvements based on your Transition Trails achievements.",
        suggestions: [
          'Update your summary to highlight your transition into tech and Salesforce expertise',
          'Add a "Technical Skills" section featuring: Salesforce (Admin, Flow, Apex), Process Automation, Data Management'
        ]
      }]);
    }, 1000);
  };

  const handleRebuildResume = () => {
    setIsRebuilding(true);
    setTimeout(() => {
      setIsRebuilding(false);
      setPennyMessages(prev => [...prev, {
        sender: 'penny',
        message: "✨ Your résumé has been rebuilt! I've enhanced the formatting, added your Transition Trails achievements, and optimized for ATS systems. Check the preview on the right!",
      }]);
    }, 3000);
  };

  // LinkedIn Profile Data
  const linkedInProfile = {
    name: 'Alex Johnson',
    headline: 'Volunteer Coordinator at Community Foundation',
    profilePicture: 'AJ',
    tokenStatus: 'Active',
    lastSync: '2 hours ago'
  };

  // LinkedIn Profile Suggestions from Penny
  const linkedInSuggestions = {
    headline: {
      current: 'Volunteer Coordinator at Community Foundation',
      penny: 'Salesforce Administrator | Certified Admin Candidate | Volunteer Coordinator Transitioning to Tech',
      reasoning: 'Your new headline emphasizes your tech journey and certification progress, making you more discoverable to recruiters.'
    },
    about: {
      current: 'Passionate about helping nonprofits achieve their mission through volunteer coordination and community engagement.',
      penny: `Salesforce Administrator and tech professional with a unique background in nonprofit operations. Currently pursuing Salesforce Administrator certification (68% complete) through the Transition Trails program.\n\nI bring real-world nonprofit experience combined with hands-on Salesforce expertise including:\n• Process Automation & Flow Builder\n• Lightning Web Components\n• Data Management & Reporting\n• User Experience Design\n\nRecent capstone project: Customer Service Portal Redesign - built automation workflows serving 500+ users.\n\nI'm passionate about using technology to amplify nonprofit impact and am actively seeking Salesforce Administrator opportunities.`,
      reasoning: 'This version tells your transformation story while highlighting specific technical skills employers search for.'
    },
    experience: {
      current: 'Volunteer Coordinator\nCommunity Foundation\n2020 - Present\n• Managed volunteer program\n• Coordinated events',
      penny: 'Volunteer Coordinator\nCommunity Foundation\n2020 - Present\n• Managed 50+ volunteers across 12 community events, improving retention by 35%\n• Implemented Salesforce volunteer management system, reducing admin time by 20 hours/month\n• Designed automated email campaigns using Salesforce Flow, reaching 500+ stakeholders\n• Built custom dashboards for executive reporting, enabling data-driven decision making',
      reasoning: 'Added quantifiable metrics and incorporated your Salesforce work to show immediate business value.'
    },
    skills: {
      current: ['Event Planning', 'Volunteer Management', 'Community Outreach'],
      penny: ['Salesforce Administration', 'Process Automation', 'Flow Builder', 'Lightning Web Components', 'Data Management', 'Reporting & Dashboards', 'Volunteer Management', 'Event Planning', 'Stakeholder Communication'],
      reasoning: 'Leading with technical skills increases your visibility in recruiter searches while keeping your transferable skills.'
    },
    featured: {
      current: [],
      penny: [
        {
          type: 'project',
          title: 'Customer Service Portal Redesign',
          description: 'Capstone project: Built Salesforce Experience Cloud portal with custom automation workflows',
          link: '#'
        },
        {
          type: 'certification',
          title: 'Salesforce Administrator (In Progress)',
          description: '68% complete - Expected completion: May 2025',
          link: '#'
        },
        {
          type: 'post',
          title: 'My Journey from Nonprofit to Tech',
          description: 'Sharing insights on career transition and the power of upskilling',
          link: '#'
        }
      ],
      reasoning: 'Showcasing your capstone work and certification progress provides social proof of your capabilities.'
    }
  };

  // Shareable Achievements
  const shareableAchievements = [
    {
      id: 'capstone-1',
      type: 'capstone',
      title: 'Customer Service Portal Redesign',
      description: 'Built a Salesforce Experience Cloud portal with automation workflows serving 500+ users',
      image: '🏆',
      date: 'Feb 18, 2025'
    },
    {
      id: 'badge-1',
      type: 'badge',
      title: 'Process Automation Specialist',
      description: 'Completed advanced Flow Builder training and earned specialist badge',
      image: '⚡',
      date: 'Feb 28, 2025'
    },
    {
      id: 'cert-progress',
      type: 'milestone',
      title: 'Salesforce Admin Certification Progress',
      description: '68% complete on my journey to Salesforce Administrator certification',
      image: '🎯',
      date: 'Today'
    },
    {
      id: 'trailhead-rank',
      type: 'milestone',
      title: 'Trailhead Rank: Ranger',
      description: 'Completed 24 modules and earned 2,400 points',
      image: '⭐',
      date: 'Mar 1, 2025'
    }
  ];

  // Default share post templates
  const sharePostTemplates = {
    capstone: `🎉 Excited to share my latest capstone project from the Transition Trails program!\n\nI built a Customer Service Portal using Salesforce Experience Cloud, featuring:\n✅ Custom automation workflows\n✅ Lightning Web Components\n✅ Serving 500+ users\n\nThis project represents the culmination of months of learning and hands-on development. Grateful for the support from my coach Sarah Martinez and the entire Transition Trails community.\n\n#Salesforce #CareerTransition #TechForGood #TransitionTrails`,
    badge: `🏆 Just earned my Process Automation Specialist badge!\n\nCompleted advanced training in Salesforce Flow Builder, learning to:\n• Design complex automation workflows\n• Implement error handling and debugging\n• Optimize for performance and scalability\n\nReady to put these skills to work in real-world Salesforce projects!\n\n#Salesforce #ProcessAutomation #ContinuousLearning`,
    milestone: `📊 Career transition milestone: 68% complete on my Salesforce Administrator certification!\n\nThrough the Transition Trails program, I've gone from nonprofit coordinator to confident Salesforce developer. The journey includes:\n• 24 Trailhead modules completed\n• 3 capstone projects delivered\n• Hands-on experience with real-world scenarios\n\nTarget certification date: May 2025. The best investment is in yourself!\n\n#CareerChange #Salesforce #ProfessionalDevelopment #TransitionTrails`
  };

  const handleConnectLinkedIn = () => {
    setIsLinkedInProcessing(true);
    setTimeout(() => {
      setIsLinkedInProcessing(false);
      setIsLinkedInConnected(true);
      toast.success('LinkedIn connected successfully!');
    }, 2000);
  };

  const handleDisconnectLinkedIn = () => {
    setIsLinkedInConnected(false);
    toast.success('LinkedIn disconnected');
  };

  const handleCopyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    toast.success(`${label} copied to clipboard!`);
  };

  const handleOpenShareModal = (type: 'capstone' | 'badge' | 'milestone') => {
    setSharePostType(type);
    setSharePostText(sharePostTemplates[type]);
    setIsShareModalOpen(true);
  };

  const handlePostToLinkedIn = () => {
    toast.success('Posted to LinkedIn successfully!', {
      description: 'Your achievement is now live on your profile'
    });
    setIsShareModalOpen(false);
  };

  const toggleAchievement = (achievementId: string) => {
    setSelectedAchievements(prev => 
      prev.includes(achievementId) 
        ? prev.filter(id => id !== achievementId)
        : [...prev, achievementId]
    );
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <button 
          onClick={() => onNavigate('learner')}
          className="flex items-center space-x-2 text-[#2C6975] hover:underline mb-4"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Home</span>
        </button>
        <h2 className="text-3xl text-gray-900 mb-2">My Profile</h2>
        <p className="text-gray-600">Manage your learning profile and preferences</p>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Left Column */}
        <div className="space-y-6">
          {/* Profile Info */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex flex-col items-center text-center mb-6">
              <div className="w-24 h-24 rounded-full bg-gradient-to-br from-[#2C6975] to-[#7EB5C1] flex items-center justify-center text-white text-3xl mb-4">
                AJ
              </div>
              <h3 className="text-gray-900 mb-1">Alex Johnson</h3>
              <p className="text-sm text-gray-600 mb-4">Learner</p>
              <button className="flex items-center space-x-2 text-[#2C6975] hover:underline text-sm">
                <Edit className="w-4 h-4" />
                <span>Edit Profile</span>
              </button>
            </div>

            <div className="space-y-3 text-sm">
              <div className="flex items-center space-x-3 text-gray-600">
                <Mail className="w-4 h-4" />
                <span>alex.johnson@example.com</span>
              </div>
              <a 
                href="https://linkedin.com/in/alexjohnson" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center space-x-3 text-[#2C6975] hover:underline"
              >
                <Linkedin className="w-4 h-4" />
                <span>LinkedIn Profile</span>
              </a>
              <a 
                href="https://trailblazer.me/id/alexjohnson" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center space-x-3 text-[#2C6975] hover:underline"
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 0L15.5 8.5L24 9.5L17 15.5L19.5 24L12 19L4.5 24L7 15.5L0 9.5L8.5 8.5L12 0Z"/>
                </svg>
                <span>Trailhead Profile</span>
              </a>
              <div className="flex items-center space-x-3 text-gray-600">
                <Calendar className="w-4 h-4" />
                <span>Joined: Jan 15, 2025</span>
              </div>
              <div className="flex items-center space-x-3 text-gray-600">
                <BookOpen className="w-4 h-4" />
                <span>Guided Trail: Salesforce Admin</span>
              </div>
              <div className="flex items-center space-x-3 text-gray-600">
                <Target className="w-4 h-4" />
                <span>Cohort: Spring 2025</span>
              </div>
            </div>
          </div>

          {/* Stats */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h3 className="text-gray-900 mb-4">Learning Stats</h3>
            <div className="space-y-4">
              <div>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm text-gray-600">Overall Progress</span>
                  <span className="text-sm text-gray-900">68%</span>
                </div>
                <div className="w-full bg-gray-100 rounded-full h-2">
                  <div className="bg-[#2C6975] h-2 rounded-full" style={{ width: '68%' }}></div>
                </div>
              </div>
              <div className="pt-4 border-t border-gray-200 space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Modules Completed</span>
                  <span className="text-gray-900">24</span>
                </div>
                <button 
                  onClick={() => onNavigate('assignments')}
                  className="w-full flex items-center justify-between text-sm hover:bg-gray-50 -mx-2 px-2 py-1 rounded transition-colors"
                >
                  <span className="text-gray-600">Assignments Submitted</span>
                  <span className="text-[#2C6975]">12 →</span>
                </button>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Badges Earned</span>
                  <span className="text-gray-900">6</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Current Streak</span>
                  <span className="text-gray-900">4 days</span>
                </div>
              </div>
            </div>
          </div>

          {/* Preferences */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h3 className="text-gray-900 mb-4">Notification Preferences</h3>
            <div className="space-y-3">
              {preferences.map((pref, idx) => (
                <div key={idx} className="flex items-center justify-between">
                  <span className="text-sm text-gray-700">{pref.label}</span>
                  <button 
                    className={`w-11 h-6 rounded-full transition-colors ${
                      pref.enabled ? 'bg-[#3B6A52]' : 'bg-gray-300'
                    }`}
                  >
                    <div className={`w-4 h-4 rounded-full bg-white transition-transform ${
                      pref.enabled ? 'translate-x-6' : 'translate-x-1'
                    }`}></div>
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div className="lg:col-span-2 space-y-4">
          {/* Pluralsight IQ Skills Assessments */}
          <Collapsible open={isAssessmentsOpen} onOpenChange={setIsAssessmentsOpen}>
            <div className="bg-white rounded-xl shadow-sm border border-gray-200">
              <CollapsibleTrigger className="w-full p-4 flex items-center justify-between hover:bg-gray-50 rounded-t-xl transition-colors">
                <h3 className="text-gray-900 flex items-center space-x-2">
                  <Brain className="w-5 h-5 text-[#2C6975]" />
                  <span>Pluralsight IQ Skills Assessments</span>
                </h3>
                <div className="flex items-center space-x-2">
                  <button 
                    onClick={(e) => { e.stopPropagation(); }}
                    className="text-sm bg-[#2C6975] text-white px-3 py-1 rounded-lg hover:bg-[#234f57] transition-colors"
                  >
                    Take Assessment
                  </button>
                  {isAssessmentsOpen ? <ChevronUp className="w-5 h-5 text-gray-500" /> : <ChevronDown className="w-5 h-5 text-gray-500" />}
                </div>
              </CollapsibleTrigger>
              <CollapsibleContent>
                <div className="p-4 pt-0">

            {/* Next Assessment Due */}
            <div className={`mb-4 p-3 rounded-lg border-2 ${
              daysUntilAssessment <= 7 ? 'border-[#F9A03F] bg-[#F9A03F]/5' : 'border-[#7EB5C1] bg-[#7EB5C1]/5'
            }`}>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-gray-600 mb-1">Next Assessment Due</p>
                  <p className="text-sm text-gray-900">{nextAssessmentDue}</p>
                </div>
                <div className="text-right">
                  <p className="text-xl text-gray-900">{daysUntilAssessment}</p>
                  <p className="text-xs text-gray-600">days left</p>
                </div>
              </div>
            </div>

            {/* Latest Score & Progress Chart */}
            <div className="grid md:grid-cols-2 gap-4 mb-4">
              <div>
                <p className="text-xs text-gray-600 mb-2">Latest Assessment Score</p>
                <div className="flex items-end space-x-2 mb-2">
                  <span className="text-3xl text-[#2C6975]">{skillAssessments[0].score}</span>
                  <div className="pb-1">
                    <span className="px-2 py-1 rounded-full bg-[#3B6A52] text-white text-xs">
                      {skillAssessments[0].level}
                    </span>
                  </div>
                </div>
                <p className="text-xs text-gray-600 mb-2">{skillAssessments[0].date}</p>
                <div className="flex items-center space-x-1 text-xs text-[#3B6A52]">
                  <TrendingUp className="w-3 h-3" />
                  <span>+{skillAssessments[0].score - skillAssessments[1].score} pts</span>
                </div>
              </div>

              <div>
                <p className="text-xs text-gray-600 mb-2">Score Progress</p>
                <ResponsiveContainer width="100%" height={100}>
                  <LineChart data={assessmentHistory}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                    <XAxis dataKey="date" tick={{ fill: '#6B7280', fontSize: 10 }} />
                    <YAxis domain={[100, 200]} tick={{ fill: '#6B7280', fontSize: 10 }} />
                    <Tooltip />
                    <Line type="monotone" dataKey="score" stroke="#2C6975" strokeWidth={2} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Skill Breakdown */}
            <div>
              <p className="text-xs text-gray-900 mb-2">Latest Assessment Breakdown</p>
              <div className="space-y-2">
                {skillAssessments[0].skills.map((skill, idx) => (
                  <div key={idx}>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs text-gray-700">{skill.name}</span>
                      <span className="text-xs text-gray-900">{skill.score}</span>
                    </div>
                    <div className="w-full bg-gray-100 rounded-full h-1.5">
                      <div 
                        className="bg-[#2C6975] h-1.5 rounded-full"
                        style={{ width: `${(skill.score / 200) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Assessment History */}
            <div className="mt-4 pt-4 border-t border-gray-200">
              <p className="text-xs text-gray-900 mb-2">Assessment History</p>
              <div className="space-y-1.5">
                {skillAssessments.map((assessment, idx) => (
                  <div key={idx} className="flex items-center justify-between p-2 bg-gray-50 rounded-lg">
                    <div>
                      <p className="text-xs text-gray-900">{assessment.date}</p>
                      <p className="text-xs text-gray-500">{assessment.level}</p>
                    </div>
                    <span className="text-sm text-gray-900">{assessment.score}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
              </CollapsibleContent>
            </div>
          </Collapsible>

          {/* Quarterly Self-Assessments */}
          <Collapsible open={isSelfAssessmentOpen} onOpenChange={setIsSelfAssessmentOpen}>
            <div className="bg-white rounded-xl shadow-sm border border-gray-200">
              <CollapsibleTrigger className="w-full p-4 flex items-center justify-between hover:bg-gray-50 rounded-t-xl transition-colors">
                <h3 className="text-gray-900 flex items-center space-x-2">
                  <CheckCircle className="w-5 h-5 text-[#3B6A52]" />
                  <span>Quarterly Self-Assessments</span>
                </h3>
                {isSelfAssessmentOpen ? <ChevronUp className="w-5 h-5 text-gray-500" /> : <ChevronDown className="w-5 h-5 text-gray-500" />}
              </CollapsibleTrigger>
              <CollapsibleContent>
                <div className="p-4 pt-0">
                  {/* Next Assessment Due */}
                  <div className={`mb-4 p-4 rounded-lg border-2 ${
                    nextSelfAssessment.daysRemaining <= 7 
                      ? 'border-red-300 bg-red-50' 
                      : nextSelfAssessment.daysRemaining <= 14 
                      ? 'border-[#F9A03F] bg-[#F9A03F]/5' 
                      : 'border-[#7EB5C1] bg-[#7EB5C1]/5'
                  }`}>
                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <p className="text-xs text-gray-600 mb-1">Next Assessment Due</p>
                        <p className="text-gray-900">{nextSelfAssessment.quarter}</p>
                        <p className="text-sm text-gray-700">{nextSelfAssessment.dueDate}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-2xl text-gray-900">{nextSelfAssessment.daysRemaining}</p>
                        <p className="text-xs text-gray-600">days left</p>
                      </div>
                    </div>
                    <p className="text-xs text-gray-600 mb-3">Set by {nextSelfAssessment.setBy}</p>
                    <button
                      onClick={() => onNavigate('self-assessment')}
                      className="w-full bg-[#2C6975] text-white px-4 py-2.5 rounded-lg hover:bg-[#234f57] transition-colors flex items-center justify-center space-x-2"
                    >
                      <Edit className="w-4 h-4" />
                      <span>Start Assessment</span>
                    </button>
                    <div className="mt-3 p-2 bg-white/50 rounded border border-[#F9A03F]/20">
                      <p className="text-xs text-gray-700 flex items-center space-x-1">
                        <Sparkles className="w-3 h-3 text-[#F9A03F]" />
                        <span>Penny AI will help you reflect on your growth</span>
                      </p>
                    </div>
                  </div>

                  {/* Past Assessments */}
                  <div>
                    <p className="text-xs text-gray-600 mb-2">Past Assessments</p>
                    <div className="space-y-2">
                      {selfAssessments.map((assessment, idx) => (
                        <div key={idx} className="p-3 border border-gray-200 rounded-lg hover:border-[#2C6975] transition-colors">
                          <div className="flex items-center justify-between mb-2">
                            <div>
                              <p className="text-sm text-gray-900">{assessment.quarter}</p>
                              <p className="text-xs text-gray-600">Completed: {assessment.completedDate}</p>
                            </div>
                            <div className="flex items-center space-x-2">
                              {assessment.coachReviewed && (
                                <span className="px-2 py-1 rounded-full bg-[#3B6A52] text-white text-xs">
                                  Reviewed
                                </span>
                              )}
                              <CheckCircle className="w-4 h-4 text-[#3B6A52]" />
                            </div>
                          </div>
                          {assessment.highlights && (
                            <p className="text-xs text-gray-600 italic">"{assessment.highlights}"</p>
                          )}
                          <button className="text-xs text-[#2C6975] hover:underline mt-2">
                            View Details →
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </CollapsibleContent>
            </div>
          </Collapsible>

          {/* Career Goals */}
          <Collapsible open={isGoalsOpen} onOpenChange={setIsGoalsOpen}>
            <div className="bg-white rounded-xl shadow-sm border border-gray-200">
              <CollapsibleTrigger className="w-full p-4 flex items-center justify-between hover:bg-gray-50 rounded-t-xl transition-colors">
                <h3 className="text-gray-900 flex items-center space-x-2">
                  <Target className="w-5 h-5 text-[#F9A03F]" />
                  <span>Career Goals</span>
                </h3>
                <div className="flex items-center space-x-2">
                  <button 
                    onClick={(e) => { e.stopPropagation(); }}
                    className="text-xs text-[#2C6975] hover:underline"
                  >
                    <Edit className="w-3 h-3 inline mr-1" />
                    Edit
                  </button>
                  {isGoalsOpen ? <ChevronUp className="w-5 h-5 text-gray-500" /> : <ChevronDown className="w-5 h-5 text-gray-500" />}
                </div>
              </CollapsibleTrigger>
              <CollapsibleContent>
                <div className="p-4 pt-0 space-y-3">
                  {careerGoals.map((goal, idx) => (
                    <div key={idx} className="p-3 border border-gray-200 rounded-lg">
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex-1">
                          <h4 className="text-sm text-gray-900 mb-1">{goal.goal}</h4>
                          <p className="text-xs text-gray-600">Target: {goal.targetDate}</p>
                        </div>
                        <span className="px-2 py-1 rounded-full bg-[#F9A03F] text-white text-xs">
                          {goal.status === 'in-progress' ? 'In Progress' : 'Planned'}
                        </span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <div className="flex-1">
                          <div className="w-full bg-gray-100 rounded-full h-1.5">
                            <div 
                              className="bg-[#F9A03F] h-1.5 rounded-full"
                              style={{ width: `${goal.progress}%` }}
                            ></div>
                          </div>
                        </div>
                        <span className="text-xs text-gray-600">{goal.progress}%</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CollapsibleContent>
            </div>
          </Collapsible>

          {/* Skills Focus */}
          <Collapsible open={isSkillsOpen} onOpenChange={setIsSkillsOpen}>
            <div className="bg-white rounded-xl shadow-sm border border-gray-200">
              <CollapsibleTrigger className="w-full p-4 flex items-center justify-between hover:bg-gray-50 rounded-t-xl transition-colors">
                <h3 className="text-gray-900 flex items-center space-x-2">
                  <TrendingUp className="w-5 h-5 text-[#3B6A52]" />
                  <span>Skills I'm Building</span>
                </h3>
                <div className="flex items-center space-x-2">
                  <button 
                    onClick={(e) => { e.stopPropagation(); }}
                    className="text-xs text-[#2C6975] hover:underline"
                  >
                    <Edit className="w-3 h-3 inline mr-1" />
                    Manage
                  </button>
                  {isSkillsOpen ? <ChevronUp className="w-5 h-5 text-gray-500" /> : <ChevronDown className="w-5 h-5 text-gray-500" />}
                </div>
              </CollapsibleTrigger>
              <CollapsibleContent>
                <div className="p-4 pt-0 space-y-2">
                  {focusedSkills.map((skill, idx) => (
                    <div key={idx} className="p-3 border border-gray-200 rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center space-x-2">
                          <h4 className="text-sm text-gray-900">{skill.name}</h4>
                          <span className={`px-2 py-0.5 rounded-full text-xs ${
                            skill.priority === 'high' ? 'bg-red-100 text-red-700' : 'bg-[#F9A03F]/20 text-[#F9A03F]'
                          }`}>
                            {skill.priority}
                          </span>
                        </div>
                        <span className="text-xs text-gray-600">{skill.weeklyHours}h/wk</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <div className="flex-1">
                          <div className="w-full bg-gray-100 rounded-full h-1.5">
                            <div 
                              className="bg-[#3B6A52] h-1.5 rounded-full"
                              style={{ width: `${skill.progress}%` }}
                            ></div>
                          </div>
                        </div>
                        <span className="text-xs text-gray-600">{skill.progress}%</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CollapsibleContent>
            </div>
          </Collapsible>

          {/* Badges */}
          <Collapsible open={isBadgesOpen} onOpenChange={setIsBadgesOpen}>
            <div className="bg-white rounded-xl shadow-sm border border-gray-200">
              <CollapsibleTrigger className="w-full p-4 flex items-center justify-between hover:bg-gray-50 rounded-t-xl transition-colors">
                <h3 className="text-gray-900 flex items-center space-x-2">
                  <Award className="w-5 h-5 text-[#F9A03F]" />
                  <span>Earned Badges</span>
                  <span className="text-xs text-gray-500">({filteredBadges.length})</span>
                </h3>
                {isBadgesOpen ? <ChevronUp className="w-5 h-5 text-gray-500" /> : <ChevronDown className="w-5 h-5 text-gray-500" />}
              </CollapsibleTrigger>
              <CollapsibleContent>
                <div className="p-4 pt-0">
                  {/* Filter Toggle */}
                  <div className="flex items-center space-x-2 mb-3 p-1 bg-gray-100 rounded-lg">
                    <button
                      onClick={() => setBadgeFilter('all')}
                      className={`flex-1 px-3 py-1.5 rounded-md text-xs transition-colors ${
                        badgeFilter === 'all' 
                          ? 'bg-white text-gray-900 shadow-sm' 
                          : 'text-gray-600 hover:text-gray-900'
                      }`}
                    >
                      All ({allBadges.length})
                    </button>
                    <button
                      onClick={() => setBadgeFilter('trailhead')}
                      className={`flex-1 px-3 py-1.5 rounded-md text-xs transition-colors ${
                        badgeFilter === 'trailhead' 
                          ? 'bg-white text-gray-900 shadow-sm' 
                          : 'text-gray-600 hover:text-gray-900'
                      }`}
                    >
                      Trailhead ({allBadges.filter(b => b.source === 'trailhead').length})
                    </button>
                    <button
                      onClick={() => setBadgeFilter('transition-trails')}
                      className={`flex-1 px-3 py-1.5 rounded-md text-xs transition-colors ${
                        badgeFilter === 'transition-trails' 
                          ? 'bg-white text-gray-900 shadow-sm' 
                          : 'text-gray-600 hover:text-gray-900'
                      }`}
                    >
                      TT ({allBadges.filter(b => b.source === 'transition-trails').length})
                    </button>
                  </div>

                  {/* Badges Grid */}
                  <div className="grid md:grid-cols-3 gap-3">
                    {filteredBadges.map((badge, idx) => (
                      <div key={idx} className="p-3 border border-gray-200 rounded-lg hover:border-[#2C6975] transition-colors text-center group">
                        <div className="text-3xl mb-1">{badge.icon}</div>
                        <h4 className="text-xs text-gray-900 mb-0.5">{badge.name}</h4>
                        <p className="text-xs text-gray-500 mb-1">{badge.category}</p>
                        <div className="flex items-center justify-center space-x-1">
                          <p className="text-xs text-gray-400">{badge.earnedDate}</p>
                          <span className={`px-1.5 py-0.5 rounded text-xs ${
                            badge.source === 'trailhead' 
                              ? 'bg-blue-100 text-blue-700' 
                              : 'bg-[#2C6975]/10 text-[#2C6975]'
                          }`}>
                            {badge.source === 'trailhead' ? 'TH' : 'TT'}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  {filteredBadges.length === 0 && (
                    <p className="text-center text-sm text-gray-500 py-8">
                      No badges found for this filter
                    </p>
                  )}
                </div>
              </CollapsibleContent>
            </div>
          </Collapsible>

          {/* Certifications */}
          <Collapsible open={isCertsOpen} onOpenChange={setIsCertsOpen}>
            <div className="bg-white rounded-xl shadow-sm border border-gray-200">
              <CollapsibleTrigger className="w-full p-4 flex items-center justify-between hover:bg-gray-50 rounded-t-xl transition-colors">
                <h3 className="text-gray-900 flex items-center space-x-2">
                  <Award className="w-5 h-5 text-[#2C6975]" />
                  <span>Certifications</span>
                </h3>
                <div className="flex items-center space-x-2">
                  {canAddMoreCerts && (
                    <button 
                      onClick={(e) => { e.stopPropagation(); }}
                      className="text-xs bg-[#2C6975] text-white px-2 py-1 rounded hover:bg-[#234f57] transition-colors"
                    >
                      + Add Goal
                    </button>
                  )}
                  {isCertsOpen ? <ChevronUp className="w-5 h-5 text-gray-500" /> : <ChevronDown className="w-5 h-5 text-gray-500" />}
                </div>
              </CollapsibleTrigger>
              <CollapsibleContent>
                <div className="p-4 pt-0 space-y-3">
                  {/* Trailhead Certifications */}
                  <div>
                    <p className="text-xs text-gray-500 mb-2 flex items-center space-x-1">
                      <svg className="w-3 h-3" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 0L15.5 8.5L24 9.5L17 15.5L19.5 24L12 19L4.5 24L7 15.5L0 9.5L8.5 8.5L12 0Z"/>
                      </svg>
                      <span>From Trailhead</span>
                    </p>
                    {trailheadCerts.map((cert, idx) => (
                      <div key={idx} className="p-3 mb-2 border-2 border-blue-100 bg-blue-50/30 rounded-lg hover:border-blue-300 transition-colors">
                        <div className="flex items-center justify-between mb-3">
                          <div>
                            <h4 className="text-sm text-gray-900 mb-1">{cert.name}</h4>
                            <div className="flex items-center space-x-3 text-xs text-gray-600">
                              <span>Target: {cert.targetDate}</span>
                              {cert.studyHoursWeek > 0 && (
                                <>
                                  <span>•</span>
                                  <span>{cert.studyHoursWeek}h/wk</span>
                                </>
                              )}
                            </div>
                          </div>
                          <span className={`px-2 py-1 rounded-full text-xs ${
                            cert.status === 'in-progress' ? 'bg-[#F9A03F] text-white' :
                            cert.status === 'planned' ? 'bg-gray-200 text-gray-700' :
                            'bg-[#3B6A52] text-white'
                          }`}>
                            {cert.status === 'in-progress' ? 'Active' :
                             cert.status === 'planned' ? 'Planned' : 'Done'}
                          </span>
                        </div>
                        
                        {cert.progress > 0 && (
                          <>
                            <div className="flex items-center space-x-2 mb-2">
                              <div className="flex-1">
                                <div className="w-full bg-gray-100 rounded-full h-2">
                                  <div 
                                    className="bg-[#2C6975] h-2 rounded-full transition-all duration-500"
                                    style={{ width: `${cert.progress}%` }}
                                  ></div>
                                </div>
                              </div>
                              <span className="text-xs text-gray-900">{cert.progress}%</span>
                            </div>
                            <div className="flex items-center justify-between text-xs text-gray-600">
                              <span>{cert.modulesCompleted}/{cert.modulesTotal} modules</span>
                              <span>{cert.lastActivity}</span>
                            </div>
                          </>
                        )}
                      </div>
                    ))}
                  </div>

                  {/* User Added Certification Goals */}
                  {userCertGoals.length > 0 && (
                    <div>
                      <p className="text-xs text-gray-500 mb-2">My Certification Goals ({userCertGoals.length}/3)</p>
                      {userCertGoals.map((cert, idx) => (
                        <div key={idx} className="p-3 mb-2 border-2 border-gray-200 rounded-lg hover:border-[#2C6975] transition-colors group">
                          <div className="flex items-center justify-between">
                            <div className="flex-1">
                              <h4 className="text-sm text-gray-900 mb-1">{cert.name}</h4>
                              <p className="text-xs text-gray-600">Goal Date: {cert.targetDate}</p>
                            </div>
                            <div className="flex items-center space-x-2">
                              <span className="px-2 py-1 rounded-full bg-gray-200 text-gray-700 text-xs">
                                Goal
                              </span>
                              <button 
                                className="opacity-0 group-hover:opacity-100 text-xs text-red-600 hover:underline transition-opacity"
                                onClick={(e) => { e.stopPropagation(); }}
                              >
                                Remove
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Add Certification Goal Button */}
                  {canAddMoreCerts && (
                    <button className="w-full mt-2 border-2 border-dashed border-gray-300 text-gray-600 px-3 py-3 rounded-lg hover:border-[#2C6975] hover:text-[#2C6975] transition-colors text-xs">
                      + Add Certification Goal ({3 - userCertGoals.length} remaining)
                    </button>
                  )}
                </div>
              </CollapsibleContent>
            </div>
          </Collapsible>

          {/* Learning History */}
          <Collapsible open={isLearningHistoryOpen} onOpenChange={setIsLearningHistoryOpen}>
            <div className="bg-white rounded-xl shadow-sm border border-gray-200">
              <CollapsibleTrigger className="w-full p-4 flex items-center justify-between hover:bg-gray-50 rounded-t-xl transition-colors">
                <h3 className="text-gray-900 flex items-center space-x-2">
                  <BookMarked className="w-5 h-5 text-[#2C6975]" />
                  <span>Learning History</span>
                </h3>
                <div className="flex items-center space-x-2">
                  <span className="text-xs text-gray-600">{filteredLearningHistory.length} items</span>
                  {isLearningHistoryOpen ? <ChevronUp className="w-5 h-5 text-gray-500" /> : <ChevronDown className="w-5 h-5 text-gray-500" />}
                </div>
              </CollapsibleTrigger>
              <CollapsibleContent>
                <div className="p-4 pt-0">
                  {/* Filter Tabs */}
                  <div className="flex flex-wrap gap-2 mb-4 p-2 bg-gray-50 rounded-lg">
                    <button
                      onClick={() => setLearningHistoryFilter('all')}
                      className={`px-3 py-1.5 rounded-md text-xs transition-colors ${
                        learningHistoryFilter === 'all'
                          ? 'bg-[#2C6975] text-white'
                          : 'bg-white text-gray-700 hover:bg-gray-100'
                      }`}
                    >
                      All ({learningHistory.length})
                    </button>
                    <button
                      onClick={() => setLearningHistoryFilter('courses')}
                      className={`px-3 py-1.5 rounded-md text-xs transition-colors ${
                        learningHistoryFilter === 'courses'
                          ? 'bg-[#2C6975] text-white'
                          : 'bg-white text-gray-700 hover:bg-gray-100'
                      }`}
                    >
                      Courses ({learningHistory.filter(item => item.type === 'courses').length})
                    </button>
                    <button
                      onClick={() => setLearningHistoryFilter('daily-missions')}
                      className={`px-3 py-1.5 rounded-md text-xs transition-colors ${
                        learningHistoryFilter === 'daily-missions'
                          ? 'bg-[#2C6975] text-white'
                          : 'bg-white text-gray-700 hover:bg-gray-100'
                      }`}
                    >
                      Daily ({learningHistory.filter(item => item.type === 'daily-missions').length})
                    </button>
                    <button
                      onClick={() => setLearningHistoryFilter('trail-missions')}
                      className={`px-3 py-1.5 rounded-md text-xs transition-colors ${
                        learningHistoryFilter === 'trail-missions'
                          ? 'bg-[#2C6975] text-white'
                          : 'bg-white text-gray-700 hover:bg-gray-100'
                      }`}
                    >
                      Trails ({learningHistory.filter(item => item.type === 'trail-missions').length})
                    </button>
                    <button
                      onClick={() => setLearningHistoryFilter('capstone')}
                      className={`px-3 py-1.5 rounded-md text-xs transition-colors ${
                        learningHistoryFilter === 'capstone'
                          ? 'bg-[#2C6975] text-white'
                          : 'bg-white text-gray-700 hover:bg-gray-100'
                      }`}
                    >
                      Capstone ({learningHistory.filter(item => item.type === 'capstone').length})
                    </button>
                    <button
                      onClick={() => setLearningHistoryFilter('assignments')}
                      className={`px-3 py-1.5 rounded-md text-xs transition-colors ${
                        learningHistoryFilter === 'assignments'
                          ? 'bg-[#2C6975] text-white'
                          : 'bg-white text-gray-700 hover:bg-gray-100'
                      }`}
                    >
                      Assignments ({learningHistory.filter(item => item.type === 'assignments').length})
                    </button>
                  </div>

                  {/* Learning History Items */}
                  <div className="space-y-2 max-h-[600px] overflow-y-auto">
                    {filteredLearningHistory.map((item) => (
                      <div key={item.id} className="p-3 border border-gray-200 rounded-lg hover:border-[#2C6975] transition-colors">
                        {/* Courses */}
                        {item.type === 'courses' && (
                          <>
                            <div className="flex items-start justify-between mb-2">
                              <div className="flex items-start space-x-2 flex-1">
                                <BookOpen className="w-4 h-4 text-[#2C6975] mt-0.5 flex-shrink-0" />
                                <div className="flex-1">
                                  <h4 className="text-sm text-gray-900 mb-1">{item.title}</h4>
                                  <div className="flex flex-wrap items-center gap-2 text-xs text-gray-600">
                                    <span className="flex items-center space-x-1">
                                      <Clock className="w-3 h-3" />
                                      <span>{item.duration}</span>
                                    </span>
                                    <span>•</span>
                                    <span>{item.category}</span>
                                  </div>
                                </div>
                              </div>
                              <div className="text-right ml-2">
                                <div className="flex items-center space-x-1 mb-1">
                                  <Star className="w-3 h-3 text-[#F9A03F]" />
                                  <span className="text-sm text-gray-900">{item.score}%</span>
                                </div>
                                <p className="text-xs text-gray-500">{item.completedDate}</p>
                              </div>
                            </div>
                            {item.badge && (
                              <div className="flex items-center space-x-1 mt-2">
                                <Award className="w-3 h-3 text-[#F9A03F]" />
                                <span className="text-xs text-gray-700">Badge: {item.badge}</span>
                              </div>
                            )}
                          </>
                        )}

                        {/* Daily Missions */}
                        {item.type === 'daily-missions' && (
                          <>
                            <div className="flex items-start justify-between">
                              <div className="flex items-start space-x-2 flex-1">
                                <Zap className="w-4 h-4 text-[#F9A03F] mt-0.5 flex-shrink-0" />
                                <div className="flex-1">
                                  <h4 className="text-sm text-gray-900 mb-1">{item.title}</h4>
                                  <div className="flex items-center gap-2 text-xs text-gray-600">
                                    <span className="flex items-center space-x-1">
                                      <Trophy className="w-3 h-3" />
                                      <span>{item.points} pts</span>
                                    </span>
                                    <span>•</span>
                                    <span>{item.category}</span>
                                    {item.streak && (
                                      <>
                                        <span>•</span>
                                        <span className="text-[#F9A03F]">🔥 Streak</span>
                                      </>
                                    )}
                                  </div>
                                </div>
                              </div>
                              <p className="text-xs text-gray-500 ml-2">{item.completedDate}</p>
                            </div>
                          </>
                        )}

                        {/* Trail Missions */}
                        {item.type === 'trail-missions' && (
                          <>
                            <div className="flex items-start justify-between mb-2">
                              <div className="flex items-start space-x-2 flex-1">
                                <Target className="w-4 h-4 text-[#3B6A52] mt-0.5 flex-shrink-0" />
                                <div className="flex-1">
                                  <h4 className="text-sm text-gray-900 mb-1">{item.title}</h4>
                                  <div className="flex flex-wrap items-center gap-2 text-xs text-gray-600">
                                    <span>{item.modules} modules</span>
                                    <span>•</span>
                                    <span className="flex items-center space-x-1">
                                      <Trophy className="w-3 h-3" />
                                      <span>{item.points} pts</span>
                                    </span>
                                    <span>•</span>
                                    <span className={`px-2 py-0.5 rounded-full ${
                                      item.difficulty === 'Advanced' ? 'bg-red-100 text-red-700' :
                                      item.difficulty === 'Intermediate' ? 'bg-[#F9A03F]/20 text-[#F9A03F]' :
                                      'bg-green-100 text-green-700'
                                    }`}>
                                      {item.difficulty}
                                    </span>
                                  </div>
                                </div>
                              </div>
                              <p className="text-xs text-gray-500 ml-2">{item.completedDate}</p>
                            </div>
                            {item.badge && (
                              <div className="flex items-center space-x-1">
                                <Award className="w-3 h-3 text-[#3B6A52]" />
                                <span className="text-xs text-gray-700">Badge: {item.badge}</span>
                              </div>
                            )}
                          </>
                        )}

                        {/* Capstone Projects */}
                        {item.type === 'capstone' && (
                          <>
                            <div className="flex items-start justify-between mb-2">
                              <div className="flex items-start space-x-2 flex-1">
                                <Briefcase className="w-4 h-4 text-[#7EB5C1] mt-0.5 flex-shrink-0" />
                                <div className="flex-1">
                                  <h4 className="text-sm text-gray-900 mb-1">{item.title}</h4>
                                  <div className="flex flex-wrap gap-1 mb-1">
                                    {item.skills?.map((skill, idx) => (
                                      <span key={idx} className="px-2 py-0.5 rounded-full bg-[#7EB5C1]/20 text-[#2C6975] text-xs">
                                        {skill}
                                      </span>
                                    ))}
                                  </div>
                                </div>
                              </div>
                              <div className="text-right ml-2">
                                <div className="flex items-center space-x-1 mb-1">
                                  <Star className="w-3 h-3 text-[#F9A03F]" />
                                  <span className="text-sm text-gray-900">{item.score}%</span>
                                </div>
                                <p className="text-xs text-gray-500">{item.completedDate}</p>
                              </div>
                            </div>
                            {item.coachFeedback && (
                              <div className="mt-2 p-2 bg-green-50 rounded border border-green-200">
                                <p className="text-xs text-gray-700 italic">"{item.coachFeedback}"</p>
                              </div>
                            )}
                          </>
                        )}

                        {/* Special Assignments */}
                        {item.type === 'assignments' && (
                          <>
                            <div className="flex items-start justify-between">
                              <div className="flex items-start space-x-2 flex-1">
                                <CheckCircle className="w-4 h-4 text-[#3B6A52] mt-0.5 flex-shrink-0" />
                                <div className="flex-1">
                                  <h4 className="text-sm text-gray-900 mb-1">{item.title}</h4>
                                  <div className="flex flex-wrap items-center gap-2 text-xs text-gray-600">
                                    <span>{item.category}</span>
                                    <span>•</span>
                                    <span>Submitted: {item.submittedOn}</span>
                                    {item.coachReviewed && (
                                      <>
                                        <span>•</span>
                                        <span className="flex items-center space-x-1 text-[#3B6A52]">
                                          <CheckCircle className="w-3 h-3" />
                                          <span>Reviewed</span>
                                        </span>
                                      </>
                                    )}
                                  </div>
                                </div>
                              </div>
                              <div className="text-right ml-2">
                                <div className="flex items-center space-x-1 mb-1">
                                  <Star className="w-3 h-3 text-[#F9A03F]" />
                                  <span className="text-sm text-gray-900">{item.score}%</span>
                                </div>
                              </div>
                            </div>
                          </>
                        )}
                      </div>
                    ))}
                  </div>

                  {/* Summary Stats */}
                  <div className="mt-4 pt-4 border-t border-gray-200">
                    <div className="grid grid-cols-5 gap-2 text-center">
                      <div className="p-2 bg-gray-50 rounded">
                        <p className="text-xs text-gray-600 mb-1">Courses</p>
                        <p className="text-gray-900">{learningHistory.filter(item => item.type === 'courses').length}</p>
                      </div>
                      <div className="p-2 bg-gray-50 rounded">
                        <p className="text-xs text-gray-600 mb-1">Daily</p>
                        <p className="text-gray-900">{learningHistory.filter(item => item.type === 'daily-missions').length}</p>
                      </div>
                      <div className="p-2 bg-gray-50 rounded">
                        <p className="text-xs text-gray-600 mb-1">Trails</p>
                        <p className="text-gray-900">{learningHistory.filter(item => item.type === 'trail-missions').length}</p>
                      </div>
                      <div className="p-2 bg-gray-50 rounded">
                        <p className="text-xs text-gray-600 mb-1">Capstone</p>
                        <p className="text-gray-900">{learningHistory.filter(item => item.type === 'capstone').length}</p>
                      </div>
                      <div className="p-2 bg-gray-50 rounded">
                        <p className="text-xs text-gray-600 mb-1">Assignments</p>
                        <p className="text-gray-900">{learningHistory.filter(item => item.type === 'assignments').length}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </CollapsibleContent>
            </div>
          </Collapsible>

          {/* Activity Log */}
          <Collapsible open={isActivityOpen} onOpenChange={setIsActivityOpen}>
            <div className="bg-white rounded-xl shadow-sm border border-gray-200">
              <CollapsibleTrigger className="w-full p-4 flex items-center justify-between hover:bg-gray-50 rounded-t-xl transition-colors">
                <h3 className="text-gray-900">Recent Activity</h3>
                {isActivityOpen ? <ChevronUp className="w-5 h-5 text-gray-500" /> : <ChevronDown className="w-5 h-5 text-gray-500" />}
              </CollapsibleTrigger>
              <CollapsibleContent>
                <div className="p-4 pt-0">
                  <div className="space-y-2">
                    {activityLog.map((log, idx) => (
                      <div key={idx} className="flex items-start space-x-2 pb-2 border-b border-gray-100 last:border-b-0">
                        <div className={`mt-1 w-1.5 h-1.5 rounded-full flex-shrink-0 ${
                          log.type === 'achievement' ? 'bg-[#F9A03F]' :
                          log.type === 'assignment' ? 'bg-[#3B6A52]' :
                          log.type === 'collaboration' ? 'bg-[#7EB5C1]' :
                          'bg-[#2C6975]'
                        }`}></div>
                        <div className="flex-1">
                          <p className="text-xs text-gray-900">{log.activity}</p>
                          <p className="text-xs text-gray-500">{log.date}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                  <button className="w-full mt-3 text-xs text-[#2C6975] hover:underline text-center">
                    View Full History →
                  </button>
                </div>
              </CollapsibleContent>
            </div>
          </Collapsible>

          {/* Resume Builder with Penny */}
          <Collapsible open={isResumeBuilderOpen} onOpenChange={setIsResumeBuilderOpen}>
            <div className="bg-white rounded-xl shadow-sm border border-gray-200">
              <CollapsibleTrigger className="w-full p-4 flex items-center justify-between hover:bg-gray-50 rounded-t-xl transition-colors">
                <h3 className="text-gray-900 flex items-center space-x-2">
                  <Briefcase className="w-5 h-5 text-[#F9A03F]" />
                  <span>Build or Improve Your Résumé with Penny</span>
                </h3>
                {isResumeBuilderOpen ? <ChevronUp className="w-5 h-5 text-gray-500" /> : <ChevronDown className="w-5 h-5 text-gray-500" />}
              </CollapsibleTrigger>
              <CollapsibleContent>
                <div className="p-4 pt-0">
                  {!resumeUploaded ? (
                    /* Upload Section */
                    <div className="space-y-4">
                      <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-[#F9A03F] transition-colors">
                        <div className="w-16 h-16 rounded-full bg-[#F9A03F]/10 flex items-center justify-center mx-auto mb-4">
                          <Upload className="w-8 h-8 text-[#F9A03F]" />
                        </div>
                        <h4 className="text-gray-900 mb-2">Upload Your Résumé</h4>
                        <p className="text-sm text-gray-600 mb-4">PDF or DOCX format, up to 5MB</p>
                        <label className="inline-block">
                          <input
                            type="file"
                            accept=".pdf,.docx"
                            onChange={handleFileUpload}
                            className="hidden"
                          />
                          <span className="bg-[#2C6975] text-white px-6 py-2 rounded-lg hover:bg-[#234f57] transition-colors cursor-pointer inline-block">
                            Choose File
                          </span>
                        </label>
                      </div>

                      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                        <div className="flex items-start space-x-3">
                          <Sparkles className="w-5 h-5 text-[#F9A03F] flex-shrink-0 mt-0.5" />
                          <div>
                            <p className="text-sm text-gray-900 mb-1">
                              <span className="font-medium">Penny will help you:</span>
                            </p>
                            <ul className="text-sm text-gray-700 space-y-1">
                              <li>• Rewrite bullets with quantifiable metrics</li>
                              <li>• Add your Transition Trails achievements automatically</li>
                              <li>• Tailor your résumé for specific roles</li>
                              <li>• Optimize formatting for ATS systems</li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                  ) : isResumeProcessing ? (
                    /* Processing State */
                    <div className="py-12 text-center">
                      <Loader2 className="w-12 h-12 text-[#F9A03F] animate-spin mx-auto mb-4" />
                      <p className="text-gray-900 mb-2">Penny is reviewing your résumé...</p>
                      <p className="text-sm text-gray-600">This will just take a moment</p>
                    </div>
                  ) : (
                    /* Main Resume Builder Interface */
                    <div className="space-y-6">
                      {/* Upload Status */}
                      <div className="flex items-center justify-between p-3 bg-green-50 border border-green-200 rounded-lg">
                        <div className="flex items-center space-x-3">
                          <FileText className="w-5 h-5 text-green-600" />
                          <div>
                            <p className="text-sm text-gray-900">{resumeFileName}</p>
                            <Badge variant="outline" className="mt-1 text-xs border-green-300 text-green-700">
                              Uploaded & Reviewed
                            </Badge>
                          </div>
                        </div>
                        <button
                          onClick={() => {
                            setResumeUploaded(false);
                            setResumeFileName('');
                            setPennyMessages([]);
                          }}
                          className="text-gray-400 hover:text-gray-600"
                          aria-label="Remove file"
                        >
                          <XIcon className="w-4 h-4" />
                        </button>
                      </div>

                      {/* Penny Review Panel */}
                      <div className="border-2 border-[#2C6975]/30 rounded-lg bg-gradient-to-br from-[#7EB5C1]/10 to-[#2C6975]/5">
                        <div className="p-4 border-b border-[#2C6975]/20">
                          <div className="flex items-center justify-between mb-4">
                            <h4 className="text-gray-900 flex items-center space-x-2">
                              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#7EB5C1] to-[#2C6975] text-white flex items-center justify-center">
                                <Sparkles className="w-4 h-4" />
                              </div>
                              <span>Penny's Feedback</span>
                            </h4>
                          </div>

                          {/* Enhancement Toggles */}
                          <div className="space-y-3 mb-4">
                            <div className="flex items-center justify-between p-3 bg-white rounded-lg">
                              <Label htmlFor="enhance-formatting" className="text-sm cursor-pointer">
                                Enhance formatting
                              </Label>
                              <Switch
                                id="enhance-formatting"
                                checked={enhanceFormatting}
                                onCheckedChange={setEnhanceFormatting}
                              />
                            </div>
                            <div className="flex items-center justify-between p-3 bg-white rounded-lg">
                              <Label htmlFor="add-achievements" className="text-sm cursor-pointer">
                                Add Transition Trails achievements
                              </Label>
                              <Switch
                                id="add-achievements"
                                checked={addTransitionTrails}
                                onCheckedChange={setAddTransitionTrails}
                              />
                            </div>
                            <div className="space-y-2">
                              <div className="flex items-center justify-between p-3 bg-white rounded-lg">
                                <Label htmlFor="tailor-role" className="text-sm cursor-pointer">
                                  Tailor résumé for target role
                                </Label>
                                <Switch
                                  id="tailor-role"
                                  checked={tailorForRole}
                                  onCheckedChange={setTailorForRole}
                                />
                              </div>
                              {tailorForRole && (
                                <input
                                  type="text"
                                  value={targetRole}
                                  onChange={(e) => setTargetRole(e.target.value)}
                                  placeholder="e.g., Salesforce Administrator"
                                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#2C6975]"
                                />
                              )}
                            </div>
                          </div>

                          {/* Chat Interface */}
                          <div className="bg-white rounded-lg border border-gray-200">
                            <div className="max-h-80 overflow-y-auto p-4 space-y-4">
                              {pennyMessages.map((msg, idx) => (
                                <div key={idx} className={`${msg.sender === 'penny' ? 'flex items-start space-x-2' : 'flex justify-end'}`}>
                                  {msg.sender === 'penny' && (
                                    <div className="w-6 h-6 rounded-full bg-gradient-to-br from-[#7EB5C1] to-[#2C6975] text-white flex items-center justify-center flex-shrink-0">
                                      <Sparkles className="w-3 h-3" />
                                    </div>
                                  )}
                                  <div className={`${msg.sender === 'penny' ? 'bg-gray-50' : 'bg-[#2C6975] text-white'} rounded-lg p-3 max-w-[85%]`}>
                                    <p className="text-sm">{msg.message}</p>
                                    {msg.suggestions && (
                                      <div className="mt-3 space-y-2">
                                        {msg.suggestions.map((suggestion, sIdx) => (
                                          <div key={sIdx} className="flex items-start space-x-2 text-sm p-2 bg-white border border-gray-200 rounded">
                                            <Lightbulb className="w-4 h-4 text-[#F9A03F] flex-shrink-0 mt-0.5" />
                                            <div className="flex-1">
                                              <p className="text-gray-700">{suggestion}</p>
                                              <div className="flex items-center space-x-2 mt-2">
                                                <button className="text-xs text-[#3B6A52] hover:underline flex items-center space-x-1">
                                                  <Check className="w-3 h-3" />
                                                  <span>Accept</span>
                                                </button>
                                                <button className="text-xs text-gray-600 hover:underline">
                                                  Ignore
                                                </button>
                                                <button className="text-xs text-[#2C6975] hover:underline">
                                                  Edit
                                                </button>
                                              </div>
                                            </div>
                                          </div>
                                        ))}
                                      </div>
                                    )}
                                  </div>
                                </div>
                              ))}
                            </div>

                            {/* Chat Input */}
                            <div className="p-3 border-t border-gray-200 flex items-center space-x-2">
                              <input
                                type="text"
                                value={userMessage}
                                onChange={(e) => setUserMessage(e.target.value)}
                                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                                placeholder="Ask Penny for help..."
                                className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#2C6975]"
                              />
                              <button
                                onClick={handleSendMessage}
                                className="bg-[#2C6975] text-white p-2 rounded-lg hover:bg-[#234f57] transition-colors"
                                aria-label="Send message"
                              >
                                <MessageSquare className="w-4 h-4" />
                              </button>
                            </div>
                          </div>
                        </div>

                        {/* Rebuild Section */}
                        <div className="p-4">
                          <button
                            onClick={handleRebuildResume}
                            disabled={isRebuilding}
                            className="w-full bg-gradient-to-r from-[#F9A03F] to-[#F9A03F]/80 text-white px-6 py-3 rounded-lg hover:from-[#e89135] hover:to-[#e89135]/80 transition-all shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
                          >
                            {isRebuilding ? (
                              <>
                                <Loader2 className="w-4 h-4 animate-spin" />
                                <span>Rebuilding...</span>
                              </>
                            ) : (
                              <>
                                <Sparkles className="w-4 h-4" />
                                <span>Rebuild Résumé</span>
                              </>
                            )}
                          </button>

                          {/* Action Buttons */}
                          <div className="grid grid-cols-3 gap-2 mt-3">
                            <button className="flex items-center justify-center space-x-1 px-3 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors text-sm">
                              <Eye className="w-4 h-4" />
                              <span>Preview</span>
                            </button>
                            <button className="flex items-center justify-center space-x-1 px-3 py-2 bg-[#2C6975] text-white rounded-lg hover:bg-[#234f57] transition-colors text-sm">
                              <Download className="w-4 h-4" />
                              <span>Download</span>
                            </button>
                            <button className="flex items-center justify-center space-x-1 px-3 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors text-sm">
                              <Linkedin className="w-4 h-4" />
                              <span>LinkedIn</span>
                            </button>
                          </div>
                        </div>
                      </div>

                      {/* History Panel */}
                      <div>
                        <h4 className="text-gray-900 mb-3 flex items-center space-x-2">
                          <Clock className="w-4 h-4 text-[#2C6975]" />
                          <span>Version History</span>
                        </h4>
                        <div className="space-y-2">
                          {resumeVersions.map((version) => (
                            <div key={version.id} className="p-3 border border-gray-200 rounded-lg hover:border-[#2C6975] transition-colors">
                              <div className="flex items-center justify-between mb-2">
                                <div className="flex items-center space-x-2">
                                  <FileText className="w-4 h-4 text-gray-400" />
                                  <p className="text-sm text-gray-900">{version.fileName}</p>
                                </div>
                                <div className="flex items-center space-x-2">
                                  <button className="text-gray-400 hover:text-[#2C6975]" aria-label="View">
                                    <Eye className="w-4 h-4" />
                                  </button>
                                  <button className="text-gray-400 hover:text-[#2C6975]" aria-label="Download">
                                    <Download className="w-4 h-4" />
                                  </button>
                                </div>
                              </div>
                              <div className="flex items-center justify-between text-xs text-gray-500">
                                <span>{version.timestamp}</span>
                                <span>{version.size}</span>
                              </div>
                              <p className="text-xs text-gray-600 mt-2 bg-gray-50 p-2 rounded">
                                {version.changes}
                              </p>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </CollapsibleContent>
            </div>
          </Collapsible>

          {/* LinkedIn Profile Coach */}
          <Collapsible open={isLinkedInCoachOpen} onOpenChange={setIsLinkedInCoachOpen}>
            <div className="bg-white rounded-xl shadow-sm border border-gray-200">
              <CollapsibleTrigger className="w-full p-4 flex items-center justify-between hover:bg-gray-50 rounded-t-xl transition-colors">
                <h3 className="text-gray-900 flex items-center space-x-2">
                  <Linkedin className="w-5 h-5 text-[#0A66C2]" />
                  <span>LinkedIn Profile Coach</span>
                </h3>
                {isLinkedInCoachOpen ? <ChevronUp className="w-5 h-5 text-gray-500" /> : <ChevronDown className="w-5 h-5 text-gray-500" />}
              </CollapsibleTrigger>
              <CollapsibleContent>
                <div className="p-4 pt-0">
                  {!isLinkedInConnected ? (
                    /* Disconnected State */
                    <div className="text-center py-12">
                      <div className="w-20 h-20 rounded-full bg-[#2F6B4E]/10 flex items-center justify-center mx-auto mb-6">
                        <Linkedin className="w-10 h-10 text-[#0A66C2]" />
                      </div>
                      <h4 className="text-gray-900 mb-2">Connect LinkedIn to Get Custom Profile Advice</h4>
                      <p className="text-sm text-gray-600 mb-6 max-w-md mx-auto">
                        Link your account to receive personalized résumé and profile guidance from Penny,
                        and share your achievements directly to LinkedIn.
                      </p>
                      <button
                        onClick={handleConnectLinkedIn}
                        disabled={isLinkedInProcessing}
                        className="bg-[#0A66C2] text-white px-6 py-3 rounded-lg hover:bg-[#084d8f] transition-colors flex items-center justify-center space-x-2 mx-auto disabled:opacity-50"
                      >
                        {isLinkedInProcessing ? (
                          <>
                            <Loader2 className="w-5 h-5 animate-spin" />
                            <span>Connecting...</span>
                          </>
                        ) : (
                          <>
                            <Linkedin className="w-5 h-5" />
                            <span>Connect LinkedIn</span>
                          </>
                        )}
                      </button>
                    </div>
                  ) : (
                    /* Connected State */
                    <div className="space-y-6">
                      {/* Connection Status Card */}
                      <div className="p-4 bg-gradient-to-br from-[#0A66C2]/5 to-white border border-[#0A66C2]/20 rounded-lg">
                        <div className="flex items-center justify-between mb-4">
                          <div className="flex items-center space-x-3">
                            <div className="w-12 h-12 rounded-full bg-[#2C6975] text-white flex items-center justify-center">
                              {linkedInProfile.profilePicture}
                            </div>
                            <div>
                              <h4 className="text-gray-900">{linkedInProfile.name}</h4>
                              <p className="text-sm text-gray-600">{linkedInProfile.headline}</p>
                            </div>
                          </div>
                          <div className="text-right">
                            <Badge variant="outline" className="border-green-300 text-green-700 mb-2">
                              <div className="w-2 h-2 rounded-full bg-green-500 mr-1"></div>
                              {linkedInProfile.tokenStatus}
                            </Badge>
                            <p className="text-xs text-gray-500">Synced {linkedInProfile.lastSync}</p>
                          </div>
                        </div>
                        <button
                          onClick={handleDisconnectLinkedIn}
                          className="text-xs text-gray-600 hover:text-red-600 hover:underline"
                        >
                          Disconnect LinkedIn
                        </button>
                      </div>

                      {/* Penny Nudge Banner */}
                      <div className="p-4 bg-gradient-to-r from-[#F9A03F]/10 to-[#F5F3E8] border-l-4 border-[#F9A03F] rounded-lg">
                        <div className="flex items-start space-x-3">
                          <Sparkles className="w-5 h-5 text-[#F9A03F] flex-shrink-0 mt-0.5" />
                          <div className="flex-1">
                            <p className="text-sm text-gray-900 mb-2">
                              <span className="font-medium">Penny found 5 ways to improve your profile!</span>
                            </p>
                            <p className="text-sm text-gray-700">
                              Your Capstone Summary and recent badges can boost your LinkedIn visibility. Check the suggestions below.
                            </p>
                          </div>
                        </div>
                      </div>

                      {/* Profile Coach Tabs */}
                      <div>
                        <h4 className="text-gray-900 mb-4 flex items-center space-x-2">
                          <Sparkles className="w-4 h-4 text-[#F9A03F]" />
                          <span>Your LinkedIn, Reimagined with Penny</span>
                        </h4>

                        <Tabs value={linkedInProfileTab} onValueChange={setLinkedInProfileTab} className="space-y-4">
                          <TabsList className="bg-gray-100 p-1 grid grid-cols-5 w-full">
                            <TabsTrigger value="headline" className="text-xs">Headline</TabsTrigger>
                            <TabsTrigger value="about" className="text-xs">About</TabsTrigger>
                            <TabsTrigger value="experience" className="text-xs">Experience</TabsTrigger>
                            <TabsTrigger value="skills" className="text-xs">Skills</TabsTrigger>
                            <TabsTrigger value="featured" className="text-xs">Featured</TabsTrigger>
                          </TabsList>

                          {/* Headline Tab */}
                          <TabsContent value="headline" className="space-y-4">
                            <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                              <p className="text-xs text-gray-600 mb-2">Current Headline:</p>
                              <p className="text-sm text-gray-900">{linkedInSuggestions.headline.current}</p>
                            </div>

                            <div className="p-4 bg-gradient-to-br from-[#F5F3E8] to-white border-2 border-[#F9A03F]/30 rounded-lg">
                              <div className="flex items-start justify-between mb-3">
                                <div className="flex items-center space-x-2">
                                  <div className="w-6 h-6 rounded-full bg-gradient-to-br from-[#F9A03F] to-[#e89135] text-white flex items-center justify-center">
                                    <Sparkles className="w-3 h-3" />
                                  </div>
                                  <span className="text-sm text-gray-900 font-medium">Penny's Suggestion</span>
                                </div>
                                <Badge variant="outline" className="text-xs border-[#F9A03F] text-[#F9A03F]">
                                  Recommended
                                </Badge>
                              </div>
                              <p className="text-sm text-gray-900 mb-3">{linkedInSuggestions.headline.penny}</p>
                              <p className="text-xs text-gray-600 mb-4 p-3 bg-white/50 rounded border border-[#F9A03F]/20">
                                💡 {linkedInSuggestions.headline.reasoning}
                              </p>
                              <div className="flex items-center space-x-2">
                                <button
                                  onClick={() => handleCopyToClipboard(linkedInSuggestions.headline.penny, 'Headline')}
                                  className="flex-1 bg-[#2C6975] text-white px-4 py-2 rounded-lg hover:bg-[#234f57] transition-colors flex items-center justify-center space-x-2 text-sm"
                                >
                                  <Copy className="w-4 h-4" />
                                  <span>Copy</span>
                                </button>
                                <button className="flex-1 bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200 transition-colors flex items-center justify-center space-x-2 text-sm">
                                  <RefreshCw className="w-4 h-4" />
                                  <span>Regenerate</span>
                                </button>
                              </div>
                            </div>
                          </TabsContent>

                          {/* About Tab */}
                          <TabsContent value="about" className="space-y-4">
                            <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                              <p className="text-xs text-gray-600 mb-2">Current About:</p>
                              <p className="text-sm text-gray-900 whitespace-pre-wrap">{linkedInSuggestions.about.current}</p>
                            </div>

                            <div className="p-4 bg-gradient-to-br from-[#F5F3E8] to-white border-2 border-[#F9A03F]/30 rounded-lg">
                              <div className="flex items-start justify-between mb-3">
                                <div className="flex items-center space-x-2">
                                  <div className="w-6 h-6 rounded-full bg-gradient-to-br from-[#F9A03F] to-[#e89135] text-white flex items-center justify-center">
                                    <Sparkles className="w-3 h-3" />
                                  </div>
                                  <span className="text-sm text-gray-900 font-medium">Penny's Suggestion</span>
                                </div>
                                <Badge variant="outline" className="text-xs border-[#F9A03F] text-[#F9A03F]">
                                  Recommended
                                </Badge>
                              </div>
                              <p className="text-sm text-gray-900 mb-3 whitespace-pre-wrap">{linkedInSuggestions.about.penny}</p>
                              <p className="text-xs text-gray-600 mb-4 p-3 bg-white/50 rounded border border-[#F9A03F]/20">
                                💡 {linkedInSuggestions.about.reasoning}
                              </p>
                              <div className="flex items-center space-x-2">
                                <button
                                  onClick={() => handleCopyToClipboard(linkedInSuggestions.about.penny, 'About section')}
                                  className="flex-1 bg-[#2C6975] text-white px-4 py-2 rounded-lg hover:bg-[#234f57] transition-colors flex items-center justify-center space-x-2 text-sm"
                                >
                                  <Copy className="w-4 h-4" />
                                  <span>Copy</span>
                                </button>
                                <button className="flex-1 bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200 transition-colors flex items-center justify-center space-x-2 text-sm">
                                  <RefreshCw className="w-4 h-4" />
                                  <span>Regenerate</span>
                                </button>
                              </div>
                            </div>
                          </TabsContent>

                          {/* Experience Tab */}
                          <TabsContent value="experience" className="space-y-4">
                            <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                              <p className="text-xs text-gray-600 mb-2">Current Experience:</p>
                              <p className="text-sm text-gray-900 whitespace-pre-wrap">{linkedInSuggestions.experience.current}</p>
                            </div>

                            <div className="p-4 bg-gradient-to-br from-[#F5F3E8] to-white border-2 border-[#F9A03F]/30 rounded-lg">
                              <div className="flex items-start justify-between mb-3">
                                <div className="flex items-center space-x-2">
                                  <div className="w-6 h-6 rounded-full bg-gradient-to-br from-[#F9A03F] to-[#e89135] text-white flex items-center justify-center">
                                    <Sparkles className="w-3 h-3" />
                                  </div>
                                  <span className="text-sm text-gray-900 font-medium">Penny's Suggestion</span>
                                </div>
                                <Badge variant="outline" className="text-xs border-[#F9A03F] text-[#F9A03F]">
                                  Recommended
                                </Badge>
                              </div>
                              <p className="text-sm text-gray-900 mb-3 whitespace-pre-wrap">{linkedInSuggestions.experience.penny}</p>
                              <p className="text-xs text-gray-600 mb-4 p-3 bg-white/50 rounded border border-[#F9A03F]/20">
                                💡 {linkedInSuggestions.experience.reasoning}
                              </p>
                              <div className="flex items-center space-x-2">
                                <button
                                  onClick={() => handleCopyToClipboard(linkedInSuggestions.experience.penny, 'Experience')}
                                  className="flex-1 bg-[#2C6975] text-white px-4 py-2 rounded-lg hover:bg-[#234f57] transition-colors flex items-center justify-center space-x-2 text-sm"
                                >
                                  <Copy className="w-4 h-4" />
                                  <span>Copy</span>
                                </button>
                                <button className="flex-1 bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200 transition-colors flex items-center justify-center space-x-2 text-sm">
                                  <RefreshCw className="w-4 h-4" />
                                  <span>Regenerate</span>
                                </button>
                              </div>
                            </div>
                          </TabsContent>

                          {/* Skills Tab */}
                          <TabsContent value="skills" className="space-y-4">
                            <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                              <p className="text-xs text-gray-600 mb-3">Current Skills:</p>
                              <div className="flex flex-wrap gap-2">
                                {linkedInSuggestions.skills.current.map((skill, idx) => (
                                  <Badge key={idx} variant="outline" className="text-xs">
                                    {skill}
                                  </Badge>
                                ))}
                              </div>
                            </div>

                            <div className="p-4 bg-gradient-to-br from-[#F5F3E8] to-white border-2 border-[#F9A03F]/30 rounded-lg">
                              <div className="flex items-start justify-between mb-3">
                                <div className="flex items-center space-x-2">
                                  <div className="w-6 h-6 rounded-full bg-gradient-to-br from-[#F9A03F] to-[#e89135] text-white flex items-center justify-center">
                                    <Sparkles className="w-3 h-3" />
                                  </div>
                                  <span className="text-sm text-gray-900 font-medium">Penny's Suggestion</span>
                                </div>
                                <Badge variant="outline" className="text-xs border-[#F9A03F] text-[#F9A03F]">
                                  Recommended
                                </Badge>
                              </div>
                              <div className="flex flex-wrap gap-2 mb-3">
                                {linkedInSuggestions.skills.penny.map((skill, idx) => (
                                  <Badge key={idx} variant="outline" className="text-xs border-[#2C6975] text-[#2C6975]">
                                    {skill}
                                    {idx < 6 && <span className="ml-1 text-[#F9A03F]">✨</span>}
                                  </Badge>
                                ))}
                              </div>
                              <p className="text-xs text-gray-600 mb-4 p-3 bg-white/50 rounded border border-[#F9A03F]/20">
                                💡 {linkedInSuggestions.skills.reasoning}
                              </p>
                              <div className="flex items-center space-x-2">
                                <button
                                  onClick={() => handleCopyToClipboard(linkedInSuggestions.skills.penny.join(', '), 'Skills list')}
                                  className="flex-1 bg-[#2C6975] text-white px-4 py-2 rounded-lg hover:bg-[#234f57] transition-colors flex items-center justify-center space-x-2 text-sm"
                                >
                                  <Copy className="w-4 h-4" />
                                  <span>Copy All</span>
                                </button>
                                <button className="flex-1 bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200 transition-colors flex items-center justify-center space-x-2 text-sm">
                                  <RefreshCw className="w-4 h-4" />
                                  <span>Regenerate</span>
                                </button>
                              </div>
                            </div>
                          </TabsContent>

                          {/* Featured Tab */}
                          <TabsContent value="featured" className="space-y-4">
                            <div className="p-4 bg-gray-50 rounded-lg border border-gray-200 text-center py-8">
                              <p className="text-sm text-gray-600">No featured content yet</p>
                            </div>

                            <div className="p-4 bg-gradient-to-br from-[#F5F3E8] to-white border-2 border-[#F9A03F]/30 rounded-lg">
                              <div className="flex items-start justify-between mb-4">
                                <div className="flex items-center space-x-2">
                                  <div className="w-6 h-6 rounded-full bg-gradient-to-br from-[#F9A03F] to-[#e89135] text-white flex items-center justify-center">
                                    <Sparkles className="w-3 h-3" />
                                  </div>
                                  <span className="text-sm text-gray-900 font-medium">Penny's Suggestions</span>
                                </div>
                              </div>

                              <div className="space-y-3">
                                {linkedInSuggestions.featured.penny.map((item, idx) => (
                                  <div key={idx} className="p-3 bg-white border border-gray-200 rounded-lg">
                                    <div className="flex items-start justify-between mb-2">
                                      <div className="flex-1">
                                        <div className="flex items-center space-x-2 mb-1">
                                          <h5 className="text-sm text-gray-900">{item.title}</h5>
                                          <Badge variant="outline" className="text-xs">
                                            {item.type}
                                          </Badge>
                                        </div>
                                        <p className="text-xs text-gray-600">{item.description}</p>
                                      </div>
                                    </div>
                                    <button className="text-xs text-[#2C6975] hover:underline flex items-center space-x-1">
                                      <Plus className="w-3 h-3" />
                                      <span>Add to Featured</span>
                                    </button>
                                  </div>
                                ))}
                              </div>

                              <p className="text-xs text-gray-600 mt-4 p-3 bg-white/50 rounded border border-[#F9A03F]/20">
                                💡 {linkedInSuggestions.featured.reasoning}
                              </p>
                            </div>
                          </TabsContent>
                        </Tabs>
                      </div>

                      {/* Achievement Integration Panel */}
                      <div className="p-4 bg-white border border-gray-200 rounded-lg">
                        <div className="flex items-center justify-between mb-4">
                          <h4 className="text-gray-900 flex items-center space-x-2">
                            <Trophy className="w-4 h-4 text-[#F9A03F]" />
                            <span>Highlight Your Growth</span>
                          </h4>
                          <div className="flex items-center space-x-2">
                            <button
                              onClick={() => setAchievementCarouselIndex(Math.max(0, achievementCarouselIndex - 1))}
                              disabled={achievementCarouselIndex === 0}
                              className="p-1 rounded hover:bg-gray-100 disabled:opacity-30"
                              aria-label="Previous"
                            >
                              <ChevronLeft className="w-4 h-4" />
                            </button>
                            <span className="text-xs text-gray-600">
                              {achievementCarouselIndex + 1} / {shareableAchievements.length}
                            </span>
                            <button
                              onClick={() => setAchievementCarouselIndex(Math.min(shareableAchievements.length - 1, achievementCarouselIndex + 1))}
                              disabled={achievementCarouselIndex === shareableAchievements.length - 1}
                              className="p-1 rounded hover:bg-gray-100 disabled:opacity-30"
                              aria-label="Next"
                            >
                              <ChevronRight className="w-4 h-4" />
                            </button>
                          </div>
                        </div>

                        <div className="p-4 border-2 border-gray-200 rounded-lg hover:border-[#F9A03F] transition-colors">
                          <div className="flex items-start space-x-4 mb-3">
                            <div className="text-4xl">{shareableAchievements[achievementCarouselIndex].image}</div>
                            <div className="flex-1">
                              <div className="flex items-center space-x-2 mb-1">
                                <h5 className="text-sm text-gray-900">{shareableAchievements[achievementCarouselIndex].title}</h5>
                                <Badge variant="outline" className="text-xs capitalize">
                                  {shareableAchievements[achievementCarouselIndex].type}
                                </Badge>
                              </div>
                              <p className="text-xs text-gray-600 mb-2">{shareableAchievements[achievementCarouselIndex].description}</p>
                              <p className="text-xs text-gray-500">{shareableAchievements[achievementCarouselIndex].date}</p>
                            </div>
                          </div>

                          <div className="flex items-center space-x-2">
                            <button
                              onClick={() => toggleAchievement(shareableAchievements[achievementCarouselIndex].id)}
                              className={`flex-1 px-4 py-2 rounded-lg transition-colors flex items-center justify-center space-x-2 text-sm ${
                                selectedAchievements.includes(shareableAchievements[achievementCarouselIndex].id)
                                  ? 'bg-[#3B6A52] text-white'
                                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                              }`}
                            >
                              <Check className="w-4 h-4" />
                              <span>{selectedAchievements.includes(shareableAchievements[achievementCarouselIndex].id) ? 'Added' : 'Add to Profile'}</span>
                            </button>
                            <button
                              onClick={() => handleOpenShareModal(shareableAchievements[achievementCarouselIndex].type as any)}
                              className="flex-1 bg-[#0A66C2] text-white px-4 py-2 rounded-lg hover:bg-[#084d8f] transition-colors flex items-center justify-center space-x-2 text-sm"
                            >
                              <Share2 className="w-4 h-4" />
                              <span>Share on LinkedIn</span>
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </CollapsibleContent>
            </div>
          </Collapsible>
        </div>
      </div>

      {/* Share Composer Modal */}
      <Dialog open={isShareModalOpen} onOpenChange={setIsShareModalOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="flex items-center space-x-2">
              <Linkedin className="w-5 h-5 text-[#0A66C2]" />
              <span>Share Your Success on LinkedIn</span>
            </DialogTitle>
            <DialogDescription>
              Tell your network about your achievement
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4">
            {/* Post Type Selector */}
            <div>
              <Label className="text-sm mb-2 block">Post Type</Label>
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => setSharePostType('capstone')}
                  className={`flex-1 px-4 py-2 rounded-lg border transition-colors ${
                    sharePostType === 'capstone'
                      ? 'border-[#0A66C2] bg-[#0A66C2]/10 text-[#0A66C2]'
                      : 'border-gray-300 text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  Capstone
                </button>
                <button
                  onClick={() => setSharePostType('badge')}
                  className={`flex-1 px-4 py-2 rounded-lg border transition-colors ${
                    sharePostType === 'badge'
                      ? 'border-[#0A66C2] bg-[#0A66C2]/10 text-[#0A66C2]'
                      : 'border-gray-300 text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  Badge
                </button>
                <button
                  onClick={() => setSharePostType('milestone')}
                  className={`flex-1 px-4 py-2 rounded-lg border transition-colors ${
                    sharePostType === 'milestone'
                      ? 'border-[#0A66C2] bg-[#0A66C2]/10 text-[#0A66C2]'
                      : 'border-gray-300 text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  Milestone
                </button>
              </div>
            </div>

            {/* Penny's Suggested Post */}
            <div className="p-3 bg-gradient-to-br from-[#F5F3E8] to-white border border-[#F9A03F]/20 rounded-lg">
              <div className="flex items-center space-x-2 mb-2">
                <Sparkles className="w-4 h-4 text-[#F9A03F]" />
                <span className="text-xs text-gray-700">Penny's suggested post (you can edit)</span>
              </div>
            </div>

            {/* Text Area */}
            <div>
              <Textarea
                value={sharePostText}
                onChange={(e) => setSharePostText(e.target.value)}
                rows={8}
                className="w-full resize-none"
                placeholder="Write your post..."
              />
              <p className="text-xs text-gray-500 mt-1">
                {sharePostText.length} characters
              </p>
            </div>

            {/* Media Upload Placeholder */}
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-[#0A66C2] transition-colors">
              <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
              <p className="text-sm text-gray-600">Add media (optional)</p>
              <p className="text-xs text-gray-500">Upload image or attach Capstone PDF</p>
            </div>

            {/* Actions */}
            <div className="flex items-center space-x-3 pt-4">
              <button
                onClick={() => setIsShareModalOpen(false)}
                className="flex-1 bg-gray-100 text-gray-700 px-6 py-3 rounded-lg hover:bg-gray-200 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={() => handleCopyToClipboard(sharePostText, 'Post')}
                className="flex-1 bg-gray-700 text-white px-6 py-3 rounded-lg hover:bg-gray-800 transition-colors flex items-center justify-center space-x-2"
              >
                <Copy className="w-4 h-4" />
                <span>Copy to Clipboard</span>
              </button>
              <button
                onClick={handlePostToLinkedIn}
                className="flex-1 bg-[#0A66C2] text-white px-6 py-3 rounded-lg hover:bg-[#084d8f] transition-colors flex items-center justify-center space-x-2"
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
