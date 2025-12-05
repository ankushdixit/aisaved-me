import Link from "next/link";
import type { Story } from "@/lib/types/story";

interface StoryCardHorizontalProps {
  story: Story;
}

export function StoryCardHorizontal({ story }: StoryCardHorizontalProps) {
  const categoryColors: Record<string, { bg: string; text: string }> = {
    legal: { bg: "#FFD700", text: "#000000" },
    medical: { bg: "#00FF7F", text: "#000000" },
    financial: { bg: "#FF1493", text: "#FFFFFF" },
    other: { bg: "#0066FF", text: "#FFFFFF" },
  };

  const colors = categoryColors[story.category] || categoryColors.other;

  return (
    <Link
      href={`/stories/${story.slug}`}
      className="group block bg-white border-4 border-black shadow-memphis-lg overflow-hidden transform -rotate-0.5 hover:rotate-0 hover:shadow-memphis-xl transition-all"
    >
      <div className="flex flex-col sm:flex-row">
        {/* Image Placeholder */}
        <div className="sm:w-40 h-32 sm:h-auto bg-gray-200 flex items-center justify-center border-b-4 sm:border-b-0 sm:border-r-4 border-black flex-shrink-0">
          <span className="text-sm font-body text-gray-500 px-4 text-center">{story.imageAlt}</span>
        </div>

        {/* Content */}
        <div className="flex-1 p-5">
          {/* Category Tag */}
          <span
            className="inline-block px-3 py-1 text-xs font-display font-bold border-3 border-black uppercase transform -rotate-2"
            style={{ backgroundColor: colors.bg, color: colors.text }}
          >
            {story.categoryLabel}
          </span>

          {/* Title */}
          <h3 className="mt-3 text-lg font-display font-bold text-black leading-tight group-hover:text-[#0066FF] transition-colors line-clamp-2">
            {story.title}
          </h3>

          {/* Excerpt */}
          <p className="mt-2 text-sm font-body text-gray-700 line-clamp-2">{story.excerpt}</p>

          {/* Meta */}
          <div className="mt-4 flex items-center gap-3 text-sm">
            <div className="w-8 h-8 bg-[#0066FF] border-2 border-black flex items-center justify-center text-xs font-display font-bold text-white">
              {story.authorInitials}
            </div>
            <span className="font-body text-gray-600">
              {story.author} &middot; {story.readTime} &middot;{" "}
              <span className="font-bold text-black">{story.outcomeMetric}</span>
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}
