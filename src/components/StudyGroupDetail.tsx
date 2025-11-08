import { useState } from 'react';
import { ArrowLeft, Users, Calendar, BookOpen, Trophy, MessageSquare, Link as LinkIcon, FileText, ExternalLink, Plus, Share2, Settings, LogOut, UserPlus, CheckCircle, Clock, TrendingUp, Award, Download } from 'lucide-react';
import { PageType } from '../App';
import { SectionHeader } from './SectionHeader';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Avatar, AvatarFallback } from './ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Progress } from './ui/progress';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';

interface StudyGroupDetailProps {
  group: {
    id: string;
    name: string;
    description: string;
    trail: string;
    topic: string;
    memberCount: number;
    maxMembers: number;
    isPrivate: boolean;
    createdDate: string;
    lastActive: string;
    creator: {
      name: string;
      avatar: string;
    };
    members: Array<{
      name: string;
      avatar: string;
      role: 'creator' | 'moderator' | 'member';
    }>;
    stats: {
      resources: number;
      challenges: number;
      completedChallenges: number;
      studySessions: number;
      avgProgress: number;
    };
    nextSession: {
      title: string;
      date: string;
      attendees: number;
    } | null;
    isMember: boolean;
    activityLevel: 'high' | 'medium' | 'low';
  };
  onBack: () => void;
  onNavigate: (page: PageType) => void;
}

// Mock resources
const mockResources = [
  {
    id: 'res-1',
    title: 'Salesforce Admin Study Guide',
    type: 'link',
    url: 'https://trailhead.salesforce.com/...',
    sharedBy: { name: 'Sarah Chen', avatar: 'SC' },
    sharedDate: '2 days ago',
    likes: 5,
  },
  {
    id: 'res-2',
    title: 'Flow Builder Cheat Sheet',
    type: 'file',
    url: '#',
    sharedBy: { name: 'Marcus Williams', avatar: 'MW' },
    sharedDate: '4 days ago',
    likes: 8,
  },
  {
    id: 'res-3',
    title: 'Practice Questions - Security & Access',
    type: 'note',
    content: 'Collection of practice questions covering profiles, roles, sharing rules...',
    sharedBy: { name: 'Jennifer Park', avatar: 'JP' },
    sharedDate: '1 week ago',
    likes: 12,
  },
];

// Mock challenges
const mockChallenges = [
  {
    id: 'chal-1',
    title: 'Build a Complete Approval Process',
    description: 'Create a multi-step approval process with email alerts and field updates',
    points: 50,
    deadline: '3 days',
    participants: 5,
    completed: 4,
    status: 'active' as const,
  },
  {
    id: 'chal-2',
    title: 'Master Flow Builder',
    description: 'Complete 5 Trailhead modules on Flow Builder and build a working flow',
    points: 50,
    deadline: '1 week',
    participants: 6,
    completed: 2,
    status: 'active' as const,
  },
  {
    id: 'chal-3',
    title: 'Security & Sharing Deep Dive',
    description: 'Complete security trailhead modules and document sharing best practices',
    points: 50,
    deadline: 'Completed',
    participants: 6,
    completed: 6,
    status: 'completed' as const,
  },
];

// Mock study sessions
const mockSessions = [
  {
    id: 'sess-1',
    title: 'Flow Builder Deep Dive',
    date: 'Tomorrow, 6:00 PM',
    duration: '90 min',
    host: { name: 'Sarah Chen', avatar: 'SC' },
    attendees: 4,
    maxAttendees: 8,
    description: 'Hands-on session building flows together. Bring your questions!',
    location: 'Zoom',
    status: 'upcoming' as const,
  },
  {
    id: 'sess-2',
    title: 'Certification Prep Q&A',
    date: 'Friday, 7:00 PM',
    duration: '60 min',
    host: { name: 'Marcus Williams', avatar: 'MW' },
    attendees: 5,
    maxAttendees: 8,
    description: 'Review practice questions and discuss difficult concepts',
    location: 'Zoom',
    status: 'upcoming' as const,
  },
  {
    id: 'sess-3',
    title: 'Automation Tools Workshop',
    date: 'Last Tuesday',
    duration: '90 min',
    host: { name: 'Sarah Chen', avatar: 'SC' },
    attendees: 6,
    maxAttendees: 8,
    description: 'Compared Process Builder, Flow, and Apex triggers',
    location: 'Zoom',
    status: 'completed' as const,
  },
];

