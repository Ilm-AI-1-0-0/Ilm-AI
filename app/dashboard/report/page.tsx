'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Clock, ArrowRight, Sparkles, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { AppLayout } from '@/components/layouts/app-layout';
import KnowledgeDonutChart from '@/components/report/knowledge-donut-chart';
import StrongConcepts from '@/components/report/strong-concepts';
import WeakConcepts from '@/components/report/weak-concepts';
import TrendChart from '@/components/report/trend-chart';
import ReportEmptyState from '@/components/report/report-empty-state';
import { toast } from 'sonner';

// Mock data - replace with actual data fetching
const mockData = {
  sessionsCompleted: 8,
  requiredSessions: 3,
  lastUpdated: new Date().toISOString(),
  overallScore: 68,
  topicBreakdown: {
    strong: 5,
    moderate: 3,
    weak: 2,
  },
  strongConcepts: [
    'Cloud Computing Basics',
    'Virtual Machines',
    'Load Balancing',
    'DNS Management',
    'Container Orchestration',
  ],
  weakConcepts: [
    {
      id: '1',
      name: 'Kubernetes Networking',
      documentTitle: 'Cloud Architecture Guide.pdf',
      documentId: 'doc-1',
      accuracy: 32,
    },
    {
      id: '2',
      name: 'IAM Policies',
      documentTitle: 'AWS Security Best Practices.pdf',
      documentId: 'doc-2',
      accuracy: 45,
    },
    {
      id: '3',
      name: 'Database Sharding',
      documentTitle: 'Distributed Systems Fundamentals.pdf',
      documentId: 'doc-3',
      accuracy: 28,
    },
  ],
  trendData: [
    { session: 1, score: 45, date: '2024-01-10' },
    { session: 2, score: 52, date: '2024-01-12' },
    { session: 3, score: 48, date: '2024-01-15' },
    { session: 4, score: 58, date: '2024-01-18' },
    { session: 5, score: 55, date: '2024-01-20' },
    { session: 6, score: 62, date: '2024-01-22' },
    { session: 7, score: 65, date: '2024-01-25' },
    { session: 8, score: 68, date: '2024-01-28' },
  ],
};

export default function ReportPage() {
  const [isRefreshing, setIsRefreshing] = useState(false);

  const hasEnoughSessions = mockData.sessionsCompleted >= mockData.requiredSessions;

  const handleRefresh = () => {
    setIsRefreshing(true);
    // Simulate refresh
    setTimeout(() => {
      setIsRefreshing(false);
      toast.success('Report refreshed');
    }, 1500);
  };

  const formatLastUpdated = (isoString: string) => {
    const date = new Date(isoString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  if (!hasEnoughSessions) {
    return (
      <AppLayout>
        <div className="max-w-6xl mx-auto px-4 md:px-8 py-6 lg:py-8 pb-24 lg:pb-8">
          <ReportEmptyState 
            sessionsCompleted={mockData.sessionsCompleted} 
            requiredSessions={mockData.requiredSessions} 
          />
        </div>
      </AppLayout>
    );
  }

  return (
    <AppLayout>
      <div className="max-w-6xl mx-auto px-4 md:px-8 py-6 lg:py-8 pb-24 lg:pb-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-foreground text-2xl md:text-3xl font-bold mb-2">
              Your Knowledge Report
            </h1>
            <div className="flex items-center gap-2 text-muted-foreground text-sm">
              <Clock size={14} />
              <span>Last updated: {formatLastUpdated(mockData.lastUpdated)}</span>
            </div>
          </div>
          
          <Button
            variant="outline"
            size="sm"
            onClick={handleRefresh}
            disabled={isRefreshing}
            className="gap-2"
          >
            <RefreshCw size={14} className={isRefreshing ? 'animate-spin' : ''} />
            Refresh Report
          </Button>
        </div>

        {/* Main Content */}
        <div className="space-y-6">
          {/* Overall Score - Donut Chart */}
          <KnowledgeDonutChart
            score={mockData.overallScore}
            strong={mockData.topicBreakdown.strong}
            moderate={mockData.topicBreakdown.moderate}
            weak={mockData.topicBreakdown.weak}
          />

          {/* Two Column Layout for Strong/Weak */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Strong Concepts */}
            <StrongConcepts concepts={mockData.strongConcepts} />
            
            {/* Trend Chart */}
            <TrendChart data={mockData.trendData} />
          </div>

          {/* Weak Concepts - Full Width */}
          <WeakConcepts concepts={mockData.weakConcepts} />

          {/* Bottom CTA */}
          <div className="bg-gradient-to-r from-primary/20 via-purple-500/15 to-primary/20 border border-primary/30 rounded-2xl p-6 md:p-8">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-primary/20 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Sparkles size={24} className="text-primary" />
                </div>
                <div>
                  <h3 className="text-foreground text-lg font-bold mb-1">
                    Focus on Your Weak Areas
                  </h3>
                  <p className="text-muted-foreground text-sm">
                    Take a targeted quiz focusing on your weak topics to improve your overall knowledge score.
                  </p>
                </div>
              </div>
              
              <Link href="/dashboard/quiz?focus=weak">
                <Button className="w-full md:w-auto bg-primary hover:bg-primary/90 text-primary-foreground gap-2 group">
                  Start Focused Quiz
                  <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
