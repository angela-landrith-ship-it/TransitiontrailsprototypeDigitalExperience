import { X, Check, ArrowRight, Sparkles, Trophy, Target, Users, GraduationCap, MessageSquare, Briefcase } from 'lucide-react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';

interface UpgradePromptModalProps {
  isOpen: boolean;
  onClose: () => void;
  onUpgrade: () => void;
  triggerReason?: 'progress' | 'time' | 'engagement' | 'manual';
  visitorProgress?: number;
  visitorName?: string;
}

export function UpgradePromptModal({ 
  isOpen, 
  onClose, 
  onUpgrade,
  triggerReason = 'manual',
  visitorProgress = 0,
  visitorName
}: UpgradePromptModalProps) {
  if (!isOpen) return null;

  const benefits = [
    {
      icon: GraduationCap,
      title: '12-Week Structured Learning Path',
      description: 'Complete curriculum from foundations to certification prep'
    },
    {
      icon: Target,
      title: 'Personal Learning Coach',
      description: 'Bi-weekly 1:1 sessions with experienced Salesforce coaches'
    },
    {
      icon: Trophy,
      title: 'Capstone Project',
      description: 'Build a real Salesforce application for a nonprofit partner'
    },
    {
      icon: Users,
      title: 'Full Community Access',
      description: 'Private study groups, peer reviews, and exclusive events'
    },
    {
      icon: MessageSquare,
      title: 'Direct Coach Messaging',
      description: 'Get help when you need it via Slack or in-app chat'
    },
    {
      icon: Briefcase,
      title: 'Career Placement Support',
      description: 'Resume reviews, interview prep, and job referral network'
    }
  ];

  const getProgressMessage = () => {
    if (triggerReason === 'progress' && visitorProgress >= 70) {
      return {
        title: `🎉 Amazing Progress, ${visitorName || 'There'}!`,
        subtitle: `You've completed ${visitorProgress}% of the Visitor Trail`,
        message: "You're clearly serious about this journey. Ready to unlock the full experience?"
      };
    }
    if (triggerReason === 'time') {
      return {
        title: '🗺️ Ready to Go Deeper?',
        subtitle: "You've been exploring for a while",
        message: "Join thousands of learners transforming their careers with the Guided Trail."
      };
    }
    if (triggerReason === 'engagement') {
      return {
        title: "✨ You're Curious About More!",
        subtitle: 'We noticed you checking out premium features',
        message: "The Guided Trail unlocks everything you've been exploring—and so much more."
      };
    }
    return {
      title: '🚀 Upgrade to Guided Trail',
      subtitle: 'Transform your learning experience',
      message: 'Get structured learning, personal coaching, and career support.'
    };
  };

  const progressMsg = getProgressMessage();

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-fade-in">
      <div className="bg-[#F5F3E8] rounded-xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-gradient-to-r from-[#F9A03F] to-[#e89135] text-white p-6 rounded-t-xl">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <Badge className="bg-white/20 text-white mb-2 border-0">
                Limited Time Offer
              </Badge>
              <h2 className="text-3xl mb-2">{progressMsg.title}</h2>
              <p className="text-white/90 text-lg">{progressMsg.subtitle}</p>
            </div>
            <button
              onClick={onClose}
              className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Personal Message */}
          <div className="bg-white border-2 border-[#F9A03F]/30 rounded-lg p-4">
            <p className="text-gray-700">{progressMsg.message}</p>
          </div>

          {/* Benefits Grid */}
          <div>
            <h3 className="text-xl text-gray-900 mb-4">What You'll Unlock:</h3>
            <div className="grid md:grid-cols-2 gap-4">
              {benefits.map((benefit) => {
                const Icon = benefit.icon;
                return (
                  <div key={benefit.title} className="bg-white rounded-lg p-4 border border-gray-200">
                    <div className="flex items-start space-x-3">
                      <div className="w-10 h-10 rounded-lg bg-[#F9A03F]/10 flex items-center justify-center flex-shrink-0">
                        <Icon className="w-5 h-5 text-[#F9A03F]" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="text-gray-900 mb-1">{benefit.title}</h4>
                        <p className="text-sm text-gray-600">{benefit.description}</p>
                      </div>
                      <Check className="w-5 h-5 text-[#3B6A52] flex-shrink-0" />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Pricing */}
          <div className="bg-gradient-to-br from-[#3B6A52] to-[#2C6975] text-white rounded-lg p-6">
            <div className="text-center mb-6">
              <p className="text-white/80 mb-2">Investment</p>
              <div className="flex items-baseline justify-center space-x-2">
                <span className="text-5xl">$1,495</span>
                <span className="text-xl text-white/80">/learner</span>
              </div>
              <p className="text-sm text-white/70 mt-2">12-week comprehensive program</p>
            </div>

            <div className="space-y-2">
              <div className="flex items-center space-x-2 text-sm">
                <Check className="w-4 h-4 text-[#7EB5C1]" />
                <span>Next cohort starts: January 15, 2025</span>
              </div>
              <div className="flex items-center space-x-2 text-sm">
                <Check className="w-4 h-4 text-[#7EB5C1]" />
                <span>Limited to 25 learners per cohort</span>
              </div>
              <div className="flex items-center space-x-2 text-sm">
                <Check className="w-4 h-4 text-[#7EB5C1]" />
                <span>Payment plans available</span>
              </div>
            </div>
          </div>

          {/* Social Proof */}
          <div className="bg-white/50 border border-[#7EB5C1]/30 rounded-lg p-4">
            <div className="flex items-center space-x-4 mb-3">
              <div className="flex -space-x-2">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#2C6975] to-[#7EB5C1] border-2 border-white flex items-center justify-center text-white text-sm">JD</div>
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#F9A03F] to-[#e89135] border-2 border-white flex items-center justify-center text-white text-sm">SM</div>
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#3B6A52] to-[#2C6975] border-2 border-white flex items-center justify-center text-white text-sm">AK</div>
              </div>
              <div>
                <p className="text-gray-900">Join 2,847 Guided Trail alumni</p>
                <p className="text-sm text-gray-600">87% placed in Salesforce roles within 6 months</p>
              </div>
            </div>
            <p className="text-sm text-gray-700 italic">
              &quot;The Guided Trail changed my career. Within 3 months of completing, I landed my dream job at a nonprofit.&quot;
              <span className="block text-gray-600 mt-1">— Sarah M., Salesforce Admin</span>
            </p>
          </div>

          {/* Penny Encouragement */}
          {visitorProgress >= 70 && (
            <div className="bg-gradient-to-r from-[#7EB5C1]/10 to-[#2C6975]/10 border-2 border-[#7EB5C1]/30 rounded-lg p-4">
              <div className="flex items-start space-x-3">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#7EB5C1] to-[#2C6975] flex items-center justify-center flex-shrink-0">
                  <Sparkles className="w-6 h-6 text-white" />
                </div>
                <div className="flex-1">
                  <p className="text-gray-900 mb-1">Message from Penny:</p>
                  <p className="text-gray-700 italic">
                    &quot;I&apos;ve been watching your progress, {visitorName}. You&apos;re doing great work! You&apos;ve completed {visitorProgress}% of the Visitor Trail, which shows real dedication. The Guided Trail will give you the structure and support to reach your goals even faster. I&apos;ll be with you every step of the way! 🚀&quot;
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-3">
            <Button
              onClick={onClose}
              variant="outline"
              className="flex-1 border-gray-300 text-gray-700 hover:bg-gray-50"
            >
              Maybe Later
            </Button>
            <Button
              onClick={onUpgrade}
              className="flex-1 bg-[#F9A03F] hover:bg-[#e89135] text-white shadow-lg hover:shadow-xl transition-all"
            >
              <span>Enroll in Guided Trail</span>
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </div>

          {/* Fine Print */}
          <p className="text-xs text-gray-500 text-center">
            30-day money-back guarantee if you&apos;re not completely satisfied
          </p>
        </div>
      </div>
    </div>
  );
}
