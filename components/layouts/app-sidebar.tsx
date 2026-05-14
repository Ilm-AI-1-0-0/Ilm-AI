'use client';

import { useState } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Home,
  BookOpen,
  MessageCircle,
  Brain,
  Map,
  Settings,
  BarChart3,
  ChevronLeft,
  ChevronRight,
  Zap,
  LogOut,
  Bell,
  Flame,
} from 'lucide-react';
import { cn } from '@/lib/utils';

const navigationItems = [
  { label: 'Home', href: '/dashboard', icon: Home },
  { label: 'Materials', href: '/dashboard/materials', icon: BookOpen },
  { label: 'Chat', href: '/dashboard/chat', icon: MessageCircle },
  { label: 'Quiz', href: '/dashboard/quiz', icon: Brain },
  { label: 'Report', href: '/dashboard/report', icon: BarChart3 },
  { label: 'Plan', href: '/dashboard/plan', icon: Map },
  { label: 'Settings', href: '/dashboard/settings', icon: Settings },
];

const mobileNavItems = [
  { label: 'Home', href: '/dashboard', icon: Home },
  { label: 'Materials', href: '/dashboard/materials', icon: BookOpen },
  { label: 'Chat', href: '/dashboard/chat', icon: MessageCircle },
  { label: 'Quiz', href: '/dashboard/quiz', icon: Brain },
  { label: 'Plan', href: '/dashboard/plan', icon: Map },
];

// Get the page title based on current path
const getPageTitle = (pathname: string): string => {
  const pathMap: Record<string, string> = {
    '/dashboard': 'Dashboard',
    '/dashboard/materials': 'My Materials',
    '/dashboard/chat': 'AI Chat',
    '/dashboard/quiz': 'Quiz',
    '/dashboard/report': 'Knowledge Report',
    '/dashboard/plan': 'Learning Plan',
    '/dashboard/settings': 'Settings',
  };
  return pathMap[pathname] || 'Ilm AI';
};

interface AppSidebarProps {
  userName?: string;
  currentStreak?: number;
}

