import { useState } from 'react';
import { ArrowLeft, Star, Users, Award, TrendingUp, CheckCircle, Clock, Eye, Filter, Search, AlertCircle, Trophy, ThumbsUp, MessageSquare } from 'lucide-react';
import { PageType } from '../App';
import { SectionHeader } from './SectionHeader';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Progress } from './ui/progress';
import { ReviewSubmission } from './ReviewSubmission';
import { ReviewDetail } from './ReviewDetail';
import { Avatar, AvatarFallback } from './ui/avatar';

interface PeerReviewHubProps {
  onNavigate: (page: PageType) => void;
}

// Mock review assignments
const mockAssignments = [
  {
    id: 'assign-1',
    project: {
      id: 'proj-1',
      title: 'Nonprofit Donation Tracker',
      author: 'Sarah Chen',
      authorAvatar: 'SC',
      trail: 'Admin Trail',
      submittedDate: '2 days ago',
      description: 'Complete CRM system for tracking donations, volunteers, and events with custom reports and dashboards.',
      technologies: ['Apex', 'LWC', 'Flow Builder', 'Reports'],
    },
    assignedDate: '1 day ago',
    dueDate: '4 days',
    status: 'pending' as const,
    priority: 'high' as const,
  },
  {
    id: 'assign-2',
    project: {
      id: 'proj-2',
      title: 'Sales Pipeline Dashboard',
      author: 'Marcus Williams',
      authorAvatar: 'MW',
      trail: 'Developer Trail',
      submittedDate: '3 days ago',
      description: 'Interactive dashboard with real-time pipeline analytics, custom Lightning components, and Einstein predictions.',
      technologies: ['LWC', 'Apex', 'Einstein Analytics', 'JavaScript'],
    },
    assignedDate: '2 days ago',
    dueDate: '5 days',
    status: 'pending' as const,
    priority: 'medium' as const,
  },
];

// Mock submitted reviews
const mockSubmittedReviews = [
  {
    id: 'rev-1',
    project: {
      id: 'proj-3',
      title: 'Customer Support Portal',
      author: 'Jennifer Park',
      authorAvatar: 'JP',
      trail: 'Admin Trail',
    },
    submittedDate: '2 days ago',
    overallRating: 4.5,
    categories: {
      codeQuality: 5,
      functionality: 4,
      uxDesign: 5,
      documentation: 4,
      innovation: 4,
    },
    status: 'published' as const,
    helpfulVotes: 3,
  },
  {
    id: 'rev-2',
    project: {
      id: 'proj-4',
      title: 'Inventory Management System',
      author: 'David Rodriguez',
      authorAvatar: 'DR',
      trail: 'Developer Trail',
    },
    submittedDate: '5 days ago',
    overallRating: 4.2,
    categories: {
      codeQuality: 4,
      functionality: 5,
      uxDesign: 4,
      documentation: 4,
      innovation: 4,
    },
    status: 'published' as const,
    helpfulVotes: 5,
  },
];

// Mock received reviews for your projects
const mockReceivedReviews = [
  {
    id: 'rev-rec-1',
    reviewer: {
      name: 'Alex Johnson',
      avatar: 'AJ',
      badge: 'Top Reviewer',
      reviewCount: 23,
    },
    project: {
      title: 'Event Management Platform',
      trail: 'Admin Trail',
    },
    submittedDate: '1 day ago',
    overallRating: 4.8,
    categories: {
      codeQuality: 5,
      functionality: 5,
      uxDesign: 5,
      documentation: 4,
      innovation: 5,
    },
    summary: 'Excellent implementation! Your use of Lightning Web Components is impressive, and the user experience is very intuitive. Documentation could be slightly more detailed.',
    isNew: true,
  },
  {
    id: 'rev-rec-2',
    reviewer: {
      name: 'Taylor Martinez',
      avatar: 'TM',
      badge: 'Expert Reviewer',
      reviewCount: 18,
    },
    project: {
      title: 'Event Management Platform',
      trail: 'Admin Trail',
    },
    submittedDate: '2 days ago',
    overallRating: 4.4,
    categories: {
      codeQuality: 4,
      functionality: 5,
      uxDesign: 4,
      documentation: 4,
      innovation: 5,
    },
    summary: 'Great project with solid functionality. Consider adding more error handling and edge case coverage in your Apex code.',
    isNew: false,
  },
];

