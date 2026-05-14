'use client';

import { FileText, ArrowRight } from 'lucide-react';
import Link from 'next/link';

interface Material {
  id: string;
  title: string;
  topic: string;
  uploadedAt: string;
  pages?: number;
}

interface RecentMaterialsProps {
  materials: Material[];
}

export default function RecentMaterials({ materials }: RecentMaterialsProps) {
  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-white font-bold text-lg">Recent Materials</h2>
        <Link
          href="/dashboard/materials"
          className="text-purple-400 text-sm font-medium hover:text-purple-300 transition-colors flex items-center gap-1"
        >
          View all <ArrowRight size={16} />
        </Link>
      </div>

      {materials.length === 0 ? (
        <div className="bg-[#111827] border border-[#1F2937] rounded-xl p-8 text-center">
          <FileText size={40} className="mx-auto text-gray-500 mb-3" />
          <p className="text-gray-400">No materials yet</p>
          <Link
            href="/dashboard/materials/upload"
            className="text-purple-400 text-sm font-medium hover:text-purple-300 transition-colors mt-2"
          >
            Upload your first material
          </Link>
        </div>
      ) : (
        <div className="overflow-x-auto pb-4">
          <div className="flex gap-4 min-w-max">
            {materials.map((material) => (
              <div
                key={material.id}
                className="flex-shrink-0 bg-[#111827] border border-[#1F2937] rounded-xl p-4 w-64 hover:border-purple-500/50 hover:shadow-lg hover:shadow-purple-500/10 transition-all duration-300 group"
              >
                <div className="flex items-start gap-3 mb-3">
                  <div className="p-2 bg-purple-500/20 rounded-lg group-hover:bg-purple-500/30 transition-colors">
                    <FileText size={20} className="text-purple-400" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-white font-semibold text-sm line-clamp-2">
                      {material.title}
                    </h3>
                    {material.pages && (
                      <p className="text-xs text-gray-400 mt-1">{material.pages} pages</p>
                    )}
                  </div>
                </div>

                <div className="flex flex-wrap gap-2 mb-3">
                  <span className="inline-block bg-purple-500/20 text-purple-300 text-xs font-medium px-2 py-1 rounded">
                    {material.topic}
                  </span>
                </div>

                <div className="flex items-center justify-between pt-3 border-t border-[#1F2937]">
                  <span className="text-xs text-gray-400">{material.uploadedAt}</span>
                  <button className="p-1 hover:bg-purple-500/20 rounded transition-colors">
                    <ArrowRight size={16} className="text-purple-400" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
