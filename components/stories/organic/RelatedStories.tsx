import Link from "next/link";
import type { Story } from "@/lib/types/story";

interface RelatedStoriesProps {
  stories: Story[];
}

export function RelatedStories({ stories }: RelatedStoriesProps) {
  if (stories.length === 0) return null;

  return (
    <section className="mt-16 py-12 bg-[#fff0dc]">
      <div className="mx-auto max-w-3xl px-6 lg:px-8">
        <h2 className="text-xl font-display font-semibold text-[#3d405b]">Related Stories</h2>

        <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-4">
          {stories.map((story) => (
            <Link
              key={story.id}
              href={`/stories/${story.slug}`}
              className="group flex bg-white rounded-xl shadow-soft hover:shadow-soft-hover transition-all overflow-hidden"
            >
              {/* Image Placeholder */}
              <div className="w-20 h-full bg-[#fff8f0] flex items-center justify-center flex-shrink-0">
                <span className="text-xs text-[#81b29a] px-1 text-center">{story.imageAlt}</span>
              </div>

              {/* Content */}
              <div className="flex-1 p-3">
                <h3 className="text-sm font-semibold text-[#3d405b] leading-tight group-hover:text-[#e07a5f] transition-colors line-clamp-2">
                  {story.title}
                </h3>
                <p className="mt-1 text-xs text-[#e07a5f] font-semibold line-clamp-1">
                  {story.outcomeMetric}
                </p>
                <p className="mt-2 text-xs text-[#5a5d7a]">
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
