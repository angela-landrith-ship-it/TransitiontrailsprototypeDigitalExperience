import { useState } from 'react';
import { LearnerHome } from './components/LearnerHome';
import { CoachDashboard } from './components/CoachDashboard';
import { AdminPanel } from './components/AdminPanel';
import { PennyChat } from './components/PennyChat';
import { Navigation } from './components/Navigation';
import { TrailMissions } from './components/TrailMissions';
import { CapstoneProjects } from './components/CapstoneProjects';
import { SkillsAssessment } from './components/SkillsAssessment';
import { Profile } from './components/Profile';
import { SelfAssessment } from './components/SelfAssessment';
import { LearningCenter } from './components/LearningCenter';
import { Community } from './components/Community';
import { PennyFloatingWidget } from './components/PennyFloatingWidget';
import { SkillsIQAssessment } from './components/SkillsIQAssessment';
import { Toaster } from './components/ui/sonner';

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
  | 'community';

export default function App() {
  const [activePage, setActivePage] = useState<PageType>('learner');
  const [isPennyChatOpen, setIsPennyChatOpen] = useState(false);

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
        return <CapstoneProjects onNavigate={setActivePage} />;
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
      default:
        return <LearnerHome onNavigate={setActivePage} />;
    }
  };

  return (
    <div className="min-h-screen bg-[#F5F3E8]">
      <Navigation 
        activePage={activePage} 
        setActivePage={setActivePage} 
      />
      
      {renderPage()}
      
      {/* Context-aware Penny Floating Widget */}
      <PennyFloatingWidget context={getPennyContext()} currentPage={activePage} />

      {/* Toast Notifications */}
      <Toaster position="bottom-right" />
    </div>
  );
}
