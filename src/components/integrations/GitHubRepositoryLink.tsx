/**
 * GITHUB REPOSITORY LINK COMPONENT
 * 
 * =============================================================================
 * PURPOSE
 * =============================================================================
 * Displays a link to a GitHub repository with rich metadata, used for:
 * - Capstone project repositories
 * - Partner project code repositories
 * - TrailBuild Summit team repositories
 * 
 * =============================================================================
 * SALESFORCE INTEGRATION
 * =============================================================================
 * 
 * Data Source:
 * - Project__c.Repo_Link__c (URL)
 * - Partner_Project__c.GitHub_Repo__c (URL)
 * - TrailBuild_Team__c.GitHub_Repo__c (URL)
 * 
 * Auto-Creation:
 * - Trigger: ProjectTrigger (After Insert)
 * - Service: GitHubIntegrationService.createRepository(projectName, projectId)
 * - Returns: Repository URL stored in Repo_Link__c
 * 
 * Repository Naming Convention:
 * - Capstone: transition-trails-capstone-{projectId}
 * - Partner: transition-trails-partner-{partner-slug}
 * - TrailBuild: transition-trails-trailbuild-{event}-{team}
 * 
 * Folder Structure (enforced via template):
 * /project-root
 *   ├── /docs        - Documentation, requirements
 *   ├── /code        - Source code
 *   ├── /assets      - Images, design files
 *   ├── /tests       - Test files, QA scripts
 *   ├── README.md
 *   └── .gitignore
 * 
 * =============================================================================
 * PROPS
 * =============================================================================
 * @param repoUrl - Full GitHub repository URL
 * @param repoName - Repository name (e.g., "transition-trails-capstone-a0x5e")
 * @param description - Repository description
 * @param lastCommit - Last commit timestamp (optional)
 * @param commitCount - Total commits (optional)
 * @param contributors - Number of contributors (optional)
 * @param variant - Display style: 'default' | 'compact' | 'card' | 'stats'
 * @param showStats - Whether to show commit/contributor stats
 * 
 * =============================================================================
 */

import { Github, ExternalLink, GitCommit, Users, Clock, Folder, Star, GitBranch } from 'lucide-react';
import { Badge } from '../ui/badge';

interface GitHubRepositoryLinkProps {
  repoUrl: string;
  repoName: string;
  description?: string;
  lastCommit?: string;
  commitCount?: number;
  contributors?: number;
  branchCount?: number;
  isPrivate?: boolean;
  variant?: 'default' | 'compact' | 'card' | 'stats';
  showStats?: boolean;
}

