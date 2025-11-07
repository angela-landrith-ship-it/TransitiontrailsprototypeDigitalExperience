/**
 * MY CAPSTONE PROJECT
 * 
 * =============================================================================
 * SALESFORCE ARCHITECTURE MAPPING
 * =============================================================================
 * 
 * Experience Page: ExpPage_Projects (Tab: My Capstone)
 * URL Path: /s/projects/capstone
 * Primary Audience: Learner
 * Parent Component: ProjectsHub.tsx
 * 
 * =============================================================================
 * SALESFORCE OBJECTS & FIELDS
 * =============================================================================
 * 
 * Primary Object: Project__c (Type = 'Capstone')
 * Key Fields:
 * - Name (Text, 120) - Project title
 * - Description__c (Long Text Area) - Project overview
 * - Status__c (Picklist) - Planning, Active, Testing, Completed, Submitted
 * - Progress_Percentage__c (Formula) - Auto-calculated from phase completion
 * - Current_Phase__c (Picklist) - Problem Statement, Goals, PRD, Solution Design,
 *                                  Data Model, Automation, Testing, Deployment
 * - Points_Value__c (Number) - 1,400 total points (40% of program)
 * - Points_Earned__c (Number) - Points accumulated based on phase completion
 * - Start_Date__c (Date)
 * - Due_Date__c (Date)
 * - Submission_Date__c (DateTime)
 * - Repo_Link__c (URL) - GitHub repository (auto-created)
 * - Linear_Project_Link__c (URL) - Linear project workspace
 * - Partner_Organization__c (Lookup: Account) - For partner-based capstones
 * - Latest_PDF__c (Lookup: ContentVersion) - Generated deliverable
 * 
 * Related Objects:
 * - Project_Phase__c (Child of Project__c)
 *   Fields: Phase_Name__c, Status__c, Points_Value__c, Due_Date__c, 
 *           Completion_Date__c, Deliverables__c
 * 
 * - Project_Task__c (Child of Project__c)
 *   Fields: Title__c, Description__c, Status__c, Priority__c, Assigned_To__c,
 *           Due_Date__c, GitHub_Issue_Number__c
 * 
 * - Project_Deliverable__c (Child of Project__c)
 *   Fields: Deliverable_Type__c (PRD, Design Doc, Code, Test Plan, PDF),
 *           File__c (Lookup: ContentVersion), Status__c
 * 
 * =============================================================================
 * CMS CONTENT REFERENCES
 * =============================================================================
 * 
 * - [CMS:capstone_hero_title] → "Your Capstone Project"
 * - [CMS:capstone_description] → "Build a comprehensive Salesforce solution..."
 * - [CMS:capstone_completion_message] → Congratulations text on 100%
 * - [CMS:capstone_phase_instructions] → Instructions for each phase
 * 
 * =============================================================================
 * APEX CONTROLLERS
 * =============================================================================
 * 
 * CapstoneProjectController.cls:
 * - getCapstoneProject() → Returns current learner's active Capstone Project__c
 * - getProjectPhases() → Returns Project_Phase__c records ordered by sequence
 * - updatePhaseStatus(phaseId, status) → Marks phase complete, awards points
 * - generateProjectPDF(projectId) → Triggers VF page rendering to PDF
 * - submitCapstoneForReview(projectId) → Updates status, notifies coach
 * 
 * =============================================================================
 * INTEGRATION POINTS
 * =============================================================================
 * 
 * 1. GitHub Repository Integration:
 *    - Auto-created on Project__c creation via ProjectTrigger
 *    - GitHubIntegrationService.createRepository(projectName, projectId)
 *    - Repository naming: transition-trails-capstone-{projectId}
 *    - Folder structure: /docs, /code, /assets, /tests
 *    - Stored in: Project__c.Repo_Link__c
 * 
 * 2. Linear Project Management:
 *    - Manual setup: Learner creates Linear project
 *    - Copies Linear URL to Project__c.Linear_Project_Link__c
 *    - Linear's native GitHub integration syncs commits to issues
 * 
 * 3. Penny AI Assistant Integration:
 *    - <PennyGuideMode> component provides context-aware guidance
 *    - AI tracks phase completion, identifies blockers
 *    - Proactive suggestions for testing, code quality
 *    - API: POST /services/apexrest/penny/capstone-guidance
 * 
 * 4. PDF Generation (Branded Deliverable):
 *    - Visualforce Page: CapstoneProjectPDF
 *    - Flow: Generate_Capstone_PDF (triggered by button)
 *    - Template includes: Transition Trails logo, project summary, phases,
 *      deliverables, team info, coach feedback
 *    - Stored as ContentVersion linked to Project__c
 * 
 * =============================================================================
 * FLOWS & AUTOMATION
 * =============================================================================
 * 
 * 1. Trigger: ProjectTrigger (After Insert)
 *    Action: Queue GitHub repo creation (CreateGitHubRepoQueueable)
 * 
 * 2. Flow: Complete_Project_Phase
 *    Trigger: Project_Phase__c.Status__c = 'Completed'
 *    Actions:
 *      - Award points (create Points_Transaction__c)
 *      - Update Project__c.Progress_Percentage__c
 *      - Send notification to coach
 *      - Update Current_Phase__c to next phase
 * 
 * 3. Flow: Submit_Capstone_For_Review
 *    Trigger: "Complete Capstone" button
 *    Actions:
 *      - Update Project__c.Status__c = 'Submitted'
 *      - Set Submission_Date__c = NOW()
 *      - Create chatter post for coach
 *      - Award completion bonus points
 *      - Unlock Partner_Board (if not already unlocked)
 * 
 * 4. Flow: Generate_Capstone_PDF
 *    Trigger: "Generate PDF Summary" button
 *    Actions:
 *      - Render Visualforce page to PDF
 *      - Create ContentVersion
 *      - Link to Project__c.Latest_PDF__c
 *      - Send email with PDF attachment
 * 
 * =============================================================================
 * GAMIFICATION & POINTS
 * =============================================================================
 * 
 * Total Points: 1,400 (40% of program total 3,500)
 * 
 * Phase Breakdown:
 * - Problem Statement: 150 points
 * - Project Goals: 150 points
 * - Product Requirements (PRD): 200 points
 * - Solution Design: 200 points
 * - Data Model & Objects: 200 points
 * - Automation & Logic: 250 points
 * - Testing & Quality: 150 points
 * - Deployment & Documentation: 100 points
 * 
 * Bonus Points:
 * - Early submission: +50 points
 * - 95%+ test coverage: +50 points
 * - Partner integration: +100 points
 * 
 * =============================================================================
 * TESTING EMPHASIS (Non-Developer Education)
 * =============================================================================
 * 
 * Penny AI provides proactive guidance on:
 * - Writing Apex test classes (target: 85%+ coverage)
 * - User Acceptance Testing (UAT) checklist
 * - Manual testing scenarios
 * - QA best practices (regression testing, edge cases)
 * - Test data setup and teardown
 * 
 * Educational Resources:
 * - Integrated Trailhead modules on testing
 * - Example test classes from coach
 * - Penny suggests test scenarios based on code
 * 
 * =============================================================================
 * LWC COMPONENT MAPPING
 * =============================================================================
 * 
 * React Component → LWC:
 * - <MyCapstone> → <c-my-capstone>
 * - <PennyGuideMode> → <c-penny-guide-mode>
 * - Progress calculation → Apex formula field
 * 
 * =============================================================================
 * ACCESSIBILITY
 * =============================================================================
 * 
 * - Phase buttons keyboard navigable
 * - ARIA labels on completion status
 * - Screen reader announcements on phase completion
 * - Focus management on modal open/close
 * 
 * =============================================================================
 */

