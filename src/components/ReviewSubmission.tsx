import { useState } from 'react';
import { ArrowLeft, Star, Save, Send, AlertCircle, Info, Award } from 'lucide-react';
import { PageType } from '../App';
import { SectionHeader } from './SectionHeader';
import { Button } from './ui/button';
import { Textarea } from './ui/textarea';
import { Label } from './ui/label';
import { Alert, AlertDescription } from './ui/alert';
import { Progress } from './ui/progress';
import { Badge } from './ui/badge';

interface ReviewSubmissionProps {
  assignment: {
    id: string;
    project: {
      id: string;
      title: string;
      author: string;
      trail: string;
      description: string;
      technologies: string[];
    };
    dueDate: string;
  };
  onBack: () => void;
  onSubmit: (reviewData: ReviewData) => void;
  onNavigate: (page: PageType) => void;
}

interface ReviewData {
  ratings: {
    codeQuality: number;
    functionality: number;
    uxDesign: number;
    documentation: number;
    innovation: number;
  };
  feedback: {
    codeQuality: string;
    functionality: string;
    uxDesign: string;
    documentation: string;
    innovation: string;
    overall: string;
  };
  overallRating: number;
}

const reviewCategories = [
  {
    id: 'codeQuality',
    name: 'Code Quality',
    description: 'Clean code, best practices, maintainability, error handling',
    icon: '💻',
    color: '#2C6975',
    guidelines: [
      'Follows Salesforce best practices',
      'Proper error handling and edge cases',
      'Code is well-organized and maintainable',
      'Appropriate use of design patterns',
      'No code smells or anti-patterns',
    ],
  },
  {
    id: 'functionality',
    name: 'Functionality',
    description: 'Features work correctly, requirements met, no bugs',
    icon: '⚙️',
    color: '#3B6A52',
    guidelines: [
      'All requirements are implemented',
      'Features work as expected',
      'No critical bugs or errors',
      'Handles edge cases appropriately',
      'Data flows correctly through system',
    ],
  },
  {
    id: 'uxDesign',
    name: 'UX/Design',
    description: 'User interface, usability, accessibility, visual design',
    icon: '🎨',
    color: '#7EB5C1',
    guidelines: [
      'Intuitive and easy to use',
      'Consistent visual design',
      'Good accessibility practices',
      'Responsive and mobile-friendly',
      'Follows Lightning Design System',
    ],
  },
  {
    id: 'documentation',
    name: 'Documentation',
    description: 'Code comments, README, setup instructions, usage guide',
    icon: '📚',
    color: '#F9A03F',
    guidelines: [
      'Clear README with setup instructions',
      'Code is well-commented',
      'Architecture is documented',
      'Usage examples provided',
      'Deployment guide included',
    ],
  },
  {
    id: 'innovation',
    name: 'Innovation',
    description: 'Creative solutions, advanced features, unique approach',
    icon: '💡',
    color: '#666',
    guidelines: [
      'Creative problem-solving',
      'Goes beyond basic requirements',
      'Thoughtful feature additions',
      'Innovative use of technology',
      'Shows technical depth',
    ],
  },
];

