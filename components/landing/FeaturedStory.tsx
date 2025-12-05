import Link from "next/link";
import { featuredStory, formatCurrency } from "@/lib/mock-data/stories";

export function FeaturedStory() {
  const story = featuredStory;

  return (
    <section className="bg-white py-20 border-t-4 border-b-4 border-black relative overflow-hidden">
      {/* Memphis decorative shapes */}
      <div className="absolute top-10 left-10 w-28 h-28 bg-[#FF1493] opacity-10 rounded-full" />
      <div className="absolute bottom-10 right-10 w-32 h-32 bg-[#00FF7F] opacity-10 transform rotate-45" />

      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl sm:text-5xl font-display font-bold text-black text-memphis-shadow">
            Featured Story
          </h2>
          <p className="mt-4 text-lg font-body font-bold text-black">
            See exactly how AI made the difference
          </p>
        </div>

        {/* Featured Card */}
        <div className="bg-white border-4 border-black shadow-memphis-xl overflow-hidden transform -rotate-1 hover:rotate-0 transition-all">
          <div className="grid grid-cols-1 lg:grid-cols-[380px_1fr]">
            {/* Image Placeholder */}
            <div className="bg-[#FFD700] h-64 lg:h-auto flex items-center justify-center border-b-4 lg:border-b-0 lg:border-r-4 border-black">
              <span className="text-base font-display font-bold text-black uppercase">
                {story.imageAlt}
              </span>
            </div>

            {/* Content */}
            <div className="p-8 lg:p-10 bg-[#FFF9E6]">
              {/* Category Tag */}
              <span className="inline-block px-4 py-2 text-xs font-display font-bold border-3 border-black bg-[#FFD700] text-black uppercase transform -rotate-2">
                {story.categoryLabel}
              </span>

              {/* Title */}
              <h3 className="mt-6 text-2xl sm:text-3xl font-display font-bold text-black leading-tight">
                {story.title}
              </h3>

              {/* Excerpt */}
              <p className="mt-4 text-base font-body text-black leading-relaxed">{story.excerpt}</p>

              {/* AI Quote */}
              <div className="mt-6 p-4 bg-white border-4 border-black transform rotate-1">
                <p className="text-xs font-display font-bold text-black mb-2 uppercase">
                  From the AI chat:
                </p>
                <p className="text-base font-body text-black italic">&quot;{story.aiQuote}&quot;</p>
              </div>

              {/* Author & CTA */}
              <div className="mt-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div className="flex items-center gap-3">
                  {/* Avatar Placeholder */}
                  <div className="w-12 h-12 bg-[#0066FF] border-3 border-black flex items-center justify-center text-sm font-display font-bold text-white">
                    {story.author
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </div>
                  <div>
                    <p className="text-base font-body font-bold text-black">{story.author}</p>
                    <p className="text-sm font-body text-gray-600">
                      {story.readTime} - {formatCurrency(story.amountSaved)} saved
                    </p>
                  </div>
                </div>

                <Link
                  href={`/stories/${story.slug}`}
                  className="btn-memphis px-8 py-3 bg-[#FF1493] text-white text-base"
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
