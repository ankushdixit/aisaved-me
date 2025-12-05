import {
  tickerStoriesRow1,
  tickerStoriesRow2,
  formatCurrency,
  type TickerStory,
  type StoryCategory,
} from "@/lib/mock-data/stories";

function CategoryTag({ category }: { category: StoryCategory }) {
  const styles = {
    legal: "bg-light-100 text-dark-600 border-dark-900",
    medical: "bg-light-100 text-dark-600 border-dark-900",
    financial: "bg-light-100 text-dark-600 border-dark-900",
  };

  const labels = {
    legal: "Legal",
    medical: "Medical",
    financial: "Financial",
  };

  return (
    <span className={`inline-block px-3 py-1 text-[10px] font-mono border ${styles[category]}`}>
      {labels[category]}
    </span>
  );
}

function TickerCard({ story }: { story: TickerStory }) {
  return (
    <div className="flex-shrink-0 w-[320px] bg-white border border-light-300 p-5 hover:border-dark-900 transition-all cursor-pointer group">
      <CategoryTag category={story.category} />

      <div className="mt-4">
        {story.amount ? (
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-display font-normal text-dark-900">
              {formatCurrency(story.amount)}
            </span>
            <span className="text-sm font-mono text-dark-600">{story.amountLabel}</span>
          </div>
        ) : (
          <p className="text-lg font-display font-normal text-dark-900">{story.outcome}</p>
        )}
      </div>

      <p className="mt-3 text-[13px] font-mono text-dark-900 line-clamp-1 group-hover:text-dark-600 transition-colors">
        {story.title}
      </p>

      <p className="mt-4 text-[11px] font-mono text-dark-600">
        {story.author} - {story.timeAgo}
      </p>
    </div>
  );
}

function TickerRow({ stories, reverse = false }: { stories: TickerStory[]; reverse?: boolean }) {
  // Duplicate stories for seamless loop
  const duplicatedStories = [...stories, ...stories];

  return (
    <div className="flex gap-5">
      <div className={`flex gap-5 ${reverse ? "animate-ticker-reverse" : "animate-ticker"}`}>
        {duplicatedStories.map((story, index) => (
          <TickerCard key={`${story.id}-${index}`} story={story} />
        ))}
      </div>
    </div>
  );
}

export function VictoryTicker() {
  return (
    <section className="bg-light-50 py-12 overflow-hidden ticker-container border-y border-light-300">
      <div className="relative">
        {/* Fade edges */}
        <div className="absolute left-0 top-0 bottom-0 w-24 z-10 ticker-fade-left pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-24 z-10 ticker-fade-right pointer-events-none" />

        {/* Row 1 - scrolls left */}
        <div className="mb-6 overflow-hidden">
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
