'use client';

import { useState } from 'react';
import { ChevronDown, FileText, File, AlertCircle, BookOpen } from 'lucide-react';
import { Sheet, SheetContent, SheetTrigger, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';

interface Material {
  id: string;
  name: string;
  type: 'pdf' | 'docx' | 'text';
  pages: number;
  uploadedAt: string;
}

interface MaterialsPanelProps {
  materials: Material[];
  selectedMaterials: string[];
  onSelectionChange: (selectedIds: string[]) => void;
}

export function MaterialsPanel({
  materials,
  selectedMaterials,
  onSelectionChange,
}: MaterialsPanelProps) {
  const [isExpanded, setIsExpanded] = useState(true);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const handleToggleMaterial = (id: string) => {
    if (selectedMaterials.includes(id)) {
      onSelectionChange(selectedMaterials.filter((mid) => mid !== id));
    } else {
      onSelectionChange([...selectedMaterials, id]);
    }
  };

  const handleSelectAll = () => {
    if (selectedMaterials.length === materials.length) {
      onSelectionChange([]);
    } else {
      onSelectionChange(materials.map((m) => m.id));
    }
  };

  const getFileIcon = (type: string) => {
    switch (type) {
      case 'pdf':
        return <File className="w-4 h-4 text-red-400" />;
      case 'docx':
        return <FileText className="w-4 h-4 text-blue-400" />;
      case 'text':
        return <FileText className="w-4 h-4 text-gray-400" />;
      default:
        return <FileText className="w-4 h-4 text-gray-400" />;
    }
  };

  const MaterialsList = () => (
    <>
      {/* Select All */}
      {materials.length > 0 && (
        <div className="px-4 py-3 border-b border-[#1F2937]">
          <label className="flex items-center gap-3 cursor-pointer group">
            <input
              type="checkbox"
              checked={selectedMaterials.length === materials.length}
              onChange={handleSelectAll}
              className="w-4 h-4 rounded bg-[#1F2937] border border-gray-600 cursor-pointer accent-purple-500"
            />
            <span className="text-xs font-medium text-gray-400 group-hover:text-white transition-colors">
              Select All ({materials.length})
            </span>
          </label>
        </div>
      )}

      {/* Warning if none selected */}
      {selectedMaterials.length === 0 && materials.length > 0 && (
        <div className="px-4 py-3 bg-amber-500/10 border-b border-amber-500/30 flex items-center gap-2">
          <AlertCircle className="w-4 h-4 text-amber-400" />
          <span className="text-xs text-amber-300">Select materials to chat with</span>
        </div>
      )}

      {/* Materials List */}
      <div className="flex-1 overflow-y-auto">
        {materials.length === 0 ? (
          <div className="p-6 text-center">
            <BookOpen className="w-10 h-10 text-gray-600 mx-auto mb-3" />
            <p className="text-sm text-gray-400">No materials uploaded yet</p>
            <p className="text-xs text-gray-500 mt-1">Upload materials to start chatting</p>
          </div>
        ) : (
          <div className="space-y-2 p-4">
            {materials.map((material) => (
              <label
                key={material.id}
                className={`flex items-start gap-3 p-3 rounded-xl border cursor-pointer transition-all ${
                  selectedMaterials.includes(material.id)
                    ? 'bg-purple-500/10 border-purple-500/30'
                    : 'bg-[#1F2937]/50 border-[#374151] hover:border-purple-500/30 hover:bg-[#1F2937]'
                }`}
              >
                <input
                  type="checkbox"
                  checked={selectedMaterials.includes(material.id)}
                  onChange={() => handleToggleMaterial(material.id)}
                  className="w-4 h-4 rounded bg-[#1F2937] border border-gray-600 cursor-pointer accent-purple-500 mt-0.5 flex-shrink-0"
                />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    {getFileIcon(material.type)}
                    <p className="text-sm font-medium text-white truncate">
                      {material.name}
                    </p>
                  </div>
                  <p className="text-xs text-gray-400 mt-1">
                    {material.pages} pages
                  </p>
                </div>
              </label>
            ))}
          </div>
        )}
      </div>
    </>
  );

  return (
    <>
      {/* Desktop Panel */}
      <div className="hidden lg:flex flex-col w-72 bg-[#111827] border-r border-[#1F2937]">
        {/* Header */}
        <div className="p-4 border-b border-[#1F2937]">
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="flex items-center justify-between w-full text-sm font-semibold text-white hover:text-purple-400 transition-colors"
          >
            <span>Knowledge Base ({materials.length})</span>
            <ChevronDown
              className={`w-4 h-4 transition-transform ${
                isExpanded ? 'rotate-0' : '-rotate-90'
              }`}
            />
          </button>
        </div>

        {isExpanded && <MaterialsList />}
      </div>

      {/* Mobile Bottom Sheet Trigger */}
      <div className="lg:hidden fixed bottom-20 right-4 z-30">
        <Sheet open={isMobileOpen} onOpenChange={setIsMobileOpen}>
          <SheetTrigger asChild>
            <Button
              size="icon"
              className="w-12 h-12 rounded-full bg-purple-600 hover:bg-purple-700 shadow-lg shadow-purple-500/30"
            >
              <BookOpen className="w-5 h-5" />
              {selectedMaterials.length > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-cyan-500 text-white text-xs font-bold rounded-full flex items-center justify-center">
                  {selectedMaterials.length}
                </span>
              )}
            </Button>
          </SheetTrigger>
          <SheetContent side="bottom" className="bg-[#111827] border-[#1F2937] h-[70vh] rounded-t-2xl">
            <SheetHeader className="border-b border-[#1F2937] pb-4">
              <SheetTitle className="text-white">Select Materials</SheetTitle>
            </SheetHeader>
            <div className="flex flex-col h-[calc(100%-4rem)]">
              <MaterialsList />
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </>
  );
}
