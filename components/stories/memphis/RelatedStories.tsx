import Link from "next/link";
import type { Story } from "@/lib/types/story";

interface RelatedStoriesProps {
  stories: Story[];
}

export function RelatedStories({ stories }: RelatedStoriesProps) {
  if (stories.length === 0) return null;

  return (
    <section className="mt-16 py-12 bg-gray-100 border-t-4 border-black">
      <div className="mx-auto max-w-3xl px-6 lg:px-8">
        <h2 className="text-2xl font-display font-bold text-black">Related Stories</h2>

        <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-4">
          {stories.map((story) => (
            <Link
              key={story.id}
              href={`/stories/${story.slug}`}
              className="group flex bg-white border-3 border-black shadow-memphis-sm hover:shadow-memphis-md transition-all overflow-hidden"
            >
              {/* Image Placeholder */}
              <div className="w-20 h-full bg-gray-200 flex items-center justify-center flex-shrink-0 border-r-3 border-black">
                <span className="text-xs text-gray-500 px-1 text-center">{story.imageAlt}</span>
              </div>

              {/* Content */}
              <div className="flex-1 p-3">
                <h3 className="text-sm font-display font-bold text-black leading-tight group-hover:text-[#0066FF] transition-colors line-clamp-2">
                  {story.title}
                </h3>
                <p className="mt-1 text-xs font-body text-gray-600 line-clamp-1">
                  {story.outcomeMetric}
                </p>
                <p className="mt-2 text-xs font-body text-gray-500">
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
