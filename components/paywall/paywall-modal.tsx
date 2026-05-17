'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Lock, Sparkles, Check, X } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { USAGE_MESSAGES, UsageType } from '@/lib/usage-context';

interface PaywallModalProps {
  isOpen: boolean;
  onClose: () => void;
  triggerType: UsageType;
}

const PREMIUM_FEATURES = [
  'Unlimited quiz sessions',
  'Unlimited file uploads',
  'Full learning plan generation',
  'Knowledge gaps report',
  'Priority AI response speed',
  'Telegram bot integration',
  'Export flashcards',
];

const LOCKED_FEATURES: Record<UsageType, string[]> = {
  quiz: ['Take unlimited quizzes daily', 'Practice unlimited problem sets'],
  upload: ['Upload unlimited materials', 'Process large file batches'],
  'learning-plan': ['Generate full learning plans', 'Customize study schedules'],
  'gaps-report': ['View detailed knowledge gaps', 'Get targeted improvements'],
};

export function PaywallModal({
  isOpen,
  onClose,
  triggerType,
}: PaywallModalProps) {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  const message = USAGE_MESSAGES[triggerType];
  const lockedFeatures = LOCKED_FEATURES[triggerType];

  return (
    <AnimatePresence>
      {isOpen && (
        <Dialog open={isOpen} onOpenChange={onClose}>
          <DialogContent
            showCloseButton={true}
            className="max-w-2xl w-full bg-[#111827] border border-gray-800 p-0 overflow-hidden"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{
                type: 'spring',
                stiffness: 300,
                damping: 30,
              }}
              className="grid grid-cols-1 md:grid-cols-2 gap-0"
            >
              {/* Left Column - Locked Features */}
              <div className="bg-gradient-to-b from-red-500/5 to-transparent p-8 border-b md:border-b-0 md:border-r border-gray-800 flex flex-col justify-center">
                <div className="mb-6">
                  <h3 className="text-white font-bold text-xl mb-2">
                    {message.title}
                  </h3>
                  <p className="text-gray-400 text-sm">{message.message}</p>
                </div>

                <div className="space-y-3">
                  <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide">
                    You're missing:
                  </p>
                  {lockedFeatures.map((feature, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="flex items-start gap-3"
                    >
                      <Lock className="w-4 h-4 text-red-400 flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-gray-300">{feature}</span>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Right Column - Premium Card */}
              <div className="p-8 flex flex-col justify-between">
                <div className="mb-6">
                  <div className="flex items-center gap-2 mb-4">
                    <Sparkles className="w-5 h-5 text-purple-400" />
                    <h2 className="text-2xl font-bold text-white">Ilm AI Premium</h2>
                  </div>

                  <div className="mb-6">
                    <div className="flex items-baseline gap-1">
                      <span className="text-4xl font-bold text-white">$9.99</span>
                      <span className="text-gray-400">/month</span>
                    </div>
                    <p className="text-xs text-gray-500 mt-1">
                      or 79,000 UZS/month
                    </p>
                  </div>

                  <div className="space-y-3">
                    {PREMIUM_FEATURES.map((feature, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="flex items-center gap-3"
                      >
                        <Check className="w-4 h-4 text-green-400 flex-shrink-0" />
                        <span className="text-sm text-gray-300">{feature}</span>
                      </motion.div>
                    ))}
                  </div>
                </div>

                <div className="space-y-3">
                  <Button
                    onClick={() => {
                      // Handle upgrade
                      onClose();
                    }}
                    className="w-full bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white font-semibold py-2 h-auto"
                  >
                    Upgrade Now
                  </Button>
                  <button
                    onClick={onClose}
                    className="w-full text-center text-sm text-gray-400 hover:text-gray-300 transition-colors py-2"
                  >
                    Maybe later
                  </button>
                </div>
              </div>
            </motion.div>
          </DialogContent>
        </Dialog>
      )}
    </AnimatePresence>
  );
}
