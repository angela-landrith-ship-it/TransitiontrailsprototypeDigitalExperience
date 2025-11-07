/**
 * AUDIENCE TOGGLE COMPONENT
 * 
 * =============================================================================
 * PURPOSE
 * =============================================================================
 * Allows testing different audience/role experiences in the prototype.
 * In production Salesforce, this is controlled by Experience Cloud Audiences
 * based on the authenticated user's profile and permissions.
 * 
 * =============================================================================
 * SALESFORCE MAPPING
 * =============================================================================
 * 
 * This component simulates Experience Cloud Audience Targeting:
 * - Production: Controlled by User.Profile, Permission Sets, Audiences
 * - Prototype: Toggle for design/testing purposes only
 * 
 * Experience Cloud Audiences:
 * 1. Visitor (Guest User Profile)
 *    - Public site access
 *    - No authentication required
 *    - Limited features
 * 
 * 2. Learner (Learner Community Profile)
 *    - Full program access
 *    - Authenticated user
 *    - Trail progress, projects, shop
 * 
 * 3. Coach (Coach Community Profile)
 *    - Learner features +
 *    - Coach dashboard
 *    - Assessment tools
 *    - Team analytics
 * 
 * 4. Partner (Partner Community Profile)
 *    - Limited access
 *    - Partner project portal
 *    - View applications
 *    - Team communication
 * 
 * 5. Sponsor (Partner Community Plus Profile)
 *    - Partner features +
 *    - TrailBuild sponsorship dashboard
 *    - Event branding access
 * 
 * 6. Admin (System Administrator Profile)
 *    - All features
 *    - Admin panel
 *    - User management
 *    - Content management
 * 
 * =============================================================================
 * PROPS
 * =============================================================================
 * @param currentRole - Currently selected role
 * @param onRoleChange - Callback when role changes
 * @param availableRoles - Roles to show in toggle (default: all)
 * @param variant - Display style: 'dropdown' | 'tabs' | 'buttons'
 * @param showInProduction - Whether to show in production (default: false)
 * @param label - Label text for the toggle
 * 
 * =============================================================================
 */

import { Users, ChevronDown, Check, Eye, Shield } from 'lucide-react';
import { useState } from 'react';
import { Badge } from '../ui/badge';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu';

export type UserRole = 'visitor' | 'learner' | 'coach' | 'partner' | 'sponsor' | 'admin';

interface RoleDefinition {
  id: UserRole;
  label: string;
  icon: string;
  color: string;
  description: string;
  salesforceProfile: string;
  features: string[];
}

const roleDefinitions: Record<UserRole, RoleDefinition> = {
  visitor: {
    id: 'visitor',
    label: 'Visitor',
    icon: '👋',
    color: '#9CA3AF',
    description: 'Public user, not authenticated',
    salesforceProfile: 'Guest User Profile',
    features: ['Landing page', 'Learning resources', 'Event calendar', 'Sign up/Sign in'],
  },
  learner: {
    id: 'learner',
    label: 'Learner',
    icon: '🎓',
    color: '#2C6975',
    description: 'Active program participant',
    salesforceProfile: 'Learner Community',
    features: ['Guided Trail', 'Capstone projects', 'Partner Board', 'Shop', 'Community'],
  },
  coach: {
    id: 'coach',
    label: 'Coach',
    icon: '🧭',
    color: '#3B6A52',
    description: 'Mentors and guides learners',
    salesforceProfile: 'Coach Community',
    features: ['All Learner features', 'Coach dashboard', 'Assessments', 'Team analytics'],
  },
  partner: {
    id: 'partner',
    label: 'Partner',
    icon: '🤝',
    color: '#7EB5C1',
    description: 'Partner organization representative',
    salesforceProfile: 'Partner Community',
    features: ['Partner projects', 'Application review', 'Team workspace', 'Slack channels'],
  },
  sponsor: {
    id: 'sponsor',
    label: 'Sponsor',
    icon: '⭐',
    color: '#F9A03F',
    description: 'TrailBuild Summit sponsor',
    salesforceProfile: 'Partner Community Plus',
    features: ['Partner features', 'Sponsor dashboard', 'Event branding', 'Analytics'],
  },
  admin: {
    id: 'admin',
    label: 'Admin',
    icon: '⚙️',
    color: '#DC2626',
    description: 'System administrator',
    salesforceProfile: 'System Administrator',
    features: ['All features', 'User management', 'Content CMS', 'System settings'],
  },
};

interface AudienceToggleProps {
  currentRole: UserRole;
  onRoleChange: (role: UserRole) => void;
  availableRoles?: UserRole[];
  variant?: 'dropdown' | 'tabs' | 'buttons';
  showInProduction?: boolean;
  label?: string;
}

