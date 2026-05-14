'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Mail, Lock, User, Eye, EyeOff, AlertCircle, CheckCircle, BookOpen, Loader2 } from 'lucide-react';
import { toast } from 'sonner';

const signUpSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters').max(50, 'Name is too long'),
  email: z.string().min(1, 'Email is required').email('Please enter a valid email'),
  password: z
    .string()
    .min(8, 'Password must be at least 8 characters')
    .regex(/[0-9]/, 'Password must contain at least 1 number'),
  confirmPassword: z.string().min(1, 'Please confirm your password'),
  learningGoal: z.string().max(200, 'Learning goal is too long').optional(),
}).refine((data) => data.password === data.confirmPassword, {
  message: 'Passwords do not match',
  path: ['confirmPassword'],
});

type SignUpFormData = z.infer<typeof signUpSchema>;

export default function SignUpForm() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isShaking, setIsShaking] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting, isSubmitSuccessful },
    setError,
  } = useForm<SignUpFormData>({
    resolver: zodResolver(signUpSchema),
  });

  const password = watch('password', '');
  const confirmPassword = watch('confirmPassword', '');

  const getPasswordStrength = () => {
    if (!password) return 0;
    let strength = 0;
    if (password.length >= 8) strength++;
    if (/[A-Z]/.test(password)) strength++;
    if (/[0-9]/.test(password)) strength++;
    if (/[!@#$%^&*]/.test(password)) strength++;
    return strength;
  };

  const passwordStrength = getPasswordStrength();

  const onSubmit = async (data: SignUpFormData) => {
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500));
      
      toast.success('Account created successfully!');
      router.push('/onboarding');
    } catch (error) {
      setIsShaking(true);
      setTimeout(() => setIsShaking(false), 500);
      setError('root', { message: 'Sign up failed. Please try again.' });
      toast.error('Sign up failed. Please try again.');
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className={`space-y-4 ${isShaking ? 'animate-wrong-shake' : ''}`}
    >
      {/* Name field */}
      <div>
        <label className="block text-sm font-medium text-gray-300 mb-2">Full Name</label>
        <div className="relative">
          <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
          <input
            type="text"
            {...register('name')}
            placeholder="John Doe"
            className={`w-full pl-10 pr-4 py-2.5 bg-[#1F2937] border rounded-lg text-white placeholder-gray-500 transition-all duration-200 focus:outline-none ${
              errors.name
                ? 'border-red-500/50 focus:border-red-500 focus:ring-2 focus:ring-red-500/20'
                : 'border-gray-600/30 focus:border-purple-500/50 focus:ring-2 focus:ring-purple-500/20'
            }`}
          />
        </div>
        {errors.name && (
          <p className="mt-1 text-xs text-red-400 flex items-center gap-1">
            <AlertCircle className="w-3 h-3" /> {errors.name.message}
          </p>
        )}
      </div>

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
        <label className="block text-sm font-medium text-gray-300 mb-2">Password</label>
        <div className="relative">
          <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
          <input
            type={showPassword ? 'text' : 'password'}
            {...register('password')}
            placeholder="Min 8 chars, 1 number"
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
        {password && (
          <div className="mt-2 flex items-center gap-2">
            <div className="flex-1 h-1.5 bg-gray-700 rounded-full overflow-hidden">
              <div
                className={`h-full transition-all duration-300 ${
                  passwordStrength === 1
                    ? 'w-1/4 bg-red-500'
                    : passwordStrength === 2
                      ? 'w-1/2 bg-yellow-500'
                      : passwordStrength === 3
                        ? 'w-3/4 bg-blue-500'
                        : 'w-full bg-green-500'
                }`}
              ></div>
            </div>
            <span className="text-xs text-gray-400">
              {passwordStrength === 1
                ? 'Weak'
                : passwordStrength === 2
                  ? 'Fair'
                  : passwordStrength === 3
                    ? 'Good'
                    : 'Strong'}
            </span>
          </div>
        )}
        {errors.password && (
          <p className="mt-1 text-xs text-red-400 flex items-center gap-1">
            <AlertCircle className="w-3 h-3" /> {errors.password.message}
          </p>
        )}
      </div>

      {/* Confirm password field */}
      <div>
        <label className="block text-sm font-medium text-gray-300 mb-2">Confirm Password</label>
        <div className="relative">
          <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
          <input
            type={showConfirmPassword ? 'text' : 'password'}
            {...register('confirmPassword')}
            placeholder="Re-enter your password"
            className={`w-full pl-10 pr-10 py-2.5 bg-[#1F2937] border rounded-lg text-white placeholder-gray-500 transition-all duration-200 focus:outline-none ${
              errors.confirmPassword
                ? 'border-red-500/50 focus:border-red-500 focus:ring-2 focus:ring-red-500/20'
                : confirmPassword && password === confirmPassword
                  ? 'border-green-500/50 focus:border-green-500 focus:ring-2 focus:ring-green-500/20'
                  : 'border-gray-600/30 focus:border-purple-500/50 focus:ring-2 focus:ring-purple-500/20'
            }`}
          />
          <button
            type="button"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-400 transition-colors"
          >
            {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
          </button>
        </div>
        {confirmPassword && password === confirmPassword && !errors.confirmPassword && (
          <p className="mt-1 text-xs text-green-400 flex items-center gap-1">
            <CheckCircle className="w-3 h-3" /> Passwords match
          </p>
        )}
        {errors.confirmPassword && (
          <p className="mt-1 text-xs text-red-400 flex items-center gap-1">
            <AlertCircle className="w-3 h-3" /> {errors.confirmPassword.message}
          </p>
        )}
      </div>

      {/* Learning goal field */}
      <div>
        <label className="block text-sm font-medium text-gray-300 mb-2">
          {"What are you learning? (optional)"}
        </label>
        <div className="relative">
          <BookOpen className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
          <input
            type="text"
            {...register('learningGoal')}
            placeholder="e.g., Python, Machine Learning"
            className="w-full pl-10 pr-4 py-2.5 bg-[#1F2937] border border-gray-600/30 rounded-lg text-white placeholder-gray-500 transition-all duration-200 focus:outline-none focus:border-purple-500/50 focus:ring-2 focus:ring-purple-500/20"
          />
        </div>
        <p className="mt-1 text-xs text-gray-500">This helps us customize your learning experience</p>
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
          <p className="text-sm text-green-300">Account created! Redirecting...</p>
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
            Creating account...
          </>
        ) : isSubmitSuccessful ? (
          <>
            <CheckCircle className="w-4 h-4" />
            Account created
          </>
        ) : (
          'Create Account'
        )}
      </button>
    </form>
  );
}
