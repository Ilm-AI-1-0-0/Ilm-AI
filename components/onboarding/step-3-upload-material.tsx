'use client';

import { useState, useRef, useCallback } from 'react';
import { ArrowRight, Upload, FileText, X, AlertCircle } from 'lucide-react';
import { toast } from 'sonner';

// File validation constants
const ALLOWED_TYPES = [
  'application/pdf',
  'text/plain',
  'application/msword',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
];
const ALLOWED_EXTENSIONS = ['.pdf', '.txt', '.doc', '.docx'];
const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB

interface Step3Props {
  value: string;
  onNext: (data: { uploadedContent: string }) => void;
  onSkip: () => void;
}

export default function Step3UploadMaterial({ value, onNext, onSkip }: Step3Props) {
  const [content, setContent] = useState(value);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [useTab, setUseTab] = useState<'upload' | 'paste'>('upload');
  const [fileError, setFileError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const dragRef = useRef<HTMLDivElement>(null);

  const validateFile = useCallback((file: File): string | null => {
    // Check file type
    const extension = '.' + file.name.split('.').pop()?.toLowerCase();
    if (!ALLOWED_TYPES.includes(file.type) && !ALLOWED_EXTENSIONS.includes(extension)) {
      return 'Only PDF, Word, or text files are allowed';
    }
    
    // Check file size
    if (file.size > MAX_FILE_SIZE) {
      return 'File must be under 10MB';
    }
    
    return null;
  }, []);

  const handleDragEnter = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.target === dragRef.current) {
      setIsDragging(false);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const processFile = async (file: File) => {
    setFileError(null);
    
    const error = validateFile(file);
    if (error) {
      setFileError(error);
      toast.error(error);
      return;
    }

    setIsLoading(true);
    try {
      // Read file content
      const text = await file.text();
      setContent(text);
      setUploadedFile(file);
      toast.success('File loaded successfully');
    } catch (error) {
      console.error('[v0] Error reading file:', error);
      setFileError('Failed to read file');
      toast.error('Failed to read file');
    } finally {
      setIsLoading(false);
      setIsDragging(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    const files = e.dataTransfer.files;
    if (files.length > 0) {
      processFile(files[0]);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      processFile(e.target.files[0]);
    }
  };

  const handleSubmit = () => {
    onNext({ uploadedContent: content });
  };

  const handleClear = () => {
    setContent('');
    setUploadedFile(null);
    setFileError(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const isValid = content.trim().length > 0;

  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return bytes + ' B';
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
    return (bytes / (1024 * 1024)).toFixed(2) + ' MB';
  };

  return (
    <div className="space-y-8 sm:space-y-10">
      {/* Heading */}
      <div className="text-center">
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight mb-4">
          Upload your first material
        </h1>
        <p className="text-base sm:text-lg text-muted-foreground max-w-lg mx-auto">
          Share any PDF, document, or text. We&apos;ll analyze it and create your personalized learning plan.
        </p>
      </div>

      {/* Tab Switcher */}
      <div className="max-w-xl mx-auto w-full">
        <div className="flex gap-2 bg-card rounded-lg p-1">
          <button
            onClick={() => {
              setUseTab('upload');
              handleClear();
            }}
            className={`flex-1 px-4 py-2 rounded-md font-medium transition-all duration-200 ${
              useTab === 'upload'
                ? 'bg-primary text-primary-foreground'
                : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            Upload File
          </button>
          <button
            onClick={() => {
              setUseTab('paste');
              handleClear();
            }}
            className={`flex-1 px-4 py-2 rounded-md font-medium transition-all duration-200 ${
              useTab === 'paste'
                ? 'bg-primary text-primary-foreground'
                : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            Paste Text
          </button>
        </div>
      </div>

      {/* Upload Tab Content */}
      {useTab === 'upload' && (
        <div className="max-w-xl mx-auto w-full">
          {!uploadedFile ? (
            <>
              <div
                ref={dragRef}
                onDragEnter={handleDragEnter}
                onDragLeave={handleDragLeave}
                onDragOver={handleDragOver}
                onDrop={handleDrop}
                className={`border-2 border-dashed rounded-xl p-8 sm:p-10 text-center transition-all duration-200 cursor-pointer ${
                  isDragging
                    ? 'border-primary bg-primary/10'
                    : fileError
                    ? 'border-red-500/50 hover:border-red-500'
                    : 'border-border hover:border-primary/50 hover:bg-muted/30'
                }`}
                onClick={() => fileInputRef.current?.click()}
              >
                <Upload
                  className={`w-12 h-12 mx-auto mb-4 transition-colors duration-200 ${
                    isDragging ? 'text-primary' : 'text-muted-foreground'
                  }`}
                />
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  {isDragging ? 'Drop your file here' : 'Drag and drop your material'}
                </h3>
                <p className="text-sm text-muted-foreground mb-4">
                  PDF, Word documents, or plain text (max 10MB)
                </p>
                <button 
                  type="button"
                  className="px-4 py-2 rounded-lg bg-primary text-primary-foreground font-medium hover:shadow-lg hover:shadow-primary/30 transition-all duration-200"
                >
                  {isLoading ? 'Processing...' : 'Browse files'}
                </button>
                <input
                  ref={fileInputRef}
                  type="file"
                  onChange={handleFileSelect}
                  accept=".pdf,.txt,.doc,.docx,application/pdf,text/plain,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                  className="hidden"
                  disabled={isLoading}
                />
              </div>
              {fileError && (
                <p className="mt-3 text-sm text-red-400 flex items-center gap-2">
                  <AlertCircle className="w-4 h-4" />
                  {fileError}
                </p>
              )}
            </>
          ) : (
            <div className="space-y-4 animate-fade-in">
              <div className="p-4 sm:p-6 rounded-lg bg-primary/10 border border-primary/20 flex items-start gap-4">
                <FileText className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-muted-foreground mb-1">Uploaded file</p>
                  <p className="text-lg font-semibold text-foreground truncate">
                    {uploadedFile.name}
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    {formatFileSize(uploadedFile.size)}
                  </p>
                </div>
                <button
                  onClick={handleClear}
                  className="flex-shrink-0 p-2 hover:bg-primary/20 rounded-lg transition-colors duration-200"
                >
                  <X className="w-5 h-5 text-muted-foreground hover:text-foreground" />
                </button>
              </div>
              <p className="text-xs sm:text-sm text-muted-foreground">
                {content.length} characters loaded. Ready to analyze!
              </p>
            </div>
          )}
        </div>
      )}

      {/* Paste Text Tab Content */}
      {useTab === 'paste' && (
        <div className="max-w-xl mx-auto w-full">
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Paste your learning material here... Articles, notes, textbook excerpts, etc."
            className="w-full px-4 sm:px-5 py-4 sm:py-5 rounded-lg bg-card border-2 border-border text-base sm:text-lg text-foreground placeholder-muted-foreground focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-200 resize-none"
            rows={8}
          />
          {content.trim().length > 0 && (
            <p className="text-xs sm:text-sm text-muted-foreground mt-3">
              {content.length} characters | Ready to analyze
            </p>
          )}
        </div>
      )}

      {/* Buttons */}
      <div className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-4 pt-4">
        <button
          onClick={onSkip}
          className="px-6 sm:px-8 py-3 sm:py-4 rounded-lg font-semibold text-base sm:text-lg text-foreground bg-card border border-border hover:border-muted hover:bg-muted/20 transition-all duration-200"
        >
          Skip for now
        </button>
        <button
          onClick={handleSubmit}
          disabled={!isValid}
          className={`group px-8 sm:px-10 py-3 sm:py-4 rounded-lg font-semibold text-base sm:text-lg flex items-center justify-center gap-2 transition-all duration-200 ${
            isValid
              ? 'bg-primary text-primary-foreground shadow-lg shadow-primary/30 hover:shadow-lg hover:shadow-primary/40 hover:scale-105'
              : 'bg-muted text-muted-foreground cursor-not-allowed'
          }`}
        >
          Complete onboarding
          <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
        </button>
      </div>
    </div>
  );
}
