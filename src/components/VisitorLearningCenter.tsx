import { Lock, Play, Clock, CheckCircle, Trophy, TrendingUp, ArrowRight, Sparkles, Mountain, Compass, Map, Star, MessageCircle, Users, BookOpen, Award, Zap } from 'lucide-react';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { useState, useEffect } from 'react';
import { ExplorationMeter } from './ExplorationMeter';
import { UpgradePromptModal } from './UpgradePromptModal';
import { ProgressiveFeatureLock } from './ProgressiveFeatureLock';

interface VisitorLearningCenterProps {
  onEnroll: () => void;
}

export function VisitorLearningCenter({ onEnroll }: VisitorLearningCenterProps) {
  const [explorationPoints, setExplorationPoints] = useState(0);
  const [completedPreviews, setCompletedPreviews] = useState<number[]>([]);
  const [showBadge, setShowBadge] = useState(false);
  const [showConversionModal, setShowConversionModal] = useState(false);
  const [selectedPennyPrompt, setSelectedPennyPrompt] = useState('');
  const [showUpgradeModal, setShowUpgradeModal] = useState(false);
  
  // Check if user should see upgrade prompt (70% progress)
  useEffect(() => {
    const progressPercent = (explorationPoints / 500) * 100;
    if (progressPercent >= 70 && !showUpgradeModal) {
      setTimeout(() => {
        setShowUpgradeModal(true);
      }, 2000);
    }
  }, [explorationPoints]);

  const freeCourses = [
    {
      id: 1,
      title: 'Intro to Salesforce for Nonprofits',
      description: 'Learn the fundamentals of Salesforce and why it powers mission-driven organizations worldwide',
      duration: '45 min',
      modules: 5,
      difficulty: 'Beginner',
      color: '#2C6975',
      locked: false,
      previewPoints: 20
    },
    {
      id: 2,
      title: 'What Is a Digital Experience?',
      description: 'Discover how digital experiences transform the way organizations connect with their communities',
      duration: '30 min',
      modules: 4,
      difficulty: 'Beginner',
      color: '#7EB5C1',
      locked: false,
      previewPoints: 20
    },
    {
      id: 3,
      title: 'Building Community with Slack',
      description: 'Master community building through effective Slack communication and collaboration',
      duration: '35 min',
      modules: 4,
      difficulty: 'Beginner',
      color: '#3B6A52',
      locked: true,
      previewPoints: 0
    }
  ];

  const lockedCourses = [
    {
      id: 4,
      title: 'Salesforce Admin Essentials',
      description: 'Complete certification preparation path',
      duration: '12 weeks',
      modules: 48,
      difficulty: 'Intermediate',
      color: '#2C6975'
    },
    {
      id: 5,
      title: 'Data Modeling & Automation',
      description: 'Master Process Builder, Flows, and Apex triggers',
      duration: '8 weeks',
      modules: 32,
      difficulty: 'Advanced',
      color: '#7EB5C1'
    },
    {
      id: 6,
      title: 'Capstone Project Workshop',
      description: 'Build real Salesforce applications for nonprofits',
      duration: '10 weeks',
      modules: 20,
      difficulty: 'Advanced',
      color: '#F9A03F'
    }
  ];

  const handlePreview = (courseId: number, points: number, locked: boolean) => {
    if (locked) {
      return;
    }
    
    if (!completedPreviews.includes(courseId)) {
      setCompletedPreviews([...completedPreviews, courseId]);
      const newPoints = explorationPoints + points;
      setExplorationPoints(newPoints);
      
      if (completedPreviews.length === 0) {
        setShowBadge(true);
        setTimeout(() => setShowBadge(false), 5000);
      }
      
      setTimeout(() => {
        setShowConversionModal(true);
      }, 2000);
    }
  };

  return (
    <div className="min-h-screen bg-[#F5F3E8] dark:bg-slate-900">
      {/* Visitor Banner */}
      <div className="bg-gradient-to-r from-[#7EB5C1] to-[#2C6975] text-white py-4 px-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Sparkles className="w-5 h-5" />
            <div>
              <p className="text-sm">You're exploring as a Visitor</p>
              <p className="text-xs text-white/80">Unlock all Trails by joining the Academy</p>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <div className="text-right hidden sm:block">
              <p className="text-xs text-white/80">Exploration Points</p>
              <p className="font-medium">{explorationPoints} / 50</p>
            </div>
            <button
              onClick={onEnroll}
              className="px-6 py-2 bg-[#F9A03F] text-white rounded-lg hover:bg-[#e89135] transition-colors"
            >
              Enroll Now
            </button>
          </div>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="bg-white border-b border-gray-200 py-4 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-gray-700">
              You've explored {Math.round((explorationPoints / 40) * 100)}% of your Visitor Trail
            </span>
            <span className="text-sm text-gray-600">{explorationPoints} / 40 points</span>
          </div>
          <div className="relative">
            <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-[#F9A03F] to-[#e89135] transition-all duration-500 rounded-full"
                style={{ width: `${(explorationPoints / 40) * 100}%` }}
              ></div>
            </div>
          </div>
          {explorationPoints >= 40 && (
            <div className="mt-3 p-3 bg-[#F9A03F]/10 border border-[#F9A03F]/30 rounded-lg">
              <div className="flex items-center space-x-2">
                <Trophy className="w-5 h-5 text-[#F9A03F]" />
                <p className="text-sm text-gray-900">
                  Congratulations! You've completed your Visitor Trail. <button onClick={onEnroll} className="text-[#2C6975] underline">Unlock full access now!</button>
                </p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* NEW: Three Paths Hero Section */}
        <div className="mb-16">
          {/* Header with Mountain Silhouette Background */}
          <div className="relative bg-gradient-to-br from-[#7EB5C1] to-[#F5F3E8] rounded-2xl overflow-hidden p-12 mb-12">
            {/* Decorative Mountain Silhouette */}
            <div className="absolute bottom-0 left-0 right-0 opacity-10">
              <svg viewBox="0 0 1200 300" className="w-full h-32">
                <path d="M0,300 L0,150 L200,80 L400,120 L600,40 L800,100 L1000,60 L1200,140 L1200,300 Z" fill="currentColor" className="text-[#3B6A52]"/>
                <path d="M0,300 L0,200 L300,150 L500,180 L700,130 L900,170 L1200,150 L1200,300 Z" fill="currentColor" className="text-[#2C6975]"/>
              </svg>
            </div>
            
            <div className="relative z-10 text-center max-w-3xl mx-auto">
              <h1 className="text-5xl text-gray-900 mb-4">
                Explore Your Path to Salesforce Mastery.
              </h1>
              <p className="text-xl text-gray-700">
                As a visitor, you can preview three ways to start your journey — from guided introductions to full Academy membership.
              </p>
            </div>

            {/* Decorative Path Line */}
            <div className="absolute bottom-8 left-0 right-0 flex items-center justify-center opacity-20">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 rounded-full bg-[#3B6A52]"></div>
                <div className="w-32 h-0.5 bg-[#3B6A52]"></div>
                <div className="w-3 h-3 rounded-full bg-[#F9A03F]"></div>
                <div className="w-32 h-0.5 bg-[#F9A03F]"></div>
                <div className="w-3 h-3 rounded-full bg-[#7EB5C1]"></div>
              </div>
            </div>
          </div>

          {/* Three Path Cards */}
          <div className="grid md:grid-cols-3 gap-8">
            {/* Card 1: The Guided Trail */}
            <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg border-2 border-gray-200 dark:border-slate-700 overflow-hidden hover:shadow-xl hover:border-[#3B6A52] dark:hover:border-[#3B6A52] transition-all duration-300 group">
              <div className="bg-gradient-to-br from-[#3B6A52] to-[#2C6975] p-8 text-center">
                <div className="w-20 h-20 rounded-full bg-white dark:bg-slate-200 flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                  <Map className="w-10 h-10 text-[#3B6A52]" />
                </div>
                <h3 className="text-2xl text-white mb-2">The Guided Trail</h3>
              </div>
              
              <div className="p-8">
                <p className="text-gray-700 dark:text-slate-300 mb-6 min-h-[60px]">
                  Start with beginner-friendly, self-paced content and explore at your own pace.
                </p>
                
                <div className="space-y-3 mb-8">
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="w-5 h-5 text-green-600 dark:text-green-400 flex-shrink-0 mt-0.5" />
                    <span className="text-sm text-gray-700 dark:text-slate-300">3 Free Intro Courses</span>
                  </div>
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="w-5 h-5 text-green-600 dark:text-green-400 flex-shrink-0 mt-0.5" />
                    <span className="text-sm text-gray-700 dark:text-slate-300">Penny's Starter Tips</span>
                  </div>
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="w-5 h-5 text-green-600 dark:text-green-400 flex-shrink-0 mt-0.5" />
                    <span className="text-sm text-gray-700 dark:text-slate-300">Visitor Slack Access</span>
                  </div>
                </div>

                <button className="w-full px-6 py-3 bg-[#F9A03F] text-white rounded-lg hover:bg-[#e89135] transition-all hover:shadow-lg flex items-center justify-center space-x-2">
                  <span>Start Guided Trail</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Card 2: Trail of Mastery */}
            <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg border-2 border-gray-200 dark:border-slate-700 overflow-hidden hover:shadow-xl hover:border-[#F9A03F] dark:hover:border-[#F9A03F] transition-all duration-300 group">
              <div className="bg-gradient-to-br from-[#F9A03F] to-[#e89135] p-8 text-center">
                <div className="w-20 h-20 rounded-full bg-white flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                  <Mountain className="w-10 h-10 text-[#F9A03F]" />
                </div>
                <h3 className="text-2xl text-white mb-2">Trail of Mastery</h3>
              </div>
              
              <div className="p-8">
                <p className="text-gray-700 mb-6 min-h-[60px]">
                  Advance toward Salesforce Admin Certification with mentorship and structured learning.
                </p>
                
                <div className="space-y-3 mb-8">
                  <div className="flex items-start space-x-3">
                    <Compass className="w-5 h-5 text-[#F9A03F] flex-shrink-0 mt-0.5" />
                    <span className="text-sm text-gray-700">Coaching snapshots</span>
                  </div>
                  <div className="flex items-start space-x-3">
                    <BookOpen className="w-5 h-5 text-[#F9A03F] flex-shrink-0 mt-0.5" />
                    <span className="text-sm text-gray-700">Certification roadmap preview</span>
                  </div>
                  <div className="flex items-start space-x-3">
                    <Award className="w-5 h-5 text-[#F9A03F] flex-shrink-0 mt-0.5" />
                    <span className="text-sm text-gray-700">Real-world scenarios</span>
                  </div>
                </div>

                <button className="w-full px-6 py-3 bg-white border-2 border-[#F9A03F] text-[#F9A03F] rounded-lg hover:bg-[#F9A03F] hover:text-white transition-all flex items-center justify-center space-x-2 group/btn">
                  <span>Learn About Trail of Mastery</span>
                  <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>

            {/* Card 3: Explorer's Journey */}
            <div className="bg-white rounded-2xl shadow-lg border-2 border-gray-200 overflow-hidden hover:shadow-xl hover:border-[#7EB5C1] transition-all duration-300 group relative">
              {/* Popular Badge */}
              <div className="absolute top-4 right-4 z-10">
                <Badge className="bg-[#F9A03F] text-white shadow-lg">
                  <Sparkles className="w-3 h-3 mr-1" />
                  Most Popular
                </Badge>
              </div>

              <div className="bg-gradient-to-br from-[#7EB5C1] to-[#2C6975] p-8 text-center">
                <div className="w-20 h-20 rounded-full bg-white flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                  <Star className="w-10 h-10 text-[#7EB5C1]" />
                </div>
                <h3 className="text-2xl text-white mb-2">Explorer's Journey</h3>
              </div>
              
              <div className="p-8">
                <p className="text-gray-700 mb-6 min-h-[60px]">
                  Subscribe for full access to the Academy, events, and community engagement.
                </p>
                
                <div className="space-y-3 mb-8">
                  <div className="flex items-start space-x-3">
                    <Zap className="w-5 h-5 text-[#7EB5C1] flex-shrink-0 mt-0.5" />
                    <span className="text-sm text-gray-700">Monthly or Yearly membership</span>
                  </div>
                  <div className="flex items-start space-x-3">
                    <Users className="w-5 h-5 text-[#7EB5C1] flex-shrink-0 mt-0.5" />
                    <span className="text-sm text-gray-700">Community Slack channels</span>
                  </div>
                  <div className="flex items-start space-x-3">
                    <Trophy className="w-5 h-5 text-[#7EB5C1] flex-shrink-0 mt-0.5" />
                    <span className="text-sm text-gray-700">Merch & rewards eligibility</span>
                  </div>
                </div>

                <button 
                  onClick={onEnroll}
                  className="w-full px-6 py-3 bg-gradient-to-r from-[#F9A03F] to-[#e89135] text-white rounded-lg hover:shadow-lg transition-all flex items-center justify-center space-x-2 transform hover:scale-105"
                >
                  <span>Join the Academy</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Footer Note with Divider */}
          <div className="mt-12 text-center">
            {/* Decorative Trail Pattern Divider */}
            <div className="flex items-center justify-center mb-6">
              <div className="flex-1 h-px bg-gradient-to-r from-transparent via-[#3B6A52] to-transparent max-w-md"></div>
              <div className="mx-4">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="text-[#3B6A52]">
                  <path d="M12 2L15 8L21 9L16 14L18 21L12 17L6 21L8 14L3 9L9 8L12 2Z" fill="currentColor" opacity="0.3"/>
                </svg>
              </div>
              <div className="flex-1 h-px bg-gradient-to-r from-transparent via-[#3B6A52] to-transparent max-w-md"></div>
            </div>
            
            <p className="text-gray-600">
              Already a member?{' '}
              <button onClick={onEnroll} className="text-[#2C6975] hover:text-[#3B6A52] underline transition-colors">
                Sign in
              </button>
              {' '}to unlock your dashboard.
            </p>
          </div>
        </div>

        {/* Penny Visitor Widget */}
        <div className="mb-12">
          <div className="bg-gradient-to-r from-[#7EB5C1]/10 to-[#7EB5C1]/5 border-2 border-[#7EB5C1]/30 rounded-xl p-6 hover:shadow-lg transition-all">
            <div className="flex items-start space-x-4">
              <div className="relative group/penny">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#7EB5C1] to-[#2C6975] flex items-center justify-center flex-shrink-0 ring-4 ring-[#7EB5C1]/20 group-hover/penny:ring-[#7EB5C1]/40 transition-all">
                  <Sparkles className="w-6 h-6 text-white group-hover/penny:animate-pulse" />
                </div>
                {/* Friendly wave animation on hover */}
                <div className="absolute -top-2 -right-2 text-2xl opacity-0 group-hover/penny:opacity-100 group-hover/penny:animate-wave transition-all">
                  👋
                </div>
              </div>
              <div className="flex-1">
                <div className="flex items-center space-x-2 mb-2">
                  <h3 className="text-gray-900">Want help choosing your next step?</h3>
                  <Badge className="bg-[#7EB5C1] text-white">Visitor Guide</Badge>
                </div>
                <p className="text-sm text-gray-700 mb-4">
                  Hi! I'm Penny, your AI guide. I can help you decide which path is right for you.
                </p>
                <div className="flex flex-wrap gap-2">
                  <button 
                    onClick={() => setSelectedPennyPrompt('Which trail should I start with?')}
                    className={`px-4 py-2 bg-white border-2 text-gray-700 rounded-lg hover:bg-[#7EB5C1]/10 hover:border-[#7EB5C1] text-sm transition-all ${
                      selectedPennyPrompt === 'Which trail should I start with?' ? 'border-[#7EB5C1] bg-[#7EB5C1]/10' : 'border-gray-300'
                    }`}
                  >
                    Which trail should I start with?
                  </button>
                  <button 
                    onClick={() => setSelectedPennyPrompt("What's in the Explorer's Journey?")}
                    className={`px-4 py-2 bg-white border-2 text-gray-700 rounded-lg hover:bg-[#7EB5C1]/10 hover:border-[#7EB5C1] text-sm transition-all ${
                      selectedPennyPrompt === "What's in the Explorer's Journey?" ? 'border-[#7EB5C1] bg-[#7EB5C1]/10' : 'border-gray-300'
                    }`}
                  >
                    What's in the Explorer's Journey?
                  </button>
                </div>
                
                {/* Response area */}
                {selectedPennyPrompt && (
                  <div className="mt-4 p-4 bg-white rounded-lg border border-[#7EB5C1]/30 animate-in fade-in slide-in-from-top-2 duration-300">
                    <div className="flex items-start space-x-2">
                      <MessageCircle className="w-4 h-4 text-[#7EB5C1] flex-shrink-0 mt-0.5" />
                      <div className="flex-1">
                        <p className="text-sm text-gray-900 mb-2">
                          <strong>Penny:</strong>
                        </p>
                        {selectedPennyPrompt === 'Which trail should I start with?' && (
                          <p className="text-sm text-gray-700">
                            Great question! If you're brand new to Salesforce, I recommend starting with <strong>The Guided Trail</strong> — it's completely free and gives you a solid foundation. 
                            If you're ready to commit to certification, the <strong>Explorer's Journey</strong> membership gets you everything you need, including coaching and community support!
                          </p>
                        )}
                        {selectedPennyPrompt === "What's in the Explorer's Journey?" && (
                          <p className="text-sm text-gray-700">
                            The Explorer's Journey is our full Academy membership! You'll get unlimited access to all courses, 1:1 coaching sessions, community Slack channels, 
                            capstone projects with real nonprofits, and you can even earn points to redeem for free Trail merch. It's the complete package for serious learners! 🎯
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Preview Courses */}
        <div className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl text-gray-900">Free Preview Courses</h2>
            <div className="bg-white border border-[#F9A03F]/30 rounded-lg px-4 py-2">
              <p className="text-sm text-gray-700">
                Unlock <span className="text-[#F9A03F]">20+ more courses</span> by joining the Academy
              </p>
            </div>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {freeCourses.map((course) => (
              <div 
                key={course.id} 
                className={`bg-white rounded-xl shadow-sm border-2 overflow-hidden transition-all ${
                  course.locked 
                    ? 'border-gray-300 opacity-80' 
                    : 'border-gray-200 hover:shadow-md hover:border-[#F9A03F]/30'
                }`}
              >
                <div 
                  className="h-3"
                  style={{ backgroundColor: course.color }}
                ></div>
                <div className="p-6 relative">
                  <div className="flex items-start justify-between mb-3">
                    <Badge className="text-xs" style={{ backgroundColor: `${course.color}20`, color: course.color }}>
                      {course.difficulty}
                    </Badge>
                    {course.locked ? (
                      <Lock className="w-5 h-5 text-gray-400" />
                    ) : completedPreviews.includes(course.id) ? (
                      <CheckCircle className="w-5 h-5 text-green-500" />
                    ) : null}
                  </div>
                  <h3 className="text-gray-900 mb-2">{course.title}</h3>
                  <p className="text-sm text-gray-600 mb-4">{course.description}</p>
                  <div className="flex items-center space-x-4 text-xs text-gray-500 mb-4">
                    <div className="flex items-center space-x-1">
                      <Clock className="w-3 h-3" />
                      <span>{course.duration}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <TrendingUp className="w-3 h-3" />
                      <span>{course.modules} modules</span>
                    </div>
                  </div>
                  
                  {course.locked ? (
                    <>
                      <button
                        disabled
                        className="w-full py-2 bg-gray-200 text-gray-500 rounded-lg cursor-not-allowed flex items-center justify-center space-x-2 relative group"
                      >
                        <Lock className="w-4 h-4" />
                        <span>Locked</span>
                      </button>
                      <div className="mt-2 text-center">
                        <p className="text-xs text-gray-500 mb-1">Available after enrollment</p>
                      </div>
                    </>
                  ) : (
                    <>
                      <button
                        onClick={() => handlePreview(course.id, course.previewPoints, course.locked)}
                        className="w-full py-2 bg-[#3B6A52] text-white rounded-lg hover:bg-[#2d5240] transition-colors flex items-center justify-center space-x-2"
                      >
                        <Play className="w-4 h-4" />
                        <span>{completedPreviews.includes(course.id) ? 'Review' : 'Preview'} Course</span>
                      </button>
                      {!completedPreviews.includes(course.id) && (
                        <p className="text-xs text-gray-500 text-center mt-2">
                          +{course.previewPoints} exploration points
                        </p>
                      )}
                    </>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Locked Premium Courses */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl text-gray-900">Premium Learning Paths</h2>
            <Badge className="bg-[#F9A03F] text-white">Unlock with Enrollment</Badge>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {lockedCourses.map((course) => (
              <div key={course.id} className="bg-white rounded-xl shadow-sm border-2 border-gray-300 overflow-hidden opacity-60 relative">
                <div 
                  className="h-3"
                  style={{ backgroundColor: course.color }}
                ></div>
                <div className="p-6">
                  <div className="flex items-start justify-between mb-3">
                    <Badge className="text-xs bg-gray-200 text-gray-600">
                      {course.difficulty}
                    </Badge>
                    <Lock className="w-5 h-5 text-gray-400" />
                  </div>
                  <h3 className="text-gray-900 mb-2">{course.title}</h3>
                  <p className="text-sm text-gray-600 mb-4">{course.description}</p>
                  <div className="flex items-center space-x-4 text-xs text-gray-500 mb-4">
                    <div className="flex items-center space-x-1">
                      <Clock className="w-3 h-3" />
                      <span>{course.duration}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <TrendingUp className="w-3 h-3" />
                      <span>{course.modules} modules</span>
                    </div>
                  </div>
                  <button
                    disabled
                    className="w-full py-2 bg-gray-200 text-gray-500 rounded-lg cursor-not-allowed flex items-center justify-center space-x-2"
                  >
                    <Lock className="w-4 h-4" />
                    <span>Locked</span>
                  </button>
                </div>
                <div className="absolute inset-0 bg-white/40 backdrop-blur-[1px] flex items-center justify-center">
                  <button
                    onClick={onEnroll}
                    className="px-6 py-3 bg-[#F9A03F] text-white rounded-lg hover:bg-[#e89135] transition-all shadow-lg hover:shadow-xl"
                  >
                    Enroll to Unlock
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Banner */}
        <div className="bg-gradient-to-r from-[#2C6975] to-[#3B6A52] text-white rounded-xl p-8 text-center">
          <Trophy className="w-12 h-12 text-[#F9A03F] mx-auto mb-4" />
          <h3 className="text-2xl mb-3">Ready to continue your journey?</h3>
          <p className="text-white/90 mb-6 max-w-2xl mx-auto">
            Enroll in the Trail of Mastery to unlock all learning paths, personalized coaching, 
            capstone projects, and full Penny AI mentoring.
          </p>
          <button
            onClick={onEnroll}
            className="px-8 py-3 bg-[#F9A03F] text-white rounded-lg hover:bg-[#e89135] transition-all inline-flex items-center space-x-2"
          >
            <span>Enroll in the Academy</span>
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Trail Explorer Badge */}
      {showBadge && (
        <div className="fixed bottom-24 right-4 z-50 animate-fade-in">
          <div className="bg-white rounded-xl shadow-2xl border-2 border-[#F9A03F] p-6 max-w-sm">
            <div className="flex items-start space-x-4">
              <div className="relative">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#F9A03F] to-[#e89135] flex items-center justify-center">
                  <Trophy className="w-8 h-8 text-white" />
                </div>
                {/* Confetti */}
                <div className="absolute inset-0 pointer-events-none">
                  <div className="absolute top-0 left-0 w-2 h-2 bg-[#F9A03F] rounded-full animate-confetti-1"></div>
                  <div className="absolute top-0 right-0 w-2 h-2 bg-[#7EB5C1] rounded-full animate-confetti-2"></div>
                  <div className="absolute bottom-0 left-0 w-1.5 h-1.5 bg-[#3B6A52] rounded-full animate-confetti-3"></div>
                  <div className="absolute bottom-0 right-0 w-1.5 h-1.5 bg-[#F9A03F] rounded-full animate-confetti-4"></div>
                </div>
              </div>
              <div className="flex-1">
                <div className="flex items-center space-x-2 mb-2">
                  <Badge className="bg-[#F9A03F] text-white">Trail Explorer Badge</Badge>
                  <Sparkles className="w-4 h-4 text-[#F9A03F]" />
                </div>
                <h4 className="text-gray-900 mb-1">You've completed your first Trail!</h4>
                <p className="text-sm text-gray-600">
                  Earn your next badge by joining the Academy
                </p>
              </div>
            </div>
            {/* Progress Gauge */}
            <div className="mt-4">
              <div className="relative w-full h-2 bg-[#F5F3E8] rounded-full overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-[#F9A03F] to-[#e89135] transition-all duration-1000"
                  style={{ width: `${(completedPreviews.length / 2) * 100}%` }}
                ></div>
              </div>
              <p className="text-xs text-gray-500 text-center mt-1">
                {completedPreviews.length} of 2 preview courses completed
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Conversion Modal */}
      {showConversionModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-[#F5F3E8] rounded-xl shadow-2xl max-w-lg w-full p-8 animate-fade-in">
            <div className="text-center mb-6">
              <div className="w-20 h-20 rounded-full bg-gradient-to-br from-[#F9A03F] to-[#e89135] mx-auto mb-4 flex items-center justify-center">
                <Trophy className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-2xl text-gray-900 mb-2">Continue Your Journey!</h3>
              <p className="text-gray-700">
                Enroll today to unlock your Capstone project and full Penny AI access
              </p>
            </div>

            <div className="bg-white rounded-lg p-4 mb-6">
              <h4 className="text-gray-900 mb-3">What You'll Unlock:</h4>
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  <span className="text-sm text-gray-700">Real nonprofit Capstone projects</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  <span className="text-sm text-gray-700">Full Penny AI mentoring</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  <span className="text-sm text-gray-700">1:1 coaching sessions</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  <span className="text-sm text-gray-700">20+ learning modules</span>
                </div>
              </div>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => setShowConversionModal(false)}
                className="flex-1 px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Continue Exploring
              </button>
              <button
                onClick={onEnroll}
                className="flex-1 px-6 py-3 bg-[#F9A03F] text-white rounded-lg hover:bg-[#e89135] transition-colors flex items-center justify-center space-x-2"
              >
                <span>Enroll Now</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Upgrade Prompt Modal */}
      <UpgradePromptModal
        isOpen={showUpgradeModal}
        onClose={() => setShowUpgradeModal(false)}
        onUpgrade={onEnroll}
        triggerReason="progress"
        visitorProgress={(explorationPoints / 500) * 100}
        visitorName="Alex" // In production: from current user
      />
    </div>
  );
}
