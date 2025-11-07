/**
 * LINEAR PROJECT MANAGEMENT LINK COMPONENT
 * 
 * =============================================================================
 * PURPOSE
 * =============================================================================
 * Displays a link to Linear project workspace for:
 * - Capstone project task management
 * - Partner project sprint planning
 * - TrailBuild Summit team coordination
 * 
 * =============================================================================
 * SALESFORCE INTEGRATION
 * =============================================================================
 * 
 * Data Source:
 * - Project__c.Linear_Project_Link__c (URL)
 * - Capstone__c.Linear_Project_Link__c (URL)
 * 
 * Linear Integration:
 * - NOT auto-created (manual setup by learners)
 * - Learners create Linear project in shared workspace
 * - Copy Linear project URL into Salesforce field
 * - Linear's native GitHub integration syncs commits → issues
 * 
 * Linear Features Used:
 * - Issues/Tasks with labels
 * - Sprint cycles (1-2 weeks)
 * - GitHub commit auto-linking
 * - Project roadmap view
 * - Team collaboration
 * 
 * =============================================================================
 * PROPS
 * =============================================================================
 * @param linearUrl - Full Linear project URL
 * @param projectName - Project name in Linear
 * @param issueCount - Number of issues/tasks (optional)
 * @param completedIssues - Number of completed issues (optional)
 * @param currentSprint - Current sprint name (optional)
 * @param variant - Display style: 'default' | 'compact' | 'card' | 'stats'
 * @param showStats - Whether to show issue/sprint stats
 * 
 * =============================================================================
 */

import { useState } from 'react';
import { ListTodo, ExternalLink, CheckCircle, Circle, TrendingUp, Calendar, Target } from 'lucide-react';
import { Badge } from '../ui/badge';
import { Progress } from '../ui/progress';

interface LinearProjectLinkProps {
  linearUrl: string;
  projectName: string;
  issueCount?: number;
  completedIssues?: number;
  inProgressIssues?: number;
  currentSprint?: string;
  sprintEndDate?: string;
  variant?: 'default' | 'compact' | 'card' | 'stats';
  showStats?: boolean;
}

