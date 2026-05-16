// Usage limits and context for free tier

export type UsageType = 'quiz' | 'upload' | 'learning-plan' | 'gaps-report';

export interface UsageLimit {
  current: number;
  max: number;
  resetDaily?: boolean;
}

export interface UsageLimits {
  quiz: UsageLimit;
  upload: UsageLimit;
  learningPlan: UsageLimit;
  gapsReport: UsageLimit;
}

export const DEFAULT_USAGE_LIMITS: UsageLimits = {
  quiz: {
    current: 2,
    max: 3,
    resetDaily: true,
  },
  upload: {
    current: 4,
    max: 5,
    resetDaily: false,
  },
  learningPlan: {
    current: 1,
    max: 1,
    resetDaily: false,
  },
  gapsReport: {
    current: 0,
    max: 1,
    resetDaily: false,
  },
};

export const USAGE_MESSAGES: Record<UsageType, { title: string; message: string }> = {
  quiz: {
    title: 'Quiz Limit Reached',
    message: "You've used all 3 free quizzes today. Come back tomorrow or upgrade.",
  },
  upload: {
    title: 'Upload Limit Reached',
    message: "You've reached 5 file uploads. Upgrade to add unlimited materials.",
  },
  'learning-plan': {
    title: 'Premium Feature',
    message: 'Full learning plans are a Premium feature.',
  },
  'gaps-report': {
    title: 'Premium Feature',
    message: 'Knowledge Gap Reports are available on Premium.',
  },
};
