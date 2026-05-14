'use client';

import { useState, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { X, Upload, Sparkles, AlertCircle, FileText, CheckCircle, Loader2 } from 'lucide-react';
import confetti from 'canvas-confetti';
import { toast } from 'sonner';

// File validation constants
const ALLOWED_TYPES = [
  'application/pdf',
  'text/plain',
  'application/msword',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
];
const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB

const uploadSchema = z.object({
  topic: z
    .string()
    .min(2, 'Topic must be at least 2 characters')
    .max(50, 'Topic is too long (max 50 characters)'),
  description: z
    .string()
    .max(200, 'Description is too long (max 200 characters)')
    .optional(),
});

type UploadFormData = z.infer<typeof uploadSchema>;

interface UploadModalProps {
  isOpen: boolean;
  onClose: () => void;
  onUpload: (data: {
    file?: File;
    text?: string;
    topic: string;
  }) => Promise<void>;
}

type TabType = 'file' | 'text';

export default function UploadModal({
  isOpen,
  onClose,
  onUpload,
}: UploadModalProps) {
  const [activeTab, setActiveTab] = useState<TabType>('file');
  const [file, setFile] = useState<File | null>(null);
  const [text, setText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isSuccess, setIsSuccess] = useState(false);
  const [fileError, setFileError] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<UploadFormData>({
    resolver: zodResolver(uploadSchema),
  });

  const validateFile = (selectedFile: File): string | null => {
    // Check file type
    const extension = '.' + selectedFile.name.split('.').pop()?.toLowerCase();
    const isValidType = ALLOWED_TYPES.includes(selectedFile.type) || 
      ['.pdf', '.txt', '.doc', '.docx'].includes(extension);
    
    if (!isValidType) {
      return 'Only PDF, Word, or text files are allowed';
    }
    
    // Check file size
    if (selectedFile.size > MAX_FILE_SIZE) {
      return 'File must be under 10MB';
    }
    
    return null;
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    setFileError(null);

    const droppedFiles = e.dataTransfer.files;
    if (droppedFiles.length > 0) {
      const selectedFile = droppedFiles[0];
      const error = validateFile(selectedFile);
      
      if (error) {
        setFileError(error);
        toast.error(error);
      } else {
        setFile(selectedFile);
      }
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFileError(null);
    if (e.target.files && e.target.files.length > 0) {
      const selectedFile = e.target.files[0];
      const error = validateFile(selectedFile);
      
      if (error) {
        setFileError(error);
        toast.error(error);
        e.target.value = '';
      } else {
        setFile(selectedFile);
      }
    }
  };

  const triggerConfetti = () => {
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#7C3AED', '#06B6D4', '#10B981'],
    });
  };

  const onSubmit = async (data: UploadFormData) => {
    if (activeTab === 'file' && !file) {
      toast.error('Please select a file');
      return;
    }

    if (activeTab === 'text' && !text.trim()) {
      toast.error('Please paste some text');
      return;
    }

    setIsLoading(true);
    setUploadProgress(0);

    try {
      // Simulate upload progress
      const progressInterval = setInterval(() => {
        setUploadProgress((prev) => {
          if (prev >= 90) {
            clearInterval(progressInterval);
            return 90;
          }
          return prev + Math.random() * 30;
        });
      }, 300);

      await onUpload({
        file: activeTab === 'file' ? file || undefined : undefined,
        text: activeTab === 'text' ? text : undefined,
        topic: data.topic,
      });

      clearInterval(progressInterval);
      setUploadProgress(100);

      // Trigger confetti
      triggerConfetti();
      setIsSuccess(true);

      // Reset after success
      setTimeout(() => {
        handleReset();
        onClose();
      }, 2000);
    } catch (error) {
      toast.error('Upload failed. Please try again.');
      setIsLoading(false);
      setUploadProgress(0);
    }
  };

  const handleReset = () => {
    setIsSuccess(false);
    setFile(null);
    setText('');
    setUploadProgress(0);
    setFileError(null);
    setIsLoading(false);
    reset();
  };

  const handleClose = () => {
    if (!isLoading && !isSuccess) {
      handleReset();
      onClose();
    }
  };

  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return bytes + ' B';
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
    return (bytes / (1024 * 1024)).toFixed(2) + ' MB';
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Modal Backdrop */}
      <div
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 transition-opacity"
        onClick={handleClose}
      />

      {/* Modal */}
      <div className="fixed inset-0 flex items-center justify-center z-50 p-4">
        <div
          className="bg-card border border-border rounded-2xl w-full max-w-md max-h-[90vh] overflow-y-auto shadow-2xl"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-border sticky top-0 bg-card">
            <h2 className="text-lg font-semibold text-foreground">
              Upload Material
            </h2>
            <button
              onClick={handleClose}
              disabled={isLoading}
              className="p-2 hover:bg-background rounded-lg transition-colors disabled:opacity-50"
              aria-label="Close"
            >
              <X className="w-5 h-5 text-muted-foreground" />
            </button>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="p-6">
            {/* Success State */}
            {isSuccess && (
              <div className="text-center py-8">
                <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle className="w-8 h-8 text-green-400" />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  Upload Successful!
                </h3>
                <p className="text-sm text-muted-foreground">
                  Your material is being processed
                </p>
              </div>
            )}

            {!isSuccess && (
              <>
                {/* Topic Input */}
                <div className="mb-6">
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Topic <span className="text-destructive">*</span>
                  </label>
                  <input
                    type="text"
                    {...register('topic')}
                    placeholder="e.g., Cloud Architecture, Tax Law"
                    disabled={isLoading}
                    className={`w-full px-4 py-2 bg-background border rounded-lg text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 disabled:opacity-50 ${
                      errors.topic 
                        ? 'border-red-500 focus:ring-red-500/20' 
                        : 'border-border focus:ring-primary/20'
                    }`}
                  />
                  {errors.topic && (
                    <p className="mt-1 text-xs text-red-400 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" />
                      {errors.topic.message}
                    </p>
                  )}
                </div>

                {/* Description Input (Optional) */}
                <div className="mb-6">
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Description <span className="text-muted-foreground">(optional)</span>
                  </label>
                  <input
                    type="text"
                    {...register('description')}
                    placeholder="Brief description of the material"
                    disabled={isLoading}
                    className={`w-full px-4 py-2 bg-background border rounded-lg text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 disabled:opacity-50 ${
                      errors.description 
                        ? 'border-red-500 focus:ring-red-500/20' 
                        : 'border-border focus:ring-primary/20'
                    }`}
                  />
                  {errors.description && (
                    <p className="mt-1 text-xs text-red-400 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" />
                      {errors.description.message}
                    </p>
                  )}
                </div>

                {/* Tabs */}
                <div className="flex gap-2 mb-6 border-b border-border">
                  <button
                    type="button"
                    onClick={() => setActiveTab('file')}
                    disabled={isLoading}
                    className={`px-4 py-3 font-medium text-sm transition-colors border-b-2 ${
                      activeTab === 'file'
                        ? 'border-primary text-primary'
                        : 'border-transparent text-muted-foreground hover:text-foreground'
                    } disabled:opacity-50`}
                  >
                    Upload File
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveTab('text')}
                    disabled={isLoading}
                    className={`px-4 py-3 font-medium text-sm transition-colors border-b-2 ${
                      activeTab === 'text'
                        ? 'border-primary text-primary'
                        : 'border-transparent text-muted-foreground hover:text-foreground'
                    } disabled:opacity-50`}
                  >
                    Paste Text
                  </button>
                </div>

                {/* File Upload Tab */}
                {activeTab === 'file' && (
                  <div>
                    <div
                      onDragOver={handleDragOver}
                      onDragLeave={handleDragLeave}
                      onDrop={handleDrop}
                      onClick={() => !isLoading && fileInputRef.current?.click()}
                      className={`border-2 border-dashed rounded-xl p-8 text-center transition-colors cursor-pointer ${
                        isDragging
                          ? 'border-primary bg-primary/10'
                          : fileError
                          ? 'border-red-500/50 hover:border-red-500'
                          : 'border-border hover:border-primary/50'
                      }`}
                    >
                      <Upload className="w-8 h-8 text-muted-foreground mx-auto mb-3" />
                      <p className="text-sm font-medium text-foreground mb-1">
                        Drag and drop your file
                      </p>
                      <p className="text-xs text-muted-foreground mb-4">
                        PDF, Word, or Text files (max 10MB)
                      </p>
                      <button
                        type="button"
                        disabled={isLoading}
                        className="px-4 py-2 bg-primary text-primary-foreground text-sm font-medium rounded-lg hover:bg-primary/90 transition-colors disabled:opacity-50"
                      >
                        Browse Files
                      </button>
                      <input
                        ref={fileInputRef}
                        type="file"
                        onChange={handleFileSelect}
                        accept=".pdf,.docx,.doc,.txt"
                        className="hidden"
                        disabled={isLoading}
                      />
                    </div>

                    {fileError && (
                      <p className="mt-2 text-xs text-red-400 flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" />
                        {fileError}
                      </p>
                    )}

                    {file && !fileError && (
                      <div className="mt-4 p-3 bg-background rounded-lg flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <FileText className="w-5 h-5 text-primary" />
                          <div className="text-sm">
                            <p className="font-medium text-foreground truncate max-w-[200px]">
                              {file.name}
                            </p>
                            <p className="text-xs text-muted-foreground">
                              {formatFileSize(file.size)}
                            </p>
                          </div>
                        </div>
                        <button
                          type="button"
                          onClick={() => setFile(null)}
                          disabled={isLoading}
                          className="text-muted-foreground hover:text-destructive transition-colors disabled:opacity-50"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    )}
                  </div>
                )}

                {/* Text Paste Tab */}
                {activeTab === 'text' && (
                  <div>
                    <textarea
                      value={text}
                      onChange={(e) => setText(e.target.value)}
                      placeholder="Paste your text content here..."
                      disabled={isLoading}
                      className="w-full h-48 px-4 py-3 bg-background border border-border rounded-lg text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 resize-none disabled:opacity-50"
                    />
                    <p className="text-xs text-muted-foreground mt-2">
                      {text.length} characters
                    </p>
                  </div>
                )}

                {/* Progress Bar */}
                {isLoading && (
                  <div className="mt-6">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-foreground font-medium">
                        Uploading
                      </span>
                      <span className="text-sm text-muted-foreground">
                        {Math.round(uploadProgress)}%
                      </span>
                    </div>
                    <div className="h-2 bg-background rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-primary to-primary/50 transition-all duration-300"
                        style={{ width: `${uploadProgress}%` }}
                      />
                    </div>
                  </div>
                )}

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isLoading || (!file && !text)}
                  className="w-full mt-6 px-4 py-3 bg-primary text-primary-foreground font-medium rounded-lg hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Uploading...
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-4 h-4" />
                      Upload Material
                    </>
                  )}
                </button>
              </>
            )}
          </form>
        </div>
      </div>
    </>
  );
}
