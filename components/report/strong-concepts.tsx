'use client';

import { CheckCircle } from 'lucide-react';

interface StrongConceptsProps {
  concepts: string[];
}

export default function StrongConcepts({ concepts }: StrongConceptsProps) {
  if (concepts.length === 0) {
    return (
      <div className="bg-card border border-border rounded-2xl p-6">
        <div className="flex items-center gap-3 mb-4">
          <CheckCircle size={20} className="text-emerald-400" />
          <h2 className="text-foreground font-bold text-lg">What You Know Well</h2>
        </div>
        <p className="text-muted-foreground text-sm">
          Keep practicing to build your strong concepts!
        </p>
      </div>
    );
  }

  return (
    <div className="bg-card border border-border rounded-2xl p-6">
      <div className="flex items-center gap-3 mb-4">
        <CheckCircle size={20} className="text-emerald-400" />
        <h2 className="text-foreground font-bold text-lg">What You Know Well</h2>
      </div>
      
      <div className="flex flex-wrap gap-2">
        {concepts.map((concept, index) => (
          <span
            key={index}
            className="px-3 py-1.5 bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 rounded-full text-sm font-medium"
          >
            {concept}
          </span>
        ))}
      </div>
    </div>
  );
}
