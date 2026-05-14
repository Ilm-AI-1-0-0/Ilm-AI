'use client';

import { AlertTriangle, Lightbulb, BookOpen, ArrowRight } from 'lucide-react';
import Link from 'next/link';

interface KnowledgeGap {
  id: string;
  topic: string;
  docReference: string;
}

interface ProgressSidebarProps {
  overallProgress: number;
  completedDays: number;
  totalDays: number;
  knowledgeGaps: KnowledgeGap[];
  suggestedAction?: {
    message: string;
    chapterRef: string;
  };
}

export default function ProgressSidebar({
  overallProgress,
  completedDays,
  totalDays,
  knowledgeGaps,
  suggestedAction,
}: ProgressSidebarProps) {
  const circumference = 2 * Math.PI * 45;
  const strokeDashoffset = circumference - (overallProgress / 100) * circumference;

  return (
    <div className="space-y-6">
      {/* Progress Ring Card */}
      <div className="bg-[#111827] border border-[#1F2937] rounded-2xl p-6">
        <h3 className="text-white font-bold mb-4">Overall Progress</h3>
        
        <div className="flex flex-col items-center">
          {/* Progress Ring */}
          <div className="relative w-32 h-32 mb-4">
            <svg
              className="w-full h-full transform -rotate-90"
              viewBox="0 0 100 100"
            >
              <circle
                cx="50"
                cy="50"
                r="45"
                fill="none"
                stroke="#1F2937"
                strokeWidth="8"
              />
              <circle
                cx="50"
                cy="50"
                r="45"
                fill="none"
                stroke="url(#progressGradient)"
                strokeWidth="8"
                strokeDasharray={circumference}
                strokeDashoffset={strokeDashoffset}
                strokeLinecap="round"
                className="transition-all duration-1000 ease-out"
                style={{
                  filter: 'drop-shadow(0 0 8px rgba(124, 58, 237, 0.5))'
                }}
              />
              <defs>
                <linearGradient id="progressGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#7C3AED" />
                  <stop offset="100%" stopColor="#a78bfa" />
                </linearGradient>
              </defs>
            </svg>

            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-3xl font-bold text-white">{overallProgress}%</span>
              <span className="text-xs text-gray-400">Complete</span>
            </div>
          </div>

          {/* Stats */}
          <div className="w-full grid grid-cols-2 gap-3">
            <div className="bg-purple-500/10 border border-purple-500/20 rounded-lg p-3 text-center">
              <p className="text-white font-bold text-xl">{completedDays}</p>
              <p className="text-gray-400 text-xs">Days Done</p>
            </div>
            <div className="bg-white/5 border border-white/10 rounded-lg p-3 text-center">
              <p className="text-white font-bold text-xl">{totalDays - completedDays}</p>
              <p className="text-gray-400 text-xs">Days Left</p>
            </div>
          </div>
        </div>
      </div>

      {/* Knowledge Gaps */}
      {knowledgeGaps.length > 0 && (
        <div className="bg-gradient-to-b from-orange-500/10 to-red-500/5 border border-orange-500/20 rounded-2xl p-6">
          <div className="flex items-center gap-2 mb-4">
            <AlertTriangle size={18} className="text-orange-400" />
            <h3 className="text-white font-bold">Topics Need Work</h3>
          </div>
          
          <p className="text-gray-400 text-sm mb-4">
            These topics need more focus based on your quiz results
          </p>

          <div className="space-y-3">
            {knowledgeGaps.map((gap) => (
              <div
                key={gap.id}
                className="flex items-start gap-3 p-3 bg-black/20 rounded-lg border border-orange-500/10"
              >
                <BookOpen size={16} className="text-orange-400 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-white font-medium text-sm">{gap.topic}</p>
                  <p className="text-gray-500 text-xs">{gap.docReference}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Suggestion Card */}
      {suggestedAction && (
        <div className="bg-gradient-to-b from-purple-500/10 to-purple-500/5 border border-purple-500/20 rounded-2xl p-6">
          <div className="flex items-center gap-2 mb-3">
            <Lightbulb size={18} className="text-purple-400" />
            <h3 className="text-white font-bold">Suggested for Today</h3>
          </div>
          
          <p className="text-gray-300 text-sm mb-4">{suggestedAction.message}</p>
          
          <Link
            href="/dashboard/materials"
            className="flex items-center justify-center gap-2 w-full bg-purple-500/20 hover:bg-purple-500/30 border border-purple-500/30 text-purple-300 hover:text-white py-2 rounded-lg transition-all duration-200 group"
          >
            <span className="text-sm font-medium">Open {suggestedAction.chapterRef}</span>
            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      )}
    </div>
  );
}
