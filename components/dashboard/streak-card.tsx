'use client';

import { Flame, Target } from 'lucide-react';

interface StreakCardProps {
  currentStreak: number;
  longestStreak: number;
  streakActive: boolean;
}

export default function StreakCard({ 
  currentStreak, 
  longestStreak,
  streakActive 
}: StreakCardProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {/* Current Streak */}
      <div className="bg-gradient-to-br from-orange-500/20 to-red-500/10 border border-orange-500/20 rounded-xl p-6 group hover:border-orange-500/40 transition-all duration-300">
        <div className="flex items-start justify-between mb-4">
          <div>
            <p className="text-gray-400 text-sm mb-1">Today&apos;s Streak</p>
            <div className="flex items-end gap-2">
              <span className="text-4xl font-bold text-white">{currentStreak}</span>
              <span className="text-gray-400 text-sm mb-1">days</span>
            </div>
          </div>
          <Flame
            size={32}
            className={`transition-all duration-300 ${
              streakActive ? 'text-orange-400 animate-pulse' : 'text-gray-500'
            }`}
          />
        </div>
        <p className="text-xs text-gray-400">
          {streakActive
            ? '✓ Keep your momentum going today!'
            : 'Come back today to maintain your streak'}
        </p>
      </div>

      {/* Longest Streak */}
      <div className="bg-gradient-to-br from-purple-500/20 to-violet-500/10 border border-purple-500/20 rounded-xl p-6 group hover:border-purple-500/40 transition-all duration-300">
        <div className="flex items-start justify-between mb-4">
          <div>
            <p className="text-gray-400 text-sm mb-1">Personal Best</p>
            <div className="flex items-end gap-2">
              <span className="text-4xl font-bold text-white">{longestStreak}</span>
              <span className="text-gray-400 text-sm mb-1">days</span>
            </div>
          </div>
          <Target
            size={32}
            className="text-purple-400 group-hover:scale-110 transition-transform"
          />
        </div>
        <p className="text-xs text-gray-400">
          {currentStreak < longestStreak
            ? `Keep going! ${longestStreak - currentStreak} days to beat your record`
            : '🏆 You\'re on a new personal record!'}
        </p>
      </div>
    </div>
  );
}
