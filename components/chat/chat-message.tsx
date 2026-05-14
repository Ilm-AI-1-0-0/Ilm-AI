'use client';

import { Copy, Check, BookOpen } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';

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
    toast.success('Message copied to clipboard');
    setTimeout(() => setCopied(false), 2000);
  };

  if (type === 'user') {
    return (
      <div className="flex justify-end mb-4 animate-fade-in-up">
        <div className="max-w-xl rounded-2xl px-4 py-3 bg-gradient-to-r from-purple-600 to-violet-600 text-white break-words shadow-lg shadow-purple-500/20">
          <p className="text-sm leading-relaxed">{content}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="mb-6 animate-fade-in-up group">
      <div className="flex gap-3 mb-2">
        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-cyan-500 flex items-center justify-center flex-shrink-0 shadow-lg">
          <span className="text-xs font-bold text-white">AI</span>
        </div>
        <div className="flex-1 max-w-2xl">
          <div className="relative bg-[#1F2937]/80 border border-[#374151] rounded-2xl px-4 py-3 break-words">
            <p className="text-sm leading-relaxed text-gray-100">{content}</p>
            
            {/* Copy Button - shows on hover */}
            <button
              onClick={handleCopy}
              className="absolute top-2 right-2 p-1.5 text-gray-400 hover:text-white hover:bg-white/10 rounded-md transition-all opacity-0 group-hover:opacity-100"
              title="Copy message"
            >
              {copied ? (
                <Check className="w-4 h-4 text-green-400" />
              ) : (
                <Copy className="w-4 h-4" />
              )}
            </button>
          </div>

          {/* Citations as chips */}
          {citations && citations.length > 0 && (
            <div className="mt-3 flex flex-wrap gap-2">
              {citations.map((citation, idx) => (
                <div
                  key={idx}
                  className="inline-flex items-center gap-1.5 text-xs bg-purple-500/10 border border-purple-500/30 rounded-full px-3 py-1.5 text-purple-300 hover:bg-purple-500/20 transition-colors cursor-pointer"
                  title={`${citation.document} - ${citation.section}`}
                >
                  <BookOpen className="w-3 h-3" />
                  <span className="font-medium max-w-[150px] truncate">
                    {citation.document}
                  </span>
                  {citation.pageNumber && (
                    <span className="text-purple-400/70">
                      p.{citation.pageNumber}
                    </span>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export function TypingIndicator() {
  return (
    <div className="flex gap-3 mb-6">
      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-cyan-500 flex items-center justify-center flex-shrink-0 shadow-lg">
        <span className="text-xs font-bold text-white">AI</span>
      </div>
      <div className="bg-[#1F2937]/80 border border-[#374151] rounded-2xl px-4 py-3 flex items-center gap-1.5">
        <span className="w-2 h-2 bg-purple-400 rounded-full animate-bounce"></span>
        <span
          className="w-2 h-2 bg-purple-400 rounded-full animate-bounce"
          style={{ animationDelay: '0.2s' }}
        ></span>
        <span
          className="w-2 h-2 bg-purple-400 rounded-full animate-bounce"
          style={{ animationDelay: '0.4s' }}
        ></span>
      </div>
    </div>
  );
}
