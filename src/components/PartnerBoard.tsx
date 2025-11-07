/**
 * PARTNER BOARD - REAL-WORLD PROJECT MARKETPLACE
 * 
 * =============================================================================
 * SALESFORCE ARCHITECTURE MAPPING
 * =============================================================================
 * 
 * Experience Page: ExpPage_Projects (Tab: Partner Board)
 * URL Path: /s/projects/partners
 * Primary Audiences: Learner (must unlock with 500 points), Partner, Coach, Admin
 * Parent Component: ProjectsHub.tsx
 * 
 * Access Control: Requires Partner_Board_Access__c checkbox on User record
 * Unlock Flow: Redeem_Partner_Board_Access (deducts 500 points)
 * 
 * =============================================================================
 * SALESFORCE OBJECTS & FIELDS
 * =============================================================================
 * 
 * Primary Object: Partner_Project__c
 * Key Fields:
 * - Name (Text, 120) - Project title
 * - Partner_Organization__c (Lookup: Account) - Partner company/nonprofit
 * - Partner_Contact__c (Lookup: Contact) - Primary client contact
 * - Project_Brief__c (Long Text Area) - Detailed project description
 * - Summary__c (Text Area, 500) - Short summary for card view
 * - Category__c (Picklist) - Admin, Data, Integration, Custom Development
 * - Status__c (Picklist) - Open, In Progress, Filled, Completed, On Hold
 * - Required_Skills__c (Multi-Select Picklist) - Flows, Reports, Apex, LWC, etc.
 * - Duration__c (Text, 50) - "4-6 weeks", "2-3 months"
 * - Team_Size__c (Number) - Total team spots (3-5)
 * - Spots_Available__c (Formula) - Team_Size__c - (COUNT of accepted team members)
 * - Featured__c (Checkbox) - Display prominently
 * - Impact_Category__c (Picklist) - Nonprofit, Small Business, Community
 * - Project_Value__c (Currency) - Estimated value for impact metrics
 * - Start_Date__c (Date)
 * - Target_End_Date__c (Date)
 * - Slack_Channel_Id__c (Text, 50) - Auto-created Slack channel
 * - Slack_Channel_Link__c (URL)
 * - Client_Facing__c (Checkbox) - True if deliverable goes to external client
 * 
 * Related Object: Account (Partner Organization)
 * Fields: Name, Logo_URL__c, Website, Industry, BillingCity, BillingState,
 *         Partner_Type__c (Nonprofit, Small Business, Startup)
 * 
 * Related Object: Project_Application__c (Junction Object)
 * Fields:
 * - Partner_Project__c (Master-Detail: Partner_Project__c)
 * - Applicant__c (Lookup: User)
 * - Application_Date__c (DateTime)
 * - Status__c (Picklist) - Pending, Accepted, Rejected, Withdrawn
 * - Cover_Letter__c (Long Text Area)
 * - Relevant_Skills__c (Text Area)
 * - Availability__c (Text, 100)
 * 
 * Related Object: Project_Team__c (Accepted team members)
 * Fields:
 * - Partner_Project__c (Master-Detail: Partner_Project__c)
 * - Team_Member__c (Lookup: User)
 * - Role__c (Picklist) - Lead, Developer, Designer, QA
 * - Join_Date__c (Date)
 * - Contribution_Points__c (Number) - Points earned on project
 * 
 * =============================================================================
 * CMS CONTENT REFERENCES
 * =============================================================================
 * 
 * - [CMS:partner_board_hero_title] → "Partner Board"
 * - [CMS:partner_board_description] → "Apply to real-world projects..."
 * - [CMS:partner_board_locked_message] → Message shown before unlock
 * - [CMS:partner_logos] → Account.Logo_URL__c (stored in Salesforce Files)
 * 
 * Partner Organization Logos:
 * - Stored as ContentVersion linked to Account
 * - Field: Account.Logo_URL__c (Formula: ContentVersion public URL)
 * - If no logo, use default placeholder
 * 
 * =============================================================================
 * APEX CONTROLLERS
 * =============================================================================
 * 
 * PartnerBoardController.cls:
 * - getAvailableProjects() → Returns Partner_Project__c where Status = 'Open' 
 *   and Spots_Available > 0
 * - searchProjects(searchTerm, category) → Filtered SOQL query
 * - getFeaturedProjects() → Returns projects where Featured__c = true
 * - getProjectDetails(projectId) → Full project info with partner details
 * - submitApplication(projectId, coverLetter) → Creates Project_Application__c
 * - checkPartnerBoardAccess(userId) → Returns User.Partner_Board_Access__c
 * 
 * =============================================================================
 * INTEGRATION POINTS
 * =============================================================================
 * 
 * 1. Slack Channel Auto-Creation:
 *    - Trigger: Project_Application__c.Status__c = 'Accepted'
 *    - Service: SlackIntegrationService.createProjectChannel()
 *    - Channel naming: project-{projectId}
 *    - Auto-invite: Team members, partner contact, assigned coach
 *    - Welcome message: Project details, Penny introduction
 *    - Stored: Partner_Project__c.Slack_Channel_Link__c
 * 
 * 2. GitHub Repository (Optional):
 *    - Some partner projects include code deliverables
 *    - Auto-created via GitHubIntegrationService if Code_Based__c = true
 *    - Repository: transition-trails-partner-{partner-slug}
 *    - Shared access with client organization
 * 
 * 3. Points System Integration:
 *    - Unlock cost: 500 points (one-time)
 *    - Project completion: Variable points (200-600 based on complexity)
 *    - Bonus points: Client testimonial (+100), deployed solution (+150)
 * 
 * 4. Partner Portal Access:
 *    - Partners see their own projects only (filtered by Account)
 *    - Can view applications, accept/reject applicants
 *    - Experience Cloud Partner Community profile
 * 
 * =============================================================================
 * FLOWS & AUTOMATION
 * =============================================================================
 * 
 * 1. Flow: Unlock_Partner_Board
 *    Trigger: User clicks "Unlock Partner Board" (LockedFeatureModal)
 *    Actions:
 *      - Check points balance >= 500
 *      - Create Points_Transaction__c (Redeemed, -500 points)
 *      - Update User.Partner_Board_Access__c = true
 *      - Send congratulations email
 *      - Create badge award (Partner Explorer)
 * 
 * 2. Flow: Submit_Partner_Application
 *    Trigger: User submits application via ProjectDetailModal
 *    Actions:
 *      - Create Project_Application__c record
 *      - Send email to partner contact
 *      - Send confirmation email to applicant
 *      - Create Chatter post on project
 * 
 * 3. Flow: Accept_Team_Member
 *    Trigger: Partner accepts application (Status = 'Accepted')
 *    Actions:
 *      - Create Project_Team__c record
 *      - Update Partner_Project__c.Spots_Available__c (formula recalculates)
 *      - Create Slack channel (via Apex callout)
 *      - Send welcome email with Slack link
 *      - Notify coach of new assignment
 * 
 * 4. Trigger: ProjectTeamTrigger (After Insert)
 *    Action: If first team member, call SlackIntegrationService.createProjectChannel()
 * 
 * =============================================================================
 * GAMIFICATION & UNLOCK SYSTEM
 * =============================================================================
 * 
 * Unlock Requirements:
 * - Points cost: 500 (one-time unlock)
 * - Alternative: Complete capstone project (auto-unlocks)
 * - Field: User.Partner_Board_Access__c (Checkbox)
 * 
 * Points Awarded:
 * - Project completion: 200-600 points (based on Partner_Project__c.Points_Value__c)
 * - Milestones: 50 points per completed phase
 * - Client testimonial: +100 bonus
 * - Deployed to production: +150 bonus
 * - Early completion: +50 bonus
 * 
 * Badges:
 * - Partner Explorer: Unlock Partner Board
 * - Impact Maker: Complete first partner project
 * - Community Champion: Complete 3 partner projects
 * 
 * =============================================================================
 * SEARCH & FILTERING
 * =============================================================================
 * 
 * Client-Side (React Prototype):
 * - Search by: title, summary, partner name
 * - Filter by: category, duration, team size, featured
 * 
 * Server-Side (Salesforce):
 * - SOQL WHERE clauses on Partner_Project__c
 * - Use SOSL for full-text search across Name, Summary__c, Partner_Organization__r.Name
 * - Example SOSL: FIND {volunteer} IN ALL FIELDS RETURNING Partner_Project__c
 * 
 * =============================================================================
 * LWC COMPONENT MAPPING
 * =============================================================================
 * 
 * React Components → LWC:
 * - <PartnerBoard> → <c-partner-board>
 * - <ProjectDetailModal> → <c-project-detail-modal>
 * - Search/filter → Lightning data table with server-side filtering
 * 
 * =============================================================================
 * PARTNER EXPERIENCE (Separate View)
 * =============================================================================
 * 
 * Partner Audience sees:
 * - Only their organization's projects
 * - Application queue (pending applicants)
 * - Accept/reject applicants
 * - Project progress dashboard
 * - Team communication (Slack integration)
 * - Deliverable review/approval
 * 
 * Partner Page: ExpPage_Partner_Dashboard
 * Object: Same Partner_Project__c, filtered by Account
 * 
 * =============================================================================
 * ACCESSIBILITY
 * =============================================================================
 * 
 * - Search input has aria-label
 * - Filter buttons keyboard navigable
 * - Project cards announce status to screen readers
 * - Modal dialogs trap focus
 * - High contrast mode support
 * 
 * =============================================================================
 */

