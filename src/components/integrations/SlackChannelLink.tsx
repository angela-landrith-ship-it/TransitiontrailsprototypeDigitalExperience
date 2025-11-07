/**
 * SLACK CHANNEL LINK COMPONENT
 * 
 * =============================================================================
 * PURPOSE
 * =============================================================================
 * Displays a clickable link to open a Slack channel, used for:
 * - Partner Project team channels
 * - TrailBuild Summit team channels
 * - Main program community channel
 * 
 * =============================================================================
 * SALESFORCE INTEGRATION
 * =============================================================================
 * 
 * Data Source:
 * - Partner_Project__c.Slack_Channel_Link__c (URL)
 * - Partner_Project__c.Slack_Channel_Id__c (Text, 50)
 * - TrailBuild_Team__c.Slack_Channel__c (Text, 50)
 * 
 * Auto-Creation Flow:
 * - Trigger: Project_Application__c.Status__c = 'Accepted'
 * - Service: SlackIntegrationService.createProjectChannel()
 * - Stores channel URL in project record
 * 
 * Channel Naming Convention:
 * - Partner Projects: project-{projectId}
 * - TrailBuild Teams: trailbuild-team-{teamName}
 * - Event Channels: trailbuild-summit-{eventName}
 * 
 * =============================================================================
 * PROPS
 * =============================================================================
 * @param channelUrl - Full Slack channel URL (e.g., https://transition-trails.slack.com/archives/C123ABC456)
 * @param channelName - Display name (e.g., "project-housing-connect")
 * @param channelId - Slack channel ID (e.g., "C123ABC456")
 * @param memberCount - Number of members in channel (optional)
 * @param lastActivity - Last message timestamp (optional)
 * @param variant - Display style: 'default' | 'compact' | 'card'
 * 
 * =============================================================================
 */

import { MessageSquare, ExternalLink, Users, Clock } from 'lucide-react';
import { Badge } from '../ui/badge';

interface SlackChannelLinkProps {
  channelUrl: string;
  channelName: string;
  channelId?: string;
  memberCount?: number;
  lastActivity?: string;
  variant?: 'default' | 'compact' | 'card';
  showMemberCount?: boolean;
  showLastActivity?: boolean;
}

export function SlackChannelLink({
  channelUrl,
  channelName,
  channelId,
  memberCount,
  lastActivity,
  variant = 'default',
  showMemberCount = true,
  showLastActivity = false,
}: SlackChannelLinkProps) {
  
  // Compact variant - minimal inline link
  if (variant === 'compact') {
    return (
      <a
        href={channelUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center space-x-2 text-sm text-[#2C6975] hover:text-[#234d56] transition-colors group"
        aria-label={`Open Slack channel ${channelName}`}
      >
        <MessageSquare className="w-4 h-4 text-[#E01E5A]" />
        <span className="group-hover:underline">#{channelName}</span>
        <ExternalLink className="w-3 h-3 opacity-50" />
      </a>
    );
  }

  // Card variant - full featured card
  if (variant === 'card') {
    return (
      <div className="bg-white rounded-lg border border-gray-200 p-4 hover:border-[#2C6975] hover:shadow-md transition-all">
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-lg bg-[#E01E5A]/10 flex items-center justify-center">
              <MessageSquare className="w-5 h-5 text-[#E01E5A]" />
            </div>
            <div>
              <h4 className="text-gray-900 mb-1">#{channelName}</h4>
              {channelId && (
                <p className="text-xs text-gray-500 font-mono">{channelId}</p>
              )}
            </div>
          </div>
          <Badge variant="outline" className="text-xs">
            Slack
          </Badge>
        </div>

        {(showMemberCount || showLastActivity) && (
          <div className="flex items-center space-x-4 mb-3 text-sm text-gray-600">
            {showMemberCount && memberCount !== undefined && (
              <div className="flex items-center space-x-1">
                <Users className="w-4 h-4" />
                <span>{memberCount} members</span>
              </div>
            )}
            {showLastActivity && lastActivity && (
              <div className="flex items-center space-x-1">
                <Clock className="w-4 h-4" />
                <span>{lastActivity}</span>
              </div>
            )}
          </div>
        )}

        <a
          href={channelUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full px-4 py-2 bg-[#E01E5A] text-white rounded-lg hover:bg-[#c91749] transition-colors flex items-center justify-center space-x-2 text-sm"
        >
          <span>Open in Slack</span>
          <ExternalLink className="w-4 h-4" />
        </a>
      </div>
    );
  }

  // Default variant - standard button
  return (
    <a
      href={channelUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center space-x-2 px-4 py-2 bg-white border border-gray-300 rounded-lg hover:border-[#E01E5A] hover:bg-gray-50 transition-all group"
      aria-label={`Open Slack channel ${channelName}`}
    >
      <MessageSquare className="w-4 h-4 text-[#E01E5A]" />
      <span className="text-sm text-gray-900">#{channelName}</span>
      {showMemberCount && memberCount !== undefined && (
        <Badge variant="secondary" className="text-xs">
          {memberCount}
        </Badge>
      )}
      <ExternalLink className="w-4 h-4 text-gray-400 group-hover:text-[#E01E5A]" />
    </a>
  );
}

/**
 * =============================================================================
 * USAGE EXAMPLES
 * =============================================================================
 * 
 * 1. Partner Project Card:
 * ```tsx
 * <SlackChannelLink
 *   channelUrl={project.slackChannelLink}
 *   channelName={`project-${project.id}`}
 *   channelId={project.slackChannelId}
 *   memberCount={project.teamSize}
 *   variant="compact"
 * />
 * ```
 * 
 * 2. TrailBuild Team Workspace:
 * ```tsx
 * <SlackChannelLink
 *   channelUrl={team.slackChannel}
 *   channelName={`trailbuild-team-${team.name}`}
 *   memberCount={team.members.length}
 *   lastActivity="2 hours ago"
 *   variant="card"
 *   showMemberCount={true}
 *   showLastActivity={true}
 * />
 * ```
 * 
 * 3. Quick Link in Navigation:
 * ```tsx
 * <SlackChannelLink
 *   channelUrl="https://transition-trails.slack.com/archives/C123ABC"
 *   channelName="trail-mastery"
 *   variant="compact"
 *   showMemberCount={false}
 * />
 * ```
 * 
 * =============================================================================
 * SALESFORCE IMPLEMENTATION NOTES
 * =============================================================================
 * 
 * LWC Component: <c-slack-channel-link>
 * 
 * Properties:
 * @api channelUrl (String) - Required
 * @api channelName (String) - Required
 * @api channelId (String) - Optional
 * @api memberCount (Number) - Optional
 * @api variant (String) - Optional, default 'default'
 * 
 * Data Binding Example:
 * ```html
 * <c-slack-channel-link
 *   channel-url={project.Slack_Channel_Link__c}
 *   channel-name={project.Slack_Channel_Id__c}
 *   member-count={project.Team_Size__c}
 *   variant="card">
 * </c-slack-channel-link>
 * ```
 * 
 * =============================================================================
 */
