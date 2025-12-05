import Link from "next/link";
import { categoryStats, type CategoryStats } from "@/lib/mock-data/stories";

function CategoryCardItem({ category }: { category: CategoryStats }) {
  const borderColor =
    category.category === "legal"
      ? "#F2CC8F"
      : category.category === "medical"
        ? "#81B29A"
        : "#E07A5F";

  return (
    <Link
      href={`/stories?category=${category.category}`}
      className="group block bg-white rounded-[28px] shadow-soft p-6 hover:shadow-soft-hover hover:scale-102 transition-all duration-300 border-l-[8px]"
      style={{ borderLeftColor: borderColor }}
    >
      <h3 className="text-xl font-display font-bold text-clay group-hover:text-terracotta transition-colors">
        {category.label}
      </h3>
      <p className="mt-2 text-sm font-body text-clay-light">{category.description}</p>

      <div className="mt-6 flex items-center justify-between">
        <div className="flex items-baseline gap-2">
          <span className="text-2xl font-display font-bold text-clay">{category.storyCount}</span>
          <span className="text-sm font-body text-clay-light">stories</span>
        </div>

        <span className="text-sm font-display font-semibold text-terracotta group-hover:underline">
          Explore
        </span>
      </div>
    </Link>
  );
}

export function CategoryCards() {
  return (
    <section className="bg-cream py-16">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Section Header */}
        <h2 className="text-center text-2xl sm:text-3xl font-display font-bold text-clay mb-10">
          Jump Into a Category
        </h2>

        {/* Category Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-3xl mx-auto">
          {categoryStats.map((category) => (
            <CategoryCardItem key={category.category} category={category} />
          ))}
        </div>
      </div>
    </section>
  );
}
