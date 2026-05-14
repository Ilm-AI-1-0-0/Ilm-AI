'use client';

import { useState, useRef, useEffect, ChangeEvent } from 'react';
import { Send, Paperclip, X, FileText } from 'lucide-react';
import { toast } from 'sonner';

interface AttachedFile {
  file: File;
  id: string;
}

interface ChatInputProps {
  onSendMessage: (message: string, files?: File[]) => void;
  isLoading?: boolean;
  selectedMaterialsCount: number;
}

const ALLOWED_TYPES = [
  'application/pdf',
  'application/msword',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  'text/plain',
];
const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB

export function ChatInput({
  onSendMessage,
  isLoading,
  selectedMaterialsCount,
}: ChatInputProps) {
  const [message, setMessage] = useState('');
  const [attachedFiles, setAttachedFiles] = useState<AttachedFile[]>([]);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Auto-resize textarea - only grow, start at single line height
  useEffect(() => {
    if (textareaRef.current) {
      // Reset to minimum height first
      textareaRef.current.style.height = '44px';
      // Only grow if content exceeds minimum
      if (textareaRef.current.scrollHeight > 44) {
        textareaRef.current.style.height = Math.min(
          textareaRef.current.scrollHeight,
          200
        ) + 'px';
      }
    }
  }, [message]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if ((message.trim() || attachedFiles.length > 0) && !isLoading) {
      onSendMessage(
        message,
        attachedFiles.length > 0 ? attachedFiles.map((f) => f.file) : undefined
      );
      setMessage('');
      setAttachedFiles([]);
      if (textareaRef.current) {
        textareaRef.current.style.height = '44px';
      }
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e as unknown as React.FormEvent);
    }
  };

  const handleAttachClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    const validFiles: AttachedFile[] = [];

    Array.from(files).forEach((file) => {
      if (!ALLOWED_TYPES.includes(file.type)) {
        toast.error(`${file.name}: Only PDF, Word, and text files are allowed`);
        return;
      }
      if (file.size > MAX_FILE_SIZE) {
        toast.error(`${file.name}: File size must be under 10MB`);
        return;
      }
      validFiles.push({
        file,
        id: `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      });
    });

    if (validFiles.length > 0) {
      setAttachedFiles((prev) => [...prev, ...validFiles]);
      toast.success(`${validFiles.length} file(s) attached`);
    }

    // Reset input
    e.target.value = '';
  };

  const removeFile = (id: string) => {
    setAttachedFiles((prev) => prev.filter((f) => f.id !== id));
  };

  return (
    <div className="border-t border-border bg-background/95 backdrop-blur-sm p-4">
      <form onSubmit={handleSubmit} className="space-y-3">
        {/* Attached Files Preview */}
        {attachedFiles.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {attachedFiles.map((attached) => (
              <div
                key={attached.id}
                className="flex items-center gap-2 bg-primary/10 border border-primary/30 rounded-lg px-3 py-1.5 text-sm"
              >
                <FileText className="w-4 h-4 text-primary" />
                <span className="text-foreground max-w-[150px] truncate">
                  {attached.file.name}
                </span>
                <button
                  type="button"
                  onClick={() => removeFile(attached.id)}
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        )}

        <div className="flex gap-3 items-end">
          <div className="flex-1 relative">
            <textarea
              ref={textareaRef}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Ask anything about your materials..."
              disabled={isLoading}
              rows={1}
              className="w-full bg-input border border-border rounded-lg px-4 py-3 text-sm text-foreground placeholder-muted-foreground resize-none focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent disabled:opacity-50 transition-all overflow-hidden"
              style={{ height: '44px', minHeight: '44px', maxHeight: '200px' }}
            />
          </div>
          <div className="flex items-center gap-2">
            <input
              ref={fileInputRef}
              type="file"
              accept=".pdf,.doc,.docx,.txt"
              multiple
              onChange={handleFileChange}
              className="hidden"
            />
            <button
              type="button"
              onClick={handleAttachClick}
              className="p-3 rounded-lg border border-border hover:bg-card hover:border-primary transition-colors disabled:opacity-50"
              disabled={isLoading}
              title="Attach file (PDF, Word, or text)"
            >
              <Paperclip className="w-4 h-4 text-muted-foreground" />
            </button>
            <button
              type="submit"
              disabled={(!message.trim() && attachedFiles.length === 0) || isLoading}
              className="p-3 rounded-lg bg-primary hover:bg-primary/90 text-primary-foreground disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              title="Send message"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Disclaimer and Material Count */}
        <div className="flex items-start justify-between gap-4">
          <p className="text-xs text-muted-foreground">
            AI answers only from your materials
          </p>
          {selectedMaterialsCount > 0 && (
            <span className="text-xs bg-primary/10 border border-primary/30 rounded px-2 py-1 text-primary font-medium">
              Using {selectedMaterialsCount} material{selectedMaterialsCount !== 1 ? 's' : ''}
            </span>
          )}
        </div>
      </form>
    </div>
  );
}
