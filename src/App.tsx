import { useState } from 'react';
import { LearnerHome } from './components/LearnerHome';
import { CoachDashboard } from './components/CoachDashboard';
import { AdminPanel } from './components/AdminPanel';
import { PennyChat } from './components/PennyChat';
import { Navigation } from './components/Navigation';
import { TrailMissions } from './components/TrailMissions';
import { ProjectsHub } from './components/ProjectsHub';
import { SkillsAssessment } from './components/SkillsAssessment';
import { Profile } from './components/Profile';
import { SelfAssessment } from './components/SelfAssessment';
import { LearningCenter } from './components/LearningCenter';
import { Community } from './components/Community';
import { PennyFloatingWidget } from './components/PennyFloatingWidget';
import { SkillsIQAssessment } from './components/SkillsIQAssessment';
import { VisitorLanding } from './components/VisitorLanding';
import { VisitorLearningCenter } from './components/VisitorLearningCenter';
import { VisitorCommunity } from './components/VisitorCommunity';
import { VisitorEvents } from './components/VisitorEvents';
import { VisitorNavigation } from './components/VisitorNavigation';
import { LockedFeatureModal } from './components/LockedFeatureModal';
import { Toaster } from './components/ui/sonner';
import { MerchStore } from './components/MerchStore';
import { OrderHistory } from './components/OrderHistory';
import { AudienceToggle, RoleIndicator, type UserRole } from './components/integrations';
import { ThemeProvider } from './components/ThemeProvider';
import { ThemeToggle } from './components/ThemeToggle';
import { PortfolioGallery } from './components/PortfolioGallery';
import { PortfolioDetail } from './components/PortfolioDetail';
import { TrailOfMastery } from './components/TrailOfMastery';
import { TrailDetail } from './components/TrailDetail';
import { DiscussionForums } from './components/DiscussionForums';

export type PageType = 
  | 'learner' 
  | 'coach-dashboard'
  | 'admin-panel'
  | 'trail-missions' 
  | 'capstone-projects' 
  | 'skills-assessment'
  | 'skills-iq-assessment'
  | 'profile'
  | 'self-assessment'
  | 'learning-center'
  | 'community'
  | 'forums'
  | 'merch-store'
  | 'order-history'
  | 'visitor-home'
  | 'visitor-learning'
  | 'visitor-community'
  | 'visitor-events'
  | 'portfolio'
  | 'portfolio-detail'
  | 'trail-mastery'
  | 'trail-detail';

type UserMode = 'visitor' | 'enrolled';

