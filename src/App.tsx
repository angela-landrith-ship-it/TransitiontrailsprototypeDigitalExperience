import { useState } from 'react';
import { LearnerHome } from './components/LearnerHome';
import { CoachDashboard } from './components/CoachDashboard';
import { AdminPanel } from './components/AdminPanel';
import { PennyChat } from './components/PennyChat';
import { Navigation } from './components/Navigation';

export default function App() {
  const [activeFrame, setActiveFrame] = useState<'learner' | 'coach' | 'admin'>('learner');
  const [isPennyChatOpen, setIsPennyChatOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#F5F3E8]">
      <Navigation activeFrame={activeFrame} setActiveFrame={setActiveFrame} />
      
      {activeFrame === 'learner' && <LearnerHome />}
      {activeFrame === 'coach' && <CoachDashboard />}
      {activeFrame === 'admin' && <AdminPanel />}
      
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
    </div>
  );
}