import { useState } from 'react';
import { Search, Filter, Users, Clock, TrendingUp, ExternalLink, Star } from 'lucide-react';
import { Badge } from './ui/badge';
import { ProjectDetailModal } from './ProjectDetailModal';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface PartnerProject {
  id: string;
  partnerId: string;
  partnerName: string;
  partnerLogo: string;
  title: string;
  summary: string;
  category: 'Admin' | 'Data' | 'Integration';
  skills: string[];
  duration: string;
  teamSize: number;
  spotsAvailable: number;
  featured?: boolean;
}

interface PartnerBoardProps {
  userRole?: 'learner' | 'coach' | 'partner';
}

const mockProjects: PartnerProject[] = [
  {
    id: '1',
    partnerId: 'p1',
    partnerName: 'Green Earth Foundation',
    partnerLogo: 'https://images.unsplash.com/photo-1758790636662-2f8eec12077e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxub25wcm9maXQlMjBjaGFyaXR5JTIwbG9nb3xlbnwxfHx8fDE3NjI1NTM1MTB8MA&ixlib=rb-4.1.0&q=80&w=1080',
    title: 'Volunteer Management System',
    summary: 'Build a comprehensive volunteer tracking and scheduling system to coordinate community cleanups and events.',
    category: 'Admin',
    skills: ['Flows', 'Reports', 'Dashboards', 'Custom Objects'],
    duration: '4-6 weeks',
    teamSize: 4,
    spotsAvailable: 2,
    featured: true
  },
  {
    id: '2',
    partnerId: 'p2',
    partnerName: 'Tech for Good Alliance',
    partnerLogo: 'https://images.unsplash.com/photo-1760138270903-d95903188730?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0ZWNoJTIwY29tcGFueSUyMGxvZ298ZW58MXx8fHwxNzYyNTE5MTgwfDA&ixlib=rb-4.1.0&q=80&w=1080',
    title: 'Data Migration & Cleanup',
    summary: 'Migrate legacy data from Excel/Access into Salesforce and establish data quality standards.',
    category: 'Data',
    skills: ['Data Loader', 'Data Quality', 'Validation Rules', 'Deduplication'],
    duration: '3-4 weeks',
    teamSize: 3,
    spotsAvailable: 1,
    featured: true
  },
  {
    id: '3',
    partnerId: 'p3',
    partnerName: 'Community Connect',
    partnerLogo: 'https://images.unsplash.com/photo-1603077721634-6826d51d814c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb21tdW5pdHklMjBvcmdhbml6YXRpb258ZW58MXx8fHwxNzYyNTUzNTExfDA&ixlib=rb-4.1.0&q=80&w=1080',
    title: 'Email Marketing Integration',
    summary: 'Integrate Mailchimp with Salesforce to sync contacts and track campaign engagement.',
    category: 'Integration',
    skills: ['APIs', 'Integration', 'Flows', 'Process Automation'],
    duration: '2-3 weeks',
    teamSize: 2,
    spotsAvailable: 2
  },
  {
    id: '4',
    partnerId: 'p1',
    partnerName: 'Green Earth Foundation',
    partnerLogo: 'https://images.unsplash.com/photo-1758790636662-2f8eec12077e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxub25wcm9maXQlMjBjaGFyaXR5JTIwbG9nb3xlbnwxfHx8fDE3NjI1NTM1MTB8MA&ixlib=rb-4.1.0&q=80&w=1080',
    title: 'Donor Impact Dashboard',
    summary: 'Create executive dashboards showing donation trends, campaign ROI, and environmental impact metrics.',
    category: 'Admin',
    skills: ['Reports', 'Dashboards', 'Analytics', 'Einstein Analytics'],
    duration: '3 weeks',
    teamSize: 2,
    spotsAvailable: 1
  }
];

