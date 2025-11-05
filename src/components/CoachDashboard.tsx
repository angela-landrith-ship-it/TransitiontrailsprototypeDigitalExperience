import { useState } from 'react';
import { Users, TrendingUp, Send, ExternalLink, Filter, MessageSquare, Compass, Mountain, Plus, Calendar, CheckCircle, Clock, AlertCircle, Sparkles, BarChart3, Target, Award, BookOpen, ChevronDown, Search, X, Edit, Trash2, Eye } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from './ui/dialog';
import { Badge } from './ui/badge';
import { Avatar, AvatarFallback } from './ui/avatar';
import { Label } from './ui/label';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { toast } from 'sonner@2.0.3';

export function CoachDashboard() {
  const [activeTab, setActiveTab] = useState('team-overview');
  const [isCreateMissionOpen, setIsCreateMissionOpen] = useState(false);
  const [isPennyChatOpen, setIsPennyChatOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterTrail, setFilterTrail] = useState('all');
  const [selectedLearners, setSelectedLearners] = useState<number[]>([]);
  
  // Mission form state
  const [missionTitle, setMissionTitle] = useState('');
  const [missionDescription, setMissionDescription] = useState('');
  const [missionTrail, setMissionTrail] = useState('');
  const [missionDueDate, setMissionDueDate] = useState('');
  
  // Penny chat state
  const [pennyMessages, setPennyMessages] = useState([
    {
      sender: 'penny' as const,
      message: "Hi! I'm Penny, your AI coaching assistant. How can I help you support your team today?",
      timestamp: new Date().toISOString()
    }
  ]);
  const [pennyInput, setPennyInput] = useState('');

  // Learner data
  const learners = [
    { 
      id: 1, 
      name: 'Alex Johnson', 
      initials: 'AJ',
      trail: 'Guided Trail',
      program: 'Salesforce Admin', 
      progress: 68, 
      lastActive: '2 hours ago', 
      status: 'on-track',
      missionsAssigned: 4,
      missionsCompleted: 3,
      email: 'alex.johnson@email.com',
      slackId: '@alex.johnson'
    },
    { 
      id: 2, 
      name: 'Sam Chen', 
      initials: 'SC',
      trail: 'Developer Trail',
      program: 'Salesforce Developer', 
      progress: 82, 
      lastActive: '1 day ago', 
      status: 'on-track',
      missionsAssigned: 5,
      missionsCompleted: 5,
      email: 'sam.chen@email.com',
      slackId: '@sam.chen'
    },
    { 
      id: 3, 
      name: 'Jordan Kim', 
      initials: 'JK',
      trail: 'Guided Trail',
      program: 'Salesforce Admin', 
      progress: 45, 
      lastActive: '5 hours ago', 
      status: 'needs-support',
      missionsAssigned: 3,
      missionsCompleted: 1,
      email: 'jordan.kim@email.com',
      slackId: '@jordan.kim'
    },
    { 
      id: 4, 
      name: 'Taylor Brooks', 
      initials: 'TB',
      trail: 'Business Analyst Trail',
      program: 'Business Analyst', 
      progress: 91, 
      lastActive: '30 min ago', 
      status: 'excelling',
      missionsAssigned: 6,
      missionsCompleted: 6,
      email: 'taylor.brooks@email.com',
      slackId: '@taylor.brooks'
    },
    { 
      id: 5, 
      name: 'Morgan Lee', 
      initials: 'ML',
      trail: 'Developer Trail',
      program: 'Salesforce Developer', 
      progress: 55, 
      lastActive: '3 days ago', 
      status: 'at-risk',
      missionsAssigned: 4,
      missionsCompleted: 2,
      email: 'morgan.lee@email.com',
      slackId: '@morgan.lee'
    },
    { 
      id: 6, 
      name: 'Riley Martinez', 
      initials: 'RM',
      trail: 'Designer Trail',
      program: 'UX Designer', 
      progress: 73, 
      lastActive: '4 hours ago', 
      status: 'on-track',
      missionsAssigned: 4,
      missionsCompleted: 3,
      email: 'riley.martinez@email.com',
      slackId: '@riley.martinez'
    },
  ];

  // Missions data
  const missions = [
    {
      id: 1,
      title: 'Complete Flow Builder Fundamentals',
      objective: 'Master record-triggered flows and screen flows',
      assignedTo: [1, 3, 4],
      dueDate: '2025-03-15',
      status: 'in-progress',
      completedBy: [4],
      trail: 'Guided Trail',
      resources: ['Trailhead: Flow Builder Basics', 'Video: Advanced Flows']
    },
    {
      id: 2,
      title: 'Build Lightning Web Component',
      objective: 'Create a custom LWC for displaying related records',
      assignedTo: [2, 5],
      dueDate: '2025-03-18',
      status: 'in-progress',
      completedBy: [2],
      trail: 'Developer Trail',
      resources: ['LWC Trailhead Module', 'Component Library Docs']
    },
    {
      id: 3,
      title: 'User Story Writing Workshop',
      objective: 'Practice writing effective user stories with acceptance criteria',
      assignedTo: [4],
      dueDate: '2025-03-12',
      status: 'completed',
      completedBy: [4],
      trail: 'Business Analyst Trail',
      resources: ['User Story Template', 'BA Best Practices Guide']
    },
    {
      id: 4,
      title: 'Wireframing Exercise',
      objective: 'Create wireframes for nonprofit portal redesign',
      assignedTo: [6],
      dueDate: '2025-03-20',
      status: 'not-started',
      completedBy: [],
      trail: 'Designer Trail',
      resources: ['Figma Template', 'Design System Guide']
    },
  ];

  // Analytics data
  const cohortProgressData = [
    { week: 'Week 1', avgProgress: 20, engagement: 95 },
    { week: 'Week 2', avgProgress: 35, engagement: 90 },
    { week: 'Week 3', avgProgress: 52, engagement: 88 },
    { week: 'Week 4', avgProgress: 68, engagement: 92 },
    { week: 'Week 5', avgProgress: 73, engagement: 89 },
  ];

  const topBadgesData = [
    { name: 'Admin Basics', count: 6 },
    { name: 'Flow Builder', count: 5 },
    { name: 'Data Model', count: 4 },
    { name: 'Security', count: 4 },
    { name: 'Reports', count: 3 },
  ];

  const trailTimeData = [
    { name: 'Guided Trail', value: 45, color: '#2C6975' },
    { name: 'Developer', value: 25, color: '#7EB5C1' },
    { name: 'Business Analyst', value: 15, color: '#F9A03F' },
    { name: 'Designer', value: 15, color: '#3B6A52' },
  ];

  const missionCompletionData = [
    { name: 'Completed', value: 65, color: '#3B6A52' },
    { name: 'In Progress', value: 25, color: '#F9A03F' },
    { name: 'Not Started', value: 10, color: '#7EB5C1' },
  ];

  // Utility functions
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'excelling': return 'bg-[#3B6A52]';
      case 'on-track': return 'bg-[#7EB5C1]';
      case 'needs-support': return 'bg-[#F9A03F]';
      case 'at-risk': return 'bg-red-500';
      default: return 'bg-gray-400';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'excelling': return 'Excelling';
      case 'on-track': return 'On Track';
      case 'needs-support': return 'Needs Support';
      case 'at-risk': return 'At Risk';
      default: return status;
    }
  };

  const getMissionStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'border-green-300 bg-green-50 text-green-700';
      case 'in-progress': return 'border-orange-300 bg-orange-50 text-orange-700';
      case 'not-started': return 'border-gray-300 bg-gray-50 text-gray-700';
      default: return 'border-gray-300 bg-gray-50 text-gray-700';
    }
  };

  const getMissionStatusText = (status: string) => {
    switch (status) {
      case 'completed': return 'Completed';
      case 'in-progress': return 'In Progress';
      case 'not-started': return 'Not Started';
      default: return status;
    }
  };

  // Filter learners
  const filteredLearners = learners.filter(learner => {
    const matchesSearch = learner.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = filterStatus === 'all' || learner.status === filterStatus;
    const matchesTrail = filterTrail === 'all' || learner.trail === filterTrail;
    return matchesSearch && matchesStatus && matchesTrail;
  });

  // Calculate summary stats
  const totalLearners = learners.length;
  const avgProgress = Math.round(learners.reduce((sum, l) => sum + l.progress, 0) / totalLearners);
  const totalMissionsAssigned = missions.length;
  const completedMissions = missions.filter(m => m.status === 'completed').length;
  const completionRate = Math.round((completedMissions / totalMissionsAssigned) * 100);

  // Handlers
  const handleCreateMission = () => {
    if (!missionTitle || selectedLearners.length === 0) {
      toast.error('Please fill in mission title and select learners');
      return;
    }

    toast.success('Mission created successfully!', {
      description: `Assigned to ${selectedLearners.length} learner(s)`
    });
    
    // Reset form
    setMissionTitle('');
    setMissionDescription('');
    setMissionTrail('');
    setMissionDueDate('');
    setSelectedLearners([]);
    setIsCreateMissionOpen(false);
  };

  const toggleLearnerSelection = (learnerId: number) => {
    setSelectedLearners(prev => 
      prev.includes(learnerId) 
        ? prev.filter(id => id !== learnerId)
        : [...prev, learnerId]
    );
  };

  const handleSlackMessage = (learner: typeof learners[0]) => {
    toast.success(`Opening Slack DM with ${learner.name}`);
  };

  const handleSendPennyMessage = () => {
    if (!pennyInput.trim()) return;

    const userMessage = {
      sender: 'user' as const,
      message: pennyInput,
      timestamp: new Date().toISOString()
    };

    setPennyMessages(prev => [...prev, userMessage]);
    setPennyInput('');

    // Simulate Penny response
    setTimeout(() => {
      let response = '';
      
      if (pennyInput.toLowerCase().includes('team') || pennyInput.toLowerCase().includes('doing')) {
        response = "Your team is performing well overall! Average progress is 68%. However, Morgan Lee hasn't logged in for 3 days and Jordan Kim may need additional support with Flow Builder concepts. Would you like me to draft a check-in message?";
      } else if (pennyInput.toLowerCase().includes('mission')) {
        response = "Based on team skill gaps, I recommend creating missions for:\n\n• LWC basics for Morgan (struggling with developer concepts)\n• Flow debugging for Jordan (needs support)\n• Advanced reporting for the excelling learners\n\nWould you like me to draft these missions?";
      } else if (pennyInput.toLowerCase().includes('behind') || pennyInput.toLowerCase().includes('struggling')) {
        response = "Morgan Lee (3 days inactive) and Jordan Kim (45% progress, needs support) are the learners needing attention. I suggest:\n\n1. Send Slack check-in to Morgan\n2. Schedule 1:1 with Jordan on Flow Builder\n3. Assign lighter workload this week\n\nShall I help with any of these?";
      } else if (pennyInput.toLowerCase().includes('message') || pennyInput.toLowerCase().includes('encouragement')) {
        response = "Here's a suggested team message:\n\n\"Great work this week, team! I'm seeing solid progress across all trails. Special shoutout to Taylor for completing all missions ahead of schedule! 🎉\n\nFor those working on Flow Builder, remember our office hours Thursday at 2pm. Looking forward to seeing everyone's capstone progress next week!\n\nKeep up the amazing work! 🚀\"\n\nWould you like me to post this to #cohort-spring-25?";
      } else {
        response = "I can help you with:\n\n• Team performance insights\n• Mission recommendations\n• Identifying struggling learners\n• Drafting motivational messages\n• Slack update summaries\n\nWhat would you like to know?";
      }

      const pennyResponse = {
        sender: 'penny' as const,
        message: response,
        timestamp: new Date().toISOString()
      };

      setPennyMessages(prev => [...prev, pennyResponse]);
    }, 1000);
  };

  const pennyQuickActions = [
    "How's my team doing?",
    "Recommend new missions",
    "Show who's falling behind",
    "Generate encouragement message",
    "Summarize Slack updates"
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-2">
          <div>
            <h2 className="text-3xl text-gray-900 mb-2 flex items-center space-x-3">
              <Compass className="w-8 h-8 text-[#2C6975]" />
              <span>My Coach Hub</span>
            </h2>
            <p className="text-gray-600">Trail of Mastery Cohort • Spring 2025</p>
          </div>
          <button
            onClick={() => setIsPennyChatOpen(true)}
            className="bg-gradient-to-r from-[#F9A03F] to-[#e89135] text-white px-6 py-3 rounded-lg hover:from-[#e89135] hover:to-[#d97f25] transition-all shadow-md hover:shadow-lg flex items-center space-x-2"
          >
            <Sparkles className="w-5 h-5" />
            <span>Ask Penny AI</span>
          </button>
        </div>
      </div>

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="bg-white border border-gray-200 p-1 grid grid-cols-4 w-full">
          <TabsTrigger value="team-overview" className="flex items-center space-x-2">
            <Users className="w-4 h-4" />
            <span>Team Overview</span>
          </TabsTrigger>
          <TabsTrigger value="missions" className="flex items-center space-x-2">
            <Target className="w-4 h-4" />
            <span>Missions</span>
          </TabsTrigger>
          <TabsTrigger value="progress-insights" className="flex items-center space-x-2">
            <BarChart3 className="w-4 h-4" />
            <span>Progress & Insights</span>
          </TabsTrigger>
          <TabsTrigger value="penny-assistant" className="flex items-center space-x-2">
            <Sparkles className="w-4 h-4" />
            <span>Penny AI</span>
          </TabsTrigger>
        </TabsList>

        {/* Team Overview Tab */}
        <TabsContent value="team-overview" className="space-y-6">
          {/* Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-gray-600">Total Learners</span>
                <Users className="w-5 h-5 text-[#2C6975]" />
              </div>
              <p className="text-3xl text-gray-900">{totalLearners}</p>
              <p className="text-xs text-green-600 mt-1">All active</p>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-gray-600">Avg Progress</span>
                <TrendingUp className="w-5 h-5 text-[#3B6A52]" />
              </div>
              <p className="text-3xl text-gray-900">{avgProgress}%</p>
              <p className="text-xs text-green-600 mt-1">+5% this week</p>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-gray-600">Missions Assigned</span>
                <Target className="w-5 h-5 text-[#F9A03F]" />
              </div>
              <p className="text-3xl text-gray-900">{totalMissionsAssigned}</p>
              <p className="text-xs text-gray-600 mt-1">Active missions</p>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-gray-600">Completion Rate</span>
                <CheckCircle className="w-5 h-5 text-[#3B6A52]" />
              </div>
              <p className="text-3xl text-gray-900">{completionRate}%</p>
              <p className="text-xs text-green-600 mt-1">Above target</p>
            </div>
          </div>

          {/* Filters & Search */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center space-x-3 flex-1">
                <div className="relative flex-1 max-w-md">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search learners..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#2C6975]"
                  />
                </div>
                <select 
                  value={filterTrail}
                  onChange={(e) => setFilterTrail(e.target.value)}
                  className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#2C6975]"
                >
                  <option value="all">All Trails</option>
                  <option value="Guided Trail">Guided Trail</option>
                  <option value="Developer Trail">Developer Trail</option>
                  <option value="Business Analyst Trail">Business Analyst</option>
                  <option value="Designer Trail">Designer</option>
                </select>
                <select 
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                  className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#2C6975]"
                >
                  <option value="all">All Status</option>
                  <option value="excelling">Excelling</option>
                  <option value="on-track">On Track</option>
                  <option value="needs-support">Needs Support</option>
                  <option value="at-risk">At Risk</option>
                </select>
              </div>
            </div>
          </div>

          {/* Team Table */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs text-gray-500 uppercase tracking-wider">Learner</th>
                    <th className="px-6 py-3 text-left text-xs text-gray-500 uppercase tracking-wider">Trail</th>
                    <th className="px-6 py-3 text-left text-xs text-gray-500 uppercase tracking-wider">Progress</th>
                    <th className="px-6 py-3 text-left text-xs text-gray-500 uppercase tracking-wider">Last Activity</th>
                    <th className="px-6 py-3 text-left text-xs text-gray-500 uppercase tracking-wider">Missions</th>
                    <th className="px-6 py-3 text-left text-xs text-gray-500 uppercase tracking-wider">Status</th>
                    <th className="px-6 py-3 text-left text-xs text-gray-500 uppercase tracking-wider">Chat</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {filteredLearners.map((learner) => (
                    <tr key={learner.id} className="hover:bg-gray-50 transition-colors group">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center space-x-3">
                          <Avatar>
                            <AvatarFallback className="bg-gradient-to-br from-[#2C6975] to-[#7EB5C1] text-white">
                              {learner.initials}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="text-sm text-gray-900">{learner.name}</p>
                            <p className="text-xs text-gray-500">{learner.email}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <Badge variant="outline" className="text-xs">
                          {learner.trail}
                        </Badge>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center space-x-3">
                          <div className="flex-1 max-w-[120px]">
                            <div className="w-full bg-gray-100 rounded-full h-2">
                              <div 
                                className="bg-[#2C6975] h-2 rounded-full transition-all"
                                style={{ width: `${learner.progress}%` }}
                              ></div>
                            </div>
                          </div>
                          <span className="text-sm text-gray-600 w-10">{learner.progress}%</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                        {learner.lastActive}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm">
                          <span className="text-green-600">{learner.missionsCompleted}</span>
                          <span className="text-gray-400"> / </span>
                          <span className="text-gray-600">{learner.missionsAssigned}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <Badge className={`${getStatusColor(learner.status)} text-white border-0`}>
                          {getStatusText(learner.status)}
                        </Badge>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <button
                          onClick={() => handleSlackMessage(learner)}
                          className="text-[#2C6975] hover:text-[#234f57] transition-colors"
                          title={`Message ${learner.slackId} on Slack`}
                        >
                          <MessageSquare className="w-5 h-5" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </TabsContent>

        {/* Missions Tab */}
        <TabsContent value="missions" className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-xl text-gray-900">Trail Missions</h3>
              <p className="text-sm text-gray-600">Personalized learning assignments for your team</p>
            </div>
            <button
              onClick={() => setIsCreateMissionOpen(true)}
              className="bg-[#2C6975] text-white px-6 py-3 rounded-lg hover:bg-[#234f57] transition-colors flex items-center space-x-2"
            >
              <Plus className="w-5 h-5" />
              <span>Create New Mission</span>
            </button>
          </div>

          {/* Penny AI Suggestions */}
          <div className="bg-gradient-to-r from-[#F9A03F]/10 to-[#F5F3E8] border-l-4 border-[#F9A03F] rounded-lg p-6">
            <div className="flex items-start space-x-4">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#F9A03F] to-[#e89135] flex items-center justify-center flex-shrink-0">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <div className="flex-1">
                <h4 className="text-gray-900 mb-2">Penny's Mission Recommendations</h4>
                <p className="text-sm text-gray-700 mb-4">
                  Based on team skill gaps and Trailhead progress, I recommend creating these missions:
                </p>
                <div className="space-y-2">
                  <div className="bg-white p-3 rounded-lg border border-[#F9A03F]/20">
                    <p className="text-sm text-gray-900 mb-1">LWC Fundamentals for Morgan Lee</p>
                    <p className="text-xs text-gray-600">Skill gap detected in Lightning Web Components</p>
                  </div>
                  <div className="bg-white p-3 rounded-lg border border-[#F9A03F]/20">
                    <p className="text-sm text-gray-900 mb-1">Flow Debugging Workshop for Jordan Kim</p>
                    <p className="text-xs text-gray-600">Struggling with Process Automation concepts</p>
                  </div>
                  <div className="bg-white p-3 rounded-lg border border-[#F9A03F]/20">
                    <p className="text-sm text-gray-900 mb-1">Advanced Reporting for Excelling Learners</p>
                    <p className="text-xs text-gray-600">Challenge high performers with complex dashboards</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Mission Cards */}
          <div className="grid gap-4">
            {missions.map((mission) => (
              <div key={mission.id} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <h4 className="text-lg text-gray-900">{mission.title}</h4>
                      <Badge className={getMissionStatusColor(mission.status)}>
                        {getMissionStatusText(mission.status)}
                      </Badge>
                    </div>
                    <p className="text-sm text-gray-600 mb-3">{mission.objective}</p>
                    <div className="flex items-center space-x-4 text-sm text-gray-500">
                      <div className="flex items-center space-x-1">
                        <Calendar className="w-4 h-4" />
                        <span>Due: {new Date(mission.dueDate).toLocaleDateString()}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <BookOpen className="w-4 h-4" />
                        <span>{mission.trail}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <button className="p-2 text-gray-400 hover:text-[#2C6975] transition-colors" title="View Details">
                      <Eye className="w-5 h-5" />
                    </button>
                    <button className="p-2 text-gray-400 hover:text-[#2C6975] transition-colors" title="Edit Mission">
                      <Edit className="w-5 h-5" />
                    </button>
                  </div>
                </div>

                {/* Assigned Learners */}
                <div className="mb-4">
                  <p className="text-xs text-gray-500 mb-2">Assigned to:</p>
                  <div className="flex items-center space-x-2">
                    {mission.assignedTo.map(learnerId => {
                      const learner = learners.find(l => l.id === learnerId);
                      if (!learner) return null;
                      const isCompleted = mission.completedBy.includes(learnerId);
                      return (
                        <div key={learnerId} className="relative group">
                          <Avatar className={`${isCompleted ? 'ring-2 ring-green-500' : ''}`}>
                            <AvatarFallback className="bg-gradient-to-br from-[#2C6975] to-[#7EB5C1] text-white text-xs">
                              {learner.initials}
                            </AvatarFallback>
                          </Avatar>
                          {isCompleted && (
                            <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full flex items-center justify-center">
                              <CheckCircle className="w-3 h-3 text-white" />
                            </div>
                          )}
                          <div className="absolute bottom-full mb-2 left-1/2 transform -translate-x-1/2 bg-gray-900 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                            {learner.name} {isCompleted ? '(Completed)' : ''}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Progress Bar */}
                <div className="mb-4">
                  <div className="flex items-center justify-between text-xs text-gray-600 mb-2">
                    <span>Progress</span>
                    <span>{mission.completedBy.length} / {mission.assignedTo.length} completed</span>
                  </div>
                  <div className="w-full bg-gray-100 rounded-full h-2">
                    <div 
                      className="bg-[#3B6A52] h-2 rounded-full transition-all"
                      style={{ width: `${(mission.completedBy.length / mission.assignedTo.length) * 100}%` }}
                    ></div>
                  </div>
                </div>

                {/* Resources */}
                {mission.resources.length > 0 && (
                  <div>
                    <p className="text-xs text-gray-500 mb-2">Resources:</p>
                    <div className="flex flex-wrap gap-2">
                      {mission.resources.map((resource, idx) => (
                        <div key={idx} className="text-xs bg-gray-50 border border-gray-200 px-3 py-1 rounded-full flex items-center space-x-1">
                          <ExternalLink className="w-3 h-3 text-gray-400" />
                          <span className="text-gray-700">{resource}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Actions */}
                {mission.status !== 'completed' && (
                  <div className="mt-4 pt-4 border-t border-gray-200">
                    <button className="text-sm text-[#2C6975] hover:underline">
                      Mark as Reviewed
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        </TabsContent>

        {/* Progress & Insights Tab */}
        <TabsContent value="progress-insights" className="space-y-6">
          <div className="mb-4">
            <h3 className="text-xl text-gray-900">Cohort Insights</h3>
            <p className="text-sm text-gray-600">Analytics and performance metrics for your team</p>
          </div>

          {/* Penny AI Summary */}
          <div className="bg-gradient-to-br from-[#2C6975]/10 to-white border-2 border-[#2C6975]/20 rounded-xl p-6">
            <div className="flex items-start space-x-4">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#2C6975] to-[#7EB5C1] flex items-center justify-center flex-shrink-0">
                <Sparkles className="w-6 h-6 text-white" />
              </div>
              <div className="flex-1">
                <h4 className="text-lg text-gray-900 mb-3">Penny's Weekly Summary</h4>
                <p className="text-sm text-gray-700 mb-4">
                  Your team's average completion improved <span className="text-green-600">14% since last week</span>. 
                  The Developer Trail remains most challenging, with LWC concepts showing lowest completion rates.
                </p>
                <div className="bg-white/50 rounded-lg p-4 border border-[#2C6975]/10">
                  <p className="text-sm text-gray-900 mb-2">💡 Recommendations:</p>
                  <ul className="text-sm text-gray-700 space-y-1 list-disc list-inside">
                    <li>Schedule LWC workshop for struggling developers</li>
                    <li>Pair Morgan with Sam for peer mentoring</li>
                    <li>Celebrate Taylor's exceptional progress in team channel</li>
                    <li>Create review missions for Flow Builder fundamentals</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Charts Grid */}
          <div className="grid lg:grid-cols-2 gap-6">
            {/* Team Progress Over Time */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h4 className="text-gray-900 mb-4 flex items-center space-x-2">
                <TrendingUp className="w-5 h-5 text-[#2C6975]" />
                <span>Team Progress Over Time</span>
              </h4>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={cohortProgressData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                  <XAxis dataKey="week" tick={{ fill: '#6B7280', fontSize: 12 }} />
                  <YAxis tick={{ fill: '#6B7280', fontSize: 12 }} />
                  <Tooltip />
                  <Line type="monotone" dataKey="avgProgress" stroke="#2C6975" strokeWidth={3} name="Avg Progress %" />
                  <Line type="monotone" dataKey="engagement" stroke="#F9A03F" strokeWidth={3} name="Engagement %" />
                </LineChart>
              </ResponsiveContainer>
            </div>

            {/* Top Badges Completed */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h4 className="text-gray-900 mb-4 flex items-center space-x-2">
                <Award className="w-5 h-5 text-[#F9A03F]" />
                <span>Top 5 Badges Completed</span>
              </h4>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={topBadgesData} layout="vertical">
                  <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                  <XAxis type="number" tick={{ fill: '#6B7280', fontSize: 12 }} />
                  <YAxis type="category" dataKey="name" tick={{ fill: '#6B7280', fontSize: 12 }} width={120} />
                  <Tooltip />
                  <Bar dataKey="count" fill="#3B6A52" name="Completions" />
                </BarChart>
              </ResponsiveContainer>
            </div>

            {/* Time Spent per Trail */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h4 className="text-gray-900 mb-4 flex items-center space-x-2">
                <Mountain className="w-5 h-5 text-[#7EB5C1]" />
                <span>Time Spent per Trail</span>
              </h4>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={trailTimeData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                    outerRadius={100}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {trailTimeData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>

            {/* Mission Completion Rate */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h4 className="text-gray-900 mb-4 flex items-center space-x-2">
                <Target className="w-5 h-5 text-[#3B6A52]" />
                <span>Mission Completion Rate</span>
              </h4>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={missionCompletionData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                    outerRadius={100}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {missionCompletionData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* AI Action Cards */}
          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-gradient-to-r from-orange-50 to-white border-l-4 border-[#F9A03F] rounded-lg p-6">
              <div className="flex items-center space-x-3 mb-3">
                <AlertCircle className="w-5 h-5 text-[#F9A03F]" />
                <h4 className="text-gray-900">Daily Digest</h4>
              </div>
              <p className="text-sm text-gray-700 mb-3">
                <span className="text-[#F9A03F]">2 learners</span> haven't logged in this week (Morgan Lee, inactive 3 days)
              </p>
              <button className="text-sm text-[#2C6975] hover:underline">
                Send check-in message →
              </button>
            </div>

            <div className="bg-gradient-to-r from-blue-50 to-white border-l-4 border-[#7EB5C1] rounded-lg p-6">
              <div className="flex items-center space-x-3 mb-3">
                <MessageSquare className="w-5 h-5 text-[#7EB5C1]" />
                <h4 className="text-gray-900">Motivation Opportunity</h4>
              </div>
              <p className="text-sm text-gray-700 mb-3">
                Team morale is high! Consider posting an encouragement message in Slack.
              </p>
              <button className="text-sm text-[#2C6975] hover:underline">
                Create motivation post →
              </button>
            </div>
          </div>
        </TabsContent>

        {/* Penny AI Assistant Tab */}
        <TabsContent value="penny-assistant" className="space-y-6">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="bg-gradient-to-r from-[#2C6975] to-[#7EB5C1] p-6 text-white">
              <div className="flex items-center space-x-4">
                <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center ring-4 ring-[#F9A03F]/50">
                  <Sparkles className="w-8 h-8" />
                </div>
                <div>
                  <h3 className="text-xl mb-1">Penny AI Coach Assistant</h3>
                  <p className="text-sm text-white/90">Your intelligent coaching partner</p>
                </div>
              </div>
            </div>

            {/* Chat Messages */}
            <div className="p-6 bg-gray-50 max-h-[500px] overflow-y-auto">
              <div className="space-y-4">
                {pennyMessages.map((msg, idx) => (
                  <div key={idx} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                    {msg.sender === 'penny' && (
                      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#F9A03F] to-[#e89135] flex items-center justify-center flex-shrink-0 mr-3 ring-2 ring-[#F9A03F]/30">
                        <Sparkles className="w-4 h-4 text-white" />
                      </div>
                    )}
                    <div className={`max-w-[80%] rounded-lg p-4 ${
                      msg.sender === 'penny' 
                        ? 'bg-white border border-gray-200' 
                        : 'bg-[#2C6975] text-white'
                    }`}>
                      <p className="text-sm whitespace-pre-wrap">{msg.message}</p>
                      <span className={`text-xs mt-2 block ${
                        msg.sender === 'penny' ? 'text-gray-500' : 'text-white/70'
                      }`}>
                        {new Date(msg.timestamp).toLocaleTimeString()}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Action Chips */}
            <div className="px-6 py-4 bg-white border-t border-gray-200">
              <p className="text-xs text-gray-600 mb-3">Quick Actions:</p>
              <div className="flex flex-wrap gap-2">
                {pennyQuickActions.map((action, idx) => (
                  <button
                    key={idx}
                    onClick={() => setPennyInput(action)}
                    className="text-xs bg-gray-100 hover:bg-gray-200 text-gray-700 px-3 py-2 rounded-full transition-colors"
                  >
                    {action}
                  </button>
                ))}
              </div>
            </div>

            {/* Input */}
            <div className="p-4 bg-white border-t border-gray-200">
              <div className="flex space-x-3">
                <input
                  type="text"
                  value={pennyInput}
                  onChange={(e) => setPennyInput(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSendPennyMessage()}
                  placeholder="Ask Penny anything..."
                  className="flex-1 px-4 py-3 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#2C6975]"
                />
                <button
                  onClick={handleSendPennyMessage}
                  className="bg-[#2C6975] text-white px-6 py-3 rounded-lg hover:bg-[#234f57] transition-colors flex items-center space-x-2"
                >
                  <Send className="w-4 h-4" />
                  <span>Send</span>
                </button>
              </div>
            </div>
          </div>
        </TabsContent>
      </Tabs>

      {/* Create Mission Modal */}
      <Dialog open={isCreateMissionOpen} onOpenChange={setIsCreateMissionOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Create New Mission</DialogTitle>
            <DialogDescription>
              Assign a personalized learning mission to your team members
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-6 py-4">
            {/* Title */}
            <div>
              <Label htmlFor="mission-title" className="text-sm mb-2 block">Mission Title *</Label>
              <Input
                id="mission-title"
                value={missionTitle}
                onChange={(e) => setMissionTitle(e.target.value)}
                placeholder="e.g., Complete Flow Builder Fundamentals"
                className="w-full"
              />
            </div>

            {/* Description */}
            <div>
              <Label htmlFor="mission-description" className="text-sm mb-2 block">Objective Summary</Label>
              <Textarea
                id="mission-description"
                value={missionDescription}
                onChange={(e) => setMissionDescription(e.target.value)}
                placeholder="Describe the learning objectives and expected outcomes..."
                rows={4}
                className="w-full"
              />
            </div>

            {/* Trail/Course Picker */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="mission-trail" className="text-sm mb-2 block">Trail</Label>
                <select
                  id="mission-trail"
                  value={missionTrail}
                  onChange={(e) => setMissionTrail(e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#2C6975]"
                >
                  <option value="">Select Trail...</option>
                  <option value="guided">Guided Trail</option>
                  <option value="developer">Developer Trail</option>
                  <option value="business-analyst">Business Analyst Trail</option>
                  <option value="designer">Designer Trail</option>
                </select>
              </div>

              <div>
                <Label htmlFor="mission-due-date" className="text-sm mb-2 block">Due Date</Label>
                <Input
                  id="mission-due-date"
                  type="date"
                  value={missionDueDate}
                  onChange={(e) => setMissionDueDate(e.target.value)}
                  className="w-full"
                />
              </div>
            </div>

            {/* Learner Selection */}
            <div>
              <Label className="text-sm mb-3 block">Assign to Learners * ({selectedLearners.length} selected)</Label>
              <div className="grid grid-cols-2 gap-3 max-h-64 overflow-y-auto border border-gray-200 rounded-lg p-4">
                {learners.map((learner) => (
                  <div
                    key={learner.id}
                    onClick={() => toggleLearnerSelection(learner.id)}
                    className={`flex items-center space-x-3 p-3 rounded-lg border-2 cursor-pointer transition-all ${
                      selectedLearners.includes(learner.id)
                        ? 'border-[#2C6975] bg-[#2C6975]/5'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <Avatar className="w-10 h-10">
                      <AvatarFallback className="bg-gradient-to-br from-[#2C6975] to-[#7EB5C1] text-white text-xs">
                        {learner.initials}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-gray-900 truncate">{learner.name}</p>
                      <p className="text-xs text-gray-500 truncate">{learner.trail}</p>
                    </div>
                    {selectedLearners.includes(learner.id) && (
                      <CheckCircle className="w-5 h-5 text-[#2C6975] flex-shrink-0" />
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center justify-end space-x-3 pt-4 border-t border-gray-200">
              <button
                onClick={() => setIsCreateMissionOpen(false)}
                className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleCreateMission}
                className="px-6 py-2 bg-[#2C6975] text-white rounded-lg hover:bg-[#234f57] transition-colors flex items-center space-x-2"
              >
                <Plus className="w-4 h-4" />
                <span>Assign Mission</span>
              </button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Penny Chat Modal (from header button) */}
      <Dialog open={isPennyChatOpen} onOpenChange={setIsPennyChatOpen}>
        <DialogContent className="max-w-3xl max-h-[80vh]">
          <DialogHeader>
            <DialogTitle className="flex items-center space-x-2">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#F9A03F] to-[#e89135] flex items-center justify-center">
                <Sparkles className="w-4 h-4 text-white" />
              </div>
              <span>Penny AI Coach Assistant</span>
            </DialogTitle>
            <DialogDescription>
              Get AI-powered insights and recommendations for your team
            </DialogDescription>
          </DialogHeader>

          {/* Chat Interface (same as tab) */}
          <div className="space-y-4">
            <div className="bg-gray-50 rounded-lg p-4 max-h-[400px] overflow-y-auto">
              <div className="space-y-4">
                {pennyMessages.map((msg, idx) => (
                  <div key={idx} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                    {msg.sender === 'penny' && (
                      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#F9A03F] to-[#e89135] flex items-center justify-center flex-shrink-0 mr-3">
                        <Sparkles className="w-4 h-4 text-white" />
                      </div>
                    )}
                    <div className={`max-w-[80%] rounded-lg p-4 ${
                      msg.sender === 'penny' 
                        ? 'bg-white border border-gray-200' 
                        : 'bg-[#2C6975] text-white'
                    }`}>
                      <p className="text-sm whitespace-pre-wrap">{msg.message}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex space-x-3">
              <input
                type="text"
                value={pennyInput}
                onChange={(e) => setPennyInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSendPennyMessage()}
                placeholder="Ask Penny anything..."
                className="flex-1 px-4 py-3 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#2C6975]"
              />
              <button
                onClick={handleSendPennyMessage}
                className="bg-[#2C6975] text-white px-6 py-3 rounded-lg hover:bg-[#234f57] transition-colors"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
