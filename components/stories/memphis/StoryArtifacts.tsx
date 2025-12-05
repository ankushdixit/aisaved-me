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
      <h3 className="text-xl font-display font-bold text-black mb-4">Evidence & Documents</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {artifacts.map((artifact) => (
          <div
            key={artifact.id}
            className="bg-gray-100 border-3 border-black shadow-memphis-sm overflow-hidden"
          >
            {/* Placeholder Image Area */}
            <div className="h-40 bg-gray-200 flex items-center justify-center border-b-3 border-black">
              <div className="text-center px-4">
                <ArtifactIcon type={artifact.type} />
                <p className="text-sm font-body text-gray-600 mt-2">{artifact.alt}</p>
              </div>
            </div>

            {/* Artifact Info */}
            <div className="p-4">
              <p className="font-display font-bold text-black text-sm">{artifact.title}</p>
              <p className="mt-1 text-xs font-body text-gray-600">{artifact.caption}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
