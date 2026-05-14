'use client';

import { useState } from 'react';
import { Trash2, AlertTriangle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';

export default function DangerZoneSection() {
  const [confirmText, setConfirmText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const confirmPhrase = 'DELETE';

  const handleDelete = async () => {
    if (confirmText !== confirmPhrase) return;
    
    setIsDeleting(true);
    // Simulate deletion process
    await new Promise(resolve => setTimeout(resolve, 2000));
    // In real app, redirect to homepage or show success
    setIsDeleting(false);
  };

  return (
    <div className="space-y-4">
      <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-4">
        <div className="flex items-start gap-3">
          <AlertTriangle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-red-400 font-medium">Warning</p>
            <p className="text-sm text-gray-400 mt-1">
              Deleting your account is permanent and cannot be undone. 
              All your data, including materials, quiz history, and progress will be lost.
            </p>
          </div>
        </div>
      </div>

      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button 
            variant="outline" 
            className="border-red-500/50 text-red-400 hover:bg-red-500/10 hover:text-red-300"
          >
            <Trash2 className="w-4 h-4 mr-2" />
            Delete Account
          </Button>
        </AlertDialogTrigger>
        <AlertDialogContent className="bg-[#111827] border-[#374151]">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-white flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-red-400" />
              Delete Account Permanently?
            </AlertDialogTitle>
            <AlertDialogDescription className="text-gray-400">
              This action cannot be undone. This will permanently delete your account 
              and remove all your data from our servers.
            </AlertDialogDescription>
          </AlertDialogHeader>
          
          <div className="py-4">
            <p className="text-sm text-gray-400 mb-2">
              Type <span className="font-mono text-red-400 font-medium">{confirmPhrase}</span> to confirm:
            </p>
            <Input
              value={confirmText}
              onChange={(e) => setConfirmText(e.target.value)}
              className="bg-[#1F2937] border-[#374151] text-white font-mono"
              placeholder="Type DELETE"
            />
          </div>

          <AlertDialogFooter>
            <AlertDialogCancel 
              onClick={() => setConfirmText('')}
              className="border-[#374151] text-gray-300 hover:bg-[#1F2937]"
            >
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction 
              onClick={handleDelete}
              disabled={confirmText !== confirmPhrase || isDeleting}
              className="bg-red-500 hover:bg-red-600 text-white disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isDeleting ? 'Deleting...' : 'Delete Account'}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
