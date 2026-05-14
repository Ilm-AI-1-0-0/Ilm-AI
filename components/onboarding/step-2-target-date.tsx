'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { ArrowRight, Calendar, AlertCircle } from 'lucide-react';

const targetDateSchema = z.object({
  targetDate: z
    .string()
    .min(1, 'Please select a target date')
    .refine((val) => {
      const selectedDate = new Date(val);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      return selectedDate >= today;
    }, 'Target date must be today or in the future'),
});

type TargetDateFormData = z.infer<typeof targetDateSchema>;

interface Step2Props {
  value: Date | null;
  onNext: (data: { targetDate: Date }) => void;
  onSkip: () => void;
}

export default function Step2TargetDate({ value, onNext, onSkip }: Step2Props) {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isValid },
  } = useForm<TargetDateFormData>({
    resolver: zodResolver(targetDateSchema),
    mode: 'onChange',
    defaultValues: {
      targetDate: value ? value.toISOString().split('T')[0] : '',
    },
  });

  const selectedDate = watch('targetDate');

  const onSubmit = (data: TargetDateFormData) => {
    const dateObj = new Date(data.targetDate);
    onNext({ targetDate: dateObj });
  };

  const selectedDateObj = selectedDate ? new Date(selectedDate) : null;
  const formattedDate = selectedDateObj
    ? selectedDateObj.toLocaleDateString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      })
    : '';

  // Generate calendar dates for next 12 months
  const today = new Date();
  const maxDate = new Date(today.getFullYear() + 1, today.getMonth(), today.getDate());

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8 sm:space-y-10">
      {/* Heading */}
      <div className="text-center">
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight mb-4">
          Set your target date
        </h1>
        <p className="text-base sm:text-lg text-muted-foreground max-w-lg mx-auto">
          When do you want to achieve this goal? This helps us create a realistic learning plan.
        </p>
      </div>

      {/* Date Input */}
      <div className="max-w-xl mx-auto w-full">
        <label className="block text-sm font-medium text-foreground mb-3">
          Target completion date
        </label>
        <div className="relative">
          <input
            type="date"
            {...register('targetDate')}
            min={today.toISOString().split('T')[0]}
            max={maxDate.toISOString().split('T')[0]}
            className={`w-full px-4 sm:px-5 py-3 sm:py-4 rounded-lg bg-card border-2 text-base sm:text-lg text-foreground placeholder-muted-foreground focus:outline-none transition-all duration-200 appearance-none cursor-pointer ${
              errors.targetDate
                ? 'border-red-500 focus:border-red-500 focus:ring-2 focus:ring-red-500/20'
                : 'border-border focus:border-primary focus:ring-2 focus:ring-primary/20'
            }`}
          />
          <Calendar className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground pointer-events-none" />
        </div>
        {errors.targetDate && (
          <p className="mt-2 text-sm text-red-400 flex items-center gap-1">
            <AlertCircle className="w-4 h-4" />
            {errors.targetDate.message}
          </p>
        )}
      </div>

      {/* Selected Date Display */}
      {selectedDate && !errors.targetDate && (
        <div className="max-w-xl mx-auto w-full animate-fade-in">
          <div className="p-4 sm:p-6 rounded-lg bg-primary/10 border border-primary/20">
            <p className="text-sm text-muted-foreground mb-1">You selected</p>
            <p className="text-xl sm:text-2xl font-bold text-primary">{formattedDate}</p>
            <p className="text-xs sm:text-sm text-muted-foreground mt-3">
              {(() => {
                const daysUntil = Math.ceil(
                  (selectedDateObj!.getTime() - today.getTime()) / (1000 * 60 * 60 * 24)
                );
                if (daysUntil === 0) return 'That\'s today!';
                if (daysUntil === 1) return 'That\'s tomorrow!';
                if (daysUntil < 30) return `${daysUntil} days from now`;
                const weeks = Math.floor(daysUntil / 7);
                return `${weeks} weeks from now`;
              })()}
            </p>
          </div>
        </div>
      )}

      {/* Buttons */}
      <div className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-4 pt-4">
        <button
          type="button"
          onClick={onSkip}
          className="px-6 sm:px-8 py-3 sm:py-4 rounded-lg font-semibold text-base sm:text-lg text-foreground bg-card border border-border hover:border-muted hover:bg-muted/20 transition-all duration-200"
        >
          Skip for now
        </button>
        <button
          type="submit"
          disabled={!isValid}
          className={`group px-8 sm:px-10 py-3 sm:py-4 rounded-lg font-semibold text-base sm:text-lg flex items-center justify-center gap-2 transition-all duration-200 ${
            isValid
              ? 'bg-primary text-primary-foreground shadow-lg shadow-primary/30 hover:shadow-lg hover:shadow-primary/40 hover:scale-105'
              : 'bg-muted text-muted-foreground cursor-not-allowed'
          }`}
        >
          Continue
          <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
        </button>
      </div>
    </form>
  );
}
