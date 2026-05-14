'use client';

import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';

interface KnowledgeDonutChartProps {
  score: number;
  strong: number;
  moderate: number;
  weak: number;
}

export default function KnowledgeDonutChart({ 
  score, 
  strong, 
  moderate, 
  weak 
}: KnowledgeDonutChartProps) {
  const data = [
    { name: 'Strong', value: strong, color: '#10B981' },
    { name: 'Moderate', value: moderate, color: '#F59E0B' },
    { name: 'Weak', value: weak, color: '#EF4444' },
  ].filter(item => item.value > 0);

  const getScoreColor = () => {
    if (score >= 70) return '#10B981';
    if (score >= 40) return '#F59E0B';
    return '#EF4444';
  };

  const getScoreLabel = () => {
    if (score >= 70) return 'Strong';
    if (score >= 40) return 'Moderate';
    return 'Needs Work';
  };

  return (
    <div className="bg-card border border-border rounded-2xl p-6">
      <h2 className="text-foreground font-bold text-lg mb-2">Overall Knowledge Score</h2>
      <p className="text-muted-foreground text-sm mb-6">Based on quiz performance across all topics</p>
      
      <div className="flex flex-col md:flex-row items-center gap-8">
        {/* Donut Chart */}
        <div className="relative w-48 h-48">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={80}
                paddingAngle={2}
                dataKey="value"
                strokeWidth={0}
              >
                {data.map((entry, index) => (
                  <Cell 
                    key={`cell-${index}`} 
                    fill={entry.color}
                    style={{
                      filter: `drop-shadow(0 0 6px ${entry.color}40)`
                    }}
                  />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
          
          {/* Center Score */}
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span 
              className="text-4xl font-bold"
              style={{ color: getScoreColor() }}
            >
              {score}%
            </span>
            <span 
              className="text-sm font-medium"
              style={{ color: getScoreColor() }}
            >
              {getScoreLabel()}
            </span>
          </div>
        </div>

        {/* Legend */}
        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-3">
            <div className="w-3 h-3 rounded-full bg-emerald-500" />
            <span className="text-muted-foreground text-sm">Strong</span>
            <span className="text-foreground font-semibold ml-auto">{strong} topics</span>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-3 h-3 rounded-full bg-amber-500" />
            <span className="text-muted-foreground text-sm">Moderate</span>
            <span className="text-foreground font-semibold ml-auto">{moderate} topics</span>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-3 h-3 rounded-full bg-red-500" />
            <span className="text-muted-foreground text-sm">Weak</span>
            <span className="text-foreground font-semibold ml-auto">{weak} topics</span>
          </div>
        </div>
      </div>
    </div>
  );
}
