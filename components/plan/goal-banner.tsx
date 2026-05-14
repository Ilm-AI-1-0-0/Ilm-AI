'use client';

import { Target, Pencil, Calendar } from 'lucide-react';

interface GoalBannerProps {
  goalTitle: string;
  daysLeft: number;
  onEdit: () => void;
}

export default function GoalBanner({ goalTitle, daysLeft, onEdit }: GoalBannerProps) {
  const urgencyColor = daysLeft <= 3 
    ? 'from-red-500/20 to-orange-500/10 border-red-500/30' 
    : daysLeft <= 7 
    ? 'from-yellow-500/20 to-amber-500/10 border-yellow-500/30'
    : 'from-purple-500/20 to-purple-500/10 border-purple-500/30';

  const textColor = daysLeft <= 3 
    ? 'text-red-400' 
    : daysLeft <= 7 
    ? 'text-yellow-400'
    : 'text-purple-400';

  return (
    <div className={`bg-gradient-to-r ${urgencyColor} border rounded-2xl p-4 sm:p-6`}>
      <div className="flex items-start sm:items-center justify-between gap-4 flex-col sm:flex-row">
        <div className="flex items-start sm:items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-purple-500/20 border border-purple-500/30 flex items-center justify-center flex-shrink-0">
            <Target size={24} className="text-purple-400" />
          </div>
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-gray-400 text-sm font-medium">Goal:</span>
              <h2 className="text-white font-bold text-lg">{goalTitle}</h2>
            </div>
            <div className="flex items-center gap-2">
              <Calendar size={14} className={textColor} />
              <span className={`${textColor} font-semibold`}>
                {daysLeft} {daysLeft === 1 ? 'day' : 'days'} left
              </span>
            </div>
          </div>
        </div>
        
        <button
          onClick={onEdit}
          className="flex items-center gap-2 px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 rounded-lg transition-all duration-200 text-gray-300 hover:text-white"
        >
          <Pencil size={16} />
          <span className="text-sm font-medium">Edit Goal</span>
        </button>
      </div>
    </div>
  );
}
