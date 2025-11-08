import { X, Sparkles, Briefcase, Code, Network, BarChart3, ArrowRight, CheckCircle, Calendar, Clock } from 'lucide-react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { useState } from 'react';

interface MasteryEnrollmentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onEnroll: (data: EnrollmentData) => void;
  userName: string;
  guidedTrailScore?: number;
  guidedTrailLevel?: string;
}

interface EnrollmentData {
  roleTrack: string;
  careerGoals: string;
  timeCommitment: string;
  startDate: string;
}

const roleTracks = [
  {
    id: 'product-owner',
    title: 'Product Owner',
    description: 'Strategic planning, stakeholder management, and business process optimization',
    icon: Briefcase,
    color: '#F9A03F',
    duration: '12-16 weeks',
    certifications: ['Salesforce Admin', 'Business Analyst'],
    badge: 'Trailblazer Visionary'
  },
  {
    id: 'developer',
    title: 'Developer',
    description: 'Apex, Lightning Web Components, and API integrations',
    icon: Code,
    color: '#2C6975',
    duration: '12-16 weeks',
    certifications: ['Platform Developer I', 'Platform Developer II'],
    badge: 'Trailblazer Engineer'
  },
  {
    id: 'solutions-architect',
    title: 'Solutions Architect',
    description: 'End-to-end solution design, data modeling, and multi-cloud integration',
    icon: Network,
    color: '#3B6A52',
    duration: '12-16 weeks',
    certifications: ['Application Architect', 'System Architect'],
    badge: 'Trailblazer Architect'
  },
  {
    id: 'business-analyst',
    title: 'Business Analyst',
    description: 'Discovery, documentation, and process optimization with automation tools',
    icon: BarChart3,
    color: '#7EB5C1',
    duration: '12-16 weeks',
    certifications: ['Business Analyst', 'Strategy Designer'],
    badge: 'Trailblazer Analyst'
  }
];