export function AudienceToggle({
  currentRole,
  onRoleChange,
  availableRoles = ['visitor', 'learner', 'coach', 'partner', 'sponsor', 'admin'],
  variant = 'dropdown',
  showInProduction = false,
  label = 'View As',
}: AudienceToggleProps) {
  const [isOpen, setIsOpen] = useState(false);
  
  // In production Salesforce, this component would not render
  // unless explicitly enabled for testing/demo purposes
  if (!showInProduction && typeof window !== 'undefined' && window.location.hostname !== 'localhost') {
    return null;
  }

  const currentRoleData = roleDefinitions[currentRole];

  // Dropdown variant (compact, suitable for navigation bar)
  if (variant === 'dropdown') {
    return (
      <div className="relative">
        <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
          <DropdownMenuTrigger asChild>
            <button
              className="flex items-center space-x-2 px-3 py-2 bg-amber-50 border border-amber-200 rounded-lg hover:bg-amber-100 transition-colors text-sm"
              aria-label={`Current role: ${currentRoleData.label}`}
            >
              <Eye className="w-4 h-4 text-amber-600" />
              <span className="text-amber-900">{label}:</span>
              <span className="text-amber-700">{currentRoleData.icon} {currentRoleData.label}</span>
              <ChevronDown className="w-4 h-4 text-amber-600" />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-80">
            <DropdownMenuLabel>
              <div className="flex items-center space-x-2">
                <Shield className="w-4 h-4 text-amber-600" />
                <span>Experience Cloud Audience</span>
              </div>
              <p className="text-xs text-gray-500 mt-1 font-normal">
                Prototype testing only - In production, this is controlled by user profile
              </p>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            {availableRoles.map((roleId) => {
              const role = roleDefinitions[roleId];
              const isActive = currentRole === roleId;
              return (
                <DropdownMenuItem
                  key={roleId}
                  onClick={() => onRoleChange(roleId)}
                  className="cursor-pointer"
                >
                  <div className="flex items-start space-x-3 w-full">
                    <span className="text-xl flex-shrink-0">{role.icon}</span>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-sm font-medium text-gray-900">{role.label}</span>
                        {isActive && <Check className="w-4 h-4 text-green-600" />}
                      </div>
                      <p className="text-xs text-gray-600 mb-1">{role.description}</p>
                      <p className="text-xs text-gray-500 font-mono">{role.salesforceProfile}</p>
                    </div>
                  </div>
                </DropdownMenuItem>
              );
            })}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    );
  }

  // Tabs variant (horizontal tabs)
  if (variant === 'tabs') {
    return (
      <div className="bg-amber-50 border border-amber-200 rounded-lg p-2">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center space-x-2 text-sm text-amber-900">
            <Eye className="w-4 h-4" />
            <span>{label}</span>
          </div>
          <Badge variant="outline" className="text-xs text-amber-700 border-amber-300">
            Prototype Only
          </Badge>
        </div>
        <div className="flex flex-wrap gap-2">
          {availableRoles.map((roleId) => {
            const role = roleDefinitions[roleId];
            const isActive = currentRole === roleId;
            return (
              <button
                key={roleId}
                onClick={() => onRoleChange(roleId)}
                className={`px-3 py-2 rounded-lg text-sm transition-colors ${
                  isActive
                    ? 'bg-white text-gray-900 shadow-sm border border-gray-200'
                    : 'bg-transparent text-gray-600 hover:bg-white/50'
                }`}
                style={isActive ? { borderLeftColor: role.color, borderLeftWidth: '3px' } : {}}
              >
                <span className="mr-1">{role.icon}</span>
                {role.label}
              </button>
            );
          })}
        </div>
      </div>
    );
  }

  // Buttons variant (vertical button list with details)
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <Shield className="w-5 h-5 text-amber-600" />
          <h3 className="text-gray-900">Audience Selector</h3>
        </div>
        <Badge variant="outline" className="text-xs text-amber-700 border-amber-300">
          Prototype Testing
        </Badge>
      </div>
      <p className="text-sm text-gray-600 mb-4">
        In production Salesforce Experience Cloud, audience is automatically determined by user profile and permissions.
      </p>
      <div className="space-y-2">
        {availableRoles.map((roleId) => {
          const role = roleDefinitions[roleId];
          const isActive = currentRole === roleId;
          return (
            <button
              key={roleId}
              onClick={() => onRoleChange(roleId)}
              className={`w-full text-left p-4 rounded-lg border-2 transition-all ${
                isActive
                  ? 'border-gray-900 bg-gray-50'
                  : 'border-gray-200 hover:border-gray-300 bg-white'
              }`}
            >
              <div className="flex items-start justify-between mb-2">
                <div className="flex items-center space-x-3">
                  <span className="text-2xl">{role.icon}</span>
                  <div>
                    <h4 className="text-gray-900 mb-1">{role.label}</h4>
                    <p className="text-xs text-gray-600">{role.description}</p>
                  </div>
                </div>
                {isActive && (
                  <div className="w-6 h-6 rounded-full bg-green-500 flex items-center justify-center">
                    <Check className="w-4 h-4 text-white" />
                  </div>
                )}
              </div>
              <div className="pl-11">
                <p className="text-xs text-gray-500 font-mono mb-2">
                  Salesforce Profile: {role.salesforceProfile}
                </p>
                <div className="flex flex-wrap gap-1">
                  {role.features.slice(0, 3).map((feature, index) => (
                    <Badge key={index} variant="secondary" className="text-xs">
                      {feature}
                    </Badge>
                  ))}
                  {role.features.length > 3 && (
                    <Badge variant="secondary" className="text-xs">
                      +{role.features.length - 3} more
                    </Badge>
                  )}
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}

/**
 * =============================================================================
 * COMPACT ROLE INDICATOR
 * =============================================================================
 * Shows current role as a small badge (useful for prototypes)
 */

interface RoleIndicatorProps {
  currentRole: UserRole;
}

export function RoleIndicator({ currentRole }: RoleIndicatorProps) {
  const role = roleDefinitions[currentRole];
  
  return (
    <div className="fixed bottom-4 right-4 z-50">
      <div
        className="px-4 py-2 rounded-lg shadow-lg border-2 flex items-center space-x-2"
        style={{
          backgroundColor: `${role.color}15`,
          borderColor: role.color,
        }}
      >
        <Eye className="w-4 h-4" style={{ color: role.color }} />
        <span className="text-sm font-medium" style={{ color: role.color }}>
          {role.icon} Viewing as: {role.label}
        </span>
      </div>
    </div>
  );
}

/**
 * =============================================================================
 * USAGE EXAMPLES
 * =============================================================================
 * 
 * 1. Navigation Bar Dropdown:
 * ```tsx
 * <AudienceToggle
 *   currentRole={userRole}
 *   onRoleChange={setUserRole}
 *   variant="dropdown"
 *   label="View As"
 * />
 * ```
 * 
 * 2. Testing Panel Tabs:
 * ```tsx
 * <AudienceToggle
 *   currentRole={userRole}
 *   onRoleChange={setUserRole}
 *   variant="tabs"
 *   availableRoles={['visitor', 'learner', 'coach']}
 * />
 * ```
 * 
 * 3. Full Settings Panel:
 * ```tsx
 * <AudienceToggle
 *   currentRole={userRole}
 *   onRoleChange={setUserRole}
 *   variant="buttons"
 * />
 * ```
 * 
 * 4. Role Indicator Badge:
 * ```tsx
 * <RoleIndicator currentRole={userRole} />
 * ```
 * 
 * 5. In App.tsx:
 * ```tsx
 * const [userRole, setUserRole] = useState<UserRole>('learner');
 * 
 * // In development only
 * {process.env.NODE_ENV === 'development' && (
 *   <AudienceToggle
 *     currentRole={userRole}
 *     onRoleChange={setUserRole}
 *     variant="dropdown"
 *   />
 * )}
 * ```
 * 
 * =============================================================================
 * SALESFORCE IMPLEMENTATION NOTES
 * =============================================================================
 * 
 * In Production Experience Cloud:
 * - User role determined automatically by Profile and Permission Sets
 * - No manual toggle exists
 * - Audience targeting controls component visibility declaratively
 * 
 * Audience Targeting Setup:
 * 1. Navigate to Experience Builder
 * 2. Select component
 * 3. Click "Audience Targeting"
 * 4. Select audiences (e.g., "Learner Community", "Coach Community")
 * 5. Component visible only to selected audiences
 * 
 * Permission Set Groups:
 * - Learner_Access (Trail__c read, Project__c create/edit)
 * - Coach_Access (Assessment__c create, all learner records read)
 * - Partner_Access (Partner_Project__c read/edit)
 * - Admin_Access (All objects, all operations)
 * 
 * Profile Mapping:
 * - Guest User → Visitor experience
 * - Learner Community → Learner experience
 * - Coach Community → Coach experience
 * - Partner Community → Partner experience
 * - System Administrator → Admin experience
 * 
 * =============================================================================
 */
