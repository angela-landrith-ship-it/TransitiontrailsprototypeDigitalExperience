import { ArrowLeft, Star, ThumbsUp, MessageSquare, Download, Share2, Award } from 'lucide-react';
import { PageType } from '../App';
import { SectionHeader } from './SectionHeader';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Avatar, AvatarFallback } from './ui/avatar';
import { Progress } from './ui/progress';

interface ReviewDetailProps {
  review: {
    id: string;
    reviewer: {
      name: string;
      avatar: string;
      badge: string;
      reviewCount: number;
    };
    project: {
      title: string;
      trail: string;
    };
    submittedDate: string;
    overallRating: number;
    categories: {
      codeQuality: number;
      functionality: number;
      uxDesign: number;
      documentation: number;
      innovation: number;
    };
    summary: string;
  };
  onBack: () => void;
  onNavigate: (page: PageType) => void;
}

const categoryDetails = [
  {
    id: 'codeQuality',
    name: 'Code Quality',
    icon: '💻',
    color: '#2C6975',
    feedback: 'Your code demonstrates excellent organization and follows Salesforce best practices. The separation of concerns is clear, and error handling is thorough. Consider adding more inline comments to explain complex business logic, especially in the trigger handler classes.',
  },
  {
    id: 'functionality',
    name: 'Functionality',
    icon: '⚙️',
    color: '#3B6A52',
    feedback: 'All requirements are fully implemented and working correctly. The donation tracking system handles edge cases well, including duplicate detection and validation. The automated email notifications are a great addition.',
  },
  {
    id: 'uxDesign',
    name: 'UX/Design',
    icon: '🎨',
    color: '#7EB5C1',
    feedback: 'The user interface is clean and intuitive, following Lightning Design System guidelines. The dashboard provides excellent visibility into key metrics. Consider adding more visual feedback for user actions (e.g., success toasts after form submissions).',
  },
  {
    id: 'documentation',
    name: 'Documentation',
    icon: '📚',
    color: '#F9A03F',
    feedback: 'Documentation is comprehensive with clear setup instructions and usage examples. The README is well-structured. Adding a troubleshooting section and API documentation would make this even better.',
  },
  {
    id: 'innovation',
    name: 'Innovation',
    icon: '💡',
    color: '#666',
    feedback: 'Love the creative use of Einstein Analytics for donation trend predictions! The automated thank-you email system with personalized merge fields shows thoughtful feature design. The integration with Eventbrite for volunteer management is innovative.',
  },
];

