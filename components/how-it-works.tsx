'use client'

import { Upload, MessageCircle, BookMarked, ArrowRight } from 'lucide-react'

const steps = [
  {
    icon: Upload,
    number: '1',
    title: 'Upload',
    description: 'Share your PDFs, notes, textbooks, or any learning material with Ilm AI.',
  },
  {
    icon: MessageCircle,
    number: '2',
    title: 'Chat',
    description: 'Ask questions, clarify concepts, and engage in real-time conversations with your AI tutor.',
  },
  {
    icon: BookMarked,
    number: '3',
    title: 'Learn',
    description: 'Get personalized insights, quizzes, and a custom learning plan to accelerate your progress.',
  },
]

export default function HowItWorks() {
  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 relative">
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/3 left-0 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl opacity-20"></div>
      </div>

      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold mb-4">How It Works</h2>
          <p className="text-xl text-gray-400">Simple. Powerful. Transformative.</p>
        </div>

        <div className="relative">
          {/* Connection line for desktop */}
          <div className="hidden md:block absolute top-16 left-0 right-0 h-1 bg-gradient-to-r from-purple-600/0 via-purple-600/30 to-purple-600/0"></div>

          <div className="grid md:grid-cols-3 gap-8 relative z-10">
            {steps.map((step, index) => {
              const Icon = step.icon
              return (
                <div
                  key={index}
                  className="animate-fade-in-up"
                  style={{ animationDelay: `${index * 0.2}s` }}
                >
                  <div className="relative">
                    {/* Number badge */}
                    <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-gradient-to-r from-purple-600 to-violet-600 mb-6 relative z-20 text-white font-bold text-lg">
                      {step.number}
                    </div>

                    {/* Arrow between steps */}
                    {index < steps.length - 1 && (
                      <div className="hidden md:flex absolute top-7 -right-12 w-6 h-6 items-center justify-center text-purple-500/50">
                        <ArrowRight className="w-5 h-5" />
                      </div>
                    )}

                    <div className="bg-gradient-to-br from-gray-900/50 to-gray-800/30 border border-gray-800 rounded-2xl p-8">
                      <div className="inline-flex items-center justify-center w-12 h-12 rounded-lg bg-purple-500/10 mb-4">
                        <Icon className="w-6 h-6 text-purple-400" />
                      </div>
                      <h3 className="text-2xl font-semibold mb-3">{step.title}</h3>
                      <p className="text-gray-400 leading-relaxed">{step.description}</p>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
