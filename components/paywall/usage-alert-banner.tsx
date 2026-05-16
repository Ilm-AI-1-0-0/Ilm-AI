'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Zap, X } from 'lucide-react';
import { UsageLimits } from '@/lib/usage-context';

interface UsageAlertBannerProps {
  limits: UsageLimits;
  onUpgradeClick?: () => void;
}

export function UsageAlertBanner({
  limits,
  onUpgradeClick,
}: UsageAlertBannerProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  // Check if any limit is near (>80%)
  useEffect(() => {
    const isNearLimit = Object.values(limits).some(
      (limit) => (limit.current / limit.max) * 100 >= 80
    );
    setIsVisible(isNearLimit && !dismissed);
  }, [limits, dismissed]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="bg-gradient-to-r from-amber-500/20 to-orange-500/10 border border-amber-500/40 rounded-lg p-4 mb-6"
        >
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <Zap className="w-5 h-5 text-amber-400 flex-shrink-0" />
              <div>
                <p className="text-sm font-semibold text-amber-300">
                  You&apos;re almost at your free limit
                </p>
                <p className="text-xs text-amber-200/70">
                  Upgrade for unlimited access
                </p>
              </div>
            </div>
            <button
              onClick={() => setDismissed(true)}
              className="flex-shrink-0 text-amber-300 hover:text-amber-400 transition-colors p-1"
              aria-label="Dismiss"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
