'use client';

import { useState } from 'react';
import { ChevronDown, FileText, File } from 'lucide-react';

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

  return (
    <div className="hidden lg:flex flex-col w-64 bg-background border-r border-border">
      {/* Header */}
      <div className="p-4 border-b border-border">
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="flex items-center justify-between w-full text-sm font-semibold text-foreground hover:text-primary transition-colors"
        >
          <span>Sources ({materials.length})</span>
          <ChevronDown
            className={`w-4 h-4 transition-transform ${
              isExpanded ? 'rotate-0' : '-rotate-90'
            }`}
          />
        </button>
      </div>

      {/* Select All */}
      {isExpanded && materials.length > 0 && (
        <div className="px-4 py-3 border-b border-border">
          <label className="flex items-center gap-3 cursor-pointer group">
            <input
              type="checkbox"
              checked={selectedMaterials.length === materials.length}
              onChange={handleSelectAll}
              className="w-4 h-4 rounded bg-input border border-border cursor-pointer accent-primary"
            />
            <span className="text-xs font-medium text-muted-foreground group-hover:text-foreground transition-colors">
              Select All
            </span>
          </label>
        </div>
      )}

      {/* Materials List */}
      {isExpanded && (
        <div className="flex-1 overflow-y-auto">
          {materials.length === 0 ? (
            <div className="p-4">
              <p className="text-xs text-muted-foreground text-center">
                No materials uploaded yet
              </p>
            </div>
          ) : (
            <div className="space-y-2 p-4">
              {materials.map((material) => (
                <label
                  key={material.id}
                  className="flex items-start gap-3 p-3 rounded-lg border border-border bg-card/30 hover:bg-card/60 hover:border-primary/50 cursor-pointer transition-colors group"
                >
                  <input
                    type="checkbox"
                    checked={selectedMaterials.includes(material.id)}
                    onChange={() => handleToggleMaterial(material.id)}
                    className="w-4 h-4 rounded bg-input border border-border cursor-pointer accent-primary mt-0.5 flex-shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      {getFileIcon(material.type)}
                      <p className="text-sm font-medium text-foreground truncate">
                        {material.name}
                      </p>
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">
                      {material.pages} pages
                    </p>
                  </div>
                </label>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
