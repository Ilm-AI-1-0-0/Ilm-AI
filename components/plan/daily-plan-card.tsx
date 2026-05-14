'use client';

import { Clock, FileText, Play, Check, Circle } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface Material {
  id: string;
  title: string;
  estimatedTime: number; // in minutes
}

interface DailyPlanCardProps {
  dayLabel: string;
  date: string;
  materials: Material[];
  topics: string[];
  isCompleted: boolean;
  onToggleComplete: () => void;
  onStartSession: () => void;
  isToday?: boolean;
}

export default function DailyPlanCard({
  dayLabel,
  date,
  materials,
  topics,
  isCompleted,
  onToggleComplete,
  onStartSession,
  isToday = false,
}: DailyPlanCardProps) {
  const totalTime = materials.reduce((acc, m) => acc + m.estimatedTime, 0);

  return (
    <div
      className={`bg-[#111827] border rounded-2xl p-4 sm:p-6 transition-all duration-300 ${
        isCompleted
          ? 'border-green-500/30 bg-gradient-to-r from-green-500/5 to-transparent'
          : isToday
          ? 'border-purple-500/50 bg-gradient-to-r from-purple-500/10 to-transparent'
          : 'border-[#1F2937] hover:border-[#374151]'
      }`}
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div>
          <div className="flex items-center gap-2">
            <h3 className="text-white font-bold text-lg">{dayLabel}</h3>
            {isToday && (
              <span className="px-2 py-0.5 bg-purple-500/20 border border-purple-500/30 text-purple-400 text-xs font-semibold rounded-full">
                Today
              </span>
            )}
          </div>
          <p className="text-gray-400 text-sm">{date}</p>
        </div>
        
        {/* Completion Toggle */}
        <button
          onClick={onToggleComplete}
          className={`flex items-center gap-2 px-3 py-1.5 rounded-lg transition-all duration-200 ${
            isCompleted
              ? 'bg-green-500/20 border border-green-500/30 text-green-400'
              : 'bg-white/5 border border-white/10 text-gray-400 hover:text-white hover:border-white/20'
          }`}
        >
          {isCompleted ? (
            <Check size={16} />
          ) : (
            <Circle size={16} />
          )}
          <span className="text-sm font-medium">
            {isCompleted ? 'Completed' : 'Mark Done'}
          </span>
        </button>
      </div>

      {/* Materials */}
      <div className="space-y-3 mb-4">
        <h4 className="text-gray-400 text-sm font-medium">Assigned Materials</h4>
        {materials.map((material) => (
          <div
            key={material.id}
            className="flex items-center gap-3 p-3 bg-white/5 rounded-lg border border-white/5"
          >
            <div className="w-10 h-10 rounded-lg bg-purple-500/20 flex items-center justify-center flex-shrink-0">
              <FileText size={18} className="text-purple-400" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-white font-medium text-sm truncate">{material.title}</p>
              <div className="flex items-center gap-1 text-gray-400 text-xs">
                <Clock size={12} />
                <span>{material.estimatedTime} min read</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Topics */}
      <div className="mb-4">
        <h4 className="text-gray-400 text-sm font-medium mb-2">Topics to Cover</h4>
        <div className="flex flex-wrap gap-2">
          {topics.map((topic, index) => (
            <span
              key={index}
              className="px-3 py-1 bg-purple-500/10 border border-purple-500/20 text-purple-300 text-xs font-medium rounded-full"
            >
              {topic}
            </span>
          ))}
        </div>
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between pt-4 border-t border-[#1F2937]">
        <div className="flex items-center gap-2 text-gray-400 text-sm">
          <Clock size={16} />
          <span>Total: {totalTime} min</span>
        </div>
        
        <Button
          onClick={onStartSession}
          disabled={isCompleted}
          className={`flex items-center gap-2 ${
            isCompleted
              ? 'bg-green-500/20 text-green-400 cursor-not-allowed'
              : 'bg-purple-500 hover:bg-purple-600 text-white'
          }`}
        >
          {isCompleted ? (
            <>
              <Check size={16} />
              Done
            </>
          ) : (
            <>
              <Play size={16} />
              Start Session
            </>
          )}
        </Button>
      </div>
    </div>
  );
}
