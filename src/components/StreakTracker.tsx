/**
 * LEARNING STREAKS TRACKER
 * 
 * Tracks consecutive days of learner activity to build daily engagement habits.
 * Includes milestone celebrations, streak savers, and visual calendar.
 * 
 * GAP #21: No Daily Streak/Habit Tracking
 * Priority: 🔴 HIGH - Phase 1 Feature #4
 * Value: High Daily Engagement + Retention
 * 
 * =============================================================================
 * SALESFORCE ARCHITECTURE MAPPING
 * =============================================================================
 * 
 * Objects Used:
 * - Activity_Streak__c (Custom object to track daily streaks)
 *   Fields: User__c, Current_Streak__c, Longest_Streak__c, Last_Active_Date__c,
 *           Streak_Saver_Used__c, Streak_Saver_Available_Date__c,
 *           Total_Active_Days__c, Milestones_Reached__c (Multi-picklist)
 * 
 * - Daily_Activity__c (Log of daily activities)
 *   Fields: User__c, Activity_Date__c, Activity_Count__c, Activity_Types__c,
 *           Points_Earned__c, First_Activity_Time__c
 * 
 * - Streak_Milestone__c (Milestone achievements)
 *   Fields: User__c, Milestone_Days__c, Achieved_Date__c, Bonus_Points__c,
 *           Badge_Awarded__c
 * 
 * Apex Controller: StreakTrackerController.cls
 * - getCurrentStreak(userId) → Activity_Streak__c
 * - checkAndUpdateStreak(userId) → void (called on login)
 * - useStreakSaver(userId) → Boolean
 * - getActivityCalendar(userId, month) → List<Daily_Activity__c>
 * - getTopStreaks(limit) → List<Activity_Streak__c>
 * 
 * =============================================================================
 * STREAK ALGORITHM
 * =============================================================================
 * 
 * 1. On user login/activity:
 *    - Get last active date
 *    - If yesterday: current_streak++
 *    - If today: no change
 *    - If 2+ days ago: check streak saver
 *      - If available: use it, current_streak++
 *      - If not: reset to 1
 * 
 * 2. Streak Saver Rules:
 *    - One saver per month
 *    - Resets on 1st of month
 *    - Can only save 1 missed day
 * 
 * 3. Milestones:
 *    - 7 days: "Week Warrior" (+50 pts)
 *    - 30 days: "Monthly Master" (+200 pts)
 *    - 90 days: "Quarter Champion" (+500 pts)
 *    - 365 days: "Year Legend" (+2000 pts)
 * 
 * =============================================================================
 */

import React, { useState } from 'react';
import {
  Flame,
  Calendar,
  Award,
  TrendingUp,
  Shield,
  Clock,
  ChevronLeft,
  ChevronRight,
  Trophy,
  Zap,
  Star,
  Target,
} from 'lucide-react';
import { SectionHeader } from './SectionHeader';
import { toast } from 'sonner@2.0.3';
import { Progress } from './ui/progress';

export interface StreakTrackerProps {
  currentStreak?: number;
  longestStreak?: number;
  totalActiveDays?: number;
  lastActiveDate?: string;
  streakSaverAvailable?: boolean;
  milestonesReached?: number[];
  activityHistory?: ActivityDay[];
  onUseStreakSaver?: () => void;
}

interface ActivityDay {
  date: string; // YYYY-MM-DD
  activityCount: number;
  pointsEarned: number;
  hasActivity: boolean;
}

interface Milestone {
  days: number;
  title: string;
  icon: typeof Award;
  color: string;
  points: number;
  description: string;
}

