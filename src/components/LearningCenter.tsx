import { Book, Play, Clock, Award, ChevronRight, CheckCircle, ExternalLink, Search, TrendingUp, Target, Sparkles, Star, Zap, Lightbulb, BookOpen, Trophy, Users, GraduationCap, ArrowRight, Filter } from 'lucide-react';
import { PageType } from '../App';
import { useState } from 'react';
import { ProgressRing } from './ProgressRing';
import { Badge } from './ui/badge';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface LearningCenterProps {
  onNavigate: (page: PageType) => void;
}

export function LearningCenter({ onNavigate }: LearningCenterProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'free' | 'coaching' | 'certification'>('all');

  // Course categories for hero section
  const courseCategories = [
    {
      id: 'free' as const,
      title: 'Free Courses',
      description: 'Self-paced learning from PluralSight & Trailhead',
      icon: <BookOpen className="w-8 h-8" />,
      count: 24,
      color: 'from-[#7EB5C1] to-[#5a9fb0]',
      features: ['Self-paced', 'Unlimited access', 'Community support'],
    },
    {
      id: 'coaching' as const,
      title: 'Coaching Program',
      description: '1-on-1 guidance with expert coaches',
      icon: <Users className="w-8 h-8" />,
      count: 8,
      color: 'from-[#F9A03F] to-[#e89135]',
      features: ['Bi-weekly check-ins', 'Personalized feedback', 'Career guidance'],
    },
    {
      id: 'certification' as const,
      title: 'Certification Prep',
      description: 'Structured paths to Salesforce credentials',
      icon: <Award className="w-8 h-8" />,
      count: 12,
      color: 'from-[#2C6975] to-[#1f4f5a]',
      features: ['Exam-focused', 'Practice tests', 'Study materials'],
    },
  ];

  // Courses data
  const allCourses = [
    {
      id: 1,
      title: 'Salesforce Administrator Fundamentals',
      provider: 'pluralsight',
      category: 'free' as const,
      instructor: 'Don Robins',
      duration: '4h 32m',
      level: 'Beginner',
      rating: 4.8,
      students: 1240,
      progress: 75,
      thumbnail: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=400',
      description: 'Master the fundamentals of Salesforce administration',
      skills: ['User Management', 'Security', 'Data Management'],
    },
    {
      id: 2,
      title: 'Advanced Flow Builder Masterclass',
      provider: 'trailhead',
      category: 'coaching' as const,
      instructor: 'Sarah Martinez (Coach)',
      duration: '6 weeks',
      level: 'Intermediate',
      rating: 4.9,
      students: 45,
      progress: 30,
      thumbnail: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400',
      description: 'Build complex automations with expert coaching',
      skills: ['Flow Builder', 'Process Automation', 'Logic Design'],
    },
    {
      id: 3,
      title: 'Salesforce Admin Certification Boot Camp',
      provider: 'pluralsight',
      category: 'certification' as const,
      instructor: 'Tim Hynes',
      duration: '12 weeks',
      level: 'Intermediate',
      rating: 4.9,
      students: 320,
      progress: 68,
      thumbnail: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=400',
      description: 'Complete prep for your Salesforce Admin certification',
      skills: ['Exam Prep', 'Practice Tests', 'All Admin Topics'],
    },
    {
      id: 4,
      title: 'Data Management Essentials',
      provider: 'trailhead',
      category: 'free' as const,
      instructor: 'Emma Garcia',
      duration: '3h 15m',
      level: 'Beginner',
      rating: 4.7,
      students: 890,
      progress: 0,
      thumbnail: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400',
      description: 'Learn to manage and migrate Salesforce data effectively',
      skills: ['Data Import', 'Data Export', 'Data Loader'],
    },
    {
      id: 5,
      title: 'Lightning Web Components Deep Dive',
      provider: 'pluralsight',
      category: 'coaching' as const,
      instructor: 'Marcus Chen (Coach)',
      duration: '8 weeks',
      level: 'Advanced',
      rating: 4.8,
      students: 67,
      progress: 0,
      thumbnail: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=400',
      description: 'Master LWC with hands-on coaching and real projects',
      skills: ['LWC', 'JavaScript', 'Component Development'],
    },
    {
      id: 6,
      title: 'Platform App Builder Certification',
      provider: 'pluralsight',
      category: 'certification' as const,
      instructor: 'Jessica Park',
      duration: '10 weeks',
      level: 'Intermediate',
      rating: 4.8,
      students: 280,
      progress: 0,
      thumbnail: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400',
      description: 'Prepare for Platform App Builder certification',
      skills: ['App Development', 'Lightning', 'Custom Apps'],
    },
  ];

  // Filter courses by category
  const filteredCourses = selectedCategory === 'all' 
    ? allCourses 
    : allCourses.filter(course => course.category === selectedCategory);

  // Recommended courses based on skill goals
  const recommendedCourses = [
    {
      title: 'Security & Sharing Best Practices',
      reason: 'Fills your certification gap',
      priority: 'high' as const,
      duration: '2h 15m',
    },
    {
      title: 'Advanced Reporting Techniques',
      reason: 'Matches your career goals',
      priority: 'medium' as const,
      duration: '3h 30m',
    },
    {
      title: 'Integration Fundamentals',
      reason: 'Popular in your cohort',
      priority: 'low' as const,
      duration: '4h 00m',
    },
  ];

  return (
    <div className="min-h-screen bg-[#F5F3E8] dark:bg-slate-900">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-[#2C6975] to-[#3B6A52] dark:from-[#1e4a53] dark:to-[#2a5140] text-white overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <ImageWithFallback
            src="https://images.unsplash.com/photo-1645363308298-3a949c8bfd86?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsZWFybmluZyUyMGVkdWNhdGlvbiUyMHRlY2hub2xvZ3l8ZW58MXx8fHwxNzYyMzAyOTU1fDA&ixlib=rb-4.1.0&q=80&w=1080"
            alt="Learning"
            className="w-full h-full object-cover"
          />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center mb-12">
            <h1 className="text-5xl mb-4">Learn. Build. Lead.</h1>
            <p className="text-xl text-white/90 max-w-2xl mx-auto">
              Your journey to Salesforce mastery starts here. Choose from free courses, coaching programs, or certification prep.
            </p>
          </div>

          {/* Course Category Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {courseCategories.map((category) => {
              const isSelected = selectedCategory === category.id;
              return (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
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
                    <span className="text-sm text-white/60">courses</span>
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
                    <span>Explore</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-150" />
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Course Catalog (2 columns) */}
          <div className="lg:col-span-2 space-y-6">
            {/* Search and Filter */}
            <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-gray-200 dark:border-slate-700 p-4">
              <div className="flex items-center space-x-4">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 dark:text-slate-500" />
                  <input
                    type="text"
                    placeholder="Search courses, skills, or topics..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-slate-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2C6975] dark:focus:ring-[#7EB5C1] focus:border-transparent"
                  />
                </div>
                <button className="flex items-center space-x-2 px-4 py-2 border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-gray-700 dark:text-slate-300 rounded-lg hover:bg-gray-50 dark:hover:bg-slate-600 transition-colors">
                  <Filter className="w-4 h-4" />
                  <span>Filter</span>
                </button>
              </div>

              {/* Category Filter Pills */}
              {selectedCategory !== 'all' && (
                <div className="flex items-center space-x-2 mt-3">
                  <span className="text-sm text-gray-600 dark:text-slate-400">Viewing:</span>
                  <Badge variant="outline" className="bg-[#2C6975]/10 dark:bg-[#7EB5C1]/20 text-[#2C6975] dark:text-[#7EB5C1] border-[#2C6975] dark:border-[#7EB5C1]">
                    {selectedCategory === 'free' && '📚 Free Courses'}
                    {selectedCategory === 'coaching' && '👥 Coaching Program'}
                    {selectedCategory === 'certification' && '🏆 Certification Prep'}
                  </Badge>
                  <button
                    onClick={() => setSelectedCategory('all')}
                    className="text-sm text-[#2C6975] dark:text-[#7EB5C1] hover:underline"
                  >
                    Clear
                  </button>
                </div>
              )}
            </div>

            {/* Course Grid */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl text-gray-900 dark:text-white">
                  {selectedCategory === 'all' ? 'All Courses' : 
                   selectedCategory === 'free' ? 'Free Courses' :
                   selectedCategory === 'coaching' ? 'Coaching Programs' :
                   'Certification Prep'}
                </h2>
                <span className="text-sm text-gray-600 dark:text-slate-400">{filteredCourses.length} courses</span>
              </div>

              <div className="grid grid-cols-1 gap-4">
                {filteredCourses.map((course) => (
                  <div
                    key={course.id}
                    className="group bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-gray-200 dark:border-slate-700 p-4 hover:shadow-md hover:border-[#2C6975] dark:hover:border-[#7EB5C1] transition-all duration-150 cursor-pointer"
                  >
                    <div className="flex space-x-4">
                      {/* Thumbnail */}
                      <div className="w-40 h-28 flex-shrink-0 rounded-lg overflow-hidden bg-gray-100 dark:bg-slate-700">
                        <ImageWithFallback
                          src={course.thumbnail}
                          alt={course.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>

                      {/* Content */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between mb-2">
                          <div className="flex-1">
                            <div className="flex items-center space-x-2 mb-1">
                              <Badge variant="outline" className={`text-xs ${
                                course.provider === 'pluralsight' 
                                  ? 'bg-[#F9A03F]/10 text-[#F9A03F] border-[#F9A03F]/30 dark:bg-[#F9A03F]/20 dark:border-[#F9A03F]/50'
                                  : 'bg-[#2C6975]/10 dark:bg-[#7EB5C1]/20 text-[#2C6975] dark:text-[#7EB5C1] border-[#2C6975]/30 dark:border-[#7EB5C1]/50'
                              }`}>
                                {course.provider === 'pluralsight' ? '📚 PluralSight' : '🌲 Trailhead'}
                              </Badge>
                              <Badge variant="outline" className="text-xs bg-gray-100 dark:bg-slate-700 text-gray-700 dark:text-slate-300 border-gray-300 dark:border-slate-600">
                                {course.level}
                              </Badge>
                            </div>
                            <h3 className="text-gray-900 dark:text-white mb-1 group-hover:text-[#2C6975] dark:group-hover:text-[#7EB5C1] transition-colors duration-150">
                              {course.title}
                            </h3>
                            <p className="text-sm text-gray-600 dark:text-slate-400 mb-2">{course.instructor}</p>
                            <p className="text-sm text-gray-700 dark:text-slate-300 mb-3 line-clamp-1">{course.description}</p>
                          </div>
                        </div>

                        {/* Course Meta */}
                        <div className="flex items-center space-x-4 text-sm text-gray-600 dark:text-slate-400 mb-3">
                          <div className="flex items-center space-x-1">
                            <Clock className="w-4 h-4" />
                            <span>{course.duration}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Star className="w-4 h-4 text-[#F9A03F]" />
                            <span>{course.rating}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Users className="w-4 h-4" />
                            <span>{course.students.toLocaleString()}</span>
                          </div>
                        </div>

                        {/* Skills */}
                        <div className="flex flex-wrap gap-2 mb-3">
                          {course.skills.map((skill, idx) => (
                            <span
                              key={idx}
                              className="px-2 py-1 bg-gray-100 dark:bg-slate-700 text-gray-700 dark:text-slate-300 text-xs rounded"
                            >
                              {skill}
                            </span>
                          ))}
                        </div>

                        {/* Progress or CTA */}
                        {course.progress > 0 ? (
                          <div className="space-y-2">
                            <div className="flex items-center justify-between text-sm">
                              <span className="text-gray-600 dark:text-slate-400">Progress</span>
                              <span className="text-gray-900 dark:text-white">{course.progress}%</span>
                            </div>
                            <div className="w-full bg-gray-200 dark:bg-slate-700 rounded-full h-2">
                              <div
                                className="bg-gradient-to-r from-[#2C6975] to-[#7EB5C1] h-2 rounded-full transition-all duration-300"
                                style={{ width: `${course.progress}%` }}
                              ></div>
                            </div>
                            <button className="w-full mt-2 py-2 bg-[#2C6975] dark:bg-[#7EB5C1] text-white dark:text-slate-900 rounded-lg hover:bg-[#1f4f5a] dark:hover:bg-[#6a9fb0] transition-colors duration-150 flex items-center justify-center space-x-2">
                              <Play className="w-4 h-4" />
                              <span>Continue Learning</span>
                            </button>
                          </div>
                        ) : (
                          <button className="w-full py-2 border-2 border-[#2C6975] dark:border-[#7EB5C1] text-[#2C6975] dark:text-[#7EB5C1] rounded-lg hover:bg-[#2C6975] dark:hover:bg-[#7EB5C1] hover:text-white dark:hover:text-slate-900 transition-all duration-150 flex items-center justify-center space-x-2 group/btn">
                            <BookOpen className="w-4 h-4" />
                            <span>Start Course</span>
                            <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform duration-150" />
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Sidebar - Recommendations */}
          <div className="lg:col-span-1 space-y-6">
            {/* Penny Recommendations */}
            <div className="bg-gradient-to-br from-[#F9A03F]/10 to-[#2C6975]/10 dark:from-[#F9A03F]/20 dark:to-[#7EB5C1]/20 rounded-xl border-2 border-[#F9A03F]/30 dark:border-[#F9A03F]/50 p-6 sticky top-20">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#F9A03F] to-[#e89135] flex items-center justify-center">
                  <Sparkles className="w-5 h-5 text-white" />
                </div>
                <h3 className="text-lg text-gray-900 dark:text-white">Recommended for You</h3>
              </div>

              <p className="text-sm text-gray-600 dark:text-slate-300 mb-4">
                Based on your Salesforce Admin trail and certification goals
              </p>

              <div className="space-y-3">
                {recommendedCourses.map((rec, idx) => (
                  <div
                    key={idx}
                    className={`p-4 rounded-lg border-2 cursor-pointer hover:shadow-md transition-all duration-150 ${
                      rec.priority === 'high'
                        ? 'bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-700'
                        : rec.priority === 'medium'
                        ? 'bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-700'
                        : 'bg-gray-50 dark:bg-slate-700 border-gray-200 dark:border-slate-600'
                    }`}
                  >
                    <div className="flex items-start space-x-2 mb-2">
                      {rec.priority === 'high' && (
                        <Zap className="w-4 h-4 text-red-600 dark:text-red-400 flex-shrink-0 mt-0.5" />
                      )}
                      {rec.priority === 'medium' && (
                        <TrendingUp className="w-4 h-4 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" />
                      )}
                      {rec.priority === 'low' && (
                        <Lightbulb className="w-4 h-4 text-gray-600 dark:text-gray-400 flex-shrink-0 mt-0.5" />
                      )}
                      <div className="flex-1">
                        <h4 className="text-sm text-gray-900 dark:text-white mb-1">{rec.title}</h4>
                        <p className="text-xs text-gray-600 dark:text-slate-300 mb-2">{rec.reason}</p>
                        <div className="flex items-center space-x-2 text-xs text-gray-500 dark:text-slate-400">
                          <Clock className="w-3 h-3" />
                          <span>{rec.duration}</span>
                        </div>
                      </div>
                    </div>
                    <button className="w-full mt-2 text-xs py-2 bg-white dark:bg-slate-600 border border-gray-300 dark:border-slate-500 text-gray-700 dark:text-white rounded-lg hover:bg-gray-50 dark:hover:bg-slate-500 transition-colors duration-150">
                      View Course
                    </button>
                  </div>
                ))}
              </div>

              <button className="w-full mt-4 py-2 bg-gradient-to-r from-[#2C6975] to-[#7EB5C1] text-white rounded-lg hover:from-[#1f4f5a] hover:to-[#6a9fb0] transition-all duration-150 flex items-center justify-center space-x-2">
                <Sparkles className="w-4 h-4" />
                <span>Get More Recommendations</span>
              </button>
            </div>

            {/* Learning Stats */}
            <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-gray-200 dark:border-slate-700 p-6">
              <h3 className="text-lg text-gray-900 dark:text-white mb-4">Your Learning Stats</h3>
              
              <div className="space-y-4">
                <div>
                  <div className="flex items-center justify-between text-sm mb-2">
                    <span className="text-gray-600 dark:text-slate-400">Courses in Progress</span>
                    <span className="text-gray-900 dark:text-white">3</span>
                  </div>
                  <div className="flex items-center justify-between text-sm mb-2">
                    <span className="text-gray-600 dark:text-slate-400">Completed This Month</span>
                    <span className="text-gray-900 dark:text-white">2</span>
                  </div>
                  <div className="flex items-center justify-between text-sm mb-2">
                    <span className="text-gray-600 dark:text-slate-400">Learning Streak</span>
                    <span className="text-gray-900 dark:text-white">12 days 🔥</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600 dark:text-slate-400">Total Hours</span>
                    <span className="text-gray-900 dark:text-white">47.5</span>
                  </div>
                </div>

                <div className="pt-4 border-t border-gray-200 dark:border-slate-700">
                  <button
                    onClick={() => onNavigate('trail-missions')}
                    className="w-full py-2 bg-[#2C6975]/10 dark:bg-[#7EB5C1]/20 text-[#2C6975] dark:text-[#7EB5C1] rounded-lg hover:bg-[#2C6975]/20 dark:hover:bg-[#7EB5C1]/30 transition-colors duration-150 flex items-center justify-center space-x-2"
                  >
                    <Target className="w-4 h-4" />
                    <span>View Trail Missions</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