export function GitHubRepositoryLink({
  repoUrl,
  repoName,
  description,
  lastCommit,
  commitCount,
  contributors,
  branchCount,
  isPrivate = false,
  variant = 'default',
  showStats = true,
}: GitHubRepositoryLinkProps) {
  
  // Compact variant - minimal inline link
  if (variant === 'compact') {
    return (
      <a
        href={repoUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center space-x-2 text-sm text-[#2C6975] hover:text-[#234d56] transition-colors group"
        aria-label={`Open GitHub repository ${repoName}`}
      >
        <Github className="w-4 h-4" />
        <span className="group-hover:underline font-mono">{repoName}</span>
        <ExternalLink className="w-3 h-3 opacity-50" />
      </a>
    );
  }

  // Stats variant - detailed stats display
  if (variant === 'stats') {
    return (
      <div className="bg-white rounded-lg border border-gray-200 p-4">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-lg bg-gray-900 flex items-center justify-center">
              <Github className="w-5 h-5 text-white" />
            </div>
            <div>
              <h4 className="text-gray-900 font-mono text-sm mb-1">{repoName}</h4>
              {description && (
                <p className="text-xs text-gray-600">{description}</p>
              )}
            </div>
          </div>
          {isPrivate && (
            <Badge variant="secondary" className="text-xs">
              Private
            </Badge>
          )}
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-3 gap-3 mb-4">
          {commitCount !== undefined && (
            <div className="text-center p-3 bg-gray-50 rounded-lg">
              <GitCommit className="w-5 h-5 text-gray-600 mx-auto mb-1" />
              <p className="text-lg text-gray-900">{commitCount}</p>
              <p className="text-xs text-gray-600">Commits</p>
            </div>
          )}
          {branchCount !== undefined && (
            <div className="text-center p-3 bg-gray-50 rounded-lg">
              <GitBranch className="w-5 h-5 text-gray-600 mx-auto mb-1" />
              <p className="text-lg text-gray-900">{branchCount}</p>
              <p className="text-xs text-gray-600">Branches</p>
            </div>
          )}
          {contributors !== undefined && (
            <div className="text-center p-3 bg-gray-50 rounded-lg">
              <Users className="w-5 h-5 text-gray-600 mx-auto mb-1" />
              <p className="text-lg text-gray-900">{contributors}</p>
              <p className="text-xs text-gray-600">Contributors</p>
            </div>
          )}
        </div>

        {lastCommit && (
          <div className="flex items-center space-x-2 text-xs text-gray-600 mb-4">
            <Clock className="w-3 h-3" />
            <span>Last commit: {lastCommit}</span>
          </div>
        )}

        <a
          href={repoUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors flex items-center justify-center space-x-2 text-sm"
        >
          <Github className="w-4 h-4" />
          <span>View Repository</span>
          <ExternalLink className="w-4 h-4" />
        </a>
      </div>
    );
  }

  // Card variant - full featured card
  if (variant === 'card') {
    return (
      <div className="bg-white rounded-lg border border-gray-200 p-4 hover:border-gray-900 hover:shadow-md transition-all">
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center space-x-3 flex-1 min-w-0">
            <div className="w-10 h-10 rounded-lg bg-gray-900 flex items-center justify-center flex-shrink-0">
              <Github className="w-5 h-5 text-white" />
            </div>
            <div className="min-w-0 flex-1">
              <h4 className="text-gray-900 font-mono text-sm mb-1 truncate">{repoName}</h4>
              {description && (
                <p className="text-xs text-gray-600 line-clamp-2">{description}</p>
              )}
            </div>
          </div>
          {isPrivate && (
            <Badge variant="outline" className="text-xs flex-shrink-0 ml-2">
              Private
            </Badge>
          )}
        </div>

        {showStats && (commitCount !== undefined || contributors !== undefined) && (
          <div className="flex items-center space-x-4 mb-3 text-xs text-gray-600">
            {commitCount !== undefined && (
              <div className="flex items-center space-x-1">
                <GitCommit className="w-3 h-3" />
                <span>{commitCount} commits</span>
              </div>
            )}
            {contributors !== undefined && (
              <div className="flex items-center space-x-1">
                <Users className="w-3 h-3" />
                <span>{contributors} contributors</span>
              </div>
            )}
          </div>
        )}

        {lastCommit && (
          <div className="flex items-center space-x-1 text-xs text-gray-500 mb-3">
            <Clock className="w-3 h-3" />
            <span>Updated {lastCommit}</span>
          </div>
        )}

        <a
          href={repoUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors flex items-center justify-center space-x-2 text-sm"
        >
          <span>View Repository</span>
          <ExternalLink className="w-4 h-4" />
        </a>
      </div>
    );
  }

  // Default variant - standard button
  return (
    <a
      href={repoUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center space-x-2 px-4 py-2 bg-white border border-gray-300 rounded-lg hover:border-gray-900 hover:bg-gray-50 transition-all group"
      aria-label={`Open GitHub repository ${repoName}`}
    >
      <Github className="w-4 h-4 text-gray-900" />
      <span className="text-sm text-gray-900 font-mono">{repoName}</span>
      {showStats && commitCount !== undefined && (
        <Badge variant="secondary" className="text-xs">
          {commitCount} commits
        </Badge>
      )}
      <ExternalLink className="w-4 h-4 text-gray-400 group-hover:text-gray-900" />
    </a>
  );
}

/**
 * =============================================================================
 * FOLDER STRUCTURE INDICATOR COMPONENT
 * =============================================================================
 * Shows the expected folder structure for the repository
 */

interface RepoFolderStructureProps {
  repoUrl: string;
}

export function RepoFolderStructure({ repoUrl }: RepoFolderStructureProps) {
  const folders = [
    { name: 'docs', icon: '📄', description: 'Documentation, requirements, deliverables' },
    { name: 'code', icon: '💻', description: 'Source code' },
    { name: 'assets', icon: '🎨', description: 'Images, design files, media' },
    { name: 'tests', icon: '🧪', description: 'Test files, QA scripts' },
  ];

  return (
    <div className="bg-gray-50 rounded-lg border border-gray-200 p-4">
      <div className="flex items-center space-x-2 mb-3">
        <Folder className="w-4 h-4 text-gray-600" />
        <h4 className="text-sm text-gray-900">Repository Structure</h4>
      </div>
      <div className="space-y-2">
        {folders.map((folder) => (
          <div key={folder.name} className="flex items-start space-x-3 text-sm">
            <span className="text-lg">{folder.icon}</span>
            <div>
              <p className="text-gray-900 font-mono">/{folder.name}</p>
              <p className="text-xs text-gray-600">{folder.description}</p>
            </div>
          </div>
        ))}
      </div>
      <a
        href={repoUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-3 text-xs text-[#2C6975] hover:underline inline-flex items-center space-x-1"
      >
        <span>View full repository structure</span>
        <ExternalLink className="w-3 h-3" />
      </a>
    </div>
  );
}

/**
 * =============================================================================
 * USAGE EXAMPLES
 * =============================================================================
 * 
 * 1. Capstone Project Repository (Compact):
 * ```tsx
 * <GitHubRepositoryLink
 *   repoUrl={project.repoLink}
 *   repoName={`transition-trails-capstone-${project.id}`}
 *   variant="compact"
 * />
 * ```
 * 
 * 2. Partner Project Repository (Card with Stats):
 * ```tsx
 * <GitHubRepositoryLink
 *   repoUrl={project.githubRepo}
 *   repoName={project.repoName}
 *   description={project.description}
 *   commitCount={42}
 *   contributors={5}
 *   lastCommit="2 hours ago"
 *   variant="card"
 *   showStats={true}
 * />
 * ```
 * 
 * 3. TrailBuild Team Repository (Stats Display):
 * ```tsx
 * <GitHubRepositoryLink
 *   repoUrl={team.githubRepo}
 *   repoName={`transition-trails-trailbuild-fall-2025-${team.name}`}
 *   description="TrailBuild Summit project for Green Earth Foundation"
 *   commitCount={87}
 *   branchCount={4}
 *   contributors={6}
 *   lastCommit="30 minutes ago"
 *   variant="stats"
 * />
 * ```
 * 
 * 4. Show Folder Structure Guide:
 * ```tsx
 * <RepoFolderStructure repoUrl={project.repoLink} />
 * ```
 * 
 * =============================================================================
 * SALESFORCE IMPLEMENTATION NOTES
 * =============================================================================
 * 
 * LWC Component: <c-github-repository-link>
 * 
 * Properties:
 * @api repoUrl (String) - Required
 * @api repoName (String) - Required
 * @api description (String) - Optional
 * @api commitCount (Number) - Optional (from GitHub API)
 * @api variant (String) - Optional, default 'default'
 * 
 * GitHub API Integration (Optional):
 * - Fetch real-time repo stats via Apex callout
 * - Cache results for 1 hour to avoid API limits
 * - Endpoint: GET https://api.github.com/repos/transition-trails/{repo}
 * 
 * Data Binding Example:
 * ```html
 * <c-github-repository-link
 *   repo-url={project.Repo_Link__c}
 *   repo-name={repoName}
 *   variant="card"
 *   show-stats="true">
 * </c-github-repository-link>
 * ```
 * 
 * Apex Controller Method:
 * ```apex
 * @AuraEnabled(cacheable=true)
 * public static Map<String, Object> getRepoStats(String repoUrl) {
 *     // Parse repo name from URL
 *     // Call GitHub API
 *     // Return commit count, contributors, last commit
 * }
 * ```
 * 
 * =============================================================================
 */
