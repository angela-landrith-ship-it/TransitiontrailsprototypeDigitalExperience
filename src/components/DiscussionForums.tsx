import { useState } from 'react';
import { ArrowLeft, Search, Plus, TrendingUp, MessageCircle, Eye, ThumbsUp, CheckCircle, Pin, Filter, Clock, Users, Star } from 'lucide-react';
import { PageType } from '../App';
import { SectionHeader } from './SectionHeader';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { ForumThreadView } from './ForumThreadView';
import { ForumEditor } from './ForumEditor';

interface DiscussionForumsProps {
  onNavigate: (page: PageType) => void;
}

// Forum categories
const categories = [
  {
    id: 'learning',
    name: 'Learning & Courses',
    icon: '📚',
    description: 'Questions about modules, trails, and coursework',
    color: '#2C6975', // Teal
    threadCount: 342,
    replyCount: 1876,
  },
  {
    id: 'projects',
    name: 'Capstone Projects',
    icon: '🏗️',
    description: 'Get help with your capstone and portfolio projects',
    color: '#F9A03F', // Orange
    threadCount: 189,
    replyCount: 954,
  },
  {
    id: 'career',
    name: 'Career & Jobs',
    icon: '💼',
    description: 'Career advice, job search, and interview prep',
    color: '#7EB5C1', // Sky Blue
    threadCount: 156,
    replyCount: 723,
  },
  {
    id: 'technical',
    name: 'Technical Help',
    icon: '⚙️',
    description: 'Debugging, code reviews, and technical questions',
    color: '#3B6A52', // Green
    threadCount: 267,
    replyCount: 1432,
  },
  {
    id: 'general',
    name: 'General Discussion',
    icon: '💬',
    description: 'Community chat, introductions, and off-topic',
    color: '#666',
    threadCount: 124,
    replyCount: 589,
  },
];

