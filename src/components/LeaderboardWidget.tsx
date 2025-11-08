/**
 * LEADERBOARD WIDGET
 * 
 * Compact leaderboard showing top learners and user's rank to drive
 * competitive motivation and engagement.
 * 
 * GAP #23: Limited Gamification
 * Priority: 🟡 MEDIUM - Phase 1 Feature #5
 * Value: High Engagement + Competitive Motivation
 * 
 * =============================================================================
 * SALESFORCE ARCHITECTURE MAPPING
 * =============================================================================
 * 
 * Objects Used:
 * - User (Standard object)
 *   Fields: Name, SmallPhotoUrl, Profile_Image_URL__c
 * 
 * - Points_Ledger__c (Custom object from existing gamification)
 *   Fields: User__c, Total_Points__c, Weekly_Points__c, Monthly_Points__c,
 *           Rank__c, Previous_Rank__c, Points_This_Week__c
 * 
 * - Activity_Streak__c (From Learning Streaks feature)
 *   Fields: User__c, Current_Streak__c, Longest_Streak__c
 * 
 * - Level_Progress__c (From Progressive Gamification)
 *   Fields: User__c, Current_Level__c, Total_XP__c
 * 
 * Apex Controller: LeaderboardController.cls
 * - getTopLearners(category, timeframe, limit) → List<LeaderboardEntry>
 * - getUserRank(userId, category, timeframe) → RankInfo
 * - getWeeklyLeaders(limit) → List<LeaderboardEntry>
 * - getMonthlyLeaders(limit) → List<LeaderboardEntry>
 * - getAllTimeLeaders(limit) → List<LeaderboardEntry>
 * 
 * =============================================================================
 * LEADERBOARD CATEGORIES
 * =============================================================================
 * 
 * 1. Points (default)
 *    - Total points earned
 *    - Weekly/Monthly/All-time views
 * 
 * 2. Streaks
 *    - Current active streak
 *    - All-time view only
 * 
 * 3. Modules
 *    - Modules completed
 *    - Weekly/Monthly/All-time views
 * 
 * =============================================================================
 * RANKING ALGORITHM
 * =============================================================================
 * 
 * Weekly Leaderboard:
 * - Resets every Monday 12:00 AM UTC
 * - Counts points earned Mon-Sun
 * - Ties broken by timestamp (earlier = higher rank)
 * 
 * Monthly Leaderboard:
 * - Resets 1st of each month
 * - Counts points for calendar month
 * - Ties broken by timestamp
 * 
 * All-Time Leaderboard:
 * - Never resets
 * - Cumulative total points
 * - Ties broken by join date (earlier = higher)
 * 
 * =============================================================================
 */

import React, { useState } from 'react';
import {
  Trophy,
  TrendingUp,
  TrendingDown,
  Minus,
  Crown,
  Medal,
  Award,
  ChevronRight,
  Users,
  Zap,
  Calendar,
  Flame,
  BookOpen,
  ArrowUp,
  ArrowDown,
} from 'lucide-react';
import { Avatar, AvatarImage, AvatarFallback } from './ui/avatar';
import { SectionHeader } from './SectionHeader';
import { Tabs, TabsList, TabsTrigger, TabsContent } from './ui/tabs';

export interface LeaderboardWidgetProps {
  /** Category to display: 'points' | 'streaks' | 'modules' */
  category?: 'points' | 'streaks' | 'modules';
  /** Timeframe: 'weekly' | 'monthly' | 'all-time' */
  timeframe?: 'weekly' | 'monthly' | 'all-time';
  /** Number of top entries to show (default 5) */
  limit?: number;
  /** Current user ID to highlight their position */
  currentUserId?: string;
  /** Current user's rank info */
  userRank?: RankInfo;
  /** Top leaders data */
  topLeaders?: LeaderboardEntry[];
  /** Callback when user clicks "View Full Leaderboard" */
  onViewFull?: () => void;
  /** Show compact version (default true) */
  compact?: boolean;
}

