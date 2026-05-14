'use client';

import Link from 'next/link';
import { AlertTriangle, FileText, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface WeakConcept {
  id: string;
  name: string;
  documentTitle: string;
  documentId: string;
  accuracy: number;
}

interface WeakConceptsProps {
  concepts: WeakConcept[];
}

export default function WeakConcepts({ concepts }: WeakConceptsProps) {
  if (concepts.length === 0) {
    return (
      <div className="bg-card border border-border rounded-2xl p-6">
        <div className="flex items-center gap-3 mb-4">
          <AlertTriangle size={20} className="text-amber-400" />
          <h2 className="text-foreground font-bold text-lg">Needs More Work</h2>
        </div>
        <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-lg p-4">
          <p className="text-emerald-400 text-sm">
            Great job! No weak areas detected. Keep up the excellent work!
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-card border border-border rounded-2xl p-6">
      <div className="flex items-center gap-3 mb-4">
        <AlertTriangle size={20} className="text-amber-400" />
        <h2 className="text-foreground font-bold text-lg">Needs More Work</h2>
      </div>
      
      <div className="space-y-3">
        {concepts.map((concept) => (
          <div
            key={concept.id}
            className="bg-gradient-to-r from-red-500/10 to-orange-500/5 border border-red-500/20 rounded-xl p-4 hover:border-red-500/40 transition-colors"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="flex-1">
                <h3 className="text-foreground font-semibold mb-1">{concept.name}</h3>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <FileText size={14} className="text-primary" />
                  <span>{concept.documentTitle}</span>
                </div>
                <div className="mt-2 flex items-center gap-2">
                  <div className="flex-1 h-1.5 bg-muted rounded-full overflow-hidden max-w-[120px]">
                    <div 
                      className="h-full bg-red-500 rounded-full"
                      style={{ width: `${concept.accuracy}%` }}
                    />
                  </div>
                  <span className="text-xs text-red-400">{concept.accuracy}% accuracy</span>
                </div>
              </div>
              
              <Link href={`/dashboard/chat?doc=${concept.documentId}&topic=${encodeURIComponent(concept.name)}`}>
                <Button 
                  variant="outline" 
                  size="sm"
                  className="border-red-500/30 text-red-400 hover:bg-red-500/10 hover:text-red-300 hover:border-red-500/50 gap-2"
                >
                  Review now
                  <ArrowRight size={14} />
                </Button>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
