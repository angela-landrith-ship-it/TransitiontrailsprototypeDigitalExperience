import { useState } from 'react';
import { ArrowLeft, Hash, Users, Calendar, MessageCircle, TrendingUp, Bell, ExternalLink, Sparkles, Play, Clock, User, ChevronRight, Video, Settings, Eye, Pin, ThumbsUp, MessageSquare, CheckCircle, Star, Send, UserCircle } from 'lucide-react';
import { Button } from './ui/button';
import { PageType } from '../App';
import { Badge } from './ui/badge';
import { Avatar, AvatarFallback } from './ui/avatar';

interface CommunityProps {
  onNavigate: (page: PageType) => void;
}

export function Community({ onNavigate }: CommunityProps) {
  const [isSlackConnected] = useState(true);

  // Slack channels with enhanced metadata
  const slackChannels = [
    {
      id: 'trail-mastery',
      name: '#trail-mastery',
      icon: '🎯',
      description: 'Share tips, wins, and support for all Trail missions',
      members: 47,
      unread: 3,
      lastActivity: '5 min ago',
      category: 'learning' as const,
      isJoined: true,
    },
    {
      id: 'explorer-2025',
      name: '#explorer-2025',
      icon: '🚀',
      description: 'Spring 2025 cohort - your peers on the journey',
      members: 32,
      unread: 0,
      lastActivity: '1 hour ago',
      category: 'cohort' as const,
      isJoined: true,
    },
    {
      id: 'salesforce-admin-crew',
      name: '#salesforce-admin-crew',
      icon: '⚡',
      description: 'Admin Trail learners helping each other level up',
      members: 28,
      unread: 1,
      lastActivity: '30 min ago',
      category: 'learning' as const,
      isJoined: true,
    },
    {
      id: 'capstone-projects',
      name: '#capstone-projects',
      icon: '🏗️',
      description: 'Share progress, get feedback on your capstone work',
      members: 41,
      unread: 5,
      lastActivity: '2 min ago',
      category: 'projects' as const,
      isJoined: true,
    },
    {
      id: 'coach-office-hours',
      name: '#coach-office-hours',
      icon: '👥',
      description: 'Weekly sessions with coaches - Q&A and support',
      members: 52,
      unread: 0,
      lastActivity: 'Yesterday',
      category: 'support' as const,
      isJoined: true,
    },
    {
      id: 'career-transitions',
      name: '#career-transitions',
      icon: '💼',
      description: 'Job search tips, resume reviews, and interview prep',
      members: 38,
      unread: 0,
      lastActivity: '2 hours ago',
      category: 'career' as const,
      isJoined: false,
    },
    {
      id: 'random',
      name: '#random',
      icon: '🎉',
      description: 'Off-topic fun, memes, and community bonding',
      members: 64,
      unread: 0,
      lastActivity: '10 min ago',
      category: 'social' as const,
      isJoined: false,
    },
    {
      id: 'wins-celebrations',
      name: '#wins-celebrations',
      icon: '🏆',
      description: 'Share your achievements and celebrate with the community',
      members: 58,
      unread: 0,
      lastActivity: '45 min ago',
      category: 'social' as const,
      isJoined: false,
    },
  ];

  // Trending conversations (Penny summaries)
  const trendingConversations = [
    {
      channel: '#trail-mastery',
      summary: '5 learners discussing Flow Builder best practices - Sarah Martinez shared a great debugging tip!',
      participants: ['Alex J.', 'Jordan T.', 'Sam K.', 'Taylor M.', 'Sarah M.'],
      replies: 23,
      reactions: 47,
      timestamp: '5 min ago',
      isPinned: true,
    },
    {
      channel: '#capstone-projects',
      summary: 'Marcus Chen showcased his nonprofit CRM dashboard - amazing data visualizations with custom Lightning components',
      participants: ['Marcus C.', 'Lisa P.', 'Coach David'],
      replies: 18,
      reactions: 35,
      timestamp: '2 min ago',
      isPinned: false,
    },
    {
      channel: '#salesforce-admin-crew',
      summary: 'Security & Access thread: How to design sharing rules for complex org hierarchies',
      participants: ['Jordan T.', 'Kim L.', 'Alex J.'],
      replies: 12,
      reactions: 28,
      timestamp: '30 min ago',
      isPinned: false,
    },
    {
      channel: '#wins-celebrations',
      summary: '🎉 Taylor M. just passed the Admin certification exam on first try! Community sharing study tips and congratulations',
      participants: ['Taylor M.', '12 others'],
      replies: 34,
      reactions: 89,
      timestamp: '45 min ago',
      isPinned: false,
    },
  ];

  // Upcoming sessions/huddles
  const upcomingSessions = [
    {
      id: 1,
      title: 'Flow Builder Office Hours',
      channel: '#coach-office-hours',
      host: 'Sarah Martinez',
      date: 'Today',
      time: '3:00 PM PST',
      duration: '60 min',
      attendees: 12,
      maxAttendees: 20,
      type: 'huddle' as const,
    },
    {
      id: 2,
      title: 'Capstone Project Show & Tell',
      channel: '#capstone-projects',
      host: 'David Kim',
      date: 'Tomorrow',
      time: '4:00 PM PST',
      duration: '90 min',
      attendees: 8,
      maxAttendees: 15,
      type: 'presentation' as const,
    },
    {
      id: 3,
      title: 'Study Group: Security Model',
      channel: '#salesforce-admin-crew',
      host: 'Jordan Taylor',
      date: 'Friday',
      time: '2:00 PM PST',
      duration: '45 min',
      attendees: 6,
      maxAttendees: 10,
      type: 'study-group' as const,
    },
  ];

  // Recent DMs
  const directMessages = [
    {
      name: 'Sarah Martinez',
      role: 'Coach',
      avatar: 'SM',
      lastMessage: 'Great work on your latest assignment! Let\'s review it in our next 1:1.',
      timestamp: '10 min ago',
      unread: true,
    },
    {
      name: 'Penny AI',
      role: 'AI Assistant',
      avatar: '✨',
      lastMessage: 'I noticed you\'re stuck on that Flow - here are 3 debugging strategies...',
      timestamp: '1 hour ago',
      unread: false,
    },
    {
      name: 'Jordan Taylor',
      role: 'Peer',
      avatar: 'JT',
      lastMessage: 'Thanks for the help with my capstone! Want to pair program tomorrow?',
      timestamp: '2 hours ago',
      unread: false,
    },
  ];

  const handleJoinChannel = (channelId: string) => {
    // In production, this would call Slack API
    console.log('Joining channel:', channelId);
  };

  const handleJoinHuddle = (sessionId: number) => {
    // In production, this would initiate Slack huddle
    console.log('Joining huddle:', sessionId);
  };

  return (
    <div className="min-h-screen bg-[#F5F3E8]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <button
            onClick={() => onNavigate('learner')}
            className="flex items-center space-x-2 text-[#2C6975] hover:underline mb-4 transition-all duration-150"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Home</span>
          </button>

          <div className="flex items-start justify-between">
            <div>
              <h1 className="text-4xl text-gray-900 mb-2">Community</h1>
              <p className="text-lg text-gray-600">
                Connect with your cohort, join conversations, and learn together
              </p>
            </div>

            {isSlackConnected && (
              <div className="flex items-center space-x-3">
                <Badge variant="outline" className="bg-green-50 text-green-700 border-green-300">
                  <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                  Slack Connected
                </Badge>
                <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                  <Settings className="w-5 h-5 text-gray-600" />
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Phase 2 Community Features - Row 1 */}
        <div className="grid md:grid-cols-3 gap-6 mb-6">
          {/* Discussion Forums */}
          <div className="bg-gradient-to-r from-[#2C6975] to-[#235158] rounded-xl shadow-lg p-6">
            <div className="flex items-center gap-3 mb-3">
              <div className="bg-white/20 backdrop-blur-sm p-2.5 rounded-lg">
                <MessageCircle className="w-5 h-5 text-white" />
              </div>
              <Badge className="bg-[#F9A03F] text-white border-0 text-xs">
                Phase 2.1
              </Badge>
            </div>
            <h3 className="text-white text-xl mb-2">Discussion Forums</h3>
            <p className="text-white/90 text-sm mb-4">
              Ask questions, share knowledge, and get help from the community with voting and best answers.
            </p>
            <div className="space-y-2 mb-4">
              <div className="flex items-center gap-2 text-white/90 text-xs">
                <CheckCircle className="w-3.5 h-3.5" />
                <span>1,078+ threads</span>
              </div>
              <div className="flex items-center gap-2 text-white/90 text-xs">
                <CheckCircle className="w-3.5 h-3.5" />
                <span>5 categories</span>
              </div>
              <div className="flex items-center gap-2 text-white/90 text-xs">
                <CheckCircle className="w-3.5 h-3.5" />
                <span>Searchable knowledge base</span>
              </div>
            </div>
            <Button
              onClick={() => onNavigate('forums')}
              className="w-full bg-white text-[#2C6975] hover:bg-gray-100"
              size="sm"
            >
              Browse Forums
              <ChevronRight className="w-4 h-4 ml-2" />
            </Button>
          </div>

          {/* Peer Reviews */}
          <div className="bg-gradient-to-r from-[#F9A03F] to-[#f89520] rounded-xl shadow-lg p-6">
            <div className="flex items-center gap-3 mb-3">
              <div className="bg-white/20 backdrop-blur-sm p-2.5 rounded-lg">
                <Star className="w-5 h-5 text-white" />
              </div>
              <Badge className="bg-white text-[#F9A03F] border-0 text-xs">
                Phase 2.2
              </Badge>
            </div>
            <h3 className="text-white text-xl mb-2">Peer Review System</h3>
            <p className="text-white/90 text-sm mb-4">
              Give and receive structured feedback on capstone projects with a professional 5-category rubric.
            </p>
            <div className="space-y-2 mb-4">
              <div className="flex items-center gap-2 text-white/90 text-xs">
                <CheckCircle className="w-3.5 h-3.5" />
                <span>5-category rubric</span>
              </div>
              <div className="flex items-center gap-2 text-white/90 text-xs">
                <CheckCircle className="w-3.5 h-3.5" />
                <span>Earn reviewer badges</span>
              </div>
              <div className="flex items-center gap-2 text-white/90 text-xs">
                <CheckCircle className="w-3.5 h-3.5" />
                <span>+50 pts per review</span>
              </div>
            </div>
            <Button
              onClick={() => onNavigate('peer-reviews')}
              className="w-full bg-white text-[#F9A03F] hover:bg-gray-100"
              size="sm"
            >
              Open Peer Reviews
              <ChevronRight className="w-4 h-4 ml-2" />
            </Button>
          </div>

          {/* 1-on-1 Messaging */}
          <div className="bg-gradient-to-r from-[#3B6A52] to-[#2d5440] rounded-xl shadow-lg p-6">
            <div className="flex items-center gap-3 mb-3">
              <div className="bg-white/20 backdrop-blur-sm p-2.5 rounded-lg">
                <Send className="w-5 h-5 text-white" />
              </div>
              <Badge className="bg-white text-[#3B6A52] border-0 text-xs">
                🆕 Phase 2.4
              </Badge>
            </div>
            <h3 className="text-white text-xl mb-2">1-on-1 Messaging</h3>
            <p className="text-white/90 text-sm mb-4">
              Connect directly with peers and coaches through private messages and real-time chat.
            </p>
            <div className="space-y-2 mb-4">
              <div className="flex items-center gap-2 text-white/90 text-xs">
                <CheckCircle className="w-3.5 h-3.5" />
                <span>Direct peer messaging</span>
              </div>
              <div className="flex items-center gap-2 text-white/90 text-xs">
                <CheckCircle className="w-3.5 h-3.5" />
                <span>Coach support chats</span>
              </div>
              <div className="flex items-center gap-2 text-white/90 text-xs">
                <CheckCircle className="w-3.5 h-3.5" />
                <span>Read receipts & typing</span>
              </div>
            </div>
            <Button
              onClick={() => onNavigate('messages')}
              className="w-full bg-white text-[#3B6A52] hover:bg-gray-100"
              size="sm"
            >
              Open Messages
              <ChevronRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </div>

        {/* Phase 2 Community Features - Row 2 */}
        <div className="grid md:grid-cols-2 gap-6 mb-6">
          {/* Study Groups */}
          <div className="bg-gradient-to-r from-[#7EB5C1] to-[#6a9aa5] rounded-xl shadow-lg p-6">
            <div className="flex items-center gap-3 mb-3">
              <div className="bg-white/20 backdrop-blur-sm p-2.5 rounded-lg">
                <Users className="w-5 h-5 text-white" />
              </div>
              <Badge className="bg-white text-[#7EB5C1] border-0 text-xs">
                Phase 2.3
              </Badge>
            </div>
            <h3 className="text-white text-xl mb-2">Study Groups</h3>
            <p className="text-white/90 text-sm mb-4">
              Form collaborative learning communities with group challenges, resource sharing, and study sessions.
            </p>
            <div className="space-y-2 mb-4">
              <div className="flex items-center gap-2 text-white/90 text-xs">
                <CheckCircle className="w-3.5 h-3.5" />
                <span>Create or join groups</span>
              </div>
              <div className="flex items-center gap-2 text-white/90 text-xs">
                <CheckCircle className="w-3.5 h-3.5" />
                <span>Share resources</span>
              </div>
              <div className="flex items-center gap-2 text-white/90 text-xs">
                <CheckCircle className="w-3.5 h-3.5" />
                <span>Schedule study sessions</span>
              </div>
            </div>
            <Button
              onClick={() => onNavigate('study-groups')}
              className="w-full bg-white text-[#7EB5C1] hover:bg-gray-100"
              size="sm"
            >
              Browse Study Groups
              <ChevronRight className="w-4 h-4 ml-2" />
            </Button>
          </div>

          {/* Social Profiles */}
          <div className="bg-gradient-to-r from-[#2C6975] to-[#235158] rounded-xl shadow-lg p-6">
            <div className="flex items-center gap-3 mb-3">
              <div className="bg-white/20 backdrop-blur-sm p-2.5 rounded-lg">
                <UserCircle className="w-5 h-5 text-white" />
              </div>
              <Badge className="bg-white text-[#2C6975] border-0 text-xs">
                🆕 Phase 2.5 - FINAL!
              </Badge>
            </div>
            <h3 className="text-white text-xl mb-2">Social Profiles</h3>
            <p className="text-white/90 text-sm mb-4">
              Browse learner profiles, showcase your skills, display achievements, and connect with the community.
            </p>
            <div className="space-y-2 mb-4">
              <div className="flex items-center gap-2 text-white/90 text-xs">
                <CheckCircle className="w-3.5 h-3.5" />
                <span>Public learner profiles</span>
              </div>
              <div className="flex items-center gap-2 text-white/90 text-xs">
                <CheckCircle className="w-3.5 h-3.5" />
                <span>Skills & projects showcase</span>
              </div>
              <div className="flex items-center gap-2 text-white/90 text-xs">
                <CheckCircle className="w-3.5 h-3.5" />
                <span>Badges & achievements</span>
              </div>
            </div>
            <Button
              onClick={() => onNavigate('profile-directory')}
              className="w-full bg-white text-[#2C6975] hover:bg-gray-100"
              size="sm"
            >
              Browse Profiles
              <ChevronRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left & Center - Main Content (2 columns) */}
          <div className="lg:col-span-2 space-y-6">
            {/* Trending Conversations */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center space-x-3 mb-6">
                <TrendingUp className="w-6 h-6 text-[#F9A03F]" />
                <h2 className="text-2xl text-gray-900">Trending Conversations</h2>
                <Badge variant="outline" className="bg-[#F9A03F]/10 text-[#F9A03F] border-[#F9A03F]/30 text-xs">
                  Powered by Penny
                </Badge>
              </div>

              <div className="space-y-4">
                {trendingConversations.map((convo, idx) => (
                  <div
                    key={idx}
                    className="group p-4 border border-gray-200 rounded-lg hover:border-[#2C6975] hover:shadow-md transition-all duration-150 cursor-pointer"
                  >
                    <div className="flex items-start space-x-3">
                      {convo.isPinned && (
                        <Pin className="w-4 h-4 text-[#F9A03F] flex-shrink-0 mt-1" />
                      )}
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-2">
                          <span className="text-sm text-[#2C6975] group-hover:underline">
                            {convo.channel}
                          </span>
                          <span className="text-xs text-gray-500">• {convo.timestamp}</span>
                        </div>
                        
                        <p className="text-gray-900 mb-3">{convo.summary}</p>

                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-4 text-sm text-gray-600">
                            <div className="flex items-center space-x-1">
                              <MessageSquare className="w-4 h-4" />
                              <span>{convo.replies} replies</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <ThumbsUp className="w-4 h-4" />
                              <span>{convo.reactions} reactions</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <Users className="w-4 h-4" />
                              <span>{convo.participants.length} participants</span>
                            </div>
                          </div>

                          <button className="text-sm text-[#2C6975] hover:underline flex items-center space-x-1 opacity-0 group-hover:opacity-100 transition-opacity">
                            <span>View in Slack</span>
                            <ExternalLink className="w-3 h-3" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Slack Channels */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl text-gray-900">Slack Channels</h2>
                <button className="text-sm text-[#2C6975] hover:underline">
                  Browse All Channels
                </button>
              </div>

              {/* Category: My Channels */}
              <div className="mb-6">
                <h3 className="text-sm text-gray-600 uppercase tracking-wide mb-3">My Channels</h3>
                <div className="grid grid-cols-1 gap-3">
                  {slackChannels.filter(ch => ch.isJoined).map((channel) => (
                    <div
                      key={channel.id}
                      className="group p-4 border border-gray-200 rounded-lg hover:border-[#2C6975] hover:shadow-sm transition-all duration-150 cursor-pointer"
                    >
                      <div className="flex items-start space-x-3">
                        <div className="text-3xl">{channel.icon}</div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center space-x-2 mb-1">
                            <h4 className="text-gray-900 group-hover:text-[#2C6975] transition-colors">
                              {channel.name}
                            </h4>
                            {channel.unread > 0 && (
                              <Badge variant="outline" className="bg-[#F9A03F] text-white border-[#F9A03F] text-xs">
                                {channel.unread} new
                              </Badge>
                            )}
                          </div>
                          <p className="text-sm text-gray-600 mb-2">{channel.description}</p>
                          <div className="flex items-center space-x-4 text-xs text-gray-500">
                            <div className="flex items-center space-x-1">
                              <Users className="w-3 h-3" />
                              <span>{channel.members} members</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <Clock className="w-3 h-3" />
                              <span>{channel.lastActivity}</span>
                            </div>
                          </div>
                        </div>
                        <button className="px-3 py-1 bg-[#2C6975] text-white rounded-lg hover:bg-[#1f4f5a] transition-colors text-sm opacity-0 group-hover:opacity-100">
                          Open
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Category: Suggested Channels */}
              <div>
                <h3 className="text-sm text-gray-600 uppercase tracking-wide mb-3">Suggested for You</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {slackChannels.filter(ch => !ch.isJoined).map((channel) => (
                    <div
                      key={channel.id}
                      className="group p-4 border-2 border-dashed border-gray-200 rounded-lg hover:border-[#2C6975] transition-all duration-150"
                    >
                      <div className="flex items-start space-x-3">
                        <div className="text-2xl">{channel.icon}</div>
                        <div className="flex-1 min-w-0">
                          <h4 className="text-sm text-gray-900 mb-1">{channel.name}</h4>
                          <p className="text-xs text-gray-600 mb-2 line-clamp-2">{channel.description}</p>
                          <div className="flex items-center space-x-2 text-xs text-gray-500 mb-2">
                            <Users className="w-3 h-3" />
                            <span>{channel.members} members</span>
                          </div>
                          <button
                            onClick={() => handleJoinChannel(channel.id)}
                            className="w-full py-1.5 border border-[#2C6975] text-[#2C6975] rounded-lg hover:bg-[#2C6975] hover:text-white transition-all duration-150 text-xs"
                          >
                            Join Channel
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Right Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            {/* Upcoming Sessions */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 sticky top-20">
              <div className="flex items-center space-x-2 mb-6">
                <Calendar className="w-5 h-5 text-[#2C6975]" />
                <h3 className="text-lg text-gray-900">Upcoming Sessions</h3>
              </div>

              <div className="space-y-4">
                {upcomingSessions.map((session) => (
                  <div
                    key={session.id}
                    className="group p-4 border border-gray-200 rounded-lg hover:border-[#2C6975] hover:shadow-md transition-all duration-150"
                  >
                    <div className="flex items-start space-x-3 mb-3">
                      <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                        session.type === 'huddle' ? 'bg-[#F9A03F]/20' :
                        session.type === 'presentation' ? 'bg-[#2C6975]/20' :
                        'bg-[#7EB5C1]/20'
                      }`}>
                        {session.type === 'huddle' ? (
                          <MessageCircle className={`w-5 h-5 ${
                            session.type === 'huddle' ? 'text-[#F9A03F]' : 'text-[#2C6975]'
                          }`} />
                        ) : session.type === 'presentation' ? (
                          <Video className="w-5 h-5 text-[#2C6975]" />
                        ) : (
                          <Users className="w-5 h-5 text-[#7EB5C1]" />
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="text-sm text-gray-900 mb-1">{session.title}</h4>
                        <p className="text-xs text-gray-600 mb-2">{session.channel}</p>
                        <div className="flex items-center space-x-2 text-xs text-gray-500 mb-2">
                          <Calendar className="w-3 h-3" />
                          <span>{session.date} at {session.time}</span>
                        </div>
                        <div className="flex items-center space-x-2 text-xs text-gray-500">
                          <Users className="w-3 h-3" />
                          <span>{session.attendees}/{session.maxAttendees} attending</span>
                        </div>
                      </div>
                    </div>

                    <button
                      onClick={() => handleJoinHuddle(session.id)}
                      className="w-full py-2 bg-[#2C6975] text-white rounded-lg hover:bg-[#1f4f5a] transition-colors text-sm flex items-center justify-center space-x-2 group-hover:shadow-md"
                      title="Join Huddle"
                    >
                      <Play className="w-4 h-4" />
                      <span>Join {session.type === 'huddle' ? 'Huddle' : 'Session'}</span>
                    </button>
                  </div>
                ))}
              </div>

              <button className="w-full mt-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors text-sm">
                View Full Calendar
              </button>
            </div>

            {/* Direct Messages */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg text-gray-900">Direct Messages</h3>
                <Badge variant="outline" className="bg-[#F9A03F] text-white border-[#F9A03F] text-xs">
                  1
                </Badge>
              </div>

              <div className="space-y-3">
                {directMessages.map((dm, idx) => (
                  <div
                    key={idx}
                    className={`p-3 rounded-lg cursor-pointer transition-all duration-150 ${
                      dm.unread
                        ? 'bg-[#F9A03F]/10 border-2 border-[#F9A03F]/30'
                        : 'border border-gray-200 hover:border-[#2C6975]'
                    }`}
                  >
                    <div className="flex items-start space-x-3">
                      <Avatar className="w-10 h-10">
                        <AvatarFallback className="bg-gradient-to-br from-[#2C6975] to-[#7EB5C1] text-white">
                          {dm.avatar}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-1">
                          <h4 className="text-sm text-gray-900">{dm.name}</h4>
                          <span className="text-xs text-gray-500">{dm.timestamp}</span>
                        </div>
                        <p className="text-xs text-gray-600 mb-1">{dm.role}</p>
                        <p className="text-sm text-gray-700 line-clamp-2">{dm.lastMessage}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <button className="w-full mt-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors text-sm">
                View All Messages
              </button>
            </div>

            {/* Community Stats */}
            <div className="bg-gradient-to-br from-[#2C6975]/10 to-[#7EB5C1]/10 rounded-xl border border-[#2C6975]/20 p-6">
              <h3 className="text-lg text-gray-900 mb-4">Your Community Impact</h3>
              
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Messages Sent</span>
                  <span className="text-lg text-gray-900">127</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Channels Joined</span>
                  <span className="text-lg text-gray-900">5</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Reactions Given</span>
                  <span className="text-lg text-gray-900">89</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Sessions Attended</span>
                  <span className="text-lg text-gray-900">8</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