export function ReviewSubmission({ assignment, onBack, onSubmit, onNavigate }: ReviewSubmissionProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [ratings, setRatings] = useState<ReviewData['ratings']>({
    codeQuality: 0,
    functionality: 0,
    uxDesign: 0,
    documentation: 0,
    innovation: 0,
  });
  const [feedback, setFeedback] = useState<ReviewData['feedback']>({
    codeQuality: '',
    functionality: '',
    uxDesign: '',
    documentation: '',
    innovation: '',
    overall: '',
  });
  const [hoveredRating, setHoveredRating] = useState<{ [key: string]: number }>({});

  const currentCategory = reviewCategories[currentStep];
  const isLastStep = currentStep === reviewCategories.length;
  const completedSteps = Object.values(ratings).filter((r) => r > 0).length;
  const progress = (completedSteps / reviewCategories.length) * 100;

  const handleNext = () => {
    if (currentStep < reviewCategories.length) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    } else {
      onBack();
    }
  };

  const handleSubmit = () => {
    const overallRating =
      Object.values(ratings).reduce((sum, r) => sum + r, 0) / reviewCategories.length;

    onSubmit({
      ratings,
      feedback,
      overallRating,
    });
  };

  const canProceed = () => {
    if (isLastStep) {
      return (
        completedSteps === reviewCategories.length &&
        feedback.overall.length >= 50
      );
    }
    return ratings[currentCategory.id as keyof typeof ratings] > 0;
  };

  return (
    <div className="min-h-screen bg-[#F5F3E8] pb-20">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <button
            onClick={handleBack}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-4"
          >
            <ArrowLeft className="w-4 h-4" />
            {currentStep === 0 ? 'Back to Assignments' : 'Previous'}
          </button>

          <SectionHeader
            icon={Star}
            title={`Review: ${assignment.project.title}`}
            subtitle={`by ${assignment.project.author} • ${assignment.project.trail}`}
            color="#F9A03F"
          />

          {/* Progress */}
          <div className="mt-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-gray-600">
                Step {currentStep + 1} of {reviewCategories.length + 1}
              </span>
              <span className="text-sm text-gray-900">
                {completedSteps}/{reviewCategories.length} categories rated
              </span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Review Guidelines */}
        <Alert className="mb-6">
          <Info className="h-4 w-4" />
          <AlertDescription>
            <strong>Quality Review Tips:</strong>
            <ul className="list-disc list-inside mt-2 space-y-1 text-sm">
              <li>Be constructive and specific in your feedback</li>
              <li>Highlight both strengths and areas for improvement</li>
              <li>Provide actionable suggestions when possible</li>
              <li>Be respectful and encouraging</li>
              <li>Write at least 50 characters per category</li>
            </ul>
          </AlertDescription>
        </Alert>

        {!isLastStep ? (
          /* Category Rating Step */
          <div className="bg-white rounded-xl border border-gray-200 p-8">
            {/* Category Header */}
            <div className="mb-8 text-center">
              <div className="text-6xl mb-4">{currentCategory.icon}</div>
              <h2
                className="text-2xl text-gray-900 mb-2"
                style={{ color: currentCategory.color }}
              >
                {currentCategory.name}
              </h2>
              <p className="text-gray-600 mb-6">{currentCategory.description}</p>

              {/* Rating Stars */}
              <div className="flex items-center justify-center gap-3 mb-6">
                {[1, 2, 3, 4, 5].map((rating) => (
                  <button
                    key={rating}
                    onMouseEnter={() =>
                      setHoveredRating({ ...hoveredRating, [currentCategory.id]: rating })
                    }
                    onMouseLeave={() =>
                      setHoveredRating({ ...hoveredRating, [currentCategory.id]: 0 })
                    }
                    onClick={() =>
                      setRatings({ ...ratings, [currentCategory.id]: rating })
                    }
                    className="transition-transform hover:scale-110"
                  >
                    <Star
                      className={`w-12 h-12 ${
                        rating <=
                        (hoveredRating[currentCategory.id] ||
                          ratings[currentCategory.id as keyof typeof ratings])
                          ? 'fill-current text-[#F9A03F]'
                          : 'text-gray-300'
                      }`}
                    />
                  </button>
                ))}
              </div>

              {ratings[currentCategory.id as keyof typeof ratings] > 0 && (
                <div className="text-lg text-gray-900 mb-4">
                  Rating:{' '}
                  <span className="text-[#F9A03F]">
                    {ratings[currentCategory.id as keyof typeof ratings]} / 5
                  </span>
                  {' - '}
                  {ratings[currentCategory.id as keyof typeof ratings] === 5
                    ? 'Excellent!'
                    : ratings[currentCategory.id as keyof typeof ratings] === 4
                    ? 'Very Good'
                    : ratings[currentCategory.id as keyof typeof ratings] === 3
                    ? 'Good'
                    : ratings[currentCategory.id as keyof typeof ratings] === 2
                    ? 'Needs Work'
                    : 'Poor'}
                </div>
              )}
            </div>

            {/* Guidelines */}
            <div className="bg-gray-50 rounded-lg p-6 mb-6">
              <h3 className="text-gray-900 mb-3">Evaluation Guidelines</h3>
              <ul className="space-y-2">
                {currentCategory.guidelines.map((guideline, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-sm text-gray-700">
                    <span className="text-[#F9A03F] mt-1">•</span>
                    <span>{guideline}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Feedback */}
            <div>
              <Label htmlFor="feedback" className="text-gray-900 mb-2 block">
                Detailed Feedback *
              </Label>
              <p className="text-sm text-gray-600 mb-3">
                Explain your rating. What did the developer do well? What could be improved?
              </p>
              <Textarea
                id="feedback"
                rows={6}
                placeholder={`Example: "The code structure is excellent with clear separation of concerns. The error handling is thorough. Consider adding more inline comments to explain complex logic..."`}
                value={feedback[currentCategory.id as keyof typeof feedback]}
                onChange={(e) =>
                  setFeedback({
                    ...feedback,
                    [currentCategory.id]: e.target.value,
                  })
                }
                className="mb-2"
              />
              <p className="text-xs text-gray-500">
                {feedback[currentCategory.id as keyof typeof feedback].length} / 50 characters
                minimum
              </p>
            </div>
          </div>
        ) : (
          /* Overall Summary Step */
          <div className="bg-white rounded-xl border border-gray-200 p-8">
            <h2 className="text-2xl text-gray-900 mb-6 text-center">Review Summary</h2>

            {/* Overall Rating */}
            <div className="text-center mb-8">
              <div className="flex items-center justify-center gap-2 text-[#F9A03F] mb-2">
                <Star className="w-8 h-8 fill-current" />
                <span className="text-4xl">
                  {(
                    Object.values(ratings).reduce((sum, r) => sum + r, 0) /
                    reviewCategories.length
                  ).toFixed(1)}
                </span>
              </div>
              <p className="text-gray-600">Overall Rating</p>
            </div>

            {/* Category Breakdown */}
            <div className="grid grid-cols-5 gap-4 mb-8">
              {reviewCategories.map((category) => (
                <div key={category.id} className="text-center">
                  <div className="text-3xl mb-2">{category.icon}</div>
                  <div className="text-2xl text-gray-900 mb-1">
                    {ratings[category.id as keyof typeof ratings]}
                  </div>
                  <div className="text-xs text-gray-600">{category.name}</div>
                </div>
              ))}
            </div>

            {/* Overall Comments */}
            <div className="mb-6">
              <Label htmlFor="overall" className="text-gray-900 mb-2 block">
                Overall Summary *
              </Label>
              <p className="text-sm text-gray-600 mb-3">
                Summarize your review and provide final thoughts or recommendations.
              </p>
              <Textarea
                id="overall"
                rows={8}
                placeholder="Provide an overall summary of the project. What are the main strengths? What are the key areas for improvement? Any final recommendations?"
                value={feedback.overall}
                onChange={(e) =>
                  setFeedback({
                    ...feedback,
                    overall: e.target.value,
                  })
                }
                className="mb-2"
              />
              <p className="text-xs text-gray-500">
                {feedback.overall.length} / 50 characters minimum
              </p>
            </div>

            {/* Reward */}
            <div className="bg-gradient-to-r from-[#F9A03F] to-[#f89520] rounded-lg p-6 text-white text-center">
              <Award className="w-8 h-8 mx-auto mb-2" />
              <h3 className="text-xl mb-1">Earn 50 Points</h3>
              <p className="text-sm opacity-90">
                Submit this quality review to help your peer and earn points
              </p>
            </div>
          </div>
        )}

        {/* Navigation */}
        <div className="flex items-center justify-between mt-6">
          <Button variant="outline" onClick={handleBack}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            {currentStep === 0 ? 'Cancel' : 'Previous'}
          </Button>

          {!isLastStep ? (
            <Button
              onClick={handleNext}
              disabled={!canProceed()}
              className="bg-[#F9A03F] hover:bg-[#f89520] text-white"
            >
              Next Category
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Button>
          ) : (
            <Button
              onClick={handleSubmit}
              disabled={!canProceed()}
              className="bg-[#3B6A52] hover:bg-[#2d5440] text-white"
            >
              <Send className="w-4 h-4 mr-2" />
              Submit Review
            </Button>
          )}
        </div>

        {/* Step Indicator */}
        <div className="flex items-center justify-center gap-2 mt-8">
          {reviewCategories.map((category, idx) => (
            <button
              key={category.id}
              onClick={() => setCurrentStep(idx)}
              className={`w-10 h-10 rounded-full flex items-center justify-center text-sm transition-all ${
                ratings[category.id as keyof typeof ratings] > 0
                  ? 'bg-[#3B6A52] text-white'
                  : idx === currentStep
                  ? 'bg-[#F9A03F] text-white'
                  : 'bg-gray-200 text-gray-600'
              }`}
            >
              {idx + 1}
            </button>
          ))}
          <button
            onClick={() => setCurrentStep(reviewCategories.length)}
            className={`w-10 h-10 rounded-full flex items-center justify-center text-sm transition-all ${
              isLastStep
                ? 'bg-[#F9A03F] text-white'
                : completedSteps === reviewCategories.length
                ? 'bg-[#3B6A52] text-white'
                : 'bg-gray-200 text-gray-600'
            }`}
          >
            ✓
          </button>
        </div>
      </div>
    </div>
  );
}
