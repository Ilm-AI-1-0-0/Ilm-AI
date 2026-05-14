'use client';

import { ReactNode } from 'react';
import { motion } from 'framer-motion';
import { AppSidebar } from './app-sidebar';

interface AppLayoutProps {
  children: ReactNode;
  userName?: string;
}

export function AppLayout({ children, userName = 'User' }: AppLayoutProps) {
  return (
    <div className="flex min-h-screen bg-background">
      <AppSidebar userName={userName} />
      <motion.main
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
        className="flex-1 lg:ml-0 pb-16 lg:pb-0 pt-14 lg:pt-0"
      >
        {children}
      </motion.main>
    </div>
  );
}
