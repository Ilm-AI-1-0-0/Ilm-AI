'use client';

import { ChevronLeft, ChevronRight, Check } from 'lucide-react';

interface DayData {
  dayName: string;
  date: number;
  isToday: boolean;
  isCompleted: boolean;
  hasContent: boolean;
}

interface WeeklyCalendarProps {
  days: DayData[];
  selectedDay: number;
  onSelectDay: (index: number) => void;
  onPreviousWeek: () => void;
  onNextWeek: () => void;
  weekLabel: string;
}

export default function WeeklyCalendar({
  days,
  selectedDay,
  onSelectDay,
  onPreviousWeek,
  onNextWeek,
  weekLabel,
}: WeeklyCalendarProps) {
  return (
    <div className="bg-[#111827] border border-[#1F2937] rounded-2xl p-4 sm:p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-white font-semibold">{weekLabel}</h3>
        <div className="flex items-center gap-2">
          <button
            onClick={onPreviousWeek}
            className="p-2 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 transition-colors"
            aria-label="Previous week"
          >
            <ChevronLeft size={18} className="text-gray-400" />
          </button>
          <button
            onClick={onNextWeek}
            className="p-2 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 transition-colors"
            aria-label="Next week"
          >
            <ChevronRight size={18} className="text-gray-400" />
          </button>
        </div>
      </div>

      {/* Days Grid */}
      <div className="grid grid-cols-7 gap-2">
        {days.map((day, index) => (
          <button
            key={index}
            onClick={() => onSelectDay(index)}
            className={`relative flex flex-col items-center p-2 sm:p-3 rounded-xl transition-all duration-200 ${
              selectedDay === index
                ? 'bg-purple-500/20 border-2 border-purple-500'
                : day.isToday
                ? 'bg-purple-500/10 border border-purple-500/30'
                : 'bg-white/5 border border-transparent hover:border-white/10'
            }`}
          >
            <span className="text-xs text-gray-400 mb-1">{day.dayName}</span>
            <span
              className={`text-lg font-bold ${
                selectedDay === index || day.isToday ? 'text-purple-400' : 'text-white'
              }`}
            >
              {day.date}
            </span>
            
            {/* Indicators */}
            <div className="flex items-center gap-1 mt-1 h-4">
              {day.isCompleted && (
                <div className="w-4 h-4 rounded-full bg-green-500/20 flex items-center justify-center">
                  <Check size={10} className="text-green-400" />
                </div>
              )}
              {day.hasContent && !day.isCompleted && (
                <div className="w-2 h-2 rounded-full bg-purple-500" />
              )}
            </div>

            {/* Today indicator */}
            {day.isToday && (
              <span className="absolute -top-1 -right-1 px-1.5 py-0.5 bg-purple-500 text-white text-[10px] font-bold rounded">
                Today
              </span>
            )}
          </button>
        ))}
      </div>
    </div>
  );
}
