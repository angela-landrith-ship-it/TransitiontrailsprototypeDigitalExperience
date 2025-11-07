import { Sparkles, Zap, FileText, Send, TrendingUp, Users, CheckCircle2 } from 'lucide-react';
import { useState } from 'react';
import { Badge } from './ui/badge';

interface PennyAssistantModeProps {
  projectName: string;
  projectStatus: string;
}

export function PennyAssistantMode({ projectName, projectStatus }: PennyAssistantModeProps) {
  const [activeQuickAction, setActiveQuickAction] = useState<string | null>(null);

  const handleQuickAction = (action: string) => {
    setActiveQuickAction(action);
    // Simulate processing
    setTimeout(() => setActiveQuickAction(null), 2000);
  };

  return (
    <div className="space-y-6">
      {/* Penny Avatar - Assistant Mode (Amber) */}
      <div className="bg-white rounded-xl shadow-sm border-2 border-[#F9A03F]/30 p-4">
        <div className="flex items-center space-x-3 mb-4">
          <div className="relative">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#F9A03F] to-[#e89135] flex items-center justify-center">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
            {/* Amber Gradient Ring - Live Collaboration */}
            <div className="absolute inset-0 rounded-full border-2 border-[#F9A03F] animate-pulse-fast" />
          </div>
          <div>
            <h3 className="text-gray-900">Penny</h3>
            <Badge className="bg-[#F9A03F]/10 text-[#F9A03F] text-xs">
              Assistant Mode
            </Badge>
          </div>
        </div>

        {/* Greeting */}
        <div className="p-3 bg-[#F9A03F]/10 rounded-lg mb-4">
          <p className="text-sm text-gray-700">
            "Great energy! Your team is making solid progress on {projectName}. 
            I'm here to help coordinate, track milestones, and keep your partner updated!"
          </p>
        </div>

        {/* Quick Actions */}
        <div className="space-y-2">
          <h4 className="text-xs text-gray-600 uppercase tracking-wide mb-2">Quick Actions</h4>
          
          <button
            onClick={() => handleQuickAction('kickoff')}
            className="w-full px-3 py-2 bg-white border-2 border-gray-200 rounded-lg hover:border-[#F9A03F] hover:bg-[#F9A03F]/5 transition-all flex items-center space-x-2 text-sm"
          >
            <Zap className="w-4 h-4 text-[#F9A03F]" />
            <span className="text-gray-700">Generate Kickoff Agenda</span>
          </button>

          <button
            onClick={() => handleQuickAction('tasks')}
            className="w-full px-3 py-2 bg-white border-2 border-gray-200 rounded-lg hover:border-[#F9A03F] hover:bg-[#F9A03F]/5 transition-all flex items-center space-x-2 text-sm"
          >
            <FileText className="w-4 h-4 text-[#F9A03F]" />
            <span className="text-gray-700">Create Task List from Brief</span>
          </button>

          <button
            onClick={() => handleQuickAction('progress')}
            className="w-full px-3 py-2 bg-white border-2 border-gray-200 rounded-lg hover:border-[#F9A03F] hover:bg-[#F9A03F]/5 transition-all flex items-center space-x-2 text-sm"
          >
            <TrendingUp className="w-4 h-4 text-[#F9A03F]" />
            <span className="text-gray-700">Monitor Progress & Alerts</span>
          </button>

          <button
            onClick={() => handleQuickAction('update')}
            className="w-full px-3 py-2 bg-white border-2 border-gray-200 rounded-lg hover:border-[#F9A03F] hover:bg-[#F9A03F]/5 transition-all flex items-center space-x-2 text-sm"
          >
            <Send className="w-4 h-4 text-[#F9A03F]" />
            <span className="text-gray-700">Draft Client Update</span>
          </button>
        </div>

        {/* Active Action Feedback */}
        {activeQuickAction && (
          <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-lg">
            <div className="flex items-center space-x-2">
              <CheckCircle2 className="w-4 h-4 text-green-600" />
              <p className="text-sm text-green-700">Processing your request...</p>
            </div>
          </div>
        )}
      </div>

      {/* Project Coordinator Card */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
        <h4 className="text-sm text-gray-900 mb-3 flex items-center space-x-2">
          <Users className="w-4 h-4 text-[#2C6975]" />
          <span>Team Coordination</span>
        </h4>
        
        <div className="space-y-2 text-xs text-gray-600">
          <div className="flex items-start space-x-2">
            <CheckCircle2 className="w-3 h-3 text-green-500 mt-0.5 flex-shrink-0" />
            <span>All team members active this week</span>
          </div>
          <div className="flex items-start space-x-2">
            <CheckCircle2 className="w-3 h-3 text-green-500 mt-0.5 flex-shrink-0" />
            <span>On track for Sprint 2 demo</span>
          </div>
          <div className="flex items-start space-x-2">
            <Sparkles className="w-3 h-3 text-[#F9A03F] mt-0.5 flex-shrink-0" />
            <span>Partner check-in scheduled Friday</span>
          </div>
        </div>
      </div>

      {/* Client Experience Guardian */}
      <div className="bg-gradient-to-br from-[#2C6975]/10 to-[#7EB5C1]/10 rounded-xl border border-[#2C6975]/20 p-4">
        <h4 className="text-sm text-gray-900 mb-3">Client Experience</h4>
        <p className="text-xs text-gray-700 mb-3">
          I'm monitoring your partner's experience and will help you deliver exceptional service.
        </p>
        
        <button className="w-full px-3 py-2 bg-[#F9A03F] text-white rounded-lg hover:bg-[#e89135] transition-all text-sm flex items-center justify-center space-x-2">
          <Send className="w-4 h-4" />
          <span>Send Update to Partner</span>
        </button>
      </div>

      {/* Sample Generated Content */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
        <h4 className="text-sm text-gray-900 mb-3">Sample Status Update</h4>
        <div className="text-xs text-gray-700 space-y-2 p-3 bg-gray-50 rounded-lg">
          <p><strong>Progress This Week:</strong></p>
          <ul className="list-disc list-inside space-y-1 ml-2">
            <li>Completed custom object schema</li>
            <li>Built volunteer registration flow</li>
            <li>In progress: reporting dashboards</li>
          </ul>
          <p className="mt-2"><strong>Next Steps:</strong></p>
          <ul className="list-disc list-inside space-y-1 ml-2">
            <li>UAT session scheduled for Friday</li>
            <li>Documentation in progress</li>
          </ul>
        </div>
        <button className="mt-3 text-xs text-[#2C6975] hover:underline">
          Edit and send to partner →
        </button>
      </div>

      <style jsx>{`
        @keyframes pulse-fast {
          0%, 100% {
            opacity: 1;
            transform: scale(1);
          }
          50% {
            opacity: 0.6;
            transform: scale(1.15);
          }
        }
        .animate-pulse-fast {
          animation: pulse-fast 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }
      `}</style>
    </div>
  );
}
