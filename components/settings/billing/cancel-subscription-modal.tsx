'use client';

import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { AlertCircle, Lock, FileText, Users, Zap } from 'lucide-react';
import { motion } from 'framer-motion';

interface CancelSubscriptionModalProps {
  isOpen: boolean;
  onClose: () => void;
  planName: string;
}

const FEATURES_LOST = [
  { icon: Lock, label: 'End-to-end encryption' },
  { icon: FileText, label: 'Unlimited learning materials' },
  { icon: Users, label: 'AI-powered study groups' },
  { icon: Zap, label: 'Advanced analytics' },
  { icon: FileText, label: 'Custom learning paths' },
];

export function CancelSubscriptionModal({ isOpen, onClose, planName }: CancelSubscriptionModalProps) {
  const [isProcessing, setIsProcessing] = useState(false);

  const handleConfirmCancel = async () => {
    setIsProcessing(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsProcessing(false);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md border-border bg-card">
        <DialogHeader className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="rounded-full bg-red-500/10 p-2">
              <AlertCircle className="h-6 w-6 text-red-500" />
            </div>
            <div>
              <DialogTitle className="text-xl font-bold text-foreground">
                Cancel {planName}?
              </DialogTitle>
            </div>
          </div>
          <DialogDescription className="text-sm text-muted-foreground">
            You're about to lose access to premium features. This action cannot be undone immediately.
          </DialogDescription>
        </DialogHeader>

        {/* Features Lost Section */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="rounded-lg bg-background p-4"
        >
          <p className="mb-3 text-sm font-semibold text-foreground">You will lose access to:</p>
          <div className="space-y-2">
            {FEATURES_LOST.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 + index * 0.05 }}
                  className="flex items-center gap-3 text-sm text-muted-foreground"
                >
                  <Icon className="h-4 w-4 text-red-400" />
                  <span>{feature.label}</span>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="flex gap-3"
        >
          <Button
            onClick={onClose}
            variant="outline"
            className="flex-1"
          >
            Keep Premium
          </Button>
          <Button
            onClick={handleConfirmCancel}
            disabled={isProcessing}
            className="flex-1 bg-red-600 hover:bg-red-700 text-white"
          >
            {isProcessing ? 'Canceling...' : 'Yes, Cancel'}
          </Button>
        </motion.div>
      </DialogContent>
    </Dialog>
  );
}
