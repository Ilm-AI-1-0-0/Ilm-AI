'use client';

import { useState, useEffect } from 'react';
import Sidebar from '@/components/dashboard/sidebar';
import WelcomeBanner from '@/components/dashboard/welcome-banner';
import ProgressCard from '@/components/dashboard/progress-card';
import QuickActions from '@/components/dashboard/quick-actions';
import RecentMaterials from '@/components/dashboard/recent-materials';
import StreakCard from '@/components/dashboard/streak-card';
import KnowledgeGaps from '@/components/dashboard/knowledge-gaps';

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
    <div className="flex flex-col lg:flex-row min-h-screen bg-background">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pb-24 lg:pb-8">
          {/* Page Header */}
          <div className="mb-8">
            <h1 className="text-3xl lg:text-4xl font-bold text-white mb-2">Dashboard</h1>
            <p className="text-gray-400">Track your progress and continue learning</p>
          </div>

          {isLoading ? (
            <div className="space-y-6 animate-fade-in">
              <div className="h-32 bg-gradient-to-r from-purple-500/10 to-purple-500/5 rounded-2xl animate-pulse" />
              <div className="h-48 bg-gradient-to-r from-purple-500/10 to-purple-500/5 rounded-2xl animate-pulse" />
            </div>
          ) : (
            <div className="space-y-8 animate-fade-in">
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
              <div className="grid grid-cols-1 gap-8">
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
      </main>
    </div>
  );
}
