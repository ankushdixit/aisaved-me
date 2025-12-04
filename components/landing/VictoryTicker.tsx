import {
  tickerStoriesRow1,
  tickerStoriesRow2,
  formatCurrency,
  type TickerStory,
  type StoryCategory,
} from "@/lib/mock-data/stories";

function CategoryTag({ category }: { category: StoryCategory }) {
  const styles = {
    legal: "bg-[#fef3c7] text-[#92400e]",
    medical: "bg-[#d1fae5] text-[#065f46]",
    financial: "bg-[#dbeafe] text-[#1e40af]",
  };

  const labels = {
    legal: "Legal",
    medical: "Medical",
    financial: "Financial",
  };

  return (
    <span
      className={`inline-block px-3 py-1 text-[10px] font-semibold rounded-full ${styles[category]}`}
    >
      {labels[category]}
    </span>
  );
}

function TickerCard({ story }: { story: TickerStory }) {
  return (
    <div className="flex-shrink-0 w-[320px] bg-dark-800 border border-dark-700 rounded-xl p-4 hover:border-dark-600 transition-colors cursor-pointer group">
      <CategoryTag category={story.category} />

      <div className="mt-3">
        {story.amount ? (
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-bold text-success-500 font-mono">
              {formatCurrency(story.amount)}
            </span>
            <span className="text-sm text-light-200">{story.amountLabel}</span>
          </div>
        ) : (
          <p className="text-lg font-bold text-success-500">{story.outcome}</p>
        )}
      </div>

      <p className="mt-2 text-[13px] text-light-200 line-clamp-1 group-hover:text-white transition-colors">
        {story.title}
      </p>

      <p className="mt-3 text-[11px] text-light-400">
        {story.author} - {story.timeAgo}
      </p>
    </div>
  );
}

function TickerRow({
  stories,
  reverse = false,
}: {
  stories: TickerStory[];
  reverse?: boolean;
}) {
  // Duplicate stories for seamless loop
  const duplicatedStories = [...stories, ...stories];

  return (
    <div className="flex gap-5">
      <div
        className={`flex gap-5 ${reverse ? "animate-ticker-reverse" : "animate-ticker"}`}
      >
        {duplicatedStories.map((story, index) => (
          <TickerCard key={`${story.id}-${index}`} story={story} />
        ))}
      </div>
    </div>
  );
}

export function VictoryTicker() {
  return (
    <section className="bg-dark-900 py-8 overflow-hidden ticker-container">
      <div className="relative">
        {/* Fade edges */}
        <div className="absolute left-0 top-0 bottom-0 w-24 z-10 ticker-fade-left pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-24 z-10 ticker-fade-right pointer-events-none" />

        {/* Row 1 - scrolls left */}
        <div className="mb-5 overflow-hidden">
          <TickerRow stories={tickerStoriesRow1} />
        </div>

        {/* Row 2 - scrolls right (reverse) */}
        <div className="overflow-hidden">
          <TickerRow stories={tickerStoriesRow2} reverse />
        </div>
      </div>
    </section>
  );
}
