'use client';

import Link from 'next/link';
import { Upload, Brain, MessageSquare, Map } from 'lucide-react';

const actions = [
  {
    label: 'Upload Material',
    href: '/dashboard/materials/upload',
    icon: Upload,
    color: 'from-blue-500/20 to-blue-600/10 hover:from-blue-500/30 hover:to-blue-600/20 border-blue-500/20 hover:border-blue-500/40',
    iconColor: 'text-blue-400',
  },
  {
    label: 'Start Quiz',
    href: '/dashboard/quiz',
    icon: Brain,
    color: 'from-purple-500/20 to-purple-600/10 hover:from-purple-500/30 hover:to-purple-600/20 border-purple-500/20 hover:border-purple-500/40',
    iconColor: 'text-purple-400',
  },
  {
    label: 'Chat with AI',
    href: '/dashboard/chat',
    icon: MessageSquare,
    color: 'from-emerald-500/20 to-emerald-600/10 hover:from-emerald-500/30 hover:to-emerald-600/20 border-emerald-500/20 hover:border-emerald-500/40',
    iconColor: 'text-emerald-400',
  },
  {
    label: 'View Plan',
    href: '/dashboard/plan',
    icon: Map,
    color: 'from-orange-500/20 to-orange-600/10 hover:from-orange-500/30 hover:to-orange-600/20 border-orange-500/20 hover:border-orange-500/40',
    iconColor: 'text-orange-400',
  },
];

export default function QuickActions() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {actions.map((action) => {
        const Icon = action.icon;
        return (
          <Link
            key={action.label}
            href={action.href}
            className={`bg-gradient-to-br ${action.color} border rounded-xl p-6 transition-all duration-300 group`}
          >
            <div className="flex flex-col items-center justify-center text-center gap-3">
              <div className="p-3 bg-black/30 rounded-lg group-hover:bg-black/50 transition-colors duration-300">
                <Icon size={24} className={action.iconColor} />
              </div>
              <span className="text-white font-semibold text-sm">{action.label}</span>
            </div>
          </Link>
        );
      })}
    </div>
  );
}
