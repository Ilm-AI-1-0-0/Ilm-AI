'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { ArrowLeft, ArrowRight, BookOpen, CheckCircle2, XCircle } from 'lucide-react';
import type { Question } from './quiz-question';

interface ReviewMissedProps {
  missedAnswers: { question: Question; userAnswer: string | number; isCorrect: boolean }[];
  onBack: () => void;
}

export default function ReviewMissed({ missedAnswers, onBack }: ReviewMissedProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  
  if (missedAnswers.length === 0) {
    return (
      <div className="max-w-2xl mx-auto text-center animate-fade-in">
        <div className="w-20 h-20 mx-auto rounded-full bg-emerald-500/20 flex items-center justify-center mb-6">
          <CheckCircle2 size={40} className="text-emerald-400" />
        </div>
        <h2 className="text-2xl font-bold text-white mb-2">Perfect Score!</h2>
        <p className="text-gray-400 mb-6">You answered all questions correctly.</p>
        <Button onClick={onBack} className="bg-gradient-to-r from-purple-600 to-purple-500 hover:from-purple-500 hover:to-purple-400">
          <ArrowLeft size={18} className="mr-2" />
          Back to Results
        </Button>
      </div>
    );
  }

  const current = missedAnswers[currentIndex];
  const question = current.question;
  const userAnswer = current.userAnswer;

  return (
    <div className="max-w-3xl mx-auto animate-fade-in">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <Button 
          variant="ghost" 
          onClick={onBack}
          className="text-gray-400 hover:text-white"
        >
          <ArrowLeft size={18} className="mr-2" />
          Back to Results
        </Button>
        <span className="text-sm text-gray-400">
          Reviewing {currentIndex + 1} of {missedAnswers.length}
        </span>
      </div>

      {/* Question Card */}
      <div className="bg-[#111827] border border-[#1F2937] rounded-2xl p-6 md:p-8 mb-6">
        <div className="flex items-center gap-2 text-red-400 text-sm mb-4">
          <XCircle size={16} />
          <span>You missed this question</span>
        </div>
        <p className="text-lg md:text-xl font-medium text-white leading-relaxed">
          {question.text}
        </p>
      </div>

      {/* Answer Options */}
      {question.type === 'multiple-choice' && question.options && (
        <div className="grid gap-3 mb-6">
          {question.options.map((option, index) => {
            const isUserAnswer = userAnswer === index;
            const isCorrectOption = index === question.correctAnswer;
            
            let cardStyle = 'bg-[#111827] border-[#1F2937] text-gray-500 opacity-60';
            
            if (isCorrectOption) {
              cardStyle = 'bg-emerald-500/20 border-emerald-500/50 text-emerald-300';
            } else if (isUserAnswer) {
              cardStyle = 'bg-red-500/20 border-red-500/50 text-red-300';
            }

            return (
              <div
                key={index}
                className={cn(
                  'flex items-center gap-4 p-4 rounded-xl border',
                  cardStyle
                )}
              >
                <div className={cn(
                  'w-8 h-8 rounded-lg flex items-center justify-center font-medium text-sm shrink-0',
                  isCorrectOption ? 'bg-emerald-500 text-white' :
                  isUserAnswer ? 'bg-red-500 text-white' :
                  'bg-[#1F2937] text-gray-400'
                )}>
                  {isCorrectOption ? (
                    <CheckCircle2 size={18} />
                  ) : isUserAnswer ? (
                    <XCircle size={18} />
                  ) : (
                    String.fromCharCode(65 + index)
                  )}
                </div>
                <span className="flex-1">{option}</span>
                {isUserAnswer && !isCorrectOption && (
                  <span className="text-xs text-red-400 font-medium">Your answer</span>
                )}
                {isCorrectOption && (
                  <span className="text-xs text-emerald-400 font-medium">Correct</span>
                )}
              </div>
            );
          })}
        </div>
      )}

      {/* Short Answer Display */}
      {question.type === 'short-answer' && (
        <div className="space-y-3 mb-6">
          <div className="p-4 rounded-xl bg-red-500/20 border border-red-500/50">
            <p className="text-xs text-red-400 mb-1">Your answer</p>
            <p className="text-red-300">{String(userAnswer)}</p>
          </div>
          <div className="p-4 rounded-xl bg-emerald-500/20 border border-emerald-500/50">
            <p className="text-xs text-emerald-400 mb-1">Correct answer</p>
            <p className="text-emerald-300">{String(question.correctAnswer)}</p>
          </div>
        </div>
      )}

      {/* Explanation */}
      <div className="bg-amber-500/10 border border-amber-500/30 rounded-2xl p-6 mb-8">
        <div className="flex items-start gap-3">
          <BookOpen size={20} className="text-amber-400 mt-0.5 shrink-0" />
          <div>
            <p className="font-medium text-amber-300 mb-2">Explanation</p>
            <p className="text-gray-300 leading-relaxed mb-3">
              {question.explanation}
            </p>
            <p className="text-xs text-gray-400">
              Source: <span className="text-purple-400">{question.source}</span>
            </p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div className="flex items-center justify-between">
        <Button
          variant="outline"
          onClick={() => setCurrentIndex(Math.max(0, currentIndex - 1))}
          disabled={currentIndex === 0}
          className="bg-[#111827] border-[#1F2937] hover:border-purple-500/30 text-gray-300 disabled:opacity-50"
        >
          <ArrowLeft size={18} className="mr-2" />
          Previous
        </Button>
        <div className="flex gap-2">
          {missedAnswers.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentIndex(idx)}
              className={cn(
                'w-2 h-2 rounded-full transition-all',
                idx === currentIndex ? 'bg-purple-500 w-6' : 'bg-gray-600 hover:bg-gray-500'
              )}
            />
          ))}
        </div>
        <Button
          variant="outline"
          onClick={() => setCurrentIndex(Math.min(missedAnswers.length - 1, currentIndex + 1))}
          disabled={currentIndex === missedAnswers.length - 1}
          className="bg-[#111827] border-[#1F2937] hover:border-purple-500/30 text-gray-300 disabled:opacity-50"
        >
          Next
          <ArrowRight size={18} className="ml-2" />
        </Button>
      </div>
    </div>
  );
}
