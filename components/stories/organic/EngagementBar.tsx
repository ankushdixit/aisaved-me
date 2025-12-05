import Link from "next/link";

interface EngagementBarProps {
  likes: number;
  comments: number;
  storySlug: string;
}

export function EngagementBar({ likes, comments, storySlug }: EngagementBarProps) {
  return (
    <div className="mt-8 flex flex-wrap items-center gap-4 p-4 bg-white rounded-xl shadow-soft">
      {/* Like */}
      <button
        type="button"
        className="flex items-center gap-2 px-3 py-2 text-[#5a5d7a] hover:text-[#e07a5f] transition-colors"
        aria-label="Like this story"
      >
        <span className="text-lg">&#9829;</span>
        <span className="text-sm">{likes} likes</span>
      </button>

      {/* Comment */}
      <button
        type="button"
        className="flex items-center gap-2 px-3 py-2 text-[#5a5d7a] hover:text-[#e07a5f] transition-colors"
        aria-label="View comments"
      >
        <span className="text-lg">&#128172;</span>
        <span className="text-sm">{comments} comments</span>
      </button>

      {/* Bookmark */}
      <button
        type="button"
        className="flex items-center gap-2 px-3 py-2 text-[#5a5d7a] hover:text-[#e07a5f] transition-colors"
        aria-label="Bookmark this story"
      >
        <span className="text-lg">&#128278;</span>
        <span className="text-sm">Bookmark</span>
      </button>

      {/* Share */}
      <button
        type="button"
        className="flex items-center gap-2 px-3 py-2 text-[#5a5d7a] hover:text-[#e07a5f] transition-colors"
        aria-label="Share this story"
      >
        <span className="text-lg">&#8599;</span>
        <span className="text-sm">Share</span>
      </button>

      {/* Make It Your Own CTA */}
      <Link
        href={`/make-it-your-own?story=${storySlug}`}
        className="ml-auto px-6 py-3 bg-[#e07a5f] text-white font-semibold rounded-full hover:bg-[#c66b52] transition-colors shadow-soft"
      >
        Make It Your Own &rarr;
      </Link>
    </div>
  );
}
