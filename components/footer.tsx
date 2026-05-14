'use client'

import { Github, Twitter, Linkedin, Mail } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="border-t border-gray-800 bg-gradient-to-b from-background to-gray-900/50 relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Main footer content */}
        <div className="grid md:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div>
            <h3 className="text-2xl font-bold mb-2">Ilm AI</h3>
            <p className="text-gray-400 mb-6 text-sm">
              Transforming education through personalized AI learning.
            </p>
            <p className="text-gray-500 italic text-sm">
              "Learning is not a phase of life. It is life."
            </p>
          </div>

          {/* Product */}
          <div>
            <h4 className="font-semibold mb-4">Product</h4>
            <ul className="space-y-2">
              {['Features', 'Pricing', 'Security', 'Roadmap'].map((item) => (
                <li key={item}>
                  <a href="#" className="text-gray-400 hover:text-gray-200 transition-colors text-sm">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="font-semibold mb-4">Resources</h4>
            <ul className="space-y-2">
              {['Documentation', 'Blog', 'Community', 'Help Center'].map((item) => (
                <li key={item}>
                  <a href="#" className="text-gray-400 hover:text-gray-200 transition-colors text-sm">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-semibold mb-4">Company</h4>
            <ul className="space-y-2">
              {['About', 'Careers', 'Blog', 'Contact'].map((item) => (
                <li key={item}>
                  <a href="#" className="text-gray-400 hover:text-gray-200 transition-colors text-sm">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-800 pt-8 mb-8">
          {/* Social icons and bottom links */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            {/* Social links */}
            <div className="flex gap-4">
              {[
                { icon: Twitter, href: '#', label: 'Twitter' },
                { icon: Github, href: '#', label: 'GitHub' },
                { icon: Linkedin, href: '#', label: 'LinkedIn' },
                { icon: Mail, href: '#', label: 'Email' },
              ].map((social) => {
                const Icon = social.icon
                return (
                  <a
                    key={social.label}
                    href={social.href}
                    className="p-2 rounded-lg bg-gray-800/50 hover:bg-purple-600/20 text-gray-400 hover:text-purple-400 transition-all duration-300"
                    aria-label={social.label}
                  >
                    <Icon className="w-5 h-5" />
                  </a>
                )
              })}
            </div>

            {/* Bottom text */}
            <div className="flex flex-col sm:flex-row gap-4 items-center text-sm text-gray-500">
              <a href="#" className="hover:text-gray-400 transition-colors">
                Privacy Policy
              </a>
              <div className="hidden sm:block w-1 h-1 bg-gray-700 rounded-full"></div>
              <a href="#" className="hover:text-gray-400 transition-colors">
                Terms of Service
              </a>
              <div className="hidden sm:block w-1 h-1 bg-gray-700 rounded-full"></div>
              <span>© 2024 Ilm AI. All rights reserved.</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
