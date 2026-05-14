'use client';

import { useState } from 'react';
import { X, Target, Calendar, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface GoalModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (goal: { title: string; deadline: string }) => void;
  initialGoal?: { title: string; deadline: string };
}

export default function GoalModal({ isOpen, onClose, onSave, initialGoal }: GoalModalProps) {
  const [title, setTitle] = useState(initialGoal?.title || '');
  const [deadline, setDeadline] = useState(initialGoal?.deadline || '');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (title && deadline) {
      onSave({ title, deadline });
      onClose();
    }
  };

  const presetGoals = [
    'Pass Cloud Architecture Exam',
    'Complete JavaScript Course',
    'Master React Fundamentals',
    'Learn System Design',
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative w-full max-w-lg bg-[#111827] border border-[#1F2937] rounded-2xl shadow-2xl animate-scale-in">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-[#1F2937]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-purple-500/20 border border-purple-500/30 flex items-center justify-center">
              <Target size={20} className="text-purple-400" />
            </div>
            <div>
              <h2 className="text-white font-bold text-lg">
                {initialGoal ? 'Edit Your Goal' : 'Set Your Learning Goal'}
              </h2>
              <p className="text-gray-400 text-sm">Define what you want to achieve</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-white/10 transition-colors"
          >
            <X size={20} className="text-gray-400" />
          </button>
        </div>

        {/* Content */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Goal Title */}
          <div>
            <label className="block text-white font-medium mb-2">
              What&apos;s your goal?
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g., Pass Cloud Architecture Exam"
              className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:border-purple-500 focus:ring-1 focus:ring-purple-500 outline-none transition-all"
            />
            
            {/* Presets */}
            <div className="flex flex-wrap gap-2 mt-3">
              {presetGoals.map((preset) => (
                <button
                  key={preset}
                  type="button"
                  onClick={() => setTitle(preset)}
                  className={`px-3 py-1.5 text-xs rounded-full border transition-all ${
                    title === preset
                      ? 'bg-purple-500/20 border-purple-500/50 text-purple-300'
                      : 'bg-white/5 border-white/10 text-gray-400 hover:border-white/20'
                  }`}
                >
                  {preset}
                </button>
              ))}
            </div>
          </div>

          {/* Deadline */}
          <div>
            <label className="block text-white font-medium mb-2">
              <div className="flex items-center gap-2">
                <Calendar size={16} className="text-purple-400" />
                Target Deadline
              </div>
            </label>
            <input
              type="date"
              value={deadline}
              onChange={(e) => setDeadline(e.target.value)}
              min={new Date().toISOString().split('T')[0]}
              className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white focus:border-purple-500 focus:ring-1 focus:ring-purple-500 outline-none transition-all [color-scheme:dark]"
            />
          </div>

          {/* AI Note */}
          <div className="flex items-start gap-3 p-4 bg-purple-500/10 border border-purple-500/20 rounded-lg">
            <Sparkles size={18} className="text-purple-400 flex-shrink-0 mt-0.5" />
            <p className="text-gray-300 text-sm">
              Our AI will analyze your materials and create a daily learning schedule optimized for your deadline.
            </p>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-3 pt-2">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              className="flex-1"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={!title || !deadline}
              className="flex-1 bg-purple-500 hover:bg-purple-600 text-white disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {initialGoal ? 'Update Goal' : 'Generate Plan'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
