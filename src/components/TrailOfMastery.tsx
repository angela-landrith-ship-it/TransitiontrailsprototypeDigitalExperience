/**
 * TRAIL OF MASTERY - Landing Page
 * 
 * Gallery view of four professional role tracks with enrollment
 * and progress tracking.
 */

import React, { useState } from 'react';
import {
  Briefcase,
  Code,
  Network,
  BarChart3,
  Award,
  TrendingUp,
  Users,
  ArrowLeft,
} from 'lucide-react';
import { TrailCard } from './TrailCard';
import { SectionHeader } from './SectionHeader';
import { StatCard } from './StatCard';
import { MasteryEnrollmentModal } from './MasteryEnrollmentModal';

export interface TrailOfMasteryProps {
  onNavigate: (page: string, trailId?: string) => void;
  onBack: () => void;
  userPoints?: number;
  userLevel?: string;
}

interface Trail {
  id: string;
  role: string;
  title: string;
  description: string;
  duration: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  icon: typeof Briefcase;
  color: 'amber' | 'teal' | 'evergreen' | 'blue';
  badge: string;
  pennyMode: string;
  modules: number;
  totalPoints: number;
}

const trails: Trail[] = [
  {
    id: 'product-owner',
    role: 'Salesforce Product Owner',
    title: 'Trail of Mastery: Product Owner',
    description: 'Master strategic planning, stakeholder management, backlog grooming, and business process optimization.',
    duration: '12–16 weeks',
    difficulty: 'Advanced',
    icon: Briefcase,
    color: 'amber',
    badge: 'Trailblazer Visionary',
    pennyMode: 'Mentor',
    modules: 5,
    totalPoints: 300,
  },
  {
    id: 'developer',
    role: 'Salesforce Developer',
    title: 'Trail of Mastery: Developer',
    description: 'Build expertise in Apex, Lightning Web Components, and API integrations with declarative-first principles.',
    duration: '12–16 weeks',
    difficulty: 'Advanced',
    icon: Code,
    color: 'teal',
    badge: 'Trailblazer Engineer',
    pennyMode: 'Assistant',
    modules: 5,
    totalPoints: 300,
  },
  {
    id: 'solutions-architect',
    role: 'Salesforce Solutions Architect',
    title: 'Trail of Mastery: Solutions Architect',
    description: 'Design end-to-end solutions with data modeling, security architecture, and multi-cloud integration.',
    duration: '12–16 weeks',
    difficulty: 'Advanced',
    icon: Network,
    color: 'evergreen',
    badge: 'Trailblazer Architect',
    pennyMode: 'Advisor',
    modules: 5,
    totalPoints: 300,
  },
  {
    id: 'business-analyst',
    role: 'Salesforce Business Analyst',
    title: 'Trail of Mastery: Business Analyst',
    description: 'Excel in discovery, documentation, and process optimization using Salesforce automation tools.',
    duration: '12–16 weeks',
    difficulty: 'Advanced',
    icon: BarChart3,
    color: 'blue',
    badge: 'Trailblazer Analyst',
    pennyMode: 'Guide',
    modules: 5,
    totalPoints: 300,
  },
];

export function TrailOfMastery({
  onNavigate,
  onBack,
  userPoints = 0,
  userLevel = 'Explorer',
}: TrailOfMasteryProps) {
  // Mock enrollment data - in production, this would come from Salesforce
  const [enrollments] = useState<{ [key: string]: number }>({
    // 'product-owner': 45,
    // 'developer': 0,
  });
  
  const [showEnrollmentModal, setShowEnrollmentModal] = useState(false);

  const handleTrailClick = (trailId: string) => {
    // Check if already enrolled
    if (trailId in enrollments) {
      onNavigate('trail-detail', trailId);
    } else {
      // Show enrollment modal
      setShowEnrollmentModal(true);
    }
  };
  
  const handleEnrollment = (data: any) => {
    console.log('Enrolling in Trail of Mastery:', data);
    // In production: Create Trail_Enrollment__c record
    setShowEnrollmentModal(false);
    onNavigate('trail-detail', data.roleTrack);
  };

  const completedTrails = Object.values(enrollments).filter(p => p === 100).length;
  const activeTrails = Object.keys(enrollments).length;

  return (
    <div className="min-h-screen bg-trail-cream dark:bg-slate-900">
      {/* Header */}
      <div className="bg-white dark:bg-slate-800 border-b border-gray-200 dark:border-slate-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <button
            onClick={onBack}
            className="flex items-center space-x-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200 mb-6 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-evergreen rounded"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Learning Center</span>
          </button>

          <SectionHeader
            title="Trail of Mastery Programs"
            description="Advance your Salesforce career through hands-on mastery paths designed for real-world expertise."
            icon={Award}
            level="h1"
          />

          {/* Stats */}
          {activeTrails > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
              <StatCard
                icon={<TrendingUp className="w-6 h-6" />}
                label="Active Trails"
                value={activeTrails.toString()}
                iconColor="blue"
              />
              <StatCard
                icon={<Award className="w-6 h-6" />}
                label="Completed Trails"
                value={completedTrails.toString()}
                iconColor="success"
              />
              <StatCard
                icon={<Users className="w-6 h-6" />}
                label="Expert Level"
                value={userLevel}
                iconColor="evergreen"
                subtitle={completedTrails > 0 ? 'Keep going!' : 'Complete a trail to advance'}
              />
            </div>
          )}
        </div>
      </div>

      {/* Trail Gallery */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Info Banner */}
        <div className="bg-sky-blue/10 border border-sky-blue/20 rounded-xl p-6 mb-8">
          <div className="flex items-start space-x-4">
            <Award className="w-6 h-6 text-sky-blue flex-shrink-0 mt-1" />
            <div>
              <h3 className="text-gray-900 dark:text-gray-100 mb-2">
                Build Real-World Expertise
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Each Trail of Mastery includes guided learning modules, team collaboration projects,
                personalized Penny mentorship, and certification preparation. Complete any trail to
                earn Expert Level status and unlock the coveted Trailblazer badge for your chosen role.
              </p>
            </div>
          </div>
        </div>

        {/* Trail Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {trails.map((trail) => (
            <TrailCard
              key={trail.id}
              role={trail.role}
              title={trail.title}
              description={trail.description}
              duration={trail.duration}
              difficulty={trail.difficulty}
              icon={trail.icon}
              color={trail.color}
              isEnrolled={trail.id in enrollments}
              progress={enrollments[trail.id] || 0}
              isLocked={false} // Could implement unlock logic based on prerequisites
              onClick={() => handleTrailClick(trail.id)}
            />
          ))}
        </div>

        {/* Footer Info */}
        <div className="mt-12 text-center">
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
            Complete multiple trails to earn the <span className="text-evergreen">Expert+</span> title
            and <span className="text-sun-amber">Multi-Mastery</span> meta-badge.
          </p>
          <p className="text-xs text-gray-500 dark:text-gray-500">
            Each trail includes team collaboration projects with nonprofit partners and hands-on
            capstone projects reviewed by industry experts.
          </p>
        </div>
      </div>
      
      {/* Mastery Enrollment Modal */}
      <MasteryEnrollmentModal
        isOpen={showEnrollmentModal}
        onClose={() => setShowEnrollmentModal(false)}
        onEnroll={handleEnrollment}
        userName="Alex" // In production: from current user
        guidedTrailScore={87}
        guidedTrailLevel="Expert"
      />
    </div>
  );
}

export default TrailOfMastery;
