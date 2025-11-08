import { useState } from 'react';
import { Search, Plus, Users, UserCircle, MoreVertical, Check, CheckCheck, Circle, ArrowLeft, Send, Paperclip, Smile, Phone, Video, Info, Archive, Trash2, Pin, Star, Clock, MessageSquare } from 'lucide-react';
import { PageType } from '../App';
import { SectionHeader } from './SectionHeader';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Avatar, AvatarFallback } from './ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { NewMessageModal } from './NewMessageModal';
import { Textarea } from './ui/textarea';

interface MessagingHubProps {
  onNavigate: (page: PageType) => void;
}

// Mock conversations
const mockConversations = [
  {
    id: 'conv-1',
    participant: {
      name: 'Coach Sarah Martinez',
      role: 'Coach',
      avatar: 'SM',
      isOnline: true,
    },
    lastMessage: {
      text: 'Great progress on your capstone! Let\'s schedule a call to discuss next steps.',
      sender: 'them',
      timestamp: '2 min ago',
      isRead: false,
    },
    unreadCount: 2,
    isPinned: true,
    messages: [
      {
        id: 'msg-1',
        text: 'Hi! I reviewed your capstone proposal and it looks really solid.',
        sender: 'them',
        timestamp: '10:23 AM',
        isRead: true,
      },
      {
        id: 'msg-2',
        text: 'Thank you so much! I was worried about the scope.',
        sender: 'me',
        timestamp: '10:25 AM',
        isRead: true,
      },
      {
        id: 'msg-3',
        text: 'The scope is perfect. I especially like how you\'re integrating the GitHub/Linear workflow.',
        sender: 'them',
        timestamp: '10:27 AM',
        isRead: true,
      },
      {
        id: 'msg-4',
        text: 'What do you think about adding automated testing?',
        sender: 'me',
        timestamp: '10:30 AM',
        isRead: true,
      },
      {
        id: 'msg-5',
        text: 'Great idea! That would really strengthen your project. Let me send you some resources.',
        sender: 'them',
        timestamp: '2:15 PM',
        isRead: false,
      },
      {
        id: 'msg-6',
        text: 'Great progress on your capstone! Let\'s schedule a call to discuss next steps.',
        sender: 'them',
        timestamp: '2:18 PM',
        isRead: false,
      },
    ],
  },
  {
    id: 'conv-2',
    participant: {
      name: 'Alex Chen',
      role: 'Peer - Admin Trail',
      avatar: 'AC',
      isOnline: true,
    },
    lastMessage: {
      text: 'Thanks! That Flow Builder tip really helped 🙏',
      sender: 'them',
      timestamp: '15 min ago',
      isRead: true,
    },
    unreadCount: 0,
    isPinned: false,
    messages: [
      {
        id: 'msg-1',
        text: 'Hey! Quick question about Flow Builder...',
        sender: 'them',
        timestamp: 'Yesterday 3:45 PM',
        isRead: true,
      },
      {
        id: 'msg-2',
        text: 'Sure, what\'s up?',
        sender: 'me',
        timestamp: 'Yesterday 3:48 PM',
        isRead: true,
      },
      {
        id: 'msg-3',
        text: 'I\'m stuck on decision elements. How do you handle multiple conditions?',
        sender: 'them',
        timestamp: 'Yesterday 3:50 PM',
        isRead: true,
      },
      {
        id: 'msg-4',
        text: 'You can use AND/OR logic in a single decision element. Let me show you...',
        sender: 'me',
        timestamp: 'Yesterday 3:52 PM',
        isRead: true,
      },
      {
        id: 'msg-5',
        text: 'Thanks! That Flow Builder tip really helped 🙏',
        sender: 'them',
        timestamp: '15 min ago',
        isRead: true,
      },
    ],
  },
  {
    id: 'conv-3',
    participant: {
      name: 'Jordan Taylor',
      role: 'Peer - Developer Trail',
      avatar: 'JT',
      isOnline: false,
    },
    lastMessage: {
      text: 'Want to pair program on that Apex trigger tomorrow?',
      sender: 'them',
      timestamp: '1 hour ago',
      isRead: false,
    },
    unreadCount: 1,
    isPinned: false,
    messages: [
      {
        id: 'msg-1',
        text: 'Hey! Saw you\'re working on Apex triggers too',
        sender: 'them',
        timestamp: '1 hour ago',
        isRead: false,
      },
      {
        id: 'msg-2',
        text: 'Want to pair program on that Apex trigger tomorrow?',
        sender: 'them',
        timestamp: '1 hour ago',
        isRead: false,
      },
    ],
  },
  {
    id: 'conv-4',
    participant: {
      name: 'Morgan Davis',
      role: 'Peer - Admin Trail',
      avatar: 'MD',
      isOnline: true,
    },
    lastMessage: {
      text: 'Perfect, see you at the study session!',
      sender: 'me',
      timestamp: '3 hours ago',
      isRead: true,
    },
    unreadCount: 0,
    isPinned: false,
    messages: [
      {
        id: 'msg-1',
        text: 'Are you coming to the Admin Trail study group tonight?',
        sender: 'them',
        timestamp: '3 hours ago',
        isRead: true,
      },
      {
        id: 'msg-2',
        text: 'Yes! 6 PM right?',
        sender: 'me',
        timestamp: '3 hours ago',
        isRead: true,
      },
      {
        id: 'msg-3',
        text: 'Yep! We\'re covering Process Builder vs Flow',
        sender: 'them',
        timestamp: '3 hours ago',
        isRead: true,
      },
      {
        id: 'msg-4',
        text: 'Perfect, see you at the study session!',
        sender: 'me',
        timestamp: '3 hours ago',
        isRead: true,
      },
    ],
  },
  {
    id: 'conv-5',
    participant: {
      name: 'Coach Michael Lee',
      role: 'Coach',
      avatar: 'ML',
      isOnline: false,
    },
    lastMessage: {
      text: 'You\'re doing great! Keep up the momentum.',
      sender: 'them',
      timestamp: 'Yesterday',
      isRead: true,
    },
    unreadCount: 0,
    isPinned: false,
    messages: [
      {
        id: 'msg-1',
        text: 'Hi Coach! I just completed Week 4 of the trail.',
        sender: 'me',
        timestamp: 'Yesterday 11:00 AM',
        isRead: true,
      },
      {
        id: 'msg-2',
        text: 'Excellent work! How are you feeling about the material?',
        sender: 'them',
        timestamp: 'Yesterday 11:15 AM',
        isRead: true,
      },
      {
        id: 'msg-3',
        text: 'Pretty good! The Flow module was challenging but I got through it.',
        sender: 'me',
        timestamp: 'Yesterday 11:20 AM',
        isRead: true,
      },
      {
        id: 'msg-4',
        text: 'You\'re doing great! Keep up the momentum.',
        sender: 'them',
        timestamp: 'Yesterday 11:25 AM',
        isRead: true,
      },
    ],
  },
];

