import { Home, Calendar, GraduationCap, Users, LogIn, ShoppingBag } from 'lucide-react';
import { Badge } from './ui/badge';
import { PageType } from '../App';
import { ImageWithFallback } from './figma/ImageWithFallback';
import logoImage from 'figma:asset/9a4ab37fd35580740e0a1287c7b07dbd9912a379.png';

interface VisitorNavigationProps {
  activePage: PageType | string;
  setActivePage: (page: PageType) => void;
  onSignIn: () => void;
}

export function VisitorNavigation({ activePage, setActivePage, onSignIn }: VisitorNavigationProps) {
  const navItems: Array<{ id: PageType; label: string; icon: any }> = [
    { id: 'visitor-home', label: 'Home', icon: Home },
    { id: 'visitor-learning', label: 'Learning Center', icon: GraduationCap },
    { id: 'visitor-community', label: 'Community', icon: Users },
    { id: 'visitor-events', label: 'Events', icon: Calendar },
    { id: 'merch-store', label: 'Trail Shop', icon: ShoppingBag }
  ];

  return (
    <header className="bg-gradient-to-r from-[#3B6A52] to-[#2C6975] border-b border-[#2C6975]/30 sticky top-0 z-50 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14">
          {/* Logo */}
          <button 
            onClick={() => setActivePage('visitor-home')}
            className="flex items-center space-x-3 hover:opacity-90 transition-all duration-150 group"
          >
            <ImageWithFallback 
              src={logoImage} 
              alt="Transition Trails Logo"
              className="w-10 h-10 object-contain"
            />
            <div className="hidden sm:flex items-center space-x-2">
              <h1 className="text-white group-hover:text-[#F9A03F] transition-colors duration-150">
                Transition Trails
              </h1>
              <Badge className="bg-[#7EB5C1] text-white text-xs">Visitor</Badge>
            </div>
          </button>

          {/* Navigation */}
          <nav className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => setActivePage(item.id)}
                  className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-all duration-150 text-sm ${
                    activePage === item.id
                      ? 'bg-white/20 text-white'
                      : 'text-white/80 hover:text-white hover:bg-white/10'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>

          {/* Sign In Button */}
          <div className="flex items-center space-x-3">
            <button
              onClick={onSignIn}
              className="flex items-center space-x-2 px-4 py-2 bg-white/10 text-white rounded-lg hover:bg-white/20 transition-colors border border-white/20"
            >
              <LogIn className="w-4 h-4" />
              <span className="hidden sm:inline">Sign In</span>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <div className="md:hidden border-t border-white/10">
        <div className="flex items-center justify-around px-2 py-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => setActivePage(item.id)}
                className={`flex flex-col items-center space-y-1 px-3 py-2 rounded-lg transition-all ${
                  activePage === item.id
                    ? 'bg-white/20 text-white'
                    : 'text-white/70'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span className="text-xs">{item.label}</span>
              </button>
            );
          })}
        </div>
      </div>
    </header>
  );
}