export function LinearProjectLink({
  linearUrl,
  projectName,
  issueCount,
  completedIssues,
  inProgressIssues,
  currentSprint,
  sprintEndDate,
  variant = 'default',
  showStats = true,
}: LinearProjectLinkProps) {
  
  // Calculate progress percentage
  const progressPercentage = issueCount && completedIssues 
    ? Math.round((completedIssues / issueCount) * 100)
    : 0;

  // Compact variant - minimal inline link
  if (variant === 'compact') {
    return (
      <a
        href={linearUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center space-x-2 text-sm text-[#2C6975] hover:text-[#234d56] transition-colors group"
        aria-label={`Open Linear project ${projectName}`}
      >
        <ListTodo className="w-4 h-4 text-[#5E6AD2]" />
        <span className="group-hover:underline">{projectName}</span>
        <ExternalLink className="w-3 h-3 opacity-50" />
      </a>
    );
  }

  // Stats variant - detailed progress dashboard
  if (variant === 'stats') {
    return (
      <div className="bg-white rounded-lg border border-gray-200 p-4">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-lg bg-[#5E6AD2]/10 flex items-center justify-center">
              <ListTodo className="w-5 h-5 text-[#5E6AD2]" />
            </div>
            <div>
              <h4 className="text-gray-900 mb-1">{projectName}</h4>
              {currentSprint && (
                <p className="text-xs text-gray-600">Sprint: {currentSprint}</p>
              )}
            </div>
          </div>
          <Badge variant="outline" className="text-xs">
            Linear
          </Badge>
        </div>

        {/* Progress Bar */}
        {showStats && issueCount !== undefined && completedIssues !== undefined && (
          <div className="mb-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-gray-700">Progress</span>
              <span className="text-sm text-gray-900">{completedIssues} / {issueCount} issues</span>
            </div>
            <Progress value={progressPercentage} className="h-2" />
            <p className="text-xs text-gray-500 mt-1">{progressPercentage}% complete</p>
          </div>
        )}

        {/* Issue Stats */}
        {showStats && (
          <div className="grid grid-cols-3 gap-2 mb-4">
            <div className="text-center p-2 bg-green-50 rounded-lg">
              <CheckCircle className="w-4 h-4 text-green-600 mx-auto mb-1" />
              <p className="text-lg text-gray-900">{completedIssues || 0}</p>
              <p className="text-xs text-gray-600">Done</p>
            </div>
            <div className="text-center p-2 bg-blue-50 rounded-lg">
              <Circle className="w-4 h-4 text-blue-600 mx-auto mb-1" />
              <p className="text-lg text-gray-900">{inProgressIssues || 0}</p>
              <p className="text-xs text-gray-600">In Progress</p>
            </div>
            <div className="text-center p-2 bg-gray-50 rounded-lg">
              <Target className="w-4 h-4 text-gray-600 mx-auto mb-1" />
              <p className="text-lg text-gray-900">{(issueCount || 0) - (completedIssues || 0) - (inProgressIssues || 0)}</p>
              <p className="text-xs text-gray-600">Todo</p>
            </div>
          </div>
        )}

        {sprintEndDate && (
          <div className="flex items-center space-x-2 text-xs text-gray-600 mb-4 p-2 bg-gray-50 rounded">
            <Calendar className="w-3 h-3" />
            <span>Sprint ends: {sprintEndDate}</span>
          </div>
        )}

        <a
          href={linearUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full px-4 py-2 bg-[#5E6AD2] text-white rounded-lg hover:bg-[#4F5BC4] transition-colors flex items-center justify-center space-x-2 text-sm"
        >
          <span>Open in Linear</span>
          <ExternalLink className="w-4 h-4" />
        </a>
      </div>
    );
  }

  // Card variant - medium detail level
  if (variant === 'card') {
    return (
      <div className="bg-white rounded-lg border border-gray-200 p-4 hover:border-[#5E6AD2] hover:shadow-md transition-all">
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-lg bg-[#5E6AD2]/10 flex items-center justify-center">
              <ListTodo className="w-5 h-5 text-[#5E6AD2]" />
            </div>
            <div>
              <h4 className="text-gray-900 mb-1">{projectName}</h4>
              {currentSprint && (
                <p className="text-xs text-gray-600">{currentSprint}</p>
              )}
            </div>
          </div>
          <Badge variant="outline" className="text-xs">
            Linear
          </Badge>
        </div>

        {showStats && issueCount !== undefined && completedIssues !== undefined && (
          <div className="mb-3">
            <div className="flex items-center justify-between mb-2 text-sm">
              <span className="text-gray-600">Progress</span>
              <span className="text-gray-900">{progressPercentage}%</span>
            </div>
            <Progress value={progressPercentage} className="h-2 mb-1" />
            <p className="text-xs text-gray-500">{completedIssues} of {issueCount} issues completed</p>
          </div>
        )}

        <a
          href={linearUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full px-4 py-2 bg-[#5E6AD2] text-white rounded-lg hover:bg-[#4F5BC4] transition-colors flex items-center justify-center space-x-2 text-sm"
        >
          <span>Open Project</span>
          <ExternalLink className="w-4 h-4" />
        </a>
      </div>
    );
  }

  // Default variant - standard button
  return (
    <a
      href={linearUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center space-x-2 px-4 py-2 bg-white border border-gray-300 rounded-lg hover:border-[#5E6AD2] hover:bg-gray-50 transition-all group"
      aria-label={`Open Linear project ${projectName}`}
    >
      <ListTodo className="w-4 h-4 text-[#5E6AD2]" />
      <span className="text-sm text-gray-900">{projectName}</span>
      {showStats && issueCount !== undefined && (
        <Badge variant="secondary" className="text-xs">
          {issueCount} issues
        </Badge>
      )}
      <ExternalLink className="w-4 h-4 text-gray-400 group-hover:text-[#5E6AD2]" />
    </a>
  );
}

/**
 * =============================================================================
 * LINEAR SETUP GUIDE COMPONENT
 * =============================================================================
 * Shows instructions for setting up Linear integration
 */

interface LinearSetupGuideProps {
  onComplete?: (linearUrl: string) => void;
}

export function LinearSetupGuide({ onComplete }: LinearSetupGuideProps) {
  const [linearUrl, setLinearUrl] = useState('');
  const [step, setStep] = useState(1);

  const handleSubmit = () => {
    if (linearUrl && onComplete) {
      onComplete(linearUrl);
    }
  };

  const steps = [
    {
      number: 1,
      title: 'Create Linear Project',
      description: 'Go to the Transition Trails workspace in Linear and create a new project',
      action: (
        <a
          href="https://linear.app"
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm text-[#5E6AD2] hover:underline inline-flex items-center space-x-1"
        >
          <span>Open Linear Workspace</span>
          <ExternalLink className="w-3 h-3" />
        </a>
      ),
    },
    {
      number: 2,
      title: 'Set Up GitHub Integration',
      description: 'Connect your GitHub repository to Linear for automatic issue linking',
      action: (
        <p className="text-xs text-gray-600">Settings → Integrations → GitHub</p>
      ),
    },
    {
      number: 3,
      title: 'Copy Project URL',
      description: 'Copy the Linear project URL and paste it below',
      action: (
        <div className="space-y-2">
          <input
            type="url"
            value={linearUrl}
            onChange={(e) => setLinearUrl(e.target.value)}
            placeholder="https://linear.app/transition-trails/project/..."
            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
          />
          <button
            onClick={handleSubmit}
            disabled={!linearUrl}
            className="w-full px-4 py-2 bg-[#5E6AD2] text-white rounded-lg hover:bg-[#4F5BC4] disabled:opacity-50 disabled:cursor-not-allowed text-sm"
          >
            Save Linear Project Link
          </button>
        </div>
      ),
    },
  ];

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      <div className="flex items-center space-x-3 mb-4">
        <div className="w-10 h-10 rounded-lg bg-[#5E6AD2]/10 flex items-center justify-center">
          <ListTodo className="w-5 h-5 text-[#5E6AD2]" />
        </div>
        <div>
          <h3 className="text-gray-900">Set Up Linear Project Management</h3>
          <p className="text-sm text-gray-600">Connect your project to Linear for task tracking</p>
        </div>
      </div>

      <div className="space-y-4">
        {steps.map((stepItem) => (
          <div
            key={stepItem.number}
            className={`p-4 rounded-lg border-2 ${
              step === stepItem.number ? 'border-[#5E6AD2] bg-[#5E6AD2]/5' : 'border-gray-200'
            }`}
          >
            <div className="flex items-start space-x-3 mb-2">
              <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs ${
                step >= stepItem.number ? 'bg-[#5E6AD2] text-white' : 'bg-gray-200 text-gray-600'
              }`}>
                {stepItem.number}
              </div>
              <div className="flex-1">
                <h4 className="text-gray-900 mb-1">{stepItem.title}</h4>
                <p className="text-sm text-gray-600 mb-2">{stepItem.description}</p>
                {stepItem.action}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-4 p-3 bg-blue-50 rounded-lg border border-blue-200">
        <p className="text-xs text-blue-900">
          💡 <strong>Pro Tip:</strong> Linear's GitHub integration will automatically link commits to issues when you include the issue ID in your commit message (e.g., "TRA-123: Fixed bug").
        </p>
      </div>
    </div>
  );
}

/**
 * =============================================================================
 * USAGE EXAMPLES
 * =============================================================================
 * 
 * 1. Capstone Project Dashboard (Compact):
 * ```tsx
 * <LinearProjectLink
 *   linearUrl={project.linearProjectLink}
 *   projectName={project.name}
 *   variant="compact"
 * />
 * ```
 * 
 * 2. Project Workspace Card (Stats):
 * ```tsx
 * <LinearProjectLink
 *   linearUrl={project.linearProjectLink}
 *   projectName="Volunteer Management System"
 *   issueCount={24}
 *   completedIssues={18}
 *   inProgressIssues={4}
 *   currentSprint="Sprint 3"
 *   sprintEndDate="March 15"
 *   variant="stats"
 *   showStats={true}
 * />
 * ```
 * 
 * 3. Partner Project Brief (Card):
 * ```tsx
 * <LinearProjectLink
 *   linearUrl={project.linearProjectLink}
 *   projectName={project.title}
 *   issueCount={project.taskCount}
 *   completedIssues={project.completedTasks}
 *   variant="card"
 * />
 * ```
 * 
 * 4. Setup Guide for New Projects:
 * ```tsx
 * <LinearSetupGuide
 *   onComplete={(url) => {
 *     // Save to Salesforce
 *     updateProject({ linearProjectLink: url });
 *   }}
 * />
 * ```
 * 
 * =============================================================================
 * SALESFORCE IMPLEMENTATION NOTES
 * =============================================================================
 * 
 * LWC Component: <c-linear-project-link>
 * 
 * Properties:
 * @api linearUrl (String) - Required
 * @api projectName (String) - Required
 * @api variant (String) - Optional, default 'default'
 * 
 * Linear API Integration (Optional):
 * - Fetch real-time issue stats via Apex callout
 * - Linear GraphQL API endpoint: https://api.linear.app/graphql
 * - Requires API key (stored in Named Credential)
 * - Cache results for 15 minutes
 * 
 * Data Binding Example:
 * ```html
 * <c-linear-project-link
 *   linear-url={project.Linear_Project_Link__c}
 *   project-name={project.Name}
 *   variant="card"
 *   show-stats="true">
 * </c-linear-project-link>
 * ```
 * 
 * Apex Controller Method (Optional):
 * ```apex
 * @AuraEnabled(cacheable=true)
 * public static Map<String, Object> getLinearProjectStats(String projectUrl) {
 *     // Extract project ID from URL
 *     // Call Linear GraphQL API
 *     // Return: issueCount, completedIssues, currentSprint
 * }
 * ```
 * 
 * Field Setup:
 * - Object: Project__c
 * - Field: Linear_Project_Link__c (URL, 255)
 * - Help Text: "Linear project workspace URL for task management"
 * - Validation: Must start with "https://linear.app/"
 * 
 * =============================================================================
 */
