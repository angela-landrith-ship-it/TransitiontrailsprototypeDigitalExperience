import { CheckCircle, Circle, Trophy, ArrowRight } from 'lucide-react';

interface ConversionStep {
  id: string;
  label: string;
  completed: boolean;
  points?: number;
}

interface ConversionMeterProps {
  steps: ConversionStep[];
  onEnroll: () => void;
  showConfetti?: boolean;
}

export function ConversionMeter({ steps, onEnroll, showConfetti = false }: ConversionMeterProps) {
  const completedSteps = steps.filter(s => s.completed).length;
  const totalSteps = steps.length;
  const percentage = (completedSteps / totalSteps) * 100;
  const isComplete = completedSteps === totalSteps;

  return (
    <div className="bg-white border-2 border-gray-200 rounded-xl p-6 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-32 h-32 opacity-5">
        <Trophy className="w-full h-full" />
      </div>

      <div className="relative">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-lg text-gray-900 mb-1">Your Journey to Full Access</h3>
            <p className="text-sm text-gray-600">{completedSteps} of {totalSteps} steps completed</p>
          </div>
          <div className="text-right">
            <div className="text-2xl text-[#F9A03F]">{Math.round(percentage)}%</div>
            <div className="text-xs text-gray-500">Complete</div>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="mb-6">
          <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
            <div 
              className={`h-full rounded-full transition-all duration-500 ${
                isComplete 
                  ? 'bg-gradient-to-r from-[#3B6A52] to-[#2C6975]' 
                  : 'bg-gradient-to-r from-[#F9A03F] to-[#e89135]'
              }`}
              style={{ width: `${percentage}%` }}
            />
          </div>
        </div>

        {/* Steps */}
        <div className="space-y-3 mb-6">
          {steps.map((step, index) => (
            <div 
              key={step.id}
              className={`flex items-center space-x-3 p-3 rounded-lg transition-all ${
                step.completed 
                  ? 'bg-green-50 border-2 border-green-200' 
                  : 'bg-gray-50 border-2 border-gray-200'
              }`}
            >
              {step.completed ? (
                <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
              ) : (
                <Circle className="w-5 h-5 text-gray-400 flex-shrink-0" />
              )}
              
              <div className="flex-1">
                <p className={`text-sm ${step.completed ? 'text-gray-900' : 'text-gray-600'}`}>
                  {step.label}
                </p>
              </div>

              {step.points && step.completed && (
                <div className="flex items-center space-x-1 text-xs text-green-700 bg-green-100 px-2 py-1 rounded-full">
                  <Trophy className="w-3 h-3" />
                  <span>+{step.points}</span>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* CTA */}
        {isComplete ? (
          <button
            onClick={onEnroll}
            className="w-full py-3 bg-gradient-to-r from-[#F9A03F] to-[#e89135] text-white rounded-lg hover:shadow-lg transition-all flex items-center justify-center space-x-2 group"
          >
            <Trophy className="w-5 h-5" />
            <span>Unlock Full Academy Access</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        ) : (
          <div className="text-center">
            <p className="text-sm text-gray-600 mb-3">
              Complete all steps to unlock enrollment
            </p>
            <button
              onClick={onEnroll}
              className="px-6 py-2 border-2 border-[#F9A03F] text-[#F9A03F] rounded-lg hover:bg-[#F9A03F]/5 transition-colors"
            >
              Enroll Now Anyway
            </button>
          </div>
        )}
      </div>

      {/* Confetti when complete */}
      {isComplete && showConfetti && (
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(15)].map((_, i) => (
            <div
              key={i}
              className="absolute w-2 h-2 rounded-full animate-confetti-fall"
              style={{
                left: `${Math.random() * 100}%`,
                top: '-10px',
                backgroundColor: ['#F9A03F', '#7EB5C1', '#3B6A52', '#2C6975'][Math.floor(Math.random() * 4)],
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

// Trailblazer Achievement Modal
export function TrailblazerModal({ onEnroll, onClose }: { onEnroll: () => void; onClose: () => void }) {
  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-[#F5F3E8] rounded-xl shadow-2xl max-w-lg w-full p-8 animate-fade-in relative overflow-hidden">
        {/* Confetti */}
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(30)].map((_, i) => (
            <div
              key={i}
              className="absolute w-2 h-2 rounded-full animate-confetti-fall"
              style={{
                left: `${Math.random() * 100}%`,
                top: '-10px',
                backgroundColor: ['#F9A03F', '#7EB5C1', '#3B6A52', '#2C6975'][Math.floor(Math.random() * 4)],
                animationDelay: `${Math.random() * 0.5}s`,
                animationDuration: `${2 + Math.random()}s`
              }}
            />
          ))}
        </div>

        <div className="text-center relative">
          {/* Trophy with animation */}
          <div className="mb-6 relative">
            <div className="w-24 h-24 rounded-full bg-gradient-to-br from-[#F9A03F] to-[#e89135] mx-auto flex items-center justify-center ring-8 ring-[#F9A03F]/20 animate-bounce-subtle">
              <Trophy className="w-12 h-12 text-white" />
            </div>
            {/* Penny clapping animation */}
            <div className="absolute -right-4 -bottom-2 text-4xl animate-bounce">
              👏
            </div>
          </div>

          <h2 className="text-3xl text-gray-900 mb-3">You're a Trailblazer now!</h2>
          <p className="text-lg text-gray-700 mb-6">
            Unlock full access by joining the Academy
          </p>

          {/* Benefits */}
          <div className="bg-white rounded-lg p-4 mb-6 text-left">
            <h4 className="text-sm text-gray-700 mb-3">What You'll Unlock:</h4>
            <div className="space-y-2">
              {[
                'Real nonprofit Capstone projects',
                'Full Penny AI mentoring (24/7)',
                '1:1 coaching sessions',
                '20+ advanced learning modules',
                'LinkedIn profile optimization',
                'Community leader badge'
              ].map((benefit, idx) => (
                <div key={idx} className="flex items-center space-x-2">
                  <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                  <span className="text-sm text-gray-700">{benefit}</span>
                </div>
              ))}
            </div>
          </div>

          {/* CTAs */}
          <div className="flex gap-3">
            <button
              onClick={onClose}
              className="flex-1 px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Continue Exploring
            </button>
            <button
              onClick={onEnroll}
              className="flex-1 px-6 py-3 bg-[#F9A03F] text-white rounded-lg hover:bg-[#e89135] transition-colors flex items-center justify-center space-x-2 shadow-lg hover:shadow-xl"
            >
              <span>Join the Academy</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
