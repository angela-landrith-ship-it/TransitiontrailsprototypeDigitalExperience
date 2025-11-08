import { Sparkles, MessageCircle, FileText, CheckCircle2 } from 'lucide-react';
import { Badge } from './ui/badge';

interface PennyGuideModeProps {
  context: 'capstone' | 'partner';
  currentSection?: string;
}

export function PennyGuideMode({ context, currentSection }: PennyGuideModeProps) {
  return (
    <div className="bg-white rounded-xl shadow-sm border-2 border-[#7EB5C1]/30 p-6 sticky top-6">
      {/* Penny Avatar - Guide Mode (Teal) */}
      <div className="flex items-center space-x-3 mb-4">
        <div className="relative">
          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#7EB5C1] to-[#2C6975] flex items-center justify-center">
            <Sparkles className="w-6 h-6 text-white" />
          </div>
          {/* Calm Teal Ring */}
          <div className="absolute inset-0 rounded-full border-2 border-[#2C6975] animate-pulse-slow" />
        </div>
        <div>
          <h3 className="text-gray-900">Penny</h3>
          <Badge className="bg-[#2C6975]/10 text-[#2C6975] text-xs">
            Guide Mode
          </Badge>
        </div>
      </div>

      {/* Guidance Message */}
      <div className="mb-4 p-4 bg-[#7EB5C1]/10 rounded-lg">
        <p className="text-sm text-gray-700">
          {context === 'capstone' ? (
            <>
              "Great progress on your solution design! Remember to emphasize your testing strategy. 
              Non-developers need to see that you understand QA and User Acceptance Testing."
            </>
          ) : (
            <>
              "Welcome! I'm here to guide you through your Capstone journey with calm, thoughtful mentoring."
            </>
          )}
        </p>
      </div>

      {/* Quick Actions */}
      <div className="space-y-2">
        <button className="w-full px-4 py-2 bg-white border-2 border-gray-200 rounded-lg hover:border-[#2C6975] hover:bg-gray-50 transition-all flex items-center space-x-2 text-sm">
          <MessageCircle className="w-4 h-4 text-[#2C6975]" />
          <span className="text-gray-700">Ask Penny for Guidance</span>
        </button>

        <button className="w-full px-4 py-2 bg-white border-2 border-gray-200 rounded-lg hover:border-[#2C6975] hover:bg-gray-50 transition-all flex items-center space-x-2 text-sm">
          <FileText className="w-4 h-4 text-[#2C6975]" />
          <span className="text-gray-700">Review Best Practices</span>
        </button>

        <button className="w-full px-4 py-2 bg-white border-2 border-gray-200 rounded-lg hover:border-[#2C6975] hover:bg-gray-50 transition-all flex items-center space-x-2 text-sm">
          <CheckCircle2 className="w-4 h-4 text-[#2C6975]" />
          <span className="text-gray-700">QA Checklist</span>
        </button>
      </div>

      {/* Testing Tips */}
      <div className="mt-6 pt-6 border-t border-gray-200">
        <h4 className="text-sm text-gray-900 mb-3">Testing Best Practices</h4>
        <div className="space-y-2 text-xs text-gray-600">
          <div className="flex items-start space-x-2">
            <CheckCircle2 className="w-3 h-3 text-green-500 mt-0.5 flex-shrink-0" />
            <span>Write test cases before implementation</span>
          </div>
          <div className="flex items-start space-x-2">
            <CheckCircle2 className="w-3 h-3 text-green-500 mt-0.5 flex-shrink-0" />
            <span>Include edge cases and error handling</span>
          </div>
          <div className="flex items-start space-x-2">
            <CheckCircle2 className="w-3 h-3 text-green-500 mt-0.5 flex-shrink-0" />
            <span>Document UAT scenarios for stakeholders</span>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes pulse-slow {
          0%, 100% {
            opacity: 1;
            transform: scale(1);
          }
          50% {
            opacity: 0.5;
            transform: scale(1.1);
          }
        }
        .animate-pulse-slow {
          animation: pulse-slow 3s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }
      `}</style>
    </div>
  );
}