// Mock activity feed
const mockActivity = [
  {
    id: 'act-1',
    user: { name: 'Jennifer Park', avatar: 'JP' },
    action: 'completed challenge',
    target: 'Build a Complete Approval Process',
    time: '2 hours ago',
    icon: CheckCircle,
  },
  {
    id: 'act-2',
    user: { name: 'Marcus Williams', avatar: 'MW' },
    action: 'shared resource',
    target: 'Flow Builder Cheat Sheet',
    time: '4 hours ago',
    icon: BookOpen,
  },
  {
    id: 'act-3',
    user: { name: 'Sarah Chen', avatar: 'SC' },
    action: 'scheduled session',
    target: 'Flow Builder Deep Dive',
    time: '1 day ago',
    icon: Calendar,
  },
  {
    id: 'act-4',
    user: { name: 'David Rodriguez', avatar: 'DR' },
    action: 'joined group',
    target: '',
    time: '2 days ago',
    icon: UserPlus,
  },
];

export function StudyGroupDetail({ group, onBack, onNavigate }: StudyGroupDetailProps) {
  const [selectedTab, setSelectedTab] = useState('overview');
  const [newResourceUrl, setNewResourceUrl] = useState('');
  const [newResourceTitle, setNewResourceTitle] = useState('');

  const isCreator = group.members.find((m) => m.name === 'You')?.role === 'creator';
  const isModerator = group.members.find((m) => m.name === 'You')?.role === 'moderator';

  return (
    <div className="min-h-screen bg-[#F5F3E8] pb-20">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-4"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Study Groups
          </button>

          <div className="flex items-start justify-between mb-6">
            <div className="flex-1">
              <SectionHeader
                icon={Users}
                title={group.name}
                subtitle={group.description}
                color="#7EB5C1"
              />
              <div className="flex flex-wrap gap-2 mt-3">
                <Badge variant="outline">{group.trail}</Badge>
                <Badge variant="outline">{group.topic}</Badge>
                <Badge
                  variant="outline"
                  className={
                    group.activityLevel === 'high'
                      ? 'bg-green-50 text-green-700 border-green-200'
                      : group.activityLevel === 'medium'
                      ? 'bg-yellow-50 text-yellow-700 border-yellow-200'
                      : 'bg-gray-50 text-gray-700 border-gray-200'
                  }
                >
                  {group.activityLevel.charAt(0).toUpperCase() + group.activityLevel.slice(1)} Activity
                </Badge>
              </div>
            </div>

            <div className="flex items-center gap-2">
              {group.isMember ? (
                <>
                  {(isCreator || isModerator) && (
                    <Button variant="outline" size="sm">
                      <Settings className="w-4 h-4 mr-2" />
                      Settings
                    </Button>
                  )}
                  <Button variant="outline" size="sm">
                    <Share2 className="w-4 h-4 mr-2" />
                    Invite
                  </Button>
                  <Button variant="outline" size="sm" className="text-red-600 hover:text-red-700">
                    <LogOut className="w-4 h-4 mr-2" />
                    Leave
                  </Button>
                </>
              ) : (
                <Button className="bg-[#7EB5C1] hover:bg-[#6a9aa5] text-white">
                  <UserPlus className="w-4 h-4 mr-2" />
                  Join Group (+25 pts)
                </Button>
              )}
            </div>
          </div>

          {/* Stats Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-4">
            <div className="text-center p-3 bg-gray-50 rounded-lg">
              <div className="flex items-center justify-center gap-1 mb-1">
                <Users className="w-4 h-4 text-gray-600" />
                <span className="text-lg text-gray-900">
                  {group.memberCount}/{group.maxMembers}
                </span>
              </div>
              <div className="text-xs text-gray-600">Members</div>
            </div>

            <div className="text-center p-3 bg-gray-50 rounded-lg">
              <div className="flex items-center justify-center gap-1 mb-1">
                <BookOpen className="w-4 h-4 text-gray-600" />
                <span className="text-lg text-gray-900">{group.stats.resources}</span>
              </div>
              <div className="text-xs text-gray-600">Resources</div>
            </div>

            <div className="text-center p-3 bg-gray-50 rounded-lg">
              <div className="flex items-center justify-center gap-1 mb-1">
                <Trophy className="w-4 h-4 text-gray-600" />
                <span className="text-lg text-gray-900">
                  {group.stats.completedChallenges}/{group.stats.challenges}
                </span>
              </div>
              <div className="text-xs text-gray-600">Challenges</div>
            </div>

            <div className="text-center p-3 bg-gray-50 rounded-lg">
              <div className="flex items-center justify-center gap-1 mb-1">
                <Calendar className="w-4 h-4 text-gray-600" />
                <span className="text-lg text-gray-900">{group.stats.studySessions}</span>
              </div>
              <div className="text-xs text-gray-600">Sessions</div>
            </div>

            <div className="text-center p-3 bg-gray-50 rounded-lg">
              <div className="flex items-center justify-center gap-1 mb-1">
                <TrendingUp className="w-4 h-4 text-gray-600" />
                <span className="text-lg text-gray-900">{group.stats.avgProgress}%</span>
              </div>
              <div className="text-xs text-gray-600">Avg Progress</div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Tabs value={selectedTab} onValueChange={setSelectedTab} className="space-y-6">
          <TabsList className="grid w-full max-w-2xl grid-cols-5">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="members">Members</TabsTrigger>
            <TabsTrigger value="resources">Resources</TabsTrigger>
            <TabsTrigger value="challenges">Challenges</TabsTrigger>
            <TabsTrigger value="sessions">Sessions</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            <div className="grid lg:grid-cols-3 gap-6">
              {/* Main Content */}
              <div className="lg:col-span-2 space-y-6">
                {/* Next Session */}
                {group.nextSession && (
                  <div className="bg-gradient-to-r from-[#7EB5C1] to-[#6a9aa5] rounded-xl p-6 text-white">
                    <div className="flex items-center gap-2 mb-3">
                      <Calendar className="w-5 h-5" />
                      <h3 className="text-xl">Next Study Session</h3>
                    </div>
                    <h4 className="text-2xl mb-2">{group.nextSession.title}</h4>
                    <p className="text-white/90 mb-4">{group.nextSession.date}</p>
                    <div className="flex items-center justify-between">
                      <div className="text-sm">
                        {group.nextSession.attendees} members attending
                      </div>
                      <Button className="bg-white text-[#7EB5C1] hover:bg-gray-100">
                        I'll Attend
                      </Button>
                    </div>
                  </div>
                )}

                {/* Active Challenges */}
                <div className="bg-white rounded-xl border border-gray-200 p-6">
                  <h3 className="text-gray-900 mb-4">Active Challenges</h3>
                  <div className="space-y-3">
                    {mockChallenges
                      .filter((c) => c.status === 'active')
                      .map((challenge) => (
                        <div
                          key={challenge.id}
                          className="border border-gray-200 rounded-lg p-4 hover:border-[#7EB5C1] transition-colors"
                        >
                          <div className="flex items-start justify-between mb-2">
                            <h4 className="text-gray-900">{challenge.title}</h4>
                            <Badge className="bg-[#F9A03F] text-white border-0">
                              +{challenge.points} pts
                            </Badge>
                          </div>
                          <p className="text-sm text-gray-600 mb-3">{challenge.description}</p>
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-4 text-sm text-gray-600">
                              <div className="flex items-center gap-1">
                                <Clock className="w-4 h-4" />
                                {challenge.deadline}
                              </div>
                              <div className="flex items-center gap-1">
                                <Users className="w-4 h-4" />
                                {challenge.completed}/{challenge.participants}
                              </div>
                            </div>
                            <Button size="sm" variant="outline">
                              View Details
                            </Button>
                          </div>
                        </div>
                      ))}
                  </div>
                </div>

                {/* Recent Activity */}
                <div className="bg-white rounded-xl border border-gray-200 p-6">
                  <h3 className="text-gray-900 mb-4">Recent Activity</h3>
                  <div className="space-y-4">
                    {mockActivity.map((activity) => (
                      <div key={activity.id} className="flex items-start gap-3">
                        <Avatar className="w-8 h-8">
                          <AvatarFallback className="bg-[#7EB5C1] text-white text-xs">
                            {activity.user.avatar}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm text-gray-900">
                            <span className="font-medium">{activity.user.name}</span>{' '}
                            {activity.action}{' '}
                            {activity.target && (
                              <span className="text-[#7EB5C1]">{activity.target}</span>
                            )}
                          </p>
                          <p className="text-xs text-gray-600">{activity.time}</p>
                        </div>
                        <activity.icon className="w-4 h-4 text-gray-400 flex-shrink-0" />
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Sidebar */}
              <div className="space-y-6">
                {/* Group Progress */}
                <div className="bg-white rounded-xl border border-gray-200 p-6">
                  <h3 className="text-gray-900 mb-4">Group Progress</h3>
                  <div className="text-center mb-4">
                    <div className="text-4xl text-[#7EB5C1] mb-1">
                      {group.stats.avgProgress}%
                    </div>
                    <div className="text-sm text-gray-600">Average Completion</div>
                  </div>
                  <Progress value={group.stats.avgProgress} className="h-3 mb-4" />
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Challenges Completed</span>
                      <span className="text-gray-900">
                        {group.stats.completedChallenges}/{group.stats.challenges}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Study Sessions</span>
                      <span className="text-gray-900">{group.stats.studySessions}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Resources Shared</span>
                      <span className="text-gray-900">{group.stats.resources}</span>
                    </div>
                  </div>
                </div>

                {/* Top Contributors */}
                <div className="bg-white rounded-xl border border-gray-200 p-6">
                  <h3 className="text-gray-900 mb-4">Top Contributors</h3>
                  <div className="space-y-3">
                    {group.members.slice(0, 3).map((member, idx) => (
                      <div key={idx} className="flex items-center gap-3">
                        <div className="flex-shrink-0">
                          {idx === 0 ? (
                            <div className="w-6 h-6 rounded-full bg-yellow-100 text-yellow-700 flex items-center justify-center text-xs">
                              🥇
                            </div>
                          ) : idx === 1 ? (
                            <div className="w-6 h-6 rounded-full bg-gray-100 text-gray-700 flex items-center justify-center text-xs">
                              🥈
                            </div>
                          ) : (
                            <div className="w-6 h-6 rounded-full bg-orange-100 text-orange-700 flex items-center justify-center text-xs">
                              🥉
                            </div>
                          )}
                        </div>
                        <Avatar className="w-8 h-8">
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
                        <div className="flex-1 min-w-0">
                          <div className="text-sm text-gray-900 truncate">{member.name}</div>
                          <div className="text-xs text-gray-600">
                            {(idx + 1) * 8} contributions
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Group Info */}
                <div className="bg-white rounded-xl border border-gray-200 p-6">
                  <h3 className="text-gray-900 mb-4">Group Info</h3>
                  <div className="space-y-3 text-sm">
                    <div>
                      <div className="text-gray-600 mb-1">Created by</div>
                      <div className="text-gray-900">{group.creator.name}</div>
                    </div>
                    <div>
                      <div className="text-gray-600 mb-1">Created</div>
                      <div className="text-gray-900">{group.createdDate}</div>
                    </div>
                    <div>
                      <div className="text-gray-600 mb-1">Last active</div>
                      <div className="text-gray-900">{group.lastActive}</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>

          {/* Members Tab */}
          <TabsContent value="members">
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-gray-900">
                  {group.memberCount} Members ({group.maxMembers - group.memberCount} spots left)
                </h3>
                {group.isMember && (
                  <Button size="sm" variant="outline">
                    <UserPlus className="w-4 h-4 mr-2" />
                    Invite Members
                  </Button>
                )}
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                {group.members.map((member, idx) => (
                  <div
                    key={idx}
                    className="flex items-center gap-3 p-4 border border-gray-200 rounded-lg"
                  >
                    <Avatar className="w-12 h-12">
                      <AvatarFallback
                        className={
                          member.name === 'You'
                            ? 'bg-[#7EB5C1] text-white'
                            : 'bg-gray-200 text-gray-700'
                        }
                      >
                        {member.avatar}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <div className="text-gray-900">{member.name}</div>
                      <div className="text-sm text-gray-600 capitalize">{member.role}</div>
                    </div>
                    {member.role === 'creator' && (
                      <Badge className="bg-[#F9A03F] text-white border-0">Creator</Badge>
                    )}
                    {member.role === 'moderator' && (
                      <Badge variant="outline">Moderator</Badge>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </TabsContent>

          {/* Resources Tab */}
          <TabsContent value="resources" className="space-y-4">
            {group.isMember && (
              <div className="bg-white rounded-xl border border-gray-200 p-6">
                <h3 className="text-gray-900 mb-4">Share a Resource (+10 pts)</h3>
                <div className="space-y-3">
                  <Input
                    placeholder="Resource title"
                    value={newResourceTitle}
                    onChange={(e) => setNewResourceTitle(e.target.value)}
                  />
                  <Input
                    placeholder="URL or paste content"
                    value={newResourceUrl}
                    onChange={(e) => setNewResourceUrl(e.target.value)}
                  />
                  <Button className="bg-[#7EB5C1] hover:bg-[#6a9aa5] text-white">
                    <Plus className="w-4 h-4 mr-2" />
                    Add Resource
                  </Button>
                </div>
              </div>
            )}

            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <h3 className="text-gray-900 mb-4">{group.stats.resources} Shared Resources</h3>
              <div className="space-y-3">
                {mockResources.map((resource) => (
                  <div
                    key={resource.id}
                    className="border border-gray-200 rounded-lg p-4 hover:border-[#7EB5C1] transition-colors"
                  >
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex items-start gap-3 flex-1">
                        <div className="flex-shrink-0 mt-1">
                          {resource.type === 'link' && <LinkIcon className="w-4 h-4 text-gray-400" />}
                          {resource.type === 'file' && <FileText className="w-4 h-4 text-gray-400" />}
                          {resource.type === 'note' && <BookOpen className="w-4 h-4 text-gray-400" />}
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="text-gray-900 mb-1">{resource.title}</h4>
                          {resource.type === 'note' && (
                            <p className="text-sm text-gray-600 mb-2">{resource.content}</p>
                          )}
                          <div className="flex items-center gap-3 text-xs text-gray-600">
                            <span>Shared by {resource.sharedBy.name}</span>
                            <span>•</span>
                            <span>{resource.sharedDate}</span>
                            <span>•</span>
                            <span>{resource.likes} likes</span>
                          </div>
                        </div>
                      </div>
                      {resource.type !== 'note' && (
                        <Button size="sm" variant="ghost">
                          <ExternalLink className="w-4 h-4" />
                        </Button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </TabsContent>

          {/* Challenges Tab */}
          <TabsContent value="challenges">
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <h3 className="text-gray-900 mb-6">Group Challenges</h3>
              <div className="space-y-4">
                {mockChallenges.map((challenge) => (
                  <div
                    key={challenge.id}
                    className={`border-2 rounded-xl p-6 ${
                      challenge.status === 'completed'
                        ? 'border-green-200 bg-green-50'
                        : 'border-gray-200'
                    }`}
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h4 className="text-gray-900">{challenge.title}</h4>
                          {challenge.status === 'completed' && (
                            <Badge className="bg-green-500 text-white border-0">
                              <CheckCircle className="w-3 h-3 mr-1" />
                              Completed
                            </Badge>
                          )}
                        </div>
                        <p className="text-gray-700 mb-3">{challenge.description}</p>
                        <div className="flex items-center gap-4 text-sm text-gray-600">
                          <div className="flex items-center gap-1">
                            <Clock className="w-4 h-4" />
                            {challenge.deadline}
                          </div>
                          <div className="flex items-center gap-1">
                            <Award className="w-4 h-4 text-[#F9A03F]" />
                            <span className="text-[#F9A03F]">{challenge.points} points</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="mb-3">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm text-gray-600">
                          {challenge.completed}/{challenge.participants} members completed
                        </span>
                        <span className="text-sm text-gray-900">
                          {Math.round((challenge.completed / challenge.participants) * 100)}%
                        </span>
                      </div>
                      <Progress
                        value={(challenge.completed / challenge.participants) * 100}
                        className="h-2"
                      />
                    </div>

                    {challenge.status === 'active' && (
                      <Button size="sm" className="bg-[#7EB5C1] hover:bg-[#6a9aa5] text-white">
                        Mark as Complete
                      </Button>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </TabsContent>

          {/* Sessions Tab */}
          <TabsContent value="sessions">
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-gray-900">Study Sessions</h3>
                {group.isMember && (
                  <Button size="sm" className="bg-[#7EB5C1] hover:bg-[#6a9aa5] text-white">
                    <Plus className="w-4 h-4 mr-2" />
                    Schedule Session
                  </Button>
                )}
              </div>

              <div className="space-y-6">
                {/* Upcoming Sessions */}
                <div>
                  <h4 className="text-gray-700 mb-3">Upcoming Sessions</h4>
                  <div className="space-y-3">
                    {mockSessions
                      .filter((s) => s.status === 'upcoming')
                      .map((session) => (
                        <div
                          key={session.id}
                          className="border-2 border-[#7EB5C1] rounded-xl p-4 bg-blue-50"
                        >
                          <div className="flex items-start justify-between mb-3">
                            <div className="flex-1">
                              <h5 className="text-gray-900 mb-1">{session.title}</h5>
                              <p className="text-sm text-gray-700 mb-2">{session.description}</p>
                              <div className="flex flex-wrap gap-3 text-sm text-gray-600">
                                <div className="flex items-center gap-1">
                                  <Calendar className="w-4 h-4" />
                                  {session.date}
                                </div>
                                <div className="flex items-center gap-1">
                                  <Clock className="w-4 h-4" />
                                  {session.duration}
                                </div>
                                <div className="flex items-center gap-1">
                                  <Users className="w-4 h-4" />
                                  {session.attendees}/{session.maxAttendees}
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <Button size="sm" className="bg-[#7EB5C1] hover:bg-[#6a9aa5] text-white">
                              I'll Attend
                            </Button>
                            <Button size="sm" variant="outline">
                              Add to Calendar
                            </Button>
                          </div>
                        </div>
                      ))}
                  </div>
                </div>

                {/* Past Sessions */}
                <div>
                  <h4 className="text-gray-700 mb-3">Past Sessions</h4>
                  <div className="space-y-3">
                    {mockSessions
                      .filter((s) => s.status === 'completed')
                      .map((session) => (
                        <div
                          key={session.id}
                          className="border border-gray-200 rounded-lg p-4"
                        >
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <h5 className="text-gray-900 mb-1">{session.title}</h5>
                              <p className="text-sm text-gray-600 mb-2">{session.description}</p>
                              <div className="flex flex-wrap gap-3 text-sm text-gray-600">
                                <div className="flex items-center gap-1">
                                  <Calendar className="w-4 h-4" />
                                  {session.date}
                                </div>
                                <div className="flex items-center gap-1">
                                  <Users className="w-4 h-4" />
                                  {session.attendees} attended
                                </div>
                              </div>
                            </div>
                            <Badge className="bg-gray-100 text-gray-700 border-0">Completed</Badge>
                          </div>
                        </div>
                      ))}
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
