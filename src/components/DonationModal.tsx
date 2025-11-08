import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from './ui/dialog';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { RadioGroup, RadioGroupItem } from './ui/radio-group';
import { Heart, Sparkles, Check } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface DonationModalProps {
  isOpen: boolean;
  onClose: () => void;
  preselectedAmount?: string;
}

const donationAmounts = [
  { value: '100', label: '$100', tier: 'Trailblazer' },
  { value: '500', label: '$500', tier: 'Guide' },
  { value: '1000', label: '$1,000', tier: 'Summit Sponsor' },
  { value: '5000', label: '$5,000', tier: 'Evergreen Founder' },
  { value: 'custom', label: 'Custom Amount', tier: '' },
];

export default function DonationModal({ isOpen, onClose, preselectedAmount }: DonationModalProps) {
  const [selectedAmount, setSelectedAmount] = useState(preselectedAmount || '100');
  const [customAmount, setCustomAmount] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [showSuccess, setShowSuccess] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);

    // Simulate API call to Stripe/Salesforce
    // TODO: Integrate with Stripe payment gateway
    // TODO: Create Donation__c record in Salesforce
    setTimeout(() => {
      setIsProcessing(false);
      setShowSuccess(true);
      
      // Reset form after 3 seconds
      setTimeout(() => {
        setShowSuccess(false);
        onClose();
        setName('');
        setEmail('');
        setMessage('');
        setSelectedAmount('100');
        setCustomAmount('');
      }, 3000);
    }, 1500);
  };

  const getDisplayAmount = () => {
    if (selectedAmount === 'custom') {
      return customAmount ? `$${customAmount}` : 'Custom';
    }
    const amount = donationAmounts.find(a => a.value === selectedAmount);
    return amount?.label || '$100';
  };

  const getTier = () => {
    if (selectedAmount === 'custom') {
      const amt = parseInt(customAmount);
      if (amt >= 5000) return 'Evergreen Founder';
      if (amt >= 1000) return 'Summit Sponsor';
      if (amt >= 500) return 'Guide';
      if (amt >= 100) return 'Trailblazer';
      return '';
    }
    const amount = donationAmounts.find(a => a.value === selectedAmount);
    return amount?.tier || '';
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto bg-[#F5F3E8]">
        <AnimatePresence mode="wait">
          {!showSuccess ? (
            <motion.div
              key="form"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <DialogHeader>
                <DialogTitle className="flex items-center gap-2 text-[#2C6975]">
                  <Heart className="w-6 h-6 text-[#F9A03F]" />
                  Contribute Your Postcard
                </DialogTitle>
                <DialogDescription className="text-[#3B6A52]">
                  Your donation helps build the future of Transition Trails Academy
                </DialogDescription>
              </DialogHeader>

              <form onSubmit={handleSubmit} className="space-y-6 mt-6">
                {/* Amount Selection */}
                <div className="space-y-3">
                  <Label className="text-[#2C6975]">Select Your Contribution</Label>
                  <RadioGroup value={selectedAmount} onValueChange={setSelectedAmount}>
                    <div className="grid grid-cols-2 gap-3">
                      {donationAmounts.map((amount) => (
                        <label
                          key={amount.value}
                          className={`relative flex items-center space-x-3 p-4 rounded-lg border-2 cursor-pointer transition-all ${
                            selectedAmount === amount.value
                              ? 'border-[#F9A03F] bg-[#F9A03F]/10 shadow-md'
                              : 'border-[#7EB5C1]/30 bg-white hover:border-[#7EB5C1]'
                          }`}
                        >
                          <RadioGroupItem value={amount.value} id={amount.value} className="border-[#2C6975]" />
                          <div className="flex-1">
                            <div className="text-[#2C6975]">{amount.label}</div>
                            {amount.tier && (
                              <div className="text-xs text-[#3B6A52]">{amount.tier}</div>
                            )}
                          </div>
                        </label>
                      ))}
                    </div>
                  </RadioGroup>

                  {selectedAmount === 'custom' && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                    >
                      <Label htmlFor="customAmount" className="text-[#2C6975]">Custom Amount ($)</Label>
                      <Input
                        id="customAmount"
                        type="number"
                        min="1"
                        value={customAmount}
                        onChange={(e) => setCustomAmount(e.target.value)}
                        placeholder="Enter amount"
                        className="border-[#7EB5C1] focus:border-[#F9A03F] bg-white"
                        required
                      />
                    </motion.div>
                  )}
                </div>

                {/* Current Tier Display */}
                {getTier() && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-4 rounded-lg bg-gradient-to-r from-[#F9A03F]/20 to-[#F9A03F]/10 border-2 border-[#F9A03F]"
                  >
                    <div className="flex items-center gap-2">
                      <Sparkles className="w-5 h-5 text-[#F9A03F]" />
                      <span className="text-[#2C6975]">
                        You'll become a <span className="font-semibold">{getTier()}</span>
                      </span>
                    </div>
                  </motion.div>
                )}

                {/* Personal Information */}
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="name" className="text-[#2C6975]">Your Name *</Label>
                    <Input
                      id="name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="John Doe"
                      required
                      className="border-[#7EB5C1] focus:border-[#F9A03F] bg-white"
                    />
                  </div>

                  <div>
                    <Label htmlFor="email" className="text-[#2C6975]">Email Address *</Label>
                    <Input
                      id="email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="john@example.com"
                      required
                      className="border-[#7EB5C1] focus:border-[#F9A03F] bg-white"
                    />
                  </div>

                  <div>
                    <Label htmlFor="message" className="text-[#2C6975]">
                      Your Message from the Future (Optional)
                    </Label>
                    <Textarea
                      id="message"
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Share your hopes for the learners we'll serve..."
                      rows={4}
                      className="border-[#7EB5C1] focus:border-[#F9A03F] bg-white resize-none"
                    />
                  </div>
                </div>

                {/* Submit Button */}
                <div className="flex gap-3 pt-4">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={onClose}
                    className="flex-1 border-[#3B6A52] text-[#3B6A52] hover:bg-[#3B6A52]/10"
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    disabled={isProcessing}
                    className="flex-1 bg-[#F9A03F] hover:bg-[#F9A03F]/90 text-white shadow-lg"
                  >
                    {isProcessing ? (
                      <>
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                          className="w-4 h-4 border-2 border-white border-t-transparent rounded-full mr-2"
                        />
                        Processing...
                      </>
                    ) : (
                      <>Donate {getDisplayAmount()}</>
                    )}
                  </Button>
                </div>

                {/* Legal Notice */}
                <p className="text-xs text-[#3B6A52]/70 text-center">
                  Transition Trails is a 501(c)(3) nonprofit organization. Your donation is tax-deductible.
                </p>
              </form>
            </motion.div>
          ) : (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="py-12 text-center"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
                className="w-20 h-20 bg-gradient-to-br from-[#F9A03F] to-[#F9A03F]/70 rounded-full flex items-center justify-center mx-auto mb-6 shadow-xl"
              >
                <Check className="w-10 h-10 text-white" strokeWidth={3} />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                <h3 className="text-2xl text-[#2C6975] mb-3">Thank You! 🎉</h3>
                <p className="text-[#3B6A52] mb-4">
                  Your postcard has been sent to the future — and it's brighter because of you.
                </p>
                
                {/* Penny Voice Prompt */}
                <div className="mt-6 p-4 bg-gradient-to-r from-[#7EB5C1]/20 to-[#7EB5C1]/10 rounded-lg border-2 border-[#7EB5C1] inline-block">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-full bg-[#7EB5C1] flex items-center justify-center text-xl flex-shrink-0">
                      🐧
                    </div>
                    <div className="text-left">
                      <p className="text-sm text-[#2C6975] italic">
                        "Your generosity will help countless learners find their trail. Thank you for believing in our mission!"
                      </p>
                      <p className="text-xs text-[#3B6A52] mt-1">— Penny, Trail Guide</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </DialogContent>
    </Dialog>
  );
}
