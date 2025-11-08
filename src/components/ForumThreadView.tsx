import { useState } from 'react';
import { ArrowLeft, ThumbsUp, MessageCircle, Eye, Clock, CheckCircle, MoreVertical, Flag, Edit, Trash, Pin, Lock, Share2, Bookmark } from 'lucide-react';
import { PageType } from '../App';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Avatar, AvatarFallback } from './ui/avatar';
import { ForumEditor } from './ForumEditor';

interface ForumThreadViewProps {
  threadId: string;
  onBack: () => void;
  onNavigate: (page: PageType) => void;
}

// Mock thread data
const mockThread = {
  id: '1',
  title: 'How do I debug Apex trigger test failures?',
  content: `I'm getting a \`System.DmlException: Insert failed\` error when running my trigger tests. The trigger works fine in sandbox but tests keep failing.

Here's my code:

\`\`\`apex
trigger AccountTrigger on Account (before insert, before update) {
    for (Account acc : Trigger.new) {
        if (acc.Industry == null) {
            acc.Industry = 'Other';
        }
    }
}
\`\`\`

And the test:

\`\`\`apex
@isTest
private class AccountTriggerTest {
    @isTest
    static void testTrigger() {
        Account acc = new Account(Name = 'Test');
        insert acc;
        
        System.assertEquals('Other', acc.Industry);
    }
}
\`\`\`

The error happens on the insert line. What am I doing wrong?`,
  author: {
    name: 'Sarah Chen',
    avatar: 'SC',
    badge: 'Explorer',
    points: 1250,
    trailProgress: 65,
    joinDate: 'Jan 2025',
  },
  category: 'technical',
  tags: ['apex', 'testing', 'triggers'],
  views: 234,
  replies: 3,
  upvotes: 18,
  isUpvoted: false,
  isBookmarked: false,
  isPinned: false,
  isLocked: false,
  isAnswered: true,
  bestAnswerId: 'reply-2',
  createdAt: '2 hours ago',
  lastActivity: '15 min ago',
};

const mockReplies = [
  {
    id: 'reply-1',
    content: `Have you tried querying the account after insert to verify the Industry field was set? The test is checking the value on the in-memory object, which won't have the trigger changes.

Try this instead:

\`\`\`apex
@isTest
static void testTrigger() {
    Account acc = new Account(Name = 'Test');
    insert acc;
    
    // Query to get the updated record
    Account insertedAcc = [SELECT Industry FROM Account WHERE Id = :acc.Id];
    System.assertEquals('Other', insertedAcc.Industry);
}
\`\`\``,
    author: {
      name: 'Marcus Williams',
      avatar: 'MW',
      badge: 'Trailblazer',
      points: 2890,
    },
    upvotes: 5,
    isUpvoted: false,
    isBestAnswer: false,
    createdAt: '1 hour ago',
  },
  {
    id: 'reply-2',
    content: `The issue is that you need to query the record after insert to see trigger changes. Also, I'd recommend using \`Test.startTest()\` and \`Test.stopTest()\` for better test isolation:

\`\`\`apex
@isTest
static void testIndustryDefault() {
    Account acc = new Account(Name = 'Test Corp');
    
    Test.startTest();
    insert acc;
    Test.stopTest();
    
    Account result = [SELECT Industry FROM Account WHERE Id = :acc.Id];
    System.assertEquals('Other', result.Industry, 'Industry should default to Other');
}
\`\`\`

This ensures your trigger runs within the test context limits. Also add assertions that explain what you're testing!`,
    author: {
      name: 'Coach Taylor',
      avatar: 'CT',
      badge: 'Admin',
      points: 9999,
    },
    upvotes: 23,
    isUpvoted: true,
    isBestAnswer: true,
    createdAt: '45 min ago',
  },
  {
    id: 'reply-3',
    content: `Great explanations above! One more tip - consider creating a test utility method for creating test accounts:

\`\`\`apex
public class TestDataFactory {
    public static Account createAccount(String name, String industry) {
        return new Account(
            Name = name,
            Industry = industry
        );
    }
}
\`\`\`

Then your tests become more readable and you can reuse the factory across test classes.`,
    author: {
      name: 'Jennifer Park',
      avatar: 'JP',
      badge: 'Pioneer',
      points: 1890,
    },
    upvotes: 8,
    isUpvoted: false,
    isBestAnswer: false,
    createdAt: '15 min ago',
  },
];

