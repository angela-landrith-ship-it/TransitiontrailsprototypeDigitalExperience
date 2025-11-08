import { useState } from 'react';
import { Search, Users, ArrowLeft, MapPin, Award, TrendingUp, Star, Github, Linkedin, ExternalLink, MessageSquare, Filter, CheckCircle, Crown, Zap, Target, BookOpen } from 'lucide-react';
import { PageType } from '../App';
import { SectionHeader } from './SectionHeader';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Avatar, AvatarFallback } from './ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';

interface ProfileDirectoryProps {
  onNavigate: (page: PageType) => void;
}

// Mock learner profiles
const mockProfiles = [
  {
    id: 'profile-1',
    name: 'Alex Chen',
    avatar: 'AC',
    role: 'Salesforce Admin',
    trail: 'Admin Trail',
    level: 7,
    points: 2850,
    rank: 3,
    location: 'San Francisco, CA',
    bio: 'Passionate about automation and helping businesses streamline their processes. 5+ years in Salesforce.',
    skills: [
      { name: 'Flow Builder', level: 'Expert' },
      { name: 'Process Builder', level: 'Advanced' },
      { name: 'Reports & Dashboards', level: 'Expert' },
      { name: 'Data Management', level: 'Advanced' },
    ],
    badges: ['Early Adopter', 'Flow Master', 'Top Reviewer', 'Study Group Leader'],
    projectCount: 8,
    reviewCount: 15,
    streak: 42,
    completionRate: 95,
    socialLinks: {
      linkedin: 'linkedin.com/in/alexchen',
      github: 'github.com/alexchen',
      portfolio: 'alexchen.dev',
    },
    isOnline: true,
    profileComplete: 100,
    topProjects: [
      { title: 'Automated Onboarding Flow', skills: ['Flow Builder', 'Apex'] },
      { title: 'Sales Dashboard Suite', skills: ['Reports', 'Analytics'] },
      { title: 'Data Quality Tool', skills: ['Data Management', 'Validation'] },
    ],
  },
  {
    id: 'profile-2',
    name: 'Jordan Taylor',
    avatar: 'JT',
    role: 'Salesforce Developer',
    trail: 'Developer Trail',
    level: 6,
    points: 2450,
    rank: 5,
    location: 'Austin, TX',
    bio: 'Full-stack developer specializing in Lightning Web Components and Apex. Love solving complex problems!',
    skills: [
      { name: 'Lightning Web Components', level: 'Expert' },
      { name: 'Apex', level: 'Advanced' },
      { name: 'JavaScript', level: 'Expert' },
      { name: 'Integration', level: 'Intermediate' },
    ],
    badges: ['Code Master', 'LWC Expert', 'Community Helper', 'Bug Hunter'],
    projectCount: 12,
    reviewCount: 8,
    streak: 28,
    completionRate: 88,
    socialLinks: {
      linkedin: 'linkedin.com/in/jordantaylor',
      github: 'github.com/jtaylor',
    },
    isOnline: true,
    profileComplete: 85,
    topProjects: [
      { title: 'Custom Component Library', skills: ['LWC', 'JavaScript'] },
      { title: 'REST API Integration', skills: ['Apex', 'Integration'] },
      { title: 'Event Management App', skills: ['LWC', 'Apex'] },
    ],
  },
  {
    id: 'profile-3',
    name: 'Sarah Martinez',
    avatar: 'SM',
    role: 'Solution Architect',
    trail: 'Architect Trail',
    level: 8,
    points: 3200,
    rank: 1,
    location: 'New York, NY',
    bio: 'Solutions architect with 8+ years designing scalable Salesforce implementations for enterprise clients.',
    skills: [
      { name: 'System Design', level: 'Expert' },
      { name: 'Data Modeling', level: 'Expert' },
      { name: 'Integration Patterns', level: 'Expert' },
      { name: 'Security', level: 'Advanced' },
    ],
    badges: ['Top Learner', 'Architect Master', 'Mentor', 'Innovation Award', 'Perfect Score'],
    projectCount: 15,
    reviewCount: 25,
    streak: 65,
    completionRate: 98,
    socialLinks: {
      linkedin: 'linkedin.com/in/sarahmartinez',
      github: 'github.com/smartinez',
      portfolio: 'sarahmartinez.com',
    },
    isOnline: false,
    profileComplete: 100,
    topProjects: [
      { title: 'Enterprise Data Architecture', skills: ['Data Modeling', 'Security'] },
      { title: 'Multi-Cloud Integration', skills: ['Integration', 'APIs'] },
      { title: 'Scalability Framework', skills: ['System Design', 'Performance'] },
    ],
  },
  {
    id: 'profile-4',
    name: 'Morgan Davis',
    avatar: 'MD',
    role: 'Business Analyst',
    trail: 'Admin Trail',
    level: 5,
    points: 1850,
    rank: 12,
    location: 'Chicago, IL',
    bio: 'Transitioning from business analysis to Salesforce admin. Excited to learn and grow!',
    skills: [
      { name: 'Requirements Gathering', level: 'Advanced' },
      { name: 'Process Mapping', level: 'Advanced' },
      { name: 'Reports & Dashboards', level: 'Intermediate' },
      { name: 'User Training', level: 'Advanced' },
    ],
    badges: ['Rising Star', 'Team Player', 'Fast Learner'],
    projectCount: 4,
    reviewCount: 6,
    streak: 15,
    completionRate: 72,
    socialLinks: {
      linkedin: 'linkedin.com/in/morgandavis',
    },
    isOnline: true,
    profileComplete: 70,
    topProjects: [
      { title: 'Business Requirements Doc', skills: ['Analysis', 'Documentation'] },
      { title: 'User Adoption Plan', skills: ['Training', 'Change Management'] },
    ],
  },
  {
    id: 'profile-5',
    name: 'Riley Thompson',
    avatar: 'RT',
    role: 'Platform Developer',
    trail: 'Developer Trail',
    level: 7,
    points: 2650,
    rank: 4,
    location: 'Seattle, WA',
    bio: 'Platform developer focused on building scalable, maintainable solutions. Open source contributor.',
    skills: [
      { name: 'Apex', level: 'Expert' },
      { name: 'Testing', level: 'Expert' },
      { name: 'CI/CD', level: 'Advanced' },
      { name: 'Version Control', level: 'Expert' },
    ],
    badges: ['Code Quality Champion', 'Test Master', 'DevOps Pro', 'Open Source'],
    projectCount: 10,
    reviewCount: 12,
    streak: 38,
    completionRate: 91,
    socialLinks: {
      github: 'github.com/rileythompson',
      portfolio: 'rileythompson.dev',
    },
    isOnline: false,
    profileComplete: 90,
    topProjects: [
      { title: 'Apex Testing Framework', skills: ['Apex', 'Testing'] },
      { title: 'CI/CD Pipeline', skills: ['DevOps', 'Automation'] },
      { title: 'Code Review Tool', skills: ['Apex', 'Quality'] },
    ],
  },
  {
    id: 'profile-6',
    name: 'Casey White',
    avatar: 'CW',
    role: 'Marketing Cloud Specialist',
    trail: 'Consultant Trail',
    level: 6,
    points: 2300,
    rank: 7,
    location: 'Los Angeles, CA',
    bio: 'Marketing automation expert helping companies deliver personalized customer experiences.',
    skills: [
      { name: 'Email Marketing', level: 'Expert' },
      { name: 'Journey Builder', level: 'Advanced' },
      { name: 'Analytics', level: 'Advanced' },
      { name: 'Customer Segmentation', level: 'Expert' },
    ],
    badges: ['Marketing Pro', 'Journey Master', 'Analytics Expert'],
    projectCount: 7,
    reviewCount: 9,
    streak: 22,
    completionRate: 84,
    socialLinks: {
      linkedin: 'linkedin.com/in/caseywhite',
    },
    isOnline: true,
    profileComplete: 80,
    topProjects: [
      { title: 'Email Campaign Framework', skills: ['Email', 'Automation'] },
      { title: 'Customer Journey Map', skills: ['Journey Builder', 'Strategy'] },
    ],
  },
  {
    id: 'profile-7',
    name: 'Sam Green',
    avatar: 'SG',
    role: 'Data Analyst',
    trail: 'Admin Trail',
    level: 4,
    points: 1450,
    rank: 18,
    location: 'Boston, MA',
    bio: 'Data-driven decision maker learning Salesforce to better analyze business metrics.',
    skills: [
      { name: 'Data Analysis', level: 'Expert' },
      { name: 'Reports & Dashboards', level: 'Advanced' },
      { name: 'SQL', level: 'Advanced' },
      { name: 'Tableau', level: 'Intermediate' },
    ],
    badges: ['Data Champion', 'Quick Learner'],
    projectCount: 3,
    reviewCount: 4,
    streak: 8,
    completionRate: 65,
    socialLinks: {
      linkedin: 'linkedin.com/in/samgreen',
    },
    isOnline: false,
    profileComplete: 60,
    topProjects: [
      { title: 'Sales Analytics Dashboard', skills: ['Reports', 'Analytics'] },
    ],
  },
  {
    id: 'profile-8',
    name: 'Taylor Kim',
    avatar: 'TK',
    role: 'Integration Specialist',
    trail: 'Architect Trail',
    level: 7,
    points: 2750,
    rank: 2,
    location: 'Denver, CO',
    bio: 'Integration architect connecting Salesforce with enterprise systems. API enthusiast.',
    skills: [
      { name: 'REST APIs', level: 'Expert' },
      { name: 'SOAP APIs', level: 'Advanced' },
      { name: 'Middleware', level: 'Advanced' },
      { name: 'Event-Driven Architecture', level: 'Expert' },
    ],
    badges: ['Integration Master', 'API Expert', 'System Connector', 'Innovation'],
    projectCount: 11,
    reviewCount: 18,
    streak: 45,
    completionRate: 93,
    socialLinks: {
      linkedin: 'linkedin.com/in/taylorkim',
      github: 'github.com/taylorkim',
      portfolio: 'taylorkim.io',
    },
    isOnline: true,
    profileComplete: 95,
    topProjects: [
      { title: 'Enterprise Integration Hub', skills: ['APIs', 'Middleware'] },
      { title: 'Real-Time Event System', skills: ['Platform Events', 'Integration'] },
      { title: 'API Gateway', skills: ['REST', 'Security'] },
    ],
  },
];

