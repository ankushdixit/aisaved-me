import type { StoryDetail } from "@/lib/types/story";
import { formatCurrency } from "@/lib/mock-data/stories";

interface StoryHeroProps {
  story: StoryDetail;
}

export function StoryHero({ story }: StoryHeroProps) {
  return (
    <>
      {/* Hero Image Placeholder */}
      <div className="bg-[#1a1a1a] h-64 sm:h-80 md:h-96 flex items-center justify-center">
        <span className="text-[#6b6b6b]">Story Hero Image</span>
      </div>

      {/* Breadcrumb */}
      <div className="bg-[#1a1a1a] px-6 lg:px-8 pb-4 -mt-8 pt-8">
        <div className="mx-auto max-w-3xl">
          <p className="text-sm text-[#6b6b6b]">
            Stories &rsaquo; {story.categoryLabel} &rsaquo;{" "}
            {story.title.split(" ").slice(0, 3).join(" ")}...
          </p>
        </div>
      </div>

      {/* Article Header */}
      <div className="mx-auto max-w-3xl px-6 lg:px-8 pt-10">
        {/* Category Tag */}
        <span className="inline-block px-3 py-1 text-xs text-[#6b6b6b] border border-[#d4d0c8] uppercase tracking-wider">
          {story.categoryLabel}
        </span>

        {/* Title */}
        <h1 className="mt-6 text-3xl sm:text-4xl text-[#1a1a1a] leading-tight">{story.title}</h1>

        {/* Subtitle */}
        {story.subtitle && <p className="mt-4 text-lg text-[#6b6b6b]">{story.subtitle}</p>}

        {/* Author Info & Outcome */}
        <div className="mt-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-[#1a1a1a] flex items-center justify-center text-sm text-[#faf8f5]">
              {story.authorInitials}
            </div>
            <div>
              <p className="text-[#1a1a1a]">{story.author}</p>
              <p className="text-sm text-[#6b6b6b]">
                {story.publishedDate} &middot; {story.readTime} read
              </p>
            </div>
          </div>

          {/* Outcome Badge */}
          {story.amountSaved && (
            <div className="inline-flex items-center px-4 py-2 bg-[#f5f2ed] border border-[#d4d0c8]">
              <div>
                <p className="text-xs text-[#6b6b6b] uppercase tracking-wider">Outcome</p>
                <p className="text-lg text-[#1a1a1a]">{formatCurrency(story.amountSaved)} Saved</p>
              </div>
            </div>
          )}
        </div>

        {/* Zen divider */}
        <div className="mt-8 h-px bg-gradient-to-r from-transparent via-[#d4d0c8] to-transparent" />
      </div>
    </>
  );
}
