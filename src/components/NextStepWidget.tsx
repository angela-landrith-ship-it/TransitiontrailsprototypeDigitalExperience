/**
 * NEXT STEP WIDGET
 * 
 * Recommends optimal activities to help user advance to next level.
 * AI-powered suggestions based on current progress and available activities.
 * 
 * =============================================================================
 * SALESFORCE INTEGRATION
 * =============================================================================
 * 
 * Apex Class: PennyRecommendationEngine.cls
 * Method: getRecommendations(Id userId)
 * 
 * Returns top 3 activities ranked by:
 * - Points/effort ratio
 * - User's current permissions
 * - Activity availability
 * - Proximity to level goal
 * 
 * =============================================================================
 */

import { useState } from 'react';
import { 
  ArrowRight, 
  BookOpen, 
  Trophy, 
  Users, 
  Calendar,
  Target,
  Zap,
  Clock,
  TrendingUp,
  Sparkles,
  ChevronRight
} from 'lucide-react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Progress } from './ui/progress';
import { Badge } from './ui/badge';
import type { LucideIcon } from 'lucide-react';

export interface NextStepRecommendation {
  id: string;
  title: string;
  description: string;
  pointsAwarded: number;
  icon: LucideIcon;
  iconColor: string;
  ctaText: string;
  ctaAction: () => void;
  difficulty: 'easy' | 'medium' | 'hard';
  estimatedTime: string;
  category: 'learning' | 'project' | 'community' | 'event';
}

interface NextStepWidgetProps {
  recommendations: NextStepRecommendation[];
  currentLevel: string;
  pointsToNext: number;
  progressPercentage: number;
  onSelectRecommendation: (recommendation: NextStepRecommendation) => void;
}

