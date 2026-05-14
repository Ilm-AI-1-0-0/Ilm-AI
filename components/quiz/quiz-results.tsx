'use client';

import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Trophy, Target, RotateCcw, Home, Eye, CheckCircle2, XCircle } from 'lucide-react';
import type { Question } from './quiz-question';

interface QuizResultsProps {
  score: number;
  totalQuestions: number;
  answers: { question: Question; userAnswer: string | number; isCorrect: boolean }[];
  onReviewMissed: () => void;
  onRetakeQuiz: () => void;
  onBackToDashboard: () => void;
}

export default function QuizResults({
  score,
  totalQuestions,
  answers,
  onReviewMissed,
  onRetakeQuiz,
  onBackToDashboard,
}: QuizResultsProps) {
  const percentage = Math.round((score / totalQuestions) * 100);
  const missedQuestions = answers.filter((a) => !a.isCorrect);

  // Calculate topic breakdown
  const topicStats = answers.reduce((acc, answer) => {
    const topic = answer.question.source.split(',')[0] || 'General';
    if (!acc[topic]) {
      acc[topic] = { correct: 0, total: 0 };
    }
    acc[topic].total++;
    if (answer.isCorrect) {
      acc[topic].correct++;
    }
    return acc;
  }, {} as Record<string, { correct: number; total: number }>);

  const getScoreColor = () => {
    if (percentage >= 80) return 'text-emerald-400';
    if (percentage >= 60) return 'text-amber-400';
    return 'text-red-400';
  };

  const getScoreGlow = () => {
    if (percentage >= 80) return 'shadow-emerald-500/30';
    if (percentage >= 60) return 'shadow-amber-500/30';
    return 'shadow-red-500/30';
  };

  const getScoreBorder = () => {
    if (percentage >= 80) return 'border-emerald-500/50';
    if (percentage >= 60) return 'border-amber-500/50';
    return 'border-red-500/50';
  };

  const getMessage = () => {
    if (percentage >= 90) return 'Outstanding! You\'ve mastered this material!';
    if (percentage >= 80) return 'Great job! You have a solid understanding.';
    if (percentage >= 70) return 'Good work! A bit more practice will help.';
    if (percentage >= 60) return 'Not bad! Review the missed topics to improve.';
    return 'Keep practicing! Review the material and try again.';
  };

  return (
    <div className="max-w-2xl mx-auto animate-fade-in">
      {/* Score Circle */}
      <div className="text-center mb-10">
        <div className={cn(
          'w-40 h-40 mx-auto rounded-full border-4 flex flex-col items-center justify-center mb-6 shadow-lg transition-all',
          getScoreBorder(),
          getScoreGlow()
        )}>
          <div className="flex items-baseline gap-1">
            <span className={cn('text-5xl font-bold', getScoreColor())}>{score}</span>
            <span className="text-2xl text-gray-400">/{totalQuestions}</span>
          </div>
          <div className="flex items-center gap-1 mt-1">
            <Trophy size={16} className={getScoreColor()} />
            <span className={cn('text-sm font-medium', getScoreColor())}>{percentage}%</span>
          </div>
        </div>
        <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">Quiz Complete!</h2>
        <p className="text-gray-400">{getMessage()}</p>
      </div>

      {/* Performance Breakdown */}
      <div className="bg-[#111827] border border-[#1F2937] rounded-2xl p-6 mb-6">
        <h3 className="text-white font-semibold mb-4 flex items-center gap-2">
          <Target size={20} className="text-purple-400" />
          Performance Breakdown
        </h3>
        <div className="space-y-4">
          {Object.entries(topicStats).map(([topic, stats]) => {
            const topicPercentage = Math.round((stats.correct / stats.total) * 100);
            return (
              <div key={topic}>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-gray-300 text-sm truncate flex-1">{topic}</span>
                  <span className={cn(
                    'text-sm font-medium ml-2',
                    topicPercentage >= 80 ? 'text-emerald-400' :
                    topicPercentage >= 60 ? 'text-amber-400' : 'text-red-400'
                  )}>
                    {stats.correct}/{stats.total}
                  </span>
                </div>
                <div className="h-2 bg-[#1F2937] rounded-full overflow-hidden">
                  <div
                    className={cn(
                      'h-full rounded-full transition-all duration-500',
                      topicPercentage >= 80 ? 'bg-emerald-500' :
                      topicPercentage >= 60 ? 'bg-amber-500' : 'bg-red-500'
                    )}
                    style={{ width: `${topicPercentage}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Missed Questions Summary */}
      {missedQuestions.length > 0 && (
        <div className="bg-[#111827] border border-[#1F2937] rounded-2xl p-6 mb-6">
          <h3 className="text-white font-semibold mb-4 flex items-center gap-2">
            <XCircle size={20} className="text-red-400" />
            Questions to Review ({missedQuestions.length})
          </h3>
          <div className="space-y-3 max-h-48 overflow-y-auto">
            {missedQuestions.map((item, index) => (
              <div 
                key={index}
                className="flex items-start gap-3 p-3 bg-red-500/10 border border-red-500/20 rounded-lg"
              >
                <div className="w-6 h-6 rounded-full bg-red-500/20 flex items-center justify-center shrink-0 mt-0.5">
                  <span className="text-xs font-medium text-red-400">
                    {answers.findIndex(a => a.question.id === item.question.id) + 1}
                  </span>
                </div>
                <p className="text-sm text-gray-300 line-clamp-2">{item.question.text}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Action Buttons */}
      <div className="space-y-3">
        {missedQuestions.length > 0 && (
          <Button
            onClick={onReviewMissed}
            className="w-full h-12 bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 border border-amber-500/30 rounded-xl transition-all"
          >
            <Eye size={20} className="mr-2" />
            Review Missed Questions
          </Button>
        )}
        <div className="grid grid-cols-2 gap-3">
          <Button
            onClick={onRetakeQuiz}
            variant="outline"
            className="h-12 bg-[#111827] border-[#1F2937] hover:border-purple-500/30 hover:bg-purple-500/10 text-gray-300 rounded-xl transition-all"
          >
            <RotateCcw size={18} className="mr-2" />
            Take Another Quiz
          </Button>
          <Button
            onClick={onBackToDashboard}
            className="h-12 bg-gradient-to-r from-purple-600 to-purple-500 hover:from-purple-500 hover:to-purple-400 rounded-xl transition-all"
          >
            <Home size={18} className="mr-2" />
            Dashboard
          </Button>
        </div>
      </div>
    </div>
  );
}
