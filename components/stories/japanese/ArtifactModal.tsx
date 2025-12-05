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

function ModalHeader({ artifact, onClose }: { artifact: StoryArtifact; onClose: () => void }) {
  const isDocument = artifact.type === "document";
  return (
    <>
      <div className="flex items-center justify-between p-5 border-b border-[#d4d0c8] bg-white">
        <div className="flex items-center gap-3 min-w-0 flex-1">
          <div className="text-[#8b7355]">
            <ArtifactIcon type={artifact.type} />
          </div>
          <div className="min-w-0 flex-1">
            <h3 id="artifact-modal-title" className="text-[#1a1a1a] text-lg truncate">
              {artifact.title}
            </h3>
            {isDocument && artifact.pageCount && artifact.fileSize && (
              <p className="text-sm text-[#6b6b6b]">
                {artifact.pageCount} pages &bull; {artifact.fileSize}
              </p>
            )}
          </div>
        </div>
        <button
          onClick={onClose}
          className="flex-shrink-0 w-9 h-9 text-[#6b6b6b] hover:text-[#1a1a1a] hover:bg-[#f5f2ed] transition-colors rounded-full flex items-center justify-center ml-4"
          aria-label="Close modal"
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
          >
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>
      </div>
      <div className="h-[2px] bg-gradient-to-r from-transparent via-[#c4a77d] to-transparent" />
    </>
  );
}

function ImageContent({ artifact }: { artifact: StoryArtifact }) {
  return (
    <div className="relative w-full h-full min-h-[280px] bg-white border border-[#d4d0c8] flex items-center justify-center">
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
                  <span class="text-5xl mb-4 opacity-50">\u{1F4F7}</span>
                  <p class="text-[#6b6b6b]">${artifact.alt}</p>
                  <p class="text-sm text-[#9b9b9b] mt-2">Image preview unavailable</p>
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
    <div className="w-full h-full min-h-[400px] bg-white border border-[#d4d0c8] flex flex-col items-center justify-center p-8">
      <span className="text-6xl mb-6 opacity-60">📄</span>
      <p className="text-[#1a1a1a] text-lg mb-2">{artifact.title}</p>
      {artifact.pageCount && artifact.fileSize && (
        <p className="text-[#6b6b6b] text-sm mb-6">
          {artifact.pageCount} pages &bull; {artifact.fileSize}
        </p>
      )}
      <p className="text-sm text-[#9b9b9b] text-center max-w-md">
        PDF preview not available in demo mode. Click &quot;Open in New Tab&quot; or
        &quot;Download&quot; to view the full document.
      </p>
    </div>
  );
}

function ModalFooter({ artifact }: { artifact: StoryArtifact }) {
  const isDocument = artifact.type === "document";
  return (
    <div className="flex items-center justify-between p-5 border-t border-[#d4d0c8] bg-white">
      <p className="text-sm text-[#6b6b6b] truncate pr-4">{artifact.caption}</p>
      <div className="flex gap-3 flex-shrink-0">
        <a
          href={artifact.url}
          download
          className="px-4 py-2 text-sm text-[#1a1a1a] border border-[#d4d0c8] hover:bg-[#f5f2ed] transition-colors"
        >
          Download
        </a>
        {isDocument && (
          <a
            href={artifact.url}
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2 text-sm bg-[#1a1a1a] text-white hover:bg-[#333] transition-colors"
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
      style={{ backgroundColor: "rgba(26, 26, 26, 0.9)" }}
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="artifact-modal-title"
    >
      <div
        className="relative max-w-4xl w-full max-h-[90vh] flex flex-col bg-[#faf8f5] border border-[#d4d0c8] shadow-lg"
        onClick={(e) => e.stopPropagation()}
      >
        <ModalHeader artifact={artifact} onClose={onClose} />
        <div className="flex-1 p-5 bg-[#f5f2ed] overflow-auto min-h-[300px]">
          {isImage && <ImageContent artifact={artifact} />}
          {isDocument && <DocumentContent artifact={artifact} />}
        </div>
        <ModalFooter artifact={artifact} />
      </div>
    </div>
  );
}