// Top reviewers leaderboard
const topReviewers = [
  {
    rank: 1,
    name: 'Alex Johnson',
    avatar: 'AJ',
    reviewCount: 23,
    avgQualityScore: 4.8,
    helpfulVotes: 87,
    badge: 'Elite Reviewer',
    points: 1150,
  },
  {
    rank: 2,
    name: 'Taylor Martinez',
    avatar: 'TM',
    reviewCount: 18,
    avgQualityScore: 4.6,
    helpfulVotes: 64,
    badge: 'Expert Reviewer',
    points: 900,
  },
  {
    rank: 3,
    name: 'Sarah Chen',
    avatar: 'SC',
    reviewCount: 15,
    avgQualityScore: 4.5,
    helpfulVotes: 52,
    badge: 'Top Reviewer',
    points: 750,
  },
  {
    rank: 4,
    name: 'Marcus Williams',
    avatar: 'MW',
    reviewCount: 12,
    avgQualityScore: 4.3,
    helpfulVotes: 41,
    badge: 'Senior Reviewer',
    points: 600,
  },
  {
    rank: 5,
    name: 'You',
    avatar: 'ME',
    reviewCount: 8,
    avgQualityScore: 4.2,
    helpfulVotes: 28,
    badge: 'Rising Reviewer',
    points: 400,
  },
];

