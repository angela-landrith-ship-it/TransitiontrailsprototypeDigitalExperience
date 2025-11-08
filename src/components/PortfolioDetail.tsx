/**
 * PORTFOLIO DETAIL - PROJECT CASE STUDY PAGE
 * 
 * =============================================================================
 * SALESFORCE ARCHITECTURE MAPPING
 * =============================================================================
 * 
 * Experience Page: ExpPage_PortfolioDetail
 * URL Path: /portfolio/{slug}
 * Primary Audience: Public (no authentication)
 * 
 * =============================================================================
 * SALESFORCE OBJECTS & FIELDS
 * =============================================================================
 * 
 * Primary Objects:
 * - Project__c
 *   Fields: All fields plus Outcomes_JSON__c, Before_After_JSON__c,
 *           GitHub_URL__c, PDF_ContentVersionId__c, Demo_Video_URL__c
 * 
 * - Testimonial__c
 *   Fields: Type__c (Student/Partner), Body__c, Author__c, Role__c,
 *           Project__c (lookup)
 * 
 * - User (Student info)
 *   Fields: Name, SmallPhotoUrl, Title__c, Bio__c
 * 
 * =============================================================================
 */

import { useState } from 'react';
import { 
  ArrowLeft, 
  Share2, 
  Download, 
  Github, 
  ExternalLink, 
  PlayCircle,
  TrendingUp,
  Users,
  Award,
  CheckCircle,
  Sparkles,
  Linkedin,
  Twitter,
  Mail,
  Link as LinkIcon
} from 'lucide-react';
import { PageType } from '../App';
import { Badge } from './ui/badge';
import { Avatar, AvatarImage, AvatarFallback } from './ui/avatar';
import { toast } from 'sonner@2.0.3';

interface PortfolioDetailProps {
  slug: string;
  onNavigate: (page: PageType) => void;
}

