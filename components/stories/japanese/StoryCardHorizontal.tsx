import Link from "next/link";
import type { Story } from "@/lib/types/story";

interface StoryCardHorizontalProps {
  story: Story;
}

export function StoryCardHorizontal({ story }: StoryCardHorizontalProps) {
  return (
    <Link
      href={`/stories/${story.slug}`}
      className="group block bg-[#faf8f5] border border-[#d4d0c8] overflow-hidden hover:border-[#1a1a1a] transition-colors"
    >
      <div className="flex flex-col sm:flex-row">
        {/* Image Placeholder */}
        <div className="sm:w-40 h-32 sm:h-auto bg-[#f5f2ed] flex items-center justify-center border-b sm:border-b-0 sm:border-r border-[#d4d0c8] flex-shrink-0">
          <span className="text-xs text-[#6b6b6b] px-4 text-center">{story.imageAlt}</span>
        </div>

        {/* Content */}
        <div className="flex-1 p-5">
          {/* Category Tag */}
          <span className="inline-block px-3 py-1 text-xs text-[#6b6b6b] border border-[#d4d0c8] uppercase tracking-wider">
            {story.categoryLabel}
          </span>

          {/* Title */}
          <h3 className="mt-3 text-lg text-[#1a1a1a] leading-tight group-hover:text-[#c41e3a] transition-colors line-clamp-2">
            {story.title}
          </h3>

          {/* Excerpt */}
          <p className="mt-2 text-sm text-[#6b6b6b] line-clamp-2">{story.excerpt}</p>

          {/* Meta */}
          <div className="mt-4 flex items-center gap-3 text-sm">
            <div className="w-7 h-7 bg-[#1a1a1a] flex items-center justify-center text-xs text-[#faf8f5]">
              {story.authorInitials}
            </div>
            <span className="text-[#6b6b6b]">
              {story.author} &middot; {story.readTime} &middot;{" "}
              <span className="text-[#1a1a1a]">{story.outcomeMetric}</span>
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}
