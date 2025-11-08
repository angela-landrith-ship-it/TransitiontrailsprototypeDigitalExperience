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
import { AudienceToggle, RoleIndicator, type UserRole, AudienceSelector, type AudienceRole } from './components/integrations';
import { ThemeProvider } from './components/ThemeProvider';
import { ThemeToggle } from './components/ThemeToggle';
import { PortfolioGallery } from './components/PortfolioGallery';
import { PortfolioDetail } from './components/PortfolioDetail';
import { TrailOfMastery } from './components/TrailOfMastery';
import { TrailDetail } from './components/TrailDetail';
import { DiscussionForums } from './components/DiscussionForums';
import { PeerReviewHub } from './components/PeerReviewHub';
import { StudyGroupsHub } from './components/StudyGroupsHub';
import { MessagingHub } from './components/MessagingHub';
import { ProfileDirectory } from './components/ProfileDirectory';
import { ExplorersWelcomePage } from './components/ExplorersWelcomePage';
import { WelcomeOverlay } from './components/WelcomeOverlay';
import PostcardsFromTheFuture from './components/PostcardsFromTheFuture';
import { OurVision } from './components/OurVision';

export type PageType = 
  | 'learner' 
  | 'coach-dashboard'
  | 'admin-panel'
  | 'trail-missions' 
  | 'capstone-projects' 
  | 'peer-reviews'
  | 'study-groups'
  | 'messages'
  | 'profile-directory'
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
  | 'trail-detail'
  | 'explorers-journey'
  | 'postcards-from-future'
  | 'our-vision';

type UserMode = 'visitor' | 'enrolled';

export default function App() {
  const [userMode, setUserMode] = useState<UserMode>('visitor');
  const [activePage, setActivePage] = useState<PageType>('visitor-home');
  const [isPennyChatOpen, setIsPennyChatOpen] = useState(false);
  const [lockedFeature, setLockedFeature] = useState<'capstone' | 'skills' | 'coach' | null>(null);
  const [capstoneComplete, setCapstoneComplete] = useState(false);
  const [portfolioSlug, setPortfolioSlug] = useState<string>('');
  const [selectedTrailId, setSelectedTrailId] = useState<string>('');
  const [showWelcomeOverlay, setShowWelcomeOverlay] = useState(false);
  const [isMasteryGraduate, setIsMasteryGraduate] = useState(false);
  
  // Development: Audience/Role Toggle (hidden in production)
  const [testRole, setTestRole] = useState<UserRole>('learner');
  const [audienceRole, setAudienceRole] = useState<AudienceRole>('guided-trail');

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

  const handleAudienceRoleChange = (role: AudienceRole) => {
    setAudienceRole(role);
    
    // Update app state based on role
    switch (role) {
      case 'unregistered':
        setUserMode('visitor');
        setActivePage('visitor-home');
        break;
      case 'visitor-trail':
        setUserMode('visitor');
        setActivePage('visitor-learning');
        break;
      case 'guided-trail':
        setUserMode('enrolled');
        setActivePage('learner');
        break;
      case 'mastery-trail':
        setUserMode('enrolled');
        setActivePage('trail-mastery');
        break;
      case 'explorer-journey':
        setUserMode('enrolled');
        setActivePage('explorers-journey');
        break;
      case 'coach':
        setUserMode('enrolled');
        setActivePage('coach-dashboard');
        setTestRole('coach');
        break;
      case 'partner':
        setUserMode('enrolled');
        setActivePage('capstone-projects');
        setTestRole('partner');
        break;
      case 'admin':
        setUserMode('enrolled');
        setActivePage('admin-panel');
        setTestRole('admin');
        break;
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
        case 'postcards-from-future':
          return <PostcardsFromTheFuture onNavigate={setActivePage} />;
        case 'our-vision':
          return <OurVision 
            onDonate={() => setActivePage('postcards-from-future')}
            onVolunteer={() => setActivePage('visitor-home')}
            onLearnMore={() => setActivePage('visitor-learning')}
          />;
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
            onNavigate={setActivePage}
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
      case 'peer-reviews':
        return <PeerReviewHub onNavigate={setActivePage} />;
      case 'study-groups':
        return <StudyGroupsHub onNavigate={setActivePage} />;
      case 'messages':
        return <MessagingHub onNavigate={setActivePage} />;
      case 'profile-directory':
        return <ProfileDirectory onNavigate={setActivePage} />;
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
      case 'explorers-journey':
        return <ExplorersWelcomePage
          onJoin={(subscription) => {
            console.log('Joining Explorer\'s Journey:', subscription);
            // In production: Create subscription & update user profile
            setActivePage('learner'); // Navigate to explorer dashboard (to be built)
          }}
          onNavigate={setActivePage}
          isMasteryGraduate={isMasteryGraduate}
          userName="Alex" // In production: from current user
        />;
      case 'postcards-from-future':
        return <PostcardsFromTheFuture />;
      default:
        return (
          <>
            <LearnerHome onNavigate={setActivePage} />
            {/* Welcome Overlay for first-time users */}
            <WelcomeOverlay
              isOpen={showWelcomeOverlay}
              onComplete={() => {
                setShowWelcomeOverlay(false);
                localStorage.setItem('hasSeenGuidedWelcome', 'true');
              }}
              userName="Alex" // In production: from current user
              coachName="Sarah Martinez"
              coachAvatar="SM"
              startDate="January 15, 2025"
            />
          </>
        );
    }
  };

  return (
    <ThemeProvider>
      <div className="min-h-screen bg-trail-cream dark:bg-slate-900">
        {/* Enhanced Audience Selector - Top Right */}
        <AudienceSelector
          currentRole={audienceRole}
          onRoleChange={handleAudienceRoleChange}
          onRefresh={() => window.location.reload()}
        />

        {/* Theme Toggle - Bottom Right */}
        <div className="fixed bottom-4 right-4 z-40">
          <div className="flex items-center gap-2 bg-white dark:bg-slate-800 rounded-lg shadow-lg border-2 border-gray-300 dark:border-slate-700 px-3 py-2">
            <span className="text-xs text-gray-600 dark:text-gray-400">Theme:</span>
            <ThemeToggle />
          </div>
        </div>

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
