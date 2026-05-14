'use client';

import { Target, Sparkles, Calendar, Brain } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface EmptyStateProps {
  onSetGoal: () => void;
}

export default function EmptyState({ onSetGoal }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-4">
      {/* Icon */}
      <div className="relative mb-8">
        <div className="w-24 h-24 rounded-2xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center">
          <Target size={48} className="text-purple-400" />
        </div>
        <div className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-purple-500/20 border border-purple-500/30 flex items-center justify-center animate-float">
          <Sparkles size={16} className="text-purple-400" />
        </div>
      </div>

      {/* Text */}
      <h2 className="text-white font-bold text-2xl mb-3 text-center">
        Set a Goal to Get Started
      </h2>
      <p className="text-gray-400 text-center max-w-md mb-8">
        Set a learning goal and we&apos;ll generate a personalized plan tailored to your pace and materials.
      </p>

      {/* Features */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8 w-full max-w-2xl">
        <div className="flex flex-col items-center p-4 bg-white/5 rounded-xl border border-white/10">
          <Calendar size={24} className="text-purple-400 mb-2" />
          <p className="text-white font-medium text-sm text-center">Daily Schedule</p>
          <p className="text-gray-500 text-xs text-center">Structured daily tasks</p>
        </div>
        <div className="flex flex-col items-center p-4 bg-white/5 rounded-xl border border-white/10">
          <Brain size={24} className="text-purple-400 mb-2" />
          <p className="text-white font-medium text-sm text-center">Smart Allocation</p>
          <p className="text-gray-500 text-xs text-center">AI-powered pacing</p>
        </div>
        <div className="flex flex-col items-center p-4 bg-white/5 rounded-xl border border-white/10">
          <Target size={24} className="text-purple-400 mb-2" />
          <p className="text-white font-medium text-sm text-center">Goal Tracking</p>
          <p className="text-gray-500 text-xs text-center">Monitor your progress</p>
        </div>
      </div>

      {/* CTA Button */}
      <Button
        onClick={onSetGoal}
        size="lg"
        className="bg-purple-500 hover:bg-purple-600 text-white px-8 py-3 text-lg font-semibold"
      >
        <Target size={20} className="mr-2" />
        Set Your Goal
      </Button>
    </div>
  );
}
