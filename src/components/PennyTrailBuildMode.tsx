import { Sparkles, Zap, Send, AlertCircle, Users, Clock, MessageSquare, CheckCircle2 } from 'lucide-react';
import { useState } from 'react';
import { Badge } from './ui/badge';

export function PennyTrailBuildMode() {
  const [activeAction, setActiveAction] = useState<string | null>(null);

  const handleQuickAction = (action: string) => {
    setActiveAction(action);
    setTimeout(() => setActiveAction(null), 2000);
  };

  return (
    <div className="space-y-6 sticky top-6">
      {/* Penny TrailBuild Avatar */}
      <div className="bg-white rounded-xl shadow-lg border-2 border-[#F9A03F]/40 p-6">
        <div className="flex items-center space-x-3 mb-4">
          <div className="relative">
            {/* Animated Amber Ring - TrailBuild Mode */}
            <div className="w-14 h-14 rounded-full bg-gradient-to-br from-[#F9A03F] via-[#e89135] to-[#F9A03F] flex items-center justify-center animate-pulse-glow">
              <Sparkles className="w-7 h-7 text-white" />
            </div>
            {/* Outer Glow Ring */}
            <div className="absolute inset-0 rounded-full border-3 border-[#F9A03F] animate-ping-slow opacity-75" />
          </div>
          <div>
            <h3 className="text-lg text-gray-900">Penny</h3>
            <Badge className="bg-gradient-to-r from-[#F9A03F] to-[#e89135] text-white text-xs">
              <Zap className="w-3 h-3 mr-1" />
              TrailBuild Coordinator
            </Badge>
          </div>
        </div>

        {/* Dynamic Message */}
        <div className="p-4 bg-gradient-to-br from-[#F9A03F]/10 to-[#e89135]/10 rounded-lg mb-4 border border-[#F9A03F]/20">
          <p className="text-sm text-gray-800">
            "Amazing progress, Trail Blazers! 🚀 You're on track for demo submission. 
            Remember: Sponsor Q&A is live at 6 PM - great time to get last-minute guidance!"
          </p>
        </div>

        {/* Quick Actions */}
        <div className="space-y-2">
          <h4 className="text-xs text-gray-600 uppercase tracking-wide mb-3">Quick Actions</h4>
          
          <button
            onClick={() => handleQuickAction('demo')}
            className="w-full px-3 py-3 bg-white border-2 border-[#F9A03F] rounded-lg hover:bg-[#F9A03F]/5 transition-all flex items-center space-x-2 text-sm"
          >
            <Zap className="w-4 h-4 text-[#F9A03F]" />
            <span className="text-gray-800 flex-1 text-left">Submit Demo Link by 2 PM</span>
          </button>

          <button
            onClick={() => handleQuickAction('qa')}
            className="w-full px-3 py-3 bg-white border-2 border-[#2C6975] rounded-lg hover:bg-[#2C6975]/5 transition-all flex items-center space-x-2 text-sm"
          >
            <Users className="w-4 h-4 text-[#2C6975]" />
            <span className="text-gray-800 flex-1 text-left">Sponsor Q&A Live Now</span>
          </button>

          <button
            onClick={() => handleQuickAction('thankyou')}
            className="w-full px-3 py-3 bg-white border-2 border-[#3B6A52] rounded-lg hover:bg-[#3B6A52]/5 transition-all flex items-center space-x-2 text-sm"
          >
            <MessageSquare className="w-4 h-4 text-[#3B6A52]" />
            <span className="text-gray-800 flex-1 text-left">Draft Thank-You Post</span>
          </button>
        </div>

        {/* Action Feedback */}
        {activeAction && (
          <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-lg animate-fade-in">
            <div className="flex items-center space-x-2">
              <CheckCircle2 className="w-4 h-4 text-green-600" />
              <p className="text-sm text-green-700">
                {activeAction === 'demo' && "Reminder set! You'll get a notification at 1:30 PM."}
                {activeAction === 'qa' && 'Opening Sponsor Q&A session...'}
                {activeAction === 'thankyou' && 'Generating LinkedIn post draft...'}
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Event Alerts */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
        <h4 className="text-sm text-gray-900 mb-3 flex items-center space-x-2">
          <AlertCircle className="w-4 h-4 text-[#F9A03F]" />
          <span>Penny's Alerts</span>
        </h4>
        
        <div className="space-y-2 text-xs">
          <div className="flex items-start space-x-2 p-2 bg-[#F9A03F]/10 rounded-lg">
            <Clock className="w-3 h-3 text-[#F9A03F] mt-0.5 flex-shrink-0" />
            <span className="text-gray-700">
              <strong>2 hours</strong> until demo submission deadline
            </span>
          </div>
          <div className="flex items-start space-x-2 p-2 bg-[#7EB5C1]/10 rounded-lg">
            <Users className="w-3 h-3 text-[#2C6975] mt-0.5 flex-shrink-0" />
            <span className="text-gray-700">
              All team members active in last hour
            </span>
          </div>
          <div className="flex items-start space-x-2 p-2 bg-[#3B6A52]/10 rounded-lg">
            <Sparkles className="w-3 h-3 text-[#3B6A52] mt-0.5 flex-shrink-0" />
            <span className="text-gray-700">
              6 tasks completed today - great momentum!
            </span>
          </div>
        </div>
      </div>

      {/* Team Progress */}
      <div className="bg-gradient-to-br from-[#2C6975]/10 to-[#7EB5C1]/10 rounded-xl border border-[#2C6975]/20 p-4">
        <h4 className="text-sm text-gray-900 mb-3">Team Progress</h4>
        
        <div className="space-y-3">
          <div>
            <div className="flex items-center justify-between mb-1 text-xs">
              <span className="text-gray-600">Overall Completion</span>
              <span className="text-[#2C6975]">75%</span>
            </div>
            <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
              <div className="h-full bg-gradient-to-r from-[#2C6975] to-[#7EB5C1] rounded-full" style={{ width: '75%' }} />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2 pt-2 border-t border-gray-200">
            <div className="text-center">
              <div className="text-xl text-[#2C6975]">8</div>
              <div className="text-xs text-gray-600">Tasks Done</div>
            </div>
            <div className="text-center">
              <div className="text-xl text-[#F9A03F]">4</div>
              <div className="text-xs text-gray-600">To Complete</div>
            </div>
          </div>
        </div>
      </div>

      {/* Partner Connection */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
        <h4 className="text-sm text-gray-900 mb-3">Partner Update</h4>
        <div className="p-3 bg-[#F5F3E8] rounded-lg">
          <p className="text-xs text-gray-700 mb-2">
            "We're so excited to see your solution! The volunteer coordination system will make a huge impact."
          </p>
          <p className="text-xs text-gray-500">— Maria Chen, Green Earth Foundation</p>
        </div>
        <button className="mt-3 w-full px-3 py-2 bg-[#2C6975] text-white rounded-lg hover:bg-[#234d56] transition-all text-xs flex items-center justify-center space-x-1">
          <Send className="w-3 h-3" />
          <span>Send Update to Partner</span>
        </button>
      </div>

      {/* Sponsor Support */}
      <div className="bg-gradient-to-br from-[#F9A03F]/10 to-[#e89135]/10 rounded-xl border border-[#F9A03F]/30 p-4">
        <h4 className="text-sm text-gray-900 mb-3">Need Help?</h4>
        <p className="text-xs text-gray-700 mb-3">
          Sponsors and mentors are available for technical support and guidance.
        </p>
        <button className="w-full px-3 py-2 bg-[#F9A03F] text-white rounded-lg hover:bg-[#e89135] transition-all text-xs flex items-center justify-center space-x-1">
          <MessageSquare className="w-3 h-3" />
          <span>Ask a Sponsor</span>
        </button>
      </div>

      <style jsx>{`
        @keyframes pulse-glow {
          0%, 100% {
            box-shadow: 0 0 20px rgba(249, 160, 63, 0.3);
          }
          50% {
            box-shadow: 0 0 30px rgba(249, 160, 63, 0.6);
          }
        }
        .animate-pulse-glow {
          animation: pulse-glow 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }
        
        @keyframes ping-slow {
          75%, 100% {
            transform: scale(1.2);
            opacity: 0;
          }
        }
        .animate-ping-slow {
          animation: ping-slow 3s cubic-bezier(0, 0, 0.2, 1) infinite;
        }

        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in {
          animation: fade-in 0.3s ease-out;
        }
      `}</style>
    </div>
  );
}
