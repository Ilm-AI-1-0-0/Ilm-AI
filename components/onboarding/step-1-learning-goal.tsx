'use client';

import { useState } from 'react';
import { ArrowRight } from 'lucide-react';

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
  const [input, setInput] = useState(value);
  const [selectedChip, setSelectedChip] = useState<string | null>(
    value ? value : null
  );
  const [isFocused, setIsFocused] = useState(false);

  const handleChipClick = (goal: string) => {
    setInput(goal);
    setSelectedChip(goal);
  };

  const handleSubmit = () => {
    if (input.trim()) {
      onNext({ learningGoal: input });
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && input.trim()) {
      handleSubmit();
    }
  };

  const isValid = input.trim().length > 0;

  return (
    <div className="space-y-8 sm:space-y-10">
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
          value={input}
          onChange={(e) => {
            setInput(e.target.value);
            setSelectedChip(null);
          }}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          onKeyDown={handleKeyDown}
          placeholder="e.g., Master web development with Next.js and React"
          className={`w-full px-4 py-3 sm:py-4 rounded-lg bg-card border-2 transition-all duration-200 text-base sm:text-lg placeholder-muted-foreground focus:outline-none ${
            isFocused
              ? 'border-primary ring-2 ring-primary/20'
              : 'border-border hover:border-muted'
          }`}
          rows={4}
        />
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
          onClick={handleSubmit}
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
    </div>
  );
}
