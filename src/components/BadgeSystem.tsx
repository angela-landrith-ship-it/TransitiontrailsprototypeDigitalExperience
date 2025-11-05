import { Trophy, Star, Compass, Crown, Lock, Sparkles, CheckCircle } from 'lucide-react';
import { Badge } from './ui/badge';
import { useState } from 'react';

interface BadgeTier {
  id: string;
  name: string;
  minPoints: number;
  maxPoints: number;
  icon: any;
  color: string;
  gradient: string;
  description: string;
  rewards: string[];
}

interface BadgeSystemProps {
  currentPoints: number;
  onCelebrate?: (badgeName: string) => void;
}

const badgeTiers: BadgeTier[] = [
  {
    id: 'explorer',
    name: 'Explorer',
    minPoints: 0,
    maxPoints: 49,
    icon: Compass,
    color: '#7EB5C1',
    gradient: 'from-[#7EB5C1] to-[#2C6975]',
    description: 'Starting your journey on the trails',
    rewards: ['Access to visitor courses', 'Public community channels', 'Penny preview mode']
  },
  {
    id: 'trailblazer',
    name: 'Trailblazer',
    minPoints: 50,
    maxPoints: 149,
    icon: Star,
    color: '#F9A03F',
    gradient: 'from-[#F9A03F] to-[#e89135]',
    description: 'Actively exploring and engaging',
    rewards: ['Full Academy access', 'Capstone projects', 'Coach sessions', 'Penny AI mentoring']
  },
  {
    id: 'pathfinder',
    name: 'Pathfinder',
    minPoints: 150,
    maxPoints: 299,
    icon: Trophy,
    color: '#3B6A52',
    gradient: 'from-[#3B6A52] to-[#2C6975]',
    description: 'Making significant progress on your path',
    rewards: ['Advanced modules', 'LinkedIn optimization', 'Priority coach access', 'Community leader badge']
  },
  {
    id: 'trail-master',
    name: 'Trail Master',
    minPoints: 300,
    maxPoints: Infinity,
    icon: Crown,
    color: '#2C6975',
    gradient: 'from-[#2C6975] via-[#3B6A52] to-[#F9A03F]',
    description: 'Mastered the trails and inspiring others',
    rewards: ['Mentor status', 'Exclusive events', 'Job placement support', 'Lifetime community access']
  }
];

