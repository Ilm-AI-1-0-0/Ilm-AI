'use client';

import { Clock } from 'lucide-react';

interface WelcomeBannerProps {
  userName: string;
  daysUntilGoal: number;
}

export default function WelcomeBanner({ userName, daysUntilGoal }: WelcomeBannerProps) {
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 18) return 'Good afternoon';
    return 'Good evening';
  };

  return (
    <div className="relative bg-gradient-to-r from-purple-600/20 to-purple-500/10 border border-purple-500/20 rounded-2xl p-6 md:p-8 overflow-hidden">
      {/* Animated gradient background */}
      <div className="absolute inset-0 bg-gradient-to-r from-purple-500/5 to-transparent opacity-50" />
      
      <div className="relative z-10">
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
              {getGreeting()}, {userName} 👋
            </h1>
            <p className="text-gray-300 text-sm md:text-base">
              Welcome back! Let&apos;s continue your learning journey.
            </p>
          </div>
        </div>

        {/* Days until goal */}
        <div className="mt-6 flex items-center gap-3 bg-purple-500/10 border border-purple-500/20 rounded-lg w-fit px-4 py-3">
          <Clock size={20} className="text-purple-400" />
          <div>
            <p className="text-xs text-gray-400">Time to goal</p>
            <p className="text-white font-semibold">
              {daysUntilGoal} {daysUntilGoal === 1 ? 'day' : 'days'} remaining
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
