'use client';

import { useState, useRef, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Camera, User, AlertCircle, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { toast } from 'sonner';

const profileSchema = z.object({
  name: z
    .string()
    .min(2, 'Name must be at least 2 characters')
    .max(50, 'Name is too long'),
  email: z
    .string()
    .min(1, 'Email is required')
    .email('Please enter a valid email'),
  language: z.enum(['en', 'ru', 'uz'], {
    required_error: 'Please select a language',
  }),
});

type ProfileFormData = z.infer<typeof profileSchema>;

const languages = [
  { value: 'uz', label: "O'zbekcha", flag: '' },
  { value: 'ru', label: 'Russkiy', flag: '' },
  { value: 'en', label: 'English', flag: '' },
];

interface ProfileSectionProps {
  onSave?: () => void;
}

export default function ProfileSection({ onSave }: ProfileSectionProps) {
  const [avatar, setAvatar] = useState<string | null>(null);
  const [showUnsavedDialog, setShowUnsavedDialog] = useState(false);
  const [pendingNavigation, setPendingNavigation] = useState<(() => void) | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors, isSubmitting, isDirty },
  } = useForm<ProfileFormData>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      name: 'John Doe',
      email: 'john@example.com',
      language: 'en',
    },
  });

  const language = watch('language');

  // Warn user about unsaved changes when navigating away
  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (isDirty) {
        e.preventDefault();
        e.returnValue = '';
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  }, [isDirty]);

  const handleAvatarUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Validate file size (max 2MB)
      if (file.size > 2 * 1024 * 1024) {
        toast.error('Image must be under 2MB');
        return;
      }
      
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatar(reader.result as string);
        toast.success('Avatar uploaded');
      };
      reader.readAsDataURL(file);
    }
  };

  const onSubmit = async (data: ProfileFormData) => {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      toast.success('Profile updated successfully');
      onSave?.();
    } catch (error) {
      toast.error('Failed to save profile');
    }
  };

  const handleNavigationWithUnsavedChanges = (action: () => void) => {
    if (isDirty) {
      setPendingNavigation(() => action);
      setShowUnsavedDialog(true);
    } else {
      action();
    }
  };

  const confirmNavigation = () => {
    if (pendingNavigation) {
      pendingNavigation();
    }
    setShowUnsavedDialog(false);
    setPendingNavigation(null);
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Avatar Upload */}
        <div className="flex items-center gap-6">
          <div className="relative">
            <div className="w-20 h-20 rounded-full bg-[#1F2937] border-2 border-[#374151] flex items-center justify-center overflow-hidden">
              {avatar ? (
                <img src={avatar} alt="Avatar" className="w-full h-full object-cover" />
              ) : (
                <User className="w-8 h-8 text-gray-400" />
              )}
            </div>
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="absolute -bottom-1 -right-1 w-8 h-8 rounded-full bg-purple-500 hover:bg-purple-600 flex items-center justify-center transition-colors"
            >
              <Camera className="w-4 h-4 text-white" />
            </button>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleAvatarUpload}
              className="hidden"
            />
          </div>
          <div>
            <p className="text-sm text-gray-400">Profile Picture</p>
            <p className="text-xs text-gray-500 mt-1">JPG, PNG or GIF. Max 2MB.</p>
          </div>
        </div>

        {/* Name Field */}
        <div className="space-y-2">
          <Label htmlFor="name" className="text-gray-300">Full Name</Label>
          <Input
            id="name"
            {...register('name')}
            className={`bg-[#1F2937] border-[#374151] text-white placeholder:text-gray-500 ${
              errors.name ? 'border-red-500 focus:border-red-500' : 'focus:border-purple-500'
            }`}
            placeholder="Enter your name"
          />
          {errors.name && (
            <p className="text-xs text-red-400 flex items-center gap-1">
              <AlertCircle className="w-3 h-3" />
              {errors.name.message}
            </p>
          )}
        </div>

        {/* Email Field */}
        <div className="space-y-2">
          <Label htmlFor="email" className="text-gray-300">Email Address</Label>
          <Input
            id="email"
            type="email"
            {...register('email')}
            className={`bg-[#1F2937] border-[#374151] text-white placeholder:text-gray-500 ${
              errors.email ? 'border-red-500 focus:border-red-500' : 'focus:border-purple-500'
            }`}
            placeholder="Enter your email"
          />
          {errors.email && (
            <p className="text-xs text-red-400 flex items-center gap-1">
              <AlertCircle className="w-3 h-3" />
              {errors.email.message}
            </p>
          )}
        </div>

        {/* Language Selector */}
        <div className="space-y-2">
          <Label className="text-gray-300">Language</Label>
          <Select 
            value={language} 
            onValueChange={(val) => setValue('language', val as 'en' | 'ru' | 'uz', { shouldDirty: true })}
          >
            <SelectTrigger className={`w-full bg-[#1F2937] border-[#374151] text-white ${
              errors.language ? 'border-red-500' : ''
            }`}>
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="bg-[#1F2937] border-[#374151]">
              {languages.map((lang) => (
                <SelectItem 
                  key={lang.value} 
                  value={lang.value}
                  className="text-white hover:bg-[#374151] focus:bg-[#374151]"
                >
                  <span className="flex items-center gap-2">
                    <span>{lang.label}</span>
                  </span>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {errors.language && (
            <p className="text-xs text-red-400 flex items-center gap-1">
              <AlertCircle className="w-3 h-3" />
              {errors.language.message}
            </p>
          )}
        </div>

        {/* Dirty indicator */}
        {isDirty && (
          <p className="text-xs text-amber-400">You have unsaved changes</p>
        )}

        {/* Save Button */}
        <Button 
          type="submit"
          disabled={isSubmitting}
          className="bg-purple-500 hover:bg-purple-600 text-white gap-2"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              Saving...
            </>
          ) : (
            'Save Changes'
          )}
        </Button>
      </form>

      {/* Unsaved Changes Dialog */}
      <AlertDialog open={showUnsavedDialog} onOpenChange={setShowUnsavedDialog}>
        <AlertDialogContent className="bg-[#111827] border-[#1F2937]">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-white">Unsaved changes</AlertDialogTitle>
            <AlertDialogDescription className="text-gray-400">
              You have unsaved changes. Are you sure you want to leave? Your changes will be lost.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="bg-[#1F2937] border-gray-700 text-gray-300 hover:text-white">
              Stay
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={confirmNavigation}
              className="bg-red-600 hover:bg-red-700 text-white"
            >
              Leave
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
