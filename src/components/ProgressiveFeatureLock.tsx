import { Lock, ArrowRight, Sparkles } from 'lucide-react';
import { Button } from './ui/button';

interface ProgressiveFeatureLockProps {
  isLocked: boolean;
  unlockLevel: 'visitor' | 'guided' | 'mastery';
  featureName?: string;
  children: React.ReactNode;
  onUpgrade?: () => void;
  customMessage?: string;
}

const unlockMessages = {
  visitor: {
    title: 'Join the Visitor Trail',
    description: 'Create a free account to explore this feature',
    cta: 'Sign Up Free'
  },
  guided: {
    title: 'Unlock with Guided Trail',
    description: 'Upgrade to access this feature and personalized coaching',
    cta: 'Upgrade Now'
  },
  mastery: {
    title: 'Trail of Mastery',
    description: 'Complete the Guided Trail to access advanced tracks',
    cta: 'Learn More'
  }
};

export function ProgressiveFeatureLock({ 
  isLocked, 
  unlockLevel, 
  featureName,
  children, 
  onUpgrade,
  customMessage 
}: ProgressiveFeatureLockProps) {
  if (!isLocked) {
    return <>{children}</>;
  }

  const message = unlockMessages[unlockLevel];
  const accentColor = unlockLevel === 'visitor' ? '#7EB5C1' : 
                      unlockLevel === 'guided' ? '#F9A03F' : '#2C6975';

  return (
    <div className="relative">
      {/* Content with blur */}
      <div className="blur-sm pointer-events-none select-none">
        {children}
      </div>

      {/* Overlay */}
      <div 
        className="absolute inset-0 bg-white/40 backdrop-blur-sm flex items-center justify-center z-10 rounded-lg border-2"
        style={{ borderColor: `${accentColor}30` }}
      >
        <div className="text-center px-6 py-8 max-w-md">
          {/* Lock Icon */}
          <div 
            className="w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center"
            style={{ backgroundColor: `${accentColor}15` }}
          >
            <Lock className="w-8 h-8" style={{ color: accentColor }} />
          </div>

          {/* Feature Name */}
          {featureName && (
            <p className="text-xs text-gray-500 mb-2">{featureName}</p>
          )}

          {/* Message */}
          <h3 className="text-gray-900 mb-2">{message.title}</h3>
          <p className="text-sm text-gray-600 mb-4">
            {customMessage || message.description}
          </p>

          {/* CTA Button */}
          {onUpgrade && (
            <Button
              onClick={onUpgrade}
              className="text-white shadow-lg hover:shadow-xl transition-all"
              style={{ backgroundColor: accentColor }}
            >
              <span>{message.cta}</span>
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          )}

          {/* Sparkle indicator */}
          <div className="mt-4 flex items-center justify-center space-x-2 text-xs text-gray-500">
            <Sparkles className="w-3 h-3" style={{ color: accentColor }} />
            <span>Premium Feature</span>
          </div>
        </div>
      </div>
    </div>
  );
}
