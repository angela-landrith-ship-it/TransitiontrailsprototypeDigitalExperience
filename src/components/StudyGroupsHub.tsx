import { useState } from 'react';
import { Users, Plus, Search, Filter, TrendingUp, Calendar, BookOpen, Award, Star, ChevronRight, Lock, Globe, Clock, CheckCircle, MessageSquare, AlertCircle } from 'lucide-react';
import { PageType } from '../App';
import { SectionHeader } from './SectionHeader';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Avatar, AvatarFallback } from './ui/avatar';
import { Progress } from './ui/progress';
import { StudyGroupDetail } from './StudyGroupDetail';
import { CreateStudyGroupModal } from './CreateStudyGroupModal';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';

interface StudyGroupsHubProps {
  onNavigate: (page: PageType) => void;
}

// Mock study groups data
const mockGroups = [
  {
    id: 'group-1',
    name: 'Admin Trail Masters',
    description: 'Deep dive into Salesforce Admin concepts, best practices, and certification prep. Weekly study sessions and shared resources.',
    trail: 'Admin Trail',
    topic: 'Certification Prep',
    memberCount: 6,
    maxMembers: 8,
    isPrivate: false,
    createdDate: '2 weeks ago',
    lastActive: '2 hours ago',
    creator: {
      name: 'Sarah Chen',
      avatar: 'SC',
    },
    members: [
      { name: 'Sarah Chen', avatar: 'SC', role: 'creator' },
      { name: 'Marcus Williams', avatar: 'MW', role: 'moderator' },
      { name: 'Jennifer Park', avatar: 'JP', role: 'member' },
      { name: 'David Rodriguez', avatar: 'DR', role: 'member' },
      { name: 'You', avatar: 'ME', role: 'member' },
      { name: 'Alex Johnson', avatar: 'AJ', role: 'member' },
    ],
    stats: {
      resources: 24,
      challenges: 3,
      completedChallenges: 2,
      studySessions: 8,
      avgProgress: 72,
    },
    nextSession: {
      title: 'Flow Builder Deep Dive',
      date: 'Tomorrow, 6:00 PM',
      attendees: 4,
    },
    isMember: true,
    activityLevel: 'high' as const,
  },
  {
    id: 'group-2',
    name: 'Developer Study Squad',
    description: 'Collaborative learning for Salesforce developers. Focus on Apex, LWC, and integration patterns.',
    trail: 'Developer Trail',
    topic: 'Development',
    memberCount: 5,
    maxMembers: 8,
    isPrivate: false,
    createdDate: '1 week ago',
    lastActive: '1 day ago',
    creator: {
      name: 'Taylor Martinez',
      avatar: 'TM',
    },
    members: [
      { name: 'Taylor Martinez', avatar: 'TM', role: 'creator' },
      { name: 'Chris Anderson', avatar: 'CA', role: 'member' },
      { name: 'Jamie Smith', avatar: 'JS', role: 'member' },
      { name: 'Pat Brown', avatar: 'PB', role: 'member' },
      { name: 'Morgan Lee', avatar: 'ML', role: 'member' },
    ],
    stats: {
      resources: 18,
      challenges: 2,
      completedChallenges: 1,
      studySessions: 5,
      avgProgress: 58,
    },
    nextSession: {
      title: 'Apex Testing Best Practices',
      date: 'Friday, 7:00 PM',
      attendees: 3,
    },
    isMember: false,
    activityLevel: 'medium' as const,
  },
  {
    id: 'group-3',
    name: 'Capstone Builders',
    description: 'Group focused on building amazing capstone projects. Share progress, get feedback, and support each other.',
    trail: 'All Trails',
    topic: 'Capstone Projects',
    memberCount: 7,
    maxMembers: 8,
    isPrivate: false,
    createdDate: '3 weeks ago',
    lastActive: '5 hours ago',
    creator: {
      name: 'Jordan Davis',
      avatar: 'JD',
    },
    members: [
      { name: 'Jordan Davis', avatar: 'JD', role: 'creator' },
      { name: 'Riley Thompson', avatar: 'RT', role: 'moderator' },
      { name: 'Casey White', avatar: 'CW', role: 'member' },
      { name: 'Sam Green', avatar: 'SG', role: 'member' },
      { name: 'Jordan Kim', avatar: 'JK', role: 'member' },
      { name: 'Taylor Wilson', avatar: 'TW', role: 'member' },
      { name: 'Alex Moore', avatar: 'AM', role: 'member' },
    ],
    stats: {
      resources: 32,
      challenges: 4,
      completedChallenges: 3,
      studySessions: 12,
      avgProgress: 85,
    },
    nextSession: {
      title: 'Project Demos & Feedback',
      date: 'Saturday, 2:00 PM',
      attendees: 6,
    },
    isMember: false,
    activityLevel: 'high' as const,
  },
  {
    id: 'group-4',
    name: 'Early Birds Study Club',
    description: 'Morning study sessions for early risers. Focus on consistent daily learning and accountability.',
    trail: 'All Trails',
    topic: 'Daily Learning',
    memberCount: 4,
    maxMembers: 6,
    isPrivate: false,
    createdDate: '1 week ago',
    lastActive: '3 days ago',
    creator: {
      name: 'Morgan Taylor',
      avatar: 'MT',
    },
    members: [
      { name: 'Morgan Taylor', avatar: 'MT', role: 'creator' },
      { name: 'Quinn Adams', avatar: 'QA', role: 'member' },
      { name: 'River Jones', avatar: 'RJ', role: 'member' },
      { name: 'Skylar Chen', avatar: 'SC2', role: 'member' },
    ],
    stats: {
      resources: 12,
      challenges: 1,
      completedChallenges: 1,
      studySessions: 15,
      avgProgress: 45,
    },
    nextSession: {
      title: 'Morning Study Session',
      date: 'Tomorrow, 7:00 AM',
      attendees: 4,
    },
    isMember: false,
    activityLevel: 'high' as const,
  },
  {
    id: 'group-5',
    name: 'Einstein Analytics Enthusiasts',
    description: 'Advanced group exploring Einstein Analytics, AI, and data visualization in Salesforce.',
    trail: 'Developer Trail',
    topic: 'Advanced Topics',
    memberCount: 3,
    maxMembers: 8,
    isPrivate: false,
    createdDate: '4 days ago',
    lastActive: '1 week ago',
    creator: {
      name: 'Dakota Lee',
      avatar: 'DL',
    },
    members: [
      { name: 'Dakota Lee', avatar: 'DL', role: 'creator' },
      { name: 'Avery Clark', avatar: 'AC', role: 'member' },
      { name: 'Blake Martinez', avatar: 'BM', role: 'member' },
    ],
    stats: {
      resources: 8,
      challenges: 1,
      completedChallenges: 0,
      studySessions: 2,
      avgProgress: 25,
    },
    nextSession: null,
    isMember: false,
    activityLevel: 'low' as const,
  },
];

