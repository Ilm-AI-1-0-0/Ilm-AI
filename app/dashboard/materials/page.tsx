'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { Search, Plus, ArrowLeft } from 'lucide-react';
import { AppLayout } from '@/components/layouts/app-layout';
import MaterialCard from '@/components/materials/material-card';
import UploadModal from '@/components/materials/upload-modal';
import EmptyState from '@/components/materials/empty-state';
import { toast } from 'sonner';

interface Material {
  id: string;
  title: string;
  filename: string;
  topic: string;
  uploadDate: string;
  pageCount: number;
}

// Mock data - replace with real data from backend
const initialMaterials: Material[] = [
  {
    id: '1',
    title: 'Quantum Computing Basics',
    filename: 'quantum_basics.pdf',
    topic: 'Architecture',
    uploadDate: '2026-05-10',
    pageCount: 45,
  },
  {
    id: '2',
    title: 'Tax Law Fundamentals',
    filename: 'tax_law.docx',
    topic: 'Law',
    uploadDate: '2026-05-08',
    pageCount: 32,
  },
  {
    id: '3',
    title: 'Cloud Infrastructure Guide',
    filename: 'cloud_guide.pdf',
    topic: 'Architecture',
    uploadDate: '2026-05-05',
    pageCount: 67,
  },
  {
    id: '4',
    title: 'Medieval History Notes',
    filename: 'history_notes.txt',
    topic: 'History',
    uploadDate: '2026-05-01',
    pageCount: 18,
  },
];

const allTopics = ['All', 'Architecture', 'Law', 'History', 'Science', 'Business'];

export default function MaterialsPage() {
  const [materials, setMaterials] = useState<Material[]>(initialMaterials);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTopic, setSelectedTopic] = useState('All');
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);

  // Filter materials based on search and topic
  const filteredMaterials = useMemo(() => {
    return materials.filter((material) => {
      const matchesSearch = material.title
        .toLowerCase()
        .includes(searchQuery.toLowerCase());
      const matchesTopic =
        selectedTopic === 'All' || material.topic === selectedTopic;
      return matchesSearch && matchesTopic;
    });
  }, [materials, searchQuery, selectedTopic]);

  const handleUpload = async (data: {
    file?: File;
    text?: string;
    topic: string;
  }) => {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000));

    const newMaterial: Material = {
      id: Date.now().toString(),
      title: data.file?.name.replace(/\.[^/.]+$/, '') || `Text - ${data.topic}`,
      filename: data.file?.name || 'pasted_text.txt',
      topic: data.topic,
      uploadDate: new Date().toISOString().split('T')[0],
      pageCount: data.file ? Math.ceil(data.file.size / 5000) : Math.ceil((data.text?.length || 0) / 2000),
    };

    setMaterials((prev) => [newMaterial, ...prev]);
    toast.success('Material uploaded successfully!');
  };

  const handleRename = (id: string, newName: string) => {
    setMaterials((prev) =>
      prev.map((m) => (m.id === id ? { ...m, title: newName } : m))
    );
    toast.success('Material renamed');
  };

  const handleDelete = (id: string) => {
    setMaterials((prev) => prev.filter((m) => m.id !== id));
    toast.success('Material deleted');
  };

  const handleView = (id: string) => {
    console.log('View material:', id);
    // TODO: Implement view/open material
  };

  return (
    <AppLayout>
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-6 md:py-8 pb-24 lg:pb-8">
        {/* Back link */}
        <Link
          href="/dashboard"
          className="inline-flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors mb-4"
        >
          <ArrowLeft size={16} />
          Back to Dashboard
        </Link>

        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
          <div>
            <h1 className="text-2xl lg:text-3xl font-bold text-foreground">My Knowledge Base</h1>
            <p className="text-gray-400 text-sm mt-1">Manage your uploaded learning materials</p>
          </div>
          <button
            onClick={() => setIsUploadModalOpen(true)}
            className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground font-medium rounded-lg hover:bg-primary/90 transition-colors w-full sm:w-auto justify-center sm:justify-start"
          >
            <Plus className="w-5 h-5" />
            Upload Material
          </button>
        </div>

        {/* Search Bar */}
        <div className="relative mb-6">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search materials..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-card border border-border rounded-lg text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>

        {/* Topic Filters */}
        <div className="flex gap-2 mb-8 overflow-x-auto pb-2">
          {allTopics.map((topic) => (
            <button
              key={topic}
              onClick={() => setSelectedTopic(topic)}
              className={`px-4 py-2 rounded-full font-medium whitespace-nowrap transition-all ${
                selectedTopic === topic
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-card border border-border text-foreground hover:border-primary/50'
              }`}
            >
              {topic}
            </button>
          ))}
        </div>

        {/* Materials Grid or Empty State */}
        {filteredMaterials.length === 0 && materials.length === 0 ? (
          <EmptyState onUploadClick={() => setIsUploadModalOpen(true)} />
        ) : filteredMaterials.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground">
              No materials found for &quot;{searchQuery}&quot; in {selectedTopic}
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedTopic('All');
              }}
              className="mt-4 text-primary hover:underline text-sm font-medium"
            >
              Clear filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredMaterials.map((material) => (
              <MaterialCard
                key={material.id}
                {...material}
                onRename={handleRename}
                onDelete={handleDelete}
                onView={handleView}
              />
            ))}
          </div>
        )}
      </div>

      {/* Upload Modal */}
      <UploadModal
        isOpen={isUploadModalOpen}
        onClose={() => setIsUploadModalOpen(false)}
        onUpload={handleUpload}
      />
    </AppLayout>
  );
}
