'use client';

import Link from 'next/link';
import { BarChart3, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface ReportEmptyStateProps {
  sessionsCompleted: number;
  requiredSessions: number;
}

export default function ReportEmptyState({ 
  sessionsCompleted, 
  requiredSessions 
}: ReportEmptyStateProps) {
  const remaining = requiredSessions - sessionsCompleted;

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4">
      <div className="relative mb-6">
        <div className="w-24 h-24 bg-primary/10 rounded-full flex items-center justify-center">
          <BarChart3 size={40} className="text-primary" />
        </div>
        <div className="absolute -bottom-1 -right-1 w-8 h-8 bg-amber-500/20 rounded-full flex items-center justify-center border-2 border-background">
          <Sparkles size={16} className="text-amber-400" />
        </div>
      </div>
      
      <h2 className="text-foreground text-2xl font-bold mb-3">
        Build Your Knowledge Report
      </h2>
      
      <p className="text-muted-foreground max-w-md mb-6">
        Complete at least {requiredSessions} quiz sessions to generate your personalized knowledge report.
      </p>
      
      {/* Progress indicator */}
      <div className="w-full max-w-xs mb-6">
        <div className="flex items-center justify-between text-sm mb-2">
          <span className="text-muted-foreground">Progress</span>
          <span className="text-foreground font-medium">
            {sessionsCompleted} / {requiredSessions} sessions
          </span>
        </div>
        <div className="h-2 bg-muted rounded-full overflow-hidden">
          <div 
            className="h-full bg-gradient-to-r from-primary to-purple-400 rounded-full transition-all duration-500"
            style={{ width: `${(sessionsCompleted / requiredSessions) * 100}%` }}
          />
        </div>
        <p className="text-xs text-muted-foreground mt-2">
          {remaining} more {remaining === 1 ? 'session' : 'sessions'} to unlock your report
        </p>
      </div>
      
      <Link href="/dashboard/quiz">
        <Button className="bg-primary hover:bg-primary/90 text-primary-foreground gap-2">
          <Sparkles size={16} />
          Start a Quiz Session
        </Button>
      </Link>
    </div>
  );
}
