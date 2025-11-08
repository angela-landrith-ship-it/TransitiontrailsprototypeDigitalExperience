/**
 * ENHANCED AUDIENCE SELECTOR
 * 
 * =============================================================================
 * PURPOSE
 * =============================================================================
 * Advanced multi-role selector with granular trail stages for comprehensive
 * prototype testing. Includes all learner journey stages plus staff roles.
 * 
 * =============================================================================
 * AUDIENCE STAGES
 * =============================================================================
 * 
 * LEARNER JOURNEY (Progressive):
 * 1. Unregistered → Guest browsing, no account
 * 2. Visitor Trail → Limited access, exploration mode
 * 3. Guided Trail → Full learner, 12-week program
 * 4. Trail of Mastery → Advanced role-specific tracks
 * 5. Explorer's Journey → Lifelong learning subscription
 * 
 * STAFF ROLES:
 * 6. Coach/Mentor → Guides learners, assessments
 * 7. Partner Org → Capstone project partners
 * 8. Admin → System administration
 * 
 * =============================================================================
 */

import { X, ChevronDown, Check, Eye, Sparkles, RefreshCw } from 'lucide-react';
import { useState } from 'react';
import { Badge } from '../ui/badge';

export type AudienceRole = 
  | 'unregistered'
  | 'visitor-trail'
  | 'guided-trail'
  | 'mastery-trail'
  | 'explorer-journey'
  | 'coach'
  | 'partner'
  | 'admin';

interface RoleDefinition {
  id: AudienceRole;
  label: string;
  icon: string;
  color: string;
  bgColor: string;
  textColor: string;
  description: string;
  stage?: 'learner' | 'staff';
  features: string[];
}

const roleDefinitions: Record<AudienceRole, RoleDefinition> = {
  'unregistered': {
    id: 'unregistered',
    label: 'Unregistered Visitor',
    icon: '👋',
    color: '#9CA3AF',
    bgColor: '#F3F4F6',
    textColor: '#374151',
    description: 'Public browsing, no authentication',
    stage: 'learner',
    features: ['Landing pages', 'Public resources', 'Sign up/Sign in'],
  },
  'visitor-trail': {
    id: 'visitor-trail',
    label: 'Visitor Trail Participant',
    icon: '🧭',
    color: '#7EB5C1',
    bgColor: '#E0F2F7',
    textColor: '#2C6975',
    description: 'Limited access exploration mode',
    stage: 'learner',
    features: ['Free previews', 'Exploration points', 'Upgrade prompts'],
  },
  'guided-trail': {
    id: 'guided-trail',
    label: 'Guided Trail Participant',
    icon: '🎓',
    color: '#F9A03F',
    bgColor: '#FEF3E2',
    textColor: '#C77D1F',
    description: '12-week structured program',
    stage: 'learner',
    features: ['Full curriculum', 'Coach sessions', 'Capstone project', 'Community'],
  },
  'mastery-trail': {
    id: 'mastery-trail',
    label: 'Trail of Mastery Participant',
    icon: '🏆',
    color: '#3B6A52',
    bgColor: '#E8F5E9',
    textColor: '#2D5240',
    description: 'Advanced role-specific tracks',
    stage: 'learner',
    features: ['PO/Dev/Architect/BA tracks', 'Expert mentorship', 'Certifications'],
  },
  'explorer-journey': {
    id: 'explorer-journey',
    label: "Explorer's Journey Member",
    icon: '🌍',
    color: '#2C6975',
    bgColor: '#E0F7FA',
    textColor: '#1A4148',
    description: 'Lifelong learning subscription',
    stage: 'learner',
    features: ['Monthly events', 'Workshops', 'Alumni network', 'Prestige points'],
  },
  'coach': {
    id: 'coach',
    label: 'Coach / Mentor',
    icon: '🧑‍🏫',
    color: '#8B5CF6',
    bgColor: '#F3E8FF',
    textColor: '#6B21A8',
    description: 'Guides and assesses learners',
    stage: 'staff',
    features: ['Coach dashboard', 'Assessments', 'Team analytics', 'Mentorship'],
  },
  'partner': {
    id: 'partner',
    label: 'Partner Organization',
    icon: '🤝',
    color: '#0EA5E9',
    bgColor: '#E0F2FE',
    textColor: '#075985',
    description: 'Capstone project partners',
    stage: 'staff',
    features: ['Project board', 'Application review', 'Team workspace'],
  },
  'admin': {
    id: 'admin',
    label: 'Admin',
    icon: '⚙️',
    color: '#DC2626',
    bgColor: '#FEE2E2',
    textColor: '#991B1B',
    description: 'System administrator',
    stage: 'staff',
    features: ['All access', 'User management', 'CMS', 'Analytics'],
  },
};

