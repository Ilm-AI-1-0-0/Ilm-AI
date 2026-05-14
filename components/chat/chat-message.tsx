'use client';

import { Copy, Check } from 'lucide-react';
import { useState } from 'react';

interface Citation {
  document: string;
  section: string;
  pageNumber?: number;
}

interface ChatMessageProps {
  type: 'user' | 'ai';
  content: string;
  citations?: Citation[];
  isLoading?: boolean;
}

export function ChatMessage({
  type,
  content,
  citations,
  isLoading,
}: ChatMessageProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (type === 'user') {
    return (
      <div className="flex justify-end mb-4 animate-fade-in-up">
        <div className="max-w-xl rounded-lg px-4 py-3 bg-primary text-primary-foreground break-words">
          <p className="text-sm leading-relaxed">{content}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="mb-6 animate-fade-in-up">
      <div className="flex gap-3 mb-2">
        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center flex-shrink-0">
          <span className="text-xs font-bold text-primary-foreground">AI</span>
        </div>
        <div className="flex-1 max-w-2xl">
          <div className="bg-card border border-border rounded-lg px-4 py-3 break-words">
            <p className="text-sm leading-relaxed text-foreground">{content}</p>
          </div>

          {/* Citations */}
          {citations && citations.length > 0 && (
            <div className="mt-3 space-y-2">
              {citations.map((citation, idx) => (
                <div
                  key={idx}
                  className="text-xs bg-background/40 border border-border/30 rounded px-3 py-2 flex items-center justify-between gap-2"
                >
                  <div className="flex-1 min-w-0">
                    <span className="text-muted-foreground">Source:</span>
                    <span className="text-foreground font-medium ml-1">
                      {citation.document}
                    </span>
                    {citation.section && (
                      <span className="text-muted-foreground">
                        {' '}
                        • {citation.section}
                      </span>
                    )}
                    {citation.pageNumber && (
                      <span className="text-muted-foreground">
                        {' '}
                        (p. {citation.pageNumber})
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Copy Button */}
        <button
          onClick={handleCopy}
          className="self-start mt-1 p-2 text-muted-foreground hover:text-foreground hover:bg-card rounded-md transition-all opacity-0 group-hover:opacity-100"
          title="Copy message"
        >
          {copied ? (
            <Check className="w-4 h-4" />
          ) : (
            <Copy className="w-4 h-4" />
          )}
        </button>
      </div>
    </div>
  );
}

export function TypingIndicator() {
  return (
    <div className="flex gap-3 mb-6">
      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center flex-shrink-0">
        <span className="text-xs font-bold text-primary-foreground">AI</span>
      </div>
      <div className="bg-card border border-border rounded-lg px-4 py-3 flex items-center gap-1">
        <span className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce"></span>
        <span
          className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce"
          style={{ animationDelay: '0.2s' }}
        ></span>
        <span
          className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce"
          style={{ animationDelay: '0.4s' }}
        ></span>
      </div>
    </div>
  );
}