import { useState } from 'react';
import { CheckCircle, Circle, FileText, Target, Lightbulb, Code, ArrowRight, Sparkles } from 'lucide-react';
import { Badge } from './ui/badge';
import { PennyGuideMode } from './PennyGuideMode';
import { GitHubRepositoryLink, LinearProjectLink, PDFGenerationButton } from './integrations';

interface MyCapstoneProps {
  onComplete?: () => void;
  capstoneComplete?: boolean;
  onNavigateToPartner?: () => void;
}

export function MyCapstone({ onComplete, capstoneComplete = false, onNavigateToPartner }: MyCapstoneProps) {
  const [sections, setSections] = useState([
    { id: 'problem', title: 'Problem Statement', icon: Target, complete: true },
    { id: 'goals', title: 'Project Goals', icon: Lightbulb, complete: true },
    { id: 'prd', title: 'Product Requirements', icon: FileText, complete: true },
    { id: 'solution', title: 'Solution Design', icon: Code, complete: false }
  ]);

  const progress = (sections.filter(s => s.complete).length / sections.length) * 100;

  // Mock project data (in production, comes from Salesforce Project__c)
  const capstoneProject = {
    id: 'a0x5e000000ABC123',
    name: 'Community Service Volunteer Management System',
    repoUrl: 'https://github.com/transition-trails/capstone-a0x5e000000ABC123',
    repoName: 'transition-trails-capstone-a0x5e',
    linearUrl: 'https://linear.app/transition-trails/project/volunteer-mgmt-8e2f',
    linearProjectName: 'Volunteer Management System',
    commitCount: 42,
    linearIssueCount: 24,
    linearCompletedIssues: 18,
    linearInProgressIssues: 4,
  };

  return (
    <div className="space-y-6">
      {/* Progress Overview */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-2xl text-gray-900 mb-2">Your Capstone Project</h2>
            <p className="text-gray-600">
              Build a comprehensive Salesforce solution that demonstrates your mastery
            </p>
          </div>
          <div className="text-right">
            <div className="text-3xl text-[#2C6975] mb-1">{Math.round(progress)}%</div>
            <div className="text-sm text-gray-600">Complete</div>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-gray-100 rounded-full h-3 mb-6">
          <div
            className="bg-gradient-to-r from-[#2C6975] to-[#7EB5C1] h-3 rounded-full transition-all duration-500"
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* Sections */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          {sections.map((section) => {
            const IconComponent = section.icon;
            return (
              <button
                key={section.id}
                onClick={() => {
                  if (!section.complete) {
                    setSections(sections.map(s => 
                      s.id === section.id ? { ...s, complete: true } : s
                    ));
                  }
                }}
                className="flex items-center space-x-4 p-4 rounded-xl border-2 border-gray-200 hover:border-[#2C6975] hover:shadow-md transition-all text-left"
              >
                <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                  section.complete 
                    ? 'bg-[#2C6975] text-white' 
                    : 'bg-gray-100 text-gray-400'
                }`}>
                  <IconComponent className="w-6 h-6" />
                </div>
                <div className="flex-1">
                  <h3 className="text-gray-900 mb-1">{section.title}</h3>
                  <div className="flex items-center space-x-2">
                    {section.complete ? (
                      <CheckCircle className="w-4 h-4 text-green-500" />
                    ) : (
                      <Circle className="w-4 h-4 text-gray-300" />
                    )}
                    <span className="text-sm text-gray-600">
                      {section.complete ? 'Complete' : 'In Progress'}
                    </span>
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        {/* Complete Capstone Button */}
        {progress === 100 && !capstoneComplete && (
          <button
            onClick={() => {
              if (onComplete) {
                onComplete();
              }
            }}
            className="w-full px-6 py-4 bg-gradient-to-r from-[#2C6975] to-[#3B6A52] text-white rounded-xl hover:shadow-lg transition-all flex items-center justify-center space-x-2"
          >
            <Sparkles className="w-5 h-5" />
            <span className="text-lg">Complete Capstone & Unlock Partner Projects</span>
            <ArrowRight className="w-5 h-5" />
          </button>
        )}
      </div>

      {/* Integration Tools - GitHub, Linear, PDF */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* GitHub Repository */}
        <GitHubRepositoryLink
          repoUrl={capstoneProject.repoUrl}
          repoName={capstoneProject.repoName}
          description="Capstone project code repository"
          commitCount={capstoneProject.commitCount}
          contributors={1}
          variant="card"
          showStats={true}
        />

        {/* Linear Project Management */}
        <LinearProjectLink
          linearUrl={capstoneProject.linearUrl}
          projectName={capstoneProject.linearProjectName}
          issueCount={capstoneProject.linearIssueCount}
          completedIssues={capstoneProject.linearCompletedIssues}
          inProgressIssues={capstoneProject.linearInProgressIssues}
          currentSprint="Sprint 3"
          variant="card"
          showStats={true}
        />

        {/* PDF Generation */}
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <div className="flex items-start space-x-3 mb-4">
            <div className="w-12 h-12 rounded-lg bg-red-50 flex items-center justify-center flex-shrink-0">
              <FileText className="w-6 h-6 text-red-600" />
            </div>
            <div className="flex-1 min-w-0">
              <h4 className="text-gray-900 mb-1">Project Summary</h4>
              <p className="text-sm text-gray-600 mb-2">Generate branded PDF deliverable</p>
            </div>
          </div>
          <PDFGenerationButton
            recordId={capstoneProject.id}
            recordType="capstone"
            fileName={`Capstone_Summary_${capstoneProject.name}.pdf`}
            variant="outline"
            size="md"
            showIcon={true}
          />
          <p className="mt-3 text-xs text-gray-500">
            💡 PDF includes Transition Trails branding, project summary, deliverables, and coach feedback
          </p>
        </div>
      </div>

      {/* Capstone Completion Card */}
      {capstoneComplete && (
        <div className="bg-gradient-to-br from-[#2C6975] to-[#3B6A52] rounded-xl shadow-lg p-8 text-white relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -mr-32 -mt-32" />
          <div className="relative z-10">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-12 h-12 rounded-full bg-[#F9A03F] flex items-center justify-center">
                <Sparkles className="w-6 h-6 text-white" />
              </div>
              <Badge className="bg-white/20 text-white border-white/30">
                Achievement Unlocked
              </Badge>
            </div>
            <h2 className="text-3xl mb-4">Capstone Complete! 🎉</h2>
            <p className="text-white/90 mb-6 max-w-2xl">
              Congratulations! You've completed your Capstone project and demonstrated your Salesforce skills. 
              You're now ready to contribute to real-world Partner Projects and make an impact.
            </p>
            <button
              onClick={() => {
                if (onNavigateToPartner) {
                  onNavigateToPartner();
                }
              }}
              className="px-6 py-3 bg-[#F9A03F] text-white rounded-lg hover:bg-[#e89135] transition-all shadow-lg flex items-center space-x-2"
            >
              <span>Explore Partner Projects</span>
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      )}

      {/* Project Details (existing Capstone content) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h3 className="text-xl text-gray-900 mb-4">Problem Statement</h3>
            <p className="text-gray-700 mb-4">
              Small nonprofits struggle to track donor relationships and measure impact effectively. 
              They need an affordable, easy-to-use system that helps them understand donor behavior 
              and demonstrate their mission's value to stakeholders.
            </p>
            <Badge className="bg-green-500/10 text-green-700">
              <CheckCircle className="w-3 h-3 mr-1" />
              Approved by Coach
            </Badge>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h3 className="text-xl text-gray-900 mb-4">Solution Design</h3>
            <div className="space-y-4">
              <div className="p-4 bg-gray-50 rounded-lg">
                <h4 className="text-gray-900 mb-2">Technical Architecture</h4>
                <ul className="text-sm text-gray-700 space-y-2">
                  <li className="flex items-start space-x-2">
                    <span className="text-[#2C6975] mt-1">•</span>
                    <span>Custom objects for Donors, Campaigns, and Impact Metrics</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="text-[#2C6975] mt-1">•</span>
                    <span>Automated workflows for donor acknowledgments and follow-ups</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="text-[#2C6975] mt-1">•</span>
                    <span>Dashboard with key metrics and donor engagement trends</span>
                  </li>
                </ul>
              </div>

              <div className="p-4 bg-gray-50 rounded-lg">
                <h4 className="text-gray-900 mb-2">Testing Strategy</h4>
                <ul className="text-sm text-gray-700 space-y-2">
                  <li className="flex items-start space-x-2">
                    <span className="text-[#F9A03F] mt-1">•</span>
                    <span>Unit tests for all custom Apex logic (80%+ coverage)</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="text-[#F9A03F] mt-1">•</span>
                    <span>User Acceptance Testing with 3 nonprofit stakeholders</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="text-[#F9A03F] mt-1">•</span>
                    <span>QA checklist covering all user stories and edge cases</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Penny Guide Mode Sidebar */}
        <div className="lg:col-span-1">
          <PennyGuideMode 
            context="capstone"
            currentSection="solution"
          />
        </div>
      </div>
    </div>
  );
}
