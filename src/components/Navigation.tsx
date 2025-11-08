/**
 * NAVIGATION - GLOBAL HEADER & MENU SYSTEM
 * 
 * =============================================================================
 * SALESFORCE ARCHITECTURE MAPPING
 * =============================================================================
 * 
 * Component Type: Global Header (appears on all Experience Cloud pages)
 * Experience Builder: Theme Layout Header component
 * Audiences: All (adapts based on user role)
 * 
 * =============================================================================
 * ROLE-BASED VISIBILITY
 * =============================================================================
 * 
 * Navigation items shown based on Experience Cloud Audience:
 * 
 * Visitor:
 * - Logo (home link)
 * - Learning (public resources only)
 * - Events
 * - Community
 * - Sign In / Sign Up buttons
 * 
 * Learner:
 * - Logo (home link)
 * - Home
 * - Learning (dropdown: Trail Missions, Learning Center, Capstone Projects)
 * - Projects (dropdown: My Capstone, Partner Board, Team Projects, TrailBuild Summit)
 * - Community
 * - Shop
 * - Profile menu (avatar dropdown)
 * - Notifications bell
 * - Penny AI widget
 * 
 * Coach:
 * - All Learner items +
 * - Coach Dashboard
 * - Team Analytics
 * 
 * Admin:
 * - All Learner & Coach items +
 * - Admin Panel
 * - System Settings
 * 
 * =============================================================================
 * SALESFORCE DATA SOURCES
 * =============================================================================
 * 
 * User Context (from Experience Cloud):
 * - User.Name
 * - User.SmallPhotoUrl (profile picture)
 * - User.UserRole.Name (determines visibility)
 * - User.Total_Points__c (shown in profile menu)
 * - User.Contact.Cohort__c
 * 
 * Notifications:
 * - Query: SELECT * FROM Notification__c 
 *          WHERE Recipient__c = :currentUserId 
 *          AND Read__c = false
 *          ORDER BY CreatedDate DESC LIMIT 10
 * 
 * Custom Object: Notification__c
 * Fields:
 * - Recipient__c (Lookup: User)
 * - Type__c (Picklist) - Mention, Direct Message, Session Reminder, System
 * - Message__c (Text, 255)
 * - Link__c (URL) - Deep link to relevant page
 * - Read__c (Checkbox)
 * - Created_Date__c (DateTime)
 * - Source__c (Text, 100) - "Slack", "Penny AI", "System", "Coach"
 * 
 * =============================================================================
 * CMS CONTENT REFERENCES
 * =============================================================================
 * 
 * Logo:
 * - [CMS:nav_logo_image] → Transition Trails badge logo
 * - Stored as Static Resource: TransitionTrailsLogo
 * - Alt text: "Transition Trails Academy"
 * 
 * Dropdown Descriptions:
 * - [CMS:nav_learning_dropdown_desc] → "Explore your learning path"
 * - [CMS:nav_projects_dropdown_desc] → "Build real-world solutions"
 * 
 * =============================================================================
 * NAVIGATION STRUCTURE
 * =============================================================================
 * 
 * Primary Navigation (Top Level):
 * 1. Home → /s/home (learner dashboard)
 * 2. Learning (Dropdown) →
 *    - Trail Missions → /s/trail-missions
 *    - Learning Center → /s/learning
 *    - Capstone Projects → /s/projects/capstone
 * 3. Projects (Dropdown) →
 *    - My Capstone → /s/projects/capstone
 *    - Partner Board → /s/projects/partners
 *    - My Team Projects → /s/projects/teams
 *    - TrailBuild Summit → /s/trailbuild
 * 4. Community → /s/community
 * 5. Shop → /s/shop
 * 
 * Utility Navigation (Right Side):
 * - Notifications Bell (badge count)
 * - Profile Menu (Avatar) →
 *   - Profile → /s/profile
 *   - Points Balance → Display only
 *   - Order History → /s/shop/orders
 *   - Settings → /s/settings
 *   - Log Out → Authentication logout
 * 
 * Mobile Navigation:
 * - Hamburger menu (all items stacked)
 * - Full-screen overlay on open
 * - Collapsible dropdowns
 * 
 * =============================================================================
 * APEX CONTROLLERS
 * =============================================================================
 * 
 * NavigationController.cls:
 * - getCurrentUser() → Returns User record with profile picture, points, role
 * - getUnreadNotifications() → Returns Notification__c where Read__c = false
 * - markNotificationRead(notificationId) → Updates Notification__c.Read__c = true
 * - getUserRole() → Returns current user's Experience Cloud profile/role
 * 
 * =============================================================================
 * INTEGRATION POINTS
 * =============================================================================
 * 
 * 1. Slack Notifications:
 *    - Webhook from Slack to Salesforce when user mentioned
 *    - Creates Notification__c record (Type = 'Mention', Source = 'Slack')
 *    - Deep link to Slack message
 * 
 * 2. Penny AI Widget:
 *    - Floating widget in bottom-right (PennyFloatingWidget)
 *    - Click opens PennyChat modal
 *    - Badge shows unread AI suggestions count
 * 
 * 3. Profile Picture:
 *    - User.SmallPhotoUrl from Salesforce Chatter
 *    - Fallback to initials if no photo
 *    - Upload via profile settings
 * 
 * 4. Points Display:
 *    - Real-time query: User.Total_Points__c
 *    - Updated by Points_Transaction__c trigger
 *    - Shown in profile dropdown
 * 
 * =============================================================================
 * RESPONSIVE BEHAVIOR
 * =============================================================================
 * 
 * Desktop (1024px+):
 * - Full horizontal nav with dropdowns
 * - Hover-triggered dropdowns (300ms delay)
 * - Profile menu on right
 * 
 * Tablet (768px - 1023px):
 * - Condensed nav items
 * - Click-triggered dropdowns
 * 
 * Mobile (< 768px):
 * - Hamburger menu icon
 * - Full-screen overlay menu
 * - Stacked items
 * - Logo always visible
 * 
 * =============================================================================
 * SCROLL BEHAVIOR
 * =============================================================================
 * 
 * - Hide on scroll down (when scrollY > 100px)
 * - Show on scroll up (sticky positioning)
 * - Shadow appears when scrollY > 10px
 * - Maintains accessibility (focus trap when visible)
 * 
 * Implementation:
 * - Uses IntersectionObserver or scroll event listener
 * - CSS transforms for smooth hide/show
 * - z-index: 50 to stay above content
 * 
 * =============================================================================
 * NOTIFICATION SYSTEM
 * =============================================================================
 * 
 * Notification Types:
 * 1. Slack Mentions → Deep link to Slack
 * 2. Direct Messages → Open message thread
 * 3. Session Reminders → Calendar event link
 * 4. System Announcements → Modal or page
 * 5. Penny AI Suggestions → Open PennyChat
 * 6. Coach Feedback → Assessment page
 * 
 * Badge Count:
 * - Shows unread count (max 9, then "9+")
 * - Red badge on bell icon
 * - Real-time updates via Platform Events (optional)
 * 
 * Dropdown:
 * - Last 10 notifications
 * - "Mark all as read" button
 * - "See all notifications" → /s/notifications
 * 
 * =============================================================================
 * PROFILE MENU ITEMS
 * =============================================================================
 * 
 * Avatar Dropdown:
 * - User name & cohort
 * - Points balance (e.g., "2,380 points")
 * - Separator
 * - My Profile → /s/profile
 * - Order History → /s/shop/orders (if has orders)
 * - Settings → /s/settings
 * - Separator
 * - Log Out → Triggers auth logout
 * 
 * =============================================================================
 * ACCESSIBILITY
 * =============================================================================
 * 
 * - Skip to main content link (hidden, focus-visible)
 * - ARIA labels on all icon buttons
 * - Keyboard navigation (tab, arrow keys in dropdowns)
 * - Focus trap in mobile menu
 * - Escape key closes dropdowns
 * - Screen reader announcements for notifications
 * - High contrast mode support
 * 
 * =============================================================================
 * LWC IMPLEMENTATION NOTES
 * =============================================================================
 * 
 * In Experience Cloud:
 * - Use Theme Layout component for header
 * - Navigation Menu component for links
 * - Custom LWC for notifications bell
 * - Custom LWC for profile menu
 * - Audience targeting controls visibility
 * 
 * Example LWC Structure:
 * - <c-global-navigation>
 *   - <c-navigation-menu role={userRole}>
 *   - <c-notification-bell userId={userId}>
 *   - <c-profile-menu userId={userId}>
 * 
 * =============================================================================
 */

