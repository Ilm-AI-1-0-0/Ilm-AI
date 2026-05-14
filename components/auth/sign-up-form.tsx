'use client';

import { useState } from 'react';
import { Mail, Lock, User, Eye, EyeOff, AlertCircle, CheckCircle, BookOpen } from 'lucide-react';

interface FormErrors {
  name?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
  general?: string;
}

export default function SignUpForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [learningGoal, setLearningGoal] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState<FormErrors>({});
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const validateForm = () => {
    const newErrors: FormErrors = {};

    if (!name.trim()) {
      newErrors.name = 'Name is required';
    } else if (name.length < 2) {
      newErrors.name = 'Name must be at least 2 characters';
    }

    if (!email) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = 'Please enter a valid email';
    }

    if (!password) {
      newErrors.password = 'Password is required';
    } else if (password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    } else if (!/[A-Z]/.test(password)) {
      newErrors.password = 'Password must contain an uppercase letter';
    } else if (!/[0-9]/.test(password)) {
      newErrors.password = 'Password must contain a number';
    }

    if (!confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
    } else if (password !== confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
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
      setErrors({ general: 'Sign up failed. Please try again.' });
    } finally {
      setIsLoading(false);
    }
  };

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

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Name field */}
      <div>
        <label className="block text-sm font-medium text-gray-300 mb-2">Full Name</label>
        <div className="relative">
          <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
          <input
            type="text"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
              if (errors.name) setErrors({ ...errors, name: undefined });
            }}
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
            <AlertCircle className="w-3 h-3" /> {errors.name}
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
        <label className="block text-sm font-medium text-gray-300 mb-2">Password</label>
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
            <AlertCircle className="w-3 h-3" /> {errors.password}
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
            value={confirmPassword}
            onChange={(e) => {
              setConfirmPassword(e.target.value);
              if (errors.confirmPassword) setErrors({ ...errors, confirmPassword: undefined });
            }}
            placeholder="••••••••"
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
            <AlertCircle className="w-3 h-3" /> {errors.confirmPassword}
          </p>
        )}
      </div>

      {/* Learning goal field */}
      <div>
        <label className="block text-sm font-medium text-gray-300 mb-2">What are you learning? (optional)</label>
        <div className="relative">
          <BookOpen className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
          <input
            type="text"
            value={learningGoal}
            onChange={(e) => setLearningGoal(e.target.value)}
            placeholder="e.g., Python, Machine Learning, Biology"
            className="w-full pl-10 pr-4 py-2.5 bg-[#1F2937] border border-gray-600/30 rounded-lg text-white placeholder-gray-500 transition-all duration-200 focus:outline-none focus:border-purple-500/50 focus:ring-2 focus:ring-purple-500/20"
          />
        </div>
        <p className="mt-1 text-xs text-gray-500">This helps us customize your learning experience</p>
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
          <p className="text-sm text-green-300">Account created successfully!</p>
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
            Creating account...
          </>
        ) : success ? (
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
