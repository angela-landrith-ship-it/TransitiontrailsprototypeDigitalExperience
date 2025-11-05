import { Home, Users, Settings, MessageCircle, Bell, ChevronDown, GraduationCap, Sparkles } from 'lucide-react';
import { PageType } from '../App';
import { useState } from 'react';
import { Badge } from './ui/badge';

interface NavigationProps {
  activePage: PageType;
  setActivePage: (page: PageType) => void;
}

export function Navigation({ activePage, setActivePage }: NavigationProps) {
  const [showNotifications, setShowNotifications] = useState(false);
  const [showLearningDropdown, setShowLearningDropdown] = useState(false);
  
  // Role management (in production, this would come from user context/auth)
  const userRole = {
    isLearner: true,
    isCoach: true, // Set to true for demo - would be based on actual user role
    isAdmin: true, // Set to true for demo - would be based on actual user role
  };
  
  // Slack notifications (unread count)
  const slackNotifications = [
    { id: 1, type: 'mention', message: 'Sarah Martinez mentioned you in #trail-mastery', time: '5 min ago' },
    { id: 2, type: 'dm', message: 'New message from Penny AI', time: '10 min ago' },
    { id: 3, type: 'session', message: 'Study Group starts in 30 minutes', time: '30 min ago' }
  ];

  const learningPages = [
    { id: 'trail-missions' as PageType, label: 'Trail Missions', icon: '🎯', description: 'Skill-based learning paths' },
    { id: 'learning-center' as PageType, label: 'Learning Center', icon: '📖', description: 'Courses and resources' },
    { id: 'capstone-projects' as PageType, label: 'Capstone Projects', icon: '🚀', description: 'Real-world projects' },
  ];

  const isLearningPage = activePage === 'trail-missions' || activePage === 'learning-center' || activePage === 'capstone-projects';
  
  return (
    <header className="bg-white border-b border-gray-200 shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <button 
            onClick={() => setActivePage('learner')}
            className="flex items-center space-x-3 hover:opacity-80 transition-opacity"
          >
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#2C6975] to-[#F9A03F] flex items-center justify-center">
              <span className="text-white">TT</span>
            </div>
            <div className="hidden sm:block">
              <h1 className="text-gray-900">Transition Trails</h1>
              <p className="text-xs text-gray-500">Digital Experience Portal</p>
            </div>
          </button>

          {/* Primary Navigation */}
          <nav className="flex items-center space-x-1">
            {/* Home */}
            <button
              onClick={() => setActivePage('learner')}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
                activePage === 'learner'
                  ? 'bg-[#2C6975] text-white'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              <Home className="w-4 h-4" />
              <span className="hidden md:inline">Home</span>
            </button>

            {/* Community */}
            <button
              onClick={() => setActivePage('community')}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors relative ${
                activePage === 'community'
                  ? 'bg-[#2C6975] text-white'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              <MessageCircle className="w-4 h-4" />
              <span className="hidden md:inline">Community</span>
              {slackNotifications.length > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-[#F9A03F] text-white text-xs rounded-full flex items-center justify-center animate-pulse">
                  {slackNotifications.length}
                </span>
              )}
            </button>

            {/* Learning Dropdown */}
            <div className="relative">
              <button
                onClick={() => setShowLearningDropdown(!showLearningDropdown)}
                onMouseEnter={() => setShowLearningDropdown(true)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
                  isLearningPage
                    ? 'bg-[#2C6975] text-white'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                <GraduationCap className="w-4 h-4" />
                <span className="hidden md:inline">Learning</span>
                <ChevronDown className={`w-3 h-3 transition-transform ${showLearningDropdown ? 'rotate-180' : ''}`} />
              </button>

              {/* Dropdown Menu */}
              {showLearningDropdown && (
                <>
                  <div 
                    className="fixed inset-0 z-40" 
                    onClick={() => setShowLearningDropdown(false)}
                    onMouseEnter={() => setShowLearningDropdown(false)}
                  ></div>
                  <div 
                    className="absolute top-full right-0 mt-2 w-72 bg-white rounded-lg shadow-lg border border-gray-200 z-50"
                    onMouseLeave={() => setShowLearningDropdown(false)}
                  >
                    <div className="p-2">
                      {learningPages.map((page) => (
                        <button
                          key={page.id}
                          onClick={() => {
                            setActivePage(page.id);
                            setShowLearningDropdown(false);
                          }}
                          className={`w-full flex items-start space-x-3 p-3 rounded-lg transition-colors text-left ${
                            activePage === page.id
                              ? 'bg-[#2C6975]/10 border border-[#2C6975]'
                              : 'hover:bg-gray-50'
                          }`}
                        >
                          <span className="text-2xl">{page.icon}</span>
                          <div className="flex-1 min-w-0">
                            <p className={`text-sm ${activePage === page.id ? 'text-[#2C6975]' : 'text-gray-900'}`}>
                              {page.label}
                            </p>
                            <p className="text-xs text-gray-500 mt-0.5">
                              {page.description}
                            </p>
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>
                </>
              )}
            </div>

            {/* Coach Hub (Role-Based) */}
            {userRole.isCoach && (
              <button
                onClick={() => setActivePage('coach')}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
                  activePage === 'coach'
                    ? 'bg-[#2C6975] text-white'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                <Users className="w-4 h-4" />
                <span className="hidden lg:inline">Coach Hub</span>
              </button>
            )}

            {/* Admin Panel (Role-Based) */}
            {userRole.isAdmin && (
              <button
                onClick={() => setActivePage('admin')}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
                  activePage === 'admin'
                    ? 'bg-[#2C6975] text-white'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                <Settings className="w-4 h-4" />
                <span className="hidden lg:inline">Admin</span>
              </button>
            )}
          </nav>

          {/* Right Side Actions */}
          <div className="flex items-center space-x-3">
            {/* Notification Bell */}
            <div className="relative">
              <button
                onClick={() => setShowNotifications(!showNotifications)}
                className="relative text-gray-600 hover:text-[#2C6975] transition-colors p-2"
                aria-label="Notifications"
              >
                <Bell className="w-5 h-5" />
                {slackNotifications.length > 0 && (
                  <span className="absolute top-0 right-0 w-4 h-4 bg-[#F9A03F] text-white text-xs rounded-full flex items-center justify-center animate-pulse">
                    {slackNotifications.length}
                  </span>
                )}
              </button>

              {/* Notification Dropdown */}
              {showNotifications && (
                <>
                  <div 
                    className="fixed inset-0 z-40" 
                    onClick={() => setShowNotifications(false)}
                  ></div>
                  <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-lg border border-gray-200 z-50">
                    <div className="p-3 border-b border-gray-200">
                      <div className="flex items-center justify-between">
                        <h3 className="text-sm text-gray-900">Notifications</h3>
                        <Badge variant="outline" className="text-xs">
                          From Slack
                        </Badge>
                      </div>
                    </div>
                    <div className="max-h-96 overflow-y-auto">
                      {slackNotifications.map((notification) => (
                        <button
                          key={notification.id}
                          onClick={() => {
                            setShowNotifications(false);
                            setActivePage('community');
                          }}
                          className="w-full p-3 hover:bg-gray-50 transition-colors text-left border-b border-gray-100 last:border-b-0"
                        >
                          <div className="flex items-start space-x-2">
                            <div className={`w-2 h-2 rounded-full flex-shrink-0 mt-2 ${
                              notification.type === 'mention' ? 'bg-[#F9A03F]' :
                              notification.type === 'dm' ? 'bg-[#7EB5C1]' :
                              'bg-[#3B6A52]'
                            }`}></div>
                            <div className="flex-1 min-w-0">
                              <p className="text-sm text-gray-900">{notification.message}</p>
                              <p className="text-xs text-gray-500 mt-1">{notification.time}</p>
                            </div>
                          </div>
                        </button>
                      ))}
                    </div>
                    <div className="p-2 border-t border-gray-200">
                      <button
                        onClick={() => {
                          setShowNotifications(false);
                          setActivePage('community');
                        }}
                        className="w-full text-xs text-[#2C6975] hover:underline text-center py-1"
                      >
                        View all in Community →
                      </button>
                    </div>
                  </div>
                </>
              )}
            </div>

            {/* User Avatar / Profile */}
            <button
              onClick={() => setActivePage('profile')}
              className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-colors ${
                activePage === 'profile'
                  ? 'bg-[#2C6975]/10 text-[#2C6975]'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#2C6975] to-[#7EB5C1] flex items-center justify-center text-white text-sm">
                AJ
              </div>
              <span className="hidden xl:inline text-sm">Alex Johnson</span>
            </button>

            {/* Penny AI Quick Access (Header Button) */}
            <button
              className="hidden md:flex items-center space-x-2 px-3 py-2 bg-gradient-to-r from-[#F9A03F] to-[#e89135] text-white rounded-lg hover:from-[#e89135] hover:to-[#d97f25] transition-all shadow-sm hover:shadow-md"
              title="Ask Penny AI"
            >
              <Sparkles className="w-4 h-4" />
              <span className="text-sm hidden lg:inline">Penny</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
