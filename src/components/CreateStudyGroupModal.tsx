import { useState } from 'react';
import { X, Users, Lock, Globe, AlertCircle } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Badge } from './ui/badge';

interface CreateStudyGroupModalProps {
  onClose: () => void;
  onCreate: (groupData: GroupData) => void;
}

interface GroupData {
  name: string;
  description: string;
  trail: string;
  topic: string;
  maxMembers: number;
  isPrivate: boolean;
}

export function CreateStudyGroupModal({ onClose, onCreate }: CreateStudyGroupModalProps) {
  const [formData, setFormData] = useState<GroupData>({
    name: '',
    description: '',
    trail: 'all',
    topic: '',
    maxMembers: 8,
    isPrivate: false,
  });

  const [errors, setErrors] = useState<Partial<Record<keyof GroupData, string>>>({});

  const validate = () => {
    const newErrors: Partial<Record<keyof GroupData, string>> = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Group name is required';
    } else if (formData.name.length < 5) {
      newErrors.name = 'Group name must be at least 5 characters';
    }

    if (!formData.description.trim()) {
      newErrors.description = 'Description is required';
    } else if (formData.description.length < 20) {
      newErrors.description = 'Description must be at least 20 characters';
    }

    if (!formData.topic.trim()) {
      newErrors.topic = 'Topic is required';
    }

    if (formData.maxMembers < 3 || formData.maxMembers > 12) {
      newErrors.maxMembers = 'Max members must be between 3 and 12';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (validate()) {
      onCreate(formData);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-gray-200 p-6 flex items-center justify-between">
          <div>
            <h2 className="text-2xl text-gray-900 mb-1">Create Study Group</h2>
            <p className="text-sm text-gray-600">
              Start a collaborative learning community
            </p>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Form */}
        <div className="p-6 space-y-6">
          {/* Info Banner */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <div className="flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
              <div className="text-sm text-blue-800">
                <p className="mb-2">
                  <strong>Tips for creating a successful study group:</strong>
                </p>
                <ul className="list-disc list-inside space-y-1">
                  <li>Choose a clear, descriptive name</li>
                  <li>Explain what you'll study and how often you'll meet</li>
                  <li>Keep groups small (4-8 members) for better engagement</li>
                  <li>Set clear goals and expectations upfront</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Group Name */}
          <div>
            <Label htmlFor="name" className="text-gray-900 mb-2 block">
              Group Name *
            </Label>
            <Input
              id="name"
              placeholder="e.g., Admin Trail Masters"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className={errors.name ? 'border-red-500' : ''}
            />
            {errors.name && (
              <p className="text-sm text-red-600 mt-1">{errors.name}</p>
            )}
            <p className="text-xs text-gray-500 mt-1">
              {formData.name.length}/80 characters
            </p>
          </div>

          {/* Description */}
          <div>
            <Label htmlFor="description" className="text-gray-900 mb-2 block">
              Description *
            </Label>
            <Textarea
              id="description"
              rows={4}
              placeholder="Describe what your group will study, how often you'll meet, and what members can expect..."
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className={errors.description ? 'border-red-500' : ''}
            />
            {errors.description && (
              <p className="text-sm text-red-600 mt-1">{errors.description}</p>
            )}
            <p className="text-xs text-gray-500 mt-1">
              {formData.description.length}/500 characters (minimum 20)
            </p>
          </div>

          {/* Trail & Topic */}
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="trail" className="text-gray-900 mb-2 block">
                Learning Trail
              </Label>
              <Select
                value={formData.trail}
                onValueChange={(value) => setFormData({ ...formData, trail: value })}
              >
                <SelectTrigger id="trail">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Trails</SelectItem>
                  <SelectItem value="admin">Admin Trail</SelectItem>
                  <SelectItem value="developer">Developer Trail</SelectItem>
                  <SelectItem value="architect">Architect Trail</SelectItem>
                  <SelectItem value="consultant">Consultant Trail</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="topic" className="text-gray-900 mb-2 block">
                Primary Topic *
              </Label>
              <Input
                id="topic"
                placeholder="e.g., Certification Prep"
                value={formData.topic}
                onChange={(e) => setFormData({ ...formData, topic: e.target.value })}
                className={errors.topic ? 'border-red-500' : ''}
              />
              {errors.topic && (
                <p className="text-sm text-red-600 mt-1">{errors.topic}</p>
              )}
            </div>
          </div>

          {/* Max Members */}
          <div>
            <Label htmlFor="maxMembers" className="text-gray-900 mb-2 block">
              Maximum Members
            </Label>
            <div className="flex items-center gap-4">
              <Input
                id="maxMembers"
                type="number"
                min={3}
                max={12}
                value={formData.maxMembers}
                onChange={(e) =>
                  setFormData({ ...formData, maxMembers: parseInt(e.target.value) || 8 })
                }
                className={`max-w-[120px] ${errors.maxMembers ? 'border-red-500' : ''}`}
              />
              <div className="flex items-center gap-2">
                {[4, 6, 8, 10].map((size) => (
                  <Badge
                    key={size}
                    onClick={() => setFormData({ ...formData, maxMembers: size })}
                    className={`cursor-pointer ${
                      formData.maxMembers === size
                        ? 'bg-[#7EB5C1] text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {size}
                  </Badge>
                ))}
              </div>
            </div>
            {errors.maxMembers && (
              <p className="text-sm text-red-600 mt-1">{errors.maxMembers}</p>
            )}
            <p className="text-xs text-gray-500 mt-1">
              Recommended: 4-8 members for optimal engagement
            </p>
          </div>

          {/* Privacy */}
          <div>
            <Label className="text-gray-900 mb-3 block">Privacy</Label>
            <div className="grid md:grid-cols-2 gap-3">
              <button
                onClick={() => setFormData({ ...formData, isPrivate: false })}
                className={`p-4 border-2 rounded-lg text-left transition-all ${
                  !formData.isPrivate
                    ? 'border-[#7EB5C1] bg-blue-50'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <div className="flex items-center gap-3 mb-2">
                  <Globe className="w-5 h-5 text-[#7EB5C1]" />
                  <span className="text-gray-900">Public</span>
                  {!formData.isPrivate && (
                    <Badge className="bg-[#7EB5C1] text-white border-0 ml-auto">
                      Selected
                    </Badge>
                  )}
                </div>
                <p className="text-sm text-gray-600">
                  Anyone can find and join your group
                </p>
              </button>

              <button
                onClick={() => setFormData({ ...formData, isPrivate: true })}
                className={`p-4 border-2 rounded-lg text-left transition-all ${
                  formData.isPrivate
                    ? 'border-[#7EB5C1] bg-blue-50'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <div className="flex items-center gap-3 mb-2">
                  <Lock className="w-5 h-5 text-[#7EB5C1]" />
                  <span className="text-gray-900">Private</span>
                  {formData.isPrivate && (
                    <Badge className="bg-[#7EB5C1] text-white border-0 ml-auto">
                      Selected
                    </Badge>
                  )}
                </div>
                <p className="text-sm text-gray-600">
                  Members can only join via invitation
                </p>
              </button>
            </div>
          </div>

          {/* Expected Outcomes */}
          <div className="bg-green-50 border border-green-200 rounded-lg p-4">
            <h3 className="text-green-900 mb-2 flex items-center gap-2">
              <Users className="w-5 h-5" />
              What happens next?
            </h3>
            <ul className="space-y-1 text-sm text-green-800">
              <li>✓ You'll be the group creator and moderator</li>
              <li>✓ Your group will appear in the browse section</li>
              <li>✓ You can invite members or let them join</li>
              <li>✓ You'll earn 25 points for creating a group</li>
              <li>✓ Set up challenges, sessions, and share resources</li>
            </ul>
          </div>
        </div>

        {/* Footer */}
        <div className="sticky bottom-0 bg-gray-50 border-t border-gray-200 p-6 flex items-center justify-between">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button
            onClick={handleSubmit}
            className="bg-[#7EB5C1] hover:bg-[#6a9aa5] text-white"
          >
            Create Group (+25 pts)
          </Button>
        </div>
      </div>
    </div>
  );
}
