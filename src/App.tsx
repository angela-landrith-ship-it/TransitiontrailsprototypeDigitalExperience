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
import { Toaster } from './components/ui/sonner';

export type PageType = 
  | 'learner' 
  | 'coach' 
  | 'admin' 
  | 'trail-missions' 
  | 'capstone-projects' 
  | 'skills-assessment'
  | 'profile'
  | 'self-assessment'
  | 'learning-center'
  | 'community';

export default function App() {
  const [activePage, setActivePage] = useState<PageType>('learner');
  const [isPennyChatOpen, setIsPennyChatOpen] = useState(false);

  const renderPage = () => {
    switch (activePage) {
      case 'learner':
        return <LearnerHome onNavigate={setActivePage} />;
      case 'coach':
        return <CoachDashboard />;
      case 'admin':
        return <AdminPanel />;
      case 'trail-missions':
        return <TrailMissions onNavigate={setActivePage} />;
      case 'capstone-projects':
        return <CapstoneProjects onNavigate={setActivePage} />;
      case 'skills-assessment':
        return <SkillsAssessment onNavigate={setActivePage} />;
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
      
      <PennyChat isOpen={isPennyChatOpen} onClose={() => setIsPennyChatOpen(false)} />
      
      {/* Floating Penny Button */}
      <button
        onClick={() => setIsPennyChatOpen(true)}
        className="fixed bottom-6 right-6 w-16 h-16 rounded-full bg-gradient-to-br from-[#2C6975] to-[#7EB5C1] text-white shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center z-40"
        aria-label="Open Penny AI Assistant"
      >
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
        </svg>
      </button>

      {/* Toast Notifications */}
      <Toaster position="bottom-right" />
    </div>
  );
}
