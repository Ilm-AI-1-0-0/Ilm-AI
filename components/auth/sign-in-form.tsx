'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Mail, Lock, Eye, EyeOff, AlertCircle, CheckCircle, Loader2 } from 'lucide-react';
import { toast } from 'sonner';

const signInSchema = z.object({
  email: z.string().min(1, 'Email is required').email('Please enter a valid email'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
});

type SignInFormData = z.infer<typeof signInSchema>;

export default function SignInForm() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [isShaking, setIsShaking] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isSubmitSuccessful },
    setError,
  } = useForm<SignInFormData>({
    resolver: zodResolver(signInSchema),
  });

  const onSubmit = async (data: SignInFormData) => {
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500));
      
      // Simulate successful login
      toast.success('Signed in successfully!');
      router.push('/dashboard');
    } catch (error) {
      setIsShaking(true);
      setTimeout(() => setIsShaking(false), 500);
      setError('root', { message: 'Sign in failed. Please try again.' });
      toast.error('Sign in failed. Please check your credentials.');
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className={`space-y-4 ${isShaking ? 'animate-wrong-shake' : ''}`}
    >
      {/* Email field */}
      <div>
        <label className="block text-sm font-medium text-gray-300 mb-2">Email Address</label>
        <div className="relative">
          <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
          <input
            type="email"
            {...register('email')}
            placeholder="you@example.com"
            className={`w-full pl-10 pr-4 py-2.5 bg-[#1F2937] border rounded-lg text-white placeholder-gray-500 transition-all duration-200 focus:outline-none ${
              errors.email
                ? 'border-red-500/50 focus:border-red-500 focus:ring-2 focus:ring-red-500/20'
                : 'border-gray-600/30 focus:border-purple-500/50 focus:ring-2 focus:ring-purple-500/20'
            }`}
          />
        </div>
        {errors.email && (
          <p className="mt-1 text-xs text-red-400 flex items-center gap-1">
            <AlertCircle className="w-3 h-3" /> {errors.email.message}
          </p>
        )}
      </div>

      {/* Password field */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <label className="block text-sm font-medium text-gray-300">Password</label>
          <button
            type="button"
            className="text-xs text-purple-400 hover:text-purple-300 transition-colors"
          >
            Forgot password?
          </button>
        </div>
        <div className="relative">
          <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
          <input
            type={showPassword ? 'text' : 'password'}
            {...register('password')}
            placeholder="Enter your password"
            className={`w-full pl-10 pr-10 py-2.5 bg-[#1F2937] border rounded-lg text-white placeholder-gray-500 transition-all duration-200 focus:outline-none ${
              errors.password
                ? 'border-red-500/50 focus:border-red-500 focus:ring-2 focus:ring-red-500/20'
                : 'border-gray-600/30 focus:border-purple-500/50 focus:ring-2 focus:ring-purple-500/20'
            }`}
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-400 transition-colors"
          >
            {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
          </button>
        </div>
        {errors.password && (
          <p className="mt-1 text-xs text-red-400 flex items-center gap-1">
            <AlertCircle className="w-3 h-3" /> {errors.password.message}
          </p>
        )}
      </div>

      {/* General error */}
      {errors.root && (
        <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-3 flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
          <p className="text-sm text-red-300">{errors.root.message}</p>
        </div>
      )}

      {/* Success state */}
      {isSubmitSuccessful && (
        <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-3 flex items-start gap-3">
          <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
          <p className="text-sm text-green-300">Signed in successfully! Redirecting...</p>
        </div>
      )}

      {/* Submit button */}
      <button
        type="submit"
        disabled={isSubmitting || isSubmitSuccessful}
        className={`w-full py-2.5 px-4 rounded-lg font-medium text-white text-sm transition-all duration-300 flex items-center justify-center gap-2 ${
          isSubmitSuccessful
            ? 'bg-green-600 hover:bg-green-700'
            : 'bg-gradient-to-r from-purple-600 to-violet-600 hover:from-purple-700 hover:to-violet-700 active:scale-95'
        } disabled:opacity-70`}
      >
        {isSubmitting ? (
          <>
            <Loader2 className="w-4 h-4 animate-spin" />
            Signing in...
          </>
        ) : isSubmitSuccessful ? (
          <>
            <CheckCircle className="w-4 h-4" />
            Signed in
          </>
        ) : (
          'Sign In'
        )}
      </button>
    </form>
  );
}
