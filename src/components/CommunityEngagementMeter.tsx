import { useState } from 'react';
import { 
  Sparkles, 
  TrendingUp, 
  Share2, 
  MessageSquare, 
  Award, 
  ChevronRight, 
  Trophy, 
  Users, 
  Heart,
  GraduationCap,
  Flame,
  Megaphone,
  UserPlus,
  Handshake,
  Globe
} from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from './ui/dialog';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { Avatar, AvatarFallback } from './ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';

interface EngagementActivity {
  type: 'share' | 'volunteer' | 'coach' | 'campfire' | 'trail-talk' | 'reaction' | 'comment' | 'reflection' | 'community-service';
  description: string;
  points: number;
  timestamp: string;
  category: 'sharing' | 'volunteering' | 'coaching' | 'community';
}

interface CommunityEngagementMeterProps {
  currentPoints?: number;
  showLeaderboard?: boolean;
}

export function CommunityEngagementMeter({ currentPoints = 147, showLeaderboard = false }: CommunityEngagementMeterProps) {
  const [isEngagementModalOpen, setIsEngagementModalOpen] = useState(false);
  const [showBadgeAnimation, setShowBadgeAnimation] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');

  const maxPoints = 250;
  const percentage = Math.min((currentPoints / maxPoints) * 100, 100);
  const isComplete = currentPoints >= maxPoints;

  // Expanded milestone positions
  const milestones = [
    { points: 50, label: 'Engager', achieved: currentPoints >= 50, icon: Sparkles },
    { points: 100, label: 'Contributor', achieved: currentPoints >= 100, icon: Heart },
    { points: 150, label: 'Advocate', achieved: currentPoints >= 150, icon: Users },
    { points: 200, label: 'Champion', achieved: currentPoints >= 200, icon: Trophy },
    { points: 250, label: 'Legend', achieved: currentPoints >= 250, icon: Award },
  ];

  // Recent activities across all engagement types
  const recentActivities: EngagementActivity[] = [
    { type: 'share', description: 'Shared capstone project on LinkedIn', points: 15, timestamp: '2 hours ago', category: 'sharing' },
    { type: 'volunteer', description: 'Volunteered at local tech meetup', points: 25, timestamp: '1 day ago', category: 'volunteering' },
    { type: 'coach', description: 'Mentored new learner in cohort', points: 30, timestamp: '2 days ago', category: 'coaching' },
    { type: 'campfire', description: 'Hosted Friday Campfire Session', points: 20, timestamp: '3 days ago', category: 'community' },
    { type: 'trail-talk', description: 'Presented at Public Trail Talk', points: 35, timestamp: '5 days ago', category: 'community' },
    { type: 'community-service', description: 'Built website for local nonprofit', points: 40, timestamp: '1 week ago', category: 'volunteering' },
  ];

  // Engagement opportunities
  const engagementOpportunities = {
    sharing: [
      { action: 'Share Trail Mission completion', points: 15, icon: Share2 },
      { action: 'Share capstone milestone', points: 20, icon: Share2 },
      { action: 'Write LinkedIn article about journey', points: 30, icon: Share2 },
      { action: 'Share Skills IQ results', points: 10, icon: Share2 },
      { action: 'Post weekly reflection', points: 5, icon: MessageSquare },
    ],
    volunteering: [
      { action: 'Volunteer at tech community event', points: 25, icon: Handshake },
      { action: 'Help local nonprofit with tech', points: 40, icon: Heart },
      { action: 'Participate in hackathon for good', points: 35, icon: Users },
      { action: 'Teach coding to underserved youth', points: 50, icon: GraduationCap },
      { action: 'Contribute to open source project', points: 30, icon: Globe },
    ],
    coaching: [
      { action: 'Become a Transition Trails Coach', points: 100, icon: GraduationCap },
      { action: 'Mentor new cohort member (1:1)', points: 30, icon: UserPlus },
      { action: 'Lead study group session', points: 20, icon: Users },
      { action: 'Answer questions in Slack', points: 5, icon: MessageSquare },
      { action: 'Review peer capstone projects', points: 15, icon: Award },
    ],
    community: [
      { action: 'Host Friday Campfire Session', points: 20, icon: Flame },
      { action: 'Present at Public Trail Talk', points: 35, icon: Megaphone },
      { action: 'Organize cohort study session', points: 15, icon: Users },
      { action: 'Write blog post for TT community', points: 25, icon: MessageSquare },
      { action: 'Participate in alumni panel', points: 30, icon: Trophy },
    ],
  };

  // Leaderboard data with more diverse achievements
  const leaderboard = [
    { rank: 1, name: 'Taylor Martinez', initials: 'TM', points: 287, badges: 5, avatar: 'from-[#F9A03F] to-[#e89135]', role: 'Coach & Volunteer' },
    { rank: 2, name: 'Jordan Kim', initials: 'JK', points: 258, badges: 4, avatar: 'from-[#2C6975] to-[#1f4f5a]', role: 'Community Leader' },
    { rank: 3, name: 'Alex Johnson', initials: 'AJ', points: 223, badges: 4, avatar: 'from-[#7EB5C1] to-[#5a9fb0]', role: 'Social Advocate' },
    { rank: 4, name: 'You', initials: 'YO', points: 147, badges: 2, avatar: 'from-[#3B6A52] to-[#2d5240]', isCurrentUser: true, role: 'Rising Contributor' },
    { rank: 5, name: 'Morgan Lee', initials: 'ML', points: 136, badges: 2, avatar: 'from-[#F9A03F] to-[#e89135]', role: 'Tech Volunteer' },
  ];

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'share':
        return <Share2 className="w-4 h-4" />;
      case 'volunteer':
        return <Heart className="w-4 h-4" />;
      case 'coach':
        return <GraduationCap className="w-4 h-4" />;
      case 'campfire':
        return <Flame className="w-4 h-4" />;
      case 'trail-talk':
        return <Megaphone className="w-4 h-4" />;
      case 'community-service':
        return <Handshake className="w-4 h-4" />;
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

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'sharing':
        return 'bg-[#0A66C2]/10 text-[#0A66C2]';
      case 'volunteering':
        return 'bg-green-100 text-green-600';
      case 'coaching':
        return 'bg-[#F9A03F]/10 text-[#F9A03F]';
      case 'community':
        return 'bg-purple-100 text-purple-600';
      default:
        return 'bg-gray-100 text-gray-600';
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
            <h3 className="text-gray-900 mb-1">Community Engagement</h3>
            <p className="text-sm text-gray-600">
              Share, volunteer, coach, and give back to the community
            </p>
          </div>
        </div>

        {/* Circular Progress Gauge */}
        <div className="flex items-center justify-center mb-6">
          <div className="relative">
            {/* Outer ring with glow effect */}
            <svg className="w-40 h-40 transform -rotate-90">
              {/* Background circle */}
              <circle
                cx="80"
                cy="80"
                r="72"
                stroke="#e5e7eb"
                strokeWidth="10"
                fill="none"
              />
              
              {/* Progress circle with gradient */}
              <defs>
                <linearGradient id="engagementGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#2C6975" />
                  <stop offset="50%" stopColor="#F9A03F" />
                  <stop offset="100%" stopColor="#3B6A52" />
                </linearGradient>
              </defs>
              <circle
                cx="80"
                cy="80"
                r="72"
                stroke="url(#engagementGradient)"
                strokeWidth="10"
                fill="none"
                strokeDasharray={`${2 * Math.PI * 72}`}
                strokeDashoffset={`${2 * Math.PI * 72 * (1 - percentage / 100)}`}
                strokeLinecap="round"
                className="transition-all duration-1000 ease-out"
                style={{
                  filter: isComplete ? 'drop-shadow(0 0 8px rgba(249, 160, 63, 0.6))' : 'none',
                }}
              />
            </svg>

            {/* Center content */}
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#2C6975] via-[#F9A03F] to-[#3B6A52] flex items-center justify-center mb-1">
                <Users className="w-5 h-5 text-white" />
              </div>
              <div className="text-center">
                <p className="text-2xl text-gray-900">{currentPoints}</p>
                <p className="text-xs text-gray-600">credits</p>
              </div>
            </div>
          </div>
        </div>

        {/* Current Milestone */}
        <div className="text-center mb-4">
          {isComplete ? (
            <Badge variant="outline" className="bg-[#F9A03F]/20 text-[#F9A03F] border-[#F9A03F]">
              🌟 Community Legend!
            </Badge>
          ) : (
            <p className="text-sm text-gray-700">
              {maxPoints - currentPoints} credits until{' '}
              <strong className="text-[#2C6975]">
                {milestones.find(m => !m.achieved)?.label || 'Legend'}
              </strong>
            </p>
          )}
        </div>

        {/* Recent Activity Preview */}
        <div className="mb-4">
          <h4 className="text-sm text-gray-900 mb-3">Recent Contributions:</h4>
          <div className="space-y-2">
            {recentActivities.slice(0, 2).map((activity, idx) => (
              <div
                key={idx}
                className="flex items-center justify-between p-2 bg-gray-50 rounded-lg"
              >
                <div className="flex items-center space-x-3">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${getCategoryColor(activity.category)}`}>
                    {getActivityIcon(activity.type)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-gray-900 truncate">{activity.description}</p>
                    <p className="text-xs text-gray-500">{activity.timestamp}</p>
                  </div>
                </div>
                <Badge variant="outline" className="bg-[#F9A03F]/10 text-[#F9A03F] border-[#F9A03F]/30 flex-shrink-0">
                  +{activity.points}
                </Badge>
              </div>
            ))}
          </div>
        </div>

        {/* View Details Button */}
        <button
          onClick={() => setIsEngagementModalOpen(true)}
          className="w-full px-4 py-2 bg-gradient-to-r from-[#2C6975] to-[#3B6A52] text-white rounded-lg hover:opacity-90 transition-all text-sm flex items-center justify-center space-x-2"
        >
          <span>View Engagement Details</span>
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>

      {/* Engagement Modal */}
      <Dialog open={isEngagementModalOpen} onOpenChange={setIsEngagementModalOpen}>
        <DialogContent className="max-w-4xl max-h-[85vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center space-x-2">
              <Users className="w-6 h-6 text-[#2C6975]" />
              <span>Community Engagement Hub</span>
            </DialogTitle>
            <DialogDescription>
              Track your impact across sharing, volunteering, coaching, and community involvement
            </DialogDescription>
          </DialogHeader>

          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-5">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="sharing">Sharing</TabsTrigger>
              <TabsTrigger value="volunteering">Volunteering</TabsTrigger>
              <TabsTrigger value="coaching">Coaching</TabsTrigger>
              <TabsTrigger value="community">Community</TabsTrigger>
            </TabsList>

            {/* Overview Tab */}
            <TabsContent value="overview" className="space-y-4">
              {/* Progress Overview */}
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 bg-gradient-to-br from-[#0A66C2]/10 to-[#0A66C2]/5 rounded-lg border border-[#0A66C2]/20">
                  <div className="flex items-center space-x-3 mb-2">
                    <Share2 className="w-5 h-5 text-[#0A66C2]" />
                    <h4 className="text-gray-900">Social Sharing</h4>
                  </div>
                  <p className="text-2xl text-gray-900 mb-1">45</p>
                  <p className="text-sm text-gray-600">credits earned</p>
                </div>

                <div className="p-4 bg-gradient-to-br from-green-100 to-green-50 rounded-lg border border-green-200">
                  <div className="flex items-center space-x-3 mb-2">
                    <Heart className="w-5 h-5 text-green-600" />
                    <h4 className="text-gray-900">Volunteering</h4>
                  </div>
                  <p className="text-2xl text-gray-900 mb-1">65</p>
                  <p className="text-sm text-gray-600">credits earned</p>
                </div>

                <div className="p-4 bg-gradient-to-br from-[#F9A03F]/10 to-[#F9A03F]/5 rounded-lg border border-[#F9A03F]/20">
                  <div className="flex items-center space-x-3 mb-2">
                    <GraduationCap className="w-5 h-5 text-[#F9A03F]" />
                    <h4 className="text-gray-900">Coaching</h4>
                  </div>
                  <p className="text-2xl text-gray-900 mb-1">30</p>
                  <p className="text-sm text-gray-600">credits earned</p>
                </div>

                <div className="p-4 bg-gradient-to-br from-purple-100 to-purple-50 rounded-lg border border-purple-200">
                  <div className="flex items-center space-x-3 mb-2">
                    <Flame className="w-5 h-5 text-purple-600" />
                    <h4 className="text-gray-900">Community</h4>
                  </div>
                  <p className="text-2xl text-gray-900 mb-1">55</p>
                  <p className="text-sm text-gray-600">credits earned</p>
                </div>
              </div>

              {/* All Recent Activities */}
              <div>
                <h4 className="text-gray-900 mb-3">All Recent Activities:</h4>
                <div className="space-y-2 max-h-[300px] overflow-y-auto">
                  {recentActivities.map((activity, idx) => (
                    <div
                      key={idx}
                      className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                    >
                      <div className="flex items-center space-x-3 flex-1">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center ${getCategoryColor(activity.category)}`}>
                          {getActivityIcon(activity.type)}
                        </div>
                        <div className="flex-1 min-w-0">
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

              {/* Leaderboard */}
              <div className="pt-4 border-t border-gray-200">
                <h4 className="text-gray-900 mb-3 flex items-center space-x-2">
                  <Trophy className="w-5 h-5 text-[#F9A03F]" />
                  <span>Top Community Contributors</span>
                </h4>
                <div className="space-y-2">
                  {leaderboard.map((person) => (
                    <div
                      key={person.rank}
                      className={`p-3 rounded-lg border transition-all ${ 
                        person.isCurrentUser
                          ? 'border-[#F9A03F] bg-[#F9A03F]/5'
                          : 'border-gray-200 hover:border-[#2C6975]'
                      }`}
                    >
                      <div className="flex items-center space-x-3">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm ${
                          person.rank === 1 ? 'bg-yellow-100 text-yellow-700' :
                          person.rank === 2 ? 'bg-gray-100 text-gray-700' :
                          person.rank === 3 ? 'bg-orange-100 text-orange-700' :
                          'bg-gray-50 text-gray-600'
                        }`}>
                          {person.rank <= 3 ? ['🥇', '🥈', '🥉'][person.rank - 1] : person.rank}
                        </div>

                        <Avatar className="w-10 h-10">
                          <AvatarFallback className={`bg-gradient-to-br ${person.avatar} text-white text-sm`}>
                            {person.initials}
                          </AvatarFallback>
                        </Avatar>

                        <div className="flex-1">
                          <div className="flex items-center space-x-2">
                            <h5 className="text-sm text-gray-900">{person.name}</h5>
                            {person.isCurrentUser && (
                              <Badge variant="outline" className="bg-[#F9A03F]/20 text-[#F9A03F] border-[#F9A03F] text-xs">
                                You
                              </Badge>
                            )}
                          </div>
                          <p className="text-xs text-gray-600">{person.role}</p>
                        </div>

                        <div className="text-right">
                          <p className="text-lg text-gray-900">{person.points}</p>
                          <p className="text-xs text-gray-600">credits</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </TabsContent>

            {/* Sharing Tab */}
            <TabsContent value="sharing" className="space-y-4">
              <div className="p-4 bg-gradient-to-br from-[#0A66C2]/10 to-[#0A66C2]/5 rounded-lg border border-[#0A66C2]/20">
                <h4 className="text-gray-900 mb-2">Ways to Earn Sharing Credits:</h4>
                <div className="space-y-3">
                  {engagementOpportunities.sharing.map((opp, idx) => {
                    const Icon = opp.icon;
                    return (
                      <div key={idx} className="flex items-center justify-between p-3 bg-white rounded-lg">
                        <div className="flex items-center space-x-3">
                          <Icon className="w-5 h-5 text-[#0A66C2]" />
                          <span className="text-sm text-gray-900">{opp.action}</span>
                        </div>
                        <Badge className="bg-[#0A66C2] text-white">+{opp.points}</Badge>
                      </div>
                    );
                  })}
                </div>
              </div>
            </TabsContent>

            {/* Volunteering Tab */}
            <TabsContent value="volunteering" className="space-y-4">
              <div className="p-4 bg-gradient-to-br from-green-100 to-green-50 rounded-lg border border-green-200">
                <h4 className="text-gray-900 mb-2">Volunteering Opportunities:</h4>
                <div className="space-y-3">
                  {engagementOpportunities.volunteering.map((opp, idx) => {
                    const Icon = opp.icon;
                    return (
                      <div key={idx} className="flex items-center justify-between p-3 bg-white rounded-lg">
                        <div className="flex items-center space-x-3">
                          <Icon className="w-5 h-5 text-green-600" />
                          <span className="text-sm text-gray-900">{opp.action}</span>
                        </div>
                        <Badge className="bg-green-600 text-white">+{opp.points}</Badge>
                      </div>
                    );
                  })}
                </div>
              </div>
            </TabsContent>

            {/* Coaching Tab */}
            <TabsContent value="coaching" className="space-y-4">
              <div className="p-4 bg-gradient-to-br from-[#F9A03F]/10 to-[#F9A03F]/5 rounded-lg border border-[#F9A03F]/20">
                <h4 className="text-gray-900 mb-2">Coaching & Mentorship:</h4>
                <div className="space-y-3">
                  {engagementOpportunities.coaching.map((opp, idx) => {
                    const Icon = opp.icon;
                    return (
                      <div key={idx} className="flex items-center justify-between p-3 bg-white rounded-lg">
                        <div className="flex items-center space-x-3">
                          <Icon className="w-5 h-5 text-[#F9A03F]" />
                          <span className="text-sm text-gray-900">{opp.action}</span>
                        </div>
                        <Badge className="bg-[#F9A03F] text-white">+{opp.points}</Badge>
                      </div>
                    );
                  })}
                </div>
              </div>
            </TabsContent>

            {/* Community Tab */}
            <TabsContent value="community" className="space-y-4">
              <div className="p-4 bg-gradient-to-br from-purple-100 to-purple-50 rounded-lg border border-purple-200">
                <h4 className="text-gray-900 mb-2">Community Leadership:</h4>
                <div className="space-y-3">
                  {engagementOpportunities.community.map((opp, idx) => {
                    const Icon = opp.icon;
                    return (
                      <div key={idx} className="flex items-center justify-between p-3 bg-white rounded-lg">
                        <div className="flex items-center space-x-3">
                          <Icon className="w-5 h-5 text-purple-600" />
                          <span className="text-sm text-gray-900">{opp.action}</span>
                        </div>
                        <Badge className="bg-purple-600 text-white">+{opp.points}</Badge>
                      </div>
                    );
                  })}
                </div>
              </div>
            </TabsContent>
          </Tabs>

          <div className="mt-4 p-4 bg-gradient-to-br from-[#2C6975]/10 to-[#7EB5C1]/10 rounded-lg border border-[#2C6975]/20">
            <div className="flex items-start space-x-3">
              <Users className="w-5 h-5 text-[#2C6975] flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-sm text-gray-900 mb-1">
                  <strong>Pay It Forward</strong>
                </p>
                <p className="text-xs text-gray-700">
                  Your journey doesn't end after the Guided Trail. Share your knowledge, volunteer your time, 
                  coach future learners, and help build a stronger community. Every contribution creates new opportunities for others. 🌟
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
            <div className="w-24 h-24 bg-gradient-to-br from-[#2C6975] via-[#F9A03F] to-[#3B6A52] rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse">
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
