'use client'

import { Check, ArrowRight } from 'lucide-react'
import { Button } from './ui/button'

const plans = [
  {
    name: 'Free',
    price: '$0',
    description: 'Perfect for exploring Ilm AI',
    features: [
      'Upload up to 5 documents',
      'Basic AI chat (50 messages/month)',
      '3 practice quizzes per month',
      'Community support',
      'Mobile app access',
    ],
    cta: 'Get Started',
    highlighted: false,
  },
  {
    name: 'Premium',
    price: '$12',
    period: '/month',
    description: 'For serious learners',
    features: [
      'Unlimited document uploads',
      'Unlimited AI chat',
      'Unlimited quizzes & practice tests',
      'AI-powered learning plans',
      'Knowledge gap detection',
      'Priority email support',
      'Telegram bot integration',
      'Advanced analytics & insights',
    ],
    cta: 'Start Free Trial',
    highlighted: true,
  },
]

export default function Pricing() {
  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 relative">
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/2 left-1/4 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl opacity-20"></div>
      </div>

      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold mb-4">Simple, Transparent Pricing</h2>
          <p className="text-xl text-gray-400">Choose the plan that fits your learning journey</p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {plans.map((plan, index) => (
            <div
              key={index}
              className={`relative rounded-3xl p-8 animate-fade-in-up ${
                plan.highlighted
                  ? 'md:col-span-1 md:scale-105 border-2 border-purple-500/50 bg-gradient-to-br from-purple-900/20 to-violet-900/10'
                  : 'border border-gray-800 bg-gradient-to-br from-gray-900/50 to-gray-800/30'
              }`}
              style={{ animationDelay: `${index * 0.2}s` }}
            >
              {plan.highlighted && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                  <div className="bg-gradient-to-r from-purple-600 to-violet-600 text-white px-4 py-1 rounded-full text-sm font-semibold">
                    Most Popular
                  </div>
                </div>
              )}

              <div className="mb-6">
                <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                <p className="text-gray-400">{plan.description}</p>
              </div>

              <div className="mb-8">
                <div className="flex items-baseline gap-1">
                  <span className="text-5xl font-bold">{plan.price}</span>
                  {plan.period && <span className="text-gray-400">{plan.period}</span>}
                </div>
              </div>

              <Button
                className={`w-full h-12 font-semibold rounded-lg mb-8 ${
                  plan.highlighted
                    ? 'bg-gradient-to-r from-purple-600 to-violet-600 hover:from-purple-700 hover:to-violet-700 text-white'
                    : 'bg-gray-800 hover:bg-gray-700 text-gray-200 border border-gray-700'
                }`}
              >
                {plan.cta} <ArrowRight className="ml-2 w-4 h-4" />
              </Button>

              <div className="space-y-4">
                {plan.features.map((feature, featureIndex) => (
                  <div key={featureIndex} className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-purple-400 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-300">{feature}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-16">
          <p className="text-gray-400 mb-4">Questions about pricing?</p>
          <a href="#" className="inline-flex items-center text-purple-400 hover:text-purple-300 transition-colors">
            Contact our team <ArrowRight className="ml-2 w-4 h-4" />
          </a>
        </div>
      </div>
    </section>
  )
}
