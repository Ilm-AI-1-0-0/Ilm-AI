'use client';

import { useMemo } from 'react';
import { UsageLimit } from '@/lib/usage-context';

interface UsageCounterBarProps {
  label: string;
  usage: UsageLimit;
  showPercentage?: boolean;
}

export function UsageCounterBar({
  label,
  usage,
  showPercentage = true,
}: UsageCounterBarProps) {
  const percentage = useMemo(() => {
    return (usage.current / usage.max) * 100;
  }, [usage.current, usage.max]);

  const getColorClass = () => {
    if (percentage < 50) return 'bg-green-500';
    if (percentage < 80) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <p className="text-sm font-medium text-gray-300">{label}</p>
        {showPercentage && (
          <p className="text-xs text-gray-400">
            {usage.current} of {usage.max}
          </p>
        )}
      </div>
      <div className="w-full bg-gray-700/50 rounded-full h-2 overflow-hidden">
        <div
          className={`h-full transition-all duration-300 rounded-full ${getColorClass()}`}
          style={{ width: `${Math.min(percentage, 100)}%` }}
        />
      </div>
    </div>
  );
}
