import { Sparkles, X, MessageSquare, ChevronDown, ChevronUp } from 'lucide-react';
import { useState, useEffect } from 'react';
import { PageType } from '../App';

interface PennyFloatingWidgetProps {
  context?: 'learning' | 'coaching' | 'profile' | 'default';
  currentPage?: PageType;
}

export function PennyFloatingWidget({ context = 'default', currentPage }: PennyFloatingWidgetProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messageInput, setMessageInput] = useState('');
  const [chatHistory, setChatHistory] = useState<Array<{ sender: 'penny' | 'user', message: string }>>([]);

  // Context-based color ring
  const contextColors = {
    learning: 'from-[#F9A03F] to-[#e89135]', // Amber
    coaching: 'from-[#7EB5C1] to-[#5a9fb0]', // Sky Blue
    profile: 'from-[#3B6A52] to-[#2d5240]', // Evergreen
    default: 'from-[#2C6975] to-[#1f4f5a]', // Summit Teal
  };

  // Context-based quick actions
  const quickActions = {
    learning: [
      'Recommend a course',
      'How to start my Capstone',
      'Track my progress',
      'What should I learn next?',
    ],
    coaching: [
      'Who needs my attention?',
      'Review team progress',
      'Mission suggestions',
      'How to give feedback',
    ],
    profile: [
      'Improve my LinkedIn',
      'Update my resume',
      'Set career goals',
      'What skills to focus on?',
    ],
    default: [
      'How can you help me?',
      'What\'s new today?',
      'Show my progress',
      'Need guidance',
    ],
  };

  const currentQuickActions = quickActions[context];
  const currentColor = contextColors[context];

  const handleQuickAction = (action: string) => {
    setMessageInput(action);
    setChatHistory([
      ...chatHistory,
      { sender: 'user', message: action },
      { sender: 'penny', message: getPennyResponse(action) },
    ]);
    setMessageInput('');
  };

  const getPennyResponse = (question: string): string => {
    // Mock responses based on context
    const responses: Record<string, string> = {
      'Recommend a course': '📚 Based on your Salesforce Admin trail and current progress, I recommend starting with "Advanced Flow Builder" on Trailhead. It builds on your automation skills and aligns with your certification goals!',
      'How to start my Capstone': '🚀 Great timing! Your capstone project is ready to begin. I\'ve set up your Linear workspace and connected it to GitHub. Start by reviewing the nonprofit partner brief in the Capstone tab.',
      'Track my progress': '📊 You\'re at 68% toward your Salesforce Admin certification! You\'ve completed 18/24 modules. Focus on Security & Access this week to stay on track for your May exam.',
      'What should I learn next?': '🎯 Your Skills IQ shows Security & Access is your weakest area (58%). I recommend the "Data Security" module before your certification exam in 6 weeks.',
      'Who needs my attention?': '👥 3 learners need check-ins: Alex is stuck on Flow Builder, Jordan missed 2 weekly goals, and Sam has a capstone question pending for 2 days.',
      'Improve my LinkedIn': '✨ Your LinkedIn headline needs "Salesforce" for 3x better recruiter visibility! I\'ve drafted an optimized version in your Profile > Resume & LinkedIn tab.',
      'Update my resume': '📄 I analyzed your resume - ATS score is 85/100. Add quantifiable results from your capstone project (e.g., "Improved data accuracy by 40%"). Check the Resume Builder for my suggestions.',
      'Set career goals': '🎯 Let\'s create a roadmap! Based on your trail, I suggest: 1) Earn Admin cert by May, 2) Complete capstone by June, 3) Land Salesforce role by July. Want me to break these into milestones?',
    };

    return responses[question] || '💡 Great question! I\'m here to help you succeed in your Salesforce journey. Can you tell me more about what you\'re looking for?';
  };

  const handleSendMessage = () => {
    if (!messageInput.trim()) return;
    
    setChatHistory([
      ...chatHistory,
      { sender: 'user', message: messageInput },
      { sender: 'penny', message: getPennyResponse(messageInput) },
    ]);
    setMessageInput('');
  };

  // Pulse animation for attention
  const [isPulsing, setIsPulsing] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsPulsing(false), 5000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {/* Floating Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className={`fixed bottom-6 right-6 z-50 group transition-all duration-300 hover:scale-110 ${
            isPulsing ? 'animate-pulse' : ''
          }`}
          aria-label="Open Penny AI Assistant"
        >
          {/* Color Ring */}
          <div className={`absolute inset-0 rounded-full bg-gradient-to-br ${currentColor} opacity-20 blur-xl animate-pulse`}></div>
          
          {/* Main Button */}
          <div className={`relative w-16 h-16 rounded-full bg-gradient-to-br ${currentColor} shadow-lg flex items-center justify-center`}>
            <Sparkles className="w-8 h-8 text-white animate-pulse" />
          </div>

          {/* Tooltip */}
          <div className="absolute bottom-full right-0 mb-2 px-3 py-2 bg-gray-900 text-white text-sm rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
            Need Help? Ask Penny
            <div className="absolute top-full right-4 w-2 h-2 bg-gray-900 transform rotate-45 -mt-1"></div>
          </div>
        </button>
      )}

      {/* Chat Panel */}
      {isOpen && (
        <div
          className={`fixed bottom-6 right-6 z-50 bg-white rounded-xl shadow-2xl border-2 border-gray-200 transition-all duration-300 ${
            isMinimized ? 'w-80 h-16' : 'w-96 h-[600px]'
          }`}
        >
          {/* Header */}
          <div className={`flex items-center justify-between p-4 border-b border-gray-200 bg-gradient-to-r ${currentColor}`}>
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="text-white">Penny AI</h3>
                <p className="text-xs text-white/80">
                  {context === 'learning' && 'Learning Assistant'}
                  {context === 'coaching' && 'Coaching Insights'}
                  {context === 'profile' && 'Profile Coach'}
                  {context === 'default' && 'Your AI Guide'}
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <button
                onClick={() => setIsMinimized(!isMinimized)}
                className="p-1 hover:bg-white/20 rounded transition-colors"
                aria-label={isMinimized ? 'Maximize' : 'Minimize'}
              >
                {isMinimized ? (
                  <ChevronUp className="w-5 h-5 text-white" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-white" />
                )}
              </button>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1 hover:bg-white/20 rounded transition-colors"
                aria-label="Close"
              >
                <X className="w-5 h-5 text-white" />
              </button>
            </div>
          </div>

          {/* Content */}
          {!isMinimized && (
            <>
              {/* Quick Actions */}
              {chatHistory.length === 0 && (
                <div className="p-4 bg-gray-50 border-b border-gray-200">
                  <p className="text-sm text-gray-700 mb-3">Quick actions:</p>
                  <div className="grid grid-cols-1 gap-2">
                    {currentQuickActions.map((action, idx) => (
                      <button
                        key={idx}
                        onClick={() => handleQuickAction(action)}
                        className="text-left text-sm px-3 py-2 bg-white border border-gray-200 rounded-lg hover:border-[#2C6975] hover:bg-[#2C6975]/5 transition-all"
                      >
                        {action}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Chat Messages */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4" style={{ height: 'calc(100% - 180px)' }}>
                {chatHistory.length === 0 ? (
                  <div className="flex flex-col items-center justify-center h-full text-center">
                    <div className={`w-16 h-16 rounded-full bg-gradient-to-br ${currentColor} flex items-center justify-center mb-4`}>
                      <Sparkles className="w-8 h-8 text-white" />
                    </div>
                    <h4 className="text-gray-900 mb-2">Hi! I'm Penny 👋</h4>
                    <p className="text-sm text-gray-600 max-w-xs">
                      I'm here to help you succeed in your Salesforce journey. Choose a quick action above or ask me anything!
                    </p>
                  </div>
                ) : (
                  <>
                    {chatHistory.map((msg, idx) => (
                      <div
                        key={idx}
                        className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                      >
                        <div
                          className={`max-w-[80%] rounded-lg p-3 ${
                            msg.sender === 'user'
                              ? 'bg-[#2C6975] text-white'
                              : 'bg-gray-100 text-gray-900'
                          }`}
                        >
                          {msg.sender === 'penny' && (
                            <div className="flex items-center space-x-2 mb-1">
                              <Sparkles className="w-3 h-3 text-[#F9A03F]" />
                              <span className="text-xs text-gray-500">Penny</span>
                            </div>
                          )}
                          <p className="text-sm">{msg.message}</p>
                        </div>
                      </div>
                    ))}
                  </>
                )}
              </div>

              {/* Input */}
              <div className="p-4 border-t border-gray-200">
                <div className="flex items-center space-x-2">
                  <input
                    type="text"
                    value={messageInput}
                    onChange={(e) => setMessageInput(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                    placeholder="Ask Penny anything..."
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2C6975] text-sm"
                  />
                  <button
                    onClick={handleSendMessage}
                    className={`p-2 rounded-lg bg-gradient-to-br ${currentColor} text-white hover:opacity-90 transition-opacity`}
                    aria-label="Send message"
                  >
                    <MessageSquare className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      )}
    </>
  );
}
