'use client';

import { useState } from 'react';
import { MessageCircle, Clock, Flame, ExternalLink } from 'lucide-react';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

const reminderTimes = [
  { value: '06:00', label: '6:00 AM' },
  { value: '07:00', label: '7:00 AM' },
  { value: '08:00', label: '8:00 AM' },
  { value: '09:00', label: '9:00 AM' },
  { value: '12:00', label: '12:00 PM' },
  { value: '18:00', label: '6:00 PM' },
  { value: '20:00', label: '8:00 PM' },
  { value: '21:00', label: '9:00 PM' },
];

export default function NotificationsSection() {
  const [telegramConnected, setTelegramConnected] = useState(false);
  const [reminderTime, setReminderTime] = useState('09:00');
  const [streakNotifications, setStreakNotifications] = useState(true);

  const handleTelegramToggle = () => {
    if (!telegramConnected) {
      // Open Telegram bot link in new tab
      window.open('https://t.me/IlmAIBot', '_blank');
    }
    setTelegramConnected(!telegramConnected);
  };

  return (
    <div className="space-y-6">
      {/* Telegram Bot Connection */}
      <div className="bg-[#1F2937] rounded-lg p-4 border border-[#374151]">
        <div className="flex items-start justify-between">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-lg bg-blue-500/20 flex items-center justify-center flex-shrink-0">
              <MessageCircle className="w-5 h-5 text-blue-400" />
            </div>
            <div>
              <p className="text-white font-medium">Telegram Bot</p>
              <p className="text-sm text-gray-400 mt-0.5">
                {telegramConnected 
                  ? 'Connected - receiving notifications' 
                  : 'Get reminders and updates via Telegram'
                }
              </p>
            </div>
          </div>
          <Switch 
            checked={telegramConnected}
            onCheckedChange={handleTelegramToggle}
            className="data-[state=checked]:bg-purple-500"
          />
        </div>
        
        {!telegramConnected && (
          <Button
            variant="outline"
            size="sm"
            onClick={handleTelegramToggle}
            className="mt-4 border-blue-500/50 text-blue-400 hover:bg-blue-500/10"
          >
            <ExternalLink className="w-4 h-4 mr-2" />
            Connect Telegram
          </Button>
        )}
      </div>

      {/* Daily Reminder Time */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-amber-500/20 flex items-center justify-center flex-shrink-0">
            <Clock className="w-5 h-5 text-amber-400" />
          </div>
          <div>
            <Label className="text-white font-medium">Daily Reminder</Label>
            <p className="text-sm text-gray-400">When to send study reminders</p>
          </div>
        </div>
        <Select value={reminderTime} onValueChange={setReminderTime}>
          <SelectTrigger className="w-32 bg-[#1F2937] border-[#374151] text-white">
            <SelectValue />
          </SelectTrigger>
          <SelectContent className="bg-[#1F2937] border-[#374151]">
            {reminderTimes.map((time) => (
              <SelectItem 
                key={time.value} 
                value={time.value}
                className="text-white hover:bg-[#374151] focus:bg-[#374151]"
              >
                {time.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Streak Notifications */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-orange-500/20 flex items-center justify-center flex-shrink-0">
            <Flame className="w-5 h-5 text-orange-400" />
          </div>
          <div>
            <Label className="text-white font-medium">Streak Notifications</Label>
            <p className="text-sm text-gray-400">{"Get notified about your learning streak"}</p>
          </div>
        </div>
        <Switch 
          checked={streakNotifications}
          onCheckedChange={setStreakNotifications}
          className="data-[state=checked]:bg-purple-500"
        />
      </div>
    </div>
  );
}
