import { Crown, Trophy, TrendingUp, Award, User, Sparkles } from 'lucide-react';
import { Badge } from './ui/badge';
import { useState } from 'react';

interface LeaderboardUser {
  id: string;
  name: string;
  avatar: string;
  points: number;
  badge: string;
  quote: string;
  rank: number;
  trend?: 'up' | 'down' | 'same';
}

interface LeaderboardProps {
  users?: LeaderboardUser[];
  currentUserId?: string;
}

const mockUsers: LeaderboardUser[] = [
  {
    id: '1',
    name: 'Sarah Chen',
    avatar: 'SC',
    points: 485,
    badge: 'Trail Master',
    quote: 'My favorite part of TT is teamwork!',
    rank: 1,
    trend: 'up'
  },
  {
    id: '2',
    name: 'Marcus Johnson',
    avatar: 'MJ',
    points: 432,
    badge: 'Trail Master',
    quote: 'Learning Salesforce changed my career path.',
    rank: 2,
    trend: 'same'
  },
  {
    id: '3',
    name: 'Priya Patel',
    avatar: 'PP',
    points: 387,
    badge: 'Trail Master',
    quote: 'The community support here is incredible!',
    rank: 3,
    trend: 'up'
  },
  {
    id: '4',
    name: 'Alex Rivera',
    avatar: 'AR',
    points: 312,
    badge: 'Trail Master',
    quote: 'Capstone projects made everything click.',
    rank: 4,
    trend: 'down'
  },
  {
    id: '5',
    name: 'Jordan Lee',
    avatar: 'JL',
    points: 289,
    badge: 'Pathfinder',
    quote: 'Penny AI is like having a coach 24/7!',
    rank: 5,
    trend: 'up'
  },
  {
    id: '6',
    name: 'Taylor Brooks',
    avatar: 'TB',
    points: 256,
    badge: 'Pathfinder',
    quote: 'From nonprofit to tech - dream come true!',
    rank: 6,
    trend: 'same'
  },
  {
    id: '7',
    name: 'Morgan Kim',
    avatar: 'MK',
    points: 234,
    badge: 'Pathfinder',
    quote: 'The structure here keeps me motivated.',
    rank: 7,
    trend: 'up'
  },
  {
    id: '8',
    name: 'Casey Martinez',
    avatar: 'CM',
    points: 198,
    badge: 'Trailblazer',
    quote: 'Best career decision I ever made!',
    rank: 8,
    trend: 'up'
  },
  {
    id: '9',
    name: 'Riley Thompson',
    avatar: 'RT',
    points: 176,
    badge: 'Trailblazer',
    quote: 'Love the hands-on learning approach.',
    rank: 9,
    trend: 'down'
  },
  {
    id: '10',
    name: 'Jamie Foster',
    avatar: 'JF',
    points: 154,
    badge: 'Trailblazer',
    quote: 'Community events are always valuable!',
    rank: 10,
    trend: 'same'
  }
];

