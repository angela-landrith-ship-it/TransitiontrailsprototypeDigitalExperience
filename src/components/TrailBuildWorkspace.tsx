import { X, Calendar, CheckCircle2, Clock, AlertCircle, Send, PlayCircle, Upload, Sparkles } from 'lucide-react';
import { useState } from 'react';
import { Badge } from './ui/badge';
import { PennyTrailBuildMode } from './PennyTrailBuildMode';

interface TrailBuildWorkspaceProps {
  onClose: () => void;
}

export function TrailBuildWorkspace({ onClose }: TrailBuildWorkspaceProps) {
  const [demoSubmitted, setDemoSubmitted] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);

  const handleDemoSubmit = () => {
    setDemoSubmitted(true);
    setShowConfetti(true);
    setTimeout(() => setShowConfetti(false), 5000);
  };

  // Mock event timeline
  const timeline = [
    {
      day: 'Day 1',
      date: 'Feb 14',
      events: [
        { time: '9:00 AM', title: 'Kickoff & Team Introductions', status: 'complete' },
        { time: '10:00 AM', title: 'Partner Brief Session', status: 'complete' },
        { time: '11:00 AM', title: 'Sprint Planning', status: 'complete' },
        { time: '2:00 PM', title: 'Sponsor Office Hours', status: 'complete' }
      ]
    },
    {
      day: 'Day 2',
      date: 'Feb 15',
      events: [
        { time: '9:00 AM', title: 'Daily Standup', status: 'complete' },
        { time: '12:00 PM', title: 'Mid-Build Check-in', status: 'inprogress' },
        { time: '3:00 PM', title: 'Technical Support Session', status: 'upcoming' },
        { time: '6:00 PM', title: 'Sponsor Q&A Live', status: 'upcoming' }
      ]
    },
    {
      day: 'Day 3',
      date: 'Feb 16',
      events: [
        { time: '9:00 AM', title: 'Final Sprint', status: 'upcoming' },
        { time: '2:00 PM', title: 'Demo Submission Deadline', status: 'upcoming' },
        { time: '4:00 PM', title: 'Demo Day Presentations', status: 'upcoming' },
        { time: '6:00 PM', title: 'Awards & Celebration', status: 'upcoming' }
      ]
    }
  ];

  const todos = [
    { id: 1, title: 'Complete data model design', completed: true, assignee: 'Sarah' },
    { id: 2, title: 'Build volunteer registration flow', completed: true, assignee: 'You' },
    { id: 3, title: 'Create impact dashboards', completed: false, assignee: 'Marcus', urgent: true },
    { id: 4, title: 'Write user documentation', completed: false, assignee: 'Lisa' },
    { id: 5, title: 'Prepare demo presentation', completed: false, assignee: 'Team', urgent: true },
    { id: 6, title: 'Submit demo link by 2 PM', completed: false, assignee: 'You', urgent: true }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'complete': return 'text-green-600 bg-green-50';
      case 'inprogress': return 'text-blue-600 bg-blue-50';
      case 'upcoming': return 'text-gray-600 bg-gray-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'complete': return <CheckCircle2 className="w-4 h-4" />;
      case 'inprogress': return <Clock className="w-4 h-4" />;
      case 'upcoming': return <Calendar className="w-4 h-4" />;
      default: return <Calendar className="w-4 h-4" />;
    }
  };

  return (
    <div className="min-h-screen bg-[#F5F3E8] pb-12">
      {/* Confetti on Demo Submission */}
      {showConfetti && (
        <div className="fixed inset-0 pointer-events-none z-50">
          <div className="absolute inset-0 overflow-hidden">
            {[...Array(50)].map((_, i) => (
              <div
                key={i}
                className="absolute animate-confetti"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: '-10%',
                  animationDelay: `${Math.random() * 3}s`,
                  animationDuration: `${3 + Math.random() * 2}s`
                }}
              >
                <div
                  className="w-2 h-2 rounded-full"
                  style={{
                    backgroundColor: ['#2C6975', '#F9A03F', '#7EB5C1', '#3B6A52'][Math.floor(Math.random() * 4)]
                  }}
                />
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Header */}
      <div className="bg-gradient-to-r from-[#F9A03F] to-[#e89135] text-white py-8 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-4">
            <div>
              <Badge className="bg-white/20 text-white mb-2 backdrop-blur-sm">
                <Sparkles className="w-3 h-3 mr-1" />
                TrailBuild Summit • Day 2
              </Badge>
              <h1 className="text-4xl mb-2">Event Workspace</h1>
              <p className="text-white/90">Team: Trail Blazers • Partner: Green Earth Foundation</p>
            </div>
            <button
              onClick={onClose}
              className="px-6 py-3 bg-white/20 backdrop-blur-sm text-white rounded-lg hover:bg-white/30 transition-all"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Live Status Bar */}
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 rounded-full bg-red-400 animate-pulse" />
                <span className="text-sm">LIVE</span>
              </div>
              <div className="text-sm">
                <Clock className="w-4 h-4 inline mr-1" />
                18 hours remaining
              </div>
            </div>
            <div className="text-sm">
              Next: Sponsor Q&A at 6:00 PM
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 mt-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column: Timeline & To-Do */}
          <div className="lg:col-span-2 space-y-6">
            {/* Event Timeline */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h2 className="text-xl text-gray-900 mb-4">Event Timeline</h2>
              
              <div className="space-y-6">
                {timeline.map((day, index) => (
                  <div key={index}>
                    <div className="flex items-center space-x-2 mb-3">
                      <Badge className="bg-[#2C6975] text-white">
                        {day.day}
                      </Badge>
                      <span className="text-sm text-gray-600">{day.date}</span>
                    </div>
                    
                    <div className="space-y-2">
                      {day.events.map((event, eventIndex) => (
                        <div
                          key={eventIndex}
                          className={`flex items-center space-x-3 p-3 rounded-lg ${getStatusColor(event.status)}`}
                        >
                          {getStatusIcon(event.status)}
                          <div className="flex-1">
                            <div className="flex items-center justify-between">
                              <span className="text-sm">{event.title}</span>
                              <span className="text-xs">{event.time}</span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* To-Do List */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl text-gray-900">Team To-Do List</h2>
                <span className="text-sm text-gray-600">
                  {todos.filter(t => t.completed).length} / {todos.length} complete
                </span>
              </div>

              <div className="space-y-2">
                {todos.map((todo) => (
                  <div
                    key={todo.id}
                    className={`flex items-center space-x-3 p-3 rounded-lg border-2 ${
                      todo.completed
                        ? 'border-green-200 bg-green-50'
                        : todo.urgent
                        ? 'border-[#F9A03F]/30 bg-[#F9A03F]/5'
                        : 'border-gray-200 bg-white'
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={todo.completed}
                      readOnly
                      className="w-5 h-5 text-[#2C6975] border-gray-300 rounded"
                    />
                    <div className="flex-1">
                      <div className="flex items-center space-x-2">
                        <span className={`text-sm ${todo.completed ? 'line-through text-gray-500' : 'text-gray-900'}`}>
                          {todo.title}
                        </span>
                        {todo.urgent && !todo.completed && (
                          <Badge className="bg-[#F9A03F] text-white text-xs">
                            <AlertCircle className="w-3 h-3 mr-1" />
                            Urgent
                          </Badge>
                        )}
                      </div>
                      <span className="text-xs text-gray-500">{todo.assignee}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Demo Submission */}
            <div className="bg-gradient-to-br from-[#F9A03F]/10 to-[#e89135]/10 rounded-xl border border-[#F9A03F]/30 p-6">
              <div className="flex items-center space-x-3 mb-4">
                <PlayCircle className="w-6 h-6 text-[#F9A03F]" />
                <h2 className="text-xl text-gray-900">Demo Submission</h2>
              </div>

              {!demoSubmitted ? (
                <>
                  <p className="text-gray-700 mb-4">
                    Submit your demo video link by <strong>2:00 PM on Day 3</strong>. 
                    Max 5 minutes. Include a walkthrough of your solution and impact.
                  </p>
                  
                  <div className="space-y-3">
                    <div>
                      <label className="block text-sm text-gray-700 mb-2">Demo Video URL</label>
                      <input
                        type="url"
                        placeholder="https://www.loom.com/share/..."
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#F9A03F]"
                      />
                    </div>

                    <div>
                      <label className="block text-sm text-gray-700 mb-2">Presentation Slides (Optional)</label>
                      <button className="w-full px-4 py-3 border-2 border-dashed border-gray-300 rounded-lg hover:border-[#F9A03F] hover:bg-[#F9A03F]/5 transition-all flex items-center justify-center space-x-2 text-gray-600">
                        <Upload className="w-5 h-5" />
                        <span>Upload PDF or share link</span>
                      </button>
                    </div>

                    <button
                      onClick={handleDemoSubmit}
                      className="w-full px-6 py-4 bg-[#F9A03F] text-white rounded-lg hover:bg-[#e89135] transition-all shadow-lg flex items-center justify-center space-x-2"
                    >
                      <Send className="w-5 h-5" />
                      <span>Submit Demo</span>
                    </button>
                  </div>
                </>
              ) : (
                <div className="text-center py-8">
                  <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4">
                    <CheckCircle2 className="w-8 h-8 text-green-600" />
                  </div>
                  <h3 className="text-xl text-gray-900 mb-2">Demo Submitted! 🎉</h3>
                  <p className="text-gray-600 mb-4">
                    Your team's demo has been successfully submitted. Join Demo Day at 4:00 PM to present!
                  </p>
                  <Badge className="bg-[#3B6A52] text-white px-4 py-2">
                    <Trophy className="w-4 h-4 mr-2 inline" />
                    TrailBuilder Badge Earned
                  </Badge>
                </div>
              )}
            </div>
          </div>

          {/* Right Column: Penny TrailBuild Mode */}
          <div className="lg:col-span-1">
            <PennyTrailBuildMode />
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes confetti {
          0% {
            transform: translateY(0) rotate(0deg);
            opacity: 1;
          }
          100% {
            transform: translateY(100vh) rotate(720deg);
            opacity: 0;
          }
        }
        .animate-confetti {
          animation: confetti linear forwards;
        }
      `}</style>
    </div>
  );
}
