'use client';

import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Sparkles, TrendingDown } from 'lucide-react';
import { motion } from 'framer-motion';

interface UpgradeDowngradeBannerProps {
  currentPlan: 'monthly' | 'yearly';
  monthlySavings?: string;
  yearlySavings?: string;
  onUpgradeClick?: () => void;
  onDowngradeClick?: () => void;
}

export function UpgradeDowngradeBanner({
  currentPlan,
  monthlySavings,
  yearlySavings,
  onUpgradeClick,
  onDowngradeClick,
}: UpgradeDowngradeBannerProps) {
  if (currentPlan === 'yearly') {
    return null; // Already on yearly plan
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Card className="border-amber-500/30 bg-gradient-to-r from-amber-500/10 to-orange-500/10 p-6">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-amber-500" />
              <h3 className="font-semibold text-foreground">Save with Annual Plan</h3>
            </div>
            <p className="text-sm text-muted-foreground">
              Switch to yearly billing and{' '}
              <span className="font-semibold text-amber-500">{monthlySavings}</span>
            </p>
          </div>
          <Button
            onClick={onUpgradeClick}
            className="whitespace-nowrap bg-amber-600 hover:bg-amber-700 text-white"
          >
            Upgrade to Annual
          </Button>
        </div>
      </Card>
    </motion.div>
  );
}