interface AudienceSelectorProps {
  currentRole: AudienceRole;
  onRoleChange: (role: AudienceRole) => void;
  onRefresh?: () => void;
  className?: string;
}

export function AudienceSelector({
  currentRole,
  onRoleChange,
  onRefresh,
  className = '',
}: AudienceSelectorProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  
  const currentRoleData = roleDefinitions[currentRole];
  const learnerRoles = Object.values(roleDefinitions).filter(r => r.stage === 'learner');
  const staffRoles = Object.values(roleDefinitions).filter(r => r.stage === 'staff');

  return (
    <div className={`fixed top-4 right-4 z-50 ${className}`}>
      {!isExpanded ? (
        // COLLAPSED STATE
        <button
          onClick={() => setIsExpanded(true)}
          className="group bg-gray-900 dark:bg-[#243A3E] backdrop-blur-md text-white dark:text-[#F2EAD3] rounded-lg shadow-xl border-2 border-gray-700 dark:border-[#3B6A52]/30 hover:border-amber-400 dark:hover:border-[#F9A03F] hover:shadow-amber-400/30 dark:hover:shadow-[#F9A03F]/30 transition-all duration-200 overflow-hidden"
          style={{
            minWidth: '220px',
          }}
        >
          <div className="px-4 py-3 bg-gradient-to-r from-gray-900 to-gray-800 dark:from-[#243A3E] dark:to-[#2C4A4E] flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Eye className="w-4 h-4 text-sky-400 dark:text-[#7EB5C1]" />
              <span className="text-sm font-medium">Demo Mode</span>
            </div>
            <ChevronDown className="w-4 h-4 text-gray-400 dark:text-[#F2EAD3]/60 group-hover:text-amber-300 dark:group-hover:text-[#F9A03F] transition-colors" />
          </div>
          <div className="px-4 py-2 bg-gray-800 dark:bg-[#1A2B2F] border-t border-gray-700 dark:border-[#3B6A52]/20">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <span className="text-lg">{currentRoleData.icon}</span>
                <span className="text-xs text-gray-200 dark:text-[#F2EAD3]/80 font-medium">{currentRoleData.label}</span>
              </div>
              <Badge 
                className="text-xs px-2 py-0.5 border-0 font-medium"
                style={{
                  backgroundColor: currentRoleData.bgColor,
                  color: currentRoleData.textColor,
                }}
              >
                Active
              </Badge>
            </div>
          </div>
        </button>
      ) : (
        // EXPANDED STATE
        <div 
          className="bg-gray-900 dark:bg-[#243A3E] backdrop-blur-lg rounded-xl shadow-2xl border-2 border-gray-700 dark:border-[#3B6A52]/30 overflow-hidden animate-fade-in"
          style={{
            width: '320px',
            maxHeight: '90vh',
            boxShadow: '0 20px 60px rgba(0, 0, 0, 0.5), 0 0 0 1px rgba(0, 0, 0, 0.1)',
          }}
        >
          {/* Header */}
          <div className="bg-gradient-to-r from-gray-900 to-gray-800 dark:from-[#243A3E] dark:to-[#2C4A4E] px-4 py-3 border-b border-gray-700 dark:border-[#3B6A52]/20">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center space-x-2">
                <Eye className="w-5 h-5 text-sky-400 dark:text-[#7EB5C1]" />
                <h3 className="text-white dark:text-[#F2EAD3] font-medium">Demo Mode</h3>
              </div>
              <div className="flex items-center space-x-2">
                {onRefresh && (
                  <button
                    onClick={onRefresh}
                    className="w-7 h-7 rounded-md bg-gray-700 dark:bg-[#3B6A52]/20 hover:bg-gray-600 dark:hover:bg-[#3B6A52]/40 flex items-center justify-center transition-colors"
                    title="Refresh View"
                  >
                    <RefreshCw className="w-4 h-4 text-sky-400 dark:text-[#7EB5C1]" />
                  </button>
                )}
                <button
                  onClick={() => setIsExpanded(false)}
                  className="w-7 h-7 rounded-md bg-gray-700 dark:bg-[#3B6A52]/20 hover:bg-gray-600 dark:hover:bg-[#3B6A52]/40 flex items-center justify-center transition-colors"
                  aria-label="Collapse"
                >
                  <X className="w-4 h-4 text-white dark:text-[#F2EAD3]" />
                </button>
              </div>
            </div>
            <p className="text-xs text-gray-300 dark:text-[#F2EAD3]/60">
              Switch between user audiences to test different experiences
            </p>
          </div>

          {/* Content - Scrollable */}
          <div className="overflow-y-auto" style={{ maxHeight: 'calc(90vh - 100px)' }}>
            {/* Learner Journey Section */}
            <div className="p-4 border-b border-gray-700 dark:border-[#3B6A52]/20">
              <div className="flex items-center space-x-2 mb-3">
                <Sparkles className="w-4 h-4 text-amber-300 dark:text-[#F9A03F]" />
                <h4 className="text-sm text-white dark:text-[#F2EAD3] font-medium">Learner Journey</h4>
              </div>
              <div className="space-y-2">
                {learnerRoles.map((role) => {
                  const isActive = currentRole === role.id;
                  return (
                    <button
                      key={role.id}
                      onClick={() => {
                        onRoleChange(role.id);
                        setIsExpanded(false);
                      }}
                      className={`w-full text-left p-3 rounded-lg transition-all ${
                        isActive
                          ? 'bg-gradient-to-r from-amber-500/25 to-amber-600/15 dark:from-[#F9A03F]/25 dark:to-[#F9A03F]/15 border-2 border-amber-400 dark:border-[#F9A03F] shadow-lg shadow-amber-500/20 dark:shadow-[#F9A03F]/20'
                          : 'bg-gray-800 dark:bg-[#1A2B2F] border-2 border-transparent hover:border-gray-600 dark:hover:border-[#3B6A52]/40 hover:bg-gray-700 dark:hover:bg-[#1A2B2F]'
                      }`}
                    >
                      <div className="flex items-start justify-between mb-1">
                        <div className="flex items-center space-x-2 flex-1 min-w-0">
                          <span className="text-xl flex-shrink-0">{role.icon}</span>
                          <div className="flex-1 min-w-0">
                            <p className={`text-sm truncate font-medium ${
                              isActive ? 'text-amber-300 dark:text-[#F9A03F]' : 'text-white dark:text-[#F2EAD3]'
                            }`}>
                              {role.label}
                            </p>
                            <p className="text-xs text-gray-400 dark:text-[#F2EAD3]/50 truncate">
                              {role.description}
                            </p>
                          </div>
                        </div>
                        {isActive && (
                          <div className="w-5 h-5 rounded-full bg-amber-400 dark:bg-[#F9A03F] flex items-center justify-center flex-shrink-0 ml-2 shadow-md shadow-amber-500/30 dark:shadow-[#F9A03F]/30">
                            <Check className="w-3 h-3 text-gray-900 dark:text-gray-900 font-bold" strokeWidth={3} />
                          </div>
                        )}
                      </div>
                      <div className="ml-7 flex flex-wrap gap-1">
                        {role.features.slice(0, 2).map((feature, i) => (
                          <span
                            key={i}
                            className={`text-xs px-2 py-0.5 rounded-md ${!isActive ? 'bg-gray-700 dark:bg-[#2C4A4E] text-sky-400 dark:text-[#7EB5C1]' : ''}`}
                            style={isActive ? {
                              backgroundColor: `${role.color}20`,
                              color: role.color,
                            } : undefined}
                          >
                            {feature}
                          </span>
                        ))}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Staff Roles Section */}
            <div className="p-4">
              <div className="flex items-center space-x-2 mb-3">
                <Eye className="w-4 h-4 text-sky-400 dark:text-[#7EB5C1]" />
                <h4 className="text-sm text-white dark:text-[#F2EAD3] font-medium">Staff Roles</h4>
              </div>
              <div className="space-y-2">
                {staffRoles.map((role) => {
                  const isActive = currentRole === role.id;
                  return (
                    <button
                      key={role.id}
                      onClick={() => {
                        onRoleChange(role.id);
                        setIsExpanded(false);
                      }}
                      className={`w-full text-left p-3 rounded-lg transition-all ${
                        isActive
                          ? 'border-2'
                          : 'bg-gray-800 dark:bg-[#1A2B2F] border-2 border-transparent hover:border-gray-600 dark:hover:border-[#3B6A52]/40 hover:bg-gray-700 dark:hover:bg-[#1A2B2F]'
                      }`}
                      style={
                        isActive
                          ? {
                              background: `linear-gradient(to right, ${role.color}20, ${role.color}10)`,
                              borderColor: role.color,
                            }
                          : {}
                      }
                    >
                      <div className="flex items-start justify-between mb-1">
                        <div className="flex items-center space-x-2 flex-1 min-w-0">
                          <span className="text-xl flex-shrink-0">{role.icon}</span>
                          <div className="flex-1 min-w-0">
                            <p
                              className={`text-sm truncate font-medium ${!isActive ? 'text-white dark:text-[#F2EAD3]' : ''}`}
                              style={isActive ? { color: role.color } : undefined}
                            >
                              {role.label}
                            </p>
                            <p className="text-xs text-gray-400 dark:text-[#F2EAD3]/50 truncate">
                              {role.description}
                            </p>
                          </div>
                        </div>
                        {isActive && (
                          <div
                            className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 ml-2 shadow-md"
                            style={{ 
                              backgroundColor: role.color,
                              boxShadow: `0 2px 8px ${role.color}40`
                            }}
                          >
                            <Check className="w-3 h-3 text-gray-900 font-bold" strokeWidth={3} />
                          </div>
                        )}
                      </div>
                      <div className="ml-7 flex flex-wrap gap-1">
                        {role.features.slice(0, 2).map((feature, i) => (
                          <span
                            key={i}
                            className={isActive ? 'text-xs px-2 py-0.5 rounded-md' : 'text-xs px-2 py-0.5 rounded-md bg-gray-700 dark:bg-[#2C4A4E] text-sky-400 dark:text-[#7EB5C1]'}
                            style={isActive ? {
                              backgroundColor: `${role.color}20`,
                              color: role.color,
                            } : undefined}
                          >
                            {feature}
                          </span>
                        ))}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="px-4 py-3 bg-gray-800 dark:bg-[#1A2B2F] border-t border-gray-700 dark:border-[#3B6A52]/20">
            <p className="text-xs text-gray-400 dark:text-[#F2EAD3]/40 text-center">
              Prototype testing only • Production uses Salesforce Audiences
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

/**
 * =============================================================================
 * USAGE IN APP.TSX
 * =============================================================================
 * 
 * import { AudienceSelector } from './components/integrations/AudienceSelector';
 * import type { AudienceRole } from './components/integrations/AudienceSelector';
 * 
 * function App() {
 *   const [audienceRole, setAudienceRole] = useState<AudienceRole>('guided-trail');
 * 
 *   const handleRoleChange = (role: AudienceRole) => {
 *     setAudienceRole(role);
 *     // Update app state based on role
 *     // Show different navigation, pages, features
 *   };
 * 
 *   return (
 *     <div>
 *       <AudienceSelector
 *         currentRole={audienceRole}
 *         onRoleChange={handleRoleChange}
 *         onRefresh={() => window.location.reload()}
 *       />
 *       {/ * Rest of app * /}
 *     </div>
 *   );
 * }
 * 
 * =============================================================================
 */
