import { Sparkles, X, TrendingUp, Calendar, Share2, Award } from 'lucide-react';
import { useEffect, useState } from 'react';

interface PennyMessage {
  id: string;
  message: string;
  type: 'milestone' | 'encouragement' | 'achievement';
  icon?: any;
  timestamp: Date;
}

interface PennyEncouragementProps {
  messages: PennyMessage[];
  onDismiss: (id: string) => void;
}

export function PennyEncouragement({ messages, onDismiss }: PennyEncouragementProps) {
  const [visible, setVisible] = useState(true);
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0);

  const currentMessage = messages[currentMessageIndex];

  useEffect(() => {
    if (messages.length > 0 && currentMessageIndex < messages.length) {
      setVisible(true);
      
      // Auto-dismiss after 5 seconds
      const timer = setTimeout(() => {
        handleDismiss();
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [messages, currentMessageIndex]);

  const handleDismiss = () => {
    setVisible(false);
    setTimeout(() => {
      if (currentMessage) {
        onDismiss(currentMessage.id);
      }
      if (currentMessageIndex < messages.length - 1) {
        setCurrentMessageIndex(currentMessageIndex + 1);
      }
    }, 300);
  };

  if (!currentMessage || messages.length === 0) return null;

  const MessageIcon = currentMessage.icon || Sparkles;

  return (
    <div className={`fixed bottom-24 right-4 z-40 transition-all duration-300 ${
      visible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
    }`}>
      <div className="bg-white rounded-xl shadow-2xl border-2 border-[#7EB5C1]/30 max-w-sm animate-fade-in">
        {/* Penny Header */}
        <div className="bg-gradient-to-r from-[#7EB5C1] to-[#2C6975] text-white px-4 py-3 rounded-t-xl flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center ring-2 ring-white/30">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm">Penny AI</h4>
              <p className="text-xs text-white/80">Your Trail Guide</p>
            </div>
          </div>
          <button
            onClick={handleDismiss}
            className="w-6 h-6 rounded-full hover:bg-white/20 flex items-center justify-center transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Message Content */}
        <div className="p-4">
          <div className="flex items-start space-x-3">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
              currentMessage.type === 'achievement' 
                ? 'bg-[#F9A03F]/10 text-[#F9A03F]'
                : currentMessage.type === 'milestone'
                ? 'bg-[#3B6A52]/10 text-[#3B6A52]'
                : 'bg-[#7EB5C1]/10 text-[#7EB5C1]'
            }`}>
              <MessageIcon className="w-4 h-4" />
            </div>
            <div className="flex-1">
              <p className="text-sm text-gray-900 leading-relaxed">
                {currentMessage.message}
              </p>
            </div>
          </div>
        </div>

        {/* Progress indicator if multiple messages */}
        {messages.length > 1 && (
          <div className="px-4 pb-3 flex items-center justify-center space-x-1">
            {messages.map((_, idx) => (
              <div
                key={idx}
                className={`h-1 rounded-full transition-all ${
                  idx === currentMessageIndex
                    ? 'w-6 bg-[#7EB5C1]'
                    : 'w-1 bg-gray-300'
                }`}
              />
            ))}
          </div>
        )}
      </div>

      {/* Glow effect */}
      <div className="absolute inset-0 rounded-xl bg-[#7EB5C1]/20 blur-xl -z-10 animate-pulse" 
           style={{ animationDuration: '3s' }}
      />
    </div>
  );
}

// Helper function to generate encouragement messages
export function generatePennyMessage(
  type: 'event_attended' | 'visitor_complete' | 'linkedin_share' | 'course_complete' | 'milestone',
  context?: any
): PennyMessage {
  const messages = {
    event_attended: {
      message: "Way to stay involved! +5 Exploration Points.",
      type: 'milestone' as const,
      icon: Calendar
    },
    visitor_complete: {
      message: "That's huge progress. Want to unlock your Capstone next?",
      type: 'achievement' as const,
      icon: Award
    },
    linkedin_share: {
      message: "Every share lights another trail 🌟",
      type: 'achievement' as const,
      icon: Share2
    },
    course_complete: {
      message: `Great work completing ${context?.courseName || 'that course'}! Keep building momentum.`,
      type: 'milestone' as const,
      icon: TrendingUp
    },
    milestone: {
      message: context?.message || "You're making amazing progress!",
      type: 'milestone' as const,
      icon: Sparkles
    }
  };

  const selectedMessage = messages[type];

  return {
    id: `penny-${Date.now()}-${Math.random()}`,
    message: selectedMessage.message,
    type: selectedMessage.type,
    icon: selectedMessage.icon,
    timestamp: new Date()
  };
}

// Penny prompt suggestions component
export function PennyPromptSuggestions({ currentPoints, maxPoints }: { currentPoints: number; maxPoints: number }) {
  const suggestions = [
    {
      text: "Recommend my next challenge based on my skills",
      icon: TrendingUp,
      color: '#2C6975'
    },
    {
      text: `How close am I to ${currentPoints < 50 ? 'Trailblazer' : currentPoints < 150 ? 'Pathfinder' : 'Trail Master'} level?`,
      icon: Award,
      color: '#F9A03F'
    },
    {
      text: "Show me community events to earn more points",
      icon: Calendar,
      color: '#3B6A52'
    }
  ];

  return (
    <div className="bg-gradient-to-br from-[#7EB5C1]/10 to-[#7EB5C1]/5 border-2 border-[#7EB5C1]/30 rounded-xl p-4">
      <div className="flex items-center space-x-2 mb-3">
        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#7EB5C1] to-[#2C6975] flex items-center justify-center">
          <Sparkles className="w-4 h-4 text-white" />
        </div>
        <h4 className="text-sm text-gray-900">Ask Penny</h4>
      </div>

      <div className="space-y-2">
        {suggestions.map((suggestion, idx) => (
          <button
            key={idx}
            className="w-full text-left px-3 py-2 bg-white rounded-lg border border-gray-200 hover:border-[#7EB5C1] hover:shadow-sm transition-all text-sm text-gray-700 flex items-start space-x-2"
          >
            <suggestion.icon className="w-4 h-4 mt-0.5" style={{ color: suggestion.color }} />
            <span>{suggestion.text}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
