export interface BillingData {
  currentPlan: {
    name: string;
    price: number;
    currency: string;
    billingCycle: 'monthly' | 'yearly';
    nextBillingDate: Date;
  };
  paymentMethod: {
    brand: string;
    last4: string;
    expiryMonth: number;
    expiryYear: number;
    holderName: string;
  };
  billingHistory: Array<{
    id: string;
    date: Date;
    description: string;
    amount: number;
    currency: string;
    status: 'paid' | 'pending' | 'failed';
    invoiceUrl?: string;
  }>;
}

export const mockBillingData: BillingData = {
  currentPlan: {
    name: 'Ilm AI',
    price: 9.99,
    currency: 'USD',
    billingCycle: 'monthly',
    nextBillingDate: new Date(2024, 5, 16), // June 16, 2024
  },
  paymentMethod: {
    brand: 'Visa',
    last4: '4242',
    expiryMonth: 12,
    expiryYear: 2025,
    holderName: 'John Doe',
  },
  billingHistory: [
    {
      id: '1',
      date: new Date(2024, 4, 16),
      description: 'Monthly subscription - Ilm AI Premium',
      amount: 9.99,
      currency: 'USD',
      status: 'paid',
      invoiceUrl: '#',
    },
    {
      id: '2',
      date: new Date(2024, 3, 16),
      description: 'Monthly subscription - Ilm AI Premium',
      amount: 9.99,
      currency: 'USD',
      status: 'paid',
      invoiceUrl: '#',
    },
    {
      id: '3',
      date: new Date(2024, 2, 16),
      description: 'Monthly subscription - Ilm AI Premium',
      amount: 9.99,
      currency: 'USD',
      status: 'paid',
      invoiceUrl: '#',
    },
    {
      id: '4',
      date: new Date(2024, 1, 16),
      description: 'Monthly subscription - Ilm AI Premium',
      amount: 9.99,
      currency: 'USD',
      status: 'paid',
      invoiceUrl: '#',
    },
    {
      id: '5',
      date: new Date(2024, 0, 16),
      description: 'Monthly subscription - Ilm AI Premium',
      amount: 9.99,
      currency: 'USD',
      status: 'paid',
      invoiceUrl: '#',
    },
    {
      id: '6',
      date: new Date(2023, 11, 16),
      description: 'Monthly subscription - Ilm AI Premium',
      amount: 9.99,
      currency: 'USD',
      status: 'paid',
      invoiceUrl: '#',
    },
    {
      id: '7',
      date: new Date(2023, 10, 16),
      description: 'Initial subscription - Ilm AI Premium',
      amount: 9.99,
      currency: 'USD',
      status: 'paid',
      invoiceUrl: '#',
    },
  ],
};

export const mockBillingDataUZS: BillingData = {
  currentPlan: {
    name: 'Ilm AI',
    price: 79000,
    currency: 'UZS',
    billingCycle: 'monthly',
    nextBillingDate: new Date(2024, 5, 16),
  },
  paymentMethod: {
    brand: 'Visa',
    last4: '4242',
    expiryMonth: 12,
    expiryYear: 2025,
    holderName: 'John Doe',
  },
  billingHistory: [
    {
      id: '1',
      date: new Date(2024, 4, 16),
      description: 'Monthly subscription - Ilm AI Premium',
      amount: 79000,
      currency: 'UZS',
      status: 'paid',
      invoiceUrl: '#',
    },
    {
      id: '2',
      date: new Date(2024, 3, 16),
      description: 'Monthly subscription - Ilm AI Premium',
      amount: 79000,
      currency: 'UZS',
      status: 'paid',
      invoiceUrl: '#',
    },
    {
      id: '3',
      date: new Date(2024, 2, 16),
      description: 'Monthly subscription - Ilm AI Premium',
      amount: 79000,
      currency: 'UZS',
      status: 'paid',
      invoiceUrl: '#',
    },
    {
      id: '4',
      date: new Date(2024, 1, 16),
      description: 'Monthly subscription - Ilm AI Premium',
      amount: 79000,
      currency: 'UZS',
      status: 'paid',
      invoiceUrl: '#',
    },
    {
      id: '5',
      date: new Date(2024, 0, 16),
      description: 'Monthly subscription - Ilm AI Premium',
      amount: 79000,
      currency: 'UZS',
      status: 'paid',
      invoiceUrl: '#',
    },
  ],
};
