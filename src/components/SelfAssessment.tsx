import { ArrowLeft, Calendar, Sparkles, Send, CheckCircle, AlertCircle, TrendingUp, Briefcase, Cloud, Target, Award, Brain } from 'lucide-react';
import { PageType } from '../App';
import { useState } from 'react';
import { Textarea } from './ui/textarea';
import { Button } from './ui/button';

interface SelfAssessmentProps {
  onNavigate: (page: PageType) => void;
}

export function SelfAssessment({ onNavigate }: SelfAssessmentProps) {
  const [currentStep, setCurrentStep] = useState(1);
  const [showPennyChat, setShowPennyChat] = useState(false);
  const [pennyMessages, setPennyMessages] = useState<Array<{id: number, sender: string, text: string}>>([
    {
      id: 1,
      sender: 'penny',
      text: "Hi! I'm here to help you complete your quarterly self-assessment. I'll guide you through reflecting on your growth and achievements. Let's start with your business skills - what challenges have you overcome this quarter?"
    }
  ]);
  const [pennyInput, setPennyInput] = useState('');

  // Assessment responses
  const [responses, setResponses] = useState({
    businessSkills: '',
    salesforceSkills: '',
    certificationProgress: '',
    focusedSkills: '',
    achievements: '',
    challenges: '',
    nextQuarterGoals: ''
  });

  const totalSteps = 4;

  const handlePennySend = () => {
    if (!pennyInput.trim()) return;

    const newMessage = {
      id: pennyMessages.length + 1,
      sender: 'user',
      text: pennyInput
    };

    setPennyMessages([...pennyMessages, newMessage]);
    setPennyInput('');

    // Simulate Penny's helpful response
    setTimeout(() => {
      let pennyResponse = '';
      
      if (currentStep === 1) {
        pennyResponse = "Great insights on your business skills! Based on your response, I can see you've developed problem-solving and communication abilities. Would you like me to help you add specific examples or metrics to strengthen this reflection?";
      } else if (currentStep === 2) {
        pennyResponse = "Excellent progress on your Salesforce skills! I notice you're working on Process Automation (IQ Score: 192) and Data Management. How have these skills helped you in practical scenarios?";
      } else if (currentStep === 3) {
        pennyResponse = "Your certification progress looks solid! With 68% completion on your Salesforce Admin cert, you're on track for your May 2025 goal. What specific areas do you want to focus on next?";
      } else {
        pennyResponse = "Those are ambitious goals! I'll help you break them down into actionable steps. Remember, you have your Daily Missions and Trail Missions to support these objectives.";
      }

      const response = {
        id: pennyMessages.length + 2,
        sender: 'penny',
        text: pennyResponse
      };
      setPennyMessages(prev => [...prev, response]);
    }, 1000);
  };

  const handleResponseChange = (field: string, value: string) => {
    setResponses({ ...responses, [field]: value });
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-gray-900 mb-2 flex items-center space-x-2">
                <Briefcase className="w-5 h-5 text-[#F9A03F]" />
                <span>Business Skills Reflection</span>
              </h3>
              <p className="text-sm text-gray-600 mb-4">
                Reflect on professional skills like communication, problem-solving, teamwork, and project management.
              </p>
              <Textarea
                placeholder="Describe your growth in business skills this quarter. What challenges did you overcome? How have you improved your professional capabilities?"
                value={responses.businessSkills}
                onChange={(e) => handleResponseChange('businessSkills', e.target.value)}
                className="min-h-[150px]"
              />
            </div>

            <div>
              <h3 className="text-gray-900 mb-2 flex items-center space-x-2">
                <Target className="w-5 h-5 text-[#3B6A52]" />
                <span>Key Achievements</span>
              </h3>
              <p className="text-sm text-gray-600 mb-4">
                What are you most proud of this quarter?
              </p>
              <Textarea
                placeholder="List your top 3-5 achievements from this quarter..."
                value={responses.achievements}
                onChange={(e) => handleResponseChange('achievements', e.target.value)}
                className="min-h-[120px]"
              />
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-gray-900 mb-2 flex items-center space-x-2">
                <Cloud className="w-5 h-5 text-[#2C6975]" />
                <span>Salesforce Skills Development</span>
              </h3>
              <p className="text-sm text-gray-600 mb-4">
                Based on your Pluralsight IQ Assessment scores and recent activities:
              </p>
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
                <p className="text-sm text-gray-700 mb-2">Your Current Salesforce IQ Scores:</p>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• Process Automation: <span className="text-[#3B6A52]">192 (Proficient)</span></li>
                  <li>• Salesforce Admin: <span className="text-[#3B6A52]">185 (Proficient)</span></li>
                  <li>• Reporting: <span className="text-[#F9A03F]">171 (Working)</span></li>
                  <li>• Data Management: <span className="text-[#F9A03F]">165 (Working)</span></li>
                </ul>
              </div>
              <Textarea
                placeholder="Reflect on your Salesforce skills growth. Which areas have you improved? Which need more focus? How have you applied these skills?"
                value={responses.salesforceSkills}
                onChange={(e) => handleResponseChange('salesforceSkills', e.target.value)}
                className="min-h-[150px]"
              />
            </div>

            <div>
              <h3 className="text-gray-900 mb-2 flex items-center space-x-2">
                <Brain className="w-5 h-5 text-[#7EB5C1]" />
                <span>Focused Skills Progress</span>
              </h3>
              <p className="text-sm text-gray-600 mb-4">
                Your focused skills: Lightning Web Components, Apex Programming, Integration Patterns
              </p>
              <Textarea
                placeholder="How have you progressed in your focused skills? What projects or assignments helped you develop these?"
                value={responses.focusedSkills}
                onChange={(e) => handleResponseChange('focusedSkills', e.target.value)}
                className="min-h-[120px]"
              />
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-gray-900 mb-2 flex items-center space-x-2">
                <Award className="w-5 h-5 text-[#F9A03F]" />
                <span>Certification Progress</span>
              </h3>
              <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-4">
                <p className="text-sm text-gray-700 mb-2">Active Certifications:</p>
                <ul className="text-sm text-gray-600 space-y-2">
                  <li>
                    <div className="flex items-center justify-between">
                      <span>Salesforce Certified Administrator</span>
                      <span className="text-[#3B6A52]">68% Complete</span>
                    </div>
                    <div className="text-xs text-gray-500">Target: May 1, 2025</div>
                  </li>
                  <li>
                    <div className="flex items-center justify-between">
                      <span>Platform App Builder</span>
                      <span className="text-gray-500">Planned</span>
                    </div>
                    <div className="text-xs text-gray-500">Target: June 1, 2025</div>
                  </li>
                </ul>
                <p className="text-sm text-gray-700 mt-3 mb-1">Certification Goals:</p>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• AWS Solutions Architect - Target: Aug 1, 2025</li>
                  <li>• JavaScript Developer I - Target: Sep 1, 2025</li>
                </ul>
              </div>
              <Textarea
                placeholder="Reflect on your certification journey. Are you on track? What challenges have you faced? What adjustments do you need to make?"
                value={responses.certificationProgress}
                onChange={(e) => handleResponseChange('certificationProgress', e.target.value)}
                className="min-h-[150px]"
              />
            </div>

            <div>
              <h3 className="text-gray-900 mb-2 flex items-center space-x-2">
                <AlertCircle className="w-5 h-5 text-[#F9A03F]" />
                <span>Challenges & Obstacles</span>
              </h3>
              <p className="text-sm text-gray-600 mb-4">
                What difficulties did you encounter? What support do you need?
              </p>
              <Textarea
                placeholder="Be honest about challenges you've faced. This helps your coach provide better support..."
                value={responses.challenges}
                onChange={(e) => handleResponseChange('challenges', e.target.value)}
                className="min-h-[120px]"
              />
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-gray-900 mb-2 flex items-center space-x-2">
                <TrendingUp className="w-5 h-5 text-[#2C6975]" />
                <span>Goals for Next Quarter</span>
              </h3>
              <p className="text-sm text-gray-600 mb-4">
                What do you want to accomplish in the next quarter? Be specific and realistic.
              </p>
              <Textarea
                placeholder="List 3-5 specific goals for next quarter. Consider: skills to develop, certifications to complete, projects to finish, career milestones..."
                value={responses.nextQuarterGoals}
                onChange={(e) => handleResponseChange('nextQuarterGoals', e.target.value)}
                className="min-h-[150px]"
              />
            </div>

            <div className="bg-[#F5F3E8] border border-[#F9A03F]/30 rounded-lg p-6">
              <h3 className="text-gray-900 mb-3">Assessment Summary</h3>
              <div className="space-y-2 text-sm">
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Business Skills</span>
                  <span className={responses.businessSkills ? 'text-[#3B6A52]' : 'text-gray-400'}>
                    {responses.businessSkills ? '✓ Complete' : 'Incomplete'}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Salesforce Skills</span>
                  <span className={responses.salesforceSkills ? 'text-[#3B6A52]' : 'text-gray-400'}>
                    {responses.salesforceSkills ? '✓ Complete' : 'Incomplete'}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Certification Progress</span>
                  <span className={responses.certificationProgress ? 'text-[#3B6A52]' : 'text-gray-400'}>
                    {responses.certificationProgress ? '✓ Complete' : 'Incomplete'}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Next Quarter Goals</span>
                  <span className={responses.nextQuarterGoals ? 'text-[#3B6A52]' : 'text-gray-400'}>
                    {responses.nextQuarterGoals ? '✓ Complete' : 'Incomplete'}
                  </span>
                </div>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  const isStepComplete = () => {
    switch (currentStep) {
      case 1:
        return responses.businessSkills && responses.achievements;
      case 2:
        return responses.salesforceSkills && responses.focusedSkills;
      case 3:
        return responses.certificationProgress && responses.challenges;
      case 4:
        return responses.nextQuarterGoals;
      default:
        return false;
    }
  };

  const allSectionsComplete = 
    responses.businessSkills && 
    responses.salesforceSkills && 
    responses.certificationProgress && 
    responses.nextQuarterGoals;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <button 
          onClick={() => onNavigate('profile')}
          className="flex items-center space-x-2 text-[#2C6975] hover:underline mb-4"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Profile</span>
        </button>
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-3xl text-gray-900 mb-2">Quarterly Self-Assessment</h2>
            <p className="text-gray-600">Q1 2025 • Due: March 31, 2025</p>
          </div>
          <button
            onClick={() => setShowPennyChat(!showPennyChat)}
            className="flex items-center space-x-2 bg-[#F9A03F] text-white px-4 py-2 rounded-lg hover:bg-[#e89335] transition-colors"
          >
            <Sparkles className="w-4 h-4" />
            <span>{showPennyChat ? 'Hide' : 'Ask'} Penny</span>
          </button>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Main Assessment Area */}
        <div className={`${showPennyChat ? 'lg:col-span-2' : 'lg:col-span-3'} space-y-6`}>
          {/* Progress Stepper */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-gray-600">Step {currentStep} of {totalSteps}</span>
              <span className="text-sm text-gray-600">{Math.round((currentStep / totalSteps) * 100)}% Complete</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2 mb-4">
              <div 
                className="bg-[#2C6975] h-2 rounded-full transition-all duration-500"
                style={{ width: `${(currentStep / totalSteps) * 100}%` }}
              ></div>
            </div>
            <div className="flex items-center justify-between">
              {[1, 2, 3, 4].map((step) => (
                <button
                  key={step}
                  onClick={() => setCurrentStep(step)}
                  className={`flex items-center justify-center w-10 h-10 rounded-full text-sm transition-colors ${
                    step === currentStep
                      ? 'bg-[#2C6975] text-white'
                      : step < currentStep
                      ? 'bg-[#3B6A52] text-white'
                      : 'bg-gray-200 text-gray-500'
                  }`}
                >
                  {step < currentStep ? <CheckCircle className="w-5 h-5" /> : step}
                </button>
              ))}
            </div>
            <div className="flex items-center justify-between mt-2">
              <span className="text-xs text-gray-600">Business</span>
              <span className="text-xs text-gray-600">Salesforce</span>
              <span className="text-xs text-gray-600">Certification</span>
              <span className="text-xs text-gray-600">Goals</span>
            </div>
          </div>

          {/* Assessment Content */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            {renderStep()}

            {/* Navigation Buttons */}
            <div className="flex items-center justify-between mt-8 pt-6 border-t border-gray-200">
              <Button
                onClick={() => setCurrentStep(Math.max(1, currentStep - 1))}
                disabled={currentStep === 1}
                variant="outline"
              >
                Previous
              </Button>

              {currentStep < totalSteps ? (
                <Button
                  onClick={() => setCurrentStep(currentStep + 1)}
                  disabled={!isStepComplete()}
                  className="bg-[#2C6975] hover:bg-[#234f57]"
                >
                  Next Step
                </Button>
              ) : (
                <Button
                  onClick={() => {
                    // Handle submission
                    alert('Assessment submitted! Your coach will review it soon.');
                    onNavigate('profile');
                  }}
                  disabled={!allSectionsComplete}
                  className="bg-[#3B6A52] hover:bg-[#2d5240]"
                >
                  Submit Assessment
                </Button>
              )}
            </div>
          </div>
        </div>

        {/* Penny AI Assistant Sidebar */}
        {showPennyChat && (
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 h-[600px] flex flex-col sticky top-6">
              <div className="p-4 border-b border-gray-200 bg-gradient-to-r from-[#F9A03F] to-[#F9A03F]/80 rounded-t-xl">
                <div className="flex items-center space-x-2">
                  <Sparkles className="w-5 h-5 text-white" />
                  <h3 className="text-white">Penny AI Assistant</h3>
                </div>
                <p className="text-xs text-white/90 mt-1">I'm here to help you reflect and write</p>
              </div>

              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {pennyMessages.map((msg) => (
                  <div
                    key={msg.id}
                    className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-[80%] rounded-lg p-3 ${
                        msg.sender === 'user'
                          ? 'bg-[#2C6975] text-white'
                          : 'bg-gray-100 text-gray-900'
                      }`}
                    >
                      <p className="text-sm">{msg.text}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="p-4 border-t border-gray-200">
                <div className="flex items-center space-x-2">
                  <input
                    type="text"
                    value={pennyInput}
                    onChange={(e) => setPennyInput(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handlePennySend()}
                    placeholder="Ask Penny for help..."
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2C6975] text-sm"
                  />
                  <button
                    onClick={handlePennySend}
                    className="bg-[#2C6975] text-white p-2 rounded-lg hover:bg-[#234f57] transition-colors"
                  >
                    <Send className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