export interface LeaderboardEntry {
  rank: number;
  userId: string;
  userName: string;
  userPhoto?: string;
  value: number; // Points, streak days, or modules count
  change: number; // Rank change from previous period
  isCurrentUser?: boolean;
}

export interface RankInfo {
  rank: number;
  value: number;
  change: number;
  totalUsers: number;
  percentile: number; // Top X%
}

const CATEGORY_CONFIG = {
  points: {
    label: 'Points',
    icon: Zap,
    valueLabel: 'pts',
    color: 'text-sun-amber',
    bgColor: 'bg-sun-amber/10',
  },
  streaks: {
    label: 'Streaks',
    icon: Flame,
    valueLabel: 'days',
    color: 'text-orange-500',
    bgColor: 'bg-orange-50 dark:bg-orange-950/20',
  },
  modules: {
    label: 'Modules',
    icon: BookOpen,
    valueLabel: 'completed',
    color: 'text-evergreen',
    bgColor: 'bg-evergreen/10',
  },
};

const TIMEFRAME_CONFIG = {
  weekly: {
    label: 'This Week',
    icon: Calendar,
    resetInfo: 'Resets Monday',
  },
  monthly: {
    label: 'This Month',
    icon: Calendar,
    resetInfo: 'Resets 1st',
  },
  'all-time': {
    label: 'All Time',
    icon: Trophy,
    resetInfo: 'Never resets',
  },
};

