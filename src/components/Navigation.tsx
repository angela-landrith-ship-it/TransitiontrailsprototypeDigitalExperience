import { Home, Users, Settings } from 'lucide-react';
import { PageType } from '../App';

interface NavigationProps {
  activePage: PageType;
  setActivePage: (page: PageType) => void;
}

export function Navigation({ activePage, setActivePage }: NavigationProps) {
  const isMainView = activePage === 'learner' || activePage === 'coach' || activePage === 'admin';
  
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

          {/* Quick Links */}
          <div className="flex items-center space-x-4 text-sm">
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
            <a href="https://slack.com" target="_blank" rel="noopener noreferrer" className="text-[#2C6975] hover:underline">
              Slack
            </a>
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
