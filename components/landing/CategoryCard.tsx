import Link from "next/link";
import { categoryStats, type CategoryStats } from "@/lib/mock-data/stories";

function CategoryCardItem({ category, index }: { category: CategoryStats; index: number }) {
  const colors = {
    legal: { bg: "#FFD700", border: "#000000" },
    medical: { bg: "#00FF7F", border: "#000000" },
    financial: { bg: "#FF1493", border: "#000000" },
  };

  const rotation = index % 2 === 0 ? "transform -rotate-1" : "transform rotate-1";
  const categoryKey = category.category as keyof typeof colors;
  const color = colors[categoryKey] || colors.legal;

  return (
    <Link
      href={`/stories?category=${category.category}`}
      className={`group block bg-white border-4 border-black shadow-memphis-lg p-6 hover:shadow-memphis-xl transition-all duration-300 ${rotation} hover:rotate-0`}
    >
      {/* Category label badge */}
      <div
        className="inline-block px-4 py-2 border-3 border-black font-display font-bold uppercase text-sm mb-4"
        style={{ backgroundColor: color.bg }}
      >
        {category.label}
      </div>

      <p className="text-base font-body text-black leading-relaxed">{category.description}</p>

      <div className="mt-6 flex items-center justify-between">
        <div className="flex items-baseline gap-2">
          <span className="text-3xl font-display font-bold text-black">{category.storyCount}</span>
          <span className="text-base font-body font-bold text-black">stories</span>
        </div>

        <span className="text-base font-display font-bold text-black group-hover:underline uppercase">
          Explore →
        </span>
      </div>
    </Link>
  );
}

export function CategoryCards() {
  return (
    <section className="bg-pattern-dots py-16 border-t-4 border-b-4 border-black">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Section Header */}
        <h2 className="text-center text-3xl sm:text-4xl font-display font-bold text-black mb-10 text-memphis-shadow">
          Jump Into a Category
        </h2>

        {/* Category Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 max-w-3xl mx-auto">
          {categoryStats.map((category, index) => (
            <CategoryCardItem key={category.category} category={category} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
