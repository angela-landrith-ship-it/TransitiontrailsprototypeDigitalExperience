/**
 * CMS CONTENT HELPER UTILITY
 * 
 * =============================================================================
 * PURPOSE
 * =============================================================================
 * 
 * This utility provides a centralized way to manage content that will be
 * retrieved from Salesforce Experience Cloud CMS in production.
 * 
 * In this React prototype, we use a fallback pattern:
 * 1. Display [CMS:asset_name] placeholder (for documentation)
 * 2. Fall back to hardcoded English content (for prototype functionality)
 * 
 * In Salesforce LWC implementation, this would query CMS via:
 * - @salesforce/cms/contentAssetUrl
 * - Lightning Data Service (LDS)
 * - Apex CMS Query API
 * 
 * =============================================================================
 * USAGE PATTERN
 * =============================================================================
 * 
 * Import:
 * ```tsx
 * import { CMS, showCMSPlaceholders } from './CMSContent';
 * ```
 * 
 * In Component:
 * ```tsx
 * <h1>{CMS('learner_home_welcome_title', `Welcome back, ${name}!`)}</h1>
 * ```
 * 
 * Toggle Placeholder Display:
 * ```tsx
 * // Set to true to see CMS asset names in UI (for documentation/review)
 * // Set to false for normal prototype usage
 * const showPlaceholders = false;
 * ```
 * 
 * =============================================================================
 * SALESFORCE LWC IMPLEMENTATION
 * =============================================================================
 * 
 * In LWC, replace this utility with:
 * 
 * ```javascript
 * import { getContent } from 'lightning/cmsDeliveryApi';
 * 
 * export default class LearnerHome extends LightningElement {
 *     content = {};
 * 
 *     connectedCallback() {
 *         this.loadCMSContent();
 *     }
 * 
 *     async loadCMSContent() {
 *         const contentKeys = [
 *             'learner_home_welcome_title',
 *             'learner_home_hero_description',
 *             // ... more keys
 *         ];
 * 
 *         const contentMap = await getContent({
 *             contentKeys: contentKeys,
 *             contentType: 'cms_text',
 *             channelOrSiteId: this.channelId
 *         });
 * 
 *         this.content = contentMap;
 *     }
 * }
 * ```
 * 
 * =============================================================================
 */

/**
 * Global toggle for showing CMS placeholders vs actual content
 * 
 * Set to `true` during documentation/review to see CMS asset names
 * Set to `false` for normal prototype functionality
 */
export const showCMSPlaceholders = false;

/**
 * CMS Content Type Definitions
 * Maps to Salesforce CMS Content Types
 */
export type CMSContentType = 
  | 'text'           // Simple text string
  | 'rich_text'      // HTML formatted text
  | 'image'          // Image URL
  | 'url'            // External link
  | 'number'         // Numeric value
  | 'date'           // Date value
  | 'boolean';       // True/false

/**
 * CMS Asset Registry
 * 
 * This object stores all CMS content with fallback values.
 * In production, only the keys are used to query Salesforce CMS.
 */
