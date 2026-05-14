'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { ArrowRight, AlertCircle } from 'lucide-react';

const learningGoalSchema = z.object({
  learningGoal: z
    .string()
    .min(10, 'Please describe your goal in at least 10 characters')
    .max(300, 'Goal description is too long (max 300 characters)'),
});

type LearningGoalFormData = z.infer<typeof learningGoalSchema>;

const EXAMPLE_GOALS = [
  'Preparing for university exam',
  'Learning cloud architecture',
  'Studying tax law',
  'Mastering React fundamentals',
  'Preparing for job interviews',
  'Learning machine learning basics',
];

interface Step1Props {
  value: string;
  onNext: (data: { learningGoal: string }) => void;
}

export default function Step1LearningGoal({ value, onNext }: Step1Props) {
  const [selectedChip, setSelectedChip] = useState<string | null>(value || null);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isValid },
  } = useForm<LearningGoalFormData>({
    resolver: zodResolver(learningGoalSchema),
    mode: 'onChange',
    defaultValues: {
      learningGoal: value,
    },
  });

  const currentValue = watch('learningGoal');

  const handleChipClick = (goal: string) => {
    setValue('learningGoal', goal, { shouldValidate: true });
    setSelectedChip(goal);
  };

  const onSubmit = (data: LearningGoalFormData) => {
    onNext({ learningGoal: data.learningGoal });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8 sm:space-y-10">
      {/* Heading */}
      <div className="text-center">
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight mb-4">
          What are you learning?
        </h1>
        <p className="text-base sm:text-lg text-muted-foreground max-w-lg mx-auto">
          Tell us about your learning goal so we can create a personalized experience for you.
        </p>
      </div>

      {/* Input Field */}
      <div className="max-w-xl mx-auto w-full">
        <label className="block text-sm font-medium text-foreground mb-3">
          Describe your learning goal
        </label>
        <textarea
          {...register('learningGoal')}
          onChange={(e) => {
            setValue('learningGoal', e.target.value, { shouldValidate: true });
            setSelectedChip(null);
          }}
          placeholder="e.g., Master web development with Next.js and React"
          className={`w-full px-4 py-3 sm:py-4 rounded-lg bg-card border-2 transition-all duration-200 text-base sm:text-lg placeholder-muted-foreground focus:outline-none ${
            errors.learningGoal
              ? 'border-red-500 focus:border-red-500 focus:ring-2 focus:ring-red-500/20'
              : 'border-border focus:border-primary focus:ring-2 focus:ring-primary/20 hover:border-muted'
          }`}
          rows={4}
        />
        {errors.learningGoal && (
          <p className="mt-2 text-sm text-red-400 flex items-center gap-1">
            <AlertCircle className="w-4 h-4" />
            {errors.learningGoal.message}
          </p>
        )}
        {currentValue && !errors.learningGoal && (
          <p className="mt-2 text-xs text-muted-foreground">
            {currentValue.length}/300 characters
          </p>
        )}
      </div>

      {/* Example Chips */}
      <div className="max-w-xl mx-auto w-full">
        <p className="text-xs sm:text-sm font-medium text-muted-foreground mb-3 uppercase tracking-wider">
          Popular goals
        </p>
        <div className="flex flex-wrap gap-2 sm:gap-3">
          {EXAMPLE_GOALS.map((goal) => (
            <button
              key={goal}
              type="button"
              onClick={() => handleChipClick(goal)}
              className={`px-3 sm:px-4 py-2 sm:py-2.5 rounded-full text-xs sm:text-sm font-medium transition-all duration-200 ${
                selectedChip === goal
                  ? 'bg-primary text-primary-foreground shadow-lg shadow-primary/30 scale-105'
                  : 'bg-card border border-border text-foreground hover:border-primary hover:bg-primary/5'
              }`}
            >
              {goal}
            </button>
          ))}
        </div>
      </div>

      {/* Submit Button */}
      <div className="flex justify-center pt-4">
        <button
          type="submit"
          disabled={!isValid}
          className={`group px-8 sm:px-10 py-3 sm:py-4 rounded-lg font-semibold text-base sm:text-lg flex items-center gap-2 transition-all duration-200 ${
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
