import { Sparkles, Calendar, Rocket, Users, Briefcase, TrendingUp, CheckCircle, ArrowRight, Award, BookOpen, Globe } from 'lucide-react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { useState } from 'react';

interface ExplorersWelcomePageProps {
  onJoin: (subscription: 'monthly' | 'annual') => void;
  onNavigate: (page: string) => void;
  isMasteryGraduate?: boolean;
  userName?: string;
}

export function ExplorersWelcomePage({
  onJoin,
  onNavigate,
  isMasteryGraduate = false,
  userName
}: ExplorersWelcomePageProps) {
  const [selectedPlan, setSelectedPlan] = useState<'monthly' | 'annual'>('annual');

  const benefits = [
    {
      icon: Calendar,
      title: 'Monthly Workshops & Labs',
      description: 'Live coding sessions, Q&A with experts, and hands-on practice',
      color: '#7EB5C1'
    },
    {
      icon: Rocket,
      title: 'New Skill Releases',
      description: 'Early access to emerging Salesforce technologies and AI tools',
      color: '#2C6975'
    },
    {
      icon: Briefcase,
      title: 'Exclusive Job Board',
      description: 'Partner job postings and direct connections with hiring managers',
      color: '#F9A03F'
    },
    {
      icon: Users,
      title: 'Alumni Network',
      description: 'Stay connected with graduates and collaborate on projects',
      color: '#3B6A52'
    },
    {
      icon: TrendingUp,
      title: 'Skill Refreshers',
      description: 'Keep your knowledge current with quarterly reviews and quizzes',
      color: '#7EB5C1'
    },
    {
      icon: Award,
      title: 'Engagement Rewards',
      description: 'Earn points for participation and redeem in the merch store',
      color: '#F9A03F'
    }
  ];

  const upcomingEvents = [
    {
      title: 'AI in Salesforce: Einstein GPT Workshop',
      date: 'Nov 20, 2025',
      time: '6:00 PM PT',
      attendees: 89,
      type: 'Workshop'
    },
    {
      title: 'Flow Orchestration Deep Dive',
      date: 'Nov 27, 2025',
      time: '7:00 PM PT',
      attendees: 56,
      type: 'Lab'
    },
    {
      title: 'TrailBuild Challenge: Winter of Impact',
      date: 'Dec 7-8, 2025',
      time: '24-hour',
      attendees: 124,
      type: 'Hackathon'
    }
  ];

  const newTrails = [
    'Slack Integration Patterns',
    'Flow Orchestration Mastery',
    'Einstein GPT Fundamentals',
    'Net Zero Cloud Basics',
    'Advanced Data Cloud'
  ];

  return (
    <div className="min-h-screen bg-[#F5F3E8]">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-[#7EB5C1] to-[#2C6975] text-white py-24 px-4">
        <div className="max-w-6xl mx-auto text-center">
          {/* Logo/Icon */}
          <div className="w-20 h-20 rounded-full bg-white/20 mx-auto mb-6 flex items-center justify-center">
            <Globe className="w-10 h-10" />
          </div>

          {isMasteryGraduate && (
            <Badge className="bg-white/20 text-white mb-4 border-0">
              🎉 Exclusive Graduate Benefit
            </Badge>
          )}

          <h1 className="text-5xl md:text-6xl mb-4">
            Welcome to Explorer's Journey
          </h1>
          <p className="text-xl md:text-2xl text-white/90 mb-8 max-w-3xl mx-auto">
            Continue the Journey. Stay Connected. Keep Growing.
          </p>
          
          {isMasteryGraduate && (
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 max-w-2xl mx-auto mb-8">
              <p className="text-lg mb-2">
                Congratulations on completing the Trail of Mastery{userName ? `, ${userName}` : ''}! 🏆
              </p>
              <p className="text-white/80">
                As a graduate, you get <strong>3 months free</strong> access to Explorer's Journey.
              </p>
            </div>
          )}

          <Button
            onClick={() => onJoin(selectedPlan)}
            className="px-8 py-6 bg-[#F9A03F] hover:bg-[#e89135] text-white text-lg shadow-2xl"
          >
            <span>{isMasteryGraduate ? 'Activate Free Trial' : 'Start Free Trial'}</span>
            <ArrowRight className="w-5 h-5 ml-2" />
          </Button>

          <p className="text-white/70 text-sm mt-4">
            7-day free trial • Cancel anytime • No credit card required
          </p>
        </div>
      </div>

      {/* What You'll Get */}
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl text-gray-900 mb-4">What's Included</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Your learning doesn't end with graduation. Join a thriving community of lifelong learners and stay at the cutting edge of Salesforce.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {benefits.map((benefit) => {
            const Icon = benefit.icon;
            return (
              <div key={benefit.title} className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 hover:shadow-md transition-all">
                <div 
                  className="w-12 h-12 rounded-lg flex items-center justify-center mb-4"
                  style={{ backgroundColor: `${benefit.color}15` }}
                >
                  <Icon className="w-6 h-6" style={{ color: benefit.color }} />
                </div>
                <h3 className="text-gray-900 mb-2">{benefit.title}</h3>
                <p className="text-sm text-gray-600">{benefit.description}</p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Upcoming Events Preview */}
      <div className="bg-gradient-to-br from-[#7EB5C1]/10 to-[#2C6975]/10 py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <Calendar className="w-12 h-12 text-[#2C6975] mx-auto mb-4" />
            <h2 className="text-3xl text-gray-900 mb-2">This Month's Events</h2>
            <p className="text-gray-600">Join live workshops, labs, and hackathons</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {upcomingEvents.map((event, index) => (
              <div key={index} className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
                <Badge className="mb-3 border-0" style={{ 
                  backgroundColor: event.type === 'Workshop' ? '#7EB5C120' : 
                                  event.type === 'Lab' ? '#2C697520' : '#F9A03F20',
                  color: event.type === 'Workshop' ? '#7EB5C1' : 
                        event.type === 'Lab' ? '#2C6975' : '#F9A03F'
                }}>
                  {event.type}
                </Badge>
                <h3 className="text-gray-900 mb-3">{event.title}</h3>
                <div className="space-y-2 mb-4">
                  <div className="flex items-center space-x-2 text-sm text-gray-600">
                    <Calendar className="w-4 h-4" />
                    <span>{event.date}</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm text-gray-600">
                    <Users className="w-4 h-4" />
                    <span>{event.attendees} registered</span>
                  </div>
                </div>
                <Button 
                  variant="outline" 
                  className="w-full border-[#7EB5C1] text-[#7EB5C1] hover:bg-[#7EB5C1]/10"
                >
                  Register Now
                </Button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* New Trails Coming Soon */}
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-200">
          <div className="flex items-start space-x-4 mb-6">
            <div className="w-12 h-12 rounded-lg bg-[#F9A03F]/10 flex items-center justify-center flex-shrink-0">
              <Rocket className="w-6 h-6 text-[#F9A03F]" />
            </div>
            <div className="flex-1">
              <h2 className="text-2xl text-gray-900 mb-2">New Skill Releases</h2>
              <p className="text-gray-600 mb-4">
                Get early access to emerging Salesforce technologies and AI-powered tools
              </p>
              <div className="flex flex-wrap gap-2">
                {newTrails.map((trail) => (
                  <Badge key={trail} className="bg-[#F9A03F]/10 text-[#F9A03F] border-0">
                    {trail}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
          <Button className="bg-[#F9A03F] hover:bg-[#e89135] text-white">
            <BookOpen className="w-4 h-4 mr-2" />
            Browse Coming Soon
          </Button>
        </div>
      </div>

      {/* Pricing */}
      <div className="bg-gradient-to-r from-[#3B6A52] to-[#2C6975] text-white py-16 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl mb-4">Choose Your Plan</h2>
            <p className="text-white/80 text-lg">
              Flexible pricing for continuous learning
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {/* Monthly Plan */}
            <button
              onClick={() => setSelectedPlan('monthly')}
              className={`text-left bg-white/10 backdrop-blur-sm rounded-xl p-8 border-2 transition-all ${
                selectedPlan === 'monthly'
                  ? 'border-white shadow-2xl'
                  : 'border-white/30 hover:border-white/50'
              }`}
            >
              <div className="flex items-center justify-between mb-4">
                <div>
                  <p className="text-white/80 mb-1">Monthly</p>
                  <div className="flex items-baseline space-x-2">
                    <span className="text-4xl">$49</span>
                    <span className="text-xl text-white/80">/month</span>
                  </div>
                </div>
                {selectedPlan === 'monthly' && (
                  <CheckCircle className="w-8 h-8 text-white" />
                )}
              </div>
              <p className="text-white/80 mb-4">Perfect for trying it out</p>
              <ul className="space-y-2">
                {[
                  'Cancel anytime',
                  'All workshops & events',
                  'Job board access',
                  'Community network',
                  'Skill refreshers'
                ].map((feature) => (
                  <li key={feature} className="flex items-center space-x-2 text-sm">
                    <CheckCircle className="w-4 h-4 text-[#7EB5C1]" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </button>

            {/* Annual Plan */}
            <button
              onClick={() => setSelectedPlan('annual')}
              className={`relative text-left bg-white/10 backdrop-blur-sm rounded-xl p-8 border-2 transition-all ${
                selectedPlan === 'annual'
                  ? 'border-white shadow-2xl'
                  : 'border-white/30 hover:border-white/50'
              }`}
            >
              <Badge className="absolute -top-3 right-4 bg-[#F9A03F] text-white border-0">
                Best Value • 2 Months Free
              </Badge>
              
              <div className="flex items-center justify-between mb-4">
                <div>
                  <p className="text-white/80 mb-1">Annual</p>
                  <div className="flex items-baseline space-x-2">
                    <span className="text-4xl">$490</span>
                    <span className="text-xl text-white/80">/year</span>
                  </div>
                  <p className="text-sm text-[#7EB5C1] mt-1">Just $40.83/month</p>
                </div>
                {selectedPlan === 'annual' && (
                  <CheckCircle className="w-8 h-8 text-white" />
                )}
              </div>
              <p className="text-white/80 mb-4">Best for committed learners</p>
              <ul className="space-y-2">
                {[
                  'Everything in monthly',
                  'Priority event registration',
                  'Exclusive annual summit',
                  'Annual recap report',
                  'Prestige multipliers'
                ].map((feature) => (
                  <li key={feature} className="flex items-center space-x-2 text-sm">
                    <CheckCircle className="w-4 h-4 text-[#7EB5C1]" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </button>
          </div>

          {isMasteryGraduate && (
            <div className="mt-8 bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/30 text-center">
              <Sparkles className="w-8 h-8 text-[#F9A03F] mx-auto mb-3" />
              <p className="text-lg mb-2">Graduate Benefit</p>
              <p className="text-white/80">
                Get <strong>3 months free</strong> when you join Explorer's Journey after completing the Trail of Mastery!
              </p>
            </div>
          )}

          <div className="text-center mt-8">
            <Button
              onClick={() => onJoin(selectedPlan)}
              className="px-12 py-6 bg-[#F9A03F] hover:bg-[#e89135] text-white text-lg shadow-2xl"
            >
              <span>{isMasteryGraduate ? 'Activate Free Trial' : 'Start 7-Day Free Trial'}</span>
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
            <p className="text-white/60 text-sm mt-4">
              No credit card required • Cancel anytime
            </p>
          </div>
        </div>
      </div>

      {/* Social Proof */}
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-200">
          <div className="text-center mb-8">
            <div className="flex -space-x-2 justify-center mb-4">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#2C6975] to-[#7EB5C1] border-2 border-white flex items-center justify-center text-white">JK</div>
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#F9A03F] to-[#e89135] border-2 border-white flex items-center justify-center text-white">SM</div>
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#3B6A52] to-[#2C6975] border-2 border-white flex items-center justify-center text-white">AC</div>
            </div>
            <p className="text-2xl text-gray-900 mb-2">Join 1,247 Active Explorers</p>
            <p className="text-gray-600">Learning together, growing together</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                name: 'Jordan Kim',
                role: 'Senior Developer',
                quote: "Explorer's Journey keeps me current and connected. The workshops are invaluable!"
              },
              {
                name: 'Sarah Martinez',
                role: 'Solutions Architect',
                quote: "I've attended 15+ workshops this year. Best investment in my career development."
              },
              {
                name: 'Alex Chen',
                role: 'Business Analyst',
                quote: "The job board alone is worth it. I found my current role through the network!"
              }
            ].map((testimonial, index) => (
              <div key={index} className="bg-gray-50 rounded-lg p-6">
                <p className="text-gray-700 italic mb-4">"{testimonial.quote}"</p>
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#7EB5C1] to-[#2C6975] flex items-center justify-center text-white">
                    {testimonial.name.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div>
                    <p className="text-gray-900 text-sm">{testimonial.name}</p>
                    <p className="text-xs text-gray-600">{testimonial.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Final CTA */}
      <div className="bg-gradient-to-r from-[#7EB5C1] to-[#2C6975] text-white py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl mb-4">Ready to Continue Your Journey?</h2>
          <p className="text-xl text-white/90 mb-8">
            Join thousands of learners staying at the cutting edge of Salesforce
          </p>
          <Button
            onClick={() => onJoin(selectedPlan)}
            className="px-12 py-6 bg-white text-[#2C6975] hover:bg-gray-100 text-lg shadow-2xl"
          >
            <span>Start Your Free Trial</span>
            <ArrowRight className="w-5 h-5 ml-2" />
          </Button>
        </div>
      </div>
    </div>
  );
}
