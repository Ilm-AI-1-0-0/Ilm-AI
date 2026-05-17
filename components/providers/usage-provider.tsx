'use client';

import {
  createContext,
  useContext,
  useState,
  useCallback,
  ReactNode,
} from 'react';
import { UsageType, UsageLimits, DEFAULT_USAGE_LIMITS } from '@/lib/usage-context';

interface UsageContextType {
  limits: UsageLimits;
  isLimitReached: (type: UsageType) => boolean;
  incrementUsage: (type: UsageType) => void;
  getProgressPercentage: (type: UsageType) => number;
  isNearLimit: (type: UsageType, threshold?: number) => boolean;
}

const UsageContext = createContext<UsageContextType | undefined>(undefined);

export function UsageProvider({ children }: { children: ReactNode }) {
  const [limits, setLimits] = useState<UsageLimits>(DEFAULT_USAGE_LIMITS);

  const isLimitReached = useCallback(
    (type: UsageType) => {
      const key =
        type === 'learning-plan'
          ? 'learningPlan'
          : type === 'gaps-report'
            ? 'gapsReport'
            : type;
      const limitKey = key as keyof UsageLimits;
      return limits[limitKey].current >= limits[limitKey].max;
    },
    [limits]
  );

  const incrementUsage = useCallback((type: UsageType) => {
    setLimits((prev) => {
      const key =
        type === 'learning-plan'
          ? 'learningPlan'
          : type === 'gaps-report'
            ? 'gapsReport'
            : type;
      const limitKey = key as keyof UsageLimits;
      return {
        ...prev,
        [limitKey]: {
          ...prev[limitKey],
          current: Math.min(
            prev[limitKey].current + 1,
            prev[limitKey].max
          ),
        },
      };
    });
  }, []);

  const getProgressPercentage = useCallback(
    (type: UsageType) => {
      const key =
        type === 'learning-plan'
          ? 'learningPlan'
          : type === 'gaps-report'
            ? 'gapsReport'
            : type;
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

  const value: UsageContextType = {
    limits,
    isLimitReached,
    incrementUsage,
    getProgressPercentage,
    isNearLimit,
  };

  return (
    <UsageContext.Provider value={value}>{children}</UsageContext.Provider>
  );
}

export function useUsageContext() {
  const context = useContext(UsageContext);
  if (!context) {
    throw new Error('useUsageContext must be used within UsageProvider');
  }
  return context;
}
