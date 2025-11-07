import { TrendingUp, Award, Users, Star, Zap } from 'lucide-react';
import { Badge } from './ui/badge';

interface ImpactSummaryProps {
  capstoneComplete?: boolean;
  partnerProjects?: number;
  summitParticipations?: number;
  totalPoints?: number;
}

export function ImpactSummary({ 
  capstoneComplete = true, 
  partnerProjects = 2,
  summitParticipations = 1,
  totalPoints = 180 
}: ImpactSummaryProps) {
  const totalProjects = (capstoneComplete ? 1 : 0) + partnerProjects + summitParticipations;

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl text-gray-900">Your Impact Summary</h3>
        <Badge className="bg-[#2C6975]/10 text-[#2C6975]">
          <TrendingUp className="w-3 h-3 mr-1" />
          Growing
        </Badge>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-4 gap-3 mb-6">
        <div className="text-center p-3 bg-gradient-to-br from-[#2C6975]/10 to-[#2C6975]/5 rounded-lg">
          <div className="text-2xl text-[#2C6975] mb-1">{totalProjects}</div>
          <div className="text-xs text-gray-600">Total Projects</div>
        </div>
        
        <div className="text-center p-3 bg-gradient-to-br from-[#F9A03F]/10 to-[#F9A03F]/5 rounded-lg">
          <div className="text-2xl text-[#F9A03F] mb-1">{partnerProjects}</div>
          <div className="text-xs text-gray-600">Partner</div>
        </div>
        
        <div className="text-center p-3 bg-gradient-to-br from-[#7EB5C1]/10 to-[#7EB5C1]/5 rounded-lg">
          <div className="text-2xl text-[#7EB5C1] mb-1">{summitParticipations}</div>
          <div className="text-xs text-gray-600">TrailBuild</div>
        </div>
        
        <div className="text-center p-3 bg-gradient-to-br from-[#3B6A52]/10 to-[#3B6A52]/5 rounded-lg">
          <div className="text-2xl text-[#3B6A52] mb-1">{totalPoints}</div>
          <div className="text-xs text-gray-600">Points</div>
        </div>
      </div>

      {/* Project Breakdown Chart */}
      <div className="space-y-3">
        <div className="flex items-center justify-between text-sm mb-2">
          <span className="text-gray-600">Project Breakdown</span>
        </div>

        {/* Capstone */}
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-lg bg-[#2C6975] flex items-center justify-center flex-shrink-0">
            <Award className="w-5 h-5 text-white" />
          </div>
          <div className="flex-1">
            <div className="flex items-center justify-between mb-1">
              <span className="text-sm text-gray-900">Capstone Project</span>
              <span className="text-sm text-gray-600">{capstoneComplete ? '1' : '0'}</span>
            </div>
            <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
              <div 
                className="h-full bg-[#2C6975] rounded-full transition-all"
                style={{ width: capstoneComplete ? '100%' : '0%' }}
              />
            </div>
          </div>
        </div>

        {/* Partner Projects */}
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-lg bg-[#F9A03F] flex items-center justify-center flex-shrink-0">
            <Users className="w-5 h-5 text-white" />
          </div>
          <div className="flex-1">
            <div className="flex items-center justify-between mb-1">
              <span className="text-sm text-gray-900">Partner Projects</span>
              <span className="text-sm text-gray-600">{partnerProjects}</span>
            </div>
            <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
              <div 
                className="h-full bg-[#F9A03F] rounded-full transition-all"
                style={{ width: `${Math.min((partnerProjects / 3) * 100, 100)}%` }}
              />
            </div>
          </div>
        </div>

        {/* TrailBuild Summit */}
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#F9A03F] to-[#e89135] flex items-center justify-center flex-shrink-0">
            <Zap className="w-5 h-5 text-white" />
          </div>
          <div className="flex-1">
            <div className="flex items-center justify-between mb-1">
              <span className="text-sm text-gray-900">TrailBuild Summit</span>
              <span className="text-sm text-gray-600">{summitParticipations}</span>
            </div>
            <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-[#F9A03F] to-[#e89135] rounded-full transition-all"
                style={{ width: summitParticipations > 0 ? '100%' : '0%' }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Achievement Highlight */}
      {capstoneComplete && partnerProjects > 0 && (
        <div className="mt-6 p-4 bg-gradient-to-br from-[#3B6A52]/10 to-[#2C6975]/10 rounded-lg border border-[#3B6A52]/20">
          <div className="flex items-center space-x-2 mb-2">
            <Star className="w-5 h-5 text-[#F9A03F]" />
            <h4 className="text-sm text-gray-900">Achievement Unlocked!</h4>
          </div>
          <p className="text-xs text-gray-700">
            You've completed your Capstone and contributed to {partnerProjects} Partner Project{partnerProjects !== 1 ? 's' : ''}. 
            You're making a real impact in the Salesforce community!
          </p>
        </div>
      )}

      {/* Next Steps */}
      {!capstoneComplete && (
        <div className="mt-6 p-4 bg-[#7EB5C1]/10 rounded-lg border border-[#7EB5C1]/20">
          <p className="text-xs text-gray-700">
            Complete your Capstone to unlock access to Partner Projects and start building real-world solutions!
          </p>
        </div>
      )}
    </div>
  );
}
