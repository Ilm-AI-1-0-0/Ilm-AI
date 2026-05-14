'use client';

import { useState, useEffect } from 'react';
import { Progress } from '@/components/ui/progress';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Clock, CheckCircle2, XCircle, ArrowRight, BookOpen } from 'lucide-react';

export interface Question {
  id: string;
  text: string;
  type: 'multiple-choice' | 'short-answer';
  options?: string[];
  correctAnswer: string | number;
  explanation: string;
  source: string;
}

interface QuizQuestionProps {
  question: Question;
  questionNumber: number;
  totalQuestions: number;
  onAnswer: (answer: string | number, isCorrect: boolean) => void;
  onNext: () => void;
}

export default function QuizQuestion({
  question,
  questionNumber,
  totalQuestions,
  onAnswer,
  onNext,
}: QuizQuestionProps) {
  const [selectedAnswer, setSelectedAnswer] = useState<string | number | null>(null);
  const [textAnswer, setTextAnswer] = useState('');
  const [isRevealed, setIsRevealed] = useState(false);
  const [timeElapsed, setTimeElapsed] = useState(0);

  // Timer
  useEffect(() => {
    if (isRevealed) return;
    const interval = setInterval(() => {
      setTimeElapsed((prev) => prev + 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [isRevealed]);

  // Reset state when question changes
  useEffect(() => {
    setSelectedAnswer(null);
    setTextAnswer('');
    setIsRevealed(false);
    setTimeElapsed(0);
  }, [question.id]);

  const handleSelect = (answerIndex: number) => {
    if (isRevealed) return;
    setSelectedAnswer(answerIndex);
  };

  const handleSubmit = () => {
    if (isRevealed) {
      onNext();
      return;
    }

    const answer = question.type === 'short-answer' ? textAnswer : selectedAnswer;
    if (answer === null && question.type === 'multiple-choice') return;
    if (question.type === 'short-answer' && !textAnswer.trim()) return;

    const isCorrect = question.type === 'short-answer'
      ? textAnswer.toLowerCase().trim() === String(question.correctAnswer).toLowerCase().trim()
      : selectedAnswer === question.correctAnswer;

    setIsRevealed(true);
    onAnswer(answer as string | number, isCorrect);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const isCorrect = question.type === 'short-answer'
    ? textAnswer.toLowerCase().trim() === String(question.correctAnswer).toLowerCase().trim()
    : selectedAnswer === question.correctAnswer;

  const progressValue = (questionNumber / totalQuestions) * 100;

  return (
    <div className="max-w-3xl mx-auto animate-fade-in">
      {/* Progress Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-3">
          <span className="text-sm font-medium text-gray-400">
            Question {questionNumber} of {totalQuestions}
          </span>
          <div className="flex items-center gap-2 text-gray-400">
            <Clock size={16} />
            <span className="text-sm font-mono">{formatTime(timeElapsed)}</span>
          </div>
        </div>
        <Progress value={progressValue} className="h-2" />
      </div>

      {/* Question Card */}
      <div className="bg-[#111827] border border-[#1F2937] rounded-2xl p-6 md:p-8 mb-6">
        <p className="text-lg md:text-xl font-medium text-white leading-relaxed">
          {question.text}
        </p>
      </div>

      {/* Answer Options */}
      {question.type === 'multiple-choice' && question.options && (
        <div className="grid gap-3 mb-6">
          {question.options.map((option, index) => {
            const isSelected = selectedAnswer === index;
            const isCorrectOption = index === question.correctAnswer;
            
            let cardStyle = 'bg-[#111827] border-[#1F2937] text-gray-300 hover:border-purple-500/50 hover:bg-purple-500/10';
            
            if (isRevealed) {
              if (isCorrectOption) {
                cardStyle = 'bg-emerald-500/20 border-emerald-500/50 text-emerald-300';
              } else if (isSelected && !isCorrectOption) {
                cardStyle = 'bg-red-500/20 border-red-500/50 text-red-300';
              } else {
                cardStyle = 'bg-[#111827] border-[#1F2937] text-gray-500 opacity-60';
              }
            } else if (isSelected) {
              cardStyle = 'bg-purple-500/20 border-purple-500/50 text-white';
            }

            return (
              <button
                key={index}
                onClick={() => handleSelect(index)}
                disabled={isRevealed}
                className={cn(
                  'flex items-center gap-4 p-4 rounded-xl border transition-all duration-300 text-left',
                  cardStyle,
                  !isRevealed && 'cursor-pointer'
                )}
              >
                <div className={cn(
                  'w-8 h-8 rounded-lg flex items-center justify-center font-medium text-sm shrink-0 transition-colors',
                  isRevealed && isCorrectOption ? 'bg-emerald-500 text-white' :
                  isRevealed && isSelected && !isCorrectOption ? 'bg-red-500 text-white' :
                  isSelected && !isRevealed ? 'bg-purple-500 text-white' :
                  'bg-[#1F2937] text-gray-400'
                )}>
                  {isRevealed && isCorrectOption ? (
                    <CheckCircle2 size={18} />
                  ) : isRevealed && isSelected && !isCorrectOption ? (
                    <XCircle size={18} />
                  ) : (
                    String.fromCharCode(65 + index)
                  )}
                </div>
                <span className="flex-1">{option}</span>
              </button>
            );
          })}
        </div>
      )}

      {/* Short Answer Input */}
      {question.type === 'short-answer' && (
        <div className="mb-6">
          <Input
            value={textAnswer}
            onChange={(e) => setTextAnswer(e.target.value)}
            placeholder="Type your answer..."
            disabled={isRevealed}
            className={cn(
              'h-14 text-lg bg-[#111827] border-[#1F2937] text-white placeholder:text-gray-500',
              isRevealed && isCorrect && 'border-emerald-500/50 bg-emerald-500/10',
              isRevealed && !isCorrect && 'border-red-500/50 bg-red-500/10'
            )}
          />
          {isRevealed && !isCorrect && (
            <p className="mt-3 text-emerald-400 text-sm">
              Correct answer: <span className="font-medium">{question.correctAnswer}</span>
            </p>
          )}
        </div>
      )}

      {/* Explanation Card (shown after answer) */}
      {isRevealed && (
        <div className={cn(
          'rounded-2xl p-6 mb-6 border animate-fade-in',
          isCorrect 
            ? 'bg-emerald-500/10 border-emerald-500/30' 
            : 'bg-amber-500/10 border-amber-500/30'
        )}>
          <div className="flex items-start gap-3">
            <BookOpen size={20} className={isCorrect ? 'text-emerald-400 mt-0.5' : 'text-amber-400 mt-0.5'} />
            <div>
              <p className={cn(
                'font-medium mb-2',
                isCorrect ? 'text-emerald-300' : 'text-amber-300'
              )}>
                {isCorrect ? 'Correct!' : 'Here\'s what the material says...'}
              </p>
              <p className="text-gray-300 leading-relaxed mb-3">
                {question.explanation}
              </p>
              <p className="text-xs text-gray-400">
                Source: <span className="text-purple-400">{question.source}</span>
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Submit/Next Button */}
      <Button
        onClick={handleSubmit}
        disabled={!isRevealed && selectedAnswer === null && !textAnswer.trim()}
        className={cn(
          'w-full h-14 text-lg font-semibold rounded-xl transition-all duration-200',
          isRevealed
            ? 'bg-gradient-to-r from-purple-600 to-purple-500 hover:from-purple-500 hover:to-purple-400'
            : 'bg-purple-500 hover:bg-purple-400'
        )}
      >
        {isRevealed ? (
          <>
            {questionNumber === totalQuestions ? 'See Results' : 'Next Question'}
            <ArrowRight size={20} className="ml-2" />
          </>
        ) : (
          'Check Answer'
        )}
      </Button>
    </div>
  );
}
