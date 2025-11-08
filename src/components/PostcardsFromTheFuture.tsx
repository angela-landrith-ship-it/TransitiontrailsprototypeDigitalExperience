import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Progress } from './ui/progress';
import { Badge } from './ui/badge';
import { 
  Heart, 
  Users, 
  GraduationCap, 
  Sparkles, 
  ArrowRight, 
  BookOpen,
  Award,
  MessageSquare,
  Linkedin,
  Check,
  Target,
  Zap
} from 'lucide-react';
import DonationModal from './DonationModal';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { PageType } from '../App';

const FUNDING_GOAL = 100000;
const CURRENT_FUNDING = 23750; // TODO: Bind from Salesforce: Donation__c.Total_Raised__c

const donationTiers = [
  {
    name: 'Trailblazer',
    amount: 100,
    icon: Sparkles,
    color: '#7EB5C1',
    benefits: [
      'Digital donor badge',
      'Name on donor wall',
      'Quarterly impact updates'
    ]
  },
  {
    name: 'Guide',
    amount: 500,
    icon: Users,
    color: '#F9A03F',
    benefits: [
      'Everything in Trailblazer',
      'Personalized thank-you video',
      'Early access to programs',
      'Invitation to virtual events'
    ]
  },
  {
    name: 'Summit Sponsor',
    amount: 1000,
    icon: Award,
    color: '#2C6975',
    benefits: [
      'Everything in Guide',
      'Feature in campaign video',
      'Recognition in annual report',
      'Meet the team video call'
    ]
  },
  {
    name: 'Evergreen Founder',
    amount: 5000,
    icon: GraduationCap,
    color: '#3B6A52',
    benefits: [
      'Everything in Summit Sponsor',
      'Lifetime digital founder badge',
      'Physical recognition plaque',
      'Annual founder celebration invite',
      'Advisory board opportunity'
    ]
  }
];

const impactAreas = [
  {
    title: 'Scholarships',
    description: 'Full and partial scholarships for learners who need financial support',
    icon: GraduationCap,
    stat: '50+ Scholarships',
    link: '/academy'
  },
  {
    title: 'Trail of Mastery Development',
    description: 'Building comprehensive learning paths with world-class curriculum',
    icon: BookOpen,
    stat: '12-Week Program',
    link: '/trail-of-mastery'
  },
  {
    title: 'Coach Training',
    description: 'Training and supporting mentors who guide our learners',
    icon: Users,
    stat: '25+ Coaches',
    link: '/support'
  },
  {
    title: 'Partner Projects',
    description: 'Real-world capstone projects with industry partners',
    icon: Target,
    stat: '10+ Partners',
    link: '/partner-board'
  }
];

interface PostcardsFromTheFutureProps {
  onNavigate?: (page: PageType) => void;
}

