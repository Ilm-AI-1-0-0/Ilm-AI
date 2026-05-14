'use client';

import { MessageCircle, FileText } from 'lucide-react';

interface ChatHeaderProps {
  sessionName: string;
  materialCount: number;
}

export function ChatHeader({ sessionName, materialCount }: ChatHeaderProps) {
  return (
    <div className="border-b border-border bg-background px-6 py-4 flex items-center justify-between">
      <div className="flex items-center gap-3">
        <div className="p-2 rounded-lg bg-primary/10">
          <MessageCircle className="w-5 h-5 text-primary" />
        </div>
        <div>
          <h1 className="text-lg font-semibold text-foreground">
            {sessionName}
          </h1>
          <p className="text-xs text-muted-foreground">
            Learning companion chat
          </p>
        </div>
      </div>

      <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-card border border-border">
        <FileText className="w-4 h-4 text-primary" />
        <span className="text-sm font-medium text-foreground">
          {materialCount}
        </span>
      </div>
    </div>
  );
}
