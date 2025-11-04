import { useState } from 'react';
import { ArrowLeft, BookOpen, Clock, Award, Play, CheckCircle, AlertTriangle, Upload, Users, User, FileText, Sparkles, RefreshCw, X, Check, Calendar } from 'lucide-react';
import { PageType } from '../App';
import { ProgressRing } from './ProgressRing';

interface TrailMissionsProps {
  onNavigate: (page: PageType) => void;
}

export function TrailMissions({ onNavigate }: TrailMissionsProps) {
  const [dailyMissionRequested, setDailyMissionRequested] = useState(false);
  const [dailyMissionAccepted, setDailyMissionAccepted] = useState(false);
  const [dailyMissionDeclined, setDailyMissionDeclined] = useState(false);
  const [selectedMissionType, setSelectedMissionType] = useState<'solo' | 'group' | null>(null);
  const [activeTab, setActiveTab] = useState('all');

  // Daily Mission Request Feature
  const [dailyMission] = useState({
    title: 'Build a Lightning Web Component',
    description: 'Create a custom Lightning Web Component that displays contact information with a search filter.',
    difficulty: 'Intermediate',
    estimatedTime: '45 minutes',
    points: 75,
    deadline: '11:59 PM CT',
    skills: ['LWC', 'JavaScript', 'HTML'],
    type: 'solo' as 'solo' | 'group',
  });

  const [groupDailyMission] = useState({
    title: 'Design a Sales Dashboard',
    description: 'Collaborate with your cohort to design a comprehensive sales performance dashboard with key metrics and insights.',
    difficulty: 'Advanced',
    estimatedTime: '90 minutes',
    points: 150,
    deadline: '11:59 PM CT',
    skills: ['Reports', 'Dashboards', 'Analytics'],
    teamSize: '3-4 members',
    type: 'group' as 'solo' | 'group',
  });

  const handleRequestDailyMission = (type: 'solo' | 'group') => {
    setSelectedMissionType(type);
    setDailyMissionRequested(true);
  };

  const handleAcceptMission = () => {
    setDailyMissionAccepted(true);
  };

  const handleDeclineMission = () => {
    setDailyMissionDeclined(true);
    setDailyMissionRequested(false);
    setSelectedMissionType(null);
  };

  // Program-assigned missions (from coaches)
  const programMissions = [
    {
      id: 1,
      title: 'Build a Custom Object Schema',
      course: 'Data Modeling Fundamentals',
      dueDate: 'March 3, 2025',
      daysLeft: 2,
      status: 'pending',
      points: 100,
      description: 'Create a custom object schema for a library management system with appropriate fields and relationships.',
      submissionType: 'File Upload',
      resources: ['Schema Builder Guide', 'Object Relationships Tutorial'],
      assignedBy: 'Coach Sarah',
      difficulty: 'Intermediate',
    },
    {
      id: 2,
      title: 'Process Automation Flow',
      course: 'Process Automation Basics',
      dueDate: 'March 5, 2025',
      daysLeft: 4,
      status: 'in-progress',
      points: 150,
      description: 'Design and implement an automated flow for lead qualification and assignment.',
      submissionType: 'Replit Project',
      resources: ['Flow Builder Documentation', 'Best Practices Guide'],
      assignedBy: 'Coach Sarah',
      difficulty: 'Advanced',
    },
    {
      id: 3,
      title: 'Reports and Dashboards Exercise',
      course: 'Salesforce Admin Essentials',
      dueDate: 'February 28, 2025',
      status: 'submitted',
      points: 75,
      grade: 92,
      feedback: 'Excellent work! Your dashboards are well-organized and provide clear insights.',
      submittedDate: 'February 26, 2025',
      description: 'Create a set of reports and a dashboard showing key sales metrics.',
      submissionType: 'Salesforce Org',
      assignedBy: 'Coach Sarah',
      difficulty: 'Beginner',
    },
    {
      id: 4,
      title: 'Apex Basics Project',
      course: 'Apex Development',
      dueDate: 'March 15, 2025',
      daysLeft: 14,
      status: 'upcoming',
      points: 200,
      description: 'Write Apex triggers and classes for a contact management application.',
      submissionType: 'Code Submission',
      resources: ['Apex Developer Guide', 'Trigger Framework', 'Test Class Examples'],
      assignedBy: 'Coach Marcus',
      difficulty: 'Advanced',
    },
  ];

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

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'pending':
        return <span className="px-3 py-1 rounded-full bg-red-100 text-red-700 text-xs flex items-center space-x-1">
          <AlertTriangle className="w-3 h-3" />
          <span>Pending</span>
        </span>;
      case 'in-progress':
        return <span className="px-3 py-1 rounded-full bg-[#F9A03F] text-white text-xs">In Progress</span>;
      case 'submitted':
        return <span className="px-3 py-1 rounded-full bg-[#7EB5C1] text-white text-xs">Submitted</span>;
      case 'graded':
        return <span className="px-3 py-1 rounded-full bg-[#3B6A52] text-white text-xs flex items-center space-x-1">
          <CheckCircle className="w-3 h-3" />
          <span>Graded</span>
        </span>;
      case 'upcoming':
        return <span className="px-3 py-1 rounded-full bg-gray-300 text-gray-700 text-xs">Upcoming</span>;
      case 'completed':
        return <span className="px-3 py-1 rounded-full bg-[#3B6A52] text-white text-xs">Completed</span>;
      case 'not-started':
        return <span className="px-3 py-1 rounded-full bg-gray-300 text-gray-700 text-xs">Not Started</span>;
      default:
        return null;
    }
  };

  const getDueDateColor = (daysLeft?: number) => {
    if (!daysLeft) return 'text-gray-600';
    if (daysLeft <= 2) return 'text-red-600';
    if (daysLeft <= 7) return 'text-[#F9A03F]';
    return 'text-gray-600';
  };

  const getDifficultyBadge = (difficulty: string) => {
    switch (difficulty) {
      case 'Beginner':
        return <span className="px-2 py-1 rounded-full bg-green-100 text-green-700 text-xs">Beginner</span>;
      case 'Intermediate':
        return <span className="px-2 py-1 rounded-full bg-[#F9A03F]/20 text-[#F9A03F] text-xs">Intermediate</span>;
      case 'Advanced':
        return <span className="px-2 py-1 rounded-full bg-red-100 text-red-700 text-xs">Advanced</span>;
      default:
        return null;
    }
  };

  const currentMission = selectedMissionType === 'group' ? groupDailyMission : dailyMission;

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
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-3xl text-gray-900 mb-2">Trail Missions</h2>
            <p className="text-gray-600">Complete assignments, daily challenges, and learning paths</p>
          </div>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid md:grid-cols-4 gap-4 mb-8">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 text-center">
          <p className="text-2xl text-gray-900 mb-1">2</p>
          <p className="text-sm text-gray-600">Due This Week</p>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 text-center">
          <p className="text-2xl text-gray-900 mb-1">1</p>
          <p className="text-sm text-gray-600">In Progress</p>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 text-center">
          <p className="text-2xl text-gray-900 mb-1">52%</p>
          <p className="text-sm text-gray-600">Trail Progress</p>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 text-center">
          <p className="text-2xl text-gray-900 mb-1">90%</p>
          <p className="text-sm text-gray-600">Avg Grade</p>
        </div>
      </div>

      {/* Daily Trail Mission Section */}
      <div className="mb-8">
        <div className="bg-gradient-to-br from-[#F9A03F]/10 to-[#F9A03F]/5 border-2 border-[#F9A03F]/30 rounded-xl p-6">
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-10 h-10 rounded-lg bg-[#F9A03F] text-white flex items-center justify-center">
              <Sparkles className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-gray-900">Daily Trail Mission</h3>
              <p className="text-sm text-gray-600">Complete one challenge per day for bonus points</p>
            </div>
          </div>

          {!dailyMissionRequested && !dailyMissionDeclined && (
            <div className="bg-white rounded-xl p-6">
              <p className="text-gray-700 mb-6">
                Challenge yourself with a daily mission! Choose between a solo challenge or team up with your cohort.
              </p>
              <div className="grid md:grid-cols-2 gap-4">
                <button
                  onClick={() => handleRequestDailyMission('solo')}
                  className="p-6 border-2 border-gray-200 rounded-xl hover:border-[#2C6975] hover:bg-gray-50 transition-all group text-left"
                >
                  <div className="flex items-center space-x-3 mb-3">
                    <div className="w-12 h-12 rounded-lg bg-[#2C6975]/10 text-[#2C6975] flex items-center justify-center group-hover:bg-[#2C6975] group-hover:text-white transition-colors">
                      <User className="w-6 h-6" />
                    </div>
                    <div>
                      <h4 className="text-gray-900">Solo Mission</h4>
                      <p className="text-sm text-gray-600">Individual challenge</p>
                    </div>
                  </div>
                  <p className="text-sm text-gray-600">Work independently on a focused technical challenge</p>
                </button>

                <button
                  onClick={() => handleRequestDailyMission('group')}
                  className="p-6 border-2 border-gray-200 rounded-xl hover:border-[#2C6975] hover:bg-gray-50 transition-all group text-left"
                >
                  <div className="flex items-center space-x-3 mb-3">
                    <div className="w-12 h-12 rounded-lg bg-[#2C6975]/10 text-[#2C6975] flex items-center justify-center group-hover:bg-[#2C6975] group-hover:text-white transition-colors">
                      <Users className="w-6 h-6" />
                    </div>
                    <div>
                      <h4 className="text-gray-900">Group Mission</h4>
                      <p className="text-sm text-gray-600">Team challenge</p>
                    </div>
                  </div>
                  <p className="text-sm text-gray-600">Collaborate with cohort members on a larger project</p>
                </button>
              </div>
            </div>
          )}

          {dailyMissionRequested && !dailyMissionAccepted && !dailyMissionDeclined && (
            <div className="bg-white rounded-xl p-6">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-3">
                  {selectedMissionType === 'solo' ? (
                    <div className="w-12 h-12 rounded-lg bg-[#2C6975] text-white flex items-center justify-center">
                      <User className="w-6 h-6" />
                    </div>
                  ) : (
                    <div className="w-12 h-12 rounded-lg bg-[#2C6975] text-white flex items-center justify-center">
                      <Users className="w-6 h-6" />
                    </div>
                  )}
                  <div>
                    <h4 className="text-gray-900">{currentMission.title}</h4>
                    <p className="text-sm text-gray-600">{selectedMissionType === 'solo' ? 'Solo Mission' : 'Group Mission'}</p>
                  </div>
                </div>
                {getDifficultyBadge(currentMission.difficulty)}
              </div>

              <p className="text-gray-700 mb-4">{currentMission.description}</p>

              <div className="grid md:grid-cols-2 gap-4 mb-4">
                <div className="flex items-center space-x-2 text-sm text-gray-600">
                  <Clock className="w-4 h-4" />
                  <span>Est. Time: {currentMission.estimatedTime}</span>
                </div>
                <div className="flex items-center space-x-2 text-sm text-gray-600">
                  <Award className="w-4 h-4" />
                  <span>{currentMission.points} points</span>
                </div>
                <div className="flex items-center space-x-2 text-sm text-gray-600">
                  <Calendar className="w-4 h-4" />
                  <span>Due: {currentMission.deadline}</span>
                </div>
                {selectedMissionType === 'group' && (
                  <div className="flex items-center space-x-2 text-sm text-gray-600">
                    <Users className="w-4 h-4" />
                    <span>Team: {currentMission.teamSize}</span>
                  </div>
                )}
              </div>

              <div className="mb-6">
                <p className="text-sm text-gray-600 mb-2">Skills:</p>
                <div className="flex flex-wrap gap-2">
                  {currentMission.skills.map((skill, idx) => (
                    <span key={idx} className="px-3 py-1 bg-[#7EB5C1]/10 text-[#2C6975] rounded-full text-xs">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex space-x-3">
                <button
                  onClick={handleAcceptMission}
                  className="flex-1 bg-[#3B6A52] text-white px-6 py-3 rounded-lg hover:bg-[#2d5340] transition-colors flex items-center justify-center space-x-2"
                >
                  <Check className="w-5 h-5" />
                  <span>Accept Mission</span>
                </button>
                <button
                  onClick={handleDeclineMission}
                  className="px-6 py-3 rounded-lg border-2 border-gray-300 text-gray-700 hover:bg-gray-50 transition-colors flex items-center space-x-2"
                >
                  <X className="w-5 h-5" />
                  <span>Decline</span>
                </button>
              </div>

              <p className="text-xs text-gray-500 mt-4">
                ⚠️ Once declined, you'll need to wait until tomorrow to request a new daily mission.
              </p>
            </div>
          )}

          {dailyMissionAccepted && (
            <div className="bg-white rounded-xl p-6">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-3">
                  {selectedMissionType === 'solo' ? (
                    <div className="w-12 h-12 rounded-lg bg-[#3B6A52] text-white flex items-center justify-center">
                      <User className="w-6 h-6" />
                    </div>
                  ) : (
                    <div className="w-12 h-12 rounded-lg bg-[#3B6A52] text-white flex items-center justify-center">
                      <Users className="w-6 h-6" />
                    </div>
                  )}
                  <div>
                    <h4 className="text-gray-900">{currentMission.title}</h4>
                    <span className="px-3 py-1 rounded-full bg-[#3B6A52] text-white text-xs">Active</span>
                  </div>
                </div>
              </div>

              <div className="bg-[#F9A03F]/10 border border-[#F9A03F]/30 rounded-lg p-4 mb-4">
                <div className="flex items-center space-x-2 text-[#F9A03F] mb-2">
                  <Clock className="w-5 h-5" />
                  <span className="text-sm">Time remaining until {currentMission.deadline}</span>
                </div>
                <p className="text-sm text-gray-700">Complete this mission before the deadline to earn {currentMission.points} points!</p>
              </div>

              <div className="flex space-x-3">
                <button className="flex-1 bg-[#2C6975] text-white px-6 py-3 rounded-lg hover:bg-[#234f57] transition-colors flex items-center justify-center space-x-2">
                  <Upload className="w-5 h-5" />
                  <span>Submit Mission</span>
                </button>
                <button className="px-6 py-3 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50 transition-colors">
                  View Details
                </button>
              </div>
            </div>
          )}

          {dailyMissionDeclined && (
            <div className="bg-white rounded-xl p-6 text-center">
              <div className="w-16 h-16 rounded-full bg-gray-100 text-gray-400 flex items-center justify-center mx-auto mb-4">
                <RefreshCw className="w-8 h-8" />
              </div>
              <h4 className="text-gray-900 mb-2">Mission Declined</h4>
              <p className="text-gray-600 mb-4">You can request a new daily mission tomorrow!</p>
              <p className="text-sm text-gray-500">Next available: Tomorrow at 12:00 AM CT</p>
            </div>
          )}
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-2 mb-6 flex space-x-2">
        <button 
          onClick={() => setActiveTab('all')}
          className={`flex-1 px-4 py-2 rounded-lg ${activeTab === 'all' ? 'bg-[#2C6975] text-white' : 'text-gray-600 hover:bg-gray-100'}`}
        >
          All Missions
        </button>
        <button 
          onClick={() => setActiveTab('assignments')}
          className={`flex-1 px-4 py-2 rounded-lg ${activeTab === 'assignments' ? 'bg-[#2C6975] text-white' : 'text-gray-600 hover:bg-gray-100'}`}
        >
          Assignments
        </button>
        <button 
          onClick={() => setActiveTab('trails')}
          className={`flex-1 px-4 py-2 rounded-lg ${activeTab === 'trails' ? 'bg-[#2C6975] text-white' : 'text-gray-600 hover:bg-gray-100'}`}
        >
          Learning Trails
        </button>
      </div>

      {/* Program-Assigned Missions (from Coaches) */}
      {(activeTab === 'all' || activeTab === 'assignments') && (
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl text-gray-900">Program Assignments</h3>
            <span className="text-sm text-gray-600">Assigned by your coaches</span>
          </div>
          
          <div className="space-y-4">
            {programMissions.map((mission) => (
              <div key={mission.id} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <FileText className="w-5 h-5 text-[#2C6975]" />
                      <h4 className="text-gray-900">{mission.title}</h4>
                      {getStatusBadge(mission.status)}
                      {getDifficultyBadge(mission.difficulty)}
                    </div>
                    <p className="text-sm text-gray-600 mb-1">{mission.course}</p>
                    <p className="text-sm text-gray-700 mb-4">{mission.description}</p>

                    {/* Meta Info */}
                    <div className="flex flex-wrap items-center gap-6 text-sm mb-4">
                      {mission.daysLeft !== undefined && (
                        <div className={`flex items-center space-x-2 ${getDueDateColor(mission.daysLeft)}`}>
                          <Clock className="w-4 h-4" />
                          <span>Due: {mission.dueDate} ({mission.daysLeft} days left)</span>
                        </div>
                      )}
                      {(mission.status === 'graded' || mission.status === 'submitted') && (
                        <div className="flex items-center space-x-2 text-gray-600">
                          <Clock className="w-4 h-4" />
                          <span>Due: {mission.dueDate}</span>
                        </div>
                      )}
                      <div className="text-gray-600">
                        {mission.points} points
                      </div>
                      <div className="text-gray-600">
                        {mission.submissionType}
                      </div>
                      <div className="flex items-center space-x-1 text-gray-600">
                        <User className="w-4 h-4" />
                        <span>{mission.assignedBy}</span>
                      </div>
                    </div>

                    {/* Grade/Feedback */}
                    {mission.grade && (
                      <div className="p-4 bg-[#3B6A52]/10 rounded-lg mb-4">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm text-gray-900">Grade</span>
                          <span className="text-xl text-[#3B6A52]">{mission.grade}%</span>
                        </div>
                        {mission.feedback && (
                          <p className="text-sm text-gray-700">{mission.feedback}</p>
                        )}
                      </div>
                    )}

                    {/* Resources */}
                    {mission.resources && (
                      <div className="mb-4">
                        <p className="text-xs text-gray-500 mb-2">Resources:</p>
                        <div className="flex flex-wrap gap-2">
                          {mission.resources.map((resource, idx) => (
                            <a
                              key={idx}
                              href="#"
                              className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-xs hover:bg-gray-200 transition-colors"
                            >
                              {resource}
                            </a>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Actions */}
                <div className="flex flex-wrap gap-3">
                  {(mission.status === 'pending' || mission.status === 'in-progress') && (
                    <>
                      <button className="flex items-center space-x-2 bg-[#2C6975] text-white px-6 py-2 rounded-lg hover:bg-[#234f57] transition-colors">
                        <Upload className="w-4 h-4" />
                        <span>Submit Assignment</span>
                      </button>
                      <button className="px-6 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50 transition-colors">
                        View Instructions
                      </button>
                    </>
                  )}
                  {mission.status === 'submitted' && (
                    <button className="px-6 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50 transition-colors">
                      View Submission
                    </button>
                  )}
                  {mission.status === 'graded' && (
                    <>
                      <button className="px-6 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50 transition-colors">
                        View Feedback
                      </button>
                      <button className="px-6 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50 transition-colors">
                        Download Submission
                      </button>
                    </>
                  )}
                  {mission.status === 'upcoming' && (
                    <button className="px-6 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50 transition-colors">
                      View Details
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Self-Paced Learning Trails */}
      {(activeTab === 'all' || activeTab === 'trails') && (
        <div>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl text-gray-900">Self-Paced Learning Trails</h3>
            <span className="text-sm text-gray-600">52% overall progress</span>
          </div>

          <div className="space-y-6">
            {learningTrails.map((trail) => (
              <div key={trail.id} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
                <div className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <BookOpen className="w-6 h-6" style={{ color: trail.color }} />
                        <h4 className="text-gray-900">{trail.title}</h4>
                        {getStatusBadge(trail.status)}
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
                    <div className="ml-6">
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
                      <button className="flex-1 bg-[#2C6975] text-white px-6 py-3 rounded-lg hover:bg-[#234f57] transition-colors flex items-center justify-center space-x-2">
                        <Play className="w-4 h-4" />
                        <span>Start Trail</span>
                      </button>
                    ) : (
                      <button className="flex-1 bg-[#2C6975] text-white px-6 py-3 rounded-lg hover:bg-[#234f57] transition-colors">
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
        </div>
      )}
    </div>
  );
}
