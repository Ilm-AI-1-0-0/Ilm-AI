'use client';

import Link from 'next/link';
import { AlertCircle, ArrowRight, CheckCircle } from 'lucide-react';

interface KnowledgeGap {
  id: string;
  concept: string;
  difficulty: 'easy' | 'medium' | 'hard';
  reviewCount: number;
}

interface KnowledgeGapsProps {
  gaps: KnowledgeGap[];
}

export default function KnowledgeGaps({ gaps }: KnowledgeGapsProps) {
  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy':
        return 'bg-green-500/20 text-green-300 border-green-500/20';
      case 'medium':
        return 'bg-yellow-500/20 text-yellow-300 border-yellow-500/20';
      case 'hard':
        return 'bg-red-500/20 text-red-300 border-red-500/20';
      default:
        return 'bg-gray-500/20 text-gray-300 border-gray-500/20';
    }
  };

  if (gaps.length === 0) {
    return (
      <div className="bg-gradient-to-r from-emerald-500/20 to-green-500/10 border border-emerald-500/20 rounded-xl p-6">
        <div className="flex items-start gap-4">
          <CheckCircle size={24} className="text-emerald-400 flex-shrink-0 mt-1" />
          <div>
            <h3 className="text-white font-semibold mb-1">Perfect Knowledge Base!</h3>
            <p className="text-gray-300 text-sm">
              No concepts flagged for review. Keep practicing to strengthen your foundation.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-r from-red-500/20 to-orange-500/10 border border-red-500/20 rounded-xl p-6">
      <div className="flex items-start justify-between gap-4 mb-4">
        <div className="flex items-start gap-4">
          <AlertCircle size={24} className="text-red-400 flex-shrink-0 mt-0.5" />
          <div>
            <h3 className="text-white font-semibold mb-1">
              {gaps.length} {gaps.length === 1 ? 'concept needs' : 'concepts need'} review
            </h3>
            <p className="text-gray-300 text-sm">
              Focus on these areas to strengthen your understanding
            </p>
          </div>
        </div>
      </div>

      {/* Gap Items */}
      <div className="space-y-2 mb-4">
        {gaps.map((gap) => (
          <div
            key={gap.id}
            className="flex items-center justify-between bg-black/20 rounded-lg p-3 border border-red-500/10 hover:border-red-500/30 transition-colors"
          >
            <div>
              <p className="text-white font-medium text-sm">{gap.concept}</p>
              <p className="text-xs text-gray-400">
                Reviewed {gap.reviewCount} {gap.reviewCount === 1 ? 'time' : 'times'}
              </p>
            </div>
            <span
              className={`px-3 py-1 rounded-full text-xs font-semibold border ${getDifficultyColor(
                gap.difficulty
              )}`}
            >
              {gap.difficulty.charAt(0).toUpperCase() + gap.difficulty.slice(1)}
            </span>
          </div>
        ))}
      </div>

      {/* CTA Button */}
      <Link
        href="/dashboard/quiz"
        className="w-full bg-red-500/20 hover:bg-red-500/30 border border-red-500/30 hover:border-red-500/50 text-white font-semibold py-3 rounded-lg transition-all duration-300 flex items-center justify-center gap-2 group"
      >
        Practice Review Quiz
        <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
      </Link>
    </div>
  );
}
