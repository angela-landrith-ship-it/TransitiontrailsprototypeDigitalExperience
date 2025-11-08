import { MessageSquare, Calendar, Users, Lock, ExternalLink, Hash, ArrowRight, Sparkles } from 'lucide-react';
import { Badge } from './ui/badge';

interface VisitorCommunityProps {
  onEnroll: () => void;
}

export function VisitorCommunity({ onEnroll }: VisitorCommunityProps) {
  const publicChannels = [
    {
      id: 1,
      name: 'visitors',
      description: 'Welcome space for exploring learners',
      members: 127,
      recentActivity: '5 min ago',
      messages: [
        { user: 'Penny AI', avatar: '🤖', message: 'Welcome to the Transition Trails community! Feel free to ask questions.', time: '10m ago' },
        { user: 'Alex Chen', avatar: 'AC', message: 'Just started the Salesforce basics course - loving it so far!', time: '15m ago' },
        { user: 'Jordan Lee', avatar: 'JL', message: 'Anyone attending the public webinar tomorrow?', time: '1h ago' }
      ]
    },
    {
      id: 2,
      name: 'public-events',
      description: 'Community webinars and workshops',
      members: 342,
      recentActivity: '1 hour ago',
      messages: [
        { user: 'Program Admin', avatar: 'PA', message: '📅 Reminder: "Intro to Salesforce" webinar starts in 2 hours!', time: '1h ago' },
        { user: 'Penny AI', avatar: '🤖', message: 'I\'ll be hosting an AI Q&A session next week. Mark your calendars!', time: '3h ago' }
      ]
    }
  ];

  const lockedChannels = [
    { name: 'trail-mastery', description: 'Enrolled learner discussions', members: 89 },
    { name: 'coaching-questions', description: 'Private Q&A with coaches', members: 156 },
    { name: 'capstone-projects', description: 'Project collaboration space', members: 45 },
    { name: 'job-opportunities', description: 'Career placement & networking', members: 203 }
  ];

  const upcomingPublicEvents = [
    {
      id: 1,
      title: 'Introduction to Salesforce for Nonprofits',
      date: 'Nov 8, 2025',
      time: '2:00 PM EST',
      attendees: 47,
      type: 'Webinar'
    },
    {
      id: 2,
      title: 'Meet Penny: AI-Powered Learning',
      date: 'Nov 12, 2025',
      time: '4:00 PM EST',
      attendees: 32,
      type: 'Workshop'
    },
    {
      id: 3,
      title: 'Community Open House',
      date: 'Nov 15, 2025',
      time: '6:00 PM EST',
      attendees: 68,
      type: 'Social Event'
    }
  ];

  return (
    <div className="min-h-screen bg-[#F5F3E8] dark:bg-slate-900">
      {/* Visitor Banner */}
      <div className="bg-gradient-to-r from-[#7EB5C1] to-[#2C6975] text-white py-4 px-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Users className="w-5 h-5" />
            <div>
              <p className="text-sm">Visitor Community Access</p>
              <p className="text-xs text-white/80">Public channels only — unlock private channels by enrolling</p>
            </div>
          </div>
          <button
            onClick={onEnroll}
            className="px-6 py-2 bg-[#F9A03F] text-white rounded-lg hover:bg-[#e89135] transition-colors"
          >
            Enroll Now
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl text-gray-900 dark:text-white mb-2">Community</h1>
          <p className="text-gray-600 dark:text-slate-300">Connect with learners in public Slack channels</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Left Column - Channels */}
          <div className="lg:col-span-2 space-y-6">
            {/* Public Channels */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl text-gray-900 dark:text-white">Public Slack Channels</h2>
                <Badge className="bg-green-500 text-white">Full Access</Badge>
              </div>
              <div className="space-y-4">
                {publicChannels.map((channel) => (
                  <div key={channel.id} className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-gray-200 dark:border-slate-700 p-6 hover:shadow-md transition-all">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 rounded-lg bg-[#2C6975]/10 dark:bg-[#7EB5C1]/20 flex items-center justify-center">
                          <Hash className="w-5 h-5 text-[#2C6975] dark:text-[#7EB5C1]" />
                        </div>
                        <div>
                          <h3 className="text-gray-900 dark:text-white flex items-center space-x-2">
                            <span>#{channel.name}</span>
                          </h3>
                          <p className="text-sm text-gray-600 dark:text-slate-300">{channel.description}</p>
                        </div>
                      </div>
                      <div className="text-right text-xs text-gray-500 dark:text-slate-400">
                        <p>{channel.members} members</p>
                        <p>{channel.recentActivity}</p>
                      </div>
                    </div>

                    {/* Recent Messages */}
                    <div className="space-y-3 mb-4">
                      {channel.messages.map((msg, idx) => (
                        <div key={idx} className="flex items-start space-x-2 p-2 rounded-lg bg-gray-50 dark:bg-slate-900/50">
                          <div className="w-7 h-7 rounded-full bg-gradient-to-br from-[#2C6975] to-[#7EB5C1] flex items-center justify-center text-white text-xs flex-shrink-0">
                            {msg.avatar}
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center space-x-2 mb-1">
                              <span className="text-sm text-gray-900 dark:text-white">{msg.user}</span>
                              <span className="text-xs text-gray-500 dark:text-slate-400">{msg.time}</span>
                            </div>
                            <p className="text-sm text-gray-700 dark:text-slate-300">{msg.message}</p>
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="flex gap-2">
                      <button className="flex-1 py-2 bg-[#2C6975] dark:bg-[#7EB5C1] text-white rounded-lg hover:bg-[#234d56] dark:hover:bg-[#6aa4b0] transition-colors text-sm flex items-center justify-center space-x-2">
                        <MessageSquare className="w-4 h-4" />
                        <span>View Channel</span>
                      </button>
                      <button className="px-4 py-2 border border-gray-300 dark:border-slate-600 text-gray-700 dark:text-slate-300 rounded-lg hover:bg-gray-50 dark:hover:bg-slate-700 transition-colors text-sm">
                        Read Only
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Slack Invite CTA */}
            <div className="bg-gradient-to-r from-[#F9A03F]/10 to-[#F9A03F]/5 dark:from-[#F9A03F]/20 dark:to-[#F9A03F]/10 border-2 border-[#F9A03F]/30 dark:border-[#F9A03F]/50 rounded-xl p-6">
              <div className="flex items-start space-x-4">
                <MessageSquare className="w-10 h-10 text-[#F9A03F] flex-shrink-0" />
                <div className="flex-1">
                  <h3 className="text-gray-900 dark:text-white mb-2">Join our Visitor Slack</h3>
                  <p className="text-gray-700 dark:text-slate-300 mb-4">
                    Get the full Slack experience! Join public channels, receive event notifications, 
                    and connect with other learners exploring the Academy.
                  </p>
                  <button className="px-6 py-2 bg-[#F9A03F] text-white rounded-lg hover:bg-[#e89135] transition-colors flex items-center space-x-2">
                    <ExternalLink className="w-4 h-4" />
                    <span>Get Slack Invite</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Locked Channels */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl text-gray-900 dark:text-white">Premium Channels</h2>
                <Badge className="bg-[#F9A03F] text-white">Unlock with Enrollment</Badge>
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                {lockedChannels.map((channel) => (
                  <div key={channel.name} className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border-2 border-gray-300 dark:border-slate-600 p-4 opacity-60 relative">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center space-x-2">
                        <Hash className="w-4 h-4 text-gray-400 dark:text-slate-500" />
                        <span className="text-gray-900 dark:text-white">{channel.name}</span>
                      </div>
                      <Lock className="w-4 h-4 text-gray-400 dark:text-slate-500" />
                    </div>
                    <p className="text-sm text-gray-600 dark:text-slate-300 mb-2">{channel.description}</p>
                    <p className="text-xs text-gray-500 dark:text-slate-400">{channel.members} members</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column - Events & Penny */}
          <div className="space-y-6">
            {/* Penny Community Assistant */}
            <div className="bg-gradient-to-br from-[#7EB5C1]/10 to-[#7EB5C1]/5 dark:from-[#7EB5C1]/20 dark:to-[#7EB5C1]/10 border-2 border-[#7EB5C1]/30 dark:border-[#7EB5C1]/50 rounded-xl p-6">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#7EB5C1] to-[#2C6975] flex items-center justify-center mb-4 ring-4 ring-[#7EB5C1]/20 dark:ring-[#7EB5C1]/30">
                <Sparkles className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-gray-900 dark:text-white mb-2">Ask Penny</h3>
              <p className="text-sm text-gray-700 dark:text-slate-300 mb-4 italic">
                "Ask me how to connect with other visitors."
              </p>
              <div className="space-y-2">
                <div className="p-3 bg-white dark:bg-slate-800 rounded-lg border border-gray-200 dark:border-slate-700">
                  <p className="text-xs text-gray-600 dark:text-slate-400 mb-1">📚 Top learner story this week:</p>
                  <p className="text-sm text-gray-900 dark:text-white">"Sarah completed her Salesforce Admin cert!"</p>
                </div>
                <div className="p-3 bg-white dark:bg-slate-800 rounded-lg border border-gray-200 dark:border-slate-700">
                  <p className="text-xs text-gray-600 dark:text-slate-400 mb-1">🎯 Upcoming opportunity:</p>
                  <p className="text-sm text-gray-900 dark:text-white">Nonprofit tech jobs available in your area</p>
                </div>
              </div>
            </div>

            {/* Upcoming Public Events */}
            <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-gray-200 dark:border-slate-700 p-6">
              <div className="flex items-center space-x-2 mb-4">
                <Calendar className="w-5 h-5 text-[#2C6975] dark:text-[#7EB5C1]" />
                <h3 className="text-gray-900 dark:text-white">Upcoming Public Events</h3>
              </div>
              <div className="space-y-3">
                {upcomingPublicEvents.map((event) => (
                  <div key={event.id} className="p-4 bg-gray-50 dark:bg-slate-900/50 rounded-lg border border-gray-200 dark:border-slate-700">
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex-1">
                        <h4 className="text-sm text-gray-900 dark:text-white mb-1">{event.title}</h4>
                        <div className="space-y-1">
                          <p className="text-xs text-gray-600 dark:text-slate-300 flex items-center space-x-1">
                            <Calendar className="w-3 h-3" />
                            <span>{event.date}</span>
                          </p>
                          <p className="text-xs text-gray-600 dark:text-slate-300">{event.time}</p>
                        </div>
                      </div>
                      <Badge className="bg-[#7EB5C1] text-white text-xs">
                        {event.type}
                      </Badge>
                    </div>
                    <div className="flex items-center justify-between mt-3">
                      <span className="text-xs text-gray-500 dark:text-slate-400">{event.attendees} attending</span>
                      <button className="px-3 py-1 bg-[#2C6975] dark:bg-[#7EB5C1] text-white rounded text-xs hover:bg-[#234d56] dark:hover:bg-[#6aa4b0] transition-colors">
                        RSVP
                      </button>
                    </div>
                  </div>
                ))}
              </div>
              <button className="w-full mt-4 py-2 border border-gray-300 dark:border-slate-600 text-gray-700 dark:text-slate-300 rounded-lg hover:bg-gray-50 dark:hover:bg-slate-700 transition-colors text-sm">
                View All Events
              </button>
            </div>

            {/* Enrollment CTA */}
            <div className="bg-gradient-to-r from-[#2C6975] to-[#3B6A52] text-white rounded-xl p-6">
              <Lock className="w-8 h-8 mb-3" />
              <h3 className="mb-2">Want More Access?</h3>
              <p className="text-sm text-white/90 mb-4">
                Unlock private channels, coaching discussions, and career opportunities by enrolling.
              </p>
              <button
                onClick={onEnroll}
                className="w-full py-2 bg-[#F9A03F] text-white rounded-lg hover:bg-[#e89135] transition-colors flex items-center justify-center space-x-2"
              >
                <span>Enroll in Academy</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