export function PartnerBoard({ userRole = 'learner' }: PartnerBoardProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedProject, setSelectedProject] = useState<PartnerProject | null>(null);

  const categories = [
    { id: 'all', name: 'All Projects' },
    { id: 'Admin', name: 'Admin' },
    { id: 'Data', name: 'Data' },
    { id: 'Integration', name: 'Integration' }
  ];

  const filteredProjects = mockProjects.filter(project => {
    const matchesCategory = selectedCategory === 'all' || project.category === selectedCategory;
    const matchesSearch = 
      project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.partnerName.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const featuredProjects = filteredProjects.filter(p => p.featured);
  const regularProjects = filteredProjects.filter(p => !p.featured);

  return (
    <div className="space-y-8">
      {/* Search & Filters */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex flex-col md:flex-row gap-4">
          {/* Search */}
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search partner projects..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#F9A03F] bg-white"
            />
          </div>

          {/* Category Filter */}
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-4 py-2 rounded-lg transition-all ${
                  selectedCategory === category.id
                    ? 'bg-[#F9A03F] text-white shadow-md'
                    : 'bg-white text-gray-700 hover:bg-gray-50 border-2 border-gray-200'
                }`}
              >
                {category.name}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Featured Projects */}
      {featuredProjects.length > 0 && (
        <div>
          <div className="flex items-center space-x-2 mb-4">
            <Star className="w-5 h-5 text-[#F9A03F]" />
            <h2 className="text-2xl text-gray-900">Featured Projects</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {featuredProjects.map((project) => (
              <ProjectCard
                key={project.id}
                project={project}
                onClick={() => setSelectedProject(project)}
              />
            ))}
          </div>
        </div>
      )}

      {/* All Projects */}
      <div>
        <h2 className="text-2xl text-gray-900 mb-4">
          {selectedCategory === 'all' ? 'All Partner Projects' : `${selectedCategory} Projects`}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {regularProjects.map((project) => (
            <ProjectCard
              key={project.id}
              project={project}
              onClick={() => setSelectedProject(project)}
            />
          ))}
        </div>

        {filteredProjects.length === 0 && (
          <div className="text-center py-12 bg-white rounded-xl border border-gray-200">
            <Filter className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-600">No projects found matching your criteria</p>
          </div>
        )}
      </div>

      {/* Project Detail Modal */}
      {selectedProject && (
        <ProjectDetailModal
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
        />
      )}
    </div>
  );
}

function ProjectCard({ project, onClick }: { project: PartnerProject; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="bg-white rounded-xl shadow-sm border-2 border-[#3B6A52]/20 hover:border-[#F9A03F] hover:shadow-xl transition-all text-left group overflow-hidden"
    >
      {/* Partner Header */}
      <div className="p-4 bg-[#F5F3E8] border-b border-gray-200 flex items-center space-x-3">
        <div className="w-12 h-12 rounded-lg overflow-hidden bg-white flex-shrink-0">
          <ImageWithFallback
            src={project.partnerLogo}
            alt={project.partnerName}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="text-sm text-gray-900 truncate">{project.partnerName}</h3>
          <Badge className="bg-[#3B6A52]/10 text-[#3B6A52] text-xs">
            {project.category}
          </Badge>
        </div>
      </div>

      {/* Project Content */}
      <div className="p-4">
        <h4 className="text-lg text-gray-900 mb-2 group-hover:text-[#2C6975] transition-colors">
          {project.title}
        </h4>
        <p className="text-sm text-gray-600 mb-4 line-clamp-2">
          {project.summary}
        </p>

        {/* Skills */}
        <div className="flex flex-wrap gap-1.5 mb-4">
          {project.skills.slice(0, 3).map((skill, index) => (
            <Badge key={index} className="bg-[#7EB5C1]/10 text-[#2C6975] text-xs">
              {skill}
            </Badge>
          ))}
          {project.skills.length > 3 && (
            <Badge className="bg-gray-100 text-gray-600 text-xs">
              +{project.skills.length - 3} more
            </Badge>
          )}
        </div>

        {/* Metadata */}
        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center space-x-1 text-gray-600">
            <Clock className="w-4 h-4" />
            <span>{project.duration}</span>
          </div>
          <div className="flex items-center space-x-1 text-gray-600">
            <Users className="w-4 h-4" />
            <span>{project.spotsAvailable} spots left</span>
          </div>
        </div>

        {/* CTA */}
        <div className="mt-4 pt-4 border-t border-gray-200">
          <div className="flex items-center justify-between">
            <span className="text-sm text-[#F9A03F]">View Project Details</span>
            <ExternalLink className="w-4 h-4 text-[#F9A03F] group-hover:translate-x-1 transition-transform" />
          </div>
        </div>
      </div>

      {/* Amber Shadow Pulse on Hover */}
      <div className="absolute inset-0 rounded-xl shadow-[0_0_0_0_rgba(249,160,63,0.4)] group-hover:shadow-[0_0_20px_8px_rgba(249,160,63,0.3)] transition-shadow pointer-events-none" />
    </button>
  );
}
