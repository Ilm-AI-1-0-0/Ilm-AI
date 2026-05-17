'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { CancelSubscriptionModal } from './cancel-subscription-modal';
import { Sparkles, Calendar, CreditCard, AlertCircle } from 'lucide-react';

interface CurrentPlanSectionProps {
  planName: string;
  price: number;
  currency: string;
  billingCycle: 'monthly' | 'yearly';
  nextBillingDate: Date;
  paymentMethod: {
    brand: string;
    last4: string;
  };
  onCancelClick?: () => void;
  onChangeClick?: () => void;
}

export function CurrentPlanSection({
  planName,
  price,
  currency,
  billingCycle,
  nextBillingDate,
  paymentMethod,
  onCancelClick,
  onChangeClick,
}: CurrentPlanSectionProps) {
  const [showCancelModal, setShowCancelModal] = useState(false);

  const handleCancelClick = () => {
    setShowCancelModal(true);
    onCancelClick?.();
  };

  const formattedDate = nextBillingDate.toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });

  const billingLabel = billingCycle === 'monthly' ? 'Monthly' : 'Yearly';

  return (
    <>
      <Card className="border-border bg-card p-6">
        <div className="flex flex-col gap-6">
          {/* Header with Plan Name and Badge */}
          <div className="flex items-start justify-between">
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-3">
                <h3 className="text-xl font-semibold text-foreground">Current Plan</h3>
              </div>
              <div className="flex items-center gap-2">
                <Badge
                  variant="default"
                  className="bg-gradient-to-r from-purple-600 to-purple-500 text-white"
                >
                  <Sparkles className="mr-1 h-3.5 w-3.5" />
                  {planName} Premium
                </Badge>
              </div>
            </div>
          </div>

          {/* Plan Details Grid */}
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {/* Billing Cycle and Price */}
            <div className="flex flex-col gap-2 rounded-lg bg-background p-4">
              <p className="text-sm font-medium text-muted-foreground">Billing Amount</p>
              <p className="text-2xl font-bold text-foreground">
                {currency === 'UZS' ? currency : '$'}
                {price.toLocaleString()}
              </p>
              <p className="text-xs text-muted-foreground">per {billingLabel.toLowerCase()}</p>
            </div>

            {/* Next Billing Date */}
            <div className="flex flex-col gap-2 rounded-lg bg-background p-4">
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                <p className="text-sm font-medium text-muted-foreground">Next Billing Date</p>
              </div>
              <p className="text-base font-semibold text-foreground">{formattedDate}</p>
            </div>

            {/* Payment Method */}
            <div className="flex flex-col gap-2 rounded-lg bg-background p-4">
              <div className="flex items-center gap-2">
                <CreditCard className="h-4 w-4 text-muted-foreground" />
                <p className="text-sm font-medium text-muted-foreground">Payment Method</p>
              </div>
              <p className="text-base font-semibold text-foreground">
                {paymentMethod.brand} ending in {paymentMethod.last4}
              </p>
            </div>

            {/* Auto-Renewal Info */}
            <div className="flex flex-col gap-2 rounded-lg bg-background p-4">
              <div className="flex items-center gap-2">
                <AlertCircle className="h-4 w-4 text-green-500" />
                <p className="text-sm font-medium text-muted-foreground">Auto-Renewal</p>
              </div>
              <p className="text-base font-semibold text-green-500">Active</p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col gap-3 sm:flex-row">
            <Button
              onClick={onChangeClick}
              className="flex-1 bg-purple-600 hover:bg-purple-700 text-white"
            >
              Change Plan
            </Button>
            <Button
              onClick={handleCancelClick}
              variant="outline"
              className="flex-1"
            >
              Cancel Subscription
            </Button>
          </div>
        </div>
      </Card>

      {/* Cancel Modal */}
      <CancelSubscriptionModal
        isOpen={showCancelModal}
        onClose={() => setShowCancelModal(false)}
        planName={planName}
      />
    </>
  );
}
