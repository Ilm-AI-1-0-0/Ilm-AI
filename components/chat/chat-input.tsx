'use client';

import { useState, useRef, useEffect } from 'react';
import { Send, Paperclip } from 'lucide-react';

interface ChatInputProps {
  onSendMessage: (message: string) => void;
  isLoading?: boolean;
  selectedMaterialsCount: number;
}

export function ChatInput({
  onSendMessage,
  isLoading,
  selectedMaterialsCount,
}: ChatInputProps) {
  const [message, setMessage] = useState('');
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Auto-resize textarea
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = Math.min(
        textareaRef.current.scrollHeight,
        200
      ) + 'px';
    }
  }, [message]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim() && !isLoading) {
      onSendMessage(message);
      setMessage('');
      if (textareaRef.current) {
        textareaRef.current.style.height = 'auto';
      }
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e as any);
    }
  };

  return (
    <div className="border-t border-border bg-background/95 backdrop-blur-sm p-4">
      <form onSubmit={handleSubmit} className="space-y-3">
        <div className="flex gap-3">
          <textarea
            ref={textareaRef}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Ask anything about your materials..."
            disabled={isLoading}
            rows={1}
            className="flex-1 bg-input border border-border rounded-lg px-4 py-3 text-sm text-foreground placeholder-muted-foreground resize-none focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent disabled:opacity-50 transition-all"
          />
          <div className="flex items-end gap-2">
            <button
              type="button"
              className="p-3 rounded-lg border border-border hover:bg-card hover:border-primary transition-colors disabled:opacity-50"
              disabled={isLoading}
              title="Attach file"
            >
              <Paperclip className="w-4 h-4 text-muted-foreground" />
            </button>
            <button
              type="submit"
              disabled={!message.trim() || isLoading}
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
            💡 AI answers only from your materials
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
