'use client'

import { ArrowRight, Play } from 'lucide-react'
import { Button } from './ui/button'

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20 pb-20">
      {/* Animated gradient background */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-600/20 rounded-full blur-3xl opacity-40 animate-float"></div>
        <div className="absolute bottom-1/3 right-1/4 w-96 h-96 bg-violet-600/20 rounded-full blur-3xl opacity-40 animate-float" style={{ animationDelay: '2s' }}></div>
        <div className="absolute top-1/2 right-1/3 w-72 h-72 bg-purple-500/10 rounded-full blur-3xl opacity-30"></div>
      </div>

      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="animate-fade-in">
          <div className="inline-block mb-6 px-4 py-2 bg-purple-500/10 border border-purple-500/20 rounded-full">
            <span className="text-sm font-medium text-purple-300">🚀 Welcome to Ilm AI</span>
          </div>

          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold mb-6 text-balance">
            Your Personal AI Tutor for Any Material You Upload
          </h1>

          <p className="text-xl sm:text-2xl text-gray-300 mb-12 text-balance max-w-3xl mx-auto leading-relaxed">
            Transform how you learn. Upload your materials, chat with your AI companion, and master any subject with personalized guidance tailored to your pace.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
            <Button
              size="lg"
              className="bg-purple-600 hover:bg-purple-700 text-white font-semibold rounded-lg h-12 px-8 w-full sm:w-auto"
            >
              Get Started Free <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-gray-600 text-gray-200 hover:bg-gray-800/50 font-semibold rounded-lg h-12 px-8 w-full sm:w-auto"
            >
              <Play className="w-5 h-5 mr-2" /> Watch Demo
            </Button>
          </div>

          {/* Trust indicators */}
          <div className="pt-12 border-t border-gray-800">
            <p className="text-gray-400 text-sm mb-6">Trusted by learners worldwide</p>
            <div className="flex flex-wrap justify-center gap-8 items-center opacity-60">
              <div className="text-gray-400 font-semibold">10K+ Active Users</div>
              <div className="w-1 h-1 bg-gray-600 rounded-full"></div>
              <div className="text-gray-400 font-semibold">50+ Languages</div>
              <div className="w-1 h-1 bg-gray-600 rounded-full"></div>
              <div className="text-gray-400 font-semibold">99% Satisfaction</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