export function NextStepWidget({
  recommendations,
  currentLevel,
  pointsToNext,
  progressPercentage,
  onSelectRecommendation
}: NextStepWidgetProps) {
  const [selectedRec, setSelectedRec] = useState<string | null>(null);

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return 'bg-green-100 text-green-700 border-green-200';
      case 'medium': return 'bg-amber-100 text-amber-700 border-amber-200';
      case 'hard': return 'bg-red-100 text-red-700 border-red-200';
      default: return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'learning': return '#5B89A6'; // Sky Blue
      case 'project': return '#2F6B4E'; // Evergreen
      case 'community': return '#F59E33'; // Amber
      case 'event': return '#2C6975'; // Teal
      default: return '#9CA3AF';
    }
  };

  return (
    <Card className="p-6 bg-gradient-to-br from-white to-sky-blue/5">
      {/* Header */}
      <div className="flex items-center gap-3 mb-4">
        <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-sun-amber to-amber-600 flex items-center justify-center shadow-md">
          <Sparkles className="w-6 h-6 text-white" />
        </div>
        <div className="flex-1">
          <h3 className="text-gray-900 mb-1">Your Next Milestone</h3>
          <p className="text-sm text-gray-600">
            {pointsToNext} points to reach the next level
          </p>
        </div>
      </div>

      {/* Progress to Next Level */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm text-gray-700">Progress to Next Level</span>
          <span className="text-sm text-evergreen">{Math.round(progressPercentage)}%</span>
        </div>
        <Progress value={progressPercentage} className="h-2" />
      </div>

      {/* Recommendations */}
      <div className="space-y-3">
        <h4 className="text-sm text-gray-700 flex items-center gap-2">
          <Target className="w-4 h-4 text-amber-600" />
          Recommended for You
        </h4>

        {recommendations.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            <TrendingUp className="w-12 h-12 mx-auto mb-3 opacity-30" />
            <p className="text-sm">No recommendations available right now.</p>
            <p className="text-xs mt-1">Check back soon for new opportunities!</p>
          </div>
        ) : (
          recommendations.map((rec, index) => {
            const Icon = rec.icon;
            const isSelected = selectedRec === rec.id;

            return (
              <button
                key={rec.id}
                onClick={() => {
                  setSelectedRec(rec.id);
                  setTimeout(() => {
                    onSelectRecommendation(rec);
                    rec.ctaAction();
                  }, 200);
                }}
                className={`w-full text-left p-4 rounded-lg border-2 transition-all hover:shadow-md ${
                  isSelected 
                    ? 'border-amber-400 bg-amber-50 shadow-md' 
                    : 'border-gray-200 bg-white hover:border-gray-300'
                }`}
              >
                <div className="flex items-start gap-3">
                  {/* Icon */}
                  <div 
                    className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0"
                    style={{ backgroundColor: `${rec.iconColor}20` }}
                  >
                    <Icon className="w-5 h-5" style={{ color: rec.iconColor }} />
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2 mb-1">
                      <h5 className="text-sm text-gray-900 group-hover:text-evergreen transition-colors">
                        {rec.title}
                      </h5>
                      <span className="text-sm text-amber-600 flex-shrink-0">
                        +{rec.pointsAwarded} pts
                      </span>
                    </div>
                    
                    <p className="text-xs text-gray-600 mb-3 line-clamp-2">
                      {rec.description}
                    </p>

                    {/* Metadata */}
                    <div className="flex items-center gap-2 flex-wrap">
                      <Badge 
                        variant="outline" 
                        className={`text-xs px-2 py-0.5 ${getDifficultyColor(rec.difficulty)}`}
                      >
                        {rec.difficulty.charAt(0).toUpperCase() + rec.difficulty.slice(1)}
                      </Badge>
                      <span className="text-xs text-gray-500 flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {rec.estimatedTime}
                      </span>
                      <span className="text-xs text-gray-500 capitalize">
                        {rec.category}
                      </span>
                    </div>
                  </div>

                  {/* Arrow */}
                  <ChevronRight 
                    className={`w-5 h-5 flex-shrink-0 transition-transform ${
                      isSelected ? 'translate-x-1' : ''
                    }`}
                    style={{ color: rec.iconColor }}
                  />
                </div>

                {/* Progress indicator if points will complete level */}
                {rec.pointsAwarded >= pointsToNext && (
                  <div className="mt-3 pt-3 border-t border-gray-200 flex items-center gap-2 text-xs text-green-700">
                    <Zap className="w-4 h-4" />
                    <span>This will advance you to the next level!</span>
                  </div>
                )}
              </button>
            );
          })
        )}
      </div>

      {/* Footer Encouragement */}
      <div className="mt-6 pt-4 border-t border-gray-200">
        <p className="text-xs text-gray-600 text-center">
          Complete any activity to earn points and level up faster! 🚀
        </p>
      </div>
    </Card>
  );
}

// Compact version for sidebar
export function NextStepWidgetCompact({
  recommendations,
  pointsToNext,
  onSelectRecommendation
}: Omit<NextStepWidgetProps, 'currentLevel' | 'progressPercentage'>) {
  if (recommendations.length === 0) return null;

  const topRec = recommendations[0];
  const Icon = topRec.icon;

  return (
    <Card className="p-4 bg-gradient-to-br from-amber-50 to-white border-2 border-amber-200">
      <div className="flex items-center gap-2 mb-3">
        <Sparkles className="w-4 h-4 text-amber-600" />
        <h4 className="text-sm text-gray-900">Quick Win</h4>
      </div>

      <button
        onClick={() => {
          onSelectRecommendation(topRec);
          topRec.ctaAction();
        }}
        className="w-full text-left p-3 rounded-lg bg-white border border-amber-200 hover:border-amber-400 hover:shadow-md transition-all"
      >
        <div className="flex items-start gap-3">
          <div 
            className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
            style={{ backgroundColor: `${topRec.iconColor}20` }}
          >
            <Icon className="w-4 h-4" style={{ color: topRec.iconColor }} />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm text-gray-900 mb-1 line-clamp-1">
              {topRec.title}
            </p>
            <div className="flex items-center gap-2">
              <span className="text-xs text-amber-600">
                +{topRec.pointsAwarded} pts
              </span>
              <span className="text-xs text-gray-500">•</span>
              <span className="text-xs text-gray-500">
                {topRec.estimatedTime}
              </span>
            </div>
          </div>
          <ArrowRight className="w-4 h-4 text-amber-600 flex-shrink-0 mt-1" />
        </div>
      </button>

      <p className="text-xs text-gray-600 mt-3 text-center">
        {pointsToNext} points to next level
      </p>
    </Card>
  );
}