export function PortfolioDetail({ slug, onNavigate }: PortfolioDetailProps) {
  const [showShareMenu, setShowShareMenu] = useState(false);

  // Mock data - In production, this would come from Salesforce via API based on slug
  const project = {
    title: 'Community Service Volunteer Management System',
    partnerName: 'Hearts & Hands Community Services',
    partnerLogo: '',
    partnerWebsite: 'https://heartsandhands.org',
    coverImage: 'https://images.unsplash.com/photo-1560220604-1985ebfe28b1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
    valueMetrics: [
      { label: 'Intake time reduced', value: '-45%' },
      { label: 'Program adoption increased', value: '+30%' },
      { label: 'Volunteers matched monthly', value: '200+' }
    ],
    overview: `Hearts & Hands Community Services needed a modern system to manage their growing volunteer program. Their existing spreadsheet-based process was creating bottlenecks, making it difficult to match volunteers with opportunities and track program impact.`,
    solution: `Built a comprehensive Salesforce solution using Nonprofit Cloud, featuring automated volunteer intake, intelligent matching based on skills and availability, and real-time reporting dashboards. The system includes custom flows for onboarding, automated email communications, and mobile-responsive volunteer portal.`,
    outcomes: [
      'Reduced volunteer intake processing time from 2 hours to 30 minutes per volunteer',
      'Automated matching algorithm improved placement success rate by 35%',
      'Real-time dashboards enabled data-driven program decisions',
      'Mobile-friendly portal increased volunteer engagement by 40%'
    ],
    beforeAfter: {
      before: [
        'Manual spreadsheet tracking',
        '2+ hour intake process',
        'Email-based communications',
        'No reporting capabilities'
      ],
      after: [
        'Automated Salesforce system',
        '30-minute streamlined intake',
        'Automated multi-channel comms',
        'Real-time dashboards & reports'
      ]
    },
    student: {
      name: 'Alex Johnson',
      role: 'Salesforce Admin Track',
      photo: '',
      initials: 'AJ',
      bio: 'Guided Trail learner specializing in Nonprofit Cloud implementations',
      reflection: [
        'Learned to design scalable data models for complex nonprofit workflows',
        'Gained experience with Flow automation and advanced process builder',
        'Developed stakeholder communication and requirements gathering skills'
      ]
    },
    partner: {
      contact: 'Maria Rodriguez',
      role: 'Director of Volunteer Programs',
      testimonial: `This system has transformed how we operate. What used to take days now happens in hours. Our volunteers are happier, our staff is more efficient, and we're serving more people in our community. Alex was professional, responsive, and really understood our needs.`
    },
    skills: ['Salesforce Admin', 'Nonprofit Cloud', 'Process Automation', 'Data Model Design', 'Reports & Dashboards', 'Flows'],
    tools: ['Salesforce', 'Nonprofit Cloud', 'Flows', 'Email Integration', 'Reports'],
    githubUrl: 'https://github.com/transition-trails/volunteer-management',
    pdfUrl: '#',
    videoUrl: '',
    badges: ['Partner Project', 'Capstone']
  };

  const handleShare = (platform: string) => {
    const url = window.location.href;
    const title = project.title;
    const description = project.valueMetrics[0].label + ': ' + project.valueMetrics[0].value;

    switch (platform) {
      case 'linkedin':
        window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`, '_blank');
        break;
      case 'twitter':
        window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`, '_blank');
        break;
      case 'email':
        window.location.href = `mailto:?subject=${encodeURIComponent(title)}&body=${encodeURIComponent(description + '\n\n' + url)}`;
        break;
      case 'copy':
        navigator.clipboard.writeText(url).then(() => {
          toast.success('Link copied to clipboard!');
        });
        break;
    }
    setShowShareMenu(false);
  };

  const handleDownloadPDF = () => {
    toast.success('PDF case study download started!');
    // In production, this would trigger PDF generation via Salesforce
  };

  return (
    <div className="min-h-screen bg-[#F5F3E8] dark:bg-slate-900">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-[#2C6975] to-[#7EB5C1] text-white overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)',
            backgroundSize: '30px 30px'
          }} />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Back Button */}
          <button
            onClick={() => onNavigate('portfolio')}
            className="flex items-center space-x-2 text-blue-100 hover:text-white transition-colors mb-6"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Back to Portfolio</span>
          </button>

          {/* Title & Partner */}
          <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6 mb-8">
            <div className="flex-1">
              <div className="flex items-center space-x-3 mb-4">
                {project.badges.map((badge) => (
                  <span
                    key={badge}
                    className={`px-3 py-1 rounded-full text-sm ${
                      badge === 'Partner Project' ? 'bg-[#F9A03F]' :
                      badge === 'Capstone' ? 'bg-[#2C6975]' :
                      'bg-[#7EB5C1]'
                    } text-white shadow-md`}
                  >
                    {badge}
                  </span>
                ))}
              </div>
              <h1 className="text-4xl mb-3">{project.title}</h1>
              <p className="text-xl text-blue-100">{project.partnerName}</p>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap gap-3">
              <div className="relative">
                <button
                  onClick={() => setShowShareMenu(!showShareMenu)}
                  className="flex items-center space-x-2 px-4 py-2 bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/30 rounded-lg transition-colors"
                >
                  <Share2 className="w-4 h-4" />
                  <span>Share</span>
                </button>

                {/* Share Menu */}
                {showShareMenu && (
                  <div className="absolute top-full right-0 mt-2 w-48 bg-white dark:bg-slate-800 rounded-lg shadow-xl border border-gray-200 dark:border-slate-700 py-2 z-10">
                    <button
                      onClick={() => handleShare('linkedin')}
                      className="w-full flex items-center space-x-3 px-4 py-2 hover:bg-gray-100 dark:hover:bg-slate-700 transition-colors text-gray-700 dark:text-gray-300"
                    >
                      <Linkedin className="w-4 h-4" />
                      <span className="text-sm">LinkedIn</span>
                    </button>
                    <button
                      onClick={() => handleShare('twitter')}
                      className="w-full flex items-center space-x-3 px-4 py-2 hover:bg-gray-100 dark:hover:bg-slate-700 transition-colors text-gray-700 dark:text-gray-300"
                    >
                      <Twitter className="w-4 h-4" />
                      <span className="text-sm">Twitter</span>
                    </button>
                    <button
                      onClick={() => handleShare('email')}
                      className="w-full flex items-center space-x-3 px-4 py-2 hover:bg-gray-100 dark:hover:bg-slate-700 transition-colors text-gray-700 dark:text-gray-300"
                    >
                      <Mail className="w-4 h-4" />
                      <span className="text-sm">Email</span>
                    </button>
                    <button
                      onClick={() => handleShare('copy')}
                      className="w-full flex items-center space-x-3 px-4 py-2 hover:bg-gray-100 dark:hover:bg-slate-700 transition-colors text-gray-700 dark:text-gray-300"
                    >
                      <LinkIcon className="w-4 h-4" />
                      <span className="text-sm">Copy Link</span>
                    </button>
                  </div>
                )}
              </div>

              <button
                onClick={handleDownloadPDF}
                className="flex items-center space-x-2 px-4 py-2 bg-[#F9A03F] hover:bg-[#e89135] rounded-lg transition-colors"
              >
                <Download className="w-4 h-4" />
                <span>Download PDF</span>
              </button>

              <button
                onClick={() => onNavigate('portfolio')}
                className="flex items-center space-x-2 px-4 py-2 bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/30 rounded-lg transition-colors"
              >
                <span>View More Projects</span>
                <ExternalLink className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Value Metrics Banner */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {project.valueMetrics.map((metric, index) => (
              <div key={index} className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg p-6">
                <p className="text-sm text-blue-100 mb-2">{metric.label}</p>
                <p className="text-3xl">{metric.value}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content - Two Column Layout */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column - Story & Details */}
          <div className="lg:col-span-2 space-y-8">
            {/* Cover Image */}
            <div className="rounded-xl overflow-hidden shadow-lg">
              <img
                src={project.coverImage}
                alt={project.title}
                className="w-full aspect-video object-cover"
              />
            </div>

            {/* Overview */}
            <section className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-gray-200 dark:border-slate-700 p-8">
              <h2 className="text-gray-900 dark:text-gray-100 mb-4 flex items-center space-x-2">
                <TrendingUp className="w-6 h-6 text-[#2C6975]" />
                <span>Overview</span>
              </h2>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                {project.overview}
              </p>
            </section>

            {/* Solution */}
            <section className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-gray-200 dark:border-slate-700 p-8">
              <h2 className="text-gray-900 dark:text-gray-100 mb-4">Solution</h2>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
                {project.solution}
              </p>
              
              {/* Architecture Note */}
              <div className="bg-blue-50 dark:bg-slate-900/50 border border-blue-200 dark:border-blue-900 rounded-lg p-4">
                <p className="text-sm text-blue-900 dark:text-blue-300">
                  <strong>Architecture:</strong> Salesforce Nonprofit Cloud with custom data model, Process Builder automation, Flow-based onboarding, and Lightning Experience interface.
                </p>
              </div>
            </section>

            {/* Outcomes & Metrics */}
            <section className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-gray-200 dark:border-slate-700 p-8">
              <h2 className="text-gray-900 dark:text-gray-100 mb-4 flex items-center space-x-2">
                <Award className="w-6 h-6 text-[#F9A03F]" />
                <span>Outcomes & Metrics</span>
              </h2>
              <ul className="space-y-3">
                {project.outcomes.map((outcome, index) => (
                  <li key={index} className="flex items-start space-x-3">
                    <CheckCircle className="w-5 h-5 text-[#3B6A52] flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700 dark:text-gray-300">{outcome}</span>
                  </li>
                ))}
              </ul>
            </section>

            {/* Before/After */}
            <section className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-gray-200 dark:border-slate-700 p-8">
              <h2 className="text-gray-900 dark:text-gray-100 mb-6">Before & After</h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-gray-900 dark:text-gray-100 mb-3">Before</h3>
                  <ul className="space-y-2">
                    {project.beforeAfter.before.map((item, index) => (
                      <li key={index} className="text-sm text-gray-600 dark:text-gray-400 flex items-start space-x-2">
                        <span className="text-red-500 flex-shrink-0">✗</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h3 className="text-gray-900 dark:text-gray-100 mb-3">After</h3>
                  <ul className="space-y-2">
                    {project.beforeAfter.after.map((item, index) => (
                      <li key={index} className="text-sm text-gray-700 dark:text-gray-300 flex items-start space-x-2">
                        <span className="text-[#3B6A52] flex-shrink-0">✓</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </section>

            {/* Voices & Reflections */}
            <section className="bg-gradient-to-br from-blue-50 to-green-50 dark:from-slate-800 dark:to-slate-800 rounded-xl border border-blue-200 dark:border-slate-700 p-8">
              <h2 className="text-gray-900 dark:text-gray-100 mb-6 flex items-center space-x-2">
                <Users className="w-6 h-6 text-[#2C6975]" />
                <span>In Their Words</span>
              </h2>

              <div className="grid md:grid-cols-2 gap-6">
                {/* Student Reflection */}
                <div className="bg-white dark:bg-slate-900 rounded-lg p-6">
                  <div className="flex items-center space-x-3 mb-4">
                    <Avatar className="w-12 h-12">
                      <AvatarImage src={project.student.photo} alt={project.student.name} />
                      <AvatarFallback className="bg-[#2C6975] text-white">
                        {project.student.initials}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="text-gray-900 dark:text-gray-100">{project.student.name}</p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">{project.student.role}</p>
                    </div>
                  </div>
                  <h3 className="text-sm text-gray-900 dark:text-gray-100 mb-3">What I Learned</h3>
                  <ul className="space-y-2">
                    {project.student.reflection.map((point, index) => (
                      <li key={index} className="text-sm text-gray-700 dark:text-gray-300 flex items-start space-x-2">
                        <span className="text-[#F9A03F] flex-shrink-0">•</span>
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Partner Testimonial */}
                <div className="bg-white dark:bg-slate-900 rounded-lg p-6">
                  <div className="mb-4">
                    <p className="text-gray-900 dark:text-gray-100">{project.partner.contact}</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{project.partner.role}</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{project.partnerName}</p>
                  </div>
                  <h3 className="text-sm text-gray-900 dark:text-gray-100 mb-3">Value to Our Organization</h3>
                  <p className="text-sm text-gray-700 dark:text-gray-300 italic leading-relaxed">
                    "{project.partner.testimonial}"
                  </p>
                </div>
              </div>
            </section>
          </div>

          {/* Right Column - People & Assets */}
          <div className="space-y-6">
            {/* Skills & Tools */}
            <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-gray-200 dark:border-slate-700 p-6 sticky top-6">
              <h3 className="text-gray-900 dark:text-gray-100 mb-4">Skills & Tools</h3>
              
              <div className="mb-6">
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">Skills</p>
                <div className="flex flex-wrap gap-2">
                  {project.skills.map((skill) => (
                    <Badge key={skill} variant="secondary" className="text-xs">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </div>

              <div className="mb-6">
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">Tools</p>
                <div className="flex flex-wrap gap-2">
                  {project.tools.map((tool) => (
                    <Badge key={tool} variant="outline" className="text-xs">
                      {tool}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Asset Links */}
              <div className="space-y-3 pt-6 border-t border-gray-200 dark:border-slate-700">
                <h3 className="text-gray-900 dark:text-gray-100 mb-3">Project Assets</h3>
                
                {project.githubUrl && (
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-slate-700 transition-colors text-gray-700 dark:text-gray-300"
                  >
                    <Github className="w-5 h-5" />
                    <span className="text-sm">View Repository</span>
                    <ExternalLink className="w-4 h-4 ml-auto" />
                  </a>
                )}

                <button
                  onClick={handleDownloadPDF}
                  className="w-full flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-slate-700 transition-colors text-gray-700 dark:text-gray-300"
                >
                  <Download className="w-5 h-5" />
                  <span className="text-sm">Download Case Study PDF</span>
                </button>

                {project.videoUrl && (
                  <a
                    href={project.videoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-slate-700 transition-colors text-gray-700 dark:text-gray-300"
                  >
                    <PlayCircle className="w-5 h-5" />
                    <span className="text-sm">Watch Demo Video</span>
                    <ExternalLink className="w-4 h-4 ml-auto" />
                  </a>
                )}
              </div>

              {/* Penny Note */}
              <div className="mt-6 pt-6 border-t border-gray-200 dark:border-slate-700">
                <div className="flex items-start space-x-3 p-3 bg-blue-50 dark:bg-slate-900/50 rounded-lg">
                  <Sparkles className="w-5 h-5 text-[#F9A03F] flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm text-gray-700 dark:text-gray-300 mb-2">
                      Want a project like this?
                    </p>
                    <button
                      onClick={() => toast.info('Contact form coming soon!')}
                      className="text-sm text-[#2C6975] dark:text-[#7EB5C1] hover:underline"
                    >
                      Request a consultation →
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer CTA */}
      <div className="bg-gradient-to-r from-[#2C6975] to-[#7EB5C1] text-white py-12 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl mb-4">Interested in a similar solution?</h2>
          <p className="text-xl text-blue-100 mb-6 max-w-2xl mx-auto">
            Let's discuss how Transition Trails learners can help your organization achieve its mission.
          </p>
          <button
            onClick={() => toast.info('Contact form coming soon!')}
            className="px-8 py-3 bg-white text-[#2C6975] rounded-lg hover:bg-gray-100 transition-colors text-lg"
          >
            Request Contact
          </button>
        </div>
      </div>
    </div>
  );
}
