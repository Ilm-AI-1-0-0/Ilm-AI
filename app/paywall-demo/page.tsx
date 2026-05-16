'use client';

import { useState } from 'react';
import { PaywallModal } from '@/components/paywall/paywall-modal';
import { UsageCounterBar } from '@/components/paywall/usage-counter-bar';
import { UsageAlertBanner } from '@/components/paywall/usage-alert-banner';
import { useUsageContext } from '@/components/providers/usage-provider';
import { Button } from '@/components/ui/button';

export default function PaywallDemo() {
  const [modalOpen, setModalOpen] = useState(true);
  const [triggerType, setTriggerType] = useState<'quiz' | 'upload' | 'learning-plan' | 'gaps-report'>('quiz');
  const { limits } = useUsageContext();

  return (
    <div className="min-h-screen bg-background p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-white mb-8">Paywall Components Demo</h1>

        {/* Usage Alert Banner Demo */}
        <div className="mb-12">
          <h2 className="text-xl font-semibold text-white mb-4">Usage Alert Banner</h2>
          <UsageAlertBanner limits={limits} />
        </div>

        {/* Usage Counter Bars Demo */}
        <div className="mb-12">
          <h2 className="text-xl font-semibold text-white mb-4">Usage Counter Bars</h2>
          <div className="bg-[#111827] rounded-lg p-6 space-y-6">
            <UsageCounterBar
              label="Daily Quizzes"
              usage={limits.quiz}
            />
            <UsageCounterBar
              label="File Uploads (Lifetime)"
              usage={limits.upload}
            />
          </div>
        </div>

        {/* Paywall Modal Trigger */}
        <div className="mb-12">
          <h2 className="text-xl font-semibold text-white mb-4">Paywall Modal</h2>
          <div className="flex gap-4 flex-wrap">
            <Button
              onClick={() => {
                setTriggerType('quiz');
                setModalOpen(true);
              }}
              variant="outline"
            >
              Show Quiz Modal
            </Button>
            <Button
              onClick={() => {
                setTriggerType('upload');
                setModalOpen(true);
              }}
              variant="outline"
            >
              Show Upload Modal
            </Button>
            <Button
              onClick={() => {
                setTriggerType('learning-plan');
                setModalOpen(true);
              }}
              variant="outline"
            >
              Show Learning Plan Modal
            </Button>
            <Button
              onClick={() => {
                setTriggerType('gaps-report');
                setModalOpen(true);
              }}
              variant="outline"
            >
              Show Gaps Report Modal
            </Button>
          </div>
        </div>

        {/* Modal */}
        <PaywallModal
          isOpen={modalOpen}
          onClose={() => setModalOpen(false)}
          triggerType={triggerType}
        />
      </div>
    </div>
  );
}
