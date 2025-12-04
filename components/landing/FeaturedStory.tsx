import Link from "next/link";
import { featuredStory, formatCurrency } from "@/lib/mock-data/stories";

export function FeaturedStory() {
  const story = featuredStory;

  return (
    <section className="bg-light-50 py-20">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-dark-900">
            Featured Story
          </h2>
          <p className="mt-3 text-base text-dark-600">
            See exactly how AI made the difference
          </p>
        </div>

        {/* Featured Card */}
        <div className="bg-white rounded-2xl card-shadow overflow-hidden hover:card-shadow-hover transition-shadow duration-300">
          <div className="grid grid-cols-1 lg:grid-cols-[380px_1fr]">
            {/* Image Placeholder */}
            <div className="bg-light-200 h-64 lg:h-auto flex items-center justify-center">
              <span className="text-sm text-dark-600">{story.imageAlt}</span>
            </div>

            {/* Content */}
            <div className="p-8 lg:p-10">
              {/* Category Tag */}
              <span className="inline-block px-4 py-1.5 text-xs font-semibold rounded-full bg-[#fef3c7] text-[#92400e]">
                {story.categoryLabel}
              </span>

              {/* Title */}
              <h3 className="mt-5 text-2xl sm:text-3xl font-bold text-dark-900 leading-tight">
                {story.title}
              </h3>

              {/* Excerpt */}
              <p className="mt-4 text-base text-dark-600 leading-relaxed">
                {story.excerpt}
              </p>

              {/* AI Quote */}
              <div className="mt-6 p-4 bg-light-50 rounded-lg border-l-4 border-primary-500">
                <p className="text-xs text-light-400 mb-1">From the AI chat:</p>
                <p className="text-sm text-dark-900 italic">
                  &quot;{story.aiQuote}&quot;
                </p>
              </div>

              {/* Author & CTA */}
              <div className="mt-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div className="flex items-center gap-3">
                  {/* Avatar Placeholder */}
                  <div className="w-10 h-10 bg-light-300 rounded-full flex items-center justify-center text-sm font-medium text-dark-600">
                    {story.author
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </div>
                  <div>
                    <p className="text-sm font-medium text-dark-900">
                      {story.author}
                    </p>
                    <p className="text-xs text-light-400">
                      {story.readTime} - {formatCurrency(story.amountSaved)}{" "}
                      saved
                    </p>
                  </div>
                </div>

                <Link
                  href={`/stories/${story.slug}`}
                  className="inline-flex items-center justify-center px-6 py-2.5 text-sm font-semibold text-white bg-primary-500 rounded-lg hover:bg-primary-600 transition-colors"
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