export function BadgeSystem({ currentPoints, onCelebrate }: BadgeSystemProps) {
  const [showConfetti, setShowConfetti] = useState<string | null>(null);
  const [selectedBadge, setSelectedBadge] = useState<BadgeTier | null>(null);

  const currentBadge = badgeTiers.find(
    tier => currentPoints >= tier.minPoints && currentPoints <= tier.maxPoints
  ) || badgeTiers[0];

  const nextBadge = badgeTiers.find(tier => tier.minPoints > currentPoints);

  const handleBadgeClick = (badge: BadgeTier) => {
    setSelectedBadge(badge);
  };

  const isUnlocked = (badge: BadgeTier) => currentPoints >= badge.minPoints;
  const isCurrentBadge = (badge: BadgeTier) => badge.id === currentBadge.id;

  return (
    <div className="space-y-6">
      {/* Current Badge Showcase */}
      <div className={`bg-gradient-to-br ${currentBadge.gradient} rounded-xl p-6 text-white relative overflow-hidden`}>
        <div className="absolute top-0 right-0 w-32 h-32 opacity-10">
          <currentBadge.icon className="w-full h-full" />
        </div>
        
        <div className="relative">
          <div className="flex items-start justify-between mb-4">
            <div>
              <Badge className="bg-white/20 text-white mb-2">Current Level</Badge>
              <h3 className="text-2xl mb-1">{currentBadge.name}</h3>
              <p className="text-white/90 text-sm">{currentBadge.description}</p>
            </div>
            <div className="w-16 h-16 rounded-full bg-white/20 flex items-center justify-center ring-4 ring-white/30">
              <currentBadge.icon className="w-8 h-8" />
            </div>
          </div>

          <div className="flex items-center space-x-2 mb-3">
            <Sparkles className="w-4 h-4" />
            <span className="text-sm">{currentPoints} Exploration Points</span>
          </div>

          {nextBadge && (
            <div className="bg-white/10 rounded-lg p-3 border border-white/20">
              <div className="flex items-center justify-between text-sm mb-2">
                <span>Next: {nextBadge.name}</span>
                <span>{nextBadge.minPoints - currentPoints} points to go</span>
              </div>
              <div className="h-2 bg-white/20 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-white rounded-full transition-all duration-500"
                  style={{ 
                    width: `${Math.min(((currentPoints - currentBadge.minPoints) / (nextBadge.minPoints - currentBadge.minPoints)) * 100, 100)}%` 
                  }}
                />
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Badge Gallery */}
      <div>
        <h3 className="text-xl text-gray-900 mb-4">Badge Gallery</h3>
        <div className="grid md:grid-cols-2 gap-4">
          {badgeTiers.map((badge) => {
            const unlocked = isUnlocked(badge);
            const current = isCurrentBadge(badge);
            const BadgeIcon = badge.icon;

            return (
              <button
                key={badge.id}
                onClick={() => handleBadgeClick(badge)}
                className={`relative bg-white rounded-xl p-4 border-2 transition-all text-left ${
                  current
                    ? 'border-[#F9A03F] shadow-lg'
                    : unlocked
                    ? 'border-gray-200 hover:border-gray-300 hover:shadow-md'
                    : 'border-gray-200 opacity-60'
                }`}
              >
                <div className="flex items-start space-x-4">
                  <div 
                    className={`w-16 h-16 rounded-xl flex items-center justify-center ${
                      unlocked
                        ? `bg-gradient-to-br ${badge.gradient} shadow-lg`
                        : 'bg-gray-200'
                    } relative`}
                  >
                    {unlocked ? (
                      <>
                        <BadgeIcon className="w-8 h-8 text-white" />
                        {current && (
                          <div className="absolute -top-1 -right-1 w-5 h-5 bg-[#F9A03F] rounded-full flex items-center justify-center ring-2 ring-white">
                            <Sparkles className="w-3 h-3 text-white" />
                          </div>
                        )}
                      </>
                    ) : (
                      <Lock className="w-8 h-8 text-gray-400" />
                    )}
                  </div>

                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-1">
                      <h4 className="text-gray-900">{badge.name}</h4>
                      {current && (
                        <Badge className="bg-[#F9A03F] text-white text-xs">Current</Badge>
                      )}
                      {unlocked && !current && (
                        <CheckCircle className="w-4 h-4 text-green-500" />
                      )}
                    </div>
                    <p className="text-sm text-gray-600 mb-2">{badge.description}</p>
                    <div className="text-xs text-gray-500">
                      {unlocked 
                        ? `Unlocked at ${badge.minPoints} points` 
                        : `Unlock at ${badge.minPoints} points`
                      }
                    </div>
                  </div>
                </div>

                {/* Hover tooltip */}
                <div className="group">
                  <div className="absolute bottom-full left-0 mb-2 hidden group-hover:block z-10 w-full">
                    <div className="bg-gray-900 text-white text-xs rounded-lg p-3 shadow-xl">
                      <p className="mb-2">How to earn this badge:</p>
                      <ul className="space-y-1">
                        {badge.rewards.map((reward, idx) => (
                          <li key={idx} className="flex items-start space-x-2">
                            <span className="text-[#F9A03F]">•</span>
                            <span>{reward}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Badge Detail Modal */}
      {selectedBadge && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4"
             onClick={() => setSelectedBadge(null)}>
          <div className="bg-white rounded-xl shadow-2xl max-w-md w-full p-6 animate-fade-in"
               onClick={(e) => e.stopPropagation()}>
            <div className="text-center mb-6">
              <div className={`w-24 h-24 rounded-full bg-gradient-to-br ${selectedBadge.gradient} mx-auto mb-4 flex items-center justify-center ring-4 ring-gray-100`}>
                <selectedBadge.icon className="w-12 h-12 text-white" />
              </div>
              <h3 className="text-2xl text-gray-900 mb-2">{selectedBadge.name}</h3>
              <p className="text-gray-600">{selectedBadge.description}</p>
            </div>

            <div className="bg-gray-50 rounded-lg p-4 mb-4">
              <h4 className="text-sm text-gray-700 mb-2">Unlocks & Rewards:</h4>
              <div className="space-y-2">
                {selectedBadge.rewards.map((reward, idx) => (
                  <div key={idx} className="flex items-start space-x-2">
                    <CheckCircle className="w-4 h-4 text-green-500 mt-0.5" />
                    <span className="text-sm text-gray-700">{reward}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="text-center">
              {isUnlocked(selectedBadge) ? (
                <div className="bg-green-50 border border-green-200 rounded-lg p-3">
                  <CheckCircle className="w-5 h-5 text-green-500 mx-auto mb-1" />
                  <p className="text-sm text-green-700">Badge Unlocked!</p>
                </div>
              ) : (
                <div className="bg-gray-50 border border-gray-200 rounded-lg p-3">
                  <Lock className="w-5 h-5 text-gray-400 mx-auto mb-1" />
                  <p className="text-sm text-gray-600">
                    {selectedBadge.minPoints - currentPoints} more points to unlock
                  </p>
                </div>
              )}
            </div>

            <button
              onClick={() => setSelectedBadge(null)}
              className="w-full mt-4 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* Confetti animation */}
      {showConfetti && (
        <div className="fixed inset-0 pointer-events-none z-50">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute w-2 h-2 bg-[#F9A03F] rounded-full animate-confetti-fall"
              style={{
                left: `${Math.random() * 100}%`,
                top: '-10px',
                animationDelay: `${Math.random() * 0.5}s`,
                animationDuration: `${2 + Math.random()}s`
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
}
