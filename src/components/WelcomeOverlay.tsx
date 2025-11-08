import { Sparkles, CheckCircle, MessageSquare, Target, Calendar, ArrowRight, X } from 'lucide-react';
import { Button } from './ui/button';
import { useState } from 'react';

interface WelcomeOverlayProps {
  isOpen: boolean;
  onComplete: () => void;
  userName: string;
  coachName: string;
  coachAvatar?: string;
  startDate?: string;
}

export function WelcomeOverlay({
  isOpen,
  onComplete,
  userName,
  coachName,
  coachAvatar,
  startDate
}: WelcomeOverlayProps) {
  const [step, setStep] = useState(1);

  if (!isOpen) return null;

  const nextSteps = [
    {
      icon: MessageSquare,
      title: `Meet your coach: ${coachName}`,
      description: 'Your personal learning coach will guide you through the 12-week journey',
      action: 'Message your coach',
      color: '#2C6975'
    },
    {
      icon: Users,
      title: 'Join your Slack group',
      description: 'Connect with your cohort and get real-time support',
      action: 'Open Slack workspace',
      color: '#7EB5C1'
    },
    {
      icon: Target,
      title: 'Select your learning goals',
      description: 'Set your certification targets and career objectives',
      action: 'Set your goals',
      color: '#F9A03F'
    }
  ];

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-md flex items-center justify-center z-50 p-4 animate-fade-in">
      {step === 1 ? (
        /* Welcome Screen */
        <div className="bg-[#F5F3E8] rounded-xl shadow-2xl max-w-2xl w-full p-8 animate-scale-in">
          {/* Confetti Animation */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-xl">
            <div className="absolute top-0 left-1/4 w-3 h-3 bg-[#F9A03F] rounded-full animate-confetti-1"></div>
            <div className="absolute top-0 right-1/4 w-3 h-3 bg-[#7EB5C1] rounded-full animate-confetti-2"></div>
            <div className="absolute top-1/4 left-1/3 w-2 h-2 bg-[#3B6A52] rounded-full animate-confetti-3"></div>
            <div className="absolute top-1/4 right-1/3 w-2 h-2 bg-[#F9A03F] rounded-full animate-confetti-4"></div>
            <div className="absolute top-1/2 left-1/4 w-2.5 h-2.5 bg-[#2C6975] rounded-full animate-confetti-1" style={{ animationDelay: '0.2s' }}></div>
            <div className="absolute top-1/2 right-1/4 w-2.5 h-2.5 bg-[#7EB5C1] rounded-full animate-confetti-2" style={{ animationDelay: '0.3s' }}></div>
          </div>

          <div className="text-center relative z-10">
            {/* Animated Penny Avatar */}
            <div className="relative mb-6">
              <div className="w-24 h-24 rounded-full bg-gradient-to-br from-[#3B6A52] to-[#2C6975] mx-auto flex items-center justify-center ring-4 ring-[#3B6A52]/30 animate-bounce-subtle">
                <Sparkles className="w-12 h-12 text-white" />
              </div>
              <div className="absolute -bottom-2 left-1/2 -translate-x-1/2">
                <CheckCircle className="w-8 h-8 text-[#3B6A52] bg-[#F5F3E8] rounded-full" />
              </div>
            </div>

            {/* Welcome Message */}
            <h2 className="text-4xl text-gray-900 mb-2">
              Welcome to the Guided Trail!
            </h2>
            <p className="text-xl text-gray-700 mb-6">
              Hi {userName}, you're now on the Guided Trail! 🎉
            </p>

            {/* Program Details */}
            <div className="bg-gradient-to-br from-[#3B6A52]/10 to-[#2C6975]/10 rounded-lg p-6 mb-6 border-2 border-[#3B6A52]/20">
              <p className="text-gray-900 mb-4">
                Your personalized 12-week learning journey starts now.
              </p>
              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <p className="text-2xl text-[#3B6A52] mb-1">12</p>
                  <p className="text-xs text-gray-600">Weeks</p>
                </div>
                <div>
                  <p className="text-2xl text-[#2C6975] mb-1">3,500</p>
                  <p className="text-xs text-gray-600">Points</p>
                </div>
                <div>
                  <p className="text-2xl text-[#F9A03F] mb-1">1</p>
                  <p className="text-xs text-gray-600">Capstone</p>
                </div>
              </div>
            </div>

            {/* Penny Quote */}
            <div className="bg-white/50 border-2 border-[#7EB5C1]/30 rounded-lg p-4 mb-6">
              <p className="text-gray-900 italic">
                "I'll be with you every step of the way, {userName}. Let's make this journey amazing!"
              </p>
              <p className="text-sm text-gray-600 mt-1">— Penny, Your AI Guide</p>
            </div>

            {/* Start Date */}
            {startDate && (
              <p className="text-sm text-gray-600 mb-6">
                Your cohort begins: <span className="text-gray-900">{startDate}</span>
              </p>
            )}

            {/* CTA */}
            <Button
              onClick={() => setStep(2)}
              className="w-full bg-[#3B6A52] hover:bg-[#2d5240] text-white py-6 text-lg shadow-lg hover:shadow-xl transition-all"
            >
              <span>Let's Get Started</span>
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </div>
        </div>
      ) : (
        /* Next Steps Screen */
        <div className="bg-[#F5F3E8] rounded-xl shadow-2xl max-w-3xl w-full p-8 animate-scale-in">
          <div className="flex items-start justify-between mb-6">
            <div>
              <h2 className="text-3xl text-gray-900 mb-2">Your Next Steps</h2>
              <p className="text-gray-600">Complete these three actions to get started</p>
            </div>
            <button
              onClick={onComplete}
              className="w-8 h-8 rounded-full bg-gray-200 hover:bg-gray-300 flex items-center justify-center transition-colors"
            >
              <X className="w-5 h-5 text-gray-600" />
            </button>
          </div>

          {/* Next Steps Cards */}
          <div className="space-y-4 mb-8">
            {nextSteps.map((step, index) => {
              const Icon = step.icon;
              return (
                <div 
                  key={index}
                  className="bg-white rounded-lg p-6 border-2 hover:shadow-md transition-all"
                  style={{ borderColor: `${step.color}30` }}
                >
                  <div className="flex items-start space-x-4">
                    {/* Step Number */}
                    <div 
                      className="w-10 h-10 rounded-full flex items-center justify-center text-white flex-shrink-0"
                      style={{ backgroundColor: step.color }}
                    >
                      <span>{index + 1}</span>
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <h3 className="text-gray-900 mb-1">{step.title}</h3>
                      <p className="text-sm text-gray-600 mb-3">{step.description}</p>
                      
                      {/* Action Button */}
                      <Button
                        onClick={() => {/* Handle specific action */}}
                        variant="outline"
                        className="text-sm"
                        style={{ borderColor: step.color, color: step.color }}
                      >
                        <Icon className="w-4 h-4 mr-2" />
                        {step.action}
                      </Button>
                    </div>

                    {/* Icon */}
                    <div 
                      className="w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0"
                      style={{ backgroundColor: `${step.color}15` }}
                    >
                      <Icon className="w-6 h-6" style={{ color: step.color }} />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Coach Card */}
          <div className="bg-gradient-to-br from-[#2C6975] to-[#3B6A52] text-white rounded-lg p-6 mb-6">
            <div className="flex items-center space-x-4 mb-4">
              <div className="w-16 h-16 rounded-full bg-white/20 flex items-center justify-center text-2xl">
                {coachAvatar || coachName.split(' ').map(n => n[0]).join('')}
              </div>
              <div>
                <p className="text-white/80 text-sm">Your Learning Coach</p>
                <p className="text-xl">{coachName}</p>
              </div>
            </div>
            <p className="text-white/90 text-sm mb-4">
              {coachName} will be your guide throughout the 12-week journey. You'll have bi-weekly 1:1 sessions and can reach out anytime via Slack.
            </p>
            <div className="flex gap-3">
              <Button
                onClick={() => {/* Open message modal */}}
                variant="outline"
                className="flex-1 bg-white/10 border-white/30 text-white hover:bg-white/20"
              >
                <MessageSquare className="w-4 h-4 mr-2" />
                Message
              </Button>
              <Button
                onClick={() => {/* Open calendar */}}
                variant="outline"
                className="flex-1 bg-white/10 border-white/30 text-white hover:bg-white/20"
              >
                <Calendar className="w-4 h-4 mr-2" />
                Schedule 1:1
              </Button>
            </div>
          </div>

          {/* Complete CTA */}
          <Button
            onClick={onComplete}
            className="w-full bg-[#3B6A52] hover:bg-[#2d5240] text-white py-6 text-lg shadow-lg hover:shadow-xl transition-all"
          >
            <CheckCircle className="w-5 h-5 mr-2" />
            <span>Go to Dashboard</span>
          </Button>

          <p className="text-xs text-gray-500 text-center mt-4">
            You can access these actions anytime from your dashboard
          </p>
        </div>
      )}
    </div>
  );
}
