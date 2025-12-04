import Link from "next/link";
import { categoryStats, type CategoryStats } from "@/lib/mock-data/stories";

function CategoryCardItem({ category }: { category: CategoryStats }) {
  return (
    <Link
      href={`/stories?category=${category.category}`}
      className="group block bg-white rounded-xl card-shadow border-l-[6px] p-6 hover:card-shadow-hover transition-all duration-300"
      style={{
        borderLeftColor:
          category.category === "legal"
            ? "#f59e0b"
            : category.category === "medical"
              ? "#10b981"
              : "#3b82f6",
      }}
    >
      <h3 className="text-xl font-bold text-dark-900 group-hover:text-primary-500 transition-colors">
        {category.label}
      </h3>
      <p className="mt-2 text-sm text-dark-600">{category.description}</p>

      <div className="mt-6 flex items-center justify-between">
        <div className="flex items-baseline gap-2">
          <span className="text-2xl font-bold text-dark-900">
            {category.storyCount}
          </span>
          <span className="text-sm text-dark-600">stories</span>
        </div>

        <span className="text-sm font-semibold text-primary-500 group-hover:underline">
          Explore
        </span>
      </div>
    </Link>
  );
}

export function CategoryCards() {
  return (
    <section className="bg-light-50 py-12">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Section Header */}
        <h2 className="text-center text-2xl sm:text-3xl font-bold text-dark-900 mb-8">
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
