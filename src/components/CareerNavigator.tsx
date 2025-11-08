/**
 * CAREER NAVIGATOR - Visual Learning Journey Map
 * 
 * Displays learner's complete journey from start to Expert level
 * with milestones, next steps, and progress visualization.
 * 
 * GAP #1: No Visual Learning Journey Map
 * Priority: HIGH - Quick Win
 * Value: High Engagement + High Retention
 */

import React from 'react';
import {
  Target,
  CheckCircle,
  Circle,
  Lock,
  TrendingUp,
  Award,
  Briefcase,
  GraduationCap,
  ChevronRight,
  Sparkles,
} from 'lucide-react';
import { SectionHeader } from './SectionHeader';

export interface CareerNavigatorProps {
  currentLevel: string;
  completedMilestones: string[];
  currentMilestone?: string;
  totalPoints: number;
  certificationsEarned: number;
  onNavigate: (page: string) => void;
}

interface Milestone {
  id: string;
  title: string;
  description: string;
  icon: typeof Target;
  points: number;
  status: 'completed' | 'current' | 'locked';
  action?: string;
  page?: string;
}

export function CareerNavigator({
  currentLevel = 'Explorer',
  completedMilestones = [],
  currentMilestone = 'trail-missions',
  totalPoints = 450,
  certificationsEarned = 0,
  onNavigate,
}: CareerNavigatorProps) {
  
  const milestones: Milestone[] = [
    {
      id: 'skills-assessment',
      title: 'Skills Discovery',
      description: 'Complete initial skills assessment',
      icon: Target,
      points: 0,
      status: completedMilestones.includes('skills-assessment') ? 'completed' : 
              currentMilestone === 'skills-assessment' ? 'current' : 'locked',
      action: 'Start Assessment',
      page: 'skills-assessment',
    },
    {
      id: 'trail-missions',
      title: '12-Week Trail',
      description: 'Complete guided learning path',
      icon: TrendingUp,
      points: 1200,
      status: completedMilestones.includes('trail-missions') ? 'completed' :
              currentMilestone === 'trail-missions' ? 'current' : 'locked',
      action: 'Continue Trail',
      page: 'trail-missions',
    },
    {
      id: 'trail-mastery',
      title: 'Trail of Mastery',
      description: 'Choose professional specialization',
      icon: Award,
      points: 500,
      status: completedMilestones.includes('trail-mastery') ? 'completed' :
              currentMilestone === 'trail-mastery' ? 'current' : 'locked',
      action: 'Start Mastery',
      page: 'trail-mastery',
    },
    {
      id: 'capstone-project',
      title: 'Capstone Project',
      description: 'Build real-world solution',
      icon: Briefcase,
      points: 800,
      status: completedMilestones.includes('capstone-project') ? 'completed' :
              currentMilestone === 'capstone-project' ? 'current' : 'locked',
      action: 'View Projects',
      page: 'capstone-projects',
    },
    {
      id: 'certification',
      title: 'Certification',
      description: 'Earn Salesforce certification',
      icon: GraduationCap,
      points: 1000,
      status: completedMilestones.includes('certification') ? 'completed' :
              currentMilestone === 'certification' ? 'current' : 'locked',
      action: 'Start Prep',
      page: 'learning-center',
    },
  ];

  const completedCount = milestones.filter(m => m.status === 'completed').length;
  const progressPercent = Math.round((completedCount / milestones.length) * 100);
  const estimatedWeeks = Math.max(0, 16 - (completedCount * 3));

  const nextMilestone = milestones.find(m => m.status === 'current' || m.status === 'locked');

  return (
    <div className="bg-white dark:bg-slate-800 rounded-xl p-6 border border-gray-200 dark:border-slate-700">
      {/* Header */}
      <div className="flex items-start justify-between mb-6">
        <SectionHeader
          title="Your Career Journey"
          description={`${currentLevel} Level • ${completedCount}/${milestones.length} milestones complete`}
          icon={Sparkles}
          level="h3"
        />
        
        {estimatedWeeks > 0 && (
          <div className="text-right">
            <div className="text-xs text-gray-500 dark:text-gray-400">Est. Time Remaining</div>
            <div className="text-evergreen">{estimatedWeeks} weeks</div>
          </div>
        )}
      </div>

      {/* Progress Bar */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm text-gray-600 dark:text-gray-400">Overall Progress</span>
          <span className="text-sm text-gray-900 dark:text-gray-100">{progressPercent}%</span>
        </div>
        <div className="h-3 bg-gray-200 dark:bg-slate-700 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-evergreen to-penny-guide transition-all duration-500"
            style={{ width: `${progressPercent}%` }}
            role="progressbar"
            aria-valuenow={progressPercent}
            aria-valuemin={0}
            aria-valuemax={100}
            aria-label={`Career progress: ${progressPercent}%`}
          />
        </div>
      </div>

      {/* Milestones Timeline */}
      <div className="space-y-4 mb-6">
        {milestones.map((milestone, index) => {
          const Icon = milestone.icon;
          const isLast = index === milestones.length - 1;

          return (
            <div key={milestone.id} className="relative">
              {/* Connector Line */}
              {!isLast && (
                <div
                  className={`absolute left-5 top-12 w-0.5 h-12 ${
                    milestone.status === 'completed'
                      ? 'bg-success'
                      : 'bg-gray-200 dark:bg-slate-700'
                  }`}
                  aria-hidden="true"
                />
              )}

              {/* Milestone Card */}
              <div
                className={`relative flex items-start space-x-4 p-4 rounded-lg transition-all ${
                  milestone.status === 'completed'
                    ? 'bg-success/5 border border-success/20'
                    : milestone.status === 'current'
                    ? 'bg-sun-amber/5 border border-sun-amber/20 ring-2 ring-sun-amber/30'
                    : 'bg-gray-50 dark:bg-slate-900/50 border border-gray-200 dark:border-slate-700'
                }`}
              >
                {/* Icon */}
                <div
                  className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center ${
                    milestone.status === 'completed'
                      ? 'bg-success text-white'
                      : milestone.status === 'current'
                      ? 'bg-sun-amber text-white'
                      : 'bg-gray-300 dark:bg-slate-700 text-gray-500 dark:text-gray-400'
                  }`}
                >
                  {milestone.status === 'completed' ? (
                    <CheckCircle className="w-5 h-5" aria-label="Completed" />
                  ) : milestone.status === 'locked' ? (
                    <Lock className="w-5 h-5" aria-label="Locked" />
                  ) : (
                    <Icon className="w-5 h-5" aria-label="In Progress" />
                  )}
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between">
                    <div>
                      <h4 className="text-gray-900 dark:text-gray-100 text-sm mb-1">
                        {milestone.title}
                      </h4>
                      <p className="text-xs text-gray-600 dark:text-gray-400">
                        {milestone.description}
                      </p>
                    </div>
                    
                    {milestone.points > 0 && (
                      <span className="flex-shrink-0 text-xs px-2 py-1 bg-sun-amber/10 text-sun-amber rounded-full ml-2">
                        +{milestone.points} pts
                      </span>
                    )}
                  </div>

                  {/* Action Button */}
                  {milestone.status !== 'locked' && milestone.action && milestone.page && (
                    <button
                      onClick={() => onNavigate(milestone.page!)}
                      className={`mt-3 text-xs px-3 py-1.5 rounded-lg transition-colors flex items-center space-x-1 ${
                        milestone.status === 'current'
                          ? 'bg-sun-amber text-white hover:bg-sun-amber-dark'
                          : 'bg-gray-200 dark:bg-slate-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-slate-600'
                      } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-evergreen`}
                    >
                      <span>{milestone.action}</span>
                      <ChevronRight className="w-3 h-3" />
                    </button>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Next Steps Card */}
      {nextMilestone && (
        <div className="bg-gradient-to-r from-evergreen/10 to-penny-guide/10 border border-evergreen/20 rounded-lg p-4">
          <div className="flex items-start space-x-3">
            <div className="flex-shrink-0 w-8 h-8 bg-evergreen text-white rounded-full flex items-center justify-center">
              <Target className="w-4 h-4" />
            </div>
            <div className="flex-1">
              <h4 className="text-sm text-gray-900 dark:text-gray-100 mb-1">
                Next: {nextMilestone.title}
              </h4>
              <p className="text-xs text-gray-600 dark:text-gray-400 mb-3">
                {nextMilestone.description}
              </p>
              {nextMilestone.page && (
                <button
                  onClick={() => onNavigate(nextMilestone.page!)}
                  className="text-xs px-4 py-2 bg-evergreen text-white rounded-lg hover:bg-evergreen-dark transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-evergreen"
                >
                  Get Started →
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Stats Footer */}
      <div className="mt-6 pt-6 border-t border-gray-200 dark:border-slate-700">
        <div className="grid grid-cols-3 gap-4 text-center">
          <div>
            <div className="text-xs text-gray-500 dark:text-gray-400 mb-1">Total Points</div>
            <div className="text-sun-amber">{totalPoints.toLocaleString()}</div>
          </div>
          <div>
            <div className="text-xs text-gray-500 dark:text-gray-400 mb-1">Certifications</div>
            <div className="text-success">{certificationsEarned}</div>
          </div>
          <div>
            <div className="text-xs text-gray-500 dark:text-gray-400 mb-1">Level</div>
            <div className="text-evergreen">{currentLevel}</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CareerNavigator;
