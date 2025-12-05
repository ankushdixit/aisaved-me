"use client";

import { useState } from "react";
import type { StoryArtifact } from "@/lib/types/story";
import { ArtifactModal } from "./ArtifactModal";

interface StoryArtifactsProps {
  artifacts: StoryArtifact[];
}

function ArtifactIcon({ type }: { type: StoryArtifact["type"] }) {
  switch (type) {
    case "image":
      return <span className="text-lg">&#128247;</span>;
    case "document":
      return <span className="text-lg">&#128196;</span>;
    case "screenshot":
      return <span className="text-lg">&#128187;</span>;
    default:
      return <span className="text-lg">&#128193;</span>;
  }
}

export function StoryArtifacts({ artifacts }: StoryArtifactsProps) {
  const [selectedArtifact, setSelectedArtifact] = useState<StoryArtifact | null>(null);

  if (!artifacts || artifacts.length === 0) return null;

  return (
    <div className="mt-10">
      <h3 className="text-lg font-display font-semibold text-[#3d405b] mb-4">
        Evidence & Documents
      </h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-stretch">
        {artifacts.map((artifact) => (
          <button
            key={artifact.id}
            onClick={() => setSelectedArtifact(artifact)}
            className="text-left bg-white rounded-xl shadow-soft overflow-hidden hover:shadow-lg hover:-translate-y-1 transition-all cursor-pointer group flex flex-col h-full"
          >
            {/* Placeholder Image Area - fixed height */}
            <div className="h-40 flex-shrink-0 bg-[#fff0dc] flex items-center justify-center group-hover:bg-[#ffe4c4] transition-colors">
              <div className="text-center px-4">
                <ArtifactIcon type={artifact.type} />
                <p className="text-sm text-[#81b29a] mt-2">{artifact.alt}</p>
              </div>
            </div>

            {/* Artifact Info - fixed minimum height */}
            <div className="p-4 flex-1 flex flex-col min-h-[120px]">
              <p className="font-semibold text-[#3d405b] text-sm group-hover:text-[#81b29a] transition-colors line-clamp-2">
                {artifact.title}
              </p>
              <p className="mt-1 text-xs text-[#5a5d7a] line-clamp-2 flex-1">{artifact.caption}</p>
              <p className="mt-2 text-xs font-medium text-[#81b29a] opacity-0 group-hover:opacity-100 transition-opacity">
                Click to view →
              </p>
            </div>
          </button>
        ))}
      </div>

      {/* Artifact Modal */}
      {selectedArtifact && (
        <ArtifactModal
          artifact={selectedArtifact}
          isOpen={!!selectedArtifact}
          onClose={() => setSelectedArtifact(null)}
        />
      )}
    </div>
  );
}
