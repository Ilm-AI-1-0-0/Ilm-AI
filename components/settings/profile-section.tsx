'use client';

import { useState, useRef } from 'react';
import { Camera, User } from 'lucide-react';
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

const languages = [
  { value: 'uz', label: 'O\'zbekcha', flag: '🇺🇿' },
  { value: 'ru', label: 'Русский', flag: '🇷🇺' },
  { value: 'en', label: 'English', flag: '🇺🇸' },
];

interface ProfileSectionProps {
  onSave?: () => void;
}

export default function ProfileSection({ onSave }: ProfileSectionProps) {
  const [avatar, setAvatar] = useState<string | null>(null);
  const [name, setName] = useState('John Doe');
  const [email, setEmail] = useState('john@example.com');
  const [language, setLanguage] = useState('en');
  const [isSaving, setIsSaving] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleAvatarUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatar(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = async () => {
    setIsSaving(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    setIsSaving(false);
    onSave?.();
  };

  return (
    <div className="space-y-6">
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
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="bg-[#1F2937] border-[#374151] text-white placeholder:text-gray-500 focus:border-purple-500"
          placeholder="Enter your name"
        />
      </div>

      {/* Email Field */}
      <div className="space-y-2">
        <Label htmlFor="email" className="text-gray-300">Email Address</Label>
        <Input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="bg-[#1F2937] border-[#374151] text-white placeholder:text-gray-500 focus:border-purple-500"
          placeholder="Enter your email"
        />
      </div>

      {/* Language Selector */}
      <div className="space-y-2">
        <Label className="text-gray-300">Language</Label>
        <Select value={language} onValueChange={setLanguage}>
          <SelectTrigger className="w-full bg-[#1F2937] border-[#374151] text-white">
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
                  <span>{lang.flag}</span>
                  <span>{lang.label}</span>
                </span>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Save Button */}
      <Button 
        onClick={handleSave}
        disabled={isSaving}
        className="bg-purple-500 hover:bg-purple-600 text-white"
      >
        {isSaving ? 'Saving...' : 'Save Changes'}
      </Button>
    </div>
  );
}
