import { GraduationCap, Users, Calendar, Sparkles, ArrowRight, CheckCircle, Play, Lock, Trophy, Target } from 'lucide-react';
import { useState } from 'react';
import { Badge } from './ui/badge';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface VisitorLandingProps {
  onStartTrail: () => void;
  onNavigate: (page: string) => void;
}

export function VisitorLanding({ onStartTrail, onNavigate }: VisitorLandingProps) {
  const [showOnboarding, setShowOnboarding] = useState(false);
  const [registrationStep, setRegistrationStep] = useState(1);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    interest: 'salesforce',
    agreeToSlack: false
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (registrationStep === 1) {
      setRegistrationStep(2);
    } else {
      // In production: creates Contact + Experience User with Visitor role
      console.log('Creating visitor profile:', formData);
      setRegistrationStep(2);
      setTimeout(() => {
        onStartTrail();
      }, 100);
    }
  };

  const features = [
    {
      icon: GraduationCap,
      title: 'Explore Learning Paths',
      description: 'Preview introductory courses in Salesforce, AI, and Nonprofit Leadership',
      color: '#2C6975'
    },
    {
      icon: Users,
      title: 'Join Public Community',
      description: 'Connect with learners in public Slack channels and events',
      color: '#7EB5C1'
    },
    {
      icon: Calendar,
      title: 'Attend Free Events',
      description: 'Access webinars, workshops, and community sessions',
      color: '#3B6A52'
    },
    {
      icon: Sparkles,
      title: 'Meet Penny AI',
      description: 'Get guidance from our AI learning assistant',
      color: '#F9A03F'
    }
  ];

  const testimonials = [
    {
      name: 'Sarah Martinez',
      role: 'Trail Mastery Graduate',
      quote: 'The Visitor Trail gave me the confidence to enroll. Now I\'m a certified Salesforce Admin!',
      avatar: 'SM'
    },
    {
      name: 'Jordan Kim',
      role: 'Current Learner',
      quote: 'Starting with free courses helped me understand if this was right for me. Best decision ever.',
      avatar: 'JK'
    }
  ];

  return (
    <div className="min-h-screen bg-[#F5F3E8]">
      {/* Hero Section with Real Photo */}
      <div className="relative overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0">
          <ImageWithFallback
            src="https://images.unsplash.com/photo-1610070835951-156b6921281d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkaXZlcnNlJTIwZ3JvdXAlMjBsZWFybmVycyUyMG91dGRvb3JzJTIwc3R1ZHlpbmd8ZW58MXx8fHwxNzYyMzEyNDg3fDA&ixlib=rb-4.1.0&q=80&w=1080"
            alt="Diverse group of learners outdoors"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#3B6A52]/95 to-[#2C6975]/90"></div>
        </div>

        {/* Hero Content */}
        <div className="relative py-24 px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12 animate-fade-in">
              <Badge className="bg-[#F9A03F] text-white mb-6 px-4 py-1.5">
                Free Visitor Access
              </Badge>
              <h1 className="text-5xl md:text-6xl mb-6 text-white">
                Explore the Trail Before You Join
              </h1>
              <p className="text-xl md:text-2xl text-white/95 mb-8 max-w-3xl mx-auto">
                Start your free Visitor Trail and see what the Academy offers.
              </p>
              <button
                onClick={() => setShowOnboarding(true)}
                className="group px-8 py-4 bg-[#F9A03F] text-white rounded-lg transition-all shadow-xl hover:shadow-2xl hover:shadow-[#F9A03F]/50 flex items-center space-x-2 mx-auto"
                style={{ 
                  transition: 'all 0.3s ease',
                }}
                onMouseEnter={(e) => e.currentTarget.style.boxShadow = '0 20px 50px rgba(249, 160, 63, 0.6)'}
                onMouseLeave={(e) => e.currentTarget.style.boxShadow = '0 20px 25px -5px rgba(0, 0, 0, 0.1)'}
              >
                <span>Start the Visitor Trail</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Features Grid */}
      <div className="max-w-6xl mx-auto px-4 py-16">
        <h2 className="text-3xl text-gray-900 text-center mb-12">What You Can Explore</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature) => {
            const Icon = feature.icon;
            return (
              <div key={feature.title} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-all">
                <div 
                  className="w-12 h-12 rounded-lg flex items-center justify-center mb-4"
                  style={{ backgroundColor: `${feature.color}15` }}
                >
                  <Icon className="w-6 h-6" style={{ color: feature.color }} />
                </div>
                <h3 className="text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-sm text-gray-600">{feature.description}</p>
              </div>
            );
          })}
        </div>
      </div>

      {/* What You'll Unlock */}
      <div className="bg-gradient-to-br from-[#F9A03F]/10 to-[#F9A03F]/5 py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl text-gray-900 text-center mb-4">Ready for More?</h2>
          <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
            When you join the full Academy, you'll unlock premium features and personalized learning paths
          </p>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white rounded-xl p-6 shadow-sm border-2 border-[#F9A03F]/30">
              <Trophy className="w-10 h-10 text-[#F9A03F] mb-4" />
              <h3 className="text-gray-900 mb-2">Capstone Projects</h3>
              <p className="text-sm text-gray-600 mb-4">Build real Salesforce applications for nonprofit organizations</p>
              <div className="flex items-center space-x-2 text-xs text-gray-500">
                <Lock className="w-3 h-3" />
                <span>Unlocks with enrollment</span>
              </div>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-sm border-2 border-[#2C6975]/30">
              <Target className="w-10 h-10 text-[#2C6975] mb-4" />
              <h3 className="text-gray-900 mb-2">Personal Coaching</h3>
              <p className="text-sm text-gray-600 mb-4">1:1 sessions with experienced learning coaches</p>
              <div className="flex items-center space-x-2 text-xs text-gray-500">
                <Lock className="w-3 h-3" />
                <span>Unlocks with enrollment</span>
              </div>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-sm border-2 border-[#7EB5C1]/30">
              <GraduationCap className="w-10 h-10 text-[#7EB5C1] mb-4" />
              <h3 className="text-gray-900 mb-2">Trail of Mastery</h3>
              <p className="text-sm text-gray-600 mb-4">Complete the 12-week guided learning path with certifications</p>
              <div className="flex items-center space-x-2 text-xs text-gray-500">
                <Lock className="w-3 h-3" />
                <span>Unlocks with enrollment</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Testimonials */}
      <div className="max-w-6xl mx-auto px-4 py-16">
        <h2 className="text-3xl text-gray-900 text-center mb-12">From Visitors to Success Stories</h2>
        <div className="grid md:grid-cols-2 gap-8">
          {testimonials.map((testimonial) => (
            <div key={testimonial.name} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center space-x-4 mb-4">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#2C6975] to-[#7EB5C1] flex items-center justify-center text-white">
                  {testimonial.avatar}
                </div>
                <div>
                  <p className="text-gray-900">{testimonial.name}</p>
                  <p className="text-sm text-gray-600">{testimonial.role}</p>
                </div>
              </div>
              <p className="text-gray-700 italic">"{testimonial.quote}"</p>
            </div>
          ))}
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-gradient-to-r from-[#2C6975] to-[#3B6A52] text-white py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl mb-4">Ready to Start Your Learning Journey?</h2>
          <p className="text-xl text-white/90 mb-8">
            Join hundreds of learners transforming their careers with Transition Trails
          </p>
          <button
            onClick={() => setShowOnboarding(true)}
            className="px-8 py-4 bg-[#F9A03F] text-white rounded-lg hover:bg-[#e89135] transition-all shadow-lg hover:shadow-xl"
          >
            Begin Your Visitor Trail
          </button>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-[#2C6975] text-white py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8 mb-8">
            {/* Mission Statement */}
            <div>
              <h3 className="text-xl mb-3">Our Mission</h3>
              <p className="text-white/80 leading-relaxed">
                Transition Trails empowers career changers from nonprofit and non-technical backgrounds 
                to launch successful Salesforce careers through structured learning, AI guidance, and 
                community support.
              </p>
            </div>

            {/* Social Links */}
            <div>
              <h3 className="text-xl mb-3">Connect With Us</h3>
              <div className="flex space-x-4">
                <a href="#" className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                  </svg>
                </a>
                <a href="#" className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" clipRule="evenodd" />
                  </svg>
                </a>
                <a href="#" className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                  </svg>
                </a>
                <a href="#" className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M5.574 0a1.65 1.65 0 100 3.3 1.65 1.65 0 000-3.3zm7.852 0c1.11 0 2.066.877 2.189 1.975l.006.123V22.05c-.003 1.136-.93 2.06-2.08 2.06h-.114c-1.12 0-2.066-.877-2.189-1.975l-.006-.124V2.098c.003-1.135.93-2.06 2.08-2.06h.114z" />
                  </svg>
                </a>
              </div>
            </div>
          </div>

          <div className="border-t border-white/20 pt-8 text-center">
            <p className="text-white/60 text-sm">
              © 2025 Transition Trails Academy. All rights reserved.
            </p>
          </div>
        </div>
      </footer>

      {/* Registration Modal - 2 Steps */}
      {showOnboarding && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-[#F5F3E8] rounded-xl shadow-2xl max-w-md w-full p-8">
            {registrationStep === 1 ? (
              <>
                {/* Step 1 - Registration Form */}
                <div className="text-center mb-6">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#F9A03F] to-[#e89135] mx-auto mb-4 flex items-center justify-center">
                    <Sparkles className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-2xl text-gray-900 mb-2">Join the Visitor Trail</h3>
                  <p className="text-gray-600">Tell us a bit about yourself to get started</p>
                  
                  {/* Progress Dots */}
                  <div className="flex items-center justify-center space-x-2 mt-4">
                    <div className="w-2 h-2 rounded-full bg-[#F9A03F]"></div>
                    <div className="w-2 h-2 rounded-full bg-gray-300"></div>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">Step 1 of 2</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-sm text-gray-700 mb-1">First Name</label>
                    <input
                      type="text"
                      required
                      value={formData.firstName}
                      onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                      className="w-full px-4 py-2 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#F9A03F]"
                      placeholder="Enter your first name"
                    />
                  </div>

                  <div>
                    <label className="block text-sm text-gray-700 mb-1">Last Name</label>
                    <input
                      type="text"
                      required
                      value={formData.lastName}
                      onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                      className="w-full px-4 py-2 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#F9A03F]"
                      placeholder="Enter your last name"
                    />
                  </div>

                  <div>
                    <label className="block text-sm text-gray-700 mb-1">Email Address</label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-2 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#F9A03F]"
                      placeholder="your.email@example.com"
                    />
                  </div>

                  <div>
                    <label className="block text-sm text-gray-700 mb-1">Area of Interest</label>
                    <select
                      value={formData.interest}
                      onChange={(e) => setFormData({ ...formData, interest: e.target.value })}
                      className="w-full px-4 py-2 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#F9A03F]"
                    >
                      <option value="salesforce">Salesforce</option>
                      <option value="business-analysis">Business Analysis</option>
                      <option value="ai">AI</option>
                      <option value="nonprofit">Nonprofit Leadership</option>
                    </select>
                  </div>

                  <div className="flex items-start space-x-2">
                    <input
                      type="checkbox"
                      id="slack-agree"
                      checked={formData.agreeToSlack}
                      onChange={(e) => setFormData({ ...formData, agreeToSlack: e.target.checked })}
                      className="mt-1 w-4 h-4 text-[#F9A03F] border-gray-300 rounded focus:ring-[#F9A03F]"
                    />
                    <label htmlFor="slack-agree" className="text-sm text-gray-700">
                      I agree to join the Visitor Slack community
                    </label>
                  </div>

                  <div className="flex gap-3 pt-4">
                    <button
                      type="button"
                      onClick={() => setShowOnboarding(false)}
                      className="flex-1 px-4 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="flex-1 px-4 py-3 bg-[#3B6A52] text-white rounded-lg hover:bg-[#2d5240] transition-colors flex items-center justify-center space-x-2"
                    >
                      <span>Continue</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </form>
              </>
            ) : (
              <>
                {/* Step 2 - Confirmation with Penny */}
                <div className="text-center">
                  {/* Progress Dots */}
                  <div className="flex items-center justify-center space-x-2 mb-4">
                    <div className="w-2 h-2 rounded-full bg-green-500"></div>
                    <div className="w-2 h-2 rounded-full bg-[#F9A03F]"></div>
                  </div>
                  <p className="text-xs text-gray-500 mb-6">Step 2 of 2</p>

                  {/* Penny with Confetti */}
                  <div className="relative mb-6">
                    <div className="w-24 h-24 rounded-full bg-gradient-to-br from-[#7EB5C1] to-[#2C6975] mx-auto flex items-center justify-center ring-4 ring-[#7EB5C1]/30 animate-bounce-subtle">
                      <Sparkles className="w-12 h-12 text-white" />
                    </div>
                    {/* Confetti Animation */}
                    <div className="absolute inset-0 pointer-events-none">
                      <div className="absolute top-0 left-1/4 w-2 h-2 bg-[#F9A03F] rounded-full animate-confetti-1"></div>
                      <div className="absolute top-0 right-1/4 w-2 h-2 bg-[#7EB5C1] rounded-full animate-confetti-2"></div>
                      <div className="absolute top-1/4 left-1/3 w-1.5 h-1.5 bg-[#3B6A52] rounded-full animate-confetti-3"></div>
                      <div className="absolute top-1/4 right-1/3 w-1.5 h-1.5 bg-[#F9A03F] rounded-full animate-confetti-4"></div>
                    </div>
                  </div>

                  <h3 className="text-2xl text-gray-900 mb-3">Welcome to Transition Trails!</h3>
                  <p className="text-gray-700 mb-2">Your Visitor account is ready.</p>
                  
                  <div className="bg-white/50 border-2 border-[#7EB5C1]/30 rounded-lg p-4 mb-6">
                    <p className="text-gray-900 italic">
                      "Let's explore your first trail together!"
                    </p>
                    <p className="text-sm text-gray-600 mt-1">— Penny, Your AI Guide</p>
                  </div>

                  <button
                    onClick={handleSubmit}
                    className="w-full px-6 py-3 bg-[#3B6A52] text-white rounded-lg hover:bg-[#2d5240] transition-colors flex items-center justify-center space-x-2"
                  >
                    <GraduationCap className="w-5 h-5" />
                    <span>Go to Learning Center</span>
                  </button>
                </div>
              </>
            )}

            <p className="text-xs text-gray-500 text-center mt-4">
              By continuing, you agree to our Terms of Service and Privacy Policy
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
