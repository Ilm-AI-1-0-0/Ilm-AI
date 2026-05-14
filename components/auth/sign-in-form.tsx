'use client';

import { useState } from 'react';
import { Mail, Lock, Eye, EyeOff, AlertCircle, CheckCircle } from 'lucide-react';

interface FormErrors {
  email?: string;
  password?: string;
  general?: string;
}

export default function SignInForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<FormErrors>({});
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const validateForm = () => {
    const newErrors: FormErrors = {};

    if (!email) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = 'Please enter a valid email';
    }

    if (!password) {
      newErrors.password = 'Password is required';
    } else if (password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500));
      setSuccess(true);
      setTimeout(() => {
        // Redirect or handle success
      }, 2000);
    } catch (error) {
      setErrors({ general: 'Sign in failed. Please try again.' });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Email field */}
      <div>
        <label className="block text-sm font-medium text-gray-300 mb-2">Email Address</label>
        <div className="relative">
          <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
          <input
            type="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              if (errors.email) setErrors({ ...errors, email: undefined });
            }}
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
            <AlertCircle className="w-3 h-3" /> {errors.email}
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
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              if (errors.password) setErrors({ ...errors, password: undefined });
            }}
            placeholder="••••••••"
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
            <AlertCircle className="w-3 h-3" /> {errors.password}
          </p>
        )}
      </div>

      {/* General error */}
      {errors.general && (
        <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-3 flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
          <p className="text-sm text-red-300">{errors.general}</p>
        </div>
      )}

      {/* Success state */}
      {success && (
        <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-3 flex items-start gap-3">
          <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
          <p className="text-sm text-green-300">Signed in successfully!</p>
        </div>
      )}

      {/* Submit button */}
      <button
        type="submit"
        disabled={isLoading || success}
        className={`w-full py-2.5 px-4 rounded-lg font-medium text-white text-sm transition-all duration-300 flex items-center justify-center gap-2 ${
          success
            ? 'bg-green-600 hover:bg-green-700'
            : 'bg-gradient-to-r from-purple-600 to-violet-600 hover:from-purple-700 hover:to-violet-700 active:scale-95'
        } disabled:opacity-70`}
      >
        {isLoading ? (
          <>
            <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
            Signing in...
          </>
        ) : success ? (
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