export function MasteryEnrollmentModal({
  isOpen,
  onClose,
  onEnroll,
  userName,
  guidedTrailScore = 0,
  guidedTrailLevel = 'Complete'
}: MasteryEnrollmentModalProps) {
  const [step, setStep] = useState(1);
  const [selectedRole, setSelectedRole] = useState<string | null>(null);
  const [formData, setFormData] = useState<Partial<EnrollmentData>>({
    careerGoals: '',
    timeCommitment: 'part-time',
    startDate: ''
  });

  if (!isOpen) return null;

  const selectedTrack = roleTracks.find(r => r.id === selectedRole);

  const handleSubmit = () => {
    if (selectedRole) {
      onEnroll({
        roleTrack: selectedRole,
        careerGoals: formData.careerGoals || '',
        timeCommitment: formData.timeCommitment || 'part-time',
        startDate: formData.startDate || ''
      });
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-fade-in">
      <div className="bg-[#F5F3E8] rounded-xl shadow-2xl max-w-5xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-gradient-to-r from-[#3B6A52] to-[#2C6975] text-white p-6 rounded-t-xl z-10">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              {step === 1 ? (
                <>
                  <div className="flex items-center space-x-2 mb-2">
                    <Sparkles className="w-6 h-6" />
                    <Badge className="bg-white/20 text-white border-0">
                      Advanced Learning
                    </Badge>
                  </div>
                  <h2 className="text-3xl mb-2">Ready for Mastery?</h2>
                  <p className="text-white/90 text-lg">
                    Choose your specialized Salesforce role path
                  </p>
                </>
              ) : (
                <>
                  <h2 className="text-3xl mb-2">{selectedTrack?.title} Track</h2>
                  <p className="text-white/90">Complete your enrollment details</p>
                </>
              )}
            </div>
            <button
              onClick={onClose}
              className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          {step === 1 ? (
            /* Step 1: Role Selection */
            <>
              {/* Penny Message */}
              <div className="bg-gradient-to-r from-[#3B6A52]/10 to-[#2C6975]/10 border-2 border-[#3B6A52]/20 rounded-lg p-4 mb-6">
                <div className="flex items-start space-x-3">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#3B6A52] to-[#2C6975] flex items-center justify-center flex-shrink-0">
                    <Sparkles className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <p className="text-gray-900 mb-2">
                      🌟 Congratulations, {userName}! You've completed the Guided Trail with a {guidedTrailScore}% score.
                    </p>
                    <p className="text-gray-700">
                      Ready to take the next step toward Salesforce mastery? Choose a specialized role path that aligns with your career goals.
                    </p>
                  </div>
                </div>
              </div>

              {/* Role Track Cards */}
              <h3 className="text-xl text-gray-900 mb-4">Select Your Mastery Track:</h3>
              <div className="grid md:grid-cols-2 gap-4 mb-6">
                {roleTracks.map((track) => {
                  const Icon = track.icon;
                  const isSelected = selectedRole === track.id;
                  
                  return (
                    <button
                      key={track.id}
                      onClick={() => setSelectedRole(track.id)}
                      className={`text-left bg-white rounded-xl p-6 border-2 transition-all ${
                        isSelected 
                          ? 'border-[#3B6A52] shadow-lg' 
                          : 'border-gray-200 hover:border-gray-300 hover:shadow-md'
                      }`}
                    >
                      <div className="flex items-start justify-between mb-4">
                        <div 
                          className="w-12 h-12 rounded-lg flex items-center justify-center"
                          style={{ backgroundColor: `${track.color}15` }}
                        >
                          <Icon className="w-6 h-6" style={{ color: track.color }} />
                        </div>
                        {isSelected && (
                          <CheckCircle className="w-6 h-6 text-[#3B6A52]" />
                        )}
                      </div>

                      <h4 className="text-gray-900 mb-2">{track.title}</h4>
                      <p className="text-sm text-gray-600 mb-4">{track.description}</p>

                      <div className="space-y-2">
                        <div className="flex items-center space-x-2 text-xs text-gray-500">
                          <Clock className="w-3 h-3" />
                          <span>{track.duration}</span>
                        </div>
                        <div className="flex flex-wrap gap-1">
                          {track.certifications.map((cert) => (
                            <Badge 
                              key={cert} 
                              className="text-xs border-0"
                              style={{ 
                                backgroundColor: `${track.color}20`,
                                color: track.color
                              }}
                            >
                              {cert}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* What You'll Get */}
              <div className="bg-white rounded-lg p-6 border border-gray-200 mb-6">
                <h4 className="text-gray-900 mb-4">What's Included:</h4>
                <div className="grid md:grid-cols-2 gap-3">
                  {[
                    '16 advanced learning modules',
                    '3 team-based projects',
                    'Personal mentor (bi-weekly 1:1s)',
                    'Real-world capstone project',
                    'Certification prep support',
                    'Exclusive Slack workspace',
                    'Job placement assistance',
                    'Trailblazer Master badge'
                  ].map((item, index) => (
                    <div key={index} className="flex items-start space-x-2">
                      <CheckCircle className="w-4 h-4 text-[#3B6A52] flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-gray-700">{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* CTA */}
              <Button
                onClick={() => setStep(2)}
                disabled={!selectedRole}
                className="w-full bg-[#3B6A52] hover:bg-[#2d5240] text-white py-6 text-lg disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <span>Continue to Enrollment</span>
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </>
          ) : (
            /* Step 2: Enrollment Details */
            <>
              {/* Selected Track Summary */}
              <div className="bg-white rounded-lg p-4 border-2 mb-6" style={{ borderColor: `${selectedTrack?.color}30` }}>
                <div className="flex items-center space-x-3">
                  {selectedTrack && (
                    <>
                      <div 
                        className="w-10 h-10 rounded-lg flex items-center justify-center"
                        style={{ backgroundColor: `${selectedTrack.color}15` }}
                      >
                        <selectedTrack.icon className="w-5 h-5" style={{ color: selectedTrack.color }} />
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Selected Track</p>
                        <p className="text-gray-900">{selectedTrack.title}</p>
                      </div>
                    </>
                  )}
                  <button
                    onClick={() => setStep(1)}
                    className="ml-auto text-sm text-[#3B6A52] hover:underline"
                  >
                    Change
                  </button>
                </div>
              </div>

              {/* Career Goals */}
              <div className="mb-6">
                <label className="block text-gray-900 mb-2">
                  Career Goals
                  <span className="text-gray-500 text-sm ml-1">(optional)</span>
                </label>
                <textarea
                  value={formData.careerGoals}
                  onChange={(e) => setFormData({ ...formData, careerGoals: e.target.value })}
                  placeholder="Where do you see yourself in 6 months? Which certifications are you targeting?"
                  className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3B6A52] resize-none"
                  rows={4}
                />
              </div>

              {/* Time Commitment */}
              <div className="mb-6">
                <label className="block text-gray-900 mb-2">Time Commitment</label>
                <div className="grid md:grid-cols-2 gap-3">
                  <button
                    onClick={() => setFormData({ ...formData, timeCommitment: 'part-time' })}
                    className={`text-left bg-white rounded-lg p-4 border-2 transition-all ${
                      formData.timeCommitment === 'part-time'
                        ? 'border-[#3B6A52] bg-[#3B6A52]/5'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-gray-900">Part-time</span>
                      {formData.timeCommitment === 'part-time' && (
                        <CheckCircle className="w-5 h-5 text-[#3B6A52]" />
                      )}
                    </div>
                    <p className="text-sm text-gray-600">10-15 hours/week</p>
                    <p className="text-xs text-gray-500 mt-1">Ideal for working professionals</p>
                  </button>

                  <button
                    onClick={() => setFormData({ ...formData, timeCommitment: 'full-time' })}
                    className={`text-left bg-white rounded-lg p-4 border-2 transition-all ${
                      formData.timeCommitment === 'full-time'
                        ? 'border-[#3B6A52] bg-[#3B6A52]/5'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-gray-900">Full-time</span>
                      {formData.timeCommitment === 'full-time' && (
                        <CheckCircle className="w-5 h-5 text-[#3B6A52]" />
                      )}
                    </div>
                    <p className="text-sm text-gray-600">25-30 hours/week</p>
                    <p className="text-xs text-gray-500 mt-1">Accelerated pace</p>
                  </button>
                </div>
              </div>

              {/* Start Date */}
              <div className="mb-6">
                <label className="block text-gray-900 mb-2">Preferred Start Date</label>
                <div className="grid md:grid-cols-3 gap-3">
                  {[
                    { date: '2025-01-15', label: 'Jan 15, 2025', cohort: 'Winter Cohort', spots: 8 },
                    { date: '2025-02-12', label: 'Feb 12, 2025', cohort: 'Spring Cohort', spots: 15 },
                    { date: '2025-03-18', label: 'Mar 18, 2025', cohort: 'Q1 Cohort', spots: 20 }
                  ].map((option) => (
                    <button
                      key={option.date}
                      onClick={() => setFormData({ ...formData, startDate: option.date })}
                      className={`text-left bg-white rounded-lg p-4 border-2 transition-all ${
                        formData.startDate === option.date
                          ? 'border-[#3B6A52] bg-[#3B6A52]/5'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <Calendar className="w-4 h-4 text-[#3B6A52]" />
                        {formData.startDate === option.date && (
                          <CheckCircle className="w-5 h-5 text-[#3B6A52]" />
                        )}
                      </div>
                      <p className="text-gray-900 mb-1">{option.label}</p>
                      <p className="text-xs text-gray-600 mb-1">{option.cohort}</p>
                      <p className="text-xs text-[#F9A03F]">{option.spots} spots left</p>
                    </button>
                  ))}
                </div>
              </div>

              {/* Investment */}
              <div className="bg-gradient-to-br from-[#3B6A52] to-[#2C6975] text-white rounded-lg p-6 mb-6">
                <div className="text-center mb-4">
                  <p className="text-white/80 mb-2">Investment</p>
                  <div className="flex items-baseline justify-center space-x-2">
                    <span className="text-4xl">$2,495</span>
                    <span className="text-xl text-white/80">/program</span>
                  </div>
                  <p className="text-sm text-white/70 mt-2">12-16 week comprehensive mastery program</p>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center space-x-2 text-sm">
                    <CheckCircle className="w-4 h-4 text-[#7EB5C1]" />
                    <span>Payment plans available (3-6 months)</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm">
                    <CheckCircle className="w-4 h-4 text-[#7EB5C1]" />
                    <span>30-day money-back guarantee</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm">
                    <CheckCircle className="w-4 h-4 text-[#7EB5C1]" />
                    <span>Scholarships available for nonprofits</span>
                  </div>
                </div>
              </div>

              {/* CTAs */}
              <div className="flex flex-col sm:flex-row gap-3">
                <Button
                  onClick={() => setStep(1)}
                  variant="outline"
                  className="flex-1 border-gray-300 text-gray-700 hover:bg-gray-50"
                >
                  Back
                </Button>
                <Button
                  onClick={handleSubmit}
                  disabled={!formData.startDate}
                  className="flex-1 bg-[#3B6A52] hover:bg-[#2d5240] text-white py-6 disabled:opacity-50"
                >
                  <span>Enroll in {selectedTrack?.title} Track</span>
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </div>

              <p className="text-xs text-gray-500 text-center mt-4">
                By enrolling, you agree to our Terms of Service and Privacy Policy
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
