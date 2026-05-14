'use client';

import { useState } from 'react';
import { Check, Crown, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

interface SubscriptionSectionProps {
  currentPlan?: 'free' | 'premium';
}

const freeFeatures = [
  '3 quizzes per day',
  '5 file uploads',
  'Basic AI chat',
  'Standard support',
];

const premiumFeatures = [
  'Unlimited quizzes',
  'Unlimited file uploads',
  'Advanced AI with GPT-4',
  'Personalized learning plans',
  'Priority support',
  'Export progress reports',
];

const billingHistory = [
  { id: 1, date: '2026-04-14', amount: '$9.99', status: 'Paid' },
  { id: 2, date: '2026-03-14', amount: '$9.99', status: 'Paid' },
  { id: 3, date: '2026-02-14', amount: '$9.99', status: 'Paid' },
];

export default function SubscriptionSection({ currentPlan = 'free' }: SubscriptionSectionProps) {
  const [plan, setPlan] = useState(currentPlan);
  const [isUpgrading, setIsUpgrading] = useState(false);

  const handleUpgrade = async () => {
    setIsUpgrading(true);
    // Simulate upgrade process
    await new Promise(resolve => setTimeout(resolve, 1500));
    setPlan('premium');
    setIsUpgrading(false);
  };

  return (
    <div className="space-y-6">
      {/* Current Plan Badge */}
      <div className="flex items-center gap-3">
        <span className="text-gray-400">Current Plan:</span>
        <Badge 
          className={plan === 'premium' 
            ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white border-0' 
            : 'bg-[#1F2937] text-gray-300 border-[#374151]'
          }
        >
          {plan === 'premium' && <Crown className="w-3 h-3 mr-1" />}
          {plan === 'premium' ? 'Premium' : 'Free'}
        </Badge>
      </div>

      {plan === 'free' ? (
        <>
          {/* Free Plan Limits */}
          <div className="bg-[#1F2937] rounded-lg p-4 border border-[#374151]">
            <p className="text-sm text-gray-400 mb-3">Your current limits:</p>
            <ul className="space-y-2">
              {freeFeatures.map((feature, index) => (
                <li key={index} className="flex items-center gap-2 text-sm text-gray-300">
                  <div className="w-1.5 h-1.5 rounded-full bg-gray-500" />
                  {feature}
                </li>
              ))}
            </ul>
          </div>

          {/* Premium Upgrade Card */}
          <div className="relative overflow-hidden rounded-xl bg-gradient-to-br from-purple-500/20 via-purple-600/10 to-pink-500/20 border border-purple-500/30 p-6">
            <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/10 rounded-full blur-3xl" />
            
            <div className="relative">
              <div className="flex items-center gap-2 mb-2">
                <Sparkles className="w-5 h-5 text-purple-400" />
                <h3 className="text-lg font-semibold text-white">Upgrade to Premium</h3>
              </div>
              
              <div className="flex items-baseline gap-1 mb-4">
                <span className="text-3xl font-bold text-white">$9.99</span>
                <span className="text-gray-400">/month</span>
              </div>

              <ul className="space-y-2 mb-6">
                {premiumFeatures.map((feature, index) => (
                  <li key={index} className="flex items-center gap-2 text-sm text-gray-300">
                    <Check className="w-4 h-4 text-purple-400 flex-shrink-0" />
                    {feature}
                  </li>
                ))}
              </ul>

              <Button 
                onClick={handleUpgrade}
                disabled={isUpgrading}
                className="w-full bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white font-medium"
              >
                {isUpgrading ? 'Processing...' : 'Upgrade Now'}
              </Button>
            </div>
          </div>
        </>
      ) : (
        <>
          {/* Premium Features */}
          <div className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 rounded-lg p-4 border border-purple-500/30">
            <p className="text-sm text-purple-300 mb-3">Your premium features:</p>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {premiumFeatures.map((feature, index) => (
                <li key={index} className="flex items-center gap-2 text-sm text-gray-300">
                  <Check className="w-4 h-4 text-purple-400 flex-shrink-0" />
                  {feature}
                </li>
              ))}
            </ul>
          </div>

          {/* Billing History */}
          <div className="space-y-3">
            <h4 className="text-sm font-medium text-gray-300">Billing History</h4>
            <div className="rounded-lg border border-[#374151] overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow className="border-[#374151] hover:bg-transparent">
                    <TableHead className="text-gray-400">Date</TableHead>
                    <TableHead className="text-gray-400">Amount</TableHead>
                    <TableHead className="text-gray-400">Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {billingHistory.map((item) => (
                    <TableRow key={item.id} className="border-[#374151] hover:bg-[#1F2937]">
                      <TableCell className="text-gray-300">{item.date}</TableCell>
                      <TableCell className="text-white font-medium">{item.amount}</TableCell>
                      <TableCell>
                        <Badge className="bg-emerald-500/20 text-emerald-400 border-0">
                          {item.status}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>

          {/* Cancel Subscription */}
          <button className="text-sm text-gray-500 hover:text-red-400 transition-colors underline">
            Cancel subscription
          </button>
        </>
      )}
    </div>
  );
}
