'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { ArrowLeft, Plus, Trash2 } from 'lucide-react';
import { AppLayout } from '@/components/layouts/app-layout';
import { MaterialsPanel } from '@/components/chat/materials-panel';
import { ChatHeader } from '@/components/chat/chat-header';
import { ChatMessage, TypingIndicator } from '@/components/chat/chat-message';
import { ChatInput } from '@/components/chat/chat-input';
import { ChatEmptyState } from '@/components/chat/empty-state';
import { Button } from '@/components/ui/button';
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
import { toast } from 'sonner';

interface Message {
  id: string;
  type: 'user' | 'ai';
  content: string;
  citations?: Array<{
    document: string;
    section: string;
    pageNumber?: number;
  }>;
}

interface Material {
  id: string;
  name: string;
  type: 'pdf' | 'docx' | 'text';
  pages: number;
  uploadedAt: string;
}

// Mock materials data
const MOCK_MATERIALS: Material[] = [
  {
    id: '1',
    name: 'Cloud Architecture Fundamentals',
    type: 'pdf',
    pages: 45,
    uploadedAt: '2024-05-10',
  },
  {
    id: '2',
    name: 'Microservices Design Patterns',
    type: 'pdf',
    pages: 62,
    uploadedAt: '2024-05-08',
  },
  {
    id: '3',
    name: 'Kubernetes Best Practices',
    type: 'docx',
    pages: 28,
    uploadedAt: '2024-05-05',
  },
  {
    id: '4',
    name: 'DevOps Implementation Guide',
    type: 'text',
    pages: 15,
    uploadedAt: '2024-05-01',
  },
];

// Mock responses for demo
const MOCK_RESPONSES: Record<string, Message> = {
  'what is': {
    id: 'ai-1',
    type: 'ai',
    content:
      "Based on your materials, I can help explain various concepts. Could you be more specific about what you'd like to know?",
    citations: [
      {
        document: 'Cloud Architecture Fundamentals',
        section: 'Chapter 1: Introduction',
        pageNumber: 5,
      },
    ],
  },
  'how do': {
    id: 'ai-2',
    type: 'ai',
    content:
      "To answer your question accurately, I'm drawing from the practical examples in your uploaded materials. The key steps are outlined in the implementation guide.",
    citations: [
      {
        document: 'DevOps Implementation Guide',
        section: 'Section 2: Practical Steps',
        pageNumber: 8,
      },
    ],
  },
  'explain': {
    id: 'ai-3',
    type: 'ai',
    content:
      "Based on your materials, this concept is explained thoroughly. The fundamental principles are covered in detail, with real-world examples provided.",
    citations: [
      {
        document: 'Microservices Design Patterns',
        section: 'Chapter 3: Core Patterns',
        pageNumber: 25,
      },
    ],
  },
};

