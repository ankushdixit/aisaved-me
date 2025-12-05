import type { StoryDetail } from "@/lib/types/story";
import { formatCurrency } from "@/lib/mock-data/stories";

interface StoryHeroProps {
  story: StoryDetail;
}

export function StoryHero({ story }: StoryHeroProps) {
  const categoryColors: Record<string, { bg: string; text: string }> = {
    legal: { bg: "#FFD700", text: "#000000" },
    medical: { bg: "#00FF7F", text: "#000000" },
    financial: { bg: "#FF1493", text: "#FFFFFF" },
    other: { bg: "#0066FF", text: "#FFFFFF" },
  };

  const colors = categoryColors[story.category] || categoryColors.other;

  return (
    <>
      {/* Hero Image Placeholder */}
      <div className="bg-gray-800 h-64 sm:h-80 md:h-96 flex items-center justify-center">
        <span className="text-gray-400 font-body">Story Hero Image - Full Width</span>
      </div>

      {/* Breadcrumb */}
      <div className="bg-gray-800 px-6 lg:px-8 pb-4 -mt-8 pt-8">
        <div className="mx-auto max-w-3xl">
          <p className="text-sm text-gray-400 font-body">
            Stories &rsaquo; {story.categoryLabel} &rsaquo;{" "}
            {story.title.split(" ").slice(0, 3).join(" ")}...
          </p>
        </div>
      </div>

      {/* Article Header */}
      <div className="mx-auto max-w-3xl px-6 lg:px-8 pt-10">
        {/* Category Tag */}
        <span
          className="inline-block px-4 py-2 text-sm font-display font-bold border-3 border-black uppercase transform -rotate-2"
          style={{ backgroundColor: colors.bg, color: colors.text }}
        >
          {story.categoryLabel}
        </span>

        {/* Title */}
        <h1 className="mt-6 text-3xl sm:text-4xl md:text-5xl font-display font-bold text-black leading-tight">
          {story.title}
        </h1>

        {/* Subtitle */}
        {story.subtitle && (
          <p className="mt-4 text-lg sm:text-xl text-gray-600 font-body">{story.subtitle}</p>
        )}

        {/* Author Info & Outcome */}
        <div className="mt-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 bg-[#0066FF] border-3 border-black flex items-center justify-center text-lg font-display font-bold text-white">
              {story.authorInitials}
            </div>
            <div>
              <p className="font-display font-bold text-black">{story.author}</p>
              <p className="text-sm font-body text-gray-600">
                {story.publishedDate} &middot; {story.readTime} read
              </p>
            </div>
          </div>

          {/* Outcome Badge */}
          {story.amountSaved && (
            <div className="inline-flex items-center px-5 py-3 bg-[#d1fae5] border-3 border-black">
              <div>
                <p className="text-xs font-display font-bold text-[#065f46] uppercase">OUTCOME</p>
                <p className="text-xl font-display font-bold text-[#065f46]">
                  {formatCurrency(story.amountSaved)} Saved
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