const MILESTONES: Milestone[] = [
  {
    days: 7,
    title: 'Week Warrior',
    icon: Flame,
    color: '#F9A03F',
    points: 50,
    description: '7 days of learning!',
  },
  {
    days: 30,
    title: 'Monthly Master',
    icon: Star,
    color: '#7EB5C1',
    points: 200,
    description: '30 days strong!',
  },
  {
    days: 90,
    title: 'Quarter Champion',
    icon: Trophy,
    color: '#3B6A52',
    points: 500,
    description: '90 days of dedication!',
  },
  {
    days: 365,
    title: 'Year Legend',
    icon: Award,
    color: '#2C6975',
    points: 2000,
    description: 'A full year of learning!',
  },
];

export function StreakTracker({
  currentStreak = 12,
  longestStreak = 28,
  totalActiveDays = 45,
  lastActiveDate = new Date().toISOString().split('T')[0],
  streakSaverAvailable = true,
  milestonesReached = [7],
  activityHistory = generateMockActivityHistory(),
  onUseStreakSaver,
}: StreakTrackerProps) {
  const [showCalendar, setShowCalendar] = useState(false);
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [showMilestones, setShowMilestones] = useState(false);

  // Calculate next milestone
  const nextMilestone = MILESTONES.find(m => !milestonesReached.includes(m.days));
  const progressToNext = nextMilestone 
    ? (currentStreak / nextMilestone.days) * 100 
    : 100;

  const handleUseStreakSaver = () => {
    if (!streakSaverAvailable) {
      toast.error('No streak saver available this month');
      return;
    }

    if (onUseStreakSaver) {
      onUseStreakSaver();
      toast.success('Streak saver used! Your streak is protected 🛡️');
    }
  };

  return (
    <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-gray-200 dark:border-slate-700 overflow-hidden">
      {/* Header */}
      <div className="p-6 bg-gradient-to-br from-orange-50 to-amber-50 dark:from-orange-950/20 dark:to-amber-950/20 border-b border-gray-200 dark:border-slate-700">
        <div className="flex items-center justify-between mb-4">
          <SectionHeader
            title="Learning Streak"
            description="Build your daily learning habit"
            icon={Flame}
            level="h3"
          />
        </div>

        {/* Current Streak - Big Display */}
        <div className="flex items-center justify-center py-6">
          <div className="relative">
            {/* Animated flame background */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-32 h-32 bg-gradient-to-br from-orange-400 to-red-500 rounded-full opacity-20 animate-pulse" />
            </div>
            
            {/* Flame icon */}
            <div className="relative flex flex-col items-center">
              <Flame className="w-16 h-16 text-orange-500 mb-2" />
              <div className="text-center">
                <div className="text-4xl text-gray-900 dark:text-gray-100">
                  {currentStreak}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                  {currentStreak === 1 ? 'day' : 'days'}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Progress to Next Milestone */}
        {nextMilestone && (
          <div className="mt-4">
            <div className="flex items-center justify-between text-xs text-gray-600 dark:text-gray-400 mb-2">
              <span>Next: {nextMilestone.title}</span>
              <span>{currentStreak}/{nextMilestone.days} days</span>
            </div>
            <Progress value={progressToNext} className="h-2" />
            <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">
              {nextMilestone.days - currentStreak} days until +{nextMilestone.points} points!
            </p>
          </div>
        )}
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-3 divide-x divide-gray-200 dark:divide-slate-700 border-b border-gray-200 dark:border-slate-700">
        <button
          onClick={() => setShowMilestones(!showMilestones)}
          className="p-4 text-center hover:bg-gray-50 dark:hover:bg-slate-700/50 transition-colors focus:outline-none focus:ring-2 focus:ring-inset focus:ring-evergreen"
        >
          <div className="flex items-center justify-center space-x-1 text-gray-900 dark:text-gray-100 mb-1">
            <Trophy className="w-4 h-4 text-sun-amber" />
            <span className="text-lg">{longestStreak}</span>
          </div>
          <div className="text-xs text-gray-600 dark:text-gray-400">Best</div>
        </button>

        <button
          onClick={() => setShowCalendar(!showCalendar)}
          className="p-4 text-center hover:bg-gray-50 dark:hover:bg-slate-700/50 transition-colors focus:outline-none focus:ring-2 focus:ring-inset focus:ring-evergreen"
        >
          <div className="flex items-center justify-center space-x-1 text-gray-900 dark:text-gray-100 mb-1">
            <Calendar className="w-4 h-4 text-sky-blue" />
            <span className="text-lg">{totalActiveDays}</span>
          </div>
          <div className="text-xs text-gray-600 dark:text-gray-400">Total Days</div>
        </button>

        <div className="p-4 text-center relative group">
          <div className="flex items-center justify-center space-x-1 text-gray-900 dark:text-gray-100 mb-1">
            <Award className="w-4 h-4 text-evergreen" />
            <span className="text-lg">{milestonesReached.length}</span>
          </div>
          <div className="text-xs text-gray-600 dark:text-gray-400">Milestones</div>
          
          {/* Tooltip */}
          <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 bg-gray-900 dark:bg-slate-700 text-white text-xs rounded whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
            {milestonesReached.length === 0 
              ? 'No milestones yet' 
              : milestonesReached.map(d => `${d} days`).join(', ')}
          </div>
        </div>
      </div>

      {/* Milestones Grid */}
      {showMilestones && (
        <div className="p-6 border-b border-gray-200 dark:border-slate-700 bg-gray-50 dark:bg-slate-900/50">
          <h4 className="text-sm text-gray-900 dark:text-gray-100 mb-4">Streak Milestones</h4>
          <div className="grid grid-cols-2 gap-3">
            {MILESTONES.map((milestone) => {
              const isReached = milestonesReached.includes(milestone.days);
              const isCurrent = nextMilestone?.days === milestone.days;
              const MilestoneIcon = milestone.icon;
              
              return (
                <div
                  key={milestone.days}
                  className={`p-3 rounded-lg border-2 transition-all ${
                    isReached
                      ? 'border-success bg-success/10 dark:bg-success/5'
                      : isCurrent
                      ? 'border-sun-amber bg-sun-amber/10 dark:bg-sun-amber/5 ring-2 ring-sun-amber/20'
                      : 'border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-800 opacity-60'
                  }`}
                >
                  <div className="flex items-start justify-between mb-2">
                    <MilestoneIcon 
                      className={`w-5 h-5 ${
                        isReached ? 'text-success' : isCurrent ? 'text-sun-amber' : 'text-gray-400'
                      }`}
                    />
                    {isReached && (
                      <div className="w-5 h-5 bg-success rounded-full flex items-center justify-center">
                        <span className="text-white text-xs">✓</span>
                      </div>
                    )}
                  </div>
                  <div className="text-sm text-gray-900 dark:text-gray-100 mb-1">
                    {milestone.title}
                  </div>
                  <div className="text-xs text-gray-600 dark:text-gray-400 mb-2">
                    {milestone.days} days
                  </div>
                  <div className="text-xs text-sun-amber">
                    +{milestone.points} points
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Activity Calendar */}
      {showCalendar && (
        <div className="p-6 border-b border-gray-200 dark:border-slate-700">
          <ActivityCalendar
            activityHistory={activityHistory}
            currentMonth={currentMonth}
            onMonthChange={setCurrentMonth}
          />
        </div>
      )}

      {/* Streak Saver */}
      <div className="p-4 bg-gradient-to-br from-blue-50 to-sky-50 dark:from-blue-950/20 dark:to-sky-950/20">
        <div className="flex items-start space-x-3">
          <div className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 ${
            streakSaverAvailable 
              ? 'bg-blue-100 dark:bg-blue-900/30' 
              : 'bg-gray-100 dark:bg-slate-700'
          }`}>
            <Shield className={`w-5 h-5 ${
              streakSaverAvailable ? 'text-blue-600 dark:text-blue-400' : 'text-gray-400'
            }`} />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between mb-1">
              <h4 className="text-sm text-gray-900 dark:text-gray-100">Streak Saver</h4>
              {streakSaverAvailable ? (
                <span className="text-xs px-2 py-0.5 bg-success/10 text-success rounded-full">
                  Available
                </span>
              ) : (
                <span className="text-xs px-2 py-0.5 bg-gray-200 dark:bg-slate-700 text-gray-600 dark:text-gray-400 rounded-full">
                  Used
                </span>
              )}
            </div>
            <p className="text-xs text-gray-600 dark:text-gray-400 mb-3">
              {streakSaverAvailable 
                ? 'Miss a day? Use this to protect your streak! Resets monthly.'
                : 'Already used this month. Resets on the 1st.'}
            </p>
            {streakSaverAvailable && (
              <button
                onClick={handleUseStreakSaver}
                className="text-xs px-3 py-1.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-600"
              >
                Use Streak Saver
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Footer - Motivation */}
      <div className="p-4 bg-gray-50 dark:bg-slate-900/50 text-center">
        <p className="text-xs text-gray-600 dark:text-gray-400">
          {getMotivationalMessage(currentStreak, nextMilestone)}
        </p>
      </div>
    </div>
  );
}

/**
 * Activity Calendar Component
 * Shows monthly view of activity days
 */
interface ActivityCalendarProps {
  activityHistory: ActivityDay[];
  currentMonth: Date;
  onMonthChange: (date: Date) => void;
}

function ActivityCalendar({ activityHistory, currentMonth, onMonthChange }: ActivityCalendarProps) {
  const monthName = currentMonth.toLocaleString('default', { month: 'long', year: 'numeric' });
  
  // Generate calendar days
  const firstDay = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), 1);
  const lastDay = new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 0);
  const startingDayOfWeek = firstDay.getDay();
  const daysInMonth = lastDay.getDate();
  
  const calendarDays: (Date | null)[] = [];
  
  // Add empty slots for days before month starts
  for (let i = 0; i < startingDayOfWeek; i++) {
    calendarDays.push(null);
  }
  
  // Add actual days
  for (let day = 1; day <= daysInMonth; day++) {
    calendarDays.push(new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day));
  }
  
  // Create activity map
  const activityMap = new Map<string, ActivityDay>();
  activityHistory.forEach(activity => {
    activityMap.set(activity.date, activity);
  });
  
  const goToPreviousMonth = () => {
    onMonthChange(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1));
  };
  
  const goToNextMonth = () => {
    onMonthChange(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1));
  };

  return (
    <div>
      {/* Month Navigation */}
      <div className="flex items-center justify-between mb-4">
        <button
          onClick={goToPreviousMonth}
          className="p-2 hover:bg-gray-100 dark:hover:bg-slate-700 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-evergreen"
          aria-label="Previous month"
        >
          <ChevronLeft className="w-4 h-4 text-gray-600 dark:text-gray-400" />
        </button>
        
        <h4 className="text-sm text-gray-900 dark:text-gray-100">{monthName}</h4>
        
        <button
          onClick={goToNextMonth}
          className="p-2 hover:bg-gray-100 dark:hover:bg-slate-700 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-evergreen"
          aria-label="Next month"
        >
          <ChevronRight className="w-4 h-4 text-gray-600 dark:text-gray-400" />
        </button>
      </div>

      {/* Day Labels */}
      <div className="grid grid-cols-7 gap-1 mb-2">
        {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((day, i) => (
          <div key={i} className="text-center text-xs text-gray-500 dark:text-gray-400 py-1">
            {day}
          </div>
        ))}
      </div>

      {/* Calendar Grid */}
      <div className="grid grid-cols-7 gap-1">
        {calendarDays.map((day, index) => {
          if (!day) {
            return <div key={`empty-${index}`} className="aspect-square" />;
          }
          
          const dateStr = day.toISOString().split('T')[0];
          const activity = activityMap.get(dateStr);
          const hasActivity = activity?.hasActivity || false;
          const isToday = dateStr === new Date().toISOString().split('T')[0];
          const isFuture = day > new Date();
          
          const activityLevel = activity 
            ? activity.activityCount > 10 
              ? 'high' 
              : activity.activityCount > 5 
                ? 'medium' 
                : 'low'
            : 'none';
          
          return (
            <div
              key={dateStr}
              className={`aspect-square rounded flex items-center justify-center text-xs relative group ${
                isFuture
                  ? 'bg-gray-50 dark:bg-slate-900 text-gray-300 dark:text-gray-600'
                  : hasActivity
                    ? activityLevel === 'high'
                      ? 'bg-evergreen text-white'
                      : activityLevel === 'medium'
                        ? 'bg-evergreen/60 text-white'
                        : 'bg-evergreen/30 text-gray-900 dark:text-gray-100'
                    : 'bg-gray-100 dark:bg-slate-800 text-gray-600 dark:text-gray-400'
              } ${isToday ? 'ring-2 ring-sun-amber ring-offset-1' : ''}`}
            >
              {day.getDate()}
              
              {/* Tooltip on hover */}
              {activity && (
                <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 bg-gray-900 dark:bg-slate-700 text-white text-xs rounded whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10">
                  {activity.activityCount} activities • {activity.pointsEarned} pts
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Legend */}
      <div className="flex items-center justify-center space-x-4 mt-4 text-xs text-gray-600 dark:text-gray-400">
        <div className="flex items-center space-x-1">
          <div className="w-3 h-3 bg-gray-100 dark:bg-slate-800 rounded" />
          <span>No activity</span>
        </div>
        <div className="flex items-center space-x-1">
          <div className="w-3 h-3 bg-evergreen/30 rounded" />
          <span>Low</span>
        </div>
        <div className="flex items-center space-x-1">
          <div className="w-3 h-3 bg-evergreen/60 rounded" />
          <span>Med</span>
        </div>
        <div className="flex items-center space-x-1">
          <div className="w-3 h-3 bg-evergreen rounded" />
          <span>High</span>
        </div>
      </div>
    </div>
  );
}

/**
 * Generate mock activity history for demonstration
 * In production, this would come from Salesforce
 */
function generateMockActivityHistory(): ActivityDay[] {
  const history: ActivityDay[] = [];
  const today = new Date();
  
  // Generate last 60 days of activity
  for (let i = 0; i < 60; i++) {
    const date = new Date(today);
    date.setDate(date.getDate() - i);
    
    // 80% chance of activity on weekdays, 50% on weekends
    const isWeekend = date.getDay() === 0 || date.getDay() === 6;
    const hasActivity = Math.random() > (isWeekend ? 0.5 : 0.2);
    
    if (hasActivity) {
      history.push({
        date: date.toISOString().split('T')[0],
        activityCount: Math.floor(Math.random() * 15) + 1,
        pointsEarned: Math.floor(Math.random() * 100) + 20,
        hasActivity: true,
      });
    }
  }
  
  return history;
}

/**
 * Get motivational message based on current streak
 */
function getMotivationalMessage(currentStreak: number, nextMilestone?: Milestone): string {
  if (!nextMilestone) {
    return "🏆 You've reached all milestones! You're a legend!";
  }
  
  const daysToNext = nextMilestone.days - currentStreak;
  
  if (currentStreak === 0) {
    return "Start your learning journey today! 🚀";
  } else if (currentStreak === 1) {
    return "Great start! Come back tomorrow to build your streak 🔥";
  } else if (daysToNext === 1) {
    return `Just 1 day until ${nextMilestone.title}! You got this! 💪`;
  } else if (daysToNext <= 3) {
    return `${daysToNext} days until ${nextMilestone.title}! Keep going! 🎯`;
  } else if (currentStreak >= 7) {
    return `${currentStreak} days strong! You're building great habits! ⭐`;
  } else {
    return `Keep it up! ${daysToNext} days until ${nextMilestone.title} 🌟`;
  }
}

export default StreakTracker;
