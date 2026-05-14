'use client';

import { Sparkles, Upload } from 'lucide-react';

export function ChatEmptyState() {
  return (
    <div className="flex-1 flex flex-col items-center justify-center px-4 py-12 text-center">
      <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center mb-4">
        <Sparkles className="w-8 h-8 text-primary" />
      </div>
      <h2 className="text-xl font-semibold text-foreground mb-2">
        Start Your Learning Conversation
      </h2>
      <p className="text-muted-foreground max-w-sm mb-6">
        Ask anything about your uploaded materials. I'll answer from what
        you've shared — nothing else.
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 w-full max-w-sm">
        <button className="flex items-center justify-center gap-2 px-4 py-3 rounded-lg border border-border hover:bg-card transition-colors text-sm font-medium text-foreground">
          <Upload className="w-4 h-4" />
          Upload Materials
        </button>
        <button className="flex items-center justify-center gap-2 px-4 py-3 rounded-lg bg-primary hover:bg-primary/90 transition-colors text-sm font-medium text-primary-foreground">
          <Sparkles className="w-4 h-4" />
          Ask a Question
        </button>
      </div>
    </div>
  );
}