export function StudyGroupsHub({ onNavigate }: StudyGroupsHubProps) {
  const [selectedTab, setSelectedTab] = useState('browse');
  const [selectedGroup, setSelectedGroup] = useState<string | null>(null);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterTrail, setFilterTrail] = useState('all');
  const [filterActivity, setFilterActivity] = useState('all');

  // User stats
  const userStats = {
    groupsJoined: 1,
    resourcesShared: 12,
    sessionsAttended: 6,
    points: 185,
    challengesCompleted: 2,
  };

  const myGroups = mockGroups.filter((g) => g.isMember);
  const availableGroups = mockGroups.filter((g) => !g.isMember);

  // Filter groups
  const filteredGroups = availableGroups.filter((group) => {
    const matchesSearch = group.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      group.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesTrail = filterTrail === 'all' || group.trail === filterTrail;
    const matchesActivity = filterActivity === 'all' || group.activityLevel === filterActivity;
    return matchesSearch && matchesTrail && matchesActivity;
  });

  if (selectedGroup) {
    const group = mockGroups.find((g) => g.id === selectedGroup);
    return (
      <StudyGroupDetail
        group={group!}
        onBack={() => setSelectedGroup(null)}
        onNavigate={onNavigate}
      />
    );
  }

  return (
    <div className="min-h-screen bg-[#F5F3E8] pb-20">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <SectionHeader
            icon={Users}
            title="Study Groups"
            subtitle="Join collaborative learning communities and grow together"
            color="#7EB5C1"
          />

          {/* Stats Cards */}
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-4 mt-6">
            <div className="bg-gradient-to-br from-[#7EB5C1] to-[#6a9aa5] text-white rounded-lg p-4">
              <div className="flex items-center gap-2 mb-1">
                <Users className="w-4 h-4" />
                <span className="text-sm opacity-90">Groups</span>
              </div>
              <div className="text-2xl">{userStats.groupsJoined}</div>
            </div>

            <div className="bg-gradient-to-br from-[#F9A03F] to-[#f89520] text-white rounded-lg p-4">
              <div className="flex items-center gap-2 mb-1">
                <BookOpen className="w-4 h-4" />
                <span className="text-sm opacity-90">Resources</span>
              </div>
              <div className="text-2xl">{userStats.resourcesShared}</div>
            </div>

            <div className="bg-gradient-to-br from-[#3B6A52] to-[#2d5440] text-white rounded-lg p-4">
              <div className="flex items-center gap-2 mb-1">
                <Calendar className="w-4 h-4" />
                <span className="text-sm opacity-90">Sessions</span>
              </div>
              <div className="text-2xl">{userStats.sessionsAttended}</div>
            </div>

            <div className="bg-gradient-to-br from-[#2C6975] to-[#235158] text-white rounded-lg p-4">
              <div className="flex items-center gap-2 mb-1">
                <Award className="w-4 h-4" />
                <span className="text-sm opacity-90">Points</span>
              </div>
              <div className="text-2xl">{userStats.points}</div>
            </div>

            <div className="bg-gradient-to-br from-[#666] to-[#444] text-white rounded-lg p-4">
              <div className="flex items-center gap-2 mb-1">
                <CheckCircle className="w-4 h-4" />
                <span className="text-sm opacity-90">Challenges</span>
              </div>
              <div className="text-2xl">{userStats.challengesCompleted}</div>
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
              <h3 className="text-blue-900 mb-2">How Study Groups Work</h3>
              <ol className="list-decimal list-inside space-y-1 text-sm text-blue-800">
                <li>Browse groups by trail, topic, or create your own</li>
                <li>Join a group (max 8 members per group)</li>
                <li>Share resources, ask questions, tackle challenges together</li>
                <li>Attend scheduled study sessions</li>
                <li>Earn 25 points for joining, 10 per resource, 50 per challenge</li>
                <li>Track individual and group progress!</li>
              </ol>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <Tabs value={selectedTab} onValueChange={setSelectedTab} className="space-y-6">
          <div className="flex items-center justify-between">
            <TabsList className="grid w-full max-w-md grid-cols-2">
              <TabsTrigger value="browse">
                Browse Groups ({filteredGroups.length})
              </TabsTrigger>
              <TabsTrigger value="my-groups">
                My Groups ({myGroups.length})
              </TabsTrigger>
            </TabsList>

            <Button
              onClick={() => setShowCreateModal(true)}
              className="bg-[#7EB5C1] hover:bg-[#6a9aa5] text-white"
            >
              <Plus className="w-4 h-4 mr-2" />
              Create Group
            </Button>
          </div>

          {/* Browse Tab */}
          <TabsContent value="browse" className="space-y-4">
            {/* Search & Filters */}
            <div className="bg-white rounded-xl border border-gray-200 p-4">
              <div className="grid md:grid-cols-3 gap-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <Input
                    placeholder="Search groups..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>

                <Select value={filterTrail} onValueChange={setFilterTrail}>
                  <SelectTrigger>
                    <SelectValue placeholder="All Trails" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Trails</SelectItem>
                    <SelectItem value="Admin Trail">Admin Trail</SelectItem>
                    <SelectItem value="Developer Trail">Developer Trail</SelectItem>
                    <SelectItem value="All Trails">All Trails</SelectItem>
                  </SelectContent>
                </Select>

                <Select value={filterActivity} onValueChange={setFilterActivity}>
                  <SelectTrigger>
                    <SelectValue placeholder="All Activity Levels" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Activity Levels</SelectItem>
                    <SelectItem value="high">High Activity</SelectItem>
                    <SelectItem value="medium">Medium Activity</SelectItem>
                    <SelectItem value="low">Low Activity</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Groups Grid */}
            {filteredGroups.length > 0 ? (
              <div className="grid md:grid-cols-2 gap-4">
                {filteredGroups.map((group) => (
                  <StudyGroupCard
                    key={group.id}
                    group={group}
                    onClick={() => setSelectedGroup(group.id)}
                  />
                ))}
              </div>
            ) : (
              <div className="bg-white rounded-xl border border-gray-200 p-12 text-center">
                <Users className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                <h3 className="text-gray-900 mb-2">No groups found</h3>
                <p className="text-gray-600 mb-4">
                  Try adjusting your filters or create a new group!
                </p>
                <Button
                  onClick={() => setShowCreateModal(true)}
                  variant="outline"
                  className="border-[#7EB5C1] text-[#7EB5C1] hover:bg-[#7EB5C1] hover:text-white"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Create Group
                </Button>
              </div>
            )}
          </TabsContent>

          {/* My Groups Tab */}
          <TabsContent value="my-groups" className="space-y-4">
            {myGroups.length > 0 ? (
              <div className="grid md:grid-cols-2 gap-4">
                {myGroups.map((group) => (
                  <StudyGroupCard
                    key={group.id}
                    group={group}
                    onClick={() => setSelectedGroup(group.id)}
                    showProgress
                  />
                ))}
              </div>
            ) : (
              <div className="bg-white rounded-xl border border-gray-200 p-12 text-center">
                <Users className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                <h3 className="text-gray-900 mb-2">You haven't joined any groups yet</h3>
                <p className="text-gray-600 mb-4">
                  Browse available groups or create your own to start collaborating!
                </p>
                <div className="flex items-center justify-center gap-3">
                  <Button
                    onClick={() => setSelectedTab('browse')}
                    variant="outline"
                  >
                    Browse Groups
                  </Button>
                  <Button
                    onClick={() => setShowCreateModal(true)}
                    className="bg-[#7EB5C1] hover:bg-[#6a9aa5] text-white"
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    Create Group
                  </Button>
                </div>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>

      {/* Create Group Modal */}
      {showCreateModal && (
        <CreateStudyGroupModal
          onClose={() => setShowCreateModal(false)}
          onCreate={(groupData) => {
            console.log('Creating group:', groupData);
            setShowCreateModal(false);
            // In real app, would create group and navigate to it
          }}
        />
      )}
    </div>
  );
}

