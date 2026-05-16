'use client';

import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { CreditCard, Calendar, Lock, Edit2 } from 'lucide-react';
import { motion } from 'framer-motion';

interface PaymentMethod {
  brand: string;
  last4: string;
  expiryMonth: number;
  expiryYear: number;
  holderName: string;
}

interface PaymentMethodSectionProps {
  paymentMethod: PaymentMethod;
  onUpdatePaymentMethod?: (method: PaymentMethod) => void;
}

export function PaymentMethodSection({
  paymentMethod,
  onUpdatePaymentMethod,
}: PaymentMethodSectionProps) {
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [formData, setFormData] = useState({
    cardNumber: '•••• •••• •••• ' + paymentMethod.last4,
    holderName: paymentMethod.holderName,
    expiryDate: `${String(paymentMethod.expiryMonth).padStart(2, '0')}/${String(paymentMethod.expiryYear).slice(-2)}`,
    cvc: '',
  });

  const handleSubmit = async () => {
    setIsProcessing(true);
    await new Promise(resolve => setTimeout(resolve, 1500));
    setIsProcessing(false);
    setShowUpdateModal(false);
  };

  const brandLogo: Record<string, string> = {
    visa: '💳 VISA',
    mastercard: '💳 Mastercard',
    amex: '💳 American Express',
    discover: '💳 Discover',
  };

  return (
    <>
      <Card className="border-border bg-card p-6">
        <div className="flex flex-col gap-6">
          {/* Header */}
          <div>
            <h3 className="text-xl font-semibold text-foreground">Payment Method</h3>
            <p className="mt-1 text-sm text-muted-foreground">
              Manage your billing card information
            </p>
          </div>

          {/* Card Display */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="rounded-lg bg-gradient-to-br from-purple-900/30 to-purple-800/20 border border-purple-500/20 p-6"
          >
            <div className="flex flex-col gap-6">
              {/* Card Header */}
              <div className="flex items-start justify-between">
                <CreditCard className="h-8 w-8 text-purple-400" />
                <span className="text-sm font-semibold text-purple-300">
                  {brandLogo[paymentMethod.brand.toLowerCase()] || brandLogo.visa}
                </span>
              </div>

              {/* Card Number */}
              <div className="flex flex-col gap-1">
                <p className="text-sm text-purple-300/60">Card Number</p>
                <p className="font-mono text-lg tracking-widest text-foreground">
                  •••• •••• •••• {paymentMethod.last4}
                </p>
              </div>

              {/* Card Details */}
              <div className="grid grid-cols-2 gap-6">
                <div className="flex flex-col gap-1">
                  <p className="text-xs text-purple-300/60">CARD HOLDER</p>
                  <p className="text-sm font-medium text-foreground">
                    {paymentMethod.holderName}
                  </p>
                </div>
                <div className="flex flex-col gap-1">
                  <p className="text-xs text-purple-300/60 flex items-center gap-1">
                    <Calendar className="h-3 w-3" />
                    EXPIRES
                  </p>
                  <p className="text-sm font-medium text-foreground">
                    {String(paymentMethod.expiryMonth).padStart(2, '0')}/
                    {String(paymentMethod.expiryYear).slice(-2)}
                  </p>
                </div>
              </div>

              {/* Security Badge */}
              <div className="flex items-center gap-2 border-t border-purple-500/20 pt-4">
                <Lock className="h-4 w-4 text-green-500" />
                <span className="text-xs text-green-400">Secure & Encrypted</span>
              </div>
            </div>
          </motion.div>

          {/* Update Button */}
          <Button
            onClick={() => setShowUpdateModal(true)}
            className="w-full bg-purple-600 hover:bg-purple-700 text-white"
          >
            <Edit2 className="mr-2 h-4 w-4" />
            Update Payment Method
          </Button>
        </div>
      </Card>

      {/* Update Payment Method Modal */}
      <Dialog open={showUpdateModal} onOpenChange={setShowUpdateModal}>
        <DialogContent className="max-w-md border-border bg-card">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold text-foreground">
              Update Payment Method
            </DialogTitle>
            <DialogDescription className="text-sm text-muted-foreground">
              Enter your new card details below
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4">
            {/* Card Number */}
            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium text-foreground">Card Number</label>
              <Input
                placeholder="1234 5678 9012 3456"
                value={formData.cardNumber}
                disabled
                className="bg-background text-foreground"
              />
            </div>

            {/* Cardholder Name */}
            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium text-foreground">Cardholder Name</label>
              <Input
                placeholder="Full name on card"
                value={formData.holderName}
                onChange={(e) => setFormData(prev => ({ ...prev, holderName: e.target.value }))}
                className="bg-background text-foreground"
              />
            </div>

            {/* Expiry and CVC */}
            <div className="grid grid-cols-2 gap-3">
              <div className="flex flex-col gap-2">
                <label className="text-sm font-medium text-foreground">Expiry Date</label>
                <Input
                  placeholder="MM/YY"
                  value={formData.expiryDate}
                  disabled
                  className="bg-background text-foreground"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-sm font-medium text-foreground">CVC</label>
                <Input
                  type="password"
                  placeholder="123"
                  value={formData.cvc}
                  onChange={(e) => setFormData(prev => ({ ...prev, cvc: e.target.value }))}
                  maxLength={4}
                  className="bg-background text-foreground"
                />
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-3 pt-4">
            <Button
              onClick={() => setShowUpdateModal(false)}
              variant="outline"
              className="flex-1"
            >
              Cancel
            </Button>
            <Button
              onClick={handleSubmit}
              disabled={isProcessing || !formData.cvc}
              className="flex-1 bg-purple-600 hover:bg-purple-700 text-white"
            >
              {isProcessing ? 'Updating...' : 'Update Card'}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
