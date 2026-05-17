import { useState, useCallback } from 'react';
import { UsageType, UsageLimits, DEFAULT_USAGE_LIMITS } from '@/lib/usage-context';

interface UseUsageLimitsReturn {
  limits: UsageLimits;
  isLimitReached: (type: UsageType) => boolean;
  incrementUsage: (type: UsageType) => void;
  getProgressPercentage: (type: UsageType) => number;
  isNearLimit: (type: UsageType, threshold?: number) => boolean;
}

export function useUsageLimits(): UseUsageLimitsReturn {
  const [limits, setLimits] = useState<UsageLimits>(DEFAULT_USAGE_LIMITS);

  const isLimitReached = useCallback(
    (type: UsageType) => {
      const key = type === 'learning-plan' ? 'learningPlan' : type === 'gaps-report' ? 'gapsReport' : type;
      return limits[key as keyof UsageLimits].current >= limits[key as keyof UsageLimits].max;
    },
    [limits]
  );

  const incrementUsage = useCallback((type: UsageType) => {
    setLimits((prev) => {
      const key = type === 'learning-plan' ? 'learningPlan' : type === 'gaps-report' ? 'gapsReport' : type;
      const limitKey = key as keyof UsageLimits;
      return {
        ...prev,
        [limitKey]: {
          ...prev[limitKey],
          current: Math.min(prev[limitKey].current + 1, prev[limitKey].max),
        },
      };
    });
  }, []);

  const getProgressPercentage = useCallback(
    (type: UsageType) => {
      const key = type === 'learning-plan' ? 'learningPlan' : type === 'gaps-report' ? 'gapsReport' : type;
      const limitKey = key as keyof UsageLimits;
      return (limits[limitKey].current / limits[limitKey].max) * 100;
    },
    [limits]
  );

  const isNearLimit = useCallback(
    (type: UsageType, threshold = 80) => {
      return getProgressPercentage(type) >= threshold;
    },
    [getProgressPercentage]
  );

  return {
    limits,
    isLimitReached,
    incrementUsage,
    getProgressPercentage,
    isNearLimit,
  };
}