export function ReviewDetail({ review, onBack, onNavigate }: ReviewDetailProps) {
  return (
    <div className="min-h-screen bg-[#F5F3E8] pb-20">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-4"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Reviews
          </button>

          <SectionHeader
            icon={Star}
            title={`Review: ${review.project.title}`}
            subtitle={review.project.trail}
            color="#F9A03F"
          />

          {/* Reviewer Info */}
          <div className="flex items-start justify-between mt-6">
            <div className="flex items-center gap-3">
              <Avatar className="w-12 h-12">
                <AvatarFallback className="bg-[#2C6975] text-white">
                  {review.reviewer.avatar}
                </AvatarFallback>
              </Avatar>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-gray-900">{review.reviewer.name}</span>
                  <Badge
                    variant="outline"
                    style={{
                      backgroundColor: '#F9A03F15',
                      color: '#F9A03F',
                      borderColor: '#F9A03F30',
                    }}
                  >
                    {review.reviewer.badge}
                  </Badge>
                </div>
                <div className="text-sm text-gray-600">
                  {review.reviewer.reviewCount} reviews • Reviewed {review.submittedDate}
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm">
                <MessageSquare className="w-4 h-4 mr-2" />
                Message
              </Button>
              <Button variant="outline" size="sm">
                <Share2 className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Overall Rating Card */}
        <div className="bg-gradient-to-r from-[#F9A03F] to-[#f89520] rounded-xl p-8 text-white mb-6">
          <div className="text-center">
            <div className="flex items-center justify-center gap-3 mb-2">
              <Star className="w-10 h-10 fill-current" />
              <span className="text-5xl">{review.overallRating}</span>
            </div>
            <h3 className="text-xl mb-4">Overall Rating</h3>
            <p className="text-lg opacity-90 max-w-2xl mx-auto">{review.summary}</p>
          </div>
        </div>

        {/* Category Ratings Overview */}
        <div className="bg-white rounded-xl border border-gray-200 p-6 mb-6">
          <h3 className="text-gray-900 mb-4">Category Breakdown</h3>
          <div className="grid grid-cols-5 gap-4">
            {categoryDetails.map((category) => (
              <div key={category.id} className="text-center">
                <div className="text-3xl mb-2">{category.icon}</div>
                <div
                  className="text-2xl mb-1"
                  style={{ color: category.color }}
                >
                  {review.categories[category.id as keyof typeof review.categories]}
                </div>
                <div className="text-xs text-gray-600">{category.name}</div>
                <div className="mt-2">
                  <Progress
                    value={(review.categories[category.id as keyof typeof review.categories] / 5) * 100}
                    className="h-1"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Detailed Feedback by Category */}
        <div className="space-y-4 mb-6">
          {categoryDetails.map((category) => (
            <div key={category.id} className="bg-white rounded-xl border border-gray-200 p-6">
              <div className="flex items-start gap-4 mb-4">
                <div className="text-4xl">{category.icon}</div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-gray-900" style={{ color: category.color }}>
                      {category.name}
                    </h3>
                    <div className="flex items-center gap-1">
                      {[...Array(5)].map((_, idx) => (
                        <Star
                          key={idx}
                          className={`w-5 h-5 ${
                            idx < review.categories[category.id as keyof typeof review.categories]
                              ? 'fill-current text-[#F9A03F]'
                              : 'text-gray-300'
                          }`}
                        />
                      ))}
                      <span className="ml-2 text-gray-900">
                        {review.categories[category.id as keyof typeof review.categories]}/5
                      </span>
                    </div>
                  </div>
                  <p className="text-gray-700 leading-relaxed">{category.feedback}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Key Strengths & Areas for Improvement */}
        <div className="grid md:grid-cols-2 gap-6 mb-6">
          <div className="bg-green-50 border border-green-200 rounded-xl p-6">
            <h3 className="text-green-900 mb-3 flex items-center gap-2">
              <ThumbsUp className="w-5 h-5" />
              Key Strengths
            </h3>
            <ul className="space-y-2 text-sm text-green-800">
              <li className="flex items-start gap-2">
                <span className="text-green-600 mt-1">✓</span>
                <span>Excellent code organization and best practices</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-600 mt-1">✓</span>
                <span>All requirements fully implemented</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-600 mt-1">✓</span>
                <span>Intuitive UX following Lightning Design System</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-600 mt-1">✓</span>
                <span>Innovative use of Einstein Analytics</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-600 mt-1">✓</span>
                <span>Comprehensive documentation</span>
              </li>
            </ul>
          </div>

          <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
            <h3 className="text-blue-900 mb-3 flex items-center gap-2">
              <Award className="w-5 h-5" />
              Areas for Growth
            </h3>
            <ul className="space-y-2 text-sm text-blue-800">
              <li className="flex items-start gap-2">
                <span className="text-blue-600 mt-1">→</span>
                <span>Add more inline comments for complex logic</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-600 mt-1">→</span>
                <span>Include success toasts for better user feedback</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-600 mt-1">→</span>
                <span>Add troubleshooting section to documentation</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-600 mt-1">→</span>
                <span>Consider API documentation for integrations</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-600 mt-1">→</span>
                <span>Add more unit test coverage for edge cases</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Action to Acknowledge */}
        <div className="bg-white rounded-xl border border-gray-200 p-6 text-center">
          <h3 className="text-gray-900 mb-3">Was this review helpful?</h3>
          <p className="text-gray-600 text-sm mb-4">
            Let {review.reviewer.name} know their feedback was valuable
          </p>
          <div className="flex items-center justify-center gap-3">
            <Button className="bg-[#3B6A52] hover:bg-[#2d5440] text-white">
              <ThumbsUp className="w-4 h-4 mr-2" />
              Mark as Helpful
            </Button>
            <Button variant="outline">
              <MessageSquare className="w-4 h-4 mr-2" />
              Respond to Reviewer
            </Button>
            <Button variant="outline">
              <Download className="w-4 h-4 mr-2" />
              Export Review
            </Button>
          </div>
        </div>

        {/* Next Steps */}
        <div className="mt-6 bg-gradient-to-r from-[#2C6975] to-[#7EB5C1] rounded-xl p-6 text-white">
          <h3 className="text-xl mb-2">Next Steps</h3>
          <p className="text-sm opacity-90 mb-4">
            Use this feedback to improve your project and grow your skills!
          </p>
          <div className="flex flex-wrap gap-3">
            <Button
              variant="outline"
              className="bg-white/10 border-white/30 text-white hover:bg-white/20"
            >
              Update Project
            </Button>
            <Button
              variant="outline"
              className="bg-white/10 border-white/30 text-white hover:bg-white/20"
            >
              View All Reviews
            </Button>
            <Button
              variant="outline"
              className="bg-white/10 border-white/30 text-white hover:bg-white/20"
              onClick={() => onNavigate('capstone-projects')}
            >
              Back to Projects
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