// Mock threads
const mockThreads = [
  {
    id: '1',
    title: 'How do I debug Apex trigger test failures?',
    content: 'I\'m getting a "System.DmlException: Insert failed" error when running my trigger tests. The trigger works fine in sandbox but tests keep failing. Here\'s my code...',
    author: {
      name: 'Sarah Chen',
      avatar: 'SC',
      badge: 'Explorer',
      points: 1250,
    },
    category: 'technical',
    tags: ['apex', 'testing', 'triggers'],
    views: 234,
    replies: 12,
    upvotes: 18,
    isPinned: false,
    isAnswered: true,
    createdAt: '2 hours ago',
    lastActivity: '15 min ago',
  },
  {
    id: '2',
    title: 'Best practices for capstone project deployment?',
    content: 'I\'m finishing my Admin Trail capstone and want to make sure I\'m deploying it correctly. Should I use change sets or should I learn Git/GitHub for this?',
    author: {
      name: 'Marcus Williams',
      avatar: 'MW',
      badge: 'Trailblazer',
      points: 2890,
    },
    category: 'projects',
    tags: ['capstone', 'deployment', 'git'],
    views: 156,
    replies: 8,
    upvotes: 24,
    isPinned: false,
    isAnswered: true,
    createdAt: '5 hours ago',
    lastActivity: '1 hour ago',
  },
  {
    id: '3',
    title: '📌 Welcome to the Discussion Forums!',
    content: 'Welcome to our new native discussion forums! This is your place to ask questions, share knowledge, and connect with peers. Please read our community guidelines before posting.',
    author: {
      name: 'Coach Taylor',
      avatar: 'CT',
      badge: 'Admin',
      points: 9999,
    },
    category: 'general',
    tags: ['announcement', 'welcome'],
    views: 892,
    replies: 45,
    upvotes: 156,
    isPinned: true,
    isAnswered: false,
    createdAt: '2 days ago',
    lastActivity: '10 min ago',
  },
  {
    id: '4',
    title: 'How to prepare for Salesforce Admin certification?',
    content: 'I\'m about to complete the Admin Trail and want to get certified. What study resources did you use? How long should I study? Any tips for the exam?',
    author: {
      name: 'Jennifer Park',
      avatar: 'JP',
      badge: 'Explorer',
      points: 890,
    },
    category: 'career',
    tags: ['certification', 'admin', 'study-tips'],
    views: 445,
    replies: 23,
    upvotes: 67,
    isPinned: false,
    isAnswered: true,
    createdAt: '1 day ago',
    lastActivity: '2 hours ago',
  },
  {
    id: '5',
    title: 'Understanding SOQL relationship queries',
    content: 'Can someone explain parent-to-child vs child-to-parent queries? I keep getting "Didn\'t understand relationship" errors.',
    author: {
      name: 'David Rodriguez',
      avatar: 'DR',
      badge: 'Pioneer',
      points: 1678,
    },
    category: 'learning',
    tags: ['soql', 'queries', 'relationships'],
    views: 178,
    replies: 6,
    upvotes: 12,
    isPinned: false,
    isAnswered: true,
    createdAt: '8 hours ago',
    lastActivity: '45 min ago',
  },
  {
    id: '6',
    title: 'My capstone project showcase - Nonprofit CRM',
    content: 'Just finished my capstone! Built a complete CRM for nonprofits with donation tracking, volunteer management, and reporting. Would love feedback!',
    author: {
      name: 'Alex Johnson',
      avatar: 'AJ',
      badge: 'Trailblazer',
      points: 3245,
    },
    category: 'projects',
    tags: ['showcase', 'capstone', 'nonprofit'],
    views: 567,
    replies: 34,
    upvotes: 89,
    isPinned: false,
    isAnswered: false,
    createdAt: '12 hours ago',
    lastActivity: '30 min ago',
  },
  {
    id: '7',
    title: 'Job search timeline after completing trails?',
    content: 'For those who completed their trails and got jobs - how long did it take? What was your strategy? Did you apply to 100s of jobs or network your way in?',
    author: {
      name: 'Emily Watson',
      avatar: 'EW',
      badge: 'Explorer',
      points: 1456,
    },
    category: 'career',
    tags: ['job-search', 'networking', 'timeline'],
    views: 334,
    replies: 19,
    upvotes: 45,
    isPinned: false,
    isAnswered: true,
    createdAt: '18 hours ago',
    lastActivity: '3 hours ago',
  },
  {
    id: '8',
    title: 'Formula field not working in validation rule?',
    content: 'I created a formula field to calculate days since last contact, but when I reference it in a validation rule it says "Unknown function". What am I doing wrong?',
    author: {
      name: 'Chris Martinez',
      avatar: 'CM',
      badge: 'Explorer',
      points: 723,
    },
    category: 'technical',
    tags: ['formulas', 'validation-rules'],
    views: 89,
    replies: 4,
    upvotes: 7,
    isPinned: false,
    isAnswered: false,
    createdAt: '3 hours ago',
    lastActivity: '1 hour ago',
  },
];

type SortOption = 'recent' | 'popular' | 'unanswered' | 'trending';