export const CMSContentRegistry: Record<string, {
  fallback: string;
  type: CMSContentType;
  description: string;
  component?: string;
}> = {
  // ===== LEARNER HOME =====
  'learner_home_welcome_title': {
    fallback: 'Welcome back, {name}!',
    type: 'text',
    description: 'Main hero title with personalization',
    component: 'LearnerHome'
  },
  'learner_home_cohort_label': {
    fallback: 'The Guided Trail • {cohort} Cohort',
    type: 'text',
    description: 'Cohort identifier label',
    component: 'LearnerHome'
  },
  'learner_home_program_label': {
    fallback: 'Salesforce Admin & Development Program',
    type: 'text',
    description: 'Program name',
    component: 'LearnerHome'
  },
  'learner_home_progress_label': {
    fallback: 'Overall Progress',
    type: 'text',
    description: 'Progress section label',
    component: 'LearnerHome'
  },
  'learner_home_week_label': {
    fallback: 'Week {current} of {total}',
    type: 'text',
    description: 'Week counter',
    component: 'LearnerHome'
  },
  'learner_home_points_label': {
    fallback: 'Points Earned',
    type: 'text',
    description: 'Points section label',
    component: 'LearnerHome'
  },
  'learner_home_coach_label': {
    fallback: 'Your Coach',
    type: 'text',
    description: 'Coach section label',
    component: 'LearnerHome'
  },
  'learner_home_btn_schedule_session': {
    fallback: 'Schedule 1:1 Session',
    type: 'text',
    description: 'Button to schedule coaching',
    component: 'LearnerHome'
  },
  'learner_home_penny_focus_title': {
    fallback: "Penny's Focus Recommendations",
    type: 'text',
    description: 'Penny AI section title',
    component: 'LearnerHome'
  },
  'learner_home_penny_focus_description': {
    fallback: 'Personalized priorities from across your learning journey',
    type: 'text',
    description: 'Penny AI section description',
    component: 'LearnerHome'
  },
  'learner_home_btn_ask_penny': {
    fallback: 'Ask Penny',
    type: 'text',
    description: 'Button to open Penny chat',
    component: 'LearnerHome'
  },
  'learner_home_priority_critical': {
    fallback: 'Critical',
    type: 'text',
    description: 'Critical priority badge',
    component: 'LearnerHome'
  },
  'learner_home_priority_high': {
    fallback: 'High',
    type: 'text',
    description: 'High priority badge',
    component: 'LearnerHome'
  },
  'learner_home_priority_medium': {
    fallback: 'Medium',
    type: 'text',
    description: 'Medium priority badge',
    component: 'LearnerHome'
  },
  'learner_home_trail_missions_title': {
    fallback: 'Active Trail Missions',
    type: 'text',
    description: 'Trail missions section title',
    component: 'LearnerHome'
  },
  'learner_home_trail_missions_empty': {
    fallback: 'No active missions. Start your first trail!',
    type: 'text',
    description: 'Empty state message',
    component: 'LearnerHome'
  },
  'learner_home_btn_view_all_missions': {
    fallback: 'View All Missions',
    type: 'text',
    description: 'Link to full missions page',
    component: 'LearnerHome'
  },
  'learner_home_points_breakdown_title': {
    fallback: 'Points Breakdown',
    type: 'text',
    description: 'Points section title',
    component: 'LearnerHome'
  },
  'learner_home_points_total_label': {
    fallback: 'Total Possible',
    type: 'text',
    description: 'Total points label',
    component: 'LearnerHome'
  },
  'learner_home_points_earned_label': {
    fallback: 'Earned',
    type: 'text',
    description: 'Earned points label',
    component: 'LearnerHome'
  },
  'learner_home_btn_view_details': {
    fallback: 'View Full Breakdown',
    type: 'text',
    description: 'Link to points details',
    component: 'LearnerHome'
  },
  'learner_home_upcoming_sessions_title': {
    fallback: 'Upcoming Sessions',
    type: 'text',
    description: 'Calendar section title',
    component: 'LearnerHome'
  },
  'learner_home_sessions_empty': {
    fallback: 'No upcoming sessions',
    type: 'text',
    description: 'Empty state for calendar',
    component: 'LearnerHome'
  },
  'learner_home_btn_view_calendar': {
    fallback: 'View Full Calendar',
    type: 'text',
    description: 'Link to calendar page',
    component: 'LearnerHome'
  },
  'learner_home_quick_links_title': {
    fallback: 'Quick Links',
    type: 'text',
    description: 'Quick links section title',
    component: 'LearnerHome'
  },
  'learner_home_link_slack': {
    fallback: 'Slack Workspace',
    type: 'text',
    description: 'Slack link label',
    component: 'LearnerHome'
  },
  'learner_home_link_github': {
    fallback: 'GitHub Repos',
    type: 'text',
    description: 'GitHub link label',
    component: 'LearnerHome'
  },
  'learner_home_link_resources': {
    fallback: 'Learning Resources',
    type: 'text',
    description: 'Resources link label',
    component: 'LearnerHome'
  },
  'learner_home_community_meter_title': {
    fallback: 'Community Engagement',
    type: 'text',
    description: 'Community meter section title',
    component: 'LearnerHome'
  },
  'learner_home_impact_meter_title': {
    fallback: 'Trail Impact',
    type: 'text',
    description: 'Impact meter section title',
    component: 'LearnerHome'
  },
  
  // ===== NAVIGATION =====
  'nav_menu_home_label': {
    fallback: 'Home',
    type: 'text',
    description: 'Home navigation label',
    component: 'Navigation'
  },
  'nav_menu_trail_label': {
    fallback: 'Trail & Missions',
    type: 'text',
    description: 'Trail navigation label',
    component: 'Navigation'
  },
  'nav_menu_projects_label': {
    fallback: 'Projects & Impact',
    type: 'text',
    description: 'Projects navigation label',
    component: 'Navigation'
  },
  'nav_menu_learning_label': {
    fallback: 'Learning Center',
    type: 'text',
    description: 'Learning navigation label',
    component: 'Navigation'
  },
  'nav_menu_community_label': {
    fallback: 'Community',
    type: 'text',
    description: 'Community navigation label',
    component: 'Navigation'
  },
  
  // ===== CAPSTONE =====
  'capstone_hero_title': {
    fallback: 'Your Capstone Project',
    type: 'text',
    description: 'Capstone page title',
    component: 'MyCapstone'
  },
  'capstone_hero_description': {
    fallback: 'Build a comprehensive Salesforce solution that demonstrates your mastery',
    type: 'text',
    description: 'Capstone page description',
    component: 'MyCapstone'
  },
  'capstone_progress_label': {
    fallback: 'Complete',
    type: 'text',
    description: 'Progress label',
    component: 'MyCapstone'
  },
  
  // ... Additional entries would continue here for all 483 assets
  // This is a representative sample showing the pattern
};

