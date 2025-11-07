/**
 * GAMIFICATION SETTINGS (ADMIN INTERFACE)
 * 
 * =============================================================================
 * SALESFORCE ARCHITECTURE MAPPING
 * =============================================================================
 * 
 * Component: Admin Panel → Settings → Gamification
 * User Roles: Admin, Super Admin
 * Permission Set: Gamification_Admin
 * 
 * =============================================================================
 * SALESFORCE OBJECTS & FIELDS
 * =============================================================================
 * 
 * Primary Object: Gamification_Config__c
 * Fields:
 * - Activity_Name__c (Text 120) - Display name
 * - Activity_Type__c (Picklist) - Learning, Project, Community, Event, Commerce
 * - Points_Value__c (Number 5,0) - Points awarded (0-500)
 * - Active__c (Checkbox) - Whether active
 * - Description__c (Text Area) - Admin notes
 * - External_ID__c (Text 255, External ID) - Unique identifier
 * - Min_Points__c (Number 5,0) - Minimum allowed (default: 0)
 * - Max_Points__c (Number 5,0) - Maximum allowed (default: 500)
 * - Icon_Name__c (Text 80) - Lucide icon name
 * - Sort_Order__c (Number 5,0) - Display order
 * 
 * =============================================================================
 * APEX CONTROLLER
 * =============================================================================
 * 
 * GamificationSettingsController.cls:
 * - getConfigurations() → Returns all Gamification_Config__c records
 * - updateConfigurations(List<ConfigWrapper>) → Bulk update point values
 * - validatePointValue(Decimal points, Id configId) → Validation logic
 * 
 * =============================================================================
 */

import { useState, useEffect } from 'react';
import { Save, X, AlertCircle, CheckCircle, Edit2, Info, Sliders } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Slider } from './ui/slider';
import { Switch } from './ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Card } from './ui/card';
import { toast } from 'sonner';
import { CMS } from './CMSContent';

interface GamificationConfig {
  id: string;
  externalId: string;
  activityName: string;
  activityType: 'Learning' | 'Project' | 'Community' | 'Event' | 'Commerce';
  pointsValue: number;
  active: boolean;
  description: string;
  minPoints: number;
  maxPoints: number;
  iconName: string;
  sortOrder: number;
  modified: boolean; // Track if user changed value
}

interface GamificationSettingsProps {
  userRole: 'admin' | 'super-admin';
  onClose?: () => void;
}

