'use client';

import { useState } from 'react';
import { Target, Calendar, Edit2, RotateCcw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';

interface LearningGoalSectionProps {
  onReset?: () => void;
}

export default function LearningGoalSection({ onReset }: LearningGoalSectionProps) {
  const [goal, setGoal] = useState('Pass Cloud Architecture Exam');
  const [targetDate, setTargetDate] = useState('2026-05-30');
  const [isEditing, setIsEditing] = useState(false);
  const [editedGoal, setEditedGoal] = useState(goal);

  const handleSaveGoal = () => {
    setGoal(editedGoal);
    setIsEditing(false);
  };

  const handleReset = () => {
    setGoal('');
    setTargetDate('');
    onReset?.();
  };

  const daysRemaining = () => {
    if (!targetDate) return null;
    const target = new Date(targetDate);
    const today = new Date();
    const diff = Math.ceil((target.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
    return diff > 0 ? diff : 0;
  };

  return (
    <div className="space-y-6">
      {/* Current Goal Display */}
      <div className="bg-[#1F2937] rounded-lg p-4 border border-[#374151]">
        <div className="flex items-start justify-between">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-lg bg-purple-500/20 flex items-center justify-center flex-shrink-0">
              <Target className="w-5 h-5 text-purple-400" />
            </div>
            <div>
              <p className="text-xs text-gray-400 uppercase tracking-wide">Current Goal</p>
              {isEditing ? (
                <div className="mt-2 space-y-3">
                  <Input
                    value={editedGoal}
                    onChange={(e) => setEditedGoal(e.target.value)}
                    className="bg-[#111827] border-[#374151] text-white"
                    placeholder="Enter your learning goal"
                  />
                  <div className="flex gap-2">
                    <Button 
                      size="sm" 
                      onClick={handleSaveGoal}
                      className="bg-purple-500 hover:bg-purple-600"
                    >
                      Save
                    </Button>
                    <Button 
                      size="sm" 
                      variant="outline" 
                      onClick={() => {
                        setIsEditing(false);
                        setEditedGoal(goal);
                      }}
                      className="border-[#374151] text-gray-300 hover:bg-[#374151]"
                    >
                      Cancel
                    </Button>
                  </div>
                </div>
              ) : (
                <p className="text-white font-medium mt-1">
                  {goal || 'No goal set'}
                </p>
              )}
            </div>
          </div>
          {!isEditing && (
            <button
              onClick={() => setIsEditing(true)}
              className="p-2 rounded-lg hover:bg-[#374151] transition-colors"
            >
              <Edit2 className="w-4 h-4 text-gray-400" />
            </button>
          )}
        </div>

        {daysRemaining() !== null && !isEditing && (
          <div className="mt-4 pt-4 border-t border-[#374151]">
            <div className="flex items-center gap-2 text-sm">
              <Calendar className="w-4 h-4 text-gray-400" />
              <span className="text-gray-400">
                {daysRemaining()} days remaining
              </span>
            </div>
          </div>
        )}
      </div>

      {/* Target Date Picker */}
      <div className="space-y-2">
        <Label htmlFor="targetDate" className="text-gray-300">Target Date</Label>
        <Input
          id="targetDate"
          type="date"
          value={targetDate}
          onChange={(e) => setTargetDate(e.target.value)}
          className="bg-[#1F2937] border-[#374151] text-white [&::-webkit-calendar-picker-indicator]:invert"
        />
      </div>

      {/* Reset Plan Button */}
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button 
            variant="outline" 
            className="border-amber-500/50 text-amber-400 hover:bg-amber-500/10 hover:text-amber-300"
          >
            <RotateCcw className="w-4 h-4 mr-2" />
            Reset Learning Plan
          </Button>
        </AlertDialogTrigger>
        <AlertDialogContent className="bg-[#111827] border-[#374151]">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-white">Reset Learning Plan?</AlertDialogTitle>
            <AlertDialogDescription className="text-gray-400">
              This will clear your current goal, progress, and scheduled sessions. 
              Your uploaded materials and quiz history will be preserved.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="border-[#374151] text-gray-300 hover:bg-[#1F2937]">
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction 
              onClick={handleReset}
              className="bg-amber-500 hover:bg-amber-600 text-white"
            >
              Reset Plan
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
