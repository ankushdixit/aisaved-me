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
    <div className="mt-10">
      <h3 className="text-lg font-display font-semibold text-[#3d405b] mb-4">
        Evidence & Documents
      </h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {artifacts.map((artifact) => (
          <div key={artifact.id} className="bg-white rounded-xl shadow-soft overflow-hidden">
            {/* Placeholder Image Area */}
            <div className="h-40 bg-[#fff0dc] flex items-center justify-center">
              <div className="text-center px-4">
                <ArtifactIcon type={artifact.type} />
                <p className="text-sm text-[#81b29a] mt-2">{artifact.alt}</p>
              </div>
            </div>

            {/* Artifact Info */}
            <div className="p-4">
              <p className="font-semibold text-[#3d405b] text-sm">{artifact.title}</p>
              <p className="mt-1 text-xs text-[#5a5d7a]">{artifact.caption}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
