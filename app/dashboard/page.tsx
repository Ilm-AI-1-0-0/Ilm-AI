'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { AppLayout } from '@/components/layouts/app-layout';
import WelcomeBanner from '@/components/dashboard/welcome-banner';
import ProgressCard from '@/components/dashboard/progress-card';
import QuickActions from '@/components/dashboard/quick-actions';
import RecentMaterials from '@/components/dashboard/recent-materials';
import StreakCard from '@/components/dashboard/streak-card';
import KnowledgeGaps from '@/components/dashboard/knowledge-gaps';
import { BookOpen, MessageCircle, Brain, Target, Flame, Calendar } from 'lucide-react';

// Mock data - replace with real data from your backend
const mockUser = {
  name: 'Ismatulla',
  daysUntilGoal: 3,
};

const mockStats = {
  knowledgeScore: 72,
  sessionsCompleted: 12,
  quizzesCompleted: 8,
  currentStreak: 5,
  longestStreak: 14,
  streakActive: true,
};

const mockMaterials = [
  {
    id: '1',
    title: 'Introduction to Quantum Computing',
    topic: 'Physics',
    uploadedAt: '2 days ago',
    pages: 45,
  },
  {
    id: '2',
    title: 'Advanced JavaScript Patterns',
    topic: 'Programming',
    uploadedAt: '1 week ago',
    pages: 32,
  },
  {
    id: '3',
    title: 'European History Timeline',
    topic: 'History',
    uploadedAt: '2 weeks ago',
    pages: 28,
  },
];

const mockGaps = [
  {
    id: '1',
    concept: 'Quantum Entanglement',
    difficulty: 'hard' as const,
    reviewCount: 2,
  },
  {
    id: '2',
    concept: 'Asynchronous Programming',
    difficulty: 'medium' as const,
    reviewCount: 3,
  },
  {
    id: '3',
    concept: 'Treaty of Westphalia',
    difficulty: 'easy' as const,
    reviewCount: 1,
  },
];

// Continue where you left off card
function ContinueLearning() {
  return (
    <div className="bg-gradient-to-r from-purple-600/20 to-violet-600/20 border border-purple-500/30 rounded-xl p-5">
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1">
          <p className="text-sm text-purple-300 font-medium mb-1">Continue where you left off</p>
          <h3 className="text-lg font-semibold text-white mb-2">Introduction to Quantum Computing</h3>
          <p className="text-sm text-gray-400 mb-4">Chapter 3: Quantum Entanglement - Page 23</p>
          <Link
            href="/dashboard/chat"
            className="inline-flex items-center gap-2 bg-purple-600 hover:bg-purple-700 text-white text-sm font-medium px-4 py-2 rounded-lg transition-colors"
          >
            <MessageCircle className="w-4 h-4" />
            Resume Chat
          </Link>
        </div>
        <div className="hidden sm:flex items-center justify-center w-16 h-16 bg-purple-500/20 rounded-xl">
          <BookOpen className="w-8 h-8 text-purple-400" />
        </div>
      </div>
    </div>
  );
}

// Quick stats row
function QuickStats() {
  const stats = [
    { label: 'Sessions', value: mockStats.sessionsCompleted, icon: MessageCircle },
    { label: 'Quizzes', value: mockStats.quizzesCompleted, icon: Brain },
    { label: 'Knowledge', value: `${mockStats.knowledgeScore}%`, icon: Target },
    { label: 'Streak', value: `${mockStats.currentStreak}d`, icon: Flame },
  ];

  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
      {stats.map((stat) => {
        const Icon = stat.icon;
        return (
          <div
            key={stat.label}
            className="bg-[#1F2937]/50 border border-gray-800 rounded-xl p-4 text-center"
          >
            <div className="inline-flex items-center justify-center w-10 h-10 bg-purple-500/20 rounded-lg mb-2">
              <Icon className="w-5 h-5 text-purple-400" />
            </div>
            <p className="text-2xl font-bold text-white">{stat.value}</p>
            <p className="text-xs text-gray-400">{stat.label}</p>
          </div>
        );
      })}
    </div>
  );
}

// Goal progress banner
function GoalProgressBanner() {
  return (
    <div className="bg-gradient-to-r from-amber-500/10 to-orange-500/10 border border-amber-500/30 rounded-xl p-4 flex items-center gap-4">
      <div className="flex items-center justify-center w-12 h-12 bg-amber-500/20 rounded-xl flex-shrink-0">
        <Calendar className="w-6 h-6 text-amber-400" />
      </div>
      <div className="flex-1">
        <p className="text-sm text-amber-300 font-medium">Goal: Pass Cloud Architecture Exam</p>
        <p className="text-xs text-gray-400 mt-0.5">{mockUser.daysUntilGoal} days left - Stay on track!</p>
      </div>
      <Link
        href="/dashboard/plan"
        className="text-sm text-amber-400 hover:text-amber-300 font-medium whitespace-nowrap"
      >
        View Plan
      </Link>
    </div>
  );
}

export default function Dashboard() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading data
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 300);

    return () => clearTimeout(timer);
  }, []);

  return (
    <AppLayout userName={mockUser.name}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 lg:py-8">
        {/* Page Header */}
        <div className="mb-6">
          <h1 className="text-2xl lg:text-3xl font-bold text-white mb-1">Dashboard</h1>
          <p className="text-gray-400 text-sm">Track your progress and continue learning</p>
        </div>

        {isLoading ? (
          <div className="space-y-6 animate-fade-in">
            <div className="h-24 bg-gradient-to-r from-purple-500/10 to-purple-500/5 rounded-xl animate-pulse" />
            <div className="h-32 bg-gradient-to-r from-purple-500/10 to-purple-500/5 rounded-xl animate-pulse" />
            <div className="h-48 bg-gradient-to-r from-purple-500/10 to-purple-500/5 rounded-xl animate-pulse" />
          </div>
        ) : (
          <div className="space-y-6 animate-fade-in">
            {/* Goal Progress Banner */}
            <GoalProgressBanner />

            {/* Continue Learning */}
            <ContinueLearning />

            {/* Quick Stats */}
            <QuickStats />

            {/* Welcome Banner */}
            <WelcomeBanner
              userName={mockUser.name}
              daysUntilGoal={mockUser.daysUntilGoal}
            />

            {/* Progress Card */}
            <ProgressCard
              knowledgeScore={mockStats.knowledgeScore}
              sessionsCompleted={mockStats.sessionsCompleted}
              quizzesCompleted={mockStats.quizzesCompleted}
            />

            {/* Quick Actions */}
            <div>
              <h2 className="text-white font-bold text-lg mb-4">Quick Actions</h2>
              <QuickActions />
            </div>

            {/* Recent Materials */}
            <RecentMaterials materials={mockMaterials} />

            {/* Streak & Knowledge Gaps */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Streak Cards */}
              <StreakCard
                currentStreak={mockStats.currentStreak}
                longestStreak={mockStats.longestStreak}
                streakActive={mockStats.streakActive}
              />

              {/* Knowledge Gaps */}
              <KnowledgeGaps gaps={mockGaps} />
            </div>
          </div>
        )}
      </div>
    </AppLayout>
  );
}