// Generate mock recommendations (for development/testing)
export function generateMockRecommendations(
  currentPoints: number,
  pointsToNext: number
): NextStepRecommendation[] {
  const allRecommendations: NextStepRecommendation[] = [
    {
      id: '1',
      title: 'Complete Next Learning Module',
      description: 'Finish the Flow Builder module to earn 20 points and continue your learning path.',
      pointsAwarded: 20,
      icon: BookOpen,
      iconColor: '#5B89A6',
      ctaText: 'Start Module',
      ctaAction: () => console.log('Navigate to learning module'),
      difficulty: 'easy',
      estimatedTime: '45 min',
      category: 'learning'
    },
    {
      id: '2',
      title: 'Join a Partner Project',
      description: 'Apply your skills to a real nonprofit project and earn 25 points plus milestone bonuses.',
      pointsAwarded: 25,
      icon: Users,
      iconColor: '#2F6B4E',
      ctaText: 'Browse Projects',
      ctaAction: () => console.log('Navigate to partner board'),
      difficulty: 'medium',
      estimatedTime: '2-3 weeks',
      category: 'project'
    },
    {
      id: '3',
      title: 'Complete Capstone Phase 1',
      description: 'Finish the Problem Statement phase of your Capstone project to earn 50 points.',
      pointsAwarded: 50,
      icon: Target,
      iconColor: '#F59E33',
      ctaText: 'Continue Capstone',
      ctaAction: () => console.log('Navigate to capstone'),
      difficulty: 'medium',
      estimatedTime: '2 hours',
      category: 'project'
    },
    {
      id: '4',
      title: 'Attend Slack Community Event',
      description: 'Join the next standup or campfire session to connect with peers and earn 15 points.',
      pointsAwarded: 15,
      icon: Calendar,
      iconColor: '#2C6975',
      ctaText: 'View Events',
      ctaAction: () => console.log('Navigate to events'),
      difficulty: 'easy',
      estimatedTime: '30 min',
      category: 'event'
    },
    {
      id: '5',
      title: 'Make Your First Community Post',
      description: 'Share your learning journey or ask a question to earn 10 points and connect with others.',
      pointsAwarded: 10,
      icon: Users,
      iconColor: '#F59E33',
      ctaText: 'Post Now',
      ctaAction: () => console.log('Navigate to community'),
      difficulty: 'easy',
      estimatedTime: '10 min',
      category: 'community'
    },
    {
      id: '6',
      title: 'Register for TrailBuild Summit',
      description: 'Sign up for the upcoming 48-hour code-a-thon and earn 10 points now, 100+ points for participation.',
      pointsAwarded: 10,
      icon: Zap,
      iconColor: '#2C6975',
      ctaText: 'Register',
      ctaAction: () => console.log('Navigate to TrailBuild'),
      difficulty: 'easy',
      estimatedTime: '5 min',
      category: 'event'
    },
  ];

  // Filter and rank recommendations
  // Prioritize activities that get user closest to next level
  const ranked = allRecommendations
    .filter(rec => {
      // Basic availability logic (would be more complex in production)
      if (rec.id === '2' && currentPoints < 100) return false; // Partner projects need Explorer level
      return true;
    })
    .sort((a, b) => {
      // Prefer activities that exactly meet or slightly exceed points needed
      const aExcess = Math.abs(a.pointsAwarded - pointsToNext);
      const bExcess = Math.abs(b.pointsAwarded - pointsToNext);
      
      if (aExcess !== bExcess) return aExcess - bExcess;
      
      // If equal, prefer easier activities
      const difficultyScore = { easy: 1, medium: 2, hard: 3 };
      return difficultyScore[a.difficulty] - difficultyScore[b.difficulty];
    });

  return ranked.slice(0, 3);
}
