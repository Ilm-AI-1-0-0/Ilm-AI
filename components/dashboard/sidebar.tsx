'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { 
  Home, 
  BookOpen, 
  MessageCircle, 
  Brain, 
  Map, 
  Settings,
  BarChart3
} from 'lucide-react';

const navigationItems = [
  { label: 'Home', href: '/dashboard', icon: Home },
  { label: 'My Materials', href: '/dashboard/materials', icon: BookOpen },
  { label: 'Chat', href: '/dashboard/chat', icon: MessageCircle },
  { label: 'Quiz', href: '/dashboard/quiz', icon: Brain },
  { label: 'Report', href: '/dashboard/report', icon: BarChart3 },
  { label: 'Learning Plan', href: '/dashboard/plan', icon: Map },
  { label: 'Settings', href: '/dashboard/settings', icon: Settings },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="hidden lg:flex flex-col w-64 bg-[#111827] border-r border-[#1F2937] h-screen sticky top-0">
        {/* Logo Section */}
        <div className="p-6 border-b border-[#1F2937]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-purple-500 to-purple-600 flex items-center justify-center">
              <span className="text-white font-bold text-lg">Ilm</span>
            </div>
            <div>
              <h1 className="text-white font-bold text-lg">Ilm AI</h1>
              <p className="text-xs text-gray-400">Learning Platform</p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
          {navigationItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;
            
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                  isActive
                    ? 'bg-purple-500/20 text-purple-400 border border-purple-500/30'
                    : 'text-gray-300 hover:bg-[#1F2937] hover:text-white'
                }`}
              >
                <Icon size={20} />
                <span className="font-medium">{item.label}</span>
              </Link>
            );
          })}
        </nav>

        {/* Footer */}
        <div className="p-4 border-t border-[#1F2937]">
          <div className="bg-purple-500/10 border border-purple-500/20 rounded-lg p-3">
            <p className="text-xs text-gray-300">
              <span className="font-semibold text-purple-400">Pro Tip:</span> Complete 5 quizzes to unlock advanced features
            </p>
          </div>
        </div>
      </aside>

      {/* Mobile Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 lg:hidden bg-[#111827] border-t border-[#1F2937] flex items-center justify-around h-20 z-50">
        {navigationItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;
          
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex flex-col items-center justify-center gap-1 flex-1 h-full transition-all duration-200 ${
                isActive
                  ? 'text-purple-400'
                  : 'text-gray-400 hover:text-gray-300'
              }`}
            >
              <Icon size={24} />
              <span className="text-xs font-medium truncate px-1">{item.label}</span>
            </Link>
          );
        })}
      </nav>

      {/* Mobile Padding */}
      <div className="h-20 lg:h-0" />
    </>
  );
}