interface StudyGroupCardProps {
  group: typeof mockGroups[0];
  onClick: () => void;
  showProgress?: boolean;
}

function StudyGroupCard({ group, onClick, showProgress }: StudyGroupCardProps) {
  const isFull = group.memberCount >= group.maxMembers;

  return (
    <div
      onClick={onClick}
      className="bg-white rounded-xl border border-gray-200 p-6 hover:border-[#7EB5C1] hover:shadow-sm transition-all cursor-pointer"
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-3">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <h3 className="text-gray-900">{group.name}</h3>
            {group.isPrivate && <Lock className="w-4 h-4 text-gray-400" />}
            {!group.isPrivate && <Globe className="w-4 h-4 text-gray-400" />}
          </div>
          <p className="text-sm text-gray-700 mb-3 line-clamp-2">{group.description}</p>
        </div>
      </div>

      {/* Tags */}
      <div className="flex flex-wrap gap-2 mb-4">
        <Badge variant="outline" className="text-xs">
          {group.trail}
        </Badge>
        <Badge variant="outline" className="text-xs">
          {group.topic}
        </Badge>
        <Badge
          variant="outline"
          className={`text-xs ${
            group.activityLevel === 'high'
              ? 'bg-green-50 text-green-700 border-green-200'
              : group.activityLevel === 'medium'
              ? 'bg-yellow-50 text-yellow-700 border-yellow-200'
              : 'bg-gray-50 text-gray-700 border-gray-200'
          }`}
        >
          {group.activityLevel.charAt(0).toUpperCase() + group.activityLevel.slice(1)} Activity
        </Badge>
      </div>

      {/* Members */}
      <div className="flex items-center gap-2 mb-4">
        <div className="flex -space-x-2">
          {group.members.slice(0, 4).map((member, idx) => (
            <Avatar key={idx} className="w-8 h-8 border-2 border-white">
              <AvatarFallback
                className={
                  member.name === 'You'
                    ? 'bg-[#7EB5C1] text-white text-xs'
                    : 'bg-gray-200 text-gray-700 text-xs'
                }
              >
                {member.avatar}
              </AvatarFallback>
            </Avatar>
          ))}
          {group.memberCount > 4 && (
            <div className="w-8 h-8 rounded-full bg-gray-100 border-2 border-white flex items-center justify-center text-xs text-gray-600">
              +{group.memberCount - 4}
            </div>
          )}
        </div>
        <span className="text-sm text-gray-600">
          {group.memberCount}/{group.maxMembers} members
        </span>
        {isFull && (
          <Badge className="bg-red-100 text-red-700 border-0 ml-auto">Full</Badge>
        )}
      </div>

      {/* Stats */}
      <div className="grid grid-cols-4 gap-3 mb-4 pb-4 border-b border-gray-200">
        <div className="text-center">
          <div className="text-lg text-gray-900">{group.stats.resources}</div>
          <div className="text-xs text-gray-600">Resources</div>
        </div>
        <div className="text-center">
          <div className="text-lg text-gray-900">
            {group.stats.completedChallenges}/{group.stats.challenges}
          </div>
          <div className="text-xs text-gray-600">Challenges</div>
        </div>
        <div className="text-center">
          <div className="text-lg text-gray-900">{group.stats.studySessions}</div>
          <div className="text-xs text-gray-600">Sessions</div>
        </div>
        <div className="text-center">
          <div className="text-lg text-gray-900">{group.stats.avgProgress}%</div>
          <div className="text-xs text-gray-600">Progress</div>
        </div>
      </div>

      {/* Next Session or Progress */}
      {showProgress && group.stats.avgProgress > 0 ? (
        <div>
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-gray-600">Group Progress</span>
            <span className="text-sm text-gray-900">{group.stats.avgProgress}%</span>
          </div>
          <Progress value={group.stats.avgProgress} className="h-2" />
        </div>
      ) : group.nextSession ? (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
          <div className="flex items-start gap-2">
            <Calendar className="w-4 h-4 text-blue-600 flex-shrink-0 mt-0.5" />
            <div className="flex-1 min-w-0">
              <div className="text-sm text-blue-900 truncate">{group.nextSession.title}</div>
              <div className="text-xs text-blue-700">{group.nextSession.date}</div>
            </div>
            <Badge className="bg-blue-100 text-blue-700 border-0 text-xs">
              {group.nextSession.attendees} going
            </Badge>
          </div>
        </div>
      ) : (
        <div className="text-sm text-gray-500 text-center py-2">
          No upcoming sessions scheduled
        </div>
      )}

      {/* Footer */}
      <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-200">
        <div className="text-xs text-gray-500">
          Active {group.lastActive}
        </div>
        <Button
          size="sm"
          variant="ghost"
          className="text-[#7EB5C1] hover:text-[#6a9aa5] hover:bg-[#7EB5C1]/10"
        >
          View Details
          <ChevronRight className="w-4 h-4 ml-1" />
        </Button>
      </div>
    </div>
  );
}
