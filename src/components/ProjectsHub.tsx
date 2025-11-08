import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Briefcase, Users, Award, Sparkles, Zap, Star, ArrowRight } from 'lucide-react';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { MyCapstone } from './MyCapstone';
import { PartnerBoard } from './PartnerBoard';
import { TeamProjects } from './TeamProjects';
import { PartnerSubmissionModal } from './PartnerSubmissionModal';
import { TrailBuildSummit } from './TrailBuildSummit';

interface ProjectsHubProps {
  userRole?: 'learner' | 'coach' | 'partner';
  capstoneComplete?: boolean;
  onCapstoneComplete?: () => void;
  onNavigate?: (page: any) => void;
}

export function ProjectsHub({ userRole = 'learner', capstoneComplete = false, onCapstoneComplete, onNavigate }: ProjectsHubProps) {
  const [activeTab, setActiveTab] = useState('capstone');
  const [showPartnerSubmission, setShowPartnerSubmission] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);

  const handleCapstoneComplete = () => {
    setShowConfetti(true);
    setTimeout(() => setShowConfetti(false), 5000);
    if (onCapstoneComplete) {
      onCapstoneComplete();
    }
  };

  return (
    <div className="min-h-screen bg-[#F5F3E8] pb-12">
      {/* Confetti Animation */}
      {showConfetti && (
        <div className="fixed inset-0 pointer-events-none z-50">
          <div className="absolute inset-0 overflow-hidden">
            {[...Array(50)].map((_, i) => (
              <div
                key={i}
                className="absolute animate-confetti"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: '-10%',
                  animationDelay: `${Math.random() * 3}s`,
                  animationDuration: `${3 + Math.random() * 2}s`
                }}
              >
                <div
                  className="w-2 h-2 rounded-full"
                  style={{
                    backgroundColor: ['#2C6975', '#F9A03F', '#7EB5C1', '#3B6A52'][Math.floor(Math.random() * 4)]
                  }}
                />
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Header */}
      <div className="bg-gradient-to-r from-[#3B6A52] to-[#2C6975] text-white py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <Badge className="bg-[#F9A03F] text-white mb-4 px-4 py-1.5">
                <Briefcase className="w-4 h-4 mr-2" />
                Projects & Impact
              </Badge>
              <h1 className="text-5xl mb-4">Build Real Solutions</h1>
              <p className="text-xl text-white/90 mb-6 max-w-3xl">
                Build, collaborate, and deliver meaningful Salesforce solutions. Start with your Capstone, 
                join Partner Projects, and participate in TrailBuild Summit events.
              </p>
            </div>
            
            {userRole === 'partner' && (
              <button
                onClick={() => setShowPartnerSubmission(true)}
                className="px-6 py-3 bg-[#F9A03F] text-white rounded-lg hover:bg-[#e89135] transition-all shadow-lg flex items-center space-x-2"
              >
                <Sparkles className="w-5 h-5" />
                <span>Submit Project</span>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Peer Review Feature Card */}
      {onNavigate && capstoneComplete && (
        <div className="max-w-7xl mx-auto px-4 -mt-6 mb-6">
          <div className="bg-gradient-to-r from-[#F9A03F] to-[#f89520] rounded-xl shadow-lg p-6">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <div className="bg-white/20 backdrop-blur-sm p-2 rounded-lg">
                    <Star className="w-5 h-5 text-white" />
                  </div>
                  <Badge className="bg-white text-[#F9A03F] border-0">
                    Phase 2 Feature
                  </Badge>
                </div>
                <h3 className="text-white text-xl mb-1">Get Peer Feedback on Your Capstone</h3>
                <p className="text-white/90 text-sm mb-3 max-w-2xl">
                  Receive structured reviews from peers on your capstone project. Review others' work to earn 50 points per review and climb the leaderboard!
                </p>
                <div className="flex flex-wrap gap-2 mb-3">
                  <div className="flex items-center gap-1 text-white/90 text-xs">
                    <span className="text-white">✓</span>
                    <span>5-category rubric</span>
                  </div>
                  <div className="flex items-center gap-1 text-white/90 text-xs">
                    <span className="text-white">✓</span>
                    <span>Detailed feedback</span>
                  </div>
                  <div className="flex items-center gap-1 text-white/90 text-xs">
                    <span className="text-white">✓</span>
                    <span>Earn reviewer badges</span>
                  </div>
                </div>
                <Button
                  onClick={() => onNavigate('peer-reviews')}
                  className="bg-white text-[#F9A03F] hover:bg-gray-100"
                  size="sm"
                >
                  Open Peer Reviews
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </div>
              <div className="hidden lg:block">
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 space-y-2 min-w-[140px]">
                  <div className="text-white/80 text-xs">Your Stats</div>
                  <div className="flex items-baseline gap-1">
                    <span className="text-2xl text-white">2</span>
                    <span className="text-sm text-white/80">pending</span>
                  </div>
                  <div className="flex items-baseline gap-1">
                    <span className="text-2xl text-white">8</span>
                    <span className="text-sm text-white/80">completed</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tabs */}
      <div className="max-w-7xl mx-auto px-4 -mt-6">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="bg-white rounded-xl shadow-sm border border-gray-200 p-1.5 inline-flex">
            <TabsTrigger 
              value="capstone" 
              className="flex items-center space-x-2 data-[state=active]:bg-[#2C6975] data-[state=active]:text-white"
            >
              <Award className="w-4 h-4" />
              <span>My Capstone</span>
            </TabsTrigger>
            <TabsTrigger 
              value="partner" 
              className="flex items-center space-x-2 data-[state=active]:bg-[#F9A03F] data-[state=active]:text-white"
              disabled={!capstoneComplete && userRole === 'learner'}
            >
              <Briefcase className="w-4 h-4" />
              <span>Partner Board</span>
              {!capstoneComplete && userRole === 'learner' && (
                <Badge className="bg-gray-200 text-gray-600 text-xs ml-2">Locked</Badge>
              )}
            </TabsTrigger>
            <TabsTrigger 
              value="team" 
              className="flex items-center space-x-2 data-[state=active]:bg-[#3B6A52] data-[state=active]:text-white"
            >
              <Users className="w-4 h-4" />
              <span>My Team Projects</span>
            </TabsTrigger>
            <TabsTrigger 
              value="summit" 
              className="flex items-center space-x-2 data-[state=active]:bg-gradient-to-r data-[state=active]:from-[#F9A03F] data-[state=active]:to-[#e89135] data-[state=active]:text-white"
            >
              <Zap className="w-4 h-4" />
              <span>TrailBuild Summit</span>
            </TabsTrigger>
          </TabsList>

          <div className="mt-8">
            <TabsContent value="capstone">
              <MyCapstone 
                onComplete={handleCapstoneComplete}
                capstoneComplete={capstoneComplete}
                onNavigateToPartner={() => setActiveTab('partner')}
              />
            </TabsContent>

            <TabsContent value="partner">
              <PartnerBoard userRole={userRole} />
            </TabsContent>

            <TabsContent value="team">
              <TeamProjects />
            </TabsContent>

            <TabsContent value="summit">
              <TrailBuildSummit userRole={userRole} />
            </TabsContent>
          </div>
        </Tabs>
      </div>

      {/* Partner Submission Modal */}
      {showPartnerSubmission && (
        <PartnerSubmissionModal onClose={() => setShowPartnerSubmission(false)} />
      )}

      <style>{`
        @keyframes confetti {
          0% {
            transform: translateY(0) rotate(0deg);
            opacity: 1;
          }
          100% {
            transform: translateY(100vh) rotate(720deg);
            opacity: 0;
          }
        }
        .animate-confetti {
          animation: confetti linear forwards;
        }
      `}</style>
    </div>
  );
}
