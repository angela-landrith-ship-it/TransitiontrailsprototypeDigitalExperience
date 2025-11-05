import { useState } from 'react';
import { Linkedin, Sparkles, Copy, Share2, X, Check } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from './ui/dialog';
import { Textarea } from './ui/textarea';
import { Badge } from './ui/badge';
import { toast } from 'sonner@2.0.3';

interface ShareToLinkedInProps {
  isOpen: boolean;
  onClose: () => void;
  context: 'mission' | 'assessment' | 'capstone' | 'certification';
  title: string;
  achievement?: string;
  onShare?: () => void;
}

export function ShareToLinkedIn({ isOpen, onClose, context, title, achievement, onShare }: ShareToLinkedInProps) {
  const [selectedTone, setSelectedTone] = useState<'professional' | 'excited' | 'reflective'>('professional');
  const [postText, setPostText] = useState('');
  const [isSharing, setIsSharing] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);

  const tones = [
    { id: 'professional' as const, label: 'Professional', emoji: '💼', description: 'Focused and career-oriented' },
    { id: 'excited' as const, label: 'Excited', emoji: '🚀', description: 'Enthusiastic and celebratory' },
    { id: 'reflective' as const, label: 'Reflective', emoji: '💭', description: 'Thoughtful and growth-focused' },
  ];

  // Generate post based on context and tone
  const generatePost = () => {
    const hashtags = '#TransitionTrails #Trailblazer #NonprofitCloud #SalesforceLearning #AIJourney #CareerTransition';
    
    const posts = {
      mission: {
        professional: `I'm proud to share that I've completed the "${title}" mission in my Salesforce journey with Transition Trails.\n\nThis experience has strengthened my skills in ${achievement || 'key Salesforce concepts'} and brought me closer to my career transition goals.\n\nGrateful for the structured learning path and supportive community that's helping me build the expertise needed for a successful Salesforce career.\n\n${hashtags}`,
        
        excited: `🎉 Just crushed the "${title}" mission! 🎉\n\nEvery completed mission brings me one step closer to my dream Salesforce career. The hands-on practice and real-world scenarios in Transition Trails are incredible!\n\n${achievement ? `Key win: ${achievement}` : 'The learning never stops, and I\'m loving every minute of it!'}\n\nShoutout to my cohort and coaches for the amazing support. Let's keep building! 🚀\n\n${hashtags}`,
        
        reflective: `Reflecting on my progress with Transition Trails...\n\nCompleting the "${title}" mission today reminded me why I started this journey. Coming from a nonprofit background, I'm learning that technical skills combined with mission-driven work can create real impact.\n\n${achievement || 'This mission challenged me to think differently'}, and I'm grateful for the growth.\n\nTo anyone considering a career transition: it's challenging, rewarding, and absolutely worth it.\n\n${hashtags}`,
      },
      assessment: {
        professional: `Completed my Skills Assessment in ${title} with Transition Trails.\n\nKey areas of growth:\n• ${achievement || 'Technical proficiency in Salesforce'}\n• Problem-solving in real-world scenarios\n• Application of best practices\n\nContinuous learning and validation are essential in tech careers. This assessment helped me identify strengths and areas for development as I progress toward certification.\n\n${hashtags}`,
        
        excited: `📊 Skills Assessment: COMPLETED! 📊\n\nJust finished my ${title} assessment and I'm blown away by how much I've learned!\n\n${achievement || 'The hands-on scenarios really tested my knowledge'} and showed me I\'m ready for the next challenge.\n\nFeeling pumped about my progress! Who else is on their certification journey? Let's connect! 💪\n\n${hashtags}`,
        
        reflective: `Today's ${title} Skills Assessment was more than a test—it was a mirror.\n\nIt showed me how far I've come from my nonprofit days. ${achievement || 'The technical concepts that once seemed foreign now feel natural'}.\n\nEvery assessment, every mission, every struggle is shaping me into the Salesforce professional I'm becoming.\n\nThe path isn't linear, but it's forward.\n\n${hashtags}`,
      },
      capstone: {
        professional: `Milestone achieved: ${title}\n\nI'm making solid progress on my capstone project with Transition Trails, building a real-world Salesforce solution for a nonprofit organization.\n\n${achievement || 'This hands-on experience is bridging the gap between learning and professional application.'}\n\nKey focus areas:\n• Custom Salesforce development\n• Stakeholder collaboration\n• Solution architecture\n• Best practices implementation\n\nExcited to bring this solution to life and demonstrate the impact of combining technical skills with mission-driven work.\n\n${hashtags}`,
        
        excited: `🏗️ CAPSTONE UPDATE: ${title}! 🏗️\n\nMy capstone project is coming to LIFE! Building a real Salesforce solution for a nonprofit and it's absolutely amazing!\n\n${achievement || 'Every line of code, every flow, every custom object—it\'s all coming together!'}\n\nThis is what I trained for. This is where theory meets reality. And I'm HERE FOR IT! 🎯\n\nCan't wait to share the final product!\n\n${hashtags}`,
        
        reflective: `Progress update on my capstone journey: ${title}\n\n${achievement || 'Building this solution has taught me something unexpected: technical skills are just tools. The real value is understanding the human need behind the requirement.'}\n\nWorking with a nonprofit partner reminds me why I chose this path. Technology can amplify mission-driven work in ways I never imagined.\n\nStill learning. Still growing. Still grateful for this opportunity.\n\n${hashtags}`,
      },
      certification: {
        professional: `Achieved: ${title}\n\nI'm pleased to announce that I've earned my ${title} through my work with Transition Trails.\n\nThis certification represents months of structured learning, hands-on practice, and dedicated study. ${achievement || 'It validates my technical competency and readiness for professional Salesforce roles.'}\n\nThank you to my coaches, cohort, and the entire Transition Trails community for the support throughout this journey.\n\nLooking forward to applying these skills in my next role.\n\n${hashtags}`,
        
        excited: `🏆 I DID IT! ${title} CERTIFIED! 🏆\n\nI'M OFFICIALLY CERTIFIED!!! 🎉🎉🎉\n\n${achievement || 'Months of hard work, late nights, and determination—all worth it!'}\n\nHuge thanks to Transition Trails for the structured program, to my amazing coaches for believing in me, and to my cohort for keeping me motivated!\n\nFrom nonprofit professional to Salesforce certified—this is just the beginning! 🚀\n\nWho's ready to hire a motivated, certified Salesforce pro? 😄\n\n${hashtags}`,
        
        reflective: `Today, I earned my ${title}.\n\nBut more than a certification, I earned confidence. Proof that career transitions are possible. Evidence that nonprofit experience + technical skills = powerful combination.\n\n${achievement || 'This journey taught me that imposter syndrome is real, but so is growth.'}\n\nTo everyone in the middle of their own transition: your background is your superpower. Your determination is your compass. Your community is your fuel.\n\nKeep going.\n\n${hashtags}`,
      },
    };

    return posts[context][selectedTone];
  };

  const handleGeneratePost = () => {
    const generated = generatePost();
    setPostText(generated);
  };

  const handleShare = async () => {
    setIsSharing(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Show confetti animation
    setShowConfetti(true);
    
    // Show success toast
    toast.success('Shared! +10 Engagement Points 🌟', {
      description: 'Your post has been shared to LinkedIn',
      duration: 5000,
    });
    
    // Penny's compliment
    setTimeout(() => {
      toast.info('💡 Penny says: "That\'s a solid story of growth!"', {
        duration: 4000,
      });
    }, 1500);
    
    setIsSharing(false);
    
    // Call parent callback
    if (onShare) {
      onShare();
    }
    
    // Close after animations
    setTimeout(() => {
      setShowConfetti(false);
      onClose();
    }, 3000);
  };

  const handleCopyText = () => {
    navigator.clipboard.writeText(postText);
    toast.success('Copied to clipboard!');
  };

  // Generate initial post when modal opens or tone changes
  useState(() => {
    if (isOpen) {
      handleGeneratePost();
    }
  });

  return (
    <>
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center space-x-2">
              <Linkedin className="w-6 h-6 text-[#0A66C2]" />
              <span>Share to LinkedIn</span>
            </DialogTitle>
            <DialogDescription>
              Penny has crafted a LinkedIn post for you. Choose a tone and customize as needed.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-6">
            {/* Tone Selector */}
            <div>
              <label className="text-sm text-gray-700 mb-3 block">Choose Your Tone:</label>
              <div className="grid grid-cols-3 gap-3">
                {tones.map((tone) => (
                  <button
                    key={tone.id}
                    onClick={() => {
                      setSelectedTone(tone.id);
                      setTimeout(handleGeneratePost, 100);
                    }}
                    className={`p-4 rounded-lg border-2 transition-all duration-150 text-left ${
                      selectedTone === tone.id
                        ? 'border-[#0A66C2] bg-[#0A66C2]/5'
                        : 'border-gray-200 hover:border-[#0A66C2]/50'
                    }`}
                  >
                    <div className="text-2xl mb-1">{tone.emoji}</div>
                    <div className="text-sm text-gray-900 mb-1">{tone.label}</div>
                    <div className="text-xs text-gray-600">{tone.description}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Generated Post */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-sm text-gray-700">Your Post:</label>
                <div className="flex items-center space-x-2">
                  <Badge variant="outline" className="bg-[#F9A03F]/10 text-[#F9A03F] border-[#F9A03F]/30 text-xs">
                    <Sparkles className="w-3 h-3 mr-1" />
                    Penny Generated
                  </Badge>
                  <button
                    onClick={handleGeneratePost}
                    className="text-xs text-[#0A66C2] hover:underline"
                  >
                    Regenerate
                  </button>
                </div>
              </div>
              
              <Textarea
                value={postText}
                onChange={(e) => setPostText(e.target.value)}
                className="min-h-[300px] text-sm"
                placeholder="Penny will generate your post here..."
              />

              <div className="flex items-center justify-between mt-2 text-xs text-gray-500">
                <span>{postText.length} characters</span>
                <button
                  onClick={handleCopyText}
                  className="flex items-center space-x-1 text-[#0A66C2] hover:underline"
                >
                  <Copy className="w-3 h-3" />
                  <span>Copy</span>
                </button>
              </div>
            </div>

            {/* Hashtag Suggestions */}
            <div>
              <label className="text-sm text-gray-700 mb-2 block">Suggested Hashtags:</label>
              <div className="flex flex-wrap gap-2">
                {['#TransitionTrails', '#Trailblazer', '#NonprofitCloud', '#SalesforceLearning', '#AIJourney', '#CareerTransition'].map((tag) => (
                  <Badge
                    key={tag}
                    variant="outline"
                    className="bg-[#0A66C2]/5 text-[#0A66C2] border-[#0A66C2]/30 cursor-pointer hover:bg-[#0A66C2]/10"
                    onClick={() => {
                      if (!postText.includes(tag)) {
                        setPostText(postText + ' ' + tag);
                      }
                    }}
                  >
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>

            {/* Engagement Preview */}
            <div className="p-4 bg-gradient-to-br from-[#F9A03F]/10 to-[#2C6975]/10 rounded-lg border border-[#F9A03F]/20">
              <div className="flex items-start space-x-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#F9A03F] to-[#e89135] flex items-center justify-center flex-shrink-0">
                  <Sparkles className="w-5 h-5 text-white" />
                </div>
                <div className="flex-1">
                  <p className="text-sm text-gray-900 mb-1">
                    <strong>Sharing this will earn you:</strong>
                  </p>
                  <ul className="text-xs text-gray-700 space-y-1">
                    <li>✨ +10 Engagement Points</li>
                    <li>🎯 Progress toward Community Contributor badge</li>
                    <li>📊 Boost to your professional visibility</li>
                    <li>🤝 Connection opportunities with the community</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center space-x-3">
              <button
                onClick={onClose}
                className="flex-1 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                disabled={isSharing}
              >
                Cancel
              </button>
              <button
                onClick={handleShare}
                disabled={isSharing || !postText.trim()}
                className="flex-1 py-3 bg-[#0A66C2] text-white rounded-lg hover:bg-[#084d8f] transition-colors flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSharing ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>Sharing...</span>
                  </>
                ) : (
                  <>
                    <Share2 className="w-4 h-4" />
                    <span>Share to LinkedIn</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Confetti Animation Overlay */}
      {showConfetti && (
        <div className="fixed inset-0 pointer-events-none z-[100] flex items-center justify-center">
          <div className="confetti-container">
            {[...Array(50)].map((_, i) => (
              <div
                key={i}
                className="confetti"
                style={{
                  left: `${Math.random() * 100}%`,
                  animationDelay: `${Math.random() * 3}s`,
                  background: ['#F9A03F', '#2C6975', '#7EB5C1', '#3B6A52', '#f43f5e'][Math.floor(Math.random() * 5)],
                }}
              />
            ))}
          </div>
          
          {/* Success Message */}
          <div className="bg-white rounded-xl shadow-2xl p-8 max-w-md animate-in zoom-in duration-500">
            <div className="text-center">
              <div className="w-20 h-20 bg-gradient-to-br from-[#F9A03F] to-[#e89135] rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse">
                <Check className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-2xl text-gray-900 mb-2">Successfully Shared! 🎉</h3>
              <p className="text-gray-600 mb-4">Your achievement is now on LinkedIn</p>
              <div className="flex items-center justify-center space-x-2 text-[#F9A03F]">
                <Sparkles className="w-5 h-5" />
                <span className="text-lg">+10 Engagement Points</span>
                <Sparkles className="w-5 h-5" />
              </div>
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        .confetti-container {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          overflow: hidden;
          pointer-events: none;
        }
        
        .confetti {
          position: absolute;
          width: 10px;
          height: 10px;
          top: -10px;
          opacity: 0;
          animation: confetti-fall 3s linear forwards;
        }
        
        @keyframes confetti-fall {
          0% {
            top: -10px;
            opacity: 1;
            transform: rotate(0deg);
          }
          100% {
            top: 100vh;
            opacity: 0;
            transform: rotate(720deg);
          }
        }
      `}</style>
    </>
  );
}
