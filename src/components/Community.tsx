import { useState } from 'react';
import { ArrowLeft, Hash, Users, Calendar, MessageCircle, TrendingUp, Bell, ExternalLink, Sparkles, Play, Clock, User, ChevronRight, CheckCircle, MessageSquare, Video, BarChart3, Settings, RefreshCw, AlertCircle, Zap, Lightbulb, Eye } from 'lucide-react';
import { PageType } from '../App';
import { Badge } from './ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Avatar, AvatarFallback } from './ui/avatar';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from './ui/dialog';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from './ui/collapsible';

interface CommunityProps {
  onNavigate: (page: PageType) => void;
}

export function Community({ onNavigate }: CommunityProps) {
  const [selectedTab, setSelectedTab] = useState('overview');
  const [isDmModalOpen, setIsDmModalOpen] = useState(false);
  const [selectedDm, setSelectedDm] = useState<any>(null);
  const [isSlackConnected, setIsSlackConnected] = useState(true);
  const [expandedChannel, setExpandedChannel] = useState<string | null>(null);

  // User's Slack channels
  const myChannels = [
    {
      id: 'trail-mastery',
      name: 'trail-mastery',
      description: 'Share tips, wins, and support for all Trail missions',
      members: 47,
      unread: 3,
      lastActivity: '5 min ago',
      trending: true
    },
    {
      id: 'explorer-2025',
      name: 'explorer-2025',
      description: 'Spring 2025 cohort - your peers on the journey',
      members: 32,
      unread: 0,
      lastActivity: '1 hour ago',
      trending: false
    },
    {
      id: 'salesforce-admin-crew',
      name: 'salesforce-admin-crew',
      description: 'Admin Trail learners helping each other level up',
      members: 28,
      unread: 1,
      lastActivity: '30 min ago',
      trending: false
    },
    {
      id: 'capstone-projects',
      name: 'capstone-projects',
      description: 'Share progress, get feedback on your capstone work',
      members: 41,
      unread: 5,
      lastActivity: '2 min ago',
      trending: true
    },
    {
      id: 'coach-office-hours',
      name: 'coach-office-hours',
      description: 'Weekly sessions with coaches - Q&A and support',
      members: 52,
      unread: 0,
      lastActivity: 'Yesterday',
      trending: false
    }
  ];

  // Recent DMs
  const directMessages = [
    {
      id: 'dm-1',
      name: 'Sarah Martinez',
      role: 'Coach',
      avatar: 'SM',
      lastMessage: 'Great work on your latest assignment! Let\'s review it in our next 1:1.',
      timestamp: '10 min ago',
      unread: true
    },
    {
      id: 'dm-2',
      name: 'Jordan Lee',
      role: 'Peer Learner',
      avatar: 'JL',
      lastMessage: 'Hey! Want to pair program on the Flow Builder challenge?',
      timestamp: '2 hours ago',
      unread: false
    },
    {
      id: 'dm-3',
      name: 'Penny AI',
      role: 'AI Assistant',
      avatar: '✨',
      lastMessage: 'I noticed you\'re stuck on that Apex trigger - want some hints?',
      timestamp: 'Yesterday',
      unread: true
    },
    {
      id: 'dm-4',
      name: 'Marcus Chen',
      role: 'Program Admin',
      avatar: 'MC',
      lastMessage: 'Your capstone project proposal looks excellent!',
      timestamp: '2 days ago',
      unread: false
    }
  ];

  // Upcoming Group Sessions
  const groupSessions = [
    {
      id: 'session-1',
      title: 'Study Group: Process Automation Deep Dive',
      type: 'huddle',
      host: 'Sarah Martinez',
      hostAvatar: 'SM',
      channel: '#trail-mastery',
      datetime: 'Today, 3:00 PM PST',
      duration: '60 min',
      participants: 12,
      maxParticipants: 15,
      status: 'upcoming'
    },
    {
      id: 'session-2',
      title: 'Capstone Project Showcase & Feedback',
      type: 'event',
      host: 'Marcus Chen',
      hostAvatar: 'MC',
      channel: '#capstone-projects',
      datetime: 'Tomorrow, 2:00 PM PST',
      duration: '90 min',
      participants: 8,
      maxParticipants: 20,
      status: 'upcoming'
    },
    {
      id: 'session-3',
      title: 'Weekly Coach Office Hours',
      type: 'huddle',
      host: 'Sarah Martinez',
      hostAvatar: 'SM',
      channel: '#coach-office-hours',
      datetime: 'Friday, 4:00 PM PST',
      duration: '120 min',
      participants: 5,
      maxParticipants: 25,
      status: 'upcoming'
    }
  ];

  // Past Sessions with Summaries
  const pastSessions = [
    {
      id: 'past-1',
      title: 'Apex Fundamentals Workshop',
      date: 'Mar 1, 2025',
      summary: 'Covered trigger patterns, bulk processing, and test classes. Key takeaway: Always bulkify your code! Penny identified 3 common mistakes to avoid.',
      participants: 14,
      recording: true
    },
    {
      id: 'past-2',
      title: 'User Acceptance Testing Best Practices',
      date: 'Feb 28, 2025',
      summary: 'Learned how to write effective test cases and work with nonprofit partners. Penny suggested automation opportunities for repetitive tests.',
      participants: 11,
      recording: true
    }
  ];

  // Trending Discussions (from Penny AI analysis)
  const trendingDiscussions = [
    {
      id: 'trend-1',
      channel: '#trail-mastery',
      topic: 'Best practices for Flow error handling',
      reactions: 15,
      replies: 23,
      author: 'Jordan Lee',
      snippet: 'Found a great pattern for graceful error handling in Flows...',
      timestamp: '2 hours ago'
    },
    {
      id: 'trend-2',
      channel: '#capstone-projects',
      topic: 'GitHub PR review checklist',
      reactions: 22,
      replies: 18,
      author: 'Alex Rivera',
      snippet: 'Here\'s my checklist before submitting any PR...',
      timestamp: '5 hours ago'
    },
    {
      id: 'trend-3',
      channel: '#salesforce-admin-crew',
      topic: 'Preparing for Admin cert exam',
      reactions: 31,
      replies: 45,
      author: 'Sam Patel',
      snippet: 'Study plan that helped me pass on first try...',
      timestamp: '1 day ago'
    }
  ];

  // Cohort/Team Members
  const cohortMembers = [
    { name: 'Alex Johnson', role: 'Learner', avatar: 'AJ', status: 'online', trail: 'Salesforce Admin' },
    { name: 'Jordan Lee', role: 'Learner', avatar: 'JL', status: 'online', trail: 'Developer' },
    { name: 'Sam Patel', role: 'Learner', avatar: 'SP', status: 'away', trail: 'Business Analyst' },
    { name: 'Sarah Martinez', role: 'Coach', avatar: 'SM', status: 'online', trail: 'N/A' },
    { name: 'Alex Rivera', role: 'Learner', avatar: 'AR', status: 'offline', trail: 'Salesforce Admin' },
    { name: 'Marcus Chen', role: 'Program Admin', avatar: 'MC', status: 'online', trail: 'N/A' }
  ];

  // Penny's Slack Insights
  const pennyInsights = {
    weeklyHighlights: [
      'Most active discussion: Flow Builder best practices',
      '3 new members joined #explorer-2025',
      '89% positive sentiment in coaching sessions',
      'Top contributor this week: Jordan Lee (24 helpful replies)'
    ],
    suggestedChannels: [
      { name: 'testing-qa-champions', reason: 'Based on your Capstone focus', members: 19 },
      { name: 'career-transitions', reason: 'Popular with Admin Trail learners', members: 34 }
    ],
    trendingTopics: ['Flow Builder', 'Admin Certification', 'UAT Testing', 'GitHub Workflows']
  };

  const handleOpenSlack = (channelId: string) => {
    // Simulates opening Slack app or browser
    console.log(`Opening Slack channel: ${channelId}`);
  };

  const handleJoinSession = (sessionId: string) => {
    console.log(`Joining session: ${sessionId}`);
  };

  const openDmModal = (dm: any) => {
    setSelectedDm(dm);
    setIsDmModalOpen(true);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <button 
          onClick={() => onNavigate('learner')}
          className="flex items-center space-x-2 text-[#2C6975] hover:underline mb-4"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Home</span>
        </button>
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-3xl text-gray-900 mb-2">Community</h2>
            <p className="text-gray-600">Connect, collaborate, and grow with your cohort</p>
          </div>
          
          {/* Slack Connection Status */}
          {isSlackConnected ? (
            <div className="flex items-center space-x-2 px-4 py-2 bg-green-50 border border-green-200 rounded-lg">
              <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
              <span className="text-sm text-green-700">Connected to Slack</span>
            </div>
          ) : (
            <button className="flex items-center space-x-2 px-4 py-2 bg-[#611F69] text-white rounded-lg hover:bg-[#4A154B] transition-colors">
              <Settings className="w-4 h-4" />
              <span>Connect Slack</span>
            </button>
          )}
        </div>
      </div>

      {/* Main Tabs */}
      <Tabs value={selectedTab} onValueChange={setSelectedTab} className="space-y-6">
        <TabsList className="bg-white border border-gray-200 p-1">
          <TabsTrigger value="overview" className="data-[state=active]:bg-[#2C6975] data-[state=active]:text-white">
            Overview
          </TabsTrigger>
          <TabsTrigger value="channels" className="data-[state=active]:bg-[#2C6975] data-[state=active]:text-white">
            Channels
          </TabsTrigger>
          <TabsTrigger value="messages" className="data-[state=active]:bg-[#2C6975] data-[state=active]:text-white">
            Direct Messages
          </TabsTrigger>
          <TabsTrigger value="sessions" className="data-[state=active]:bg-[#2C6975] data-[state=active]:text-white">
            Group Sessions
          </TabsTrigger>
          <TabsTrigger value="cohort" className="data-[state=active]:bg-[#2C6975] data-[state=active]:text-white">
            My Cohort
          </TabsTrigger>
        </TabsList>

        {/* OVERVIEW TAB */}
        <TabsContent value="overview" className="space-y-6">
          <div className="grid lg:grid-cols-3 gap-6">
            {/* Left Column - Channels & Activity */}
            <div className="lg:col-span-2 space-y-6">
              {/* My Channels Summary */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-gray-900 flex items-center space-x-2">
                    <Hash className="w-5 h-5 text-[#2C6975]" />
                    <span>My Channels</span>
                  </h3>
                  <button 
                    onClick={() => setSelectedTab('channels')}
                    className="text-sm text-[#2C6975] hover:underline flex items-center space-x-1"
                  >
                    <span>View All</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>

                <div className="space-y-3">
                  {myChannels.slice(0, 3).map((channel) => (
                    <div 
                      key={channel.id}
                      className="flex items-center justify-between p-3 border border-gray-200 rounded-lg hover:border-[#2C6975] transition-colors group"
                    >
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-1">
                          <Hash className="w-4 h-4 text-gray-400" />
                          <span className="text-gray-900">{channel.name}</span>
                          {channel.trending && (
                            <Badge variant="outline" className="border-[#F9A03F] text-[#F9A03F] text-xs">
                              <TrendingUp className="w-3 h-3 mr-1" />
                              Trending
                            </Badge>
                          )}
                          {channel.unread > 0 && (
                            <span className="bg-[#F9A03F] text-white text-xs px-2 py-0.5 rounded-full">
                              {channel.unread}
                            </span>
                          )}
                        </div>
                        <p className="text-xs text-gray-600">{channel.members} members • {channel.lastActivity}</p>
                      </div>
                      <button
                        onClick={() => handleOpenSlack(channel.id)}
                        className="opacity-0 group-hover:opacity-100 transition-opacity flex items-center space-x-1 text-sm text-[#611F69] hover:underline"
                      >
                        <span>Open</span>
                        <ExternalLink className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>

                <p className="text-xs text-gray-500 mt-4">
                  You're part of {myChannels.length} channels
                </p>
              </div>

              {/* Trending Discussions */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-gray-900 flex items-center space-x-2">
                    <TrendingUp className="w-5 h-5 text-[#F9A03F]" />
                    <span>Trending Discussions</span>
                  </h3>
                  <Badge variant="outline" className="text-xs">
                    Curated by Penny AI
                  </Badge>
                </div>

                <div className="space-y-4">
                  {trendingDiscussions.map((discussion) => (
                    <div 
                      key={discussion.id}
                      className="p-4 border border-gray-200 rounded-lg hover:border-[#2C6975] transition-colors cursor-pointer"
                      onClick={() => handleOpenSlack(discussion.channel)}
                    >
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-1">
                            <span className="text-sm text-gray-500">{discussion.channel}</span>
                            <span className="text-xs text-gray-400">•</span>
                            <span className="text-xs text-gray-500">{discussion.timestamp}</span>
                          </div>
                          <h4 className="text-gray-900 mb-2">{discussion.topic}</h4>
                          <p className="text-sm text-gray-600 mb-3">{discussion.snippet}</p>
                          <div className="flex items-center space-x-4 text-xs text-gray-500">
                            <span className="flex items-center space-x-1">
                              <Zap className="w-3 h-3" />
                              <span>{discussion.reactions} reactions</span>
                            </span>
                            <span className="flex items-center space-x-1">
                              <MessageCircle className="w-3 h-3" />
                              <span>{discussion.replies} replies</span>
                            </span>
                          </div>
                        </div>
                        <ExternalLink className="w-4 h-4 text-gray-400 flex-shrink-0 ml-2" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Upcoming Sessions Preview */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-gray-900 flex items-center space-x-2">
                    <Calendar className="w-5 h-5 text-[#2C6975]" />
                    <span>Upcoming Sessions</span>
                  </h3>
                  <button 
                    onClick={() => setSelectedTab('sessions')}
                    className="text-sm text-[#2C6975] hover:underline flex items-center space-x-1"
                  >
                    <span>View All</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>

                <div className="space-y-3">
                  {groupSessions.slice(0, 2).map((session) => (
                    <div 
                      key={session.id}
                      className="p-4 border border-gray-200 rounded-lg hover:border-[#F9A03F] transition-colors"
                    >
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex-1">
                          <h4 className="text-gray-900 mb-1">{session.title}</h4>
                          <div className="flex flex-wrap items-center gap-2 text-xs text-gray-600 mb-2">
                            <span className="flex items-center space-x-1">
                              <User className="w-3 h-3" />
                              <span>{session.host}</span>
                            </span>
                            <span>•</span>
                            <span>{session.channel}</span>
                          </div>
                          <div className="flex items-center space-x-4 text-xs text-gray-600">
                            <span className="flex items-center space-x-1">
                              <Clock className="w-3 h-3" />
                              <span>{session.datetime}</span>
                            </span>
                            <span className="flex items-center space-x-1">
                              <Users className="w-3 h-3" />
                              <span>{session.participants}/{session.maxParticipants}</span>
                            </span>
                          </div>
                        </div>
                        <Badge variant="outline" className={`text-xs ${
                          session.type === 'huddle' ? 'border-[#7EB5C1] text-[#7EB5C1]' : 'border-[#F9A03F] text-[#F9A03F]'
                        }`}>
                          {session.type === 'huddle' ? <Video className="w-3 h-3 mr-1" /> : <Calendar className="w-3 h-3 mr-1" />}
                          {session.type}
                        </Badge>
                      </div>
                      <button
                        onClick={() => handleJoinSession(session.id)}
                        className="w-full bg-[#F9A03F] text-white px-4 py-2 rounded-lg hover:bg-[#e89135] transition-colors flex items-center justify-center space-x-2"
                      >
                        <Play className="w-4 h-4" />
                        <span>Join Session</span>
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Column - Penny Insights & DMs */}
            <div className="space-y-6">
              {/* Penny's Community Insights */}
              <div className="bg-gradient-to-br from-[#F5F3E8] to-white rounded-xl shadow-sm border-2 border-[#2C6975]/20 p-6">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#F9A03F] to-[#e89135] text-white flex items-center justify-center">
                    <Sparkles className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-gray-900">Penny's Insights</h3>
                    <p className="text-xs text-gray-600">What's trending in your community</p>
                  </div>
                </div>

                <div className="space-y-4">
                  {/* Weekly Highlights */}
                  <div>
                    <p className="text-xs text-gray-700 mb-2">This Week's Highlights:</p>
                    <div className="space-y-2">
                      {pennyInsights.weeklyHighlights.map((highlight, idx) => (
                        <div key={idx} className="flex items-start space-x-2 text-xs text-gray-600">
                          <CheckCircle className="w-3 h-3 text-[#3B6A52] mt-0.5 flex-shrink-0" />
                          <span>{highlight}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Trending Topics */}
                  <div className="pt-4 border-t border-gray-200">
                    <p className="text-xs text-gray-700 mb-2">Trending Topics:</p>
                    <div className="flex flex-wrap gap-2">
                      {pennyInsights.trendingTopics.map((topic, idx) => (
                        <Badge key={idx} variant="outline" className="text-xs border-[#F9A03F]/30 text-gray-700">
                          {topic}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  {/* Suggested Channels */}
                  <div className="pt-4 border-t border-gray-200">
                    <p className="text-xs text-gray-700 mb-2">Channels You Might Like:</p>
                    <div className="space-y-2">
                      {pennyInsights.suggestedChannels.map((channel, idx) => (
                        <div key={idx} className="p-2 bg-white border border-gray-200 rounded text-xs">
                          <div className="flex items-center justify-between mb-1">
                            <span className="text-gray-900">#{channel.name}</span>
                            <span className="text-gray-500">{channel.members} members</span>
                          </div>
                          <p className="text-gray-600">{channel.reason}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  <button className="w-full text-xs text-[#2C6975] hover:underline flex items-center justify-center space-x-1 pt-3 border-t border-gray-200">
                    <RefreshCw className="w-3 h-3" />
                    <span>Ask Penny to summarize my channels</span>
                  </button>
                </div>
              </div>

              {/* Recent DMs Preview */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-gray-900 flex items-center space-x-2">
                    <MessageSquare className="w-5 h-5 text-[#2C6975]" />
                    <span>Direct Messages</span>
                  </h3>
                  <button 
                    onClick={() => setSelectedTab('messages')}
                    className="text-sm text-[#2C6975] hover:underline flex items-center space-x-1"
                  >
                    <span>View All</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>

                <div className="space-y-2">
                  {directMessages.slice(0, 3).map((dm) => (
                    <button
                      key={dm.id}
                      onClick={() => openDmModal(dm)}
                      className="w-full p-3 border border-gray-200 rounded-lg hover:border-[#2C6975] transition-colors text-left"
                    >
                      <div className="flex items-start space-x-3">
                        <Avatar className="w-8 h-8 flex-shrink-0">
                          <AvatarFallback className={`text-xs ${
                            dm.avatar === '✨' ? 'bg-gradient-to-br from-[#F9A03F] to-[#e89135]' : 'bg-[#2C6975]'
                          } text-white`}>
                            {dm.avatar}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between mb-1">
                            <span className="text-sm text-gray-900 truncate">{dm.name}</span>
                            {dm.unread && (
                              <div className="w-2 h-2 rounded-full bg-[#F9A03F] flex-shrink-0"></div>
                            )}
                          </div>
                          <p className="text-xs text-gray-600 truncate">{dm.lastMessage}</p>
                          <p className="text-xs text-gray-400 mt-1">{dm.timestamp}</p>
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </TabsContent>

        {/* CHANNELS TAB */}
        <TabsContent value="channels" className="space-y-6">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h3 className="text-gray-900 mb-4">All My Channels</h3>
            <div className="space-y-3">
              {myChannels.map((channel) => (
                <Collapsible 
                  key={channel.id}
                  open={expandedChannel === channel.id}
                  onOpenChange={() => setExpandedChannel(expandedChannel === channel.id ? null : channel.id)}
                >
                  <div className="border border-gray-200 rounded-lg overflow-hidden">
                    <CollapsibleTrigger className="w-full p-4 hover:bg-gray-50 transition-colors">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3 flex-1 text-left">
                          <Hash className="w-5 h-5 text-gray-400" />
                          <div className="flex-1">
                            <div className="flex items-center space-x-2 mb-1">
                              <span className="text-gray-900">{channel.name}</span>
                              {channel.trending && (
                                <Badge variant="outline" className="border-[#F9A03F] text-[#F9A03F] text-xs">
                                  <TrendingUp className="w-3 h-3 mr-1" />
                                  Trending
                                </Badge>
                              )}
                              {channel.unread > 0 && (
                                <span className="bg-[#F9A03F] text-white text-xs px-2 py-0.5 rounded-full">
                                  {channel.unread} new
                                </span>
                              )}
                            </div>
                            <p className="text-sm text-gray-600">{channel.description}</p>
                          </div>
                        </div>
                        <ChevronRight className={`w-5 h-5 text-gray-400 transition-transform ${expandedChannel === channel.id ? 'rotate-90' : ''}`} />
                      </div>
                    </CollapsibleTrigger>
                    <CollapsibleContent>
                      <div className="p-4 bg-gray-50 border-t border-gray-200">
                        <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
                          <div>
                            <p className="text-gray-600 mb-1">Members</p>
                            <p className="text-gray-900">{channel.members}</p>
                          </div>
                          <div>
                            <p className="text-gray-600 mb-1">Last Activity</p>
                            <p className="text-gray-900">{channel.lastActivity}</p>
                          </div>
                        </div>
                        <button
                          onClick={() => handleOpenSlack(channel.id)}
                          className="w-full bg-[#611F69] text-white px-4 py-2 rounded-lg hover:bg-[#4A154B] transition-colors flex items-center justify-center space-x-2"
                        >
                          <ExternalLink className="w-4 h-4" />
                          <span>Open in Slack</span>
                        </button>
                      </div>
                    </CollapsibleContent>
                  </div>
                </Collapsible>
              ))}
            </div>
          </div>
        </TabsContent>

        {/* DIRECT MESSAGES TAB */}
        <TabsContent value="messages" className="space-y-6">
          <div className="grid lg:grid-cols-2 gap-6">
            {directMessages.map((dm) => (
              <div 
                key={dm.id}
                className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:border-[#2C6975] transition-colors"
              >
                <div className="flex items-start space-x-4 mb-4">
                  <Avatar className="w-12 h-12">
                    <AvatarFallback className={`${
                      dm.avatar === '✨' ? 'bg-gradient-to-br from-[#F9A03F] to-[#e89135]' : 'bg-[#2C6975]'
                    } text-white`}>
                      {dm.avatar}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <h4 className="text-gray-900">{dm.name}</h4>
                      {dm.unread && (
                        <Badge variant="outline" className="border-[#F9A03F] text-[#F9A03F] text-xs">
                          New
                        </Badge>
                      )}
                    </div>
                    <p className="text-xs text-gray-600">{dm.role}</p>
                  </div>
                </div>
                
                <div className="bg-gray-50 rounded-lg p-3 mb-4">
                  <p className="text-sm text-gray-700">{dm.lastMessage}</p>
                  <p className="text-xs text-gray-500 mt-2">{dm.timestamp}</p>
                </div>

                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => openDmModal(dm)}
                    className="flex-1 bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200 transition-colors flex items-center justify-center space-x-2"
                  >
                    <Eye className="w-4 h-4" />
                    <span>View</span>
                  </button>
                  <button
                    onClick={() => handleOpenSlack(`dm-${dm.id}`)}
                    className="flex-1 bg-[#611F69] text-white px-4 py-2 rounded-lg hover:bg-[#4A154B] transition-colors flex items-center justify-center space-x-2"
                  >
                    <ExternalLink className="w-4 h-4" />
                    <span>Open in Slack</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </TabsContent>

        {/* GROUP SESSIONS TAB */}
        <TabsContent value="sessions" className="space-y-6">
          {/* Upcoming Sessions */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h3 className="text-gray-900 mb-4 flex items-center space-x-2">
              <Calendar className="w-5 h-5 text-[#2C6975]" />
              <span>Upcoming Sessions</span>
            </h3>
            <div className="space-y-4">
              {groupSessions.map((session) => (
                <div 
                  key={session.id}
                  className="p-4 border-2 border-gray-200 rounded-lg hover:border-[#F9A03F] transition-colors"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-2">
                        <h4 className="text-gray-900">{session.title}</h4>
                        <Badge variant="outline" className={`text-xs ${
                          session.type === 'huddle' ? 'border-[#7EB5C1] text-[#7EB5C1]' : 'border-[#F9A03F] text-[#F9A03F]'
                        }`}>
                          {session.type}
                        </Badge>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4 text-sm mb-3">
                        <div className="flex items-center space-x-2 text-gray-600">
                          <User className="w-4 h-4" />
                          <span>Host: {session.host}</span>
                        </div>
                        <div className="flex items-center space-x-2 text-gray-600">
                          <Hash className="w-4 h-4" />
                          <span>{session.channel}</span>
                        </div>
                        <div className="flex items-center space-x-2 text-gray-600">
                          <Clock className="w-4 h-4" />
                          <span>{session.datetime}</span>
                        </div>
                        <div className="flex items-center space-x-2 text-gray-600">
                          <Users className="w-4 h-4" />
                          <span>{session.participants}/{session.maxParticipants} joined</span>
                        </div>
                      </div>

                      <div className="w-full bg-gray-100 rounded-full h-2 mb-2">
                        <div 
                          className="bg-[#3B6A52] h-2 rounded-full" 
                          style={{ width: `${(session.participants / session.maxParticipants) * 100}%` }}
                        ></div>
                      </div>
                      <p className="text-xs text-gray-500">
                        {session.maxParticipants - session.participants} spots remaining
                      </p>
                    </div>
                  </div>

                  <button
                    onClick={() => handleJoinSession(session.id)}
                    className="w-full bg-[#F9A03F] text-white px-6 py-3 rounded-lg hover:bg-[#e89135] transition-colors flex items-center justify-center space-x-2"
                  >
                    <Play className="w-5 h-5" />
                    <span>Join Session</span>
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Past Sessions with Summaries */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-gray-900 flex items-center space-x-2">
                <BarChart3 className="w-5 h-5 text-[#2C6975]" />
                <span>Past Sessions</span>
              </h3>
              <Badge variant="outline" className="text-xs">
                Summaries by Penny AI
              </Badge>
            </div>

            <div className="space-y-4">
              {pastSessions.map((session) => (
                <div 
                  key={session.id}
                  className="p-4 border border-gray-200 rounded-lg"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-2">
                        <h4 className="text-gray-900">{session.title}</h4>
                        {session.recording && (
                          <Badge variant="outline" className="text-xs border-[#7EB5C1] text-[#7EB5C1]">
                            <Video className="w-3 h-3 mr-1" />
                            Recording
                          </Badge>
                        )}
                      </div>
                      <div className="flex items-center space-x-4 text-xs text-gray-600 mb-3">
                        <span>{session.date}</span>
                        <span>•</span>
                        <span>{session.participants} participants</span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gradient-to-br from-[#F5F3E8] to-white border border-[#F9A03F]/20 rounded-lg p-4 mb-3">
                    <div className="flex items-start space-x-2 mb-2">
                      <Sparkles className="w-4 h-4 text-[#F9A03F] flex-shrink-0 mt-0.5" />
                      <p className="text-xs text-gray-700">
                        <span className="font-medium">Penny's Summary:</span>
                      </p>
                    </div>
                    <p className="text-sm text-gray-700">{session.summary}</p>
                  </div>

                  {session.recording && (
                    <button className="text-sm text-[#2C6975] hover:underline flex items-center space-x-1">
                      <Video className="w-4 h-4" />
                      <span>Watch Recording</span>
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>
        </TabsContent>

        {/* MY COHORT TAB */}
        <TabsContent value="cohort" className="space-y-6">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-gray-900 mb-1">Explorer 2025 Cohort</h3>
                <p className="text-sm text-gray-600">Spring 2025 • {cohortMembers.length} members</p>
              </div>
              <button
                onClick={() => handleOpenSlack('explorer-2025')}
                className="bg-[#611F69] text-white px-4 py-2 rounded-lg hover:bg-[#4A154B] transition-colors flex items-center space-x-2"
              >
                <Hash className="w-4 h-4" />
                <span>Open Cohort Channel</span>
              </button>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {cohortMembers.map((member, idx) => (
                <div 
                  key={idx}
                  className="p-4 border border-gray-200 rounded-lg hover:border-[#2C6975] transition-colors"
                >
                  <div className="flex items-start space-x-3 mb-3">
                    <div className="relative">
                      <Avatar className="w-10 h-10">
                        <AvatarFallback className="bg-[#2C6975] text-white">
                          {member.avatar}
                        </AvatarFallback>
                      </Avatar>
                      <div className={`absolute -bottom-1 -right-1 w-3 h-3 rounded-full border-2 border-white ${
                        member.status === 'online' ? 'bg-green-500' :
                        member.status === 'away' ? 'bg-yellow-500' :
                        'bg-gray-400'
                      }`}></div>
                    </div>
                    <div className="flex-1">
                      <h4 className="text-sm text-gray-900 mb-1">{member.name}</h4>
                      <p className="text-xs text-gray-600">{member.role}</p>
                    </div>
                  </div>
                  
                  {member.trail !== 'N/A' && (
                    <div className="mb-3">
                      <p className="text-xs text-gray-600 mb-1">Trail:</p>
                      <Badge variant="outline" className="text-xs">
                        {member.trail}
                      </Badge>
                    </div>
                  )}

                  <button
                    onClick={() => handleOpenSlack(`dm-${member.name}`)}
                    className="w-full text-sm bg-gray-100 text-gray-700 px-3 py-2 rounded-lg hover:bg-gray-200 transition-colors flex items-center justify-center space-x-2"
                  >
                    <MessageSquare className="w-4 h-4" />
                    <span>Message</span>
                  </button>
                </div>
              ))}
            </div>

            {/* Cohort Highlights */}
            <div className="mt-6 p-4 bg-gradient-to-br from-[#F5F3E8] to-white border border-[#2C6975]/20 rounded-lg">
              <div className="flex items-start space-x-3">
                <Sparkles className="w-5 h-5 text-[#F9A03F] flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm text-gray-900 mb-2">
                    <span className="font-medium">Cohort Highlights</span>
                  </p>
                  <ul className="text-sm text-gray-700 space-y-1">
                    <li>• Most active learner: Jordan Lee (helping 12+ peers this week)</li>
                    <li>• 4 members completed Trail Missions this week</li>
                    <li>• Average cohort progress: 62%</li>
                    <li>• Next group session: Tomorrow at 2:00 PM</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </TabsContent>
      </Tabs>

      {/* DM Preview Modal */}
      <Dialog open={isDmModalOpen} onOpenChange={setIsDmModalOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="flex items-center space-x-3">
              {selectedDm && (
                <>
                  <Avatar className="w-10 h-10">
                    <AvatarFallback className={`${
                      selectedDm.avatar === '✨' ? 'bg-gradient-to-br from-[#F9A03F] to-[#e89135]' : 'bg-[#2C6975]'
                    } text-white`}>
                      {selectedDm.avatar}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <span>{selectedDm.name}</span>
                    <p className="text-sm text-gray-600 font-normal">{selectedDm.role}</p>
                  </div>
                </>
              )}
            </DialogTitle>
            <DialogDescription>
              Message preview - Open in Slack for full conversation
            </DialogDescription>
          </DialogHeader>

          {selectedDm && (
            <div className="space-y-4">
              {/* Message Preview */}
              <div className="bg-gray-50 rounded-lg p-4 max-h-96 overflow-y-auto">
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <Avatar className="w-8 h-8">
                      <AvatarFallback className={`${
                        selectedDm.avatar === '✨' ? 'bg-gradient-to-br from-[#F9A03F] to-[#e89135]' : 'bg-[#2C6975]'
                      } text-white text-xs`}>
                        {selectedDm.avatar}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-1">
                        <span className="text-sm text-gray-900">{selectedDm.name}</span>
                        <span className="text-xs text-gray-500">{selectedDm.timestamp}</span>
                      </div>
                      <p className="text-sm text-gray-700">{selectedDm.lastMessage}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center space-x-3">
                <button
                  onClick={() => setIsDmModalOpen(false)}
                  className="flex-1 bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200 transition-colors"
                >
                  Close
                </button>
                <button
                  onClick={() => {
                    handleOpenSlack(`dm-${selectedDm.id}`);
                    setIsDmModalOpen(false);
                  }}
                  className="flex-1 bg-[#611F69] text-white px-4 py-2 rounded-lg hover:bg-[#4A154B] transition-colors flex items-center justify-center space-x-2"
                >
                  <ExternalLink className="w-4 h-4" />
                  <span>Open in Slack</span>
                </button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Disconnected State Alert */}
      {!isSlackConnected && (
        <div className="fixed bottom-4 right-4 max-w-md">
          <div className="bg-white border-2 border-[#F9A03F] rounded-lg shadow-lg p-4">
            <div className="flex items-start space-x-3">
              <AlertCircle className="w-5 h-5 text-[#F9A03F] flex-shrink-0 mt-0.5" />
              <div className="flex-1">
                <p className="text-sm text-gray-900 mb-2">
                  <span className="font-medium">Slack connection expired</span>
                </p>
                <p className="text-sm text-gray-600 mb-3">
                  Reconnect to see live updates and messages
                </p>
                <button
                  onClick={() => setIsSlackConnected(true)}
                  className="bg-[#611F69] text-white px-4 py-2 rounded-lg hover:bg-[#4A154B] transition-colors text-sm flex items-center space-x-2"
                >
                  <RefreshCw className="w-4 h-4" />
                  <span>Reconnect Slack</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
