import { Book, Play, Clock, Award, ChevronRight, CheckCircle, ExternalLink, Search, TrendingUp, Target, Sparkles, Star, Zap, Lightbulb } from 'lucide-react';
import { PageType } from '../App';
import { useState } from 'react';

interface LearningCenterProps {
  onNavigate: (page: PageType) => void;
}

export function LearningCenter({ onNavigate }: LearningCenterProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState<'assigned' | 'catalog'>('assigned');
  const [showPennyRecommendations, setShowPennyRecommendations] = useState(true);

  const assignedCourses = [
    {
      id: 1,
      title: 'Salesforce Administrator Fundamentals',
      provider: 'pluralsight',
      instructor: 'Don Robins',
      duration: '4h 32m',
      modules: 12,
      progress: 75,
      status: 'in-progress',
      level: 'Beginner',
      points: 250,
      earnedPoints: 188,
      dueDate: 'Mar 10, 2025',
      description: 'Master the fundamentals of Salesforce administration including user management, security, and data management.',
      skills: ['User Management', 'Security', 'Data Management'],
      isAssigned: true,
    },
    {
      id: 2,
      title: 'Salesforce Automation & Process Builder',
      provider: 'pluralsight',
      instructor: 'Tim Hynes',
      duration: '3h 15m',
      modules: 9,
      progress: 45,
      status: 'in-progress',
      level: 'Intermediate',
      points: 300,
      earnedPoints: 135,
      dueDate: 'Mar 17, 2025',
      description: 'Learn to automate business processes using Flow Builder, Process Builder, and Workflow Rules.',
      skills: ['Process Builder', 'Flow', 'Automation'],
      isAssigned: true,
    },
    {
      id: 3,
      title: 'Salesforce Reports and Dashboards',
      provider: 'pluralsight',
      instructor: 'Emma Garcia',
      duration: '2h 45m',
      modules: 8,
      progress: 0,
      status: 'not-started',
      level: 'Beginner',
      points: 200,
      earnedPoints: 0,
      dueDate: 'Mar 24, 2025',
      description: 'Create powerful reports and dashboards to visualize and analyze your Salesforce data.',
      skills: ['Reporting', 'Dashboards', 'Analytics'],
      isAssigned: true,
    },
    {
      id: 4,
      title: 'Advanced Apex Programming',
      provider: 'pluralsight',
      instructor: 'Sarah Mitchell',
      duration: '5h 20m',
      modules: 15,
      progress: 100,
      status: 'completed',
      level: 'Advanced',
      points: 400,
      earnedPoints: 400,
      dueDate: 'Completed',
      description: 'Deep dive into advanced Apex concepts including triggers, batch processing, and asynchronous programming.',
      skills: ['Apex', 'Triggers', 'Async Processing'],
      isAssigned: true,
    },
    {
      id: 5,
      title: 'Salesforce Lightning Experience Essentials',
      provider: 'viva',
      instructor: 'Microsoft Learn',
      duration: '2h 10m',
      modules: 6,
      progress: 60,
      status: 'in-progress',
      level: 'Beginner',
      points: 150,
      earnedPoints: 90,
      dueDate: 'Mar 12, 2025',
      description: 'Get up to speed with Salesforce Lightning Experience interface and features.',
      skills: ['Lightning', 'UI Navigation', 'Productivity'],
      isAssigned: true,
    },
    {
      id: 6,
      title: 'Data Modeling in Salesforce',
      provider: 'viva',
      instructor: 'Salesforce Trailhead',
      duration: '3h 00m',
      modules: 10,
      progress: 90,
      status: 'in-progress',
      level: 'Intermediate',
      points: 250,
      earnedPoints: 225,
      dueDate: 'Mar 15, 2025',
      description: 'Learn to design and implement effective data models using objects, fields, and relationships.',
      skills: ['Data Modeling', 'Objects', 'Relationships'],
      isAssigned: true,
    },
    {
      id: 7,
      title: 'Customer Service in Salesforce',
      provider: 'viva',
      instructor: 'LinkedIn Learning',
      duration: '1h 45m',
      modules: 5,
      progress: 0,
      status: 'not-started',
      level: 'Beginner',
      points: 175,
      earnedPoints: 0,
      dueDate: 'Mar 31, 2025',
      description: 'Explore Service Cloud features for managing customer cases and support operations.',
      skills: ['Service Cloud', 'Cases', 'Customer Support'],
      isAssigned: true,
    },
  ];

  const catalogCourses = [
    {
      id: 101,
      title: 'Lightning Web Components Fundamentals',
      provider: 'pluralsight',
      instructor: 'Kevin Poorman',
      duration: '4h 15m',
      modules: 11,
      progress: 0,
      status: 'not-started',
      level: 'Intermediate',
      points: 350,
      earnedPoints: 0,
      dueDate: 'Optional',
      description: 'Build modern, performant components using Lightning Web Components framework.',
      skills: ['LWC', 'JavaScript', 'Web Components'],
      isAssigned: false,
      recommendedBy: 'penny',
    },
    {
      id: 102,
      title: 'Salesforce Integration Patterns',
      provider: 'pluralsight',
      instructor: 'Marcus Torres',
      duration: '5h 00m',
      modules: 14,
      progress: 0,
      status: 'not-started',
      level: 'Advanced',
      points: 450,
      earnedPoints: 0,
      dueDate: 'Optional',
      description: 'Learn REST APIs, SOAP, and integration best practices for connecting Salesforce with external systems.',
      skills: ['REST API', 'SOAP', 'Integration', 'Middleware'],
      isAssigned: false,
      recommendedBy: 'penny',
    },
    {
      id: 103,
      title: 'Sales Cloud Implementation',
      provider: 'viva',
      instructor: 'Salesforce Trailhead',
      duration: '3h 30m',
      modules: 9,
      progress: 0,
      status: 'not-started',
      level: 'Intermediate',
      points: 275,
      earnedPoints: 0,
      dueDate: 'Optional',
      description: 'Configure and customize Sales Cloud for optimal sales team productivity.',
      skills: ['Sales Cloud', 'Opportunity Management', 'Lead Management'],
      isAssigned: false,
    },
    {
      id: 104,
      title: 'Salesforce Security & Sharing',
      provider: 'pluralsight',
      instructor: 'Rachel Kim',
      duration: '3h 45m',
      modules: 10,
      progress: 0,
      status: 'not-started',
      level: 'Intermediate',
      points: 300,
      earnedPoints: 0,
      dueDate: 'Optional',
      description: 'Master org-wide defaults, profiles, permission sets, and sharing rules.',
      skills: ['Security', 'Sharing Rules', 'Permissions', 'Profiles'],
      isAssigned: false,
      recommendedBy: 'penny',
    },
    {
      id: 105,
      title: 'Einstein Analytics for Admins',
      provider: 'viva',
      instructor: 'LinkedIn Learning',
      duration: '2h 30m',
      modules: 7,
      progress: 0,
      status: 'not-started',
      level: 'Advanced',
      points: 325,
      earnedPoints: 0,
      dueDate: 'Optional',
      description: 'Build interactive dashboards and leverage AI-powered analytics.',
      skills: ['Einstein Analytics', 'Dashboards', 'AI', 'Data Visualization'],
      isAssigned: false,
    },
    {
      id: 106,
      title: 'Marketing Cloud Basics',
      provider: 'pluralsight',
      instructor: 'Jennifer Wu',
      duration: '4h 00m',
      modules: 12,
      progress: 0,
      status: 'not-started',
      level: 'Beginner',
      points: 275,
      earnedPoints: 0,
      dueDate: 'Optional',
      description: 'Introduction to Marketing Cloud email studio, journey builder, and automation.',
      skills: ['Marketing Cloud', 'Email Marketing', 'Journey Builder'],
      isAssigned: false,
    },
    {
      id: 107,
      title: 'Salesforce Mobile App Customization',
      provider: 'viva',
      instructor: 'Salesforce Trailhead',
      duration: '2h 15m',
      modules: 6,
      progress: 0,
      status: 'not-started',
      level: 'Intermediate',
      points: 200,
      earnedPoints: 0,
      dueDate: 'Optional',
      description: 'Customize the Salesforce mobile app for on-the-go productivity.',
      skills: ['Mobile', 'Mobile App', 'Customization'],
      isAssigned: false,
    },
    {
      id: 108,
      title: 'Salesforce CPQ Essentials',
      provider: 'pluralsight',
      instructor: 'David Chen',
      duration: '3h 20m',
      modules: 8,
      progress: 0,
      status: 'not-started',
      level: 'Advanced',
      points: 350,
      earnedPoints: 0,
      dueDate: 'Optional',
      description: 'Configure pricing, quoting, and product catalog management with CPQ.',
      skills: ['CPQ', 'Pricing', 'Quote Management', 'Product Catalog'],
      isAssigned: false,
    },
    {
      id: 109,
      title: 'Experience Cloud Site Building',
      provider: 'viva',
      instructor: 'Microsoft Learn',
      duration: '3h 00m',
      modules: 9,
      progress: 0,
      status: 'not-started',
      level: 'Intermediate',
      points: 300,
      earnedPoints: 0,
      dueDate: 'Optional',
      description: 'Build and customize community portals using Experience Cloud.',
      skills: ['Experience Cloud', 'Communities', 'Portal Development'],
      isAssigned: false,
    },
    {
      id: 110,
      title: 'Salesforce DevOps Fundamentals',
      provider: 'pluralsight',
      instructor: 'Alex Rivera',
      duration: '4h 30m',
      modules: 13,
      progress: 0,
      status: 'not-started',
      level: 'Advanced',
      points: 400,
      earnedPoints: 0,
      dueDate: 'Optional',
      description: 'Learn version control, CI/CD pipelines, and deployment strategies for Salesforce.',
      skills: ['DevOps', 'Git', 'CI/CD', 'Deployment'],
      isAssigned: false,
    },
  ];

  const pennyRecommendations = catalogCourses.filter(c => c.recommendedBy === 'penny').slice(0, 3);

  const currentCourses = activeTab === 'assigned' ? assignedCourses : catalogCourses;

  const filteredCourses = currentCourses.filter(course => {
    const matchesSearch = course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          course.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          course.skills.some(skill => skill.toLowerCase().includes(searchQuery.toLowerCase())) ||
                          course.instructor.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesSearch;
  });

  const allCourses = [...assignedCourses, ...catalogCourses];
  const stats = {
    totalCourses: assignedCourses.length,
    catalogCourses: catalogCourses.length,
    completed: assignedCourses.filter(c => c.status === 'completed').length,
    inProgress: assignedCourses.filter(c => c.status === 'in-progress').length,
    totalPoints: assignedCourses.reduce((acc, c) => acc + c.points, 0),
    earnedPoints: assignedCourses.reduce((acc, c) => acc + c.earnedPoints, 0),
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'in-progress':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'not-started':
        return 'bg-gray-100 text-gray-800 border-gray-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getProviderBadge = (provider: string) => {
    return provider === 'pluralsight' 
      ? 'bg-[#2C6975] text-white' 
      : 'bg-[#7EB5C1] text-white';
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-gray-900 mb-2">Learning Center</h1>
            <p className="text-gray-600">Access your Pluralsight IQ and Viva Learning courses</p>
          </div>
          <button
            onClick={() => onNavigate('learner')}
            className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
          >
            Back to Home
          </button>
        </div>

        {/* Penny AI Recommendations */}
        {showPennyRecommendations && activeTab === 'catalog' && (
          <div className="bg-gradient-to-r from-[#2C6975] to-[#7EB5C1] rounded-xl p-6 mb-6 text-white relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -mr-32 -mt-32"></div>
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/5 rounded-full -ml-24 -mb-24"></div>
            
            <button
              onClick={() => setShowPennyRecommendations(false)}
              className="absolute top-4 right-4 text-white/80 hover:text-white transition-colors"
            >
              ✕
            </button>

            <div className="relative">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center">
                  <Sparkles className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-white">Penny's Recommendations</h3>
                  <p className="text-sm text-white/80">Based on your progress and interests</p>
                </div>
              </div>

              <p className="text-white/90 mb-4 text-sm">
                Hi Jordan! Based on your strong performance in Automation & Process Builder (75% complete) and your completed Advanced Apex course, I think you'd excel in these courses:
              </p>

              <div className="grid md:grid-cols-3 gap-4">
                {pennyRecommendations.map((course) => (
                  <div key={course.id} className="bg-white/10 backdrop-blur-sm rounded-lg p-4 hover:bg-white/15 transition-colors cursor-pointer border border-white/20">
                    <div className="flex items-center space-x-2 mb-2">
                      <Star className="w-4 h-4 text-[#F9A03F]" />
                      <span className="text-xs text-white/80">{course.level}</span>
                    </div>
                    <h4 className="text-white text-sm mb-2">{course.title}</h4>
                    <p className="text-xs text-white/70 mb-3 line-clamp-2">{course.description}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-white/80">{course.duration}</span>
                      <span className="text-xs text-[#F9A03F]">{course.points} pts</span>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-4 pt-4 border-t border-white/20 flex items-center justify-between">
                <p className="text-sm text-white/80">Want personalized course recommendations?</p>
                <button className="px-4 py-2 bg-white/20 hover:bg-white/30 rounded-lg transition-colors text-sm backdrop-blur-sm">
                  Chat with Penny
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-6 gap-4 mb-6">
          <div className="bg-white rounded-xl border border-gray-200 p-4">
            <div className="flex items-center space-x-2 mb-2">
              <Book className="w-5 h-5 text-[#2C6975]" />
              <span className="text-sm text-gray-600">Assigned</span>
            </div>
            <p className="text-2xl text-gray-900">{stats.totalCourses}</p>
          </div>
          <div className="bg-white rounded-xl border border-gray-200 p-4">
            <div className="flex items-center space-x-2 mb-2">
              <Lightbulb className="w-5 h-5 text-[#F9A03F]" />
              <span className="text-sm text-gray-600">Catalog</span>
            </div>
            <p className="text-2xl text-gray-900">{stats.catalogCourses}</p>
          </div>
          <div className="bg-white rounded-xl border border-gray-200 p-4">
            <div className="flex items-center space-x-2 mb-2">
              <CheckCircle className="w-5 h-5 text-green-600" />
              <span className="text-sm text-gray-600">Completed</span>
            </div>
            <p className="text-2xl text-gray-900">{stats.completed}</p>
          </div>
          <div className="bg-white rounded-xl border border-gray-200 p-4">
            <div className="flex items-center space-x-2 mb-2">
              <TrendingUp className="w-5 h-5 text-blue-600" />
              <span className="text-sm text-gray-600">In Progress</span>
            </div>
            <p className="text-2xl text-gray-900">{stats.inProgress}</p>
          </div>
          <div className="bg-white rounded-xl border border-gray-200 p-4">
            <div className="flex items-center space-x-2 mb-2">
              <Award className="w-5 h-5 text-[#F9A03F]" />
              <span className="text-sm text-gray-600">Earned</span>
            </div>
            <p className="text-2xl text-gray-900">{stats.earnedPoints}</p>
          </div>
          <div className="bg-white rounded-xl border border-gray-200 p-4">
            <div className="flex items-center space-x-2 mb-2">
              <Target className="w-5 h-5 text-gray-600" />
              <span className="text-sm text-gray-600">Total Pts</span>
            </div>
            <p className="text-2xl text-gray-900">{stats.totalPoints}</p>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-xl border border-gray-200 p-2 mb-6 inline-flex">
          <button
            onClick={() => setActiveTab('assigned')}
            className={`px-6 py-2 rounded-lg transition-colors ${
              activeTab === 'assigned'
                ? 'bg-[#2C6975] text-white'
                : 'text-gray-700 hover:bg-gray-100'
            }`}
          >
            My Courses ({assignedCourses.length})
          </button>
          <button
            onClick={() => setActiveTab('catalog')}
            className={`px-6 py-2 rounded-lg transition-colors flex items-center space-x-2 ${
              activeTab === 'catalog'
                ? 'bg-[#2C6975] text-white'
                : 'text-gray-700 hover:bg-gray-100'
            }`}
          >
            <span>Course Catalog ({catalogCourses.length})</span>
            <Zap className="w-4 h-4 text-[#F9A03F]" />
          </button>
        </div>

        {/* Search */}
        <div className="bg-white rounded-xl border border-gray-200 p-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder={activeTab === 'assigned' ? 'Search your courses by title, instructor, skills, or topics...' : 'Search catalog courses by title, instructor, skills, or topics...'}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2C6975] focus:border-transparent"
            />
          </div>
        </div>
      </div>

      {/* Courses Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredCourses.map((course) => (
          <div
            key={course.id}
            className={`bg-white rounded-xl shadow-sm border p-6 hover:shadow-md transition-shadow ${
              course.recommendedBy === 'penny' && activeTab === 'catalog' ? 'border-[#F9A03F] border-2' : 'border-gray-200'
            }`}
          >
            {/* Course Header */}
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <div className="flex items-center flex-wrap gap-2 mb-3">
                  <span className={`inline-block px-3 py-1 rounded-full text-xs ${getProviderBadge(course.provider)}`}>
                    {course.provider === 'pluralsight' ? 'Pluralsight IQ' : 'Viva Learning'}
                  </span>
                  {course.isAssigned && (
                    <span className={`inline-block px-3 py-1 rounded-full border text-xs ${getStatusColor(course.status)}`}>
                      {course.status === 'in-progress' ? 'In Progress' : course.status === 'completed' ? 'Completed' : 'Not Started'}
                    </span>
                  )}
                  {course.recommendedBy === 'penny' && activeTab === 'catalog' && (
                    <span className="inline-block px-3 py-1 rounded-full bg-[#F9A03F]/10 text-[#F9A03F] text-xs flex items-center space-x-1">
                      <Sparkles className="w-3 h-3" />
                      <span>Penny Recommends</span>
                    </span>
                  )}
                  <span className="inline-block px-3 py-1 rounded-full bg-gray-100 text-gray-700 text-xs">
                    {course.level}
                  </span>
                </div>
                <h3 className="text-gray-900 mb-1">{course.title}</h3>
                <p className="text-sm text-gray-600 mb-2">{course.instructor}</p>
              </div>
            </div>

            {/* Course Description */}
            <p className="text-sm text-gray-600 mb-4">{course.description}</p>

            {/* Skills Tags */}
            <div className="flex flex-wrap gap-2 mb-4">
              {course.skills.map((skill, idx) => (
                <span
                  key={idx}
                  className="inline-block px-2 py-1 bg-[#7EB5C1]/10 text-[#2C6975] rounded text-xs"
                >
                  {skill}
                </span>
              ))}
            </div>

            {/* Course Details */}
            <div className="grid grid-cols-3 gap-4 mb-4 text-sm">
              <div>
                <div className="flex items-center space-x-1 text-gray-600 mb-1">
                  <Clock className="w-4 h-4" />
                  <span>Duration</span>
                </div>
                <p className="text-gray-900">{course.duration}</p>
              </div>
              <div>
                <div className="flex items-center space-x-1 text-gray-600 mb-1">
                  <Book className="w-4 h-4" />
                  <span>Modules</span>
                </div>
                <p className="text-gray-900">{course.modules}</p>
              </div>
              <div>
                <div className="flex items-center space-x-1 text-gray-600 mb-1">
                  <Award className="w-4 h-4" />
                  <span>Points</span>
                </div>
                <p className="text-gray-900">{course.isAssigned ? `${course.earnedPoints} / ` : ''}{course.points}</p>
              </div>
            </div>

            {/* Progress Bar */}
            {course.isAssigned && course.status !== 'not-started' && (
              <div className="mb-4">
                <div className="flex items-center justify-between mb-2 text-sm">
                  <span className="text-gray-600">Progress</span>
                  <span className="text-gray-900">{course.progress}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-[#2C6975] h-2 rounded-full transition-all duration-500"
                    style={{ width: `${course.progress}%` }}
                  ></div>
                </div>
              </div>
            )}

            {/* Course Footer */}
            <div className="flex items-center justify-between pt-4 border-t border-gray-200">
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                {course.status === 'completed' ? (
                  <span className="flex items-center space-x-1 text-green-600">
                    <CheckCircle className="w-4 h-4" />
                    <span>{course.dueDate}</span>
                  </span>
                ) : course.isAssigned ? (
                  <span>Due: {course.dueDate}</span>
                ) : (
                  <span className="text-[#F9A03F]">Optional Course</span>
                )}
              </div>
              <button className="flex items-center space-x-2 px-4 py-2 bg-[#2C6975] text-white rounded-lg hover:bg-[#234d56] transition-colors text-sm">
                {course.status === 'completed' ? (
                  <>
                    <span>Review</span>
                    <ExternalLink className="w-4 h-4" />
                  </>
                ) : course.status === 'in-progress' ? (
                  <>
                    <span>Continue</span>
                    <Play className="w-4 h-4" />
                  </>
                ) : (
                  <>
                    <span>Start Course</span>
                    <ChevronRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </div>
          </div>
        ))}
      </div>

      {filteredCourses.length === 0 && (
        <div className="bg-white rounded-xl border border-gray-200 p-12 text-center">
          <Book className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-gray-900 mb-2">No courses found</h3>
          <p className="text-gray-600">Try adjusting your search or filter criteria</p>
        </div>
      )}

      {/* Help Section */}
      {activeTab === 'catalog' && (
        <div className="mt-8 bg-gradient-to-r from-[#7EB5C1]/10 to-[#2C6975]/10 rounded-xl p-6 border border-[#2C6975]/20">
          <div className="flex items-start space-x-4">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#2C6975] to-[#7EB5C1] flex items-center justify-center flex-shrink-0">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <div className="flex-1">
              <h4 className="text-gray-900 mb-2">Need help choosing your next course?</h4>
              <p className="text-sm text-gray-600 mb-4">
                Penny can analyze your learning progress, skills gaps, and career goals to recommend the perfect courses from our catalog. You can also browse courses by topic, skill level, or learning provider.
              </p>
              <div className="flex flex-wrap gap-3">
                <button className="px-4 py-2 bg-[#2C6975] text-white rounded-lg hover:bg-[#234d56] transition-colors text-sm flex items-center space-x-2">
                  <Sparkles className="w-4 h-4" />
                  <span>Ask Penny for Recommendations</span>
                </button>
                <button className="px-4 py-2 border border-[#2C6975] text-[#2C6975] rounded-lg hover:bg-[#2C6975]/5 transition-colors text-sm">
                  Browse All Topics
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
