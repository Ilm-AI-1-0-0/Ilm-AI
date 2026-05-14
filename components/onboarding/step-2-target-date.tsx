'use client';

import { useState } from 'react';
import { ArrowRight, Calendar } from 'lucide-react';

interface Step2Props {
  value: Date | null;
  onNext: (data: { targetDate: Date }) => void;
  onSkip: () => void;
}

export default function Step2TargetDate({ value, onNext, onSkip }: Step2Props) {
  const [selectedDate, setSelectedDate] = useState<string>(
    value ? value.toISOString().split('T')[0] : ''
  );
  const [showCalendar, setShowCalendar] = useState(false);

  const handleDateSelect = (date: string) => {
    setSelectedDate(date);
  };

  const handleSubmit = () => {
    if (selectedDate) {
      const dateObj = new Date(selectedDate);
      onNext({ targetDate: dateObj });
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && selectedDate) {
      handleSubmit();
    }
  };

  const isValid = selectedDate.length > 0;
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
    <div className="space-y-8 sm:space-y-10">
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
            value={selectedDate}
            onChange={(e) => handleDateSelect(e.target.value)}
            onKeyDown={handleKeyDown}
            min={today.toISOString().split('T')[0]}
            max={maxDate.toISOString().split('T')[0]}
            className="w-full px-4 sm:px-5 py-3 sm:py-4 rounded-lg bg-card border-2 border-border text-base sm:text-lg text-foreground placeholder-muted-foreground focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-200 appearance-none cursor-pointer"
          />
          <Calendar className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground pointer-events-none" />
        </div>
      </div>

      {/* Selected Date Display */}
      {selectedDate && (
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
          onClick={onSkip}
          className="px-6 sm:px-8 py-3 sm:py-4 rounded-lg font-semibold text-base sm:text-lg text-foreground bg-card border border-border hover:border-muted hover:bg-muted/20 transition-all duration-200"
        >
          Skip for now
        </button>
        <button
          onClick={handleSubmit}
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
    </div>
  );
}
