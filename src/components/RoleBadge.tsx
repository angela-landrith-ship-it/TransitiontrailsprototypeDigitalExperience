import { Badge } from './ui/badge';
import { Eye, Compass, Mountain, Sparkles } from 'lucide-react';

export type UserRole = 'guest' | 'visitor' | 'guided' | 'mastery';

interface RoleBadgeProps {
  role: UserRole;
  size?: 'sm' | 'md' | 'lg';
  showIcon?: boolean;
  className?: string;
}

const roleConfig = {
  guest: {
    label: 'Guest',
    color: '#7EB5C1',
    bgColor: '#7EB5C120',
    icon: Eye,
    description: 'Exploring'
  },
  visitor: {
    label: 'Visitor',
    color: '#7EB5C1',
    bgColor: '#7EB5C120',
    icon: Compass,
    description: 'Visitor Trail'
  },
  guided: {
    label: 'Guided',
    color: '#F9A03F',
    bgColor: '#F9A03F20',
    icon: Mountain,
    description: 'Guided Trail'
  },
  mastery: {
    label: 'Mastery',
    color: '#2C6975',
    bgColor: '#2C697520',
    icon: Sparkles,
    description: 'Trail of Mastery'
  }
};

export function RoleBadge({ role, size = 'md', showIcon = true, className = '' }: RoleBadgeProps) {
  const config = roleConfig[role];
  const Icon = config.icon;

  const sizeClasses = {
    sm: 'text-xs px-2 py-0.5',
    md: 'text-sm px-3 py-1',
    lg: 'text-base px-4 py-1.5'
  };

  const iconSizes = {
    sm: 'w-3 h-3',
    md: 'w-4 h-4',
    lg: 'w-5 h-5'
  };

  return (
    <Badge 
      className={`${sizeClasses[size]} ${className} border-0 flex items-center space-x-1`}
      style={{ 
        backgroundColor: config.bgColor,
        color: config.color
      }}
    >
      {showIcon && <Icon className={iconSizes[size]} />}
      <span>{config.label}</span>
    </Badge>
  );
}

// Variant with description for headers
interface RoleBadgeWithDescriptionProps {
  role: UserRole;
  userName?: string;
  showProgress?: boolean;
  progressPercent?: number;
}

export function RoleBadgeWithDescription({ 
  role, 
  userName,
  showProgress,
  progressPercent = 0
}: RoleBadgeWithDescriptionProps) {
  const config = roleConfig[role];
  const Icon = config.icon;

  return (
    <div className="flex items-center space-x-3">
      <div 
        className="w-10 h-10 rounded-lg flex items-center justify-center"
        style={{ backgroundColor: config.bgColor }}
      >
        <Icon className="w-5 h-5" style={{ color: config.color }} />
      </div>
      <div className="flex-1">
        <div className="flex items-center space-x-2">
          <p className="text-gray-900">
            {userName ? `${userName} • ` : ''}{config.description}
          </p>
          <RoleBadge role={role} size="sm" showIcon={false} />
        </div>
        {showProgress && (
          <div className="flex items-center space-x-2 mt-1">
            <div className="flex-1 h-1.5 bg-gray-200 rounded-full overflow-hidden">
              <div 
                className="h-full rounded-full transition-all duration-500"
                style={{ 
                  width: `${progressPercent}%`,
                  backgroundColor: config.color 
                }}
              />
            </div>
            <p className="text-xs text-gray-600">{progressPercent}%</p>
          </div>
        )}
      </div>
    </div>
  );
}