export default function PostcardsFromTheFuture({ onNavigate }: PostcardsFromTheFutureProps = {}) {
  const [isDonationModalOpen, setIsDonationModalOpen] = useState(false);
  const [selectedDonationAmount, setSelectedDonationAmount] = useState<string>('100');
  const [progressValue, setProgressValue] = useState(0);

  // Animate progress bar on mount
  useEffect(() => {
    const timer = setTimeout(() => {
      setProgressValue((CURRENT_FUNDING / FUNDING_GOAL) * 100);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  const openDonationModal = (amount?: string) => {
    if (amount) setSelectedDonationAmount(amount);
    setIsDonationModalOpen(true);
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#F5F3E8] to-white dark:from-slate-900 dark:to-slate-800">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0 z-0">
          <ImageWithFallback
            src="https://images.unsplash.com/photo-1605113428742-9bd97dc98cbc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb3VudGFpbiUyMHRyYWlsJTIwc3VucmlzZSUyMGhvcGV8ZW58MXx8fHwxNzYyNjE5MDEzfDA&ixlib=rb-4.1.0&q=80&w=1080"
            alt="Mountain trail at sunrise"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#2C6975]/95 via-[#2C6975]/85 to-[#2C6975]/75" />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-6 py-24 md:py-32">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl"
          >
            <Badge className="mb-6 bg-[#F9A03F] text-white border-0 px-4 py-2">
              <Heart className="w-4 h-4 mr-2" />
              Founding Donor Campaign
            </Badge>
            
            <h1 className="text-5xl md:text-6xl text-white mb-6 leading-tight">
              Imagine a world where every learner finds their trail
            </h1>
            
            <p className="text-xl text-[#F5F3E8] mb-8 leading-relaxed">
              At Transition Trails, we're building an Academy where careers, community, and compassion converge — 
              and we want you to help us get there.
            </p>

            <div className="flex flex-wrap gap-4">
              <Button 
                size="lg"
                onClick={() => openDonationModal()}
                className="bg-[#F9A03F] hover:bg-[#F9A03F]/90 text-white shadow-xl px-8"
              >
                <Heart className="w-5 h-5 mr-2" />
                Donate Now
              </Button>
              <Button 
                size="lg"
                variant="outline"
                onClick={() => openDonationModal('5000')}
                className="border-2 border-white text-white hover:bg-white hover:text-[#2C6975] px-8"
              >
                <Sparkles className="w-5 h-5 mr-2" />
                Become a Founding Supporter
              </Button>
            </div>
          </motion.div>
        </div>

        {/* Decorative wave separator */}
        <div className="absolute bottom-0 left-0 right-0 z-10">
          <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full">
            <path d="M0,64L80,69.3C160,75,320,85,480,80C640,75,800,53,960,48C1120,43,1280,53,1360,58.7L1440,64L1440,120L1360,120C1280,120,1120,120,960,120C800,120,640,120,480,120C320,120,160,120,80,120L0,120Z" fill="#F5F3E8"/>
          </svg>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="py-20 bg-[#F5F3E8] dark:bg-slate-900">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Image */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative"
            >
              <div className="rounded-2xl overflow-hidden shadow-2xl">
                <ImageWithFallback
                  src="https://images.unsplash.com/photo-1758270705518-b61b40527e76?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkaXZlcnNlJTIwc3R1ZGVudHMlMjBsZWFybmluZyUyMGNvbGxhYm9yYXRpb258ZW58MXx8fHwxNzYyNjE5MDEyfDA&ixlib=rb-4.1.0&q=80&w=1080"
                  alt="Diverse students learning together"
                  className="w-full h-[400px] object-cover"
                />
              </div>
              {/* Penny Quote Bubble */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3, type: 'spring' }}
                className="absolute -bottom-6 -right-6 bg-white dark:bg-slate-800 p-4 rounded-2xl shadow-xl border-4 border-[#7EB5C1] max-w-xs"
              >
                <div className="flex items-start gap-3">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#7EB5C1] to-[#2C6975] flex items-center justify-center text-2xl flex-shrink-0">
                    🐧
                  </div>
                  <div>
                    <p className="text-sm text-[#2C6975] dark:text-[#7EB5C1] italic">
                      "The future we're building starts with your trail."
                    </p>
                    <p className="text-xs text-[#3B6A52] dark:text-slate-400 mt-1">— Penny</p>
                  </div>
                </div>
              </motion.div>
            </motion.div>

            {/* Copy */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-4xl text-[#2C6975] dark:text-[#7EB5C1] mb-6">Why We Exist</h2>
              
              <div className="space-y-4 text-[#3B6A52] dark:text-slate-300">
                <p className="text-lg leading-relaxed">
                  <span className="font-semibold text-[#2C6975] dark:text-[#7EB5C1]">Transition Trails bridges education to Salesforce careers.</span> We 
                  believe that with the right guidance, resources, and community, anyone can transform their life 
                  through technology.
                </p>
                
                <p className="text-lg leading-relaxed">
                  Our model is simple yet powerful: <span className="font-semibold text-[#2C6975] dark:text-[#7EB5C1]">learners become mentors, 
                  mentors become coaches</span>. This creates a self-sustaining ecosystem of growth, support, and opportunity.
                </p>
                
                <p className="text-lg leading-relaxed">
                  As a <span className="font-semibold text-[#2C6975] dark:text-[#7EB5C1]">nonprofit organization</span>, every dollar you 
                  contribute goes directly toward scholarships, curriculum development, coach training, and creating 
                  opportunities for those who need them most.
                </p>

                <div className="flex flex-wrap gap-3 pt-4">
                  <Badge className="bg-[#7EB5C1] text-white border-0 px-4 py-2">
                    <Users className="w-4 h-4 mr-2" />
                    Community-Driven
                  </Badge>
                  <Badge className="bg-[#3B6A52] text-white border-0 px-4 py-2">
                    <GraduationCap className="w-4 h-4 mr-2" />
                    Career-Focused
                  </Badge>
                  <Badge className="bg-[#F9A03F] text-white border-0 px-4 py-2">
                    <Heart className="w-4 h-4 mr-2" />
                    Nonprofit Impact
                  </Badge>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Founding Donor Campaign */}
      <section className="py-20 bg-white dark:bg-slate-800">
        <div className="max-w-5xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl text-[#2C6975] dark:text-[#7EB5C1] mb-4">Be Part of the First $100K</h2>
            <p className="text-xl text-[#3B6A52] dark:text-slate-300">
              Help us launch the Transition Trails Academy with full funding for our first year
            </p>
          </motion.div>

          {/* Progress Bar */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-12"
          >
            <Card className="border-2 border-[#F9A03F] shadow-xl bg-gradient-to-br from-white to-[#F5F3E8] dark:from-slate-800 dark:to-slate-900">
              <CardContent className="pt-6">
                <div className="mb-4">
                  <div className="flex justify-between items-end mb-2">
                    <div>
                      <p className="text-sm text-[#3B6A52] dark:text-slate-400">Current Progress</p>
                      <p className="text-4xl text-[#F9A03F]">{formatCurrency(CURRENT_FUNDING)}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-[#3B6A52] dark:text-slate-400">Goal</p>
                      <p className="text-2xl text-[#2C6975] dark:text-[#7EB5C1]">{formatCurrency(FUNDING_GOAL)}</p>
                    </div>
                  </div>
                  
                  <Progress 
                    value={progressValue} 
                    className="h-4 bg-[#F5F3E8] dark:bg-slate-700"
                    // @ts-ignore - custom color
                    style={{ '--progress-background': '#F9A03F' } as any}
                  />
                  
                  <p className="text-sm text-[#3B6A52] dark:text-slate-400 mt-2 text-center">
                    {progressValue.toFixed(1)}% funded • {formatCurrency(FUNDING_GOAL - CURRENT_FUNDING)} to go
                  </p>
                </div>

                <Button 
                  onClick={() => openDonationModal()}
                  className="w-full bg-gradient-to-r from-[#F9A03F] to-[#F9A03F]/90 hover:from-[#F9A03F]/90 hover:to-[#F9A03F]/80 text-white shadow-lg"
                  size="lg"
                >
                  <Heart className="w-5 h-5 mr-2" />
                  Contribute Your Postcard
                </Button>
              </CardContent>
            </Card>
          </motion.div>

          {/* Donation Tiers */}
          <div className="grid md:grid-cols-2 gap-6">
            {donationTiers.map((tier, index) => {
              const Icon = tier.icon;
              return (
                <motion.div
                  key={tier.name}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Card 
                    className="border-2 hover:border-[#F9A03F] transition-all cursor-pointer h-full hover:shadow-xl group bg-white dark:bg-slate-800 dark:border-slate-700"
                    onClick={() => openDonationModal(tier.amount.toString())}
                  >
                    <CardHeader>
                      <div className="flex items-center justify-between mb-2">
                        <div 
                          className="w-12 h-12 rounded-full flex items-center justify-center"
                          style={{ backgroundColor: `${tier.color}20` }}
                        >
                          <Icon className="w-6 h-6" style={{ color: tier.color }} />
                        </div>
                        <Badge 
                          className="border-0 text-white"
                          style={{ backgroundColor: tier.color }}
                        >
                          {formatCurrency(tier.amount)}
                        </Badge>
                      </div>
                      <CardTitle className="text-[#2C6975] dark:text-[#7EB5C1] group-hover:text-[#F9A03F] transition-colors">
                        {tier.name}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2">
                        {tier.benefits.map((benefit, i) => (
                          <li key={i} className="flex items-start gap-2 text-sm text-[#3B6A52] dark:text-slate-300">
                            <Check className="w-4 h-4 text-[#3B6A52] dark:text-[#7EB5C1] flex-shrink-0 mt-0.5" />
                            <span>{benefit}</span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Impact Showcase */}
      <section className="py-20 bg-gradient-to-b from-[#F5F3E8] to-white dark:from-slate-900 dark:to-slate-800">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl text-[#2C6975] dark:text-[#7EB5C1] mb-4">What Your Gift Builds</h2>
            <p className="text-xl text-[#3B6A52] dark:text-slate-300 max-w-2xl mx-auto">
              Every contribution directly supports our mission to create opportunity through education
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {impactAreas.map((area, index) => {
              const Icon = area.icon;
              return (
                <motion.div
                  key={area.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Card className="h-full hover:shadow-xl transition-all group border-2 border-transparent hover:border-[#7EB5C1] bg-white dark:bg-slate-800 dark:border-slate-700">
                    <CardHeader>
                      <div 
                        className="w-14 h-14 rounded-full bg-gradient-to-br from-[#7EB5C1] to-[#2C6975] flex items-center justify-center mb-3 group-hover:scale-110 transition-transform"
                      >
                        <Icon className="w-7 h-7 text-white" />
                      </div>
                      <CardTitle className="text-[#2C6975] dark:text-[#7EB5C1]">{area.title}</CardTitle>
                      <Badge className="bg-[#F9A03F] text-white border-0 w-fit">
                        {area.stat}
                      </Badge>
                    </CardHeader>
                    <CardContent>
                      <p className="text-[#3B6A52] dark:text-slate-300 mb-4">{area.description}</p>
                      <Button 
                        variant="link" 
                        className="text-[#7EB5C1] hover:text-[#2C6975] dark:hover:text-[#7EB5C1] p-0 h-auto"
                      >
                        Learn More <ArrowRight className="w-4 h-4 ml-1" />
                      </Button>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Join the Trail CTA */}
      <section className="py-20 bg-gradient-to-br from-[#7EB5C1] to-[#2C6975] relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
            backgroundSize: '40px 40px'
          }} />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl md:text-5xl text-white mb-6">Join the Trail</h2>
            <p className="text-xl text-[#F5F3E8] mb-10 max-w-2xl mx-auto">
              Whether you donate, volunteer, or participate — you're part of building something extraordinary
            </p>

            <div className="flex flex-wrap justify-center gap-4">
              <Button 
                size="lg"
                onClick={() => openDonationModal()}
                className="bg-[#F9A03F] hover:bg-[#F9A03F]/90 text-white shadow-xl px-8"
              >
                <Heart className="w-5 h-5 mr-2" />
                Make a Donation
              </Button>
              <Button 
                size="lg"
                variant="outline"
                className="border-2 border-white text-white hover:bg-white hover:text-[#2C6975] px-8"
              >
                <GraduationCap className="w-5 h-5 mr-2" />
                Register for a Program
              </Button>
              <Button 
                size="lg"
                variant="outline"
                className="border-2 border-white text-white hover:bg-white hover:text-[#2C6975] px-8"
              >
                <Users className="w-5 h-5 mr-2" />
                Volunteer or Mentor
              </Button>
            </div>

            <div className="mt-10 pt-10 border-t border-white/20">
              <p className="text-[#F5F3E8] mb-4">Follow Our Journey</p>
              <div className="flex justify-center gap-4">
                <Button 
                  variant="ghost" 
                  size="icon"
                  className="w-12 h-12 rounded-full bg-white/10 hover:bg-white hover:text-[#2C6975] text-white transition-colors"
                >
                  <Linkedin className="w-5 h-5" />
                </Button>
                <Button 
                  variant="ghost" 
                  size="icon"
                  className="w-12 h-12 rounded-full bg-white/10 hover:bg-white hover:text-[#2C6975] text-white transition-colors"
                >
                  <MessageSquare className="w-5 h-5" />
                </Button>
                <Button 
                  variant="ghost" 
                  size="icon"
                  className="w-12 h-12 rounded-full bg-white/10 hover:bg-white hover:text-[#2C6975] text-white transition-colors"
                >
                  <Zap className="w-5 h-5" />
                </Button>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#2C6975] text-white py-12">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <h4 className="font-semibold mb-4">About</h4>
              <ul className="space-y-2 text-sm text-[#F5F3E8]">
                <li><a href="#" className="hover:text-[#F9A03F] transition-colors">Our Mission</a></li>
                <li><a href="#" className="hover:text-[#F9A03F] transition-colors">Our Team</a></li>
                <li><a href="#" className="hover:text-[#F9A03F] transition-colors">Impact Report</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Academy</h4>
              <ul className="space-y-2 text-sm text-[#F5F3E8]">
                <li><a href="#" className="hover:text-[#F9A03F] transition-colors">Programs</a></li>
                <li><a href="#" className="hover:text-[#F9A03F] transition-colors">Trail of Mastery</a></li>
                <li><a href="#" className="hover:text-[#F9A03F] transition-colors">Apply Now</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-sm text-[#F5F3E8]">
                <li><a href="#" className="hover:text-[#F9A03F] transition-colors">Donate</a></li>
                <li><a href="#" className="hover:text-[#F9A03F] transition-colors">Volunteer</a></li>
                <li><a href="#" className="hover:text-[#F9A03F] transition-colors">Partner with Us</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Contact</h4>
              <ul className="space-y-2 text-sm text-[#F5F3E8]">
                <li><a href="#" className="hover:text-[#F9A03F] transition-colors">Get in Touch</a></li>
                <li><a href="#" className="hover:text-[#F9A03F] transition-colors">FAQ</a></li>
                <li><a href="#" className="hover:text-[#F9A03F] transition-colors">Press Kit</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-white/20 pt-8 text-center">
            <p className="text-sm text-[#F5F3E8]">
              Transition Trails is a 501(c)(3) nonprofit organization. All donations are tax-deductible.
            </p>
            <p className="text-xs text-[#F5F3E8]/70 mt-2">
              © 2025 Transition Trails. All rights reserved.
            </p>
          </div>
        </div>
      </footer>

      {/* Donation Modal */}
      <DonationModal 
        isOpen={isDonationModalOpen}
        onClose={() => setIsDonationModalOpen(false)}
        preselectedAmount={selectedDonationAmount}
      />
    </div>
  );
}
