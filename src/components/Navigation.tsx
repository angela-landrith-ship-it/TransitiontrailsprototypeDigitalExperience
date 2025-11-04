import { Home, Users, Settings, MessageCircle, Bell, Share2, Linkedin } from 'lucide-react';
import { PageType } from '../App';
import { useState } from 'react';
import { Badge } from './ui/badge';

interface NavigationProps {
  activePage: PageType;
  setActivePage: (page: PageType) => void;
}

export function Navigation({ activePage, setActivePage }: NavigationProps) {
  const isMainView = activePage === 'learner' || activePage === 'coach' || activePage === 'admin';
  const [showNotifications, setShowNotifications] = useState(false);
  
  // Slack notifications (unread count)
  const slackNotifications = [
    { id: 1, type: 'mention', message: 'Sarah Martinez mentioned you in #trail-mastery', time: '5 min ago' },
    { id: 2, type: 'dm', message: 'New message from Penny AI', time: '10 min ago' },
    { id: 3, type: 'session', message: 'Study Group starts in 30 minutes', time: '30 min ago' }
  ];
  
  return (
    <header className="bg-white border-b border-gray-200 shadow-sm">
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
            <div>
              <h1 className="text-gray-900">Transition Trails</h1>
              <p className="text-xs text-gray-500">Digital Experience Portal</p>
            </div>
          </button>

          {/* Navigation */}
          <nav className="flex items-center space-x-1">
            <button
              onClick={() => setActivePage('learner')}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
                activePage === 'learner'
                  ? 'bg-[#2C6975] text-white'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              <Home className="w-4 h-4" />
              <span>Home</span>
            </button>
            <button
              onClick={() => setActivePage('community')}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors relative ${
                activePage === 'community'
                  ? 'bg-[#2C6975] text-white'
                  : 'text-gray-600 hover:bg-gray-100'
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
            <button
              onClick={() => setActivePage('coach')}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
                activePage === 'coach'
                  ? 'bg-[#2C6975] text-white'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              <Users className="w-4 h-4" />
              <span>Coach</span>
            </button>
            <button
              onClick={() => setActivePage('admin')}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
                activePage === 'admin'
                  ? 'bg-[#2C6975] text-white'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              <Settings className="w-4 h-4" />
              <span>Admin</span>
            </button>
          </nav>

          {/* Quick Links & Notifications */}
          <div className="flex items-center space-x-4 text-sm">
            {/* Notification Bell */}
            <div className="relative">
              <button
                onClick={() => setShowNotifications(!showNotifications)}
                className="relative text-gray-600 hover:text-[#2C6975] transition-colors"
                aria-label="Notifications"
              >
                <Bell className="w-5 h-5" />
                {slackNotifications.length > 0 && (
                  <span className="absolute -top-1 -right-1 w-4 h-4 bg-[#F9A03F] text-white text-xs rounded-full flex items-center justify-center animate-pulse">
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

            <button 
              onClick={() => setActivePage('capstone-projects')}
              className="text-[#2C6975] hover:underline"
            >
              Capstone
            </button>
            <button 
              onClick={() => setActivePage('trail-missions')}
              className="text-[#2C6975] hover:underline"
            >
              Trail Missions
            </button>
            <button 
              onClick={() => setActivePage('learning-center')}
              className="text-[#2C6975] hover:underline"
            >
              Learning Center
            </button>
            
            {/* LinkedIn Share Button */}
            <button
              onClick={() => setActivePage('profile')}
              className="flex items-center space-x-1 px-3 py-1.5 bg-[#0A66C2] text-white rounded-lg hover:bg-[#084d8f] transition-colors text-sm"
              title="Share Achievement on LinkedIn"
            >
              <Linkedin className="w-4 h-4" />
              <span>Share</span>
            </button>
            
            <button 
              onClick={() => setActivePage('profile')}
              className="text-[#2C6975] hover:underline"
            >
              Profile
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
