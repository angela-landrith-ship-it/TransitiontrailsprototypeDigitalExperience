/**
 * ADMIN GAMIFICATION & REWARDS SETTINGS DASHBOARD
 * 
 * =============================================================================
 * SALESFORCE ARCHITECTURE MAPPING
 * =============================================================================
 * 
 * Location: Admin Console → Engagement Configuration
 * User Roles: Admin, Super Admin only
 * Permission Set: Gamification_Admin
 * 
 * =============================================================================
 * SALESFORCE OBJECTS
 * =============================================================================
 * 
 * 1. Gamification_Config__c - Point values for all activities
 * 2. Mission_Config__c - Daily mission parameters
 * 3. Badge_Definition__c - Level thresholds and badges
 * 4. Penny_Config__c - AI automation settings
 * 
 * =============================================================================
 * FLOWS & AUTOMATION
 * =============================================================================
 * 
 * UpdateGamificationConfig (Flow):
 * - Triggered on "Save & Apply"
 * - Updates all 4 config objects
 * - Fires Platform Event for real-time refresh
 * 
 * =============================================================================
 */

import { useState, useEffect } from 'react';
import { 
  Save, 
  X, 
  AlertCircle, 
  CheckCircle, 
  Info, 
  Sliders,
  RotateCcw,
  Eye,
  Settings,
  Sparkles,
  Shield,
  Target,
  Clock,
  Bell,
  MessageSquare,
  Zap
} from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Slider } from './ui/slider';
import { Switch } from './ui/switch';
import { Card } from './ui/card';
import { toast } from 'sonner';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from './ui/table';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from './ui/tooltip';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Separator } from './ui/separator';

// ============================================================================
// INTERFACES
// ============================================================================

interface PointConfig {
  id: string;
  label: string;
  value: number;
  defaultValue: number;
  min: number;
  max: number;
  description: string;
  fieldName: string; // Salesforce field API name
}

interface MissionConfig {
  pointsPerMission: number;
  snoozeIntervalHours: number;
  maxMissionsPerDay: number;
  allowRemindLater: boolean;
  enablePreview: boolean;
}

interface LevelThreshold {
  id: string;
  level: string;
  rangeStart: number;
  rangeEnd: number | null; // null = infinity
  badgeIcon: string;
  description: string;
  editable: boolean;
}

interface PennyConfig {
  enableEncouragement: boolean;
  enableWeeklySummary: boolean;
  enableSlackAnnouncements: boolean;
  tone: 'Mentor' | 'Motivator' | 'Professional';
}

interface AdminGamificationDashboardProps {
  userRole: 'admin' | 'super-admin';
  onClose?: () => void;
}

// ============================================================================
// DEFAULT VALUES
// ============================================================================

const DEFAULT_POINT_CONFIGS: PointConfig[] = [
  {
    id: '1',
    label: 'Visitor Trail Completion',
    value: 50,
    defaultValue: 50,
    min: 0,
    max: 500,
    description: 'Completing the full Visitor Trail experience',
    fieldName: 'POINTS_VISITOR_TRAIL'
  },
  {
    id: '2',
    label: 'Guided Trail Completion',
    value: 100,
    defaultValue: 100,
    min: 0,
    max: 500,
    description: '12-week Guided Trail with coach feedback',
    fieldName: 'POINTS_GUIDED_TRAIL'
  },
  {
    id: '3',
    label: 'Trail of Mastery Completion',
    value: 250,
    defaultValue: 250,
    min: 0,
    max: 500,
    description: 'Advanced certification track',
    fieldName: 'POINTS_MASTERY_TRAIL'
  },
  {
    id: '4',
    label: 'Partner Project Completion',
    value: 200,
    defaultValue: 200,
    min: 0,
    max: 500,
    description: 'Completing nonprofit partner project',
    fieldName: 'POINTS_PARTNER_PROJECT'
  },
  {
    id: '5',
    label: 'Daily Mission Completion',
    value: 10,
    defaultValue: 10,
    min: 0,
    max: 500,
    description: 'Completing Penny daily trail mission',
    fieldName: 'POINTS_DAILY_MISSION'
  },
  {
    id: '6',
    label: 'Slack Event Participation',
    value: 5,
    defaultValue: 5,
    min: 0,
    max: 500,
    description: 'Attending community standup or campfire',
    fieldName: 'POINTS_SLACK_EVENT'
  },
  {
    id: '7',
    label: 'Merch Purchase',
    value: 3,
    defaultValue: 3,
    min: 0,
    max: 500,
    description: 'Trail Shop purchase (bonus points)',
    fieldName: 'POINTS_MERCH_PURCHASE'
  },
  {
    id: '8',
    label: 'TrailBuild Event Participation',
    value: 25,
    defaultValue: 25,
    min: 0,
    max: 500,
    description: '48-hour code-a-thon participation',
    fieldName: 'POINTS_TRAILBUILD_EVENT'
  },
];