export function PeerReviewHub({ onNavigate }: PeerReviewHubProps) {
  const [selectedTab, setSelectedTab] = useState('assignments');
  const [selectedReview, setSelectedReview] = useState<string | null>(null);
  const [showReviewForm, setShowReviewForm] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  // User stats
  const userStats = {
    assignedReviews: 2,
    completedReviews: 8,
    receivedReviews: 2,
    avgRating: 4.6,
    qualityScore: 4.2,
    helpfulVotes: 28,
    rank: 5,
    points: 400,
  };

  if (showReviewForm) {
    const assignment = mockAssignments.find((a) => a.id === showReviewForm);
    return (
      <ReviewSubmission
        assignment={assignment!}
        onBack={() => setShowReviewForm(null)}
        onSubmit={(reviewData) => {
          console.log('Review submitted:', reviewData);
          setShowReviewForm(null);
          // In real app, would save review and update stats
        }}
        onNavigate={onNavigate}
      />
    );
  }

  if (selectedReview) {
    const review = mockReceivedReviews.find((r) => r.id === selectedReview);
    return (
      <ReviewDetail
        review={review!}
        onBack={() => setSelectedReview(null)}
        onNavigate={onNavigate}
      />
    );
  }

  return (
    <div className="min-h-screen bg-[#F5F3E8] pb-20">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <button
            onClick={() => onNavigate('capstone-projects')}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-4"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Projects
          </button>

          <SectionHeader
            icon={Users}
            title="Peer Review System"
            subtitle="Give and receive feedback on capstone projects"
            color="#F9A03F"
          />

          {/* Stats Cards */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-6">
            <div className="bg-gradient-to-br from-[#F9A03F] to-[#f89520] text-white rounded-lg p-4">
              <div className="flex items-center gap-2 mb-1">
                <Clock className="w-4 h-4" />
                <span className="text-sm opacity-90">Pending</span>
              </div>
              <div className="text-2xl">{userStats.assignedReviews}</div>
            </div>

            <div className="bg-gradient-to-br from-[#3B6A52] to-[#2d5440] text-white rounded-lg p-4">
              <div className="flex items-center gap-2 mb-1">
                <CheckCircle className="w-4 h-4" />
                <span className="text-sm opacity-90">Completed</span>
              </div>
              <div className="text-2xl">{userStats.completedReviews}</div>
            </div>

            <div className="bg-gradient-to-br from-[#2C6975] to-[#235158] text-white rounded-lg p-4">
              <div className="flex items-center gap-2 mb-1">
                <Star className="w-4 h-4" />
                <span className="text-sm opacity-90">Avg Rating</span>
              </div>
              <div className="text-2xl">{userStats.avgRating}</div>
            </div>

            <div className="bg-gradient-to-br from-[#7EB5C1] to-[#6a9aa5] text-white rounded-lg p-4">
              <div className="flex items-center gap-2 mb-1">
                <Trophy className="w-4 h-4" />
                <span className="text-sm opacity-90">Rank</span>
              </div>
              <div className="text-2xl">#{userStats.rank}</div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* How It Works */}
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-6 mb-6">
          <div className="flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
            <div>
              <h3 className="text-blue-900 mb-2">How Peer Review Works</h3>
              <ol className="list-decimal list-inside space-y-1 text-sm text-blue-800">
                <li>Complete your capstone project and submit it</li>
                <li>You'll be assigned 2-3 peer projects to review</li>
                <li>Review using the structured rubric (5 categories)</li>
                <li>Earn 50 points per quality review completed</li>
                <li>Receive reviews from peers on your project</li>
                <li>Climb the leaderboard and earn reviewer badges!</li>
              </ol>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <Tabs value={selectedTab} onValueChange={setSelectedTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="assignments" className="relative">
              Assignments
              {userStats.assignedReviews > 0 && (
                <Badge className="ml-2 bg-[#F9A03F] text-white">
                  {userStats.assignedReviews}
                </Badge>
              )}
            </TabsTrigger>
            <TabsTrigger value="received">
              Received
              {mockReceivedReviews.some((r) => r.isNew) && (
                <Badge className="ml-2 bg-green-500 text-white">New</Badge>
              )}
            </TabsTrigger>
            <TabsTrigger value="submitted">Submitted ({userStats.completedReviews})</TabsTrigger>
            <TabsTrigger value="leaderboard">Leaderboard</TabsTrigger>
          </TabsList>

          {/* Assignments Tab */}
          <TabsContent value="assignments" className="space-y-4">
            {mockAssignments.length > 0 ? (
              mockAssignments.map((assignment) => (
                <ReviewAssignmentCard
                  key={assignment.id}
                  assignment={assignment}
                  onStartReview={() => setShowReviewForm(assignment.id)}
                />
              ))
            ) : (
              <div className="bg-white rounded-xl border border-gray-200 p-12 text-center">
                <CheckCircle className="w-12 h-12 text-green-500 mx-auto mb-4" />
                <h3 className="text-gray-900 mb-2">All caught up!</h3>
                <p className="text-gray-600">
                  No pending review assignments. New assignments will appear when peers submit
                  projects.
                </p>
              </div>
            )}
          </TabsContent>

          {/* Received Tab */}
          <TabsContent value="received" className="space-y-4">
            {mockReceivedReviews.length > 0 ? (
              <>
                <div className="bg-white rounded-xl border border-gray-200 p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h3 className="text-gray-900 mb-1">Your Project Reviews</h3>
                      <p className="text-sm text-gray-600">
                        Reviews from peers on your capstone project
                      </p>
                    </div>
                    <div className="text-right">
                      <div className="flex items-center gap-2 text-[#F9A03F] mb-1">
                        <Star className="w-5 h-5 fill-current" />
                        <span className="text-2xl">
                          {(
                            mockReceivedReviews.reduce((sum, r) => sum + r.overallRating, 0) /
                            mockReceivedReviews.length
                          ).toFixed(1)}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600">
                        Average from {mockReceivedReviews.length} reviews
                      </p>
                    </div>
                  </div>

                  {/* Category Breakdown */}
                  <div className="grid grid-cols-5 gap-4 mb-4">
                    {[
                      { key: 'codeQuality', label: 'Code' },
                      { key: 'functionality', label: 'Function' },
                      { key: 'uxDesign', label: 'UX' },
                      { key: 'documentation', label: 'Docs' },
                      { key: 'innovation', label: 'Innovation' },
                    ].map((category) => {
                      const avg =
                        mockReceivedReviews.reduce(
                          (sum, r) => sum + r.categories[category.key as keyof typeof r.categories],
                          0
                        ) / mockReceivedReviews.length;
                      return (
                        <div key={category.key} className="text-center">
                          <div className="text-lg text-gray-900 mb-1">{avg.toFixed(1)}</div>
                          <div className="text-xs text-gray-600">{category.label}</div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {mockReceivedReviews.map((review) => (
                  <ReceivedReviewCard
                    key={review.id}
                    review={review}
                    onClick={() => setSelectedReview(review.id)}
                  />
                ))}
              </>
            ) : (
              <div className="bg-white rounded-xl border border-gray-200 p-12 text-center">
                <Eye className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                <h3 className="text-gray-900 mb-2">No reviews yet</h3>
                <p className="text-gray-600">
                  You'll receive reviews here once peers review your capstone project.
                </p>
              </div>
            )}
          </TabsContent>

          {/* Submitted Tab */}
          <TabsContent value="submitted" className="space-y-4">
            {mockSubmittedReviews.map((review) => (
              <SubmittedReviewCard key={review.id} review={review} />
            ))}
          </TabsContent>

          {/* Leaderboard Tab */}
          <TabsContent value="leaderboard">
            <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
              <div className="p-6 border-b border-gray-200 bg-gradient-to-r from-[#F9A03F] to-[#f89520]">
                <div className="flex items-center gap-3 text-white">
                  <Trophy className="w-6 h-6" />
                  <div>
                    <h3 className="text-xl">Top Reviewers</h3>
                    <p className="text-sm opacity-90">
                      Earn points and badges by providing quality reviews
                    </p>
                  </div>
                </div>
              </div>

              <div className="divide-y divide-gray-200">
                {topReviewers.map((reviewer) => (
                  <div
                    key={reviewer.rank}
                    className={`p-6 hover:bg-gray-50 transition-colors ${
                      reviewer.name === 'You' ? 'bg-blue-50' : ''
                    }`}
                  >
                    <div className="flex items-center gap-4">
                      {/* Rank */}
                      <div className="flex-shrink-0 w-12 text-center">
                        {reviewer.rank <= 3 ? (
                          <div
                            className={`w-10 h-10 rounded-full flex items-center justify-center ${
                              reviewer.rank === 1
                                ? 'bg-yellow-100 text-yellow-700'
                                : reviewer.rank === 2
                                ? 'bg-gray-100 text-gray-700'
                                : 'bg-orange-100 text-orange-700'
                            }`}
                          >
                            <Trophy className="w-5 h-5" />
                          </div>
                        ) : (
                          <div className="text-2xl text-gray-400">#{reviewer.rank}</div>
                        )}
                      </div>

                      {/* Avatar & Name */}
                      <div className="flex items-center gap-3 flex-1 min-w-0">
                        <Avatar>
                          <AvatarFallback
                            className={
                              reviewer.name === 'You'
                                ? 'bg-[#2C6975] text-white'
                                : 'bg-gray-200 text-gray-700'
                            }
                          >
                            {reviewer.avatar}
                          </AvatarFallback>
                        </Avatar>
                        <div className="min-w-0">
                          <div className="flex items-center gap-2">
                            <span className="text-gray-900 truncate">{reviewer.name}</span>
                            <Badge
                              variant="outline"
                              className="text-xs"
                              style={{
                                backgroundColor: '#F9A03F15',
                                color: '#F9A03F',
                                borderColor: '#F9A03F30',
                              }}
                            >
                              {reviewer.badge}
                            </Badge>
                          </div>
                          <div className="flex items-center gap-3 text-sm text-gray-600 mt-1">
                            <span>{reviewer.reviewCount} reviews</span>
                            <span>•</span>
                            <span className="flex items-center gap-1">
                              <Star className="w-3 h-3 fill-current text-[#F9A03F]" />
                              {reviewer.avgQualityScore}
                            </span>
                            <span>•</span>
                            <span className="flex items-center gap-1">
                              <ThumbsUp className="w-3 h-3" />
                              {reviewer.helpfulVotes}
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Points */}
                      <div className="text-right">
                        <div className="text-xl text-[#F9A03F]">{reviewer.points}</div>
                        <div className="text-xs text-gray-600">points</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Your Progress */}
            <div className="bg-white rounded-xl border border-gray-200 p-6 mt-6">
              <h3 className="text-gray-900 mb-4">Your Progress to Next Badge</h3>
              <div className="space-y-4">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-gray-600">Reviews Completed</span>
                    <span className="text-sm text-gray-900">8 / 12</span>
                  </div>
                  <Progress value={(8 / 12) * 100} className="h-2" />
                  <p className="text-xs text-gray-500 mt-1">
                    4 more reviews to earn "Senior Reviewer" badge
                  </p>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-gray-600">Quality Score</span>
                    <span className="text-sm text-gray-900">4.2 / 4.5</span>
                  </div>
                  <Progress value={(4.2 / 5) * 100} className="h-2" />
                  <p className="text-xs text-gray-500 mt-1">
                    Maintain 4.5+ avg to qualify for "Top Reviewer"
                  </p>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

interface ReviewAssignmentCardProps {
  assignment: typeof mockAssignments[0];
  onStartReview: () => void;
}

function ReviewAssignmentCard({ assignment, onStartReview }: ReviewAssignmentCardProps) {
  return (
    <div className="bg-white rounded-xl border-2 border-[#F9A03F] p-6">
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-2">
            <h3 className="text-gray-900">{assignment.project.title}</h3>
            <Badge
              variant="outline"
              className={
                assignment.priority === 'high'
                  ? 'bg-red-50 text-red-700 border-red-200'
                  : 'bg-yellow-50 text-yellow-700 border-yellow-200'
              }
            >
              {assignment.priority === 'high' ? 'High Priority' : 'Medium Priority'}
            </Badge>
          </div>
          <div className="flex items-center gap-3 text-sm text-gray-600 mb-3">
            <div className="flex items-center gap-2">
              <Avatar className="w-6 h-6">
                <AvatarFallback className="bg-[#2C6975] text-white text-xs">
                  {assignment.project.authorAvatar}
                </AvatarFallback>
              </Avatar>
              <span>{assignment.project.author}</span>
            </div>
            <span>•</span>
            <span>{assignment.project.trail}</span>
            <span>•</span>
            <span>Submitted {assignment.project.submittedDate}</span>
          </div>
          <p className="text-gray-700 mb-3">{assignment.project.description}</p>
          <div className="flex flex-wrap gap-2">
            {assignment.project.technologies.map((tech) => (
              <Badge key={tech} variant="secondary" className="text-xs">
                {tech}
              </Badge>
            ))}
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between pt-4 border-t border-gray-200">
        <div className="flex items-center gap-4 text-sm text-gray-600">
          <div className="flex items-center gap-1">
            <Clock className="w-4 h-4" />
            <span>Due in {assignment.dueDate}</span>
          </div>
          <div className="flex items-center gap-1">
            <Award className="w-4 h-4 text-[#F9A03F]" />
            <span className="text-[#F9A03F]">+50 points</span>
          </div>
        </div>

        <Button onClick={onStartReview} className="bg-[#F9A03F] hover:bg-[#f89520] text-white">
          Start Review
        </Button>
      </div>
    </div>
  );
}

interface ReceivedReviewCardProps {
  review: typeof mockReceivedReviews[0];
  onClick: () => void;
}

function ReceivedReviewCard({ review, onClick }: ReceivedReviewCardProps) {
  return (
    <div
      onClick={onClick}
      className="bg-white rounded-xl border border-gray-200 p-6 hover:border-[#F9A03F] hover:shadow-sm transition-all cursor-pointer"
    >
      {review.isNew && (
        <Badge className="mb-3 bg-green-500 text-white">New Review</Badge>
      )}

      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-3">
          <Avatar>
            <AvatarFallback className="bg-[#2C6975] text-white">
              {review.reviewer.avatar}
            </AvatarFallback>
          </Avatar>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-gray-900">{review.reviewer.name}</span>
              <Badge variant="outline" className="text-xs">
                {review.reviewer.badge}
              </Badge>
            </div>
            <div className="text-sm text-gray-600">
              {review.reviewer.reviewCount} reviews • {review.submittedDate}
            </div>
          </div>
        </div>

        <div className="text-right">
          <div className="flex items-center gap-1 text-[#F9A03F] mb-1">
            <Star className="w-5 h-5 fill-current" />
            <span className="text-xl">{review.overallRating}</span>
          </div>
          <div className="text-xs text-gray-600">Overall</div>
        </div>
      </div>

      <p className="text-gray-700 mb-3 line-clamp-2">{review.summary}</p>

      <div className="flex items-center gap-4 text-sm text-gray-600">
        {Object.entries(review.categories).map(([key, value]) => (
          <div key={key} className="flex items-center gap-1">
            <Star className="w-3 h-3 fill-current text-gray-400" />
            <span>{value}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

interface SubmittedReviewCardProps {
  review: typeof mockSubmittedReviews[0];
}

function SubmittedReviewCard({ review }: SubmittedReviewCardProps) {
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6">
      <div className="flex items-start justify-between mb-3">
        <div className="flex-1">
          <h3 className="text-gray-900 mb-1">{review.project.title}</h3>
          <div className="flex items-center gap-3 text-sm text-gray-600">
            <span>by {review.project.author}</span>
            <span>•</span>
            <span>{review.project.trail}</span>
            <span>•</span>
            <span>Reviewed {review.submittedDate}</span>
          </div>
        </div>

        <div className="text-right">
          <div className="flex items-center gap-1 text-[#F9A03F] mb-1">
            <Star className="w-5 h-5 fill-current" />
            <span className="text-xl">{review.overallRating}</span>
          </div>
          <div className="text-xs text-gray-600">Your Rating</div>
        </div>
      </div>

      <div className="grid grid-cols-5 gap-3 mb-3">
        {Object.entries(review.categories).map(([key, value]) => (
          <div key={key} className="text-center p-2 bg-gray-50 rounded-lg">
            <div className="text-lg text-gray-900">{value}</div>
            <div className="text-xs text-gray-600 capitalize">
              {key.replace(/([A-Z])/g, ' $1').trim()}
            </div>
          </div>
        ))}
      </div>

      <div className="flex items-center gap-4 text-sm text-gray-600 pt-3 border-t border-gray-200">
        <div className="flex items-center gap-1">
          <CheckCircle className="w-4 h-4 text-green-500" />
          <span className="text-green-700">Published</span>
        </div>
        <div className="flex items-center gap-1">
          <ThumbsUp className="w-4 h-4" />
          <span>{review.helpfulVotes} found helpful</span>
        </div>
      </div>
    </div>
  );
}
