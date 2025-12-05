import Link from "next/link";
import { featuredStory, formatCurrency } from "@/lib/mock-data/stories";

export function FeaturedStory() {
  const story = featuredStory;

  return (
    <section className="bg-white py-24">
      <div className="mx-auto max-w-7xl px-8 lg:px-12">
        {/* Section Header - Asymmetric, minimal */}
        <div className="mb-16">
          <div className="h-px w-16 bg-dark-900 mb-6" />
          <h2 className="text-3xl sm:text-4xl font-display font-normal text-dark-900">
            Featured Story
          </h2>
          <p className="mt-4 text-base font-mono text-dark-600">How AI made the difference</p>
        </div>

        {/* Featured Card - Clean, spacious */}
        <div className="bg-light-50 border border-light-300 overflow-hidden hover:border-dark-900 transition-all">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_2fr]">
            {/* Image Placeholder */}
            <div className="bg-light-200 h-80 lg:h-auto flex items-center justify-center border-b lg:border-b-0 lg:border-r border-light-300">
              <span className="text-sm font-mono text-dark-600">{story.imageAlt}</span>
            </div>

            {/* Content */}
            <div className="p-10 lg:p-12">
              {/* Category Tag */}
              <span className="inline-block px-4 py-1.5 text-xs font-mono border border-dark-900 bg-white text-dark-900">
                {story.categoryLabel}
              </span>

              {/* Title */}
              <h3 className="mt-6 text-2xl sm:text-3xl font-display font-normal text-dark-900 leading-tight">
                {story.title}
              </h3>

              {/* Excerpt */}
              <p className="mt-5 text-base font-mono text-dark-600 leading-relaxed">
                {story.excerpt}
              </p>

              {/* AI Quote - with hanko stamp accent */}
              <div className="mt-8 p-5 bg-white border-l-2 border-hanko-red">
                <p className="text-xs font-mono text-dark-600 mb-2">From the AI:</p>
                <p className="text-sm font-mono text-dark-900 italic leading-relaxed">
                  &quot;{story.aiQuote}&quot;
                </p>
              </div>

              {/* Author & CTA */}
              <div className="mt-10 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
                <div className="flex items-center gap-4">
                  {/* Avatar Placeholder */}
                  <div className="w-10 h-10 border border-dark-900 flex items-center justify-center text-xs font-mono text-dark-900">
                    {story.author
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </div>
                  <div>
                    <p className="text-sm font-mono text-dark-900">{story.author}</p>
                    <p className="text-xs font-mono text-dark-600 mt-1">
                      {story.readTime} - {formatCurrency(story.amountSaved)} saved
                    </p>
                  </div>
                </div>

                <Link
                  href={`/stories/${story.slug}`}
                  className="inline-flex items-center justify-center px-6 py-3 text-xs font-mono text-light-50 bg-dark-900 border border-dark-900 hover:bg-dark-800 transition-all"
                >
                  Read Story
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
