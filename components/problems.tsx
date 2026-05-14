'use client'

import { BookOpen, Brain, AlertCircle } from 'lucide-react'

const problems = [
  {
    icon: BookOpen,
    title: 'Too Much Content',
    description: 'Drowning in textbooks, notes, and materials? Struggle to find what matters most and where to start.',
  },
  {
    icon: Brain,
    title: 'Poor Retention',
    description: 'Read the same material multiple times but forget it quickly? Traditional methods aren\'t working.',
  },
  {
    icon: AlertCircle,
    title: 'No Guidance',
    description: 'Missing personalized feedback on your learning gaps. No one to guide you through your weak areas.',
  },
]

export default function Problems() {
  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 relative">
      <div className="absolute inset-0 -z-10">
        <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl opacity-20"></div>
      </div>

      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold mb-4">The Learning Challenge</h2>
          <p className="text-xl text-gray-400">Most learners face these obstacles. We&apos;ve solved them.</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {problems.map((problem, index) => {
            const Icon = problem.icon
            return (
              <div
                key={index}
                className="group relative animate-fade-in-up"
                style={{ animationDelay: `${index * 0.15}s` }}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-purple-600/10 to-violet-600/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur"></div>
                <div className="relative bg-gradient-to-br from-gray-900/50 to-gray-800/30 border border-gray-800 rounded-2xl p-8 backdrop-blur-sm hover:border-purple-500/30 transition-all duration-300">
                  <div className="inline-flex items-center justify-center w-12 h-12 rounded-lg bg-purple-500/10 mb-4 group-hover:bg-purple-500/20 transition-colors">
                    <Icon className="w-6 h-6 text-purple-400" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{problem.title}</h3>
                  <p className="text-gray-400 leading-relaxed">{problem.description}</p>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
