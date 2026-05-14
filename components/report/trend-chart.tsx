'use client';

import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  Area,
  AreaChart
} from 'recharts';
import { TrendingUp } from 'lucide-react';

interface TrendDataPoint {
  session: number;
  score: number;
  date: string;
}

interface TrendChartProps {
  data: TrendDataPoint[];
}

export default function TrendChart({ data }: TrendChartProps) {
  const latestScore = data[data.length - 1]?.score || 0;
  const firstScore = data[0]?.score || 0;
  const improvement = latestScore - firstScore;
  const isImproving = improvement >= 0;

  return (
    <div className="bg-card border border-border rounded-2xl p-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div className="flex items-center gap-3">
          <TrendingUp size={20} className="text-primary" />
          <h2 className="text-foreground font-bold text-lg">Knowledge Trend</h2>
        </div>
        
        <div className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-medium ${
          isImproving 
            ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30' 
            : 'bg-red-500/15 text-red-400 border border-red-500/30'
        }`}>
          {isImproving ? '+' : ''}{improvement}% since first session
        </div>
      </div>
      
      <div className="h-[200px] sm:h-[250px]">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={data}
            margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
          >
            <defs>
              <linearGradient id="scoreGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#7C3AED" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="#7C3AED" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid 
              strokeDasharray="3 3" 
              stroke="#1F2937" 
              vertical={false}
            />
            <XAxis 
              dataKey="session" 
              axisLine={false}
              tickLine={false}
              tick={{ fill: '#9CA3AF', fontSize: 12 }}
              tickFormatter={(value) => `S${value}`}
            />
            <YAxis 
              domain={[0, 100]}
              axisLine={false}
              tickLine={false}
              tick={{ fill: '#9CA3AF', fontSize: 12 }}
              tickFormatter={(value) => `${value}%`}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: '#111827',
                border: '1px solid #1F2937',
                borderRadius: '8px',
                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.3)',
              }}
              labelStyle={{ color: '#9CA3AF', marginBottom: '4px' }}
              itemStyle={{ color: '#F3F4F6' }}
              formatter={(value: number) => [`${value}%`, 'Score']}
              labelFormatter={(label) => `Session ${label}`}
            />
            <Area
              type="monotone"
              dataKey="score"
              stroke="#7C3AED"
              strokeWidth={2}
              fill="url(#scoreGradient)"
              dot={{ fill: '#7C3AED', strokeWidth: 2, r: 4 }}
              activeDot={{ r: 6, fill: '#7C3AED', stroke: '#fff', strokeWidth: 2 }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
