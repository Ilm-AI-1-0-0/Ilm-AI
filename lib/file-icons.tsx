import { FileText, FileJson, File } from 'lucide-react';

export type FileType = 'pdf' | 'docx' | 'doc' | 'txt' | 'unknown';

export function getFileType(filename: string): FileType {
  const ext = filename.split('.').pop()?.toLowerCase() || '';
  if (ext === 'pdf') return 'pdf';
  if (ext === 'docx') return 'docx';
  if (ext === 'doc') return 'doc';
  if (ext === 'txt') return 'txt';
  return 'unknown';
}

export function getFileIcon(type: FileType) {
  const iconProps = { className: 'w-6 h-6' };
  
  switch (type) {
    case 'pdf':
      return <FileText {...iconProps} className="w-6 h-6 text-red-500" />;
    case 'docx':
    case 'doc':
      return <File {...iconProps} className="w-6 h-6 text-blue-500" />;
    case 'txt':
      return <FileJson {...iconProps} className="w-6 h-6 text-gray-400" />;
    default:
      return <File {...iconProps} className="w-6 h-6 text-gray-400" />;
  }
}

export function getFileTypeLabel(type: FileType): string {
  switch (type) {
    case 'pdf':
      return 'PDF';
    case 'docx':
      return 'Word';
    case 'doc':
      return 'Word';
    case 'txt':
      return 'Text';
    default:
      return 'File';
  }
}
