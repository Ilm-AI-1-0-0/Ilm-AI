import Link from 'next/link';
import { PublicLayout } from '@/components/layouts/public-layout';
import Hero from '@/components/hero';
import Problems from '@/components/problems';
import HowItWorks from '@/components/how-it-works';
import Features from '@/components/features';
import Pricing from '@/components/pricing';
import Footer from '@/components/footer';

export default function Home() {
  return (
    <PublicLayout>
      <div className="text-foreground overflow-hidden">
        {/* Hero Section */}
        <Hero />

        {/* Problems Section */}
        <Problems />

        {/* How It Works Section */}
        <HowItWorks />

        {/* Features Grid Section */}
        <Features />

        {/* Pricing Section */}
        <Pricing />

        {/* CTA Section before Footer */}
        <section className="py-24 px-4 sm:px-6 lg:px-8 relative">
          <div className="absolute inset-0 -z-10">
            <div className="absolute inset-0 bg-gradient-to-b from-purple-600/5 to-transparent"></div>
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full h-96 bg-purple-600/10 rounded-full blur-3xl opacity-20"></div>
          </div>

          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl sm:text-5xl font-bold mb-6">Ready to Transform Your Learning?</h2>
            <p className="text-xl text-gray-400 mb-8">
              Join thousands of learners mastering new skills with Ilm AI. Start learning smarter, not harder.
            </p>
            <Link href="/auth/register">
              <button className="bg-gradient-to-r from-purple-600 to-violet-600 hover:from-purple-700 hover:to-violet-700 text-white font-semibold py-4 px-8 rounded-lg inline-flex items-center gap-2 transition-all duration-300 hover:scale-105">
                Get Started Free Today
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </button>
            </Link>
          </div>
        </section>

        {/* Footer */}
        <Footer />
      </div>
    </PublicLayout>
  );
}
