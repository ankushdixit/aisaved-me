import Link from "next/link";

interface EngagementBarProps {
  likes: number;
  comments: number;
  storySlug: string;
}

export function EngagementBar({ likes, comments, storySlug }: EngagementBarProps) {
  return (
    <div className="mt-8 flex flex-wrap items-center gap-4 p-4 bg-[#f5f2ed] border border-[#d4d0c8]">
      {/* Like */}
      <button
        type="button"
        className="flex items-center gap-2 px-3 py-2 text-[#6b6b6b] hover:text-[#1a1a1a] transition-colors"
        aria-label="Like this story"
      >
        <span className="text-lg">&#9829;</span>
        <span className="text-sm">{likes} likes</span>
      </button>

      {/* Comment */}
      <button
        type="button"
        className="flex items-center gap-2 px-3 py-2 text-[#6b6b6b] hover:text-[#1a1a1a] transition-colors"
        aria-label="View comments"
      >
        <span className="text-lg">&#128172;</span>
        <span className="text-sm">{comments} comments</span>
      </button>

      {/* Bookmark */}
      <button
        type="button"
        className="flex items-center gap-2 px-3 py-2 text-[#6b6b6b] hover:text-[#1a1a1a] transition-colors"
        aria-label="Bookmark this story"
      >
        <span className="text-lg">&#128278;</span>
        <span className="text-sm">Bookmark</span>
      </button>

      {/* Share */}
      <button
        type="button"
        className="flex items-center gap-2 px-3 py-2 text-[#6b6b6b] hover:text-[#1a1a1a] transition-colors"
        aria-label="Share this story"
      >
        <span className="text-lg">&#8599;</span>
        <span className="text-sm">Share</span>
      </button>

      {/* Make It Your Own CTA */}
      <Link
        href={`/make-it-your-own?story=${storySlug}`}
        className="ml-auto px-5 py-2 bg-[#1a1a1a] text-[#faf8f5] hover:bg-[#c41e3a] transition-colors"
      >
        Make It Your Own &rarr;
      </Link>
    </div>
  );
}