import { Home, Users, Settings, MessageCircle, Bell, ChevronDown, GraduationCap, Sparkles, Menu, X, ChevronRight, ShoppingBag, User, LogOut, Briefcase } from 'lucide-react';
import { PageType } from '../App';
import { useState, useEffect, useRef } from 'react';
import { Badge } from './ui/badge';
import { ImageWithFallback } from './figma/ImageWithFallback';
import logoImage from 'figma:asset/9a4ab37fd35580740e0a1287c7b07dbd9912a379.png';
import profileImage from 'figma:asset/f5ce76cc9cdd7a0e710f2a4ab182ac3c118f5ea0.png';

interface NavigationProps {
  activePage: PageType;
  setActivePage: (page: PageType) => void;
}

export function Navigation({ activePage, setActivePage }: NavigationProps) {
  const [showNotifications, setShowNotifications] = useState(false);
  const [showLearningDropdown, setShowLearningDropdown] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [navVisible, setNavVisible] = useState(true);
  const dropdownTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  
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

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (dropdownTimeoutRef.current) {
        clearTimeout(dropdownTimeoutRef.current);
      }
    };
  }, []);

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
    'merch-store': 'Trail Shop',
    'order-history': 'My Orders',
    'visitor-home': 'Home',
    'visitor-learning': 'Learning Center',
    'visitor-community': 'Community',
    'visitor-events': 'Events',
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
              className="flex items-center space-x-3 hover:opacity-90 transition-all duration-150 group"
            >
              <ImageWithFallback 
                src={logoImage} 
                alt="Transition Trails Logo"
                className="w-10 h-10 object-contain"
              />
              <div className="hidden sm:block">
                <h1 className="text-white group-hover:text-[#F9A03F] transition-colors duration-150">
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

              {/* Portfolio */}
              <button
                onClick={() => setActivePage('portfolio')}
                className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-all duration-150 text-sm ${
                  activePage === 'portfolio' || activePage === 'portfolio-detail'
                    ? 'bg-white/20 text-white'
                    : 'text-white/80 hover:text-white hover:bg-white/10 hover:underline decoration-[#F9A03F]'
                }`}
              >
                <Briefcase className="w-4 h-4" />
                <span>Portfolio</span>
              </button>

              {/* Trail Shop */}
              <button
                onClick={() => setActivePage('merch-store')}
                className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-all duration-150 text-sm ${
                  activePage === 'merch-store' || activePage === 'order-history'
                    ? 'bg-white/20 text-white'
                    : 'text-white/80 hover:text-white hover:bg-white/10 hover:underline decoration-[#F9A03F]'
                }`}
              >
                <ShoppingBag className="w-4 h-4" />
                <span>Trail Shop</span>
              </button>

              {/* Learning Dropdown */}
              <div 
                className="relative"
                onMouseEnter={() => {
                  // Clear any pending close timeout
                  if (dropdownTimeoutRef.current) {
                    clearTimeout(dropdownTimeoutRef.current);
                  }
                  setShowLearningDropdown(true);
                }}
                onMouseLeave={() => {
                  // Delay closing to allow mouse movement to dropdown
                  dropdownTimeoutRef.current = setTimeout(() => {
                    setShowLearningDropdown(false);
                  }, 200);
                }}
              >
                <button
                  onClick={() => setShowLearningDropdown(!showLearningDropdown)}
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
                  <div className="absolute top-full left-0 pt-1 w-72 z-50">
                    <div className="bg-white rounded-xl shadow-xl border border-gray-200 py-2 animate-in fade-in slide-in-from-top-2 duration-150">
                      {learningPages.map((page) => (
                        <button
                          key={page.id}
                          onClick={() => {
                            setActivePage(page.id);
                            setShowLearningDropdown(false);
                            if (dropdownTimeoutRef.current) {
                              clearTimeout(dropdownTimeoutRef.current);
                            }
                          }}
                          className={`w-full text-left px-4 py-3 hover:bg-[#F9A03F]/5 hover:border-l-4 hover:border-[#F9A03F] transition-all duration-150 group ${
                            activePage === page.id ? 'bg-[#2C6975]/5 border-l-4 border-[#2C6975]' : ''
                          }`}
                        >
                          <div className="flex items-center space-x-3">
                            <span className="text-2xl">{page.icon}</span>
                            <div className="flex-1">
                              <p className="text-sm text-gray-900 group-hover:text-[#F9A03F] transition-colors">{page.label}</p>
                              <p className="text-xs text-gray-500">{page.description}</p>
                            </div>
                            <ChevronRight className="w-4 h-4 text-gray-400 opacity-0 group-hover:opacity-100 group-hover:text-[#F9A03F] transition-all" />
                          </div>
                        </button>
                      ))}
                    </div>
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

            {/* Notifications & Profile & Mobile Menu */}
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

              {/* Profile Avatar Dropdown */}
              <div className="relative hidden md:block">
                <button
                  onClick={() => setShowProfileMenu(!showProfileMenu)}
                  className="flex items-center space-x-2 p-1 text-white/80 hover:text-white hover:bg-white/10 rounded-lg transition-all duration-150"
                  aria-label="Profile Menu"
                >
                  <div className="w-8 h-8 rounded-full overflow-hidden border-2 border-white/30 hover:border-white/50 transition-all">
                    <ImageWithFallback 
                      src={profileImage}
                      alt="Alex Johnson"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <ChevronDown className="w-4 h-4" />
                </button>

                {showProfileMenu && (
                  <div className="absolute top-full right-0 mt-2 w-56 bg-white rounded-xl shadow-xl border border-gray-200 py-2 animate-in fade-in slide-in-from-top-2 duration-150">
                    <div className="px-4 py-3 border-b border-gray-200">
                      <p className="text-sm text-gray-900">Alex Johnson</p>
                      <p className="text-xs text-gray-500">alex.johnson@email.com</p>
                    </div>
                    <div className="py-1">
                      <button
                        onClick={() => {
                          setShowProfileMenu(false);
                          setActivePage('profile');
                        }}
                        className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 transition-colors flex items-center space-x-2"
                      >
                        <User className="w-4 h-4" />
                        <span>My Profile</span>
                      </button>
                      <button
                        onClick={() => {
                          setShowProfileMenu(false);
                          setActivePage('profile');
                        }}
                        className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 transition-colors flex items-center space-x-2"
                      >
                        <Settings className="w-4 h-4" />
                        <span>Settings</span>
                      </button>
                    </div>
                    <div className="border-t border-gray-200 py-1">
                      <button
                        className="w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-red-50 transition-colors flex items-center space-x-2"
                      >
                        <LogOut className="w-4 h-4" />
                        <span>Sign Out</span>
                      </button>
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