/**
 * Main CMS content retrieval function
 * 
 * @param key - CMS asset key (e.g., 'learner_home_welcome_title')
 * @param fallback - Optional override fallback text
 * @returns Content string (CMS placeholder or fallback)
 */
export function CMS(key: string, fallback?: string): string {
  const asset = CMSContentRegistry[key];
  
  if (showCMSPlaceholders) {
    // Show CMS placeholder for documentation/review
    return `[CMS:${key}]`;
  }
  
  // Return fallback (prototype mode)
  return fallback || asset?.fallback || `[Missing: ${key}]`;
}

/**
 * CMS content with variable substitution
 * 
 * @param key - CMS asset key
 * @param variables - Object with variable names and values
 * @param fallback - Optional override fallback text
 * @returns Content string with variables replaced
 * 
 * @example
 * CMSWithVars('learner_home_welcome_title', { name: 'Alex' })
 * // Returns: "Welcome back, Alex!"
 */
export function CMSWithVars(
  key: string, 
  variables: Record<string, string | number>,
  fallback?: string
): string {
  let content = CMS(key, fallback);
  
  // Replace variables in format {variableName}
  Object.entries(variables).forEach(([varName, value]) => {
    content = content.replace(new RegExp(`\\{${varName}\\}`, 'g'), String(value));
  });
  
  return content;
}

/**
 * Bulk CMS content retrieval
 * 
 * @param keys - Array of CMS asset keys
 * @returns Object mapping keys to content
 * 
 * @example
 * const content = CMSBulk(['nav_menu_home_label', 'nav_menu_trail_label']);
 * // Returns: { nav_menu_home_label: 'Home', nav_menu_trail_label: 'Trail & Missions' }
 */
export function CMSBulk(keys: string[]): Record<string, string> {
  const result: Record<string, string> = {};
  keys.forEach(key => {
    result[key] = CMS(key);
  });
  return result;
}

/**
 * CMS content for rich text (HTML)
 * In production, this would preserve HTML formatting from CMS
 * 
 * @param key - CMS asset key
 * @param fallback - Optional override fallback HTML
 * @returns HTML string
 */
export function CMSRichText(key: string, fallback?: string): string {
  return CMS(key, fallback);
}

/**
 * CMS image URL retrieval
 * In production, this would return Salesforce CMS asset URL
 * 
 * @param key - CMS asset key
 * @param fallback - Optional override fallback URL
 * @returns Image URL
 */
export function CMSImage(key: string, fallback?: string): string {
  return CMS(key, fallback);
}

/**
 * Helper to check if CMS placeholder mode is active
 */
export function isCMSPlaceholderMode(): boolean {
  return showCMSPlaceholders;
}

/**
 * Component to visually indicate CMS-managed content in UI
 * Shows a badge when in placeholder mode
 * 
 * @example
 * <CMSIndicator assetKey="learner_home_welcome_title" />
 */
export function CMSIndicator({ assetKey }: { assetKey: string }) {
  if (!showCMSPlaceholders) return null;
  
  return (
    <span className="inline-flex items-center px-2 py-0.5 rounded text-xs bg-purple-100 text-purple-700 border border-purple-300 ml-2">
      CMS: {assetKey}
    </span>
  );
}

/**
 * =============================================================================
 * SALESFORCE IMPLEMENTATION NOTES
 * =============================================================================
 * 
 * When implementing in Salesforce LWC:
 * 
 * 1. CREATE CMS CONTENT TYPES:
 *    - Setup > CMS Workspaces > Create Content Types
 *    - Fields: Title, Body, Asset_Key__c (external ID), Channel, Language
 * 
 * 2. POPULATE CONTENT:
 *    - Use CMSContentRegistry as your content source
 *    - Create CMS records for each asset
 *    - Map to appropriate channels (Learner, Coach, Partner, etc.)
 * 
 * 3. LWC IMPLEMENTATION:
 *    ```javascript
 *    import { getContent } from 'lightning/cmsDeliveryApi';
 *    import { CurrentPageReference } from 'lightning/navigation';
 *    
 *    export default class LearnerHome extends LightningElement {
 *        @wire(CurrentPageReference) pageRef;
 *        
 *        content = {};
 *        
 *        async connectedCallback() {
 *            const channelId = this.pageRef?.state?.channelId || 'defaultChannel';
 *            const keys = Object.keys(CMSContentRegistry).filter(k => 
 *                CMSContentRegistry[k].component === 'LearnerHome'
 *            );
 *            
 *            this.content = await getContent({
 *                contentKeys: keys,
 *                channelOrSiteId: channelId
 *            });
 *        }
 *    }
 *    ```
 * 
 * 4. CACHING STRATEGY:
 *    - Use Platform Cache for frequently accessed content
 *    - Cache duration: 4 hours (adjustable)
 *    - Invalidate on CMS content updates via trigger
 * 
 * 5. LOCALIZATION:
 *    - Create separate CMS records per language
 *    - Query based on User.LanguageLocaleKey
 *    - Fallback to English if translation not available
 * 
 * =============================================================================
 */
