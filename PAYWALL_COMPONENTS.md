# Paywall & Usage Components Documentation

This document describes the reusable paywall and usage limit components built for Ilm AI.

## Overview

The paywall system provides:
- **Usage tracking** for free tier limits (quizzes, uploads, learning plans, knowledge gaps reports)
- **Visual progress indicators** showing remaining usage with color-coded status
- **Alert banners** that appear when users approach their limits
- **Modal dialogs** that display premium features and pricing when limits are reached
- **Dynamic messaging** that adapts based on the type of limit triggered

## Components

### 1. UsageCounterBar
**Path:** `/components/paywall/usage-counter-bar.tsx`

Displays a progress bar with usage information.

**Props:**
- `label: string` - Display label (e.g., "Daily Quizzes")
- `usage: UsageLimit` - Object with `current` and `max` properties
- `showPercentage?: boolean` - Show count (default: true)

**Colors:**
- Green (<50% used)
- Yellow (50-80% used)
- Red (80-100% used)

**Example:**
```tsx
<UsageCounterBar
  label="Daily Quizzes"
  usage={{ current: 2, max: 3 }}
/>
```

### 2. UsageAlertBanner
**Path:** `/components/paywall/usage-alert-banner.tsx`

Dismissible banner that appears when any usage limit is >80% full.

**Props:**
- `limits: UsageLimits` - All usage limits from context
- `onUpgradeClick?: () => void` - Callback for upgrade button

**Features:**
- Auto-hides when dismissed
- Smooth animations
- Shows lightning bolt icon with warning message

**Example:**
```tsx
<UsageAlertBanner
  limits={limits}
  onUpgradeClick={() => openPaywall()}
/>
```

### 3. PaywallModal
**Path:** `/components/paywall/paywall-modal.tsx`

Full-screen modal displaying premium features and pricing.

**Props:**
- `isOpen: boolean` - Control modal visibility
- `onClose: () => void` - Called when user closes modal
- `triggerType: UsageType` - Type of limit reached ('quiz' | 'upload' | 'learning-plan' | 'gaps-report')

**Features:**
- Two-column layout (locked features + premium card)
- Animated entrance (spring physics)
- Different locked features per trigger type
- Premium pricing in USD and UZS
- 7 premium features listed with checkmarks
- "Upgrade Now" button with gradient
- "Maybe later" text link
- Responsive design

**Trigger Types & Messages:**
- **quiz**: "You've used all 3 free quizzes today. Come back tomorrow or upgrade."
- **upload**: "You've reached 5 file uploads. Upgrade to add unlimited materials."
- **learning-plan**: "Full learning plans are a Premium feature."
- **gaps-report**: "Knowledge Gap Reports are available on Premium."

**Example:**
```tsx
<PaywallModal
  isOpen={paywallOpen}
  onClose={() => setPaywallOpen(false)}
  triggerType="quiz"
/>
```

### 4. UsageStatus
**Path:** `/components/paywall/usage-status.tsx`

Compact component showing usage counters for quizzes and uploads.

**Props:**
- `showTitle?: boolean` - Show "Your Usage" label (default: true)

**Example:**
```tsx
<UsageStatus showTitle={true} />
```

## State Management

### UsageProvider & Context
**Path:** `/components/providers/usage-provider.tsx`

Provides global usage state and management functions.

**Exported Functions:**
- `useUsageContext()` - Hook to access usage state

**Context Properties:**
- `limits: UsageLimits` - Current usage limits
- `isLimitReached(type: UsageType): boolean` - Check if limit is reached
- `incrementUsage(type: UsageType): void` - Increment usage counter
- `getProgressPercentage(type: UsageType): number` - Get usage percentage (0-100)
- `isNearLimit(type: UsageType, threshold?: number): boolean` - Check if near threshold (default 80%)

**Integration:**
The provider wraps the entire app in `app/layout.tsx` to make usage state available globally.

```tsx
<UsageProvider>
  {children}
</UsageProvider>
```

## Usage Limits Configuration

**Path:** `/lib/usage-context.ts`

