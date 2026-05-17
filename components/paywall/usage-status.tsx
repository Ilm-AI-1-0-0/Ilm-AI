'use client';

import { useUsageContext } from '@/components/providers/usage-provider';
import { UsageCounterBar } from './usage-counter-bar';

interface UsageStatusProps {
  showTitle?: boolean;
}

export function UsageStatus({ showTitle = true }: UsageStatusProps) {
  const { limits } = useUsageContext();

  return (
    <div className="space-y-4">
      {showTitle && (
        <h3 className="text-white font-semibold text-sm">Your Usage</h3>
      )}
      <div className="space-y-4">
        <UsageCounterBar
          label="Daily Quizzes"
          usage={limits.quiz}
        />
        <UsageCounterBar
          label="File Uploads (Lifetime)"
          usage={limits.upload}
        />
      </div>
    </div>
  );
}
