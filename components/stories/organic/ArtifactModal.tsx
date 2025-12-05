"use client";

import { useEffect, useCallback } from "react";
import Image from "next/image";
import type { StoryArtifact } from "@/lib/types/story";

interface ArtifactModalProps {
  artifact: StoryArtifact;
  isOpen: boolean;
  onClose: () => void;
}

function ArtifactIcon({ type }: { type: StoryArtifact["type"] }) {
  const icons: Record<StoryArtifact["type"], string> = {
    image: "\u{1F4F7}",
    document: "\u{1F4C4}",
    screenshot: "\u{1F4BB}",
  };
  return <span className="text-xl">{icons[type] || "\u{1F4C1}"}</span>;
}

function getHeaderGradient(type: StoryArtifact["type"]): string {
  const gradients: Record<StoryArtifact["type"], string> = {
    image: "from-[#81b29a] to-[#6a9a82]",
    screenshot: "from-[#f2cc8f] to-[#e5b97a]",
    document: "from-[#e07a5f] to-[#c96a52]",
  };
  return gradients[type] || "from-[#81b29a] to-[#6a9a82]";
}

function ModalHeader({ artifact, onClose }: { artifact: StoryArtifact; onClose: () => void }) {
  const isDocument = artifact.type === "document";
  return (
    <div
      className={`flex items-center justify-between p-5 bg-gradient-to-r ${getHeaderGradient(artifact.type)}`}
    >
      <div className="flex items-center gap-3 min-w-0 flex-1 text-white">
        <div className="bg-white/20 rounded-full p-2">
          <ArtifactIcon type={artifact.type} />
        </div>
        <div className="min-w-0 flex-1">
          <h3 id="artifact-modal-title" className="font-display font-semibold text-lg truncate">
            {artifact.title}
          </h3>
          {isDocument && artifact.pageCount && artifact.fileSize && (
            <p className="text-sm text-white/80">
              {artifact.pageCount} pages &bull; {artifact.fileSize}
            </p>
          )}
        </div>
      </div>
      <button
        onClick={onClose}
        className="flex-shrink-0 w-10 h-10 bg-white/20 hover:bg-white/30 transition-colors rounded-full flex items-center justify-center ml-4 text-white"
        aria-label="Close modal"
      >
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
        >
          <line x1="18" y1="6" x2="6" y2="18" />
          <line x1="6" y1="6" x2="18" y2="18" />
        </svg>
      </button>
    </div>
  );
}

function ImageContent({ artifact }: { artifact: StoryArtifact }) {
  return (
    <div className="relative w-full h-full min-h-[280px] bg-white rounded-xl shadow-soft flex items-center justify-center overflow-hidden">
      <div className="relative w-full aspect-video">
        <Image
          src={artifact.url}
          alt={artifact.alt}
          fill
          className="object-contain"
          sizes="(max-width: 768px) 100vw, 800px"
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.style.display = "none";
            if (target.parentElement) {
              target.parentElement.innerHTML = `
                <div class="flex flex-col items-center justify-center h-full p-8 text-center">
                  <span class="text-5xl mb-4">\u{1F4F7}</span>
                  <p class="text-[#3d405b]">${artifact.alt}</p>
                  <p class="text-sm text-[#5a5d7a] mt-2">Image preview unavailable</p>
                </div>
              `;
            }
          }}
        />
      </div>
    </div>
  );
}

function DocumentContent({ artifact }: { artifact: StoryArtifact }) {
  return (
    <div className="w-full h-full min-h-[400px] bg-white rounded-xl shadow-soft flex flex-col items-center justify-center p-8">
      <span className="text-6xl mb-6">📄</span>
      <p className="font-display font-semibold text-[#3d405b] text-lg mb-2">{artifact.title}</p>
      {artifact.pageCount && artifact.fileSize && (
        <p className="text-[#5a5d7a] text-sm mb-6">
          {artifact.pageCount} pages &bull; {artifact.fileSize}
        </p>
      )}
      <p className="text-sm text-[#81b29a] text-center max-w-md">
        PDF preview not available in demo mode. Click &quot;Open in New Tab&quot; or
        &quot;Download&quot; to view the full document.
      </p>
    </div>
  );
}

function ModalFooter({ artifact }: { artifact: StoryArtifact }) {
  const isDocument = artifact.type === "document";
  return (
    <div className="flex items-center justify-between p-5 border-t border-[#e8e0d5] bg-white">
      <p className="text-sm text-[#5a5d7a] truncate pr-4">{artifact.caption}</p>
      <div className="flex gap-3 flex-shrink-0">
        <a
          href={artifact.url}
          download
          className="px-5 py-2.5 text-sm font-medium text-[#3d405b] border border-[#d4cfc7] rounded-full hover:bg-[#fdf8f3] transition-colors"
        >
          Download
        </a>
        {isDocument && (
          <a
            href={artifact.url}
            target="_blank"
            rel="noopener noreferrer"
            className="px-5 py-2.5 text-sm font-medium bg-[#81b29a] text-white rounded-full hover:bg-[#6a9a82] transition-colors"
          >
            Open in New Tab
          </a>
        )}
      </div>
    </div>
  );
}

export function ArtifactModal({ artifact, isOpen, onClose }: ArtifactModalProps) {
  const isImage = artifact.type === "image" || artifact.type === "screenshot";
  const isDocument = artifact.type === "document";

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    },
    [onClose]
  );

  useEffect(() => {
    if (isOpen) {
      document.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, handleKeyDown]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-8"
      style={{ backgroundColor: "rgba(61, 64, 91, 0.9)" }}
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="artifact-modal-title"
    >
      <div
        className="relative max-w-4xl w-full max-h-[90vh] flex flex-col bg-white rounded-2xl shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <ModalHeader artifact={artifact} onClose={onClose} />
        <div className="flex-1 p-5 bg-[#fdf8f3] overflow-auto min-h-[300px]">
          {isImage && <ImageContent artifact={artifact} />}
          {isDocument && <DocumentContent artifact={artifact} />}
        </div>
        <ModalFooter artifact={artifact} />
      </div>
    </div>
  );
}