export function GamificationSettings({ userRole, onClose }: GamificationSettingsProps) {
  const [configs, setConfigs] = useState<GamificationConfig[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [hasChanges, setHasChanges] = useState(false);
  const [activeTab, setActiveTab] = useState<string>('learning');

  // Mock data - In production, this comes from Apex
  useEffect(() => {
    loadConfigurations();
  }, []);

  const loadConfigurations = () => {
    setLoading(true);
    
    // Mock Salesforce data
    const mockConfigs: GamificationConfig[] = [
      // LEARNING ACTIVITIES
      {
        id: '1',
        externalId: 'learning_module_complete',
        activityName: 'Course Module Completion',
        activityType: 'Learning',
        pointsValue: 20,
        active: true,
        description: 'Complete any course module from the learning catalog',
        minPoints: 0,
        maxPoints: 500,
        iconName: 'BookOpen',
        sortOrder: 1,
        modified: false
      },
      {
        id: '2',
        externalId: 'guided_trail_complete',
        activityName: 'Guided Trail Completion',
        activityType: 'Learning',
        pointsValue: 100,
        active: true,
        description: 'Complete the full 12-week Guided Trail program',
        minPoints: 0,
        maxPoints: 500,
        iconName: 'Award',
        sortOrder: 2,
        modified: false
      },
      {
        id: '3',
        externalId: 'mastery_trail_complete',
        activityName: 'Trail of Mastery Completion',
        activityType: 'Learning',
        pointsValue: 250,
        active: true,
        description: 'Complete advanced Trail of Mastery certification path',
        minPoints: 0,
        maxPoints: 500,
        iconName: 'Trophy',
        sortOrder: 3,
        modified: false
      },
      {
        id: '4',
        externalId: 'expert_certification',
        activityName: 'Expert Level Certification',
        activityType: 'Learning',
        pointsValue: 500,
        active: true,
        description: 'Achieve Expert level certification (Admin or Developer)',
        minPoints: 0,
        maxPoints: 500,
        iconName: 'Star',
        sortOrder: 4,
        modified: false
      },
      {
        id: '5',
        externalId: 'skills_assessment_pass',
        activityName: 'Skills Assessment Passed',
        activityType: 'Learning',
        pointsValue: 30,
        active: true,
        description: 'Pass bi-weekly skills assessment (80%+ score)',
        minPoints: 0,
        maxPoints: 500,
        iconName: 'CheckCircle',
        sortOrder: 5,
        modified: false
      },
      
      // PROJECT ACTIVITIES
      {
        id: '6',
        externalId: 'capstone_phase_complete',
        activityName: 'Capstone Phase Completion',
        activityType: 'Project',
        pointsValue: 50,
        active: true,
        description: 'Complete any phase of the Capstone project',
        minPoints: 0,
        maxPoints: 500,
        iconName: 'Target',
        sortOrder: 1,
        modified: false
      },
      {
        id: '7',
        externalId: 'capstone_full_complete',
        activityName: 'Capstone Full Completion',
        activityType: 'Project',
        pointsValue: 200,
        active: true,
        description: 'Complete entire Capstone project with coach approval',
        minPoints: 0,
        maxPoints: 500,
        iconName: 'Briefcase',
        sortOrder: 2,
        modified: false
      },
      {
        id: '8',
        externalId: 'partner_project_join',
        activityName: 'Partner Project Join',
        activityType: 'Project',
        pointsValue: 25,
        active: true,
        description: 'Join a partner project team',
        minPoints: 0,
        maxPoints: 500,
        iconName: 'Users',
        sortOrder: 3,
        modified: false
      },
      {
        id: '9',
        externalId: 'partner_project_milestone',
        activityName: 'Partner Project Milestone',
        activityType: 'Project',
        pointsValue: 40,
        active: true,
        description: 'Complete a milestone in partner project',
        minPoints: 0,
        maxPoints: 500,
        iconName: 'Milestone',
        sortOrder: 4,
        modified: false
      },
      {
        id: '10',
        externalId: 'partner_project_complete',
        activityName: 'Partner Project Completion',
        activityType: 'Project',
        pointsValue: 150,
        active: true,
        description: 'Complete full partner project with deliverables',
        minPoints: 0,
        maxPoints: 500,
        iconName: 'Award',
        sortOrder: 5,
        modified: false
      },
      
      // COMMUNITY ACTIVITIES
      {
        id: '11',
        externalId: 'community_first_post',
        activityName: 'First Community Post',
        activityType: 'Community',
        pointsValue: 10,
        active: true,
        description: 'Make your first post in the community',
        minPoints: 0,
        maxPoints: 500,
        iconName: 'MessageSquare',
        sortOrder: 1,
        modified: false
      },
      {
        id: '12',
        externalId: 'community_post',
        activityName: 'Community Post',
        activityType: 'Community',
        pointsValue: 5,
        active: true,
        description: 'Share a post in the community (repeatable)',
        minPoints: 0,
        maxPoints: 500,
        iconName: 'MessageCircle',
        sortOrder: 2,
        modified: false
      },
      {
        id: '13',
        externalId: 'community_reply',
        activityName: 'Community Reply',
        activityType: 'Community',
        pointsValue: 3,
        active: true,
        description: 'Reply to a community post (repeatable)',
        minPoints: 0,
        maxPoints: 500,
        iconName: 'Reply',
        sortOrder: 3,
        modified: false
      },
      {
        id: '14',
        externalId: 'community_champion',
        activityName: 'Community Champion Status',
        activityType: 'Community',
        pointsValue: 75,
        active: true,
        description: 'Achieve Community Champion level (100+ posts/replies)',
        minPoints: 0,
        maxPoints: 500,
        iconName: 'Crown',
        sortOrder: 4,
        modified: false
      },
      {
        id: '15',
        externalId: 'peer_mentoring',
        activityName: 'Peer Mentoring Session',
        activityType: 'Community',
        pointsValue: 20,
        active: true,
        description: 'Complete a peer mentoring session',
        minPoints: 0,
        maxPoints: 500,
        iconName: 'Users',
        sortOrder: 5,
        modified: false
      },
      
      // EVENT ACTIVITIES
      {
        id: '16',
        externalId: 'slack_event_attend',
        activityName: 'Slack Event Attendance',
        activityType: 'Event',
        pointsValue: 15,
        active: true,
        description: 'Attend a Slack community event (standup, campfire, etc.)',
        minPoints: 0,
        maxPoints: 500,
        iconName: 'Calendar',
        sortOrder: 1,
        modified: false
      },
      {
        id: '17',
        externalId: 'trailbuild_register',
        activityName: 'TrailBuild Registration',
        activityType: 'Event',
        pointsValue: 10,
        active: true,
        description: 'Register for TrailBuild Summit',
        minPoints: 0,
        maxPoints: 500,
        iconName: 'UserPlus',
        sortOrder: 2,
        modified: false
      },
      {
        id: '18',
        externalId: 'trailbuild_participate',
        activityName: 'TrailBuild Participation',
        activityType: 'Event',
        pointsValue: 100,
        active: true,
        description: 'Participate in TrailBuild Summit (48-hour code-a-thon)',
        minPoints: 0,
        maxPoints: 500,
        iconName: 'Zap',
        sortOrder: 3,
        modified: false
      },
      {
        id: '19',
        externalId: 'trailbuild_winner_1',
        activityName: 'TrailBuild Winner (1st Place)',
        activityType: 'Event',
        pointsValue: 300,
        active: true,
        description: 'Win 1st place in TrailBuild Summit',
        minPoints: 0,
        maxPoints: 500,
        iconName: 'Medal',
        sortOrder: 4,
        modified: false
      },
      {
        id: '20',
        externalId: 'trailbuild_winner_2',
        activityName: 'TrailBuild Winner (2nd Place)',
        activityType: 'Event',
        pointsValue: 200,
        active: true,
        description: 'Win 2nd place in TrailBuild Summit',
        minPoints: 0,
        maxPoints: 500,
        iconName: 'Award',
        sortOrder: 5,
        modified: false
      },
      
      // COMMERCE ACTIVITIES
      {
        id: '21',
        externalId: 'linkedin_share',
        activityName: 'LinkedIn Share',
        activityType: 'Commerce',
        pointsValue: 5,
        active: true,
        description: 'Share your achievement on LinkedIn',
        minPoints: 0,
        maxPoints: 500,
        iconName: 'Share2',
        sortOrder: 1,
        modified: false
      },
      {
        id: '22',
        externalId: 'linkedin_endorsement',
        activityName: 'LinkedIn Endorsement',
        activityType: 'Commerce',
        pointsValue: 10,
        active: true,
        description: 'Receive an endorsement for Salesforce skills',
        minPoints: 0,
        maxPoints: 500,
        iconName: 'ThumbsUp',
        sortOrder: 2,
        modified: false
      },
      {
        id: '23',
        externalId: 'referral_join',
        activityName: 'Referral Join',
        activityType: 'Commerce',
        pointsValue: 50,
        active: true,
        description: 'Refer a friend who joins the program',
        minPoints: 0,
        maxPoints: 500,
        iconName: 'UserPlus',
        sortOrder: 3,
        modified: false
      },
      {
        id: '24',
        externalId: 'merch_first_purchase',
        activityName: 'First Merch Purchase',
        activityType: 'Commerce',
        pointsValue: 15,
        active: true,
        description: 'Make your first Trail Shop purchase',
        minPoints: 0,
        maxPoints: 500,
        iconName: 'ShoppingBag',
        sortOrder: 4,
        modified: false
      },
      {
        id: '25',
        externalId: 'merch_review',
        activityName: 'Merch Review Posted',
        activityType: 'Commerce',
        pointsValue: 5,
        active: true,
        description: 'Post a review of Trail Shop product',
        minPoints: 0,
        maxPoints: 500,
        iconName: 'Star',
        sortOrder: 5,
        modified: false
      },
    ];

    // Simulate API delay
    setTimeout(() => {
      setConfigs(mockConfigs);
      setLoading(false);
    }, 500);
  };

  const handlePointsChange = (id: string, newValue: number) => {
    setConfigs(configs.map(config => 
      config.id === id 
        ? { ...config, pointsValue: newValue, modified: true }
        : config
    ));
    setHasChanges(true);
  };

  const handleActiveToggle = (id: string) => {
    setConfigs(configs.map(config =>
      config.id === id
        ? { ...config, active: !config.active, modified: true }
        : config
    ));
    setHasChanges(true);
  };

  const handleSave = async () => {
    setSaving(true);
    
    // Simulate Salesforce API call
    setTimeout(() => {
      toast.success('Gamification settings updated successfully', {
        description: `${configs.filter(c => c.modified).length} activities updated`,
        duration: 4000,
      });
      
      // Reset modified flags
      setConfigs(configs.map(c => ({ ...c, modified: false })));
      setHasChanges(false);
      setSaving(false);
    }, 1000);
  };

  const handleCancel = () => {
    loadConfigurations();
    setHasChanges(false);
  };

  const filterConfigsByType = (type: string) => {
    return configs.filter(c => c.activityType.toLowerCase() === type)
                 .sort((a, b) => a.sortOrder - b.sortOrder);
  };

  const ActivityTable = ({ activities }: { activities: GamificationConfig[] }) => (
    <div className="space-y-4">
      {activities.map(activity => (
        <Card key={activity.id} className={`p-4 ${activity.modified ? 'border-amber-400 border-2' : ''}`}>
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <h4 className="text-gray-900">{activity.activityName}</h4>
                {activity.modified && (
                  <span className="px-2 py-0.5 bg-amber-100 text-amber-700 rounded text-xs">
                    Modified
                  </span>
                )}
              </div>
              <p className="text-sm text-gray-600 mb-3">{activity.description}</p>
              
              <div className="flex items-center gap-6">
                {/* Points Slider */}
                <div className="flex-1 max-w-md">
                  <div className="flex items-center justify-between mb-2">
                    <Label className="text-sm text-gray-700">Points Value</Label>
                    <span className="text-lg text-evergreen">{activity.pointsValue} pts</span>
                  </div>
                  <Slider
                    value={[activity.pointsValue]}
                    onValueChange={(value) => handlePointsChange(activity.id, value[0])}
                    min={activity.minPoints}
                    max={activity.maxPoints}
                    step={5}
                    className="cursor-pointer"
                  />
                  <div className="flex justify-between text-xs text-gray-500 mt-1">
                    <span>{activity.minPoints}</span>
                    <span>{activity.maxPoints}</span>
                  </div>
                </div>
                
                {/* Number Input */}
                <div className="w-24">
                  <Label className="text-sm text-gray-700 mb-2 block">Exact</Label>
                  <Input
                    type="number"
                    value={activity.pointsValue}
                    onChange={(e) => {
                      const val = parseInt(e.target.value) || 0;
                      if (val >= activity.minPoints && val <= activity.maxPoints) {
                        handlePointsChange(activity.id, val);
                      }
                    }}
                    min={activity.minPoints}
                    max={activity.maxPoints}
                    className="text-center"
                  />
                </div>
                
                {/* Active Toggle */}
                <div className="flex flex-col items-center gap-2">
                  <Label className="text-sm text-gray-700">Active</Label>
                  <Switch
                    checked={activity.active}
                    onCheckedChange={() => handleActiveToggle(activity.id)}
                  />
                </div>
              </div>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-center">
          <Sliders className="w-12 h-12 text-gray-400 mx-auto mb-4 animate-pulse" />
          <p className="text-gray-600">Loading gamification settings...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto">
      {/* Header */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-gray-900 mb-2">Gamification Settings</h1>
            <p className="text-gray-600">
              Configure point values for all learning activities. Changes apply immediately to future activities.
            </p>
          </div>
          {onClose && (
            <Button variant="ghost" size="sm" onClick={onClose}>
              <X className="w-5 h-5" />
            </Button>
          )}
        </div>
        
        {/* Info Banner */}
        <div className="mt-4 p-4 bg-sky-blue/10 rounded-lg flex items-start gap-3">
          <Info className="w-5 h-5 text-sky-blue flex-shrink-0 mt-0.5" />
          <div className="text-sm text-gray-700">
            <p className="mb-1">
              <strong>Admin Controls:</strong> Adjust point values to balance engagement and achievement difficulty.
            </p>
            <p>
              Changes are saved immediately and affect future point awards. Historical points are not recalculated.
            </p>
          </div>
        </div>
      </div>

      {/* Activity Configuration Tabs */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="w-full justify-start rounded-none border-b border-gray-200 bg-transparent px-6 pt-4">
            <TabsTrigger value="learning" className="data-[state=active]:border-b-2 data-[state=active]:border-evergreen">
              Learning
              <span className="ml-2 px-2 py-0.5 bg-gray-100 text-gray-600 rounded text-xs">
                {filterConfigsByType('learning').length}
              </span>
            </TabsTrigger>
            <TabsTrigger value="project" className="data-[state=active]:border-b-2 data-[state=active]:border-evergreen">
              Projects
              <span className="ml-2 px-2 py-0.5 bg-gray-100 text-gray-600 rounded text-xs">
                {filterConfigsByType('project').length}
              </span>
            </TabsTrigger>
            <TabsTrigger value="community" className="data-[state=active]:border-b-2 data-[state=active]:border-evergreen">
              Community
              <span className="ml-2 px-2 py-0.5 bg-gray-100 text-gray-600 rounded text-xs">
                {filterConfigsByType('community').length}
              </span>
            </TabsTrigger>
            <TabsTrigger value="event" className="data-[state=active]:border-b-2 data-[state=active]:border-evergreen">
              Events
              <span className="ml-2 px-2 py-0.5 bg-gray-100 text-gray-600 rounded text-xs">
                {filterConfigsByType('event').length}
              </span>
            </TabsTrigger>
            <TabsTrigger value="commerce" className="data-[state=active]:border-b-2 data-[state=active]:border-evergreen">
              Commerce
              <span className="ml-2 px-2 py-0.5 bg-gray-100 text-gray-600 rounded text-xs">
                {filterConfigsByType('commerce').length}
              </span>
            </TabsTrigger>
          </TabsList>

          <div className="p-6">
            <TabsContent value="learning" className="mt-0">
              <ActivityTable activities={filterConfigsByType('learning')} />
            </TabsContent>

            <TabsContent value="project" className="mt-0">
              <ActivityTable activities={filterConfigsByType('project')} />
            </TabsContent>

            <TabsContent value="community" className="mt-0">
              <ActivityTable activities={filterConfigsByType('community')} />
            </TabsContent>

            <TabsContent value="event" className="mt-0">
              <ActivityTable activities={filterConfigsByType('event')} />
            </TabsContent>

            <TabsContent value="commerce" className="mt-0">
              <ActivityTable activities={filterConfigsByType('commerce')} />
            </TabsContent>
          </div>
        </Tabs>
      </div>

      {/* Footer Actions */}
      {hasChanges && (
        <div className="sticky bottom-0 mt-6 p-4 bg-white rounded-xl shadow-lg border border-gray-200 flex items-center justify-between">
          <div className="flex items-center gap-2 text-sm text-gray-700">
            <AlertCircle className="w-5 h-5 text-amber-500" />
            <span>
              You have <strong>{configs.filter(c => c.modified).length}</strong> unsaved changes
            </span>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="outline" onClick={handleCancel} disabled={saving}>
              <X className="w-4 h-4 mr-2" />
              Cancel
            </Button>
            <Button 
              onClick={handleSave} 
              disabled={saving}
              className="bg-sun-amber hover:bg-sun-amber/90 text-white"
            >
              {saving ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                  Saving...
                </>
              ) : (
                <>
                  <Save className="w-4 h-4 mr-2" />
                  Save & Apply
                </>
              )}
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