export function ForumThreadView({ threadId, onBack, onNavigate }: ForumThreadViewProps) {
  const [showReplyEditor, setShowReplyEditor] = useState(false);
  const [thread] = useState(mockThread);
  const [replies] = useState(mockReplies);
  const [isUpvoted, setIsUpvoted] = useState(thread.isUpvoted);
  const [upvoteCount, setUpvoteCount] = useState(thread.upvotes);
  const [isBookmarked, setIsBookmarked] = useState(thread.isBookmarked);

  const handleUpvote = () => {
    if (isUpvoted) {
      setUpvoteCount(upvoteCount - 1);
      setIsUpvoted(false);
    } else {
      setUpvoteCount(upvoteCount + 1);
      setIsUpvoted(true);
    }
  };

  const handleReplyUpvote = (replyId: string) => {
    console.log('Upvote reply:', replyId);
    // In real app, would update reply upvote count
  };

  const handleMarkBestAnswer = (replyId: string) => {
    console.log('Mark best answer:', replyId);
    // In real app, would update thread.bestAnswerId
  };

  if (showReplyEditor) {
    return (
      <ForumEditor
        mode="reply"
        threadTitle={thread.title}
        onCancel={() => setShowReplyEditor(false)}
        onSubmit={(data) => {
          console.log('New reply:', data);
          setShowReplyEditor(false);
          // In real app, would add reply to thread
        }}
        onNavigate={onNavigate}
      />
    );
  }

  return (
    <div className="min-h-screen bg-[#F5F3E8] pb-20">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-4"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Forums
          </button>

          {/* Thread Header */}
          <div className="flex items-start gap-4 mb-4">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                {thread.isPinned && <Pin className="w-4 h-4 text-[#F9A03F]" />}
                {thread.isLocked && <Lock className="w-4 h-4 text-gray-400" />}
                {thread.isAnswered && (
                  <div className="flex items-center gap-1 text-green-600">
                    <CheckCircle className="w-4 h-4" />
                    <span className="text-sm">Answered</span>
                  </div>
                )}
              </div>

              <h1 className="text-gray-900 mb-3">{thread.title}</h1>

              {/* Tags */}
              <div className="flex flex-wrap gap-2 mb-4">
                {thread.tags.map((tag) => (
                  <Badge
                    key={tag}
                    variant="secondary"
                    style={{
                      backgroundColor: '#2C697515',
                      color: '#2C6975',
                    }}
                  >
                    {tag}
                  </Badge>
                ))}
              </div>

              {/* Stats */}
              <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500">
                <div className="flex items-center gap-1">
                  <Eye className="w-4 h-4" />
                  <span>{thread.views} views</span>
                </div>
                <div className="flex items-center gap-1">
                  <MessageCircle className="w-4 h-4" />
                  <span>{thread.replies} replies</span>
                </div>
                <div className="flex items-center gap-1">
                  <ThumbsUp className="w-4 h-4" />
                  <span>{upvoteCount} upvotes</span>
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  <span>Asked {thread.createdAt}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Original Post */}
        <div className="bg-white rounded-xl border border-gray-200 p-6 mb-6">
          <div className="flex gap-4">
            {/* Voting */}
            <div className="flex flex-col items-center gap-2">
              <button
                onClick={handleUpvote}
                className={`p-2 rounded-lg transition-colors ${
                  isUpvoted
                    ? 'bg-[#2C6975] text-white'
                    : 'hover:bg-gray-100 text-gray-400'
                }`}
              >
                <ThumbsUp className="w-5 h-5" />
              </button>
              <span className="text-gray-900">{upvoteCount}</span>
            </div>

            {/* Content */}
            <div className="flex-1 min-w-0">
              {/* Author Info */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <Avatar>
                    <AvatarFallback className="bg-[#2C6975] text-white">
                      {thread.author.avatar}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-gray-900">{thread.author.name}</span>
                      <Badge variant="outline" className="text-xs">
                        {thread.author.badge}
                      </Badge>
                    </div>
                    <div className="text-sm text-gray-500">
                      {thread.author.points.toLocaleString()} points • {thread.author.trailProgress}% trail progress • Joined {thread.author.joinDate}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setIsBookmarked(!isBookmarked)}
                    className={`p-2 rounded-lg transition-colors ${
                      isBookmarked
                        ? 'bg-[#F9A03F] text-white'
                        : 'hover:bg-gray-100 text-gray-400'
                    }`}
                  >
                    <Bookmark className="w-4 h-4" />
                  </button>
                  <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                    <Share2 className="w-4 h-4 text-gray-400" />
                  </button>
                  <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                    <MoreVertical className="w-4 h-4 text-gray-400" />
                  </button>
                </div>
              </div>

              {/* Thread Content */}
              <div className="prose prose-sm max-w-none mb-4">
                <div className="whitespace-pre-wrap text-gray-700">{thread.content}</div>
              </div>

              {/* Actions */}
              <div className="flex items-center gap-2 pt-4 border-t border-gray-200">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setShowReplyEditor(true)}
                  className="text-[#2C6975] border-[#2C6975] hover:bg-[#2C6975] hover:text-white"
                >
                  <MessageCircle className="w-4 h-4 mr-2" />
                  Reply
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Replies Section */}
        <div className="mb-6">
          <h2 className="text-gray-900 mb-4">{replies.length} Answers</h2>

          <div className="space-y-4">
            {replies.map((reply) => (
              <ReplyCard
                key={reply.id}
                reply={reply}
                isBestAnswer={reply.id === thread.bestAnswerId}
                isAuthor={false}
                onUpvote={() => handleReplyUpvote(reply.id)}
                onMarkBestAnswer={() => handleMarkBestAnswer(reply.id)}
              />
            ))}
          </div>
        </div>

        {/* Quick Reply */}
        {!thread.isLocked && (
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h3 className="text-gray-900 mb-4">Your Answer</h3>
            <p className="text-gray-600 text-sm mb-4">
              Share your knowledge and help the community! Make sure your answer is clear, detailed, and helpful.
            </p>
            <Button
              onClick={() => setShowReplyEditor(true)}
              className="bg-[#2C6975] hover:bg-[#235158] text-white"
            >
              <MessageCircle className="w-4 h-4 mr-2" />
              Write an Answer
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}

interface ReplyCardProps {
  reply: typeof mockReplies[0];
  isBestAnswer: boolean;
  isAuthor: boolean;
  onUpvote: () => void;
  onMarkBestAnswer: () => void;
}

function ReplyCard({ reply, isBestAnswer, isAuthor, onUpvote, onMarkBestAnswer }: ReplyCardProps) {
  const [isUpvoted, setIsUpvoted] = useState(reply.isUpvoted);
  const [upvoteCount, setUpvoteCount] = useState(reply.upvotes);

  const handleUpvote = () => {
    if (isUpvoted) {
      setUpvoteCount(upvoteCount - 1);
      setIsUpvoted(false);
    } else {
      setUpvoteCount(upvoteCount + 1);
      setIsUpvoted(true);
    }
    onUpvote();
  };

  return (
    <div
      className={`bg-white rounded-xl border p-6 ${
        isBestAnswer
          ? 'border-green-500 ring-2 ring-green-500 ring-opacity-20'
          : 'border-gray-200'
      }`}
    >
      {isBestAnswer && (
        <div className="flex items-center gap-2 text-green-600 mb-4 pb-4 border-b border-green-200">
          <CheckCircle className="w-5 h-5" />
          <span className="font-medium">Best Answer</span>
          <span className="text-sm text-gray-600 ml-2">Marked by question author</span>
        </div>
      )}

      <div className="flex gap-4">
        {/* Voting */}
        <div className="flex flex-col items-center gap-2">
          <button
            onClick={handleUpvote}
            className={`p-2 rounded-lg transition-colors ${
              isUpvoted
                ? 'bg-[#2C6975] text-white'
                : 'hover:bg-gray-100 text-gray-400'
            }`}
          >
            <ThumbsUp className="w-5 h-5" />
          </button>
          <span className="text-gray-900">{upvoteCount}</span>

          {!isBestAnswer && isAuthor && (
            <button
              onClick={onMarkBestAnswer}
              className="p-2 hover:bg-green-100 rounded-lg transition-colors mt-2"
              title="Mark as best answer"
            >
              <CheckCircle className="w-5 h-5 text-gray-400 hover:text-green-600" />
            </button>
          )}
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          {/* Author Info */}
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center gap-3">
              <Avatar>
                <AvatarFallback className="bg-[#2C6975] text-white">
                  {reply.author.avatar}
                </AvatarFallback>
              </Avatar>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-gray-900">{reply.author.name}</span>
                  <Badge variant="outline" className="text-xs">
                    {reply.author.badge}
                  </Badge>
                </div>
                <div className="text-sm text-gray-500">
                  {reply.author.points.toLocaleString()} points • {reply.createdAt}
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                <Flag className="w-4 h-4 text-gray-400" />
              </button>
              <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                <MoreVertical className="w-4 h-4 text-gray-400" />
              </button>
            </div>
          </div>

          {/* Reply Content */}
          <div className="prose prose-sm max-w-none">
            <div className="whitespace-pre-wrap text-gray-700">{reply.content}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
