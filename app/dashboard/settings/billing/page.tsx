'use client';

import { useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { CurrentPlanSection } from '@/components/settings/billing/current-plan-section';
import { BillingHistorySection } from '@/components/settings/billing/billing-history-section';
import { PaymentMethodSection } from '@/components/settings/billing/payment-method-section';
import { UpgradeDowngradeBanner } from '@/components/settings/billing/upgrade-downgrade-banner';
import { mockBillingData, mockBillingDataUZS } from '@/lib/billing-data';

function BillingPageContent() {
  const searchParams = useSearchParams();
  const currency = searchParams.get('currency') || 'USD';
  
  const billingData = currency === 'UZS' ? mockBillingDataUZS : mockBillingData;
  const [paywallOpen, setPaywallOpen] = useState(false);

  const handleChangeClick = () => {
    // In a real app, this would navigate to a plan selection page
    console.log('Change plan clicked');
  };

  const handleUpgradeClick = () => {
    setPaywallOpen(true);
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back Button */}
        <Link href="/dashboard/settings">
          <Button
            variant="ghost"
            className="mb-8 text-purple-400 hover:text-purple-300 hover:bg-purple-500/10"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Settings
          </Button>
        </Link>

        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground">Billing & Subscription</h1>
          <p className="mt-2 text-muted-foreground">
            Manage your subscription, payments, and billing history
          </p>
        </div>

        {/* Upgrade Banner */}
        <div className="mb-6">
          <UpgradeDowngradeBanner
            currentPlan={billingData.currentPlan.billingCycle}
            monthlySavings="save 17% yearly"
            yearlySavings="$21 per year"
            onUpgradeClick={handleUpgradeClick}
          />
        </div>

        {/* Content Grid */}
        <div className="space-y-6">
          {/* Current Plan Section */}
          <CurrentPlanSection
            planName={billingData.currentPlan.name}
            price={billingData.currentPlan.price}
            currency={billingData.currentPlan.currency}
            billingCycle={billingData.currentPlan.billingCycle}
            nextBillingDate={billingData.currentPlan.nextBillingDate}
            paymentMethod={billingData.paymentMethod}
            onChangeClick={handleChangeClick}
          />

          {/* Payment Method Section */}
          <PaymentMethodSection paymentMethod={billingData.paymentMethod} />

          {/* Billing History Section */}
          <BillingHistorySection records={billingData.billingHistory} />
        </div>

        {/* Info Text */}
        <div className="mt-8 rounded-lg bg-background border border-border/50 p-4">
          <p className="text-sm text-muted-foreground">
            <strong>Need help?</strong> For billing inquiries or payment issues, please contact our
            support team at{' '}
            <a href="mailto:support@ilmai.com" className="text-purple-400 hover:text-purple-300">
              support@ilmai.com
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}

export default function BillingPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-background" />}>
      <BillingPageContent />
    </Suspense>
  );
}