export default function App() {
  const [userMode, setUserMode] = useState<UserMode>('visitor');
  const [activePage, setActivePage] = useState<PageType>('visitor-home');
  const [isPennyChatOpen, setIsPennyChatOpen] = useState(false);
  const [lockedFeature, setLockedFeature] = useState<'capstone' | 'skills' | 'coach' | null>(null);
  const [capstoneComplete, setCapstoneComplete] = useState(false);
  const [portfolioSlug, setPortfolioSlug] = useState<string>('');
  const [selectedTrailId, setSelectedTrailId] = useState<string>('');
  
  // Development: Audience/Role Toggle (hidden in production)
  const [testRole, setTestRole] = useState<UserRole>('learner');

  const handleEnrollment = () => {
    setUserMode('enrolled');
    setActivePage('learner');
  };

  const handleSignIn = () => {
    setUserMode('enrolled');
    setActivePage('learner');
  };

  const handleSwitchToVisitor = () => {
    setUserMode('visitor');
    setActivePage('visitor-home');
  };

  const handleVisitorStartTrail = () => {
    setActivePage('visitor-learning');
  };

  const handleVisitorNavigate = (page: string) => {
    if (page === 'capstone-projects') {
      setLockedFeature('capstone');
    } else if (page === 'skills-assessment' || page === 'skills-iq-assessment') {
      setLockedFeature('skills');
    } else if (page === 'coach-dashboard') {
      setLockedFeature('coach');
    } else {
      setActivePage(page as PageType);
    }
  };

  // Determine Penny context based on active page
  const getPennyContext = (): 'learning' | 'coaching' | 'profile' | 'default' => {
    if (activePage === 'learning-center' || activePage === 'trail-missions' || activePage === 'capstone-projects') {
      return 'learning';
    }
    if (activePage === 'coach-dashboard') {
      return 'coaching';
    }
    if (activePage === 'profile') {
      return 'profile';
    }
    return 'default';
  };

  const renderPage = () => {
    // Visitor Mode Pages
    if (userMode === 'visitor') {
      switch (activePage) {
        case 'visitor-home':
          return <VisitorLanding onStartTrail={handleVisitorStartTrail} onNavigate={handleVisitorNavigate} />;
        case 'visitor-learning':
          return <VisitorLearningCenter onEnroll={handleEnrollment} />;
        case 'visitor-community':
          return <VisitorCommunity onEnroll={handleEnrollment} />;
        case 'visitor-events':
          return <VisitorEvents onEnroll={handleEnrollment} />;
        case 'merch-store':
          return (
            <MerchStore 
              isAuthenticated={false}
              currentPoints={0}
              onPointsRedeem={(points) => console.log('Redeeming points:', points)}
              onAddToCart={(productId) => console.log('Added to cart:', productId)}
            />
          );
        case 'portfolio':
          return <PortfolioGallery onNavigate={(page, slug) => {
            setActivePage(page);
            if (slug) setPortfolioSlug(slug);
          }} />;
        case 'portfolio-detail':
          return <PortfolioDetail slug={portfolioSlug} onNavigate={setActivePage} />;
        default:
          return <VisitorLanding onStartTrail={handleVisitorStartTrail} onNavigate={handleVisitorNavigate} />;
      }
    }

    // Enrolled User Pages
    switch (activePage) {
      case 'learner':
        return <LearnerHome onNavigate={setActivePage} />;
      case 'coach-dashboard':
        return <CoachDashboard />;
      case 'admin-panel':
        return <AdminPanel />;
      case 'trail-missions':
        return <TrailMissions onNavigate={setActivePage} />;
      case 'capstone-projects':
        return (
          <ProjectsHub 
            userRole="learner" 
            capstoneComplete={capstoneComplete}
            onCapstoneComplete={() => setCapstoneComplete(true)}
          />
        );
      case 'skills-assessment':
        return <SkillsAssessment onNavigate={setActivePage} />;
      case 'skills-iq-assessment':
        return <SkillsIQAssessment onNavigate={setActivePage} />;
      case 'profile':
        return <Profile onNavigate={setActivePage} />;
      case 'self-assessment':
        return <SelfAssessment onNavigate={setActivePage} />;
      case 'learning-center':
        return <LearningCenter onNavigate={setActivePage} />;
      case 'community':
        return <Community onNavigate={setActivePage} />;
      case 'forums':
        return <DiscussionForums onNavigate={setActivePage} />;
      case 'merch-store':
        return (
          <MerchStore 
            isAuthenticated={userMode === 'enrolled'}
            currentPoints={2380}
            onPointsRedeem={(points) => console.log('Redeeming points:', points)}
            onAddToCart={(productId) => console.log('Added to cart:', productId)}
          />
        );
      case 'order-history':
        return (
          <OrderHistory 
            currentPoints={2380}
            totalPointsEarned={3500}
            totalPointsSpent={1120}
          />
        );
      case 'portfolio':
        return <PortfolioGallery onNavigate={(page, slug) => {
          setActivePage(page);
          if (slug) setPortfolioSlug(slug);
        }} />;
      case 'portfolio-detail':
        return <PortfolioDetail slug={portfolioSlug} onNavigate={setActivePage} />;
      case 'trail-mastery':
        return <TrailOfMastery 
          onNavigate={(page, trailId) => {
            setActivePage(page as PageType);
            if (trailId) setSelectedTrailId(trailId);
          }}
          onBack={() => setActivePage('learning-center')}
          userPoints={2380}
          userLevel="Explorer"
        />;
      case 'trail-detail':
        return <TrailDetail 
          trailId={selectedTrailId}
          onNavigate={setActivePage}
          onBack={() => setActivePage('trail-mastery')}
        />;
      default:
        return <LearnerHome onNavigate={setActivePage} />;
    }
  };

  return (
    <ThemeProvider>
      <div className="min-h-screen bg-trail-cream dark:bg-slate-900">
        {/* Mode Toggle - Development/Demo Tool (Remove in production) */}
        <div className="fixed bottom-4 left-4 z-50 group">
          <div className="bg-white dark:bg-slate-800 rounded-lg shadow-lg border-2 border-gray-300 dark:border-slate-700 overflow-hidden hover:shadow-xl transition-shadow">
            <div className="bg-gray-800 dark:bg-slate-950 text-white px-3 py-1 text-xs flex items-center justify-between">
              <span>Demo Mode</span>
              <span className="text-gray-400">🔄</span>
            </div>
            <div className="p-2 flex gap-2">
              <button
                onClick={handleSwitchToVisitor}
                className={`px-3 py-1.5 text-xs rounded transition-all ${
                  userMode === 'visitor'
                    ? 'bg-sky-blue text-white shadow-sm'
                    : 'bg-gray-100 dark:bg-slate-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-slate-600'
                }`}
                title="View as a visitor exploring the platform"
              >
                👤 Visitor
              </button>
              <button
                onClick={handleSignIn}
                className={`px-3 py-1.5 text-xs rounded transition-all ${
                  userMode === 'enrolled'
                    ? 'bg-penny-guide text-white shadow-sm'
                    : 'bg-gray-100 dark:bg-slate-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-slate-600'
                }`}
                title="View as an enrolled learner"
              >
                🎓 Enrolled
              </button>
            </div>
            <div className="px-2 pb-2 pt-0">
              <div className="text-xs text-gray-500 dark:text-gray-400 bg-gray-50 dark:bg-slate-700/50 rounded px-2 py-1">
                {userMode === 'visitor' 
                  ? '✓ Visitor Trail active' 
                  : '✓ Full access enabled'}
              </div>
            </div>
          </div>
          {/* Tooltip */}
          <div className="absolute bottom-full left-0 mb-2 hidden group-hover:block">
            <div className="bg-gray-900 dark:bg-slate-950 text-white text-xs rounded px-3 py-2 whitespace-nowrap">
              Toggle between visitor and enrolled experiences
              <div className="absolute top-full left-4 -mt-1 w-2 h-2 bg-gray-900 dark:bg-slate-950 transform rotate-45"></div>
            </div>
          </div>
        </div>

        {/* Theme Toggle - Development/Demo Tool */}
        <div className="fixed bottom-4 right-4 z-50">
          <div className="flex items-center gap-2 bg-white dark:bg-slate-800 rounded-lg shadow-lg border-2 border-gray-300 dark:border-slate-700 px-3 py-2">
            <span className="text-xs text-gray-600 dark:text-gray-400">Theme:</span>
            <ThemeToggle />
          </div>
        </div>

      {/* Audience/Role Toggle - Salesforce Experience Cloud Testing (Development Only) */}
      <div className="fixed bottom-24 left-4 z-50">
        <AudienceToggle
          currentRole={testRole}
          onRoleChange={setTestRole}
          variant="dropdown"
          label="SF Audience"
          showInProduction={false}
        />
      </div>

      {/* Role Indicator Badge */}
      <RoleIndicator currentRole={testRole} />

      {/* Navigation - Different for Visitor vs Enrolled */}
      {userMode === 'visitor' ? (
        <VisitorNavigation 
          activePage={activePage} 
          setActivePage={setActivePage}
          onSignIn={handleSignIn}
        />
      ) : (
        <Navigation 
          activePage={activePage} 
          setActivePage={setActivePage} 
        />
      )}
      
      {renderPage()}
      
      {/* Context-aware Penny Floating Widget - Only for enrolled users */}
      {userMode === 'enrolled' && (
        <PennyFloatingWidget context={getPennyContext()} currentPage={activePage} />
      )}

      {/* Locked Feature Modal */}
      {lockedFeature && (
        <LockedFeatureModal 
          feature={lockedFeature}
          onClose={() => setLockedFeature(null)}
          onEnroll={handleEnrollment}
        />
      )}

      {/* Toast Notifications */}
      <Toaster position="bottom-right" />
      </div>
    </ThemeProvider>
  );
}
