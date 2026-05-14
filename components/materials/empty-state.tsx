import { Upload } from 'lucide-react';

interface EmptyStateProps {
  onUploadClick: () => void;
}

export default function EmptyState({ onUploadClick }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-4">
      <div className="mb-6 p-4 bg-primary/10 rounded-full">
        <Upload className="w-8 h-8 text-primary" />
      </div>
      <h3 className="text-xl font-semibold text-foreground mb-2">
        No materials yet
      </h3>
      <p className="text-muted-foreground text-center mb-6 max-w-sm">
        Upload your first material to get started with your personalized learning journey
      </p>
      <button
        onClick={onUploadClick}
        className="px-6 py-2 bg-primary text-primary-foreground font-medium rounded-lg hover:bg-primary/90 transition-colors"
      >
        Upload Material
      </button>
    </div>
  );
}
