'use client';

import { useState, useEffect, useRef } from 'react';
import { MaterialsPanel } from '@/components/chat/materials-panel';
import { ChatHeader } from '@/components/chat/chat-header';
import { ChatMessage, TypingIndicator } from '@/components/chat/chat-message';
import { ChatInput } from '@/components/chat/chat-input';
import { ChatEmptyState } from '@/components/chat/empty-state';

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

  return (
    <div className="flex h-screen bg-background">
      {/* Materials Panel - Desktop only */}
      <MaterialsPanel
        materials={MOCK_MATERIALS}
        selectedMaterials={selectedMaterials}
        onSelectionChange={setSelectedMaterials}
      />

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Header */}
        <ChatHeader
          sessionName="Architecture Discussion"
          materialCount={MOCK_MATERIALS.length}
        />

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
  );
}