export function Leaderboard({ users = mockUsers, currentUserId }: LeaderboardProps) {
  const [timeFilter, setTimeFilter] = useState<'week' | 'month' | 'all'>('week');
  const [selectedUser, setSelectedUser] = useState<LeaderboardUser | null>(null);

  const getBadgeColor = (badge: string) => {
    if (badge.includes('Master')) return '#2C6975';
    if (badge.includes('Pathfinder')) return '#3B6A52';
    if (badge.includes('Trailblazer')) return '#F9A03F';
    return '#7EB5C1';
  };

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Trophy className="w-5 h-5 text-[#F9A03F]" />
          <h2 className="text-xl text-gray-900">Top Trailblazers</h2>
        </div>

        {/* Time filters */}
        <div className="flex items-center space-x-2">
          <button
            onClick={() => setTimeFilter('week')}
            className={`px-3 py-1.5 text-sm rounded-lg transition-colors ${
              timeFilter === 'week'
                ? 'bg-[#2C6975] text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            This Week
          </button>
          <button
            onClick={() => setTimeFilter('month')}
            className={`px-3 py-1.5 text-sm rounded-lg transition-colors ${
              timeFilter === 'month'
                ? 'bg-[#2C6975] text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            This Month
          </button>
          <button
            onClick={() => setTimeFilter('all')}
            className={`px-3 py-1.5 text-sm rounded-lg transition-colors ${
              timeFilter === 'all'
                ? 'bg-[#2C6975] text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            All Time
          </button>
        </div>
      </div>

      {/* Penny Comment */}
      <div className="bg-gradient-to-r from-[#7EB5C1]/10 to-[#7EB5C1]/5 border border-[#7EB5C1]/30 rounded-lg p-3 flex items-start space-x-2">
        <Sparkles className="w-4 h-4 text-[#7EB5C1] mt-0.5" />
        <p className="text-sm text-gray-700 italic">
          "New top Trailblazer this week — keep going!" — Penny
        </p>
      </div>

      {/* Leaderboard Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200">
                <th className="px-4 py-3 text-left text-xs text-gray-600 uppercase tracking-wider">
                  Rank
                </th>
                <th className="px-4 py-3 text-left text-xs text-gray-600 uppercase tracking-wider">
                  Learner
                </th>
                <th className="px-4 py-3 text-left text-xs text-gray-600 uppercase tracking-wider">
                  Badge
                </th>
                <th className="px-4 py-3 text-left text-xs text-gray-600 uppercase tracking-wider">
                  Points
                </th>
                <th className="px-4 py-3 text-left text-xs text-gray-600 uppercase tracking-wider">
                  Trend
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {users.map((user, index) => (
                <tr
                  key={user.id}
                  onClick={() => setSelectedUser(user)}
                  className={`transition-colors cursor-pointer ${
                    index % 2 === 0 ? 'bg-[#F5F3E8]' : 'bg-[#7EB5C1]/5'
                  } hover:bg-[#7EB5C1]/10 ${
                    user.id === currentUserId ? 'ring-2 ring-[#F9A03F] ring-inset' : ''
                  }`}
                >
                  {/* Rank */}
                  <td className="px-4 py-3">
                    <div className="flex items-center space-x-2">
                      <span className="text-sm text-gray-900">#{user.rank}</span>
                      {user.rank === 1 && (
                        <Crown className="w-4 h-4 text-[#F9A03F]" />
                      )}
                    </div>
                  </td>

                  {/* Learner */}
                  <td className="px-4 py-3">
                    <div className="flex items-center space-x-3">
                      <div 
                        className="w-10 h-10 rounded-full flex items-center justify-center text-white text-sm"
                        style={{ backgroundColor: getBadgeColor(user.badge) }}
                      >
                        {user.avatar}
                      </div>
                      <div>
                        <div className="flex items-center space-x-2">
                          <p className="text-sm text-gray-900">{user.name}</p>
                          {user.id === currentUserId && (
                            <Badge className="bg-[#F9A03F] text-white text-xs">You</Badge>
                          )}
                        </div>
                        <p className="text-xs text-gray-500 italic">"{user.quote}"</p>
                      </div>
                    </div>
                  </td>

                  {/* Badge */}
                  <td className="px-4 py-3">
                    <Badge 
                      className="text-xs"
                      style={{ 
                        backgroundColor: `${getBadgeColor(user.badge)}20`,
                        color: getBadgeColor(user.badge)
                      }}
                    >
                      {user.badge}
                    </Badge>
                  </td>

                  {/* Points */}
                  <td className="px-4 py-3">
                    <div className="flex items-center space-x-1">
                      <Trophy className="w-4 h-4 text-[#F9A03F]" />
                      <span className="text-sm text-gray-900">{user.points}</span>
                    </div>
                  </td>

                  {/* Trend */}
                  <td className="px-4 py-3">
                    {user.trend === 'up' && (
                      <div className="flex items-center space-x-1 text-green-600">
                        <TrendingUp className="w-4 h-4" />
                        <span className="text-xs">Rising</span>
                      </div>
                    )}
                    {user.trend === 'down' && (
                      <div className="flex items-center space-x-1 text-gray-400">
                        <TrendingUp className="w-4 h-4 transform rotate-180" />
                        <span className="text-xs">Falling</span>
                      </div>
                    )}
                    {user.trend === 'same' && (
                      <div className="flex items-center space-x-1 text-gray-400">
                        <span className="text-xs">Stable</span>
                      </div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* User Detail Modal */}
      {selectedUser && (
        <div 
          className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4"
          onClick={() => setSelectedUser(null)}
        >
          <div 
            className="bg-white rounded-xl shadow-2xl max-w-md w-full p-6 animate-fade-in"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="text-center mb-6">
              <div 
                className="w-20 h-20 rounded-full mx-auto mb-3 flex items-center justify-center text-white text-xl"
                style={{ backgroundColor: getBadgeColor(selectedUser.badge) }}
              >
                {selectedUser.avatar}
              </div>
              <h3 className="text-xl text-gray-900 mb-1">{selectedUser.name}</h3>
              <Badge 
                className="mb-2"
                style={{ 
                  backgroundColor: `${getBadgeColor(selectedUser.badge)}20`,
                  color: getBadgeColor(selectedUser.badge)
                }}
              >
                {selectedUser.badge}
              </Badge>
              <p className="text-sm text-gray-600 italic">"{selectedUser.quote}"</p>
            </div>

            <div className="space-y-3 mb-6">
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <span className="text-sm text-gray-600">Rank</span>
                <div className="flex items-center space-x-1">
                  {selectedUser.rank === 1 && <Crown className="w-4 h-4 text-[#F9A03F]" />}
                  <span className="text-sm text-gray-900">#{selectedUser.rank}</span>
                </div>
              </div>

              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <span className="text-sm text-gray-600">Total Points</span>
                <div className="flex items-center space-x-1">
                  <Trophy className="w-4 h-4 text-[#F9A03F]" />
                  <span className="text-sm text-gray-900">{selectedUser.points}</span>
                </div>
              </div>

              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <span className="text-sm text-gray-600">Trend</span>
                <div>
                  {selectedUser.trend === 'up' && (
                    <span className="text-sm text-green-600 flex items-center space-x-1">
                      <TrendingUp className="w-4 h-4" />
                      <span>Rising</span>
                    </span>
                  )}
                  {selectedUser.trend === 'down' && (
                    <span className="text-sm text-gray-500">Falling</span>
                  )}
                  {selectedUser.trend === 'same' && (
                    <span className="text-sm text-gray-500">Stable</span>
                  )}
                </div>
              </div>
            </div>

            <button
              onClick={() => setSelectedUser(null)}
              className="w-full px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
