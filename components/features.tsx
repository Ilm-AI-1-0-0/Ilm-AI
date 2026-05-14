'use client'

import { Sparkles, Zap, Target, Map, MessageSquare, Globe } from 'lucide-react'

const features = [
  {
    icon: Sparkles,
    title: 'AI Companion',
    description: 'Your always-available tutor. Ask anything, anytime. Get personalized responses based on your learning materials.',
  },
  {
    icon: Zap,
    title: 'Quiz Mode',
    description: 'Test your knowledge with AI-generated quizzes tailored to your materials. Track your progress in real-time.',
  },
  {
    icon: Target,
    title: 'Knowledge Gap Detection',
    description: 'Ilm AI identifies exactly what you don\'t understand and creates targeted lessons to fill those gaps.',
  },
  {
    icon: Map,
    title: 'Learning Plan',
    description: 'Get a personalized learning roadmap adapted to your pace, learning style, and goals.',
  },
  {
    icon: MessageSquare,
    title: 'Telegram Bot',
    description: 'Access your AI tutor directly on Telegram. Learn on-the-go with instant answers and quick revisions.',
  },
  {
    icon: Globe,
    title: 'Multilingual',
    description: 'Learn in 50+ languages. Ilm AI understands and responds in your preferred language seamlessly.',
  },
]

export default function Features() {
  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 relative">
      <div className="absolute inset-0 -z-10">
        <div className="absolute -top-1/4 right-0 w-96 h-96 bg-violet-600/10 rounded-full blur-3xl opacity-20"></div>
        <div className="absolute bottom-0 left-1/3 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl opacity-20"></div>
      </div>

      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold mb-4">Powerful Features</h2>
          <p className="text-xl text-gray-400">Everything you need to master any subject faster</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => {
            const Icon = feature.icon
            return (
              <div
                key={index}
                className="group animate-fade-in-up"
                style={{ animationDelay: `${(index % 6) * 0.1}s` }}
              >
                <div className="relative overflow-hidden rounded-2xl border border-gray-800 bg-gradient-to-br from-gray-900/50 to-gray-800/30 p-6 backdrop-blur-sm hover:border-purple-500/30 transition-all duration-300 h-full">
                  {/* Hover glow effect */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-br from-purple-600/10 to-violet-600/10 pointer-events-none"></div>

                  <div className="relative z-10">
                    <div className="inline-flex items-center justify-center w-12 h-12 rounded-lg bg-purple-500/10 mb-4 group-hover:bg-purple-500/20 transition-colors">
                      <Icon className="w-6 h-6 text-purple-400" />
                    </div>
                    <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                    <p className="text-gray-400 leading-relaxed text-sm">{feature.description}</p>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
