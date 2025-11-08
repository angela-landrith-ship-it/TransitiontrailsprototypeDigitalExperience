import React from 'react';
import { motion } from 'motion/react';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';
import { Badge } from './ui/badge';
import { 
  Heart, 
  Users, 
  GraduationCap, 
  Sparkles, 
  ArrowRight,
  BookOpen,
  Target,
  Briefcase,
  ChevronRight
} from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface OurVisionProps {
  onDonate?: () => void;
  onVolunteer?: () => void;
  onLearnMore?: () => void;
}

export function OurVision({ onDonate, onVolunteer, onLearnMore }: OurVisionProps) {
  const futureCards = [
    {
      title: 'Accessible Education',
      description: 'Affordable, flexible learning for all — no barriers, just pathways forward.',
      icon: BookOpen,
      color: '#3B6A52', // Evergreen
      stat: '50+ Scholarships'
    },
    {
      title: 'Community Mentorship',
      description: 'Coaches who guide and lift others — creating a culture of support and growth.',
      icon: Users,
      color: '#7EB5C1', // Sky Blue
      stat: '25+ Active Coaches'
    },
    {
      title: 'Career Growth for Good',
      description: 'Real impact through partnerships and projects — connecting learning to purpose.',
      icon: Briefcase,
      color: '#2C6975', // Summit Teal
      stat: '100% Mission-Driven'
    }
  ];

  return (
    <div className="min-h-screen bg-[#F5F3E8] dark:bg-slate-900">
      {/* Page Header */}
      <section className="pt-24 pb-12 bg-gradient-to-b from-[#2C6975] to-[#3B6A52] dark:from-[#1e4a53] dark:to-[#2a5140] text-white">
        <div className="max-w-5xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <Badge className="mb-4 bg-[#F9A03F] hover:bg-[#F9A03F] text-white border-0 px-4 py-2">
              <Sparkles className="w-4 h-4 mr-2" />
              Our Vision
            </Badge>
            <h1 className="text-5xl md:text-6xl mb-6 leading-tight">
              A Future of Pathways, Not Barriers
            </h1>
            <p className="text-xl text-white/90 max-w-3xl mx-auto">
              Transition Trails exists to create meaningful change — one learning journey at a time
            </p>
          </motion.div>
        </div>
      </section>

      {/* 1. Intro Narrative Block - "The Why" */}
      <section className="py-24 bg-gradient-to-b from-[#F5F3E8] to-[#F2EAD3] dark:from-slate-900 dark:to-slate-800">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Image */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative"
            >
              <div className="rounded-2xl overflow-hidden shadow-2xl">
                <ImageWithFallback
                  src="https://images.unsplash.com/photo-1658124974726-d96bc44783cf?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoYW5kcyUyMGxhcHRvcCUyMG1vdW50YWluJTIwc2lsaG91ZXR0ZXxlbnwxfHx8fDE3NjI2MjkzMzd8MA&ixlib=rb-4.1.0&q=80&w=1080"
                  alt="Learning journey with mountain silhouette symbolizing ascent"
                  className="w-full h-[500px] object-cover"
                />
              </div>
              {/* Decorative overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#2C6975]/40 to-transparent rounded-2xl pointer-events-none" />
            </motion.div>

            {/* Content */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="space-y-6"
            >
              <h2 className="text-4xl text-[#2C6975] dark:text-[#7EB5C1] leading-tight">
                Transition Trails was born from a belief that talent is universal — opportunity is not.
              </h2>
              
              <p className="text-lg text-[#3B6A52] dark:text-slate-300 leading-relaxed">
                Our Academy exists to give people from every background a clear, supported pathway into meaningful work. 
                We connect learning to purpose, mentorship to mastery, and technology to human growth.
              </p>

              <p className="text-lg text-[#3B6A52] dark:text-slate-300 leading-relaxed">
                This is more than education. It's about creating futures where potential becomes possibility, 
                where community becomes the foundation for transformation, and where every learner finds their trail.
              </p>

              <div className="flex flex-wrap gap-3 pt-4">
                <Badge className="bg-[#2C6975] dark:bg-[#7EB5C1] text-white border-0 px-4 py-2">
                  <Target className="w-4 h-4 mr-2" />
                  Purpose-Driven
                </Badge>
                <Badge className="bg-[#3B6A52] dark:bg-[#3B6A52] text-white border-0 px-4 py-2">
                  <Users className="w-4 h-4 mr-2" />
                  Community-Powered
                </Badge>
                <Badge className="bg-[#7EB5C1] dark:bg-[#5B89A6] text-white border-0 px-4 py-2">
                  <GraduationCap className="w-4 h-4 mr-2" />
                  Impact-Focused
                </Badge>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 2. Founder's Story - "Meet the Visionary" */}
      <section className="py-24 bg-white dark:bg-slate-800">
        <div className="max-w-6xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl text-[#2C6975] dark:text-[#7EB5C1] mb-4">Meet the Visionary</h2>
            <p className="text-xl text-[#3B6A52] dark:text-slate-300">
              The story behind Transition Trails
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-5 gap-12 items-center">
            {/* Portrait */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="lg:col-span-2"
            >
              <div className="relative">
                <div className="rounded-2xl overflow-hidden shadow-2xl ring-4 ring-[#F9A03F]/20 dark:ring-[#F9A03F]/40">
                  <ImageWithFallback
                    src="https://images.unsplash.com/photo-1736939678218-bd648b5ef3bb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjB3b21hbiUyMGZvdW5kZXIlMjBDRU98ZW58MXx8fHwxNzYyNjI5MzM4fDA&ixlib=rb-4.1.0&q=80&w=1080"
                    alt="Angela Landrith, Founder & CEO"
                    className="w-full h-[450px] object-cover"
                  />
                </div>
                {/* Decorative element */}
                <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-gradient-to-br from-[#F9A03F] to-[#F9A03F]/60 rounded-full blur-3xl opacity-30 pointer-events-none" />
              </div>
            </motion.div>

            {/* Quote Card */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="lg:col-span-3"
            >
              <Card className="border-l-4 border-l-[#2C6975] dark:border-l-[#7EB5C1] shadow-xl bg-gradient-to-br from-[#F5F3E8] to-white dark:from-slate-800 dark:to-slate-900 dark:border-slate-700">
                <CardContent className="p-8">
                  <div className="mb-6">
                    <svg width="48" height="48" viewBox="0 0 48 48" fill="none" className="text-[#F9A03F] opacity-20">
                      <path d="M12 28C12 22.4772 16.4772 18 22 18V12C13.1634 12 6 19.1634 6 28H12ZM36 28C36 22.4772 40.4772 18 46 18V12C37.1634 12 30 19.1634 30 28H36Z" fill="currentColor"/>
                    </svg>
                  </div>
                  
                  <blockquote className="text-2xl md:text-3xl text-[#2C6975] dark:text-white mb-8 leading-relaxed italic">
                    "I spent two decades in corporate technology — and I saw too many people with potential left on the sidelines. 
                    Transition Trails was created to change that."
                  </blockquote>

                  <div className="flex items-center gap-4">
                    <div className="h-px flex-1 bg-gradient-to-r from-[#F9A03F] to-transparent" />
                    <p className="text-sm text-[#3B6A52] dark:text-[#7EB5C1]">
                      <span className="block">– Angela Landrith</span>
                      <span className="block text-xs text-[#3B6A52]/70 dark:text-slate-400">Founder & CEO, Transition Trails</span>
                    </p>
                  </div>

                  {/* Penny companion bubble */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.4, type: 'spring' }}
                    className="mt-8 p-4 bg-[#F5F3E8]/50 dark:bg-slate-700 rounded-xl border-2 border-[#7EB5C1]/30 dark:border-[#7EB5C1]/50 shadow-lg"
                  >
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#7EB5C1] to-[#2C6975] flex items-center justify-center text-xl flex-shrink-0">
                        ✨
                      </div>
                      <div>
                        <p className="text-sm text-[#2C6975] dark:text-[#7EB5C1] italic">
                          "Every great journey begins with one person deciding to light the path."
                        </p>
                        <p className="text-xs text-[#3B6A52] dark:text-slate-300 mt-1">— Penny AI</p>
                      </div>
                    </div>
                  </motion.div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 3. The Future We're Building */}
      <section className="py-24 bg-gradient-to-b from-[#F5F3E8] to-[#F2EAD3] dark:from-slate-900 dark:to-slate-800">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl text-[#2C6975] dark:text-[#7EB5C1] mb-4">The Future We're Building</h2>
            <p className="text-xl text-[#3B6A52] dark:text-slate-300 max-w-3xl mx-auto">
              Three pillars of transformation — accessible, supportive, and purpose-driven
            </p>
          </motion.div>

          {/* Horizontal Scroll Gallery on Mobile, Grid on Desktop */}
          <div className="grid md:grid-cols-3 gap-8">
            {futureCards.map((card, index) => {
              const Icon = card.icon;
              return (
                <motion.div
                  key={card.title}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.15 }}
                  whileHover={{ y: -8 }}
                >
                  <Card className="h-full border-2 border-transparent hover:border-[#F9A03F] transition-all shadow-lg hover:shadow-2xl bg-white dark:bg-slate-800 dark:border-slate-700 group">
                    <CardContent className="p-8">
                      {/* Icon */}
                      <div 
                        className="w-16 h-16 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform shadow-lg"
                        style={{ 
                          backgroundColor: `${card.color}15`,
                          boxShadow: `0 8px 16px ${card.color}20`
                        }}
                      >
                        <Icon className="w-8 h-8" style={{ color: card.color }} />
                      </div>

                      {/* Title */}
                      <h3 className="text-2xl text-[#2C6975] dark:text-white mb-3 group-hover:text-[#F9A03F] dark:group-hover:text-[#F9A03F] transition-colors">
                        {card.title}
                      </h3>

                      {/* Stat Badge */}
                      <Badge 
                        className="mb-4 text-white border-0"
                        style={{ backgroundColor: card.color }}
                      >
                        {card.stat}
                      </Badge>

                      {/* Description */}
                      <p className="text-[#3B6A52] dark:text-slate-300 leading-relaxed">
                        {card.description}
                      </p>

                      {/* Decorative line */}
                      <div className="mt-6 pt-6 border-t border-gray-200 dark:border-slate-700">
                        <div className="flex items-center text-sm text-[#2C6975] dark:text-[#7EB5C1] group-hover:text-[#F9A03F] dark:group-hover:text-[#F9A03F] transition-colors">
                          <span>Learn more</span>
                          <ChevronRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 4. Impact Quote Band */}
      <section className="relative py-32 overflow-hidden">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0 z-0">
          <ImageWithFallback
            src="https://images.unsplash.com/photo-1676276376345-ee600f57b5b2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0ZWFtJTIwd29ya3Nob3AlMjBjb2xsYWJvcmF0aW9uJTIwbGVhcm5pbmd8ZW58MXx8fHwxNzYyNjI5MzM4fDA&ixlib=rb-4.1.0&q=80&w=1080"
            alt="Team workshop collaboration"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#2C6975]/95 via-[#3B6A52]/90 to-[#2C6975]/95 dark:from-[#1e4a53]/95 dark:via-[#2a5140]/90 dark:to-[#1e4a53]/95" />
        </div>

        {/* Quote Content */}
        <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="mb-8">
              <Sparkles className="w-12 h-12 text-[#F9A03F] mx-auto" />
            </div>
            
            <blockquote className="text-4xl md:text-5xl text-white mb-12 leading-tight">
              "When people learn with purpose, they change their own story — and ours."
            </blockquote>

            <Button 
              size="lg"
              onClick={onLearnMore}
              className="bg-[#F9A03F] hover:bg-[#F9A03F]/90 text-white shadow-2xl px-8 group"
            >
              See What We're Building
              <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
          </motion.div>
        </div>

        {/* Decorative elements */}
        <div className="absolute top-10 left-10 w-20 h-20 bg-[#F9A03F]/20 rounded-full blur-2xl" />
        <div className="absolute bottom-10 right-10 w-32 h-32 bg-[#7EB5C1]/20 rounded-full blur-3xl" />
      </section>

      {/* 5. Support Callout */}
      <section className="py-24 bg-gradient-to-br from-[#F9A03F]/10 via-[#F5F3E8] to-[#F9A03F]/5 dark:from-slate-800 dark:via-slate-900 dark:to-slate-800">
        <div className="max-w-5xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <Card className="border-2 border-[#F9A03F] dark:border-[#F9A03F]/70 shadow-2xl bg-white dark:bg-slate-800">
              <CardContent className="p-12">
                <div className="text-center mb-10">
                  <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-[#F9A03F] to-[#F9A03F]/70 mb-6 shadow-xl">
                    <Heart className="w-10 h-10 text-white" />
                  </div>
                  
                  <h2 className="text-4xl text-[#2C6975] dark:text-white mb-6">
                    Your support makes this future possible.
                  </h2>
                  
                  <p className="text-xl text-[#3B6A52] dark:text-slate-300 max-w-3xl mx-auto leading-relaxed">
                    By giving, mentoring, or sharing our mission, you become part of a movement that connects 
                    people to new futures — one learning journey at a time.
                  </p>
                </div>

                {/* CTA Buttons */}
                <div className="flex flex-wrap justify-center gap-4">
                  <Button 
                    size="lg"
                    onClick={onDonate}
                    className="bg-gradient-to-r from-[#F9A03F] to-[#F9A03F]/90 hover:from-[#F9A03F]/90 hover:to-[#F9A03F]/80 text-white shadow-xl px-8 group"
                  >
                    <Heart className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform" />
                    Donate to the Vision
                  </Button>
                  
                  <Button 
                    size="lg"
                    onClick={onVolunteer}
                    variant="outline"
                    className="border-2 border-[#2C6975] dark:border-[#7EB5C1] text-[#2C6975] dark:text-[#7EB5C1] hover:bg-[#2C6975] hover:text-white dark:hover:bg-[#7EB5C1] dark:hover:text-slate-900 px-8 group"
                  >
                    <Users className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform" />
                    Volunteer with Us
                  </Button>
                  
                  <Button 
                    size="lg"
                    onClick={onLearnMore}
                    variant="outline"
                    className="border-2 border-[#3B6A52] dark:border-[#7EB5C1] text-[#3B6A52] dark:text-[#7EB5C1] hover:bg-[#3B6A52] hover:text-white dark:hover:bg-[#7EB5C1] dark:hover:text-slate-900 px-8 group"
                  >
                    <GraduationCap className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform" />
                    Learn More About the Academy
                  </Button>
                </div>

                {/* Bottom accent */}
                <div className="mt-10 pt-10 border-t border-gray-200 dark:border-slate-700 text-center">
                  <p className="text-sm text-[#3B6A52] dark:text-slate-400 italic">
                    "Building a future together — pathways, not barriers."
                  </p>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