export function MessagingHub({ onNavigate }: MessagingHubProps) {
  const [selectedConversation, setSelectedConversation] = useState<string | null>(
    mockConversations[0].id
  );
  const [showNewMessage, setShowNewMessage] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterRole, setFilterRole] = useState<'all' | 'coaches' | 'peers'>('all');
  const [messageInput, setMessageInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  // Stats
  const stats = {
    totalConversations: mockConversations.length,
    unreadCount: mockConversations.reduce((acc, conv) => acc + conv.unreadCount, 0),
    coachConversations: mockConversations.filter((c) => c.participant.role === 'Coach').length,
    peerConversations: mockConversations.filter((c) => c.participant.role.includes('Peer')).length,
  };

  // Filter conversations
  const filteredConversations = mockConversations.filter((conv) => {
    const matchesSearch =
      conv.participant.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      conv.lastMessage.text.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesRole =
      filterRole === 'all' ||
      (filterRole === 'coaches' && conv.participant.role === 'Coach') ||
      (filterRole === 'peers' && conv.participant.role.includes('Peer'));

    return matchesSearch && matchesRole;
  });

  const activeConversation = mockConversations.find((c) => c.id === selectedConversation);

  const handleSendMessage = () => {
    if (!messageInput.trim()) return;
    console.log('Sending message:', messageInput);
    setMessageInput('');
    // In real app, would send message via API
  };

  return (
    <div className="min-h-screen bg-[#F5F3E8]">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <button
            onClick={() => onNavigate('learner')}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-4"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </button>

          <SectionHeader
            icon={MessageSquare}
            title="Messages"
            subtitle="Connect directly with peers and coaches"
            color="#3B6A52"
          />

          {/* Stats Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-6">
            <div className="bg-gradient-to-br from-[#3B6A52] to-[#2d5440] text-white rounded-lg p-4">
              <div className="flex items-center gap-2 mb-1">
                <MessageSquare className="w-4 h-4" />
                <span className="text-sm opacity-90">Conversations</span>
              </div>
              <div className="text-2xl">{stats.totalConversations}</div>
            </div>

            <div className="bg-gradient-to-br from-[#F9A03F] to-[#f89520] text-white rounded-lg p-4">
              <div className="flex items-center gap-2 mb-1">
                <Circle className="w-4 h-4 fill-current" />
                <span className="text-sm opacity-90">Unread</span>
              </div>
              <div className="text-2xl">{stats.unreadCount}</div>
            </div>

            <div className="bg-gradient-to-br from-[#7EB5C1] to-[#6a9aa5] text-white rounded-lg p-4">
              <div className="flex items-center gap-2 mb-1">
                <UserCircle className="w-4 h-4" />
                <span className="text-sm opacity-90">Coaches</span>
              </div>
              <div className="text-2xl">{stats.coachConversations}</div>
            </div>

            <div className="bg-gradient-to-br from-[#2C6975] to-[#235158] text-white rounded-lg p-4">
              <div className="flex items-center gap-2 mb-1">
                <Users className="w-4 h-4" />
                <span className="text-sm opacity-90">Peers</span>
              </div>
              <div className="text-2xl">{stats.peerConversations}</div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden" style={{ height: '600px' }}>
          <div className="grid md:grid-cols-3 h-full">
            {/* Conversation List */}
            <div className="md:col-span-1 border-r border-gray-200 flex flex-col">
              {/* Search & Filter */}
              <div className="p-4 border-b border-gray-200 space-y-3">
                <div className="flex items-center gap-2">
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <Input
                      placeholder="Search messages..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                  <Button
                    size="sm"
                    onClick={() => setShowNewMessage(true)}
                    className="bg-[#3B6A52] hover:bg-[#2d5440] text-white"
                  >
                    <Plus className="w-4 h-4" />
                  </Button>
                </div>

                <Tabs value={filterRole} onValueChange={(v) => setFilterRole(v as any)} className="w-full">
                  <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="all" className="text-xs">All</TabsTrigger>
                    <TabsTrigger value="coaches" className="text-xs">Coaches</TabsTrigger>
                    <TabsTrigger value="peers" className="text-xs">Peers</TabsTrigger>
                  </TabsList>
                </Tabs>
              </div>

              {/* Conversations */}
              <div className="flex-1 overflow-y-auto">
                {filteredConversations.length > 0 ? (
                  <div className="divide-y divide-gray-200">
                    {filteredConversations.map((conv) => (
                      <button
                        key={conv.id}
                        onClick={() => setSelectedConversation(conv.id)}
                        className={`w-full p-4 text-left hover:bg-gray-50 transition-colors ${
                          selectedConversation === conv.id ? 'bg-blue-50' : ''
                        }`}
                      >
                        <div className="flex items-start gap-3">
                          <div className="relative">
                            <Avatar className="w-10 h-10">
                              <AvatarFallback
                                className={
                                  conv.participant.role === 'Coach'
                                    ? 'bg-[#F9A03F] text-white'
                                    : 'bg-[#7EB5C1] text-white'
                                }
                              >
                                {conv.participant.avatar}
                              </AvatarFallback>
                            </Avatar>
                            {conv.participant.isOnline && (
                              <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full" />
                            )}
                          </div>

                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between mb-1">
                              <div className="flex items-center gap-2">
                                <span className="text-sm text-gray-900 truncate">
                                  {conv.participant.name}
                                </span>
                                {conv.isPinned && <Pin className="w-3 h-3 text-gray-400" />}
                              </div>
                              <span className="text-xs text-gray-500 flex-shrink-0">
                                {conv.lastMessage.timestamp}
                              </span>
                            </div>

                            <div className="text-xs text-gray-600 mb-1">{conv.participant.role}</div>

                            <div className="flex items-center justify-between">
                              <p
                                className={`text-sm truncate ${
                                  conv.unreadCount > 0 ? 'text-gray-900' : 'text-gray-600'
                                }`}
                              >
                                {conv.lastMessage.sender === 'me' && 'You: '}
                                {conv.lastMessage.text}
                              </p>
                              {conv.unreadCount > 0 && (
                                <Badge className="bg-[#F9A03F] text-white border-0 ml-2">
                                  {conv.unreadCount}
                                </Badge>
                              )}
                            </div>
                          </div>
                        </div>
                      </button>
                    ))}
                  </div>
                ) : (
                  <div className="flex items-center justify-center h-full p-8 text-center">
                    <div>
                      <Search className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                      <p className="text-gray-600">No conversations found</p>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Chat Window */}
            <div className="md:col-span-2 flex flex-col">
              {activeConversation ? (
                <>
                  {/* Chat Header */}
                  <div className="p-4 border-b border-gray-200 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="relative">
                        <Avatar className="w-10 h-10">
                          <AvatarFallback
                            className={
                              activeConversation.participant.role === 'Coach'
                                ? 'bg-[#F9A03F] text-white'
                                : 'bg-[#7EB5C1] text-white'
                            }
                          >
                            {activeConversation.participant.avatar}
                          </AvatarFallback>
                        </Avatar>
                        {activeConversation.participant.isOnline && (
                          <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full" />
                        )}
                      </div>
                      <div>
                        <div className="text-gray-900">{activeConversation.participant.name}</div>
                        <div className="text-xs text-gray-600">
                          {activeConversation.participant.isOnline ? (
                            <span className="text-green-600">● Online</span>
                          ) : (
                            <span>Offline</span>
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <Button size="sm" variant="ghost">
                        <Phone className="w-4 h-4" />
                      </Button>
                      <Button size="sm" variant="ghost">
                        <Video className="w-4 h-4" />
                      </Button>
                      <Button size="sm" variant="ghost">
                        <Info className="w-4 h-4" />
                      </Button>
                      <Button size="sm" variant="ghost">
                        <MoreVertical className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>

                  {/* Messages */}
                  <div className="flex-1 overflow-y-auto p-4 space-y-4">
                    {activeConversation.messages.map((message) => (
                      <div
                        key={message.id}
                        className={`flex ${message.sender === 'me' ? 'justify-end' : 'justify-start'}`}
                      >
                        <div
                          className={`max-w-[70%] ${
                            message.sender === 'me'
                              ? 'bg-[#3B6A52] text-white'
                              : 'bg-gray-100 text-gray-900'
                          } rounded-2xl px-4 py-2`}
                        >
                          <p className="text-sm">{message.text}</p>
                          <div
                            className={`flex items-center gap-1 mt-1 text-xs ${
                              message.sender === 'me' ? 'text-white/70' : 'text-gray-500'
                            }`}
                          >
                            <span>{message.timestamp}</span>
                            {message.sender === 'me' && (
                              <>
                                {message.isRead ? (
                                  <CheckCheck className="w-3 h-3" />
                                ) : (
                                  <Check className="w-3 h-3" />
                                )}
                              </>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}

                    {isTyping && (
                      <div className="flex justify-start">
                        <div className="bg-gray-100 rounded-2xl px-4 py-2">
                          <div className="flex items-center gap-1">
                            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" />
                            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }} />
                            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
                          </div>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Message Input */}
                  <div className="p-4 border-t border-gray-200">
                    <div className="flex items-end gap-2">
                      <Button size="sm" variant="ghost">
                        <Paperclip className="w-4 h-4" />
                      </Button>
                      <Button size="sm" variant="ghost">
                        <Smile className="w-4 h-4" />
                      </Button>
                      <Textarea
                        placeholder="Type a message..."
                        value={messageInput}
                        onChange={(e) => setMessageInput(e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter' && !e.shiftKey) {
                            e.preventDefault();
                            handleSendMessage();
                          }
                        }}
                        className="flex-1 min-h-[40px] max-h-[120px] resize-none"
                        rows={1}
                      />
                      <Button
                        onClick={handleSendMessage}
                        disabled={!messageInput.trim()}
                        className="bg-[#3B6A52] hover:bg-[#2d5440] text-white"
                      >
                        <Send className="w-4 h-4" />
                      </Button>
                    </div>
                    <p className="text-xs text-gray-500 mt-2">
                      Press Enter to send, Shift+Enter for new line
                    </p>
                  </div>
                </>
              ) : (
                <div className="flex items-center justify-center h-full">
                  <div className="text-center">
                    <MessageSquare className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                    <h3 className="text-xl text-gray-900 mb-2">Select a conversation</h3>
                    <p className="text-gray-600 mb-4">
                      Choose a conversation from the list to start messaging
                    </p>
                    <Button
                      onClick={() => setShowNewMessage(true)}
                      className="bg-[#3B6A52] hover:bg-[#2d5440] text-white"
                    >
                      <Plus className="w-4 h-4 mr-2" />
                      New Message
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Quick Tips */}
        <div className="mt-6 bg-blue-50 border border-blue-200 rounded-xl p-6">
          <h3 className="text-blue-900 mb-3 flex items-center gap-2">
            <Clock className="w-5 h-5" />
            Messaging Tips
          </h3>
          <div className="grid md:grid-cols-3 gap-4 text-sm text-blue-800">
            <div>
              <div className="mb-1">💬 <strong>Connect with Peers</strong></div>
              <div className="text-xs">Share tips, ask questions, and learn together</div>
            </div>
            <div>
              <div className="mb-1">🎓 <strong>Ask Your Coach</strong></div>
              <div className="text-xs">Get personalized guidance and support</div>
            </div>
            <div>
              <div className="mb-1">⚡ <strong>Quick Replies</strong></div>
              <div className="text-xs">Respond within 24h to earn +3 points</div>
            </div>
          </div>
        </div>
      </div>

      {/* New Message Modal */}
      {showNewMessage && (
        <NewMessageModal
          onClose={() => setShowNewMessage(false)}
          onSend={(recipientId, message) => {
            console.log('New message to:', recipientId, message);
            setShowNewMessage(false);
          }}
        />
      )}
    </div>
  );
}