export function DiscussionForums({ onNavigate }: DiscussionForumsProps) {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedThread, setSelectedThread] = useState<string | null>(null);
  const [showNewThread, setShowNewThread] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<SortOption>('recent');

  // Filter threads by category and search
  const filteredThreads = mockThreads.filter((thread) => {
    const matchesCategory = !selectedCategory || thread.category === selectedCategory;
    const matchesSearch =
      !searchQuery ||
      thread.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      thread.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
      thread.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  // Sort threads
  const sortedThreads = [...filteredThreads].sort((a, b) => {
    switch (sortBy) {
      case 'popular':
        return b.upvotes - a.upvotes;
      case 'unanswered':
        return a.isAnswered === b.isAnswered ? 0 : a.isAnswered ? 1 : -1;
      case 'trending':
        return b.views - a.views;
      case 'recent':
      default:
        return 0; // Keep current order (mock data already sorted by recent)
    }
  });

  // Separate pinned threads
  const pinnedThreads = sortedThreads.filter((t) => t.isPinned);
  const regularThreads = sortedThreads.filter((t) => !t.isPinned);

  if (selectedThread) {
    return (
      <ForumThreadView
        threadId={selectedThread}
        onBack={() => setSelectedThread(null)}
        onNavigate={onNavigate}
      />
    );
  }

  if (showNewThread) {
    return (
      <ForumEditor
        mode="thread"
        onCancel={() => setShowNewThread(false)}
        onSubmit={(data) => {
          console.log('New thread:', data);
          setShowNewThread(false);
          // In real app, would create thread and navigate to it
        }}
        onNavigate={onNavigate}
      />
    );
  }

  return (
    <div className="min-h-screen bg-[#F5F3E8] dark:bg-slate-900 pb-20">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <button
            onClick={() => onNavigate('community')}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-4"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Community
          </button>

          <SectionHeader
            icon={MessageCircle}
            title="Discussion Forums"
            subtitle="Ask questions, share knowledge, and connect with peers"
            color="#2C6975"
          />

          {/* Stats */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-6">
            <div className="bg-gray-50 rounded-lg p-4">
              <div className="flex items-center gap-2 text-gray-500 text-sm mb-1">
                <MessageCircle className="w-4 h-4" />
                <span>Total Threads</span>
              </div>
              <div className="text-2xl text-gray-900">
                {categories.reduce((sum, cat) => sum + cat.threadCount, 0)}
              </div>
            </div>
            <div className="bg-gray-50 rounded-lg p-4">
              <div className="flex items-center gap-2 text-gray-500 text-sm mb-1">
                <Users className="w-4 h-4" />
                <span>Total Replies</span>
              </div>
              <div className="text-2xl text-gray-900">
                {categories.reduce((sum, cat) => sum + cat.replyCount, 0)}
              </div>
            </div>
            <div className="bg-gray-50 rounded-lg p-4">
              <div className="flex items-center gap-2 text-gray-500 text-sm mb-1">
                <TrendingUp className="w-4 h-4" />
                <span>Active Today</span>
              </div>
              <div className="text-2xl text-gray-900">127</div>
            </div>
            <div className="bg-gray-50 rounded-lg p-4">
              <div className="flex items-center gap-2 text-gray-500 text-sm mb-1">
                <Star className="w-4 h-4" />
                <span>Solved Today</span>
              </div>
              <div className="text-2xl text-gray-900">34</div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Sidebar - Categories */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl border border-gray-200 p-6 sticky top-4">
              <h3 className="mb-4 text-gray-900">Categories</h3>

              <div className="space-y-2">
                <button
                  onClick={() => setSelectedCategory(null)}
                  className={`w-full text-left px-3 py-2 rounded-lg transition-colors ${
                    selectedCategory === null
                      ? 'bg-[#2C6975] text-white'
                      : 'hover:bg-gray-100 text-gray-700'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span>All Categories</span>
                    <Badge variant="secondary" className="ml-2">
                      {categories.reduce((sum, cat) => sum + cat.threadCount, 0)}
                    </Badge>
                  </div>
                </button>

                {categories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => setSelectedCategory(category.id)}
                    className={`w-full text-left px-3 py-2 rounded-lg transition-colors ${
                      selectedCategory === category.id
                        ? 'bg-[#2C6975] text-white'
                        : 'hover:bg-gray-100 text-gray-700'
                    }`}
                  >
                    <div className="flex items-center gap-2 mb-1">
                      <span>{category.icon}</span>
                      <span className="text-sm">{category.name}</span>
                    </div>
                    <div className="flex items-center justify-between ml-6">
                      <span className="text-xs opacity-75">{category.threadCount} threads</span>
                    </div>
                  </button>
                ))}
              </div>

              <Button
                onClick={() => setShowNewThread(true)}
                className="w-full mt-6 bg-[#F9A03F] hover:bg-[#f89520] text-white"
              >
                <Plus className="w-4 h-4 mr-2" />
                New Thread
              </Button>
            </div>
          </div>

          {/* Main Content - Threads */}
          <div className="lg:col-span-3">
            {/* Search and Filters */}
            <div className="bg-white rounded-xl border border-gray-200 p-4 mb-6">
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <Input
                    placeholder="Search threads, tags, or content..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <div className="flex gap-2">
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value as SortOption)}
                    className="px-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#2C6975]"
                  >
                    <option value="recent">Most Recent</option>
                    <option value="popular">Most Popular</option>
                    <option value="unanswered">Unanswered</option>
                    <option value="trending">Trending</option>
                  </select>
                </div>
              </div>

              {selectedCategory && (
                <div className="mt-4 flex items-center gap-2">
                  <Filter className="w-4 h-4 text-gray-400" />
                  <span className="text-sm text-gray-600">
                    Filtered by:{' '}
                    <span className="text-gray-900">
                      {categories.find((c) => c.id === selectedCategory)?.name}
                    </span>
                  </span>
                  <button
                    onClick={() => setSelectedCategory(null)}
                    className="text-sm text-[#2C6975] hover:underline ml-2"
                  >
                    Clear
                  </button>
                </div>
              )}
            </div>

            {/* Thread List */}
            <div className="space-y-4">
              {/* Pinned Threads */}
              {pinnedThreads.map((thread) => (
                <ThreadCard
                  key={thread.id}
                  thread={thread}
                  onClick={() => setSelectedThread(thread.id)}
                  categoryColor={categories.find((c) => c.id === thread.category)?.color}
                />
              ))}

              {/* Regular Threads */}
              {regularThreads.map((thread) => (
                <ThreadCard
                  key={thread.id}
                  thread={thread}
                  onClick={() => setSelectedThread(thread.id)}
                  categoryColor={categories.find((c) => c.id === thread.category)?.color}
                />
              ))}

              {filteredThreads.length === 0 && (
                <div className="bg-white rounded-xl border border-gray-200 p-12 text-center">
                  <MessageCircle className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-gray-900 mb-2">No threads found</h3>
                  <p className="text-gray-600 mb-6">
                    {searchQuery
                      ? 'Try adjusting your search terms'
                      : 'Be the first to start a discussion!'}
                  </p>
                  <Button
                    onClick={() => setShowNewThread(true)}
                    className="bg-[#2C6975] hover:bg-[#235158] text-white"
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    Start New Thread
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

interface ThreadCardProps {
  thread: typeof mockThreads[0];
  onClick: () => void;
  categoryColor?: string;
}

function ThreadCard({ thread, onClick, categoryColor }: ThreadCardProps) {
  return (
    <div
      onClick={onClick}
      className="bg-white rounded-xl border border-gray-200 p-6 hover:border-[#2C6975] hover:shadow-sm transition-all cursor-pointer"
    >
      <div className="flex gap-4">
        {/* Upvote Section */}
        <div className="flex flex-col items-center gap-1 min-w-[48px]">
          <button
            onClick={(e) => {
              e.stopPropagation();
              console.log('Upvote thread');
            }}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors group"
          >
            <ThumbsUp className="w-5 h-5 text-gray-400 group-hover:text-[#2C6975]" />
          </button>
          <span className="text-sm text-gray-900">{thread.upvotes}</span>
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start gap-3 mb-3">
            {thread.isPinned && (
              <Pin className="w-4 h-4 text-[#F9A03F] flex-shrink-0 mt-1" />
            )}
            <div className="flex-1 min-w-0">
              <h3 className="text-gray-900 mb-2 hover:text-[#2C6975] transition-colors">
                {thread.title}
              </h3>
              <p className="text-gray-600 text-sm line-clamp-2 mb-3">{thread.content}</p>

              {/* Tags */}
              <div className="flex flex-wrap gap-2 mb-3">
                {thread.tags.map((tag) => (
                  <Badge
                    key={tag}
                    variant="secondary"
                    className="text-xs"
                    style={{
                      backgroundColor: categoryColor ? `${categoryColor}15` : undefined,
                      color: categoryColor,
                    }}
                  >
                    {tag}
                  </Badge>
                ))}
              </div>

              {/* Meta Info */}
              <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-full bg-[#2C6975] text-white flex items-center justify-center text-xs">
                    {thread.author.avatar}
                  </div>
                  <span>{thread.author.name}</span>
                  <Badge variant="outline" className="text-xs">
                    {thread.author.badge}
                  </Badge>
                </div>

                <div className="flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  <span>{thread.createdAt}</span>
                </div>

                <div className="flex items-center gap-1">
                  <MessageCircle className="w-4 h-4" />
                  <span>{thread.replies} replies</span>
                </div>

                <div className="flex items-center gap-1">
                  <Eye className="w-4 h-4" />
                  <span>{thread.views} views</span>
                </div>

                {thread.isAnswered && (
                  <div className="flex items-center gap-1 text-green-600">
                    <CheckCircle className="w-4 h-4" />
                    <span>Answered</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
