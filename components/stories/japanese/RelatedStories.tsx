import Link from "next/link";
import type { Story } from "@/lib/types/story";

interface RelatedStoriesProps {
  stories: Story[];
}

export function RelatedStories({ stories }: RelatedStoriesProps) {
  if (stories.length === 0) return null;

  return (
    <section className="mt-16 py-12 bg-[#f5f2ed] border-t border-[#d4d0c8]">
      <div className="mx-auto max-w-3xl px-6 lg:px-8">
        <h2 className="text-xl text-[#1a1a1a]">Related Stories</h2>

        <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-4">
          {stories.map((story) => (
            <Link
              key={story.id}
              href={`/stories/${story.slug}`}
              className="group flex bg-[#faf8f5] border border-[#d4d0c8] hover:border-[#1a1a1a] transition-colors overflow-hidden"
            >
              {/* Image Placeholder */}
              <div className="w-20 h-full bg-[#f5f2ed] flex items-center justify-center flex-shrink-0 border-r border-[#d4d0c8]">
                <span className="text-xs text-[#6b6b6b] px-1 text-center">{story.imageAlt}</span>
              </div>

              {/* Content */}
              <div className="flex-1 p-3">
                <h3 className="text-sm text-[#1a1a1a] leading-tight group-hover:text-[#c41e3a] transition-colors line-clamp-2">
                  {story.title}
                </h3>
                <p className="mt-1 text-xs text-[#6b6b6b] line-clamp-1">{story.outcomeMetric}</p>
                <p className="mt-2 text-xs text-[#6b6b6b]">
                  {story.author} &middot; {story.categoryLabel}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
