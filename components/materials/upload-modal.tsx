'use client';

import { useState, useRef } from 'react';
import { X, Upload, Sparkles } from 'lucide-react';
import { useConfetti } from '@/hooks/use-confetti';

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
  const [topic, setTopic] = useState('');
  const [file, setFile] = useState<File | null>(null);
  const [text, setText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isSuccess, setIsSuccess] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const dragOverRef = useRef(false);
  const { confetti, trigger } = useConfetti();

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    dragOverRef.current = true;
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    dragOverRef.current = false;
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    dragOverRef.current = false;

    const droppedFiles = e.dataTransfer.files;
    if (droppedFiles.length > 0) {
      const selectedFile = droppedFiles[0];
      const validTypes = [
        'application/pdf',
        'application/msword',
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
        'text/plain',
      ];

      if (validTypes.includes(selectedFile.type)) {
        setFile(selectedFile);
      } else {
        alert('Please drop a valid file (PDF, Word, or Text)');
      }
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0]);
    }
  };

  const handleSubmit = async () => {
    if (!topic.trim()) {
      alert('Please enter a topic');
      return;
    }

    if (activeTab === 'file' && !file) {
      alert('Please select a file');
      return;
    }

    if (activeTab === 'text' && !text.trim()) {
      alert('Please paste some text');
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
        topic,
      });

      clearInterval(progressInterval);
      setUploadProgress(100);

      // Trigger confetti
      trigger();
      setIsSuccess(true);

      // Reset after success
      setTimeout(() => {
        setIsSuccess(false);
        setFile(null);
        setText('');
        setTopic('');
        setUploadProgress(0);
        onClose();
      }, 2000);
    } catch (error) {
      alert('Upload failed. Please try again.');
      setIsLoading(false);
      setUploadProgress(0);
    }
  };

  const handleClose = () => {
    if (!isLoading && !isSuccess) {
      setFile(null);
      setText('');
      setTopic('');
      setUploadProgress(0);
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Confetti */}
      {confetti.map((conf) => (
        <div
          key={conf.id}
          className="fixed pointer-events-none"
          style={{
            left: `${conf.left}%`,
            top: '50%',
            animation: `fall ${conf.duration}s linear ${conf.delay}s forwards`,
          }}
        >
          <div
            className="text-2xl animate-spin"
            style={{
              animation: `spin ${conf.duration}s linear ${conf.delay}s forwards`,
            }}
          >
            ✨
          </div>
        </div>
      ))}

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

          <div className="p-6">
            {/* Success State */}
            {isSuccess && (
              <div className="text-center py-8">
                <div className="text-5xl mb-4 animate-bounce">✅</div>
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
                    value={topic}
                    onChange={(e) => setTopic(e.target.value)}
                    placeholder="e.g., Cloud Architecture, Tax Law"
                    disabled={isLoading}
                    className="w-full px-4 py-2 bg-background border border-border rounded-lg text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary disabled:opacity-50"
                  />
                </div>

                {/* Tabs */}
                <div className="flex gap-2 mb-6 border-b border-border">
                  <button
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
                      className={`border-2 border-dashed rounded-xl p-8 text-center transition-colors ${
                        dragOverRef.current
                          ? 'border-primary bg-primary/10'
                          : 'border-border hover:border-primary/50'
                      }`}
                    >
                      <Upload className="w-8 h-8 text-muted-foreground mx-auto mb-3" />
                      <p className="text-sm font-medium text-foreground mb-1">
                        Drag and drop your file
                      </p>
                      <p className="text-xs text-muted-foreground mb-4">
                        PDF, Word, or Text files
                      </p>
                      <button
                        onClick={() => fileInputRef.current?.click()}
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

                    {file && (
                      <div className="mt-4 p-3 bg-background rounded-lg flex items-center justify-between">
                        <div className="text-sm">
                          <p className="font-medium text-foreground">
                            {file.name}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {(file.size / 1024 / 1024).toFixed(2)} MB
                          </p>
                        </div>
                        <button
                          onClick={() => setFile(null)}
                          disabled={isLoading}
                          className="text-muted-foreground hover:text-destructive transition-colors disabled:opacity-50"
                        >
                          ✕
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
                      className="w-full h-48 px-4 py-3 bg-background border border-border rounded-lg text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary resize-none disabled:opacity-50"
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
                  onClick={handleSubmit}
                  disabled={isLoading || (!file && !text) || !topic}
                  className="w-full mt-6 px-4 py-3 bg-primary text-primary-foreground font-medium rounded-lg hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {isLoading ? (
                    <>
                      <div className="w-4 h-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                      Uploading
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
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fall {
          to {
            transform: translateY(100vh) translateX(100px);
            opacity: 0;
          }
        }
        @keyframes spin {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
      `}</style>
    </>
  );
}