export function AppSidebar({ userName = 'User', currentStreak = 5 }: AppSidebarProps) {
  const pathname = usePathname();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [hasNotifications] = useState(true);

  const pageTitle = getPageTitle(pathname);

  return (
    <>
      {/* Desktop Sidebar */}
      <aside
        className={cn(
          'hidden lg:flex flex-col bg-[#111827] border-r border-[#1F2937] h-screen sticky top-0 transition-all duration-300',
          isCollapsed ? 'w-20' : 'w-64'
        )}
      >
        {/* Logo Section */}
        <div className="p-4 border-b border-[#1F2937] flex items-center justify-between">
          <Link href="/dashboard" className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-purple-500 to-purple-600 flex items-center justify-center flex-shrink-0">
              <Zap className="w-5 h-5 text-white" />
            </div>
            <AnimatePresence>
              {!isCollapsed && (
                <motion.div
                  initial={{ opacity: 0, width: 0 }}
                  animate={{ opacity: 1, width: 'auto' }}
                  exit={{ opacity: 0, width: 0 }}
                  className="overflow-hidden"
                >
                  <h1 className="text-white font-bold text-lg whitespace-nowrap">Ilm AI</h1>
                </motion.div>
              )}
            </AnimatePresence>
          </Link>
          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="p-2 rounded-lg hover:bg-[#1F2937] text-gray-400 hover:text-white transition-colors"
          >
            {isCollapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-3 space-y-1 overflow-y-auto">
          {navigationItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;

            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  'flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200 group relative',
                  isActive
                    ? 'bg-purple-500/20 text-purple-400'
                    : 'text-gray-400 hover:bg-[#1F2937] hover:text-white'
                )}
              >
                <Icon size={20} className="flex-shrink-0" />
                <AnimatePresence>
                  {!isCollapsed && (
                    <motion.span
                      initial={{ opacity: 0, width: 0 }}
                      animate={{ opacity: 1, width: 'auto' }}
                      exit={{ opacity: 0, width: 0 }}
                      className="font-medium text-sm whitespace-nowrap overflow-hidden"
                    >
                      {item.label}
                    </motion.span>
                  )}
                </AnimatePresence>
                {isCollapsed && (
                  <div className="absolute left-full ml-2 px-2 py-1 bg-gray-900 text-white text-xs rounded opacity-0 group-hover:opacity-100 pointer-events-none whitespace-nowrap z-50 transition-opacity">
                    {item.label}
                  </div>
                )}
                {isActive && (
                  <motion.div
                    layoutId="activeIndicator"
                    className="absolute left-0 w-1 h-6 bg-purple-500 rounded-r-full"
                  />
                )}
              </Link>
            );
          })}
        </nav>

        {/* User Section */}
        <div className="p-3 border-t border-[#1F2937]">
          <div
            className={cn(
              'flex items-center gap-3 p-3 rounded-lg bg-[#1F2937]/50',
              isCollapsed && 'justify-center'
            )}
          >
            <div className="w-9 h-9 rounded-full bg-gradient-to-br from-purple-500 to-violet-600 flex items-center justify-center flex-shrink-0">
              <span className="text-white text-sm font-semibold">
                {userName.charAt(0).toUpperCase()}
              </span>
            </div>
            <AnimatePresence>
              {!isCollapsed && (
                <motion.div
                  initial={{ opacity: 0, width: 0 }}
                  animate={{ opacity: 1, width: 'auto' }}
                  exit={{ opacity: 0, width: 0 }}
                  className="flex-1 overflow-hidden"
                >
                  <p className="text-sm font-medium text-white truncate">{userName}</p>
                  <p className="text-xs text-gray-400">Free Plan</p>
                </motion.div>
              )}
            </AnimatePresence>
            {!isCollapsed && (
              <Link 
                href="/"
                className="p-1.5 rounded hover:bg-gray-700 text-gray-400 hover:text-white transition-colors"
                title="Sign out"
              >
                <LogOut size={16} />
              </Link>
            )}
          </div>
        </div>
      </aside>

      {/* Mobile Top Bar */}
      <div className="lg:hidden fixed top-0 left-0 right-0 h-14 bg-[#111827] border-b border-[#1F2937] flex items-center justify-between px-4 z-40">
        <Link href="/dashboard" className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-purple-500 to-purple-600 flex items-center justify-center">
            <Zap className="w-4 h-4 text-white" />
          </div>
          <span className="font-semibold text-white">{pageTitle}</span>
        </Link>
        <div className="flex items-center gap-1">
          {/* Streak indicator */}
          <div className="flex items-center gap-1 px-2 py-1 bg-orange-500/20 rounded-full mr-2">
            <Flame className="w-4 h-4 text-orange-400" />
            <span className="text-xs font-semibold text-orange-400">{currentStreak}</span>
          </div>
          {/* Notification bell */}
          <button
            className="relative p-2 rounded-lg hover:bg-[#1F2937] text-gray-400 hover:text-white"
          >
            <Bell size={20} />
            {hasNotifications && (
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-purple-500 rounded-full" />
            )}
          </button>
          <Link
            href="/dashboard/settings"
            className="p-2 rounded-lg hover:bg-[#1F2937] text-gray-400 hover:text-white"
          >
            <Settings size={20} />
          </Link>
        </div>
      </div>

      {/* Mobile Bottom Navigation */}
      <nav className="lg:hidden fixed bottom-0 left-0 right-0 bg-[#111827] border-t border-[#1F2937] flex items-center justify-around h-16 z-40 safe-area-inset-bottom">
        {mobileNavItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                'flex flex-col items-center justify-center gap-1 flex-1 h-full min-w-[64px] transition-colors py-2',
                isActive ? 'text-purple-400' : 'text-gray-400'
              )}
            >
              <Icon size={22} />
              <span className="text-[10px] font-medium">{item.label}</span>
            </Link>
          );
        })}
      </nav>

      {/* Mobile Spacing */}
      <div className="h-14 lg:h-0" />
    </>
  );
}
