import { X, Users, Clock, Target, CheckCircle2, TrendingUp, Sparkles } from 'lucide-react';
import { Badge } from './ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { SlackChannelLink, GitHubRepositoryLink } from './integrations';

interface ProjectDetailModalProps {
  project: {
    id: string;
    partnerId: string;
    partnerName: string;
    partnerLogo: string;
    title: string;
    summary: string;
    category: string;
    skills: string[];
    duration: string;
    teamSize: number;
    spotsAvailable: number;
    // Integration fields (populated after team formation)
    slackChannelLink?: string;
    slackChannelId?: string;
    githubRepo?: string;
  };
  onClose: () => void;
}

export function ProjectDetailModal({ project, onClose }: ProjectDetailModalProps) {
  // Mock learner skills for Skills Match calculation
  const learnerSkills = ['Flows', 'Reports', 'Dashboards', 'Validation Rules'];
  const matchedSkills = project.skills.filter(skill => 
    learnerSkills.some(ls => ls.toLowerCase() === skill.toLowerCase())
  );
  const skillsMatchPercentage = Math.round((matchedSkills.length / project.skills.length) * 100);

  // Mock team members
  const teamMembers = [
    { name: 'Sarah Chen', role: 'Tech Lead', avatar: '👩‍💻' },
    { name: 'Marcus Johnson', role: 'Developer', avatar: '👨‍💼' }
  ];

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 overflow-y-auto">
      <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden flex flex-col my-8">
        {/* Header */}
        <div className="p-6 border-b border-gray-200 flex items-start justify-between sticky top-0 bg-white z-10">
          <div className="flex items-start space-x-4 flex-1">
            <div className="w-16 h-16 rounded-xl overflow-hidden bg-gray-100 flex-shrink-0">
              <ImageWithFallback
                src={project.partnerLogo}
                alt={project.partnerName}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex-1">
              <div className="flex items-center space-x-2 mb-1">
                <h2 className="text-2xl text-gray-900">{project.title}</h2>
              </div>
              <p className="text-gray-600">{project.partnerName}</p>
              <div className="flex items-center space-x-2 mt-2">
                <Badge className="bg-[#3B6A52]/10 text-[#3B6A52]">
                  {project.category}
                </Badge>
                <Badge className="bg-[#F9A03F]/10 text-[#F9A03F]">
                  {project.spotsAvailable} spots available
                </Badge>
              </div>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-lg hover:bg-gray-100 flex items-center justify-center transition-colors flex-shrink-0"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto">
          <div className="p-6">
            {/* Skills Match Bar */}
            <div className="mb-6 p-4 bg-gradient-to-r from-[#7EB5C1]/10 to-[#2C6975]/10 rounded-xl border border-[#7EB5C1]/30">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center space-x-2">
                  <TrendingUp className="w-5 h-5 text-[#2C6975]" />
                  <span className="text-gray-900">Skills Match</span>
                </div>
                <span className="text-2xl text-[#2C6975]">{skillsMatchPercentage}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-3 mb-2">
                <div
                  className="bg-gradient-to-r from-[#7EB5C1] to-[#2C6975] h-3 rounded-full transition-all duration-500"
                  style={{ width: `${skillsMatchPercentage}%` }}
                />
              </div>
              <p className="text-sm text-gray-600">
                You have {matchedSkills.length} of {project.skills.length} required skills
              </p>
            </div>

            <Tabs defaultValue="overview" className="w-full">
              <TabsList className="bg-gray-100 p-1 rounded-lg w-full">
                <TabsTrigger value="overview" className="flex-1">Overview</TabsTrigger>
                <TabsTrigger value="deliverables" className="flex-1">Deliverables</TabsTrigger>
                <TabsTrigger value="team" className="flex-1">Team</TabsTrigger>
              </TabsList>

              <TabsContent value="overview" className="mt-6 space-y-6">
                {/* Project Summary */}
                <div>
                  <h3 className="text-lg text-gray-900 mb-3">Project Overview</h3>
                  <p className="text-gray-700 leading-relaxed mb-4">{project.summary}</p>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 bg-gray-50 rounded-lg">
                      <div className="flex items-center space-x-2 mb-2">
                        <Clock className="w-4 h-4 text-[#2C6975]" />
                        <span className="text-sm text-gray-600">Duration</span>
                      </div>
                      <p className="text-gray-900">{project.duration}</p>
                    </div>
                    <div className="p-4 bg-gray-50 rounded-lg">
                      <div className="flex items-center space-x-2 mb-2">
                        <Users className="w-4 h-4 text-[#2C6975]" />
                        <span className="text-sm text-gray-600">Team Size</span>
                      </div>
                      <p className="text-gray-900">{project.teamSize} members</p>
                    </div>
                  </div>
                </div>

                {/* Required Skills */}
                <div>
                  <h3 className="text-lg text-gray-900 mb-3">Required Skills</h3>
                  <div className="flex flex-wrap gap-2">
                    {project.skills.map((skill, index) => {
                      const isMatched = matchedSkills.includes(skill);
                      return (
                        <Badge
                          key={index}
                          className={
                            isMatched
                              ? 'bg-[#2C6975] text-white'
                              : 'bg-gray-100 text-gray-600'
                          }
                        >
                          {isMatched && <CheckCircle2 className="w-3 h-3 mr-1" />}
                          {skill}
                        </Badge>
                      );
                    })}
                  </div>
                </div>

                {/* Project Objectives */}
                <div>
                  <h3 className="text-lg text-gray-900 mb-3">Project Objectives</h3>
                  <div className="space-y-2">
                    <div className="flex items-start space-x-2">
                      <Target className="w-4 h-4 text-[#F9A03F] mt-1 flex-shrink-0" />
                      <span className="text-gray-700">
                        Design and implement a scalable solution that meets partner needs
                      </span>
                    </div>
                    <div className="flex items-start space-x-2">
                      <Target className="w-4 h-4 text-[#F9A03F] mt-1 flex-shrink-0" />
                      <span className="text-gray-700">
                        Follow Salesforce best practices and maintain code quality
                      </span>
                    </div>
                    <div className="flex items-start space-x-2">
                      <Target className="w-4 h-4 text-[#F9A03F] mt-1 flex-shrink-0" />
                      <span className="text-gray-700">
                        Deliver comprehensive documentation and user training
                      </span>
                    </div>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="deliverables" className="mt-6">
                <h3 className="text-lg text-gray-900 mb-4">Expected Deliverables</h3>
                <div className="space-y-3">
                  {[
                    'Technical architecture document',
                    'Custom object schema and relationships',
                    'Process flows and automation',
                    'Reports and dashboards',
                    'User acceptance testing plan',
                    'End-user documentation',
                    'Training materials and videos'
                  ].map((deliverable, index) => (
                    <div key={index} className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg">
                      <CheckCircle2 className="w-5 h-5 text-[#3B6A52] mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700">{deliverable}</span>
                    </div>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="team" className="mt-6">
                <h3 className="text-lg text-gray-900 mb-4">Current Team Members</h3>
                <div className="space-y-3 mb-6">
                  {teamMembers.map((member, index) => (
                    <div key={index} className="flex items-center space-x-3 p-4 bg-gray-50 rounded-lg">
                      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#7EB5C1] to-[#2C6975] flex items-center justify-center text-2xl">
                        {member.avatar}
                      </div>
                      <div>
                        <p className="text-gray-900">{member.name}</p>
                        <p className="text-sm text-gray-600">{member.role}</p>
                      </div>
                    </div>
                  ))}
                  <div className="p-4 border-2 border-dashed border-gray-300 rounded-lg text-center">
                    <Users className="w-8 h-8 text-gray-300 mx-auto mb-2" />
                    <p className="text-sm text-gray-500">
                      {project.spotsAvailable} open spot{project.spotsAvailable !== 1 ? 's' : ''} available
                    </p>
                  </div>
                </div>

                {/* Team Collaboration Tools - Shows after joining */}
                {project.slackChannelLink && (
                  <div className="mt-6 space-y-4">
                    <h4 className="text-gray-900">Team Collaboration</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {/* Slack Channel */}
                      <SlackChannelLink
                        channelUrl={project.slackChannelLink}
                        channelName={project.slackChannelId || `project-${project.id}`}
                        memberCount={project.teamSize}
                        variant="card"
                        showMemberCount={true}
                      />

                      {/* GitHub Repository (if code-based project) */}
                      {project.githubRepo && (
                        <GitHubRepositoryLink
                          repoUrl={project.githubRepo}
                          repoName={`transition-trails-partner-${project.partnerId}`}
                          description="Project code repository"
                          variant="card"
                        />
                      )}
                    </div>
                    <p className="text-xs text-gray-500">
                      💡 These collaboration tools are automatically created when you join the team
                    </p>
                  </div>
                )}
              </TabsContent>
            </Tabs>
          </div>
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-gray-200 bg-gray-50 sticky bottom-0">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Sparkles className="w-5 h-5 text-[#F9A03F]" />
              <span className="text-sm text-gray-600">
                Earn +20 points per milestone
              </span>
            </div>
            <button className="px-6 py-3 bg-[#F9A03F] text-white rounded-lg hover:bg-[#e89135] transition-all shadow-lg flex items-center space-x-2">
              <Users className="w-5 h-5" />
              <span>Join Project Team</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
