'use client';

import { Activity } from 'lucide-react';

interface ProgressCardProps {
  knowledgeScore: number;
  sessionsCompleted: number;
  quizzesCompleted: number;
}

export default function ProgressCard({ 
  knowledgeScore, 
  sessionsCompleted,
  quizzesCompleted 
}: ProgressCardProps) {
  const circumference = 2 * Math.PI * 45; // radius = 45
  const strokeDashoffset = circumference - (knowledgeScore / 100) * circumference;

  return (
    <div className="bg-[#111827] border border-[#1F2937] rounded-2xl p-8">
      <h2 className="text-white font-bold text-lg mb-6">Your Progress</h2>
      
      <div className="flex flex-col md:flex-row items-center justify-between gap-8">
        {/* Circular Progress Ring */}
        <div className="flex flex-col items-center">
          <div className="relative w-32 h-32">
            {/* Background circle */}
            <svg
              className="w-full h-full transform -rotate-90"
              viewBox="0 0 100 100"
            >
              {/* Base circle */}
              <circle
                cx="50"
                cy="50"
                r="45"
                fill="none"
                stroke="#1F2937"
                strokeWidth="8"
              />
              {/* Progress circle with glow effect */}
              <circle
                cx="50"
                cy="50"
                r="45"
                fill="none"
                stroke="url(#gradient)"
                strokeWidth="8"
                strokeDasharray={circumference}
                strokeDashoffset={strokeDashoffset}
                strokeLinecap="round"
                className="transition-all duration-1000 ease-out drop-shadow-lg"
                style={{
                  filter: 'drop-shadow(0 0 8px rgba(124, 58, 237, 0.5))'
                }}
              />
              {/* Gradient definition */}
              <defs>
                <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#7C3AED" />
                  <stop offset="100%" stopColor="#a78bfa" />
                </linearGradient>
              </defs>
            </svg>

            {/* Center text */}
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-3xl font-bold text-white">{knowledgeScore}%</span>
              <span className="text-xs text-gray-400">Knowledge Score</span>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="flex-1 grid grid-cols-2 gap-4 w-full md:w-auto">
          <div className="bg-purple-500/10 border border-purple-500/20 rounded-lg p-4">
            <p className="text-gray-400 text-sm mb-1">Sessions</p>
            <p className="text-white font-bold text-2xl">{sessionsCompleted}</p>
            <p className="text-xs text-purple-400">completed</p>
          </div>

          <div className="bg-purple-500/10 border border-purple-500/20 rounded-lg p-4">
            <p className="text-gray-400 text-sm mb-1">Quizzes</p>
            <p className="text-white font-bold text-2xl">{quizzesCompleted}</p>
            <p className="text-xs text-purple-400">taken</p>
          </div>

          <div className="col-span-2 bg-gradient-to-r from-green-500/10 to-emerald-500/10 border border-green-500/20 rounded-lg p-4">
            <div className="flex items-center gap-2">
              <Activity size={18} className="text-green-400" />
              <div>
                <p className="text-gray-400 text-sm">Streak Status</p>
                <p className="text-white font-semibold">On Track! Keep it up 🔥</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
