/**
 * DAILY CHALLENGES - Engagement Driver
 * 
 * Short-term engagement hooks with daily, weekly, and monthly challenges.
 * Drives regular platform usage and provides quick wins.
 * 
 * GAP #33: No Daily/Weekly Challenges
 * Priority: HIGH - Quick Win
 * Value: High Engagement
 */

import React, { useState } from 'react';
import {
  Target,
  Calendar,
  Trophy,
  Flame,
  CheckCircle,
  Circle,
  ChevronRight,
  Zap,
  Clock,
} from 'lucide-react';
import { toast } from 'sonner@2.0.3';

export interface DailyChallengesProps {
  onNavigate: (page: string) => void;
  currentStreak?: number;
  completedToday?: string[];
}

interface Challenge {
  id: string;
  title: string;
  description: string;
  points: number;
  type: 'daily' | 'weekly' | 'monthly';
  difficulty: 'easy' | 'medium' | 'hard';
  action: string;
  page?: string;
  completed: boolean;
  expiresIn?: string;
}

export function DailyChallenges({
  onNavigate,
  currentStreak = 3,
  completedToday = [],
}: DailyChallengesProps) {
  
  const [challenges] = useState<Challenge[]>([
    // Daily Challenges
    {
      id: 'daily-mission',
      title: 'Complete One Mission',
      description: 'Finish any trail mission today',
      points: 10,
      type: 'daily',
      difficulty: 'easy',
      action: 'Go to Trails',
      page: 'trail-missions',
      completed: completedToday.includes('daily-mission'),
      expiresIn: '6h 23m',
    },
    {
      id: 'daily-community',
      title: 'Help a Peer',
      description: 'Answer a question in Community',
      points: 15,
      type: 'daily',
      difficulty: 'medium',
      action: 'Visit Community',
      page: 'community',
      completed: completedToday.includes('daily-community'),
      expiresIn: '6h 23m',
    },
    {
      id: 'daily-penny',
      title: 'Chat with Penny',
      description: 'Ask Penny AI a question',
      points: 5,
      type: 'daily',
      difficulty: 'easy',
      action: 'Open Penny',
      completed: completedToday.includes('daily-penny'),
      expiresIn: '6h 23m',
    },
    
    // Weekly Challenges
    {
      id: 'weekly-projects',
      title: 'Work on Capstone',
      description: 'Make progress on your capstone project',
      points: 50,
      type: 'weekly',
      difficulty: 'medium',
      action: 'View Projects',
      page: 'capstone-projects',
      completed: completedToday.includes('weekly-projects'),
      expiresIn: '3d 6h',
    },
    {
      id: 'weekly-portfolio',
      title: 'Update Portfolio',
      description: 'Add a new project or update your resume',
      points: 40,
      type: 'weekly',
      difficulty: 'medium',
      action: 'Edit Portfolio',
      page: 'portfolio',
      completed: completedToday.includes('weekly-portfolio'),
      expiresIn: '3d 6h',
    },
    
    // Monthly Challenge
    {
      id: 'monthly-mastery',
      title: 'Complete a Trail Module',
      description: 'Finish one module in Trail of Mastery',
      points: 100,
      type: 'monthly',
      difficulty: 'hard',
      action: 'View Trails',
      page: 'trail-mastery',
      completed: completedToday.includes('monthly-mastery'),
      expiresIn: '12d 8h',
    },
  ]);

  const dailyChallenges = challenges.filter(c => c.type === 'daily');
  const weeklyChallenges = challenges.filter(c => c.type === 'weekly');
  const monthlyChallenges = challenges.filter(c => c.type === 'monthly');

  const dailyCompleted = dailyChallenges.filter(c => c.completed).length;
  const weeklyCompleted = weeklyChallenges.filter(c => c.completed).length;
  const monthlyCompleted = monthlyChallenges.filter(c => c.completed).length;

  const totalPointsAvailable = challenges.reduce((sum, c) => sum + c.points, 0);
  const pointsEarned = challenges.filter(c => c.completed).reduce((sum, c) => sum + c.points, 0);

  const handleChallengeClick = (challenge: Challenge) => {
    if (challenge.completed) {
      toast.success('Already completed!');
      return;
    }

    if (challenge.page) {
      onNavigate(challenge.page);
    } else {
      toast.info(`Starting: ${challenge.title}`);
    }
  };

  const difficultyColors = {
    easy: 'text-success',
    medium: 'text-warning',
    hard: 'text-error',
  };

  const typeColors = {
    daily: 'bg-sky-blue/10 text-sky-blue border-sky-blue/20',
    weekly: 'bg-sun-amber/10 text-sun-amber border-sun-amber/20',
    monthly: 'bg-evergreen/10 text-evergreen border-evergreen/20',
  };

  return (
    <div className="bg-white dark:bg-slate-800 rounded-xl p-6 border border-gray-200 dark:border-slate-700">
      {/* Header */}
      <div className="flex items-start justify-between mb-6">
        <div>
          <h3 className="text-gray-900 dark:text-gray-100 mb-1">Daily Challenges</h3>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Complete challenges to earn bonus points
          </p>
        </div>
        
        <div className="flex items-center space-x-2 px-3 py-1.5 bg-sun-amber/10 text-sun-amber rounded-lg border border-sun-amber/20">
          <Trophy className="w-4 h-4" />
          <span className="text-sm">{pointsEarned}/{totalPointsAvailable} pts</span>
        </div>
      </div>

      {/* Streak Counter */}
      <div className="mb-6 p-4 bg-gradient-to-r from-sun-amber/10 to-warning/10 border border-sun-amber/20 rounded-lg">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-sun-amber text-white rounded-full flex items-center justify-center">
              <Flame className="w-6 h-6" />
            </div>
            <div>
              <div className="text-xs text-gray-500 dark:text-gray-400">Current Streak</div>
              <div className="text-gray-900 dark:text-gray-100">{currentStreak} days 🔥</div>
            </div>
          </div>
          <div className="text-right">
            <div className="text-xs text-gray-500 dark:text-gray-400">Next Milestone</div>
            <div className="text-sm text-sun-amber">7 days (+50 pts)</div>
          </div>
        </div>
      </div>

      {/* Daily Challenges */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center space-x-2">
            <Zap className="w-4 h-4 text-sky-blue" />
            <h4 className="text-sm text-gray-900 dark:text-gray-100">Today</h4>
          </div>
          <span className="text-xs text-gray-500 dark:text-gray-400">
            {dailyCompleted}/{dailyChallenges.length} complete
          </span>
        </div>
        
        <div className="space-y-2">
          {dailyChallenges.map((challenge) => (
            <ChallengeCard
              key={challenge.id}
              challenge={challenge}
              onClick={() => handleChallengeClick(challenge)}
              difficultyColor={difficultyColors[challenge.difficulty]}
              typeColor={typeColors[challenge.type]}
            />
          ))}
        </div>
      </div>

      {/* Weekly Challenges */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center space-x-2">
            <Calendar className="w-4 h-4 text-sun-amber" />
            <h4 className="text-sm text-gray-900 dark:text-gray-100">This Week</h4>
          </div>
          <span className="text-xs text-gray-500 dark:text-gray-400">
            {weeklyCompleted}/{weeklyChallenges.length} complete
          </span>
        </div>
        
        <div className="space-y-2">
          {weeklyChallenges.map((challenge) => (
            <ChallengeCard
              key={challenge.id}
              challenge={challenge}
              onClick={() => handleChallengeClick(challenge)}
              difficultyColor={difficultyColors[challenge.difficulty]}
              typeColor={typeColors[challenge.type]}
            />
          ))}
        </div>
      </div>

      {/* Monthly Challenges */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center space-x-2">
            <Target className="w-4 h-4 text-evergreen" />
            <h4 className="text-sm text-gray-900 dark:text-gray-100">This Month</h4>
          </div>
          <span className="text-xs text-gray-500 dark:text-gray-400">
            {monthlyCompleted}/{monthlyChallenges.length} complete
          </span>
        </div>
        
        <div className="space-y-2">
          {monthlyChallenges.map((challenge) => (
            <ChallengeCard
              key={challenge.id}
              challenge={challenge}
              onClick={() => handleChallengeClick(challenge)}
              difficultyColor={difficultyColors[challenge.difficulty]}
              typeColor={typeColors[challenge.type]}
            />
          ))}
        </div>
      </div>

      {/* Bonus Tip */}
      <div className="mt-6 pt-6 border-t border-gray-200 dark:border-slate-700">
        <div className="flex items-start space-x-3 text-xs text-gray-600 dark:text-gray-400">
          <Flame className="w-4 h-4 text-sun-amber flex-shrink-0 mt-0.5" />
          <p>
            Keep your streak alive! Complete at least one challenge per day to maintain momentum
            and earn streak milestone bonuses.
          </p>
        </div>
      </div>
    </div>
  );
}

interface ChallengeCardProps {
  challenge: Challenge;
  onClick: () => void;
  difficultyColor: string;
  typeColor: string;
}

function ChallengeCard({ challenge, onClick, difficultyColor, typeColor }: ChallengeCardProps) {
  return (
    <button
      onClick={onClick}
      disabled={challenge.completed}
      className={`w-full text-left p-3 rounded-lg border transition-all ${
        challenge.completed
          ? 'bg-success/5 border-success/20 opacity-75'
          : 'bg-gray-50 dark:bg-slate-900/50 border-gray-200 dark:border-slate-700 hover:border-gray-300 dark:hover:border-slate-600 hover:shadow-sm'
      } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-evergreen`}
    >
      <div className="flex items-start space-x-3">
        {/* Status Icon */}
        <div className="flex-shrink-0 mt-0.5">
          {challenge.completed ? (
            <CheckCircle className="w-5 h-5 text-success" aria-label="Completed" />
          ) : (
            <Circle className="w-5 h-5 text-gray-300 dark:text-gray-600" aria-label="Not Started" />
          )}
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between mb-1">
            <h5 className="text-sm text-gray-900 dark:text-gray-100">{challenge.title}</h5>
            <span className="flex-shrink-0 text-xs px-2 py-0.5 bg-sun-amber/10 text-sun-amber rounded-full ml-2">
              +{challenge.points}
            </span>
          </div>
          
          <p className="text-xs text-gray-600 dark:text-gray-400 mb-2">
            {challenge.description}
          </p>
          
          <div className="flex items-center space-x-2">
            {challenge.expiresIn && !challenge.completed && (
              <div className="flex items-center space-x-1 text-xs text-gray-500 dark:text-gray-500">
                <Clock className="w-3 h-3" />
                <span>{challenge.expiresIn}</span>
              </div>
            )}
            
            {!challenge.completed && (
              <div className="flex items-center space-x-1 text-xs text-gray-700 dark:text-gray-300">
                <ChevronRight className="w-3 h-3" />
                <span>{challenge.action}</span>
              </div>
            )}
            
            {challenge.completed && (
              <span className="text-xs text-success">✓ Completed</span>
            )}
          </div>
        </div>
      </div>
    </button>
  );
}

export default DailyChallenges;
