'use client';

import { useState } from 'react';
import { BookOpen, Sparkles, GraduationCap, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface QuizSetupProps {
  materials: { id: string; title: string; topic: string }[];
  onStartQuiz: (config: {
    materialId: string;
    difficulty: 'gentle' | 'understanding' | 'expert';
    questionCount: number;
  }) => void;
}

const difficulties = [
  { 
    id: 'gentle' as const, 
    label: 'Gentle', 
    description: 'Easy pace, basic concepts',
    icon: Sparkles 
  },
  { 
    id: 'understanding' as const, 
    label: 'Understanding', 
    description: 'Balanced challenge',
    icon: GraduationCap 
  },
  { 
    id: 'expert' as const, 
    label: 'Expert', 
    description: 'Advanced, in-depth',
    icon: Zap 
  },
];

const questionCounts = [5, 10, 15];

export default function QuizSetup({ materials, onStartQuiz }: QuizSetupProps) {
  const [selectedMaterial, setSelectedMaterial] = useState<string>('');
  const [difficulty, setDifficulty] = useState<'gentle' | 'understanding' | 'expert'>('understanding');
  const [questionCount, setQuestionCount] = useState(10);

  const canStart = selectedMaterial !== '';

  return (
    <div className="max-w-2xl mx-auto animate-fade-in">
      <div className="text-center mb-8">
        <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">Set Up Your Quiz</h2>
        <p className="text-gray-400">Customize your learning experience</p>
      </div>

      {/* Topic Selection */}
      <div className="mb-8">
        <label className="block text-sm font-medium text-gray-300 mb-3">
          Select Topic
        </label>
        <div className="grid gap-3">
          {materials.map((material) => (
            <button
              key={material.id}
              onClick={() => setSelectedMaterial(material.id)}
              className={cn(
                'flex items-center gap-4 p-4 rounded-xl border transition-all duration-200 text-left',
                selectedMaterial === material.id
                  ? 'bg-purple-500/20 border-purple-500/50 text-white'
                  : 'bg-[#111827] border-[#1F2937] text-gray-300 hover:border-purple-500/30 hover:bg-[#1F2937]'
              )}
            >
              <div className={cn(
                'w-10 h-10 rounded-lg flex items-center justify-center transition-colors',
                selectedMaterial === material.id
                  ? 'bg-purple-500'
                  : 'bg-[#1F2937]'
              )}>
                <BookOpen size={20} className={selectedMaterial === material.id ? 'text-white' : 'text-purple-400'} />
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-medium truncate">{material.title}</p>
                <p className="text-sm text-gray-400">{material.topic}</p>
              </div>
              {selectedMaterial === material.id && (
                <div className="w-5 h-5 rounded-full bg-purple-500 flex items-center justify-center">
                  <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Difficulty Selector */}
      <div className="mb-8">
        <label className="block text-sm font-medium text-gray-300 mb-3">
          Difficulty Level
        </label>
        <div className="grid grid-cols-3 gap-3">
          {difficulties.map((diff) => {
            const Icon = diff.icon;
            return (
              <button
                key={diff.id}
                onClick={() => setDifficulty(diff.id)}
                className={cn(
                  'flex flex-col items-center gap-2 p-4 rounded-xl border transition-all duration-200',
                  difficulty === diff.id
                    ? 'bg-purple-500/20 border-purple-500/50 text-white'
                    : 'bg-[#111827] border-[#1F2937] text-gray-300 hover:border-purple-500/30'
                )}
              >
                <Icon size={24} className={difficulty === diff.id ? 'text-purple-400' : 'text-gray-400'} />
                <span className="font-medium text-sm">{diff.label}</span>
                <span className="text-xs text-gray-400 text-center hidden sm:block">{diff.description}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Question Count */}
      <div className="mb-10">
        <label className="block text-sm font-medium text-gray-300 mb-3">
          Number of Questions
        </label>
        <div className="flex gap-3">
          {questionCounts.map((count) => (
            <button
              key={count}
              onClick={() => setQuestionCount(count)}
              className={cn(
                'flex-1 py-3 px-4 rounded-full border font-medium transition-all duration-200',
                questionCount === count
                  ? 'bg-purple-500 border-purple-500 text-white'
                  : 'bg-[#111827] border-[#1F2937] text-gray-300 hover:border-purple-500/30'
              )}
            >
              {count}
            </button>
          ))}
        </div>
      </div>

      {/* Start Button */}
      <Button
        onClick={() => onStartQuiz({ materialId: selectedMaterial, difficulty, questionCount })}
        disabled={!canStart}
        className="w-full h-14 text-lg font-semibold bg-gradient-to-r from-purple-600 to-purple-500 hover:from-purple-500 hover:to-purple-400 disabled:opacity-50 disabled:cursor-not-allowed rounded-xl transition-all duration-200"
      >
        Start Quiz
      </Button>
    </div>
  );
}
