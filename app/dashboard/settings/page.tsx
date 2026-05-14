'use client';

import { useState } from 'react';
import { 
  User, 
  Target, 
  CreditCard, 
  Bell, 
  AlertTriangle,
  ChevronRight
} from 'lucide-react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { AppLayout } from '@/components/layouts/app-layout';
import ProfileSection from '@/components/settings/profile-section';
import LearningGoalSection from '@/components/settings/learning-goal-section';
import SubscriptionSection from '@/components/settings/subscription-section';
import NotificationsSection from '@/components/settings/notifications-section';
import DangerZoneSection from '@/components/settings/danger-zone-section';
import { toast } from 'sonner';

const sections = [
  { 
    id: 'profile', 
    label: 'Profile', 
    icon: User,
    description: 'Manage your personal information'
  },
  { 
    id: 'learning-goal', 
    label: 'Learning Goal', 
    icon: Target,
    description: 'Set and track your learning objectives'
  },
  { 
    id: 'subscription', 
    label: 'Subscription', 
    icon: CreditCard,
    description: 'Manage your plan and billing'
  },
  { 
    id: 'notifications', 
    label: 'Notifications', 
    icon: Bell,
    description: 'Configure alerts and reminders'
  },
  { 
    id: 'danger-zone', 
    label: 'Danger Zone', 
    icon: AlertTriangle,
    description: 'Account deletion',
    danger: true
  },
];

export default function SettingsPage() {
  const [activeSection, setActiveSection] = useState('profile');

  const handleSave = () => {
    toast.success('Settings saved successfully');
  };

  const renderSectionContent = (sectionId: string) => {
    switch (sectionId) {
      case 'profile':
        return <ProfileSection onSave={handleSave} />;
      case 'learning-goal':
        return <LearningGoalSection />;
      case 'subscription':
        return <SubscriptionSection />;
      case 'notifications':
        return <NotificationsSection />;
      case 'danger-zone':
        return <DangerZoneSection />;
      default:
        return null;
    }
  };

  const activeSectionData = sections.find(s => s.id === activeSection);

  return (
    <AppLayout>
      <div className="min-h-screen bg-[#0A0F1E] pb-24 lg:pb-8">
        {/* Header */}
        <div className="border-b border-[#1F2937] bg-[#111827]/50 backdrop-blur-sm sticky top-0 z-10">
          <div className="max-w-6xl mx-auto px-4 py-4 lg:py-6">
            <h1 className="text-2xl font-bold text-white">Settings</h1>
            <p className="text-gray-400 text-sm mt-1">Manage your account preferences</p>
          </div>
        </div>

        <div className="max-w-6xl mx-auto px-4 py-6">
          {/* Desktop Layout - Sidebar + Content */}
          <div className="hidden lg:grid lg:grid-cols-[280px_1fr] lg:gap-8">
            {/* Sidebar Navigation */}
            <nav className="space-y-1">
              {sections.map((section) => {
                const Icon = section.icon;
                const isActive = activeSection === section.id;
                
                return (
                  <button
                    key={section.id}
                    onClick={() => setActiveSection(section.id)}
                    className={`w-full flex items-center justify-between px-4 py-3 rounded-lg transition-all duration-200 text-left ${
                      isActive
                        ? 'bg-purple-500/20 border border-purple-500/30'
                        : 'hover:bg-[#1F2937]'
                    } ${section.danger ? 'hover:bg-red-500/10' : ''}`}
                  >
                    <div className="flex items-center gap-3">
                      <Icon 
                        className={`w-5 h-5 ${
                          isActive 
                            ? section.danger ? 'text-red-400' : 'text-purple-400' 
                            : section.danger ? 'text-red-400/70' : 'text-gray-400'
                        }`} 
                      />
                      <span 
                        className={`font-medium ${
                          isActive 
                            ? section.danger ? 'text-red-400' : 'text-white' 
                            : section.danger ? 'text-red-400/70' : 'text-gray-300'
                        }`}
                      >
                        {section.label}
                      </span>
                    </div>
                    <ChevronRight 
                      className={`w-4 h-4 transition-opacity ${
                        isActive ? 'opacity-100 text-purple-400' : 'opacity-0'
                      }`} 
                    />
                  </button>
                );
              })}
            </nav>

            {/* Content Area */}
            <div className="bg-[#111827] rounded-xl border border-[#1F2937] p-6">
              <div className="mb-6 pb-6 border-b border-[#1F2937]">
                <h2 className="text-xl font-semibold text-white">{activeSectionData?.label}</h2>
                <p className="text-sm text-gray-400 mt-1">{activeSectionData?.description}</p>
              </div>
              <div className="animate-scale-in">
                {renderSectionContent(activeSection)}
              </div>
            </div>
          </div>

          {/* Mobile Layout - Accordion */}
          <div className="lg:hidden">
            <Accordion type="single" collapsible defaultValue="profile" className="space-y-3">
              {sections.map((section) => {
                const Icon = section.icon;
                
                return (
                  <AccordionItem 
                    key={section.id} 
                    value={section.id}
                    className={`bg-[#111827] rounded-xl border ${
                      section.danger ? 'border-red-500/30' : 'border-[#1F2937]'
                    } px-4 overflow-hidden`}
                  >
                    <AccordionTrigger className="hover:no-underline py-4">
                      <div className="flex items-center gap-3">
                        <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                          section.danger 
                            ? 'bg-red-500/20' 
                            : 'bg-purple-500/20'
                        }`}>
                          <Icon className={`w-5 h-5 ${
                            section.danger ? 'text-red-400' : 'text-purple-400'
                          }`} />
                        </div>
                        <div className="text-left">
                          <p className={`font-medium ${
                            section.danger ? 'text-red-400' : 'text-white'
                          }`}>
                            {section.label}
                          </p>
                          <p className="text-xs text-gray-500">{section.description}</p>
                        </div>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="pb-4">
                      <div className="pt-2">
                        {renderSectionContent(section.id)}
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                );
              })}
            </Accordion>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