Default limits are defined here:

```typescript
{
  quiz: {
    current: 2,      // User has used 2 out of 3
    max: 3,
    resetDaily: true // Resets daily
  },
  upload: {
    current: 4,      // User has used 4 out of 5
    max: 5,
    resetDaily: false // Lifetime limit
  },
  learningPlan: {
    current: 1,
    max: 1,
    resetDaily: false
  },
  gapsReport: {
    current: 0,
    max: 1,
    resetDaily: false
  }
}
```

Modify `DEFAULT_USAGE_LIMITS` in this file to adjust free tier limits.

## Integration with Dashboard

The paywall components are integrated into the dashboard page:

```tsx
// Dashboard shows the alert banner
<UsageAlertBanner limits={limits} onUpgradeClick={() => setPaywallOpen(true)} />

// Modal can be triggered
<PaywallModal
  isOpen={paywallOpen}
  onClose={() => setPaywallOpen(false)}
  triggerType="quiz"
/>
```

## Design System

- **Theme**: Dark mode (#0A0F1E background, #7C3AED purple accent)
- **Colors**:
  - Green (success): Used for progress <50%
  - Yellow (warning): Used for progress 50-80%
  - Red (danger): Used for progress 80-100%
  - Purple (brand): CTA buttons and accents
  - Amber (alert): Banner warnings
- **Typography**: Geist font family
- **Animation**: Framer Motion for smooth transitions

## Customization

### Change Default Limits
Edit `/lib/usage-context.ts`:
```typescript
export const DEFAULT_USAGE_LIMITS: UsageLimits = {
  quiz: {
    current: 0,  // Change current usage
    max: 5,      // Change max limit
    resetDaily: true,
  },
  // ...
};
```

### Change Messaging
Edit `/lib/usage-context.ts`:
```typescript
export const USAGE_MESSAGES: Record<UsageType, { title: string; message: string }> = {
  quiz: {
    title: 'Custom Title',
    message: 'Custom message here...',
  },
  // ...
};
```

### Change Premium Features
Edit `/components/paywall/paywall-modal.tsx`:
```typescript
const PREMIUM_FEATURES = [
  'Your feature here',
  // ...
];
```

### Change Pricing
Edit `/components/paywall/paywall-modal.tsx`:
```tsx
<span className="text-4xl font-bold text-white">$19.99</span>
<p className="text-xs text-gray-500 mt-1">or 199,000 UZS/month</p>
```

## Demo Page

A demo page is available at `/paywall-demo` to test all components and variants:

```
http://localhost:3000/paywall-demo
```

This page showcases:
- Usage alert banner
- Usage counter bars for different limit types
- Buttons to trigger each paywall modal variant
- Live demonstration of all animations and interactions

## Best Practices

1. **Always use UsageProvider**: Wrap your entire app with the provider in the root layout
2. **Place banner at top of page**: UsageAlertBanner should appear near the top for visibility
3. **Trigger modal on limit**: Call PaywallModal with `triggerType` when user hits a limit
4. **Test all variants**: Verify each trigger type displays correct messaging
5. **Customize messaging**: Update USAGE_MESSAGES to match your business language
6. **Monitor progress**: Use `isNearLimit()` to log analytics when users approach limits

## Files Modified

- `/app/layout.tsx` - Added UsageProvider wrapper
- `/app/dashboard/page.tsx` - Integrated UsageAlertBanner and PaywallModal

## Files Created

- `/components/paywall/usage-counter-bar.tsx`
- `/components/paywall/usage-alert-banner.tsx`
- `/components/paywall/paywall-modal.tsx`
- `/components/paywall/usage-status.tsx`
- `/components/providers/usage-provider.tsx`
- `/hooks/use-usage-limits.ts` (utility hook)
- `/lib/usage-context.ts` (configuration)
- `/app/paywall-demo/page.tsx` (demo page)

## Browser Support

All components use:
- React 19
- Framer Motion for animations
- Radix UI Dialog for modals
- Tailwind CSS v4 for styling

Compatible with all modern browsers.
