'use client';

import { useState } from 'react';
import { MoreVertical, Trash2, Edit2, Eye } from 'lucide-react';
import { getFileIcon, getFileType, FileType } from '@/lib/file-icons';

interface MaterialCardProps {
  id: string;
  title: string;
  filename: string;
  topic: string;
  uploadDate: string;
  pageCount: number;
  onRename?: (id: string, newName: string) => void;
  onDelete?: (id: string) => void;
  onView?: (id: string) => void;
}

export default function MaterialCard({
  id,
  title,
  filename,
  topic,
  uploadDate,
  pageCount,
  onRename,
  onDelete,
  onView,
}: MaterialCardProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isRenaming, setIsRenaming] = useState(false);
  const [newTitle, setNewTitle] = useState(title);

  const fileType = getFileType(filename) as FileType;
  const fileIcon = getFileIcon(fileType);

  const handleRename = () => {
    if (onRename && newTitle.trim()) {
      onRename(id, newTitle);
      setIsRenaming(false);
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  return (
    <div className="group relative bg-card border border-border rounded-xl p-4 hover:border-primary/50 hover:bg-card/50 transition-all duration-300 shadow-sm hover:shadow-lg hover:shadow-primary/20">
      {/* File Icon and Title */}
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-start gap-3 flex-1">
          <div className="flex-shrink-0 p-2 bg-background rounded-lg">
            {fileIcon}
          </div>
          <div className="flex-1 min-w-0">
            {isRenaming ? (
              <input
                type="text"
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
                onBlur={handleRename}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') handleRename();
                  if (e.key === 'Escape') setIsRenaming(false);
                }}
                autoFocus
                className="w-full px-2 py-1 bg-input border border-border rounded-lg text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary"
              />
            ) : (
              <h3 className="font-semibold text-foreground truncate hover:text-primary cursor-pointer">
                {title}
              </h3>
            )}
            <p className="text-xs text-muted-foreground">{filename}</p>
          </div>
        </div>

        {/* Menu Button */}
        <div className="relative">
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="p-2 hover:bg-background rounded-lg transition-colors opacity-0 group-hover:opacity-100"
            aria-label="More options"
          >
            <MoreVertical className="w-4 h-4 text-muted-foreground" />
          </button>

          {/* Dropdown Menu */}
          {isMenuOpen && (
            <div className="absolute right-0 top-10 z-20 bg-card border border-border rounded-lg shadow-xl overflow-hidden min-w-[160px]">
              <button
                onClick={() => {
                  setIsRenaming(true);
                  setIsMenuOpen(false);
                }}
                className="w-full px-4 py-2 flex items-center gap-2 text-sm text-foreground hover:bg-background transition-colors"
              >
                <Edit2 className="w-4 h-4" />
                Rename
              </button>
              <button
                onClick={() => {
                  onView?.(id);
                  setIsMenuOpen(false);
                }}
                className="w-full px-4 py-2 flex items-center gap-2 text-sm text-foreground hover:bg-background transition-colors"
              >
                <Eye className="w-4 h-4" />
                View
              </button>
              <button
                onClick={() => {
                  onDelete?.(id);
                  setIsMenuOpen(false);
                }}
                className="w-full px-4 py-2 flex items-center gap-2 text-sm text-red-500 hover:bg-background transition-colors"
              >
                <Trash2 className="w-4 h-4" />
                Delete
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Topic Tag */}
      <div className="mb-3">
        <span className="inline-block px-2.5 py-1 bg-primary/10 text-primary text-xs font-medium rounded-full">
          {topic}
        </span>
      </div>

      {/* Metadata */}
      <div className="flex items-center justify-between pt-3 border-t border-border/50 text-xs text-muted-foreground">
        <span>{formatDate(uploadDate)}</span>
        <span>{pageCount} pages</span>
      </div>
    </div>
  );
}