export function LeaderboardWidget({
  category = 'points',
  timeframe = 'weekly',
  limit = 5,
  currentUserId = 'user-4',
  userRank = {
    rank: 8,
    value: 1250,
    change: 2,
    totalUsers: 45,
    percentile: 18,
  },
  topLeaders = generateMockLeaders(category, 5, currentUserId),
  onViewFull,
  compact = true,
}: LeaderboardWidgetProps) {
  const [selectedCategory, setSelectedCategory] = useState<'points' | 'streaks' | 'modules'>(category);
  const [selectedTimeframe, setSelectedTimeframe] = useState<'weekly' | 'monthly' | 'all-time'>(timeframe);

  const config = CATEGORY_CONFIG[selectedCategory];
  const timeConfig = TIMEFRAME_CONFIG[selectedTimeframe];
  const IconComponent = config.icon;

  // Check if current user is in top leaders
  const userInTop = topLeaders.some(leader => leader.userId === currentUserId);

  return (
    <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-gray-200 dark:border-slate-700 overflow-hidden">
      {/* Header */}
      <div className={`p-6 ${config.bgColor} border-b border-gray-200 dark:border-slate-700`}>
        <SectionHeader
          title="Leaderboard"
          description="See how you rank"
          icon={Trophy}
          level="h3"
        />
      </div>

      {/* Tabs for Category & Timeframe */}
      {!compact && (
        <div className="p-4 border-b border-gray-200 dark:border-slate-700">
          <Tabs value={selectedCategory} onValueChange={(v) => setSelectedCategory(v as any)}>
            <TabsList className="grid grid-cols-3 w-full">
              <TabsTrigger value="points" className="text-xs">
                <Zap className="w-3 h-3 mr-1" />
                Points
              </TabsTrigger>
              <TabsTrigger value="streaks" className="text-xs">
                <Flame className="w-3 h-3 mr-1" />
                Streaks
              </TabsTrigger>
              <TabsTrigger value="modules" className="text-xs">
                <BookOpen className="w-3 h-3 mr-1" />
                Modules
              </TabsTrigger>
            </TabsList>
          </Tabs>

          <div className="flex items-center gap-2 mt-3">
            {Object.entries(TIMEFRAME_CONFIG).map(([key, tf]) => (
              <button
                key={key}
                onClick={() => setSelectedTimeframe(key as any)}
                className={`text-xs px-3 py-1.5 rounded-full transition-all ${
                  selectedTimeframe === key
                    ? 'bg-evergreen text-white'
                    : 'bg-gray-100 dark:bg-slate-700 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-slate-600'
                }`}
              >
                {tf.label}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Timeframe Info */}
      <div className="px-4 py-3 bg-gray-50 dark:bg-slate-900/50 border-b border-gray-200 dark:border-slate-700">
        <div className="flex items-center justify-between text-xs">
          <span className="text-gray-600 dark:text-gray-400">
            {timeConfig.label}
          </span>
          <span className="text-gray-500 dark:text-gray-500">
            {timeConfig.resetInfo}
          </span>
        </div>
      </div>

      {/* Top Leaders List */}
      <div className="p-4">
        <div className="space-y-3">
          {topLeaders.map((leader, index) => (
            <LeaderboardRow
              key={leader.userId}
              entry={leader}
              config={config}
              isCurrentUser={leader.userId === currentUserId}
            />
          ))}
        </div>
      </div>

      {/* Current User Rank (if not in top) */}
      {!userInTop && userRank && (
        <div className="px-4 pb-4">
          <div className="border-t border-gray-200 dark:border-slate-700 pt-3 mt-1">
            <div className={`p-3 rounded-lg ${config.bgColor} border-2 border-evergreen`}>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="flex items-center justify-center w-8 h-8 rounded-full bg-evergreen text-white text-xs">
                    #{userRank.rank}
                  </div>
                  <div>
                    <div className="text-sm text-gray-900 dark:text-gray-100">You</div>
                    <div className="flex items-center space-x-2 mt-0.5">
                      <span className={`text-xs ${config.color}`}>
                        {userRank.value.toLocaleString()} {config.valueLabel}
                      </span>
                      <RankChange change={userRank.change} />
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-xs text-gray-500 dark:text-gray-500">
                    Top {userRank.percentile}%
                  </div>
                  <div className="text-xs text-gray-400 dark:text-gray-600">
                    of {userRank.totalUsers} learners
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* View Full Leaderboard */}
      <div className="p-4 border-t border-gray-200 dark:border-slate-700">
        <button
          onClick={onViewFull}
          className="w-full text-sm text-evergreen hover:text-evergreen-dark dark:text-sky-blue dark:hover:text-sky-blue-light flex items-center justify-center space-x-2 py-2 hover:bg-gray-50 dark:hover:bg-slate-700/50 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-evergreen"
        >
          <Users className="w-4 h-4" />
          <span>View Full Leaderboard</span>
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>

      {/* Motivation Footer */}
      <div className="px-4 pb-4">
        <div className="text-xs text-center text-gray-500 dark:text-gray-500">
          {getMotivationalMessage(userRank?.rank || 0, userRank?.change || 0)}
        </div>
      </div>
    </div>
  );
}

/**
 * Individual Leaderboard Row
 */
interface LeaderboardRowProps {
  entry: LeaderboardEntry;
  config: typeof CATEGORY_CONFIG[keyof typeof CATEGORY_CONFIG];
  isCurrentUser: boolean;
}

function LeaderboardRow({ entry, config, isCurrentUser }: LeaderboardRowProps) {
  const IconComponent = config.icon;
  
  // Medal for top 3
  const getMedalIcon = (rank: number) => {
    switch (rank) {
      case 1:
        return <Crown className="w-5 h-5 text-yellow-500" />;
      case 2:
        return <Medal className="w-5 h-5 text-gray-400" />;
      case 3:
        return <Award className="w-5 h-5 text-orange-600" />;
      default:
        return (
          <div className="w-6 h-6 rounded-full bg-gray-100 dark:bg-slate-700 flex items-center justify-center text-xs text-gray-600 dark:text-gray-400">
            {rank}
          </div>
        );
    }
  };

  return (
    <div
      className={`flex items-center space-x-3 p-3 rounded-lg transition-all ${
        isCurrentUser
          ? `${config.bgColor} border-2 border-evergreen`
          : 'hover:bg-gray-50 dark:hover:bg-slate-700/50'
      }`}
    >
      {/* Rank */}
      <div className="flex-shrink-0">
        {getMedalIcon(entry.rank)}
      </div>

      {/* Avatar */}
      <Avatar className="w-9 h-9 flex-shrink-0 ring-2 ring-gray-200 dark:ring-slate-600">
        <AvatarImage src={entry.userPhoto} alt={entry.userName} />
        <AvatarFallback className="text-xs">
          {entry.userName.split(' ').map(n => n[0]).join('').toUpperCase()}
        </AvatarFallback>
      </Avatar>

      {/* Name & Stats */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center space-x-2">
          <span className="text-sm text-gray-900 dark:text-gray-100 truncate">
            {entry.userName}
            {isCurrentUser && <span className="text-xs text-gray-500 ml-1">(You)</span>}
          </span>
          <RankChange change={entry.change} />
        </div>
        <div className={`text-xs ${config.color} mt-0.5`}>
          {entry.value.toLocaleString()} {config.valueLabel}
        </div>
      </div>

      {/* Icon indicator */}
      <div className="flex-shrink-0">
        <IconComponent className={`w-4 h-4 ${config.color}`} />
      </div>
    </div>
  );
}

/**
 * Rank Change Indicator
 */
function RankChange({ change }: { change: number }) {
  if (change === 0) {
    return (
      <span className="inline-flex items-center text-xs text-gray-400 dark:text-gray-600">
        <Minus className="w-3 h-3" />
      </span>
    );
  }

  if (change > 0) {
    return (
      <span className="inline-flex items-center text-xs text-success">
        <ArrowUp className="w-3 h-3" />
        <span className="ml-0.5">{change}</span>
      </span>
    );
  }

  return (
    <span className="inline-flex items-center text-xs text-error">
      <ArrowDown className="w-3 h-3" />
      <span className="ml-0.5">{Math.abs(change)}</span>
    </span>
  );
}

/**
 * Generate mock leaderboard data
 */
function generateMockLeaders(
  category: 'points' | 'streaks' | 'modules',
  limit: number,
  currentUserId: string
): LeaderboardEntry[] {
  const mockUsers = [
    { id: 'user-1', name: 'Sarah Chen', photo: undefined },
    { id: 'user-2', name: 'Marcus Johnson', photo: undefined },
    { id: 'user-3', name: 'Elena Rodriguez', photo: undefined },
    { id: 'user-4', name: 'James Kim', photo: undefined },
    { id: 'user-5', name: 'Priya Patel', photo: undefined },
    { id: 'user-6', name: 'David Thompson', photo: undefined },
    { id: 'user-7', name: 'Lisa Wang', photo: undefined },
  ];

  const getValue = (index: number): number => {
    switch (category) {
      case 'points':
        return 2500 - (index * 200);
      case 'streaks':
        return 45 - (index * 5);
      case 'modules':
        return 28 - (index * 3);
    }
  };

  return mockUsers.slice(0, limit).map((user, index) => ({
    rank: index + 1,
    userId: user.id,
    userName: user.name,
    userPhoto: user.photo,
    value: getValue(index),
    change: Math.floor(Math.random() * 5) - 2, // -2 to +2
    isCurrentUser: user.id === currentUserId,
  }));
}

/**
 * Get motivational message based on rank and change
 */
function getMotivationalMessage(rank: number, change: number): string {
  if (rank === 1) {
    return "🏆 You're #1! Amazing work!";
  } else if (rank <= 3) {
    return "🥇 Top 3! Keep crushing it!";
  } else if (rank <= 5) {
    return "⭐ Top 5! You're doing great!";
  } else if (rank <= 10) {
    return "🎯 Top 10! Almost there!";
  } else if (change > 0) {
    return `🚀 Up ${change} spots! Keep climbing!`;
  } else if (change < 0) {
    return "💪 Stay focused! You can move up!";
  } else {
    return "🌟 Keep learning to rise in the ranks!";
  }
}

export default LeaderboardWidget;
