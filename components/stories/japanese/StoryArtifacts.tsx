import type { StoryArtifact } from "@/lib/types/story";

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
  if (!artifacts || artifacts.length === 0) return null;

  return (
    <div className="mt-12">
      <h3 className="text-lg text-[#1a1a1a] mb-4">Evidence & Documents</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {artifacts.map((artifact) => (
          <div key={artifact.id} className="bg-[#faf8f5] border border-[#d4d0c8] overflow-hidden">
            {/* Placeholder Image Area */}
            <div className="h-40 bg-[#f5f2ed] flex items-center justify-center border-b border-[#d4d0c8]">
              <div className="text-center px-4">
                <ArtifactIcon type={artifact.type} />
                <p className="text-sm text-[#6b6b6b] mt-2">{artifact.alt}</p>
              </div>
            </div>

            {/* Artifact Info */}
            <div className="p-4">
              <p className="text-[#1a1a1a] text-sm">{artifact.title}</p>
              <p className="mt-1 text-xs text-[#6b6b6b]">{artifact.caption}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
