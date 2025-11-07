import { useState } from 'react';
import { CheckCircle, Circle, FileText, Target, Lightbulb, Code, ArrowRight, Sparkles } from 'lucide-react';
import { Badge } from './ui/badge';
import { PennyGuideMode } from './PennyGuideMode';

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
