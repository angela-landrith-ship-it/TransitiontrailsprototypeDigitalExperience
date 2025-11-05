import { Home, Users, Settings, MessageCircle, Bell, ChevronDown, GraduationCap, Sparkles, Menu, X, ChevronRight } from 'lucide-react';
import { PageType } from '../App';
import { useState, useEffect } from 'react';
import { Badge } from './ui/badge';

interface NavigationProps {
  activePage: PageType;
  setActivePage: (page: PageType) => void;
}

export function Navigation({ activePage, setActivePage }: NavigationProps) {
  const [showNotifications, setShowNotifications] = useState(false);
  const [showLearningDropdown, setShowLearningDropdown] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [navVisible, setNavVisible] = useState(true);
  
  // Scroll behavior: hide on scroll down, show on scroll up
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      setIsScrolled(currentScrollY > 10);
      
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        // Scrolling down
        setNavVisible(false);
      } else {
        // Scrolling up
        setNavVisible(true);
      }
      
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  // Role management (in production, this would come from user context/auth)
  const userRole = {
    isLearner: true,
    isCoach: true,
    isAdmin: true,
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

  // Page titles for breadcrumbs
  const pageTitles: Record<PageType, string> = {
    'learner': 'Home',
    'learning-center': 'Learning Center',
    'trail-missions': 'Trail Missions',
    'capstone-projects': 'Capstone Projects',
    'community': 'Community',
    'profile': 'My Profile',
    'coach-dashboard': 'Coach Hub',
    'admin-panel': 'Admin Panel',
    'self-assessment': 'Self Assessment',
    'skills-assessment': 'Skills Assessment',
    'skills-iq-assessment': 'Skills IQ Assessment',
  };

  // Breadcrumb logic
  const getBreadcrumbs = () => {
    const breadcrumbs = [{ label: 'Home', page: 'learner' as PageType }];
    
    if (activePage !== 'learner') {
      if (isLearningPage) {
        breadcrumbs.push({ label: 'Learning', page: activePage });
      } else {
        breadcrumbs.push({ label: pageTitles[activePage], page: activePage });
      }
    }
    
    return breadcrumbs;
  };

  const breadcrumbs = getBreadcrumbs();
  
  return (
    <>
      {/* Sticky Navigation */}
      <header
        className={`bg-gradient-to-r from-[#3B6A52] to-[#2C6975] border-b border-[#2C6975]/30 sticky top-0 z-50 transition-all duration-300 ${
          isScrolled ? 'shadow-lg' : 'shadow-sm'
        } ${
          navVisible ? 'translate-y-0' : '-translate-y-full'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-14">
            {/* Logo */}
            <button 
              onClick={() => setActivePage('learner')}
              className="flex items-center space-x-3 hover:opacity-80 transition-all duration-150 group"
            >
              <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-white/20 to-white/10 flex items-center justify-center border border-white/20">
                <span className="text-white text-sm">TT</span>
              </div>
              <div className="hidden sm:block">
                <h1 className="text-white text-sm group-hover:text-[#F9A03F] transition-colors duration-150">
                  Transition Trails
                </h1>
              </div>
            </button>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-1">
              {/* Home */}
              <button
                onClick={() => setActivePage('learner')}
                className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-all duration-150 text-sm ${
                  activePage === 'learner'
                    ? 'bg-white/20 text-white'
                    : 'text-white/80 hover:text-white hover:bg-white/10 hover:underline decoration-[#F9A03F]'
                }`}
              >
                <Home className="w-4 h-4" />
                <span>Home</span>
              </button>

              {/* Community */}
              <button
                onClick={() => setActivePage('community')}
                className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-all duration-150 relative text-sm ${
                  activePage === 'community'
                    ? 'bg-white/20 text-white'
                    : 'text-white/80 hover:text-white hover:bg-white/10 hover:underline decoration-[#F9A03F]'
                }`}
              >
                <MessageCircle className="w-4 h-4" />
                <span>Community</span>
                {slackNotifications.length > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 bg-[#F9A03F] text-white text-xs rounded-full flex items-center justify-center">
                    {slackNotifications.length}
                  </span>
                )}
              </button>

              {/* Learning Dropdown */}
              <div className="relative">
                <button
                  onClick={() => setShowLearningDropdown(!showLearningDropdown)}
                  onMouseEnter={() => setShowLearningDropdown(true)}
                  onMouseLeave={() => setShowLearningDropdown(false)}
                  className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-all duration-150 text-sm ${
                    isLearningPage
                      ? 'bg-white/20 text-white'
                      : 'text-white/80 hover:text-white hover:bg-white/10 hover:underline decoration-[#F9A03F]'
                  }`}
                >
                  <GraduationCap className="w-4 h-4" />
                  <span>Learning</span>
                  <ChevronDown className={`w-3 h-3 transition-transform duration-150 ${showLearningDropdown ? 'rotate-180' : ''}`} />
                </button>

                {/* Dropdown Menu */}
                {showLearningDropdown && (
                  <div
                    onMouseEnter={() => setShowLearningDropdown(true)}
                    onMouseLeave={() => setShowLearningDropdown(false)}
                    className="absolute top-full left-0 mt-2 w-72 bg-white rounded-xl shadow-xl border border-gray-200 py-2 animate-in fade-in slide-in-from-top-2 duration-150"
                  >
                    {learningPages.map((page) => (
                      <button
                        key={page.id}
                        onClick={() => {
                          setActivePage(page.id);
                          setShowLearningDropdown(false);
                        }}
                        className={`w-full text-left px-4 py-3 hover:bg-gray-50 transition-all duration-150 ${
                          activePage === page.id ? 'bg-[#2C6975]/5' : ''
                        }`}
                      >
                        <div className="flex items-center space-x-3">
                          <span className="text-2xl">{page.icon}</span>
                          <div className="flex-1">
                            <p className="text-sm text-gray-900">{page.label}</p>
                            <p className="text-xs text-gray-500">{page.description}</p>
                          </div>
                        </div>
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Profile */}
              <button
                onClick={() => setActivePage('profile')}
                className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-all duration-150 text-sm ${
                  activePage === 'profile'
                    ? 'bg-white/20 text-white'
                    : 'text-white/80 hover:text-white hover:bg-white/10 hover:underline decoration-[#F9A03F]'
                }`}
              >
                <Users className="w-4 h-4" />
                <span>Profile</span>
              </button>

              {/* Coach Hub - Role based */}
              {userRole.isCoach && (
                <button
                  onClick={() => setActivePage('coach-dashboard')}
                  className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-all duration-150 text-sm ${
                    activePage === 'coach-dashboard'
                      ? 'bg-white/20 text-white'
                      : 'text-white/80 hover:text-white hover:bg-white/10 hover:underline decoration-[#F9A03F]'
                  }`}
                >
                  <Sparkles className="w-4 h-4" />
                  <span>Coach Hub</span>
                </button>
              )}

              {/* Admin - Role based */}
              {userRole.isAdmin && (
                <button
                  onClick={() => setActivePage('admin-panel')}
                  className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-all duration-150 text-sm ${
                    activePage === 'admin-panel'
                      ? 'bg-white/20 text-white'
                      : 'text-white/80 hover:text-white hover:bg-white/10 hover:underline decoration-[#F9A03F]'
                  }`}
                >
                  <Settings className="w-4 h-4" />
                  <span>Admin</span>
                </button>
              )}
            </nav>

            {/* Notifications & Mobile Menu */}
            <div className="flex items-center space-x-2">
              {/* Notifications */}
              <div className="relative hidden md:block">
                <button
                  onClick={() => setShowNotifications(!showNotifications)}
                  className="p-2 text-white/80 hover:text-white hover:bg-white/10 rounded-lg transition-all duration-150 relative"
                  aria-label="Notifications"
                >
                  <Bell className="w-5 h-5" />
                  {slackNotifications.length > 0 && (
                    <span className="absolute top-1 right-1 w-2 h-2 bg-[#F9A03F] rounded-full"></span>
                  )}
                </button>

                {showNotifications && (
                  <div className="absolute top-full right-0 mt-2 w-80 bg-white rounded-xl shadow-xl border border-gray-200 py-2 animate-in fade-in slide-in-from-top-2 duration-150">
                    <div className="px-4 py-2 border-b border-gray-200">
                      <h3 className="text-sm text-gray-900">Notifications</h3>
                    </div>
                    <div className="max-h-96 overflow-y-auto">
                      {slackNotifications.map((notification) => (
                        <div
                          key={notification.id}
                          className="px-4 py-3 hover:bg-gray-50 cursor-pointer transition-colors duration-150"
                        >
                          <p className="text-sm text-gray-900">{notification.message}</p>
                          <p className="text-xs text-gray-500 mt-1">{notification.time}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Mobile Menu Toggle */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="md:hidden p-2 text-white/80 hover:text-white hover:bg-white/10 rounded-lg transition-all duration-150"
                aria-label="Menu"
              >
                {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>

        {/* Breadcrumbs - Show on secondary pages */}
        {breadcrumbs.length > 1 && (
          <div className="border-t border-white/10 bg-white/5">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2">
              <nav className="flex items-center space-x-2 text-sm">
                {breadcrumbs.map((crumb, idx) => (
                  <div key={idx} className="flex items-center space-x-2">
                    {idx > 0 && <ChevronRight className="w-3 h-3 text-white/40" />}
                    <button
                      onClick={() => setActivePage(crumb.page)}
                      className={`transition-all duration-150 ${
                        idx === breadcrumbs.length - 1
                          ? 'text-white'
                          : 'text-white/60 hover:text-white hover:underline'
                      }`}
                    >
                      {crumb.label}
                    </button>
                  </div>
                ))}
              </nav>
            </div>
          </div>
        )}
      </header>

      {/* Mobile Menu Slide-in */}
      {mobileMenuOpen && (
        <div className="md:hidden fixed inset-0 z-40 bg-black/50 animate-in fade-in duration-150">
          <div className="absolute right-0 top-0 h-full w-64 bg-white shadow-xl animate-in slide-in-from-right duration-300">
            <div className="p-4 space-y-2">
              <button
                onClick={() => {
                  setActivePage('learner');
                  setMobileMenuOpen(false);
                }}
                className={`w-full text-left px-4 py-3 rounded-lg transition-colors duration-150 ${
                  activePage === 'learner' ? 'bg-[#2C6975] text-white' : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                <Home className="w-4 h-4 inline mr-2" />
                Home
              </button>

              <button
                onClick={() => {
                  setActivePage('community');
                  setMobileMenuOpen(false);
                }}
                className={`w-full text-left px-4 py-3 rounded-lg transition-colors duration-150 ${
                  activePage === 'community' ? 'bg-[#2C6975] text-white' : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                <MessageCircle className="w-4 h-4 inline mr-2" />
                Community
              </button>

              <div className="border-t border-gray-200 pt-2 mt-2">
                <p className="px-4 py-2 text-xs text-gray-500 uppercase">Learning</p>
                {learningPages.map((page) => (
                  <button
                    key={page.id}
                    onClick={() => {
                      setActivePage(page.id);
                      setMobileMenuOpen(false);
                    }}
                    className={`w-full text-left px-4 py-3 rounded-lg transition-colors duration-150 ${
                      activePage === page.id ? 'bg-[#2C6975] text-white' : 'text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    <span className="mr-2">{page.icon}</span>
                    {page.label}
                  </button>
                ))}
              </div>

              <button
                onClick={() => {
                  setActivePage('profile');
                  setMobileMenuOpen(false);
                }}
                className={`w-full text-left px-4 py-3 rounded-lg transition-colors duration-150 ${
                  activePage === 'profile' ? 'bg-[#2C6975] text-white' : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                <Users className="w-4 h-4 inline mr-2" />
                Profile
              </button>

              {userRole.isCoach && (
                <button
                  onClick={() => {
                    setActivePage('coach-dashboard');
                    setMobileMenuOpen(false);
                  }}
                  className={`w-full text-left px-4 py-3 rounded-lg transition-colors duration-150 ${
                    activePage === 'coach-dashboard' ? 'bg-[#2C6975] text-white' : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  <Sparkles className="w-4 h-4 inline mr-2" />
                  Coach Hub
                </button>
              )}

              {userRole.isAdmin && (
                <button
                  onClick={() => {
                    setActivePage('admin-panel');
                    setMobileMenuOpen(false);
                  }}
                  className={`w-full text-left px-4 py-3 rounded-lg transition-colors duration-150 ${
                    activePage === 'admin-panel' ? 'bg-[#2C6975] text-white' : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  <Settings className="w-4 h-4 inline mr-2" />
                  Admin
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
