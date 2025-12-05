import Link from "next/link";
import type { Story } from "@/lib/types/story";

interface StoryCardHorizontalProps {
  story: Story;
}

export function StoryCardHorizontal({ story }: StoryCardHorizontalProps) {
  const categoryColors: Record<string, { bg: string; text: string }> = {
    legal: { bg: "#fff3e0", text: "#8d6e63" },
    medical: { bg: "#e8f5e9", text: "#558b2f" },
    financial: { bg: "#fce4ec", text: "#c2185b" },
    other: { bg: "#e3f2fd", text: "#1565c0" },
  };

  const colors = categoryColors[story.category] || categoryColors.other;

  return (
    <Link
      href={`/stories/${story.slug}`}
      className="group block bg-white rounded-2xl overflow-hidden shadow-soft hover:shadow-soft-hover transition-all"
    >
      <div className="flex flex-col sm:flex-row">
        {/* Image Placeholder */}
        <div className="sm:w-40 h-32 sm:h-auto bg-[#fff0dc] flex items-center justify-center flex-shrink-0">
          <span className="text-sm text-[#81b29a] px-4 text-center">{story.imageAlt}</span>
        </div>

        {/* Content */}
        <div className="flex-1 p-5">
          {/* Category Tag */}
          <span
            className="inline-block px-3 py-1 text-xs rounded-full"
            style={{ backgroundColor: colors.bg, color: colors.text }}
          >
            {story.categoryLabel}
          </span>

          {/* Title */}
          <h3 className="mt-3 text-lg font-display font-semibold text-[#3d405b] leading-tight group-hover:text-[#e07a5f] transition-colors line-clamp-2">
            {story.title}
          </h3>

          {/* Excerpt */}
          <p className="mt-2 text-sm text-[#5a5d7a] line-clamp-2">{story.excerpt}</p>

          {/* Meta */}
          <div className="mt-4 flex items-center gap-3 text-sm">
            <div className="w-8 h-8 bg-[#81b29a] rounded-full flex items-center justify-center text-xs font-semibold text-white">
              {story.authorInitials}
            </div>
            <span className="text-[#5a5d7a]">
              {story.author} &middot; {story.readTime} &middot;{" "}
              <span className="font-semibold text-[#e07a5f]">{story.outcomeMetric}</span>
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}