export function ProfileDirectory({ onNavigate }: ProfileDirectoryProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterTrail, setFilterTrail] = useState<string>('all');
  const [filterLevel, setFilterLevel] = useState<string>('all');
  const [sortBy, setSortBy] = useState<string>('rank');
  const [selectedProfile, setSelectedProfile] = useState<string | null>(null);

  // Stats
  const stats = {
    totalProfiles: mockProfiles.length,
    onlineNow: mockProfiles.filter((p) => p.isOnline).length,
    avgCompletion: Math.round(
      mockProfiles.reduce((acc, p) => acc + p.completionRate, 0) / mockProfiles.length
    ),
    topLearners: mockProfiles.filter((p) => p.rank <= 5).length,
  };

  // Filter and sort profiles
  let filteredProfiles = mockProfiles.filter((profile) => {
    const matchesSearch =
      profile.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      profile.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
      profile.bio.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesTrail = filterTrail === 'all' || profile.trail === filterTrail;

    const matchesLevel =
      filterLevel === 'all' ||
      (filterLevel === 'beginner' && profile.level <= 3) ||
      (filterLevel === 'intermediate' && profile.level >= 4 && profile.level <= 6) ||
      (filterLevel === 'advanced' && profile.level >= 7);

    return matchesSearch && matchesTrail && matchesLevel;
  });

  // Sort
  if (sortBy === 'rank') {
    filteredProfiles = [...filteredProfiles].sort((a, b) => a.rank - b.rank);
  } else if (sortBy === 'level') {
    filteredProfiles = [...filteredProfiles].sort((a, b) => b.level - a.level);
  } else if (sortBy === 'completion') {
    filteredProfiles = [...filteredProfiles].sort((a, b) => b.completionRate - a.completionRate);
  }

  const topLearners = mockProfiles.filter((p) => p.rank <= 3).sort((a, b) => a.rank - b.rank);

  return (
    <div className="min-h-screen bg-[#F5F3E8]">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <button
            onClick={() => onNavigate('learner')}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-4"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </button>

          <SectionHeader
            icon={Users}
            title="Learner Profiles"
            subtitle="Connect with the Transition Trails community"
            color="#7EB5C1"
          />

          {/* Stats Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-6">
            <div className="bg-gradient-to-br from-[#7EB5C1] to-[#6a9aa5] text-white rounded-lg p-4">
              <div className="flex items-center gap-2 mb-1">
                <Users className="w-4 h-4" />
                <span className="text-sm opacity-90">Total Learners</span>
              </div>
              <div className="text-2xl">{stats.totalProfiles}</div>
            </div>

            <div className="bg-gradient-to-br from-[#3B6A52] to-[#2d5440] text-white rounded-lg p-4">
              <div className="flex items-center gap-2 mb-1">
                <Zap className="w-4 h-4" />
                <span className="text-sm opacity-90">Online Now</span>
              </div>
              <div className="text-2xl">{stats.onlineNow}</div>
            </div>

            <div className="bg-gradient-to-br from-[#F9A03F] to-[#f89520] text-white rounded-lg p-4">
              <div className="flex items-center gap-2 mb-1">
                <Target className="w-4 h-4" />
                <span className="text-sm opacity-90">Avg Completion</span>
              </div>
              <div className="text-2xl">{stats.avgCompletion}%</div>
            </div>

            <div className="bg-gradient-to-br from-[#2C6975] to-[#235158] text-white rounded-lg p-4">
              <div className="flex items-center gap-2 mb-1">
                <Crown className="w-4 h-4" />
                <span className="text-sm opacity-90">Top Learners</span>
              </div>
              <div className="text-2xl">{stats.topLearners}</div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Top Learners Spotlight */}
        <div className="bg-gradient-to-r from-[#2C6975] to-[#235158] rounded-xl shadow-lg p-6 mb-6">
          <div className="flex items-center gap-3 mb-4">
            <Crown className="w-6 h-6 text-yellow-300" />
            <h3 className="text-white text-xl">Top Learners</h3>
          </div>
          <div className="grid md:grid-cols-3 gap-4">
            {topLearners.map((profile, index) => (
              <div
                key={profile.id}
                className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20"
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className="relative">
                    <Avatar className="w-12 h-12">
                      <AvatarFallback className="bg-[#7EB5C1] text-white text-lg">
                        {profile.avatar}
                      </AvatarFallback>
                    </Avatar>
                    <div className="absolute -top-1 -right-1 w-6 h-6 bg-yellow-400 text-gray-900 rounded-full flex items-center justify-center text-xs">
                      {index + 1}
                    </div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-white truncate">{profile.name}</div>
                    <div className="text-xs text-white/70">{profile.trail}</div>
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-2 text-center">
                  <div>
                    <div className="text-white text-sm">{profile.points}</div>
                    <div className="text-xs text-white/70">Points</div>
                  </div>
                  <div>
                    <div className="text-white text-sm">L{profile.level}</div>
                    <div className="text-xs text-white/70">Level</div>
                  </div>
                  <div>
                    <div className="text-white text-sm">{profile.streak}</div>
                    <div className="text-xs text-white/70">Streak</div>
                  </div>
                </div>
                <Button
                  size="sm"
                  onClick={() => setSelectedProfile(profile.id)}
                  className="w-full mt-3 bg-white text-[#2C6975] hover:bg-gray-100"
                >
                  View Profile
                </Button>
              </div>
            ))}
          </div>
        </div>

        {/* Search & Filters */}
        <div className="bg-white rounded-xl border border-gray-200 p-6 mb-6">
          <div className="grid md:grid-cols-4 gap-4">
            <div className="md:col-span-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <Input
                  placeholder="Search learners..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>

            <div>
              <Select value={filterTrail} onValueChange={setFilterTrail}>
                <SelectTrigger>
                  <SelectValue placeholder="All Trails" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Trails</SelectItem>
                  <SelectItem value="Admin Trail">Admin Trail</SelectItem>
                  <SelectItem value="Developer Trail">Developer Trail</SelectItem>
                  <SelectItem value="Architect Trail">Architect Trail</SelectItem>
                  <SelectItem value="Consultant Trail">Consultant Trail</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Select value={filterLevel} onValueChange={setFilterLevel}>
                <SelectTrigger>
                  <SelectValue placeholder="All Levels" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Levels</SelectItem>
                  <SelectItem value="beginner">Beginner (1-3)</SelectItem>
                  <SelectItem value="intermediate">Intermediate (4-6)</SelectItem>
                  <SelectItem value="advanced">Advanced (7+)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger>
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="rank">Rank</SelectItem>
                  <SelectItem value="level">Level</SelectItem>
                  <SelectItem value="completion">Completion</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        {/* Profile Grid */}
        {filteredProfiles.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProfiles.map((profile) => (
              <div
                key={profile.id}
                className="bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow"
              >
                {/* Header */}
                <div className="bg-gradient-to-r from-[#7EB5C1] to-[#6a9aa5] p-6 text-white relative">
                  {profile.rank <= 3 && (
                    <div className="absolute top-4 right-4">
                      <div className="bg-yellow-400 text-gray-900 rounded-full w-8 h-8 flex items-center justify-center">
                        <Crown className="w-4 h-4" />
                      </div>
                    </div>
                  )}
                  <div className="flex items-center gap-4">
                    <div className="relative">
                      <Avatar className="w-16 h-16 border-2 border-white">
                        <AvatarFallback className="bg-white text-[#7EB5C1] text-xl">
                          {profile.avatar}
                        </AvatarFallback>
                      </Avatar>
                      {profile.isOnline && (
                        <div className="absolute bottom-0 right-0 w-4 h-4 bg-green-400 border-2 border-white rounded-full" />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-xl truncate">{profile.name}</h3>
                      <p className="text-sm text-white/90">{profile.role}</p>
                    </div>
                  </div>

                  {/* Stats */}
                  <div className="grid grid-cols-4 gap-2 mt-4">
                    <div className="text-center">
                      <div className="text-sm opacity-90">Rank</div>
                      <div className="text-lg">#{profile.rank}</div>
                    </div>
                    <div className="text-center">
                      <div className="text-sm opacity-90">Level</div>
                      <div className="text-lg">{profile.level}</div>
                    </div>
                    <div className="text-center">
                      <div className="text-sm opacity-90">Points</div>
                      <div className="text-lg">{profile.points}</div>
                    </div>
                    <div className="text-center">
                      <div className="text-sm opacity-90">Streak</div>
                      <div className="text-lg">{profile.streak}</div>
                    </div>
                  </div>
                </div>

                {/* Body */}
                <div className="p-6">
                  {/* Trail & Location */}
                  <div className="flex items-center gap-4 mb-4">
                    <Badge className="bg-[#7EB5C1] text-white border-0">
                      {profile.trail}
                    </Badge>
                    {profile.location && (
                      <div className="flex items-center gap-1 text-sm text-gray-600">
                        <MapPin className="w-3 h-3" />
                        {profile.location.split(',')[0]}
                      </div>
                    )}
                  </div>

                  {/* Bio */}
                  <p className="text-sm text-gray-600 mb-4 line-clamp-2">{profile.bio}</p>

                  {/* Top Skills */}
                  <div className="mb-4">
                    <div className="text-xs text-gray-500 mb-2">Top Skills</div>
                    <div className="flex flex-wrap gap-1">
                      {profile.skills.slice(0, 3).map((skill, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {skill.name}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  {/* Badges */}
                  <div className="mb-4">
                    <div className="text-xs text-gray-500 mb-2">
                      Badges ({profile.badges.length})
                    </div>
                    <div className="flex items-center gap-1">
                      {profile.badges.slice(0, 4).map((badge, index) => (
                        <div
                          key={index}
                          className="w-6 h-6 bg-gradient-to-br from-[#F9A03F] to-[#f89520] rounded-full flex items-center justify-center"
                          title={badge}
                        >
                          <Award className="w-3 h-3 text-white" />
                        </div>
                      ))}
                      {profile.badges.length > 4 && (
                        <span className="text-xs text-gray-500">
                          +{profile.badges.length - 4}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Stats */}
                  <div className="grid grid-cols-3 gap-3 mb-4 text-center">
                    <div>
                      <div className="text-sm text-gray-900">{profile.projectCount}</div>
                      <div className="text-xs text-gray-500">Projects</div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-900">{profile.reviewCount}</div>
                      <div className="text-xs text-gray-500">Reviews</div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-900">{profile.completionRate}%</div>
                      <div className="text-xs text-gray-500">Complete</div>
                    </div>
                  </div>

                  {/* Social Links */}
                  {(profile.socialLinks.linkedin ||
                    profile.socialLinks.github ||
                    profile.socialLinks.portfolio) && (
                    <div className="flex items-center justify-center gap-2 mb-4">
                      {profile.socialLinks.linkedin && (
                        <button className="p-2 text-gray-400 hover:text-[#0077B5] transition-colors">
                          <Linkedin className="w-4 h-4" />
                        </button>
                      )}
                      {profile.socialLinks.github && (
                        <button className="p-2 text-gray-400 hover:text-gray-900 transition-colors">
                          <Github className="w-4 h-4" />
                        </button>
                      )}
                      {profile.socialLinks.portfolio && (
                        <button className="p-2 text-gray-400 hover:text-[#7EB5C1] transition-colors">
                          <ExternalLink className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                  )}

                  {/* Actions */}
                  <div className="flex gap-2">
                    <Button
                      onClick={() => setSelectedProfile(profile.id)}
                      className="flex-1 bg-[#7EB5C1] hover:bg-[#6a9aa5] text-white"
                      size="sm"
                    >
                      View Profile
                    </Button>
                    <Button
                      onClick={() => onNavigate('messages')}
                      variant="outline"
                      size="sm"
                    >
                      <MessageSquare className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-xl border border-gray-200 p-12 text-center">
            <Users className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl text-gray-900 mb-2">No profiles found</h3>
            <p className="text-gray-600">Try adjusting your filters or search query</p>
          </div>
        )}

        {/* Profile Completion Tips */}
        <div className="mt-6 bg-blue-50 border border-blue-200 rounded-xl p-6">
          <h3 className="text-blue-900 mb-3 flex items-center gap-2">
            <CheckCircle className="w-5 h-5" />
            Complete Your Profile & Earn Points
          </h3>
          <div className="grid md:grid-cols-4 gap-4 text-sm text-blue-800">
            <div>
              <div className="mb-1">✏️ <strong>Add Bio (+5 pts)</strong></div>
              <div className="text-xs">Tell your story</div>
            </div>
            <div>
              <div className="mb-1">🔗 <strong>Social Links (+10 pts)</strong></div>
              <div className="text-xs">Connect your profiles</div>
            </div>
            <div>
              <div className="mb-1">📁 <strong>Upload Projects (+15 pts)</strong></div>
              <div className="text-xs">Showcase your work</div>
            </div>
            <div>
              <div className="mb-1">🎯 <strong>100% Complete (+25 pts)</strong></div>
              <div className="text-xs">Fill all sections</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
