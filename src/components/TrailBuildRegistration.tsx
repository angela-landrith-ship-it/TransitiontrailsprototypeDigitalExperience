import { useState } from 'react';
import { X, Users, CheckCircle2, Sparkles, MessageSquare } from 'lucide-react';
import { Badge } from './ui/badge';

interface TrailBuildRegistrationProps {
  onClose: () => void;
  onRegister: () => void;
}

export function TrailBuildRegistration({ onClose, onRegister }: TrailBuildRegistrationProps) {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    role: '',
    skills: [] as string[],
    teamChoice: 'join', // 'join' or 'create'
    teamName: '',
    slackHandle: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const roles = [
    { id: 'builder', name: 'Builder', icon: '👨‍💻', description: 'Develop flows, automation, and custom solutions' },
    { id: 'analyst', name: 'Analyst', icon: '📊', description: 'Design data models and create reports' },
    { id: 'designer', name: 'Designer', icon: '🎨', description: 'Create user experiences and interfaces' },
    { id: 'admin', name: 'Admin', icon: '⚙️', description: 'Configure settings and manage deployments' },
    { id: 'sponsor', name: 'Sponsor/Mentor', icon: '🌟', description: 'Provide guidance and support to teams' }
  ];

  const availableSkills = [
    'Flows', 'Apex', 'LWC', 'Visualforce', 'Reports', 'Dashboards',
    'Data Modeling', 'Integration', 'APIs', 'Process Builder',
    'Validation Rules', 'Security', 'Lightning Pages', 'Communities'
  ];

  const handleRoleSelect = (roleId: string) => {
    setFormData({ ...formData, role: roleId });
  };

  const handleSkillToggle = (skill: string) => {
    const skills = formData.skills.includes(skill)
      ? formData.skills.filter(s => s !== skill)
      : [...formData.skills, skill];
    setFormData({ ...formData, skills });
  };

  const handleSubmit = () => {
    setSubmitted(true);
    setTimeout(() => {
      onRegister();
    }, 2000);
  };

  if (submitted) {
    return (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-2xl max-w-md w-full p-8 text-center">
          {/* Confetti Effect */}
          <div className="w-20 h-20 rounded-full bg-gradient-to-br from-[#F9A03F] to-[#e89135] flex items-center justify-center mx-auto mb-4 animate-bounce">
            <Sparkles className="w-10 h-10 text-white" />
          </div>
          
          <h2 className="text-2xl text-gray-900 mb-2">You're Registered! 🎉</h2>
          <p className="text-gray-600 mb-6">
            Welcome to TrailBuild Summit Spring 2025! Check your email for next steps 
            and your team Slack channel link.
          </p>
          
          <div className="bg-[#7EB5C1]/10 border border-[#7EB5C1]/30 rounded-lg p-4 mb-6">
            <div className="flex items-center space-x-2 mb-2">
              <MessageSquare className="w-5 h-5 text-[#2C6975]" />
              <span className="text-sm text-gray-900">Your Team Slack Channel</span>
            </div>
            <p className="text-sm text-[#2C6975] font-mono">#trailbuild-2025-team-{Math.floor(Math.random() * 100)}</p>
          </div>

          <button
            onClick={onClose}
            className="w-full px-6 py-3 bg-[#2C6975] text-white rounded-lg hover:bg-[#234d56] transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 overflow-y-auto">
      <div className="bg-white rounded-2xl max-w-3xl w-full my-8">
        {/* Header */}
        <div className="p-6 border-b border-gray-200 flex items-center justify-between">
          <div>
            <h2 className="text-2xl text-gray-900 mb-1">Register for TrailBuild Summit</h2>
            <p className="text-gray-600">Spring 2025 • 3-Day Virtual Event</p>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-lg hover:bg-gray-100 flex items-center justify-center transition-colors"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        {/* Progress Steps */}
        <div className="px-6 py-4 border-b border-gray-200">
          <div className="flex items-center justify-between max-w-md mx-auto">
            {[1, 2, 3].map((s) => (
              <div key={s} className="flex items-center">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-all ${
                  step >= s 
                    ? 'bg-[#2C6975] text-white' 
                    : 'bg-gray-200 text-gray-500'
                }`}>
                  {s}
                </div>
                {s < 3 && (
                  <div className={`w-16 h-1 mx-2 ${
                    step > s ? 'bg-[#2C6975]' : 'bg-gray-200'
                  }`} />
                )}
              </div>
            ))}
          </div>
          <div className="flex items-center justify-between max-w-md mx-auto mt-2 text-xs text-gray-600">
            <span>Choose Role</span>
            <span>Select Skills</span>
            <span>Team Setup</span>
          </div>
        </div>

        {/* Step Content */}
        <div className="p-6">
          {/* Step 1: Choose Role */}
          {step === 1 && (
            <div>
              <h3 className="text-xl text-gray-900 mb-4">What role will you play?</h3>
              <div className="grid md:grid-cols-2 gap-4">
                {roles.map((role) => (
                  <button
                    key={role.id}
                    onClick={() => handleRoleSelect(role.id)}
                    className={`p-4 rounded-xl border-2 transition-all text-left ${
                      formData.role === role.id
                        ? 'border-[#2C6975] bg-[#2C6975]/5'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div className="flex items-start space-x-3">
                      <span className="text-3xl">{role.icon}</span>
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-1">
                          <h4 className="text-gray-900">{role.name}</h4>
                          {formData.role === role.id && (
                            <CheckCircle2 className="w-4 h-4 text-[#2C6975]" />
                          )}
                        </div>
                        <p className="text-sm text-gray-600">{role.description}</p>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Step 2: Select Skills */}
          {step === 2 && (
            <div>
              <h3 className="text-xl text-gray-900 mb-2">Select your skills</h3>
              <p className="text-gray-600 mb-4">Choose at least 3 skills you're comfortable with</p>
              
              <div className="flex flex-wrap gap-2">
                {availableSkills.map((skill) => (
                  <button
                    key={skill}
                    onClick={() => handleSkillToggle(skill)}
                    className={`px-4 py-2 rounded-lg transition-all ${
                      formData.skills.includes(skill)
                        ? 'bg-[#2C6975] text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {skill}
                  </button>
                ))}
              </div>

              <div className="mt-4 p-4 bg-[#7EB5C1]/10 rounded-lg border border-[#7EB5C1]/30">
                <p className="text-sm text-gray-700">
                  <strong>Selected:</strong> {formData.skills.length} skill{formData.skills.length !== 1 ? 's' : ''}
                  {formData.skills.length >= 3 && ' ✓'}
                </p>
              </div>
            </div>
          )}

          {/* Step 3: Team Setup */}
          {step === 3 && (
            <div>
              <h3 className="text-xl text-gray-900 mb-4">Team Setup</h3>
              
              <div className="space-y-4 mb-6">
                {/* Team Choice */}
                <div>
                  <label className="block text-sm text-gray-700 mb-2">
                    How do you want to participate?
                  </label>
                  <div className="grid grid-cols-2 gap-4">
                    <button
                      onClick={() => setFormData({ ...formData, teamChoice: 'join' })}
                      className={`p-4 rounded-xl border-2 transition-all ${
                        formData.teamChoice === 'join'
                          ? 'border-[#2C6975] bg-[#2C6975]/5'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <Users className="w-6 h-6 text-[#2C6975] mb-2" />
                      <h4 className="text-gray-900 mb-1">Join a Team</h4>
                      <p className="text-xs text-gray-600">Get matched with others</p>
                    </button>

                    <button
                      onClick={() => setFormData({ ...formData, teamChoice: 'create' })}
                      className={`p-4 rounded-xl border-2 transition-all ${
                        formData.teamChoice === 'create'
                          ? 'border-[#2C6975] bg-[#2C6975]/5'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <Sparkles className="w-6 h-6 text-[#F9A03F] mb-2" />
                      <h4 className="text-gray-900 mb-1">Create a Team</h4>
                      <p className="text-xs text-gray-600">Start with friends</p>
                    </button>
                  </div>
                </div>

                {/* Team Name (if creating) */}
                {formData.teamChoice === 'create' && (
                  <div>
                    <label className="block text-sm text-gray-700 mb-2">
                      Team Name
                    </label>
                    <input
                      type="text"
                      value={formData.teamName}
                      onChange={(e) => setFormData({ ...formData, teamName: e.target.value })}
                      placeholder="e.g., Trail Blazers"
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2C6975]"
                    />
                  </div>
                )}

                {/* Slack Handle */}
                <div>
                  <label className="block text-sm text-gray-700 mb-2">
                    Slack Handle (Optional)
                  </label>
                  <input
                    type="text"
                    value={formData.slackHandle}
                    onChange={(e) => setFormData({ ...formData, slackHandle: e.target.value })}
                    placeholder="@yourhandle"
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2C6975]"
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    We'll create a team Slack channel for collaboration
                  </p>
                </div>
              </div>

              <div className="p-4 bg-[#F9A03F]/10 border border-[#F9A03F]/30 rounded-lg">
                <h4 className="text-sm text-gray-900 mb-2">What happens next?</h4>
                <ul className="text-xs text-gray-700 space-y-1">
                  <li>• You'll receive a confirmation email with event details</li>
                  <li>• Team Slack channel will be created within 24 hours</li>
                  <li>• Sandbox org credentials sent 1 week before event</li>
                  <li>• Join the kickoff call on Day 1 to meet your team</li>
                </ul>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-gray-200 flex items-center justify-between">
          <button
            onClick={() => step > 1 ? setStep(step - 1) : onClose()}
            className="px-6 py-3 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
          >
            {step === 1 ? 'Cancel' : 'Back'}
          </button>
          
          <button
            onClick={() => {
              if (step < 3) {
                setStep(step + 1);
              } else {
                handleSubmit();
              }
            }}
            disabled={
              (step === 1 && !formData.role) ||
              (step === 2 && formData.skills.length < 3) ||
              (step === 3 && formData.teamChoice === 'create' && !formData.teamName)
            }
            className="px-6 py-3 bg-[#F9A03F] text-white rounded-lg hover:bg-[#e89135] transition-all shadow-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
          >
            <span>{step === 3 ? 'Complete Registration' : 'Next'}</span>
            {step < 3 && <span>→</span>}
          </button>
        </div>
      </div>
    </div>
  );
}
