/**
 * PENNY AI RECOMMENDATIONS - Personalized Learning Paths
 * 
 * Analyzes learner skills, progress, and interests to recommend
 * personalized trails, events, resources, and certifications.
 * 
 * GAP #20: No AI-Driven Recommendations
 * Priority: 🔴 HIGH - Quick Win
 * Value: High Engagement + Retention
 * 
 * =============================================================================
 * SALESFORCE ARCHITECTURE MAPPING
 * =============================================================================
 * 
 * Objects Used:
 * - User (Current learner profile)
 * - Skills_Assessment__c (Skill levels and gaps)
 * - Trail__c (Completed and active trails)
 * - Trail_Module__c (Learning interests)
 * - Event__c (Upcoming events)
 * - Recommendation__c (Custom object to store AI recommendations)
 *   Fields: User__c, Type__c, Title__c, Reason__c, Confidence__c, 
 *           Action_Page__c, Dismissed__c, Clicked__c, Created_Date__c
 * 
 * Apex Controller: PennyRecommendationsController.cls
 * - getPersonalizedRecommendations(userId) → List<Recommendation__c>
 * - recordRecommendationClick(recommendationId) → void
 * - dismissRecommendation(recommendationId) → void
 * 
 * =============================================================================
 */

import React, { useState } from 'react';
import {
  Sparkles,
  TrendingUp,
  Calendar,
  BookOpen,
  Award,
  Target,
  ChevronRight,
  X,
  ThumbsUp,
  Info,
  Zap,
  Brain,
} from 'lucide-react';
import { SectionHeader } from './SectionHeader';
import { toast } from 'sonner@2.0.3';

export interface PennyRecommendationsProps {
  onNavigate: (page: string) => void;
  userId?: string;
  userSkills?: { name: string; level: number }[];
  completedTrails?: string[];
  currentLevel?: string;
}

interface Recommendation {
  id: string;
  type: 'trail' | 'event' | 'resource' | 'certification' | 'module';
  title: string;
  description: string;
  reason: string;
  confidence: number; // 0-100
  action: string;
  page?: string;
  externalUrl?: string;
  points?: number;
  difficulty?: 'Beginner' | 'Intermediate' | 'Advanced';
  estimatedTime?: string;
  icon: typeof Target;
}

export function PennyRecommendations({
  onNavigate,
  userId = 'current-user',
  userSkills = [],
  completedTrails = [],
  currentLevel = 'Explorer',
}: PennyRecommendationsProps) {
  
  // Generate personalized recommendations based on user data
  const recommendations = generateRecommendations({
    userId,
    userSkills,
    completedTrails,
    currentLevel,
  });

  const [dismissed, setDismissed] = useState<string[]>([]);
  const [interacted, setInteracted] = useState<string[]>([]);

  const activeRecommendations = recommendations.filter(r => !dismissed.includes(r.id));

  const handleDismiss = (recommendationId: string) => {
    setDismissed([...dismissed, recommendationId]);
    toast.success('Recommendation hidden');
    
    // In production, call Apex controller:
    // dismissRecommendation(recommendationId);
  };

  const handleClick = (recommendation: Recommendation) => {
    setInteracted([...interacted, recommendation.id]);
    
    // In production, track click:
    // recordRecommendationClick(recommendation.id);
    
    if (recommendation.page) {
      onNavigate(recommendation.page);
    } else if (recommendation.externalUrl) {
      window.open(recommendation.externalUrl, '_blank');
    }
    
    toast.success(`Opening: ${recommendation.title}`);
  };

  const handleFeedback = (recommendationId: string, helpful: boolean) => {
    toast.success(helpful ? 'Thanks for the feedback!' : 'We\'ll improve our recommendations');
    
    // In production, record feedback:
    // recordRecommendationFeedback(recommendationId, helpful);
  };

  if (activeRecommendations.length === 0) {
    return null;
  }

  return (
    <div className="bg-gradient-to-br from-penny-guide/5 to-sun-amber/5 rounded-xl p-6 border border-penny-guide/20">
      {/* Header */}
      <div className="flex items-start justify-between mb-6">
        <SectionHeader
          title="Penny's Recommendations"
          description="Personalized suggestions based on your progress and goals"
          icon={Sparkles}
          level="h3"
        />
        
        <div className="flex items-center space-x-2 px-3 py-1 bg-penny-guide/10 text-penny-guide rounded-full border border-penny-guide/20">
          <Brain className="w-3 h-3" />
          <span className="text-xs">AI-Powered</span>
        </div>
      </div>

      {/* Recommendations List */}
      <div className="space-y-4">
        {activeRecommendations.map((recommendation) => (
          <RecommendationCard
            key={recommendation.id}
            recommendation={recommendation}
            onClick={() => handleClick(recommendation)}
            onDismiss={() => handleDismiss(recommendation.id)}
            onFeedback={(helpful) => handleFeedback(recommendation.id, helpful)}
          />
        ))}
      </div>

      {/* Footer - Penny Insight */}
      <div className="mt-6 pt-6 border-t border-gray-200 dark:border-slate-700">
        <div className="flex items-start space-x-3 text-xs text-gray-600 dark:text-gray-400">
          <Info className="w-4 h-4 text-penny-guide flex-shrink-0 mt-0.5" />
          <p>
            These recommendations are tailored to your current skills, interests, and learning pace.
            They update as you progress through your journey.
          </p>
        </div>
      </div>
    </div>
  );
}

