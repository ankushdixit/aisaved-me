import Link from "next/link";
import {
  tickerStoriesRow1,
  tickerStoriesRow2,
  formatCurrency,
  type TickerStory,
  type TickerCategory,
} from "@/lib/mock-data/stories";

function CategoryTag({ category }: { category: TickerCategory }) {
  const styles = {
    legal: { bg: "#FFD700", text: "#000000" },
    medical: { bg: "#00FF7F", text: "#000000" },
    financial: { bg: "#FF1493", text: "#FFFFFF" },
  };

  const labels = {
    legal: "Legal",
    medical: "Medical",
    financial: "Financial",
  };

  const style = styles[category];

  return (
    <span
      className="inline-block px-3 py-1 text-xs font-display font-bold border-2 border-black uppercase transform -rotate-2"
      style={{ backgroundColor: style.bg, color: style.text }}
    >
      {labels[category]}
    </span>
  );
}

function TickerCardContent({ story }: { story: TickerStory }) {
  return (
    <>
      <CategoryTag category={story.category} />

      <div className="mt-3">
        {story.amount ? (
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-display font-bold text-black">
              {formatCurrency(story.amount)}
            </span>
            <span className="text-sm font-body font-bold text-black">{story.amountLabel}</span>
          </div>
        ) : (
          <p className="text-xl font-display font-bold text-black">{story.outcome}</p>
        )}
      </div>

      <p className="mt-2 text-sm font-body text-black line-clamp-1 group-hover:font-bold transition-all">
        {story.title}
      </p>

      <p className="mt-3 text-xs font-body text-gray-600">
        {story.author} - {story.timeAgo}
      </p>
    </>
  );
}

function TickerCard({ story }: { story: TickerStory }) {
  const cardClasses =
    "flex-shrink-0 w-[320px] bg-white border-3 border-black shadow-memphis-md p-4 hover:shadow-memphis-lg transition-all cursor-pointer group transform hover:-rotate-1";

  if (story.slug) {
    return (
      <Link href={`/stories/${story.slug}`} className={`block ${cardClasses}`}>
        <TickerCardContent story={story} />
      </Link>
    );
  }

  return (
    <div className={cardClasses}>
      <TickerCardContent story={story} />
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
    <section className="bg-[#FFF9E6] py-12 overflow-hidden ticker-container border-t-4 border-b-4 border-black relative">
      {/* Memphis decorative dots */}
      <div className="absolute top-4 left-10 w-8 h-8 bg-[#0066FF] rounded-full border-3 border-black" />
      <div className="absolute bottom-4 right-20 w-10 h-10 bg-[#FF1493] border-3 border-black transform rotate-45" />

      <div className="relative">
        {/* Row 1 - scrolls left */}
        <div className="mb-5 overflow-x-hidden overflow-y-visible pt-2 pb-4">
          <TickerRow stories={tickerStoriesRow1} />
        </div>

        {/* Row 2 - scrolls right (reverse) */}
        <div className="overflow-x-hidden overflow-y-visible pt-2 pb-4">
          <TickerRow stories={tickerStoriesRow2} reverse />
        </div>
      </div>
    </section>
  );
}
