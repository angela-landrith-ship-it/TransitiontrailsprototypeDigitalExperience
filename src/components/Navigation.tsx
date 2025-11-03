import { Home, Users, Settings } from 'lucide-react';

interface NavigationProps {
  activeFrame: 'learner' | 'coach' | 'admin';
  setActiveFrame: (frame: 'learner' | 'coach' | 'admin') => void;
}

export function Navigation({ activeFrame, setActiveFrame }: NavigationProps) {
  return (
    <header className="bg-white border-b border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#2C6975] to-[#F9A03F] flex items-center justify-center">
              <span className="text-white">TT</span>
            </div>
            <div>
              <h1 className="text-gray-900">Transition Trails</h1>
              <p className="text-xs text-gray-500">Digital Experience Portal</p>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex items-center space-x-1">
            <button
              onClick={() => setActiveFrame('learner')}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
                activeFrame === 'learner'
                  ? 'bg-[#2C6975] text-white'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              <Home className="w-4 h-4" />
              <span>Home</span>
            </button>
            <button
              onClick={() => setActiveFrame('coach')}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
                activeFrame === 'coach'
                  ? 'bg-[#2C6975] text-white'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              <Users className="w-4 h-4" />
              <span>Coach</span>
            </button>
            <button
              onClick={() => setActiveFrame('admin')}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
                activeFrame === 'admin'
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
            <a href="#" className="text-[#2C6975] hover:underline">My Program</a>
            <a href="#" className="text-[#2C6975] hover:underline">Assignments</a>
            <a href="#" className="text-[#2C6975] hover:underline">Slack</a>
            <a href="#" className="text-[#2C6975] hover:underline">Profile</a>
          </div>
        </div>
      </div>
    </header>
  );
}