interface RecommendationCardProps {
  recommendation: Recommendation;
  onClick: () => void;
  onDismiss: () => void;
  onFeedback: (helpful: boolean) => void;
}

function RecommendationCard({ recommendation, onClick, onDismiss, onFeedback }: RecommendationCardProps) {
  const [showFeedback, setShowFeedback] = useState(false);
  
  const Icon = recommendation.icon;
  
  const typeConfig = {
    trail: { color: 'text-evergreen', bg: 'bg-evergreen/10', border: 'border-evergreen/20' },
    event: { color: 'text-sun-amber', bg: 'bg-sun-amber/10', border: 'border-sun-amber/20' },
    resource: { color: 'text-sky-blue', bg: 'bg-sky-blue/10', border: 'border-sky-blue/20' },
    certification: { color: 'text-penny-guide', bg: 'bg-penny-guide/10', border: 'border-penny-guide/20' },
    module: { color: 'text-success', bg: 'bg-success/10', border: 'border-success/20' },
  };
  
  const config = typeConfig[recommendation.type];
  
  const confidenceColor = 
    recommendation.confidence >= 80 ? 'text-success' :
    recommendation.confidence >= 60 ? 'text-warning' :
    'text-gray-500 dark:text-gray-400';

  return (
    <div
      className={`relative group bg-white dark:bg-slate-800 rounded-lg p-4 border ${config.border} hover:shadow-md transition-all`}
    >
      {/* Dismiss Button */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          onDismiss();
        }}
        className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity p-1 hover:bg-gray-100 dark:hover:bg-slate-700 rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-evergreen"
        aria-label="Dismiss recommendation"
      >
        <X className="w-4 h-4 text-gray-400" />
      </button>

      {/* Main Content */}
      <div className="flex items-start space-x-4">
        {/* Icon */}
        <div className={`flex-shrink-0 w-12 h-12 rounded-lg ${config.bg} ${config.color} flex items-center justify-center`}>
          <Icon className="w-6 h-6" />
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0 pr-6">
          {/* Header */}
          <div className="flex items-start justify-between mb-2">
            <div className="flex-1">
              <div className="flex items-center space-x-2 mb-1">
                <h4 className="text-sm text-gray-900 dark:text-gray-100">
                  {recommendation.title}
                </h4>
                <span className={`text-xs px-2 py-0.5 ${config.bg} ${config.color} rounded-full capitalize`}>
                  {recommendation.type}
                </span>
              </div>
              
              {recommendation.description && (
                <p className="text-xs text-gray-600 dark:text-gray-400 mb-2">
                  {recommendation.description}
                </p>
              )}
            </div>
          </div>

          {/* Why Recommended */}
          <div className={`flex items-start space-x-2 mb-3 p-2 rounded ${config.bg}/50`}>
            <Zap className={`w-3 h-3 ${config.color} flex-shrink-0 mt-0.5`} />
            <p className="text-xs text-gray-700 dark:text-gray-300">
              <span className="opacity-75">Why: </span>
              {recommendation.reason}
            </p>
          </div>

          {/* Meta Info */}
          <div className="flex flex-wrap items-center gap-3 mb-3 text-xs text-gray-500 dark:text-gray-400">
            {recommendation.confidence && (
              <div className="flex items-center space-x-1">
                <Target className="w-3 h-3" />
                <span className={confidenceColor}>{recommendation.confidence}% match</span>
              </div>
            )}
            
            {recommendation.difficulty && (
              <div className="flex items-center space-x-1">
                <TrendingUp className="w-3 h-3" />
                <span>{recommendation.difficulty}</span>
              </div>
            )}
            
            {recommendation.estimatedTime && (
              <div className="flex items-center space-x-1">
                <Calendar className="w-3 h-3" />
                <span>{recommendation.estimatedTime}</span>
              </div>
            )}
            
            {recommendation.points && (
              <div className="flex items-center space-x-1 text-sun-amber">
                <Award className="w-3 h-3" />
                <span>+{recommendation.points} pts</span>
              </div>
            )}
          </div>

          {/* Action Button */}
          <button
            onClick={onClick}
            className={`text-xs px-4 py-2 ${config.bg} ${config.color} rounded-lg hover:opacity-80 transition-all flex items-center space-x-1 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-evergreen`}
          >
            <span>{recommendation.action}</span>
            <ChevronRight className="w-3 h-3" />
          </button>

          {/* Feedback */}
          {showFeedback ? (
            <div className="mt-3 flex items-center space-x-3 text-xs">
              <span className="text-gray-600 dark:text-gray-400">Was this helpful?</span>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onFeedback(true);
                  setShowFeedback(false);
                }}
                className="text-success hover:underline flex items-center space-x-1"
              >
                <ThumbsUp className="w-3 h-3" />
                <span>Yes</span>
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onFeedback(false);
                  setShowFeedback(false);
                }}
                className="text-gray-500 hover:underline"
              >
                No
              </button>
            </div>
          ) : (
            <button
              onClick={(e) => {
                e.stopPropagation();
                setShowFeedback(true);
              }}
              className="mt-3 text-xs text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
            >
              Give feedback
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

/**
 * RECOMMENDATION ENGINE
 * 
 * In production, this would be replaced by:
 * 1. Salesforce Apex logic
 * 2. Einstein Analytics
 * 3. External AI service (OpenAI, Claude, etc.)
 * 
 * Current implementation uses rule-based logic for demonstration.
 */
function generateRecommendations({
  userId,
  userSkills,
  completedTrails,
  currentLevel,
}: {
  userId: string;
  userSkills: { name: string; level: number }[];
  completedTrails: string[];
  currentLevel: string;
}): Recommendation[] {
  const recommendations: Recommendation[] = [];

  // 1. SKILL GAP RECOMMENDATIONS
  // Find weak skills and recommend trails
  const weakSkills = userSkills.filter(s => s.level < 3);
  if (weakSkills.length > 0) {
    const skill = weakSkills[0];
    recommendations.push({
      id: 'skill-gap-1',
      type: 'trail',
      title: `Master ${skill.name}`,
      description: `Strengthen your ${skill.name.toLowerCase()} skills with targeted learning`,
      reason: `Your assessment shows this as a growth area (current level: ${skill.level}/5)`,
      confidence: 92,
      action: 'Start Learning',
      page: 'trail-mastery',
      points: 500,
      difficulty: 'Intermediate',
      estimatedTime: '3-4 weeks',
      icon: TrendingUp,
    });
  }

  // 2. NEXT TRAIL RECOMMENDATION
  // Based on completed trails, suggest next logical step
  if (!completedTrails.includes('trail-of-mastery')) {
    recommendations.push({
      id: 'next-trail-1',
      type: 'trail',
      title: 'Trail of Mastery',
      description: 'Choose your professional specialization path',
      reason: 'Perfect next step after completing the Guided Trail',
      confidence: 88,
      action: 'Explore Specializations',
      page: 'trail-mastery',
      points: 500,
      difficulty: 'Intermediate',
      estimatedTime: '8-12 weeks',
      icon: Award,
    });
  }

  // 3. CERTIFICATION RECOMMENDATION
  // Based on current level and progress
  if (currentLevel === 'Explorer' || currentLevel === 'Trailblazer') {
    recommendations.push({
      id: 'cert-admin',
      type: 'certification',
      title: 'Salesforce Administrator Certification',
      description: 'Industry-recognized credential to validate your skills',
      reason: `Your ${currentLevel} level progress indicates readiness for certification prep`,
      confidence: 75,
      action: 'Start Prep',
      page: 'learning-center',
      difficulty: 'Intermediate',
      estimatedTime: '6-8 weeks',
      icon: Award,
    });
  }

  // 4. EVENT RECOMMENDATION
  // Suggest upcoming relevant events
  recommendations.push({
    id: 'event-trailbuild',
    type: 'event',
    title: 'TrailBuild Summit',
    description: 'Capstone showcase and networking event',
    reason: 'Connect with partners and showcase your work',
    confidence: 85,
    action: 'Register Now',
    page: 'trailbuild-summit',
    estimatedTime: '1 day event',
    icon: Calendar,
  });

  // 5. RESOURCE RECOMMENDATION
  // Based on current activity
  recommendations.push({
    id: 'resource-apex',
    type: 'resource',
    title: 'Apex Development Best Practices',
    description: 'Curated guide for writing efficient Apex code',
    reason: 'Recommended for learners working on Capstone projects',
    confidence: 80,
    action: 'Read Guide',
    externalUrl: 'https://developer.salesforce.com/docs/atlas.en-us.apexcode.meta/apexcode/',
    difficulty: 'Intermediate',
    estimatedTime: '30 min read',
    icon: BookOpen,
  });

  // 6. MODULE RECOMMENDATION
  // Quick skill modules
  if (currentLevel === 'Explorer') {
    recommendations.push({
      id: 'module-lwc',
      type: 'module',
      title: 'Lightning Web Components Fundamentals',
      description: 'Build modern UI components for Salesforce',
      reason: 'High-demand skill that complements your current learning path',
      confidence: 82,
      action: 'Start Module',
      page: 'learning-center',
      points: 200,
      difficulty: 'Beginner',
      estimatedTime: '2-3 hours',
      icon: Zap,
    });
  }

  // 7. COLLABORATIVE FILTERING
  // What similar users are doing
  recommendations.push({
    id: 'collab-filter-1',
    type: 'trail',
    title: 'Solutions Architect Path',
    description: 'Design scalable Salesforce solutions',
    reason: 'Popular with learners who have similar skills and interests',
    confidence: 72,
    action: 'Explore Path',
    page: 'trail-mastery',
    points: 500,
    difficulty: 'Advanced',
    estimatedTime: '10-14 weeks',
    icon: Target,
  });

  // Return top 3-4 recommendations (sorted by confidence)
  return recommendations
    .sort((a, b) => b.confidence - a.confidence)
    .slice(0, 4);
}

export default PennyRecommendations;
