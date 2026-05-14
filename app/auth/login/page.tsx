'use client';

import { Zap } from 'lucide-react';
import { AuthLayout } from '@/components/layouts/auth-layout';
import SignInForm from '@/components/auth/sign-in-form';
import Link from 'next/link';

export default function LoginPage() {
  return (
    <AuthLayout>
      <div className="w-full max-w-md">
        {/* Glass card */}
        <div className="glass-card p-8 md:p-10">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-lg bg-gradient-to-br from-purple-500 to-violet-600 mb-4 mx-auto">
              <Zap className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-white mb-2">Welcome Back</h1>
            <p className="text-gray-400 text-sm">Sign in to continue learning</p>
          </div>

          {/* Form content */}
          <div className="animate-fade-in">
            <SignInForm />
          </div>

          {/* Divider text */}
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-700"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-[#111827] text-gray-500">or continue with</span>
            </div>
          </div>

          {/* OAuth button */}
          <button className="w-full bg-white/10 hover:bg-white/15 border border-gray-600/30 rounded-lg py-2.5 px-4 font-medium text-white text-sm transition-all duration-300 flex items-center justify-center gap-2 group">
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <path
                fill="currentColor"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="currentColor"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="currentColor"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
              />
              <path
                fill="currentColor"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
              />
            </svg>
            <span className="group-hover:text-white/90">Continue with Google</span>
          </button>

          {/* Footer text */}
          <p className="text-center text-sm text-gray-500 mt-6">
            {"Don't have an account? "}
            <Link
              href="/auth/register"
              className="text-purple-400 hover:text-purple-300 font-medium transition-colors"
            >
              Sign up
            </Link>
          </p>
        </div>

        {/* Terms text */}
        <p className="text-center text-xs text-gray-600 mt-6">
          By continuing, you agree to our{' '}
          <button className="text-gray-400 hover:text-gray-300 underline transition-colors">
            Terms of Service
          </button>{' '}
          and{' '}
          <button className="text-gray-400 hover:text-gray-300 underline transition-colors">
            Privacy Policy
          </button>
        </p>
      </div>
    </AuthLayout>
  );
}
