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
  return <span className="text-2xl">{icons[type] || "\u{1F4C1}"}</span>;
}

function getHeaderColor(type: StoryArtifact["type"]): string {
  const colors: Record<StoryArtifact["type"], string> = {
    image: "#FFD700",
    screenshot: "#00FF7F",
    document: "#FF6B6B",
  };
  return colors[type] || "#FFD700";
}

function ModalHeader({ artifact, onClose }: { artifact: StoryArtifact; onClose: () => void }) {
  const isDocument = artifact.type === "document";
  return (
    <div
      className="flex items-center justify-between p-4 border-b-3 border-black flex-shrink-0"
      style={{ backgroundColor: getHeaderColor(artifact.type) }}
    >
      <div className="flex items-center gap-3 min-w-0 flex-1">
        <ArtifactIcon type={artifact.type} />
        <div className="min-w-0 flex-1">
          <h3 id="artifact-modal-title" className="font-display font-bold text-lg truncate">
            {artifact.title}
          </h3>
          {isDocument && artifact.pageCount && artifact.fileSize && (
            <p className="text-sm font-body">
              {artifact.pageCount} pages &bull; {artifact.fileSize}
            </p>
          )}
          {!isDocument && <p className="text-sm font-body truncate">{artifact.caption}</p>}
        </div>
      </div>
      <button
        onClick={onClose}
        className="flex-shrink-0 w-10 h-10 bg-white border-3 border-black font-bold text-xl hover:bg-red-500 hover:text-white transition-colors ml-4"
        style={{ boxShadow: "3px 3px 0px #000000" }}
        aria-label="Close modal"
      >
        ✕
      </button>
    </div>
  );
}

function ImageContent({ artifact }: { artifact: StoryArtifact }) {
  return (
    <div className="relative w-full h-full min-h-[280px] bg-white border-2 border-black flex items-center justify-center">
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
                  <span class="text-6xl mb-4">\u{1F4F7}</span>
                  <p class="text-gray-600 font-medium">${artifact.alt}</p>
                  <p class="text-sm text-gray-500 mt-2">Image preview unavailable</p>
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
    <div className="w-full h-full min-h-[400px] bg-white border-2 border-black flex flex-col items-center justify-center p-8">
      <span className="text-7xl mb-6">📄</span>
      <p className="font-display font-bold text-xl text-black mb-2">{artifact.title}</p>
      {artifact.pageCount && artifact.fileSize && (
        <p className="text-gray-600 font-body mb-6">
          {artifact.pageCount} pages &bull; {artifact.fileSize}
        </p>
      )}
      <p className="text-sm text-gray-500 font-body text-center max-w-md">
        PDF preview not available in demo mode. Click &quot;Open in New Tab&quot; or
        &quot;Download&quot; to view the full document.
      </p>
    </div>
  );
}

function ModalFooter({ artifact }: { artifact: StoryArtifact }) {
  const isDocument = artifact.type === "document";
  return (
    <div className="flex items-center justify-between p-4 border-t-3 border-black bg-white flex-shrink-0">
      <p className="text-sm font-body text-gray-600 truncate pr-4">{artifact.caption}</p>
      <div className="flex gap-3 flex-shrink-0">
        <a
          href={artifact.url}
          download
          className="px-4 py-2 bg-white font-display font-bold text-sm border-3 border-black hover:bg-gray-100 transition-colors"
          style={{ boxShadow: "3px 3px 0px #000000" }}
        >
          Download
        </a>
        {isDocument && (
          <a
            href={artifact.url}
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2 bg-black text-white font-display font-bold text-sm border-3 border-black hover:bg-gray-800 transition-colors"
            style={{ boxShadow: "3px 3px 0px #FFD700" }}
          >
            Open in New Tab ↗
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
      style={{ backgroundColor: "rgba(0, 0, 0, 0.85)" }}
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="artifact-modal-title"
    >
      <div
        className="relative max-w-4xl w-full max-h-[90vh] flex flex-col bg-white border-4 border-black"
        style={{ boxShadow: "12px 12px 0px #000000" }}
        onClick={(e) => e.stopPropagation()}
      >
        <ModalHeader artifact={artifact} onClose={onClose} />
        <div className="flex-1 p-4 bg-gray-100 overflow-auto min-h-[300px]">
          {isImage && <ImageContent artifact={artifact} />}
          {isDocument && <DocumentContent artifact={artifact} />}
        </div>
        <ModalFooter artifact={artifact} />
      </div>
    </div>
  );
}
