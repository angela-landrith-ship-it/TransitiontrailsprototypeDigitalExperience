import { Lock, Trophy, Target, Users, ArrowRight, CheckCircle } from 'lucide-react';

interface LockedFeatureModalProps {
  feature: 'capstone' | 'skills' | 'coach';
  onClose: () => void;
  onEnroll: () => void;
}

export function LockedFeatureModal({ feature, onClose, onEnroll }: LockedFeatureModalProps) {
  const featureDetails = {
    capstone: {
      icon: Trophy,
      title: 'Capstone Projects',
      description: 'Build real-world Salesforce applications for nonprofit organizations',
      color: '#F9A03F',
      benefits: [
        'Work on actual nonprofit projects with real impact',
        'Build a professional portfolio',
        'Earn 40% of your total program points',
        'Get code reviews from experienced developers',
        'Linear project management integration',
        'GitHub collaboration and version control'
      ]
    },
    skills: {
      icon: Target,
      title: 'Skills Assessment & Goals',
      description: 'Track your progress with personalized skill assessments and goal setting',
      color: '#2C6975',
      benefits: [
        'Comprehensive Skills IQ baseline assessment',
        'Personalized learning path recommendations',
        'Bi-weekly coach feedback assessments',
        'Track progress across 12-week program',
        'Industry-standard certification prep',
        'Career readiness evaluations'
      ]
    },
    coach: {
      icon: Users,
      title: 'Personal Coaching',
      description: 'Get 1:1 guidance from experienced learning coaches',
      color: '#3B6A52',
      benefits: [
        'Weekly 1:1 coaching sessions',
        'Personalized feedback on your work',
        'Career development guidance',
        'Accountability and motivation',
        'Industry insights and networking',
        'Job placement support'
      ]
    }
  };

  const details = featureDetails[feature];
  const Icon = details.icon;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div 
          className="p-8 text-white relative overflow-hidden"
          style={{ backgroundColor: details.color }}
        >
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-32 -mt-32"></div>
          <div className="relative">
            <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center mb-4">
              <Icon className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-3xl mb-2">{details.title}</h2>
            <p className="text-white/90">{details.description}</p>
          </div>
        </div>

        {/* Content */}
        <div className="p-8">
          {/* Lock Notice */}
          <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mb-6 flex items-start space-x-3">
            <Lock className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-sm text-amber-900 mb-1">
                This feature unlocks when you join the Trail of Mastery program
              </p>
              <p className="text-xs text-amber-700">
                As a visitor, you can explore preview courses and community events for free
              </p>
            </div>
          </div>

          {/* Benefits */}
          <div className="mb-6">
            <h3 className="text-lg text-gray-900 mb-4">What You'll Get:</h3>
            <div className="space-y-3">
              {details.benefits.map((benefit, index) => (
                <div key={index} className="flex items-start space-x-3">
                  <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                  <p className="text-gray-700">{benefit}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Program Overview */}
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 mb-6">
            <h3 className="text-gray-900 mb-4">Trail of Mastery Program Includes:</h3>
            <div className="grid md:grid-cols-3 gap-4 text-center">
              <div>
                <div className="text-2xl text-[#2C6975] mb-1">12 Weeks</div>
                <div className="text-sm text-gray-600">Guided Learning</div>
              </div>
              <div>
                <div className="text-2xl text-[#F9A03F] mb-1">3,500</div>
                <div className="text-sm text-gray-600">Total Points</div>
              </div>
              <div>
                <div className="text-2xl text-[#3B6A52] mb-1">24/7</div>
                <div className="text-sm text-gray-600">Penny AI Support</div>
              </div>
            </div>
          </div>

          {/* Testimonial */}
          <div className="bg-gradient-to-r from-[#7EB5C1]/10 to-[#2C6975]/10 rounded-lg p-6 mb-6">
            <p className="text-gray-700 italic mb-3">
              "The capstone project was transformative. Building a real Salesforce app for a nonprofit 
              gave me the confidence and portfolio I needed to land my first tech job."
            </p>
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#2C6975] to-[#7EB5C1] flex items-center justify-center text-white">
                SM
              </div>
              <div>
                <p className="text-sm text-gray-900">Sarah Martinez</p>
                <p className="text-xs text-gray-600">Program Graduate, now Salesforce Admin</p>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-3">
            <button
              onClick={onClose}
              className="flex-1 px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Continue Exploring
            </button>
            <button
              onClick={onEnroll}
              className="flex-1 px-6 py-3 text-white rounded-lg hover:opacity-90 transition-all shadow-lg hover:shadow-xl flex items-center justify-center space-x-2"
              style={{ backgroundColor: details.color }}
            >
              <span>Join the Academy</span>
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
