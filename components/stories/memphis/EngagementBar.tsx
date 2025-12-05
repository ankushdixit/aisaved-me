import Link from "next/link";

interface EngagementBarProps {
  likes: number;
  comments: number;
  storySlug: string;
}

export function EngagementBar({ likes, comments, storySlug }: EngagementBarProps) {
  return (
    <div className="mt-8 flex flex-wrap items-center gap-4 p-4 bg-white border-3 border-black shadow-memphis-md">
      {/* Like */}
      <button
        type="button"
        className="flex items-center gap-2 px-3 py-2 bg-gray-100 border-2 border-black hover:bg-gray-200 transition-colors"
        aria-label="Like this story"
      >
        <span className="text-lg">&#9829;</span>
        <span className="text-sm font-body">{likes} likes</span>
      </button>

      {/* Comment */}
      <button
        type="button"
        className="flex items-center gap-2 px-3 py-2 bg-gray-100 border-2 border-black hover:bg-gray-200 transition-colors"
        aria-label="View comments"
      >
        <span className="text-lg">&#128172;</span>
        <span className="text-sm font-body">{comments} comments</span>
      </button>

      {/* Bookmark */}
      <button
        type="button"
        className="flex items-center gap-2 px-3 py-2 bg-gray-100 border-2 border-black hover:bg-gray-200 transition-colors"
        aria-label="Bookmark this story"
      >
        <span className="text-lg">&#128278;</span>
        <span className="text-sm font-body">Bookmark</span>
      </button>

      {/* Share */}
      <button
        type="button"
        className="flex items-center gap-2 px-3 py-2 bg-gray-100 border-2 border-black hover:bg-gray-200 transition-colors"
        aria-label="Share this story"
      >
        <span className="text-lg">&#8599;</span>
        <span className="text-sm font-body">Share</span>
      </button>

      {/* Make It Your Own CTA */}
      <Link
        href={`/make-it-your-own?story=${storySlug}`}
        className="ml-auto px-6 py-3 bg-[#0066FF] text-white font-display font-bold border-3 border-black shadow-memphis-sm hover:shadow-none hover:translate-x-1 hover:translate-y-1 transition-all"
      >
        Make It Your Own &rarr;
      </Link>
    </div>
  );
}