export default function ChatPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedMaterials, setSelectedMaterials] = useState<string[]>(
    MOCK_MATERIALS.map((m) => m.id)
  );
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom when new messages arrive
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  const handleSendMessage = async (content: string) => {
    // Check if materials are selected
    if (selectedMaterials.length === 0) {
      toast.error('Please select at least one material to chat with');
      return;
    }

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content,
    };

    setMessages((prev) => [...prev, userMessage]);
    setIsLoading(true);

    // Simulate API call delay
    setTimeout(() => {
      // Find matching response based on keywords
      let aiResponse: Message | null = null;

      const lowerContent = content.toLowerCase();
      for (const [key, response] of Object.entries(MOCK_RESPONSES)) {
        if (lowerContent.includes(key)) {
          aiResponse = {
            ...response,
            id: Date.now().toString(),
          };
          break;
        }
      }

      // Default response if no match
      if (!aiResponse) {
        aiResponse = {
          id: Date.now().toString(),
          type: 'ai',
          content: `I've reviewed your selected materials. Based on your question about "${content}", here's what I found: Your materials contain relevant information that addresses this topic. The key insights are documented in your uploaded resources.`,
          citations: [
            {
              document: MOCK_MATERIALS[0].name,
              section: 'Core Concepts',
              pageNumber: 12,
            },
            {
              document: MOCK_MATERIALS[1].name,
              section: 'Implementation Details',
              pageNumber: 34,
            },
          ],
        };
      }

      setMessages((prev) => [...prev, aiResponse]);
      setIsLoading(false);
    }, 1000);
  };

  const handleNewConversation = () => {
    setMessages([]);
    toast.success('Started a new conversation');
  };

  const handleClearConversation = () => {
    setMessages([]);
    toast.success('Conversation cleared');
  };

  return (
    <AppLayout>
      <div className="flex h-[calc(100vh-3.5rem)] lg:h-screen bg-background">
        {/* Materials Panel - Desktop only */}
        <MaterialsPanel
          materials={MOCK_MATERIALS}
          selectedMaterials={selectedMaterials}
          onSelectionChange={setSelectedMaterials}
        />

        {/* Main Chat Area */}
        <div className="flex-1 flex flex-col min-w-0">
          {/* Header with back button */}
          <div className="flex items-center justify-between px-4 md:px-6 py-3 border-b border-[#1F2937] bg-[#111827]/50">
            <div className="flex items-center gap-3">
              <Link
                href="/dashboard"
                className="lg:hidden p-2 -ml-2 rounded-lg hover:bg-[#1F2937] text-gray-400 hover:text-white transition-colors"
              >
                <ArrowLeft size={20} />
              </Link>
              <div>
                <h2 className="text-white font-semibold">AI Chat Companion</h2>
                <p className="text-xs text-gray-400">
                  {selectedMaterials.length} material{selectedMaterials.length !== 1 ? 's' : ''} selected
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={handleNewConversation}
                className="gap-2 border-gray-700 text-gray-300 hover:text-white"
              >
                <Plus size={16} />
                <span className="hidden sm:inline">New Chat</span>
              </Button>
              {messages.length > 0 && (
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button
                      variant="outline"
                      size="sm"
                      className="gap-2 border-gray-700 text-gray-300 hover:text-red-400 hover:border-red-500/50"
                    >
                      <Trash2 size={16} />
                      <span className="hidden sm:inline">Clear</span>
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent className="bg-[#111827] border-[#1F2937]">
                    <AlertDialogHeader>
                      <AlertDialogTitle className="text-white">Clear conversation?</AlertDialogTitle>
                      <AlertDialogDescription className="text-gray-400">
                        This will delete all messages in this conversation. This action cannot be undone.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel className="bg-[#1F2937] border-gray-700 text-gray-300 hover:text-white">
                        Cancel
                      </AlertDialogCancel>
                      <AlertDialogAction
                        onClick={handleClearConversation}
                        className="bg-red-600 hover:bg-red-700 text-white"
                      >
                        Clear
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              )}
            </div>
          </div>

          {/* No material warning */}
          {selectedMaterials.length === 0 && (
            <div className="px-4 md:px-6 py-3 bg-amber-500/10 border-b border-amber-500/30">
              <p className="text-sm text-amber-300">
                No materials selected. Select at least one material from the sidebar to start chatting.
              </p>
            </div>
          )}

          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto px-4 md:px-8 py-6">
            {messages.length === 0 ? (
              <ChatEmptyState />
            ) : (
              <>
                {messages.map((message) => (
                  <ChatMessage
                    key={message.id}
                    type={message.type}
                    content={message.content}
                    citations={message.citations}
                  />
                ))}
                {isLoading && <TypingIndicator />}
                <div ref={messagesEndRef} />
              </>
            )}
          </div>

          {/* Input Area */}
          <ChatInput
            onSendMessage={handleSendMessage}
            isLoading={isLoading}
            selectedMaterialsCount={selectedMaterials.length}
          />
        </div>
      </div>
    </AppLayout>
  );
}