const DEFAULT_LEVEL_THRESHOLDS: LevelThreshold[] = [
  {
    id: '1',
    level: 'Visitor',
    rangeStart: 0,
    rangeEnd: 99,
    badgeIcon: 'Compass',
    description: 'Starting your journey',
    editable: false
  },
  {
    id: '2',
    level: 'Explorer',
    rangeStart: 100,
    rangeEnd: 299,
    badgeIcon: 'Map',
    description: 'Completed Guided Trail',
    editable: true
  },
  {
    id: '3',
    level: 'Pathfinder',
    rangeStart: 300,
    rangeEnd: 599,
    badgeIcon: 'Mountain',
    description: 'Trail of Mastery',
    editable: true
  },
  {
    id: '4',
    level: 'Expert',
    rangeStart: 600,
    rangeEnd: null,
    badgeIcon: 'Flame',
    description: 'Multiple Skill Masteries',
    editable: true
  },
];

const BADGE_ICON_OPTIONS = [
  'Compass', 'Map', 'MapPin', 'Mountain', 'Flame', 'Crown', 
  'Star', 'Trophy', 'Award', 'Shield', 'Target', 'Zap'
];

// ============================================================================
// MAIN COMPONENT
// ============================================================================

export function AdminGamificationDashboard({ 
  userRole, 
  onClose 
}: AdminGamificationDashboardProps) {
  const [pointConfigs, setPointConfigs] = useState<PointConfig[]>(DEFAULT_POINT_CONFIGS);
  const [missionConfig, setMissionConfig] = useState<MissionConfig>({
    pointsPerMission: 10,
    snoozeIntervalHours: 6,
    maxMissionsPerDay: 1,
    allowRemindLater: true,
    enablePreview: true
  });
  const [levelThresholds, setLevelThresholds] = useState<LevelThreshold[]>(DEFAULT_LEVEL_THRESHOLDS);
  const [pennyConfig, setPennyConfig] = useState<PennyConfig>({
    enableEncouragement: true,
    enableWeeklySummary: true,
    enableSlackAnnouncements: true,
    tone: 'Mentor'
  });

  const [hasChanges, setHasChanges] = useState(false);
  const [saving, setSaving] = useState(false);
  const [activeTab, setActiveTab] = useState('points');
  const [previewMissionState, setPreviewMissionState] = useState<'available' | 'accepted' | 'completed'>('available');

  // ============================================================================
  // HANDLERS - POINT CONFIGURATION
  // ============================================================================

  const handlePointChange = (id: string, newValue: number) => {
    setPointConfigs(configs => 
      configs.map(config => 
        config.id === id ? { ...config, value: newValue } : config
      )
    );
    setHasChanges(true);
  };

  const handleRestoreDefaults = () => {
    setPointConfigs(configs => 
      configs.map(config => ({ ...config, value: config.defaultValue }))
    );
    setHasChanges(true);
    toast.info('Default values restored', {
      description: 'Click "Save & Apply" to persist changes'
    });
  };

  // ============================================================================
  // HANDLERS - MISSION CONFIGURATION
  // ============================================================================

  const handleMissionConfigChange = (field: keyof MissionConfig, value: any) => {
    setMissionConfig(prev => ({ ...prev, [field]: value }));
    setHasChanges(true);
  };

  // ============================================================================
  // HANDLERS - LEVEL THRESHOLDS
  // ============================================================================

  const handleLevelThresholdChange = (
    id: string, 
    field: 'rangeStart' | 'rangeEnd' | 'description' | 'badgeIcon',
    value: any
  ) => {
    setLevelThresholds(thresholds =>
      thresholds.map(threshold =>
        threshold.id === id ? { ...threshold, [field]: value } : threshold
      )
    );
    setHasChanges(true);
  };

  const handleAddNewTier = () => {
    const lastThreshold = levelThresholds[levelThresholds.length - 1];
    const newId = String(levelThresholds.length + 1);
    
    setLevelThresholds([...levelThresholds, {
      id: newId,
      level: `Level ${newId}`,
      rangeStart: (lastThreshold.rangeEnd || 600) + 1,
      rangeEnd: (lastThreshold.rangeEnd || 600) + 300,
      badgeIcon: 'Star',
      description: 'New achievement tier',
      editable: true
    }]);
    setHasChanges(true);
  };

  // ============================================================================
  // HANDLERS - PENNY CONFIGURATION
  // ============================================================================

  const handlePennyConfigChange = (field: keyof PennyConfig, value: any) => {
    setPennyConfig(prev => ({ ...prev, [field]: value }));
    setHasChanges(true);
  };

  // ============================================================================
  // SAVE HANDLER
  // ============================================================================

  const handleSave = async () => {
    setSaving(true);

    // Simulate Salesforce Flow: UpdateGamificationConfig
    setTimeout(() => {
      toast.success('Gamification settings saved successfully', {
        description: 'All configurations have been updated and applied',
        duration: 5000,
      });
      
      setHasChanges(false);
      setSaving(false);
    }, 1500);
  };

  const handleCancel = () => {
    // Reset to initial values (in production, would re-fetch from Salesforce)
    setPointConfigs(DEFAULT_POINT_CONFIGS);
    setMissionConfig({
      pointsPerMission: 10,
      snoozeIntervalHours: 6,
      maxMissionsPerDay: 1,
      allowRemindLater: true,
      enablePreview: true
    });
    setHasChanges(false);
  };

  // ============================================================================
  // RENDER - POINT CONFIGURATION SECTION
  // ============================================================================

  const renderPointConfiguration = () => (
    <div className="space-y-4">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-gray-900 mb-1">Point Values</h3>
          <p className="text-sm text-gray-600">
            Configure points awarded for each rewardable activity
          </p>
        </div>
        <Button 
          variant="outline" 
          size="sm"
          onClick={handleRestoreDefaults}
        >
          <RotateCcw className="w-4 h-4 mr-2" />
          Restore Defaults
        </Button>
      </div>

      {pointConfigs.map(config => (
        <Card key={config.id} className="p-4">
          <div className="space-y-3">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <Label className="text-sm text-gray-900">{config.label}</Label>
                <p className="text-xs text-gray-500 mt-1">{config.description}</p>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-lg text-evergreen font-medium min-w-[80px] text-right">
                  {config.value} pts
                </span>
              </div>
            </div>

            <div className="flex items-center gap-4">
              {/* Slider */}
              <div className="flex-1">
                <Slider
                  value={[config.value]}
                  onValueChange={(value) => handlePointChange(config.id, value[0])}
                  min={config.min}
                  max={config.max}
                  step={25}
                  className="cursor-pointer"
                />
                <div className="flex justify-between text-xs text-gray-500 mt-1">
                  <span>{config.min}</span>
                  <span>{config.max}</span>
                </div>
              </div>

              {/* Numeric Input */}
              <div className="w-24">
                <Input
                  type="number"
                  value={config.value}
                  onChange={(e) => {
                    const val = parseInt(e.target.value) || 0;
                    if (val >= config.min && val <= config.max) {
                      handlePointChange(config.id, val);
                    }
                  }}
                  min={config.min}
                  max={config.max}
                  className="text-center"
                />
              </div>
            </div>

            {/* Default indicator */}
            {config.value !== config.defaultValue && (
              <div className="flex items-center gap-2 text-xs text-amber-600">
                <Info className="w-3 h-3" />
                <span>Default: {config.defaultValue} pts</span>
              </div>
            )}
          </div>
        </Card>
      ))}
    </div>
  );

  // ============================================================================
  // RENDER - DAILY MISSION SETTINGS
  // ============================================================================

  const renderMissionSettings = () => (
    <div className="grid lg:grid-cols-2 gap-6">
      {/* Settings Panel */}
      <div className="space-y-4">
        <div>
          <h3 className="text-gray-900 mb-1">Daily Mission Settings</h3>
          <p className="text-sm text-gray-600">
            Configure Penny daily trail mission behavior
          </p>
        </div>

        <Card className="p-4 space-y-4">
          {/* Points per Mission */}
          <div className="space-y-2">
            <Label className="text-sm">Points per Mission</Label>
            <div className="flex items-center gap-3">
              <Slider
                value={[missionConfig.pointsPerMission]}
                onValueChange={(value) => handleMissionConfigChange('pointsPerMission', value[0])}
                min={0}
                max={50}
                step={5}
                className="flex-1"
              />
              <Input
                type="number"
                value={missionConfig.pointsPerMission}
                onChange={(e) => handleMissionConfigChange('pointsPerMission', parseInt(e.target.value) || 0)}
                className="w-20 text-center"
                min={0}
                max={50}
              />
            </div>
            <p className="text-xs text-gray-500">
              Field: <code className="bg-gray-100 px-1 py-0.5 rounded">POINTS_DAILY_MISSION</code>
            </p>
          </div>

          <Separator />

          {/* Snooze Interval */}
          <div className="space-y-2">
            <Label className="text-sm">Snooze Interval (hours)</Label>
            <div className="flex items-center gap-3">
              <Slider
                value={[missionConfig.snoozeIntervalHours]}
                onValueChange={(value) => handleMissionConfigChange('snoozeIntervalHours', value[0])}
                min={1}
                max={24}
                step={1}
                className="flex-1"
              />
              <Input
                type="number"
                value={missionConfig.snoozeIntervalHours}
                onChange={(e) => handleMissionConfigChange('snoozeIntervalHours', parseInt(e.target.value) || 1)}
                className="w-20 text-center"
                min={1}
                max={24}
              />
            </div>
            <p className="text-xs text-gray-500">
              Field: <code className="bg-gray-100 px-1 py-0.5 rounded">MISSION_REMIND_INTERVAL_HOURS</code>
            </p>
          </div>

          <Separator />

          {/* Max Missions per Day */}
          <div className="space-y-2">
            <Label className="text-sm">Maximum Active Missions per Day</Label>
            <Select
              value={String(missionConfig.maxMissionsPerDay)}
              onValueChange={(value) => handleMissionConfigChange('maxMissionsPerDay', parseInt(value))}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1">1 Mission</SelectItem>
                <SelectItem value="2">2 Missions</SelectItem>
                <SelectItem value="3">3 Missions</SelectItem>
              </SelectContent>
            </Select>
            <p className="text-xs text-gray-500">
              Field: <code className="bg-gray-100 px-1 py-0.5 rounded">MAX_MISSIONS_PER_DAY</code>
            </p>
          </div>

          <Separator />

          {/* Toggles */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <Label className="text-sm">Allow "Remind Me Later"</Label>
              <Switch
                checked={missionConfig.allowRemindLater}
                onCheckedChange={(checked) => handleMissionConfigChange('allowRemindLater', checked)}
              />
            </div>
            <div className="flex items-center justify-between">
              <Label className="text-sm">Enable Mission Preview</Label>
              <Switch
                checked={missionConfig.enablePreview}
                onCheckedChange={(checked) => handleMissionConfigChange('enablePreview', checked)}
              />
            </div>
          </div>
        </Card>
      </div>

      {/* Live Preview Panel */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-gray-900 mb-1">Mission Preview</h3>
            <p className="text-sm text-gray-600">
              Simulate mission states
            </p>
          </div>
          <Select
            value={previewMissionState}
            onValueChange={(value: any) => setPreviewMissionState(value)}
          >
            <SelectTrigger className="w-40">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="available">Available</SelectItem>
              <SelectItem value="accepted">Accepted</SelectItem>
              <SelectItem value="completed">Completed</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Mission Card Preview */}
        <Card className="p-6 bg-gradient-to-br from-amber-50 to-white border-2 border-amber-200">
          <div className="flex items-start gap-4 mb-4">
            <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-sun-amber to-amber-600 flex items-center justify-center shadow-md">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
            <div className="flex-1">
              <h4 className="text-gray-900 mb-1">Daily Trail Mission</h4>
              <p className="text-sm text-gray-600">
                {previewMissionState === 'available' && 'Complete today\'s learning challenge'}
                {previewMissionState === 'accepted' && 'In progress - complete by end of day'}
                {previewMissionState === 'completed' && 'Mission accomplished! 🎉'}
              </p>
            </div>
          </div>

          <div className="bg-white rounded-lg p-4 mb-4 border border-amber-100">
            <div className="flex items-center gap-2 mb-2">
              <Target className="w-4 h-4 text-amber-600" />
              <p className="text-sm text-gray-900">Complete 2 learning modules</p>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-xs text-gray-600">Progress: 1/2</span>
              <span className="text-sm text-amber-600 font-medium">
                +{missionConfig.pointsPerMission} pts
              </span>
            </div>
          </div>

          {/* Action Buttons based on state */}
          {previewMissionState === 'available' && (
            <div className="space-y-2">
              <Button className="w-full bg-sun-amber hover:bg-sun-amber/90">
                Accept Mission
              </Button>
              {missionConfig.allowRemindLater && (
                <Button variant="outline" className="w-full">
                  <Clock className="w-4 h-4 mr-2" />
                  Remind Me in {missionConfig.snoozeIntervalHours}h
                </Button>
              )}
            </div>
          )}

          {previewMissionState === 'accepted' && (
            <Button className="w-full bg-evergreen hover:bg-evergreen/90 text-white">
              Continue Mission
            </Button>
          )}

          {previewMissionState === 'completed' && (
            <div className="flex items-center justify-center gap-2 py-3 bg-green-50 rounded-lg">
              <CheckCircle className="w-5 h-5 text-green-600" />
              <span className="text-sm text-green-700 font-medium">
                +{missionConfig.pointsPerMission} points earned
              </span>
            </div>
          )}

          {/* Live Value Bindings */}
          <div className="mt-4 pt-4 border-t border-amber-200">
            <p className="text-xs text-gray-500 mb-2">Live Data Bindings:</p>
            <div className="space-y-1 text-xs text-gray-600">
              <div className="flex justify-between">
                <span>Points:</span>
                <code className="bg-gray-100 px-1 py-0.5 rounded">
                  {missionConfig.pointsPerMission}
                </code>
              </div>
              <div className="flex justify-between">
                <span>Max/Day:</span>
                <code className="bg-gray-100 px-1 py-0.5 rounded">
                  {missionConfig.maxMissionsPerDay}
                </code>
              </div>
              <div className="flex justify-between">
                <span>Snooze:</span>
                <code className="bg-gray-100 px-1 py-0.5 rounded">
                  {missionConfig.snoozeIntervalHours}h
                </code>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );

  // ============================================================================
  // RENDER - BADGE & LEVEL CONFIGURATION
  // ============================================================================

  const renderLevelConfiguration = () => (
    <div className="space-y-4">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-gray-900 mb-1">Badge & Level Configuration</h3>
          <p className="text-sm text-gray-600">
            Configure level thresholds and associated badges
          </p>
        </div>
        <Button 
          variant="outline" 
          size="sm"
          onClick={handleAddNewTier}
        >
          <Zap className="w-4 h-4 mr-2" />
          Add New Tier
        </Button>
      </div>

      <Card>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Level</TableHead>
              <TableHead>Point Range Start</TableHead>
              <TableHead>Point Range End</TableHead>
              <TableHead>Badge Icon</TableHead>
              <TableHead>Description</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {levelThresholds.map(threshold => (
              <TableRow key={threshold.id}>
                {/* Level Name */}
                <TableCell className="font-medium">
                  {threshold.level}
                </TableCell>

                {/* Range Start */}
                <TableCell>
                  {threshold.editable ? (
                    <Input
                      type="number"
                      value={threshold.rangeStart}
                      onChange={(e) => handleLevelThresholdChange(
                        threshold.id, 
                        'rangeStart', 
                        parseInt(e.target.value) || 0
                      )}
                      className="w-24"
                      min={0}
                    />
                  ) : (
                    <span className="text-gray-600">{threshold.rangeStart}</span>
                  )}
                </TableCell>

                {/* Range End */}
                <TableCell>
                  {threshold.editable && threshold.rangeEnd !== null ? (
                    <Input
                      type="number"
                      value={threshold.rangeEnd}
                      onChange={(e) => handleLevelThresholdChange(
                        threshold.id,
                        'rangeEnd',
                        parseInt(e.target.value) || 0
                      )}
                      className="w-24"
                      min={threshold.rangeStart + 1}
                    />
                  ) : (
                    <span className="text-gray-600">
                      {threshold.rangeEnd === null ? '∞' : threshold.rangeEnd}
                    </span>
                  )}
                </TableCell>

                {/* Badge Icon */}
                <TableCell>
                  {threshold.editable ? (
                    <Select
                      value={threshold.badgeIcon}
                      onValueChange={(value) => handleLevelThresholdChange(
                        threshold.id,
                        'badgeIcon',
                        value
                      )}
                    >
                      <SelectTrigger className="w-32">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {BADGE_ICON_OPTIONS.map(icon => (
                          <SelectItem key={icon} value={icon}>
                            {icon}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  ) : (
                    <span className="text-gray-600">{threshold.badgeIcon}</span>
                  )}
                </TableCell>

                {/* Description */}
                <TableCell>
                  {threshold.editable ? (
                    <Input
                      value={threshold.description}
                      onChange={(e) => handleLevelThresholdChange(
                        threshold.id,
                        'description',
                        e.target.value
                      )}
                      className="min-w-[200px]"
                      placeholder="Achievement description"
                    />
                  ) : (
                    <span className="text-gray-600">{threshold.description}</span>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>

      <div className="flex items-start gap-3 p-4 bg-blue-50 rounded-lg">
        <Info className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
        <div className="text-sm text-gray-700">
          <p className="mb-1">
            <strong>Note:</strong> The Visitor level (0-99 points) is locked to maintain system integrity.
          </p>
          <p className="text-xs text-gray-600">
            Edit higher tiers to create custom progression paths. Changes apply immediately to all users.
          </p>
        </div>
      </div>
    </div>
  );

  // ============================================================================
  // RENDER - PENNY ADMIN CONTROLS
  // ============================================================================

  const renderPennyControls = () => (
    <div className="space-y-4">
      <div>
        <h3 className="text-gray-900 mb-1">Penny AI Automation</h3>
        <p className="text-sm text-gray-600">
          Configure Penny's interaction behavior and messaging
        </p>
      </div>

      <Card className="p-6 space-y-6">
        {/* Automation Toggles */}
        <div className="space-y-4">
          <TooltipProvider>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Label className="text-sm">Enable Penny Encouragement Messages</Label>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Info className="w-4 h-4 text-gray-400 cursor-help" />
                  </TooltipTrigger>
                  <TooltipContent className="max-w-xs">
                    <p className="text-xs">
                      Applies to all user levels. Penny sends contextual encouragement based on progress and activity.
                      Configurable messaging via Einstein Prompt Builder.
                    </p>
                  </TooltipContent>
                </Tooltip>
              </div>
              <Switch
                checked={pennyConfig.enableEncouragement}
                onCheckedChange={(checked) => handlePennyConfigChange('enableEncouragement', checked)}
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Label className="text-sm">Enable Weekly Summary Messages</Label>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Info className="w-4 h-4 text-gray-400 cursor-help" />
                  </TooltipTrigger>
                  <TooltipContent className="max-w-xs">
                    <p className="text-xs">
                      Penny sends weekly progress summaries every Monday at 9am (user timezone).
                      Includes points earned, badges unlocked, and next step recommendations.
                    </p>
                  </TooltipContent>
                </Tooltip>
              </div>
              <Switch
                checked={pennyConfig.enableWeeklySummary}
                onCheckedChange={(checked) => handlePennyConfigChange('enableWeeklySummary', checked)}
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Label className="text-sm">Enable Slack Announcements</Label>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Info className="w-4 h-4 text-gray-400 cursor-help" />
                  </TooltipTrigger>
                  <TooltipContent className="max-w-xs">
                    <p className="text-xs">
                      Penny posts achievement announcements to #general Slack channel.
                      Includes level-ups, badge earnings, and major milestones.
                    </p>
                  </TooltipContent>
                </Tooltip>
              </div>
              <Switch
                checked={pennyConfig.enableSlackAnnouncements}
                onCheckedChange={(checked) => handlePennyConfigChange('enableSlackAnnouncements', checked)}
              />
            </div>
          </TooltipProvider>
        </div>

        <Separator />

        {/* Penny Tone */}
        <div className="space-y-2">
          <Label className="text-sm">Penny Tone</Label>
          <Select
            value={pennyConfig.tone}
            onValueChange={(value: any) => handlePennyConfigChange('tone', value)}
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Mentor">
                <div>
                  <p className="font-medium">Mentor</p>
                  <p className="text-xs text-gray-500">
                    Supportive and guiding, focuses on growth
                  </p>
                </div>
              </SelectItem>
              <SelectItem value="Motivator">
                <div>
                  <p className="font-medium">Motivator</p>
                  <p className="text-xs text-gray-500">
                    Energetic and encouraging, celebrates wins
                  </p>
                </div>
              </SelectItem>
              <SelectItem value="Professional">
                <div>
                  <p className="font-medium">Professional</p>
                  <p className="text-xs text-gray-500">
                    Informative and concise, task-focused
                  </p>
                </div>
              </SelectItem>
            </SelectContent>
          </Select>
          <p className="text-xs text-gray-500">
            This affects Penny's language style across all interactions and messages.
          </p>
        </div>

        <Separator />

        {/* Penny Configuration Info */}
        <div className="bg-amber-50 rounded-lg p-4 space-y-2">
          <div className="flex items-center gap-2 mb-2">
            <Sparkles className="w-5 h-5 text-amber-600" />
            <p className="text-sm text-gray-900 font-medium">AI Configuration</p>
          </div>
          <div className="space-y-1 text-xs text-gray-600">
            <div className="flex justify-between">
              <span>Einstein Prompt Builder:</span>
              <span className="text-gray-900">Connected</span>
            </div>
            <div className="flex justify-between">
              <span>Message Templates:</span>
              <span className="text-gray-900">42 active</span>
            </div>
            <div className="flex justify-between">
              <span>Platform Events:</span>
              <span className="text-gray-900">Enabled</span>
            </div>
          </div>
          <p className="text-xs text-gray-500 pt-2">
            Penny uses Einstein AI to generate personalized messages based on user context, level, and activity.
          </p>
        </div>
      </Card>
    </div>
  );

  // ============================================================================
  // MAIN RENDER
  // ============================================================================

  return (
    <div className="max-w-7xl mx-auto p-6">
      {/* Header */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-gray-900 mb-2">Gamification & Rewards Settings</h1>
            <p className="text-gray-600">
              No-code configuration for points, missions, levels, and AI automation
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
              <strong>Admin Controls:</strong> All changes are applied immediately to the live system.
            </p>
            <p>
              Modifications affect future point awards and user experiences. Historical data remains unchanged.
            </p>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 mb-6">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="w-full justify-start rounded-none border-b border-gray-200 bg-transparent px-6 pt-4">
            <TabsTrigger value="points" className="data-[state=active]:border-b-2 data-[state=active]:border-evergreen">
              <Sliders className="w-4 h-4 mr-2" />
              Point Values
            </TabsTrigger>
            <TabsTrigger value="missions" className="data-[state=active]:border-b-2 data-[state=active]:border-evergreen">
              <Target className="w-4 h-4 mr-2" />
              Daily Missions
            </TabsTrigger>
            <TabsTrigger value="levels" className="data-[state=active]:border-b-2 data-[state=active]:border-evergreen">
              <Shield className="w-4 h-4 mr-2" />
              Badges & Levels
            </TabsTrigger>
            <TabsTrigger value="penny" className="data-[state=active]:border-b-2 data-[state=active]:border-evergreen">
              <Sparkles className="w-4 h-4 mr-2" />
              Penny AI
            </TabsTrigger>
          </TabsList>

          <div className="p-6">
            <TabsContent value="points" className="mt-0">
              {renderPointConfiguration()}
            </TabsContent>

            <TabsContent value="missions" className="mt-0">
              {renderMissionSettings()}
            </TabsContent>

            <TabsContent value="levels" className="mt-0">
              {renderLevelConfiguration()}
            </TabsContent>

            <TabsContent value="penny" className="mt-0">
              {renderPennyControls()}
            </TabsContent>
          </div>
        </Tabs>
      </div>

      {/* Footer Actions */}
      {hasChanges && (
        <div className="sticky bottom-0 p-4 bg-white rounded-xl shadow-lg border border-gray-200 flex items-center justify-between">
          <div className="flex items-center gap-2 text-sm text-gray-700">
            <AlertCircle className="w-5 h-5 text-amber-500" />
            <span>You have unsaved changes</span>
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
