import Link from "next/link";
import { featuredStory, formatCurrency } from "@/lib/mock-data/stories";

export function FeaturedStory() {
  const story = featuredStory;

  return (
    <section className="bg-gradient-to-br from-cream to-cream-dark py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-14">
          <h2 className="text-3xl sm:text-4xl font-display font-bold text-clay">Featured Story</h2>
          <p className="mt-4 text-base font-body text-clay-light">
            See exactly how AI made the difference
          </p>
        </div>

        {/* Featured Card */}
        <div className="bg-white rounded-[36px] shadow-soft overflow-hidden hover:shadow-soft-hover transition-all duration-300">
          <div className="grid grid-cols-1 lg:grid-cols-[380px_1fr]">
            {/* Image Placeholder */}
            <div className="bg-gradient-to-br from-sage/20 to-coral/20 h-64 lg:h-auto flex items-center justify-center">
              <span className="text-sm font-body text-clay-light">{story.imageAlt}</span>
            </div>

            {/* Content */}
            <div className="p-8 lg:p-10">
              {/* Category Tag */}
              <span className="inline-block px-5 py-2 text-xs font-display font-semibold rounded-full bg-[#FFF3E0] text-[#8D6E63]">
                {story.categoryLabel}
              </span>

              {/* Title */}
              <h3 className="mt-6 text-2xl sm:text-3xl font-display font-bold text-clay leading-tight">
                {story.title}
              </h3>

              {/* Excerpt */}
              <p className="mt-4 text-base font-body text-clay-light leading-relaxed">
                {story.excerpt}
              </p>

              {/* AI Quote */}
              <div className="mt-6 p-5 bg-cream-dark rounded-3xl border-l-[6px] border-terracotta">
                <p className="text-xs font-display font-semibold text-sage-dark mb-2">
                  From the AI chat:
                </p>
                <p className="text-sm font-body text-clay italic">&quot;{story.aiQuote}&quot;</p>
              </div>

              {/* Author & CTA */}
              <div className="mt-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div className="flex items-center gap-3">
                  {/* Avatar Placeholder */}
                  <div className="w-12 h-12 bg-gradient-to-br from-sage/30 to-coral/30 rounded-full flex items-center justify-center text-sm font-display font-semibold text-clay">
                    {story.author
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </div>
                  <div>
                    <p className="text-sm font-display font-semibold text-clay">{story.author}</p>
                    <p className="text-xs font-body text-clay-light">
                      {story.readTime} - {formatCurrency(story.amountSaved)} saved
                    </p>
                  </div>
                </div>

                <Link
                  href={`/stories/${story.slug}`}
                  className="inline-flex items-center justify-center px-8 py-3 text-sm font-display font-semibold text-white bg-terracotta rounded-full hover:bg-terracotta-dark transition-all shadow-soft hover:scale-105"
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
