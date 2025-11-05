import { useState } from 'react';
import { Sparkles, TrendingUp, Share2, MessageSquare, Award, ChevronRight, Trophy, Users } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from './ui/dialog';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { Avatar, AvatarFallback } from './ui/avatar';

interface EngagementActivity {
  type: 'share' | 'reaction' | 'comment' | 'reflection';
  description: string;
  points: number;
  timestamp: string;
}

interface TrailImpactMeterProps {
  currentPoints?: number;
  showLeaderboard?: boolean;
}

export function TrailImpactMeter({ currentPoints = 47, showLeaderboard = false }: TrailImpactMeterProps) {
  const [isLeaderboardOpen, setIsLeaderboardOpen] = useState(false);
  const [showBadgeAnimation, setShowBadgeAnimation] = useState(false);

  const maxPoints = 100;
  const percentage = Math.min((currentPoints / maxPoints) * 100, 100);
  const isComplete = currentPoints >= maxPoints;

  // Star milestone positions (at 25, 50, 75, 100)
  const milestones = [
    { points: 25, label: 'Engager', achieved: currentPoints >= 25 },
    { points: 50, label: 'Connector', achieved: currentPoints >= 50 },
    { points: 75, label: 'Advocate', achieved: currentPoints >= 75 },
    { points: 100, label: 'Champion', achieved: currentPoints >= 100 },
  ];

  // Recent activities
  const recentActivities: EngagementActivity[] = [
    { type: 'share', description: 'Shared Trail Mission completion', points: 10, timestamp: '2 hours ago' },
    { type: 'reaction', description: '5+ reactions on capstone update', points: 5, timestamp: '1 day ago' },
    { type: 'comment', description: 'Commented on peer\'s post', points: 3, timestamp: '2 days ago' },
    { type: 'reflection', description: 'Completed weekly reflection', points: 2, timestamp: '3 days ago' },
    { type: 'share', description: 'Shared Skills Assessment', points: 10, timestamp: '5 days ago' },
  ];

  // Leaderboard data
  const leaderboard = [
    { rank: 1, name: 'Taylor Martinez', initials: 'TM', points: 127, badges: 3, avatar: 'from-[#F9A03F] to-[#e89135]' },
    { rank: 2, name: 'Jordan Kim', initials: 'JK', points: 118, badges: 3, avatar: 'from-[#2C6975] to-[#1f4f5a]' },
    { rank: 3, name: 'Alex Johnson', initials: 'AJ', points: 103, badges: 2, avatar: 'from-[#7EB5C1] to-[#5a9fb0]' },
    { rank: 4, name: 'Sam Chen', initials: 'SC', points: 89, badges: 2, avatar: 'from-[#3B6A52] to-[#2d5240]' },
    { rank: 5, name: 'Morgan Lee', initials: 'ML', points: 76, badges: 2, avatar: 'from-[#F9A03F] to-[#e89135]' },
    { rank: 6, name: 'Casey Park', initials: 'CP', points: 68, badges: 1, avatar: 'from-[#2C6975] to-[#1f4f5a]' },
    { rank: 7, name: 'You', initials: 'YO', points: 47, badges: 1, avatar: 'from-[#7EB5C1] to-[#5a9fb0]', isCurrentUser: true },
    { rank: 8, name: 'Riley Foster', initials: 'RF', points: 42, badges: 1, avatar: 'from-[#3B6A52] to-[#2d5240]' },
    { rank: 9, name: 'Jamie Liu', initials: 'JL', points: 38, badges: 1, avatar: 'from-[#F9A03F] to-[#e89135]' },
    { rank: 10, name: 'Drew Wilson', initials: 'DW', points: 34, badges: 1, avatar: 'from-[#2C6975] to-[#1f4f5a]' },
  ];

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'share':
        return <Share2 className="w-4 h-4" />;
      case 'reaction':
        return <TrendingUp className="w-4 h-4" />;
      case 'comment':
        return <MessageSquare className="w-4 h-4" />;
      case 'reflection':
        return <Sparkles className="w-4 h-4" />;
      default:
        return <Award className="w-4 h-4" />;
    }
  };

  const handleBadgeUnlock = () => {
    setShowBadgeAnimation(true);
    setTimeout(() => setShowBadgeAnimation(false), 3000);
  };

  return (
    <>
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex items-start justify-between mb-6">
          <div>
            <h3 className="text-xl text-gray-900 mb-1">Trail Impact Meter</h3>
            <p className="text-sm text-gray-600">
              Earn credits by sharing your journey on LinkedIn
            </p>
          </div>
          
          {showLeaderboard && (
            <button
              onClick={() => setIsLeaderboardOpen(true)}
              className="text-sm text-[#2C6975] hover:underline flex items-center space-x-1"
            >
              <span>View Leaderboard</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Circular Progress Gauge */}
        <div className="flex items-center justify-center mb-6">
          <div className="relative">
            {/* Outer ring with glow effect */}
            <svg className="w-48 h-48 transform -rotate-90">
              {/* Background circle */}
              <circle
                cx="96"
                cy="96"
                r="88"
                stroke="#e5e7eb"
                strokeWidth="12"
                fill="none"
              />
              
              {/* Progress circle with gradient */}
              <defs>
                <linearGradient id="progressGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#F9A03F" />
                  <stop offset="100%" stopColor="#e89135" />
                </linearGradient>
              </defs>
              <circle
                cx="96"
                cy="96"
                r="88"
                stroke="url(#progressGradient)"
                strokeWidth="12"
                fill="none"
                strokeDasharray={`${2 * Math.PI * 88}`}
                strokeDashoffset={`${2 * Math.PI * 88 * (1 - percentage / 100)}`}
                strokeLinecap="round"
                className="transition-all duration-1000 ease-out"
                style={{
                  filter: isComplete ? 'drop-shadow(0 0 8px rgba(249, 160, 63, 0.6))' : 'none',
                }}
              />
              
              {/* Starburst effect when complete */}
              {isComplete && (
                <g className="animate-pulse">
                  {[...Array(8)].map((_, i) => (
                    <line
                      key={i}
                      x1="96"
                      y1="96"
                      x2={96 + Math.cos((i * Math.PI) / 4) * 100}
                      y2={96 + Math.sin((i * Math.PI) / 4) * 100}
                      stroke="#F9A03F"
                      strokeWidth="2"
                      opacity="0.3"
                    />
                  ))}
                </g>
              )}
            </svg>

            {/* Center content */}
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#F9A03F] to-[#e89135] flex items-center justify-center mb-2 animate-pulse">
                <Sparkles className="w-6 h-6 text-white" />
              </div>
              <div className="text-center">
                <p className="text-3xl text-gray-900 mb-1">{currentPoints}</p>
                <p className="text-sm text-gray-600">of {maxPoints} points</p>
              </div>
            </div>

            {/* Milestone stars around the circle */}
            {milestones.map((milestone, idx) => {
              const angle = (idx * 90 - 90) * (Math.PI / 180); // Position at 0°, 90°, 180°, 270°
              const x = 96 + Math.cos(angle) * 100;
              const y = 96 + Math.sin(angle) * 100;
              
              return (
                <div
                  key={milestone.points}
                  className="absolute"
                  style={{
                    left: `${x}px`,
                    top: `${y}px`,
                    transform: 'translate(-50%, -50%)',
                  }}
                  title={`${milestone.points} pts - ${milestone.label}`}
                >
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 ${
                      milestone.achieved
                        ? 'bg-gradient-to-br from-[#F9A03F] to-[#e89135] shadow-lg scale-110'
                        : 'bg-gray-200'
                    }`}
                  >
                    <Trophy className={`w-4 h-4 ${milestone.achieved ? 'text-white' : 'text-gray-400'}`} />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Current Milestone */}
        <div className="text-center mb-6">
          {isComplete ? (
            <div className="space-y-2">
              <Badge variant="outline" className="bg-[#F9A03F]/20 text-[#F9A03F] border-[#F9A03F]">
                🏆 Community Champion Unlocked!
              </Badge>
              <p className="text-sm text-gray-600">
                You've reached the highest level! Keep sharing to inspire others.
              </p>
            </div>
          ) : (
            <div className="space-y-2">
              <p className="text-sm text-gray-700">
                {maxPoints - currentPoints} points until <strong>{milestones.find(m => !m.achieved)?.label || 'Champion'}</strong>
              </p>
              <Progress value={percentage} className="h-2" />
            </div>
          )}
        </div>

        {/* How to Earn Points */}
        <div className="p-4 bg-gradient-to-br from-[#F9A03F]/10 to-[#2C6975]/10 rounded-lg border border-[#F9A03F]/20 mb-4">
          <h4 className="text-sm text-gray-900 mb-3">Earn Engagement Credits:</h4>
          <div className="grid grid-cols-2 gap-3 text-sm">
            <div className="flex items-center space-x-2">
              <Share2 className="w-4 h-4 text-[#F9A03F] flex-shrink-0" />
              <span className="text-gray-700">Share on LinkedIn: <strong>+10</strong></span>
            </div>
            <div className="flex items-center space-x-2">
              <TrendingUp className="w-4 h-4 text-[#F9A03F] flex-shrink-0" />
              <span className="text-gray-700">Get 5+ reactions: <strong>+5</strong></span>
            </div>
            <div className="flex items-center space-x-2">
              <MessageSquare className="w-4 h-4 text-[#F9A03F] flex-shrink-0" />
              <span className="text-gray-700">Comment on posts: <strong>+3</strong></span>
            </div>
            <div className="flex items-center space-x-2">
              <Sparkles className="w-4 h-4 text-[#F9A03F] flex-shrink-0" />
              <span className="text-gray-700">Weekly reflection: <strong>+2</strong></span>
            </div>
          </div>
        </div>

        {/* Recent Activity */}
        <div>
          <h4 className="text-sm text-gray-900 mb-3">Recent Activity:</h4>
          <div className="space-y-2">
            {recentActivities.slice(0, 3).map((activity, idx) => (
              <div
                key={idx}
                className="flex items-center justify-between p-2 bg-gray-50 rounded-lg"
              >
                <div className="flex items-center space-x-3">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    activity.type === 'share' ? 'bg-[#0A66C2]/10 text-[#0A66C2]' :
                    activity.type === 'reaction' ? 'bg-green-100 text-green-600' :
                    activity.type === 'comment' ? 'bg-blue-100 text-blue-600' :
                    'bg-[#F9A03F]/10 text-[#F9A03F]'
                  }`}>
                    {getActivityIcon(activity.type)}
                  </div>
                  <div>
                    <p className="text-sm text-gray-900">{activity.description}</p>
                    <p className="text-xs text-gray-500">{activity.timestamp}</p>
                  </div>
                </div>
                <Badge variant="outline" className="bg-[#F9A03F]/10 text-[#F9A03F] border-[#F9A03F]/30">
                  +{activity.points}
                </Badge>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Leaderboard Modal */}
      <Dialog open={isLeaderboardOpen} onOpenChange={setIsLeaderboardOpen}>
        <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center space-x-2">
              <Trophy className="w-6 h-6 text-[#F9A03F]" />
              <span>Top Trailblazers of the Week</span>
            </DialogTitle>
            <DialogDescription>
              Community members making the biggest impact through sharing and engagement
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-3">
            {leaderboard.map((person) => (
              <div
                key={person.rank}
                className={`p-4 rounded-lg border-2 transition-all duration-150 ${
                  person.isCurrentUser
                    ? 'border-[#F9A03F] bg-[#F9A03F]/5 shadow-md'
                    : 'border-gray-200 hover:border-[#2C6975] hover:shadow-sm'
                }`}
              >
                <div className="flex items-center space-x-4">
                  {/* Rank */}
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center text-lg ${
                    person.rank === 1 ? 'bg-yellow-100 text-yellow-700' :
                    person.rank === 2 ? 'bg-gray-100 text-gray-700' :
                    person.rank === 3 ? 'bg-orange-100 text-orange-700' :
                    'bg-gray-50 text-gray-600'
                  }`}>
                    {person.rank === 1 && '🥇'}
                    {person.rank === 2 && '🥈'}
                    {person.rank === 3 && '🥉'}
                    {person.rank > 3 && person.rank}
                  </div>

                  {/* Avatar */}
                  <Avatar className="w-12 h-12">
                    <AvatarFallback className={`bg-gradient-to-br ${person.avatar} text-white`}>
                      {person.initials}
                    </AvatarFallback>
                  </Avatar>

                  {/* Info */}
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-1">
                      <h4 className="text-gray-900">{person.name}</h4>
                      {person.isCurrentUser && (
                        <Badge variant="outline" className="bg-[#F9A03F]/20 text-[#F9A03F] border-[#F9A03F] text-xs">
                          You
                        </Badge>
                      )}
                    </div>
                    <p className="text-sm text-gray-600">{person.badges} badges earned</p>
                  </div>

                  {/* Points */}
                  <div className="text-right">
                    <p className="text-2xl text-gray-900">{person.points}</p>
                    <p className="text-xs text-gray-600">points</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 p-4 bg-gradient-to-br from-[#2C6975]/10 to-[#7EB5C1]/10 rounded-lg border border-[#2C6975]/20">
            <div className="flex items-start space-x-3">
              <Users className="w-5 h-5 text-[#2C6975] flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-sm text-gray-900 mb-1">
                  <strong>Keep Climbing!</strong>
                </p>
                <p className="text-xs text-gray-700">
                  Share your achievements, engage with the community, and watch your impact grow. 
                  Every share lights another trail. 🌟
                </p>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Badge Unlock Animation */}
      {showBadgeAnimation && (
        <div className="fixed inset-0 bg-black/50 z-[100] flex items-center justify-center animate-in fade-in duration-300">
          <div className="bg-white rounded-xl shadow-2xl p-8 max-w-md text-center animate-in zoom-in duration-500">
            <div className="w-24 h-24 bg-gradient-to-br from-[#F9A03F] to-[#e89135] rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse">
              <Trophy className="w-12 h-12 text-white" />
            </div>
            <h3 className="text-2xl text-gray-900 mb-2">Badge Unlocked! 🎉</h3>
            <p className="text-gray-600 mb-4">You've earned the Community Contributor badge!</p>
            <Badge variant="outline" className="bg-[#F9A03F]/20 text-[#F9A03F] border-[#F9A03F] text-lg px-4 py-2">
              Community Contributor
            </Badge>
          </div>
        </div>
      )}
    </>
  );
}
