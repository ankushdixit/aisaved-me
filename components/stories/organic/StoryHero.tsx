import type { StoryDetail } from "@/lib/types/story";
import { formatCurrency } from "@/lib/mock-data/stories";

interface StoryHeroProps {
  story: StoryDetail;
}

export function StoryHero({ story }: StoryHeroProps) {
  const categoryColors: Record<string, { bg: string; text: string }> = {
    legal: { bg: "#fff3e0", text: "#8d6e63" },
    medical: { bg: "#e8f5e9", text: "#558b2f" },
    financial: { bg: "#fce4ec", text: "#c2185b" },
    other: { bg: "#e3f2fd", text: "#1565c0" },
  };

  const colors = categoryColors[story.category] || categoryColors.other;

  return (
    <>
      {/* Hero Image Placeholder */}
      <div className="bg-[#3d405b] h-64 sm:h-80 md:h-96 flex items-center justify-center">
        <span className="text-[#81b29a]">Story Hero Image</span>
      </div>

      {/* Breadcrumb */}
      <div className="bg-[#3d405b] px-6 lg:px-8 pb-4 -mt-8 pt-8">
        <div className="mx-auto max-w-3xl">
          <p className="text-sm text-[#81b29a]">
            Stories &rsaquo; {story.categoryLabel} &rsaquo;{" "}
            {story.title.split(" ").slice(0, 3).join(" ")}...
          </p>
        </div>
      </div>

      {/* Article Header */}
      <div className="mx-auto max-w-3xl px-6 lg:px-8 pt-10">
        {/* Category Tag */}
        <span
          className="inline-block px-4 py-2 text-sm rounded-full"
          style={{ backgroundColor: colors.bg, color: colors.text }}
        >
          {story.categoryLabel}
        </span>

        {/* Title */}
        <h1 className="mt-6 text-3xl sm:text-4xl font-display font-semibold text-[#3d405b] leading-tight">
          {story.title}
        </h1>

        {/* Subtitle */}
        {story.subtitle && <p className="mt-4 text-lg text-[#5a5d7a]">{story.subtitle}</p>}

        {/* Author Info & Outcome */}
        <div className="mt-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 bg-[#81b29a] rounded-full flex items-center justify-center text-lg font-semibold text-white">
              {story.authorInitials}
            </div>
            <div>
              <p className="font-semibold text-[#3d405b]">{story.author}</p>
              <p className="text-sm text-[#5a5d7a]">
                {story.publishedDate} &middot; {story.readTime} read
              </p>
            </div>
          </div>

          {/* Outcome Badge */}
          {story.amountSaved && (
            <div className="inline-flex items-center px-5 py-3 bg-[#e8f5e9] rounded-xl shadow-soft">
              <div>
                <p className="text-xs font-semibold text-[#558b2f] uppercase">Outcome</p>
                <p className="text-xl font-semibold text-[#558b2f]">
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
